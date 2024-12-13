import React, { useState } from 'react'
import { Card, Form, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import TopNav from './TopNav';
import axios from 'axios';







function Dict() {
    const navigate = useNavigate();
    const [lgShow, setLgShow] = useState(false);
    const [categoryData,setCategoryData]= useState([]);
    const [searchText, setSearchText] = useState("");

  // Filter the data based on the search text
  const filteredData = categoryData.filter((item) =>
    item.text.toLowerCase().includes(searchText.toLowerCase())
  );
    // Function to check if the file is an image
    const isImage = (file) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg','webp'];
        const fileExtension = file.split('.').pop().toLowerCase();
        return imageExtensions.includes(fileExtension);
      };

    const fetchCategoryData = async (category) => {
        try {
          // Define the API endpoint
          const endpoint = `https://13.53.129.50:443/ItemDataByCategory/${category}`;
          
          // Make a GET request to the API
          const response = await axios.get(endpoint);
          
          // Check if the request was successful
          if (response.status === 200) {
            console.log("Fetched Items:", response.data.items);
            setCategoryData(response.data.items)
            setLgShow(true)
           
            return response.data.items; // Return the fetched items
            
          }
        } catch (error) {
          // Handle errors
          if (error.response && error.response.status === 404) {
            console.error("No items found for this category");
            alert("No items found for the selected category.");
          } else {
            console.error("An error occurred:", error.message);
            alert("An error occurred while fetching data.");
          }
        }
      };

      const deleteItem = async (itemId) => {
        try {
            // API endpoint to delete the item
            const response = await axios.delete(`https://13.53.129.50:443/items/${itemId}`);
            
            if (response.status === 200) {
                alert("Item deleted successfully!");
                // Optionally, refresh the list of items after deletion
            } else {
                alert("Failed to delete item: " + response.data.message);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("An error occurred while deleting the item.");
        }
    };

    const handleDelete = async (itemId) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if (confirmDelete) {
          try {
              await deleteItem(itemId); // Call the delete function
              window.location.reload();
          } catch (error) {
              console.error("Error deleting item:", error);
              alert("An error occurred while deleting the item.");
          }
      } else {
          console.log("Item deletion canceled.");
      }
  };
  
  return (
    <div>
        <TopNav/>
         <center>
         <div style={{marginTop:"50px"}} className="row">
  <div className="col-md-3 mb-3">
    <Card onClick={()=>fetchCategoryData("Animal")}  style={{ width: '50%',backgroundColor:"lightgray" }}>
    <Card.Body>
        <Card.Title style={{textAlign:"center",fontWeight:"bold",fontFamily:"fantasy"}}>Animals</Card.Title> <hr/>
      
      </Card.Body>
    </Card>
  </div>
  <div className="col-md-3 mb-3">
    <Card onClick={()=>fetchCategoryData("Fruit")} style={{ width: '50%',backgroundColor:"lightgray" }}>
    <Card.Body>
        <Card.Title style={{textAlign:"center",fontWeight:"bold",fontFamily:"fantasy"}}>Fruits</Card.Title> <hr/>
      
      </Card.Body>
    </Card>
  </div>
  <div className="col-md-3 mb-3">
    <Card onClick={()=>fetchCategoryData("Vegetable")}  style={{ width: '50%',backgroundColor:"lightgray" }}>
    <Card.Body>
        <Card.Title style={{textAlign:"center",fontWeight:"bold",fontFamily:"fantasy"}}>Vegetables</Card.Title> <hr/>
      
      </Card.Body>
    </Card>
  </div>
  <div className="col-md-3 mb-3">
    <Card onClick={()=>fetchCategoryData("Alphabet")}   style={{ width: '50%',backgroundColor:"lightgray" }}>
    <Card.Body>
        <Card.Title style={{textAlign:"center",fontWeight:"bold",fontFamily:"fantasy"}}>Alphabets</Card.Title> <hr/>
      
      </Card.Body>
    </Card>
  </div>
  <div className="col-md-3 mb-3">
    <Card onClick={()=>fetchCategoryData("Word")}   style={{ width: '50%',backgroundColor:"lightgray" }}>
    <Card.Body>
        <Card.Title style={{textAlign:"center",fontWeight:"bold",fontFamily:"fantasy"}}>Words</Card.Title> <hr/>
      
      </Card.Body>
    </Card>
  </div>
  <div className="col-md-3 mb-3">
    <Card onClick={()=>fetchCategoryData("Thing")}   style={{ width: '50%',backgroundColor:"lightgray" }}>
    <Card.Body>
        <Card.Title style={{textAlign:"center",fontWeight:"bold",fontFamily:"fantasy"}}>Things</Card.Title> <hr/>
      
      </Card.Body>
    </Card>
  </div>
  <div className="col-md-3 mb-3">
    <Card onClick={()=>fetchCategoryData("Sentence")}   style={{ width: '50%',backgroundColor:"lightgray" }}>
    <Card.Body>
        <Card.Title style={{textAlign:"center",fontWeight:"bold",fontFamily:"fantasy"}}>Sentences</Card.Title> <hr/>
      
      </Card.Body>
    </Card>
  </div>
 
</div>
         </center>
   

         <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{fontFamily:"monospace",fontWeight:"bold"}} id="example-modal-sizes-title-lg">
            <img style={{width:"35px",margin:"10px"}} src='./Images/logo.jpeg'></img>Dictionary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
      {/* Search Input */}
      <Form.Group className="mb-3">
        <Form.Control
          type="search"
          placeholder="Search by Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Form.Group>

      {/* Display Filtered Items */}
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <div style={{ marginTop: "50px" }} className="row" key={item._id}>
            <center>
              <Card
                className="w-100"
                style={{
                  maxWidth: "600px",
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <Card.Body>
                  <Card.Title
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontFamily: "fantasy",
                    }}
                  >
                    <span
                      style={{
                        margin: "10px",
                        fontFamily: "serif",
                        backgroundColor: "lightpink",
                        padding: "7px",
                        borderRadius: "20px",
                      }}
                    >
                      Category:
                    </span>{" "}
                    {item.category}{" "} <hr/>
                    <span
                      style={{
                        margin: "10px",
                        fontFamily: "serif",
                        backgroundColor: "lightgreen",
                        padding: "7px",
                        borderRadius: "20px",
                      }}
                    > 
                      Name:
                    </span>{" "}
                    {item.text}
                  </Card.Title>
                  <hr />
                  {/* Conditionally render image or video */}
                  {isImage(item.file) ? (
                    <img
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "contain", // Ensure the image is contained without distortion
                      }}
                      src={`https://13.53.129.50:443/${item.file}`}
                      alt="Item"
                    />
                  ) : (
                    <video
                    autoPlay
        muted
        loop
        playsInline
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "contain", // Ensure the video is contained without distortion
                      }}
                     
                    >
                      <source src={`https://13.53.129.50:443/${item.file}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </Card.Body>
                <Card.Footer>
                <img onClick={()=> handleDelete(item._id)} style={{width:"25px",margin:"10px"}} src="./Images/del.svg"></img>

                </Card.Footer>
              </Card>
            </center>
          </div>
        ))
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h5>No items match your search.</h5>
        </div>
      )}
    </Modal.Body>
      </Modal>

    </div>
  )
}

export default Dict
