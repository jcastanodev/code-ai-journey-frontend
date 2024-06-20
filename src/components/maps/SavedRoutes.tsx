import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlaceInterface } from "@interfaces/MapsInterface";

interface Props {
	showSavedRoutes: boolean;
	routes: PlaceInterface[][];
	onSelectSavedRoute: (routes: PlaceInterface[]) => void;
	onDeleteSavedRoute: (index: number) => void;
}
export function SavedRoutes({
	showSavedRoutes,
	routes,
	onSelectSavedRoute,
	onDeleteSavedRoute,
}: Readonly<Props>) {
	return (
		<div className="absolute top-12 right-0 flex flex-wrap flex-col items-end z-10 gap-2">
			{showSavedRoutes &&
				routes?.map((saveRoute, index) => {
					return (
						<div key={`route-${index}`} className="flex items-center">
							<span
								className="bg-black/50 text-white p-2 rounded-lg cursor-pointer"
								onClick={() => onSelectSavedRoute(saveRoute)}
							>
								{saveRoute[0].name} to {saveRoute[saveRoute.length - 1].name}
							</span>
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
	);
}
