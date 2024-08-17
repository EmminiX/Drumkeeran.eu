import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/ContactSection.css';
import emailjs from 'emailjs-com';

// Initialize EmailJS with your User ID
emailjs.init('service_4p2i5ja');


const ContactSection = () => {
    const [opacity, setOpacity] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Send the form data to EmailJS
            await emailjs.send('service_4p2i5ja', 'YOUR_EMAILJS_TEMPLATE_ID', formData);
            setSubmitMessage('Thank you for your message. We will get back to you soon!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmitMessage('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <section id="contact" className="contact-section" ref={sectionRef} style={{ opacity }}>
            <div className="content-box transparent-bg">
                <h2>Contact Us</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        aria-label="Your Name"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        aria-label="Your Email"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="form-textarea"
                        rows="6"
                        aria-label="Your Message"
                    />
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
                {submitMessage && <p className="submit-message">{submitMessage}</p>}
            </div>
        </section>
    );
};

export default ContactSection;