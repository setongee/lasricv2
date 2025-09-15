import React from 'react'
import './loader.scss'

export default function Loader({bg}) {

  return (

    <div className="spinnerlx" style={ { backgroundColor : bg } } >
        <span class="loaderZone"></span>
    </div>

  )

}
