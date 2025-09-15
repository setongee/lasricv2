import React,{useState, useEffect} from 'react'
import { getCouncilData } from '../../../api/firebase/auth';
import './peoplequick.scss'

export default function People() {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        
        getCouncilData()
        .then(res => setPeople( [ res[11], res[12], res[0], res[5], res[13], res[4] ] ))
        .catch(err => console.log(err))

    }, []);

  return (
    
    <div className="people__group" id='arrowNavScroll'>

        {
            people?.length ? people?.map( (e, index) => (

                <div className="item" key = {index}>

                    <div className="photo__container">
                        <img src={e?.img} alt={e?.firstname} />
                    </div>

                    <div className="identity">

                        <p>{e?.firstname} {e?.lastname}</p>
                        <span> {e?.job} </span>
                        
                    </div>

                </div>

            ) ) : null
        }

        {
            people?.length ? (

                <div className="item">
                    <a href='/people' className="photo__container" style={{display : "flex", alignItems : "center", justifyContent : "center", fontWeight : 600, cursor : "pointer", color : "#000"}}>View All</a>
                </div>

            ) : null
        }

    </div>

  )
}
