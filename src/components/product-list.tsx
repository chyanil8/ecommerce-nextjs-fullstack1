"use client";

import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props {
   products:Stripe.Product[] ;
}


export const ProductList = ({products}:Props) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const filteredProduct = products.filter((product) => {
        const term = searchTerm.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(term);
        const descriptionMatch = product.description ?
         product.description.toLowerCase().includes(term):false;

         return nameMatch || descriptionMatch;
    })
return(
    <div>
        <div>
            <input 
            value={searchTerm}
            onChange={(e) =>setSearchTerm(e.target.value)}
            type="text"
             placeholder="Search products..." />
        </div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
           {filteredProduct.map((product, key) => {
            return <li key={key}>
                <ProductCard product ={product} />
            </li>
           })}
        </ul>
    </div>
)
}