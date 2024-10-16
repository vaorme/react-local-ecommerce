import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import LogoSvg from '@/assets/ecommerce-logo.svg';
import BrandLogo from '@/assets/brand-logo.svg';
import CartBox from '@/components/CartBox';
import { useCartContext } from '@/contexts/CartContext';

interface HeaderProps{
	addToCartRefs: React.MutableRefObject<(HTMLElement | null)[]>
}

function Header({addToCartRefs} : HeaderProps){
	const { cart, isCartOpen, closeCart, toggleCart } = useCartContext();
    const cartBoxRef = useRef<HTMLDivElement>(null);
    const cartButtonRef = useRef<HTMLDivElement>(null);

    const checkRefs = (
		target: HTMLElement,
		refs: React.MutableRefObject<(HTMLElement | null)[]>
	): boolean => {
		return !refs.current.some(ref => ref?.contains(target));
	};

    useEffect(() => {
        const handler = (e: Event) => {
			const { target } = e;

			if(!(target instanceof HTMLElement)) return;

			const isOutside = !cartBoxRef.current?.contains(e.target as Node);
			const IsNotCartButton = !cartButtonRef.current?.contains(e.target as Node);
			const isNotAddToCart = checkRefs(target, addToCartRefs);
            if (isOutside && IsNotCartButton && isNotAddToCart){
                closeCart();
            }
        }

        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [closeCart, cartBoxRef, cartButtonRef, addToCartRefs]);

    return <>
        <header id="header">
            <div className="container">
                <div className="col lft">

                </div>
                <div className="col logo">
                    <div className="brand">
						<a href="https://vaor.me" target="_blank">
							<img src={BrandLogo} alt="Brand Logo" />
						</a>
					</div>
					<div className="x"></div>
					<div className="project">
						<NavLink to="/">
							<img src={LogoSvg} alt="Logo" />
						</NavLink>
					</div>
                </div>
                <div className="col rit">
                    <div className="cart">
                        <button className={`cart-link${(isCartOpen)? ' link-active' : ''}`} onClick={toggleCart}>
                            <div className="cart-icon" ref={cartButtonRef}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                    <path d="M17 17h-11v-14h-2"></path>
                                    <path d="M6 5l14 1l-1 7h-13"></path>
                                </svg>
                            </div>
                            <div className="cart-count">{cart.length}</div>
                        </button>
                        <CartBox cartBoxRef={cartBoxRef}/>
                    </div>
                </div>
            </div>
        </header>
    </>
}

export default Header;