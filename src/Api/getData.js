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

