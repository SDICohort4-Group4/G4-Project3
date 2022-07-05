import axios from 'axios';

const API = axios.create({
    baseURL:"https://sdic4-g4-project2.herokuapp.com/",
});

export async function getData(props){
    
    const response = await API.get(props.dataType);

    if (response.status === 200){
        const result = response.data.data
        props.getItemData(result);
        // console.log("GetData function:\n",result);
    }
    
   
}

export async function getCart(props){
    // const response = await API.get(props.dataType);
    
    try {
        const response = await API.get(props.dataType);
        if(response.status === 200){
            const result = response;
            props.getCartData(result.data.data)
        }
    } catch (error) {
        if(error.response.status == 404){
            console.log("getData.js function getCart: Cart is empty")
        }
        if(error.response.status != 404){
            console.log("getData.js function getCart: ",error)
        }
    }
}
