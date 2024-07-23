import { ConnectFour } from "@components/connectFour/connectFour";
import { BaseLayout } from "@layouts/BaseLayout";
import { useTranslation } from "react-i18next";

export function ConnectFourPage() {
	const { t } = useTranslation();
	return (
		<BaseLayout className="container px-2 pt-0 mx-auto mt-0">
			<div className="p-2 text-center rounded-none bg-primary">
				<h1>{t("connectFour")}</h1>
			</div>
			<ConnectFour />
		</BaseLayout>
	);
}
