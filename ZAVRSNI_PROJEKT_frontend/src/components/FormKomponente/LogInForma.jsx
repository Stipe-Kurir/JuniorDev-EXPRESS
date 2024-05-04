import React from 'react';
import './FormaStyle.css'; 
import { useState } from 'react';
import axios from "axios";

const LogInForma = ({showModal, setShowModal,setUserData}) => {

  const handleShowModal = () => {
    setShowModal(!showModal);
  };


  const handleCloseModal = () => {
    setShowModal(false);

  };

  const [errorMessage,setErrorMessage]=useState(false);

  const [formData, setFormData] = useState({
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
    if ( !formData.email || !formData.password) {
      alert('Nedostaju obavezni podaci.');
      return ;
      }
  
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test( formData.email )) {
        alert('Neispravan format e-mail adrese.');
        return ;
      }
  
      if ( formData.password.length < 6) {
        alert('Lozinka mora sadržavati barem 6 znakova.');
        return ;
      }
      try {
        const response = await axios.post('http://localhost:3000/user/prijava', formData);
        localStorage.setItem("token", response.data.token);
        setErrorMessage(false)
        setFormData({  email: '', password: '' });
        setShowModal(false)

        window.location.reload();
  
      } catch (error) {
        console.error('Log in failed:', error);
        setErrorMessage(true);
        setFormData({  email: '', password: '' });
      } 
  };

  return (
    <div>
      <button className="custom-button" onClick={handleShowModal}>Log In</button>
      {showModal && (
        <div className="modal-background" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2 style={{marginBottom:"10px",color:"green"}}>Log In</h2>
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
            {errorMessage && <p className="error-message">Log In neuspješan!</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LogInForma;