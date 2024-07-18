import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getProduct = query({
    args: {},
    handler: async (ctx, args) => {
        const products = await ctx.db.query("product").collect();
        return products
    }
});

export const addProduct = mutation({
    args: {
        name: v.string(),
        price: v.number()
    },
    handler: async (ctx , args) => {
        const id = await ctx.db.insert("product", {name: args.name, price: args.price});
        return id;
    }
})

export const updateProduct = mutation({
    args: {
        id: v.id("product"),
        price: v.number()
    },
    handler: async (ctx, args) => {
        ctx.db.patch(args.id, {price: args.price})
    }
})


export const deleteProduct = mutation({
    args: {
        id: v.id("product"),
    },
    handler: async (ctx, args) => {
        ctx.db.delete(args.id)
    },
});
