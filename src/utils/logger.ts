import pino from "pino";

export const logger = pino({
	level: import.meta.env.VITE_LOGGER_LEVEL || "info",
	prettyPrint: true,
});
