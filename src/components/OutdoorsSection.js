import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/OutdoorsSection.css';

const activities = [
   { name: "Spencer Harbour", link: "https://leitrimtourism.com/treasured-landscapes/spencer-harbour/", image: `${process.env.PUBLIC_URL}/images/spencer.jpg`, description: "Distance: 5 km\n" +
           "Description: A peaceful spot along the shores of Lough Allen, perfect for relaxation and picnics." },
    { name: "Sliabh an Iarainn", link: "https://leitrimtourism.com/treasured-landscapes/sliabh-an-iarainn/", image: `${process.env.PUBLIC_URL}/images/top.jpg`, description: "Distance: 15 km\n" +
            "Description: A rugged mountain offering beautiful views and hiking opportunities."},
    { name: "Shannon Blueway", link: "https://leitrimtourism.com/treasured-landscapes/shannon-blueway/", image: `${process.env.PUBLIC_URL}/images/blueway.jpg`, description: "Distance: 20 km\n" +
            "Description: A scenic trail ideal for walking, cycling, and enjoying nature along the River Shannon." },
    { name: "Lough Allen Adventure Centre", link: "https://loughallenadventure.ie/", image: `${process.env.PUBLIC_URL}/images/adventure.jpg`, description: "Distance: 20 km\n" +
            "Description: Offers various outdoor activities including kayaking and climbing." },
    { name: "Arigna Museum", link: "https://www.arignaminingexperience.ie/", image: `${process.env.PUBLIC_URL}/images/arigna.jpg`, description: "Distance: 20 km\n" +
            "Description: A museum offering insights into the local mining history, with scenic views." },
    { name: "Drumshanbo", link: "https://leitrimtourism.com/towns-villages/drumshanbo/", image: `${process.env.PUBLIC_URL}/images/drumshanbo.jpg`, description: "Distance: 22 km\n" +
            "Description: A charming village at the foot of Sliabh an Iarainn with access to walking trails." },
    { name: "Glencar Waterfall", link: "https://leitrimtourism.com/treasured-landscapes/glencar-waterfall/", image: `${process.env.PUBLIC_URL}/images/glencar.jpg`, description: "Distance: 24 km\n" +
            "Description: A stunning waterfall famously associated with poet W.B. Yeats." },
    { name: "Fowley's Falls", link: "https://leitrimtourism.com/treasured-landscapes/fowleys-falls/", image: `${process.env.PUBLIC_URL}/images/waterfal.jpg`, description: "Distance: 28 km\n" +
            "Description: A picturesque waterfall formed by the Glenaniff River, great for photography and nature walks." },
    { name: "The Shannon Pot", link: "https://cuilcaghlakelands.org/geosite/shannon-pot/", image: `${process.env.PUBLIC_URL}/images/shannon.jpg`, description: "Distance: 30 km\n" +
            "Description: The mystical source of the River Shannon, surrounded by beautiful landscapes." },
    { name: "Hag's Leap", link: "https://leitrimtourism.com/treasured-landscapes/hags-leap/", image: `${process.env.PUBLIC_URL}/images/leap.jpg`, description: "Distance: 30 km\n" +
            "Description: The highest free-standing rock tower in Ireland, located in the Dartry Mountains." },
    { name: "Glenade Lake", link: "https://leitrimtourism.com/treasured-landscapes/glenade-lake/", image: `${process.env.PUBLIC_URL}/images/lake.jpg`, description: "Distance: 32 km\n" +
            "Description: Nestled in the Glenade Valley, this lake offers stunning scenery and tranquility." },
    { name: "Creevelea Abbey", link: "https://leitrimtourism.com/heritage/creevelea-abbey/", image: `${process.env.PUBLIC_URL}/images/abbey.jpg`, description: "Distance: 35 km\n" +
            "Description: Historic ruins set in a beautiful landscape, ideal for exploration and photography." },
    { name: "The Devils Chimney Waterfall", link: "https://leitrimtourism.com/heritage/creevelea-abbey/", image: `${process.env.PUBLIC_URL}/images/chimney.jpg`, description: "Distance: 30 km\n" +
            "Description: A scenic walking trail leading to a unique waterfall that can sometimes flow upwards, offering stunning views and opportunities for birdwatching." },
    { name: "Parke's Castle of Lough Gill", link: "https://heritageireland.ie/visit/places-to-visit/parkes-castle/", image: `${process.env.PUBLIC_URL}/images/parke.jpg`, description: "Distance: 36 km\n" +
            "Description: A beautifully restored 17th-century castle located on the shores of Lough Gill, offering picturesque views and walking trails." },
    { name: "Lough Key Forest & Leisure Park", link: "https://loughkey.ie/", image: `${process.env.PUBLIC_URL}/images/key.jpg`, description: "Distance: 40 km\n" +
            "Description: A family-friendly park featuring walking trails, a playground, and various outdoor activities including zip-lining and boating." },
    { name: "Benbulbin Summit, Wild Atlantic Way", link: "https://www.discoverireland.ie/sligo/benbulben", image: `${process.env.PUBLIC_URL}/images/summit.jpg`, description: "Distance: 45 km\n" +
            "Description: A flat-topped mountain in County Sligo, famous for its dramatic cliffs and scenic hiking trails." },
];

const OutdoorsSection = () => {
    const [opacity, setOpacity] = useState(0);
    const sectionRef = useRef(null);

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

    useEffect(() => {
        // Initialize Tomorrow.io widget
        if (window.__TOMORROW__) {
            window.__TOMORROW__.renderWidget();
        }
        const script = document.createElement('script');
        script.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";
        script.async = true;
        script.id = 'tomorrow-sdk';
        document.body.appendChild(script);

        return () => {
            if (script.parentNode) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <section id="outdoors" className="outdoors-section" ref={sectionRef} style={{ opacity }}>
            <div className="content-box transparent-bg">
                <h2>Outdoor Activities</h2>
                <div className="weather-widget">
                    <div className="tomorrow"
                         data-location-id="057198"
                         data-language="EN"
                         data-unit-system="METRIC"
                         data-skin="light"
                         data-widget-type="upcoming"
                         style={{paddingBottom: "22px", position: "relative"}}
                    >
                        <a
                            href="https://www.tomorrow.io/weather-api/"
                            rel="nofollow noopener noreferrer"
                            target="_blank"
                            style={{position: "absolute", bottom: 0, transform: "translateX(-50%)", left: "50%"}}
                        >
                            <img
                                alt="Powered by the Tomorrow.io Weather API"
                                src="https://weather-website-client.tomorrow.io/img/powered-by.svg"
                                width="250"
                                height="18"
                            />
                        </a>
                    </div>
                </div>
                <div className="activity-grid">
                    {activities.map((activity, index) => (
                        <div key={index} className="activity-item">
                            <a href={activity.link} target="_blank" rel="noopener noreferrer">
                                <img src={activity.image} alt={activity.name} className="activity-image"/>
                                <p>{activity.name}</p>
                            </a>
                            <p>{activity.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OutdoorsSection;