import React from 'react';



const GradingResearchTR = ({customName, index, bill ,change, deleted, data }) => {


    const val = `${customName}${index+1}`

    const value = data[val];

    return (
        
        <tr className="team-table-row team-table-row-1 bleet"  id = {`${customName}-row-${index+1}`} style={{ display : `${value.status === 'deleted' ? 'none' : ''}`}} >

            <td> <input name = {`${customName}${index+1}`} required type="text" id= "name" onChange = {change} value = { value.activity || "" } />  </td>
            <td> <input name = {`${customName}${index+1}`} required type="text" id= "role" onChange = {change} value = {value.result || ""} /> </td>

            <td className='deleteCone' id = {index+1} style={{width:'10%', margin : "20px", textAlign : 'center', padding :0, border:'none', backgroundColor : 'crimson', color : "white", height : "20px", width : "20px", borderRadius : "50%", display : "flex", alignItems : "center", justifyContent : "center" }} onClick={ (e) => deleted(e, val) } > - </td>

        </tr>
    );
}

export default GradingResearchTR;
