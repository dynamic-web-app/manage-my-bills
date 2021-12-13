import React, {useState} from 'react';
import firebase from '../config/Firebase';

export default function SignUpForm(props){
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    });
    let name,value;
    const getUserData = (event) =>{
        name=event.target.name
        value=event.target.value
        setUser({...user, [name]: value});
    }    
    const handleSubmit = (evt) =>{
        evt.preventDefault();
        const {name, email, password} =user;
        if(name && email && password){
            firebase.firestore().collection("userData").add({
                "name" : name,
                "email" : email,
                "password" : password
            })
            .then((docRef) => {
                alert("Data Successfully Submitted");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    
                alert("Data Stored Successfully");
                setUser({
                    name:"",
                    email:"",
                    password:""
                })
        }
        else{
            alert("Please all the required fields")
        }
        
    }
    return (
        <div>
                <form onSubmit={handleSubmit} method="POST">
                <h3>Sign Up</h3>
                {/* <small>We will help you to manage and track your expanses.</small> */}
                <div class="form-group">
                    <b><label for="name">Enter Name*</label></b>
                    <input type="text" class="form-control" id="name" name="name" aria-describedby="nameHelp" placeholder="Enter your name here." value={user.name} onChange={getUserData} />
                </div><br/>
                <div class="form-group">
                    <b><label for="email">Enter Email*</label></b>
                    <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter your email here." value={user.email} onChange={getUserData} />
                </div><br/>
                <div class="form-group">
                    <b><label for="password">Enter password*</label></b>
                    <input type="password" class="form-control" id="password" name="password" aria-describedby="passwordHelp" placeholder="Enter your password here." value={user.password} onChange={getUserData} />
                </div><br/>
                <button type="submit" className="btn btn-dark btn-sm btn-block">Register</button>
            </form>
        </div>
    )
}
