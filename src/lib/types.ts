export interface ProductInterface {
	id: number,
	image: string,
	name: string,
	description: string,
	rating: number,
	amount: number,
	price: number,
	discount: boolean,
	discounted_price: number
}
export interface CartItemInterface extends ProductInterface{
	quantity: number
}
export type CartProductType = {
	product: CartItemInterface
}
export type ProductType = {
	product: ProductInterface
}