"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Hero() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center overflow-hidden">
      {/* Background gradients for a futuristic/3D feel */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 -left-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 blur-3xl" />
        <div className="absolute bottom-0 -right-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 blur-3xl" />
      </div>

      <div className="px-4 py-10 md:py-20 relative z-10">
        <h1 className="relative z-10 mx-auto max-w-5xl text-center text-3xl font-bold text-slate-700 md:text-5xl lg:text-7xl dark:text-slate-100 leading-tight">
          {"Unlock Your Digital Persona with "
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.08, // Slightly faster animation
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          <motion.span
            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.3,
              delay: 2.2, // Delay for the brand name
              ease: "easeInOut",
            }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 inline-block ml-2" // Gradient for brand name
          >
            AvatarPrepAI
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }} // Adjusted delay
          className="relative z-10 mx-auto max-w-2xl py-6 text-center text-lg font-normal text-neutral-600 dark:text-neutral-300"
        >
          Create stunning 3D avatars, prepare for virtual worlds, and bring your digital identity to life with cutting-edge AI technology.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }} // Adjusted delay
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href={'/create-avatar'}> {/* Link to avatar creation page */}
            <Button size={'lg'} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
              Start Creating Your Avatar
            </Button>
          </Link>
          <Link href={'/features'}> {/* Link to features or demo page */}
            <Button variant="outline" size={'lg'} className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20">
              Learn More
            </Button>
          </Link>
        </motion.div>

        {/* Video demonstration section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.2 }} // Adjusted delay
          className="relative z-10 mt-20 rounded-3xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 p-6 shadow-xl overflow-hidden"
          style={{
            // Optional: Add a subtle 3D tilt effect or shadow
            transform: 'perspective(1000px) rotateX(2deg)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2), 0 0 100px rgba(70, 0, 255, 0.1)',
          }}
        >
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700">
            {/* Placeholder for your video. Replace the src with your actual video embed URL.
                For YouTube, you'd use something like:
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
                    title="AvatarPrepAI Demo" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
                
                For a direct video file in your public folder:
                <video controls className="w-full h-full object-cover">
                  <source src="/path/to/your-demo-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
            */}
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-800 to-purple-800 text-white text-xl font-bold">
              <p>Your AvatarPrepAI Demo Video Here</p>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">See how easy it is to create your perfect digital avatar!</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;