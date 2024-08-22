import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/AboutSection.css';

const AboutSection = () => {
    const [opacity, setOpacity] = useState(0);
    const sectionRef = useRef(null);

    const timelineEvents = [
        { year: 1840, event: "Drumkeeran village is established" },
        { year: 1925, event: "Establishment of Local Fairs" },
        { year: 1933, event: "Founding of Drumkeeran GAA Club" },
        { year: 1950, event: "The local church is renovated" },
        { year: 1970, event: "Formation of the Drumkeeran Development Association" },
        { year: 1985, event: "Drumkeeran wins the Tidy Towns competition" },
        { year: 2010, event: "New community center opens" },
        { year: 2024, event: "Launch of Drumkeeran.eu and FreeWi-Fi Project" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const visiblePercentage = Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight));
                setOpacity(visiblePercentage);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="about" className="about-section fade-transition" ref={sectionRef} style={{ opacity }}>
            <div className="content-box">
                <h2>The Heart of Drumkeeran</h2>
                <div className="about-content">
                    <p className="intro-paragraph">
                        Nestled in the rolling drumlins of County Leitrim, Drumkeeran whispers tales as old as the
                        hills themselves. This isn't just another dot on the map; it's a place where history and hope
                        intertwine like morning mist on Lough Allen.
                    </p>
                    <div className="about-details">
                        <h3>A Village Steeped in History</h3>
                        <p className="intro-paragraph">
                            The village stands proud at the foot of Sliabh an Iarainn, its spirit as unyielding as the
                            ancient stones that built it. Here, the past isn't just remembered—it's lived. From the
                            soulful melodies of John McKenna's flute to the powerful voice of Mary McPartlan, Drumkeeran's
                            sons and daughters have woven their stories into the very fabric of Irish culture.
                        </p>
                        <h3>Resilience and Community Spirit</h3>
                        <p className="intro-paragraph">
                            But Drumkeeran isn't content to rest on its laurels. Like the brave Tom Gilheaney who
                            marched off to Castlebar to join the rebel cause against British rule, this town faces each
                            challenge with a glint in its eye and a spring in its step. Sure, there have been
                            hard times—from the Great Famine to more recent challenges—but that's the thing about
                            Drumkeeran folk—they're as resilient as they come.
                            Walk down the main street, and you'll feel it. That buzz of community, that spark of
                            creativity that turns strangers into friends and ordinary days into adventures. It's in the
                            laughter spilling from the local pub, the excitement of the drama group's latest production,
                            and the timeless rhythm of traditional music sessions that keep the old tunes alive.
                        </p>
                        <h3>A Place of Experience and Magic</h3>
                        <p className="intro-paragraph">
                            Drumkeeran isn't just a place to visit; it's a place to experience. From the haunting
                            beauty of the nearby waterfall to the mysterious allure of ancient folklore, every corner of
                            this town holds a story waiting to be discovered. Whether you're exploring the remnants of
                            the old iron works or losing yourself in the endless shades of green, you're walking in the
                            footsteps of generations.
                            So come, let Drumkeeran work its magic on you. Breathe in the peat-scented air, marvel at
                            the views of Lough Allen, and listen closely. You might just hear the heartbeat of Ireland
                            itself, strong and steady, in this little slice of Leitrim heaven.
                        </p>
                    </div>
                </div>
                <div className="timeline-container">
                    <h3>Key Moments in Drumkeeran's History</h3>
                    <div className="timeline-events">
                        {timelineEvents.map((event, index) => (
                            <div key={index} className="timeline-event">
                                <h4>{event.year}</h4>
                                <p>{event.event}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
