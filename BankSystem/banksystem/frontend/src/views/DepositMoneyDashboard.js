import React from 'react';
import {connect} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {authenticate, authFailure, authSuccess} from "../redux/authActions";
import {fetchBank, fetchUserData} from "../api/authService";

function DepositMoneyDashboard({loading,error,...props}){

    const history = useNavigate ();
    const [data,setData]=React.useState({});
    const { id } = useParams();
    const bankId = Number(id);

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_USER'){
                fetchBank({bankId:bankId,accountId:response.data.id}).then((response)=>{
                    setData(response.data);
                }).catch((e)=>{
                    console.log("ERROREEEEEEEEEEEEEEE");
                    localStorage.clear();
                    history('/login');
                })
            }
            else{
                console.log("VVVVVVVVVVVVVVVVVVV");
                history('/login');
            }
        }).catch((e)=>{
            console.log("WWWWWWWWWWWWWWW");
            localStorage.clear();
            history('/login');
        })
    },[])


    const handleDepositToSomeone = (id) => {
        history(`/userDashboard/bank/depositToSomeone/${id}`);
    };

    const handleDeposit = (id) => {
        history(`/userDashboard/bank/deposit/${id}`);
    };

    return (
        <main>
            <button className="btn btn-info btn-sm"
                    onClick={() => handleDeposit(bankId)}>
                Deposit Money To Myself
            </button>
            <br/>
            <br/>
            <button className="btn btn-info btn-sm"
                    onClick={() => handleDepositToSomeone(bankId)}>
                Deposit Money To Someone
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
export default connect(mapStateToProps, mapDispatchToProps)(DepositMoneyDashboard);