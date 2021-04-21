import { Spin } from 'antd';
import { lazy, Suspense } from 'react';

const LazySlidingPictures = lazy(() => import("./slidingPictures"))
const renderLoader = () => <Spin />

export default function SlidingPictures() {
    return (
        <Suspense fallback={renderLoader()}>
            <LazySlidingPictures />
        </Suspense>
    )
}