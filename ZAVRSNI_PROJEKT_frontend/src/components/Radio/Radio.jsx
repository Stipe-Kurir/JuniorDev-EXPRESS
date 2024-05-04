import React from 'react'
import stil from "./radio.module.css"

const Radio = ({filter ,postaviFilter, vr}) => {

   
    const handleFilter=(e)=>{
        postaviFilter(e.target.value)
      }
    
    

  return (
    <div className={stil.RadioElm}>
      {vr===""?
      <>
       <input className={stil.RadioBtn} type="radio"  name="Svi" onChange={handleFilter} value="" checked={filter===vr} required />
       <label htmlFor="Svi">Svi</label>
       </>
       :
       <>
       <input className={stil.RadioBtn} type="radio"  name={vr} onChange={handleFilter} value={vr} checked={filter===vr} required />
       <label htmlFor={vr}>{vr}</label>
       </>
      }

    </div>
  )
}

export default Radio
