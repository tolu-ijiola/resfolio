'use client';

import { useEffect, useState } from 'react';

type GreetingType = {
  title: string;
  descr: string;
};

const remarks = {
  morning: [
    "Time to turn that resume into a real site—because PDFs don’t have personality.",
    "Start your day by building your brand, not just drinking coffee.",
    "Sun’s up! So should your website.",
    "Morning energy = perfect time to polish that portfolio.",
    "Today’s forecast: 100% chance of personal growth.",
    "Why not impress HR *before* lunch?",
    "Early birds get the callbacks.",
    "Time to make your resume *actually* clickable.",
    "Add 'built my own site' to your wins before noon.",
    "Smells like coffee and ambition."
  ],
  afternoon: [
    "Your resume called—it wants a website upgrade.",
    "Afternoon slump? Build your dream potfolio instead.",
    "Make your resume scroll-worthy.",
    "Let’s turn that bullet list into a brand.",
    "Refresh your browser, refresh your career.",
    "Still working on that doc? Let’s make it a website.",
    "Lunch is over, now feed your goals.",
    "Slide your resume into the 21st century.",
    "Beat the afternoon crash with a resume glow-up.",
    "Give your skills the homepage they deserve."
  ],
  evening: [
    "Why scroll Netflix when you could scroll your own portfolio site?",
    "Your resume deserves a night out online.",
    "Build it tonight. Impress them tomorrow.",
    "Evenings are for ambition—not just reruns.",
    "Moonlight your way to a better career.",
    "Replace doomscrolling with goalscrolling.",
    "Give your resume a late-night lift.",
    "Wind down by leveling up.",
    "End the day with something you built.",
    "Sleep better knowing your website is live."
  ]
};

const Greeting = () => {
  const [greeting, setGreeting] = useState<GreetingType>({ title: '', descr: '' });

  useEffect(() => {
    const hour = new Date().getHours();
    let title = '';
    let options: string[] = [];

    if (hour < 12) {
      title = 'Good morning';
      options = remarks.morning;
    } else if (hour < 18) {
      title = 'Good afternoon';
      options = remarks.afternoon;
    } else {
      title = 'Good evening';
      options = remarks.evening;
    }

    const descr = options[Math.floor(Math.random() * options.length)];
    setGreeting({ title, descr });
  }, []);

  return (
    <div>
      <h2 className=" font-semibold">{greeting.title}</h2>
      <p className="text-xs text-muted-foreground">{greeting.descr}</p>
    </div>
  );
};

export default Greeting;
