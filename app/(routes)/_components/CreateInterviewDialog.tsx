import React, { useContext, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResumeUpload from './ResumeUpload'
import JobDescription from './JobDescription'
import { DialogClose } from '@radix-ui/react-dialog'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function CreateInterviewDialog() {
    const [formData, setFormData] = useState<any>();
    const [file, setFile] = useState<File | null>();
    const [loading, setLoading] = useState(false);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const saveInterviewQuestion = useMutation(api.Interview.saveInterviewQuestion);
    const router=useRouter();

    const onHandleInputChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }))
    }

    const onSubmit = async () => {
        
        
        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('file', file ?? '');
        formDataToSend.append('jobTitle', formData?.jobTitle)
        formDataToSend.append('jobDescription', formData?.jobDescription)

        
        try {
            const res = await axios.post('/api/generate-interview-question', formDataToSend);
            console.log("API Response:", res.data);

            if(res?.data?.status===429){
                toast.warning(res?.data?.result)
                console.log(res?.data?.result);
                return;
            }    
            
            // Check if we have the required data
            if (!res.data?.questions || !res.data?.resumeUrl) {
                console.error("Missing required data from API response");
                return;
            }
            
            // Save to Database
            const interviewId = await saveInterviewQuestion({
                questions: res.data?.questions,
                resumeUrl: res?.data.resumeUrl ?? '',  // This should now be available
                uid: userDetail?._id ,
                jobTitle: formData?.jobTitle ?? '',
                jobDescription: formData?.jobDescription ?? ''
            });
            
          
          router.push('/start-interview/'+interviewId);  
        } catch (e) {
            console.error("Error in onSubmit:", e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button>+ Create Interview</Button>
            </DialogTrigger>
            <DialogContent className='min-w-3xl'>
                <DialogHeader>
                    <DialogTitle>Please submit following details.</DialogTitle>
                    <DialogDescription>
                        <Tabs defaultValue="resume-upload" className="w-full mt-5">
                            <TabsList>
                                <TabsTrigger value="resume-upload">Resume Upload</TabsTrigger>
                                <TabsTrigger value="job-description">Job Description</TabsTrigger>
                            </TabsList>
                            <TabsContent value="resume-upload">
                                <ResumeUpload setFile={(file: File) => setFile(file)} />
                            </TabsContent>
                            <TabsContent value="job-description">
                                <JobDescription onHandleInputChange={onHandleInputChange} />
                            </TabsContent>
                        </Tabs>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex gap-6'>
                    <DialogClose>
                        <Button variant={'ghost'}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={onSubmit} disabled={loading || !file || !userDetail?._id}>
                        {loading && <Loader2Icon className='animate-spin' />} Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateInterviewDialog