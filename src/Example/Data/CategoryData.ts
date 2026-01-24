import { RNFlowNode } from "../../RNFlowTypes";

export interface Category {
    name: string;
    itemCount: number;
    icon: string;
    discount?: number;
}

export const categoryData: RNFlowNode<Category> = {
    id: 'all',
    data: {
        name: 'All Products',
        itemCount: 15420,
        icon: '🏪',
    },
    children: [
        {
            id: 'electronics',
            data: {
                name: 'Electronics',
                itemCount: 5230,
                icon: '💻',
                discount: 15,
            },
            children: [
                {
                    id: 'phones',
                    data: {
                        name: 'Phones',
                        itemCount: 1250,
                        icon: '📱',
                        discount: 20,
                    },
                },
                {
                    id: 'laptops',
                    data: {
                        name: 'Laptops',
                        itemCount: 890,
                        icon: '💼',
                        discount: 10,
                    },
                },
                {
                    id: 'accessories',
                    data: {
                        name: 'Accessories',
                        itemCount: 3090,
                        icon: '🎧',
                    },
                },
            ],
        },
        {
            id: 'fashion',
            data: {
                name: 'Fashion',
                itemCount: 6800,
                icon: '👔',
                discount: 25,
            },
            children: [
                {
                    id: 'mens',
                    data: {
                        name: "Men's Wear",
                        itemCount: 3200,
                        icon: '👕',
                    },
                },
                {
                    id: 'womens',
                    data: {
                        name: "Women's Wear",
                        itemCount: 3600,
                        icon: '👗',
                        discount: 30,
                    },
                },
            ],
        },
        {
            id: 'home',
            data: {
                name: 'Home & Living',
                itemCount: 3390,
                icon: '🏠',
            },
        },
    ],
};