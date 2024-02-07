import { faChessKnight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Knight({row,col}) {
  return (
    <>
      <FontAwesomeIcon icon={faChessKnight} size="3x" style={{color:`${row===8?"#d2d6bd":"#454545"} `}} chessColor={`${row===8?"white":"black"}`} />
    </>
  )
}
