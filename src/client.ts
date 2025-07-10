import dotenv from 'dotenv';
dotenv.config();

import {Account} from './resources/account';
import {ChampionRotation} from './resources/championRotation';
import {ChampionMastery} from './resources/champioMastery';
import {Clash} from './resources/clash';
import {LeagueExp} from './resources/leagueExp';
import {Spectator} from './resources/spectator';
import {Match} from './resources/match';

type RiotGamesApi = 'americas' | 'la1';

export class RiotGamesApiClient {
    public readonly account: Account;
    public readonly championRotation: ChampionRotation;
    public readonly championMastery: ChampionMastery;
    public readonly clash: Clash;
    public readonly leagueExp: LeagueExp;
    public readonly spectator: Spectator;
    public readonly match: Match;

    private readonly apiKey: string = process.env.RIOT_GAMES_API_KEY || '';

    private readonly apiHosts: Record<RiotGamesApi, string> = {
        americas: process.env.RIOT_GAMES_API_AMERICAS_HOST || '',
        la1: process.env.RIOT_GAMES_API_LA1_HOST || '',
    };

    constructor() {
        this.account = new Account(this);
        this.clash = new Clash(this);
        this.championMastery = new ChampionMastery(this);
        this.championRotation = new ChampionRotation(this);
        this.leagueExp = new LeagueExp(this);
        this.spectator = new Spectator(this);
        this.match = new Match(this);
    }

    async get<T = unknown>(api: RiotGamesApi, path: string): Promise<T> {
        const response = await fetch(`${this.apiHosts[api]}${path}`, {headers: {'X-Riot-Token': this.apiKey}});
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
    }
}
