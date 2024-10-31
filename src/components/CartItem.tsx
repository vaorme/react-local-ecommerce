import { useCartContext } from "@/hooks/useCartContext";
import { formatPrice } from "@/lib/helpers";
import { CartProductType } from "@/lib/types";

export default function CartItem({ product } : CartProductType){
	const { removeItem, minusQuantity, plusQuantity } = useCartContext();
    return <>
        <div className="item">
            <div className="col">
                <div className="image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="info">
                    <div className="name">
                        <h4>{product.name}</h4>
                        <div className="price">
                            {product.discount? (
                                <span className="price-discount">${formatPrice(product.discounted_price)}</span>
                            ): ''}
                            <span className="price-current">${formatPrice(product.price)}</span>
                        </div>
                    </div>
                    <div className="quantity">
                        <button onClick={() => minusQuantity(product.id)}>-</button>
                        <input type="text" value={product.quantity} readOnly/>
                        <button onClick={() => plusQuantity(product.id)}>+</button>
                    </div>
                </div>
            </div>
            <div className="col actions">
                <button onClick={() => removeItem(product.id)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none">
						<path fillRule="evenodd" clipRule="evenodd" d="M19.8841 4.11599C20.3722 4.60415 20.3722 5.39561 19.8841 5.88376L5.88407 19.8838C5.39591 20.3719 4.60445 20.3719 4.1163 19.8838C3.62814 19.3956 3.62814 18.6041 4.1163 18.116L18.1163 4.11599C18.6045 3.62784 19.3959 3.62784 19.8841 4.11599Z" fill="currentColor" />
						<path fillRule="evenodd" clipRule="evenodd" d="M4.1163 4.11599C4.60445 3.62784 5.39591 3.62784 5.88407 4.11599L19.8841 18.116C20.3722 18.6041 20.3722 19.3956 19.8841 19.8838C19.3959 20.3719 18.6045 20.3719 18.1163 19.8838L4.1163 5.88376C3.62814 5.39561 3.62814 4.60415 4.1163 4.11599Z" fill="currentColor" />
					</svg>
                </button>
            </div>
        </div>
    </>
}