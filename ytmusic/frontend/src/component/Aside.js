import React from 'react'
import {faCompass, faHouse, faMusic, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Aside() {
    let arr = [
        {
            name: "HOME",
            type: faHouse,
            src:""
        }, {
            name: "EXPLORE",
            type: faCompass
            ,src:""
        }, {
            name: "liabrary",
            type: faMusic
            ,src:""
        },
        {
            name: "Sign in",
            type:faUser,
            src:"/login"
        }]
  return (
    <aside className="col-1  v-aside position-fixed">
    <div className="v-aside_el">
        {
            arr.map((element) => (
                <Link to={element.src} className='text-decoration-none text-center text-white d-block cursor-pointer m-auto p-0 '>
                    <FontAwesomeIcon icon={element.type} size="2xl" className='m-0 p-0  text-center' />
                    <p className='text-center'>{element.name}</p>
                </Link>
            ))
        }
    </div>
</aside>
  )
}
