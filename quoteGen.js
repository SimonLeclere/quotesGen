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
    [
        'A'
    ],
    [
        'I'
    ],
    [
        'volets'
    ],
    [
        'balles'
    ],
    [
        'motard'
    ],
    [
        'athlète'
    ],
    [
        'pendules'
    ],
    [
        'points'
    ],
    [
        'lavent'
    ],
    [
        'fenêtres'
    ],
    [
        'word'
    ],
    [
        ['au vieux singe', 'à la sorcière', 'au rigolo', 'au vieux pingouin', 'au kebabier'],
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
    ],
    [
        ['bière', 'pierre']
    ]
];

const randomFromArray = array => array[Math.floor(Math.random() * array.length)];

const strings = [
    'Vrai {0-0} {0-1}',
    '{1-0} qui {1-1} {1-2} pas {1-3}',

    '{2}AAAAAAAH! (très aigü)',
    'H{3}IIIIIIII! (très aigü)',
    'Donner c\'est donner et repeindre ses {4}',
    'Tu veux pas 1000 {5} plutôt ?',
    'Vieux {6} que jamais',
    'J\'ai l\'{7} dans l\'cul',
    'On va remettre les {8} sur les i',
    'On va remettre les {9} à l\'heure',
    'L\'avenir appartient à ceux qui se {10} tôt',
    'C\'est la porte ouverte à toutes les {11}',
    'Vrai développeur code dans {12}',

    'On apprend pas {13-0} à {13-1}',
    'Qui vole {14-0} vole {14-1}',
    'C\'est la {15-0} sur le {15-1}',
    'Ca m\'en {16-0} une sans {16-1} l\'autre',
    '{17-0} ne fait pas le {17-1}',
    'Tout travail mérite sa {18-0}',
    
];

const randomQuote = (raw = false) => {
    let quote = randomFromArray(strings);
    const replacements = [];
    const mustaches = quote.match(/\{[0-9-]+\}/g);
    mustaches.forEach(mustache => {
        const parts = mustache.slice(1, -1).split('-');
        if(parts.length === 1) {
            const replacement = randomFromArray(words[parts[0]]);
            if(raw) replacements.push(replacement);

            quote = quote.replace(mustache, replacement);
        }
        else {
            const replacement = randomFromArray(words[parts[0]][parts[1]]);
            if(raw) replacements.push(replacement);

            quote = quote.replace(mustache, replacement);
        }
    });
    return raw ? [quote, replacements] : quote;
}


module.exports = randomQuote;