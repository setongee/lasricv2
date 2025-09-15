import React, {useEffect, useState} from 'react';
import { getCouncilData } from '../api/firebase/auth';
import './council.scss'
import People from '../components/people/People';
import Container from '../components/container/container';

const Council = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        async function fetchData() {

            const response = await getCouncilData();
            setData(response);

        }

        fetchData();

    }, []);

    return (

        <div className="councilFrame">

            <Container>

                <People size = {80} />

            </Container>

        </div>
        
    );
}

export default Council;
