import React, {useEffect, useState} from 'react';
import { getCouncilMember, getCouncilGraders } from '../api/firebase/getApplication';



const Councilmemberprint = ({data}) => {

    const [dataMember, setDataMember] = useState({
        data : {
            firstname : "",
            lastname : "",
            img : ""
        }
    })
    
    const getTheUser = async () => {

        const user = {
            data : {}
        }

        await getCouncilMember(data[0]).then( e => user.data = e )

        return await user

    }

    useEffect(() => {
       
        getTheUser().then(e => setDataMember(e))

    }, []);

    return (

        <div className="coreDetail">
                    
            <div className="icon"> 
                
                <div className="councilImage">
                    <img src={dataMember.data.img} alt="lasric" />
                </div>  

                {dataMember.data.firstname} {dataMember.data.lastname}  
            
            </div>

            <div className="graded"> {data[1].grade || 0}% </div>

        </div>

    );
}

export default Councilmemberprint;
