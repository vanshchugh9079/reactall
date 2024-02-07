import { faChessKing } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function King({row,col}) {
  return (
    <>
      <FontAwesomeIcon icon={faChessKing} size="3x" style={{color:`${row===8?"#d2d6bd":"#454545"} `}} chessColor={`${row===8?"white":"black"}`}  />
    </>
  )
}
