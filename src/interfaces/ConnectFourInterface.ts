export interface ConnectFourStateInterface {
    playerOneColor: string;
    playerTwoColor: string;
    winner: number;
    currentPlayer: number;
    currentMatrix: number[][];
    history: ConnectFourHistoryInterface[];
}

export interface ConnectFourHistoryInterface {
    winner: number;
    date: Date;
    matrix: number[][];
}

export interface InsertChipInterface {
    player: number;
    col: number;
}
