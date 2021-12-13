import React,{useState, useEffect} from 'react'
import firebase from '../config/Firebase';
import SignUpForm from './SignUpForm';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from '../components/Dashboard';

export default function LoginForm() {
    const [data,setData] = useState([])
    const [flag,setFlag] = useState(false)
    useEffect(() => {
        const ref = firebase.firestore().collection("userData")
        ref.onSnapshot((queryParam)=>{
            const items = []
            queryParam.forEach((doc)=>{
                items.push(doc.data())
            })
            setData(items)
        })        
      }, [])
    const [userDetails, setUserDetails]=useState({
        email:"",
        password:""
    });
    let elemName,value;
    const getUserDetails = (e) =>{
        elemName=e.target.name;
        value=e.target.value;
        setUserDetails({...userDetails,[elemName]:value});
    }

    const handleUserDetailsOnSubmit = async (event) =>{
    event.preventDefault();
    let {email , password} = userDetails;
    if (email && password){
        data.forEach((elem)=>{
            if(email==elem.email && password==elem.password){
                setFlag(true)
            }
        })
    
    }
        
    }
    if(flag){
        return(
            <div>
                <Dashboard/>
            </div>
        )
    }
    return (
        <div>
            <form onSubmit={handleUserDetailsOnSubmit}>
            <h3>Log in</h3>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" name="email" value={userDetails.email}  onChange={getUserDetails}/>
            </div>
            <br/>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name="password" value={userDetails.password} onChange={getUserDetails} />
            </div>
            <br/> 
            <button type="submit" className="btn btn-dark btn-md btn-block">Sign in</button> 
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
            </form>
        </div>
    )
}
