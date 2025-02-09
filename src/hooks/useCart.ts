import { useEffect, useMemo, useRef, useState } from "react";
import { formatPrice } from "@/lib/helpers";
import { CartItemInterface, ProductInterface } from "@/lib/types";
import toast from "react-hot-toast";

export default function useCart() {
	const [cart, setCart] = useState(() => {
		const getData = localStorage.getItem("cart");
		return getData ? JSON.parse(getData) : [];
	});
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [alertStock, setAlertStock] = useState<{
		id?: number;
		stock?: number;
		title?: string;
	}>({});
	const limitStockAlert = useRef(false);
	const [cartTotal, setCartTotal] = useState("");

	const isProductInCart = (id: number) => {
		const get = cart.find((product: CartItemInterface) => product.id === id);
		return !!get;
	};
	const addToCart = (product: ProductInterface) => {
		if (!product) {
			toast.error("Error, Producto no encontrado.", {
				id: "error-product",
			});
			return false;
		}
		setCart((prevCart: CartItemInterface[]) => {
			if (isProductInCart(product.id)) {
				return prevCart.map((item: CartItemInterface) => {
					if (item.id !== product.id) {
						return item;
					}
					const stock = item.stock;
					let quantity = item.quantity + 1;
					if (quantity > stock) {
						// setAlertStock({
						// 	id: item.id,
						// 	stock: stock,
						// 	title: item.title,
						// });
						limitStockAlert.current = true;
						quantity = stock;
					}

					return {
						...item,
						quantity,
					};
				});
			} else {
				return [
					...prevCart,
					{
						...product,
						quantity: 1,
						stock: Math.floor(Math.random() * 8) + 3,
					},
				];
			}
		});
		if (limitStockAlert.current) return;

		if (!isCartOpen) {
			setIsCartOpen(true);
		}
	};

	const removeItem = (id: number) => {
		const getCart = cart.filter(
			(product: CartItemInterface) => product.id !== id
		);
		setCart(getCart);
	};

	const minusQuantity = (id: number) => {
		if (isProductInCart(id)) {
			const updateCart = cart.reduce(
				(acc: CartItemInterface[], product: CartItemInterface) => {
					if (product.id === id) {
						const newQuantity = product.quantity - 1;
						if (newQuantity > 0) {
							acc.push({ ...product, quantity: newQuantity });
						}
					} else {
						acc.push(product);
					}
					return acc;
				},
				[]
			);

			setCart(updateCart);
		}
	};
	const plusQuantity = (id: number) => {
		if (isProductInCart(id)) {
			const updateCart = cart.map((product: CartItemInterface) => {
				const amount = product.stock;
				let quantity =
					product.id === id ? ++product.quantity : product.quantity;
				if (quantity > amount) {
					// setAlertStock({
					// 	id: product.id,
					// 	stock: amount,
					// 	title: product.title,
					// });
					limitStockAlert.current = true;
					quantity = amount;
				}
				return {
					...product,
					quantity,
				};
			});
			setCart(updateCart);
		}
	};

	const totalCart = cart.reduce(
		(acc: number | undefined, product: CartItemInterface) => {
			const currentPrice = product.discount
				? product.discounted_price
				: product.price;
			return (acc ? acc : 0) + currentPrice * product.quantity;
		},
		0
	);

	const updateLocalCart = (cart: ProductInterface[]) => {
		if (cart.length === 0) {
			localStorage.removeItem("cart");
			return;
		}

		localStorage.setItem("cart", JSON.stringify(cart));
	};

	useEffect(() => {
		const total = formatPrice(totalCart);
		setCartTotal(total);
		updateLocalCart(cart);

		if (limitStockAlert.current) {
			toast.error("No hay suficiente stock para este producto", {
				id: "error-stock",
			});
			limitStockAlert.current = false;
		}
	}, [cart, limitStockAlert]);

	// useEffect(() => {
	// 	if (Object.keys(alertStock).length === 0) return;
	// 	toast.error(
	// 		`No hay suficiente stock de ${alertStock.title}. Solo quedan ${alertStock.stock} unidades`,
	// 		{
	// 			id: `error-stock-${alertStock.id}`,
	// 		}
	// 	);
	// 	return () => {
	// 		setAlertStock({});
	// 	};
	// }, [alertStock]);
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
