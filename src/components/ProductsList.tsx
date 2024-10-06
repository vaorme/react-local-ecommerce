import ProductItem from "./ProductItem";
function ProductsList({addToCartRefs, setCartIsOpen, products, cart, setCart} : any){
    const setRef = (ref, index) => {
        addToCartRefs.current[index] = ref;
    };
    return <>
        <section className="section products">
            {products.length > 0? products.map((product : any, index : any) =>(
                <ProductItem setRef={(ref) => setRef(ref, index)} setCartIsOpen={setCartIsOpen} products={products} product={product} cart={cart} setCart={setCart} key={product.id}/>
            )) : (
                <div className="empty">¿Qué esperas para agregar uno?</div>
            )}	
        </section>
    </>
}

export default ProductsList;