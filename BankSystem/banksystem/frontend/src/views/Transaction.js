import React,{useState} from 'react';
import {connect} from 'react-redux';
import {createBank, fetchAllTransactionsById, fetchUserData} from '../api/authService';
import {useNavigate, useParams} from 'react-router-dom';
import {Alert} from "reactstrap";
import {authenticate, authFailure, authSuccess} from "../redux/authActions";

function Transaction({loading,error,...props}){

    const history = useNavigate ();
    const [registerFailure, setRegisterFailure] = useState('');
    const [allTransactions, setAllTransactions] = useState([]);
    const { id } = useParams();
    const bankId = Number(id);

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_USER'){
                fetchAllTransactionsById({accountId:response.data.id,bankId:bankId}).then((response)=>{
                    setAllTransactions(response.data);
                }).catch((e)=>{
                    console.log("LEKAAAAAAAAAAAAA")
                    localStorage.clear();
                    history('/login');
                })
            }
            else{
                console.log("JJJJJJJJJJJJJJJJJJJJ")
                history('/login');
            }
        }).catch((e)=>{
            console.log("BBBBBBBBBBBBBBBBBBBBBB ")
            localStorage.clear();
            history('/login');
        })
    },[])

    const handleClick = (id) => {
        history(`/userDashboard/bank/${id}`);
    };

    return (
        <main>
            <h2>All my transactions:</h2>

            {allTransactions.map((trans, index) => (
                <div key={index} className="card">
                    <div className="card-body">
                        <br/>
                        <p className="card-text">Transaction reason: {trans.transactionReason}</p>
                        <p className="card-text">Transaction amount: {trans.amount} $</p>
                    </div>
                </div>
            ))}
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
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);