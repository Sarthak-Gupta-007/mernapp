import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart'
import { Badge } from 'react-bootstrap';
import { useCart } from './ContextReducer';

const Navbar = () => {

    const [cartView, setCartView] = useState(false);

    let data = useCart();
    let len = data.length;

    const navigate = useNavigate();
    const handlelogout = () => {

        localStorage.removeItem("authToken")
        navigate("/login");
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-success">
                <div class="container-fluid">
                    <Link class="navbar-brand fs-1 fst-italic" to="#">GoFood</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <Link class="nav-link active fs-5 fw-bolder  " aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?

                                <li class="nav-item">
                                    <Link class="nav-link active fs-5 fw-bolder  " aria-current="page" to="/">My Orders</Link>
                                </li>
                                : ""}
                        </ul>


                        {(!localStorage.getItem("authToken")) ?
                            <div className='d-flex'>
                                <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                                <Link class="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
                            </div>
                            :
                            <div>
                                <div className='btn bg-white fw-bolder text-success mx-2' onClick={() => { setCartView(true) }}>
                                    MY CART{"  "}
                                    {
                                        data.length>0 &&
                                        <Badge pill bg="danger">{data.length}</Badge>
                                    }
                                </div>
                                {cartView ? <Modal onClose={() => setCartView(false)} ><Cart /></Modal> : null}
                                <div className='btn bg-white fw-bolder text-danger mx-2' onClick={handlelogout}>
                                    LOGOUT
                                </div>
                            </div>

                        }

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
