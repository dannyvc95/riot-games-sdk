/** https://developer.riotgames.com/apis#champion-v3 */
import {RiotGamesApiClient} from '../client';
import {ChampionInfo} from '../types/ChampionInfo';

export class ChampionRotation {
    constructor(private client: RiotGamesApiClient) {}

    /** /lol/platform/v3/champion-rotations */
    async getChampionRotations(): Promise<ChampionInfo | null> {
        try {
            return await this.client.get('la1','/lol/platform/v3/champion-rotations');
        } catch (error) {
            console.error(error);
        }
        return null;
    }
}
