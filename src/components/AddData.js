import React, {useState,useEffect} from 'react';
import Dashboard from './Dashboard';
import firebase from '../config/Firebase';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function AddData() {
    const [formDetails, setFormDetails]=useState({
        date:"",
        taken:0
    });
    const [option, setOption]=useState(false)
    const [showLitreSelection, setShowLitreSelection] = useState(false)
    let elemName,value;
    const handleOptionChange = (evt) =>{
        if(evt.target.value == "yes"){
            setShowLitreSelection(true)
        }
        else{
            setShowLitreSelection(false)
        }
        setOption(evt.target.value)
    } 
    const getFormDetails = (e) =>{
        elemName=e.target.name;
        value=e.target.value;
        setFormDetails({...formDetails,[elemName]:value});
    }
    const handleFormDetailsOnSubmit= (e) =>{
        e.preventDefault()
        const {date, taken} = formDetails
        if(date && taken){
            firebase.firestore().collection("billData").add({
                "date" : date,
                "taken" : taken
            })
            .then((docRef) => {
                alert("Data Successfully Submitted");
                setFormDetails({
                    date:"",
                    taken:0
                })
                setShowLitreSelection(false)
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    
                
        }
        
    }
    return (
        <div>
            <form onSubmit={handleFormDetailsOnSubmit}>
            <h3>Today's Add up</h3>
            <div className="form-group">
                <label>Date</label>
                <input type="date" className="form-control" name="date" onChange={getFormDetails}/>
            </div>
            <br/>
            {/* <div className="form-group">
                <input type="" className="form-control" placeholder="Enter password" name="password" value={userDetails.password} onChange={getUserDetails} />
            </div> */}
            <div className="radio">
            <label>Milk taken: &nbsp;&nbsp;</label>
            <label>
                <input type="radio" value="yes" checked={option === 'yes'} 
                      onChange={handleOptionChange} />
                Yes
            </label>&nbsp;&nbsp;&nbsp;&nbsp; 
            {/* </div>
            <div className="radio"> */}
            <label>
                <input type="radio" value="no" checked={option === 'no'} 
                      onChange={handleOptionChange}  />
                No
            </label>
            </div>
            <br/>
            {showLitreSelection ? (<div className="form-group">
                <label>Milk taken</label>
                <input type="number" className="form-control" name="taken" value={formDetails.taken}  onChange={getFormDetails}/>
            </div>) : null } <br/>
            <button type="submit" className="btn btn-dark btn-sm btn-block">Save</button>&nbsp; &nbsp;
            <Link to="/dashboard"><button type="submit" className="btn btn-dark btn-sm btn-block">Cancel</button></Link>
            </form>
        </div>
    )
}

export default AddData
