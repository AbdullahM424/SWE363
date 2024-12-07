import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "../assets/styles/LoginForm.module.css"; 
import { FaUserAlt, FaLock } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

const SignupForm = () => {
    const [username,setUsername] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setCPassword] = useState('');
    const [isValid, setValidity] = useState(true);
    const [error, setError] = useState(""); // To display error messages
    const navigate = useNavigate(); // Initialize navigate function from react-router-dom
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Function to handle the validity of the password and email
     const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email, password length, and password match
        if (!emailRegex.test(email) || password.length < 6 || password !== confirmPassword) {
            setValidity(false);
            console.log("Validation failed");
        } else {
            try{
                setValidity(true);
                const response = await fetch("/api/users/register",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({username,email,password})
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.log(errorData)
                    throw new Error(errorData.error || "Failed to login");
                  }
                  const data = await response.json();
                  // Store the token and user data on the browser for future API requests
                  console.log("Register successful:", data);
                  localStorage.setItem("token", data.token); 
                  navigate("/home");
            }
          
            catch(err){
                console.log(err.message)
                setError(err.message); // Display error to the user
            }
        }
    };

    return (
        <div className={style.thePage}>
            <div className={style.theBody}>
                <div className={style.wrapper}>
                    <form onSubmit={handleSubmit}> 
                        <h1>Signup</h1>
                        
                        <div className={style.inputBox}> 
                            <input 
                            value={username}
                            onChange={(e)=>{
                                setUsername(e.target.value)
                            }}
                            type='text' placeholder='Username' required />
                            <FaUserAlt className={style.icon} />
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

                        <div className={style.inputBox}> 
                            <input 
                                type='password' 
                                placeholder='Confirm Password' 
                                value={confirmPassword} 
                                onChange={(e) => setCPassword(e.target.value)} 
                                required 
                            />
                            <FaLock className={style.icon} />
                        </div>

                        <div className={isValid ? style.noErrorMasseg : style.errorMasseg}>
                            <p>The Password and the Email Should Follow the Following <strong>Requirements</strong>:</p>
                            <ul>
                                <li>The password should be at least 6 characters</li>
                                <li>The email should be in the format example<strong>@</strong>example<strong>.com</strong></li>
                                <li>Passwords should match</li>
                            </ul>
                        </div>
                        {error && <p className={style.errorMessage}>{error}</p>} {/* Display error message */}
                        <div className={style.submit}>
                            <button type='submit'>Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
