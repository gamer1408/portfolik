import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Monitor, ExternalLink, Sparkles } from 'lucide-react';
import '../styles/projects.css';

const projects = [
    {
        id: 'YU-0126',
        index: '01',
        title: 'Aurum Architects',
        subtitle: 'Luxury Studio',
        description: 'A high-end minimalist landing page for an architecture studio, featuring split-screen design, smooth Framer Motion animations, and a luxury dark/gold aesthetic.',
        tech: 'REACT • TAILWIND CSS • FRAMER MOTION',
        url: 'https://architect-urozaliyev-two.vercel.app/',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2053',
        color: '#0D0D0D',
        accent: '#D4AF37'
    },
    {
        id: 'YU-0226',
        index: '02',
        title: 'FooCom',
        subtitle: 'AI Football Commentator',
        description: 'An innovative sports tech startup platform using AI for real-time football commentary. Features a modern, tech-focused design with neon accents.',
        tech: 'REACT • TAILWIND CSS • AI CONCEPT',
        url: 'https://foocomurozaliyev.vercel.app/',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2093',
        color: '#0A0E1A',
        accent: '#3B82F6'
    },
    {
        id: 'YU-0326',
        index: '03',
        title: 'Malina.uz',
        subtitle: 'Premium Raspberry Business',
        description: 'A dedicated business platform for selling high-quality raspberry seedlings. Connects customers with product details and ordering information.',
        tech: 'REACT • TAILWIND CSS',
        url: 'https://malina-uz.vercel.app/',
        image: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?auto=format&fit=crop&q=80&w=2009',
        color: '#1A0D0D',
        accent: '#DC2626'
    }
];

const ProjectCard = ({ project, index, total }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const cardRef = useRef(null);

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Enhanced Parallax Motion Values (disabled on mobile)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 25, mass: 0.5 };
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);

    // 3D Transform values (reduced on mobile)
    const rotateX = useTransform(mouseY, [-100, 100], isMobile ? [0, 0] : [8, -8]);
    const rotateY = useTransform(mouseX, [-100, 100], isMobile ? [0, 0] : [-8, 8]);

    // Enhanced parallax for different elements (disabled on mobile)
    const previewX = useTransform(mouseX, [-100, 100], isMobile ? [0, 0] : [-12, 12]);
    const previewY = useTransform(mouseY, [-100, 100], isMobile ? [0, 0] : [-10, 10]);

    const titleX = useTransform(mouseX, [-100, 100], isMobile ? [0, 0] : [-5, 5]);
    const titleY = useTransform(mouseY, [-100, 100], isMobile ? [0, 0] : [-3, 3]);

    const handleMouseMove = (e) => {
        if (!cardRef.current || isMobile) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        x.set(offsetX);
        y.set(offsetY);

        // Update cursor position for magnetic effect
        setCursorPosition({
            x: (offsetX / rect.width) * 100,
            y: (offsetY / rect.height) * 100
        });
    };

    const handleMouseLeave = () => {
        if (isMobile) return;
        x.set(0);
        y.set(0);
        setIsHovered(false);
        setCursorPosition({ x: 0, y: 0 });
    };

    const cardSpring = {
        type: "spring",
        stiffness: 150,
        damping: 18,
        mass: 0.8
    };

    return (
        <motion.div
            className="project-card-wrapper"
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                    delay: index * 0.15
                }
            }}
            viewport={{ once: true, margin: "-120px" }}
        >
            <motion.div
                ref={cardRef}
                className="project-card-inner"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                animate={{
                    scale: isHovered ? 1.02 : 1,
                    backgroundColor: project.color
                }}
                transition={cardSpring}
                style={{
                    rotateX,
                    rotateY,
                    transformPerspective: 2000
                }}
            >
                {/* Animated Gradient Overlay */}
                <motion.div
                    className="card-backdrop-blur"
                    animate={{
                        opacity: isHovered ? 0.5 : 0.3,
                        scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                />

                {/* Enhanced Index Circle with Sparkle */}
                <motion.div
                    className="card-index-overlay"
                    animate={{
                        scale: isHovered ? 1.05 : 1,
                        rotate: isHovered ? 5 : 0
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="index-circle">
                        <motion.span
                            className="label"
                            animate={{
                                letterSpacing: isHovered ? '0.25em' : '0.2em'
                            }}
                        >
                            PROJECT
                        </motion.span>
                        <span className="value">{project.index} | 0{total}</span>
                        {isHovered && (
                            <motion.div
                                initial={{ scale: 0, rotate: 0 }}
                                animate={{ scale: 1, rotate: 360 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    position: 'absolute',
                                    top: -5,
                                    right: -5
                                }}
                            >
                                <Sparkles size={14} color={project.accent} />
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Enhanced Metadata */}
                <motion.div
                    className="card-meta-overlay"
                    animate={{
                        y: isHovered ? -5 : 0,
                        opacity: isHovered ? 1 : 0.9
                    }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="meta-stack">
                        <motion.span
                            className="project-id"
                            animate={{
                                color: isHovered ? project.accent : '#fff'
                            }}
                        >
                            {project.id}
                        </motion.span>
                        <div className="divider"></div>
                        <span className="project-tech">{project.tech}</span>
                    </div>
                </motion.div>

                {/* Enhanced Main Content with Staggered Animation */}
                <motion.div
                    className="card-main-content"
                    style={{ x: titleX, y: titleY }}
                >
                    <motion.div
                        animate={{
                            opacity: isHovered ? 1 : 0.95,
                            y: isHovered ? -5 : 0
                        }}
                        transition={{ delay: 0.05, duration: 0.4 }}
                    >
                        <h2 className="card-title-display">
                            {project.title}
                        </h2>
                        {project.subtitle && (
                            <motion.p
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 300,
                                    fontStyle: 'italic',
                                    color: project.accent,
                                    marginTop: '-15px',
                                    marginBottom: '20px',
                                    opacity: 0.8
                                }}
                                animate={{
                                    opacity: isHovered ? 1 : 0.7,
                                    x: isHovered ? 5 : 0
                                }}
                            >
                                {project.subtitle}
                            </motion.p>
                        )}
                    </motion.div>

                    <motion.p
                        className="card-description-text"
                        animate={{
                            opacity: isHovered ? 1 : 0.7,
                            y: isHovered ? 0 : 10
                        }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                    >
                        {project.description}
                    </motion.p>

                    <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-visit-btn"
                        animate={{
                            opacity: isHovered ? 1 : 0.8,
                            y: isHovered ? 0 : 15,
                            scale: isHovered ? 1.05 : 1
                        }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                    >
                        <span>VISIT SITE</span>
                        <motion.div
                            animate={{
                                x: isHovered ? 3 : 0,
                                y: isHovered ? -3 : 0
                            }}
                        >
                            <ArrowUpRight size={18} />
                        </motion.div>
                    </motion.a>
                </motion.div>

                {/* Enhanced Preview Window with Advanced Parallax */}
                <motion.div
                    className="preview-window-container"
                    style={{ x: previewX, y: previewY }}
                    animate={{
                        scale: isHovered ? 1.05 : 1,
                        rotateY: isHovered ? -2 : 0,
                        rotateX: isHovered ? 2 : 0
                    }}
                    transition={cardSpring}
                >
                    <motion.div
                        className="preview-window-frame"
                        animate={{
                            y: isHovered ? -8 : 0
                        }}
                        transition={cardSpring}
                    >
                        <div className="window-header">
                            <div className="dots">
                                <motion.span
                                    animate={{
                                        scale: isHovered ? 1.2 : 1
                                    }}
                                />
                                <motion.span
                                    animate={{
                                        scale: isHovered ? 1.2 : 1
                                    }}
                                    transition={{ delay: 0.05 }}
                                />
                                <motion.span
                                    animate={{
                                        scale: isHovered ? 1.2 : 1
                                    }}
                                    transition={{ delay: 0.1 }}
                                />
                            </div>
                            <div className="address-bar">
                                <Monitor size={10} />
                                <span>{project.url}</span>
                            </div>
                        </div>

                        <div className="window-body">
                            {isHovered && window.innerWidth > 768 ? (
                                <motion.iframe
                                    src={project.url}
                                    title={project.title}
                                    className="live-preview-frame"
                                    loading="lazy"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            ) : (
                                <div className="static-preview-image">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        animate={{
                                            scale: isHovered ? 1.08 : 1
                                        }}
                                        transition={{ duration: 0.8 }}
                                    />
                                    <motion.div
                                        className="image-overlay"
                                        animate={{
                                            opacity: isHovered ? 1 : 0
                                        }}
                                    >
                                        <ExternalLink size={24} />
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Enhanced Radial Bloom with Dynamic Position */}
                <motion.div
                    className="card-radial-bloom"
                    animate={{
                        opacity: isHovered ? 1 : 0.6,
                        scale: isHovered ? 1.2 : 1,
                        x: cursorPosition.x * 0.5,
                        y: cursorPosition.y * 0.5
                    }}
                    transition={{ duration: 0.8 }}
                    style={{
                        background: `radial-gradient(circle, ${project.accent}20 0%, ${project.accent}10 30%, transparent 70%)`
                    }}
                />

                {/* Magnetic Cursor Follower */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.15, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            style={{
                                position: 'absolute',
                                width: '200px',
                                height: '200px',
                                borderRadius: '50%',
                                background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)`,
                                pointerEvents: 'none',
                                left: `calc(50% + ${cursorPosition.x}px)`,
                                top: `calc(50% + ${cursorPosition.y}px)`,
                                transform: 'translate(-50%, -50%)',
                                filter: 'blur(60px)',
                                zIndex: 2
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const containerRef = useRef(null);
    const { scrollXProgress } = useScroll({
        container: containerRef
    });

    return (
        <motion.section
            className="projects-horizontal-section"
            initial={{ opacity: 0 }}
            whileInView={{
                opacity: 1,
                transition: {
                    duration: 0.8,
                    ease: "easeOut"
                }
            }}
            viewport={{ once: true }}
        >
            {/* Scroll Progress Indicator */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #D4AF37, #FFD700)',
                    transformOrigin: '0%',
                    scaleX: scrollXProgress,
                    zIndex: 100,
                    opacity: 0.8
                }}
            />

            <div className="projects-scroll-container" ref={containerRef}>
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={i}
                        total={projects.length}
                    />
                ))}
                {/* Spacer for horizontal scroll padding */}
                <div className="scroll-spacer"></div>
            </div>
        </motion.section>
    );
};

export default Projects;
