import axios from 'axios';

// create functions to retreive tokens

async function getLocalAccessToken() {
    const accessToken = await SecureStore.getItemAsync('access');
    return accessToken;
}

async function getLocalRefreshToken() {
    const refreshToken = await SecureStore.getItemAsync('refresh');
    return refreshToken;
} 

const API=axios.create({
    baseURL:"https://sdic4-g4-project2.herokuapp.com",
    headers: {
        "Content-Type": "application/json",
    },
});

const APIAuth=axios.create({
    baseURL:"https://sdic4-g4-project2.herokuapp.com",
    headers: {
        "Content-Type": "application/json",
    },
});

APIAuth.interceptors.request.use(
    async (config) => {
        const accessToken = await getLocalAccessToken();
        if (accessToken) {
            config.headers["x-access-token"] = accessToken;
        }

        return config;
    },
    error=>{
        return Promise.reject(error)
    });

APIAuth.interceptors.response.use(
    res => {
        return res;
    },

    async (err) => {
        const originalConfig = err.config;

        if(err.response) {
            //When the Access Token has expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    // call refresh token api and get new access token
                    const refreshToken = await getLocalRefreshToken();
                    API.defaults.headers.common["x-refresh-token"] = refreshToken;
                    let response = API.post("/auth/refreshToken");
                    console.log(response)
                } catch {

                }
            }
        }
    }
)

export async function getAuth(user, pass){
    
    let loginData = {"email": user,
                    "pwd": pass}
    try {
        const response = await API.post('/user/login', loginData);
        return {
            status: response.status,
            accessToken: response.headers["x-access-token"],
            refreshToken: response.headers["x-refresh-token"]
        };

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