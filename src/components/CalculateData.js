import React, {useState,useEffect} from 'react';
import Dashboard from './Dashboard';
import firebase from '../config/Firebase';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';


function CalculateData() {
    const [formDetails, setFormDetails]=useState({
        startdate:"",
        enddate:"",
        price:1
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [totalAmt, setTotalAmt] = useState(0)
    const [totalCmp, setTotalCmp] = useState(0)
    let elemName,value;
    const getFormDetails = (e) =>{
        elemName=e.target.name;
        value=e.target.value;
        setFormDetails({...formDetails,[elemName]:value});
    }
    const handleFormDetailsOnSubmit= (e) =>{
        e.preventDefault()
        const {startdate, enddate, price} = formDetails
        var sum=0
        if(startdate && enddate && price){
            let totalAmount=0    
            const ref = firebase.firestore().collection("billData")
            ref.where('date', '>=', startdate)
            .where('date', '<=', enddate)
            .get()
            .then(snapshot => {
                    snapshot.forEach(docs=>{
                        sum=sum+parseFloat(docs.data()["taken"],2)
                    })
                    totalAmount=price*sum
                    setTotalAmt(totalAmount)
                    setTotalCmp(sum)
                    handleShow()        
                });   
        }
    }
    
    return (
        <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Summary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table>
                <tr>
                    <td>Bill Amount</td>
                    <td><b>Rs. {totalAmt}</b></td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>13/12/2021</td>
                </tr>
                <tr>
                    <a href="#">View Detailed Summary</a>
                </tr>
            </table>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Save to PDF</Button> */}
          </Modal.Footer>
        </Modal>
           <form onSubmit={handleFormDetailsOnSubmit}>
            <h3>Calculate the total</h3>
            <div className="form-group">
                <label>Start Date: </label>
                <input type="date" className="form-control" name="startdate" onChange={getFormDetails}/>
                <br/>
                <label>End Date: </label>
                <input type="date" className="form-control" name="enddate" onChange={getFormDetails}/>
            </div>
            <br/>
            <div className="form-group">
                <label>Price @today: </label>
                <input type="number" className="form-control" placeholder="Enter the price of milk @today" name="price" value={formDetails.price} onChange={getFormDetails} />
            </div>
            <button type="submit" className="btn btn-dark btn-sm btn-block">Calculate</button>&nbsp; &nbsp;
            <Link to="/dashboard"><button type="submit" className="btn btn-dark btn-sm btn-block">Cancel</button></Link>
            </form> 
        </div>
    )
}

export default CalculateData
