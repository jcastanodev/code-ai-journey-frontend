import { ConnectFour } from "@components/connectFour/connectFour";
import { BaseLayout } from "@layouts/BaseLayout";

export function ConnectFourPage() {
	return (
		<BaseLayout className="container px-2 pt-0 mx-auto mt-0">
			<div className="p-2 text-center rounded-none bg-primary">
				<h1>Connect Four 2</h1>
			</div>
			<ConnectFour />
		</BaseLayout>
	);
}
