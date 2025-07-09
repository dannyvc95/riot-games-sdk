import dotenv from 'dotenv';
dotenv.config();

import {Account} from './resources/account';
import {ChampionRotation} from './resources/championRotation';
import {Clash} from './resources/clash';
import {LeagueExp} from './resources/leagueExp';

type RiotRegion = 'americas' | 'la1';

export class RiotGamesApiClient {
    public readonly account: Account;
    public readonly championRotation: ChampionRotation;
    public readonly clash: Clash;
    public readonly leagueExp: LeagueExp;

    private readonly apiKey: string = process.env.RIOT_GAMES_API_KEY || '';


    private readonly regionUrls: Record<RiotRegion, string> = {
        americas: process.env.RIOT_GAMES_API_AMERICAS_HOST || '',
        la1: process.env.RIOT_GAMES_API_LA1_HOST || '',
    };

    constructor() {
        this.account = new Account(this);
        this.clash = new Clash(this);
        this.championRotation = new ChampionRotation(this);
        this.leagueExp = new LeagueExp(this);
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

        console.log('https://la1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1');
        console.log(`${baseUrl}${path}`);

        const response = await fetch(`${baseUrl}${path}`, {
            headers: {'X-Riot-Token': this.apiKey},
        });
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
    }

}
