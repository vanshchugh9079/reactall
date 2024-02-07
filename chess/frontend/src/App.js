import React from 'react'
import ChessBoard from './ChessBoard'
import Arrow from './Arrow'

export default function App() {
  return (
    <div className='d-flex justify-content-between'>
      <Arrow/>
      <ChessBoard />
      <div></div>
    </div>
  )
}
