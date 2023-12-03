import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import IKONIC from "../assets/ikonic.jpeg"
import { useSelector } from "react-redux"
import { BiLogOut } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";

const Navbar = () => {
    const navigate = useNavigate()

    const authState = useSelector((state) => state?.auth)

    const logout = async() => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload(true);
            navigate("/")
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-navbar">
            <div className="container-fluid mx-5 justify-content-between">
                <div className='d-flex gap-3'>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to={"/"} className="navbar-brand d-flex align-items-center" href="#">
                        <img className='navbar-logo' src={IKONIC} alt="" />
                        <p className='mb-0'>IKONIC</p>
                    </Link>

                </div>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link active">All Posts</Link>
                        </li>
                        {authState?.user?.role === "admin" && 
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link" href="#">Admin Panel</Link>
                        </li>}
                        {authState?.user && <li className="nav-item">
                            <Link to={"/view-my-posts"} className="nav-link" href="#">View My Posts</Link>
                        </li>}
                    </ul>
                </div>
                <div>
                {
                        authState?.user === null ? (
                            <ul className='navbar-nav'>
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link active">Sign in</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/signup"} className="nav-link" href="#">Sign up</Link>
                                </li>
                            </ul>
                        ) : (
                            <div className='mb-0 text-white d-flex gap-2 mt-4 mt-sm-0'><span>Welcome,</span>
                                <div className="dropdown">
                                    <p className="dropdown-toggle text-primary text-capitalize mb-0 fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {authState?.user?.firstname + " " + authState?.user?.lastname}
                                    </p>
                                    <ul className="dropdown-menu" style={{left:"-42px"}} aria-labelledby="dropdownMenuButton1">
                                        <Link to={"/post"} className='dropdown-item'>
                                        <button className="btn p-0 d-flex align-items-center gap-2"><IoIosCreate className='fs-4'/>Create New Post</button>
                                        </Link>
                                        <button className="dropdown-item d-flex align-items-center gap-2" onClick={logout}><BiLogOut className='fs-4'/> Sign out</button>
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>)
}

export default Navbar