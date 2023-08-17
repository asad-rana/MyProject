import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate=useNavigate();

    useEffect(() => {
        getProductDetails();
    },[]);
    const getProductDetails = async () => {
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    const updateproduct = async () => {
        console.warn(name, price, category, company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });
        result = await result.json();
        console.warn(result);
        navigate('/');

    }


    return (
        <div className="product">
            <h1>Hello add product page</h1>
            <input type="text" className="inputBox" placeholder="Enter Product Name"
                onChange={(e) => { setName(e.target.value) }} value={name}></input>
            <input type="text" className="inputBox" placeholder="Enter Product Price"
                onChange={(e) => { setPrice(e.target.value) }} value={price}></input>

            <input type="text" className="inputBox" placeholder="Enter Product Category"
                onChange={(e) => { setCategory(e.target.value) }} value={category}></input>

            <input type="text" className="inputBox" placeholder="Enter Product Company"
                onChange={(e) => { setCompany(e.target.value) }} value={company}></input>

            <button className="appButton" type="button" onClick={updateproduct}>Update Product</button>



        </div>
    )
}
export default UpdateProduct;