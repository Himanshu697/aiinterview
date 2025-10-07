import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import axios from "axios";
import { aj } from "@/utils/arcjest";
import { currentUser } from "@clerk/nextjs/server";

// Initialize ImageKit
export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: NextRequest) {
    try {
        const user=await currentUser();
        console.log("API route called");
        
        const formData = await req.formData();
        console.log("FormData received");
        
        const file = formData.get('file') as File;
        const jobTitle = formData.get('jobTitle') as File;
        const jobDescription = formData.get('jobDescription') as File;
        const decision = await aj.protect(req, { userId:user?.primaryEmailAddress?.emailAddress?? '', requested: 5 });
        console.log("Arcjet decision", decision);

        //@ts-ignore
        if(decision?.reason?.remaining==0){
            return NextResponse.json({
                status:429,
                result:'You have exceeded your free tier limit. Please upgrade to continue using the service.'
            })
        }
        
        if (file) {
           
        
        
        console.log("file", file.name, file.size);
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const uploadResponse = await imagekit.upload({
            file: buffer,
            fileName: `upload-${Date.now()}.pdf`,
            isPrivateFile: false,
            useUniqueFileName: true,
        });
      
        console.log("Upload successful:", uploadResponse.url);
        
        // Call n8n webhook
        const result = await axios.post('http://localhost:5678/webhook/generate-interview-question', {
            resumeUrl: uploadResponse?.url
        });
        
        console.log(result.data);
        
        return NextResponse.json({
            questions: result.data?.text,
            url: uploadResponse.url,
            resumeUrl: uploadResponse.url ,
            status:200
             // Add this line - this was missing!
        });
   } else{
      const result = await axios.post('http://localhost:5678/webhook/generate-interview-question', {
            resumeUrl: null,
            jobTitle: jobTitle,
            jobDescription: jobDescription
        });
        
        console.log(result.data);
        
        return NextResponse.json({
            questions: result.data?.text,
            
            resumeUrl: null // Add this line - this was missing!
        });

   } 
        
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}