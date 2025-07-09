/** https://developer.riotgames.com/apis#league-exp-v4 */
import {RiotGamesApiClient} from '../client';
import {LeagueEntryDTO} from '../types/LeagueEntryDTO';

type QueueType =
  | 'RANKED_SOLO_5x5'
  | 'RANKED_TFT'
  | 'RANKED_FLEX_SR'
  | 'RANKED_FLEX_TT';

type Tier =
  | 'IRON'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'EMERALD'
  | 'DIAMOND'
  | 'MASTER'
  | 'GRANDMASTER'
  | 'CHALLENGER';

type Division = 'I' | 'II' | 'III' | 'IV';

export class LeagueExp {
    constructor(private client: RiotGamesApiClient) { }

    /** /lol/league-exp/v4/entries/{queue}/{tier}/{division} */
    async getAllLeagueEntries(queue: QueueType, tier: Tier, division: Division, page?: number) :
    Promise<Set<LeagueEntryDTO> | null> {
        const uri = '/lol/league-exp/v4/entries/';
        const pageParam = page ? `?page=${page}` : '';
        try {
            return await this.client.getFromRegion('la1',`${uri}${queue}/${tier}/${division}${pageParam}`);
        } catch (error) {
            console.error(error);
        }
        return null;
    }
}
