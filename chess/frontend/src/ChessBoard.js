import React, { createContext } from 'react'
import ChessRow from "./ChessRow.js"
export default function ChessBoard() {
  let row = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
      <div className='d-flex'>
      <div className='bg-success v-side mt-1 d-flex align-items-center gap-2 m-0 p-0 flex-column'></div>
      <div className='v-chessboard mt-1'>
        {
          row.map(i =>
            <ChessRow row={i} />
          )
        }
      </div>
      <div className='bg-success v-side mt-1 d-flex align-items-center gap-2 m-0 p-0 flex-column'></div>
      </div>
  )
}
