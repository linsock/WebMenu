
import Icon from '@ant-design/icons';
import { Col, Menu, Row } from "antd";
import React, { useState } from 'react';
import { useWindowSize } from '../../utils';


function buildPageSideEntry(key, title, items, icon) {
    return {
        key,
        title,
        items,
        icon
    }
}

function isPageSideEntry(item) {
    return item.key !== undefined &&
        item.title !== undefined &&
        item.items !== undefined &&
        item.icon !== undefined
}

const PageSideMenu = (props) => {
    const { sections } = props
    if (!(sections instanceof Array))
        throw new Error("Got no sections array")
    sections.forEach(v => {
        if (!isPageSideEntry(v))
            throw new Error("One or more items in 'sections' prop doesn't respect PageSideEntry format => {key, title, items}")
    })
    const isFirefox = typeof InstallTrigger !== 'undefined';

    const sogliaMobile = 639 // empirico
    const windowSize = useWindowSize()
    const [menuPage, setMenuPage] = useState(0)
    const childs = sections.map((v, i) => (
        <Menu.Item
            icon={isFirefox ?
                <Icon component={v.icon} style={{ width: "20px" }} /> :
                <Icon component={v.icon} />}
            onClick={() => setMenuPage(i)}
            key={i}
            style={{
                marginLeft: windowSize.width < sogliaMobile ? "12px" : "0px"
            }}>
            {windowSize.width > sogliaMobile && <span>{v.title}</span>}
        </Menu.Item>
    ))
    return (
        <Row>
            <Col span={5} style={{ marginRight: "2%" }}>
                <Menu
                    mode="vertical"
                    style={{ borderRadius: "20px" }}
                >
                    {childs}
                </Menu>
            </Col>
            <Col span={15}>
                {sections.map((v, i) => menuPage === i && <div key={i}>{v.items}</div>)}
            </Col>
        </Row>
    )
}

export { buildPageSideEntry, isPageSideEntry };
export default PageSideMenu