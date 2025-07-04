import dotenv from 'dotenv';
dotenv.config();

import {Account} from './resources/account';

export class RiotGamesApiClient {
    public readonly account: Account;

    private readonly apiKey: string = process.env.RIOT_GAMES_API_KEY || '';
    private readonly baseUrl: string = process.env.RIOT_GAMES_API_HOST || '';

    constructor() {
        this.account = new Account(this);
    }

    /**
    * Makes a typed HTTP GET request to the specified API path.
    *
    * @template T - The expected shape of the response data.
    * @param path - The relative API path to request.
    * @returns A promise that resolves to the parsed JSON response of type T.
    * @throws If the response status is not OK.
    */
    async get<T = unknown>(path: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            headers: {'X-Riot-Token': this.apiKey},
        });
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
    }
}
