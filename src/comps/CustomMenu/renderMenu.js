import { PlusCircleFilled } from "@ant-design/icons";
import {
    Card,
    Col,
    Row,
    Tabs
} from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { actionAddToShoppingCart } from "../../reducers/order/actions";
import "./renderMenu.css";


const { TabPane } = Tabs;

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const tabpaneInfo = (id) => ({ title: capitalize(id), key: id })

const CustomMenu = (props) => {
    const dispatch = useDispatch()

    if (props.data) {
        const { antipasti, contorni, primi, secondi, dolci } = props.data
        const antipastiId = "Appetizers"
        const contorniId = "Side Dishes"
        const primiId = "First Dishes"
        const secondiId = "Main courses"
        const dolciId = "Desserts"
        return (
            <div className="menuBody">
                <h1 className="menuTitle"> Menu</h1>
                <Tabs defaultActiveKey="1">
                    {renderSection(antipastiId, antipasti, tabpaneInfo(antipastiId), dispatch)}
                    {renderSection(primiId, primi, tabpaneInfo(primiId), dispatch)}
                    {renderSection(secondiId, secondi, tabpaneInfo(secondiId), dispatch)}
                    {renderSection(contorniId, contorni, tabpaneInfo(contorniId), dispatch)}
                    {renderSection(dolciId, dolci, tabpaneInfo(dolciId), dispatch)}
                </Tabs>
            </div>)
    } else {
        return <span />
    }
}

export function renderSection(id, data, tabpane, dispatch) {
    let comp = (
        <div id={id} key={id}>
            <ul className="menuSection">
                {data.map((entry) => (
                    <li>
                        <div style={{ marginTop: "2px", marginBottom: "2px" }}>
                            <Card onClick={() => dispatch(actionAddToShoppingCart(entry))} className="buttonCard">
                                <Row justify="space-around" align="middle">
                                    <Col span={2}>
                                        <PlusCircleFilled />
                                    </Col>
                                    <Col span={17} style={{ paddingLeft: "1%" }}>
                                        <div style={{ paddingLeft: "5px" }}>{entry.nome}</div>
                                        <div style={{ paddingLeft: "20px", fontSize: '10px' }}>{entry.descrizione || "A long description of the product that makes it clear what it is" || "Cappelletti al tartufo con Scaglie di Tartufo (Nero)"}</div>
                                    </Col>
                                    <Col span={4}>
                                        <span style={{ paddingLeft: "10px" }}>{entry.prezzo}{'\u20AC'}</span>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
    if (tabpane)
        comp = (<TabPane tab={tabpane.title} key={tabpane.key}>
            {comp}
        </TabPane>)
    return comp
}

export default CustomMenu