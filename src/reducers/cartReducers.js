import { ADD_TO_CART , REMOVE_ITEM_CART,SAVE_SHIPPING_INFO,CLEAR_CART,

    SADD_TO_CART , SREMOVE_ITEM_CART,SSAVE_SHIPPING_INFO,SCLEAR_CART


} from '../constants/cartConstants'



export const cartReducer = (state = { cartItems: [], shippingInfo: {}  }, action) => {

    console.log(state.cartItems)

    switch (action.type) {
        case CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }

        case SAVE_SHIPPING_INFO:

            return {

                ...state,

                shippingInfo: action.payload

            }


        case REMOVE_ITEM_CART:

            return {

                ...state,

                cartItems: state.cartItems.filter(i => i.product !== action.payload)

            }
        

        case ADD_TO_CART:

            const item = action.payload;



            const isItemExist = state.cartItems.find(i => i.product === item.product)



            if (isItemExist) {

                return {

                    ...state,

                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)

                }

            } else {

                return {

                    ...state,

                    cartItems: [...state.cartItems, item]

                }

            }

        default:

            return state

    }

    

}


export const scartReducer = (state = { scartItems: [] ,sshippingInfo: {} }, action) => {

    console.log(state.scartItems)

    switch (action.type) {
        case SCLEAR_CART:
            return {
                ...state,
                scartItems: []
            }

        case SSAVE_SHIPPING_INFO:

            return {

                ...state,

                sshippingInfo: action.payload

            }


        case SREMOVE_ITEM_CART:

            return {

                ...state,

                scartItems: state.scartItems.filter(i => i.service !== action.payload)

            }
        

        case SADD_TO_CART:

            const sitem = action.payload;



            const isItemExist = state.scartItems.find(i => i.service === sitem.service)



            if (isItemExist) {

                return {

                    ...state,

                    scartItems: state.scartItems.map(i => i.service === isItemExist.service ? sitem : i)

                }

            } else {

                return {

                    ...state,

                   scartItems: [...state.scartItems, sitem]

                }

            }

        default:

            return state

    }

    

}