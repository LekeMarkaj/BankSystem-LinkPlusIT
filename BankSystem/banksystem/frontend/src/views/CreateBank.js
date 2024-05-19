import React,{useState} from 'react';
import {connect} from 'react-redux';
import {createBank} from '../api/authService';
import {useNavigate} from 'react-router-dom';
import {Alert} from "reactstrap";
import {authenticate, authFailure, authSuccess} from "../redux/authActions";

function CreateBank({loading,error,...props}){

    const history = useNavigate ();
    const [registerFailure, setRegisterFailure] = useState('');
    const [values, setValues] = useState({
        bankName: '',
        transactionFlatFeeAmount:0
    });

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

            createBank(values).then((response) => {
                if (response.status === 200) {
                    history('/adminDashboard');
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
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

            setValues(values => ({
                ...values,
                [name]: value
            }));

    };

    return (
        <main>
            {registerFailure &&
                <Alert style={{marginTop: '20px'}} variant="danger">
                    {registerFailure}
                </Alert>
            }
            <form onSubmit={handleSubmit}>
                <label>
                    Bank Name:
                    <input type="text" name="bankName" value={values.bankName}
                           onChange={handleChange}
                            required/>
                </label>
                <br/>
                <label>
                    Transaction Flat Fee Amount:
                    <input type="number" name="transactionFlatFeeAmount" value={values.transactionFlatFeeAmount}
                           onChange={handleChange}
                            required/>
                </label>
                <br/>
                <button type="submit" className="btn btn-primary btn-user btn-block">
                    Create Bank
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateBank);