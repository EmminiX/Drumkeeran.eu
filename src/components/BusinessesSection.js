import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/BusinessesSection.css';

const businesses = [
    { id: 1, name: "Breffni Gallery Shop", type: "Shop", description: "Sure, isn't Breffni Gallery a treasure trove of" +
            " delights? Nestled on Main Street, it's where the spirit of Drumkeeran comes alive in every cork popped, " +
            "every gift wrapped, and every brushstroke admired. From wines that'll warm your bones to artworks that'll " +
            "stir your soul, it's a wee slice of culture right in the heart of our village.", link: "https://g.co/kgs/11jWDkY" },
    { id: 2, name: "Frank Davitt's Bar", type: "Pub", description: "Ah, Frank Davitt's - now there's a proper Irish " +
            "pub for ya! It's where stories flow as freely as the pints, and every evening feels like a ceili waiting to" +
            " happen. With a welcome as warm as turf fire and craic as mighty as Sliabh an Iarainn itself, it's no " +
            "wonder locals and blow-ins alike find themselves drawn to this Drumkeeran gem.", link:"https://www.facebook.com/p/Davitts-Bar-100055386016104/" },
    { id: 3, name: "Fordes Inn Bar & Lounge", type: "Bar & Lounge", description: " If walls could talk, Fordes Inn would " +
            "have tales to last a lifetime. This cozy front bar is where Drumkeeran's heart beats strongest, where a " +
            "pint of the black stuff is poured with reverence, and where Ian, bless him, holds court like a local legend." +
            " It's not just a pub, it's a home away from home for anyone with a thirst for good company.", link:"hhttps://g.co/kgs/e8dR423"},
    { id: 4, name: "Fiona's Takeaway", type: "Takeaway", description: "In the bustling heart of Drumkeeran, " +
            "Fiona's Takeaway is cooking up a storm. It's where the aroma of fresh, honest grub mingles with the laughter " +
            "of hungry locals. With prices that won't leave your wallet crying and service that comes with a smile as bright " +
            "as a Leitrim morning, it's the go-to spot for a bite that tastes like home.", link:"https://g.co/kgs/DM9NZnm" },
    { id: 5, name: "Drumkeerin Credit Union", type: "Service", description: "Faith and begorrah, hasn't our wee " +
            "Credit Union gone and grown up? Now part of the Sligo family, it's like watching a child head off to university. " +
            "But fear not, for the heart of Drumkeerin beats on in every transaction. With new online bells and whistles, " +
            "and our own still manning the fort on Saturdays, it's the best of both worlds, so it is.", link:"https://www.goldenpages.ie/drumkeeran-credit-union-drumkeeran/" },
    { id: 6, name: "Clarkes Butchers", type: "Butchers", description: "Ah, Clarkes Butchers, where the meat's so fresh " +
            "you'd swear the cows were grazing out back! This family-run gem is the pride of Main Street, offering up " +
            "cuts that'd make your granny weep with joy. From succulent steaks to veg fresh from the fields, it's a " +
            "one-stop shop for filling your belly with the best of Leitrim's bounty.", link:"https://www.facebook.com/Drumkeerin50years/"},
    { id: 7, name: "Rooneys Cosy Corner", type: "Pub", description: "If Drumkeeran had a living room, Rooneys Cosy Corner" +
            " would be it. It's where the day's worries melt away faster than a snowflake in summer, replaced by the warmth " +
            "of friendly faces and the comfort of a well-pulled pint. Whether you're a local or just passing through, " +
            "you'll find a welcome here as genuine as the hills are green.", link:"https://g.co/kgs/4LE4qKs"},
    { id: 8, name: "Drumkeeran Health Centre", type: "Healthcare Service", description: "In the capable hands of Dr. Zachary Johnson " +
            "and his team, the Drumkeeran Health Centre stands as a beacon of care in our community. It's not just a place " +
            "for prescriptions and check-ups, mind you. It's where the village's health is nurtured, from the newest babe" +
            " to the oldest granny, with a dose of good old Irish compassion thrown in for good measure.", link:"http://www.drumkeeranhealthcentre.com" },
    { id: 9, name: "Nearby Grocery Store", type: "Shop", description: "Nearby? Sure, it's anything but! This little shop is " +
            "the beating heart of Drumkeeran, so it is. From your daily bread to a feast for your livestock, it's got" +
            " everything bar the kitchen sink. And with a deli that'd tempt a saint off their fast, it's no wonder half" +
            " the village seems to live here. A true jack-of-all-trades, and master of them all!", link:"https://www.facebook.com/nearbydrumkeeranstores/" },
    { id: 10, name: "Wynne's Market Bar", type: "Restaurant/Petrol Station", description: "Now here's a place that knows how to multi-task! " +
            "Wynne's Market Bar is where you can fill your tank and wet your whistle in one go. It's a slice of old Ireland " +
            "with a modern twist, where the banter flows as smoothly as the petrol. Whether you're after a pint or a full " +
            "tank, Wynne's has got you covered, rain or shine.", link:"https://www.facebook.com/WynnesMarketBar/" },
    { id: 11, name: "Desmond Wynne", type: "Service", description: " If Drumkeeran had a land whisperer, it'd be Desmond Wynne. " +
            "This man could sell ice to the Eskimos, but he'd do it with a wink and a smile that'd warm your heart. " +
            "From rolling fields to towering forests, Desmond knows every inch of Leitrim like the back of his hand. " +
            "If you're buying or selling, he's your man, no doubt about it.", link:"https://www.facebook.com/p/Desmond-Wynne-Auctioneer-and-Estate-Agent-100063442466877/" },
    { id: 12, name: "Community Afterschool", type: "Service", description: " Opening in September 2024, Spencer Harbour " +
            "is where young adventurers from Drumkeeran NS embark on exciting quests. With a blend of learning and play, " +
            "every child becomes a hero in their own story, making friends and memories along the way. It’s more than an " +
            "afterschool program—it’s where imaginations soar.", link:"https://www.facebook.com/p/Spencer-Harbour-Community-Afterschool-61559094396136/?_rdr" },
];

const BusinessesSection = () => {
    const [opacity, setOpacity] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
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
        const results = businesses.filter(business =>
            business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            business.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBusinesses(results);
    }, [searchTerm]);

    return (
        <section id="businesses" className="businesses-section" ref={sectionRef} style={{ opacity }}>
            <div className="content-box transparent-bg">
                <h2>Local Businesses</h2>
                <input
                    type="text"
                    placeholder="Search businesses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                    aria-label="Search businesses"
                />
                <div className="business-grid">
                    {filteredBusinesses.map(business => (
                        <div key={business.id} className="business-card">
                            <a href={business.link} target="_blank" rel="noopener noreferrer">
                                <h3 className="business-link">{business.name}</h3>
                            </a>
                            <p className="business-type">{business.type}</p>
                            <p className="business-description">{business.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BusinessesSection;