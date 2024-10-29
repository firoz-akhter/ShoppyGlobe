import React from "react"
import "../css/CartItem.css"
import { incrementQuantity, decrementQuantity, removeItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";


function CartItem({ item, updateTotalPrice }) {

    let dispatch = useDispatch();

    console.log(item.quantity);

    let quantity = item.quantity;
    if(item.stock < quantity) quantity = item.stock;

    let price = item.price;
    let discount = item.discountPercentage;
    let priceAfterDiscount = price - price*(discount/100);
    // console.log(priceAfterDiscount);

    function handleIncrement() {
        if(item.stock > item.quantity) {
            dispatch(incrementQuantity(item.id));
            console.log("Incrementing quantity");
            console.log(item.quantity)
            updateTotalPrice();
        }
        else {
            console.log("No item left to add in stock")
        }
        
    }

    function handleDecrement() {
        if(item.quantity > 1) {
            // this has been handled in cartSlice as well.
            dispatch(decrementQuantity(item.id));
            console.log("Decrement quantity");
            console.log(item.quantity);
            updateTotalPrice();
        }
        else {
            
            console.log("Only one item of this type in cart");
        }
    }

    function handleDelete() {
        console.log("removing item")
        dispatch(removeItem(item.id))

    }

    

    return (
        <div className="item-container">
            <div className="item-info">
                <p className="item-title">{item.title.slice(0, 10)}</p>
                <p className="item-description">{item.description.slice(0, 40)}</p>
                <p className="item-category">Category: {item.category}</p>
                <p className="item-brand">Brand: {item.brand}</p>
                <img className="item-thumbnail" src={item.thumbnail} />
            </div>

            <div className="item-pricing">
                <p currency="USD">Price: {item.price}</p>
                <p>Discount {item.discountPercentage}%</p>
                {/* this is the price after discount */}
                <p currency="USD">Final Price: {priceAfterDiscount.toFixed(2)}</p> 
                <p>Stock: {item.stock}</p>
            </div>

            <div className="item-details">
                <p>Weight: {item.weight}lbs</p>
                
                <p className="item-warranty">Warranty: {item.warrantyInformation}</p>
                <p className="item-shipping">Shipping: {item.shippingInformation}</p>
                <p className="item-policy">Return: {item.returnPolicy}</p>
            </div>

            <div className="item-meta">
                <p className="item-barcode">Barcode: {item.meta.barcode}</p>
                <img className="item-qrcode" src={item.meta.qrCode} />
            </div>
            <div className="item-order">
                <button onClick={handleIncrement}>+</button>
                {/* <p>{quantity}</p> */}
                <button onClick={handleDecrement}>-</button>
                <button onClick={handleDelete}>Remove Item</button>

                <p>Quantity: {quantity}</p>
                <p className="total-price">Total Price: {(priceAfterDiscount*quantity).toFixed(2)}</p>
            </div>
        </div>
    )
}

export default CartItem