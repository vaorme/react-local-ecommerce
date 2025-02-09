import { NavLink } from 'react-router-dom';
import LogoSvg from '@/assets/ecommerce-logo.svg';
import CartBox from '@/components/CartBox';
import { useCartContext } from '@/hooks/useCartContext';
import { useEffect, useRef } from 'react';

function Header() {
	const { cart, isCartOpen, toggleCart, addToCartButtonsRefs } = useCartContext();
	const headerRef = useRef<HTMLHeadElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (buttonRef.current) {
			addToCartButtonsRefs.current.push(buttonRef.current);
		}
	}, [buttonRef, addToCartButtonsRefs]);

	useEffect(() => {
		const header = headerRef.current;
		const handleScroll = () => {
			if (header) {
				if (window.scrollY > 40) {
					header.classList.add('scrolled');
				} else {
					header.classList.remove('scrolled');
				}
			}
		}

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	})

	return <>
		<header id="header" ref={headerRef}>
			<div className="container">
				<nav className="navbar">
					<div className="col lft" />
					<div className="col logo">
						<div className="project">
							<NavLink to="/">
								<img src={LogoSvg} alt="Logo" />
							</NavLink>
						</div>
					</div>
					<div className="col rit">
						<div className="cart">
							<button className={`cart-link rounded-md ${(isCartOpen) ? ' link-active' : ''}`} ref={buttonRef} onClick={toggleCart}>
								<div className="cart-icon">
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
							<CartBox />
						</div>
					</div>
				</nav>
			</div>
		</header>
	</>
}

export default Header;