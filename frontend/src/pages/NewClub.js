import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "../assets/styles/ClubeProfile.module.css";
import { useClubContext } from '../components/ClubContext';
import { useNavigate } from 'react-router-dom';

const NewClub = ({ isEditing, initialData }) => {
  const { handleSave: contextHandleSave } = useClubContext();
  const navigate = useNavigate();

  const [socialMedia, setSocialMedia] = useState({ whatsapp: "", instagram: "", twitter: "" });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    if (isEditing && initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setProfileImageUrl(initialData.profileImageUrl);
      setSocialMedia({
        whatsapp: initialData.socialMedia.whatsapp,
        instagram: initialData.socialMedia.instagram,
        twitter: initialData.socialMedia.twitter,
      });
    }
  }, [isEditing, initialData]);

  const handlePhotoUrlChange = (e) => {
    setProfileImageUrl(e.target.value);
  };

  const handleSocialMediaChange = (platform, value) => {
    setSocialMedia((prev) => ({ ...prev, [platform]: value }));
  };

  const defaultHandleSave = async (data) => {
    try {
      const response = await fetch("/api/clubs/addclub", {
        method: 'POST',
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
      navigate('/clubs'); // Navigate back to the Clubs page
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSave = contextHandleSave || defaultHandleSave;

  const crearData = (e) => {
    e.preventDefault();
    const data = {
      clubName: name,
      profileDescription: description,
      profileImg: profileImageUrl,
      socialMediaContacts: JSON.stringify([
        { platform: 'WhatsApp', url: socialMedia.whatsapp },
        { platform: 'Instagram', url: socialMedia.instagram },
        { platform: 'Twitter', url: socialMedia.twitter },
      ]),
    };

    console.log('Data to be sent:', data); // Add this line
    handleSave(data);
  };

  return (
    <div className={styles.formCard}>
      <form onSubmit={crearData}>
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
            type="text"
            value={profileImageUrl}
            onChange={handlePhotoUrlChange}
            placeholder="Profile Image URL"
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

        <button type="submit">{isEditing ? 'Update Club' : 'Add Club'}</button>
      </form>
    </div>
  );
};

export default NewClub;
