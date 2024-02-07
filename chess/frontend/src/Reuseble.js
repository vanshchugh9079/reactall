import { soundarr } from "./Soundarr";
export let turn = "white";
let arrowfunction = (color) => {
    let arrow = document.querySelector(".v-arrow")
    arrow.style.color = color
    if (color === "black") {
        arrow.classList.remove("fa-arrow-down")
        arrow.classList.add("fa-arrow-up")
    }
    else {
        arrow.classList.remove("fa-arrow-up")
        arrow.classList.add("fa-arrow-down")
    }
}
export let removeYellow = () => {
    let col = document.querySelector(".red-border");
    if(col)
    {
        col.classList.remove("red-border");
    }
    let yellow = document.querySelectorAll(".yellow-border");
    let green = document.querySelectorAll(".green-border");
   if(yellow.length>0)
   {
       yellow.forEach((element) => {
           if(element)
           element.classList.remove("yellow-border");
       });
   }

    green.forEach((element) => {
        if(element)
        element.classList.remove("green-border");
    });
};

export let pawnfunction = (row, col, color) => {
    if (turn !== color) {
        return;
    }
    const checkAndHighlight = (targetRow, targetCol) => {
        let targetSelector = `.row-${targetRow}.col-${targetCol}`;
        let targetElement = document.querySelector(targetSelector);
        if (targetElement) {

            if (targetElement.children.length === 0) {
                targetElement.classList.add("yellow-border");
            }
        }
    };
    let cutfunction = (cutrow, cutcol) => {
        let cutSelector = `.row-${cutrow}.col-${cutcol}`;
        let cutElement = document.querySelector(cutSelector);
        if (cutElement && cutElement.children.length !== 0 && cutElement.children[0].getAttribute("chessColor") !== color) {
            cutElement.classList.add("green-border");
        }
    }
    // Capture moves (diagonally)

    if ((row === 2) || (row === 7)) {
        // Two-square move on initial row
        for (let i = 1; i <= 2; i++) {
            checkAndHighlight(row + (color === "black" ? i : -i), col);
        }
    } else {
        checkAndHighlight(row + (color === "black" ? 1 : -1), col);
    }
    cutfunction(row + (color === "black" ? 1 : -1), col - 1);
    cutfunction(row + (color === "black" ? 1 : -1), col + 1);
    clickgreen(row, col)
    clickyellow(row, col)
};
export let bishopFunction = (row, col, color) => {
    if (turn !== color) {
        return;
    }

    const checkAndHighlight = (rowOffset, colOffset) => {
        let targetRow = row + rowOffset;
        let targetCol = col + colOffset;

        while (targetRow >= 1 && targetRow <= 8 && targetCol >= 1 && targetCol <= 8) {
            const targetElement = document.querySelector(`.row-${targetRow}.col-${targetCol}`);

            if (targetElement) {
                const isTargetOccupied = targetElement.children.length !== 0;
                const isOccupiedByOpponent = isTargetOccupied && targetElement.children[0].getAttribute("chessColor") !== color;

                if (isOccupiedByOpponent) {
                    targetElement.classList.add("green-border");
                    break;
                } else if (!isTargetOccupied) {
                    targetElement.classList.add("yellow-border");
                } else {
                    break; // Break if the target cell is occupied by a piece of the same color
                }
            }
            targetRow += rowOffset;
            targetCol += colOffset;
        }
    };
    let bishoparr = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    bishoparr.forEach(element => {
        checkAndHighlight(element[0], element[1])
    })
    clickyellow(row, col);
    clickgreen(row, col);
};
export let rookfunction = (row, col, color) => {
    if (turn !== color) {
        return;
    }

    const checkAndHighlight = (rowOffset, colOffset) => {
        let targetRow = row + rowOffset;
        let targetCol = col + colOffset;

        while (targetRow >= 1 && targetRow <= 8 && targetCol >= 1 && targetCol <= 8) {
            const targetElement = document.querySelector(`.row-${targetRow}.col-${targetCol}`);

            if (targetElement) {
                const isTargetOccupied = targetElement.children.length !== 0;
                const isOccupiedByOpponent = isTargetOccupied && targetElement.children[0].getAttribute("chessColor") !== color;

                if (isOccupiedByOpponent) {
                    targetElement.classList.add("green-border");
                    break;
                } else if (!isTargetOccupied) {
                    targetElement.classList.add("yellow-border");
                } else {
                    break;
                }
            }

            targetRow += rowOffset;
            targetCol += colOffset;
        }
    };

    // Check all possible moves (up, down, left, right)
    let rookarr = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    rookarr.forEach(element => {
        checkAndHighlight(element[0], element[1])
    })
        ;
    clickyellow(row, col);
    clickgreen(row, col);
};
export let knightfunction = (row, col, color) => {
    if (turn !== color) {
        return;
    }
    const checkAndHighlight = (rowOffset, colOffset) => {
        const targetRow = row + rowOffset;
        const targetCol = col + colOffset;

        if (targetRow >= 0 && targetRow < 8 && targetCol > 0 && targetCol <= 8) {
            const targetElement = document.querySelector(`.row-${targetRow}.col-${targetCol}`);

            if (targetElement) {
                const isTargetOccupied = targetElement.children.length !== 0;
                const isOccupiedByOpponent = isTargetOccupied && targetElement.children[0].getAttribute("chessColor") !== color;

                if (isOccupiedByOpponent) {
                    targetElement.classList.add("green-border");
                } else if (!isTargetOccupied) {
                    targetElement.classList.add("yellow-border");
                }
            }
        }
    };
    let knightarr = [[-2, 1], [-2, -1], [-1, 2], [-1, -2], [2, 1], [2, -1], [1, 2], [1, -2]]
    knightarr.forEach(element => {
        checkAndHighlight(element[0], element[1])
    })
    clickyellow(row, col)
    clickgreen(row, col)
};
export let queenFunction = (row, col, color) => {
    rookfunction(row, col, color)
    bishopFunction(row, col, color)
}
export let kingFunction = (row, col, color) => {
    if (turn !== color) {
        return;
    }
    const checkAndHighlight = (rowOffset, colOffset) => {
        const targetRow = row + rowOffset;
        const targetCol = col + colOffset;

        if (targetRow >= 0 && targetRow < 8 && targetCol > 0 && targetCol <= 8) {
            const targetElement = document.querySelector(`.row-${targetRow}.col-${targetCol}`);

            if (targetElement) {
                const isTargetOccupied = targetElement.children.length !== 0;
                const isOccupiedByOpponent = isTargetOccupied && targetElement.children[0].getAttribute("chessColor") !== color;

                if (isOccupiedByOpponent) {
                    targetElement.classList.add("green-border");
                } else if (!isTargetOccupied) {
                    targetElement.classList.add("yellow-border");
                }
            }
        }
    };
    let allhighlterloop = [[1, 0], [1, 1], [1, -1], [0, 1], [0, -1], [-1, 0], [-1, 1], [-1, -1]]
    allhighlterloop.forEach(element => {
        checkAndHighlight(element[0], element[1])
    })
    clickyellow(row, col)
    clickgreen(row, col)

}

let clickyellow = (row, col) => {
    let sourceElement = document.querySelector(`.row-${row}.col-${col}`)
    let onClickYellow = document.querySelectorAll(".yellow-border")
    if (sourceElement&& sourceElement.children[0] ) {
       onClickYellow.forEach((element) => {
       element.addEventListener("click", (e) => {
                element.append( sourceElement.children[0].cloneNode(true))
                sourceElement.children[0].remove()
                soundarr[0].currentTime = 0
                soundarr[0].play()
                endTurn()
            })
        })
    }
}
let clickgreen = (row, col) => {
    let onClickGreen = document.querySelectorAll(".green-border")
    onClickGreen.forEach(element => {
        element.addEventListener("click", () => {
            let sourceElement = document.querySelector(`.row-${row}.col-${col}`)
            if (sourceElement && sourceElement.children[0] !== undefined) {
                let clickelementcolor = element.children[0].getAttribute("chessColor")
                let sidetarget = clickelementcolor === "white" ? 0 : 1;
                let sidebar = document.querySelectorAll(".v-side")[sidetarget]
                let clickgreenelement = element.children[0]
                clickgreenelement.remove();
                sidebar.append(clickgreenelement)
                element.append(sourceElement.children[0].cloneNode(true))
                let sidebararr = Array.from(sidebar.children)
                sidebararr.forEach((element) => {
                    element.classList.add("fs-3")
                })
                sourceElement.children[0].remove()
                soundarr[1].currentTime = 0
                soundarr[1].play()
                endTurn()
            }
        })
    })
}
export  function endTurn() {
    turn = turn === "white" ? "black" : "white";
    arrowfunction(turn)
}

//     let kingrowstr = [...document.querySelectorAll(`.fa-chess-king`)]
//     let king=[]
//     kingrowstr.forEach(element => {
//         king.push(
//             {
//                 row:parseInt(element.parentElement.classList[3].split("-")[1]) ,
//                 col:parseInt(element.parentElement.classList[4].split("-")[1]),
//                 color:element.getAttribute("chessColor")
//             }
//         )
//     })
//     let oppositelement=[]
//     king.forEach(element => {
   
//         const checkAndHighlight = (rowOffset, colOffset) => {
//           let targetRow = element.row + rowOffset;
//             let targetCol = element.col + colOffset;
    
//             while (targetRow >= 1 && targetRow <= 8 && targetCol >= 1 && targetCol <= 8) {
//                 const targetElement = document.querySelector(`.row-${targetRow}.col-${targetCol}`);   
//                 targetRow += rowOffset;
//                 targetCol += colOffset;
//                 if (targetElement.children[0] &&targetElement.children[0].getAttribute("chessColor")!==element.color)
//                 {  
//                    oppositelement.push(targetElement)
//                 }
//             }
//         };
//         let bishoparr = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
//         let rookarr = [[-1, 0], [1, 0], [0, -1], [0, 1]]
//         let kingarr=[...bishoparr,...rookarr]
         
//         kingarr.forEach(element => {
//             checkAndHighlight(element[0], element[1])
//         })
//     })
// }  
