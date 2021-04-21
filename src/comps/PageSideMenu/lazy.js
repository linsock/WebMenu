import { Spin } from 'antd';
import { lazy, Suspense } from 'react';

const LazyPageSideMenu = lazy(() => import("./pageSideMenu"))
const renderLoader = () => <Spin />

export default function PageSideMenu() {
    return (
        <Suspense fallback={renderLoader()}>
            <LazyPageSideMenu />
        </Suspense>
    )
}