import HttpClient from "./http-client";
import User from "@/types/UserType";

class UserApi extends HttpClient {
	public constructor() {
		super(`${process.env.VUE_APP_API_URL}/v1/users/`);
	}

	public getUser = async (id: string) => {
		try {
			return await this.instance.get<User>(`${id}`);
		} catch (error) {
			console.error(error);
		}
	};

	public updateUser = async (user: User) => {
		try {
			return await this.instance.patch<User>("/update/updateProfile", user, {
				withCredentials: true,
			});
		} catch (error) {
			console.error(error);
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public updateUserPicture = async (data: FormData) => {
		try {
			return await this.instance.patch<User>("/update/updatePicture", data, {
				withCredentials: true,
			});
		} catch (error) {
			console.error(error);
		}
	};

	public getHome = async () => {
		try {
			return (
				await this.instance.get<User>(`/dashboard`, { withCredentials: true })
			).data;
		} catch (error) {
			console.error(error);
		}
	};

	public check = async (value: string) => {
		try {
			return (await this.instance.get(`/check/${value}`)).data;
		} catch (error) {
			console.error(error);
		}
	};

	public saveToken = async (code: string) => {
		try {
			const data = {
				code: code,
			};
			return await this.instance.patch("/update/updateToken", data, {
				withCredentials: true,
			});
		} catch (err) {
			console.error(err);
		}
	};
}

export default new UserApi();
