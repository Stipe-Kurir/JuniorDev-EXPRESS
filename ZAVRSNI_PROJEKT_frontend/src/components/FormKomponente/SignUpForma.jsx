import React from 'react';
import './FormaStyle.css';
import { useState } from 'react';
import axios from "axios";

const SignUpForma = ({showModal, setShowModal}) => {

  const handleOpenModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRegistrationSuccess(false);
  };

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage,setErrorMessage]=useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      alert('Nedostaju obavezni podaci.');
      setRegistrationSuccess(false);
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Neispravan format e-mail adrese.');
      setRegistrationSuccess(false);
      return;
    }
    if (formData.email < 6) {
      alert('Lozinka mora sadržavati barem 6 znakova.');
      setRegistrationSuccess(false);
      return ;
    }
    try {
      const response = await axios.post('http://localhost:3000/user/registracija', formData);
      setRegistrationSuccess(true);
      setErrorMessage(false)
      setFormData({ username: '', email: '', password: '' });

    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage(true);
      setRegistrationSuccess(false);
      setFormData({  username: '', email: '', password: '' });
    } 
  };

  return (
    <div>
      <button className="custom-button" onClick={handleOpenModal}>Sign Up</button>

      {showModal && (
        <div className="modal-background" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2 style={{marginBottom:"10px",color:"green"}}>Sign Up</h2>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <button className="custom-submit-button" onClick={handleSubmit}>Submit</button>
            </div>
          
            {registrationSuccess && <p className="success-message">Uspješna registracija!</p>}
            {errorMessage && <p className="error-message">Registracija neuspješna!</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForma;