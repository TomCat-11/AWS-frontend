import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Modal, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import TopNav from './TopNav'; // Assuming you have this component
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Chat.css';


function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("All");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState([]);
  const [selectedcategory, setSelectedCategory] = useState("");
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  
  const startListen = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser does not support speech recognition!");
      return;
    }

    // Start listening for voice input
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListen = () => {
    // Stop listening for voice input
    SpeechRecognition.stopListening();
    setSearchText(transcript); // Update the input field with the final transcript
  };


  const clearInput = () => {
    window.location.reload();
    setSearchText("");
    resetTranscript(); // Clears the transcript
  };

  useEffect(() => {
    if (!searchText.trim() && transcript.trim()) {
      setSearchText(transcript); // Sync searchText with transcript when empty
    }
  }, [transcript]);
  

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
        return null
        if (selectedcategory && searchText !== "") {
            fetchItems();
          }
      }
   
  }, [selectedcategory, searchText]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(`https://13.53.129.50/ItemData/${category}`, {
        params: { search: searchText },
      });
      setItems(response.data.items);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("No items found for this category and search text");
      setItems([]);
    }
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };

  const handleADD = async () => {
    if (!text.trim() || !category || !file) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    try {
      await sendItemDataToDataBase();
      setLgShow(false); // Close modal on success
      alert("Item added successfully ✅");
      window.location.reload();
    } catch (err) {
      setError("Failed to add item. Please try again.");
    }
  };

  const sendItemDataToDataBase = async () => {
    try {
      const dataToSend = new FormData();
      dataToSend.append("text", text);
      dataToSend.append("category", category);
      dataToSend.append("file", file);

      const response = await axios.post('https://13.53.129.50/NewItem', dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status !== "Success") {
        throw new Error(response.data.msg || "API failed");
      }
    } catch (error) {
      console.error("Error sending item data:", error);
      throw error;
    }
  };

  return (
    <div className="chat-container">
      <TopNav /> <hr/>

      <div className="add-item-container">
        
        <Form.Group style={{ margin: "5px", width: "150px" }} controlId="categorySelect">
          <Form.Control as="select" value={category} onChange={handleCategoryChange}>
            <option value="All">ALL</option>
            <option value="Animal">Animals</option>
            <option value="Alphabet">Alphabets</option>
            <option value="Fruit">Fruits</option>
            <option value="Vegetable">Vegetables</option>
            <option value="Thing">Things</option>
            <option value="Word">Words</option>
            <option value="Sentence">Sentences</option>
          </Form.Control>
        </Form.Group>
        

        <Button onClick={() => setLgShow(true)} variant="warning" style={{ fontWeight: "bold" }}>
          ADD Item
        </Button>
      </div>
      {/* <p>{transcript}</p>
      <Button
      variant="light"
      style={{ fontWeight: "bold", backgroundColor: "lightgray",width:"55px"}}
      onClick={startListen}
      className="input-group-append"
    >
      <img  src="./Images/mic.svg" alt="Send" />
    </Button>
    <Button
      variant="light"
      style={{ fontWeight: "bold", backgroundColor: "lightgray",width:"55px"}}
      onClick={SpeechRecognition.stopListening}
      className="input-group-append"
    >
      <img  src="./Images/stop.svg" alt="Send" />
    </Button> */}
      <hr />


      <center>
      {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

  <div>
    {/* If items are available, show files; otherwise, show the default video */}
    {items.length === 0 ? (
      <video
        style={{ width: "300px", height: "60vh" }}
        autoPlay
        muted
        loop
        playsInline
        src="./Videos/welcome.mp4"
      ></video>
    ) : (
      <Row className="mt-4">
        {items.map((item, index) => {
          const fileType = item.file.split('.').pop().toLowerCase(); // Get file extension

          return (
            <Col md={4} key={index} className="mb-4">
             
                  {/* <Card.Subtitle className="mb-2 text-muted">Category: {item.category}</Card.Subtitle>
                  <Card.Title>Text: {item.text}</Card.Title> */}

                  {/* Conditionally render image or video */}
                  {['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg','webp'].includes(fileType) ? (
                    <img
                      src={`https://13.53.129.50/${item.file}`}
                      alt={item.text}
                      style={{ width: "300px",height:"60vh" }}
                    />
                  ) : ['mp4', 'webm', 'ogg'].includes(fileType) ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: "300px",height:"60vh" }}
                      src={`https://13.53.129.50/${item.file}`}
                    ></video>
                  ) : (
                    <Alert variant="warning">Unsupported file type</Alert>
                  )}
                
            </Col>
          );
        })}
      </Row>
    )}
  </div>
</center>


<div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '10px', backgroundColor: 'white', zIndex: 1000 }}>
  <center>
  
  <Form>
  <Row>
    <Col xs={9} md={8} lg={10}>
      <Form.Group controlId="searchText">
        <div className="input-group">
          <Form.Control
            type="text"
            placeholder="Enter the Text"
            value={searchText} // Use only `searchText` for controlled input
            onChange={(e) => setSearchText(e.target.value)}
            className="w-100" // Ensures full width in mobile
            style={{ padding: "12px" }}
          />
        </div>
      </Form.Group>
    </Col>
    <Col
      xs={3} 
      md={4} 
      lg={2} 
      className="d-flex justify-content-between align-items-center flex-column flex-md-row"
      style={{ gap: "8px" }} // Space between buttons on mobile
    >
      {searchText.trim() || transcript.trim() ? (
        <>
          <Button
            style={{
              fontWeight: "bold",
              backgroundColor: "lightgray",
              width: "100%", // Full width on mobile
              maxWidth: "150px", // Limit the width on larger screens
            }}
            variant="light"
            onClick={fetchItems}
            className="send-button mb-2 mb-md-0"
          >
            <img style={{ width: "25px" }} src="./Images/send.svg" alt="Send" />
          </Button>
          <Button
            variant="danger"
            onClick={clearInput}
            className="clear-button"
            style={{
              fontWeight: "bold",
              width: "100%", // Full width on mobile
              maxWidth: "150px", // Limit the width on larger screens
            }}
          >
            Clear
          </Button>
        </>
      ) : (
        <Button
          variant="light"
          style={{
            fontWeight: "bold",
            backgroundColor: "lightgray",
            width: "55px",
          }}
          onMouseDown={startListen} // Start listening on press
          onMouseUp={stopListen} // Stop listening on release
          className="input-group-append"
        >
          <img src="./Images/mic.svg" alt="Mic" />
        </Button>
      )}
    </Col>
  </Row>
</Form>



  </center>
</div>


      {/* ADD Item Modal */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{ fontFamily: "fantasy", fontWeight: "bold" }}
            id="example-modal-sizes-title-lg"
          >
            <img style={{ width: "35px" }} src="./Images/logo.jpeg" alt="Add Item Icon" />
            ADD Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            <Form.Group className="mb-3">
              <Form.Label style={{ fontFamily: "fantasy", fontWeight: "bold" }}>Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                isInvalid={!text.trim() && error}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label style={{ fontFamily: "fantasy", fontWeight: "bold" }}>Category</Form.Label>
              <Form.Select
                aria-label="Select a category"
                value={category}
                onChange={handleCategoryChange}
                isInvalid={!category && error}
              >
                <option value="">Select Category</option>
                <option value="Word">Word</option>
                <option value="Sentence">Sentence</option>
                <option value="Animal">Animal</option>
                <option value="Fruit">Fruit</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Alphabet">Alphabet</option>
                <option value="Thing">Thing</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFileUpload">
              <Form.Label style={{ fontFamily: "fantasy", fontWeight: "bold" }}>Upload File</Form.Label>
              <Form.Control
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files[0])}
                isInvalid={!file && error}
              />
            </Form.Group>

            <Button variant="success" type="button" onClick={handleADD}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Chat;
