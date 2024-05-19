import React from 'react';
import {connect} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {authenticate, authFailure, authSuccess} from "../redux/authActions";
import {chooseBank, fetchMyBanks, fetchUserData} from "../api/authService";

function MyBanks({loading,error,...props}){

    const history = useNavigate ();
    const [data,setData]=React.useState({});
    const [myBanks,setMyBanks]=React.useState([]);

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_USER'){
                setData(response.data);
                fetchMyBanks({id:response.data.id}).then((response)=>{
                    setMyBanks(response.data)
                }).catch((e)=>{
                    localStorage.clear();
                    history('/loginBoot');
                })
            }
            else{
                history('/loginBoot');
            }
        }).catch((e)=>{
            localStorage.clear();
            history('/loginBoot');
        })
    },[])

    const handleClick = (id) => {
        history(`/userDashboard/bank/${id}`);
    };

    return (
        <main>
            My banks:
            {myBanks.map((bank, index) => (
                <div key={index} className="card">
                    <div className="card-body" style={{display:"flex",alignItems:"center"}}>
                        <p className="card-text">Bank Name: {bank.bankName}</p>
                        <button className="btn btn-info btn-sm"
                                onClick={() => handleClick(bank.id)} style={{marginLeft:"10px", height:"25px"}}>
                            Go to Bank
                        </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(MyBanks);