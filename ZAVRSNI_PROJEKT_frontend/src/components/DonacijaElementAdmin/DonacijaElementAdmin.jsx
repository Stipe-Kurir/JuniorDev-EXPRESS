import React from 'react'
import stil from './donacijaElementAdmin.module.css'
import {  useState} from 'react'
import axios from 'axios'


const DonacijaElementAdmin = ({donacije,postaviDonacije}) => {
  
  
  async function handleIzbrisi(){

    const confirmBox = window.confirm(
      "Želite li izbrisati odabrano stavku?"
    )
    if (confirmBox === true) {
      await axios.delete(`http://localhost:3000/donacije/${donacije._id}`);
      const rezultat=await axios.get("http://localhost:3000/donacije");
      postaviDonacije(rezultat.data)
    }
    else{
      return
    } 

  }

  async function handleDonirano(){
          await axios.patch(`http://localhost:3000/donacije/${donacije._id}`, {kategorija:"donirano"})
          const rezultat= await axios.get("http://localhost:3000/donacije")
          postaviDonacije(rezultat.data)

  }

async function handlePonovi(){
          await axios.patch(`http://localhost:3000/donacije/${donacije._id}`, {kategorija:"trazi"})
          const rezultat= await axios.get("http://localhost:3000/donacije")
          postaviDonacije(rezultat.data)
   
  }

  const [filter,postaviFilter]=useState(donacije.kategorija)


  return (
    <div className={stil.DonacijaPrikaz}>

      <div className={stil.DonacijaElementi}>
        <div className={stil.DonacijaEl}><b>TIP: </b>{donacije.tip}</div>
        <div className={stil.DonacijaEl}><b>VRIJEDNOST: </b>{donacije.vrijednost} €</div>
        <div className={stil.PodaciElmOpis}><b>OPIS: </b>{donacije.opis}</div>
        <div className={stil.DonacijaEl}><b>KREIRAO:</b> {donacije.donatorUsername}</div>
      </div>

      <div className={stil.DonacijaElementiBotuni}>

      {
      filter==="trazi" && <div className={stil.DvaBotuna}>
                            <button className={stil.BotunStil} onClick={handleDonirano}>DONIRANO</button>
                            <button className={stil.BotunStilIzbrisi} onClick={handleIzbrisi}>IZBRIŠI</button>
                          </div>
      }

     {
     filter==="nudi" && <div className={stil.JedanBotun}>
                           <button className={stil.BotunStil} onClick={handleDonirano}>PRIHVATI</button>
                        </div>
     }

     {
     filter==="donirano" && <div className={stil.DvaBotuna}>
                              <button  className={stil.BotunStil} onClick={handlePonovi}>PONOVI</button>
                              <button className={stil.BotunStilIzbrisi} onClick={handleIzbrisi}>IZBRIŠI</button>
                             </div>
     }

      </div>

     
    </div>
  )
}

export default DonacijaElementAdmin
