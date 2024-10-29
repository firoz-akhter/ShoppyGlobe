import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/ProductItem.css";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";



function ProductItem({ product }) {
    // console.log(product)

    let dispatch = useDispatch();

    function handleAddItem() {
        dispatch(addItem(product))
        console.log("book added succesfully")
        // add a toaster here
    }

    return (

        <div className="product">
            <div className="product-image-wrapper">
                <img src={product.images} className="img" />
            </div>
            <div className="product-info">
                <div className="product-brand">{product.brand}</div>
                <div className="product-title">{product.title.slice(0, 25)}</div>
                <div className="product-price-section">
                    <span className="product-price">₹{product.price}</span>
                    <span className="product-original-price">{product.originalPrice}</span>
                    <span className="product-discount">{product.discountPercentage}% off</span>
                </div>
                {product.stock <= 3 && (
                    <div className="product-stock-warning">Only {product.stock} left</div>
                )}
            </div>
            <div className="link-btn-div">
                <Link className="link" to={`/productDetail/${product.id}`} >View Details</Link>
                <button onClick={handleAddItem}>Add to Cart</button>
            </div>

        </div>
    )
}

export default ProductItem;