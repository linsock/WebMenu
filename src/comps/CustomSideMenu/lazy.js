import { Spin } from 'antd';
import { lazy, Suspense } from 'react';

const LazyCustomSideMenu = lazy(() => import("./customSideMenu"))
const renderLoader = () => <Spin />

export default function CustomSideMenu(props) {
    const { data } = props
    return (
        <Suspense fallback={renderLoader()}>
            <LazyCustomSideMenu data={data} />
        </Suspense>
    )
}