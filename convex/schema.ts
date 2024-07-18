//Going to define Schema
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    tasks: defineTable({
        text: v.string(),
        completed: v.boolean()
    }),

    product: defineTable({
        name: v.string(),
        price: v.number()
    })
})