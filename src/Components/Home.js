import React , { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Home.css';
import Register from './Register';
import TopNav from './TopNav';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';




function Home() {
  const [lgShow, setLgShow] = useState(false);
  // Retrieving values from localStorage
const name = localStorage.getItem("Name");
const email = localStorage.getItem("Email");
const number = localStorage.getItem("Number");
   let navigate = useNavigate();
  return (
    <div>
      <div  className="app-container">
      {/* Background with Curved Circles */}
      <div  className="background-circles"></div>

      {/* Navbar with Overlay */}
     
     <TopNav/>
      {/* Main Content Below */}
     <center>
     <div style={{marginTop:"50px"}} className="row">
  <div className="col-md-3 mb-3">
    <Card onClick={()=> navigate('/chat')} style={{ width: '50%',backgroundColor:"lightgreen" }}>
    <Card.Body>
        <Card.Title style={{textAlign:"center",fontWeight:"bold",fontFamily:"fantasy"}}>Chat</Card.Title> <hr/>
       <center>
       <Card.Text>
          <img style={{width:"80%"}} src='./Images/chat.svg'></img>
        </Card.Text>
       </center>
      </Card.Body>
    </Card>
  </div>
  <div className="col-md-3 mb-3">
    <Card onClick={()=> navigate('/quiz')} style={{ width: '50%',backgroundColor:"lightblue" }}>
    <Card.Body>
        <Card.Title style={{textAlign:"center",fontWeight:"bold",fontFamily:"fantasy"}}>Quiz</Card.Title> <hr/>
       <center>
       <Card.Text>
          <img style={{width:"80%"}} src='./Images/quiz.svg'></img>
        </Card.Text>
       </center>
      </Card.Body>
    </Card>
  </div>
  <div className="col-md-3 mb-3">
    <Card onClick={()=> navigate('/dict')} style={{ width: '50%',backgroundColor:"lightyellow" }}>
    <Card.Body>
        <Card.Title style={{textAlign:"center",fontWeight:"bold",fontFamily:"fantasy"}}>Dictionary</Card.Title> <hr/>
       <center>
       <Card.Text>
          <img style={{width:"80%"}} src='./Images/dict.svg'></img>
        </Card.Text>
       </center>
      </Card.Body>
    </Card>
  </div>
  <div className="col-md-3 mb-3">
    <Card onClick={()=>setLgShow(true)} style={{ width: '50%',backgroundColor:"lightpink" }}>
    <Card.Body>
        <Card.Title style={{textAlign:"center",fontWeight:"bold",fontFamily:"fantasy"}}>Profile</Card.Title> <hr/>
       <center>
       <Card.Text>
          <img style={{width:"80%"}} src='./Images/profile.svg'></img>
        </Card.Text>
       </center>
      </Card.Body>
    </Card>
  </div>
 
</div>
     </center>

     
    </div>

    {/* Modal to Show Profile Details */}

    <Modal
        size="md"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{fontFamily:"monospace",fontWeight:"bold"}} id="example-modal-sizes-title-lg">
<center>
<img style={{width:"35px",margin:"10px"}} src='./Images/logo.jpeg'></img>Your Profile
</center>          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <Card style={{ maxWidth: "500px", margin: "auto", backgroundColor: "lightgray" }}>
        <Card.Body>
          <Card.Title
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "fantasy",
              marginBottom: "20px",
            }}
          >
            User Details
          </Card.Title> <hr/>
          <div style={{ marginBottom: "15px" }}>
            <span
              style={{
                fontWeight: "bold",
                fontFamily: "serif",
                backgroundColor: "lightpink",
                padding: "7px",
                borderRadius: "20px",
              }}
            >
              Name:
            </span>
            <span style={{ marginLeft: "10px" }}>{name}</span>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <span
              style={{
                fontWeight: "bold",
                fontFamily: "serif",
                backgroundColor: "lightgreen",
                padding: "7px",
                borderRadius: "20px",
              }}
            >
              Email:
            </span>
            <span style={{ marginLeft: "10px" }}>{email}</span>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <span
              style={{
                fontWeight: "bold",
                fontFamily: "serif",
                backgroundColor: "lightblue",
                padding: "7px",
                borderRadius: "20px",
              }}
            >
              Phone Number:
            </span>
            <span style={{ marginLeft: "10px" }}>{number}</span>
          </div>
        </Card.Body>
      </Card>
    </Modal.Body>
      </Modal>
    </div>
  )
}

export default Home