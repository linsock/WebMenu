import paypal from 'paypal-checkout';
import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from "react-redux";
import { CREATE_PAYMENT_URL, EXECUTE_PAYMENT_URL } from "../../apiReferences";
import { buildPaymentItem } from '../../utils';

export default function PaypalButton(props) {
    const { shoppingCart } = useSelector(state => state.orders)
    // usare buildPaymentItem(*)
    const items = shoppingCart.map(v => buildPaymentItem(v.nome, v.nome, v.prezzo, 1, v.descrizione))
    const { guard, authorizedPaymentAction } = props

    const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

    const client = {
        production: 'f4oq2wuhfqiwubfquk4fbqowu4hfnqo24'
    };

    function payment() {
        return new paypal.Promise(function (resolve, reject) {
            fetch(CREATE_PAYMENT_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ // inoltrare i prodotti dal carrello redux
                    items: items
                })
            }).then((res) => res.json())
                .then((data) => {
                    resolve(data.id);
                })
                .catch((err) => { reject(err); })
        });
    }

    function onAuthorize(data, actions) {
        return new paypal.Promise(function (resolve, reject) {
            fetch(EXECUTE_PAYMENT_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentID: data.paymentID, payerID: data.payerID }),
            }).then((dat) => {
                console.log('payment is executed successfully');
                // CALLBACK EXECUTION - POST PAGAMENTO
                authorizedPaymentAction(data)
                // END
                resolve(data)
                actions.close()
            }).catch((err) => console.log(err))
        })
    }

    let comp = <PayPalButton env={'production'}
        style={{
            size: 'medium',
            label: "buynow"
        }}
        client={client}
        payment={payment}
        commit={true} //to show pay now button after login to paypal account
        onAuthorize={onAuthorize} />

    if (!guard())
        comp = <span />

    return comp
}