import React, { useState, useEffect } from 'react';
import '../styles/components/Header.css';

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackground(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setIsNavOpen(false);
    };

    return (
        <header className={`header ${showBackground ? 'with-background' : ''}`}>
            <nav className="nav">
                <div className="burger-menu" onClick={toggleNav} aria-label="Toggle navigation">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={`nav-links ${isNavOpen ? 'active' : ''}`}>
                    <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
                    <a href="#businesses" onClick={(e) => { e.preventDefault(); scrollToSection('businesses'); }}>Businesses</a>
                    <a href="#education-sports" onClick={(e) => { e.preventDefault(); scrollToSection('education-sports'); }}>Education & Sports</a>
                    <a href="#events" onClick={(e) => { e.preventDefault(); scrollToSection('events'); }}>Events & News</a>
                    <a href="#outdoors" onClick={(e) => { e.preventDefault(); scrollToSection('outdoors'); }}>Outdoors</a>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
                </div>
                <a href="https://gofund.me/42214d7c" className="donate-button" target="_blank" rel="noopener noreferrer">
                    ❤️ Donate 4FreeWi-Fi Project
                </a>
            </nav>
        </header>
    );
};

export default Header;