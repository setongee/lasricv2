import React from 'react';

const ResearchTR = ({customName, index, bill ,change, deleted, data }) => {

    //console.log(data['team2'])

    const val = `${customName}${index+1}`

    const value = data[val]

    console.log(customName)

    return (
        
        <tr className="activity-table-row activity-table-row-1 bleet"  id = {`${customName}-row-${index+1}`} style={{ display : `${value.status === undefined ? '' : 'none'}`}} >

            <td> <input name = {`${customName}${index+1}`} required type="text" id= "activity" onChange = {change} value = { value.activity || "" } />  </td>
            <td> <input name = {`${customName}${index+1}`} required type="text" id= "result" onChange = {change} value = {value.result || ""} /> </td>

            <td  className='deleteCone' id = {index+1} style={{width:'10%', margin : "20px", textAlign : 'center', padding :0, border:'none', backgroundColor : 'crimson', color : "white", height : "20px", width : "20px", borderRadius : "50%", display : "flex", alignItems : "center", justifyContent : "center" }} onClick={ (e) => deleted(e, val) } > - </td>

        </tr>
    );
}

export default ResearchTR;

