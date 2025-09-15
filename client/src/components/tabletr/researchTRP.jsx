import React from 'react';

const ResearchTRP = ({customName, index, bill ,change, deleted, data }) => {

    //console.log(data['team2'])

    const val = `${customName}${index+1}`

    const value = data[val]

    console.log(customName)

    return (
        
        <tr className="budget-table-row activity-table-row-1 bleet"  id = {`${customName}-row-${index+1}`} style={{ display : `${value.status === undefined ? '' : 'none'}`}} >

            <td> <input name = {`${customName}${index+1}`} required type="text" id= "item" onChange = {change} value = { value.item || "" } />  </td>
            <td> <input name = {`${customName}${index+1}`} required type="text" id= "amount" onChange = {change} value = {value.amount || ""} /> </td>
            <td> <input name = {`${customName}${index+1}`} required type="text" id= "total" onChange = {change} value = {value.total || ""} /> </td>

            <td  className='deleteCone' id = {index+1} style={{width:'10%', margin : "20px", textAlign : 'center', padding :0, border:'none', backgroundColor : 'crimson', color : "white", height : "20px", width : "20px", borderRadius : "50%", display : "flex", alignItems : "center", justifyContent : "center" }} onClick={ (e) => deleted(e, val) } > - </td>

        </tr>
    );
}

export default ResearchTRP;

