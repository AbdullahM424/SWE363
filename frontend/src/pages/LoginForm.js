import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import style from "../assets/styles/LoginForm.module.css"; 
import { FaUserAlt, FaLock } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setValidity] = useState(true);
    const navigate = useNavigate(); // Initialize navigate function from react-router-dom
    const [error, setError] = useState(""); // To display error messages
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Function to handle the validity of the email and password
    const handleSubmit = async (e) => {
        e.preventDefault();    
        setValidity(true);

        // Validate email and password
        if (!emailRegex.test(email) || password.length < 6) {
            setValidity(false);
            console.log("is not valid");
        } else {
            try{
                const response = await fetch("/api/users/login",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({email,password})
                });
                if(!response.ok){
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                  }
                const data = await response.json();
                localStorage.setItem("token",data.token);
                navigate('/home'); // Redirect to the home page on successful validation  
            }
           catch(err){
            console.log(err.message);
            setError(err.message)
           } 
            
    }
    }
    
    return (
        <div className={style.thePage}>
            <div className={style.theBody}>
                <div className={style.wrapper}>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        {/* Error message if the email or password is invalid */}
                        <div className={isValid ? style.noErrorMasseg : style.errorMasseg}>
                            <VscError className={style.icon}/> 
                            Login failed!<br /> Please recheck the username and password and try again.
                        </div>
                        <div className={style.inputBox}> 
                            <input 
                                type='text' 
                                placeholder='Email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                            <FaUserAlt className={style.icon} />
                        </div>

                        <div className={style.inputBox}> 
                            <input 
                                type='password' 
                                placeholder='Password' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                            <FaLock className={style.icon} />
                        </div>
                        
                        <div className={style.rememberForget}>
                            <label><input type="checkbox" /> Remember me</label>
                            <a href='#'>Forget password?</a>
                        </div>
                        {error && <p className={style.errorMessage}>{error}</p>} {/* Display error message */}
                        <div className={style.submit}>
                            <button type='submit'>Login</button>
                        </div>
                        
                        <div className={style.registerLink}>
                            <p>Don't have an account? <Link to="/registration">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
