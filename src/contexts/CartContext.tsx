import useCart from "@/hooks/useCart";
import { createContext, ReactNode, useContext } from "react";

interface CartContextType {
	cart: Array<any>;  // Define what items will be in the cart
	isCartOpen: boolean;
	cartTotal: string;
	openCart: () => void;
	closeCart: () => void;
	toggleCart: () => void;
	addToCart: (id: number) => void;
	removeItem: (id: number) => void;
	minusQuantity: (id: number) => void;
	plusQuantity: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider = ({ children }: { children: ReactNode }) => {
	const { addToCart, cart, cartTotal, isCartOpen, setIsCartOpen, removeItem, minusQuantity, plusQuantity } = useCart();

	const openCart = () => setIsCartOpen(true);
	const closeCart = () => setIsCartOpen(false);
	const toggleCart = () => setIsCartOpen((prevState) => !prevState);
	return (
		<CartContext.Provider value={{ openCart, closeCart, toggleCart, addToCart, cart, cartTotal, isCartOpen, removeItem, minusQuantity, plusQuantity }}>
			{children}
		</CartContext.Provider>
	)
}

export const useCartContext = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("need to use useCartContext");
	}
	return context;
}