import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const chars = textRef.current.querySelectorAll('.about-char');

            // "Turning ON" & "Turning OFF" phase for text
            // We use a scrub animation that reveals text as it enters the "sweet spot" of the viewport
            // and dims it as it leaves.
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    scrub: true,
                }
            });

            tl.to(chars, {
                color: 'rgba(255, 255, 255, 1)',
                stagger: {
                    each: 0.05,
                    from: "start"
                },
                duration: 0.3
            })
            .to(chars, {
                color: 'rgba(255, 255, 255, 0.1)',
                stagger: {
                    each: 0.05,
                    from: "start"
                },
                duration: 0.3
            }, "+=0.2");

            // Caption flicker animation "Turning On"
            gsap.fromTo('.about-caption', 
                { opacity: 0, x: -20 },
                { 
                    opacity: 1, 
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play reverse play reverse'
                    }
                }
            );

            // Parallax as it moves
            gsap.to('.about-container', {
                y: -30,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const description = "I'm Yahyobek Urozaliyev, a creative web developer focused on building functional, high-end digital experiences. I combine design thinking with performance-driven code to bridge the gap between aesthetics and technology.";

    return (
        <section className="about-section" ref={sectionRef} id="about">
            <div className="about-container">
                <div className="about-left">
                    <span className="about-caption">WHO I AM</span>
                </div>
                <div className="about-right">
                    <p className="about-text" ref={textRef}>
                        {description.split(' ').map((word, i) => (
                            <span key={i} className="about-word">
                                {word.split('').map((char, j) => (
                                    <span key={j} className="about-char">{char}</span>
                                ))}
                                &nbsp;
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
