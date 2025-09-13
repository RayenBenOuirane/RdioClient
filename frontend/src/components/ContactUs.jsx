// ContactUs.jsx
import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      // Form is valid, process submission
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      // Reset form after successful submission
      setFormData({ name: '', email: '', message: '' });
      
      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <section id="contact" className="contact-us">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-description">
          Have a question or a suggestion? Don't hesitate to reach out to us.
        </p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Your full name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Your email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className="form-label">Your message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`form-textarea ${errors.message ? 'error' : ''}`}
              placeholder="Type your message here"
              rows="5"
            ></textarea>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
          
          <button type="submit" className="submit-button">
            Send Message
          </button>
          
          {isSubmitted && (
            <div className="success-message">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;