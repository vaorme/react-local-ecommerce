import CartBox from './CartBox';

import LogoSvg from '../assets/ecommerce-logo.svg';
import { useEffect, useRef } from 'react';
function Header({addToCartRefs, cartIsOpen, setCartIsOpen, cart, setCart} : any){

    let cartBoxRef = useRef<HTMLDivElement>(null);
    let cartButtonRef = useRef<HTMLDivElement>(null);

    const checkRefs = (target: any, refs: any[]) => {
        for (const item of refs) {
            if (item.current && item.current.contains(target)) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        const handler = (e: Event) => {

            if (
                !cartBoxRef.current?.contains(e.target as Node) &&
                e.target !== cartButtonRef.current &&
                checkRefs(e.target, addToCartRefs.current)
            ){
                setCartIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [setCartIsOpen, cartBoxRef, cartButtonRef, addToCartRefs]);
    return <>
        <header id="header">
            <div className="container">
                <div className="col lft">

                </div>
                <div className="col logo">
                    <a href="/">
                        <img src={LogoSvg} alt="Logo" />
                    </a>
                </div>
                <div className="col rit">
                    <div className="cart">
                        <button className="cart-link" onClick={() => setCartIsOpen(!cartIsOpen)}>
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
                        {cartIsOpen && <CartBox cartBoxRef={cartBoxRef} cart={cart} setCart={setCart}/>}
                    </div>
                </div>
            </div>
        </header>
    </>
}

export default Header;