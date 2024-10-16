import database from "@/db/products.json";
import { ProductInterface } from "@/lib/types";
import { useEffect, useState } from "react";

export default function useProduct(){
	const [products] = useState(() => {
		const { data } = database;
		return data;
	})
	const getProduct = (id : number) => {
		const get = products.find((product: ProductInterface) => product.id === id);
		return get;
	}

	useEffect(() =>{
		if (products && products.length > 0) {
            localStorage.setItem('products', JSON.stringify(products));
        }else{
            localStorage.removeItem('products');
        }
	}, [products]);

	return {
		products,
		getProduct
	};
}