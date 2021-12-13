import React from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


export default function Dashboard() {    
    return (
        <div>
            <Card className="text-center">
            <Card.Header>Bill</Card.Header>
            <Card.Body>
                <Card.Title>Milk Consumption Bill</Card.Title>
                <Card.Text>
                This help you to add, view, calculate your month bill for milk consumption.
                </Card.Text>
                <Link to={"/viewData"}><Button variant="primary">View</Button></Link> &nbsp;&nbsp;
                <Link to={"/addDetails"}><Button variant="primary">Add</Button></Link> &nbsp;&nbsp;
                <Link to={"/calculateBill"}><Button variant="primary">Calculate</Button></Link>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>

        </div>
    )
}
