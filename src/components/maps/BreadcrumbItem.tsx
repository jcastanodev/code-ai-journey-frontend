import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
	label: string;
	onEdit: VoidFunction;
	onDelete: VoidFunction;
}
export function BreadcrumbItem({ label, onEdit, onDelete }: Readonly<Props>) {
	return (
		<div className="relative flex cursor-pointer rounded-lg bg-black/50 p-2">
			<span className="text-white rounded-lg whitespace-nowrap">{label}</span>
			<div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out">
				{label !== "new" && (
					<FontAwesomeIcon icon={faPen} size="xl" className="text-black flex-1" onClick={onEdit} />
				)}
				<FontAwesomeIcon
					icon={faTrash}
					size="xl"
					className="text-red-500 w-fit"
					onClick={onDelete}
				/>
			</div>
		</div>
	);
}
