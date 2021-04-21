import { Spin } from 'antd';
import { lazy, Suspense } from 'react';

const LazyCustomMenu = lazy(() => import("./renderMenu"))
const renderLoader = () => <Spin />

export default function CustomMenu() {
    return (
        <Suspense fallback={renderLoader()}>
            <LazyCustomMenu />
        </Suspense>
    )
}