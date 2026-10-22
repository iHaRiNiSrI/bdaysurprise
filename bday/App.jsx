import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Unlock,
  Heart,
  Sparkles,
  Key,
  Gift,
  Calendar,
  Clock,
  MapPin,
  PartyPopper,
  Flame,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  CheckCircle2,
  Star,
  Music,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

// ============================================================================
// 💖 EDIT YOUR CUSTOM BIRTHDAY CONTENT HERE
// ============================================================================
export const BIRTHDAY_DATA = {
  // 1. Recipient & Partner Names
  recipientName: "Umang",
  nickname: "Bachhhuuuu",
  senderName: "Yours Forever",
  vaultPassword: "harinilovesumang",

  // 2. Lock & Countdown Target
  // ⏰ CURRENTLY SET TO 00:00 SO IT IS ALREADY UNLOCKED FOR TESTING!
  // When ready for tonight: change hour to 23 and minute to 55 (11:55 PM)
  lockTarget: {
    hour: 0,
    minute: 0,
    customDate: null,
  },

  // 3. Chapter 1, 2, 3 Memory Timeline
  timelineTitle: "How Much I Love You",
  timelineSubtitle: "Three chapters of our story — from the day we met to forever",
  timeline: [
    {
      id: 1,
      stepNumber: 1,
      chapter: "Chapter 1",
      badge: "The Beginning",
      title: "How We First Met",
      date: "The Beginning of Us",
      location: "Where My World Changed",
      localPhotoUrl: "./photos/chapter1.jpg",
      fallbackUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      description: "Sometimes, I wonder what kind of magic brought me closer to you. 🥹❤️ There was something so special about you that slowly made my heart fall for you, even before I could understand what was happening. Little did I know that the person I was getting closer to would one day become such a beautiful and important part of my life. I never imagined that this little beginning would turn into something so precious, so meaningful, and so full of love. If someone had told me that day how special you would become to me, I would have smiled, but I could never have imagined just how deeply I would fall for you. ❤️✨"
    },
    {
      id: 2,
      stepNumber: 2,
      chapter: "Chapter 2",
      badge: "The Proposal 💍",
      title: "The Day I Proposed to You",
      date: "December 12, 2024",
      location: "The Moment You Said Yes 💍",
      localPhotoUrl: "./photos/chapter2.jpg",
      fallbackUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      description: "December 12, 2024 — I love youuu… as a friend, of courseee 🤭😂❤️ Don’t get too excited, mera bachhuuu 😚🫶🏻 Oh waittt, you said you love me more? Awww, someone’s in loveee 🤭💋❤️🧿"
    },
    {
      id: 3,
      stepNumber: 3,
      chapter: "Chapter 3",
      badge: "Forever & Always",
      title: "Where We Stand Today",
      date: "Here, With You, Always",
      location: "Right By Your Side",
      localPhotoUrl: "./photos/chapter3.jpg",
      fallbackUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      description: "And where we stand today? 🥹❤️ I’m so happy to have you in my life, my cutieee bachhuuu! 🫂💋 You’re the sweetest gift God has ever given me, and I’ll always be by your side, no matter what life brings us. On your happy days, your sad days, and even your grumpy bachhuu days 🤭😂, you’ll always have me. If I could go back to the beginning, I’d still choose you and fall for you all over again. I love you sooo much, my favourite human, my cutest baby, and my forever special person. ❤️🧿🫶🏻 Happy Birthday, my Baby, Umang."
    }
  ],

  // 4. Mystery Key & Wishes Game
  wishesGame: {
    title: "The Vault of Wishes for Umang",
    subtitle: "Four enchanted chests hold secrets of what I wish for you, Baby. Choose a key to unlock your destiny.",
    chests: [
      {
        id: 1,
        title: "Chest of Endless Joy",
        wishTitle: "Happiness & Peace",
        wishText: "My bachhuu, ❤️ May your life always be filled with happiness, peaceful days, and endless reasons to smile. Stay happy always, baby! 🫂💋",
        badge: "Pure Joy"
      },
      {
        id: 2,
        title: "Chest of Boundless Dreams",
        wishTitle: "Good Luck & Success",
        wishText: "My Umang, 🍀❤️ May luck follow you everywhere, your dreams come true, and success find you in everything you do. I believe in you, baby! 😚💋",
        badge: "Lucky Charm"
      },
      {
        id: 3,
        title: "Chest of Deep Devotion",
        wishTitle: "Endless Love & Togetherness",
        wishText: "Since December 12, 2024, you've been my sweetest blessing. ❤️ I'll always stand by your side, through every high and low. You're my favourite person, my bachhuu! 🧿🫶🏻",
        badge: "Forever Love"
      },
      {
        id: 4,
        title: "Chest of Hugs & Kisses",
        wishTitle: "Unlimited Cuddles & Baby Love",
        wishText: "My cutuuu bachhuu, 🥹💋 Sending you unlimited hugs, millions of kisses, and the tightest cuddles. I wish I could hold you close and never let go! 🫂❤️",
        badge: "Hugs & Kisses"
      }
    ]
  },

  // 5. Birthday Cake & Climax Wishes
  cakeSection: {
    title: "Make A Wish, Baby",
    subtitle: "Close your eyes, think of your biggest dream for this year, and blow out the candles!",
    birthdayMessage: `To my birthday boy, my Umang, my lovey-dovey bachhuu ❤️🎂💋

Happy Birthday to the most handsome, kind-hearted, and incredible boyfriend in the entire world! Umang, proposing to you on December 12, 2024, was my dream come true, and loving you every day is my greatest blessing. Today and every single day belongs to you, Baby. ❤️🧿

I don't think I'll ever have enough words to thank you for everything you do for me. Thank you for being there for me, for listening to me, for making me smile, and for being such a special part of my life. Thank you for all the little things you do that might seem ordinary to you but mean the whole world to me. I wish I could hug you really tight right now and tell you a million times how grateful I am to have you. And even after thanking you a million times, I would still have a million more thank-yous left. 🥹🫂❤️

Baby, I promise that I'll always try to make your birthdays as special as you are to me. I'll celebrate this beautiful day every year with all my heart because the day you were born is so important to me, too. It's the day the world received someone who would eventually become my favourite person, my happiness, and my sweetest blessing. I want to make you feel loved, spoiled, appreciated, and celebrated every single birthday. You deserve all the happiness in the universe, my bachhuu! 🎂🎁💋

And my cutuuu Umang, no matter how many birthdays pass, I hope you always remember that you have someone who believes in you, supports your dreams, celebrates your smallest achievements, and stands beside you through every high and low. I'll always be cheering for you, holding your hand, annoying you with my silly talks, stealing your kisses, and loving you in all my little ways. 🤭❤️🫶🏻

A tiny love note for you, baby 💌

If I could ask God for one gift today, it would be to keep you happy, healthy, peaceful, and smiling always. And if I could make one birthday wish for myself, it would be to celebrate many, many more birthdays with you, creating beautiful memories and watching you achieve everything your heart desires. I don't need a perfect love story; I just want our little story, with you and me choosing each other again and again. 🧿💗

Happy Birthday once again, my handsome boy, my favourite human, my lovey-dovey bachhuu! I hope this year brings you endless success, good luck, happiness, and all the beautiful things you deserve. May God always protect you and guide you. And whenever you need a hug, a kiss, a little comfort, or someone to remind you how amazing you are, remember that I'm always here for you.

I love you more than these words can ever explain. Happy Birthday, my baby. You will always be one of my favourite reasons to thank God. ❤️🫂💋

Forever your girl, your biggest cheerleader, and the person who will always want to make your birthday extra special. 💌🎀`
  },

  // 6. Background Music (Beethoven's Für Elise)
  audio: {
    title: "Für Elise",
    artist: "Ludwig van Beethoven",
    url: "./fur-elise.mp3",
    fallbackUrl: "https://archive.org/download/WoO59PocoMotoBagatelleInAMinorFurElise/FrEliseWoo59.mp3"
  }
};

// ============================================================================
// MAIN COMPONENT (SOFT PINK + DARK PINK HEARTS PALETTE)
// ============================================================================
export default function BirthdayApp() {
  const [currentPage, setCurrentPage] = useState(0);

  // Wishes Game State
  const [selectedChest, setSelectedChest] = useState(null);
  const [isWishesModalOpen, setIsWishesModalOpen] = useState(false);

  // Cake Climax State
  const [candlesBlown, setCandlesBlown] = useState(false);

  // Password Protection State
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);

  // Audio (Beethoven's Für Elise) State & Ref
  const audioRef = useRef(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((err) => {
        console.log("Audio autoplay prevented:", err);
        if (BIRTHDAY_DATA.audio.fallbackUrl && audioRef.current.src !== BIRTHDAY_DATA.audio.fallbackUrl) {
          audioRef.current.src = BIRTHDAY_DATA.audio.fallbackUrl;
          audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
        }
      });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentPage === 0) return;
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // --------------------------------------------------------------------------
  // Confetti Explosion
  // --------------------------------------------------------------------------
  const triggerCelebrationConfetti = () => {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FFF0F4', '#F43F5E', '#BE185D', '#DB2777', '#FFD700']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#BE185D', '#9D174D', '#F43F5E']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#FCE7F0', '#E11D48', '#FFD700']
    });
  };

  // --------------------------------------------------------------------------
  // Navigation Handlers
  // --------------------------------------------------------------------------
  const goToNextPage = () => {
    if (currentPage < 5) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUnlockVault = () => {
    setCurrentPage(1);
    triggerCelebrationConfetti();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlayingMusic(true);
          })
          .catch((err) => {
            console.warn("Audio play error, trying fallback:", err);
            if (BIRTHDAY_DATA.audio.fallbackUrl && audioRef.current.src !== BIRTHDAY_DATA.audio.fallbackUrl) {
              audioRef.current.src = BIRTHDAY_DATA.audio.fallbackUrl;
              audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
            }
          });
      }
    }
  };

  const handlePasscodeSubmit = (e) => {
    if (e) e.preventDefault();
    const cleanInput = passcode.trim().toLowerCase();
    const expected = (BIRTHDAY_DATA.vaultPassword || "harinilovesumang").toLowerCase();
    if (cleanInput === expected) {
      setPasscodeError("");
      handleUnlockVault();
    } else {
      setPasscodeError("Oops, incorrect passcode! Hint: Who loves Umang? ❤️");
    }
  };

  const handleChestClick = (chest) => {
    setSelectedChest(chest);
    setIsWishesModalOpen(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    triggerCelebrationConfetti();
    const end = Date.now() + 3 * 1000;
    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({
        startVelocity: 35,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, 300);
  };

  const pageNames = [
    "Vault Lock",
    "Chapter 1: Met",
    "Chapter 2: Proposed 💍",
    "Chapter 3: Today",
    "Vault of Wishes",
    "Birthday Cake 🎂"
  ];

  // Dark Pink Hearts scattered lightly across the background
  const backgroundHearts = [
    { top: '6%', left: '7%', size: 30, delay: '0s', opacity: 0.22 },
    { top: '14%', left: '88%', size: 36, delay: '1.2s', opacity: 0.20 },
    { top: '24%', left: '4%', size: 24, delay: '2.5s', opacity: 0.24 },
    { top: '32%', left: '92%', size: 32, delay: '0.8s', opacity: 0.22 },
    { top: '44%', left: '9%', size: 38, delay: '3.1s', opacity: 0.18 },
    { top: '52%', left: '85%', size: 26, delay: '1.9s', opacity: 0.24 },
    { top: '66%', left: '5%', size: 34, delay: '0.5s', opacity: 0.20 },
    { top: '74%', left: '91%', size: 38, delay: '2.7s', opacity: 0.18 },
    { top: '84%', left: '16%', size: 28, delay: '1.6s', opacity: 0.22 },
    { top: '92%', left: '80%', size: 32, delay: '3.4s', opacity: 0.20 },
    { top: '18%', left: '50%', size: 22, delay: '2.2s', opacity: 0.18 },
    { top: '60%', left: '46%', size: 26, delay: '0.9s', opacity: 0.19 },
    { top: '86%', left: '52%', size: 24, delay: '2.8s', opacity: 0.17 },
    { top: '38%', left: '78%', size: 22, delay: '1.4s', opacity: 0.20 },
    { top: '78%', left: '32%', size: 20, delay: '2.0s', opacity: 0.19 },
    { top: '10%', left: '30%', size: 24, delay: '3.0s', opacity: 0.16 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F4] via-[#FCE7F0] to-[#FFF5F8] text-[#4A0E2E] font-sans selection:bg-pink-500 selection:text-white relative flex flex-col justify-between overflow-x-hidden">
      {/* Background Ambient Glow & Dark Pink Hearts Lightly Scattered */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Pink Ambient Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300/35 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-rose-300/30 rounded-full blur-[150px]" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-pink-200/45 rounded-full blur-[160px]" />

        {/* Scattered Dark Pink Hearts */}
        {backgroundHearts.map((h, i) => (
          <div
            key={i}
            className="absolute text-[#9D174D] fill-[#9D174D] animate-pulse"
            style={{
              top: h.top,
              left: h.left,
              opacity: h.opacity,
              animationDelay: h.delay,
              animationDuration: '4.5s'
            }}
          >
            <Heart style={{ width: h.size, height: h.size }} />
          </div>
        ))}
      </div>

      {/* Hidden Audio Element for Beethoven's Für Elise */}
      <audio
        ref={audioRef}
        src={BIRTHDAY_DATA.audio.url}
        loop
        preload="auto"
        onPlay={() => setIsPlayingMusic(true)}
        onPause={() => setIsPlayingMusic(false)}
      />

      {/* ==================================================================== */}
      {/* TOP BAR / CONTROLS                                                   */}
      {/* ==================================================================== */}
      <header className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center space-x-2 text-[#9D174D]">
          <Heart className="w-5 h-5 fill-[#BE185D] text-[#BE185D] animate-pulse" />
          <span className="text-xs sm:text-sm tracking-widest font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#831843] to-[#BE185D]">
            For {BIRTHDAY_DATA.recipientName} ({BIRTHDAY_DATA.nickname})
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Music Player Button (Für Elise) */}
          <button
            onClick={toggleMusic}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all border shadow-sm ${isPlayingMusic
              ? 'bg-pink-100 text-[#9D174D] border-pink-400 shadow-[0_0_15px_rgba(190,24,93,0.25)]'
              : 'bg-white/80 text-[#831843] border-pink-200 hover:bg-white'
              }`}
            title="Play/Pause Beethoven's Für Elise"
          >
            <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? 'text-[#BE185D] animate-spin' : 'text-[#9D174D]'}`} />
            <span className="hidden sm:inline">{isPlayingMusic ? "Für Elise (Playing 🎹)" : "Play Für Elise 🎹"}</span>
            <span className="sm:hidden">{isPlayingMusic ? "Playing 🎹" : "Music 🎹"}</span>
          </button>
        </div>
      </header>

      {/* Floating Extreme-Edge Side Arrow: Previous (Centered in the vertical middle of the page) */}
      {currentPage > 1 && (
        <button
          onClick={goToPrevPage}
          className="fixed left-1 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-gradient-to-r hover:from-[#BE185D] hover:to-[#DB2777] text-[#BE185D] hover:text-white border-2 border-pink-300 hover:border-pink-400 shadow-[0_6px_20px_rgba(190,24,93,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
          title="Previous Page"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:-translate-x-0.5 transition-transform stroke-[2.5]" />
        </button>
      )}

      {/* Floating Extreme-Edge Side Arrow: Next / Replay (Centered in the vertical middle of the page) */}
      {currentPage >= 1 && (
        currentPage < 5 ? (
          <button
            onClick={goToNextPage}
            className="fixed right-1 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-gradient-to-r hover:from-[#BE185D] hover:to-[#DB2777] text-[#BE185D] hover:text-white border-2 border-pink-300 hover:border-pink-400 shadow-[0_6px_20px_rgba(190,24,93,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
            title="Next Page"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
          </button>
        ) : (
          <button
            onClick={() => { setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="fixed right-1 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-gradient-to-r hover:from-[#BE185D] hover:to-[#DB2777] text-[#BE185D] hover:text-white border-2 border-pink-300 hover:border-pink-400 shadow-[0_6px_20px_rgba(190,24,93,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
            title="Replay from Step 1"
            aria-label="Replay from Step 1"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:-rotate-45 transition-transform stroke-[2.5]" />
          </button>
        )
      )}

      {/* Extreme-Edge Right Arrow on Page 0 */}
      {currentPage === 0 && (
        <button
          onClick={handlePasscodeSubmit}
          className="fixed right-1 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-gradient-to-r hover:from-[#BE185D] hover:to-[#DB2777] text-[#BE185D] hover:text-white border-2 border-pink-300 hover:border-pink-400 shadow-[0_6px_20px_rgba(190,24,93,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer animate-pulse"
          title="Unlock Your Birthday Experience"
          aria-label="Unlock Your Birthday Experience"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
        </button>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 0: VAULT UNLOCK SCREEN WITH PASSWORD PROTECTION                */}
      {/* ==================================================================== */}
      {currentPage === 0 && (
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 text-center animate-fade-in my-auto">
          <div className="max-w-xl mx-auto space-y-6 sm:space-y-8">
            {/* Vault Icon with Soft Pink Aura */}
            <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F43F5E] to-[#BE185D] opacity-25 blur-2xl animate-pulse" />
              <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#FFF5F8] to-[#FFE4EE] border-2 border-pink-300 flex items-center justify-center shadow-[0_15px_35px_rgba(190,24,93,0.15)]">
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-[#BE185D] animate-bounce" />
              </div>
            </div>

            {/* Title & Romantic Subtitle */}
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-300/80 text-[#9D174D] text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#BE185D]" />
                <span>Protected Birthday Vault 🔐</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#831843] via-[#BE185D] to-[#9D174D]">
                Happy Birthday, <br />
                <span className="text-[#BE185D]">{BIRTHDAY_DATA.recipientName}</span>
              </h1>
              <p className="text-[#6B2D45] text-xs sm:text-sm md:text-base max-w-md mx-auto font-medium leading-relaxed px-2">
                A special birthday surprise has been prepared exclusively for you, my {BIRTHDAY_DATA.nickname}. Enter our secret passcode to unlock! ✨
              </p>
            </div>

            {/* Password Input & Glowing Unlock Button */}
            <form onSubmit={handlePasscodeSubmit} className="max-w-sm mx-auto space-y-3.5 pt-2 w-full">
              <div className="relative flex items-center">
                <input
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (passcodeError) setPasscodeError("");
                  }}
                  placeholder="Enter secret passcode..."
                  className="w-full px-5 py-3 sm:py-3.5 pr-12 rounded-full bg-white/95 border-2 border-pink-300 focus:border-[#BE185D] focus:ring-4 focus:ring-pink-200 outline-none text-[#4A0E2E] placeholder:text-pink-300 text-sm font-semibold shadow-inner text-center tracking-wider transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 p-1 text-[#BE185D] hover:opacity-80 transition-opacity"
                  title={showPasscode ? "Hide password" : "Show password"}
                  aria-label="Toggle password visibility"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>

              {passcodeError && (
                <p className="text-xs font-bold text-[#BE185D] bg-pink-100/90 py-1.5 px-3 rounded-full border border-pink-200 animate-bounce">
                  {passcodeError}
                </p>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full group relative inline-flex items-center justify-center px-6 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#E11D48] rounded-full shadow-[0_10px_35px_rgba(219,39,119,0.35)] hover:shadow-[0_15px_45px_rgba(219,39,119,0.55)] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Key className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-100 group-hover:rotate-12 transition-transform" />
                  <span>Unlock Your Birthday Experience</span>
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 ml-2 fill-white text-white group-hover:scale-125 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 1, 2, 3: INDIVIDUAL MEMORY CHAPTER PAGES                      */}
      {/* ==================================================================== */}
      {currentPage >= 1 && currentPage <= 3 && (
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 py-6 max-w-4xl mx-auto w-full animate-fade-in">
          {(() => {
            const item = BIRTHDAY_DATA.timeline[currentPage - 1];
            return (
              <div className="w-full space-y-6">
                {/* Chapter Progress Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-pink-100 border border-pink-300 text-[#9D174D] text-xs font-bold uppercase tracking-wider shadow-sm">
                    <Heart className="w-3.5 h-3.5 fill-[#BE185D] text-[#BE185D]" />
                    <span>{item.chapter} of 3 • {item.badge}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4A0E2E]">
                    {item.title}
                  </h2>
                </div>

                {/* Focused Memory Card */}
                <div className="bg-white/85 border border-pink-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(190,24,93,0.08)] backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Photo Frame */}
                  <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-pink-100 shadow-md border border-pink-200 group">
                    <img
                      src={item.localPhotoUrl || item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        if (item.fallbackUrl && e.target.src !== item.fallbackUrl) {
                          e.target.src = item.fallbackUrl;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E2E]/60 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[11px] font-bold text-[#831843] border border-pink-200">
                      {item.badge}
                    </div>
                  </div>

                  {/* Narrative & Details */}
                  <div className="space-y-4 text-left">
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-[#831843]">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#BE185D]" />
                        <span className="font-bold">{item.date}</span>
                      </div>
                      <div className="flex items-center text-xs text-[#B45309]">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#D97706]" />
                        <span className="font-semibold">{item.location}</span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-[#521731] leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {/* Action button inside card */}
                    <div className="pt-2">
                      <button
                        onClick={goToNextPage}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#E11D48] text-white font-bold text-sm shadow-[0_8px_20px_rgba(219,39,119,0.3)] hover:shadow-[0_12px_28px_rgba(219,39,119,0.45)] transition-all flex items-center justify-center space-x-2 hover:scale-105"
                      >
                        <span>{currentPage === 3 ? "Continue to Vault of Wishes" : "Next Chapter"}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </main>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 4: THE MYSTERY KEY & WISHES GAME                              */}
      {/* ==================================================================== */}
      {currentPage === 4 && (
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 py-6 max-w-5xl mx-auto w-full animate-fade-in">
          <div className="w-full space-y-6 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-[#9D174D] text-xs font-bold uppercase tracking-wider shadow-sm">
                <Key className="w-3.5 h-3.5 text-[#BE185D]" />
                <span>Step 4 of 5 • Destiny Game</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4A0E2E]">
                {BIRTHDAY_DATA.wishesGame.title}
              </h2>
              <p className="text-[#6B2D45] text-sm max-w-lg mx-auto font-medium">
                {BIRTHDAY_DATA.wishesGame.subtitle}
              </p>
            </div>

            {/* 4 Treasure Chests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
              {BIRTHDAY_DATA.wishesGame.chests.map((chest) => (
                <div
                  key={chest.id}
                  onClick={() => handleChestClick(chest)}
                  className="group relative cursor-pointer bg-white/85 border border-pink-200/90 hover:border-pink-400 rounded-3xl p-5 text-center shadow-[0_10px_25px_rgba(190,24,93,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(190,24,93,0.18)] flex flex-col items-center justify-between min-h-[240px]"
                >
                  <div className="w-full flex justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-pink-100 border border-pink-200 text-[#9D174D]">
                      Chest #{chest.id}
                    </span>
                  </div>

                  <div className="my-2 relative">
                    <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-xl group-hover:bg-pink-400/40 transition-all" />
                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FFF0F4] to-[#FCE7F0] border-2 border-pink-300 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                      <Gift className="w-8 h-8 text-[#BE185D] group-hover:rotate-6 transition-transform" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#4A0E2E] text-sm sm:text-base mb-1 group-hover:text-[#BE185D] transition-colors">
                      {chest.title}
                    </h3>
                    <p className="text-xs text-[#7C334E]">Unlock your destiny wish</p>
                  </div>

                  <div className="mt-3 w-full">
                    <span className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl bg-pink-50 border border-pink-200 text-xs font-bold text-[#9D174D] group-hover:bg-[#BE185D] group-hover:text-white group-hover:border-[#BE185D] transition-all">
                      <Key className="w-3.5 h-3.5 mr-1.5" />
                      Open Chest
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={goToNextPage}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#E11D48] text-white font-bold text-sm shadow-[0_8px_25px_rgba(219,39,119,0.35)] flex items-center space-x-2 transition-all hover:scale-105"
              >
                <span>Continue to Your Birthday Cake 🎂</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      )}

      {/* WISHES MODAL SUMMARY */}
      {isWishesModalOpen && selectedChest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#FFF5F8] border-2 border-pink-300 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsWishesModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-[#831843] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-100 border border-pink-300 text-[#9D174D] text-xs font-bold uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 fill-[#BE185D] text-[#BE185D]" />
                <span>Your Destiny Wish Revealed</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#4A0E2E]">
                {selectedChest.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#7C334E] mt-1 font-medium">
                You chose this chest, but all these wishes are woven into my heart for you, Umang:
              </p>
            </div>

            {/* Destiny Highlight Card */}
            <div className="relative mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#FCE7F0] to-[#FFE4EE] border-2 border-[#BE185D] shadow-[0_8px_25px_rgba(190,24,93,0.15)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#9D174D]">
                  ★ Unlocked Destiny Wish ★
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#BE185D] text-white font-bold">
                  {selectedChest.badge}
                </span>
              </div>
              <h4 className="text-xl font-bold text-[#4A0E2E] mb-2">
                "{selectedChest.wishTitle}"
              </h4>
              <p className="text-sm text-[#521731] leading-relaxed font-normal">
                {selectedChest.wishText}
              </p>
            </div>

            {/* Summary of ALL Wishes */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#9D174D] px-1 text-left">
                Every Wish From All 4 Chests
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BIRTHDAY_DATA.wishesGame.chests.map((chest) => {
                  const isSelected = chest.id === selectedChest.id;
                  return (
                    <div
                      key={chest.id}
                      className={`p-3.5 rounded-xl border text-left text-xs transition-all ${isSelected
                        ? 'bg-pink-100/90 border-[#BE185D] text-[#4A0E2E] font-bold shadow-sm'
                        : 'bg-white border-pink-200 text-[#6B2D45]'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#831843]">{chest.title}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#BE185D]" />}
                      </div>
                      <p className="line-clamp-2 text-[11px] leading-snug font-normal">
                        {chest.wishText}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setIsWishesModalOpen(false);
                  setCurrentPage(5);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#E11D48] text-white font-bold text-sm shadow-md hover:scale-105 transition-all"
              >
                Go to Birthday Cake 🎂 ➔
              </button>
              <button
                onClick={() => setIsWishesModalOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-[#831843] text-xs font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 5: THE CELEBRATION CLIMAX (VELVET ROSE CAKE)                 */}
      {/* ==================================================================== */}
      {currentPage === 5 && (
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 py-6 max-w-3xl mx-auto w-full text-center animate-fade-in">
          <div className="space-y-3 mb-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-[#9D174D] text-xs font-bold uppercase tracking-wider shadow-sm">
              <PartyPopper className="w-3.5 h-3.5 text-[#BE185D]" />
              <span>Step 5 of 5 • The Grand Climax</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#4A0E2E]">
              {BIRTHDAY_DATA.cakeSection.title}
            </h2>
            <p className="text-sm sm:text-base text-[#6B2D45] max-w-md mx-auto font-medium">
              {BIRTHDAY_DATA.cakeSection.subtitle}
            </p>
          </div>

          {/* Velvet Rose & Cream Cake */}
          <div className="relative mx-auto w-64 sm:w-72 h-64 sm:h-72 flex flex-col items-center justify-center mb-6">
            <div className="absolute bottom-4 w-52 h-10 rounded-full bg-rose-400/30 blur-2xl" />

            {/* Candles & Flames */}
            <div className="flex space-x-5 mb-2 relative z-20">
              {[1, 2, 3].map((candleIndex) => (
                <div key={candleIndex} className="flex flex-col items-center">
                  <div className="h-6 flex items-end">
                    {!candlesBlown ? (
                      <div className="w-3.5 h-5 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-pulse shadow-[0_0_15px_#F59E0B]" />
                    ) : (
                      <div className="w-1 h-3 bg-gray-400/60 rounded-full animate-fade-out" title="Smoke" />
                    )}
                  </div>
                  <div className="w-2.5 h-9 bg-gradient-to-b from-amber-200 via-rose-300 to-amber-200 rounded-sm shadow-md border-x border-amber-300/40" />
                </div>
              ))}
            </div>

            {/* Cake Top Tier - Velvet Rose & Whipped Cream */}
            <div className="relative z-10 w-36 h-14 bg-gradient-to-r from-[#6b0f2a] via-[#8c173b] to-[#6b0f2a] rounded-t-2xl border-t-4 border-rose-100 shadow-lg flex items-center justify-center">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs">🌹</span>
                <span className="text-[10px] font-bold text-rose-100 tracking-wider">Umang</span>
                <span className="text-xs">🌹</span>
              </div>
            </div>

            {/* Cake Middle Tier - Burgundy Velvet with Cream Piping */}
            <div className="relative z-10 w-48 h-16 bg-gradient-to-r from-[#500c20] via-[#70122e] to-[#500c20] border-t-2 border-rose-100/70 border-b-4 border-[#330814] shadow-md flex items-center justify-center">
              <div className="flex items-center space-x-1.5">
                <span className="text-amber-300 text-xs">✨</span>
                <span className="text-[11px] font-extrabold tracking-widest text-rose-100 uppercase">
                  Forever My Baby
                </span>
                <span className="text-amber-300 text-xs">✨</span>
              </div>
            </div>

            {/* Cake Base Tier - Double Velvet with Strawberry Cream Pearls */}
            <div className="relative z-10 w-60 h-16 bg-gradient-to-r from-[#6b0f2a] via-[#8c173b] to-[#6b0f2a] rounded-b-2xl border-t-2 border-rose-100/60 shadow-2xl flex items-center justify-center">
              <div className="flex space-x-3 items-center">
                <Heart className="w-4 h-4 fill-rose-300 text-rose-300" />
                <span className="text-xs">🍓</span>
                <Heart className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span className="text-xs">🍓</span>
                <Heart className="w-4 h-4 fill-rose-300 text-rose-300" />
              </div>
            </div>

            {/* Golden Mirror Cake Stand */}
            <div className="w-72 h-5 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 rounded-full shadow-[0_5px_20px_rgba(212,175,55,0.3)] -mt-1 border-t border-amber-200" />
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            {!candlesBlown ? (
              <button
                onClick={handleBlowCandles}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#BE185D] via-[#E11D48] to-[#F43F5E] text-white font-extrabold text-base shadow-[0_10px_35px_rgba(225,29,72,0.35)] hover:shadow-[0_15px_45px_rgba(225,29,72,0.55)] hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
              >
                <Flame className="w-5 h-5 text-yellow-200" />
                <span>Blow Out The Candles! 🎂</span>
              </button>
            ) : (
              <button
                onClick={triggerCelebrationConfetti}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#E11D48] text-white font-extrabold text-base shadow-[0_10px_35px_rgba(190,24,93,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 animate-bounce"
              >
                <PartyPopper className="w-5 h-5 text-pink-100" />
                <span>Pop More Confetti! 🎉</span>
              </button>
            )}
          </div>

          {/* Final Celebration Card Revealed After Blowing */}
          {candlesBlown && (
            <div className="p-6 sm:p-10 rounded-3xl bg-white/95 border-2 border-pink-300 shadow-[0_20px_60px_rgba(190,24,93,0.18)] animate-fade-in max-w-2xl mx-auto space-y-6 mb-8 backdrop-blur-md text-left">
              <div className="flex items-center justify-between border-b border-pink-200/80 pb-4">
                <div className="inline-flex items-center space-x-2 text-[#9D174D] font-serif text-sm sm:text-base font-bold">
                  <span className="text-xl">💌</span>
                  <span>A Letter Straight From My Heart</span>
                </div>
                <div className="flex space-x-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
              </div>

              <div className="text-[#4A0E2E] text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif space-y-4">
                {BIRTHDAY_DATA.cakeSection.birthdayMessage}
              </div>

              <div className="pt-4 border-t border-pink-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#831843] font-bold tracking-wider uppercase">
                  Forever with all my love ❤️
                </div>
                <button
                  onClick={() => { setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-pink-100 hover:bg-gradient-to-r hover:from-[#BE185D] hover:to-[#DB2777] text-[#831843] hover:text-white text-xs font-bold transition-all shadow-sm hover:scale-105"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Our Journey From Step 1</span>
                </button>
              </div>
            </div>
          )}
        </main>
      )}

    </div>
  );
}
