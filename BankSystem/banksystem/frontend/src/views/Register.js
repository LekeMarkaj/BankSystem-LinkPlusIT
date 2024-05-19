import React,{useState} from 'react';
import {connect} from 'react-redux';
import {userRegister} from '../api/authService';
import {useNavigate} from 'react-router-dom';
import {Alert} from "reactstrap";
import {authenticate, authFailure, authSuccess} from "../redux/authActions";

function Register({loading,error,...props}){

    const history = useNavigate ();
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registerFailure, setRegisterFailure] = useState('');
    const [values, setValues] = useState({
        email: '',
        name:'',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        if (values.password === confirmPassword) {
            userRegister(values).then((response) => {
                if (response.status === 200) {
                    props.setUser(response.data);
                    history('/login');
                } else {
                    setRegisterFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            setRegisterFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            setRegisterFailure('Something BABAAAAAA!Please Try Again');

                    }

                } else {
                    console.log("ERROR: ", err)
                    setRegisterFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        } else {
            setRegisterFailure('Passwords do not match!!!');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(`${name} changed:`, value);

        if (name === 'password') {
            setValues(values => ({
                ...values,
                [name]: value
            }));
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else {
            setValues(values => ({
                ...values,
                [name]: value
            }));
        }
    };

    return (
        <main>
            { registerFailure &&
                <Alert style={{marginTop:'20px'}} variant="danger">
                    {registerFailure}
                </Alert>
            }
            <form onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input type="text" name="name" value={values.name}
                           onChange={handleChange}
                           placeholder="Full Name..." required/>
                </label>
                <br/>
                <label>
                    Email:
                    <input type="email" name="email" value={values.email}
                           onChange={handleChange}
                           placeholder="Email Address..." required/>
                </label>
                <br/>
                <br/>
                <label>
                    Password:
                    <input type="password" name="password" placeholder="Password..."
                           value={values.password}
                           onChange={handleChange} required/>
                </label>
                <br/>
                <label>
                    Confirm Password:
                    <input type="password" name="confirmPassword" placeholder="Repeat Password..."
                           value={confirmPassword}
                           onChange={handleChange} required/>
                </label>
                <br/>
                <button type="submit" className="btn btn-primary btn-user btn-block">
                    Register
                </button>
            </form>
        </main>
    )
}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);