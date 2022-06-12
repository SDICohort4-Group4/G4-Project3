import axios from 'axios';
import {useEffect, useState} from "react";

const API=axios.create({
    baseURL:"https://sdic4-g4-project2.herokuapp.com/",
});

export default async function getData(props){
    
    const response = await API.get(props.dataType);

    if (response.status===200){
        // const result=JSON.stringify(response.data.data);
        const result=response.data.data
        props.getItemData(result);
        // console.log("GetData function:\n",result);
    }
    
   
}