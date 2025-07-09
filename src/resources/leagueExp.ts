/** https://developer.riotgames.com/apis#league-exp-v4 */
import {RiotGamesApiClient} from '../client';
import {Division, QueueType, Tier} from '../types';
import {LeagueEntryDTO} from '../types/LeagueEntryDTO';

export class LeagueExp {
    constructor(private client: RiotGamesApiClient) { }

    /** /lol/league-exp/v4/entries/{queue}/{tier}/{division} */
    async getAllLeagueEntries(queue: QueueType, tier: Tier, division: Division, page?: number) :
    Promise<Set<LeagueEntryDTO> | null> {
        try {
            return await this.client.get('la1',
                `/lol/league-exp/v4/entries/${queue}/${tier}/${division}${page ? `?page=${page}` : ''}`);
        } catch (error) {
            console.error(error);
        }
        return null;
    }
}
