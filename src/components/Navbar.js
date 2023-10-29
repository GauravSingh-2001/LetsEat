import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar() {
    const navigate = useNavigate();
    const [cartView, setCartView] = useState(false)
    const handlelogout = () => {
        localStorage.removeItem("authtoken");
        navigate("/")
    }
    //added latter
    const loadCart = () => {
        setCartView(true)
    }
    //till here
    let data = useCart();
    return (
        <div>
            {/* below line can be used to change the appearence of navbar see bootstrap */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3 fst-italic fw-bold" to="/">LetsEat</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authtoken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                                </li> : ""
                            }
                        </ul>
                        {(!localStorage.getItem("authtoken")) ?
                            <form className='d-flex'>
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
                            </form>
                            :
                            <div>
                                <div className='btn bg-white text-success mx-2' onClick={() => loadCart()}>
                                    {/* My Cart{" "} */}
                                    {/* {<Badge pill bg="danger">{data.length}</Badge>} */}
                                    <Badge color="secondary" badgeContent={data.length} >
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div>
                                {cartView ? <Modal onClose={() => setCartView(false)} ><Cart></Cart></Modal> : ""}
                                <button className="btn bg-white text-danger mx-2" onClick={handlelogout}>Logout</button>
                            </div>
                        }
                    </div>
                </div>
            </nav >
        </div >
    )
}

