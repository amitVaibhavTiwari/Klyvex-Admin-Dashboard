import {
    FiHome,
    FiUsers,
    FiShoppingCart,
    FiDollarSign,
    FiMessageCircle,
    FiActivity,
    FiShoppingBag,
} from 'react-icons/fi';

export type RouteItem = {
    name: string;
    path?: string;
    icon: React.ElementType;
    subRoutes?: Array<{ name: string; path: string }>;
}

export const routes: RouteItem[] = [
    { name: 'Dashboard', path: '/', icon: FiHome },
    {
        name: 'Analytics',
        icon: FiShoppingBag,
        subRoutes: [
            { name: 'Store Analytics', path: '/analytics' },
            { name: 'Order Analytics', path: '/order-analytics' },
            { name: 'Revenue Analytics', path: '/revenue-analytics' }
        ]
    },
    { name: 'Customers', icon: FiUsers, path: '/customers' },
    { name: 'Orders', icon: FiShoppingCart, path: '/orders' },
    { name: 'Products', path: '/products', icon: FiDollarSign },
    { name: 'Stock', path: '/stock', icon: FiMessageCircle },
    { name: 'Staff', path: '/staff', icon: FiActivity },
];