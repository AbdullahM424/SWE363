import React, { useState } from 'react';
import style from "../assets/styles/LoginForm.module.css"; 
import { FaUserAlt, FaLock } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let [isValid, setValidty] = useState(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //function to handle the valdity of the password and email
    const handleSubmit = (e) =>{
        e.preventDefault();    
        setValidty(true)
        // validation email and password
        if(!emailRegex.test(email) || password.length < 6){
                setValidty(false); 
                console.log("is not valid")
        }
        else{
            // here we should add the requst later
            console.log("submitted successfully")
        }
    }
       

    return (
        <div className={style.thePage}>
        <div className={style.theBody}>
        <div className= {style.wrapper}>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {/* error messeg if the password or the emil unvalide*/}
                <div className={isValid ? style.noErrorMasseg : style.errorMasseg } >
                    <VscError className={style.icon}/> 
                    Login failed!<br /> Please recheck the username and password and try again.
                    
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
                
                <div className={style.rememberForget}>
                    <label><input type = "checkbox"></input>Remember me</label>
                    <a href='#'>Forget password?</a>
                </div>
                <div className= {style.submit}>
                    <button type='submit'>Login</button>
                </div>
                <div className={style.registerLink}>
                    <p>Don't have an account?<a href='#'> Register</a></p>
                </div>
            </form>
        </div>
        </div>
        </div>
    );
}

export default LoginForm;