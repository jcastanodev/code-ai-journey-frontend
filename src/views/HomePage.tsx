import { BaseLayout } from "@layouts/BaseLayout";
import { useTranslation } from "react-i18next";

export function HomePage() {
	const { t } = useTranslation();
	return (
		<BaseLayout>
			<h1>{t("homePage")}</h1>
		</BaseLayout>
	);
}
