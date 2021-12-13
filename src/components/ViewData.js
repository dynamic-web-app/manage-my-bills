import React,{useEffect,useState} from 'react'
import firebase from '../config/Firebase';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


export default function ViewData() {
    const [billDataList, setBillDataList] = useState([])
    const dataList=[]
    useEffect(() => {
        const ref = firebase.firestore().collection("billData")
        ref.onSnapshot((queryParam)=>{
            queryParam.forEach((doc)=>{
                dataList.push({
                    "date": doc.data()["date"],
                    "taken": doc.data()["taken"]
                })
            })
            setBillDataList(dataList) 
        })
    }, [])
    
    console.log(billDataList)
    return (
        <div>
        <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Milk Taken (in ltrs.)</th>
    </tr>
  </thead>
  <tbody>
  {billDataList.map((item, i) => {
    console.log(item)
    return (
        <tr key={i}>
          <td>{i+1}</td>
          <td>{item.date}</td>
          <td>{item.taken}</td>
        </tr>
    );
  })}
      
</tbody>
</table>

    </div>
    )
}
