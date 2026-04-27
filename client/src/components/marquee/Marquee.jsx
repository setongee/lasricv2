import React from "react";
import "./marquee.scss";

// founders
import thinkbikes from "../../assets/marquee/think.png";
import moon from "../../assets/marquee/moon.png";
import lanadek from "../../assets/marquee/lonadek.png";
import shifa from "../../assets/marquee/Yusufbilesanmi.png";
import farmz2u from "../../assets/marquee/farmz2u.png";
import pricepally from "../../assets/marquee/pricepally.png";
import adire from "../../assets/marquee/adire.png";
import nja from "../../assets/marquee/9iija.png";

export default function Marquee() {
  const founders = [
    {
      name: "Tolulope Olukokun",
      company: "ThinkBikes",
      image: thinkbikes,
      companyUrl: "https://thinkbikes.com",
    },
    {
      name: "Ibilola Amao",
      company: "Lonadek",
      image: lanadek,
      companyUrl: "https://lonadek.com",
    },
    {
      name: "Yusuf Bilesami",
      company: "Shifa Technologies",
      image: shifa,
      companyUrl: "https://shifatech.com",
    },
    {
      name: "Aisha Raheem",
      company: "Farmz2u",
      image: farmz2u,
      companyUrl: "https://farmz2u.com",
    },
    {
      name: "Luther Lawoyin",
      company: "Pricepally",
      image: pricepally,
      companyUrl: "https://pricepally.com",
    },
    {
      name: "Cynthia Asije",
      company: "Adire Lounge",
      image: adire,
      companyUrl: "https://adirelounge.com",
    },
    {
      name: "Micheal Osumune",
      company: "Moon Innovations",
      image: moon,
      companyUrl: "https://mooninnovations.com",
    },
    {
      name: "Titilope Adewusi",
      company: "9ijaKids",
      image: nja,
      companyUrl: "https://9ijakids.com",
    },
  ];
  return (
    <div className="marquee">
      {founders.map((founder, index) => (
        <a
          href={founder.companyUrl}
          target="_Blank"
          className={`marquee__card delay${index + 1}`}
          key={index}
        >
          <div className="m__image">
            {" "}
            <img src={founder.image} alt={founder.name} />{" "}
          </div>

          <div className="card__text ">
            <p> {founder.name} </p>
            <span> {founder.company} </span>
          </div>
        </a>
      ))}
    </div>
  );
}
