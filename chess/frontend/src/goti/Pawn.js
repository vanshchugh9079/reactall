import { faChessPawn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Pawn({row,col}) {
  return (
    <FontAwesomeIcon icon={faChessPawn} size="3x"  style={{color:`${row===7?"#d2d6bd":"#454545"} `}} chessColor={`${row===7?"white":"black"}`} />
    )
}

