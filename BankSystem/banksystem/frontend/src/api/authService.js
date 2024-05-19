import axios from 'axios';

const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}

export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/api/auth/login`,
        'data':authRequest
    })
}

export const userRegister=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/api/auth/register`,
        'data':authRequest
    })
}

export const userUpdate=(authRequest)=>{
    return axios({
         method:'PUT',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/update`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchUserData=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/userinfo`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchAllUserData=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/allUserinfo`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchUserDataId=(authRequest)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/userinfoId/${authRequest}`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const userDelete = (authRequest) => {
    return axios({
        method: 'DELETE',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/deleteUser/${authRequest}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const createBank=(authRequest)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/createBank`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const withdraw=(authRequest)=>{
    console.log("ADADADADAD",authRequest)
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/withdraw`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const deposit=(authRequest)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/deposit`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchAllBanks=(authRequest)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/fetchAllBanks`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const chooseBank=(authRequest)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/chooseBank`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchMyBanks=(authRequest)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/fetchMyBanks`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchBank=(authRequest)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/fetchBank`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const depositToSomeone=(authRequest)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/depositToSomeone`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchAllTransactionsById=(authRequest)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/fetchAllTransactionsById`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchAllBankAccounts=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/fetchAllBankAccounts`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}
