import { Spin } from 'antd';
import { lazy, Suspense } from 'react';

const LazyPaypalButton = lazy(() => import("./paypalButton"))
const renderLoader = () => <Spin />

export default function PaypalButton() {
    return (
        <Suspense fallback={renderLoader()}>
            <LazyPaypalButton />
        </Suspense>
    )
}