import React from 'react'
import stil from "./navbar.module.css"
import UserContext from '../Context/UserContext'
import { useContext, useState,useEffect } from 'react'
import {NavLink} from "react-router-dom"
import {Switch} from "antd"
import SignUpForma from '../FormKomponente/SignUpForma'
import LogInForma from '../FormKomponente/LogInForma'
import axios from "axios";
import '../FormKomponente/FormaStyle.css'
import LogoutPotvrda from '../Logout/LogOutPotvrda'

const Navbar = () => {

    const [userData, setUserData] = useState({});
    const [showLogoutModal, setShowLogoutModal] = useState(false);


    useEffect(() => {

      const token = localStorage.getItem("token");
      if (!token) {
        return; 
      }

      const fetchUserData = async () => {
        try {
          const response = await axios.get("http://localhost:3000/user/provjeri-prijavu", {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });

          setUserData(response.data);
         
        } catch (error) {
          console.error('Error fetching user data:', error.response.data);
        }
      };
  
      fetchUserData();
    }, []); 
  


const navigationAdmin=[
    {name:'o nama',href:'/'},
    {name:'popis',href:'/popis'},
    {name:'donacije',href:'/donacije'},
    {name:'obavijesti',href:'/obavijesti'},
    {name:'unos',href:'/unos'},
]

const [showModalLogIn, setShowModalLogIn] = useState(false);
const [showModalSignUp, setShowModalSignUp ]= useState(false);

const handleLogout = () => {
 setShowLogoutModal(true);
};


const handleLogoutConfirmation = () => {
  localStorage.removeItem('token');

  window.location.href = '/'; 
};


  return (
    <div className={stil.NavContainer}>
        <div className={stil.NavNaslov}>
            <div className={stil.naslov}>
                <div className={stil.TekstNaslov}>AZIL ZA ŽIVOTINJE</div>
                <div className={stil.LogoNaslov}><img src="pet-house.png" height="60px" width="60px"/></div>
            </div>
            <div className={stil.korisnik}>
                {Object.keys(userData).length === 0 ?
                <>
                <div>GOST </div>
                <SignUpForma showModal={showModalSignUp} setShowModal={setShowModalSignUp} />
                <LogInForma showModal={showModalLogIn} setShowModal={setShowModalLogIn} setUserData={setUserData}/>
                </> :
                    <>
                    {userData?.role==="korisnik"?
                    <>
                    <div style={{ textTransform: 'uppercase' ,fontSize:"18px"}}>{userData?.username}</div>
                    <button className="custom-button" onClick={handleLogout}>Log out</button>
                    </>:
                    <>
                    <div style={{ textTransform: 'uppercase' }}>{userData?.role}</div>
                    <button className="custom-button" onClick={handleLogout}>Log out</button>
                    </>
                }
               
                </>
            }

            </div>
        </div>
      

        <div className={stil.NavOpcije}>
            {navigationAdmin.map((item)=>(
                <NavLink
                key={item.name}
                to={item.href}
                //destrukturira si da ti samo vrati isActive
                className={({isActive})=>{
                    return stil.Opcija ,
                    (isActive ? stil.OpcijaAktivna :
                        stil.Opcija)  
                }}
                >
                    <span>{item.name}</span>
                </NavLink>
            ))

            }
           
        </div> 
        
        <LogoutPotvrda
  isOpen={showLogoutModal}
  onClose={() => setShowLogoutModal(false)}
  onConfirm={handleLogoutConfirmation}
/>
    </div>
  )
}

export default Navbar

