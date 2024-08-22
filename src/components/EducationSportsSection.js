import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/EducationSportsSection.css';

const EducationSportsSection = () => {
    const [opacity, setOpacity] = useState(0);
    const sectionRef = useRef(null);

    const schools = [
        { name: "Drumkeeran National School", image: `${process.env.PUBLIC_URL}/images/school.jpg`, link: "http://drumkeerinns.scoilnet.ie/blog/" },
        { name: "Lough Allen College", image: `${process.env.PUBLIC_URL}/images/college.jpg`, link: "https://www.loughallencollege.ie" },
    ];

    const sportsItems = [
        { name: "Drumkeeran GAA Club", image: `${process.env.PUBLIC_URL}/images/gaa.jpg`, link: "https://drumkeeringaa.com" },
        { name: "Upcoming Sports Events", image: `${process.env.PUBLIC_URL}/images/fb.jpg`, link: "https://www.facebook.com/DrumkeerinGAAclub?ref=embed_page" },
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
        <section id="education-sports" className="education-sports-section" ref={sectionRef} style={{ opacity }}>
            <div className="content-box transparent-bg">
                <h2>Education & Sports in Drumkeeran</h2>

                <div className="subsection">
                    <h3>Schools</h3>
                    <div className="thumbnail-grid">
                        {schools.map((school, index) => (
                            <a key={index} href={school.link} target="_blank" rel="noopener noreferrer"
                               className="thumbnail">
                                <img src={school.image} alt={school.name}/>
                                <p>{school.name}</p>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="subsection">
                    <h3>Sports</h3>
                    <div className="thumbnail-grid">
                        {sportsItems.map((item, index) => (
                            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer"
                               className="thumbnail">
                                <img src={item.image} alt={item.name}/>
                                <p>{item.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationSportsSection;
