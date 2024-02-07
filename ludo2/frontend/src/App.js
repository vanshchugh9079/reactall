import React, { useEffect, useState } from 'react';
import dicegif from "./img/dicegif.gif"
import './index.css';
import one from "./img/oneorg.png"
import two from "./img/twoorg.png"
import three from "./img/three org.png"
import four from "./img/fourorg.png"
import five from "./img/fiveorg.png"
import six from "./img/sixorg.png"
import bluegoti from "./img/bluegoti.png"
import greengoti from "./img/greengoti.png"
import redgoti from "./img/redgoti.png"
import yellowgoti from "./img/yellowgoti.png"
export default function App() {
  let [row, setRow] = useState([1, 2, 3]);
  let column = [1, 2, 3];
  let boxColor = ['red', 'green', 'blue', 'yellow'];
  let sixcol = [1, 2, 3, 4, 5, 6]
  let [dicerandom, setdicerandom] = useState(1)
  let [showgif, setshowgif] = useState(false)
  let [turn, setturn] = useState("blue turn")
  useEffect(() => {
    let redgoticlass = document.querySelectorAll(".red-goti")
    let greengoticlass = document.querySelectorAll(".green-goti")
    let bluegoticlass = document.querySelectorAll(".blue-goti")
    let yellowgoticlass = document.querySelectorAll(".yellow-goti")
    redgoticlass.forEach((element) => {
      element.innerHTML = `<div class="bg-light v_token d-flex justify-content-center align-items-center rounded-circle"><img src=${redgoti} alt="red-goti" height="33px" width="33px"></img></div>`
    })
    greengoticlass.forEach((element) => {
      element.innerHTML = `<div class="bg-light v_token d-flex justify-content-center align-items-center rounded-circle"><img src=${greengoti} alt="red-goti" height="33px" width="33px"></img></div>`
    })
    bluegoticlass.forEach((element) => {
      element.innerHTML = `<div class="bg-light v_token d-flex justify-content-center align-items-center rounded-circle"><img src=${bluegoti} alt="red-goti" height="33px" width="33px"></img></div>`
    })
    yellowgoticlass.forEach((element) => {
      element.innerHTML = `<div class="bg-light v_token d-flex justify-content-center align-items-center rounded-circle"><img src=${yellowgoti} alt="red-goti" height="33px" width="33px"></img></div>`
    })
  }, [])
  let dice = () => {
    setshowgif(true)
    const min = 1;
    const max = 6;
    let random = Math.floor((Math.random()) * (max - min + 1) + min)
    setTimeout(() => {
      setdicerandom(random);
      setshowgif(false)
    }, 700)
  }
  return (
    <>
      <div className="d-flex">
        <h1 className='v_turn'>{turn}</h1>
        <div className="container-fluid  d-flex align-items-center flex-column">
          {row.map((element, id) => (
            <div key={id} className={`row ${(id === 1) ? 'row main-r' : `v_row1 temp-border`}`}>
              {
                column.map((col, colId) => (
                  <>
                    <div key={colId} className={`col-${(colId === 1) ? `2` : '5'} temp-border ${(id === 0 && colId === 0) ? "red " : ""} ${(id === 0 && colId === 2) ? "green" : ""} ${(id === 2 && colId === 0) ? "blue" : ""} ${(id === 2 && colId === 2) ? "yellow" : ""} `}>
                      <div className='d-flex justify-content-center align-items-center'>
                        {
                          id === 1 && colId === 1 && showgif === false &&
                          <img src={`${(dicerandom === 1) ? one : ""} ${(dicerandom === 2) ? two : ""} ${(dicerandom === 3) ? three : ""} ${(dicerandom === 4) ? four : ""} ${(dicerandom === 5) ? five : ""} ${(dicerandom === 6) ? six : ""}`} height="90px" width="90px" onClick={dice}></img>
                        }
                        {
                          id === 1 && colId === 1 && showgif === true &&
                          <img src={`${dicegif}`} height="90px" width="90px"></img>
                        }
                      </div>
                      {
                        element !== 2 && colId !== 1 &&
                        <div className='v_box d-flex flex-wrap'>
                          {
                            boxColor.map((element) => (
                              <div className={`rounded-circle v_circle d-flex justify-content-center align-items-center
                           ${(id === 0 && colId === 0) ? "red red-goti" : ""} ${(id === 0 && colId === 2) ? "green green-goti" : ""} ${(id === 2 && colId === 0) ? "blue blue-goti" : ""} ${(id === 2 && colId === 2) ? "yellow yellow-goti" : ""}  h-c ms-3 mt-2`}></div>
                            ))
                          }
                        </div>
                      }
                      {
                        element !== 2 && colId === 1 &&
                        sixcol.map((sixrowel, sixrowid) => (
                          <div className='row temp-border m_row' key={sixrowid}>
                            {
                              column.map((colel, colId) => {

                                return (
                                  <>
                                    <div className='col m_col temp-border' key={colId}></div>
                                  </>
                                )
                              }

                              )
                            }
                          </div>
                        ))
                      }
                      {
                        element === 2 &&
                        column.map((secrow, secrowid) => (
                          <div key={secrowid} className={`${(colId === 1) ? "" : "row main-h temp-border"}`}>
                            {
                              sixcol.map((sixcolel, sixcolid) => (
                                <div className={`${(colId === 1) ? "" : "col temp-border main-w"}`} key={sixcolid}>

                                </div>
                              )
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                  </>
                ))
              }
            </div>
          ))}

        </div>
      </div>
    </>
  );
}