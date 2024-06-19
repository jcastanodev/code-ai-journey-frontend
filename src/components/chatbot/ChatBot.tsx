import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NewChatBot } from "./NewChatBot";

export function ChatBot() {
	const [isOpenNewChatBot, setIsOpenNewChatBot] = useState(false);

	const openNewChatBot = () => {
		setIsOpenNewChatBot(true);
	};

	const closeNewChatBot = () => {
		setIsOpenNewChatBot(false);
	};
	return (
		<div className="flex flex-col px-6 py-2">
			<div className="w-full text-left pb-6">
				<h2>{t("yourChatBots")}</h2>
			</div>
			<button className="p-1 rounded-full dark:text-black dark:bg-white" onClick={openNewChatBot}>
				<FontAwesomeIcon icon={faPlus} size="xl" />
			</button>
			{isOpenNewChatBot && <NewChatBot onClose={closeNewChatBot} />}
		</div>
	);
}
