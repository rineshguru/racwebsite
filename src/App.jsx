import React, { useState, useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Menu, X, Droplets, Video, BookOpen, Crown,
  Shield, Swords, MapPin, Phone, Mail, ChevronRight,
  ChevronDown, Flame, Zap, Heart, Users, Globe, Target, Gamepad2, Award,
  Image as ImageIcon, Play, Trash2, UploadCloud, Lock, User, Plus, LogOut,
  Instagram, Linkedin, Eye, EyeOff, FileText, Download, Edit3, MessageCircle
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// --- CUSTOM CURSOR INJECTION (ROTARACT THEME) ---

const RotaractCursor = () => {
  const cursorRef = useRef(null);
  const requestRef = useRef(null);

  // Physics State
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isFirstMove = useRef(true);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };

      if (isFirstMove.current) {
        mouse.current = { x: e.clientX, y: e.clientY };
        isFirstMove.current = false;
      }
    };

    const handleMouseOver = (e) => {
      const t = e.target;
      if (
        t.tagName.toLowerCase() === 'button' ||
        t.tagName.toLowerCase() === 'a' ||
        t.closest('button') ||
        t.closest('a') ||
        t.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Minimal Kinematics Engine
    const animate = () => {
      mouse.current.x += (target.current.x - mouse.current.x) * 0.4;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.4;

      if (cursorRef.current && !isFirstMove.current) {
        cursorRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body * {
            cursor: none !important;
          }
        }
      `}</style>

      <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
        {/* Crisp Layer: The Rotaract Wheel */}
        <div
          ref={cursorRef}
          className="absolute top-0 left-0 will-change-transform flex items-center justify-center pointer-events-none"
          style={{
            width: isHovering ? '64px' : '32px',
            height: isHovering ? '64px' : '32px',
            marginLeft: isHovering ? '-32px' : '-16px',
            marginTop: isHovering ? '-32px' : '-16px',
            transition: 'width 0.3s ease-out, height 0.3s ease-out, margin 0.3s ease-out'
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className={`w-full h-full drop-shadow-md transition-all duration-300 ${isHovering ? 'animate-[spin_3s_linear_infinite] opacity-40 scale-110' : 'animate-[spin_10s_linear_infinite] opacity-100 scale-100'}`}
          >
            {/* Solid white backing to ensure legibility */}
            <circle cx="50" cy="50" r="42" fill="white" className="transition-opacity duration-300" />

            {/* 6 Spokes */}
            <g stroke="#ce1d53" strokeWidth="5.5" strokeLinecap="round">
              <line x1="50" y1="12" x2="50" y2="88" />
              <line x1="17" y1="31" x2="83" y2="69" />
              <line x1="17" y1="69" x2="83" y2="31" />
            </g>

            {/* 24 Outer Cogs (Dash array precisely calculated for accurate gear teeth) */}
            <circle cx="50" cy="50" r="46" stroke="#ce1d53" strokeWidth="6" fill="none" strokeDasharray="6 6.04" />

            {/* Outer Rim */}
            <circle cx="50" cy="50" r="41" stroke="#ce1d53" strokeWidth="5" fill="none" />

            {/* Inner Rim */}
            <circle cx="50" cy="50" r="22" stroke="#ce1d53" strokeWidth="5" fill="white" />

            {/* Keyway */}
            <circle cx="50" cy="50" r="8" fill="white" />
            <circle cx="50" cy="50" r="8" stroke="#ce1d53" strokeWidth="2.5" fill="none" />
            <rect x="47.5" y="39" width="5" height="6" fill="white" />
          </svg>

          {/* Central dot on hover to act as absolute center pointer */}
          <div className={`absolute w-1.5 h-1.5 bg-[#ce1d53] rounded-full transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
    </>
  );
};

// ============================================================================
// 🖼️ GLOBAL CONFIGURATION & IMAGES
// Easily replace image URLs and data arrays here without searching the code.
// ============================================================================

const SITE_IMAGES = {
  // Main Branding Assets
  logo: "/assets/Colour.png",
  teamGroupPhoto: "/assets/Flame 2.jpg",

  // Graceful Fallback Images (used automatically if an image link breaks)
  fallbackPortrait: "/assets/IMG_7729.jpg",
  fallbackGeneral: "/assets/Flame 1.jpg",
  fallbackLarge: "/assets/Orientation 2.JPG",

  // Re-integrated sharedGridImages for global access
  sharedGridImages: [
    "/assets/logo/1.jpg",
    "/assets/logo/2.jpg",
    "/assets/logo/3.jpg",
    "/assets/logo/4.jpg",
    "/assets/logo/10.jpg",
    "/assets/logo/6.jpg",
    "/assets/logo/7.jpg",
    "/assets/logo/8.jpg",
    "/assets/logo/9.jpg",
    "/assets/logo/5.jpg",
    "/assets/logo/1.jpg",
    "/assets/logo/2.jpg",
    "/assets/logo/3.jpg",
    "/assets/logo/4.jpg",
    "/assets/logo/10.jpg",
    "/assets/logo/6.jpg",
    "/assets/logo/7.jpg",
    "/assets/logo/8.jpg",
    "/assets/logo/9.jpg",
    "/assets/logo/5.jpg",
  ]
};

// ----------------------------------------------------------------------------
// 🐉 DRAGON CLAN (BOARD MEMBERS) - CENTRALIZED ROSTER
// Easily replace images and social links in these individual fields.
// ----------------------------------------------------------------------------
const boardMembers = [
  { name: "Rtr RINESH GURU S", avatar: "DRAGON", role: "President", image: "/assets/BM/1.jpg", instagram: "https://www.instagram.com/rinesh_guru?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/rineshguru/" },
  { name: "Rtr SIVASHANKARAN R", avatar: "SPARK", role: "Vice President", image: "/assets/BM/11.jpg", instagram: "https://www.instagram.com/shiva_spark_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/siva-shankaran/" },
  { name: "Rtr SIVASUBRAMANIAN G", avatar: "LION", role: "Immediate Past President", image: "/assets/BM/28.jpg", instagram: "https://www.instagram.com/siva_subramanian_1909?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/sivasubramanian19/" },
  { name: "Rtr PP SRIRAM BHARANI M", avatar: "OG", role: "Club Advisor", image: "/assets/BM/22.jpg", instagram: "https://www.instagram.com/idesigner.psd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/sriram-bharani-m-681347153/" },
  { name: "Mr NAGARASAN M", avatar: "MASTER", role: "Staff Coordinator", image: "/assets/BM/23.jpg", instagram: "https://www.instagram.com/m.nagarasan_cs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/nagarasan-m-a69537203/" },
  { name: "Rtr JOTHIMANI G", avatar: "PEACOCK", role: "Secretary Administration", image: "/assets/BM/27.jpg", instagram: "https://www.instagram.com/jothi_jsnx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/jothimani-g-1184b932a/" },
  { name: "Rtr SAMSON DURAI S", avatar: "KRAKEN", role: "Secretary Communication", image: "/assets/BM/25.jpg", instagram: "https://www.instagram.com/samson_durai_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/samson-durai13/" },
  { name: "Rtr PRASANNA T", avatar: "DARK LORD", role: "Sergeant at Arms", image: "/assets/BM/24.jpg", instagram: "https://www.instagram.com/cool_pk_dude?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/prasanna-t-95022827b/" },
  { name: "Rtr ELAVARASI MURUGAPILLAI", avatar: "ASTRA", role: "Treasurer", image: "/assets/BM/26.jpg", instagram: "https://www.instagram.com/hairin_.princy/?utm_source=ig_web_button_share_sheet", linkedin: "https://www.linkedin.com/in/elavarasimurugappillai/" },
  { name: "Rtr GOKUL VM", avatar: "FALCON", role: "All Avenue Director", image: "/assets/BM/4.jpg", instagram: "https://www.instagram.com/travel_lover_vmg?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/gokulvm/" },
  { name: "Rtr DHANUSHKOODI M", avatar: "SIMBA", role: "Club Service Director", image: "/assets/BM/3.jpg", instagram: "https://www.instagram.com/dk_dhanush34?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/dhanush-koodi-b2a20b346/" },
  { name: "Rtr KALEESWARAN S", avatar: "HAWKEYE", role: "Community Service Director", image: "/assets/BM/2.jpg", instagram: "https://www.instagram.com/kalees_shanmugam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/kalees-shanmugam-561801377/" },
  { name: "Rtr SRI VARSHINI V", avatar: "PHOENIX", role: "Professional Service Director", image: "/assets/BM/21.jpg", instagram: "https://www.instagram.com/vxrshzzz_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/srivarshini552006/" },
  { name: "Rtr MEHA SREE K", avatar: "NOAH", role: "International Service Director", image: "/assets/BM/5.jpg", instagram: "https://www.instagram.com/xeha_.5?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/meha-sree-kalidoss-3685a9370/" },
  { name: "Rtr SIVAGNANA SUBHA G", avatar: "FLAMINGO", role: "District Priority Projects Chair", image: "/assets/BM/6.jpg", instagram: "https://www.instagram.com/xsubzz4__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "" },
  { name: "Rtr ROHITH S", avatar: "OMEN", role: "Designer", image: "/assets/BM/16.jpg", instagram: "https://www.instagram.com/rohith_yg?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/rohith-s-2004sep18/" },
  { name: "Rtr IBRAHIM A", avatar: "CHEETAH", role: "Associate Designer", image: "/assets/BM/17.jpg", instagram: "https://www.instagram.com/_ik_beast_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "" },
  { name: "Rtr ELAVARASAN R V", avatar: "VORTEX", role: "Associate Designer", image: "/assets/BM/18.jpg", instagram: "https://www.instagram.com/call_me_arasu__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/elavarasan-r-v-1a68072a3/" },
  { name: "Rtr SANTHIYA M P", avatar: "GWEN", role: "Director of Publication", image: "/assets/BM/15.jpg", instagram: "", linkedin: "" },
  { name: "Rtr ASHWINI V", avatar: "LUNA", role: "Director of Membership Growth", image: "/assets/BM/13.jpg", instagram: "https://www.instagram.com/ashxw.ini?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "" },
  { name: "Rtr VENKAT RAMAN R", avatar: "ZYRN", role: "The Rotary Foundation Chair", image: "/assets/BM/7.jpg", instagram: "https://www.instagram.com/vickyvr.7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/venkat-raman-r-6088222a3/" },
  { name: "Rtr SUSHMA R", avatar: "TARGERYEN", role: "Rotary Rotaract Relationship Officer", image: "/assets/BM/8.jpg", instagram: "https://www.instagram.com/_sushma__s_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "" },
  { name: "Rtr VIVEKA S", avatar: "PIHU", role: "Rotaract Learning Facilitator", image: "/assets/BM/9.jpg", instagram: "https://www.instagram.com/_._viveka._._?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "" },
  { name: "Rtr THANGAM K", avatar: "HYDRA", role: "Youth Foundation Chair", image: "/assets/BM/10.jpg", instagram: "https://www.instagram.com/_goldxz_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "" },
  { name: "Rtr ASWIN RAJ", avatar: "BATMAN", role: "Director of Digital Communication", image: "/assets/BM/29.jpg", instagram: "https://www.instagram.com/aswin._raj23?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "https://www.linkedin.com/in/aswin-raj-cbe/" },
  { name: "Rtr MOHANA PRIYA G", avatar: "EMBER", role: "Creative Head & Special Initiatives", image: "/assets/BM/20.jpg", instagram: "https://www.instagram.com/_priya_.45__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "" },
  { name: "Rtr BHOOMISH R", avatar: "OMR", role: "Public Relations Chair", image: "/assets/BM/12.jpg", instagram: "https://www.instagram.com/itz_me_omr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "" },
  { name: "Rtr KARMEGAM M", avatar: "WOLF", role: "Blood Donor Cell", image: "/assets/BM/19.jpg", instagram: "", linkedin: "https://www.instagram.com/mr_busy_420_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { name: "Rtr SARANYA DEVI S", avatar: "HARLOW", role: "Mental Health Chair", image: "/assets/BM/14.jpg", instagram: "https://www.instagram.com/stoic____11?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin: "" }
];

// ----------------------------------------------------------------------------
// 💎 POWER STONES - MONTHLY RECOGNITION
// Explicitly structured. Replace the 'image' property with separate photos.
// ----------------------------------------------------------------------------
const powerStonesData = [
  {
    id: "stone-jul-2025",
    month: "July 2025",
    recipients: [
      { id: "jul-1", name: "Rtr RINESH GURU S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "jul-2", name: "Rtr SIVASHANKARAN R", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" },
      { id: "jul-3", name: "Rtr SIVASUBRAMANIAN G", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "jul-4", name: "Rtr PP SRIRAM BHARANI M", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" },
      { id: "jul-5", name: "Mr NAGARASAN M", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "jul-6", name: "Rtr JOTHIMANI G", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "stone-aug-2025",
    month: "August 2025",
    recipients: [
      { id: "aug-1", name: "Rtr SAMSON DURAI S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "aug-2", name: "Rtr PRASANNA T", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" },
      { id: "aug-3", name: "Rtr ELAVARASI MURUGAPILLAI", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "aug-4", name: "Rtr GOKUL VM", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" },
      { id: "aug-5", name: "Rtr DHANUSHKOODI M", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "aug-6", name: "Rtr KALEESWARAN S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "stone-sep-2025",
    month: "September 2025",
    recipients: [
      { id: "sep-1", name: "Rtr SRI VARSHINI V", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "sep-2", name: "Rtr MEHA SREE K", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" },
      { id: "sep-3", name: "Rtr SIVAGNANA SUBHA G", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "sep-4", name: "Rtr ROHITH S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" },
      { id: "sep-5", name: "Rtr IBRAHIM A", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "sep-6", name: "Rtr ELAVARASAN R V", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "stone-oct-2025",
    month: "October 2025",
    recipients: [
      { id: "oct-1", name: "Rtr SANTHIYA M P", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "oct-2", name: "Rtr ASHWINI V", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" },
      { id: "oct-3", name: "Rtr VENKAT RAMAN R", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "oct-4", name: "Rtr SUSHMA R", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" },
      { id: "oct-5", name: "Rtr VIVEKA S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "oct-6", name: "Rtr THANGAM K", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "stone-nov-2025",
    month: "November 2025",
    recipients: [
      { id: "nov-1", name: "Rtr ASWIN RAJ", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "nov-2", name: "Rtr MOHANA PRIYA G", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" },
      { id: "nov-3", name: "Rtr BHOOMISH R", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "nov-4", name: "Rtr KARMEGAM M", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" },
      { id: "nov-5", name: "Rtr SARANYA DEVI S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "nov-6", name: "Rtr RINESH GURU S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "stone-dec-2025",
    month: "December 2025",
    recipients: [
      { id: "dec-1", name: "Rtr SIVASHANKARAN R", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "dec-2", name: "Rtr SIVASUBRAMANIAN G", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" },
      { id: "dec-3", name: "Rtr PP SRIRAM BHARANI M", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "dec-4", name: "Mr NAGARASAN M", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" },
      { id: "dec-5", name: "Rtr JOTHIMANI G", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "dec-6", name: "Rtr SAMSON DURAI S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "stone-jan-2026",
    month: "January 2026",
    recipients: [
      { id: "jan-1", name: "Rtr PRASANNA T", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "jan-2", name: "Rtr ELAVARASI MURUGAPILLAI", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" },
      { id: "jan-3", name: "Rtr GOKUL VM", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "jan-4", name: "Rtr DHANUSHKOODI M", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" },
      { id: "jan-5", name: "Rtr KALEESWARAN S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "jan-6", name: "Rtr SRI VARSHINI V", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "stone-feb-2026",
    month: "February 2026",
    recipients: [
      { id: "feb-1", name: "Rtr MEHA SREE K", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "feb-2", name: "Rtr SIVAGNANA SUBHA G", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" },
      { id: "feb-3", name: "Rtr ROHITH S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "feb-4", name: "Rtr IBRAHIM A", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" },
      { id: "feb-5", name: "Rtr ELAVARASAN R V", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "feb-6", name: "Rtr SANTHIYA M P", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "stone-mar-2026",
    month: "March 2026",
    recipients: [
      { id: "mar-1", name: "Rtr ASHWINI V", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "mar-2", name: "Rtr VENKAT RAMAN R", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" },
      { id: "mar-3", name: "Rtr SUSHMA R", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "mar-4", name: "Rtr VIVEKA S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" },
      { id: "mar-5", name: "Rtr THANGAM K", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "mar-6", name: "Rtr ASWIN RAJ", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "stone-apr-2026",
    month: "April 2026",
    recipients: [
      { id: "apr-1", name: "Rtr MOHANA PRIYA G", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "apr-2", name: "Rtr BHOOMISH R", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" },
      { id: "apr-3", name: "Rtr KARMEGAM M", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "apr-4", name: "Rtr SARANYA DEVI S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" },
      { id: "apr-5", name: "Rtr RINESH GURU S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "apr-6", name: "Rtr SIVASHANKARAN R", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "stone-may-2026",
    month: "May 2026",
    recipients: [
      { id: "may-1", name: "Rtr SIVASUBRAMANIAN G", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "may-2", name: "Rtr PP SRIRAM BHARANI M", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" },
      { id: "may-3", name: "Mr NAGARASAN M", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "may-4", name: "Rtr JOTHIMANI G", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" },
      { id: "may-5", name: "Rtr SAMSON DURAI S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "may-6", name: "Rtr PRASANNA T", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "stone-jun-2026",
    month: "June 2026",
    recipients: [
      { id: "jun-1", name: "Rtr ELAVARASI MURUGAPILLAI", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "jun-2", name: "Rtr GOKUL VM", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" },
      { id: "jun-3", name: "Rtr DHANUSHKOODI M", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "jun-4", name: "Rtr KALEESWARAN S", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" },
      { id: "jun-5", name: "Rtr SRI VARSHINI V", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "jun-6", name: "Rtr MEHA SREE K", role: "Recognized for Active Participation", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" }
    ]
  }
];

// ----------------------------------------------------------------------------
// 📰 BULLETIN - MONTHLY EDITIONS
// Explicitly structured. Replace 'cover' URLs for distinct language editions.
// ----------------------------------------------------------------------------
const bulletinData = [
  {
    id: "bull-jul-2025",
    month: "July 2025",
    title: "The Seal of Change - July 2025",
    editions: [
      { id: "jul-t", language: "Tamil", cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600", pdfUrl: "" },
      { id: "jul-e", language: "English", cover: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600", pdfUrl: "" },
      { id: "jul-k", language: "Kannada", cover: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600", pdfUrl: "" },
      { id: "jul-m", language: "Malayalam", cover: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600", pdfUrl: "" },
      { id: "jul-te", language: "Telugu", cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600", pdfUrl: "" }
    ]
  },
  {
    id: "bull-aug-2025",
    month: "August 2025",
    title: "The Seal of Change - August 2025",
    editions: [
      { id: "aug-t", language: "Tamil", cover: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" },
      { id: "aug-e", language: "English", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "aug-k", language: "Kannada", cover: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" },
      { id: "aug-m", language: "Malayalam", cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "aug-te", language: "Telugu", cover: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "bull-sep-2025",
    month: "September 2025",
    title: "The Seal of Change - September 2025",
    editions: [
      { id: "sep-t", language: "Tamil", cover: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "sep-e", language: "English", cover: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" },
      { id: "sep-k", language: "Kannada", cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "sep-m", language: "Malayalam", cover: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" },
      { id: "sep-te", language: "Telugu", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "bull-oct-2025",
    month: "October 2025",
    title: "The Seal of Change - October 2025",
    editions: [
      { id: "oct-t", language: "Tamil", cover: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" },
      { id: "oct-e", language: "English", cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "oct-k", language: "Kannada", cover: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" },
      { id: "oct-m", language: "Malayalam", cover: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "oct-te", language: "Telugu", cover: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "bull-nov-2025",
    month: "November 2025",
    title: "The Seal of Change - November 2025",
    editions: [
      { id: "nov-t", language: "Tamil", cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "nov-e", language: "English", cover: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" },
      { id: "nov-k", language: "Kannada", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "nov-m", language: "Malayalam", cover: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" },
      { id: "nov-te", language: "Telugu", cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "bull-dec-2025",
    month: "December 2025",
    title: "The Seal of Change - December 2025",
    editions: [
      { id: "dec-t", language: "Tamil", cover: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" },
      { id: "dec-e", language: "English", cover: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "dec-k", language: "Kannada", cover: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" },
      { id: "dec-m", language: "Malayalam", cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "dec-te", language: "Telugu", cover: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "bull-jan-2026",
    month: "January 2026",
    title: "The Seal of Change - January 2026",
    editions: [
      { id: "jan-t", language: "Tamil", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "jan-e", language: "English", cover: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" },
      { id: "jan-k", language: "Kannada", cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "jan-m", language: "Malayalam", cover: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" },
      { id: "jan-te", language: "Telugu", cover: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "bull-feb-2026",
    month: "February 2026",
    title: "The Seal of Change - February 2026",
    editions: [
      { id: "feb-t", language: "Tamil", cover: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" },
      { id: "feb-e", language: "English", cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "feb-k", language: "Kannada", cover: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" },
      { id: "feb-m", language: "Malayalam", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "feb-te", language: "Telugu", cover: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "bull-mar-2026",
    month: "March 2026",
    title: "The Seal of Change - March 2026",
    editions: [
      { id: "mar-t", language: "Tamil", cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "mar-e", language: "English", cover: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" },
      { id: "mar-k", language: "Kannada", cover: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "mar-m", language: "Malayalam", cover: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" },
      { id: "mar-te", language: "Telugu", cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "bull-apr-2026",
    month: "April 2026",
    title: "The Seal of Change - April 2026",
    editions: [
      { id: "apr-t", language: "Tamil", cover: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" },
      { id: "apr-e", language: "English", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" },
      { id: "apr-k", language: "Kannada", cover: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" },
      { id: "apr-m", language: "Malayalam", cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "apr-te", language: "Telugu", cover: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "bull-may-2026",
    month: "May 2026",
    title: "The Seal of Change - May 2026",
    editions: [
      { id: "may-t", language: "Tamil", cover: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "may-e", language: "English", cover: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" },
      { id: "may-k", language: "Kannada", cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
      { id: "may-m", language: "Malayalam", cover: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600" },
      { id: "may-te", language: "Telugu", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    id: "bull-jun-2026",
    month: "June 2026",
    title: "The Seal of Change - June 2026",
    editions: [
      { id: "jun-t", language: "Tamil", cover: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600" },
      { id: "jun-e", language: "English", cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" },
      { id: "jun-k", language: "Kannada", cover: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600" },
      { id: "jun-m", language: "Malayalam", cover: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600" },
      { id: "jun-te", language: "Telugu", cover: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600" }
    ]
  }
];

const videoFeedback = [
  {
    id: "v1",
    name: "Suresh K.",
    relation: "Father of Patient",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    text: "A life-saving response from the Hemodrax team."
  },
  {
    id: "v2",
    name: "Priya R.",
    relation: "Accident Survivor",
    thumbnail: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=600",
    text: "The swift action of these students saved my life."
  },
  {
    id: "v3",
    name: "Muthuvel S.",
    relation: "Husband of Patient",
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    text: "Four brave students came forward when we needed them most."
  }
];

const initialProjectCatalog = {
  ongoing: [
    {
      id: "og1",
      title: "INFO KURAL",
      date: "Daily Initiative",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800",
      shortDesc: "A Thirukkural initiative where our members create videos, spreading its wisdom to society.",
      fullDesc: "INFO KURAL is a flagship daily initiative aimed at preserving and promoting the profound wisdom of Thirukkural. Every day, a member of our club records a short video explaining a specific Kural and its relevance to modern life. \n\nThis not only helps in spreading ethical and moral values to society but also significantly builds camera confidence, public speaking skills, and honors our rich Tamil language heritage.",
      actionImages: [
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400"
      ]
    },
    {
      id: "og2",
      title: "KURAL OVIYAM",
      date: "365-Day Initiative",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=800",
      shortDesc: "A Tamil poetry initiative where our club members contribute 365 original poems continuously.",
      fullDesc: "Kural Oviyam is an ambitious Tamil poetry initiative. Over the course of 365 days, our club members dedicate their creative energy to writing and publishing original Tamil poems.\n\nThis continuous effort serves as a platform for creative expression, mental well-being, and a deep, sustained appreciation for literary arts within our engineering community.",
      actionImages: [
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400"
      ]
    }
  ],
  upcoming: [
    {
      id: "up1",
      title: "The Cleansing Flame",
      date: "Coming Soon",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800",
      shortDesc: "Regular crusades and awareness campaigns to purify the land and promote well-being.",
      fullDesc: "The Cleansing Flame represents our upcoming health and sanitation drive. We will be executing rigorous community clean-ups, public hygiene awareness sessions, and partnering with local health organizations.\n\nOur goal is to physically and metaphorically cleanse our surroundings, ensuring a safer, healthier environment for the vulnerable demographics in Coimbatore.",
      actionImages: [
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400"
      ]
    },
    {
      id: "up2",
      title: "The Forging Series",
      date: "March 2026",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
      shortDesc: "Summoning master artisans and sages to share their wisdom and sharpen skills.",
      fullDesc: "The Forging Series is an advanced masterclass lineup. We are inviting industry veterans, corporate leaders, and technical experts to our 'Stronghold' to conduct intensive, hands-on workshops.\n\nTopics will range from cutting-edge technological advancements in engineering to crucial soft skills like leadership, negotiation, and emotional intelligence.",
      actionImages: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400"
      ]
    },
    {
      id: "up3",
      title: "Mentorship Drive",
      date: "April 2026",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      shortDesc: "A mentorship program connecting alumni with students to build skills and career clarity.",
      fullDesc: "Recognizing the gap between academic theory and industry reality, this Mentorship Drive will pair current club members with successful Rotaract alumni and senior professionals.\n\nThrough structured 1-on-1 sessions, mentees will receive personalized guidance on career trajectories, resume building, and overcoming early-career obstacles.",
      actionImages: [
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400"
      ]
    }
  ],
  completed: [
    {
      id: "cp1",
      title: "Green Earth Phase 1",
      date: "October 2025",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      shortDesc: "Tree plantation and campus sustainability drives focusing on waste segregation.",
      fullDesc: "Phase 1 of our Green Earth initiative was a resounding success. Over 150 volunteers mobilized to plant 500 indigenous saplings around the campus perimeter.\n\nAdditionally, we implemented a comprehensive waste-segregation protocol within the college cafeterias, significantly reducing our daily carbon footprint and setting a standard for institutional sustainability.",
      actionImages: [
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400"
      ]
    },
    {
      id: "cp2",
      title: "Community Health Camp",
      date: "August 2025",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
      shortDesc: "Wellness checkups and health awareness sessions benefiting nearby communities.",
      fullDesc: "In collaboration with leading local hospitals, we hosted a massive free health camp targeting the underprivileged sectors near Kovilpalayam.\n\nThe camp provided free basic diagnostics, eye check-ups, and pediatric consultations to over 300 individuals. We also distributed essential multivitamins and conducted workshops on basic maternal health.",
      actionImages: [
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400"
      ]
    }
  ],
  flagship: [
    {
      id: "fs1",
      title: "DAYA 2026",
      date: "Flagship Event",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
      shortDesc: "Bringing together 500+ orphaned children for an unforgettable day of joy.",
      fullDesc: "Daya is the crown jewel legacy project of the Rotaract Club of INFO Institute of Engineering. It is a massive logistical and philanthropic undertaking.\n\nEvery year, we bring together over 500 orphaned children from various homes across the district. For one entire day, we immerse them in interactive games, cultural performances, educational activities, and a grand feast. It is a testament to our commitment to social welfare and youth happiness.",
      actionImages: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400"
      ]
    },
    {
      id: "fs2",
      title: "ROBO 2026",
      date: "Flagship Event",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      shortDesc: "Rise of Bright Opportunities: Creating massive career opportunities through job fairs.",
      fullDesc: "ROBO (Rise of Bright Opportunities) is our direct answer to the employment challenges facing modern graduates.\n\nThis flagship project operates as a large-scale job fair, connecting hundreds of final-year students with top-tier corporate recruiters, tech startups, and manufacturing firms. Beyond recruitment, ROBO features mock-interview booths, resume optimization desks, and industry panel discussions.",
      actionImages: [
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400"
      ]
    },
    {
      id: "fs3",
      title: "STAR 2026",
      date: "Flagship Event",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800",
      shortDesc: "A fellowship trip bringing Rotaractors together to strengthen club bonds.",
      fullDesc: "True impact requires a strong, united team. STAR is our exclusive, high-energy fellowship expedition designed solely for club bonding.\n\nBy taking members out of their academic and operational environments, we facilitate deep team-building, trust exercises, and social interaction. This initiative ensures that our 'Clan' remains tightly knit, highly motivated, and mentally refreshed for the year's challenges.",
      actionImages: [
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400"
      ]
    }
  ]
};

const galleryAlbums = [
  {
    id: "gal1",
    title: "DAYA 2026",
    date: "Jan 2026",
    cover: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600"
    ]
  },
  {
    id: "gal2",
    title: "ROBO Job Fair",
    date: "Dec 2025",
    cover: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=600"
    ]
  },
  {
    id: "gal3",
    title: "STAR Fellowship",
    date: "Nov 2025",
    cover: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=600"
    ]
  },
  {
    id: "gal4",
    title: "Green Earth Drive",
    date: "Oct 2025",
    cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=600"
    ]
  }
];

const primaryNavLinks = ["Home", "About Us", "Projects", "Gallery", "Contact"];
const moreNavLinks = ["Blood Donation", "Power Stones", "Bulletin", "Board", "Club Documents", "Admin"];

// ============================================================================
// LOGIC & COMPONENT ARCHITECTURE 
// ============================================================================

const getSharedRowImages = (offset) => {
  const shuffled = [...SITE_IMAGES.sharedGridImages.slice(offset), ...SITE_IMAGES.sharedGridImages.slice(0, offset)];
  return [...shuffled, ...shuffled];
};

const sharedRows = [
  { id: 1, class: "animate-[marqueeLeft_45s_linear_infinite]", images: getSharedRowImages(0) },
  { id: 2, class: "animate-[marqueeRight_55s_linear_infinite]", images: getSharedRowImages(2) },
  { id: 3, class: "animate-[marqueeLeft_65s_linear_infinite]", images: getSharedRowImages(4) },
  { id: 4, class: "animate-[marqueeRight_50s_linear_infinite]", images: getSharedRowImages(6) }
];


const PageHeader = ({ title, subtitle }) => {
  const renderTitle = (text) => {
    if (typeof text === 'string') {
      if (text.startsWith('Rtr ')) return <>Rtr <span className="uppercase">{text.substring(4)}</span></>;
      if (text.startsWith('Mr ')) return <>Mr <span className="uppercase">{text.substring(3)}</span></>;
      return <span className="uppercase">{text}</span>;
    }
    return text;
  };

  return (
    <div className="relative bg-white text-[#012f64] py-32 overflow-hidden border-b border-slate-100 flex flex-col items-center justify-center min-h-[45vh]">
      <div className="absolute inset-0 z-0 overflow-hidden flex flex-col justify-center gap-6 py-10 opacity-20">
        <style>{`
            @keyframes marqueeLeft {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marqueeRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
          `}</style>

        {sharedRows.map((row) => (
          <div key={row.id} className={`flex w-max gap-6 px-3 ${row.class}`}>
            {row.images.map((img, idx) => (
              <div
                key={idx}
                className="h-[180px] w-[280px] lg:h-[240px] lg:w-[360px] bg-cover bg-center rounded-[2rem] flex-shrink-0 shadow-[0_10px_30px_rgba(1,47,100,0.08)] border border-[#012f64]/10"
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.7)_0%,_rgba(255,255,255,0.98)_100%)] z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center mt-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-widest mb-6 font-serif drop-shadow-sm text-transparent bg-clip-text bg-gradient-to-br from-[#012f64] via-[#02438c] to-[#012f64]">
          {renderTitle(title)}
        </h1>
        {subtitle && <p className="text-lg md:text-xl text-[#ce1d53] leading-relaxed max-w-3xl font-medium drop-shadow-sm">{subtitle}</p>}
      </div>
    </div>
  );
};

const HomeView = ({ setCurrentPage }) => {
  // JSON-LD Structured Data for the Organization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Rotaract Club of Info Institute of Engineering",
    "alternateName": "RAC IIE",
    "url": "https://racinfo.org",
    "logo": "https://racinfo.org/vite.svg", // Replace with real logo if applicable
    "description": "A youth organization committed to community service, professional development, and making a positive impact in the community.",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Rotary International"
    }
  };

  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out] bg-white">


      <section className="relative bg-white text-[#012f64] overflow-hidden h-[calc(100vh-6rem)] min-h-[600px] w-full flex flex-col items-center justify-center border-b border-slate-100">
        <div className="absolute inset-0 z-0 overflow-hidden flex flex-col justify-center gap-6 py-10 opacity-20">
          <style>{`
            @keyframes marqueeLeft {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marqueeRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
          `}</style>

          {sharedRows.map((row) => (
            <div key={row.id} className={`flex w-max gap-6 px-3 ${row.class}`}>
              {row.images.map((img, idx) => (
                <div
                  key={idx}
                  className="h-[180px] w-[280px] lg:h-[240px] lg:w-[360px] bg-cover bg-center rounded-[2rem] flex-shrink-0 shadow-[0_10px_30px_rgba(1,47,100,0.08)] border border-[#012f64]/10"
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.7)_0%,_rgba(255,255,255,0.98)_100%)] z-0 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white z-0 pointer-events-none"></div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03] z-0">
          <span className="text-[12rem] md:text-[22rem] font-serif italic text-[#012f64] whitespace-nowrap select-none">2025 - 26</span>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-8 md:px-12 md:py-10 w-full h-full gap-12 lg:gap-8">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-7/12 transform transition-transform duration-700 hover:scale-[1.01] z-20">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-2 mb-6 md:mb-8 shadow-sm border border-[#012f64]/10">
              <span className="bg-[#ce1d53] text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">Theme</span>
              <span className="text-[#012f64] text-[10px] md:text-xs font-bold uppercase tracking-widest pr-2">Strength Through Unity</span>
            </div>

            <img loading="lazy"
              src={SITE_IMAGES.logo}
              alt="Rotaract Theme 2025-26 - Act Make An Impact"
              className="h-24 md:h-36 lg:h-40 object-contain mb-6 md:mb-8 drop-shadow-sm"
              onError={(e) => { e.target.style.display = 'none'; }}
            />

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-widest mb-4 md:mb-6 font-serif uppercase drop-shadow-sm text-transparent bg-clip-text bg-gradient-to-br from-[#012f64] via-[#02438c] to-[#012f64]">
              ACT, MAKE AN<br className="hidden md:block" /> <span className="text-[#ce1d53] drop-shadow-[0_0_15px_rgba(206,29,83,0.15)]">IMPACT</span>
            </h1>

            <p className="text-base md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
              Welcome to the Rotaract Club of Info Institute of Engineering. We are a force of young leaders, forging change and making a legendary impact.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
              <button
                onClick={() => setCurrentPage('Projects')}
                className="bg-[#ce1d53] hover:bg-[#a81743] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-[0_5px_15px_rgba(206,29,83,0.3)] hover:shadow-[0_8px_25px_rgba(206,29,83,0.4)] transform hover:-translate-y-1 flex items-center group cursor-pointer"
              >
                Discover Our Quest <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
              <span className="text-[#012f64]/60 font-serif italic text-base md:text-lg tracking-wide drop-shadow-sm">
                Royal in Soul, Wild in Sky
              </span>
            </div>
          </div>

          <div className="hidden lg:flex w-5/12 h-[75vh] relative overflow-hidden mask-vertical-fade z-10 gap-4 xl:gap-6 transform rotate-[2deg] scale-[1.05]">
            <style>{`
               .mask-vertical-fade {
                 -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
                 mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
               }
               @keyframes verticalMarqueeUp {
                 0% { transform: translateY(0); }
                 100% { transform: translateY(-50%); }
               }
               @keyframes verticalMarqueeDown {
                 0% { transform: translateY(-50%); }
                 100% { transform: translateY(0); }
               }
             `}</style>

            <div className="flex flex-col gap-4 xl:gap-6 w-1/2 animate-[verticalMarqueeUp_40s_linear_infinite]">
              {[...SITE_IMAGES.sharedGridImages, ...SITE_IMAGES.sharedGridImages].map((img, idx) => (
                <div key={`col1-${idx}`} className="w-full h-64 rounded-[2rem] bg-cover bg-center shadow-[0_15px_40px_rgba(1,47,100,0.1)] border border-[#012f64]/10 shrink-0 filter brightness-95 hover:brightness-110 transition-all duration-500" style={{ backgroundImage: `url(${img})` }} />
              ))}
            </div>

            <div className="flex flex-col gap-4 xl:gap-6 w-1/2 animate-[verticalMarqueeDown_45s_linear_infinite] mt-[-100px]">
              {[...SITE_IMAGES.sharedGridImages.slice().reverse(), ...SITE_IMAGES.sharedGridImages.slice().reverse()].map((img, idx) => (
                <div key={`col2-${idx}`} className="w-full h-80 rounded-[2rem] bg-cover bg-center shadow-[0_15px_40px_rgba(1,47,100,0.1)] border border-[#012f64]/10 shrink-0 filter brightness-95 hover:brightness-110 transition-all duration-500" style={{ backgroundImage: `url(${img})` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
        <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 border border-[#012f64]/5 shadow-[0_20px_50px_rgba(1,47,100,0.06)] flex flex-col lg:flex-row items-center gap-12 lg:gap-16 transform hover:shadow-[0_25px_60px_rgba(1,47,100,0.08)] transition-all duration-500 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#ce1d53]/5 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#012f64]/5 rounded-full opacity-50 blur-3xl"></div>
          <div className="w-full lg:flex-1 flex justify-center relative z-10 shrink-0">
            <div className="absolute inset-0 bg-[#ce1d53]/10 blur-[60px] opacity-60 rounded-[3rem] transform scale-110"></div>
            <div className="relative w-full max-w-[600px] lg:max-w-none rounded-[2rem] bg-white p-2 md:p-3 shadow-[0_20px_50px_rgba(1,47,100,0.06)] border border-[#012f64]/10 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(206,29,83,0.08)] hover:-translate-y-2 z-10 group">
              <div className="relative w-full aspect-[4/3] md:aspect-video rounded-[1.5rem] overflow-hidden bg-white">
                <img
                  src={SITE_IMAGES.teamGroupPhoto}
                  alt="The Club - Rotaract Info Institute"
                  className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-[1.05]"
                  onError={(e) => { e.target.src = SITE_IMAGES.fallbackGeneral; }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#012f64]/90 via-[#012f64]/40 to-transparent flex flex-col justify-end p-6 z-10 pointer-events-none">
                  <h4 className="text-2xl font-black text-white tracking-wide mb-1 drop-shadow-md uppercase">The Club</h4>
                  <p className="text-[#ce1d53] font-bold text-[10px] uppercase tracking-widest drop-shadow-sm">
                    Rotaract <span className="text-white mx-1">|</span> Info Inst.
                  </p>
                </div>
                <div className="absolute inset-0 border border-black/5 rounded-[1.5rem] pointer-events-none z-20"></div>
              </div>
            </div>
          </div>

          <div className="w-full lg:flex-1 relative z-10 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-xs font-bold text-[#ce1d53] uppercase tracking-widest mb-3">Our Origin</h2>
            <h3 className="text-3xl lg:text-5xl font-black text-[#012f64] uppercase mb-10 tracking-tight">Who We Are</h3>
            <div className="relative bg-white rounded-2xl shadow-sm border border-[#012f64]/10 p-8 lg:p-10 overflow-hidden group hover:shadow-md transition-shadow duration-500 text-left">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#ce1d53]"></div>
              <span className="absolute -top-6 right-4 text-[120px] lg:text-[140px] text-white font-serif leading-none select-none pointer-events-none group-hover:text-[#ce1d53]/5 transition-colors duration-500">"</span>
              <div className="relative z-10">
                <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-medium italic mb-10">
                  "The Rotaract Club of Info Institute of Engineering is a formidable club of students and young professionals. We are part of a global network of Rotaract clubs, united under the banner of Rotary International."
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-8 h-1 bg-slate-200 rounded-full hidden sm:block"></div>
                  <button
                    onClick={() => setCurrentPage('About Us')}
                    className="inline-flex items-center text-[#ce1d53] font-black uppercase tracking-widest text-sm hover:text-[#a81743] transition-colors group/btn cursor-pointer"
                  >
                    Know About Us <ChevronRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white relative border-y border-[#012f64]/10 mt-8 mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { value: "50+", label: "PROJECTS" },
              { value: "26+", label: "RI REG. MEMBERS" },
              { value: "50+", label: "Green Rotaracters MEMBERS" },
              { value: "15+", label: "YEARS SERVICE" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl py-8 px-4 flex flex-col items-center justify-center border border-[#ce1d53]/20 shadow-[0_5px_20px_rgba(206,29,83,0.03)] hover:border-[#ce1d53]/60 hover:shadow-[0_10px_30px_rgba(206,29,83,0.1)] transition-all duration-500 group transform hover:-translate-y-1">
                <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#012f64] mb-2 tracking-tight drop-shadow-sm group-hover:scale-105 group-hover:text-[#ce1d53] transition-all duration-500">{stat.value}</h4>
                <p className="text-[#ce1d53] text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative border-b border-[#012f64]/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(206,29,83,0.03)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#012f64] uppercase tracking-tight drop-shadow-sm">
              Rotaract Prayer & <span className="text-[#ce1d53]">4-Way Test</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#012f64] to-[#ce1d53] mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="relative group rounded-[2.5rem] p-[2px] bg-gradient-to-b from-[#012f64]/20 via-[#012f64]/5 to-transparent hover:from-[#012f64]/40 transition-all duration-700 shadow-sm hover:shadow-lg">
              <div className="h-full bg-white rounded-[2.4rem] p-10 md:p-14 flex flex-col items-center border border-[#012f64]/10">
                <h3 className="text-2xl md:text-3xl font-black text-[#012f64] uppercase tracking-widest mb-6 drop-shadow-sm">Rotaract Prayer</h3>
                <div className="w-20 h-1 bg-gradient-to-r from-[#ce1d53] to-[#012f64] mb-10 rounded-full opacity-80"></div>
                <p className="text-[#012f64]/80 text-lg md:text-xl leading-relaxed font-medium text-justify">
                  Oh! God! Our Almighty Father & Ruler of the Universe, We thank thee for the inspiration you have given us for the Rotaract movement based upon Fellowship through Service. We humbly beg you to continue thy grace to enable us to do Our Service to ourselves and to our neighbors and to honor and glory of thy holy name.
                </p>
              </div>
            </div>
            <div className="relative group rounded-[2.5rem] p-[2px] bg-gradient-to-b from-[#ce1d53]/20 via-[#ce1d53]/5 to-transparent hover:from-[#ce1d53]/40 transition-all duration-700 shadow-sm hover:shadow-lg">
              <div className="h-full bg-white rounded-[2.4rem] p-10 md:p-14 flex flex-col border border-[#ce1d53]/10">
                <div className="flex flex-col items-center mb-10">
                  <h3 className="text-2xl md:text-3xl font-black text-[#ce1d53] uppercase tracking-widest mb-6 drop-shadow-sm">4 Way Test</h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-[#ce1d53] to-[#012f64] rounded-full opacity-80 mb-6"></div>
                  <p className="text-slate-500 text-base md:text-lg italic font-serif">"Of the things we think, say or do:"</p>
                </div>
                <ul className="text-left w-full space-y-8 text-[#012f64]/80 text-lg md:text-xl font-medium px-2">
                  <li className="flex items-start gap-4">
                    <span className="text-[#ce1d53] mt-1 drop-shadow-sm">✦</span>
                    <span>Is it the <strong className="text-[#012f64] font-black tracking-wide">TRUTH</strong>?</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#ce1d53] mt-1 drop-shadow-sm">✦</span>
                    <span>Is it <strong className="text-[#012f64] font-black tracking-wide">FAIR</strong> to all concerned?</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#ce1d53] mt-1 drop-shadow-sm">✦</span>
                    <span className="leading-snug">Will it build <strong className="text-[#012f64] font-black tracking-wide">GOODWILL</strong> and <strong className="text-[#012f64] font-black tracking-wide">BETTER FRIENDSHIPS</strong>?</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#ce1d53] mt-1 drop-shadow-sm">✦</span>
                    <span>Will it be <strong className="text-[#012f64] font-black tracking-wide">BENEFICIAL</strong> to all concerned?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 🏛️ PAST YEAR CLUB LOGOS - LEGACY ROSTER
// Explicitly structured data for the Club's historical identities.
// ----------------------------------------------------------------------------
const pastLogosData = [
  { id: "legacy-1", year: "2016-17", theme: "Logo", image: "/assets/logo/4.jpg" },
  { id: "legacy-2", year: "2017-18", theme: "Logo", image: "/assets/logo/2.jpg" },
  { id: "legacy-3", year: "2018-19", theme: "Logo", image: "/assets/logo/1.jpg" },
  { id: "legacy-4", year: "2019-20", theme: "Logo", image: "/assets/logo/6.jpg" },
  { id: "legacy-5", year: "2020-21", theme: "Logo", image: "/assets/logo/3.jpg" },
  { id: "legacy-6", year: "2021-22", theme: "Logo", image: "/assets/logo/5.jpg" },
  { id: "legacy-7", year: "2022-23", theme: "Logo", image: "/assets/logo/10.jpg" },
  { id: "legacy-8", year: "2023-24", theme: "Logo", image: "/assets/logo/9.jpg" },
  { id: "legacy-9", year: "2024-25", theme: "Logo", image: "/assets/logo/8.jpg" },
  { id: "legacy-10", year: "2025-26", theme: "Logo", image: "/assets/logo/7.jpg" }
];

const AboutView = () => (
  <div className="animate-[fadeIn_0.5s_ease-in-out]">


    <PageHeader title="Who We Are" subtitle="A formidable club of students and young professionals." />
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <span className="text-[#ce1d53] font-bold tracking-widest uppercase text-sm mb-3 block">Our Origin Story</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#012f64] uppercase mb-6 tracking-tight">Forging Change & Impact</h2>
            <div className="w-16 h-1.5 bg-[#ce1d53] mb-8 rounded-full"></div>
            <p className="text-slate-600 text-xl leading-relaxed mb-8 font-medium">
              The Rotaract Club of Info Institute of Engineering is a formidable club of students and young professionals. We are part of a global network of Rotaract clubs, united under the banner of Rotary International.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Our quest is to empower young men and women, honing the skills needed for personal growth, to conquer the challenges facing our communities, and to forge unbreakable bonds of friendship and service across the world.
            </p>
          </div>
          <div className="relative h-[450px] md:h-[550px] w-full hidden sm:block">
            <div className="absolute top-0 right-0 w-3/4 h-[85%] bg-white rounded-3xl border-[8px] border-white shadow-[0_20px_50px_rgba(1,47,100,0.06)] flex flex-col items-center justify-center overflow-hidden group transition-all duration-700 hover:shadow-[0_30px_60px_rgba(225,29,72,0.1)] z-10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-100 opacity-90"></div>
              <div className="absolute inset-4 border-2 border-[#012f64]/20 rounded-2xl border-dashed group-hover:border-[#ce1d53] group-hover:scale-[0.97] transition-all duration-500"><img loading="lazy" src="/assets/home-page-assets/2.png" alt="Rotaract club activities and impacts graphic" /></div>
              <div className="">

              </div>
              <span className="">

              </span>
            </div>
            <div className="absolute bottom-0 left-4 w-[55%] h-[55%] bg-[#012f64] rounded-3xl border-[8px] border-white shadow-[0_20px_50px_rgba(1,47,100,0.1)] flex flex-col items-center justify-center overflow-hidden group transition-all duration-700 hover:shadow-[0_30px_60px_rgba(206,29,83,0.15)] z-20 hover:scale-105">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#012f64] via-[#012f64] to-[#02438c] opacity-90"></div>
              <div className="absolute inset-3 border-2 border-white/20 rounded-xl border-dashed group-hover:border-[#ce1d53] group-hover:scale-[0.95] transition-all duration-500"><img loading="lazy" src="/assets/home-page-assets/1.png" alt="Members of Rotaract collaborating" /></div>
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/20 mb-3 relative z-10 group-hover:-translate-y-2 transition-transform duration-500 shadow-sm">
              </div>
              <span className="text-white font-bold uppercase tracking-widest text-[9px] relative z-10 group-hover:text-[#ce1d53] transition-colors duration-500 text-center px-4 py-1.5 bg-black/20 rounded-full border border-white/10 shadow-sm">

              </span>
            </div>
            <div className="absolute top-1/4 -left-6 w-24 h-24 bg-[#ce1d53]/10 rounded-full opacity-50 blur-2xl z-0"></div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-white relative border-t border-[#012f64]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative z-10">
          <Crown className="w-12 h-12 text-[#ce1d53] mx-auto mb-6 drop-shadow-sm" />
          <h2 className="text-3xl md:text-4xl font-black text-[#012f64] uppercase mb-4 tracking-tight">Our Core Values</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">The foundational pillars that guide our quest to empower, conquer, and forge.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(1,47,100,0.04)] border border-[#012f64]/10 hover:-translate-y-2 transition-transform duration-500 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 border border-[#012f64]/10 group-hover:bg-[#ce1d53]/5 group-hover:border-[#ce1d53]/20 transition-colors duration-500 shadow-sm">
              <Swords className="w-8 h-8 text-[#012f64] group-hover:text-[#ce1d53] transition-colors duration-500" />
            </div>
            <h3 className="text-xl font-black text-[#012f64] uppercase mb-4 tracking-wide group-hover:text-[#ce1d53] transition-colors">Personal Growth</h3>
            <p className="text-slate-600 leading-relaxed font-medium">Honing the skills needed for personal growth and professional excellence.</p>
          </div>
          <div className="bg-[#012f64] p-10 rounded-3xl shadow-[0_15px_40px_rgba(1,47,100,0.2)] border border-[#012f64] hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full opacity-10 blur-3xl group-hover:bg-[#ce1d53] transition-colors duration-700"></div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 relative z-10 group-hover:border-[#ce1d53] transition-colors duration-500 shadow-sm">
              <Target className="w-8 h-8 text-[#ce1d53] group-hover:text-white transition-colors duration-500" />
            </div>
            <h3 className="text-xl font-black text-white uppercase mb-4 tracking-wide relative z-10 group-hover:text-white transition-colors">Conquering Challenges</h3>
            <p className="text-white/80 leading-relaxed font-medium relative z-10">Conquering the challenges facing our communities through dynamic, impactful service.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(1,47,100,0.04)] border border-[#012f64]/10 hover:-translate-y-2 transition-transform duration-500 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 border border-[#012f64]/10 group-hover:bg-[#ce1d53]/5 group-hover:border-[#ce1d53]/20 transition-colors duration-500 shadow-sm">
              <Globe className="w-8 h-8 text-[#012f64] group-hover:text-[#ce1d53] transition-colors duration-500" />
            </div>
            <h3 className="text-xl font-black text-[#012f64] uppercase mb-4 tracking-wide group-hover:text-[#ce1d53] transition-colors">Unbreakable Bonds</h3>
            <p className="text-slate-600 leading-relaxed font-medium">Forging unbreakable bonds of friendship and global service across the world.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-white relative border-t border-[#012f64]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          <div className="w-full lg:w-5/12 shrink-0">
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] group bg-white border-[6px] border-white transition-all hover:shadow-[0_25px_60px_rgba(206,29,83,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-white"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img loading="lazy" src="/assets/home-page-assets/home.jpg" alt="President" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-8 left-8 text-[#ce1d53] transform -rotate-12 opacity-80">
                <Flame className="w-8 h-8" />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#012f64]/90 via-[#012f64]/40 to-transparent flex flex-col justify-end p-8 lg:p-10 z-10 transition-all duration-500 group-hover:h-[55%]">
                <h4 className="text-3xl md:text-4xl font-black text-white tracking-wide mb-2 drop-shadow-md">Rtr RINESH GURU S</h4>
                <p className="text-[#ce1d53] font-bold text-sm uppercase tracking-widest drop-shadow-sm">
                  President <span className="text-white mx-2">|</span> DRAGON
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-7/12 flex flex-col justify-center pt-4 lg:pt-8">
            <h2 className="text-xs font-bold text-[#ce1d53] uppercase tracking-widest mb-3">From the President's Desk</h2>
            <h3 className="text-3xl lg:text-5xl font-black text-[#012f64] uppercase mb-10 tracking-tight">Leading with Impact</h3>
            <div className="relative bg-white rounded-2xl shadow-sm border border-[#012f64]/10 p-8 lg:p-12 overflow-hidden group hover:shadow-md transition-shadow duration-500">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#ce1d53]"></div>
              <span className="absolute -top-6 right-4 text-[140px] text-slate-100 font-serif leading-none select-none pointer-events-none group-hover:text-[#ce1d53]/5 transition-colors duration-500">"</span>
              <div className="relative z-10">
                <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-medium italic mb-10">
                  "As we navigate the 2025-26 term under the banner of 'Act, Make An Impact', our focus remains unwavering: to transform our collective potential into tangible community action. We are a forging ground for the leaders of tomorrow, royal in soul and wild in sky."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-1 bg-[#ce1d53] rounded-full"></div>
                  <div>
                    <h5 className="font-black text-[#012f64] text-base lg:text-lg tracking-wide">Rtr RINESH GURU S</h5>
                    <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">President, Rotaract Club of Info Institute of Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-slate-50 relative border-t border-[#012f64]/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(206,29,83,0.03)_0%,_transparent_60%)] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-[#012f64]/10 mx-auto mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Shield className="w-8 h-8 text-[#ce1d53]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#012f64] uppercase mb-4 tracking-tight drop-shadow-sm">Legacy Emblems</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">A visual journey of our club's evolving identity and yearly themes.</p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#012f64] to-[#ce1d53] mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {pastLogosData.map((logo) => (
            <div key={logo.id} className="group relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-[0_15px_40px_rgba(1,47,100,0.05)] border-[6px] border-white hover:border-[#012f64]/10 transition-all duration-700 transform hover:-translate-y-2 cursor-pointer">
              <div className="absolute inset-0 bg-slate-100 animate-pulse z-0"></div>
              <img
                src={logo.image}
                alt={`Theme ${logo.theme} ${logo.year}`}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out z-10"
                onError={(e) => { e.target.src = SITE_IMAGES.fallbackGeneral; }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#012f64] via-[#012f64]/30 to-transparent z-20 pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity duration-700"></div>

              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 z-30 pointer-events-none translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-6 h-1 bg-[#ce1d53] mb-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                <h4 className="text-white font-black text-xl md:text-2xl uppercase tracking-wide drop-shadow-lg leading-none">
                  {logo.year}
                </h4>
                <p className="text-[#ce1d53] font-bold text-[10px] md:text-xs uppercase tracking-widest drop-shadow-md mt-1.5 line-clamp-1">
                  {logo.theme}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

  </div>
);

const BloodDonationView = () => {
  const [previewVideo, setPreviewVideo] = useState(null);

  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out]">
      <PageHeader title="HEMODRAX" subtitle="Witness the power of every drop donated." />

      <section className="py-24 bg-white relative border-b border-[#012f64]/10 overflow-hidden">
        {/* Dynamic Blood-cell floating orbs */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-[#ce1d53]/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-10 right-20 w-64 h-64 bg-[#ce1d53]/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_rgba(206,29,83,0.06)] border border-[#ce1d53]/10 p-12 lg:p-20 relative overflow-hidden group hover:shadow-[0_30px_80px_rgba(206,29,83,0.12)] transition-all duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ce1d53]/[0.02] via-transparent to-transparent z-0"></div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#ce1d53]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-[#ce1d53]/20 transition-colors duration-700 pointer-events-none"></div>

            {/* Animated Heartbeat Icon */}
            <div className="w-28 h-28 bg-gradient-to-br from-[#ce1d53]/10 to-[#ce1d53]/20 text-[#ce1d53] rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner border border-[#ce1d53]/30 relative z-10 group-hover:scale-110 transition-transform duration-700">
              <div className="absolute inset-0 rounded-full bg-[#ce1d53]/20 animate-ping opacity-75"></div>
              <Droplets className="w-14 h-14 relative z-10 drop-shadow-sm animate-bounce" style={{ animationDuration: '3s' }} />
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-[#012f64] mb-6 tracking-tight relative z-10 uppercase drop-shadow-sm">Join the Lifeline</h2>
            <p className="text-slate-600 text-lg md:text-xl mb-14 leading-relaxed max-w-2xl mx-auto relative z-10 font-medium">
              Join our Hemodrax WhatsApp channel to receive real-time notifications for urgent blood requirements across Coimbatore.
            </p>

            <a
              href="https://chat.whatsapp.com/DsFRCdQaXGAGLaExNS6U59"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#1EBE5D] hover:to-[#25D366] text-white px-10 py-5 rounded-[1.25rem] font-black uppercase tracking-widest text-lg transition-all shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_20px_40px_rgba(37,211,102,0.4)] transform hover:-translate-y-1 relative z-10 cursor-pointer overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]"></div>
              Join WhatsApp Channel <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 relative border-b border-[#012f64]/10 overflow-hidden">
        {/* Subtle engineering grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(1,47,100,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(1,47,100,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-black text-[#012f64] uppercase tracking-widest mb-4 drop-shadow-sm">Our Impact</h3>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#ce1d53] to-[#012f64] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-12 flex flex-col items-center justify-center border-t-4 border-t-[#ce1d53] border-x border-b border-[#012f64]/10 shadow-[0_10px_40px_rgba(1,47,100,0.04)] hover:shadow-[0_25px_60px_rgba(206,29,83,0.12)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#ce1d53]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 shadow-inner border border-[#ce1d53]/10 group-hover:scale-110 transition-transform duration-500 relative">
                <div className="absolute inset-0 rounded-full border border-[#ce1d53]/30 border-dashed animate-[spin_15s_linear_infinite]"></div>
                <Droplets className="w-10 h-10 text-[#ce1d53] opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-6xl md:text-7xl font-black text-[#012f64] mb-4 tracking-tight group-hover:text-[#ce1d53] transition-colors drop-shadow-sm">{20}+</h4>
              <p className="text-[#012f64]/80 font-black uppercase tracking-widest text-sm text-center bg-[#ce1d53]/10 px-5 py-2 rounded-full border border-[#ce1d53]/20">Units Donated</p>
            </div>
            <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-12 flex flex-col items-center justify-center border-t-4 border-t-[#012f64] border-x border-b border-[#012f64]/10 shadow-[0_10px_40px_rgba(1,47,100,0.04)] hover:shadow-[0_25px_60px_rgba(1,47,100,0.12)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#012f64]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 shadow-inner border border-[#012f64]/10 group-hover:scale-110 transition-transform duration-500 relative">
                <div className="absolute inset-0 rounded-full border border-[#012f64]/30 border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
                <Heart className="w-10 h-10 text-[#ce1d53] opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-6xl md:text-7xl font-black text-[#012f64] mb-4 tracking-tight group-hover:text-[#ce1d53] transition-colors drop-shadow-sm">{15}+</h4>
              <p className="text-[#012f64]/80 font-black uppercase tracking-widest text-sm text-center bg-[#012f64]/10 px-5 py-2 rounded-full border border-[#012f64]/20">Beneficiaries Reached</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(206,29,83,0.03)_0%,_transparent_70%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#012f64] uppercase tracking-tight mb-4 drop-shadow-sm">Voices of Gratitude</h2>
            <p className="text-[#ce1d53] font-medium text-lg md:text-xl max-w-2xl mx-auto">Watch the heartfelt video feedback from our noble beneficiaries.</p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#ce1d53] to-[#012f64] mx-auto mt-8 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {videoFeedback.map((video) => (
              <div key={video.id} className="bg-white rounded-[2rem] overflow-hidden border border-[#012f64]/10 shadow-[0_15px_40px_rgba(1,47,100,0.05)] hover:shadow-[0_25px_60px_rgba(206,29,83,0.12)] hover:border-[#ce1d53]/30 transition-all duration-500 group cursor-pointer transform hover:-translate-y-2 flex flex-col">
                {/* Cinematic Video Preview Container */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden shrink-0">
                  <img loading="lazy" src={video.thumbnail} alt={video.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-80 group-hover:opacity-100 mix-blend-overlay" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                  {/* Pulsating Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#ce1d53]/90 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(206,29,83,0.5)] transform group-hover:scale-125 transition-all duration-500 border border-white/20 group-hover:bg-[#ce1d53]">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Live Indicator Badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Feedback Clip</span>
                  </div>
                </div>

                {/* Glassmorphic Metadata Footer */}
                <div className="p-8 flex-grow flex flex-col bg-gradient-to-b from-white to-slate-50 relative">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-1 bg-gradient-to-r from-[#ce1d53] to-[#a81743] rounded-full"></div>
                    <p className="text-[#ce1d53] text-[10px] font-black uppercase tracking-widest drop-shadow-sm">Survivor Story</p>
                  </div>
                  <h5 className="text-2xl font-black text-[#012f64] mb-2 tracking-tight group-hover:text-[#ce1d53] transition-colors">{video.name}</h5>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">{video.relation}</p>
                  <div className="mt-auto relative">
                    <span className="absolute -top-3 left-0 text-4xl text-[#ce1d53]/20 font-serif leading-none select-none">"</span>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed italic font-medium pl-6 border-l-2 border-slate-200 group-hover:border-[#ce1d53] transition-colors">
                      {video.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Video Modal (Mock Player) */}
      {previewVideo && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 cursor-pointer animate-[fadeIn_0.3s_ease-out]" onClick={() => setPreviewVideo(null)}>
          <button className="absolute top-8 right-8 text-white/40 hover:text-white bg-white/5 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer transform hover:scale-110" onClick={() => setPreviewVideo(null)}>
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-[#0a0a0a] rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(206,29,83,0.15)] relative border border-white/10 transform scale-100" onClick={(e) => e.stopPropagation()}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(206,29,83,0.1)_0%,_transparent_100%)]"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 relative shadow-inner">
                <div className="absolute inset-0 border-2 border-[#ce1d53] rounded-full border-t-transparent animate-spin"></div>
                <Video className="w-10 h-10 text-[#ce1d53] drop-shadow-lg" />
              </div>
              <h4 className="text-white text-2xl md:text-3xl font-black uppercase tracking-widest mb-4 drop-shadow-lg">Buffering Video Quest...</h4>
              <p className="text-white/60 font-medium text-lg max-w-md mx-auto leading-relaxed">
                A high-definition broadcast of {previewVideo.name}'s testimonial is loading from the archives.
              </p>
              <div className="mt-12 w-64 h-1.5 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
                <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#ce1d53] to-[#a81743] w-1/3 animate-[marqueeRight_1.5s_ease-in-out_infinite_alternate]"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project, onClick }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-[#012f64]/10 overflow-hidden hover:shadow-[0_10px_30px_rgba(206,29,83,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer" onClick={() => onClick(project)}>
    <div className="w-full aspect-[4/5] overflow-hidden bg-slate-100 relative">
      <img loading="lazy" src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-[#012f64]/5">
        <span className="text-[10px] font-black text-[#012f64] tracking-widest uppercase">{project.date}</span>
      </div>
    </div>
    <div className="p-6 md:p-8 flex flex-col flex-grow">
      <h4 className="text-xl md:text-2xl font-black text-[#012f64] mb-3">{project.title}</h4>
      <div className="w-10 h-1 bg-[#ce1d53] mb-4 rounded-full group-hover:w-16 transition-all duration-300"></div>
      <p className="text-slate-600 text-sm md:text-base mb-6 flex-grow line-clamp-3">{project.shortDesc}</p>
      <button className="mt-auto inline-flex items-center text-[#ce1d53] font-black uppercase tracking-widest text-sm group-hover:text-[#a81743] transition-colors cursor-pointer">
        See More <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

const ProjectsView = ({ catalog }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProject]);

  if (selectedProject) {
    return (
      <div className="animate-[fadeIn_0.3s_ease-in-out]">


        <PageHeader title={selectedProject.title} subtitle="Project Details & Impact" />

        <div className="bg-white min-h-[50vh] py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedProject(null)}
              className="inline-flex items-center text-slate-500 hover:text-[#ce1d53] font-black uppercase tracking-widest text-sm mb-10 transition-colors cursor-pointer group"
            >
              <ChevronRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Catalog
            </button>

            <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(1,47,100,0.08)] mb-12 border border-[#012f64]/10 bg-slate-100">
              <img loading="lazy" src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#012f64]/10 p-8 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ce1d53]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <h2 className="text-3xl md:text-5xl font-black text-[#012f64] tracking-tight">{selectedProject.title}</h2>
                  <span className="inline-block bg-[#ce1d53]/10 text-[#ce1d53] px-5 py-2.5 rounded-full font-black uppercase tracking-widest text-xs md:text-sm shadow-sm border border-[#ce1d53]/20 shrink-0 text-center">
                    {selectedProject.date}
                  </span>
                </div>
                <div className="w-20 h-1.5 bg-gradient-to-r from-[#ce1d53] to-[#012f64] rounded-full mb-12"></div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-600 text-lg md:text-xl leading-relaxed whitespace-pre-line font-medium">
                    {selectedProject.fullDesc}
                  </p>
                </div>

                {selectedProject.actionImages && selectedProject.actionImages.length > 0 && (
                  <div className="mt-16">
                    <h3 className="text-2xl font-black text-[#012f64] mb-8 uppercase tracking-wide flex items-center gap-4">
                      <span className="w-8 h-1 bg-[#ce1d53] rounded-full"></span>
                      Action Gallery
                    </h3>
                    <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
                      {selectedProject.actionImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="w-full break-inside-avoid rounded-2xl overflow-hidden shadow-sm border border-[#012f64]/10 group relative cursor-pointer"
                          onClick={() => setPreviewImage(img)}
                        >
                          <img loading="lazy" src={img} alt={`${selectedProject.title} Action ${idx + 1}`} className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-[#012f64]/0 group-hover:bg-[#012f64]/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                            <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-md" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {previewImage && (
          <div className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-[fadeIn_0.2s_ease-in-out] cursor-pointer" onClick={() => setPreviewImage(null)}>
            <button className="absolute top-6 right-6 text-white/50 hover:text-white bg-black/20 hover:bg-black/80 rounded-full p-2 transition-all cursor-pointer" onClick={(e) => { e.stopPropagation(); setPreviewImage(null); }}>
              <X className="w-8 h-8" />
            </button>
            <img loading="lazy" src={previewImage} alt="Expanded Preview" className="max-w-full max-h-full object-contain rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-auto" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out]">
      <PageHeader title="Our Initiatives & Quests" subtitle="Explore the legacy and future of our club." />
      <div className="bg-white py-24 space-y-32">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 border-l-4 border-[#ce1d53] pl-6">
            <h2 className="text-3xl md:text-4xl font-black text-[#012f64] uppercase tracking-tight">Ongoing Projects</h2>
            <p className="text-slate-500 font-medium mt-2">Initiatives that drive daily impact and continuous growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalog.ongoing.map(project => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 border-l-4 border-[#ce1d53] pl-6">
            <h2 className="text-3xl md:text-4xl font-black text-[#012f64] uppercase tracking-tight">Upcoming Projects</h2>
            <p className="text-slate-500 font-medium mt-2">Get ready for our next epic adventures.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalog.upcoming.map(project => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 border-l-4 border-[#ce1d53] pl-6">
            <h2 className="text-3xl md:text-4xl font-black text-[#012f64] uppercase tracking-tight">Completed Projects</h2>
            <p className="text-slate-500 font-medium mt-2">Milestones we have successfully conquered.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalog.completed.map(project => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(206,29,83,0.03)_0%,_transparent_70%)] pointer-events-none -z-10 -m-20"></div>
          <div className="mb-12 text-center">
            <Crown className="w-12 h-12 text-[#ce1d53] mx-auto mb-6 drop-shadow-sm" />
            <h2 className="text-4xl md:text-5xl font-black text-[#012f64] uppercase tracking-tight mb-4">Flagship Projects</h2>
            <p className="text-[#ce1d53] text-xl font-medium tracking-wide">Forging a lasting legacy in our realm.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {catalog.flagship.map(project => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// ============================================================================
// ADMIN SECURE PORTAL
// ============================================================================
const AdminView = ({ catalog, setCatalog, galleryCatalog, setGalleryCatalog, authState, setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState('ongoing');
  const [formKey, setFormKey] = useState(Date.now());

  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newFullDesc, setNewFullDesc] = useState('');
  const [mainImageFile, setMainImageFile] = useState(null);
  const [actionImageFiles, setActionImageFiles] = useState([]);

  // Gallery Management State
  const [activeGalleryAlbum, setActiveGalleryAlbum] = useState(null);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryDate, setGalleryDate] = useState('');
  const [galleryCover, setGalleryCover] = useState(null);
  const [singleGalleryImage, setSingleGalleryImage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Gallery API Handlers
  const handleAddGalleryAlbum = async (e) => {
    e.preventDefault();
    if (!galleryTitle || !galleryDate) return;
    const formData = new FormData();
    formData.append('id', `gal${Date.now()}`);
    formData.append('title', galleryTitle);
    formData.append('date', galleryDate);
    if (galleryCover) formData.append('cover', galleryCover);

    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery`, { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setGalleryCatalog(prev => [data.folder, ...prev]);
        setGalleryTitle('');
        setGalleryDate('');
        setGalleryCover(null);
        setFormKey(Date.now());
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteGalleryAlbum = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setGalleryCatalog(prev => prev.filter(g => g.id !== id));
        if (activeGalleryAlbum && activeGalleryAlbum.id === id) setActiveGalleryAlbum(null);
      }
    } catch (err) { console.error(err); }
  };

  const handleAddGalleryImage = async (e, id) => {
    e.preventDefault();
    if (!singleGalleryImage) return;
    const formData = new FormData();
    formData.append('image', singleGalleryImage);

    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery/${id}/images`, { method: 'PUT', body: formData });
      const data = await res.json();
      if (res.ok) {
        setGalleryCatalog(prev => prev.map(g => g.id === id ? { ...g, images: [...g.images, data.imageUrl] } : g));
        if (activeGalleryAlbum && activeGalleryAlbum.id === id) {
          setActiveGalleryAlbum(prev => ({ ...prev, images: [...prev.images, data.imageUrl] }));
        }
        setSingleGalleryImage(null);
        setFormKey(Date.now() + 1);
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteGalleryImage = async (id, imageUrl) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery/${id}/images`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl })
      });
      if (res.ok) {
        setGalleryCatalog(prev => prev.map(g => g.id === id ? { ...g, images: g.images.filter(img => img !== imageUrl) } : g));
        if (activeGalleryAlbum && activeGalleryAlbum.id === id) {
          setActiveGalleryAlbum(prev => ({ ...prev, images: prev.images.filter(img => img !== imageUrl) }));
        }
      }
    } catch (err) { console.error(err); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setAuth(true);
        setError('');
      } else {
        setError('Invalid credentials. Security clearance denied.');
      }
    } catch (err) {
      setError('Connection error.');
    }
  };

  const handleLogout = () => {
    setAuth(false);
    setUsername('');
    setPassword('');
  };

  const handleDelete = async (category, id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCatalog(prev => ({
          ...prev,
          [category]: prev[category].filter(p => p.id !== id)
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDate || !newShortDesc) return;

    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('date', newDate);
    formData.append('shortDesc', newShortDesc);
    formData.append('fullDesc', newFullDesc);
    formData.append('category', activeTab);

    if (mainImageFile) {
      formData.append('mainImage', mainImageFile);
    }

    if (actionImageFiles && actionImageFiles.length > 0) {
      Array.from(actionImageFiles).forEach(file => {
        formData.append('actionImages', file);
      });
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data.success) {
        setCatalog(prev => ({
          ...prev,
          [activeTab]: [...prev[activeTab], data.project]
        }));

        // Reset Form completely using key remount
        setNewTitle('');
        setNewDate('');
        setNewShortDesc('');
        setNewFullDesc('');
        setMainImageFile(null);
        setActionImageFiles([]);
        setFormKey(Date.now());
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!authState) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 relative overflow-hidden animate-[fadeIn_0.5s_ease-in-out]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(1,47,100,0.05)_0%,_transparent_100%)] pointer-events-none"></div>
        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(1,47,100,0.08)] border border-[#012f64]/10 p-12 relative z-10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#012f64] to-[#02438c] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Lock className="w-10 h-10 text-white drop-shadow-md" />
            </div>
            <h2 className="text-3xl font-black text-[#012f64] uppercase tracking-widest">Admin Portal</h2>
            <p className="text-[#ce1d53] text-xs font-bold uppercase tracking-widest mt-2">Restricted Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold text-center border border-red-100 animate-[fadeIn_0.3s_ease-in-out]">
                {error}
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#012f64] uppercase tracking-widest ml-4">Identifier</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#ce1d53]/10 focus:border-[#ce1d53] transition-all text-[#012f64] font-medium" placeholder="Enter username" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#012f64] uppercase tracking-widest ml-4">Passcode</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-14 pr-12 py-4 rounded-2xl bg-slate-50/50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#ce1d53]/10 focus:border-[#ce1d53] transition-all text-[#012f64] font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-[#ce1d53] transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#ce1d53] hover:bg-[#a81743] text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-[0_10px_25px_rgba(206,29,83,0.3)] hover:shadow-[0_15px_35px_rgba(206,29,83,0.4)] transform hover:-translate-y-1 cursor-pointer mt-4">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out] bg-slate-50 min-h-screen pb-32">
      <div className="bg-[#012f64] text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(206,29,83,0.2)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest drop-shadow-md">Command Center</h1>
            <p className="text-[#ce1d53] font-bold tracking-widest uppercase text-sm mt-2">Project Catalog Management</p>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs transition-all border border-white/20 cursor-pointer">
            <LogOut className="w-4 h-4" /> Disconnect
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-16">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(1,47,100,0.06)] border border-[#012f64]/10 p-4 mb-10 flex flex-wrap gap-2 justify-center lg:justify-start">
          {['ongoing', 'upcoming', 'completed', 'flagship', 'gallery'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setActiveGalleryAlbum(null); }}
              className={`px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all cursor-pointer ${activeTab === tab ? 'bg-[#ce1d53] text-white shadow-[0_10px_20px_rgba(206,29,83,0.3)]' : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-[#012f64]'}`}
            >
              {tab === 'gallery' ? 'Gallery' : `${tab} Quests`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-black text-[#012f64] uppercase tracking-wide flex items-center gap-3">
              <span className="w-6 h-1 bg-[#ce1d53] rounded-full"></span> Active Directory
            </h3>
            {activeTab === 'gallery' ? (
              activeGalleryAlbum ? (
                <div className="space-y-6">
                  <button onClick={() => setActiveGalleryAlbum(null)} className="inline-flex items-center text-slate-500 hover:text-[#ce1d53] font-black uppercase tracking-widest text-xs transition-colors cursor-pointer group">
                    <ChevronRight className="w-4 h-4 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Folders
                  </button>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={activeGalleryAlbum.cover} alt="cover" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-black text-[#012f64] text-xl">{activeGalleryAlbum.title}</h4>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{activeGalleryAlbum.date} • {activeGalleryAlbum.images.length} Images</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {activeGalleryAlbum.images.map((img, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
                        <img src={img} alt={`img-${idx}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button onClick={() => handleDeleteGalleryImage(activeGalleryAlbum.id, img)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full cursor-pointer transform hover:scale-110 transition-transform">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                galleryCatalog.length === 0 ? (
                  <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 p-16 text-center">
                    <p className="text-slate-400 font-bold uppercase tracking-widest">No Gallery Folders Found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {galleryCatalog.map(folder => (
                      <div key={folder.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group cursor-pointer" onClick={() => setActiveGalleryAlbum(folder)}>
                        <div className="aspect-video w-full bg-slate-100 relative">
                          <img loading="lazy" src={folder.cover} alt={folder.title} className="w-full h-full object-cover" />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-[9px] font-black uppercase tracking-widest text-[#012f64]">
                            {folder.date}
                          </div>
                          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded shadow-sm text-[10px] font-bold text-white flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" /> {folder.images ? folder.images.length : 0}
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h4 className="font-black text-[#012f64] text-lg mb-4">{folder.title}</h4>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteGalleryAlbum(folder.id); }} className="mt-auto w-full py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 font-bold uppercase tracking-widest text-[10px] transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            <Trash2 className="w-4 h-4" /> Delete Folder
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )
            ) : catalog[activeTab].length === 0 ? (
              <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 p-16 text-center">
                <p className="text-slate-400 font-bold uppercase tracking-widest">No Quests in this Category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {catalog[activeTab].map(proj => (
                  <div key={proj.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group">
                    <div className="aspect-video w-full bg-slate-100 relative">
                      <img loading="lazy" src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-[9px] font-black uppercase tracking-widest text-[#012f64]">
                        {proj.date}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-black text-[#012f64] text-lg mb-2">{proj.title}</h4>
                      <p className="text-slate-500 text-xs mb-6 line-clamp-2 flex-grow">{proj.shortDesc}</p>
                      <button onClick={() => handleDelete(activeTab, proj.id)} className="mt-auto w-full py-3 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 font-bold uppercase tracking-widest text-[10px] transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <Trash2 className="w-4 h-4" /> Purge Record
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#012f64]/10 p-8 sticky top-32">
              <h3 className="text-xl font-black text-[#012f64] uppercase tracking-wide flex items-center gap-3 mb-8">
                <Plus className="w-5 h-5 text-[#ce1d53]" /> Forge New
              </h3>

              {activeTab === 'gallery' ? (
                activeGalleryAlbum ? (
                  <form key={formKey} onSubmit={(e) => handleAddGalleryImage(e, activeGalleryAlbum.id)} className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-[#012f64] uppercase tracking-widest ml-2 block mb-1">Upload to Folder</label>
                      <div className="relative group cursor-pointer">
                        <input type="file" required accept="image/*" onChange={e => setSingleGalleryImage(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full border-2 border-dashed border-slate-300 rounded-xl p-4 flex items-center justify-center gap-3 group-hover:border-[#ce1d53] group-hover:bg-[#ce1d53]/5 transition-all">
                          <UploadCloud className="w-5 h-5 text-slate-400 group-hover:text-[#ce1d53]" />
                          <span className="text-xs font-bold text-slate-500 group-hover:text-[#ce1d53] truncate max-w-[200px]">
                            {singleGalleryImage ? singleGalleryImage.name : 'Choose Image File'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-[#012f64] hover:bg-[#02438c] text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-sm cursor-pointer mt-6">
                      Upload Image
                    </button>
                  </form>
                ) : (
                  <form key={formKey} onSubmit={handleAddGalleryAlbum} className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-[#012f64] uppercase tracking-widest ml-2 block mb-1">Folder Title</label>
                      <input type="text" required value={galleryTitle} onChange={e => setGalleryTitle(e.target.value)} className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ce1d53]/20 focus:border-[#ce1d53] text-sm text-[#012f64]" placeholder="e.g. DAYA 2026" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-[#012f64] uppercase tracking-widest ml-2 block mb-1">Date Tag</label>
                      <input type="text" required value={galleryDate} onChange={e => setGalleryDate(e.target.value)} className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ce1d53]/20 focus:border-[#ce1d53] text-sm text-[#012f64]" placeholder="e.g. March 2026" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-[#012f64] uppercase tracking-widest ml-2 block mb-1">Folder Cover</label>
                      <div className="relative group cursor-pointer">
                        <input type="file" required accept="image/*" onChange={e => setGalleryCover(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full border-2 border-dashed border-slate-300 rounded-xl p-4 flex items-center justify-center gap-3 group-hover:border-[#ce1d53] group-hover:bg-[#ce1d53]/5 transition-all">
                          <UploadCloud className="w-5 h-5 text-slate-400 group-hover:text-[#ce1d53]" />
                          <span className="text-xs font-bold text-slate-500 group-hover:text-[#ce1d53] truncate max-w-[200px]">
                            {galleryCover ? galleryCover.name : 'Upload Cover Image'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-[#012f64] hover:bg-[#02438c] text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-sm cursor-pointer mt-6">
                      Create Folder
                    </button>
                  </form>
                )
              ) : (
                <form key={formKey} onSubmit={handleAddProject} className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-[#012f64] uppercase tracking-widest ml-2 block mb-1">Quest Title</label>
                    <input type="text" required value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ce1d53]/20 focus:border-[#ce1d53] text-sm text-[#012f64]" placeholder="e.g. DAYA 2026" />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-[#012f64] uppercase tracking-widest ml-2 block mb-1">Temporal Tag (Date)</label>
                    <input type="text" required value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ce1d53]/20 focus:border-[#ce1d53] text-sm text-[#012f64]" placeholder="e.g. March 2026" />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-[#012f64] uppercase tracking-widest ml-2 block mb-1">Brief Pitch</label>
                    <textarea required value={newShortDesc} onChange={e => setNewShortDesc(e.target.value)} rows="2" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ce1d53]/20 focus:border-[#ce1d53] text-sm text-[#012f64] resize-none" placeholder="One liner about the project..."></textarea>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-[#012f64] uppercase tracking-widest ml-2 block mb-1">Full Lore (Description)</label>
                    <textarea value={newFullDesc} onChange={e => setNewFullDesc(e.target.value)} rows="4" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ce1d53]/20 focus:border-[#ce1d53] text-sm text-[#012f64] resize-none" placeholder="Detailed description..."></textarea>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="text-[10px] font-black text-[#ce1d53] uppercase tracking-widest block border-b border-slate-100 pb-2">Visual Assets</label>

                    <div className="relative group cursor-pointer">
                      <input type="file" accept="image/*" onChange={e => setMainImageFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="w-full border-2 border-dashed border-slate-300 rounded-xl p-4 flex items-center justify-center gap-3 group-hover:border-[#ce1d53] group-hover:bg-[#ce1d53]/5 transition-all">
                        <UploadCloud className="w-5 h-5 text-slate-400 group-hover:text-[#ce1d53]" />
                        <span className="text-xs font-bold text-slate-500 group-hover:text-[#ce1d53] truncate max-w-[200px]">
                          {mainImageFile ? mainImageFile.name : 'Upload Primary Cover'}
                        </span>
                      </div>
                    </div>

                    <div className="relative group cursor-pointer">
                      <input type="file" accept="image/*" multiple onChange={e => setActionImageFiles(e.target.files)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="w-full border-2 border-dashed border-slate-300 rounded-xl p-4 flex items-center justify-center gap-3 group-hover:border-[#ce1d53] group-hover:bg-[#ce1d53]/5 transition-all">
                        <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-[#ce1d53]" />
                        <span className="text-xs font-bold text-slate-500 group-hover:text-[#ce1d53] truncate max-w-[200px]">
                          {actionImageFiles && actionImageFiles.length > 0 ? `${actionImageFiles.length} Gallery Files Attached` : 'Upload Action Gallery'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#012f64] hover:bg-[#02438c] text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-[0_5px_15px_rgba(1,47,100,0.2)] hover:shadow-[0_10px_25px_rgba(1,47,100,0.3)] transform hover:-translate-y-1 cursor-pointer mt-6">
                    Append to Archive
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryView = ({ albums }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedAlbum]);

  if (selectedAlbum) {
    return (
      <div className="animate-[fadeIn_0.3s_ease-in-out]">
        <PageHeader title={selectedAlbum.title} subtitle={`Memories from ${selectedAlbum.date}`} />
        <div className="bg-white min-h-[50vh] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => setSelectedAlbum(null)} className="inline-flex items-center text-slate-500 hover:text-[#ce1d53] font-black uppercase tracking-widest text-sm mb-10 transition-colors cursor-pointer group">
              <ChevronRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Albums
            </button>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-[#012f64]/10 pb-6">
              <h2 className="text-3xl md:text-4xl font-black text-[#012f64] tracking-tight">{selectedAlbum.title} Gallery</h2>
              <span className="bg-[#ce1d53]/10 text-[#ce1d53] px-5 py-2 rounded-full font-bold text-sm tracking-widest uppercase border border-[#ce1d53]/20">
                {selectedAlbum.images.length} Photos
              </span>
            </div>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 md:gap-8 space-y-6 md:space-y-8">
              {selectedAlbum.images.map((img, idx) => (
                <div key={idx} className="w-full break-inside-avoid rounded-2xl overflow-hidden shadow-sm border border-[#012f64]/10 group cursor-pointer bg-slate-50 relative" onClick={() => setPreviewImage(img)}>
                  <img loading="lazy" src={img} alt={`${selectedAlbum.title} Capture ${idx + 1}`} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-[#012f64]/0 group-hover:bg-[#012f64]/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                    <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {previewImage && (
          <div className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-[fadeIn_0.2s_ease-in-out] cursor-pointer" onClick={() => setPreviewImage(null)}>
            <button className="absolute top-6 right-6 text-white/50 hover:text-white bg-black/20 hover:bg-black/80 rounded-full p-2 transition-all cursor-pointer" onClick={(e) => { e.stopPropagation(); setPreviewImage(null); }}>
              <X className="w-8 h-8" />
            </button>
            <img loading="lazy" src={previewImage} alt="Expanded Preview" className="max-w-full max-h-full object-contain rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-auto" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out]">
      <PageHeader title="Gallery" subtitle="A structured archive of our past events and memories." />
      <section className="py-24 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-[#012f64] uppercase mb-4 tracking-tight">Event Archives</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#012f64] to-[#ce1d53] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {albums.map((album) => (
              <div key={album.id} onClick={() => setSelectedAlbum(album)} className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-slate-100 rounded-3xl transform translate-y-3 translate-x-3 border border-slate-200 group-hover:translate-y-4 group-hover:translate-x-4 transition-transform duration-500 -z-20"></div>
                <div className="absolute inset-0 bg-slate-50 rounded-3xl transform translate-y-1.5 translate-x-1.5 border border-slate-200 group-hover:translate-y-2 group-hover:translate-x-2 transition-transform duration-500 -z-10"></div>
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#012f64]/10 group-hover:shadow-[0_15px_40px_rgba(1,47,100,0.08)] group-hover:border-[#ce1d53]/40 transition-all duration-500 relative z-10 flex flex-col h-full">
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative mb-5 bg-slate-100">
                    <img loading="lazy" src={album.cover} alt={album.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-white flex items-center gap-2">
                      <ImageIcon className="w-3.5 h-3.5 text-[#ce1d53]" />
                      <span className="text-[11px] font-black text-[#012f64] tracking-widest">{album.images.length}</span>
                    </div>
                  </div>
                  <div className="px-2 pb-2 flex flex-col flex-grow">
                    <p className="text-[#ce1d53] font-bold text-[10px] uppercase tracking-widest mb-1">{album.date}</p>
                    <h3 className="text-xl font-black text-[#012f64] mb-4 group-hover:text-[#ce1d53] transition-colors line-clamp-1">{album.title}</h3>
                    <div className="flex items-center text-slate-500 font-bold text-[11px] uppercase tracking-widest group-hover:text-[#012f64] transition-colors mt-auto">
                      Open Folder <ChevronRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const BoardView = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    if (selectedMember) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedMember]);

  if (selectedMember) {
    return (
      <div className="animate-[fadeIn_0.3s_ease-in-out]">
        <PageHeader title={selectedMember.name} subtitle={`${selectedMember.role} • ${selectedMember.avatar}`} />

        <div className="bg-white min-h-[50vh] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedMember(null)}
              className="inline-flex items-center text-slate-500 hover:text-[#ce1d53] font-black uppercase tracking-widest text-sm mb-10 transition-colors cursor-pointer group"
            >
              <ChevronRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Board
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(1,47,100,0.08)] bg-white border-[8px] border-white group">
                <div className="absolute inset-0 bg-slate-100 animate-pulse z-0"></div>
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 z-10"
                  onError={(e) => { e.target.src = SITE_IMAGES.fallbackPortrait; }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#012f64]/90 via-[#012f64]/40 to-transparent flex flex-col justify-end p-8 z-20 pointer-events-none">
                  <h4 className="text-3xl font-black text-white tracking-wide mb-1 drop-shadow-md uppercase">{selectedMember.avatar}</h4>
                  <p className="text-[#ce1d53] font-bold text-xs uppercase tracking-widest drop-shadow-sm">
                    {selectedMember.role}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col justify-center">
                <span className="text-[#ce1d53] font-bold tracking-widest uppercase text-sm mb-3 block">Board Member Profile</span>
                <h2 className="text-3xl md:text-5xl font-black text-[#012f64] mb-6 tracking-tight">{selectedMember.name}</h2>
                <div className="w-16 h-1.5 bg-[#ce1d53] mb-8 rounded-full"></div>

                <div className="relative bg-slate-50 rounded-2xl shadow-sm border border-[#012f64]/10 p-8 lg:p-10 overflow-hidden group hover:shadow-md transition-shadow duration-500 text-left">
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#ce1d53]"></div>
                  <span className="absolute -top-6 right-4 text-[120px] lg:text-[140px] text-white font-serif leading-none select-none pointer-events-none transition-colors duration-500">"</span>
                  <div className="relative z-10">
                    <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-medium italic mb-10">
                      "Serving as the {selectedMember.role}, {selectedMember.name} embodies the core values of the Rotaract Club of Info Institute of Engineering. Armed with the moniker '{selectedMember.avatar}', they bring unwavering dedication and strategic vision to our quest for community impact."
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-1 bg-slate-200 rounded-full hidden sm:block"></div>
                        <span className="inline-flex items-center text-[#ce1d53] font-black uppercase tracking-widest text-sm">
                          Rotary Year 2025-26
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <a href={selectedMember.instagram || "#"} target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="w-10 h-10 rounded-full bg-white border border-[#012f64]/10 flex items-center justify-center text-slate-500 hover:bg-[#ce1d53] hover:text-white hover:border-[#ce1d53] hover:shadow-[0_5px_15px_rgba(206,29,83,0.3)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                          <Instagram className="w-4 h-4" />
                        </a>
                        <a href={selectedMember.linkedin || "#"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-10 h-10 rounded-full bg-white border border-[#012f64]/10 flex items-center justify-center text-slate-500 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:shadow-[0_5px_15px_rgba(0,119,181,0.3)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out]">
      <PageHeader title="Board Members 2025-26" subtitle="The leaders guiding our club for the year 2025-26" />

      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Ambient Lighting Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(206,29,83,0.05)_0%,_transparent_100%)] pointer-events-none"></div>

        {/* Massive Background Typographic Texture - Adjusted for Light Theme */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 overflow-hidden z-0">
          <span className="text-[15rem] md:text-[25rem] font-black uppercase text-transparent tracking-tighter" style={{ WebkitTextStroke: '2px rgba(1,47,100,0.05)' }}>
            LEADERSHIP
          </span>
        </div>

        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Poster Header - Adjusted for Light Theme */}
          <div className="text-center mb-32">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#012f64]/10 mx-auto mb-6 relative group cursor-default">
              <Users className="w-10 h-10 text-[#ce1d53] drop-shadow-sm group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 border border-[#ce1d53]/20 rounded-full animate-[spin_10s_linear_infinite] border-dashed"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#012f64] uppercase tracking-widest drop-shadow-sm">
              The Dragon <span className="text-[#ce1d53]">Clan</span>
            </h2>
            <div className="w-32 h-2 bg-[#ce1d53] mx-auto mt-6 rounded-full shadow-sm"></div>
          </div>

          {/* Scattered Dynamic Flex Layout */}
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-28 max-w-[100rem] mx-auto px-4 md:px-10">
            {boardMembers.map((member, index) => (
              <div
                key={index}
                onClick={() => setSelectedMember(member)}
                className={`relative group w-[260px] md:w-[280px] shrink-0 transform transition-all duration-700 hover:z-50 cursor-pointer ${index % 2 === 1 ? 'lg:mt-32' : ''}`}
              >

                {/* Rotated Red Squircle Background Blob */}
                <div className="absolute inset-[-10px] bg-[#ce1d53] rounded-[2.5rem] transform rotate-[-6deg] group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 z-0 shadow-lg"></div>

                {/* 4:5 Aspect Ratio Image Container - Adjusted for Light Theme */}
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white border-2 border-white group-hover:border-[#012f64]/20 transition-all duration-500 z-10 shadow-[0_15px_40px_rgba(1,47,100,0.15)]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out opacity-90 group-hover:opacity-100 mix-blend-multiply"
                    onError={(e) => { e.target.src = SITE_IMAGES.fallbackPortrait; }}
                  />
                  {/* Heavy Bottom Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#012f64]/95 via-[#012f64]/20 to-transparent pointer-events-none"></div>
                </div>

                {/* Moniker and Name Overlay (Bottom Left Edge) - Adjusted for Light Theme */}
                <div className="absolute bottom-6 left-[-15px] z-20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 pointer-events-none flex flex-col items-start">
                  <h3 className="text-white font-black text-4xl md:text-5xl uppercase leading-none tracking-tighter drop-shadow-md">
                    {member.avatar}
                  </h3>
                  <p className="bg-white text-[#ce1d53] px-3 py-1 mt-1 inline-block text-xs font-black uppercase tracking-widest shadow-sm border border-slate-100">
                    {member.name.replace('Rtr ', '')}
                  </p>
                </div>

                {/* Dynamic Relationship Badge & Connector Path - Adjusted for Light Theme */}
                <div className={`absolute top-[-25px] ${index % 2 === 0 ? 'right-[-25px]' : 'left-[-25px]'} z-30`}>

                  {/* Dotted Connecting Arrow */}
                  <svg className={`absolute ${index % 2 === 0 ? 'top-8 right-16' : 'top-8 left-16'} w-16 h-16 text-[#012f64] opacity-40 pointer-events-none`} viewBox="0 0 50 50" fill="none">
                    {index % 2 === 0 ? (
                      <g>
                        <path d="M45 10 Q 30 35 5 40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-[pulse_2s_infinite]" />
                        <circle cx="5" cy="40" r="3" fill="currentColor" />
                      </g>
                    ) : (
                      <g>
                        <path d="M5 10 Q 20 35 45 40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-[pulse_2s_infinite]" />
                        <circle cx="45" cy="40" r="3" fill="currentColor" />
                      </g>
                    )}
                  </svg>

                  {/* The Floating Pill Badge */}
                  <div className="relative bg-[#012f64]/95 backdrop-blur-md border-2 border-white rounded-full px-5 py-2.5 text-white font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg transform hover:scale-110 transition-transform cursor-help">
                    {member.role}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const PowerStonesView = () => {
  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out]">
      <PageHeader title="Power Stones" subtitle="Monthly Special Recognition by the President for Active Participation" />

      <div className="bg-slate-50 py-24 relative overflow-hidden">
        {/* Enhanced Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-[50rem] h-[50rem] bg-gradient-to-br from-[#ce1d53]/5 to-transparent rounded-full blur-[120px] pointer-events-none -translate-y-1/3"></div>
        <div className="absolute bottom-1/4 right-0 w-[40rem] h-[40rem] bg-gradient-to-tl from-[#012f64]/5 to-transparent rounded-full blur-[100px] pointer-events-none translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute top-1/2 left-0 w-[30rem] h-[30rem] bg-[#ce1d53]/[0.03] rounded-full blur-[80px] pointer-events-none -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 lg:space-y-40 relative z-10">
          {powerStonesData.map((data, monthIndex) => (
            <section key={data.id} className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

              {/* Animated Timeline connecting line */}
              {monthIndex !== powerStonesData.length - 1 && (
                <div className="hidden lg:block absolute left-[2.5rem] top-28 bottom-[-10rem] w-px bg-gradient-to-b from-[#ce1d53]/30 via-[#012f64]/10 to-transparent z-0">
                  <div className="w-full h-1/3 bg-gradient-to-b from-transparent via-[#ce1d53] to-transparent animate-[verticalMarqueeDown_3s_linear_infinite] opacity-50"></div>
                </div>
              )}

              {/* Enhanced Sticky Month Header Section */}
              <div className="lg:w-1/3 relative lg:sticky lg:top-28 z-40 shrink-0 w-full">
                <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-3 pr-8 shadow-[0_15px_35px_rgba(1,47,100,0.06)] border border-white flex items-center gap-5 transform transition-transform hover:scale-105 hover:shadow-[0_20px_40px_rgba(206,29,83,0.1)] group cursor-default w-max max-w-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#ce1d53] to-[#a81743] rounded-full flex items-center justify-center shadow-inner relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <Flame className="w-7 h-7 text-white relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <p className="text-[#ce1d53] text-[10px] font-black uppercase tracking-widest mb-0.5 opacity-80">Rotary Year 25-26</p>
                    <h2 className="text-2xl md:text-3xl font-black text-[#012f64] uppercase tracking-wider leading-none">
                      {data.month.split(' ')[0]} <span className="text-[#ce1d53] font-serif italic font-medium">{data.month.split(' ')[1]}</span>
                    </h2>
                  </div>
                </div>
              </div>

              {/* Premium 6 Cards - 4:5 Aspect Ratio Grid */}
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 w-full">
                {data.recipients.map((recipient, i) => (
                  <div
                    key={recipient.id}
                    className="group relative rounded-[2.5rem] p-2 bg-white/40 backdrop-blur-sm shadow-[0_15px_40px_rgba(1,47,100,0.04)] border border-white hover:border-[#ce1d53]/30 hover:bg-white transform hover:-translate-y-3 transition-all duration-700 cursor-pointer"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <div className="aspect-[4/5] w-full relative overflow-hidden rounded-[2rem] bg-slate-900 shadow-inner">

                      <img
                        src={recipient.image}
                        alt={recipient.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-80 group-hover:opacity-100"
                        onError={(e) => { e.target.src = SITE_IMAGES.fallbackPortrait; }}
                      />

                      {/* Deep Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#011a38] via-[#012f64]/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700"></div>

                      {/* Glassmorphic Data Panel */}
                      <div className="absolute inset-x-4 bottom-4 p-5 rounded-[1.5rem] bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                        <div className="w-8 h-1 bg-gradient-to-r from-[#ce1d53] to-[#a81743] mb-3 rounded-full group-hover:w-16 transition-all duration-700 delay-100"></div>
                        <h4 className="text-white font-black text-xl md:text-2xl tracking-wide leading-tight mb-1.5 drop-shadow-lg">
                          {recipient.name}
                        </h4>
                        <p className="text-slate-200 text-[10px] md:text-xs uppercase font-bold tracking-widest drop-shadow-md line-clamp-2">
                          {recipient.role}
                        </p>
                      </div>

                      {/* Floating Platinum Badge */}
                      <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-xl w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(206,29,83,0.25)] border border-white transform scale-75 group-hover:scale-100 group-hover:rotate-12 transition-all duration-500 z-10">
                        <div className="absolute inset-1 rounded-full border border-[#ce1d53]/20 border-dashed animate-[spin_10s_linear_infinite]"></div>
                        <Award className="w-6 h-6 text-[#ce1d53] drop-shadow-sm" />
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

const BulletinView = () => {
  const [previewBulletin, setPreviewBulletin] = useState(null);

  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out]">
      <PageHeader title="Bulletin" subtitle="News and tales from our club in 5 languages" />

      <div className="bg-slate-50 py-24 relative overflow-hidden">
        {/* Background decorative ambient lighting */}
        <div className="absolute top-0 right-1/4 w-[50rem] h-[50rem] bg-gradient-to-br from-[#012f64]/5 to-transparent rounded-full blur-[120px] pointer-events-none -translate-y-1/3"></div>
        <div className="absolute bottom-1/4 left-0 w-[40rem] h-[40rem] bg-gradient-to-tl from-[#ce1d53]/5 to-transparent rounded-full blur-[100px] pointer-events-none translate-y-1/4 -translate-x-1/4"></div>

        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-32 lg:space-y-40 relative z-10">

          {/* Universal Header */}
          <div className="text-center -mb-16 relative z-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#ce1d53] mb-4 tracking-wider drop-shadow-sm">மாற்றத்தின் முத்திரை</h2>
            <h3 className="text-2xl font-bold uppercase tracking-widest text-[#012f64]/60">- THE SEAL OF CHANGE -</h3>
          </div>

          {bulletinData.map((data, monthIndex) => (
            <section key={data.id} className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-12 pt-16">

              {/* Animated Timeline connectivity beam */}
              {monthIndex !== bulletinData.length - 1 && (
                <div className="hidden lg:block absolute left-[2.5rem] top-40 bottom-[-10rem] w-px bg-gradient-to-b from-[#012f64]/30 via-[#ce1d53]/10 to-transparent z-0">
                  <div className="w-full h-1/3 bg-gradient-to-b from-transparent via-[#012f64] to-transparent animate-[verticalMarqueeDown_4s_linear_infinite] opacity-40"></div>
                </div>
              )}

              {/* Sticky Month Designation Console */}
              <div className="lg:w-1/4 xl:w-1/5 relative lg:sticky lg:top-28 z-40 shrink-0 w-full">
                <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-3 pr-8 shadow-[0_15px_35px_rgba(1,47,100,0.06)] border border-[#012f64]/10 flex items-center gap-5 transform transition-transform hover:scale-105 hover:shadow-[0_20px_40px_rgba(1,47,100,0.1)] group cursor-default w-max max-w-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#012f64] to-[#02438c] rounded-full flex items-center justify-center shadow-inner relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                    <BookOpen className="w-6 h-6 text-white relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <p className="text-[#012f64]/60 text-[10px] font-black uppercase tracking-widest mb-0.5">Rotary Year 25-26</p>
                    <h2 className="text-2xl md:text-3xl font-black text-[#012f64] uppercase tracking-wider leading-none">
                      {data.month.split(' ')[0]} <span className="text-[#ce1d53] font-serif italic font-medium">{data.month.split(' ')[1]}</span>
                    </h2>
                  </div>
                </div>
              </div>

              {/* 5 A4 Standard Document Grid */}
              <div className="lg:w-3/4 xl:w-4/5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
                {data.editions.map((edition, i) => (
                  <div
                    key={edition.id}
                    className="group relative bg-white p-2 rounded-xl shadow-[0_10px_30px_rgba(1,47,100,0.08)] border border-slate-200 hover:border-[#ce1d53]/50 hover:shadow-[0_20px_40px_rgba(206,29,83,0.15)] transform hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col"
                    style={{ transitionDelay: `${i * 30}ms` }}
                    onClick={() => setPreviewBulletin(edition)}
                  >
                    {/* Strict A4 Aspect Ratio container (1 : 1.414) */}
                    <div className="aspect-[1/1.414] w-full relative overflow-hidden bg-slate-100 rounded-lg shadow-sm border border-black/5">
                      <img
                        src={edition.cover}
                        alt={`${data.title} ${edition.language}`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                        onError={(e) => { e.target.src = SITE_IMAGES.fallbackGeneral; }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#012f64]/90 via-[#012f64]/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                      {/* Typographic Tagging */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded shadow-sm border border-white/50">
                        <span className="text-[10px] md:text-xs font-black text-[#ce1d53] uppercase tracking-widest">{edition.language}</span>
                      </div>

                      {/* Immediate Interaction Call-to-Action */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-[#ce1d53]/90 backdrop-blur-sm w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-500">
                          <BookOpen className="w-5 h-5 md:w-7 md:h-7" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 pb-2 text-center flex-grow flex flex-col justify-between">
                      <h4 className="text-[#012f64] font-black text-sm md:text-base tracking-wide leading-tight group-hover:text-[#ce1d53] transition-colors">{edition.language} Edition</h4>
                      <p className="text-slate-400 text-[9px] md:text-[10px] uppercase tracking-widest mt-1 font-bold">Tap to Read</p>
                    </div>
                  </div>
                ))}
              </div>

            </section>
          ))}
        </div>
      </div>

      {/* High-Fidelity A4 Document Preview Modal */}
      {previewBulletin && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center bg-slate-900/95 backdrop-blur-xl p-4 sm:p-8 animate-[fadeIn_0.2s_ease-out]" onClick={() => setPreviewBulletin(null)}>
          <button className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer transform hover:scale-110 z-50 shadow-sm" onClick={(e) => { e.stopPropagation(); setPreviewBulletin(null); }}>
            <X className="w-8 h-8" />
          </button>

          <div className="w-full max-w-3xl aspect-[1/1.414] max-h-[85vh] bg-white rounded-md overflow-hidden shadow-[0_0_80px_rgba(206,29,83,0.2)] relative flex flex-col cursor-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Document Header Ribbon */}
            <div className="absolute top-0 inset-x-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 z-10 flex items-center justify-between px-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#012f64]/10 rounded flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-[#012f64]" />
                </div>
                <div>
                  <h4 className="font-black text-[#012f64] text-sm md:text-base uppercase tracking-wider leading-tight">The Seal of Change</h4>
                  <p className="text-[#ce1d53] text-[10px] font-bold uppercase tracking-widest">{previewBulletin.language} Translation</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block bg-[#ce1d53]/10 text-[#ce1d53] px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest border border-[#ce1d53]/20">Reading Mode</span>
                <a
                  href={previewBulletin.pdfUrl || previewBulletin.cover}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`${previewBulletin.language}_Bulletin.pdf`}
                  className="bg-[#012f64] hover:bg-[#02438c] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Download</span>
                </a>
              </div>
            </div>

            {/* Document Content Core */}
            <div className="w-full h-full overflow-hidden bg-slate-100 pt-16">
              <img loading="lazy"
                src={previewBulletin.cover}
                alt="Document Pages"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = SITE_IMAGES.fallbackLarge; }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ContactView = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Message dispatched successfully!');
        setName(''); setEmail(''); setMessage('');
      } else {
        setStatus('Failed to dispatch message.');
      }
    } catch (err) {
      setStatus('Error connecting to server.');
    }
  };

  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out]">


      <PageHeader title="Contact & Alliance" subtitle="Join our club or forge an alliance!" />
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#ce1d53]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#012f64]/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(1,47,100,0.08)] flex flex-col lg:flex-row border border-[#012f64]/10 transform hover:shadow-[0_25px_70px_rgba(1,47,100,0.12)] transition-shadow duration-700">
            <div className="p-12 lg:p-20 lg:w-3/5 order-2 lg:order-1 bg-white relative">
              <h2 className="text-4xl font-black text-[#012f64] uppercase mb-4 tracking-tight">Send a Scroll</h2>
              <p className="text-slate-500 mb-6 font-medium text-lg">We await your message from across the realm.</p>
              {status && <p className="text-[#ce1d53] font-bold mb-6">{status}</p>}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative group">
                  <label className="absolute left-6 top-0 -translate-y-1/2 bg-white px-2 text-xs font-black text-[#012f64] uppercase tracking-widest z-10 group-focus-within:text-[#ce1d53] transition-colors">Full Name</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Your noble name" className="w-full px-6 py-5 rounded-2xl bg-slate-50/50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#ce1d53]/10 focus:border-[#ce1d53] transition-all text-lg text-[#012f64] placeholder-slate-400 cursor-text shadow-sm hover:border-[#012f64]/30" />
                </div>
                <div className="relative group">
                  <label className="absolute left-6 top-0 -translate-y-1/2 bg-white px-2 text-xs font-black text-[#012f64] uppercase tracking-widest z-10 group-focus-within:text-[#ce1d53] transition-colors">Email Address</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your.name@realm.com" className="w-full px-6 py-5 rounded-2xl bg-slate-50/50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#ce1d53]/10 focus:border-[#ce1d53] transition-all text-lg text-[#012f64] placeholder-slate-400 cursor-text shadow-sm hover:border-[#012f64]/30" />
                </div>
                <div className="relative group">
                  <label className="absolute left-6 top-0 -translate-y-1/2 bg-white px-2 text-xs font-black text-[#012f64] uppercase tracking-widest z-10 group-focus-within:text-[#ce1d53] transition-colors">Message</label>
                  <textarea rows="5" required value={message} onChange={e => setMessage(e.target.value)} placeholder="Pen your thoughts here..." className="w-full px-6 py-5 rounded-2xl bg-slate-50/50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#ce1d53]/10 focus:border-[#ce1d53] transition-all text-lg resize-none text-[#012f64] placeholder-slate-400 shadow-sm cursor-text hover:border-[#012f64]/30"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-[#ce1d53] to-[#a81743] text-white font-black uppercase tracking-widest py-5 rounded-2xl hover:from-[#a81743] hover:to-[#ce1d53] transition-all shadow-[0_10px_25px_rgba(206,29,83,0.3)] hover:shadow-[0_15px_35px_rgba(206,29,83,0.4)] text-lg transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-3">Dispatch Raven <ChevronRight className="w-5 h-5" /></button>
              </form>
            </div>
            <div className="bg-[#012f64] text-white p-12 lg:p-20 lg:w-2/5 order-1 lg:order-2 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#02438c] via-[#012f64] to-[#011a38] opacity-90"></div>
              <Shield className="absolute -right-20 -top-20 w-[30rem] h-[30rem] text-white opacity-5 pointer-events-none transform rotate-12" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 mb-10">
                  <span className="w-10 h-1 bg-[#ce1d53] rounded-full"></span>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight">Our Stronghold</h2>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start group p-4 -ml-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10">
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mr-6 shrink-0 group-hover:bg-[#ce1d53] transition-colors shadow-inner"><MapPin className="w-6 h-6 text-white" /></div>
                    <div className="mt-1"><p className="text-white text-xl font-black tracking-wide">Info Institute of Engineering</p><p className="text-white/70 mt-2 leading-relaxed text-base font-medium">Sathy Road, Kovilpalayam,<br />Coimbatore, Tamil Nadu 641107</p></div>
                  </div>
                  <div className="flex items-center group p-4 -ml-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10">
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mr-6 shrink-0 group-hover:bg-[#ce1d53] transition-colors shadow-inner"><Phone className="w-6 h-6 text-white" /></div>
                    <div><p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Direct Line</p><p className="text-white text-xl font-bold">+91 73975 11613 <span className="text-sm text-[#ce1d53] ml-2 uppercase font-black tracking-widest group-hover:text-white transition-colors">(President)</span></p></div>
                  </div>
                  <div className="flex items-center group p-4 -ml-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10">
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mr-6 shrink-0 group-hover:bg-[#ce1d53] transition-colors shadow-inner"><Mail className="w-6 h-6 text-white" /></div>
                    <div><p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Electronic Scroll</p><p className="text-white text-xl font-bold">racinfo3206@gmail.com</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// CLUB DOCUMENTS PORTAL
const ClubDocumentsView = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [previewDoc, setPreviewDoc] = useState(null);

  // New state variables for Document Management
  const [documents, setDocuments] = useState([]);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [docFormData, setDocFormData] = useState({ title: '', type: 'PDF', url: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [manageStatus, setManageStatus] = useState('');
  const [loadingDocs, setLoadingDocs] = useState(true);

  const fetchDocuments = async () => {
    setLoadingDocs(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/documents`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setDocuments(data);
      }
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    } finally {
      setLoadingDocs(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchDocuments();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'President' && password === 'racinfo') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const openAddModal = () => {
    setEditingDoc(null);
    setDocFormData({ title: '', type: 'PDF', url: '' });
    setSelectedFile(null);
    setManageStatus('');
    setIsManageModalOpen(true);
  };

  const openEditModal = (doc) => {
    setEditingDoc(doc);
    setDocFormData({ title: doc.title, type: doc.type, url: doc.url });
    setSelectedFile(null);
    setManageStatus('');
    setIsManageModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/documents/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setDocuments(documents.filter(d => d.id !== id));
      } else {
        alert("Failed to delete document");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting document");
    }
  };

  const handleManageSubmit = async (e) => {
    e.preventDefault();
    setManageStatus('Processing...');

    const formData = new FormData();
    formData.append('title', docFormData.title);
    formData.append('type', docFormData.type);

    // Only require a file for new documents, or allow just URL updates
    if (selectedFile) {
      formData.append('file', selectedFile);
    } else {
      formData.append('url', docFormData.url);
    }

    try {
      let url = `${API_BASE_URL}/api/documents`;
      let method = 'POST';

      if (editingDoc) {
        url = `${url}/${editingDoc.id}`;
        method = 'PUT';
      } else {
        formData.append('id', `cd${Date.now()}`); // Generate a unique ID for new docs
      }

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setManageStatus('Success!');
        fetchDocuments(); // Refresh list
        setTimeout(() => setIsManageModalOpen(false), 1000);
      } else {
        setManageStatus(data.error || 'Failed to save document');
      }
    } catch (err) {
      console.error(err);
      setManageStatus('Network error.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 relative overflow-hidden animate-[fadeIn_0.5s_ease-in-out]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(1,47,100,0.05)_0%,_transparent_100%)] pointer-events-none"></div>
        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(1,47,100,0.08)] border border-[#012f64]/10 p-12 relative z-10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#012f64] to-[#02438c] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FileText className="w-10 h-10 text-white drop-shadow-md" />
            </div>
            <h2 className="text-3xl font-black text-[#012f64] uppercase tracking-widest">Documents</h2>
            <p className="text-[#ce1d53] text-xs font-bold uppercase tracking-widest mt-2">Restricted Vault</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold text-center border border-red-100 animate-[fadeIn_0.3s_ease-in-out]">
                {error}
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#012f64] uppercase tracking-widest ml-4">Identifier</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#ce1d53]/10 focus:border-[#ce1d53] transition-all text-[#012f64] font-medium" placeholder="Enter username" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#012f64] uppercase tracking-widest ml-4">Passcode</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-14 pr-12 py-4 rounded-2xl bg-slate-50/50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#ce1d53]/10 focus:border-[#ce1d53] transition-all text-[#012f64] font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-[#ce1d53] transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#ce1d53] hover:bg-[#a81743] text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-[0_10px_25px_rgba(206,29,83,0.3)] hover:shadow-[0_15px_35px_rgba(206,29,83,0.4)] transform hover:-translate-y-1 cursor-pointer mt-4">
              Unlock Vault
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out]">
      <PageHeader title="Club Documents" subtitle="Official archives and administrative files." />

      <div className="bg-slate-50 py-24 min-h-[60vh] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-black text-[#012f64] uppercase tracking-tight">Official Documents & Reports</h2>
              <div className="w-16 h-1 bg-[#ce1d53] mt-3 rounded-full"></div>
            </div>
            <div className="flex gap-4">
              <button onClick={openAddModal} className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ce1d53] to-[#a81743] hover:from-[#a81743] hover:to-[#ce1d53] text-white font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer px-5 py-2.5 rounded-full shadow-sm hover:shadow-md">
                <Plus className="w-4 h-4" /> Add Document
              </button>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 text-slate-500 hover:text-[#ce1d53] font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm hover:shadow-md">
                <LogOut className="w-4 h-4" /> Secure Exit
              </button>
            </div>
          </div>

          {loadingDocs ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-[#012f64]/20 border-t-[#ce1d53] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#012f64] font-bold uppercase tracking-widest">Accessing Vault...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-bold uppercase tracking-widest">The Vault is Empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#012f64]/10 hover:shadow-[0_15px_40px_rgba(1,47,100,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative group">

                  {/* Edit & Delete Controls Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(doc)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#012f64] hover:text-white text-slate-500 flex items-center justify-center transition-colors cursor-pointer" title="Edit">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(doc.id)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#ce1d53] hover:text-white text-slate-500 flex items-center justify-center transition-colors cursor-pointer" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-start justify-between mb-6 pr-10">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-inner shrink-0">
                      <FileText className="w-6 h-6 text-[#ce1d53]" />
                    </div>
                    <span className="bg-[#012f64]/5 text-[#012f64] px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest ml-4 text-right break-words shrink-0">
                      {doc.type} • {doc.size}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-[#012f64] mb-4 flex-grow tracking-wide pr-8">{doc.title}</h3>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="flex-1 bg-slate-50 hover:bg-[#012f64]/5 text-[#012f64] py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:border-[#012f64]/10"
                    >
                      <Eye className="w-4 h-4" /> Preview
                    </button>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={doc.title}
                      className="flex-1 bg-[#ce1d53]/10 hover:bg-[#ce1d53] text-[#ce1d53] hover:text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#ce1d53]/20 hover:border-transparent"
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Add / Edit Document Modal */}
      {isManageModalOpen && (
        <div className="fixed inset-0 z-[9500] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsManageModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-[#ce1d53] transition-colors cursor-pointer">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-black text-[#012f64] mb-6 uppercase tracking-tight">{editingDoc ? 'Edit Document' : 'Add Document'}</h3>

            <form onSubmit={handleManageSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Title</label>
                <input required type="text" value={docFormData.title} onChange={e => setDocFormData({ ...docFormData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ce1d53] text-[#012f64]" placeholder="E.g. Monthly Report June" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Type</label>
                  <select value={docFormData.type} onChange={e => setDocFormData({ ...docFormData, type: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ce1d53] text-[#012f64] appearance-none">
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="XLSX">XLSX</option>
                    <option value="Image">Image</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">File Upload (Optional on Edit)</label>
                <input type="file" onChange={e => setSelectedFile(e.target.files[0])} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ce1d53] text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#ce1d53]/10 file:text-[#ce1d53] hover:file:bg-[#ce1d53]/20" />
                {editingDoc && !selectedFile && <p className="text-[10px] text-slate-400 mt-1">Leave empty to keep the current file ({docFormData.url})</p>}
                {!editingDoc && !selectedFile && <p className="text-[10px] text-slate-400 mt-1">Alternatively, provide external URL below.</p>}
              </div>

              {!selectedFile && (
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">External URL</label>
                  <input type={editingDoc ? "text" : "url"} value={docFormData.url} onChange={e => setDocFormData({ ...docFormData, url: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ce1d53] text-[#012f64]" placeholder="https://..." />
                </div>
              )}

              {manageStatus && <p className={`text-sm font-bold text-center ${manageStatus === 'Success!' ? 'text-green-600' : 'text-[#ce1d53]'}`}>{manageStatus}</p>}

              <button type="submit" className="w-full bg-[#012f64] hover:bg-[#02438c] text-white font-black uppercase tracking-widest py-3 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer mt-2">
                {editingDoc ? 'Save Changes' : 'Upload Document'}
              </button>
            </form>
          </div>
        </div>
      )}

      {previewDoc && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center bg-slate-900/95 backdrop-blur-xl p-4 sm:p-8 animate-[fadeIn_0.2s_ease-out]" onClick={() => setPreviewDoc(null)}>
          <button className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer transform hover:scale-110 z-50 shadow-sm" onClick={(e) => { e.stopPropagation(); setPreviewDoc(null); }}>
            <X className="w-8 h-8" />
          </button>

          <div className="w-full max-w-4xl aspect-[1/1.414] max-h-[85vh] bg-white rounded-md overflow-hidden shadow-[0_0_80px_rgba(206,29,83,0.2)] relative flex flex-col cursor-auto" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-0 inset-x-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 z-10 flex items-center justify-between px-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#012f64]/10 rounded flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-[#012f64]" />
                </div>
                <div>
                  <h4 className="font-black text-[#012f64] text-sm md:text-base uppercase tracking-wider leading-tight">{previewDoc.title}</h4>
                  <p className="text-[#ce1d53] text-[10px] font-bold uppercase tracking-widest">Document Preview</p>
                </div>
              </div>
            </div>

            <div className="w-full h-full overflow-hidden bg-slate-100 pt-16">
              <img loading="lazy"
                src={previewDoc.url}
                alt={`${previewDoc.title} Preview`}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = SITE_IMAGES.fallbackLarge; }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const WhatsAppWidget = () => {
  return (
    <a
      href="https://wa.me/917397511613"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-white"></div>
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white fill-current" />

      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-white text-slate-800 text-xs font-bold uppercase tracking-widest py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap border border-slate-100">
        Chat With Us
      </span>
    </a>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // App-level state to power dynamic admin interactions across views
  const [projectsState, setProjectsState] = useState(initialProjectCatalog);
  const [galleryState, setGalleryState] = useState(galleryAlbums);
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setProjectsState(data);
        }
      })
      .catch(err => console.error("Error fetching projects:", err));

    fetch(`${API_BASE_URL}/api/gallery`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setGalleryState(data);
        }
      })
      .catch(err => console.error("Error fetching gallery:", err));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
    setIsMoreMenuOpen(false);
  }, [currentPage]);

  const handleNav = (link) => {
    if (link === 'Join Us') {
      setCurrentPage('Contact');
    } else {
      setCurrentPage(link);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Home': return <HomeView setCurrentPage={setCurrentPage} />;
      case 'About Us': return <AboutView />;
      case 'Blood Donation': return <BloodDonationView />;
      case 'Projects': return <ProjectsView catalog={projectsState} />;
      case 'Gallery': return <GalleryView albums={galleryState} />;
      case 'Power Stones': return <PowerStonesView />;
      case 'Bulletin': return <BulletinView />;
      case 'Board': return <BoardView />;
      case 'Contact': return <ContactView />;
      case 'Admin': return <AdminView catalog={projectsState} setCatalog={setProjectsState} galleryCatalog={galleryState} setGalleryCatalog={setGalleryState} authState={isAdminAuth} setAuth={setIsAdminAuth} />;
      case 'Club Documents': return <ClubDocumentsView />;
      default: return <HomeView setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <HelmetProvider>
      {(() => {
        const getSeoData = () => {
          switch (currentPage) {
            case 'Home': return { title: "Home | RAC IIE", desc: "Welcome to the Rotaract Club of Info Institute of Engineering." };
            case 'About Us': return { title: "About Us | RAC IIE", desc: "Learn about our rich history, mission, and the Dragon Clan leadership team at RAC IIE." };
            case 'Projects': return { title: "Projects | RAC IIE", desc: "Explore our ongoing, upcoming, and completed community service and professional development projects." };
            case 'Gallery': return { title: "Gallery | RAC IIE", desc: "Browse through moments captured during our flagship events and community outreach programs." };
            case 'Contact': return { title: "Contact Us | RAC IIE", desc: "Get in touch with the Rotaract Club of Info Institute of Engineering." };
            case 'Admin': return { title: "Admin Portal | RAC IIE", desc: "Restricted Project Management Center." };
            case 'Club Documents': return { title: "Club Documents | RAC IIE", desc: "Official archives and administrative files of RAC IIE." };
            default: return { title: "Rotaract Club of Info Institute of Engineering", desc: "Official website of RAC IIE." };
          }
        };
        const seo = getSeoData();
        return (
          <Helmet key={currentPage}>
            <title>{seo.title}</title>
            <meta name="description" content={seo.desc} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.desc} />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.desc} />
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NGO",
                "name": "Rotaract Club of Info Institute of Engineering",
                "url": "https://racinfo.org",
                "logo": "https://racinfo.org/assets/Colour.png"
              })}
            </script>
          </Helmet>
        );
      })()}
      <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-[#ce1d53] selection:text-white flex flex-col cursor-none">
        <RotaractCursor />
        <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-[#012f64]/10">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-24">
              <div className="flex items-center cursor-pointer group py-3" onClick={() => handleNav('Home')}>
                <div className="flex-shrink-0 flex items-center gap-4">
                  <img loading="lazy" src={SITE_IMAGES.logo} alt="Rotaract Club Logo" className="h-16 w-auto object-contain group-hover:scale-105 transition-all duration-300" onError={(e) => { e.target.style.display = 'none'; }} />
                  <div className="hidden sm:flex flex-col border-l border-[#012f64]/20 pl-4">
                    <span className="font-light text-xl text-[#012f64] leading-tight tracking-widest uppercase">Rotaract Club of</span>
                    <span className="text-sm text-[#ce1d53] font-normal tracking-widest uppercase mt-0.5">Info Institute of Engineering</span>
                  </div>
                </div>
              </div>
              <div className="hidden xl:flex items-center space-x-2">
                {primaryNavLinks.map((link) => (
                  <button key={link} onClick={() => handleNav(link)} className={`px-4 py-2 rounded-lg font-light text-sm transition-all uppercase tracking-widest ${currentPage === link ? 'text-[#ce1d53] bg-[#ce1d53]/10 font-medium' : 'text-slate-600 hover:text-[#ce1d53] hover:bg-[#012f64]/5'} cursor-pointer`}>{link}</button>
                ))}
                <div className="relative">
                  <button onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)} className={`flex items-center px-4 py-2 rounded-lg font-light text-sm transition-all uppercase tracking-widest text-slate-600 hover:text-[#ce1d53] hover:bg-[#012f64]/5 cursor-pointer`}>More <ChevronDown className="ml-1 w-4 h-4" /></button>
                  {isMoreMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#012f64]/10 rounded-xl shadow-lg overflow-hidden py-2 animate-[fadeIn_0.2s_ease-in-out]">
                      {moreNavLinks.map((link) => (
                        <button key={link} onClick={() => handleNav(link)} className={`w-full text-left px-6 py-3 font-light text-sm uppercase tracking-wider transition-colors cursor-pointer ${currentPage === link ? 'bg-[#ce1d53]/10 text-[#ce1d53] font-medium' : 'text-slate-600 hover:bg-[#012f64]/5 hover:text-[#ce1d53]'}`}>{link}</button>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => handleNav('Contact')} className="ml-6 bg-gradient-to-r from-[#ce1d53] to-[#a81743] text-white px-6 py-2.5 rounded font-medium hover:from-[#a81743] hover:to-[#ce1d53] transition-colors shadow-sm uppercase tracking-widest cursor-pointer">Join Us</button>
              </div>
              <div className="xl:hidden flex items-center">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-[#ce1d53] focus:outline-none p-2 bg-white hover:bg-[#012f64]/5 rounded-lg transition-colors cursor-pointer">{isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}</button>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="xl:hidden bg-white border-t border-[#012f64]/10 pb-6 shadow-xl absolute w-full left-0 max-h-[80vh] overflow-y-auto">
              <div className="px-4 pt-4 pb-3 space-y-2 sm:px-6">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2 px-4">Primary</div>
                {primaryNavLinks.map((link) => (
                  <button key={link} onClick={() => handleNav(link)} className={`w-full text-left px-4 py-3 rounded-lg font-light uppercase tracking-widest text-sm transition-colors cursor-pointer ${currentPage === link ? 'bg-[#ce1d53]/10 text-[#ce1d53] font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-[#ce1d53]'}`}>{link}</button>
                ))}
                <div className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-6 mb-2 px-4 pt-4 border-t border-slate-100">More Pages</div>
                {moreNavLinks.map((link) => (
                  <button key={link} onClick={() => handleNav(link)} className={`w-full text-left px-4 py-3 rounded-lg font-light uppercase tracking-widest text-sm transition-colors cursor-pointer ${currentPage === link ? 'bg-[#ce1d53]/10 text-[#ce1d53] font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-[#ce1d53]'}`}>{link}</button>
                ))}
              </div>
            </div>
          )}
        </nav>
        <main className="flex-grow">{renderPage()}</main>
        <footer className="bg-white text-slate-500 py-16 border-t border-[#012f64]/10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-8">
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start gap-6 max-w-md">
              <img loading="lazy" src={SITE_IMAGES.logo} alt="Footer Logo" className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 filter grayscale contrast-125 hover:grayscale-0 shrink-0 cursor-pointer" onClick={() => handleNav('Home')} onError={(e) => { e.target.style.display = 'none'; }} />
              <div>
                <p className="text-[#012f64] font-bold mb-2 text-lg tracking-wide">© {new Date().getFullYear()} Rotaract Club of Info Institute of Engineering.</p>
                <p className="text-sm font-medium uppercase tracking-widest text-slate-500">© Developed by RINESH GURU S </p>
              </div>
            </div>
            <div className="text-center lg:text-left flex flex-col gap-1">
              <p className="text-[#012f64] font-black uppercase tracking-widest text-sm mb-2">Our Stronghold</p>
              <p className="text-sm font-medium text-slate-600">Info Institute of Engineering</p>
              <p className="text-sm font-medium text-slate-600">Sathy Road, Kovilpalayam,</p>
              <p className="text-sm font-medium text-slate-600">Coimbatore, Tamil Nadu 641107</p>
              <p className="text-sm font-bold text-[#ce1d53] mt-3 cursor-pointer hover:text-[#a81743] transition-colors">+91 73975 11613 <span className="text-slate-400 font-medium ml-1 uppercase text-xs tracking-widest">(President)</span></p>
              <p className="text-sm font-bold text-[#ce1d53] cursor-pointer hover:text-[#a81743] transition-colors">racinfo3206@gmail.com</p>
            </div>
            <div className="flex gap-6 shrink-0">
              <button className="w-14 h-14 rounded-full bg-white border border-[#012f64]/20 flex items-center justify-center hover:bg-[#ce1d53] hover:text-white hover:border-[#ce1d53] transition-all transform hover:-translate-y-1 shadow-sm text-[#012f64] cursor-pointer"><span className="sr-only">Facebook</span><span className="font-black text-sm uppercase tracking-widest">FB</span></button>
              <button className="w-14 h-14 rounded-full bg-white border border-[#012f64]/20 flex items-center justify-center hover:bg-[#ce1d53] hover:text-white hover:border-[#ce1d53] transition-all transform hover:-translate-y-1 shadow-sm text-[#012f64] cursor-pointer"><span className="sr-only">Instagram</span><span className="font-black text-sm uppercase tracking-widest">IG</span></button>
              <button className="w-14 h-14 rounded-full bg-white border border-[#012f64]/20 flex items-center justify-center hover:bg-[#ce1d53] hover:text-white hover:border-[#ce1d53] transition-all transform hover:-translate-y-1 shadow-sm text-[#012f64] cursor-pointer"><span className="sr-only">LinkedIn</span><span className="font-black text-sm uppercase tracking-widest">IN</span></button>
            </div>
          </div>
        </footer>
        <WhatsAppWidget />
      </div>
    </HelmetProvider>
  );
}