import React, { useState, useRef, useEffect } from 'react';
import '../styles/components/HomeSection.css';

const HomeSection = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const scrollProgress = 1 - Math.max(0, Math.min(1, rect.bottom / window.innerHeight));
                sectionRef.current.style.opacity = 1 - scrollProgress;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
            if (isPlaying && isVideoLoaded) {
                videoRef.current.play().catch(error => {
                    console.error("Autoplay was prevented:", error);
                    setIsPlaying(false);
                });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isMuted, isPlaying, isVideoLoaded]);

    const handleVideoLoaded = () => {
        setIsVideoLoaded(true);
    };

    const toggleMute = () => setIsMuted(!isMuted);
    const togglePlay = () => setIsPlaying(!isPlaying);

    return (
        <section id="home" className="home-section" ref={sectionRef}>
            <div className="video-container">
                <video
                    ref={videoRef}
                    onLoadedData={handleVideoLoaded}
                    loop
                    playsInline
                    className="video-background"
                >
                    <source src={`${process.env.PUBLIC_URL}/videos/DrumkeeranV1.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {isVideoLoaded && (
                    <div className="video-controls">
                        <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                            {isMuted ? 'Sound ON' : 'Sound OFF'}
                        </button>
                        <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                    </div>
                )}
            </div>
            <div className="content-wrapper">
                <h1 className="welcome-text">Welcome to Drumkeeran</h1>
            </div>
        </section>
    );
};

export default HomeSection;