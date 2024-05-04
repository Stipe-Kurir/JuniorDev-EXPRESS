import React, { useContext ,useState,useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import stil from './popis.module.css'
import Footer from '../../components/Footer/Footer'
import Radio from '../../components/Radio/Radio'
import PopisElement from '../../components/PopisElement/PopisElement'
import axios from "axios";

const Popis = () => {
const [filterStatus,postaviFilterStatus]=useState("");
const [filterVrsta,postaviFilterVrsta]=useState("Sve");
const [podaci,postaviPodatke]=useState([])
const [isAdmin,setIsAdmin]=useState(false)

useEffect(() => {
  axios
    .get("http://localhost:3000/zivotinje")
    .then(res => postaviPodatke(res.data))
    .catch(error => console.error('Error fetching zivotinje data:', error));

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

 async function handleUdomi(vrijednost){
  await axios.patch(`http://localhost:3000/zivotinje/${vrijednost}`,{"udomljen":"udomljen"});
  const rez=await axios.get("http://localhost:3000/zivotinje");
  postaviPodatke(rez.data)
 }


  return (

    <div>
      
       <Navbar />

        <div className={stil.PopisContainer}>


            <div className={stil.PopisFilter}>
              <div className={stil.PopisFilterSticky}>

                <div className={stil.FilterElement}>
                  <div className={stil.FilterNaslov}>VRSTA:</div>

                  <div className={stil.FilterRadioElm}>
                  <Radio filter={filterVrsta}   postaviFilter={postaviFilterVrsta} vr={"Sve"} />
                  <Radio filter={filterVrsta}   postaviFilter={postaviFilterVrsta}  vr={"Pas"} />
                  <Radio filter={filterVrsta}   postaviFilter={postaviFilterVrsta} vr={"Mačka"} />
                  </div>
                </div>

                <div className={stil.FilterElement}>
                  <div className={stil.FilterNaslov}>STATUS:</div>
                  <div className={stil.FilterRadioElm}>
                  <Radio filter={filterStatus}  postaviFilter={postaviFilterStatus} vr={""} />
                  <Radio filter={filterStatus}  postaviFilter={postaviFilterStatus}  vr={"nije udomljen"} />
                  
                  </div>
                </div>
              </div>
            </div> 

            <div className={stil.PopisPrikaz}>
              <div className={stil.PopisPrikazElementi}>
                {filterVrsta==="Sve" 
                ? 
                <>
                {
                  podaci.filter(podatak=>podatak.udomljen.includes(filterStatus))
                  .filter(podatak=>podatak.vrsta.includes(""))
                  .map(rez=>
                  <PopisElement 
                  key={rez._id}
                  podaci={rez}  
                  funk={handleUdomi}
                  postaviPodatke={postaviPodatke}
                  isAdmin={isAdmin}
                  />
                  )
                 }
                 </>
                 :
                 <>
                  {
                    podaci.filter(podatak=>podatak.udomljen.includes(filterStatus))
                    .filter(podatak=>podatak.vrsta.includes(filterVrsta))
                    .map(rez=>
                  <PopisElement 
                  key={rez._id}
                  podaci={rez}  
                  funk={handleUdomi}
                  postaviPodatke={postaviPodatke}
                  isAdmin={isAdmin}
                  />
                  )
                 }
                 </>
               }  
                
              </div>
            </div>
       

      </div>
      
      <Footer />
    </div>
  )
}

export default Popis
