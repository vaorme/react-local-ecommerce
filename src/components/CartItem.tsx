function CartItem({cart, setCart, item} : any){
    const removeitem = (id : number) =>{
        const getOthers = cart.filter((item : any) => item.id !== id);
        setCart(getOthers);
    }
	const existsInCart = (id : number) =>{
		const get = cart.find((product : any) => product.id === id);
		return get? true : false;
	}
	const minusQuantity = (id : any) =>{
		if (existsInCart(id)) {
			const updateCart = cart.reduce((acc: any[], product: any) => {
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
	const plusQuantity = (id : any) =>{
		if(existsInCart(id)){
			const updateCart = cart.map((product : any) => {
				const quantity = product.id === id? ++product.quantity : product.quantity;
				return {
					...product,
					quantity
				}
			})
			setCart(updateCart);
		}
	}

    return <>
        <div className="item">
            <div className="col">
                <div className="image">
                    <img src={item.image} alt={item.name} />
                </div>
                <div className="info">
                    <div className="name">
                        <h4>{item.name}</h4>
                        <div className="price">
                            {item.discount? (
                                <span className="price-discount">${item.discounted_price}</span>
                            ): ''}
                            <span className="price-current">${item.price}</span>
                        </div>
                    </div>
                    <div className="quantity">
                        <button onClick={() => minusQuantity(item.id)}>-</button>
                        <input type="text" value={item.quantity} onChange={(e) => item.quantity = e.target.value} />
                        <button onClick={() => plusQuantity(item.id)}>+</button>
                    </div>
                </div>
            </div>
            <div className="col actions">
                <button onClick={() => removeitem(item.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 7l16 0"></path>
                        <path d="M10 11l0 6"></path>
                        <path d="M14 11l0 6"></path>
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                    </svg>
                </button>
            </div>
        </div>
    </>
}

export default CartItem;