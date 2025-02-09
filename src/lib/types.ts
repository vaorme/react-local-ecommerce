export interface ProductInterface {
	id: number;
	image: string;
	title: string;
	description: string;
	rating: number;
	stock: number;
	quantity?: number;
	price: number;
	discount: boolean;
	discounted_price: number;
}
export interface CartItemInterface extends ProductInterface {
	quantity: number;
}
export type CartProductType = {
	product: ProductInterface;
};
export type ProductType = {
	product: ProductInterface;
};
