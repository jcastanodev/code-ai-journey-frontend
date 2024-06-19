import { SignInRequestInterface } from "@interfaces/account/SignInRequestInterface";
import { SignInResponseInterface } from "@interfaces/account/SignInResponseInterface";
import { ApiResponseInterface } from "@interfaces/ApiResponseInterface";
import { AxiosClient } from "@utils/AxiosClient";

export async function signIn(
	request: SignInRequestInterface
): Promise<ApiResponseInterface<SignInResponseInterface>> {
	const response = await AxiosClient.getInstance().axiosUnauthorizedClient.post(
		"/api/account/signin",
		request
	);

	return response.data as ApiResponseInterface<SignInResponseInterface>;
}

export async function getIdentificationDocument(): Promise<ApiResponseInterface<any>> {
	const response = await AxiosClient.getInstance().axiosAuthorizedClient.get(
		"/api/account/identificationDocument"
	);

	return response.data as ApiResponseInterface<SignInResponseInterface>;
}
