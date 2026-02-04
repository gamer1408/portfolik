import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const headlineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Headline reveal
            gsap.fromTo(headlineRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: headlineRef.current,
                        start: 'top 90%',
                    }
                }
            );

            // Social links stagger
            gsap.fromTo('.footer-social-link',
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.footer-socials',
                        start: 'top 95%',
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer className="footer" ref={footerRef} id="contact">
            <div className="footer-content">
                <div className="footer-cta">
                    <span className="cta-label">HAVE A PROJECT IN MIND?</span>
                    <h2 className="cta-headline" ref={headlineRef}>
                        LET’S WORK <br /> TOGETHER
                    </h2>
                    <a href="mailto:urozaliyevyahyobek@gmail.com" className="cta-email">
                        urozaliyevyahyobek@gmail.com
                    </a>
                </div>

                <div className="footer-bottom">
                    <div className="footer-socials">
                        <a href="https://instagram.com" className="footer-social-link">INSTAGRAM</a>
                        <a href="https://linkedin.com" className="footer-social-link">LINKEDIN</a>
                        <a href="https://twitter.com" className="footer-social-link">TWITTER</a>
                        <a href="https://behance.com" className="footer-social-link">BEHANCE</a>
                    </div>

                    <div className="footer-credits">
                        <div className="credit-item">
                            <span>DESIGNED & DEVELOPED</span>
                            <span>© 2025 YAHYOBEK UROZALIYEV</span>
                        </div>
                        <div className="credit-item">
                            <span>LOCAL TIME</span>
                            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} ANGREN, UZ</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
