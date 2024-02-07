import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Form, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from "../assest/img/logo.svg"; // Ensure correct path to the logo image

export default function Navigation() {
  return (
    <Nav className='v-nav d-flex align-items-center fixed-top'>
                <a className='text-decoration-none v_link text-white d-block d-block p-0 text-center cursor-pointer' href="#">
                    <FontAwesomeIcon icon={faBars} size="2xl" className='p-0' />
                </a>
                <img src={Logo} height="30px" alt="Logo" className='ms-1'></img>
                <div className='d-inline-block ms-5 v-searchbox'>
                    <button className='v-btn d-inline'>🔍</button>
                    <Form.Control
                        // Set the input type as textarea
                        className=" d-inline rounded-0 v-search"
                        placeholder='Search Song ,Artist,Playlist,Podcasts'
                        style={{ color: 'white', background: "black", resize: "none" }}
                    />
                </div>
                <span className='fw-bold fs-3 ms-auto me-3 text-white cursor-pointer'>⁝</span>
                <Link className="btn text-black bg-white me-5 v-sign" to="/login" >Sign in</Link>
            </Nav>
  )
}
