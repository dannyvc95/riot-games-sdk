import {RiotGamesApiClient} from './client';

(async () => {
    const client = new RiotGamesApiClient();

    const gameName = 'NoxMajesty';
    const tagLine = 'LAN';

    const account = await client.account.getAccountByRiotId('NoxMajesty', 'LAN');
    const championRotation = await client.championRotation.getChampionRotations();
    const leagues = await client.leagueExp.getAllLeagueEntries('RANKED_SOLO_5x5', 'CHALLENGER','I',1);

    if (account) {
        console.log(`riot id: ${gameName}#${tagLine}\npuuid: ${account.puuid}\n`);

        if (account.puuid) {
            const region = await client.account.getActiveRegionByPuuid(account.puuid);
            console.log(region);
            const listPlayer = await client.clash.getPlayersByPuuid(account.puuid);
            console.log(listPlayer);
            const tournaments = await client.clash.getAllActiveOrUpcomingTournaments();
            console.log(tournaments);

            console.log('Champion Masteries By puuid: ');
            const championMasteriesByPuuid = await client.championMastery.getChampionMasteriesByPuuid(account.puuid);
            console.log(championMasteriesByPuuid);
            console.log('Champion Masteries Top By puuid: ');
            const championMasteriesTop = await client.championMastery.getChampionMasteriesTopByPuuid(account.puuid);
            console.log(championMasteriesTop);
            console.log('Champion Mastery Score By puuid: ');
            const championMasteryScore = await client.championMastery.getChampionMasteryScoreByPuuid(account.puuid);
            console.log(championMasteryScore);
        }
    }

    if (championRotation) {
        console.log(`Free Champion Rotations:\nmaxNewPlayerLevel: ${championRotation.maxNewPlayerLevel}`);
        console.log(`Free Champions for New Players(IDs): ${championRotation.freeChampionIdsForNewPlayers}`);
        console.log(`Free Champions(IDs): ${championRotation.freeChampionIds}`);
    }
    if (leagues) {
        console.log(`Leagues:\nLeagueId: ${[...leagues][0].leagueId}`);
    }
})();
