const { createAction } = require("@reduxjs/toolkit");

const actionOrderSetState = createAction("ORDERS/set_state")
const actionAddToShoppingCart = createAction("ORDERS/add_to_shopping_cart")
const actionRemoveFromShoppingCart = createAction("ORDERS/remove_from_shopping_cart")
const actionSetFormValidation = createAction("ORDERS/set_form_validation")

export {
    actionOrderSetState,
    actionAddToShoppingCart,
    actionRemoveFromShoppingCart,
    actionSetFormValidation
};
