import React from 'react';



const GradingTableTR = ({customName, index, bill ,change, deleted, data }) => {

    //console.log(data['team2'])

    const val = `${customName}${index+1}`

    const value = data[val]

    return (
        
        <tr className="team-table-row team-table-row-1 bleet"  id = {`${customName}-row-${index+1}`} style={{ display : `${value.status === 'deleted' ? 'none' : ''}`}} >

            <td> <input name = {`${customName}${index+1}`} required type="text" id= "name" onChange = {change} value = { value.name || "" } />  </td>
            <td> <input name = {`${customName}${index+1}`} required type="text" id= "role" onChange = {change} value = {value.role || ""} /> </td>
            <td> <textarea rows={4} name = {`${customName}${index+1}`} required type="text" id= "response" onChange = {change} value = {value.response || ""} > </textarea> </td>

            <td className='deleteCone' id = {index+1} style={{width:'10%', margin : "20px", textAlign : 'center', padding :0, border:'none', backgroundColor : 'crimson', color : "white", height : "20px", width : "20px", borderRadius : "50%", display : "flex", alignItems : "center", justifyContent : "center" }} onClick={ (e) => deleted(e, val) } > - </td>

        </tr>
    );
}

export default GradingTableTR;
