import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import GoogleSignIn from "./GoogleSignIn";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { AuthContext } from "./context/auth";

const Register = () => {
  const { theme } = useContext(AuthContext);
  // Some styling for the Form container because is convering the entire width of the body
  const StyledContainer = {
    maxWidth: "400px",
  };
  //-----------------------------------------------------------------------------------------------------
  // Here we are defining the state object with the variables we are going to use in this component
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const navigate = useNavigate();
  //-----------------------------------------------------------------------------------------------------
  // This is a destructuring of the data object for shortes code inside the value propertie of the inputs
  const { name, email, password, error, loading } = data;
  //-----------------------------------------------------------------------------------------------------
  // When theres a change inside an input this function targets the corresponding propertie of the state object to make it equal as the value propertie of the input.
  // Im doing this by making the name propertie of the input element the same as the propertie I want to change inside of the data object.
  const inputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  //-----------------------------------------------------------------------------------------------------
  const handleSubmit = async (e) => {
    // e.preventDefault(); is a function that prevents the default behavior of pressing Submit on the Form
    e.preventDefault();
    //-----------------------------------------------------------------------------------------------------
    // the if statement throws and error if any of the variables on the fields is empty
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
      console.log(error);
      return;
    }
    //-----------------------------------------------------------------------------------------------------
    else if (name.length > 12){
      setData({...data, error: "name must have less than 12 characters" });
      console.log(error);
      return;
    }
    //-----------------------------------------------------------------------------------------------------
    else if(error === null){
      setData({ ...data, error: null, loading: true });
    }
    try {
      // For "createUserWithEmailAndPassword" besides de email and password also needs the "auth" argument which is imported from firebase/auth inside firebase.js
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //-----------------------------------------------------------------------------------------------------
      // setDoc is a firebase method that allows me to store the users data inside firestore with a collection name "users" in the web app
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      //-----------------------------------------------------------------------------------------------------
      // after getting the user's data we set the properties back to its default value
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      //-----------------------------------------------------------------------------------------------------
      //
      navigate("/");
      // this method will throw an error if the user enters an already existing account or an invalid password
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  return (
    <Container style={StyledContainer}>
      <Form style={{color:`${theme.text}`}} className="my-5" onSubmit={handleSubmit}>
        <Container className="text-center mb-4">
          <h4>Enter your account details</h4>
        </Container>

        <Form.Group className="mb-3" controlId="formBasicName1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={inputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={inputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={inputChange}
          />
        </Form.Group>
        <div className="error">{error}</div>
        <Container className="text-center">
          <Button style={{backgroundColor:`${theme.background}`, borderColor:`${theme.border}`}} disabled={loading} variant="success" type="submit">
            {loading ? "Creating..." : "Submit"}
          </Button>
        </Container>
        <Container className="text-center my-3">
          <GoogleSignIn />
        </Container>
      </Form>
    </Container>
  );
};
export default Register;
