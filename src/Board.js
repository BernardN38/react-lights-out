import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {
    console.log(coord, board);
    setBoard((oldBoard) => {
      const { y, x } = coord;

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        console.log(x, y);
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      const boardCopy = oldBoard.map((row) => [...row]);
      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;
      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      row.push(
        <Cell
          key={x+y*5}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround({x:x,y:y})}
        />
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }
  // TODO
  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  );
}

export default Board;
