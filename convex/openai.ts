import { v } from 'convex/values';
import OpenAI from 'openai';
import { action } from './_generated/server';
import { api } from './_generated/api';


const apiKey = process.env.OPEN_API_KEY

const openai = new OpenAI({apiKey});

export const chat = action({
    args: {
        messageBody: v.string(),
        conversation: v.id("conversations")
    },
    handler: async (ctx, args) => {
        const res = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    'role': "system",
                    content: "You are a terse bot in a group chat responding to questions with 1-sentence answers"
                }, 
                {
                    role:'user',
                    content:args.messageBody
                }
            ]
        })
        console.log('values', res.choices[0].message);
        
        const messsageContent = res.choices[0].message.content //Never Runs

        await ctx.runMutation(api.messages.sendChatGPTMessage, {
            content: messsageContent ?? "I'm sorry, I don't know that",
            conversation: args.conversation
        })
    }
})