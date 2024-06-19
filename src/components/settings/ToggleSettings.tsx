import { logger } from "../../utils/logger";
import { useTranslation } from "react-i18next";
import { ToggleDarkMode } from "./ToggleDarkMode";

export function ToggleSettings() {
	const { i18n } = useTranslation();
	const toggleLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
		window.localStorage.setItem("defaultLanguage", lng);
		logger.info("Language changed", lng);
	};

	return (
		<>
			<ToggleDarkMode />
			<button
				className="z-10 p-1 ml-1 text-white bg-gray-800 rounded dark:text-black dark:bg-white"
				onClick={() => toggleLanguage(i18n.language === "en" ? "es" : "en")}
			>
				{i18n.language}
			</button>
		</>
	);
}
