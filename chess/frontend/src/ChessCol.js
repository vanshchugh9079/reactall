import React from 'react';
import { Col } from 'react-bootstrap';
import { bishopFunction,  kingFunction, knightfunction, pawnfunction, queenFunction, removeYellow, rookfunction } from './Reuseble';
import Pawn from './goti/Pawn';
import Bishop from './goti/Bishop';
import Rook from './goti/Rook';
import Knight from './goti/Knight';
import Queen from './goti/Queen';
import King from './goti/King';

export default function ChessCol({ row, col }) {
  const isOddRow = row % 2 !== 0;
  const isOddCol = col % 2 !== 0;
  const squareColor = isOddRow ? (isOddCol ? "white" : "black") : (isOddCol ? "black" : "white");
  let pawnrow = row === 2 || row === 7;
  let bishoprowcol = (row === 1 && (col === 6 || col === 3)) || (row === 8 && (col === 6 || col === 3))
  let rookrowcol = (row === 1 && (col === 1 || col === 8)) || (row === 8 && (col === 1 || col === 8))
  let knightrowcol = (row === 1 && (col === 2 || col === 7)) || (row === 8 && (col === 2 || col === 7))
  let queenrowcol = (row === 1 && col === 4) || (row === 8 && col === 4)
  let Kingrowcol = (row === 1 && col === 5) || (row === 8 && col === 5)
  const handleClick =  () => {
    console.log(document.querySelectorAll(".yellow-border"));
    removeYellow()
    let clickcol = document.querySelector(`.row-${row}.col-${col}`)
    if (clickcol) {
      clickcol.classList.add("red-border")
    }
    if (clickcol.children[0]) {
      let color = clickcol.children[0].getAttribute("chessColor")
      if (clickcol.children[0].classList.contains("fa-chess-pawn")) {
        pawnfunction(row, col, color)
      }
      if (clickcol.children[0].classList.contains("fa-chess-bishop")) {
        bishopFunction(row, col, color)
      }
      if (clickcol.children[0].classList.contains("fa-chess-rook")) {
        removeYellow()
        rookfunction(row, col, color)
      }
      if (clickcol.children[0].classList.contains("fa-chess-knight")) {
        knightfunction(row, col, color)
      }
      if (clickcol.children[0].classList.contains("fa-chess-queen")) {
        queenFunction(row, col, color)
      }
      if (clickcol.children[0].classList.contains("fa-chess-king")) {
        kingFunction(row, col, color)
      }
    }
    

  };

  return (
    <Col
      className={`v-col m-0 p-0 row-${row} col-${col}  ${squareColor}  d-flex justify-content-center align-items-center`}
      onClick={handleClick}



    >
      {pawnrow && <Pawn row={row}
        col={col} />}
      {
        bishoprowcol &&
        <Bishop row={row} col={col} />
      }
      {
        rookrowcol &&
        <Rook row={row} col={col} />
      }
      {
        knightrowcol &&
        <Knight row={row} col={col} />
      }
      {
        queenrowcol &&
        <Queen row={row} col={col} />
      }
      {
        Kingrowcol &&
        <King row={row} col={col} />
      }
    </Col>
  );
}
