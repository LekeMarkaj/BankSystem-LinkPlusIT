import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {authenticate, authFailure, authSuccess} from "../redux/authActions";

function AdminDashboard({loading,error,...props}){

    return (
        <main>
                <Link to="/admindashboard/createBank">Create A New Bank</Link>
            <br/>
            <br/>
                <Link to="/admindashboard/allBankAccounts">Show all bank accounts</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);