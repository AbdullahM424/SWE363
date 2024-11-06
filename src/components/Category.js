import React from 'react';
import styles from '../assets/styles/Category.module.css';
function Category(props){
    const cardClasses = `${styles.card} ${styles[props.title] || ''}`;
    return(
        <div className= {cardClasses}>
            <h2 className= {styles.cardLabel}>{props.title}</h2>
        </div>
    )
}

export default Category;