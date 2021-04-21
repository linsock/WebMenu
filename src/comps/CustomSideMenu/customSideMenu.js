import { PlusCircleFilled } from "@ant-design/icons";
import {
    Card,
    Col,
    Row
} from "antd";
import React from 'react';
import { useDispatch } from 'react-redux';
import {
    cake,
    eggplant,
    soup,
    taco,
    tray
} from '../../assets/svg/icons';
import { actionAddToShoppingCart } from "../../reducers/order/actions";
import PageSideMenu, { buildPageSideEntry } from '../PageSideMenu/pageSideMenu';
import "./customSideMenu.css";

const mockValues = {
    antipasti: [{
        nome: "",
        prezzo: 0
    }],
    primi: [{
        nome: "",
        prezzo: 0
    }],
    secondi: [{
        nome: "",
        prezzo: 0
    }],
    contorni: [{
        nome: "",
        prezzo: 0
    }], dolci: [{
        nome: "",
        prezzo: 0
    }]
}

export function renderSection(id, data, dispatch) {
    let comp = (
        <div id={id} key={id} >
            <ul className="menuSection">
                {data.map((entry, i) => {
                    entry.TAG = id
                    return <li key={i}>
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
                })}
            </ul>
        </div>
    )
    return comp
}

const CustomSideMenu = (props) => {
    const dispatch = useDispatch()
    const { data } = props

    const { antipasti, primi, secondi, contorni, dolci } = data || mockValues
    const sections = [
        buildPageSideEntry(1, "Appetizers", [renderSection("APPETIZERS", antipasti, dispatch)], taco),
        buildPageSideEntry(2, "First dishes", [renderSection("FIRST DISHES", primi, dispatch)], soup),
        buildPageSideEntry(3, "Main courses", [renderSection("MAIN COURSES", secondi, dispatch)], tray),
        buildPageSideEntry(4, "Side Dishes", [renderSection("SIDE DISHES", contorni, dispatch)], eggplant),
        buildPageSideEntry(5, "Desserts", [renderSection("DESSERTS", dolci, dispatch)], cake)
    ]

    return <PageSideMenu sections={sections} />
}

export default CustomSideMenu