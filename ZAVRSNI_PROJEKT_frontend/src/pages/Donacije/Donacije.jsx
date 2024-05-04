import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import stil from './donacije.module.css'
import { useContext , useState,useEffect} from 'react'
import UserContext from '../../components/Context/UserContext'
import FormaDonacija from '../../components/FormaDonacija/FormaDonacija'
import axios from 'axios'
import DonacijaElementAdmin from '../../components/DonacijaElementAdmin/DonacijaElementAdmin'
import DonacijaElementKorisnik from '../../components/DonacijaElementKorisnik/DonacijaElementKorisnik'
import GostModal from '../../components/GostModal/GostModal'


const Donacije = () => {
  const [forma,postaviFormu]=useState(false)
  const [donacije,postaviDonacije]=useState([])
  const [isAdmin, setIsAdmin] = useState(false);
  const [invalidUserModal,setInvalidUserModal]=useState(false)
  
  useEffect(() => {
    
    axios
      .get("http://localhost:3000/donacije")
      .then(res => postaviDonacije(res.data));
      const token = localStorage.getItem("token");
      if (!token) {
        return; 
      }
  
  axios.get("http://localhost:3000/user/user-role", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(adminResponse => {
  setIsAdmin(adminResponse.data.isAdmin)
  })
  .catch(error => {
    console.error('Error checking admin status:', error.response.data);
  });
  }, []);
  

  const prikaziFormu=()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      setInvalidUserModal(true);
      return; 
    }
    axios.get("http://localhost:3000/user/provjeri-prijavu", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      postaviFormu(true)
    })
    .catch(error => {
      console.error('Error checking login status:', error.response.data);
      setInvalidUserModal(true);
    });
  }

  
  return (
    <div>
      <Navbar />
      <div className={stil.DonacijeContainer}>
      {isAdmin?
      <>
      <div className={stil.DonacijaForma}>
        {forma ? 
        <FormaDonacija isAdmin={isAdmin}  postaviDonacije={postaviDonacije}/>
        :
        <div><button className={stil.DonacijaBotun} onClick={prikaziFormu}>NOVA DONACIJA</button></div>
        }
        
      </div>
      <div className={stil.DonacijaKategorija}>
        <div className={stil.DonacijaKategorijaNaslov}>TRAŽIMO</div>
        {
           donacije.filter(podatak=>podatak.kategorija.includes("trazi")).map(rez=>
            <DonacijaElementAdmin 
               key={rez._id}
               donacije={rez} 
               postaviDonacije={postaviDonacije} 
            />
           )
        }
       
      </div>
      <div className={stil.DonacijaKategorija}> 
      <div className={stil.DonacijaKategorijaNaslov}>NUDI SE</div>
      {
           donacije.filter(podatak=>podatak.kategorija.includes("nudi")).map(rez=>
            <DonacijaElementAdmin
               key={rez._id}
               donacije={rez}  
               postaviDonacije={postaviDonacije} 
            />
           )
        }
      
      </div>
      <div className={stil.DonacijaKategorija}>
      <div className={stil.DonacijaKategorijaNaslov}>DONIRANO</div>
      {
           donacije.filter(podatak=>podatak.kategorija.includes("donirano")).map(rez=>
            <DonacijaElementAdmin
               key={rez._id}
               donacije={rez}  
               postaviDonacije={postaviDonacije} 
            />
           )
        }
      </div>
      </>

     
      :
   
      <>
       <div className={stil.DonacijaForma}>
        {forma ? 
        <FormaDonacija funk={prikaziFormu} postaviDonacije={postaviDonacije}/>
        :
        <div><button className={stil.DonacijaBotun} onClick={prikaziFormu}>NOVA DONACIJA</button></div>
        }
        
      </div>
      <div className={stil.DonacijaKategorija}>
        <div className={stil.DonacijaKategorijaNaslov}>TRAŽIMO</div>
        {
           donacije.filter(podatak=>podatak.kategorija.includes("trazi")).map(rez=>
            <DonacijaElementKorisnik
               key={rez._id}
               donacije={rez} 
               postaviDonacije={postaviDonacije} 
            />
           )
        }
       
      </div>
      <div className={stil.DonacijaKategorija}> 
      <div className={stil.DonacijaKategorijaNaslov}>NUDI SE</div>
      {
           donacije.filter(podatak=>podatak.kategorija.includes("nudi")).map(rez=>
            <DonacijaElementKorisnik
               key={rez._id}
               donacije={rez}  
               postaviDonacije={postaviDonacije} 
            />
           )
        }
      
      </div>
      <div className={stil.DonacijaKategorija}>
      <div className={stil.DonacijaKategorijaNaslov}>DONIRANO</div>
      {
           donacije.filter(podatak=>podatak.kategorija.includes("donirano")).map(rez=>
            <DonacijaElementKorisnik
               key={rez._id}
               donacije={rez}  
               postaviDonacije={postaviDonacije} 
            />
           )
        }
      </div>
      </>
      }
      </div>
      <Footer />
      <GostModal show={invalidUserModal} onClose={()=>setInvalidUserModal(false)}/>
    </div>
  )
}

export default Donacije
