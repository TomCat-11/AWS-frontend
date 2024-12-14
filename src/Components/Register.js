import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { data, useNavigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import { useLocation } from 'react-router-dom';


function Register() {
  
const [loginemail,setLoginemail]= useState('');
const [loginpassword,setLoginpassword]= useState('');
const [forgotPassShow,setForgotPassShow]=useState(false);
const [newPassShow,setNewPassShow]=useState(false);
const [newPassword, setNewPassword] = useState('');
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('hebqh sanc sjhc sjch shvsduqhvduqwhd uqwdvqwhd bwh djhdbwjdh');  // Store generated OTP from backend
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const [smShow, setSmShow] = useState(false);
    const location = useLocation();

    useEffect(() => {
      if (location.state?.showSignupModal) {
        setSmShow(true); // Trigger modal or specific logic
      }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'otp') {
            setOtp(value);
        }
    };

    // Send OTP to the email
    const sendOtp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://13.53.129.50:7760/send-otp', { email });
            setGeneratedOtp(response.data.otp); // Save the OTP sent by the server
            setMessage('OTP sent successfully');
            setMessageColor('green')
            
        } catch (error) {
            console.error('Error sending OTP:', error);
            setMessage('Failed to send OTP');
            setMessageColor('red')
        }
    };

    const verifyOtp = async (e) => {
    e.preventDefault();
    
        try {
            const response = await axios.post('https://13.53.129.50:7760/verify-otp', { enteredOtp: otp, generatedOtp });
            console.log('Server response:', response); // Log the server response
            setMessage(response.data); // Show success message
            setMessageColor('green')
            setShow(true);

        } catch (error) {
            console.error('Error verifying OTP:', error);
            setMessage("Invalid OTP");
            setMessageColor('red')
        }
    };
    const verifyPassOtp = async (e) => {
      e.preventDefault();
      
          try {
              const response = await axios.post('https://13.53.129.50:7760/verify-otp', { enteredOtp: otp, generatedOtp });
              console.log('Server response:', response); // Log the server response
              setMessage(response.data); // Show success message
              setMessageColor('green')
              setNewPassShow(true);
  
          } catch (error) {
              console.error('Error verifying OTP:', error);
              setMessage("Invalid OTP");
              setMessageColor('red')
          }
      };

  const validate = () => {
    const formErrors = {};
    if (!name.trim()) formErrors.name = 'Name is required.';
    if (!/^\d{10}$/.test(phoneNumber)) formErrors.phoneNumber = 'Phone number must be a valid 10-digit number.';
    if (password.length < 6) formErrors.password = 'Password must be at least 6 characters.';
    if (confirmPassword !== password) formErrors.confirmPassword = 'Passwords do not match.';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Signup successful!');
      window.location.reload();
      setShow(false);
      setName('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
    }
  };

  const sendUserDatatoDB = async ()=>{
    if (validate()) {
      try {
        const response = await axios.post('https://13.53.129.50:7760/Newuser', {
          username: name,
          email,
          password,
          phoneNumber,
        });
        if (response.data.message === 'User registered successfully') {
          alert('Signup successful!');
          // setShow(false);
          setName('');
          setPhoneNumber('');
          setPassword('');
          setConfirmPassword('');
          setErrors({});
          // navigate('/home');  // Navigate to home or desired route after successful registration
        }

      } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed!');
      }
    }
  }

  const handleLoginSubmit = () => navigate('/home');

const handleLogin = async (email, password) => {
    try {
        const response = await axios.post('https://13.53.129.50:7760/login', { email, password });

        if (response.data.status === "Success") {
            alert(response.data.msg)
             console.log(response.data)
             localStorage.setItem("Name",response.data.data.name);
             localStorage.setItem("Email",response.data.data.email);
             localStorage.setItem("Number",response.data.data.phoneNumber);
            navigate('/home')
            // Handle successful login (e.g., redirect to a dashboard, store token, etc.)
        } else {
            alert(response.data.msg)
            // Handle failed login (e.g., show error message to user)
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert(error)
        // Handle error (e.g., show an alert to the user)
    }
};

  const handleClose = () => {setShow(false);window.location.reload();}
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    // Form validation
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required.' }));
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setErrors((prev) => ({
        ...prev,
        newPassword: 'Password must be at least 6 characters.',
      }));
      return;
    }

    try {
      // API call to update password
      const response = await axios.put('https://13.53.129.50:7760/update-password', {
        email,
        password: newPassword,
      });

      setMessage(response.data.message);
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };


  return (
    <div>
      <center>
        <Form style={{ backgroundColor: 'rgb(230, 210, 250)', padding: '20px', width: '330px', borderRadius: '20px',marginTop:"50px" }}>
          <Image style={{ width: '70px' }} src="/Images/logo.jpeg" />
          <hr />
          <InputGroup controlId="formBasicEmail">
            <Form.Control value={loginemail} onChange={(e)=> setLoginemail(e.target.value)} style={{padding:"10px"}} type="email" placeholder="Enter Your Email" />
            <InputGroup.Text id="basic-addon1"><img style={{width:"25px"}} src='./Images/mail.svg'></img></InputGroup.Text>
          </InputGroup>
          <InputGroup style={{marginTop:"20px"}} controlId="formBasicPassword">
            <Form.Control value={loginpassword} onChange={(e)=> setLoginpassword(e.target.value)} style={{padding:"10px"}} type="password" placeholder="Enter Your Password" />
            <InputGroup.Text id="basic-addon1"><img style={{width:"25px"}} src='./Images/lock.svg'></img></InputGroup.Text>
          </InputGroup>
          <a  onClick={()=>setForgotPassShow(true)} style={{ color: 'blue', textDecoration: 'none' }}>
            Forgot Password?
          </a>
          <hr />
          <Button onClick={()=>handleLogin(loginemail,loginpassword)} style={{ width: '100%' }} variant="success">
            Login
          </Button>
          <p style={{ color: 'brown', marginTop: '10px' }}>Don't have an account?</p>
          <h6 onClick={()=>setSmShow(true)} style={{ color: 'blueviolet', cursor: 'pointer' }}>
            Register Now
          </h6>
        </Form>

        <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
        <center>
                <Form style={{ backgroundColor: "ButtonShadow", padding: "10px" }}>
                <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>Enter Email</Form.Label>

        <Form.Control
                        
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        style={{padding:"10px"}}
                    />

      </Form.Group>
                    

                    <Button variant="primary" type="submit" onClick={sendOtp}>
                        Send OTP
                    </Button>
                    <hr />
                    <p style={{color: messageColor}}>{message}</p>

                    <Form.Group className="mb-3" controlId="formBasicOtp">
                        <Form.Label style={{ fontWeight: "bold" }}>Enter OTP</Form.Label>
                        <Form.Control
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={handleChange}
                            placeholder="Enter OTP"
                            required
                        />
                    </Form.Group>

                    <Button variant="success" type='button' onClick={verifyOtp}>
                        Verify
                    </Button>

                </Form>
            </center>
        </Modal.Body>
      </Modal>
      <Modal
        size="sm"
        show={forgotPassShow}
        // onHide={() => setForgotPassShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header >
          {/* <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
        <center>
                <Form style={{ backgroundColor: "ButtonShadow", padding: "10px" }}>
                <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>Enter Email</Form.Label>

        <Form.Control
                        
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        style={{padding:"10px"}}
                    />

      </Form.Group>
                    

                    <Button variant="primary" type="submit" onClick={sendOtp}>
                        Send OTP
                    </Button>
                    <hr />
                    <p style={{color: messageColor}}>{message}</p>

                    <Form.Group className="mb-3" controlId="formBasicOtp">
                        <Form.Label style={{ fontWeight: "bold" }}>Enter OTP</Form.Label>
                        <Form.Control
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={handleChange}
                            placeholder="Enter OTP"
                            required
                        />
                    </Form.Group>

                    <Button variant="success" type='button' onClick={verifyPassOtp}>
                        Verify
                    </Button>

                </Form>
            </center>
        </Modal.Body>
      </Modal>

        <Modal show={show}  onHide={handleClose}>
          <Modal.Body>
         
            <Form style={{ backgroundColor: 'lightgray', padding: '20px', borderRadius: '20px',textAlign:"center" }} onSubmit={handleSignupSubmit}>
              <Image style={{ width: '70px' }} src="/Images/logo.jpeg" />
              <hr />
              
              <Form.Group>
                <Form.Label style={{fontWeight:"bold"}}>Name</Form.Label>
                <Form.Control  style={{padding:"10px"}}
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <Form.Text style={{ color: 'red' }}>{errors.name}</Form.Text>}
              </Form.Group>
              <Form.Group>
                <Form.Label style={{fontWeight:"bold"}}>Phone Number</Form.Label>
                <Form.Control style={{padding:"10px"}}
                  type="text"
                  placeholder="Enter Your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {errors.phoneNumber && <Form.Text style={{ color: 'red' }}>{errors.phoneNumber}</Form.Text>}
              </Form.Group>
              <Form.Group>
                <Form.Label style={{fontWeight:"bold"}}>Email</Form.Label>
                <Form.Control  style={{padding:"10px"}}
                readOnly
                  type="text"
                  placeholder=""
                  value={email}/>
              </Form.Group>
              <Form.Group>
                <Form.Label style={{fontWeight:"bold"}}>Password</Form.Label>
                <Form.Control style={{padding:"10px"}}
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <Form.Text style={{ color: 'red' }}>{errors.password}</Form.Text>}
              </Form.Group>
              <Form.Group>
                <Form.Label style={{fontWeight:"bold"}}>Confirm Password</Form.Label>
                <Form.Control style={{padding:"10px"}}
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <Form.Text style={{ color: 'red' }}>{errors.confirmPassword}</Form.Text>}
              </Form.Group>
              <hr />
              <Button onClick={sendUserDatatoDB} style={{ width: '100%' }} type="submit" variant="success">
                Signup
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={newPassShow}  onHide={()=>setNewPassShow(false)}>
          <Modal.Body>
         
          <Form
      style={{
        backgroundColor: 'lightgray',
        padding: '20px',
        borderRadius: '20px',
        textAlign: 'center',
      }}
      onSubmit={handleSubmit}
    >
      <Image style={{ width: '70px' }} src="/Images/logo.jpeg" />
      <hr />
      <Form.Group>
        <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
        <Form.Control
          style={{ padding: '10px' }}
          type="text"
          placeholder="Enter Email"
          value={email}
          readOnly
        />
        {errors.email && <Form.Text style={{ color: 'red' }}>{errors.email}</Form.Text>}
      </Form.Group>
      <Form.Group>
        <Form.Label style={{ fontWeight: 'bold' }}>New Password</Form.Label>
        <Form.Control
          style={{ padding: '10px' }}
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {errors.newPassword && (
          <Form.Text style={{ color: 'red' }}>{errors.newPassword}</Form.Text>
        )}
      </Form.Group>
      <hr />
      <Button style={{ width: '100%', fontWeight: 'bold' }} type="submit" variant="success">
        Update
      </Button>
      {message && <p style={{ marginTop: '10px', color: 'blue' }}>{message}</p>}
    </Form>
          </Modal.Body>
        </Modal>
      </center>
    </div>
  );
}

export default Register;
