import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
	onClick: VoidFunction;
}
export function BreadcrumbArrow({ onClick }: Readonly<Props>) {
	return (
		<button className="relative flex cursor-pointer rounded-lg p-2" onClick={onClick}>
			<FontAwesomeIcon icon={faArrowRight} size="xl" className="text-black/50" />
			<div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out">
				<FontAwesomeIcon icon={faPlus} size="xl" className="text-black bg-white rounded-full p-1" />
			</div>
		</button>
	);
}
