import React from 'react'
import './marquee.scss'

// founders
import thinkbikes from '../../assets/marquee/think.png'
import moon from '../../assets/marquee/moon.png'
import lanadek from '../../assets/marquee/lonadek.png'
import shifa from '../../assets/marquee/Yusufbilesanmi.png'
import farmz2u from '../../assets/marquee/farmz2u.png'
import pricepally from '../../assets/marquee/pricepally.png'
import adire from '../../assets/marquee/adire.png'
import nja from '../../assets/marquee/9iija.png'

export default function Marquee() {

  return (

    <div className="marquee">

        <div className="marquee__card delay1">

            <div className="m__image"> <img src={thinkbikes} alt="Tolulope Olukokun - CEO ThinkBikes" /> </div>
            
            <div className="card__text ">

                <p> Tolulope Olukokun </p>
                <span> CEO, ThinkBikes </span>

            </div>

        </div>

        <div className="marquee__card delay2">

            <div className="m__image"> <img src={lanadek} alt="Ibilola Amao" /> </div>
            
            <div className="card__text ">

                <p> Ibilola Amao </p>
                <span> CEO, Lonadek </span>

            </div>

        </div>

        <div className="marquee__card delay3">

            <div className="m__image"> <img src={shifa} alt="Yusuf Bilesami" /> </div>
            
            <div className="card__text ">

                <p> Yusuf Bilesami </p>
                <span> CEO, Shifa Technologies </span>

            </div>

        </div>

        <div className="marquee__card delay4">
            
            <div className="m__image"> <img src={farmz2u} alt="Aisha Raheem" /> </div>
            
            <div className="card__text ">

                <p> Aisha Raheem </p>
                <span> CEO, Farmz2u </span>

            </div>

        </div>


        <div className="marquee__card delay5">

            <div className="m__image"> <img src={pricepally} alt="Luther Lawoyin" /> </div>
            
            <div className="card__text ">

                <p> Luther Lawoyin </p>
                <span> CEO, Pricepally </span>
                
            </div>

        </div>

        <div className="marquee__card delay6">

            <div className="m__image"> <img src={adire} alt="Cynthia Asije" /> </div>
            
            <div className="card__text ">

                <p> Cynthia Asije </p>
                <span> CEO, Adire Lounge </span>
                
            </div>

        </div>

        <div className="marquee__card delay7">

            <div className="m__image"> <img src={moon} alt="Micheal Osumune" /> </div>
            
            <div className="card__text ">

                <p> Micheal Osumune</p>
                <span> CEO, Moon Innovations </span>

            </div>

        </div>

        <div className="marquee__card delay8">

            <div className="m__image"> <img src={nja} alt="Titilope Adewusi" /> </div>
            
            <div className="card__text ">

                <p> Titilope Adewusi </p>
                <span> CEO, 9ijaKids </span>
                
            </div>

        </div>

    </div>

  )
}
