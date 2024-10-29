import React, { useEffect, useInsertionEffect } from "react"
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import "../css/Cart.css"
import { calculateTotalPrice } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
    let navigate = useNavigate();

    const cartList = useSelector((store) => store.cart.items)
    // console.log(cartList);

    let totalPrice = 0;

    // useEffect(() => {
    let dispatch = useDispatch();
    dispatch(calculateTotalPrice());
    totalPrice = useSelector((store) => store.cart.totalPrice);
    console.log(totalPrice);
    // }, [])

    function gotoCheckout() {
        navigate("/checkout")
    }







    return (

        <div className="cart-container">
            <Header />
            {
                cartList.length === 0 ? (<div className="empty-cart">Nothing in the cart. Go to home and add some items to buy</div>) : 
            (<>
                <div className="cart-item-container">
                    {
                        cartList.map((item) => {
                            return <div key={item.id}><CartItem item={item} /></div>
                        })
                    }
                </div>

                {
                    totalPrice !== 0 &&
                    <div className="total-price-container">
                        <div>
                            <p className="total-price">Total Price: {totalPrice.toFixed(2)}</p>
                            <button onClick={gotoCheckout} className="">Place Order</button>
                        </div>

                    </div>
                }
            </>)
            }


        </div>
    )
}


export default Cart;