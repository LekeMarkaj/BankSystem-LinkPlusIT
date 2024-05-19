import React from 'react';
import {Link} from "react-router-dom";

export default function Home(){
    return (
            <main>
                <Link to={"/login"}>Login</Link>
                <br/>
                <Link to={"/register"}>Register</Link>
            </main>
    );
}