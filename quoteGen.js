const words = [
    [
        ["mâle aplha", "homme", "homme alpha", "mangeur", "cuistot", "hacker", "plongeur", "rigolo", "étudiant", "chien", "baiseur", "caillou", "mâle bêta", 'sportif'],
        ["sait faire à manger", "sait nager", "sait couisiner", "aime les hommes", "joue aux beyblades", "a un calibre 17 sur lui en permanence", "mange des briques au petit déjeuner", "bois des litres de bière", "risque sa vie pour sauver des bébés chiens", "aboie ouaf ouaf", "ne respire pas", "sait faire 1000 pompes", "mange des protéines à chaque repas"]
    ],
    [
        ["Pierre", "Boule", "Roule", "Couille", "Bourre", "Crous", "Bouche", "Louche"],
        ["roule", "bousse", "pousse", "vole", "chousse", "louche", "bouche", "touche"],
        ["n'arrache", "n'avale", "n'étale", "n'envoie", "ne vole", "n'ignore", "n'envoie"],
        ["mousse", "rousse", "bousse", "bouche", "louche"]
    ],
    ['AAAAAAAAH! (très aigü)', 'HIIIIIIIII! (très aigü)', 'Donner c\'est donner et repeindre ses volets', 'Tu veux pas 1000 balles plutôt ?', 'Vieux motard que jamais', 'J\'ai l\'athlète dans l\'cul', 'On va remettre les pendules sur les i', 'On va remettre les points à l\'heure', 'L\'avenir appartient à ceux qui se lavent tôt', 'C\'est la porte ouverte à toutes les fenêtres'],
    [
        ['au vieux singe', 'à la sorcière', 'au rigolo', 'au vieux pinguin', 'au kebabier'],
        ['faire des grimaces', 'crier', 'rigoler', 'faire des glaces', 'manger des yaourts', 'être drip']
    ],
    [
        ['un oeuf', 'un boeuf', 'un neuf', 'un reuf', 'un keuf', 'une meuf', 'un veuf'],
        ['un oeuf', 'un boeuf', 'un neuf', 'un reuf', 'un keuf', 'une meuf', 'un veuf']
    ],
    [
        ['cerise', 'brise', 'crise', 'méprise', 'frise', 'multiprise', 'surprise', 'gourmandise', 'friandise', 'marquise', 'valise'],
        ['gâteau', 'bâteau', 'château', 'plateau', 'rateau', 'chapiteau', 'biscoto', 'couteau', 'manteau', 'zigoto']
    ],
    [
        ['touche', 'bouche', 'couche', 'bouge', 'roule', 'louche', 'mousse'],
        ['faire bouger', 'boucher', 'coucher', 'toucher', 'faire tourner', 'faire ricocher', 'pétrifier', 'faire mousser']
    ],
    [
        ['L\'habit', 'L\'argent', 'L\'histoire', 'L\'habile', 'Larry', 'Barry', 'Jerry'],
        ['curé', 'moine', 'plombier', 'cuisinier', 'postier', 'portier']
    ]
];

const randomFromArray = array => array[Math.floor(Math.random() * array.length)];

const functions = [
    () => `Vrai ${randomFromArray(words[0][0])} ${randomFromArray(words[0][1])}`,
    () => `${randomFromArray(words[1][0])} qui ${randomFromArray(words[1][1])} ${randomFromArray(words[1][2])} pas ${randomFromArray(words[1][3])}`,
    () => `${randomFromArray(words[2])}`,
    () => `On apprend pas ${randomFromArray(words[3][0])} à ${randomFromArray(words[3][1])}`,
    () => `Qui vole ${randomFromArray(words[4][0])} vole ${randomFromArray(words[4][1])}`,
    () => `C'est la ${randomFromArray(words[5][0])} sur le ${randomFromArray(words[5][1])}`,
    () => `Ca m'en ${randomFromArray(words[6][0])} une sans ${randomFromArray(words[6][1])} l'autre`,
    () => `${randomFromArray(words[7][0])} ne fait pas le ${randomFromArray(words[7][1])}`,
];

const randomQuote = () => randomFromArray(functions)();

module.exports = randomQuote;