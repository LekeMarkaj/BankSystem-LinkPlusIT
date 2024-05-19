import React from 'react';
import {connect} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {authenticate, authFailure, authSuccess} from "../redux/authActions";
import {chooseBank, fetchAllBanks, fetchUserData} from "../api/authService";

function UserDashboard({loading,error,...props}){

    const history = useNavigate ();
    const [data,setData]=React.useState({});
    const [allBanks,setAllBanks]=React.useState([]);

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            if (response.data.roles.at(0).role === 'ROLE_USER'){
                setData(response.data);
                fetchAllBanks({id:response.data.id}).then((response)=>{
                    setAllBanks(response.data);
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

    const handleClick=(id)=>{
        chooseBank({bankId:id,accountId:data.id}).then((response)=>{
            if(response.status===200){
                history("/userDashboard/myBanks");
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

    return (
        <main>
            <Link to={"/userDashboard/myBanks"}>Go to my banks</Link>
            <br/>

            Add another bank:

            {allBanks.map((bank, index) => (
                <div key={index} className="card">
                    <div className="card-body" style={{display:"flex",alignItems:"center"}}>
                        <p className="card-text">Bank Name: {bank.bankName}</p>
                        <button onClick={() => handleClick(bank.id)} style={{marginLeft:"10px", height:"25px"}}>Choose Bank</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);