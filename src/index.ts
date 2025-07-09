import {RiotGamesApiClient} from './client';

(async () => {
    const client = new RiotGamesApiClient();

    const gameName = 'NoxMajesty';
    const tagLine = 'LAN';

    const account = await client.account.getAccountByRiotId('NoxMajesty', 'LAN');
    const championRotation = await client.championRotation.getChampionRotations();
    const leagues = await client.leagueExp.getAllLeagueEntries('RANKED_SOLO_5x5', 'CHALLENGER','I',1);
    const status = await client.lolStatus.getLOLStatus();

    if (account) {
        console.log(`riot id: ${gameName}#${tagLine}\npuuid: ${account.puuid}\n`);

        if (account.puuid) {
            const region = await client.account.getActiveRegionByPuuid(account.puuid);
            console.log(region);
            const listPlayer = await client.clash.getPlayersByPuuid(account.puuid);
            if(listPlayer){
                console.log(`Players By Puuid: ${listPlayer[0]}`);
            }
            const tournaments = await client.clash.getAllActiveOrUpcomingTournaments();
            if(tournaments){
                console.log(`Active Or Upcoming Tournaments: ${tournaments[0].id}`);
            }
            const championMasteriesByPuuid = await client.championMastery.getChampionMasteriesByPuuid(account.puuid);
            if(championMasteriesByPuuid){
                console.log(`Champion Masteries By puuid: ${championMasteriesByPuuid[0]}`);
            }
            const championMasteriesTop = await client.championMastery.getChampionMasteriesTopByPuuid(account.puuid);
            if(championMasteriesTop){
                console.log(`Champion Masteries Top By puuid: ${championMasteriesTop[0]}`);
            }
            console.log('Champion Mastery Score By puuid: ');
            const championMasteryScore = await client.championMastery.getChampionMasteryScoreByPuuid(account.puuid);
            console.log(`Champion Mastery Score By puuid: ${championMasteryScore}`);
            const gameInfo = await client.spectator.getCurrentGameInfo(account.puuid);
            if(gameInfo){
                console.log(`Current Game Info: ${gameInfo}`);
            }
            const listOfFeaturedGames = await client.spectator.getListOfFeaturedGames();
            if(listOfFeaturedGames){
                console.log(`Get List Of Featured Games: ${listOfFeaturedGames.gameList[0].gameId}`);
            }

            /**
            * League-v4 test.
            */
            const leagueEntry = await client.league.getLeagueEntryByPuuid(account.puuid);
            console.log(`League entry: ${JSON.stringify(leagueEntry)}`);
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

    if(status) {
        console.log('LOL Platform Status:');
        console.log(`ID: ${status.id}`);
        console.log(`Name: ${status.name}`);
        console.log(`Locales: ${status.locales}`);
        console.log(`Maintenances: ${status.maintenances}`);
        console.log(`Incidents: ${status.incidents}`);
    }
})();
