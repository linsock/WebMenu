import { Spin } from 'antd';
import { lazy, Suspense } from 'react';

const LazyHereMap = lazy(() => import("./hereMap"))
const renderLoader = () => <Spin />

export default function PaypalButton() {
    return (
        <Suspense fallback={renderLoader()}>
            <LazyHereMap />
        </Suspense>
    )
}