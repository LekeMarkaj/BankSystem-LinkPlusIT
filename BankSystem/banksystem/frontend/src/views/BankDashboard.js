import React from 'react';
import {connect} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {authenticate, authFailure, authSuccess} from "../redux/authActions";
import {fetchBank, fetchUserData} from "../api/authService";

function BankDashboard({loading,error,...props}){

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


    const handleTransactions = (id) => {
        history(`/userDashboard/bank/transactions/${id}`);
    };

    const handleWithdraw = (id) => {
        history(`/userDashboard/bank/withdraw/${id}`);
    };

    const handleDeposit = (id) => {
        history(`/userDashboard/bank/depositDashboard/${id}`);
    };

    return (
        <main>
            <label>
                Account Balance: {data.balance} Euro
            </label>
            <br/>
            <br/>
            <button className="btn btn-info btn-sm"
                    onClick={() => handleTransactions(bankId)}>
                Transactions
            </button>
            <br/>
            {data.balance >= 10 && <div><br/>
                <button className="btn btn-info btn-sm"
                        onClick={() => handleWithdraw(bankId)}>
                    Withdraw Money
                </button>
            </div>}
            <br/>
            <button className="btn btn-info btn-sm"
                    onClick={() => handleDeposit(bankId)}>
                Deposit Money
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
export default connect(mapStateToProps, mapDispatchToProps)(BankDashboard);