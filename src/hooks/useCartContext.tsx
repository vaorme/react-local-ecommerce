import CartContext from "@/contexts/CartContext";
import { useContext } from "react";

export const useCartContext = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("need to use useCartContext");
	}
	return context;
}