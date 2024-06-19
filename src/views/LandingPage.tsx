import { Link } from "react-router-dom";

import { LandingLayout } from "@layouts/LandingLayout";
import "../styles/LandingStyle.css";
import { useTranslation } from "react-i18next";

export function LandingPage() {
	const { t } = useTranslation();
	return (
		<LandingLayout>
			<div className="text-center pt-5 md:pt-8 lg:pt-10 pb-10 lg:pb-20">
				<h1 className="text-black dark:text-white text-5xl sm:text-7xl lg:text-9xl font-thin landing-title">
					Code AI Journey
				</h1>
			</div>
			<div className="flex-1 w-full flex">
				<div className="container mx-auto my-auto bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-60">
					<p className="font-xl text-xl text-center text-black dark:text-white">
						{t("welcomeMessage")}
					</p>
				</div>
			</div>
			<div className="flex-1 w-full flex">
				<div className="mx-auto my-auto py-10">
					<Link to="/explore">
						<div className="bg-button py-2 px-6 rounded-xl cursor-pointer text-xl hover:text-white">
							{t("explore")}
						</div>
					</Link>
				</div>
			</div>
		</LandingLayout>
	);
}
