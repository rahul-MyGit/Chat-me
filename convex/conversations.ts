import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createConversation = mutation({
  args: {
    participants: v.array(v.id("users")),
    isGroup: v.boolean(),
    groupName: v.optional(v.string()),
    groupImage: v.optional(v.id("_storage")),
    admin: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const existingConversation = await ctx.db
      // A msg B or B msg A
      .query("conversations")
      .filter((q) =>
        q.or(
          q.eq(q.field("participants"), args.participants),
          q.eq(q.field("participants"), args.participants.reverse())
        )
      )
      .first();

    if (existingConversation) {
      return existingConversation._id;
    }

    let groupImage;

    if (args.groupImage) {
      groupImage = (await ctx.storage.getUrl(args.groupImage)) as string;
    }

    const conversationId = await ctx.db.insert("conversations", {
      participants: args.participants,
      isGroup: args.isGroup,
      groupName: args.groupName,
      groupImage,
      admin: args.admin,
    });

    return conversationId;
  },
});

export const getMyConversation = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new ConvexError("User not found");

    const conversations = await ctx.db.query("conversations").collect();

    const myConvo = conversations.filter((convo) => {
      return convo.participants.includes(user._id);
    });

    const conversationWithDetails = await Promise.all(
      myConvo.map(async (convo) => {
        let userDetails = {};
        if (!convo.isGroup) {
          const otherUserId = convo.participants.find((id) => id !== user._id);
          const userProfile = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("_id"), otherUserId))
            .take(1);

          userDetails = userProfile[0];
        }

        const lastMsg = await ctx.db
          .query("messages")
          .filter((q) => q.eq(q.field("conversation"), convo._id))
          .order("desc")
          .take(1);

        //convo id overwrites the user id below

        return {
          ...userDetails,
          ...convo,
          lastMsg: lastMsg[0] || null,
        };
      })
    );

    return conversationWithDetails;
  },
});

export const kickUser = mutation({
  args: {
    conversationId: v.id("conversations"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError('Unauthorized');

    const conversation = await ctx.db.query('conversations').filter((q) => q.eq(q.field("_id"), args.conversationId)).unique();

    if(!conversation) throw new ConvexError('conversation not found');

    await ctx.db.patch( args.conversationId, {
      participants: conversation.participants.filter(id => id !== args.userId)
    })
  }
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
