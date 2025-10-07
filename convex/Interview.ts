import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveInterviewQuestion = mutation({
    args: {
        questions: v.any(),
        uid: v.id('UserTable'),
        resumeUrl: v.optional(v.string()),
        jobTitle: v.optional(v.string()),
        jobDescription: v.optional(v.string())

    },
    
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('InterviewSessionTable', {
            interviewQuestions: args.questions,
            resumeUrl: args.resumeUrl ?? null,
            userId: args.uid,
            status: 'draft',
            jobTitle: args.jobTitle ?? null,
            jobDescription: args.jobDescription ?? null
        });

        return result;
    }
})

export const GetInterviewQuestions = query({
    args:{
        interviewRecordId: v.id('InterviewSessionTable')

    },
    handler: async(ctx,args)=>{
        const result=await ctx.db.query('InterviewSessionTable').filter(q=>q.eq(q.field('_id'),args.interviewRecordId)).collect();

        return result[0];
    }

    
})