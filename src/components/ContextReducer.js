import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();      //global State !!
const CartDispatchContext = createContext();

const reducer = (state, action) => {

    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        // yaha hamne return me aik to  purani state aur additional data append kardiya !!

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "DROP":
            let empArray = []
            return empArray

        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    //console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr

        default:
            console.log("error in reducer");
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])  //  initial state will be an empty array, kyoki cart ko starting me khali rakhna hai   !!
    return (

        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>

    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);