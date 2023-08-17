import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList=()=>{
 const[products,setProducts]=useState([]);
 useEffect(()=>{
    getProducts();
 }, []);

 const deleteproduct=async(id)=>{
let result=await fetch(`http://localhost:5000/product/${id}`,{
method:'Delete',
headers: {
    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
}
})
result= await result.json();
if(result){
    getProducts();

}

}

 const getProducts=async()=>{
    let result=await fetch('http://localhost:5000/products',{
        headers: {
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    })
    result= await result.json();
    setProducts(result);
 }
 const searchHandle=async(event)=>{
let key= event.target.value;
if(key){
let result=await fetch(`http://localhost:5000/search/${key}`,
{
    headers: {
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
}
}
);
result= await result.json();
setProducts(result);
}else{
    getProducts();
}


 }
console.warn("products",products)
    return(
        <div className="product-list">
            <h3>My Product are here : </h3>
            <input className="" placeholder="Search" onChange={searchHandle}></input>
            <ul>
                <li>Sr. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Comapany</li>
                <li>Delete Entry</li>
            </ul>
            {
            products.length>0 ? products.map((item,index)=>
            
            <ul>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>Rs. {item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li><button type="button" onClick={()=>deleteproduct(item._id)}>Delete</button>
                <Link to={'/update/'+item._id}>Update</Link>
                </li>
            </ul>
            
            )
        : <h3>No data Found</h3>
        }
        </div>
    )
}
export default ProductList;