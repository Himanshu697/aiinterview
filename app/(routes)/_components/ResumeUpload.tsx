"use client"
import React from 'react'
import { FileUpload } from "@/components/ui/file-upload";

interface ResumeUploadProps {
  setFile: (file: File) => void;
}

function ResumeUpload({ setFile }: ResumeUploadProps) {
  const handleFileUpload = (files: File[]) => {
    // Take the first file since we only need one resume
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  )
}

export default ResumeUpload