import React, { useState } from 'react';
import style from "../assets/styles/LoginForm.module.css"; 
import { FaUserAlt, FaLock } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

const SingupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setCPassword] = useState('');
    const [isValid, setValidty] = useState(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //function to handle the valdity of the password and email
    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset error messages

        // Validate email
        
        if (!emailRegex.test(email) || password.length < 6|| password !== confirmPassword) {
            setValidty(false);
        }
        else{
            console.log("sign up successfully")
            setValidty(true);
        }

    }
    return (
        <div className = {style.thePage}>
        <div className = {style.theBody}>
        <div className= {style.wrapper}>
            <form onSubmit={handleSubmit}> 
                <h1>Singup</h1>
                
                <div className = {style.inputBox}> 
                    <input type='text' placeholder='Username' />
                    <FaUserAlt className={style.icon} />
                </div>

                <div className = {style.inputBox}> 
                    <input type='text' placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} required></input>
                    <FaUserAlt className={style.icon} />

                </div>

                <div className = {style.inputBox}> 
                    <input type='password' placeholder='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} required></input>
                    <FaLock className= {style.icon} />
                </div>

                <div className = {style.inputBox}> 
                    <input type='password' placeholder='Confirm Password' 
                    value={confirmPassword} 
                    onChange={(e) => setCPassword(e.target.value)} required></input>
                    <FaLock className= {style.icon} />
                </div>

                <div className={isValid ? style.noErrorMasseg:style.errorMasseg }>
                    <p>The Password and the Email Should Follow the Fowling <strong>Construction</strong></p>
                    <ul>
                        <li>The Password shuld be at less 6 digits</li>
                        <li>The email should be like examble<strong>@</strong>examble<strong>.com</strong></li>
                    </ul>
                </div>
                
                <div className= {style.submit}>
                    <button type='submit'>Singup</button>
                </div>
              
            </form>
        </div>
        </div>
        </div>
    );
}

export default SingupForm;