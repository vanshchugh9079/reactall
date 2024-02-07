import React from 'react'
import place from './Allhelp'
import MusicBar from '../component/MusicBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
export default function Music() {
  return (
    <div className='v_music m-0 p-0'>
      <Link to="/" className='position-absolute d-block w-100 v-cross m-0 p-0  text-danger d-flex justify-content-end' title="click to go Home">
        <FontAwesomeIcon icon={faX} className="me-4 mt-2" size="2xl" />
      </Link>
      <img src={place} className='m-0 p-0'></img>
      <MusicBar />
    </div>
  )
}
