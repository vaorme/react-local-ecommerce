import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import ProductsList from './components/ProductsList';
import { data } from './products.json';

function App() {
	const [products, setProducts] = useState(() =>{
		const list = data;
		return list;
	})

	const [cart, setCart] = useState(() =>{
		const getData = localStorage.getItem('cart');
		return getData? JSON.parse(getData): [];
	})

	const [cartIsOpen, setCartIsOpen] = useState(false);
	const closeCart = () =>{
        setCartIsOpen(false);
    }

	const addToCartRefs = useRef([]);

	useEffect(() =>{
		if (products && products.length > 0) {
            localStorage.setItem('products', JSON.stringify(products));
        }else{
            localStorage.removeItem('products');
        }
	}, [products]);

	useEffect(() =>{
		if (cart && cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('cart');
        }
	}, [cart]);

	return (
		<>
			<Header addToCartRefs={addToCartRefs} cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} cart={cart} setCart={setCart} />
			<main id="main">
				<div className="container">
					<ProductsList cartIsOpen={cartIsOpen} addToCartRefs={addToCartRefs} setCartIsOpen={setCartIsOpen} products={products} cart={cart} setCart={setCart} />
				</div>
			</main>
		</>
	)
}

export default App
