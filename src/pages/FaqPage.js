import React from 'react';
import Header from "../components/common/Header.js"
import styles from "../assets/styles/FaqPage.module.css"
import {Link} from "react-router-dom";
import FaqCard from '../components/FrequentQcard.js';


function FaqPage() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.cardContainer}>
                <FaqCard 
                    question="How do I register for classes?" 
                    answer="To register for classes, log in to your student portal, navigate to the 'Course Registration' section, and select your desired courses. Be sure to check the prerequisites and schedule before enrolling."
                />
                <FaqCard 
                    question="Where can I find the academic calendar?" 
                    answer="The academic calendar is usually available on the university's official website under the 'Academics' or 'Student Resources' section. It outlines important dates, including start and end of semesters, holidays, and exam periods."
                />
                <FaqCard 
                    question="How can I contact my academic advisor?" 
                    answer="You can contact your academic advisor via email or by scheduling an appointment through the student portal. Many advisors also have office hours posted on the department's website."
                />
            </div>
        </div>
    );
}

export default FaqPage;