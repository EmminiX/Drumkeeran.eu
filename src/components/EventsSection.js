import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/EventsSection.css';

const EventsSection = () => {
  const [opacity, setOpacity] = useState(0);
  const [news, setNews] = useState({ rteNews: [], euroNews: [], sportNews: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://p1jdyyr8vc.execute-api.eu-north-1.amazonaws.com/RSS/drumkeeran-rss-fetcher');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched news data:', data);
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const renderNewsSection = (title, newsItems) => (
    <div className="news-section">
      <h3>{title}</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : newsItems && newsItems.length > 0 ? (
        <ul>
          {newsItems.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              <p className="news-date">{new Date(item.pubDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news available at the moment.</p>
      )}
    </div>
  );

  return (
    <section id="events" className="events-section" ref={sectionRef} style={{ opacity }}>
      <div className="content-box transparent-bg">
        <h2>News</h2>
        <div className="events-news-container">
          <div className="news-widget">
            {renderNewsSection('RTÉ News', news.rteNews)}
            {renderNewsSection('EuroNews', news.euroNews)}
            {renderNewsSection('Sports News', news.sportNews)}
          </div>
        </div>
      </div>
      <div className="content-box transparent-bg">
        <h2>Upcoming Town Events</h2>
        <div className="event-buttons">
          <a href="https://www.facebook.com/drumkeerinfestival/" target="_blank" rel="noopener noreferrer" className="event-button">
            <img src={`${process.env.PUBLIC_URL}/images/festival-2024.jpg.jpeg`} alt="Event 1"/>
            <p>Drumkeeran Festival</p>
          </a>
          <a href="https://www.facebook.com/drumkeerinoldfairday/" target="_blank" rel="noopener noreferrer" className="event-button">
            <img src={`${process.env.PUBLIC_URL}/images/oldfair.jpeg`} alt="Event 2"/>
            <p>Drumkeeran Old Fair Day</p>
          </a>
          <a href="https://www.johnmckenna.ie" target="_blank" rel="noopener noreferrer" className="event-button">
            <img src={`${process.env.PUBLIC_URL}/images/music.jpg`} alt="Event 3"/>
            <p>John McKenna Festival</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
