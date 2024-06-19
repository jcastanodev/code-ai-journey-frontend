import type { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			boxShadow: {
				all: "inset 0 0 6px 0px rgba(0, 255, 0, 0.3)",
			},
			colors: {
				primary: {
					light: "#1083D6",
					dark: "#34D42C"
				},
				'primary-text': {
					light: "#EAEAEA",
					dark: "#333333"
				},
				'primary-selected': {
					light: "#70B5FF",
					dark: "#E0F2CF"
				},
				'primary-selected-text': {
					light: "#FFFFFF",
					dark: "#000000"
				},
				'primary-hover': {
					light: "#47A0E6",
					dark: "#88E966"
				},
				secondary: {
					light: "#34D42C",
					dark: "#1083D6"
				},
				'secondary-text': {
					light: "#333333",
					dark: "#EAEAEA"
				},
				'secondary-selected': {
					light: "#E0F2CF",
					dark: "#70B5FF"
				},
				'secondary-selected-text': {
					light: "#000000",
					dark: "#FFFFFF"
				},
				'secondary-hover': {
					light: "#88E966",
					dark: "#47A0E6"
				},
				title: {
					light: "#212121",
					dark: "#EAEAEA"
				},
				content: {
					light: "#474f51",
					dark: "#C8C8C8"
				},
				light: {
					light: "#A0A7AC",
					dark: "#2A3B47"
				},
				body: {
					light: "#FBFBFE",
					dark: "#111111"
				},
				container: {
					light: "#DADADA",
					dark: "#212121"
				},
				border: {
					light: "#697477",
					dark: "#2A3B47"
				}
			}
		},
	},
	plugins: [],
	safelist: ["shadow-all", "focus:shadow-all", "bg-secondary"],
} satisfies Config;
