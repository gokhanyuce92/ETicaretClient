import { List_Product_Image } from "./list-product-image";

export class ListProduct {
    id: string;
    name: string;
    stock: number;
    price: number;
    createdDate: Date;
    updatedDate: Date;
    productImageFiles?: List_Product_Image[];
    imagePath: string;
}
