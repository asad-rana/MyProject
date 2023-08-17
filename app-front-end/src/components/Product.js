import React from "react";

const Product=()=>{
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const [error,setError]=React.useState(false);
    const addproduct=async()=>{

        if(!name || !price || !category || !company){
            setError(true);
      return false;
        }
        console.warn(name,price,category,company)
        const userId =JSON.parse(localStorage.getItem('user'))._id;
    let result=fetch("http://localhost:5000/add-product",{
    method:"post",
    body:JSON.stringify({name,price,company,category,userId}),
    headers:{
        "Content-Type":"application/json"
    }
    });
     result= await (await result).json();
    console.warn(result);
    }


return(
<div className="product">
<h1>Hello add product page</h1>
<input type="text" className="inputBox" placeholder="Enter Product Name"
onChange={(e)=>{setName(e.target.value)}} value={name}></input>
{error && !name && <span className="invalid-input">Please Enter Valid Name</span>}
<input type="text" className="inputBox" placeholder="Enter Product Price"
onChange={(e)=>{setPrice(e.target.value)}} value={price}></input>
{error && !price && <span className="invalid-input">Please Enter Valid Price</span>}

<input type="text" className="inputBox" placeholder="Enter Product Category"
onChange={(e)=>{setCategory(e.target.value)}} value={category}></input>
{error && !category && <span className="invalid-input">Please Enter Valid Category</span>}

<input type="text" className="inputBox" placeholder="Enter Product Company"
onChange={(e)=>{setCompany(e.target.value)}} value={company}></input>
{error && !company && <span className="invalid-input">Please Enter Valid Company Name</span>}

<button className="appButton" type="button" onClick={addproduct}>Add Product</button>



</div>
)
}
export default Product;