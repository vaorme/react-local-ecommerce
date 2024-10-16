import { useCartContext } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/helpers";
import { ProductInterface } from "@/lib/types";
import { useRef } from "react";

function ProductItem({setRef, product} : { setRef: any, product: ProductInterface }){
	const addToCartRef = useRef<HTMLButtonElement>(null);
	const { addToCart } = useCartContext();

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
                        <span className="price-discount">${formatPrice(product.discounted_price)}</span>
                    ): ''}
                    <span className="price-current">${formatPrice(product.price)}</span>
                </div>
                <button className="btn item-add-to-cart" ref={addToCartRef} onClick={() => addToCart(product.id)}>Add To Cart</button>
            </div>
        </div>
    </>
}

export default ProductItem;