import { useCartContext } from "@/hooks/useCartContext";
import { formatPrice } from "@/lib/helpers";
import { ProductInterface } from "@/lib/types";
import { useEffect, useRef } from "react";

export const ProductItem = ({ product }: { product: ProductInterface }) => {
	const { addToCart, addToCartButtonsRefs } = useCartContext();
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (buttonRef.current) {
			addToCartButtonsRefs.current.push(buttonRef.current);
		}
		return () => {
			if (buttonRef.current) {
				addToCartButtonsRefs.current = addToCartButtonsRefs.current.filter(
					(ref) => ref !== buttonRef.current
				);
			}
		};
	}, [buttonRef, addToCartButtonsRefs]);

	const handleAddToCart = (product: ProductInterface) => {
		addToCart(product);
	};

	return (
		<div className="product-item">
			<div className="item-image">
				<img src={product.image} alt={product.title} />
			</div>
			<div className="item-content">
				<h4>{product.title}</h4>
				<div className="item-price">
					{product.discount ? (
						<span className="price-discount">
							${formatPrice(product.discounted_price)}
						</span>
					) : (
						""
					)}
					<span className="price-current">
						${formatPrice(product.price)}
					</span>
				</div>
				<button
					className="btn item-add-to-cart"
					onClick={() => handleAddToCart(product)}
					ref={buttonRef}
				>
					Add To Cart
				</button>
			</div>
		</div>
	);
};
