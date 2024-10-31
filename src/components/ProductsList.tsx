import ProductItem from "@/components/ProductItem";
import useProduct from "@/hooks/useProduct";
import { ProductInterface } from "@/lib/types";
function ProductsList(){
	const { products } = useProduct();

    return <>
        <section className="section products">
            {products.length > 0? products.map((product : ProductInterface) =>(
                <ProductItem product={product} key={product.id}/>
            )) : (
                <div className="empty">Not products found.</div>
            )}
        </section>
    </>
}

export default ProductsList;