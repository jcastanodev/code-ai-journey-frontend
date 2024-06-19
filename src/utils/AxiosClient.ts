import axios, { AxiosInstance } from "axios";

export class AxiosClient {
	private static instance: AxiosClient;
	authBaseUrl: string;
	authToken: string;

	axiosUnauthorizedClient: AxiosInstance;
	axiosAuthorizedClient!: AxiosInstance;

	private constructor(authBaseUrl?: string, authToken?: string) {
		this.authBaseUrl = authBaseUrl ?? "http://localhost:8080";
		this.authToken = authToken ?? "";
		this.axiosUnauthorizedClient = axios.create({
			baseURL: this.authBaseUrl,
		});
		this.axiosUnauthorizedClient = axios.create({
			baseURL: this.authBaseUrl,
			headers: {
				common: {
					Authorization: `Bearer ${this.authToken}`,
					"Content-Type": "application/json",
				},
			},
		});
	}

	static getInstance(): AxiosClient {
		if (!AxiosClient.instance) {
			AxiosClient.instance = new AxiosClient();
		}

		return AxiosClient.instance;
	}

	static init(authUrl: string, token: string): AxiosClient {
		AxiosClient.instance = new AxiosClient(authUrl, token);

		return AxiosClient.instance;
	}
}
