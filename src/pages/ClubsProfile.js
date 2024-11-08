import style from "../assets/styles/ClubeProfile.module.css";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React, { useState } from 'react';
import Announcement from "../components/Announcement";
import Accordion from 'react-bootstrap/Accordion';
import Header from "../components/common/Header.js"
import defaultImg from "../assets/images/clubeProfileImg.png";
import { MdEdit } from "react-icons/md";

const ClubeProfile = () => {
  
  const [socialMedia, setSocialMedia] = useState({ "whatsapp": "", "X": "", "instagram": "" });
  const [name, setName] = useState('');
  const [descripation, setDescripation] = useState(`the descripation of the clube the descripation of the clube the descripation of the clube the descripation 
                of the clube the descripation of the clube the descripation of the clube the descripation of the clube the descripation of the clube the 
                descripation of the clube the descripation of the clube the descripation of the clube the descripation of the clube the descripation of 
                the clube the descripation of the clube the descripation of the clube the descripation of the clube the descripation of the clube the descripation 
                of the clube the descripation of the clube the descripation of the clube the descripation of the clube the descripation of the clube the descripation 
                of the clube the descripation of the clube`);
  const [profileImage, setProfileImage] = useState('');
  const [isRotated, setIsRotated] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

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

  const handleSave = (e) => {
    e.preventDefault();
    setIsFlipping(true); // Start the flip animation

    setTimeout(() => {
      setIsRotated(false); // Go back to profile view
      setIsFlipping(false); // Reset flipping state
    }, 600); // Delay matches the CSS transition time
  };

  return (
    <div className={style.thePage}>
        <Header />
      <div className={`${style.theBody} ${isRotated ? style.rotated : ''}`}>
        {!isRotated ? (
          <div>
          <div className={style.theCard}>
            <div className={style.theImg}>
              <img src={defaultImg} alt="The clube Logo" />
            </div>
            <p className={style.name}>the name</p>
            <p className={style.descripation}>{descripation}</p>
            <div className={style.contactIcons}>
              <a href="#"><FaWhatsapp /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaXTwitter /></a>
            </div>
          </div>
          <h1>Announcement</h1>
        <div className={style.theCard} style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Accordion>
            {announcementsData.map((item, index) => (
              <Announcement key={index} announcementsTitle={item.title} announcements={item.content} num={index} />
            ))}
          </Accordion>
        </div>
          </div>
          
        ) : (
          <div className={style.formCard}>
            <form onSubmit={handleSave}>
              <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>
                Description:
                <textarea value={descripation} onChange={(e) => setDescripation(e.target.value)} />
              </label>
              <button type="submit">Save</button>
            </form>
          </div>
        )}


    
      </div>
        <button className={style.editButt}
        onClick={() => setIsRotated(!isRotated)}><MdEdit /> Edit Profile  </button>
  </div>
  )
}

export default ClubeProfile;