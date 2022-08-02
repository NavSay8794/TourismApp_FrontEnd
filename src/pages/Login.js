import React, { useEffect, useState } from "react";

import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";

import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { login } from "../redux/features/authSlice";

const initialState = {
    email:'',
    password: ''
}

const Login = () => {

    const [formValue,setFormValue] = useState(initialState)
    const {email , password} = formValue

    const {loading, error} = useSelector((state)=>({...state.auth}))
    
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(()=>{
        error && toast.error((error))
    },[error])


    const handleSubmit = (e)=>{
        e.preventDefault()
        if(email && password){
            dispatch(login({formValue, navigate, toast}))
        }
    }
    
    const onInputChange = (e)=>{
        let {name , value} = e.target
        setFormValue((prevState) =>{
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    return (
        <div style={{margin: "auto", padding:"15px", maxWidth:"450px", alignContent:"center", marginTop: "120px"}}>
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle"  className="fa-2x"/>
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <MDBValidationItem feedback="Please Enter The Email" invalid className="col-md-12">
                            <MDBInput 
                                label="Email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={onInputChange}
                                id="email"
                                required
                            />
                        </MDBValidationItem>
                        <MDBValidationItem feedback="Please Enter The Password" invalid className="col-md-12">
                            <MDBInput 
                                label="Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onInputChange}
                                id="password"
                                required
                            />
                        </MDBValidationItem>
                        <div className="col-12">
                            <MDBBtn style={{width: '100%'}} className="mt-2">
                                {loading && 
                                <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                                }
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                        <p>Don't Have An Account?... Create One</p>
                    </Link> 
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
};

export default Login;
