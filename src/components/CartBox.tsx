import CartItem from "@/components/CartItem";
import { useCartContext } from "@/hooks/useCartContext";
import { CartItemInterface, ProductInterface } from "@/lib/types";
import { NavLink } from "react-router-dom";
function CartBox() {
	const { cartBoxRef, cart, isCartOpen, cartTotal, closeCart } =
		useCartContext();

	return (
		<div
			className={`mini-cart ${isCartOpen ? " open" : ""}`}
			ref={cartBoxRef}
		>
			<div className="card-header">
				<h4>Carrito</h4>
			</div>
			<div className="cart-box">
				{cart.length > 0 ? (
					cart.map((product: ProductInterface) => (
						<CartItem product={product} key={product.id} />
					))
				) : (
					<div className="empty">Añade algunos productos</div>
				)}
			</div>
			<div className="cart-footer">
				<div className="total">
					<span>Total:</span>
					<span>
						<b>{cartTotal}</b>
					</span>
				</div>
				<NavLink to="/checkout" className="btn" onClick={closeCart}>
					Checkout
				</NavLink>
			</div>
		</div>
	);
}

export default CartBox;
