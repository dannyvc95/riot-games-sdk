import {RiotGamesApiClient} from './client';

(async () => {
    const client = new RiotGamesApiClient();

    const gameName = 'NoxMajesty';
    const tagLine = 'LAN';

    const account = await client.account.getAccountByRiotId('NoxMajesty', 'LAN');
    const championRotation = await client.championRotation.getChampionRotations();

    if (account) {
        console.log(`riot id: ${gameName}#${tagLine}\npuuid: ${account.puuid}\n`);

        if (account.puuid) {
            const region = await client.account.getActiveRegionByPuuid(account.puuid);
            console.log(region);
            const listPlayer = await client.clash.getPlayersByPuuid(account.puuid);
            console.log(listPlayer);
            const tournaments = await client.clash.getAllActiveOrUpcomingTournaments();
            console.log(tournaments)
        }
    }

    if (championRotation) {
        console.log(`Free Champion Rotations:\nmaxNewPlayerLevel: ${championRotation.maxNewPlayerLevel}`);
        console.log(`Free Champions for New Players(IDs): ${championRotation.freeChampionIdsForNewPlayers}`);
        console.log(`Free Champions(IDs): ${championRotation.freeChampionIds}`);
    }
})();
