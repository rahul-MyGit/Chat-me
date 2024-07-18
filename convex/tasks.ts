import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getTask = query({
    args: {},
    handler: async (ctx , args) => {
        const task = await ctx.db.query("tasks").collect();
        return task;
    }
})

export const addTask = mutation({
    args: {
        text: v.string()
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("tasks", {text: args.text, completed: false})
        return id;
    }
})

export const completeTask = mutation({
    args: {
        id: v.id("tasks")
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {completed: true})
    }
})

export const deleteTask = mutation({
    args: {
        id: v.id("tasks")
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    }
})