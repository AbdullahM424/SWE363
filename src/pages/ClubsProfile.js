import style from "../assets/styles/ClubeProfile.module.css"; 
import { FaWhatsapp, FaInstagram  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React, { useState } from 'react';
import Announcement from "../components/Announcement";
import Accordion from 'react-bootstrap/Accordion';
import Header from "../components/common/Header.js"
const defaultImg = "SWE363/src/assets/images/clubeProfileImg.png";

const ClubeProfile = () =>{
 
    const [socialMedia, setSocialMedia] = useState({"whatsapp":"", "X":"", "instagram":"" });
    const [name, setName] = useState('');
    const [descripation, setDescripation] = useState(`the descripation of the clube the descripation of the clube the descripation of the clube the descripation 
                of the clube the descripation of the clube the descripation of the clube the descripation of the clube the descripation of the clube the 
                descripation of the clube the descripation of the clube the descripation of the clube the descripation of the clube the descripation of 
                the clube the descripation of the clube the descripation of the clube the descripation of the clube the descripation of the clube the descripation 
                of the clube the descripation of the clube the descripation of the clube the descripation of the clube the descripation of the clube the descripation 
                of the clube the descripation of the clube`);
    const [profileImage, setProfileImage] = useState('');
    const announcementsData = [
        { title: "Announcement 1", content: "This is the first announcement." },
        { title: "Announcement 2", content: "This is the second announcement." },
        { title: "Announcement 3", content: "This is the third announcement." },
        { title: "Announcement 1", content: "This is the first announcement." },
        { title: "Announcement 2", content: "This is the second announcement." },
        { title: "Announcement 3", content: "This is the third announcement." },
        { title: "Announcement 1", content: "This is the first announcement." },
        { title: "Announcement 2", content: "This is the second announcement." },
        { title: "Announcement 3", content: "This is the third announcement." },
        { title: "Announcement 1", content: "This is the first announcement." },
        { title: "Announcement 2", content: "This is the second announcement." },
        { title: "Announcement 3", content: "This is the third announcement." },
        
      ];


return(
  <div className={style.thePage}>
      

        <div className={style.theBody}>
        <div className={style.theCard}>
          <div className={style.img}>
            <img src={defaultImg}  alt = "The clube Loge" />
          </div>
            <p className= {style.name} > the name</p>
            <p className={style.descripation}>{descripation} </p>
            <a href  = "#"><FaWhatsapp /></a>
            <a href  = "#"><FaInstagram /></a>
            <a href  = "#"><FaXTwitter /></a>

        </div>


        <h1>Announcement</h1>
        <div 
        className={style.theCard}
        style={{
            maxHeight: '400px',
            overflowY: 'auto',
            
        }}
    
        >
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
    </div>
)
}

export default ClubeProfile;