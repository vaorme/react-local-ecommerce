import { useCartContext } from "@/hooks/useCartContext";
import { formatPrice } from "@/lib/helpers";
import { ProductInterface } from "@/lib/types";
import { useEffect, useRef } from "react";

function ProductItem({ product} : { product: ProductInterface }){
	const { addToCart, addToCartButtonsRefs } = useCartContext();
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if(buttonRef.current){
			addToCartButtonsRefs.current.push(buttonRef.current);
		}

		return () => {
			if(buttonRef.current){
				addToCartButtonsRefs.current = addToCartButtonsRefs.current.filter(ref => ref !== buttonRef.current);
			}
		}
	}, [buttonRef, addToCartButtonsRefs])

	const handleAddToCart = (id: number) =>{
		addToCart(id);
		// addToCartButtonsRefs.current.forEach(ref => {
        //     if (ref) ref.innerText = 'Add To Cart';
        // });
        // if (buttonRef.current) {
        //     buttonRef.current.innerText = 'Added to Cart';
        // }
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
                        <span className="price-discount">${formatPrice(product.discounted_price)}</span>
                    ): ''}
                    <span className="price-current">${formatPrice(product.price)}</span>
                </div>
                <button className="btn item-add-to-cart" onClick={() => handleAddToCart(product.id)} ref={buttonRef}>Add To Cart</button>
            </div>
        </div>
    </>
}

export default ProductItem;