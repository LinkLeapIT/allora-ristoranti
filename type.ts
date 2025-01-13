// ./src/type/index.ts
export interface ExtraIngredient {
    ingredient: string;
    price: number;
}

export interface Size {
    size: string;
    price: number;
}

export interface Products {
    id: string;
    title: string;
    file: File | null;
    path: string | null | undefined;
    description: string;
    price: number;
    createdAt: Date | null;
    withoutOptions: string[];
    extraIngredients: ExtraIngredient[];
    sizes: Size[];
    quantity: number;
    options: any;
}

export interface CartItem {
    id: string;
    options: any;
    quantity: number;
}

export interface ItemProps {
    product: Products;
}

export interface StateProps {
    shopping: {
        productData: Products[];
        userInfo: null | {
            name: string;
            email: string;
            image: string;
        };
        orderData: {
            length: number;
            order: Products[];
        };
    }
}

