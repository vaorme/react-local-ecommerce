import { Routes, Route } from 'react-router-dom';
import '@/App.css';
import HomeView from '@/views/HomeView';
import CheckoutView from './views/CheckoutView';
import WebLayout from './layout/WebLayout';
import { CartProvider } from '@/contexts/CartContext';
function App() {
	return (<CartProvider>
		<Routes>
			<Route path="/" element={<WebLayout/>}>
				<Route index element={<HomeView />} />
				<Route path="/checkout" element={<CheckoutView />} />
			</Route>
		</Routes>
	</CartProvider>);
}

export default App
