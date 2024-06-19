import { ToggleSettings } from "@components/settings/ToggleSettings";
import { urlUtils } from "@utils/urlUtils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Explore } from "./Explore";

export function HeadBar() {
	const { t } = useTranslation();
	const [isOpenExplore, setIsOpenExplore] = useState(
		urlUtils.getFragment(window.location.href) === "explore"
	);

	const openExplore = () => {
		setIsOpenExplore(true);
	};

	const closeExplore = () => {
		setIsOpenExplore(false);
	};

	return (
		<>
			<div className="absolute top-0 left-0 right-0 bottom-0 h-fit z-10">
				<div className="bg-head-bar text-head-bar flex justify-center">
					<div className="flex-1">
						<div className="p-2 pl-6">
							<Link to="/">
								<span className="font-bold">{t("start").toUpperCase()}</span>
							</Link>
						</div>
					</div>
					<div className="p-2">
						<Link to="#" onClick={isOpenExplore ? closeExplore : openExplore}>
							<span className="font-bold">{t("explore").toUpperCase()}</span>
						</Link>
					</div>
					<div className="flex-1 flex justify-end">
						<div className="my-auto p-2 pr-6">
							<Link to="/account">
								<span className="font-bold">{t("account").toUpperCase()}</span>
							</Link>
						</div>
						<ToggleSettings />
					</div>
				</div>
			</div>
			{isOpenExplore && (
				<div className="absolute z-20 top-10 left-0 right-0 bottom-0">
					<Explore onClose={closeExplore} />
				</div>
			)}
		</>
	);
}
