import React,{useEffect,useState} from 'react'
import firebase from '../config/Firebase';
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';

export default function ViewData() {
    const [formDetails, setFormDetails]=useState({
        date:"",
        taken:0
    });
    const [billDataList, setBillDataList] = useState([])
    let elemName,value;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        let dataList=[]  
        const ref = firebase.firestore().collection("billData")
        console.log(ref)
        ref.onSnapshot((queryParam)=>{
            queryParam.forEach((doc)=>{
                console.log(doc)
                dataList.push({
                    "date": doc.data()["date"],
                    "taken": doc.data()["taken"]
                })
            })
            dataList.sort(function(a,b){return new Date(a.date) - new Date(b.date)})
            setBillDataList(dataList) 
        })    
    

    },[])

    
    const getFormDetails = (e) =>{
        elemName=e.target.name;
        value=e.target.value;
        setFormDetails({...formDetails,[elemName]:value});
    }
    const handleFormDetailsOnEdit= (e) =>{
        e.preventDefault()
        const {date, taken} = formDetails
        if(date && taken){
            firebase.firestore().collection("billData")
            .doc(date)
            .update({
                date:date,
                taken : taken 
            }) 
            setShow(false)           
            // window.location.reload(true)    
        }
    }
    
    const handleDeleteClicked = (item) =>{
        var proceed = window.confirm("Are you sure of deleting the item from database?");   
        if (proceed) {
            firebase.firestore().collection("billData")
            .doc(item.date)
            .delete();
            // window.location.reload(true)    
        } else {
            // window.location.reload(true)    
        }
    }
    const handleUpdateClicked = (item) =>{
        handleShow()
        setFormDetails({
            "date" : item.date,
            "taken" : item.taken 
        })

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
            <Modal.Title>Update!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={handleFormDetailsOnEdit}>
            <h3>Edit for date: </h3>
            <div className="form-group">
                <label>Date</label>
                <input type="date" className="form-control" name="date" value={formDetails.date} disabled/>
            </div>
            <br/>
            <div className="form-group">
            <input type="number" className="form-control" name="taken" value={formDetails.taken}  onChange={getFormDetails}/>
            </div>
            <br/>
            <button type="submit" className="btn btn-dark btn-sm btn-block">Save</button>&nbsp; &nbsp;
            <Link to="/viewData"><button type="submit" className="btn btn-dark btn-sm btn-block">Cancel</button></Link>
            </form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Milk Taken (in ltrs.)</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
  {billDataList.map((item, i) => {
    return (
        <tr key={i}>
          <td>{i+1}</td>
          <td>{item.date}</td>
          <td>{item.taken}</td>
         <td><Button class='primary' onClick={()=> handleUpdateClicked(item)}>Update</Button></td>
         <td><Button class='primary' onClick={()=> handleDeleteClicked(item)}>Delete</Button></td>
        </tr>
    );
  })}
      
</tbody>
</table>

    </div>
    ) 

}

