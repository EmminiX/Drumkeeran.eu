import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import BusinessesSection from './components/BusinessesSection';
import EducationSportsSection from './components/EducationSportsSection';
import EventsSection from './components/EventsSection';
import OutdoorsSection from './components/OutdoorsSection';
import ContactSection from './components/ContactSection';
import Chatbot from './components/Chatbot';
import './styles/global.css';

function App() {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <ErrorBoundary>
            <div className="App">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="background-video"
                >
                    <source src={`${process.env.PUBLIC_URL}/videos/ireland_animation-2.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <Header />
                <main>
                    <HomeSection />
                    <AboutSection />
                    <BusinessesSection />
                    <EducationSportsSection />
                    <EventsSection />
                    <OutdoorsSection />
                    <ContactSection />
                </main>
                <Footer />
                <Chatbot />
                {showBackToTop && (
                    <button className="back-to-top" onClick={scrollToTop} aria-label="Back to Top">
                        ↑
                    </button>
                )}
            </div>
        </ErrorBoundary>
    );
}

export default App;