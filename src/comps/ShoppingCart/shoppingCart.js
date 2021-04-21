import { MinusCircleFilled, ShoppingTwoTone } from "@ant-design/icons";
import { Col, Dropdown, Menu, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionRemoveFromShoppingCart } from "../../reducers/order/actions";
import "./shoppingCart.css";


const ShoppingCart = (props) => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const { shoppingCart } = useSelector(state => state.orders)

    const menu = (
        <Menu className="cart">
            {shoppingCart.map(v => <Menu.Item onClick={(e) => {
                setVisible(true)
                return dispatch(actionRemoveFromShoppingCart(v.nome))
            }}>
                <Row justify="space-between">
                    <Col span={2} >
                        <MinusCircleFilled />
                    </Col>
                    <Col span={20} style={{ paddingLeft: "3px", paddingRight: "5px" }}>
                        {v.nome}
                    </Col>
                    <Col span={2} >
                        {'\u20AC'}{v.prezzo}
                    </Col>
                </Row>
            </Menu.Item>)}
            <Menu.Divider />
            <Menu.Item>
                <Row style={{ paddingLeft: "5%" }}>
                    <Col>
                        <span style={{ fontWeight: "bold" }}>
                            Totale: {shoppingCart.map(v => v.prezzo).reduce((acc, item) => (acc + item), 0)}{'\u20AC'}
                        </span>
                    </Col>
                </Row>
            </Menu.Item>
        </Menu>
    );
    return (
        <Row justify="end" style={{ marginRight: "6%", marginTop: "3%" }}>
            <Col span={2}>
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    onVisibleChange={flag => setVisible(flag)}
                    visible={visible}
                >
                    <ShoppingTwoTone twoToneColor="#aba180" style={{ fontSize: '40px', }} />
                </Dropdown>
            </Col>
        </Row>
    )
}

export default ShoppingCart




