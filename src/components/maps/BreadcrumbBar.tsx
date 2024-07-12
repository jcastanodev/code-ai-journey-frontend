import { BreadcrumbItem } from "./BreadcrumbItem";
import { BreadcrumbArrow } from "./BreadcrumbArrow";
import { useAppDispatch } from "@store/hooks";
import { setFrom, setTo } from "@store/reducers/MapsReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { PlaceInterface } from "@interfaces/MapsInterface";

interface Props {
	from: PlaceInterface | null;
	to: PlaceInterface | null;
	onEditFrom: VoidFunction;
	onEditTo: VoidFunction;
	waypoints: (PlaceInterface | null)[];
	addWaypoint: (index: number) => void;
	editWaypoint: (index: number) => void;
	deleteWaypoint: (index: number) => void;
	saveRoute: VoidFunction;
	resetRoute: VoidFunction;
}
export function BreadcrumbBar({
	from = null,
	to = null,
	onEditFrom,
	onEditTo,
	waypoints,
	addWaypoint,
	editWaypoint,
	deleteWaypoint,
	saveRoute,
	resetRoute,
}: Readonly<Props>) {
	const dispatch = useAppDispatch();
	return (
		<div
			key={"breadcrumb"}
			className="absolute top-12 left-0 right-0 flex flex-wrap justify-center items-center z-10"
		>
			<BreadcrumbItem
				key={"fromItem"}
				label={!from ? "from" : from.name}
				onEdit={() => {
					onEditFrom();
				}}
				onDelete={() => {
					dispatch(setFrom(null));
				}}
			/>
			<BreadcrumbArrow
				key={"firstArrow"}
				onClick={() => {
					addWaypoint(0);
				}}
			/>
			{waypoints.map((waypoint, index) => {
				return waypoint != null ? (
					<div key={`waypoint-${waypoint.place_id}`} className="flex">
						<BreadcrumbItem
							key={`item-${waypoint.place_id}`}
							label={waypoint.name}
							onEdit={() => {
								editWaypoint(index);
							}}
							onDelete={() => {
								deleteWaypoint(index);
							}}
						/>
						<BreadcrumbArrow
							key={`arrow-${waypoint.place_id}`}
							onClick={() => {
								addWaypoint(index + 1);
							}}
						/>
					</div>
				) : (
					<div key="waypoint-new" className="flex">
						<BreadcrumbItem
							key="item-new"
							label={"new"}
							onEdit={() => {
								editWaypoint(index);
							}}
							onDelete={() => {
								deleteWaypoint(index);
							}}
						/>
						<BreadcrumbArrow
							key="arrow-new"
							onClick={() => {
								addWaypoint(index + 1);
							}}
						/>
					</div>
				);
			})}
			<BreadcrumbItem
				key={"toItem"}
				label={!to ? "to" : to.name}
				onEdit={() => {
					onEditTo();
				}}
				onDelete={() => {
					dispatch(setTo(null));
				}}
			/>
			<FontAwesomeIcon
				key={"save"}
				icon={faSave}
				size="xl"
				className="text-black bg-white/75 rounded-full p-2 w-fit ml-4 cursor-pointer hover:bg-primary-dark/50"
				onClick={() => {
					saveRoute();
				}}
			/>
			<FontAwesomeIcon
				key={"reset"}
				icon={faTrash}
				size="xl"
				className="text-black bg-white/75 rounded-full p-2 w-fit ml-2 cursor-pointer hover:bg-red-500/50"
				onClick={() => {
					resetRoute();
				}}
			/>
		</div>
	);
}
