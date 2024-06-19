import React from "react";

import { HeadBar } from "@components/common/head-bar/HeadBar";
import "../styles/LandingStyle.css";

export class BaseLayout extends React.Component<{
	children: React.ReactNode;
	className?: string;
}> {
	render(): React.ReactNode {
		return (
			<main className="w-full h-full p-0 m-0 bg-page relative">
				<HeadBar />
				<div className="absolute top-0 left-0 right-0 buttom-0 text-content z-0 h-full bg-landing">
					<div className="flex flex-col h-full overflow-y-auto max-h-screen pt-10">
						<div className="flex-1 h-full overflow-y-auto">{this.props.children}</div>
						<footer className="">
							<div className="flex justify-end">
								<span className="text-content">Copyright © {new Date().getFullYear()}</span>
							</div>
						</footer>
					</div>
				</div>
			</main>
		);
	}
}
