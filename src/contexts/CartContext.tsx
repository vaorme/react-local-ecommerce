import useCart from "@/hooks/useCart";
import { createContext, ReactNode, useEffect, useRef, useCallback } from "react";

interface CartContextType {
	cart: Array<any>;  // Define what items will be in the cart
	isCartOpen: boolean;
	cartTotal: string;
	addToCartButtonsRefs: React.MutableRefObject<Array<HTMLButtonElement>>;
	cartBoxRef: React.RefObject<HTMLDivElement>;
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
	const cartBoxRef = useRef<HTMLDivElement>(null);
	const addToCartButtonsRefs = useRef<Array<HTMLButtonElement>>([]);

	const openCart = () => setIsCartOpen(true);
	const closeCart = useCallback(() => setIsCartOpen(false), [setIsCartOpen]);
	const toggleCart = () => setIsCartOpen((prevState) => !prevState);


	useEffect(() => {
        const handler = (e: Event) => {
			const { target } = e;
			if(!(target instanceof HTMLElement)) return;
			if (cartBoxRef.current && cartBoxRef.current.contains(target)) return;
			if(addToCartButtonsRefs.current.some(ref => ref.contains(target))) return;
			closeCart();
        }

        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [closeCart]);
	return (
		<CartContext.Provider value={{ cartBoxRef, addToCartButtonsRefs, openCart, closeCart, toggleCart, addToCart, cart, cartTotal, isCartOpen, removeItem, minusQuantity, plusQuantity }}>
			{children}
		</CartContext.Provider>
	)
}

export default CartContext;