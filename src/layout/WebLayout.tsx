import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

export default function WebLayout() {
	return (
		<>
			<Header />
			<main id="main">
				<div className="container">
					<Outlet />
				</div>
			</main>
			<Toaster />
		</>
	);
}
