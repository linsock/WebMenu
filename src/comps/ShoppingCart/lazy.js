import { Spin } from 'antd';
import { lazy, Suspense } from 'react';

const LazyShoppingCart = lazy(() => import("./shoppingCart"))
const renderLoader = () => <Spin />

export default function ShoppingCart() {
    return (
        <Suspense fallback={renderLoader()}>
            <LazyShoppingCart />
        </Suspense>
    )
}