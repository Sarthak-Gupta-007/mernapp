// src="https://source.unsplash.com/random/?peace"

import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { useCart, useDispatchCart } from './ContextReducer'
const Card = (props) => {

    let dispatch = useDispatchCart();
    let data = useCart();

    const priceRef = useRef();

    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("")

    const addtocart = async () => {

        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }

        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })

        console.log(data)
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {

        setSize(priceRef.current.value)

    }, [])

    return (
        <>
            <div className="card mt-3" style={{ "width": "16 rem", "maxHeight": "360px" }}>
                <img style={{ height: "120px", objectFit: "fill" }} src={props.foodItem.img} className="card-img-top" alt="..." />
                {/* <img style={{height:170,width: 285}} src='Images/hello.jpg' className="card-img-top" alt="..." /> */}
                <div className="card-body">

                    <h5 className="card-title">{props.foodItem.name}</h5>

                    <div className='container w-100'>

                        <div>
                            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>

                            <select className=' m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>

                                })}
                            </select>

                        </div>

                        <div>
                            <div className='d-inline h-100 fs-5'>Rs.{finalPrice}/-</div>
                        </div>
                    </div>
                    <hr></hr>
                    <button className='btn btn-success justify-center ms-2' onClick={addtocart}>Add to Cart</button>


                </div>
            </div>


        </>
    )
}

export default Card
