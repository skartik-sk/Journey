"use client"
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useMotionValueEvent } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Terminal, Code, Cpu, Database, Globe, ArrowDown, Star, TrendingUp, TrendingDown, Flag, ArrowUpRight } from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

const journeyData = [
  {
    date: "September 2022",
    title: "The Spark & B.Tech Beginnings",
    description: "Kicked off my B.Tech in CSE at UIT RGPV. Dove headfirst into web development, building my first React applications like Zen-talk to grasp state management and component-driven UI.",
    tools: ["React", "JavaScript", "HTML/CSS", "C++"],
    type: "Education & Learning",
    link: "https://github.com/skartik-sk/Zen-talk"
  },
  {
    date: "October 2022",
    title: "The DSA Grind & Competitive Programming",
    description: "Realized the power of core fundamentals. Started a relentless competitive programming journey focusing on time/space complexities and graph theory, eventually scaling up to 1730+ LeetCode solves and a 2-star CodeChef rating.",
    tools: ["C++", "Data Structures", "Algorithms"],
    type: "Placement Prep",
    link: "https://leetcode.com/u/skartik_sk/"
  },
  {
    date: "Late 2022",
    title: "React CRM & Early Web3 Curiosity",
    description: "Built a complete CRM dashboard to master complex data handling. Simultaneously got fascinated by decentralized networks and started writing my first Solidity smart contracts.",
    tools: ["React", "Node.js", "Solidity", "Ethers.js"],
    type: "Project",
    link: "https://github.com/skartik-sk/React-CRM"
  },
  {
    date: "February 2023",
    title: "Community Roots: DEVOIC",
    description: "Formally joined the DEVOIC technical community. Collaborated on frontend architectures and began a long-term engagement with peer developers, refining my collaborative coding skills.",
    tools: ["HTML5", "CSS3", "JavaScript", "Team Workflow"],
    type: "Community",
    link: "https://github.com/skartik-sk"
  },
  {
    date: "March 2023",
    title: "UI/UX & The Startup Mindset: E-Cell RGPV",
    description: "Joined E-Cell RGPV. Stepped into product strategy, UI/UX design, and startup consulting. Learned how to map user psychology to interface design using Figma and Framer to solve real business problems.",
    tools: ["Figma", "Framer", "Product Strategy", "Consulting"],
    type: "Design & Strategy",
    link: "https://www.linkedin.com/in/skartik-sk/"
  },
  {
    date: "Mid 2023",
    title: "Cross-Platform Hustle: AppHustle",
    description: "Pivoted into applied mobile software engineering. Architected 'AppHustle' using the Flutter framework, mastering declarative widget trees and application state management.",
    tools: ["Flutter", "Dart", "Firebase", "Android"],
    type: "Project",
    link: "https://github.com/skartik-sk/AppHustle"
  },
  {
    date: "August 2023",
    title: "Full-Stack Maturation: QuikPic",
    description: "Built 'QuikPic', a social media platform using Jetpack Compose (MVVM) for Android, backed by a robust MERN stack backend delivering 100+ req/sec API stability and boosting engagement by 15%.",
    tools: ["Jetpack Compose", "React", "Node.js", "MongoDB"],
    type: "Project",
    link: "https://skartik.xyz"
  },
  {
    date: "Late 2023",
    title: "Freelance Era & KnowFlow Backend",
    description: "Landed my first freelance clients. Spearheaded the backend architecture for the startup 'KnowFlow', designing data pipelines and delivering agency-grade code while managing stakeholder expectations.",
    tools: ["Next.js", "Tailwind", "GCP", "Express.js"],
    type: "Freelance",
    link: "https://skartik.notion.site/Portfolio-256bbe5ef54380e3b5dce3778f3f5bb6"
  },
  {
    date: "January 2024",
    title: "Open Source Scaling: Corecamp",
    description: "Contributed heavily to the 'corecamp-web' platform. Utilized strict TypeScript architectures to guarantee type safety across a vast codebase, solidifying my reputation as a reliable full-stack developer.",
    tools: ["TypeScript", "Next.js", "Prisma"],
    type: "Open Source",
    link: "https://github.com/skartik-sk/corecamp-web"
  },
  {
    date: "April 2024",
    title: "The Web3 Pivot: Solana & PoH",
    description: "Completed the Blueshift curriculum, mastering Solana's high-throughput architecture and the revolutionary Proof of History (PoH) consensus mechanism.",
    tools: ["Solana", "Cryptography", "Blockchain"],
    type: "Education / Web3",
    link: "https://learn.blueshift.gg"
  },
  {
    date: "July 2024",
    title: "Architecting DeFi: atomic-swap",
    description: "Engineered 'atomic-swap', an advanced TypeScript repository for trustless, cross-chain cryptocurrency exchanges. Implemented Hash Time Locked Contracts (HTLCs) and asynchronous RPC interactions.",
    tools: ["TypeScript", "Solidity", "Ethers.js", "Smart Contracts"],
    type: "Project",
    link: "https://github.com/skartik-sk/atomic-swap"
  },
  {
    date: "September 2024",
    title: "Blockchain Dev @ Aarambh Labs & Apna Hostel",
    description: "Joined Aarambh Labs to build Rust/Solana solutions. Concurrently engineered a massive Admin Dashboard and Flutter app for Apna Hostel, powered by Supabase, reducing manual admin efforts by 80%.",
    tools: ["Rust", "Supabase", "Flutter", "Next.js"],
    type: "Work History",
    link: "https://apna-hostal-admin-website.vercel.app"
  },
  {
    date: "October 2024",
    title: "Hackathon Golden Era: DASHH",
    description: "Pioneered DASHH, an award-winning decentralized ad platform. Secured 1st Place at Paris Blockchain Week (Bizzthon) and won $6,000+ across ETHIndia, Solana Radar, and Reclaim hackathons.",
    tools: ["Solana Blinks", "Reclaim Protocol", "zkTLS", "AI Agents"],
    type: "Hackathon Win",
    link: "https://dashh-eight.vercel.app"
  },
  {
    date: "November 2024",
    title: "Tech Lead @ Growth Square & Onchain Identity",
    description: "Promoted to Technical Team Manager at Devoic. Managed a team of 4+ engineers. Also launched my Web3-native 'Onchain Portfolio' to showcase transactions and decentralized projects.",
    tools: ["Leadership", "Agile", "Next.js", "Web3.js"],
    type: "Work History",
    link: "https://onchain-portfolio.vercel.app"
  },
  {
    date: "January 2025",
    title: "Micro-Frontends & Next.js Security",
    description: "Pushed robust security updates to the enterprise 'falcon' repo. Architected 'blinks-mini', a highly optimized micro-frontend to execute on-chain Solana transactions directly from Web2 platforms.",
    tools: ["Next.js", "React Server Components", "Tailwind", "PostCSS"],
    type: "Open Source",
    link: "https://github.com/skartik-sk/blinks-mini"
  },
  {
    date: "September 2025",
    title: "Intensive Placement Prep & CS Consolidation",
    description: "Synthesized 4 years of Computer Science theory. Conducted high-velocity revisions of advanced OS, DBMS, and network protocols, maximizing throughput for elite enterprise tech screenings.",
    tools: ["Operating Systems", "DBMS", "Computer Networks", "Advanced DSA"],
    type: "Placement Prep",
    link: "https://www.naukri.com/code360/profile/skartiksk"
  },
  {
    date: "November 2025",
    title: "Blueshift Dashboard Launch",
    description: "Launched a free, open-source learning platform tailored to help Web2 developers make the shift and build seamlessly on the Solana ecosystem.",
    tools: ["Solana", "TypeScript", "Next.js", "Anchor"],
    type: "Open Source",
    link: "https://learn.blueshift.gg"
  },
  {
    date: "December 2025",
    title: "Mag Task & Workflow Optimization",
    description: "Developed 'Mag Task', a streamlined task management application focused on improving daily workflows, utilizing React and robust state management.",
    tools: ["TypeScript", "React", "State Management"],
    type: "Project",
    link: "https://task-brain.netlify.app/"
  },
  {
    date: "Early 2026",
    title: "AI Agent Frameworks & WebSockets",
    description: "Pivoted research into AI integration, experimenting with Eliza Agent Frameworks and Node.js WebSockets to build autonomous, scalable real-time agents.",
    tools: ["AI Agents", "Eliza", "Node.js", "WebSockets"],
    type: "Learning & Research",
    link: "https://github.com/skartik-sk"
  },
  {
    date: "March 2026",
    title: "Deep Dive: Rust & Solana Turbin",
    description: "Exploring the bleeding edge of high-performance computing. Building robust uptime monitors and engineering 'Solana-turbin' to push the limits of network consensus.",
    tools: ["Rust", "Solana", "High-Performance Computing"],
    type: "Project",
    link: "https://github.com/skartik-sk/Solana-turbin"
  },
  {
    date: "May 2026",
    title: "Graduation & The Global Stage",
    description: "Successfully wrapping up my B.Tech in CSE. Transitioning into the global Web3 & IT industry, equipped with an exhaustive portfolio of full-stack, mobile, and decentralized architectures.",
    tools: ["Career Transition", "Global Networking"],
    type: "Education & Career",
    link: "https://x.com/skartik_sk"
  }
];
function getToolIcon(tool: string) {
  const t = tool.toLowerCase();
  if (t.includes('react') || t.includes('next') || t.includes('html') || t.includes('css') || t.includes('tailwind')) return <Globe size={12} />;
  if (t.includes('database') || t.includes('firebase') || t.includes('supabase')) return <Database size={12} />;
  if (t.includes('python') || t.includes('solidity') || t.includes('typescript') || t.includes('node') || t.includes('javascript') || t.includes('rust') || t.includes('c++')) return <Code size={12} />;
  if (t.includes('ai') || t.includes('openai') || t.includes('llm') || t.includes('langchain') || t.includes('ollama') || t.includes('anthropic')) return <Cpu size={12} />;
  return <Terminal size={12} />;
}

function Badge({ type }: { type: string }) {
  const config: Record<string, { icon: React.ReactNode }> = {
    Launch: { icon: <TrendingUp size={12} className="text-blue-500 dark:text-blue-400" /> },
    "Open Source": { icon: <Globe size={12} className="text-cyan-500 dark:text-cyan-400" /> },
    Experiment: { icon: <Cpu size={12} className="text-blue-400 dark:text-blue-300" /> },
    Learning: { icon: <Terminal size={12} className="text-blue-500/70 dark:text-blue-400/70" /> },
    Project: { icon: <Star size={12} className="text-blue-500 dark:text-blue-400" /> },
    Freelance: { icon: <Code size={12} className="text-cyan-500 dark:text-cyan-300" /> },
    Challenge: { icon: <TrendingDown size={12} className="text-red-500/70 dark:text-red-400/70" /> },
    Milestone: { icon: <Flag size={12} className="text-cyan-500 dark:text-cyan-400" /> },
  };

  const current = config[type] || { icon: <Flag size={12} className="text-blue-500 dark:text-blue-400" /> };

  return (
    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-200 font-medium backdrop-blur-md shadow-[0_0_10px_rgba(59,130,246,0.1)]">
      {current.icon}
      {type}
    </span>
  )
}

const Waterfall = () => {
  const [lines, setLines] = useState<{ delay: number, duration: number, left: number, height: number }[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines([...Array(15)].map(() => ({
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      left: Math.random() * 100,
      height: 15 + Math.random() * 30,
    })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-blue-500/40 dark:via-blue-500/50 to-transparent"
          style={{
            left: `${line.left}%`,
            height: `${line.height}vh`,
            top: '-50vh',
          }}
          animate={{
            y: ['0vh', '150vh'],
          }}
          transition={{
            repeat: Infinity,
            duration: line.duration,
            ease: "linear",
            delay: line.delay,
          }}
        />
      ))}
    </div>
  );
};

function TimelineCard({ item, isEven }: { item: typeof journeyData[0], isEven: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouched, setIsTouched] = useState(false);
  const { trigger } = useWebHaptics();

  // Use scrollYProgress of the dot itself to perfectly sync with the line.
  // The line tip is always at the center of the viewport.
  // So when the dot's center crosses the viewport's center, it's touched!
  const { scrollYProgress } = useScroll({
    target: dotRef,
    offset: ["center center", "end center"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0 && !isTouched) {
      setIsTouched(true);
      trigger(20); // Small haptic feedback
    } else if (latest <= 0 && isTouched) {
      setIsTouched(false);
    }
  });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className={`relative flex items-center md:justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Empty space for desktop alternating layout */}
      <div className="hidden md:block md:w-[45%]" />

      {/* Horizontal Beam from Dot to Card */}
      <motion.div
        animate={{
          scaleX: isTouched ? 1 : 0,
          opacity: isTouched ? [0, 1, 0] : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ originX: isEven ? 1 : 0 }}
        className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-blue-400 shadow-[0_0_15px_2px_rgba(59,130,246,0.8)] z-10 ${isEven ? 'right-1/2 w-[5%]' : 'left-8 md:left-1/2 w-8 md:w-[5%]'}`}
      />

      {/* Node on the timeline */}
      <motion.div
        ref={dotRef}
        animate={{
          scale: isTouched ? 1.3 : 0.6,
          backgroundColor: isTouched ? "#3b82f6" : "var(--dot-bg, #030712)",
          borderColor: isTouched ? "#ffffff" : "rgba(59,130,246,0.2)",
          boxShadow: isTouched ? "0 0 20px 4px rgba(59,130,246,0.8)" : "0 0 0px rgba(59,130,246,0)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-2 -translate-x-1/2 z-20 [--dot-bg:white] dark:[--dot-bg:#030712]"
      />

      {/* Content Card - Animation strictly tied to isTouched (line intersection) */}
      <motion.div
        animate={{
          opacity: isTouched ? 1 : 0.3,
          scale: isTouched ? 1 : 0.95,
          y: isTouched ? 0 : 20
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full pl-16 md:pl-0 md:w-[45%]"
      >
        <div
          onMouseMove={handleMouseMove}
          className="relative group rounded-2xl p-[2px] overflow-hidden"
        >
          {/* Default subtle border */}
          <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 rounded-2xl" />

          {/* Mouse Hover Border Glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 1), transparent 80%)`
            }}
          />

          {/* Line Impact Border Glow - Flashes exactly when the dot is touched by the line */}
          <motion.div
            animate={{ opacity: isTouched ? [0, 1, 0] : 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
            className={`absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500/20 to-blue-600 dark:to-transparent ${item.link ? 'shadow-[0_0_30px_rgba(59,130,246,0.5)]' : ''}`}
          />

          {/* Inner Card Body */}
          <div className="relative h-full bg-white dark:bg-[#030712] rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500 shadow-sm dark:shadow-none">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-500">{item.date}</span>
                <Badge type={item.type} />
              </div>

              {item.link && (
                <div className="relative overflow-hidden rounded-md">
                  <motion.a
                    animate={{
                      color: isTouched ? "#3b82f6" : "#94a3b8",
                      textShadow: isTouched ? "0 0 15px rgba(59,130,246,0.5)" : "0 0 0px rgba(59,130,246,0)"
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="relative z-10 inline-flex items-center gap-1.5 text-xs transition-colors group/link font-medium dark:text-slate-400 px-2 py-1"
                  >
                    View Project
                    <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </motion.a>
                  {/* Tail effect sweeping across the button */}
                  <motion.div
                    animate={{ left: isTouched ? ['-100%', '200%'] : '-100%' }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    className="absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent skew-x-12 z-0 pointer-events-none"
                  />
                </div>
              )}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 relative z-10 tracking-tight">{item.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mb-6 leading-relaxed relative z-10 font-light">{item.description}</p>

            {item.tools.length > 0 && (
              <div className="flex flex-wrap gap-2 relative z-10">
                {item.tools.map(tool => (
                  <span key={tool} className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 group-hover:border-blue-500/50 transition-colors">
                    {getToolIcon(tool)}
                    {tool}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const prevScale = useRef(0.5);
  const { trigger } = useWebHaptics();

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-200 selection:bg-blue-500/30 font-sans overflow-x-hidden transition-colors duration-300">
      {/* Premium Minimalist Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Subtle Grid - Adapts to Light/Dark */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        {/* Glowing Orbs - Single Tone (Blue/Cyan) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 dark:bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[10%] right-[-5%] w-[35%] h-[45%] rounded-full bg-cyan-300/10 dark:bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <Waterfall />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto z-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-600 dark:text-blue-300 mb-8 backdrop-blur-md cursor-default shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            Kartik&apos;s Portfolio
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6 leading-[1.1]">
            The <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-900 dark:from-white from-40% to-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">Journey</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
            Four years of building, failing, and learning. A continuous line of growth, documented through code and design.
          </p>

          {/* Hero Button with Falling Beam Effect */}
          <div className="relative inline-block mt-4">
            {/* Falling Beam */}
            <motion.div
              animate={{
                y: [-150, 0, 0],
                opacity: [0, 1, 0],
                scaleY: [0.5, 1, 0]
              }}
              transition={{
                duration: 2.5,
                times: [0, 0.2, 1], // Hits the button at exactly 0.2 (0.5s)
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "circOut"
              }}
              className="absolute -top-32 left-1/2 w-[4px] h-32 bg-gradient-to-b from-transparent via-blue-400 to-white blur-[1px] -translate-x-1/2 origin-bottom pointer-events-none z-20"
            />

            {/* Impact Glow */}
            <motion.div
              animate={{
                scale: [0.5, 0.5, 2.5, 0.5],
                opacity: [0, 0, 0.8, 0]
              }}
              transition={{
                duration: 2.5,
                times: [0, 0.2, 0.3, 1], // Syncs with beam hit at 0.2
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "circOut"
              }}
              onUpdate={(latest) => {
                const scale = latest.scale as number;
                if (scale > 0.6 && prevScale.current <= 0.6) {
                  trigger(20);
                }
                prevScale.current = scale;
              }}
              className="absolute top-0 left-1/2 w-32 h-16 bg-blue-400/50 blur-2xl -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-10"
            />

            {/* Button Wrapper for Custom Glow Animation */}
            <motion.div

              animate={{
                background: [
                  "linear-gradient(to bottom, rgba(59,130,246,0.1), rgba(59,130,246,0.1))",
                  "linear-gradient(to bottom, rgba(59,130,246,0.1), rgba(59,130,246,0.1))",
                  "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(59,130,246,0.8))",
                  "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(59,130,246,0.8))",
                  "linear-gradient(to bottom, rgba(59,130,246,0.1), rgba(59,130,246,0.1))"
                ],
                boxShadow: [
                  "0 0 0px rgba(59,130,246,0)",
                  "0 0 0px rgba(59,130,246,0)",
                  "0 0 30px rgba(59,130,246,0.6)",
                  "0 0 30px rgba(59,130,246,0.6)",
                  "0 0 0px rgba(59,130,246,0)"
                ]
              }}
              transition={{
                duration: 2.5,
                times: [0, 0.2, 0.3, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "circOut"
              }}
              className="relative z-30 p-[2px] rounded-full"
            >
              <a
                href="https://skartik.xyz"
                target="_blank"
                rel="noreferrer"
                className="block px-8 py-4 rounded-full bg-white dark:bg-[#030712] text-slate-900 dark:text-white font-medium hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Current Portfolio <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 text-blue-500/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Scroll to explore</span>
          <ArrowDown size={14} />
        </motion.div>
      </section>

      {/* GitHub-Style Glowing Timeline Section */}
      <section className="relative z-10 py-20 px-4 md:px-8">
        <div ref={containerRef} className="relative w-full max-w-5xl mx-auto pb-40">

          {/* Base Timeline Track */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-300 dark:bg-white/10 md:-translate-x-1/2" />

          {/* Animated Glowing Line - Intense Blue/Cyan with full shadow */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-[3px] bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 md:-translate-x-1/2 shadow-[0_0_15px_3px_rgba(59,130,246,0.8)] origin-top z-10"
          >
            {/* The glowing "head" of the line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 dark:bg-white shadow-[0_0_20px_4px_rgba(59,130,246,1)] border-2 border-blue-300" />
          </motion.div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-12 md:gap-20 pt-10">
            {journeyData.map((item, i) => (
              <TimelineCard key={i} item={item} isEven={i % 2 === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 text-center text-slate-500 dark:text-slate-600 text-xs border-t border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-[#030712]">
        <p>Built with Next.js, Framer Motion & Tailwind CSS.</p>
        <p className="mt-1">Designed for Kartik&apos;s Journey.</p>
      </footer>
    </main>
  );
}
