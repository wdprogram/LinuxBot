import fetch from 'node-fetch';

const DISCORD_API = 'https://discord.com/api/v10';

export default class Fetch {
    constructor(token) {
        this.token = token;
        this.headers = {
            Authorization: `Bot ${this.token}`,
            'Content-Type': 'application/json',
        };
    }

    async get(url) {
        return new Promise(async (resolve, reject) => {
            const res = await fetch(url, {
                headers: this.headers,
                method: 'GET',
            });

            if (res.errors) {
                reject(new Error(res.errors));
            }

            resolve(await res.json());
        });
    }

    async put(url) {
        return new Promise(async (resolve) => {
            const res = await fetch(url, {
                headers: this.headers,
                method: 'PUT',
            });
            resolve('OK');
        });
    }

    async post(url, body) {
        return new Promise(async (resolve, reject) => {
            const res = await fetch(url, {
                headers: this.headers,
                method: 'POST',
                body: JSON.stringify(body),
            });

            try {
                const jsoned = await res.json();
                resolve(jsoned);
            } catch {
                resolve(res);
            }
        });
    }

    async delete(url) {
        return new Promise(async (resolve, reject) => {
            const res = await fetch(url, {
                headers: this.headers,
                method: 'DELETE',
            });

            if (res.errors) {
                reject(new Error(res.errors));
            }

            resolve(await res.json());
        });
    }

    async patch(url, body) {
        return new Promise(async (resolve, reject) => {
            const res = await fetch(url, {
                headers: this.headers,
                method: 'PATCH',
                body: JSON.stringify(body),
            });

            if (res.errors) {
                reject(new Error(res.errors));
            }

            resolve(await res.json());
        });
    }
}
