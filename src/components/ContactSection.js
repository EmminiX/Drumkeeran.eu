import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/ContactSection.css';
import emailjs from '@emailjs/browser';

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
    const form = useRef();

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
            await emailjs.sendForm(
                'service_4p2i5ja', // Your EmailJS service ID
                'template_akl8wrv', // Your EmailJS template ID
                form.current,
                'mVa5fPgAC-x0F5svZ' // Replace with your actual public key
            );
            setSubmitMessage('Thank you for your message. We will get back to you soon!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('EmailJS error:', error);
            setSubmitMessage('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-section" ref={sectionRef} style={{ opacity }}>
            <div className="content-box transparent-bg">
                <h2>Contact Us</h2>
                <form ref={form} className="contact-form" onSubmit={handleSubmit}>
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
