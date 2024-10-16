import { Outlet } from "react-router-dom";
import Header from '@/components/Header';
import { useRef } from "react";

export default function WebLayout(){
	const addToCartRefs = useRef([]);
	return (<>
		<Header addToCartRefs={addToCartRefs}/>
		<main id="main">
			<div className="container">
				<Outlet/>
			</div>
		</main>
	</>)
}