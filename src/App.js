import { Badge, Col, Row } from "antd";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { epDescription, epMenu } from "./apiReferences";
import "./App.less";
import CouponForm from "./comps/CouponForm/lazy";
import CustomSideMenu from "./comps/CustomSideMenu/lazy";
import ShoppingCart from "./comps/ShoppingCart/lazy";
import SlidingPictures from './comps/SlidingPictures/lazy';

async function getData(callback) {
  let response = await fetch(epMenu)
  let data = await response.json()
  callback(data)
}

async function getDescription(callback) {
  let response = await fetch(epDescription)
  let data = await response.text()
  callback(data)
}

const App = () => {

  const [data, setData] = useState()
  const [description, setDescription] = useState()
  const { shoppingCart } = useSelector(state => state.orders)

  useEffect(() => {
    // recupera i dati dal server
    getData(setData)
    getDescription(setDescription)
  }, [])

  return (
    /* eslint-disable */
    <div>
      <Row justify="end" style={{
        paddingRight: "20%",
        paddingTop: "4%"
      }}>
        <Col span={2}>
          <Badge count={shoppingCart.length}>
            <ShoppingCart />
          </Badge>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={8}>
          <SlidingPictures />
        </Col>
      </Row>
      <div>
        {/* idealmente, qui getOfferContent dal server */}
        <div className="description">
          {description}
        </div>
        <div style={{ zIndex: "1" }}>
          <CustomSideMenu data={data} />
        </div>
      </div>
      <div style={{ marginRight: "20%", marginLeft: "20%", marginTop: "1%" }}>
        {/* qui, al submit invio dati al server ed interazione con paypal */}
        <CouponForm />
      </div>
    </div>
  )
};

export default App;
