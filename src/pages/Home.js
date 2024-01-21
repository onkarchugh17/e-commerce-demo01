import React from "react";
import Navbar from "../features/navbar/Navbar.js";
import ProductList from "../features/product-list/components/ProductList.js";


function Home() {
    return (
        <div>
            <Navbar>
             <ProductList></ProductList>
            </Navbar>
        </div>

    );
}

export default Home;