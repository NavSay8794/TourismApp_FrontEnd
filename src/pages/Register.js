import React, { useEffect, useState } from "react";

import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBIcon,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link , useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { signup } from "../redux/features/authSlice";
import {toast} from 'react-toastify'

// const initialState = {
//     firstName: '',
//     lastName: '',
//     email:'',
//     password:''
// }

const Register = () => {
  // const [formValue, setFormValue] = useState(initialState)

  // const {firstName, lastName, email, password} = formValue

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {loading, error} = useSelector((state)=>({...state.auth}))

  const dispatch= useDispatch()
  const navigate = useNavigate()


  useEffect(()=>{
    error && toast.error(error)
  },[error])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(firstName && lastName && email && password && confirmPassword){
        const formValue = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        dispatch(signup({formValue , navigate , toast}))
    }
  };

  const onFirstNameChange = (e) => {
    let fname = e.target.value;
    setFirstName(fname);
  };

  const onLastNameChange = (e) => {
    let lname = e.target.value;
    setLastName(lname);
  };

  const onEmailChange = (e) => {
    let email = e.target.value
    setEmail(email)
  };

  const onPasswordChange = (e) => {
    let passWord = e.target.value
    setPassword(passWord)
  };

  const onConfirmPasswordChange = (e) => {
    let confirmPassword = e.target.value
    setConfirmPassword(confirmPassword)
  };


  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem
              feedback="Please Enter First Name"
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="First Name"
                type="text"
                name="firstName"
                value={firstName}
                onChange={onFirstNameChange}
                id="firstName"
                required
              />
            </MDBValidationItem>

            <MDBValidationItem
              feedback="Please Enter Last Name"
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Last Name"
                type="text"
                name="lastName"
                value={lastName}
                onChange={onLastNameChange}
                id="lastName"
                required
              />
            </MDBValidationItem>

            <MDBValidationItem
              feedback="Please Enter Email"
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={onEmailChange}
                id="email"
                required
              />
            </MDBValidationItem>

            <MDBValidationItem
              feedback="Please Enter Email"
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={onPasswordChange}
                id="password"
                required
              />
            </MDBValidationItem>

            <MDBValidationItem
              feedback="Please Enter Email"
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                id="confirmPassword"
                required
              />
            </MDBValidationItem>

            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && 
                    <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                }
                Sign Up
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already Have An Account... Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
