import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { 
  Globe, Shield, Zap, Heart, Users, CheckCircle, 
  TrendingUp, Award, Activity, Droplets, 
  Brain, Leaf, Share2, ArrowRight, Menu, X, QrCode,
  FileText, Search, Flame, Terminal, Lock,
  ChevronRight, Network, Cpu, Database
} from 'lucide-react';

// --- Custom Cursor ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.interactive')) {
        setIsHovering(true);
        document.body.classList.add('hovering-interactive');
      } else {
        setIsHovering(false);
        document.body.classList.remove('hovering-interactive');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('hovering-interactive');
    };
  }, []);

  return (
    <>
      <motion.div 
        id="cursor-dot"
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
      />
      <motion.div 
        id="cursor-ring"
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      />
    </>
  );
};

// --- Boot Sequence ---
const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const fullText = `> INITIALIZING UBNTU_MESH_V1.1.0...
> BYPASSING CENTRALIZED AUTH... [OK]
> ESTABLISHING P2P CONNECTIONS... [OK]
> VERIFYING LEDGER INTEGRITY... [OK]
> AI CONSENSUS: ONLINE
> PROTOCOL ACTIVE.`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 20);

    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return p + Math.floor(Math.random() * 15);
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] bg-base flex flex-col items-center justify-center p-8"
    >
      <div className="w-full max-w-3xl">
        <div className="font-mono text-neon-blue text-sm md:text-base whitespace-pre-wrap mb-8 min-h-[150px]">
          {text}<motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>_</motion.span>
        </div>
        
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-neon-blue"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "tween", ease: "linear" }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-white/50 uppercase tracking-widest">
          <span>SYS_BOOT</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Magnetic Button ---
const MagneticButton = ({ children, className, onClick }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- Components ---

const Navbar = ({ heroScore }: { heroScore: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-base/60 backdrop-blur-3xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-4 group interactive cursor-pointer">
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all duration-500">
            <Globe className="text-white group-hover:text-gold w-5 h-5 transition-colors duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm tracking-[0.3em] uppercase text-white">UBNTU_MESH</span>
            <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase">Protocol v1.1.0</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-12 text-[11px] font-mono tracking-[0.2em] uppercase text-white/50">
          <a href="#protocol" className="hover:text-white transition-colors interactive">Architecture</a>
          <a href="#ledger" className="hover:text-white transition-colors interactive">Ledger</a>
          <a href="#quests" className="hover:text-white transition-colors interactive">Quests</a>
        </div>

        <div className="flex items-center gap-4">
          <motion.div 
            key={heroScore}
            initial={{ scale: 1.2, filter: "brightness(2)" }}
            animate={{ scale: 1, filter: "brightness(1)" }}
            className="flex items-center gap-3 glass-panel px-6 py-2.5 rounded-full border border-gold/30 glow-gold"
          >
            <Zap className="text-gold w-4 h-4" />
            <span className="font-mono font-bold text-sm text-gold tracking-widest">{heroScore.toLocaleString()} XP</span>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ incrementScore }: { incrementScore: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20">
      {/* Deep Atmospheric Background */}
      <motion.div style={{ scale, opacity: 0.6 }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] bg-[radial-gradient(circle,rgba(229,169,60,0.08)_0%,rgba(0,0,0,0)_70%)] rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle,rgba(0,240,255,0.05)_0%,rgba(0,0,0,0)_70%)] rounded-full blur-[100px]" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 w-full px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/[0.01] backdrop-blur-xl text-white/70 text-[10px] font-mono uppercase tracking-[0.4em] mb-16"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
          Decentralized Impact Protocol
        </motion.div>

        <div className="relative w-full max-w-[1600px] mx-auto flex flex-col items-center">
          <motion.h1 
            style={{ y: y1 }}
            className="text-[15vw] md:text-[12vw] font-sans font-black leading-[0.75] tracking-tighter text-outline uppercase relative z-10 mix-blend-difference"
          >
            Empower
          </motion.h1>
          <motion.h1 
            style={{ y: y2 }}
            className="text-[16vw] md:text-[13vw] font-serif italic font-black leading-[0.75] tracking-tighter text-gradient-gold relative z-20 -mt-[6vw]"
          >
            The Unseen.
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mt-16 font-light leading-relaxed tracking-wide mix-blend-difference"
        >
          A self-replicating global engine funding the grassroots heroes of Cape Town. 
          No central authority. Pure code. Pure impact.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-8 mt-20"
        >
          <MagneticButton onClick={incrementScore} className="group relative px-10 py-5 bg-white text-base font-bold rounded-full overflow-hidden interactive">
            <div className="absolute inset-0 w-full h-full bg-gold transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            <span className="relative flex items-center justify-center gap-4 text-black tracking-[0.2em] uppercase text-xs">
              Initialize Node <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
            </span>
          </MagneticButton>
          <MagneticButton className="group px-10 py-5 bg-transparent border border-white/20 text-white rounded-full hover:border-gold transition-colors duration-500 flex items-center justify-center gap-4 tracking-[0.2em] uppercase text-xs interactive">
            View Ledger <Terminal className="w-4 h-4 text-white/50 group-hover:text-gold transition-colors" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Bottom Stats Rail */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-base/50 backdrop-blur-2xl"
      >
        <div className="max-w-[1600px] mx-auto px-6 py-5 flex flex-wrap justify-between items-center text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.2em]">
          <span className="flex items-center gap-3"><Network className="w-4 h-4 text-gold"/> 4,847 Active Nodes</span>
          <span className="hidden md:block text-white/10">|</span>
          <span className="flex items-center gap-3"><Shield className="w-4 h-4 text-gold"/> Zero PII Stored</span>
          <span className="hidden md:block text-white/10">|</span>
          <span className="flex items-center gap-3"><Lock className="w-4 h-4 text-gold"/> Escrow Locked</span>
          <span className="hidden md:block text-white/10">|</span>
          <span className="flex items-center gap-3"><Activity className="w-4 h-4 text-gold"/> 99.9% Uptime</span>
        </div>
      </motion.div>
    </section>
  );
};

const GiantTicker = () => {
  return (
    <div className="w-full bg-gold text-base py-8 overflow-hidden flex whitespace-nowrap transform -rotate-2 scale-110 relative z-20 shadow-[0_0_100px_rgba(229,169,60,0.3)]">
      <div className="animate-marquee-fast flex items-center">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 mx-6">
            <span className="font-sans font-black text-5xl md:text-7xl tracking-tighter uppercase text-black">NO MIDDLEMEN</span>
            <span className="font-serif italic font-black text-5xl md:text-7xl text-black/50">—</span>
            <span className="font-sans font-black text-5xl md:text-7xl tracking-tighter uppercase text-black">PURE CODE</span>
            <span className="font-serif italic font-black text-5xl md:text-7xl text-black/50">—</span>
            <span className="font-sans font-black text-5xl md:text-7xl tracking-tighter uppercase text-black">PURE IMPACT</span>
            <span className="font-serif italic font-black text-5xl md:text-7xl text-black/50">—</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BentoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.bento-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <section id="protocol" className="py-40 relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="mb-32 md:w-3/4">
          <h2 className="text-[10px] font-mono text-gold uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-gold" /> 01 // Architecture
          </h2>
          <h3 className="text-6xl md:text-8xl font-sans font-black tracking-tighter text-white leading-[0.85]">
            SYSTEMIC FAILURE REQUIRES <br/><span className="font-serif italic text-white/50 font-normal">Systemic Innovation.</span>
          </h3>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="bento-grid grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]"
        >
          {/* Large Feature Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bento-card md:col-span-8 md:row-span-2 glass-panel p-12 md:p-20 flex flex-col justify-between group overflow-hidden rounded-[2rem]"
          >
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] -mr-40 -mt-40 transition-transform group-hover:scale-150 duration-1000" />
            <div className="relative z-10">
              <QrCode className="w-16 h-16 text-gold mb-10 stroke-[1]" />
              <h4 className="text-5xl md:text-7xl font-sans font-black text-white mb-8 tracking-tighter leading-[0.9]">Zero-Friction<br/>Micro-Patronage.</h4>
              <p className="text-white/50 text-xl leading-relaxed max-w-2xl font-light">
                Scan a code on a recycling trolley, a hotel keycard, or a restaurant receipt. Give in 90 seconds. No app downloads. No account creation. Funds route directly to vetted community trusts.
              </p>
            </div>
            <div className="relative z-10 mt-16 flex flex-wrap gap-4">
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">SnapScan Active</span>
              </div>
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">Crypto Active</span>
              </div>
            </div>
          </motion.div>

          {/* Stat Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="bento-card md:col-span-4 glass-panel p-12 rounded-[2rem] flex flex-col justify-center overflow-hidden"
          >
            <div className="absolute -bottom-20 -right-20 text-[250px] font-black text-white/[0.02] pointer-events-none leading-none">180</div>
            <h5 className="text-gold font-mono text-[10px] uppercase tracking-[0.4em] mb-6">Waste Diverted</h5>
            <p className="text-8xl font-sans font-black text-white mb-6 tracking-tighter">180k<span className="text-4xl text-white/30">t</span></p>
            <p className="text-base text-white/50 font-light leading-relaxed">Annually by unpaid informal reclaimers in Cape Town.</p>
          </motion.div>

          {/* Stat Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="bento-card md:col-span-4 glass-panel p-12 rounded-[2rem] flex flex-col justify-center overflow-hidden"
          >
            <div className="absolute -bottom-20 -right-10 text-[250px] font-black text-white/[0.02] pointer-events-none leading-none">%</div>
            <h5 className="text-neon-blue font-mono text-[10px] uppercase tracking-[0.4em] mb-6">Admin Leakage</h5>
            <p className="text-8xl font-sans font-black text-white mb-6 tracking-tighter">&lt;4%</p>
            <p className="text-base text-white/50 font-light leading-relaxed">Hard-capped by legally enforceable MOU. Maximum efficiency.</p>
          </motion.div>

          {/* Wide Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="bento-card md:col-span-12 glass-panel p-12 md:p-16 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-r from-white/[0.02] to-gold/[0.05]"
          >
            <div className="flex-1">
              <h4 className="text-4xl font-serif italic font-bold text-white mb-6">The Triple Bottom Line</h4>
              <p className="text-white/50 font-light text-xl max-w-3xl leading-relaxed">For Corporates: Verified ESG impact, B-BBEE points, and transparent ROI reporting mapped directly to the blockchain.</p>
            </div>
            <MagneticButton className="px-10 py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gold transition-colors duration-300 whitespace-nowrap flex items-center gap-4 interactive">
              Corporate Portal <ChevronRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TerminalLedger = () => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const mockLogs = [
      "> INIT VERIFICATION SEQUENCE...",
      "> TX_HASH: 0x7f8a...9c21",
      "> SOURCE: ANON_DONOR_482",
      "> TARGET: NOMSA_K (ID: VERIFIED)",
      "> AMOUNT: R50.00",
      "> AI_CONSENSUS: 3/3 AGENTS AGREE",
      "> STATUS: FUNDS RELEASED TO ESCROW",
      "> GENERATING IMPACT REPORT...",
      "> SUCCESS."
    ];
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < mockLogs.length) {
        setLogs(prev => [...prev, mockLogs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="ledger" className="py-40 relative">
      <div className="absolute inset-0 bg-surface border-y border-white/[0.02] -skew-y-2 transform origin-top-left z-0" />
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-20 items-center relative z-10">
        <div className="lg:col-span-5">
          <h2 className="text-[10px] font-mono text-neon-blue uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-neon-blue" /> 02 // Absolute Transparency
          </h2>
          <h3 className="text-6xl md:text-8xl font-sans font-black tracking-tighter text-white leading-[0.85] mb-10">
            TRUST IS <br/><span className="font-serif italic text-white/50 font-normal">The Product.</span>
          </h3>
          <p className="text-white/50 text-xl mb-16 font-light leading-relaxed">
            Every rand is traceable. Every recipient is verified by community peers and AI consensus. 
            The ledger is public, append-only, and mathematically guaranteed. We don't ask for your trust; we prove it.
          </p>
          
          <ul className="space-y-8 font-mono text-xs tracking-[0.2em] uppercase text-white/70">
            <li className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5"><Lock className="w-4 h-4 text-neon-blue" /></div>
              Zero PII collected from donors.
            </li>
            <li className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5"><Users className="w-4 h-4 text-neon-blue" /></div>
              Multi-sig community trust wallets.
            </li>
            <li className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5"><Database className="w-4 h-4 text-neon-blue" /></div>
              Independent quarterly audits.
            </li>
          </ul>
        </div>

        {/* Terminal Window */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative bg-[#020408] rounded-3xl border border-white/10 p-10 font-mono text-sm overflow-hidden h-[600px] glow-blue shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-16 bg-white/[0.02] border-b border-white/5 flex items-center px-8 gap-4 backdrop-blur-md z-20">
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <span className="ml-6 text-[10px] tracking-widest text-white/30">live_ledger_stream.sh</span>
          </div>
          
          <div className="mt-16 space-y-4 text-neon-blue/80 tracking-wider relative z-10 text-base">
            {logs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={log?.includes('SUCCESS') ? 'text-white font-bold' : ''}
              >
                {log}
              </motion.div>
            ))}
            <motion.div 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-6 bg-neon-blue/80 inline-block mt-2 align-middle"
            />
          </div>
          <div className="scanline" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-10" />
        </motion.div>
      </div>
    </section>
  );
};

// --- 3D Tilt Card Component ---
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  const glareX = useTransform(x, [-100, 100], [100, 0]);
  const glareY = useTransform(y, [-100, 100], [100, 0]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className={`relative group ${className}`}
    >
      {children}
      {/* Glare Effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}
      />
    </motion.div>
  );
};

const QuestBoard = ({ incrementScore }: { incrementScore: () => void }) => {
  return (
    <section id="quests" className="py-40 relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-32">
          <h2 className="text-[10px] font-mono text-gold uppercase tracking-[0.4em] mb-8 flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-gold" /> 03 // Gamified Impact <span className="w-8 h-[1px] bg-gold" />
          </h2>
          <h3 className="text-6xl md:text-8xl font-sans font-black tracking-tighter text-white leading-[0.85] mb-10">
            YOUR LIFE IS <br/><span className="font-serif italic text-white/50 font-normal">The Interface.</span>
          </h3>
          <p className="text-white/50 text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Log healthy actions. Earn Hero Score (XP). Unlock real corporate sponsor funds for grassroots heroes. 
            When you get healthier, the world gets better.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 perspective-[1200px]">
          <TiltCard className="h-full">
            <QuestCard 
              icon={Activity} 
              title="10k Steps" 
              desc="Walk 10,000 steps today."
              reward="R5 Unlocked"
              xp="+50 XP"
              onClick={incrementScore}
            />
          </TiltCard>
          <TiltCard className="h-full">
            <QuestCard 
              icon={Droplets} 
              title="Hydration" 
              desc="Drink 8 glasses of water."
              reward="R2 Unlocked"
              xp="+25 XP"
              onClick={incrementScore}
            />
          </TiltCard>
          <TiltCard className="h-full">
            <QuestCard 
              icon={Share2} 
              title="Propagate" 
              desc="Share a hero's story."
              reward="Awareness"
              xp="+100 XP"
              onClick={incrementScore}
            />
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

const QuestCard = ({ icon: Icon, title, desc, reward, xp, onClick }: any) => {
  const [active, setActive] = useState(false);

  return (
    <div 
      className={`h-full relative glass-panel p-12 rounded-[2rem] cursor-pointer transition-all duration-500 transform-gpu interactive ${active ? 'border-gold/50 bg-gold/[0.02] shadow-[0_0_50px_rgba(229,169,60,0.1)]' : 'hover:border-white/20'}`}
      onClick={() => {
        if (!active) {
          setActive(true);
          onClick();
        }
      }}
      style={{ transform: "translateZ(40px)" }}
    >
      <div className="flex justify-between items-start mb-12">
        <div className={`p-5 rounded-2xl bg-white/5 border ${active ? 'border-gold/30 text-gold' : 'border-white/10 text-white'}`}>
          <Icon className="w-10 h-10 stroke-[1]" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold bg-gold/10 px-4 py-2 rounded-full border border-gold/20">{xp}</span>
      </div>
      <h4 className="text-4xl font-sans font-bold text-white mb-6 tracking-tight">{title}</h4>
      <p className="text-white/50 text-lg mb-12 font-light leading-relaxed">{desc}</p>
      
      <div className="flex items-center justify-between pt-8 border-t border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">REWARD: <span className="text-white/80">{reward}</span></span>
        {active ? (
          <CheckCircle className="w-8 h-8 text-gold" />
        ) : (
          <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">Accept &rarr;</span>
        )}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-base pt-40 pb-16 border-t border-white/5 relative z-10 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(229,169,60,0.05)_0%,transparent_70%)] pointer-events-none" />
    
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5">
              <Globe className="text-gold w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-base tracking-[0.3em] uppercase text-white">UBNTU_MESH</span>
          </div>
          <p className="text-white/40 text-lg max-w-lg leading-relaxed font-light mb-10">
            A decentralized, self-replicating global impact movement. 
            Built to fund the unseen, unpaid essential workers of our communities.
            Starting in Cape Town. Scaling to the world.
          </p>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold cursor-pointer transition-colors interactive">X</div>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold cursor-pointer transition-colors interactive">in</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-mono text-[10px] uppercase tracking-[0.4em] mb-10">Protocol</h4>
          <ul className="space-y-6 text-base text-white/40 font-light">
            <li><a href="#" className="hover:text-gold transition-colors interactive">Architecture</a></li>
            <li><a href="#" className="hover:text-gold transition-colors interactive">Public Ledger</a></li>
            <li><a href="#" className="hover:text-gold transition-colors interactive">Governance MOU</a></li>
            <li><a href="#" className="hover:text-gold transition-colors interactive">AI Agent Specs</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-mono text-[10px] uppercase tracking-[0.4em] mb-10">Action</h4>
          <ul className="space-y-6 text-base text-white/40 font-light">
            <li><a href="#" className="hover:text-gold transition-colors interactive">Corporate ESG Portal</a></li>
            <li><a href="#" className="hover:text-gold transition-colors interactive">Print QR Seeds</a></li>
            <li><a href="#" className="hover:text-gold transition-colors interactive">Join a Guild</a></li>
            <li><a href="#" className="hover:text-gold transition-colors interactive">Submit Innovation</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
        <p>CARDINAL RULES: THINK NO EVIL. DO NO EVIL. SPEAK NO EVIL. HEAR NO EVIL.</p>
        <p>v1.1.0 // DECENTRALIZED // ZERO PII</p>
      </div>
      
      <div className="mt-20 text-center">
        <h1 className="text-[12vw] font-sans font-black tracking-tighter text-white/[0.02] leading-none select-none pointer-events-none">
          HEROES INFINITE
        </h1>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [heroScore, setHeroScore] = useState(0);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem('heroScore');
    if (saved) setHeroScore(parseInt(saved, 10));
  }, []);

  const incrementScore = () => {
    const newScore = heroScore + 50;
    setHeroScore(newScore);
    sessionStorage.setItem('heroScore', newScore.toString());
  };

  return (
    <>
      <CustomCursor />
      <div className="noise-bg" />
      <AnimatePresence>
        {booting && <BootSequence onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      {!booting && (
        <div className="min-h-screen bg-base font-sans text-white selection:bg-gold selection:text-base">
          <Navbar heroScore={heroScore} />
          <Hero incrementScore={incrementScore} />
          <GiantTicker />
          <BentoGrid />
          <TerminalLedger />
          <QuestBoard incrementScore={incrementScore} />
          <Footer />
        </div>
      )}
    </>
  );
}
