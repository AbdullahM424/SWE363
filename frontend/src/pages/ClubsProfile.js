import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Announcement from "../components/Announcement";
import Accordion from 'react-bootstrap/Accordion';
import Header from "../components/common/Header.js";
import defaultImg from "../assets/images/clubeProfileImg.png";
import styles from "../assets/styles/ClubeProfile.module.css";
import NewClub from './NewClub.js';
import { ClubProvider } from '../components/ClubContext.js';

const ClubeProfile = () => {
  const location = useLocation();
  const clubName = location.state?.clubName || '';

  const [socialMedia, setSocialMedia] = useState({ whatsapp: "", instagram: "", twitter: "" });
  const [name, setName] = useState(clubName);
  const [description, setDescription] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isRotated, setIsRotated] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const [announcementsData, setAnnouncementsData] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await fetch(`/api/clubs/getclub/${clubName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setName(data.clubName);
        setDescription(data.profileDescription);
        setProfileImageUrl(data.profileImg);
        setSocialMedia({
          whatsapp: data.socialMediaContacts.find(contact => contact.platform === 'WhatsApp')?.url || '',
          instagram: data.socialMediaContacts.find(contact => contact.platform === 'Instagram')?.url || '',
          twitter: data.socialMediaContacts.find(contact => contact.platform === 'Twitter')?.url || '',
        });
      } catch (error) {
        console.error('Error fetching club details:', error);
      }
    };

    if (clubName) {
      fetchClubDetails();
    }
  }, [clubName]);

  const handleSave = async (data) => {
    try {
      const response = await fetch(`/api/clubs/updateclub/${clubName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      setTimeout(() => {
        setIsRotated(false);
        setIsFlipping(false);
      }, 600);

    } catch (error) {
      console.error('Error:', error);
    }
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
                <img src={profileImageUrl || defaultImg} alt="The club Logo" />
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
          <ClubProvider handleSave={handleSave}>
            <NewClub
              isEditing={true}
              initialData={{
                name,
                description,
                profileImageUrl,
                socialMedia,
              }}
            />
          </ClubProvider>
        )}
      </div>
      <button className={styles.editButt} onClick={() => setIsRotated(!isRotated)}>
        <MdEdit /> {!isRotated ? "Edit Profile" : "See Update"}
      </button>
    </div>
  );
};

export default ClubeProfile;
