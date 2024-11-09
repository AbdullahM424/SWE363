import styles from "../assets/styles/ClubeProfile.module.css";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React, { useState } from 'react';
import Announcement from "../components/Announcement";
import Accordion from 'react-bootstrap/Accordion';
import Header from "../components/common/Header.js";
import defaultImg from "../assets/images/clubeProfileImg.png";
import { MdEdit } from "react-icons/md";

const ClubeProfile = () => {
  const [socialMedia, setSocialMedia] = useState({ whatsapp: "", instagram: "", twitter: "" });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('the description of the club...');
  const [profileImage, setProfileImage] = useState(null);
  const [isRotated, setIsRotated] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const [announcementsData, setAnnouncementsData] = useState([
    { title: "Announcement 1", content: "This is the first announcement." },
    { title: "Announcement 2", content: "This is the second announcement." },
    { title: "Announcement 3", content: "This is the third announcement." },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" });

  const handleSave = (e) => {
    e.preventDefault();
    setIsFlipping(true);

    setTimeout(() => {
      setIsRotated(false);
      setIsFlipping(false);
    }, 600);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSocialMediaChange = (platform, value) => {
    setSocialMedia((prev) => ({ ...prev, [platform]: value }));
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    setAnnouncementsData([...announcementsData, newAnnouncement]);
    setNewAnnouncement({ title: "", content: "" });
  };

  return (
    <div className={styles.thePage}>
      <Header />
      <div className={`${styles.theBody} ${isRotated ? styles.rotated : ''}`}>
        {!isRotated ? (
          <div>
            <div className={styles.theCard}>
              <div className={styles.theImg}>
                <img src={profileImage || defaultImg} alt="The club Logo" />
              </div>
              <p className={styles.name}>{name}</p>
              <p className={styles.description}>{description}</p>
              <div className={styles.contactIcons}>
                <a href={socialMedia.whatsapp} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
              </div>
            </div>
            <h1 className={styles.theTitle}>Announcement</h1>
            <div className={styles.addAnnouncement}>
              <form onSubmit={handleAddAnnouncement}>
                <label>
                  <input
                    type="text"
                    value={newAnnouncement.title}
                    placeholder="Add Announcement Title"
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  />
                </label>

                <label>
                  <textarea
                    value={newAnnouncement.content}
                    rows="2"
                    placeholder="Add Announcement Content"
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  />
                </label>

                <button type="submit">Add Announcement</button>
              </form>
            </div>
            <div className={styles.theCard} style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Accordion>
                {announcementsData.map((item, index) => (
                  <Announcement key={index} announcementsTitle={item.title} announcements={item.content} num={index} />
                ))}
              </Accordion>
            </div>
          </div>
        ) : (
          <div className={styles.formCard}>
            <form onSubmit={handleSave}>
              <label>
                <input
                  type="text"
                  value={name}
                  placeholder="The Club Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label>
                <textarea
                  value={description}
                  cols="50"
                  rows="10"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <label>
                <input
                  type="file"
                  onChange={handlePhotoUpload}
                  accept="image/*"
                />
              </label>

              <label>
                <FaWhatsapp />
                <input
                  type="text"
                  value={socialMedia.whatsapp}
                  onChange={(e) => handleSocialMediaChange("whatsapp", e.target.value)}
                  placeholder="WhatsApp Link"
                />
              </label>
              
              <label>
                <FaInstagram />
                <input
                  type="text"
                  value={socialMedia.instagram}
                  onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                  placeholder="Instagram Link"
                />
              </label>

              <label>
                <FaXTwitter />
                <input
                  type="text"
                  value={socialMedia.twitter}
                  onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
                  placeholder="X Link"
                />
              </label>

              <button type="submit">Save</button>
            </form>
          </div>
        )}
      </div>
      <button className={styles.editButt} onClick={() => setIsRotated(!isRotated)}>
        <MdEdit /> Edit Profile
      </button>
    </div>
  );
};

export default ClubeProfile;
