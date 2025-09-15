import React, {useState, useEffect} from 'react'
import './people.scss'
import { getCouncilData } from '../../api/firebase/auth';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'iconoir-react';
import SethAnimation from '../lottie/seth-animation';

export default function People({size}) {

    const [people, setPeople] = useState([]);
    const [loadPage, setLoadPage] = useState(true);

    useEffect(() => {
        
        getCouncilData()
        .then(res => {

            const data = res.filter( (e, index) => {
                return index < size
            } )

            setPeople(data);
            setLoadPage(false)
        })
        .catch(err => console.log(err))

    }, []);


  return (

    <div className="peopleSection">

        <div className="peopleSectionHeader left--align">

            Meet Our Team : {<br></br>} 
            The Innovators Behind the Vision

        </div>

        {
            loadPage ? 
            
            <div className="loading">
                <div className="">
                    <SethAnimation jsonSrc={"https://assets9.lottiefiles.com/packages/lf20_l9bcfk19.json"} lottieStyle = {{width: '120px', height: '120px'}} speed={"1"} />
                </div>
            </div> : null
        }

        <div className="lasric__gallery">

            {
                people?.length ? people?.map(e => (

                    <div className="photo__card" key = {e.uid} >

                        <div className="photo"><img src={e.img} alt={e?.firstname} /></div>

                        <div className="card__details">

                            <p>{e?.firstname} {e?.lastname}</p>
                            <span> {e?.job} </span>
                            
                            <div className="post" style={{fontWeight : 600}}>
                                {
                                    `${e?.firstname} ${e?.lastname}` === "Prof. Olumuyiwa Odusanya " ? <span> Chairman, LASRIC </span> : `${e?.firstname} ${e?.lastname}` === "Engr (Mrs) Ibilola  Kasunmu" ? <span> Secretary, LASRIC </span> : <span> Member, LASRIC </span>
                                }
                            </div>

                        </div>

                        <div className="social__links">

                            <div className="social__icon">
                                <i className="fi fi-brands-linkedin"></i>
                                <p>Linkedin</p>
                            </div>

                            <div className="social__icon">
                                <i className="fi fi-brands-twitter-alt-square"></i>
                                <p>X</p>
                            </div>

                        </div>

                    </div>

                )) : null
            }

        </div>
        
        {
            !size ? 
            <a href="/people" className='sectionLinks lynk'>

                <p>View All Our People</p>
                <div className="arrow___side"><ArrowUpRight/></div>

            </a> : null
        }

    </div>

  )

}
