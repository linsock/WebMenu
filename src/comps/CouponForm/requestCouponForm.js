import {
    Checkbox,
    Form,
    Input,
    Modal,
    Row,
    Select
} from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionSetFormValidation } from '../../reducers/order/actions';
import { paymentGuard, sendMail } from '../../utils';
import HereMap from '../HereMap/hereMap';
import PaypalButton from '../PaypalPaymentButton/paypalButton';
import ActivityInformations from "../ActivityInfo/activityInformations"

function ServiceAgreements() {
    Modal.info({
        title: 'Terms of Service',
        content: (
            <div>
                <p>
                    Consent for the purpose of sending promotional communications 
                    (traditional ones and those referred to in art.130, paragraphs 1 and 2 of the Code).
                </p>
                <p>
                    Privacy Policy. Pursuant to Article 13 of Legislative Decree 196/2003 of the Code regarding the 
                    protection of personal data, we inform you that the data entered will be used exclusively for the 
                    performance of the requested service and will be processed in compliance with the law. cited above.
                    The data sent is processed at the YourCustomActivity activity, the data controller.
                </p>
            </div>
        ),
        onOk() { 
            // save compliance
        },
    });
}

const { Option } = Select;
const { TextArea } = Input


const CouponForm = () => {
    const dispatch = useDispatch()

    const { formValidation, shoppingCart } = useSelector(state => state.orders)
    const [prefix, setPrefix] = useState("+39")

    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };
    const labelStyle = {
        color: "white",
        fontWeight: "bold",
        textShadow: "1px -1px 1px #aba180"
    }
    const serviceAgreementStyle = {
        fontWeight: "bold",
        color: '#fff',
        textShadow: "#000 1px -2px 3px"
    }

    const prefixSelector = (
        // it, gb, sp, fr, de
        <Form.Item noStyle >
            <Select style={{ width: 70 }} defaultValue="+39" onChange={e => {
                setPrefix(e)
                dispatch(actionSetFormValidation({ phone: e + formValidation.phone.slice(3, formValidation.phone.length) }))
            }}>
                <Option value="+39" key="39">+39</Option>
                <Option value="+44" key="44">+44</Option>
                <Option value="+34" key="34">+34</Option>
                <Option value="+33" key="33">+33</Option>
                <Option value="+49" key="49">+49</Option>
            </Select>
        </Form.Item>
    );
    // sample fixed activity hours, managed wrt db side 
    const availableHours = [
        "12:00", "12:30",
        "13:00", "13:30",
        "14:00", "14:30",
        "15:00", "15:30",
        "18:00", "18:30",
        "19:00", "19:30",
        "20:00", "20:30",
        "21:00", "21:30",
        "22:00", "22:30", 
        "23:00",
    ]
    return (
        <>
            <div>
                <Form
                    {...layout}
                    form={form}
                    colon={false}
                    name="nest-messages"
                >
                    <Form.Item name={['user', 'name']} label={<label style={labelStyle}>Name :</label>} rules={[{ required: true, message: 'Your name is required to know who to deliver the order to' }]}>
                        <Input placeholder="The person to whom we will deliver"
                            onChange={e => {
                                dispatch(actionSetFormValidation({ name: e.target.value }))
                            }} />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label={<label style={labelStyle}>Email :</label>} rules={[{ type: 'email', required: true, message: 'The mail is used to provide you with updates on the order' }]}>
                        <Input placeholder="youremail@sample.it"
                            onChange={e => {
                                dispatch(actionSetFormValidation({ mail: e.target.value }))
                            }} />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label={<label style={labelStyle}>Telephone :</label>}
                        rules={[{ required: true, message: 'The phone number is used to contact you' }]}
                    >
                        <Input placeholder="Where we can contact you"
                            addonBefore={prefixSelector} style={{ width: '100%' }} onChange={e => {
                                dispatch(actionSetFormValidation({ phone: prefix + e.target.value }))
                            }} />
                    </Form.Item>
                    <Form.Item name={['user', 'notes']} label={<label style={labelStyle}>Note :</label>}>
                        <TextArea rows={4}
                            placeholder="Any information regarding your order 🙂"
                            onChange={e => {
                                dispatch(actionSetFormValidation({ notes: e.target.value }))
                            }} />
                    </Form.Item>
                    {formValidation.domicilio && <>
                        <Form.Item name="time" label={<label style={labelStyle} rules={[{ required: formValidation.domicilio }]}>Delivery time</label>}>
                            <Select onChange={val => dispatch(actionSetFormValidation({ time: val }))} placeholder="When you would like us to bring it to you">
                                {availableHours.map(v => <Option value={v}>{v}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="maps" label={<label style={labelStyle} required={formValidation.domicilio}>Where are you</label>}>
                            <HereMap />
                        </Form.Item>
                    </>}
                    <Form.Item
                        name="domicilio"
                        valuePropName="checked"
                        label={<label style={{ color: "white" }}></label>}
                        colon={false}
                    >
                        <Checkbox onClick={e => {
                            dispatch(actionSetFormValidation({ domicilio: e.target.checked }))
                        }}>
                            <span style={labelStyle}>I want home delivery</span>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item
                        name="accordo"
                        valuePropName="checked"
                        rules={[
                            { validator: (_, value) => { value ? Promise.resolve() : Promise.reject('To use the service it is necessary to accept the processing of personal data.') } },
                        ]}>
                        <Checkbox onClick={e => {
                            dispatch(actionSetFormValidation({ check: e.target.checked }))
                        }}>
                            <span style={labelStyle}>I have read the</span> <a style={serviceAgreementStyle} href="/#" onClick={(e) => {
                                e.preventDefault()
                                ServiceAgreements()
                            }}>Terms of Service</a>
                        </Checkbox>
                    </Form.Item>
                </Form>
            </div>
            {/* centered Paypal button */}
            <Row justify="center">
                <PaypalButton
                    guard={() => paymentGuard(formValidation)}
                    authorizedPaymentAction={
                        // send email using form data
                        (data) => {
                            const { name, mail, domicilio, location, time, notes } = formValidation
                            const tot = shoppingCart.map(v => v.prezzo).reduce((acc, item) => (acc + item), 0) + '\u20AC'
                            const ilmioordine = `\n=== YOUR ORDER ===\n${shoppingCart.map(v => `  - ${v.TAG.padEnd(11)} \\ ${v.nome}`).reduce((acc, v) => acc += `${v}\n`, "")}\n----------------------------------\n   Total paid order: ${tot}\n`
                            // Inizio testo del messaggio
                            let mailText = `The payment #${data.paymentID} about the order #${data.orderID} was successful.\n`
                            if (domicilio)
                                mailText += `Home delivery was requested at the address "${location.addr}" at "${time}".\n`
                            if (notes !== "")
                                mailText += `Your order notes: ${notes}\n`
                            mailText += ilmioordine
                            mailText += `The order is confirmed, for any additional information you can call the number: ${ActivityInformations.activityTelephone}\n`
                            mailText += `If you liked it, let us know with a review!😉\n`
                            sendMail({ nome: name, email: mail, appendText: mailText })
                        }} />
            </Row>
        </>
    );
};



export default CouponForm;
