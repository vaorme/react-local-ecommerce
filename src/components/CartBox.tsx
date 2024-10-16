import CartItem from "@/components/CartItem";
import { useCartContext } from "@/contexts/CartContext";
import { CartItemInterface } from "@/lib/types";
import { NavLink } from "react-router-dom";
function CartBox({cartBoxRef} : any){
	const { cart, isCartOpen, cartTotal, closeCart } = useCartContext();

    return <>
        <div className={`cart-box${isCartOpen? ' open' : ''}`} ref={cartBoxRef}>
            {cart.length > 0? cart.map((product: CartItemInterface) => (
                <CartItem product={product} key={product.id} />
            )): (
                <div className="empty">Carrito vacio</div>
            )}
			<div className="total">
				<span>Total:</span>
				<span><b>{cartTotal}</b></span>
			</div>
			<NavLink to="/checkout" className="btn" onClick={closeCart}>Checkout</NavLink>
        </div>
    </>
}

export default CartBox;