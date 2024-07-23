import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logger } from "@utils/logger";
import { ConnectFourStateInterface, InsertChipInterface } from "@interfaces/ConnectFourInterface";

const initialState: ConnectFourStateInterface = {
    playerOneColor: "red",
    playerTwoColor: "blue",
    winner: 0,
    currentPlayer: 1,
    currentMatrix: [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ],
    history: [],
};

export const ConnectFourSlice = createSlice({
    name: "ConnectFour",
    initialState,
    reducers: {
        insertChip: (state, action: PayloadAction<InsertChipInterface>) => {
            logger.info("insertChip: ", action.payload);
            for (let index = 0; index < state.currentMatrix[action.payload.col].length; index++) {
                const value = state.currentMatrix[action.payload.col][index];
                if (value === 0) {
                    state.currentMatrix[action.payload.col][index] = action.payload.player;
                    state.currentPlayer = action.payload.player === 1 ? 2 : 1;
                    break;
                }
            }
            state.winner = getWinner(state.currentMatrix);
        },
        newGame: (state, action: PayloadAction<void>) => {
            logger.info("newGame");
            if (state.winner !== 0) {
                state.history = [...state.history, {
                    winner: state.winner,
                    date: new Date(),
                    matrix: state.currentMatrix
                }];
            }
            state.winner = 0;
            state.currentMatrix = [
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0]
            ];
            state.currentPlayer = 1;
        },
    },
});

function getWinner(matrix: number[][]) {
  // Check rows
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length - 3; col++) {
      if (
        matrix[row][col] !== 0 &&
        matrix[row][col] === matrix[row][col + 1] &&
        matrix[row][col] === matrix[row][col + 2] &&
        matrix[row][col] === matrix[row][col + 3]
      ) {
        return matrix[row][col];
      }
    }
  }

  // Check columns
  for (let col = 0; col < matrix[0].length; col++) {
    for (let row = 0; row < matrix.length - 3; row++) {
      if (
        matrix[row][col] !== 0 &&
        matrix[row][col] === matrix[row + 1][col] &&
        matrix[row][col] === matrix[row + 2][col] &&
        matrix[row][col] === matrix[row + 3][col]
      ) {
        return matrix[row][col];
      }
    }
  }

  // Check diagonals (top-left to bottom-right)
  for (let row = 0; row < matrix.length - 3; row++) {
    for (let col = 0; col < matrix[0].length - 3; col++) {
      if (
        matrix[row][col] !== 0 &&
        matrix[row][col] === matrix[row + 1][col + 1] &&
        matrix[row][col] === matrix[row + 2][col + 2] &&
        matrix[row][col] === matrix[row + 3][col + 3]
      ) {
        return matrix[row][col];
      }
    }
  }

  // Check diagonals (bottom-left to top-right)
  for (let row = 3; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length - 3; col++) {
      if (
        matrix[row][col] !== 0 &&
        matrix[row][col] === matrix[row - 1][col + 1] &&
        matrix[row][col] === matrix[row - 2][col + 2] &&
        matrix[row][col] === matrix[row - 3][col + 3]
      ) {
        return matrix[row][col];
      }
    }
  }

  // No winner
  return 0;
}


export const { insertChip, newGame } = ConnectFourSlice.actions;

export default ConnectFourSlice.reducer;
