import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CustomButton } from "../material-ui";

interface Props {
	onClose: VoidFunction;
}
export function Explore({ onClose }: Props) {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col h-full bg-page">
			<div className="mx-auto">
				<img src="/images/logos/logo.png" alt="Logo" width={100} />
			</div>
			<div className="container flex flex-wrap justify-center gap-2 mx-auto">
				<div className="w-full pb-6 text-center">
					<h1>{t("tools")}</h1>
				</div>
				<Link to="/chatbot">
					<CustomButton>{t("goToChatBot")}</CustomButton>
				</Link>
				<Link to="/business">
					<CustomButton>{t("goToBusiness")}</CustomButton>
				</Link>
				<Link to="/customEntity">
					<CustomButton>Go to custom entity</CustomButton>
				</Link>
				<Link to="/connectFour">
					<CustomButton>Go to connectFour</CustomButton>
				</Link>
				<Link to="/aiPlayground">
					<CustomButton>Go to AI Playground</CustomButton>
				</Link>
				<Link to="https://discord.com/oauth2/authorize?client_id=1217540704721567804&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fexplore&scope=identify+messages.read+webhook.incoming">
					<CustomButton>Join Discord</CustomButton>
				</Link>
				<Link to="/maps">
					<CustomButton>Maps</CustomButton>
				</Link>
			</div>
		</div>
	);
}
