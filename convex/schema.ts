import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    UserTable: defineTable({
        name: v.string(),
        imageUrl: v.string(),
        email: v.string(),
    }),
    InterviewSessionTable: defineTable({
        interviewQuestions: v.any(),
        resumeUrl: v.union(v.string(),v.null()),
        userId: v.id('UserTable'),
        status: v.string(),
        jobTitle: v.union(v.string(),v.null()),
        jobDescription: v.union(v.string(),v.null())
    })
})