import { hash } from "../../utils";
import {
    actionAddToShoppingCart,
    actionOrderSetState,
    actionRemoveFromShoppingCart,
    actionSetFormValidation
} from './actions';

const initialState = {
    shoppingCart: [],
    formValidation: { check: false, name: "", mail: "", phone: "", location: { lat: "0", lng: "0", addr: "" }, domicilio: false, time: "", notes: "" }
}

export default function ordersReducer(state = initialState, action) {
    switch (action.type) {
        case actionOrderSetState.toString(): {
            return {
                ...state,
                ...action.payload
            }
        }
        case actionAddToShoppingCart.toString(): {
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.payload]
            }
        }
        case actionRemoveFromShoppingCart.toString(): {
            const check = hash(action.payload)
            const cart = state.shoppingCart.filter(v => hash(v.nome) !== check)
            return {
                ...state,
                shoppingCart: cart
            }
        }
        case actionSetFormValidation.toString(): {
            return {
                ...state,
                formValidation: { ...state.formValidation, ...action.payload }
            }
        }
        default:
            return state
    }
}