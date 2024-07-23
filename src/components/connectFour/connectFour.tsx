import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { insertChip, newGame } from "@store/reducers/ConnectFourReducer";

export function ConnectFour() {
	const dispatch = useAppDispatch();
	const currentPlayer = useAppSelector((state) => state.connectFour.currentPlayer);
	const winner = useAppSelector((state) => state.connectFour.winner);
	const currentMatrix = useAppSelector((state) => state.connectFour.currentMatrix);
	const history = useAppSelector((state) => state.connectFour.history);
	return (
		<div>
			<div className="flex flex-col items-center gap-2 mt-4">
				<span className="font-bold text-xl">Turn of player {currentPlayer}</span>
				<div className="relative">
					{winner != 0 && (
						<div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white/50 rounded-lg">
							<span className="font-bold text-4xl text-black">Player {winner} win</span>
						</div>
					)}
					<div className="flex gap-2">
						{currentMatrix.map((e, i1) => {
							return (
								<div key={`current-col-${i1}-${e[i1]}`} className="flex flex-col gap-2">
									<FontAwesomeIcon
										icon={faArrowCircleDown}
										size="xl"
										onClick={() => {
											dispatch(insertChip({ player: currentPlayer, col: i1 }));
										}}
									/>
									{e
										.map((v, i2) => (
											<div
												key={`current-col-${i1}-row-${i2}`}
												className={`w-12 h-12 rounded-full ${v === 0 ? "bg-white" : ""} ${
													v === 1 ? "bg-red-500" : ""
												} ${v === 2 ? "bg-blue-500" : ""}`}
											></div>
										))
										.reverse()}
								</div>
							);
						})}
					</div>
				</div>
				<button
					className="bg-primary hover:bg-gray-700 text-white p-2 rounded-lg mt-4"
					onClick={() => dispatch(newGame())}
				>
					{winner != 0 ? "New Game" : "Reset"}
				</button>
			</div>
			<div className="border-t mt-4 p-4">
				<span className="font-bold text-xl">History Games</span>
				<div className="flex flex-wrap gap-2 mt-4">
					{history.map((h) => (
						<div
							key={`history-${h.date.toString()}`}
							className="flex flex-col items-center border p-2 rounded-lg"
						>
							<span className="font-bold">Player {h.winner} win</span>
							<div className="flex gap-1 my-2">
								{h.matrix.map((e, i1) => {
									return (
										<div key={`history-col-${i1}-${e[i1]}`} className="flex flex-col gap-1">
											{e
												.map((v, i2) => (
													<div
														key={`history-col-${i1}-row-${i2}`}
														className={`w-4 h-4 rounded-full ${v === 0 ? "bg-white" : ""} ${
															v === 1 ? "bg-red-500" : ""
														} ${v === 2 ? "bg-blue-500" : ""}`}
													></div>
												))
												.reverse()}
										</div>
									);
								})}
							</div>
							<span>{h.date.toLocaleString()}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
