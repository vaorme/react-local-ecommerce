import ProductItem from "@/components/ProductItem";
import useProduct from "@/hooks/useProduct";
import { ProductInterface } from "@/lib/types";
function ProductsList({addToCartRefs} : any){
	const { products } = useProduct();
    const setRef = (ref: object, index: number) => {
        addToCartRefs.current[index] = ref;
    };

    return <>
        <section className="section products">
            {products.length > 0? products.map((product : ProductInterface, index : number) =>(
                <ProductItem setRef={(ref: any) => setRef(ref, index)} product={product} key={product.id}/>
            )) : (
                <div className="empty">Not products found.</div>
            )}
        </section>
    </>
}

export default ProductsList;