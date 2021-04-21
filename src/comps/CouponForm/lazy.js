import { Spin } from 'antd';
import { lazy, Suspense } from 'react';

const LazyCouponForm = lazy(() => import("./requestCouponForm"))
const renderLoader = () => <Spin />

export default function PaypalButton() {
    return (
        <Suspense fallback={renderLoader()}>
            <LazyCouponForm />
        </Suspense>
    )
}