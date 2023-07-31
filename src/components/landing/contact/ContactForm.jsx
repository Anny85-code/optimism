import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setformData] = useState({
    message: '',
    name: '',
    email: '',
    subject: '',
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form className="contact__form" onSubmit={handleSubmit}>
      <h3>Message:</h3>
      <textarea name="message" cols="67" rows="10" onChange={handleForm} />
      <h3>Name:</h3>
      <input name="name" type="text" onChange={handleForm} />
      <h3>Email:</h3>
      <input name="email" type="email" onChange={handleForm} />
      <h3>Subject:</h3>
      <input name="subject" type="text" onChange={handleForm} />
      <br />
      <br />
      <input type="submit" value="Submit" style={{ margin: '8px' }} />
    </form>
  );
};

export default ContactForm;
