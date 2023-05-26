import { ENV } from "../utils";

export class Contact {

    baseApi = ENV.BASE_API;

    async sendMessage(data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MESSAGE}`;
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getMessage(accessToken, active = undefined) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MESSAGE}?active=${active}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }

    async updateMessage(accessToken, idMessage, data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MESSAGE}/${idMessage}`;
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            }
            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteMessage(accessToken, idMessage) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MESSAGE}/${idMessage}`;
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
}