'use client'

import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { SparklesCore } from "@/components/ui/sparkles";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FeatureCard from "@/components/ui/featured-card";
import PricingCard from "@/components/ui/pricing-card";
import StatCard from "@/components/ui/stat-card";
import StepCard from "@/components/ui/step-card";
import { ArrowRight, Globe, LockIcon, Upload } from "lucide-react";
import Image from "next/image";
import AnimatedCard from "@/components/ui/animated-card";

export default function Home() {
  return (
    <>
      <div className="relative text-sm min-h-screen">
        <BackgroundBeams className="absolute inset-0" />
        <div className="relative px-20 py-10 flex justify-between gap-8 items-center min-h-[70vh]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5 z-10"
          >
            <h1 className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-teal-800">
              <b>Turn your Resume</b> into a Portfolio in Minutes!
            </h1>
            <p className=" max-w-lg text-gray-600">Upload or create your resume and let our AI create a professional portfolio website for your needs.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size={'lg'} className="bg-gradient-to-r from-gray-900 to-teal-800 text-white h-12 w-40 hover:opacity-90 transition-all">
                Get Started
                <ArrowRight className="w-4 h-4 -rotate-45 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Image src="/hero.svg" alt="hero" width={1000} className="w-full h-full" height={1000} />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-teal-800/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-20">
        <Card className="border-0 bg-white backdrop-blur-sm">
          <CardContent>
            <div className="">
              <div className="mb-8">
                <AnimatedCard className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-6 md:mb-0">
                    <Badge className="bg-gradient-to-r from-teal-500 to-teal-800 text-white">BUILT FOR FREELANCERS</Badge>
                    <h2 className="text-4xl font-bold mt-2 ">
                      Experience that grows <br /> with your career
                    </h2>
                  </div>
                  <div className="max-w-md">
                    <p className="text-gray-600 text-sm">
                      Your portfolio grows with you. Whether you're new or experienced, our platform shows your work clearly and simply.
                    </p>
                  </div>
                </AnimatedCard>
              </div>

              <div className="grid w-full  gap-6">
                <HoverEffect
                  items={[
                    {
                      title: "Easy to use",
                      description: "Simply upload your resume and portfolio items. We'll handle the rest.",
                      icon: <Upload className="w-6 h-6" />
                    },
                    {
                      title: "Custom Domain",
                      description: "Get your own domain name for your portfolio website so you can share to others.",
                      icon: <Globe className="w-6 h-6" />
                    },
                    {
                      title: "Secure & Private",
                      description: "Your data is encrypted and protected. You control what to show.",
                      icon: <LockIcon className="w-6 h-6" />
                    }
                  ]}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative px-6 md:px-16 lg:px-24 mt-16 py-16 md:py-20">
        <div className="absolute inset-0 bg-primary " />
        <div className="relative z-10">
          <AnimatedCard className="mb-16">
            <h2 className="text-4xl font-bold text-white">
              How It Works?
            </h2>
          </AnimatedCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Upload Your Resume"
              description="Upload your resume in PDF or DOCX format. We'd extract your details to form the foundation of your portfolio."
              delay={100}
            />

            <StepCard
              number="2"
              title="Customize Your Portfolio"
              description="Select a theme that matches your style and edit your content. Easily edit and rearrange divs as needed."
              delay={200}
            />

            <StepCard
              number="3"
              title="Publish & Share"
              description="Once you're happy with your portfolio, publish it and share it with potential clients or employers."
              delay={300}
            />
          </div>
        </div>
      </div>

      <div className="relative px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <SparklesCore
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="absolute inset-0"
          particleColor="#0d9488"
        />
        <div className="relative z-10">
          <AnimatedCard className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-teal-500 to-teal-800 text-white">OUR IMPACT</Badge>
            <h2 className="text-4xl mt-2 max-w-2xl mx-auto font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-800">
              We've helped Freelancers, creators, and other professionals grow their careers.
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto mt-4">
              Hundreds of freelancers, creators, and professionals build portfolios that attract clients and employers, leads to exposure.
            </p>
          </AnimatedCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StatCard
              title=""
              value="10k"
              subtitle="Portfolio Created"
              delay={100}
            />

            <StatCard
              title=""
              value="1K+"
              subtitle="Users"
              delay={200}
            />

            <StatCard
              title=""
              value="94%"
              subtitle="Satisfaction Rate"
              delay={300}
            />
          </div>
        </div>
      </div>

      {/* <div className="px-6 md:px-16 lg:px-20 py-16">
        <div className="">
          <AnimatedCard className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-teal-500 to-teal-800 text-white">COMPARE PLANS</Badge>
            <h2 className="text-4xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-800">Pricing</h2>
          </AnimatedCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <PricingCard
              title="Free"
              price="$0.00/month"
              delay={100}
            />

            <PricingCard
              title="Premium"
              price="£9.99/month"
              isPrimary={true}
              delay={200}
            />
          </div>
        </div>
      </div> */}

      <div className="relative p-6 mx-20 my-8 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-teal-800" />
        <div className="relative z-10 flex justify-between items-center">
          <div className="rounded-2xl p-8">
            <AnimatedCard className="max-w-lg">
              <Badge className="bg-white text-teal-800">TRY IT NOW!</Badge>
              <h2 className="text-3xl font-bold mt-2 text-white mb-4">
                Ready to level up your payment process?
              </h2>
              <p className="text-white/80 mb-6">
                Join thousands of businesses streamlining payments, maximizing returns, and accelerating growth.
              </p>
            </AnimatedCard>
          </div>
          <div className="flex justify-center gap-2 p-8 flex-1">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size={"lg"} variant={'outline'} className=" bg-transparent text-white hover:text-primary">
                Get Started
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size={"lg"} className=" hover:bg-white" variant={'outline'}>
                Learn More <ArrowRight className="w-4 h-4 -rotate-45 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
