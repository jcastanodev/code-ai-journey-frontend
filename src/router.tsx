import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "@components/settings/ErrorPage";
import { AxiosClient } from "@utils/AxiosClient";
import { constantUtil } from "@utils/constantUtils";
import { AccountPage } from "@views/account/AccountPage";
import { store } from "./store/store";
import { HomePage } from "@views/HomePage";
import { LandingPage } from "@views/LandingPage";
import { DigitalSignPage } from "@views/digitalSign/digitalSignPage";
import { CustomEntityPage } from "@views/customEntity/CustomEntityPage";
import { ConnectFourPage } from "@views/connectFour/ConnectFourPage";
import { AIPlaygroundPage } from "@views/ai/AIPlaygroundPage";
import { ChatBotPage } from "@views/chatbot/ChatBotPage";
import { MapsPage } from "@views/maps/MapsPage";

AxiosClient.init(constantUtil.AUTH_API_URL(), store.getState().account.token ?? "");

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/account",
		element: <AccountPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/home",
		element: <HomePage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/chatbot",
		element: <ChatBotPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/digitalSign",
		element: <DigitalSignPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/customEntity",
		element: <CustomEntityPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/connectFour",
		element: <ConnectFourPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/aiPlayground",
		element: <AIPlaygroundPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/maps",
		element: <MapsPage />,
		errorElement: <ErrorPage />,
	},
]);
