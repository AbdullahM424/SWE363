import style from "../assets/styles/ClubeProfile.module.css"; 
import { FaWhatsapp, FaInstagram  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React, { useState } from 'react';
import Announcement from "../components/Announcement";
import Accordion from 'react-bootstrap/Accordion';


const ClubeProfile = () =>{
    const [socialMedia, setSocialMedia] = useState({"whatsapp":"", "X":"", "instagram":"" });
    const [name, setName] = useState('');
    const [descripation, setDescripation] = useState('');
    const announcementsData = [
        { title: "Announcement 1", content: "This is the first announcement." },
        { title: "Announcement 2", content: "This is the second announcement." },
        { title: "Announcement 3", content: "This is the third announcement." },
      ];


return(
    <div className={style.theBage}>

        <div className={style.card}>
            <img src="#" alt = "The clube Loge" />
            <p className= {style.name} > the name</p>
            <p className={style.descripation}>the descripation of the clube</p>
            <a herf = "#"><FaWhatsapp /></a>
            <a herf = "#"><FaInstagram /></a>
            <a herf = "#"><FaXTwitter /></a>

        </div>
        <h1>Announcement</h1>
        <div className={style.card}>
        <Accordion>
        {announcementsData.map((item, index) => (
        <Announcement
          key={index}
          announcementsTitle={item.title}
          announcements={item.content}
          num={index}
          
        />
        
      ))}
        </Accordion>
        </div>
    </div>
)
}

export default ClubeProfile;