import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import '../styles/projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        index: '01',
        title: 'Rekhchand',
        description: 'A high-end fashion portfolio focused on minimal aesthetics and editorial grid systems.',
        category: 'PORTFOLIO WEBSITE',
        tech: 'REACT • GSAP • THREE.JS',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80',
        url: '#'
    },
    {
        index: '02',
        title: 'Zenith',
        description: 'Visual identity and digital experience for a modern architecture firm based in Sweden.',
        category: 'BRAND IDENTITY',
        tech: 'FRAMER • DESIGN • MOTION',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80',
        url: '#'
    },
    {
        index: '03',
        title: 'Lumina',
        description: 'An immersive web experience exploring the intersection of light and digital shadows.',
        category: 'CREATIVE DEV',
        tech: 'WEBFLOW • NO-CODE • CSS',
        image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80',
        url: '#'
    },
    {
        index: '04',
        title: 'Arte.m',
        description: 'Digital gallery showcasing contemporary motion pieces and generative art collections.',
        category: 'DIGITAL GALLERY',
        tech: 'REACT • GSAP • SHADERS',
        image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80',
        url: '#'
    }
];

const Projects = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.project-card');

            cards.forEach((card, i) => {
                // Entrance Animation
                gsap.fromTo(card,
                    {
                        y: 100,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "top 30%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Hover Parallax on Background Image
                const bgImg = card.querySelector('.card-bg-blur img');
                card.addEventListener('mouseenter', () => {
                    gsap.to(bgImg, { scale: 1.1, duration: 1.5, ease: "power2.out" });
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(bgImg, { scale: 1, duration: 1.5, ease: "power2.out" });
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="projects-section" ref={containerRef} id="work">
            <div className="section-title-wrapper">
                <span className="section-label">SELECTED WORKS</span>
                <div className="section-line"></div>
            </div>

            <div className="projects-grid">
                {projects.map((project, i) => (
                    <div className="project-card" key={i}>
                        {/* 1. Top-Left Circular Index */}
                        <div className="card-index">
                            <div className="index-circle">
                                <span className="index-text">PROJECT</span>
                                <span className="index-number">{project.index} | 04</span>
                            </div>
                        </div>

                        {/* 2. Top-Right Device Preview */}
                        <div className="card-device-preview">
                            <div className="device-mockup">
                                <img src={project.image} alt="mobile preview" />
                                <div className="device-glare"></div>
                            </div>
                        </div>

                        {/* 3. Center-Right Metadata */}
                        <div className="card-metadata">
                            <span className="meta-category">{project.category}</span>
                            <div className="meta-divider"></div>
                            <span className="meta-tech">{project.tech}</span>
                        </div>

                        {/* 4. Bottom-Left Main Content */}
                        <div className="card-content">
                            <h2 className="card-title">{project.title}</h2>
                            <p className="card-description">{project.description}</p>
                            <a href={project.url} className="card-cta">
                                <span className="cta-text">VISIT SITE</span>
                                <ArrowUpRight size={18} strokeWidth={1.5} />
                                <div className="cta-underline"></div>
                            </a>
                        </div>

                        {/* 5. Bottom-Right Background Preview */}
                        <div className="card-bg-blur">
                            <img src={project.image} alt="depth effect" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
