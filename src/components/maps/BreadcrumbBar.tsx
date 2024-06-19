import { BreadcrumbItem } from "./BreadcrumbItem";
import { BreadcrumbArrow } from "./BreadcrumbArrow";
import { useAppDispatch } from "@store/hooks";
import { setFrom, setTo } from "@store/reducers/MapsReducer";

interface Props {
	from: google.maps.places.PlaceResult | null;
	to: google.maps.places.PlaceResult | null;
	onEditFrom: VoidFunction;
	onEditTo: VoidFunction;
	waypoints: (google.maps.places.PlaceResult | null)[];
	addWaypoint: (index: number) => void;
	editWaypoint: (index: number) => void;
	deleteWaypoint: (index: number) => void;
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
}: Readonly<Props>) {
	const dispatch = useAppDispatch();
	return (
		<div className="absolute top-12 left-0 right-0 flex justify-center items-center z-10">
			<BreadcrumbItem
				label={!from ? "from" : from.name!}
				onEdit={() => {
					onEditFrom();
				}}
				onDelete={() => {
					dispatch(setFrom(null));
				}}
			/>
			<BreadcrumbArrow
				onClick={() => {
					addWaypoint(0);
				}}
			/>
			{waypoints.map((waypoint, index) => {
				return waypoint != null ? (
					<>
						<BreadcrumbItem
							key={index}
							label={waypoint.name!}
							onEdit={() => {
								editWaypoint(index);
							}}
							onDelete={() => {
								deleteWaypoint(index);
							}}
						/>
						<BreadcrumbArrow
							onClick={() => {
								addWaypoint(index + 1);
							}}
						/>
					</>
				) : (
					<>
						<BreadcrumbItem
							key={index}
							label={"new"}
							onEdit={() => {
								editWaypoint(index);
							}}
							onDelete={() => {
								deleteWaypoint(index);
							}}
						/>
						<BreadcrumbArrow
							onClick={() => {
								addWaypoint(index + 1);
							}}
						/>
					</>
				);
			})}
			<BreadcrumbItem
				label={!to ? "to" : to.name!}
				onEdit={() => {
					onEditTo();
				}}
				onDelete={() => {
					dispatch(setTo(null));
				}}
			/>
		</div>
	);
}
