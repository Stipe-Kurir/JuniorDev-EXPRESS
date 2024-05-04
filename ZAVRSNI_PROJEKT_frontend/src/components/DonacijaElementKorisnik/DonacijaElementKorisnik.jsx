import React from 'react'
import stil from './donacijaElementKorisnik.module.css'
import { useState } from 'react'
import axios from 'axios'
import GostModal from '../GostModal/GostModal'

const DonacijaElementKorisnik = ({donacije,postaviDonacije}) => {


    const [filter,postaviFilter]=useState(donacije.kategorija)
    const [invalidUserModal,setInvalidUserModal]=useState(false)

    async function handleDonirano() {

    const token = localStorage.getItem("token");
    if (!token) {
      setInvalidUserModal(true);
      return; 
    }
      try {
        await axios.get("http://localhost:3000/user/provjeri-prijavu", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        await axios.patch(`http://localhost:3000/donacije/${donacije._id}`, { kategorija: "donirano" });
        
        const rezultat = await axios.get("http://localhost:3000/donacije");
        
        postaviDonacije(rezultat.data);
      } catch (error) {
        console.error('Error checking login status:', error);
        setInvalidUserModal(true);
      }
    }
    



  return (
    <div className={stil.DonacijaPrikaz}>
    <div className={stil.DonacijaElementi}>
      <div className={stil.DonacijaEl}><b>TIP:</b> {donacije.tip}</div>
      <div className={stil.DonacijaEl}><b>VRIJEDNOST:</b> {donacije.vrijednost} €</div>
      <div className={stil.PodaciElmOpis}><b>OPIS: </b>{donacije.opis}</div>
      <div className={stil.DonacijaEl}><b>KREIRAO:</b> {donacije.donatorUsername}</div>
    </div>
    <div className={stil.DonacijaElementiBotuni} >
    {
    filter==="trazi" && <div className={stil.JedanBotun}>
      <button className={stil.BotunStil} onClick={handleDonirano} >DONIRAJ</button>
      </div>
      }
   
    </div>
    <GostModal show={invalidUserModal} onClose={()=>setInvalidUserModal(false)}/>
  </div>
  )
}

export default DonacijaElementKorisnik
