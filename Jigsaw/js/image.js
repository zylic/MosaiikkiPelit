export let gameData = {};

const castleNames = [
    'Olavinlinna',
    'Turunlinna',
    'Raaseporinlinna',
    'Bomarsundlinna',
    'Hameenlinna',
    'Kastelholmlinna'
]

const armsNames = [
    'Tamperevaakuna',
    'Keuruuvaakuna',
    'Jyvaskylavaakuna',
    'Suomivaakuna',
    'Helsinkivaakuna',
    'Imatravaakuna',
    'Kalajokivaakuna',
    'Kuopiovaakuna',
    'Ouluvaakuna',
    'Porvoovaakuna',
    'Turkuvaakuna',
    'Vantaavaakuna'
]

const randomNames = [
    'SibeliusMonumentti',
    'AleksisKiviPatsas',
    'SuomenKansallisteatteri',
    'HelsinkiKatedraali',
    'VanhaKauppahalli',
    'HelsinkiKristinuskoKirkko',
    'LappiNapapiiri',
    'Tamperevaakuna',
    'Keuruuvaakuna',
    'Jyvaskylavaakuna',
    'Suomivaakuna',
    'Helsinkivaakuna',
    'Imatravaakuna',
    'Kalajokivaakuna',
    'Kuopiovaakuna',
    'Ouluvaakuna',
    'Porvoovaakuna',
    'Turkuvaakuna',
    'Vantaavaakuna',
    'Olavinlinna',
    'Turunlinna',
    'Raaseporinlinna',
    'Bomarsundlinna',
    'Hameenlinna',
    'Kastelholmlinna'
]

export function getImage(category) {
    switch(category) {
        case 'castle':
            const randomCastleName = castleNames[Math.floor(Math.random() * castleNames.length)];
            
            return gameData.Linnat[randomCastleName];
        case 'arms':
            const randomArmsName = armsNames[Math.floor(Math.random() * armsNames.length)];

            return gameData.Vaakunat[randomArmsName];
        case 'random':
            const randomEverythingName = randomNames[Math.floor(Math.random() * randomNames.length)];

            return gameData.Randoms[randomEverythingName];
    }
}