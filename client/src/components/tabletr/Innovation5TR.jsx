import React from 'react';



const TableTr5 = ({customName, index, bill ,change, deleted, data }) => {

    //console.log(data['team2'])

    const val = `${customName}${index+1}`

    const value = data[val]

    console.log(value)

    return (
        
        <tr className="team-table-row team-table-row-1"  id = {`${customName}-row-${index+1}`} style={{ display : `${value.status === 'deleted' ? 'none' : ''}`}}>

            <td> <input name = {`${customName}${index+1}`} required type="text" id= "cost" onChange = {change} value = { value.cost || "" } />  </td>
            <td> <input name = {`${customName}${index+1}`} required type="text" id= "driver" onChange = {change} value = {value.driver || ""} /> </td>

            <td id = {index+1} style={{width:'10%', margin : "20px", textAlign : 'center', padding :0, border:'none', backgroundColor : 'crimson', color : "white", height : "20px", width : "20px", borderRadius : "50%", display : "flex", alignItems : "center", justifyContent : "center" }} onClick={ (e) => deleted(e, val) } > - </td>

        </tr>
    );
}

export default TableTr5;
