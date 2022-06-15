import axios from 'axios';

const API=axios.create({
    baseURL:"https://sdic4-g4-project2.herokuapp.com",
});

export async function getAuth(user, pass){
    
    let loginData = {"email": user,
                    "pwd": pass}
    try {
        const response = await API.post('/user/login', loginData);
        return {status: response.status, data: response.data};
    } catch(err) {
        return {status: err.response.status};
    }
}

export async function getUser(){
    try {
        const response = await API.get('/user');
        return {status: response.status, data: response.data};
    } catch(err) {
        return {status: err.response.status};
    }
}

export async function registerUser(user, pass){
    let RegisterData = {"email": user,
                        "pwd": pass}
    try {
        const response = await API.post('/user/register', RegisterData);
        return {status: response.status, data: response.data};
    } catch(err) {
        return {status: err.response.status};
    }
}