import React from "react";
import { useNavigate } from "react-router-dom";

const Login =  () => {
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const navigate=useNavigate();
    React.useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth)
        {
            navigate ('/')
        }
    
    })

    const handleLogin=async()=>{

        console.warn(email,password)
        let result=await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type' : 'application/json'
            }
         
        });
        result= await result.json();
         console.warn(result);
         if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));

         navigate('/')
         }else{
            alert("Please Enter Corret Email and Passowrd")
         }
    }
    return (
        <div className="signup">
            <h1>Login</h1>

           <input type="text" className="inputBox" placeholder="Enter Username"
           onChange={(e)=>setEmail(e.target.value)} value={email}
           ></input>
           <input type="password" className="inputBox" placeholder="Enter password"
           onChange={(e)=>setPassword(e.target.value)} value={password}>
           </input>
           <button className="appButton" onClick={handleLogin}  type="button">Log In</button>



        </div>


    )

}
export default Login;