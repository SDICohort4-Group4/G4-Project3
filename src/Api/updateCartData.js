import axios from "axios";

const API = axios.create({
    baseURL:"https://sdic4-g4-project2.herokuapp.com/",
});

export async function updateCartData(props){
    
    const response = await API.post(props.dataType, props.payload);

    const result = response.data.data
    props.updateCartData(result);
    // console.log("GetData function:\n",result);

}
