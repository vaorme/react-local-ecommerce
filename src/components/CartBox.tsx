import CartItem from "./CartItem";
function CartBox({cartBoxRef, cart, setCart} : any){
    return <>
        <div className="cart-box" ref={cartBoxRef}>
            {cart.length > 0? cart.map((item : any) => (
                <CartItem item={item} cart={cart} setCart={setCart} key={item.id} />
            )): (
                <div className="empty">Carrito vacio</div>
            )}
			<a href="/checkout" className="btn">Checkout</a>
        </div>
    </>
}

export default CartBox;