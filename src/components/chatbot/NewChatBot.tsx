import { t } from "i18next";
import { Box, Button, IconButton, styled, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, MouseEvent, useState } from "react";
import { ChatBotCategories } from "@interfaces/chatbot/ChatBotInterface";
import { logger } from "@utils/logger";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

interface Props {
	onClose: VoidFunction;
}
export function NewChatBot({ onClose }: Props) {
	const [chatBotSelection, setChatBotSelection] = useState<ChatBotCategories>(undefined);
	const [PDFFile, setPDFFile] = useState<string | undefined>(undefined);
	const [previewUrl, setPreviewUrl] = useState(undefined);
	return (
		<div
			className="absolute top-0 left-0 right-0 bottom-0 flex bg-black/50 dark:bg-white/20"
			onClickCapture={(event: MouseEvent<HTMLDivElement>) => {
				if ((event.target as HTMLDivElement).id === "new-chat-bot") {
					onClose();
				}
			}}
			id="new-chat-bot"
		>
			<div className="bg-white dark:bg-black container p-4 mx-auto my-auto border border-white dark:border-white relative">
				<Box sx={{ position: "absolute", right: 0, top: -4 }}>
					<IconButton color="warning" onClick={onClose}>
						<FontAwesomeIcon icon={faClose} size="lg" />
					</IconButton>
				</Box>
				{!chatBotSelection && (
					<div className="flex flex-col h-full">
						<div className="text-center">
							<Typography variant="h4">{t("newChatBot")}</Typography>
							<Typography variant="subtitle1">{t("whatWantChatbot")}</Typography>
						</div>
						<div className="text-center flex-1 flex mt-4">
							<div className="my-auto mx-auto flex gap-2">
								<Button variant="outlined" onClick={() => setChatBotSelection("FAQ")}>
									FAQs
								</Button>
								<Button variant="outlined">Get Orders</Button>
								<Button variant="outlined">Appointments</Button>
							</div>
						</div>
					</div>
				)}
				{chatBotSelection === "FAQ" && (
					<div className="flex flex-col h-full">
						<div className="text-center">
							<Typography variant="subtitle1">{t("uploadFileForFAQ")}</Typography>
						</div>
						<div className="text-center mt-4">
							<Button
								component="label"
								role={undefined}
								variant="contained"
								tabIndex={-1}
								startIcon={<FontAwesomeIcon icon={faCloudArrowUp} size="lg" />}
							>
								Upload file
								<VisuallyHiddenInput
									type="file"
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										logger.info(event);
										const files = (event.target as HTMLInputElement).files;
										if (files && files.length > 0) {
											var reader = new FileReader();
											reader.readAsDataURL(files[0]);
											reader.onload = () => {
												logger.info(reader.result);
												setPDFFile(reader.result as string);
											};
										}
									}}
								/>
							</Button>
							{PDFFile && (
								<>
									<iframe className="my-4" src={PDFFile} width="100%" height="500px" />
									<Button variant="contained">Analyze</Button>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
