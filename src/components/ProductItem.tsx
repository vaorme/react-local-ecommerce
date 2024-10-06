import { useRef } from "react";

function ProductItem({setRef, setCartIsOpen, cartIsOpen, products, cart, setCart, product} : any){
	const addToCartRef = useRef<HTMLButtonElement>(null);
    const getProduct = (id : number) =>{
		const get = products.find((item : any) => item.id === id);
		return get;
	}

	const existsInCart = (id : number) =>{
		const get = cart.find((product : any) => product.id === id);
		return get? true : false;
	}

    const addToCart = (id : number) =>{
		const product = getProduct(id);

		if(!product){
			alert('no se encontro producto');
			return true;
		}
		if(existsInCart(id)){
			const updateCart = cart.map((product : any) => ({
				...product,
				quantity: product.id === id? ++product.quantity : product.quantity
			}))
			setCart(updateCart);
		}else{
			const newData = {
				...product,
				quantity: 1
			};

			setCart([...cart, newData])
		}
		cartIsOpen?? setCartIsOpen(true);
	}

	if (setRef) {
        setRef(addToCartRef);
    }

    return <>
        <div className="product-item">
            <div className="item-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="item-content">
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <div className="item-price">
                    {product.discount? (
                        <span className="price-discount">${product.discounted_price}</span>
                    ): ''}
                    <span className="price-current">${product.price}</span>
                </div>
                <button className="btn item-add-to-cart" id={product.id} ref={addToCartRef} onClick={() => addToCart(product.id)}>Add To Cart</button>
            </div>
        </div>
    </>
}

export default ProductItem;