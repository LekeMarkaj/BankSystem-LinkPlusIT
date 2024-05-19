import React,{useState} from 'react';
import {connect} from 'react-redux';
import {userLogin} from '../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {
    authenticate,
    authFailure,
    authSuccess,
    setAdminAuthenticationState,
    setTherapistAuthenticationState, setUserAuthenticationState
} from "../redux/authActions";
import {Alert} from "reactstrap";
import {saveState} from "../helper/sessionStorage";

function Login({loading,error,...props}){
    const history = useNavigate ();

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    React.useEffect(()=>{
        saveState("loggedInState", false)
        saveState("role",'')
    },[])

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        userLogin(values).then((response)=>{
            if(response.status===200){
                props.setUser(response.data);
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        saveState("role",'ROLE_ADMIN')
                        props.setAdminAuthenticationState(true)
                        history('/adminDashboard');
                    }else if (response.data.roles.at(0).role === 'ROLE_USER') {
                        saveState("role",'ROLE_USER')
                        props.setUserAuthenticationState(true)
                        history('/userDashboard');
                    }
                }
                else{
                    history('/loginBoot');
                }
            }
            else{
                props.loginFailure('Something LEKAAAAAAAA!Please Try Again');
            }
        }).catch((err)=>{

            if(err && err.response){

                switch(err.response.status) {
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something BABAAAAAA!Please Try Again');
                }
            }
            else{
                console.log("ERROR: ",err)
                props.loginFailure('Something NaNAAAAA!Please Try Again');
            }
        });
    }

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <main>
            { error &&
                <Alert style={{marginTop:'20px'}} variant="danger">
                    {error}
                </Alert>
            }
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" placeholder="Enter Email Address..." value={values.email} onChange={handleChange} required/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" placeholder="Password" value={values.password} onChange={handleChange} name="password"
                           autoComplete="new-password" required/>
                </label>
                <br/>
                <button type="submit" className="btn btn-primary btn-user btn-block">
                    Login
                </button>
            </form>
            <br/>
            <Link to={"/register"}>Register</Link>
        </main>
    )

}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        isAdminAuthenticated: auth.isAdminAuthenticated,
        isTherapistAuthenticated: auth.isTherapistAuthenticated,
        isUserAuthenticated: auth.isUserAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setAdminAuthenticationState: (boolean) => dispatch(setAdminAuthenticationState(boolean)),
        setTherapistAuthenticationState: (boolean) => dispatch(setTherapistAuthenticationState(boolean)),
        setUserAuthenticationState: (boolean) => dispatch(setUserAuthenticationState(boolean))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);