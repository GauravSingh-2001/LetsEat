import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useCart, useDispatchCart } from './ContextReducer'
export default function Card(props) {
    let dispatch = useDispatchCart();
    let options = props.options;
    let data = useCart()
    let foodItem = props.item;
    let priceRef = useRef();
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const handleAddToCart = async () => {
        let food = [];
        for(const item of data){
            if(item.id === props.foodItem._id){
                food = item;

                break;
            }
        }
        if (food.length !== 0) {
            if (food.size === size) {
              await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
              return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
              }
              return
            }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "160px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        {/* <p className="card-text">Some food item here.</p> */}
                        {/* below we are making a drop down menu*/}
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success bg-gradient rounded' onChange={(e) => setQty(parseInt(e.target.value))}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success bg-gradient rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>₹{finalPrice}/-
                            </div>
                        </div>
                        <hr>
                        </hr>
                        <button className={'btn btn-success justify-cneter ms-2'} onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
