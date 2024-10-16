import { useRef } from 'react';
import ProductsList from '@/components/ProductsList';
export default function HomeView(){
	const addToCartRefs = useRef([]);
	return (<ProductsList addToCartRefs={addToCartRefs}/>)
}