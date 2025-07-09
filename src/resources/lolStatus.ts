/** https://developer.riotgames.com/apis#lol-status-v4 */
import {RiotGamesApiClient} from '../client';
import {PlatformDataDto} from '../types/PlatformDataDto';

export class LOLStatus {
    constructor(private client: RiotGamesApiClient) {}

    /** /lol/status/v4/platform-data */
    async getLOLStatus(): Promise<PlatformDataDto | null> {
        try {
            return await this.client.get('la1','/lol/status/v4/platform-data');
        } catch (error) {
            console.error(error);
        }
        return null;
    }
}
