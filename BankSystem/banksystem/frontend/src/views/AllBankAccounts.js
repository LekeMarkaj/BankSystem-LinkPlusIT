import React,{useState} from 'react';
import {connect} from 'react-redux';
import {fetchAllBankAccounts, fetchAllTransactionsById, fetchUserData} from '../api/authService';
import {useNavigate} from 'react-router-dom';
import {authenticate, authFailure, authSuccess} from "../redux/authActions";

function AllBankAccounts({loading,error,...props}){

    const history = useNavigate ();
    const [allBankAccounts, setAllBankAccounts] = useState([]);

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_ADMIN'){
                fetchAllBankAccounts().then((response)=>{
                    setAllBankAccounts(response.data);
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


    return (
        <main>
            <h2>All bank accounts:</h2>

            {allBankAccounts.map((bankAccount, index) => (
                <div key={index} className="card">
                    <div className="card-body">
                        <br/>
                        <p className="card-text">Bank name: {bankAccount.bankName}</p>
                        <p className="card-text">Total Transaction Fee Amount: {bankAccount.totalTransactionFeeAmount} $</p>
                        <p className="card-text">Total Transfer Amount: {bankAccount.totalTransferAmount} $</p>
                        {bankAccount.accountList.map((point, i) => (
                            <li key={i}>
                                Name: {point.name}, Balance: {point.balance} $
                            </li>
                        ))}

                    </div>
                </div>
            ))}

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
export default connect(mapStateToProps, mapDispatchToProps)(AllBankAccounts);