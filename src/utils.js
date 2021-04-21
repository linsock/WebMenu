import axios from "axios";
import { useEffect, useState } from 'react';
import { SEND_MAIL_URL } from './apiReferences';

// Hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function paymentGuard(form) {
    return form.check &&
        form.name !== "" &&
        form.mail !== "" &&
        validateEmail(form.mail) &&
        form.phone
}

function hash(str) {
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function buildPaymentItem(name, sku, price, quantity, description) {
    return {
        name,
        sku,
        price,
        currency: 'EUR',
        quantity,
        description,
        tax: '0.00'
    }
}

// call server service to send mail 
function sendMail(body, successCallback = console.log, errorCallback = console.log) {
    axios.post(SEND_MAIL_URL, body).then(data => {
        successCallback(data)
    }).catch(err => {
        errorCallback(err)
    });
}

const postData = axios.post

export { useWindowSize, paymentGuard, hash, buildPaymentItem, postData, sendMail };
