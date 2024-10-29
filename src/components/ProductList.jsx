import React, { useEffect, useState } from "react"
import Header from "./Header"
import { useSearchParams } from "react-router-dom"
import ProductItem from "./ProductItem"
import "../css/ProductList.css"


function ProductList() {
    const [productList, setProductList] = useState([])

    async function getProducts() {
        try {
            let data = await fetch("https://dummyjson.com/products")
            data = await data.json()
            setProductList(data.products);
            // console.log(data.products);
            // console.log(productList);
        }
        catch (err) {
            console.log(err);
        }

    }


    useEffect(() => {
        getProducts();
    }, [])

    async function filterProduct(type) {

        try {
            let data = await fetch("https://dummyjson.com/products")
            data = await data.json()
            data = data.products;

            let filteredProd = data.filter((item) => item.category === type);

            // console.log(filteredProd);
            setProductList(filteredProd);
        }
        catch (err) {
            console.log(err);
        }


    }

    function handleChange(e) {
        let query = e.target.value;
        if (query === "") {
            getProducts();
            return ;
        }

        const lowerCaseQuery = query.toLowerCase();

        let newList = productList.filter(
            (product) =>
                product.title.toLowerCase().includes(lowerCaseQuery)
        );

        setProductList(newList);
    }


    return (
        <div>
            <Header />
            <div className="buttons">
                <input onChange={handleChange} type="text" className="search-input" placeholder="Search for product" />
                <button onClick={getProducts}>All</button>
                <button onClick={() => filterProduct("fragrances")}>Fragrances</button>
                <button onClick={() => filterProduct("beauty")}>Beauty</button>
                <button onClick={() => filterProduct("furniture")}>Furniture</button>
                <button onClick={() => filterProduct("groceries")}>Groceries</button>
            </div>
            <div className="products-container">
                {
                    productList.map((product) => {
                        return <div key={product.id}><ProductItem product={product} />
                        </div>
                    })
                }
            </div>


        </div>
    )
}

export default ProductList