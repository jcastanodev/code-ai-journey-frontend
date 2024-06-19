import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

import { logger } from "../../utils/logger";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { setDarkMode } from "@store/reducers/appSettingReducer";

const THEME_CLASS_DARK_MODE = "dark";

export function ToggleDarkMode() {
	const isDarkMode = useAppSelector((state) => state.appSetting.isDarkMode);
	const dispatch = useAppDispatch();

	const initDarkMode = () => {
		if (isDarkMode) {
			document.documentElement.classList.add(THEME_CLASS_DARK_MODE);
		} else {
			document.documentElement.classList.remove(THEME_CLASS_DARK_MODE);
		}
	};

	const toggle = () => {
		if (isDarkMode) {
			document.documentElement.classList.remove(THEME_CLASS_DARK_MODE);
			dispatch(setDarkMode(false));
			logger.info("darkMode false");
		} else {
			document.documentElement.classList.add(THEME_CLASS_DARK_MODE);
			dispatch(setDarkMode(true));
			logger.info("darkMode true");
		}
	};

	useEffect(() => {
		initDarkMode();
	});

	return (
		<>
			<button
				className="z-10 p-1 text-white bg-gray-800 rounded dark:text-black dark:bg-white"
				onClick={toggle}
			>
				<FontAwesomeIcon icon={faCircleHalfStroke} size="xl" />
			</button>
		</>
	);
}
