import React,{useEffect, useState} from 'react'
import Container from '../../components/container/container'
import { getPortfolio } from '../../api/firebase/admin/cms';
import { InputSearch } from 'iconoir-react';

import Fuse from 'fuse.js';

import './portfolio.scss'
import PortfolioItem from './portfolioItem';
import { sortArray } from '../../middleware/middleware';
import SethAnimation from '../../components/lottie/seth-animation';

export default function Portfolio({cohort}) {

    const [portfolios, setPortfolios] = useState([]);
    const [global, setGlobal] = useState([]);
    const [cohortNum, setCohortNum] = useState("");
    const [track, setTrack] = useState("");
    const [ query, setQuery ] = useState('');
    const [queryResults, setQueryResults] = useState([]);
    const [loadPage, setLoadPage] = useState(true);

    useEffect(() => {

        const fuseOptions = {
    
          keys: [ 'data.company' ]
        
        };
    
        const fuse = new Fuse(portfolios, fuseOptions);
        const results = fuse.search(query);
        const queriedRes =  query ? results.map(res => res.item) : portfolios;
        setQueryResults(queriedRes); 
      
      }, [query]);

    useEffect(() => {
        
        getPortfolio(cohort)
        .then(res => {
             sortArray(res, "company").then(e => {
                setQueryResults(e);
                setPortfolios(e);
                setGlobal(e);
                setLoadPage(false);
             });
        })

        fillCohorts();

    }, [cohort]); 

    useEffect(() => {
        
        if(cohortNum !== "") {

            const res = global.filter(e => {

                return e.data.cohortNum === cohortNum
    
            })
    
            setPortfolios(res);
            setQueryResults(res);

        } else {

            setPortfolios(global);
            setQueryResults(global);

        }


    }, [cohortNum]);


    useEffect(() => {
        
        if(track !== "") {

            const res = portfolios.filter(e => {

                return e.data.track === track
    
            })
    
            setQueryResults(res);

        } else {

            setQueryResults(portfolios);
            
        }


    }, [track]);

    
    const handleChohortChange = (cc) => {

       setCohortNum(cc);

    }



    const handleTrackChange = (e) => {

        setTrack(e)

    }

    const fillCohorts = () => {

        const selectOptions = document.querySelector('#select_cohort');
        
        if (selectOptions.childNodes.length === 1) {

            for ( let i = 1; i < cohort; i++ ) {
            
                const selectOptions = document.querySelector('#select_cohort');
    
                const option = document.createElement('option');
                option.value = i;
                option.innerText = `Cohort ${i}`;
    
                selectOptions.appendChild(option);
            
            }  
        }
        


    }

  return (

    <div className="portfolio pageBrief">

        <Container>

            <div className="headers">

                <p>
                    From Vision to Reality: Discover Our Portfolio of Innovative Solutions
                </p>

                <div className="description">
                    We foster teams where diverse talents thrive, empowering everyone to excel in work and life.
                </div>

            </div>

            <div className="fetch">
                
                <div className="search">
                    
                    <div className="icon"> <InputSearch/> </div>
                    <div className="line__dive"></div>
                    <input type="text" placeholder = "Search companies by name or  founder..." onChange={(e)=>setQuery(e.target.value)} />
                    
                </div>

                <div className="filter">

                    <select name="cohort" id="select_cohort" onChange = { (e) => handleChohortChange(e.target.value) } >

                        <option value=""> All Cohorts </option>

                    </select>

                    <select name="cohort" id="select_track" onChange = { (e) => handleTrackChange(e.target.value) } value={track} >

                        <option value=""> All Tracks </option>
                        <option value="innovation"> Innovation </option>
                        <option value="research"> Research </option>
                        <option value="stem"> STEM </option>

                    </select>

                </div>

            </div>

            {
                loadPage ? 
                
                <div className="loading">
                    <div className="">
                        <SethAnimation jsonSrc={"https://assets9.lottiefiles.com/packages/lf20_l9bcfk19.json"} lottieStyle = {{width: '120px', height: '120px'}} speed={"1"} />
                    </div>
                </div> : null
            }

            <div className="portfolios">

                {
                    queryResults?.length ? 
                    queryResults?.map( (data, index) => <PortfolioItem data = {data} key = {index} /> )
                    : null
                }

            </div>

        </Container>

    </div>

  )

}
