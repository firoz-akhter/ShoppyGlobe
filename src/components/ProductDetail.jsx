import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import "../css/ProductDetail.css"


function ProductDetail() {
    const [product, setProduct] = useState({});

    const navigate = useNavigate();

    const { id } = useParams();

    async function getProduct() {
        try {
            let prod = await fetch(`https://dummyjson.com/products/${id}`)
            prod = await prod.json();
            setProduct(prod);
            console.log(prod)
        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getProduct();
    }, [])




    return (
        <div className="productDetails-container">
            <button onClick={() => navigate(-1)}>Back to Products</button>
            <div className="productDetails">
                <p>{product.title}</p>
                <img height="400" src={product.images} />
                <div>
                    <p>Price: {`₹${product.price}`}</p>
                    <p>Rating: {product.rating}</p>
                    <p>Discount: {`${product.discountPercentage}%`}</p>
                    <p>In Stock: {product.stock}</p>
                </div>
                <p>Description: {product.description}</p>

            </div>
        </div>

        // does not need navibation bar in it
    )
}


export default ProductDetail