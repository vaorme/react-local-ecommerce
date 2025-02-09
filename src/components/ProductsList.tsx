import { LoaderIcon, ProductItem } from "@/components";
import { useFetch } from "@/hooks";
import { ProductInterface } from "@/lib/types";

const url = "https://fakestoreapi.com/products";

function ProductsList() {
	const { data, loading, error } = useFetch(url, {});

	if (loading)
		return (
			<div className="loading">
				<LoaderIcon />
			</div>
		);
	if (error) return <div className="morty">{error.message}</div>;
	return (
		<section className="section products">
			{data && data?.length > 0 ? (
				data.map((product: ProductInterface) => (
					<ProductItem product={product} key={product.id} />
				))
			) : (
				<div className="empty">Not products found.</div>
			)}
		</section>
	);
}

export default ProductsList;
