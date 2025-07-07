import dotenv from 'dotenv';
dotenv.config();

import { Account } from './resources/account';
import { Clash } from './resources/clash';

type RiotRegion = 'americas' | 'la1';

export class RiotGamesApiClient {
    public readonly account: Account;
    public readonly clash: Clash;

    private readonly apiKey: string = process.env.RIOT_GAMES_API_KEY || '';


    private readonly regionUrls: Record<RiotRegion, string> = {
        americas: process.env.RIOT_GAMES_API_AMERICAS_HOST || '',
        la1: process.env.RIOT_GAMES_API_LA1_HOST || '',
    };

    constructor() {
        this.account = new Account(this);
        this.clash = new Clash(this);
    }

    /**
    * Makes a typed HTTP GET request to the specified API path.
    *
    * @template T - The expected shape of the response data.
    * @param path - The relative API path to request.
    * @returns A promise that resolves to the parsed JSON response of type T.
    * @throws If the response status is not OK.
    */
    async getFromRegion<T = unknown>(region: RiotRegion, path: string): Promise<T> {
        const baseUrl = this.regionUrls[region];
        const response = await fetch(`${baseUrl}${path}`, {
            headers: { 'X-Riot-Token': this.apiKey },
        });
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
    }

}
