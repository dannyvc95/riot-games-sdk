import {RiotGamesApiClient} from './client';

(async () => {
    const client = new RiotGamesApiClient();

    const gameName = 'NoxMajesty';
    const tagLine = 'LAN';

    const account = await client.account.getAccountByRiotId('NoxMajesty', 'LAN');

    if (account) {
        console.log(`riot id: ${gameName}#${tagLine}\npuuid: ${account.puuid}\n`);

        if (account.puuid) {
            const region = await client.account.getActiveRegionByPuuid(account.puuid);
            console.log(region);
        }
    }
})();
