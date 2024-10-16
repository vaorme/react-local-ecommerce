import { useEffect, useState } from "react";
import useProduct from "@/hooks/useProduct";
import { formatPrice } from "@/lib/helpers";
import { CartItemInterface } from "@/lib/types";

export default function useCart(){
	const { getProduct } = useProduct();
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cart, setCart] = useState(() =>{
		const getData = localStorage.getItem('cart');
		return getData? JSON.parse(getData) : [];
	});
	const [cartTotal, setCartTotal] = useState("");

	const isProductInCart = (id : number) =>{
		const get = cart.find((product : CartItemInterface) => product.id === id);
		return get? true : false;
	}
	const addToCart = (id : number) =>{
		const product = getProduct(id);
		if(!product){
			alert('no se encontro producto');
			return true;
		}
		setCart((prevCart: CartItemInterface[]) => {
			if(isProductInCart(id)){
				return prevCart.map((product : CartItemInterface) => ({
					...product,
					quantity: product.id === id? product.quantity++ : product.quantity
				}))
			}else{
				return [...prevCart, {
					...product,
					quantity: 1
				}];
			}
		})
		setIsCartOpen(true);
	}

	const removeItem = (id: number) =>{
		const getCart = cart.filter((product : CartItemInterface) => product.id !== id);
        setCart(getCart);
	}

	const minusQuantity = (id : number) =>{
		if (isProductInCart(id)) {
			const updateCart = cart.reduce((acc: CartItemInterface[], product: CartItemInterface) => {
				if (product.id === id) {
					const newQuantity = product.quantity - 1;
					if (newQuantity > 0) {
						acc.push({ ...product, quantity: newQuantity });
					}
				} else {
					acc.push(product);
				}
				return acc;
			}, []);

			setCart(updateCart);
		}
	}
	const plusQuantity = (id : number) =>{
		if(isProductInCart(id)){
			const updateCart = cart.map((product : CartItemInterface) => {
				const quantity = product.id === id? ++product.quantity : product.quantity;
				return {
					...product,
					quantity
				}
			})
			setCart(updateCart);
		}
	}
	useEffect(() =>{
		if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('cart');
        }
	}, [cart]);

	useEffect(() => {
		const getTotal = cart.reduce((acc: number | undefined, product: CartItemInterface) => {
			const currentPrice = product.discount ? product.discounted_price : product.price;
			return (acc? acc : 0) + (currentPrice * product.quantity);
		}, 0);
		const total = formatPrice(getTotal);
		setCartTotal(total);
	}, [cart]);
	return {
		cart,
		setCart,
		cartTotal,
		addToCart,
		isCartOpen,
		setIsCartOpen,
		removeItem,
		minusQuantity,
		plusQuantity,
	};
}