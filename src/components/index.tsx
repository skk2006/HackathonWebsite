import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Brain,
  Shield,
  Cpu,
  Globe,
  Heart,
  ShoppingCart,
  X,
  Clock,
  AlertTriangle,
  User,
  Mail,
  Phone,
  Sparkles,
  Database,
  Trophy,
  Zap,
  ChevronRight,
  Code,
  Target,
  Users,
  Lightbulb,
  Activity,
  ArrowRight,
} from "lucide-react";

/**
 * USER CONFIGURATION
 */
const REGISTRATION_EXTERNAL_LINK = "https://forms.gle/your-link-here";

// --- Professional Context Data ---

const OVERVIEW_TEXT =
  "Sri Krishna College of Engineering and Technology is conducting AI HACKFEST, an AI-based hackathon focused on innovation and problem-solving.The event is organized by the Department of Artificial Intelligence and Data Science.AI HACKFEST provides a platform for students to showcase their creativity and technical expertise.Participants collaborate to develop intelligent solutions using emerging AI technologies.The hackathon fosters learning, teamwork, and real-world application of AI concepts.";

const PROBLEM_STATEMENTS = [
  {
    id: 1,
    title: "Healthcare",
    icon: Heart,
    color: "#ff0066",
    desc: "Innovative solutions to improve patient care, medical services, and health monitoring using technology.Focus on digital health, fitness tracking, hospital systems, and faster diagnosis support.",
  },
  {
    id: 2,
    title: "Disaster Management",
    icon: Shield,
    color: "#00f2ff",
    desc: "Smart systems to predict, manage, and respond to natural or man-made disasters efficiently.Includes early warning alerts, rescue coordination, and real-time emergency communication.",
  },
  {
    id: 3,
    title: "Edu Tech",
    icon: Globe,
    color: "#00ff88",
    desc: "Technology-based ideas that make learning easier, smarter, and more interactive for students and teachers.Supports online learning, AI-based tutoring, skill development, and virtual classrooms.",
  },
  {
    id: 4,
    title: "Smart Cities",
    icon: Database,
    color: "#ffd700",
    desc: "Modern solutions to improve city life through smart technology and automation.Covers traffic control, waste management, smart lighting, public safety, and citizen services.",
  },
  {
    id: 5,
    title: "Energy Resource Management",
    icon: Zap,
    color: "#8000ffff",
    desc: "Tools and systems to monitor, reduce, and optimize energy and resource consumption effectively.Encourages sustainability through smart usage tracking, renewable integration, and efficiency management.",
  },
];

const TIMELINE = [
  {
    time: "Day 1 - 09:00 AM",
    event: "Inauguration",
    color: "#bc13fe",
  },
  {
    time: "Day 1 - 10.00 AM",
    event: "Hackathon Begins",
    color: "#00f2ff",
  },
  {
    time: "Day 1 - 11:30 AM to 12.00 PM",
    event: "First Round Evaluation",
    color: "#00ff88",
  },
  {
    time: "Day 1 - 12:00 PM to 01:00 PM",
    event: "Lunch Break",
    color: "#ff8800",
  },
  {
    time: "Day 1 - 03:30 PM to 04:00 PM",
    event: "Second Round Evaluation",
    color: "#ff0088",
  },
];

const INSTRUCTIONS = [
  {
    title: "Team Composition",
    desc: "Teams must consist of 2–4 members, with at least one female member mandatory.",
  },
  {
    title: "No Pre-Made Projects",
    desc: "Earlier or ready-made projects are not allowed.",
  },
  {
    title: "Fresh Development",
    desc: "Projects must be new and developed only for this hackathon.",
  },
  {
    title: "Two Rounds",
    desc: "The hackathon will be conducted in two rounds – Online and Offline.",
  },
  {
    title: "Round 1 (Online)",
    desc: "Idea / solution submission.",
  },
  {
    title: "Round 2 (Offline)",
    desc: "Only teams shortlisted from Round 1.",
  },
  {
    title: "Open-Source Allowed",
    desc: "Use of open-source tools, APIs, and AI frameworks is allowed with proper credit.",
  },
  {
    title: "Hardware",
    desc: "Teams must manage their own hardware (laptops, chargers, etc.).",
  },
  {
    title: "Presentation Time",
    desc: "Each team will get 5 minutes total (3 minutes presentation + 2 minutes Q&A).",
  },
  {
    title: "Disqualification",
    desc: "Plagiarism, rule violations, or misconduct will lead to disqualification; judges' and organizers' decisions are final.",
  },
];

// --- Sub-components ---

// Fix: Adding missing ProblemModal component definition
const ProblemModal = ({ item, onClose }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="relative w-full max-w-2xl bg-[#0a0a0c] border border-white/10 rounded-[3rem] p-10 md:p-16 overflow-hidden max-h-[90vh] overflow-y-auto"
      onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
    >
      <div className="absolute top-0 right-0 p-8">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>
      </div>

      <div className="relative z-10">
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-10">
          <item.icon size={40} style={{ color: item.color }} />
        </div>

        <h2 className="text-4xl md:text-5xl font-display font-black italic uppercase tracking-tighter mb-6">
          {item.title}
        </h2>

        <div
          className="h-1 w-20 mb-10 rounded-full"
          style={{ backgroundColor: item.color }}
        />

        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-10 italic">
          "{item.desc}"
        </p>

        <div className="space-y-6">
          <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-500">
            Technical Specifications
          </h4>
          <p className="text-gray-400 leading-relaxed text-lg">{item.detail}</p>
        </div>

        <div className="mt-16 flex flex-wrap gap-4">
          <button
            onClick={onClose}
            className="px-10 py-4 rounded-full bg-white text-black font-display font-black text-sm tracking-widest uppercase hover:bg-gray-200 transition-all"
          >
            Acknowledge Protocol
          </button>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 opacity-10 pointer-events-none">
        <item.icon size={300} style={{ color: item.color }} />
      </div>
    </motion.div>
  </motion.div>
);

const ProblemRow = ({ item, onClick, index }: any) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ x: 10, scale: 1.01 }}
    onClick={onClick}
    className="group relative w-full p-8 md:p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#bc13fe]/40 hover:bg-white/[0.04] transition-all cursor-pointer flex flex-col md:flex-row items-center gap-10 overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
      <item.icon size={180} strokeWidth={1} style={{ color: item.color }} />
    </div>
    <div className="relative z-10 flex-shrink-0 w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#bc13fe] transition-colors duration-500">
      <item.icon
        size={44}
        className="text-white group-hover:text-black transition-colors"
      />
    </div>
    <div className="relative z-10 flex-grow text-center md:text-left">
      <h3 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tighter flex items-center justify-center md:justify-start gap-4">
        {item.title}
        <Activity
          size={20}
          style={{ color: item.color }}
          className="animate-pulse"
        />
      </h3>
      <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-3xl group-hover:text-gray-200 transition-colors">
        {item.desc}
      </p>
    </div>
    <div className="relative z-10 hidden md:flex items-center gap-2 text-[#bc13fe] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
      View Specs <ArrowRight size={16} />
    </div>
  </motion.div>
);

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-1 h-1 bg-[#bc13fe] rounded-full blur-[1px]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export const MainApp = () => {
  const [activeItem, setActiveItem] = useState<any>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020105]">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#bc13fe] origin-left z-[200]"
        style={{ scaleX }}
      />

      {/* Navigation - Modern Stylish Top Bar */}
      <nav className="fixed top-0 left-0 w-full z-[150] px-8 py-4 flex justify-between items-center bg-[#020105]/80 backdrop-blur-3xl border-b border-white/5">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 group"
        >
          <Brain
            className="text-[#bc13fe] transition-transform duration-700 group-hover:rotate-[360deg]"
            size={28}
          />
          <span className="text-xl font-display font-black italic tracking-tighter uppercase">
            AI<span className="text-[#bc13fe]">HACKFEST</span>
          </span>
        </button>
        <div className="hidden lg:flex gap-10 text-[9px] font-bold tracking-[0.4em] uppercase">
          {[
            "Home",
            "Overview",
            "Problems",
            "Timeline",
            "Instructions",
            "Coordinators",
          ].map((name) => (
            <button
              key={name}
              onClick={() => scrollTo(name.toLowerCase())}
              className="text-gray-500 hover:text-white transition-all relative group"
            >
              {name}
              <motion.span
                className="absolute bottom-[-4px] left-0 h-[2px] bg-[#bc13fe]"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>
        <a
          href={REGISTRATION_EXTERNAL_LINK}
          target="_blank"
          className="px-8 py-2 rounded-full border border-[#bc13fe]/40 bg-[#bc13fe]/10 text-white font-black text-[9px] tracking-widest uppercase hover:bg-[#bc13fe] hover:text-black transition-all shadow-[0_0_20px_rgba(188,19,254,0.3)]"
        >
          Join AI HackFest
        </a>
      </nav>

      {/* Page 1: HOME - Joyful Hero */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-32 px-6 overflow-hidden"
      >
        <div className="stars" />
        <div className="retro-grid" />
        <FloatingParticles />

        <div className="relative z-30 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 inline-block px-5 py-2 rounded-full border border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] text-[9px] font-black tracking-[0.5em] uppercase"
          >
            National AI Protocol 2025
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[10rem] font-display font-black italic tracking-tighter leading-[0.8] mb-8 select-none"
          >
            AI
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bc13fe] via-[#00f2ff] to-[#ff0088] drop-shadow-[0_0_30px_rgba(188,19,254,0.5)]">
              HACKFEST
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-500 text-xs font-bold uppercase tracking-[0.6em] mb-16"
          >
            Architecting the Autonomous Future
          </motion.p>
        </div>

        <div className="relative z-30 w-full max-w-5xl flex flex-col md:flex-row gap-6">
          {[
            { r: "SILVER", a: "₹10,000", c: "#C0C0C0", i: Zap, t: "Architect" },
            {
              r: "GOLD",
              a: "₹15,000",
              c: "#FFD700",
              i: Trophy,
              t: "Visionary",
            },
            { r: "BRONZE", a: "₹5,000", c: "#CD7F32", i: Cpu, t: "Scripter" },
          ]
            .sort((a, b) => b.a.length - a.a.length)
            .map((prize, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="flex-1 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 text-center backdrop-blur-sm group"
                style={{ borderBottom: `4px solid ${prize.c}44` }}
              >
                <div className="p-4 bg-white/5 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <prize.i size={32} style={{ color: prize.c }} />
                </div>
                <h4
                  className="text-[10px] font-black tracking-[0.4em] mb-1"
                  style={{ color: prize.c }}
                >
                  {prize.r} PRIZE
                </h4>
                <p className="text-3xl font-display font-black text-white mb-2">
                  {prize.a}
                </p>
                <p className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">
                  {prize.t} Status
                </p>
              </motion.div>
            ))}
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-white/10"
        >
          <ChevronRight className="rotate-90" size={40} />
        </motion.div>
      </section>

      {/* Page 2: OVERVIEW - Single Column Linear */}
      <section
        id="overview"
        className="relative py-40 bg-[#020105] border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-display font-black italic uppercase tracking-tighter mb-8">
              OVERVIEW
            </h2>
            <div className="h-1 w-20 bg-[#bc13fe] mx-auto rounded-full" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl text-gray-400 font-light leading-snug tracking-tight text-center mb-24"
          >
            {OVERVIEW_TEXT}
          </motion.p>
          <div className="flex flex-col gap-6">
            {[
              {
                label: "Duration",
                val: "9 Hours On-Site",
                icon: Clock,
                desc: "An uninterrupted marathon of technical innovation and system architecture.",
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-center gap-8 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#bc13fe]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-[#bc13fe]" size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-display font-black text-white mb-1 uppercase tracking-tighter">
                    {item.val}
                  </h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 3: CHOOSE YOUR PROBLEM STATEMENT - One per Row */}
      <section
        id="problems"
        className="relative py-40 bg-[#020105] border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="mb-24 flex flex-col items-center text-center">
            <h2 className="text-5xl md:text-7xl font-display font-black italic uppercase tracking-tighter mb-4">
              CHOOSE YOUR{" "}
              <span className="text-[#00f2ff]">THEME</span>
            </h2>
            <p className="text-gray-500 font-bold tracking-[0.4em] uppercase text-[10px]">
              Navigate the Challenge Matrix
            </p>
            <div className="h-1 w-20 bg-[#00f2ff] mt-10 rounded-full" />
          </div>
          <div className="flex flex-col gap-10">
            {PROBLEM_STATEMENTS.map((item, idx) => (
              <ProblemRow
                key={item.id}
                item={item}
                index={idx}
                onClick={() => setActiveItem(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Page 4: EVENT TIMELINE - Animated Gradient Path */}
      <section
        id="timeline"
        className="relative py-40 bg-[#020105] border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-5xl md:text-7xl font-display font-black mb-32 text-center italic uppercase tracking-tighter">
            EVENT <span className="text-[#bc13fe]">TIMELINE</span>
          </h2>
          <div className="relative">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute left-[30px] top-0 w-[2px] bg-gradient-to-b from-[#bc13fe] via-[#00f2ff] to-[#ff0088]"
            />
            <div className="space-y-32">
              {TIMELINE.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="relative pl-24 group"
                >
                  <div
                    className="absolute left-[18px] top-[14px] w-6 h-6 rounded-full border-2 bg-[#020105] z-10 transition-all duration-700 group-hover:scale-[2] group-hover:shadow-[0_0_30px_white]"
                    style={{ borderColor: step.color }}
                  >
                    <div
                      className="absolute inset-1 rounded-full animate-pulse"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>
                  <div className="flex flex-col gap-4 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all">
                    <span
                      className="text-[10px] font-black tracking-[0.5em] uppercase"
                      style={{ color: step.color }}
                    >
                      {step.time}
                    </span>
                    <h4 className="text-3xl md:text-5xl font-display font-black text-white italic tracking-tighter">
                      {step.event}
                    </h4>
                    <p className="text-gray-500 text-lg font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Page 5: INSTRUCTIONS - Two Column Layout */}
      <section
        id="instructions"
        className="relative py-40 bg-[#020105] border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="mb-24 text-center">
            <h2 className="text-5xl md:text-7xl font-display font-black italic uppercase tracking-tighter mb-8 text-white">
              INSTRUCTIONS
            </h2>
            <div className="h-1 w-20 bg-[#00f2ff] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INSTRUCTIONS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex flex-col md:flex-row gap-6 items-start p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-[#00f2ff]/40 transition-all"
              >
                <div className="text-3xl font-display font-black text-[#00f2ff] opacity-20">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h4 className="text-xl font-display font-black mb-2 text-white uppercase tracking-tighter">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-base font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 6: EVENT COORDINATORS - Vertical List */}
      <section
        id="coordinators"
        className="relative py-40 bg-[#020105] border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-display font-black italic uppercase tracking-tighter">
              EVENT <span className="text-[#bc13fe]">COORDINATORS</span>
            </h2>
            <p className="text-gray-500 mt-6 font-bold tracking-[0.4em] uppercase text-[10px]">
              Command Center Units
            </p>
          </motion.div>
          <div className="flex flex-col gap-8">
            {[
              {
                name: "Sandhya",
                type: "Magenta",
                icon: User,
                color: "#bc13fe",
                contact: "+91 9597706453",
                email: "sandhya49@gmail.com",
                cIcon: Phone,
              },
              {
                name: "Prajwal Raj",
                type: "Cyan",
                icon: Mail,
                color: "#00f2ff",
                contact: "+91 6369505630",
                cIcon: Phone,
              },
              {
                name: "Priyanka",
                type: "Cyan",
                icon: Mail,
                color: "#00f2ff",
                contact: "+91 9025185296",
                cIcon: Phone,
              }
            ].map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, x: 10 }}
                className="flex flex-col md:flex-row items-center gap-10 p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <person.icon size={48} style={{ color: person.color }} />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <p
                    className="text-[10px] font-black tracking-[0.4em] mb-2 uppercase"
                    style={{ color: person.color }}
                  >
                    {person.role}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-display font-black text-white italic tracking-tighter mb-1">
                    {person.name}
                  </h3>
                  {person.email && (
                    <p className="text-gray-500 font-bold text-xs tracking-wider mb-4">
                      {person.email}
                    </p>
                  )}
                  {!person.email && <div className="mb-4" />}
                </div>
                <a
                  href={
                    person.cIcon === Phone
                      ? `tel:${person.contact}`
                      : `mailto:${person.contact}`
                  }
                  className="flex items-center gap-4 text-gray-500 font-bold hover:text-white transition-colors py-4 px-10 rounded-full bg-white/5 border border-white/5 group-hover:border-white/20"
                >
                  <person.cIcon size={20} style={{ color: person.color }} />{" "}
                  {person.contact}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTER NOW Button - Joyful Animation */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-6">
        <motion.button
          whileHover={{
            scale: 1.05,
            y: -5,
            boxShadow: "0 0 40px rgba(188,19,254,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/register")}
          className="w-full py-6 bg-black text-white border-2 border-[#bc13fe] font-display font-black text-xl tracking-[0.2em] rounded-3xl shadow-[0_0_20px_rgba(188,19,254,0.3)] hover:bg-[#bc13fe] hover:text-black transition-all uppercase flex items-center justify-center gap-4 group"
        >
          <Sparkles
            size={24}
            className="group-hover:rotate-12 transition-transform"
          />
          REGISTER NOW
        </motion.button>
      </div>

      <footer className="relative py-20 px-12 text-center bg-[#020105] border-t border-white/5 overflow-hidden">
        <FloatingParticles />
        <div className="relative z-10 opacity-40 hover:opacity-100 transition-opacity duration-1000">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Brain size={24} className="text-[#bc13fe]" />
            <span className="font-display font-black text-sm uppercase tracking-[0.5em]">
              NEURAL NEXUS '25
            </span>
          </div>
          <p className="text-[9px] tracking-[0.4em] font-black uppercase text-gray-500">
            Department of Artificial Intelligence & Data Science
          </p>
          <div className="mt-8 flex justify-center gap-8 text-[9px] font-bold uppercase tracking-widest text-gray-600">
            <span className="hover:text-white cursor-pointer transition-colors">
              Security Protocol
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              System Logs
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              AI Ethics
            </span>
          </div>
        </div>
      </footer>

      {/* Modal Render */}
      <AnimatePresence>
        {activeItem && (
          <ProblemModal item={activeItem} onClose={() => setActiveItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
