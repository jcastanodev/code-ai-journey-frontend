import { faTrash, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlaceInterface } from "@interfaces/MapsInterface";
import { toast } from "react-toastify";

interface Props {
	showSavedRoutes: boolean;
	routes: PlaceInterface[][];
	onSelectSavedRoute: (routes: PlaceInterface[]) => void;
	onDeleteSavedRoute: (index: number) => void;
	onShareSavedRoute: (index: number) => void;
}
export function SavedRoutes({
	showSavedRoutes,
	routes,
	onSelectSavedRoute,
	onDeleteSavedRoute,
	onShareSavedRoute,
}: Readonly<Props>) {
	const notifyCopied = () => toast("Copied to clipboard!");
	return showSavedRoutes ? (
		<div className="absolute top-12 right-0 flex flex-wrap flex-col items-end z-10 gap-2 bg-white p-2 rounded-lg">
			{routes?.map((saveRoute, index) => {
				return (
					<div
						key={`route-${saveRoute[0].name}-${saveRoute[saveRoute.length - 1].name}`}
						className="flex items-center"
					>
						<button
							className="bg-black/50 text-white p-2 rounded-lg cursor-pointer"
							onClick={() => onSelectSavedRoute(saveRoute)}
						>
							{saveRoute[0].name} to {saveRoute[saveRoute.length - 1].name}
						</button>
						<FontAwesomeIcon
							icon={faShare}
							size="xl"
							className="text-black w-fit cursor-pointer ml-2"
							onClick={() => {
								onShareSavedRoute(index);
								notifyCopied();
							}}
						/>
						<FontAwesomeIcon
							icon={faTrash}
							size="xl"
							className="text-red-500 w-fit cursor-pointer ml-2"
							onClick={() => {
								onDeleteSavedRoute(index);
							}}
						/>
					</div>
				);
			})}
		</div>
	) : (
		<></>
	);
}
