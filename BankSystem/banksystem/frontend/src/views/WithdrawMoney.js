import React,{useState} from 'react';
import {connect} from 'react-redux';
import {fetchUserData, withdraw} from '../api/authService';
import {useNavigate, useParams} from 'react-router-dom';
import {Alert} from "reactstrap";
import {authenticate, authFailure, authSuccess} from "../redux/authActions";

function WithdrawMoney({loading,error,...props}){

    const history = useNavigate ();
    const { id } = useParams();
    const bankId = Number(id);
    const [registerFailure, setRegisterFailure] = useState('');
    const [withdrawSuccess, setWithdrawSuccess] = useState(false);
    const [data,setData]=React.useState({});
    const [values, setValues] = useState({
        withdrawalAmount:0,
        accountId:0,
        bankId:0
    });

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_USER'){
                setValues({
                    accountId:response.data.id,
                    bankId: bankId
                });
            }
            else{
                history('/loginBoot');
            }
        }).catch((e)=>{
            localStorage.clear();
            history('/loginBoot');
        })
    },[])

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        withdraw(values).then((response) => {
            if (response.status === 200) {
                setWithdrawSuccess(true)
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

    const handleClick = (id) => {
        history(`/userDashboard/bank/${id}`);
    };

    return (
        <main>
            {registerFailure &&
                <Alert style={{marginTop: '20px'}} variant="danger">
                    {registerFailure}
                </Alert>
            }
            {!withdrawSuccess ? <form onSubmit={handleSubmit}>
                <label>
                    How much money do u want to withdraw:
                    <input type="number" name="withdrawalAmount" defaultValue={values.withdrawalAmount}
                           onChange={handleChange} min={10} max={500}
                           required/>
                </label>
                <br/><br/>
                <i>Info: Min amount is 10 $, Max amount is 500 $.</i>
                <br/><br/>
                <button type="submit" className="btn btn-primary btn-user btn-block">
                    Withdraw money
                </button>
            </form> : <i>Withdrawal was successful :), you withdrew {values.withdrawalAmount} $.</i>
            }
            <br/>
            <button className="btn btn-info btn-sm"
                    onClick={() => handleClick(bankId)} style={{height: "25px"}}>
                Go back to Bank
            </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(WithdrawMoney);