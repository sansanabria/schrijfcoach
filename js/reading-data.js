// Daily reading texts for A2 level (with B1 sprinkles)
// Each text: ~220 words, 10-minute reading at A2 pace
// Daily rotation: getDailyReadingIndex() in app.js
// IMPORTANT: Never reuse or renumber IDs — reading history is keyed by id

const readingTexts = [
  {
    id: 'r-001',
    title: 'Hollandse stroopwafels',
    titleEn: 'Dutch stroopwafels',
    level: 'A2',
    topic: 'eten',
    topicEn: 'food',
    topicEmoji: '🍪',
    wordCount: 218,
    readMinutes: 3,
    text:
`De stroopwafel is een van de bekendste Nederlandse koekjes. Hij is rond, plat en heeft een laagje zoete stroop tussen twee dunne wafels. De stroopwafel komt oorspronkelijk uit Gouda en is daar in de achttiende eeuw uitgevonden. Volgens het verhaal heeft een bakker de eerste stroopwafel gemaakt van restjes deeg en stroop. Hij wilde niets weggooien, en zo is een nieuw koekje ontstaan.

Vandaag de dag eten Nederlanders stroopwafels graag bij de koffie of thee. Veel mensen leggen de stroopwafel even op het kopje. De warme damp maakt de stroop in het midden zacht en lekker. Op de markt kun je verse stroopwafels kopen. Die zijn nog warm en heerlijk om meteen op te eten.

In de supermarkt vind je verschillende soorten: kleine, grote, met chocolade of zonder. Sommige mensen maken stroopwafels ook zelf thuis, maar dat is niet eenvoudig. Je hebt namelijk een speciaal ijzer nodig.

Buiten Nederland worden stroopwafels steeds populairder. Toeristen nemen ze vaak mee als cadeau, omdat ze lang houdbaar zijn en niet snel breken. Astronauten van de NASA hebben zelfs stroopwafels meegenomen de ruimte in!

Of je nu een echte Nederlander bent of een toerist, een stroopwafel bij de koffie hoort gewoon bij Nederland. Probeer er eens eentje — je zult begrijpen waarom miljoenen mensen ze zo lekker vinden.`,
    textEn:
`The stroopwafel is one of the most famous Dutch cookies. It is round, flat, and has a layer of sweet syrup between two thin waffles. The stroopwafel originally comes from Gouda and was invented there in the eighteenth century. According to the story, a baker made the first stroopwafel from leftover dough and syrup. He didn't want to throw anything away, and that's how a new cookie came to be.

Today, Dutch people love to eat stroopwafels with coffee or tea. Many people place the stroopwafel on top of their cup. The warm steam makes the syrup in the middle soft and delicious. At the market you can buy fresh stroopwafels. They're still warm and delicious to eat right away.

In the supermarket you'll find different kinds: small, large, with chocolate or without. Some people also make stroopwafels at home, but that's not easy. You need a special iron for it.

Outside the Netherlands, stroopwafels are becoming more and more popular. Tourists often take them as gifts, because they have a long shelf life and don't break easily. NASA astronauts even took stroopwafels into space!

Whether you're a real Dutch person or a tourist, a stroopwafel with coffee is simply part of the Netherlands. Try one — you'll understand why millions of people find them so delicious.`,
    vocabulary: [
      { nl: 'stroop', en: 'syrup', matches: ['stroop', 'stroopwafel', 'stroopwafels'] },
      { nl: 'wafel', en: 'wafer/waffle', matches: ['wafel', 'wafels'] },
      { nl: 'koekje', en: 'cookie', matches: ['koekje', 'koekjes'] },
      { nl: 'bakker', en: 'baker' },
      { nl: 'restjes', en: 'leftovers/scraps' },
      { nl: 'deeg', en: 'dough' },
      { nl: 'weggooien', en: 'to throw away' },
      { nl: 'damp', en: 'steam/vapour' },
      { nl: 'houdbaar', en: 'long-lasting/shelf-stable' },
      { nl: 'ruimte', en: 'space' },
      { nl: 'cadeau', en: 'gift/present', matches: ['cadeau'] }
    ],
    grammarNotes: [
      {
        pattern: 'Voltooid tegenwoordige tijd (VTT) met hebben',
        example: 'heeft uitgevonden · heeft gemaakt',
        explanation: 'Completed actions in the past use "hebben" + past participle (ge- + stem + -d/t). "uitgevonden" = irregular past participle of "uitvinden" (to invent).'
      },
      {
        pattern: 'om...te + infinitive (purpose)',
        example: 'om meteen op te eten · om niets weg te gooien',
        explanation: '"om...te" expresses purpose ("in order to"). With separable verbs like "opeten", place "te" between prefix and stem.'
      },
      {
        pattern: 'Worden + steeds + comparatief (passive/change)',
        example: 'worden stroopwafels steeds populairder',
        explanation: '"Worden + comparatief" expresses a gradual change ("are becoming more and more..."). "Steeds" intensifies the comparison.'
      }
    ],
    questions: [
      {
        q: 'Waar komen stroopwafels oorspronkelijk vandaan?',
        qEn: 'Where do stroopwafels originally come from?',
        a: 'Uit Gouda.',
        aEn: 'From Gouda.'
      },
      {
        q: 'Waarom leggen mensen een stroopwafel op hun kopje?',
        qEn: 'Why do people put a stroopwafel on their cup?',
        a: 'De warme damp maakt de stroop zacht en lekker.',
        aEn: 'The warm steam makes the syrup soft and delicious.'
      },
      {
        q: 'Wie heeft stroopwafels mee de ruimte in genomen?',
        qEn: 'Who took stroopwafels into space?',
        a: 'Astronauten van de NASA.',
        aEn: 'NASA astronauts.'
      }
    ]
  },

  {
    id: 'r-002',
    title: 'Koningsdag in Nederland',
    titleEn: 'King\'s Day in the Netherlands',
    level: 'A2',
    topic: 'cultuur',
    topicEn: 'culture',
    topicEmoji: '👑',
    wordCount: 224,
    readMinutes: 3,
    text:
`Op 27 april vieren Nederlanders Koningsdag. Het is de verjaardag van koning Willem-Alexander en een van de gezelligste dagen van het jaar. Iedereen draagt oranje kleren, want oranje is de kleur van het koningshuis. Op straat zie je oranje hoeden, oranje T-shirts en zelfs oranje schoenen.

In bijna elke stad is er een grote vrijmarkt. Op deze markt mag iedereen zijn oude spullen verkopen, ook kinderen. Veel families staan al vroeg op om een goede plek te zoeken. Op een kleedje leggen ze speelgoed, boeken, kleren of zelfgemaakte koekjes. Soms verdienen kinderen op één dag genoeg geld voor een nieuw cadeau.

In Amsterdam wordt Koningsdag groots gevierd. Op de grachten varen honderden boten met muziek en dansende mensen. De stad is dan zo druk dat je nauwelijks kunt lopen. Sommige bewoners verlaten de stad juist op deze dag, omdat het ze te druk is.

De koning en de koninklijke familie bezoeken elk jaar een andere stad. Ze lopen door de straten, praten met mensen en doen mee aan kleine spelletjes. Op televisie kun je alles live volgen.

Voor veel buitenlanders is Koningsdag een verrassing. Ze hebben nog nooit zo'n vrolijk feest gezien. Of je nu in Amsterdam, Utrecht of een klein dorp bent: op 27 april is heel Nederland oranje en blij.`,
    textEn:
`On April 27th, Dutch people celebrate King's Day. It is the birthday of King Willem-Alexander and one of the most enjoyable days of the year. Everyone wears orange clothes, because orange is the colour of the royal family. In the street you see orange hats, orange T-shirts, and even orange shoes.

In almost every city there is a large flea market. At this market everyone is allowed to sell their old things, including children. Many families get up early to find a good spot. On a mat they lay out toys, books, clothes or homemade cookies. Sometimes children earn enough money in one day for a new gift.

In Amsterdam, King's Day is celebrated in a big way. On the canals, hundreds of boats sail with music and dancing people. The city is then so busy that you can hardly walk. Some residents actually leave the city on this day because it's too crowded for them.

The king and the royal family visit a different city every year. They walk through the streets, talk with people, and join in small games. On TV you can follow everything live.

For many foreigners, King's Day is a surprise. They have never seen such a cheerful celebration. Whether you're in Amsterdam, Utrecht or a small village: on April 27th all of the Netherlands is orange and happy.`,
    vocabulary: [
      { nl: 'vieren', en: 'to celebrate', matches: ['vieren', 'gevierd'] },
      { nl: 'verjaardag', en: 'birthday' },
      { nl: 'koningshuis', en: 'royal house/royal family' },
      { nl: 'vrijmarkt', en: 'flea market' },
      { nl: 'kleedje', en: 'small mat/blanket' },
      { nl: 'spullen', en: 'stuff/belongings' },
      { nl: 'verdienen', en: 'to earn' },
      { nl: 'gracht', en: 'canal', matches: ['gracht', 'grachten'] },
      { nl: 'bewoner', en: 'resident', matches: ['bewoner', 'bewoners'] },
      { nl: 'nauwelijks', en: 'hardly/barely' },
      { nl: 'verrassing', en: 'surprise' }
    ],
    grammarNotes: [
      {
        pattern: 'Inversie na tijdsbepaling',
        example: 'Op 27 april vieren Nederlanders...',
        explanation: 'When a sentence starts with a time expression, the verb comes BEFORE the subject. Compare: "Nederlanders vieren op 27 april..." vs "Op 27 april vieren Nederlanders..."'
      },
      {
        pattern: 'Passief verleden tijd (wordt/worden + VD)',
        example: 'wordt Koningsdag groots gevierd',
        explanation: '"Worden + past participle" forms a passive sentence. The person doing the action is unknown or unimportant. "Gevierd" = past participle of "vieren".'
      },
      {
        pattern: 'omdat-bijzin (subordinate clause)',
        example: 'omdat het ze te druk is',
        explanation: '"Omdat" (because) introduces a subordinate clause where the verb moves to the END. Compare: "Het is te druk." → "omdat het te druk is."'
      }
    ],
    questions: [
      {
        q: 'Waarom dragen mensen oranje kleren op Koningsdag?',
        qEn: 'Why do people wear orange clothes on King\'s Day?',
        a: 'Omdat oranje de kleur van het koningshuis is.',
        aEn: 'Because orange is the colour of the royal family.'
      },
      {
        q: 'Wat doen kinderen op de vrijmarkt?',
        qEn: 'What do children do at the flea market?',
        a: 'Ze verkopen hun oude spullen.',
        aEn: 'They sell their old belongings.'
      },
      {
        q: 'Wat doet de koninklijke familie op Koningsdag?',
        qEn: 'What does the royal family do on King\'s Day?',
        a: 'Ze bezoeken een andere stad, lopen door de straten en praten met mensen.',
        aEn: 'They visit a different city, walk through the streets and talk with people.'
      }
    ]
  },

  {
    id: 'r-003',
    title: 'De Waddenzee en haar dieren',
    titleEn: 'The Wadden Sea and its animals',
    level: 'A2',
    topic: 'natuur',
    topicEn: 'nature',
    topicEmoji: '🦭',
    wordCount: 226,
    readMinutes: 3,
    text:
`De Waddenzee ligt in het noorden van Nederland en is een uniek natuurgebied in Europa. Het is een ondiepe zee tussen het vasteland en een rij eilanden. Twee keer per dag verandert het landschap helemaal. Bij eb verdwijnt het water en zie je grote stukken modder en zand. Bij vloed komt het water weer terug.

In de Waddenzee leven veel verschillende dieren. Zeehonden zwemmen in het water en liggen op de zandbanken om uit te rusten. Soms kun je er wel honderd tegelijk zien. Ook vogels houden van dit gebied, omdat ze er makkelijk eten kunnen vinden. Miljoenen trekvogels stoppen elk jaar op de Waddenzee om te eten en te slapen tijdens hun lange reis.

Onder het water leven krabben, mosselen en kleine vissen. Veel mensen wandelen bij eb over de modder. Dat heet wadlopen. Het is leuk maar niet ongevaarlijk: het water kan snel terugkomen. Daarom mag je alleen met een gids wadlopen.

Sinds 2009 staat de Waddenzee op de werelderfgoedlijst van de UNESCO. Dat betekent dat dit gebied heel belangrijk is voor de hele wereld. Wetenschappers onderzoeken er de natuur en proberen het schoon te houden.

Wie van rust en stilte houdt, moet zeker een keer naar de Waddenzee. Het is een plek waar je begrijpt hoe bijzonder de Nederlandse natuur is.`,
    textEn:
`The Wadden Sea is located in the north of the Netherlands and is a unique natural area in Europe. It is a shallow sea between the mainland and a row of islands. The landscape changes completely twice a day. At low tide the water disappears and you see large areas of mud and sand. At high tide the water comes back.

Many different animals live in the Wadden Sea. Seals swim in the water and lie on the sandbanks to rest. Sometimes you can see a hundred of them at once. Birds also love this area because they can easily find food there. Millions of migratory birds stop at the Wadden Sea every year to eat and sleep during their long journey.

Crabs, mussels, and small fish live under the water. Many people walk across the mud at low tide. This is called mudflat walking (wadlopen). It's fun but not without danger: the water can come back quickly. That's why you are only allowed to walk on the mudflats with a guide.

Since 2009, the Wadden Sea has been on UNESCO's World Heritage List. This means that this area is very important for the whole world. Scientists study nature there and try to keep it clean.

Anyone who loves peace and quiet should definitely visit the Wadden Sea. It is a place where you understand how special the Dutch countryside is.`,
    vocabulary: [
      { nl: 'ondiep', en: 'shallow' },
      { nl: 'vasteland', en: 'mainland' },
      { nl: 'eb', en: 'low tide' },
      { nl: 'vloed', en: 'high tide' },
      { nl: 'modder', en: 'mud' },
      { nl: 'zeehond', en: 'seal', matches: ['zeehond', 'zeehonden'] },
      { nl: 'zandbank', en: 'sandbank', matches: ['zandbank', 'zandbanken'] },
      { nl: 'trekvogel', en: 'migratory bird', matches: ['trekvogel', 'trekvogels'] },
      { nl: 'wadlopen', en: 'mudflat walking' },
      { nl: 'werelderfgoed', en: 'world heritage' },
      { nl: 'wetenschapper', en: 'scientist', matches: ['wetenschapper', 'wetenschappers'] }
    ],
    grammarNotes: [
      {
        pattern: 'Scheidbaar werkwoord met te (om...te)',
        example: 'om uit te rusten · om te eten en te slapen',
        explanation: 'With separable verbs, "te" goes between the prefix and the main verb: "uitrusten" → "om uit te rusten". This construction expresses purpose.'
      },
      {
        pattern: 'Zijn + bijvoeglijk naamwoord (predikaat)',
        example: 'Het is leuk maar niet ongevaarlijk',
        explanation: '"Niet" negates an adjective. "On-" as a prefix also negates: "gevaarlijk" (dangerous) → "ongevaarlijk" (not dangerous). Both are used here for emphasis.'
      },
      {
        pattern: 'Wie/Wat + relatieve bijzin',
        example: 'Wie van rust houdt, moet naar de Waddenzee.',
        explanation: '"Wie" (whoever) starts a conditional clause. The main clause follows with a comma. This is more formal than "Als je van rust houdt..."'
      }
    ],
    questions: [
      {
        q: 'Wat gebeurt er twee keer per dag in de Waddenzee?',
        qEn: 'What happens twice a day in the Wadden Sea?',
        a: 'Het water verdwijnt (eb) en komt terug (vloed).',
        aEn: 'The water disappears (low tide) and returns (high tide).'
      },
      {
        q: 'Waarom mag je niet alleen wadlopen?',
        qEn: 'Why are you not allowed to walk on the mudflats alone?',
        a: 'Omdat het water snel kan terugkomen. Dat is gevaarlijk.',
        aEn: 'Because the water can return quickly. That is dangerous.'
      },
      {
        q: 'Sinds wanneer staat de Waddenzee op de UNESCO-lijst?',
        qEn: 'Since when has the Wadden Sea been on the UNESCO list?',
        a: 'Sinds 2009.',
        aEn: 'Since 2009.'
      }
    ]
  },

  {
    id: 'r-004',
    title: 'Fietsen met een app',
    titleEn: 'Cycling with an app',
    level: 'A2',
    topic: 'technologie',
    topicEn: 'technology',
    topicEmoji: '📱',
    wordCount: 221,
    readMinutes: 3,
    text:
`Nederlanders fietsen veel. Bijna iedereen heeft een fiets, en sommige mensen zelfs twee of drie. De laatste jaren zijn er ook veel nieuwe apps voor fietsers. Met deze apps kun je een goede route plannen, je snelheid meten en zien hoeveel kilometer je hebt gefietst.

Een populaire app heet Fietsknooppunten. In Nederland en België staan op kruisingen kleine bordjes met nummers. Met die nummers maak je je eigen route. De app helpt je om de mooiste paden door bossen, weilanden en kleine dorpen te kiezen. Veel mensen gebruiken de app in het weekend om te ontdekken wat er in hun eigen regio te zien is.

Er zijn ook apps voor elektrische fietsen. Je kunt ermee controleren hoe vol de batterij is en waar je hem kunt opladen. Sommige apps waarschuwen je zelfs voor slecht weer of drukke wegen.

Niet iedereen is blij met deze ontwikkeling. Oudere fietsers zeggen dat ze liever gewoon zonder telefoon fietsen. Volgens hen is fietsen juist leuk omdat je dan vrij bent en niets hoeft. Sommige scholen leren kinderen daarom dat ze hun telefoon in hun zak moeten houden tijdens het fietsen.

Toch worden fietsapps steeds populairder. Ze helpen mensen om gezonder te leven, meer te bewegen en nieuwe plekken te ontdekken.`,
    textEn:
`Dutch people cycle a lot. Almost everyone has a bicycle, and some people even have two or three. In recent years, many new apps for cyclists have appeared. With these apps you can plan a good route, measure your speed, and see how many kilometres you have cycled.

A popular app is called Fietsknooppunten (Cycling Junction Points). In the Netherlands and Belgium, small signs with numbers stand at intersections. With those numbers you make your own route. The app helps you choose the most beautiful paths through forests, meadows, and small villages. Many people use the app at the weekend to discover what there is to see in their own region.

There are also apps for electric bicycles. You can use them to check how full the battery is and where you can charge it. Some apps even warn you about bad weather or busy roads.

Not everyone is happy with this development. Older cyclists say they prefer to cycle without a phone. According to them, cycling is fun precisely because you are free and don't have to do anything. Some schools therefore teach children to keep their phone in their pocket while cycling.

Yet cycling apps are becoming more and more popular. They help people to live more healthily, to exercise more, and to discover new places.`,
    vocabulary: [
      { nl: 'snelheid', en: 'speed' },
      { nl: 'meten', en: 'to measure' },
      { nl: 'kruising', en: 'intersection', matches: ['kruising', 'kruisingen'] },
      { nl: 'bordje', en: 'small sign', matches: ['bordje', 'bordjes'] },
      { nl: 'pad', en: 'path', matches: ['pad', 'paden'] },
      { nl: 'weiland', en: 'meadow', matches: ['weiland', 'weilanden'] },
      { nl: 'ontdekken', en: 'to discover', matches: ['ontdekken'] },
      { nl: 'opladen', en: 'to charge (battery)' },
      { nl: 'waarschuwen', en: 'to warn', matches: ['waarschuwen'] },
      { nl: 'ontwikkeling', en: 'development' },
      { nl: 'bewegen', en: 'to move/exercise' }
    ],
    grammarNotes: [
      {
        pattern: 'Modaal werkwoord + infinitief',
        example: 'Je kunt een goede route plannen · je moet je telefoon houden',
        explanation: 'Modal verbs (kunnen, moeten, willen, mogen) are followed by an infinitive at the end of the clause. The infinitive does NOT get "te".'
      },
      {
        pattern: 'Toekomst met zullen / steeds + comparatief',
        example: 'worden fietsapps steeds populairder',
        explanation: '"Steeds + comparatief" (increasingly + comparative) shows a gradual ongoing change. Alternatively, "zullen" + infinitive expresses future: "Fietsapps zullen populairder worden."'
      },
      {
        pattern: 'Volgens + naamwoord (according to)',
        example: 'Volgens hen is fietsen juist leuk...',
        explanation: '"Volgens" (according to) is a preposition that introduces whose opinion follows. It causes inversion: verb comes before subject in the main clause.'
      }
    ],
    questions: [
      {
        q: 'Wat zijn fietsknooppunten?',
        qEn: 'What are cycling junction points?',
        a: 'Bordjes met nummers op kruisingen waarmee je een fietsroute maakt.',
        aEn: 'Small signs with numbers at intersections that you use to make a cycling route.'
      },
      {
        q: 'Wat kun je controleren met een app voor elektrische fietsen?',
        qEn: 'What can you check with an app for electric bicycles?',
        a: 'Hoe vol de batterij is en waar je hem kunt opladen.',
        aEn: 'How full the battery is and where you can charge it.'
      },
      {
        q: 'Waarom willen sommige oudere fietsers geen app gebruiken?',
        qEn: 'Why do some older cyclists not want to use an app?',
        a: 'Ze willen vrij zijn en niets hoeven tijdens het fietsen.',
        aEn: 'They want to be free and have no obligations while cycling.'
      }
    ]
  },

  // ══ B1 LEESOEFENINGEN ════════════════════════════════════════════════════════
  {
    id: 'r-b1-001',
    title: 'De woningmarkt in Nederland',
    titleEn: 'The housing market in the Netherlands',
    level: 'B1',
    topic: 'wonen',
    topicEn: 'housing',
    topicEmoji: '🏠',
    wordCount: 285,
    readMinutes: 5,
    text:
`In Nederland is het moeilijk om een betaalbare woning te vinden. De afgelopen jaren zijn de huizenprijzen sterk gestegen. In de grote steden zoals Amsterdam, Utrecht en Den Haag betalen mensen soms meer dan vijf keer hun jaarsalaris voor een gemiddeld huis. Veel starters op de woningmarkt lukt het daardoor niet meer om een huis te kopen.

Er zijn verschillende oorzaken voor de krapte op de markt. Ten eerste worden er te weinig nieuwe huizen gebouwd. Plannen worden vertraagd door bezwaarprocedures en gebrek aan geschikte bouwlocaties. Ten tweede is er veel vraag van investeerders die woningen kopen om ze te verhuren. Daardoor wordt het voor gewone mensen steeds moeilijker om een huis te kopen.

De overheid heeft verschillende maatregelen genomen om de markt eerlijker te maken. Zo is er een opkoopbescherming ingevoerd in bepaalde wijken: beleggers mogen woningen in die gebieden niet meer verhuren als ze ze nieuw kopen. Ook wordt geprobeerd om de bouw van betaalbare huurwoningen te stimuleren.

Toch zijn veel experts van mening dat de problemen op korte termijn niet zijn opgelost. Er zijn meer ingrijpende maatregelen nodig, zoals hogere belastingen op speculatieve aankopen en snellere vergunningprocedures. Jongeren die een eigen huis willen, moeten intussen flink sparen en genoeg geluk hebben op het juiste moment op de markt te zijn.

De woningmarkt staat dan ook hoog op de politieke agenda. Hoe die krapte wordt aangepakt, is een vraag die de komende jaren veel discussie zal opleveren.`,
    textEn:
`In the Netherlands it is difficult to find affordable housing. In recent years, house prices have risen sharply. In large cities like Amsterdam, Utrecht and The Hague, people sometimes pay more than five times their annual salary for an average house. As a result, many first-time buyers can no longer manage to buy a home.

There are various causes for the shortage in the market. Firstly, too few new homes are being built. Plans are delayed by objection procedures and a lack of suitable building locations. Secondly, there is high demand from investors who buy properties to rent them out. This makes it increasingly difficult for ordinary people to buy a house.

The government has taken various measures to make the market fairer. For example, a buy-to-let protection has been introduced in certain districts: investors are no longer allowed to rent out properties in those areas if they buy them new. Efforts are also being made to stimulate the construction of affordable rental housing.

Yet many experts are of the opinion that the problems will not be solved in the short term. More drastic measures are needed, such as higher taxes on speculative purchases and faster permit procedures. Young people who want their own home meanwhile have to save hard and be lucky enough to be in the market at the right time.

The housing market therefore features high on the political agenda. How that shortage is addressed is a question that will generate much debate in the years to come.`,
    vocabulary: [
      { nl: 'betaalbaar', en: 'affordable', matches: ['betaalbaar', 'betaalbare'] },
      { nl: 'krapte', en: 'shortage / scarcity' },
      { nl: 'starter op de woningmarkt', en: 'first-time buyer' },
      { nl: 'bezwaarprocedure', en: 'objection procedure' },
      { nl: 'belegger', en: 'investor', matches: ['belegger', 'beleggers'] },
      { nl: 'opkoopbescherming', en: 'buy-to-let protection' },
      { nl: 'speculatief', en: 'speculative' },
      { nl: 'ingrijpend', en: 'drastic / far-reaching' }
    ],
    grammarNotes: [
      {
        pattern: 'Passief (worden + voltooid deelwoord)',
        example: 'worden er te weinig nieuwe huizen gebouwd · worden vertraagd',
        explanation: '"Worden + past participle" forms the passive. The agent (who does it) is often omitted. Here: "too few houses are being built" — by whom is not stated.'
      },
      {
        pattern: 'Zo + inversie (illustrating)',
        example: 'Zo is er een opkoopbescherming ingevoerd',
        explanation: '"Zo" (for example / as follows) can introduce an example or result. It causes inversion: verb comes before subject. Compare: "Een opkoopbescherming is ingevoerd." → "Zo is er een opkoopbescherming ingevoerd."'
      }
    ],
    questions: [
      {
        q: 'Waarom kunnen starters moeilijk een huis kopen?',
        qEn: 'Why is it difficult for first-time buyers to purchase a home?',
        a: 'Omdat de huizenprijzen sterk zijn gestegen en beleggers veel woningen opkopen.',
        aEn: 'Because house prices have risen sharply and investors are buying up many properties.'
      },
      {
        q: 'Wat is de opkoopbescherming?',
        qEn: 'What is the buy-to-let protection?',
        a: 'Een maatregel waarbij beleggers in bepaalde wijken woningen niet meer mogen verhuren als ze ze nieuw kopen.',
        aEn: 'A measure whereby investors in certain districts may no longer rent out properties if they buy them new.'
      }
    ]
  },

  {
    id: 'r-b1-002',
    title: 'Klimaatverandering en ons gedrag',
    titleEn: 'Climate change and our behaviour',
    level: 'B1',
    topic: 'milieu',
    topicEn: 'environment',
    topicEmoji: '🌿',
    wordCount: 278,
    readMinutes: 5,
    text:
`Klimaatverandering is een van de grootste uitdagingen van onze tijd. De gemiddelde temperatuur op aarde stijgt, de zeespiegel neemt toe en extreme weersomstandigheden worden vaker. Wetenschappers zijn het erover eens dat menselijke activiteiten, zoals het verbranden van fossiele brandstoffen, hiervan de hoofdoorzaak zijn.

Toch weten veel mensen niet precies wat ze zelf kunnen doen. Moet je stoppen met vlees eten? Geen vliegvakanties meer boeken? Minder autorijden? De werkelijkheid is dat kleine individuele keuzes soms minder effectief zijn dan mensen denken. Een groot deel van de CO2-uitstoot wordt veroorzaakt door grote bedrijven en industrieën.

Toch heeft individueel gedrag wel degelijk invloed. Als miljoenen mensen tegelijk kiezen voor duurzame alternatieven, verandert de markt mee. Elektrische auto's worden goedkoper doordat meer mensen ze kopen. Plantaardig eten wordt normaler doordat meer mensen ervoor kiezen.

Bovendien heeft persoonlijk gedrag een symbolische waarde. Wie zelf duurzaam leeft, overtuigt makkelijker anderen en zet druk op politici en bedrijven. Veel onderzoekers benadrukken dan ook dat individuele actie en politieke verandering elkaar versterken, en dat je ze niet tegenover elkaar moet stellen.

Wat wel duidelijk is: we kunnen niet wachten tot alles vanuit de overheid geregeld wordt. Verandering begint bij bewustwording — begrijpen hoe onze keuzes bijdragen aan het grotere probleem — en bij de bereidheid om dingen anders te doen, ook als dat soms moeilijker of duurder is.`,
    textEn:
`Climate change is one of the greatest challenges of our time. The average temperature on earth is rising, sea levels are increasing, and extreme weather events are becoming more frequent. Scientists agree that human activities, such as burning fossil fuels, are the main cause.

Yet many people do not know exactly what they themselves can do. Should you stop eating meat? Stop booking flights on holiday? Drive less? The reality is that small individual choices are sometimes less effective than people think. A large share of CO2 emissions is caused by large companies and industries.

Nevertheless, individual behaviour does have an influence. When millions of people simultaneously choose sustainable alternatives, the market changes along with them. Electric cars become cheaper as more people buy them. Plant-based eating becomes more normal as more people choose it.

Moreover, personal behaviour has symbolic value. Those who live sustainably themselves can more easily convince others and put pressure on politicians and businesses. Many researchers therefore emphasise that individual action and political change reinforce each other, and that you should not pit them against each other.

What is clear: we cannot wait for everything to be arranged by the government. Change begins with awareness — understanding how our choices contribute to the bigger problem — and with a willingness to do things differently, even when that is sometimes harder or more expensive.`,
    vocabulary: [
      { nl: 'zeespiegel', en: 'sea level' },
      { nl: 'fossiele brandstoffen', en: 'fossil fuels' },
      { nl: 'duurzaam', en: 'sustainable', matches: ['duurzaam', 'duurzame'] },
      { nl: 'plantaardig', en: 'plant-based' },
      { nl: 'bewustwording', en: 'awareness / awakening' },
      { nl: 'versterken', en: 'to reinforce / strengthen', matches: ['versterken', 'versterkt'] },
      { nl: 'benadrukken', en: 'to emphasise', matches: ['benadrukken', 'benadrukkt'] },
      { nl: 'bereidheid', en: 'willingness' }
    ],
    grammarNotes: [
      {
        pattern: 'Hoewel / toch (concession)',
        example: 'Toch weten veel mensen niet precies... · Toch heeft individueel gedrag wel degelijk invloed.',
        explanation: '"Toch" (yet / nevertheless) introduces a contrast or concession to the previous statement. It can begin a sentence (causing inversion) or appear mid-sentence for emphasis.'
      },
      {
        pattern: 'Doordat-bijzin (causal clause)',
        example: 'Elektrische auto\'s worden goedkoper doordat meer mensen ze kopen.',
        explanation: '"Doordat" (because / due to the fact that) explains a cause. Unlike "omdat", it introduces a factual cause, not a reason given by the speaker. Verb goes to the end of the doordat-clause.'
      }
    ],
    questions: [
      {
        q: 'Waarom zijn individuele keuzes soms minder effectief dan gedacht?',
        qEn: 'Why are individual choices sometimes less effective than thought?',
        a: 'Omdat een groot deel van de CO2-uitstoot door grote bedrijven en industrieën wordt veroorzaakt.',
        aEn: 'Because a large share of CO2 emissions is caused by large companies and industries.'
      },
      {
        q: 'Hoe versterken individuele actie en politieke verandering elkaar?',
        qEn: 'How do individual action and political change reinforce each other?',
        a: 'Wie zelf duurzaam leeft, overtuigt anderen en zet druk op politici en bedrijven.',
        aEn: 'Those who live sustainably themselves convince others and put pressure on politicians and businesses.'
      }
    ]
  },

  {
    id: 'r-b1-003',
    title: 'Vrijwilligerswerk in Nederland',
    titleEn: 'Volunteering in the Netherlands',
    level: 'B1',
    topic: 'samenleving',
    topicEn: 'society',
    topicEmoji: '🤝',
    wordCount: 272,
    readMinutes: 5,
    text:
`Vrijwilligerswerk speelt een grote rol in de Nederlandse samenleving. Miljoenen Nederlanders zetten zich elke week belangeloos in voor anderen: ze helpen bij een voedselbank, begeleiden ouderen, coachen jongeren of runnen een buurtcentrum. Zonder vrijwilligers zouden veel maatschappelijke voorzieningen simpelweg niet kunnen draaien.

De redenen waarom mensen vrijwilligerswerk doen, zijn heel divers. Sommigen willen anderen helpen en iets terugdoen voor de samenleving. Anderen doen het om sociale contacten op te doen of om werkervaring te krijgen. Jongeren die net zijn afgestudeerd en moeilijk werk vinden, kiezen er soms voor om via vrijwilligerswerk hun cv te versterken en hun netwerk uit te breiden.

Hoewel vrijwilligerswerk in principe onbetaald is, biedt het wel degelijk voordelen. Vrijwilligers leren nieuwe vaardigheden, ontmoeten mensen uit andere lagen van de samenleving en ontwikkelen een gevoel van eigenwaarde en nuttigheid. Onderzoek toont aan dat vrijwilligers gemiddeld gelukkiger zijn dan mensen die nooit vrijwilligerswerk doen.

Er zijn ook uitdagingen. Het wordt moeilijker om vrijwilligers te vinden, omdat mensen het drukker hebben en minder tijd beschikbaar hebben. Organisaties moeten vrijwilligers goed ondersteunen, trainen en waarderen om hen te behouden.

De Nederlandse overheid stimuleert vrijwilligerswerk via subsidies en campagnes. Toch is de grootste motivatie nog altijd persoonlijk: de wil om een verschil te maken in iemands leven. Want één uur per week helpen kan voor een ander het verschil zijn tussen eenzaamheid en verbondenheid.`,
    textEn:
`Volunteering plays a major role in Dutch society. Millions of Dutch people selflessly commit themselves every week to helping others: they help at a food bank, support elderly people, coach young people, or run a community centre. Without volunteers, many social facilities would simply not be able to function.

The reasons why people volunteer are very diverse. Some want to help others and give something back to society. Others do it to make social contacts or to gain work experience. Young people who have just graduated and find it difficult to get a job sometimes choose to strengthen their CV and expand their network through volunteering.

Although volunteering is in principle unpaid, it does offer genuine benefits. Volunteers learn new skills, meet people from different walks of life, and develop a sense of self-worth and usefulness. Research shows that volunteers are on average happier than people who never do voluntary work.

There are also challenges. It is becoming harder to find volunteers, because people are busier and have less time available. Organisations need to support, train, and appreciate volunteers well in order to retain them.

The Dutch government stimulates volunteering through subsidies and campaigns. Yet the greatest motivation is always personal: the desire to make a difference in someone's life. Because one hour a week of helping can make the difference between loneliness and connection for someone else.`,
    vocabulary: [
      { nl: 'vrijwilliger', en: 'volunteer', matches: ['vrijwilliger', 'vrijwilligers'] },
      { nl: 'belangeloos', en: 'selflessly / without payment' },
      { nl: 'voedselbank', en: 'food bank' },
      { nl: 'eigenwaarde', en: 'self-worth' },
      { nl: 'nuttigheid', en: 'usefulness' },
      { nl: 'behouden', en: 'to retain / keep' },
      { nl: 'verbondenheid', en: 'connection / sense of belonging' },
      { nl: 'vaardigheden', en: 'skills' }
    ],
    grammarNotes: [
      {
        pattern: 'Hoewel-bijzin (concession)',
        example: 'Hoewel vrijwilligerswerk in principe onbetaald is, biedt het wel degelijk voordelen.',
        explanation: '"Hoewel" (although / even though) introduces a concessive clause. The verb goes to the END of the hoewel-clause. The main clause that follows often uses "toch" or "wel" for contrast.'
      },
      {
        pattern: 'Relatieve bijzin met die/dat',
        example: 'mensen die nooit vrijwilligerswerk doen · Jongeren die net zijn afgestudeerd',
        explanation: 'Relative clauses with "die" (for de-words and plurals) or "dat" (for het-words) describe a noun. The verb goes to the END of the relative clause.'
      }
    ],
    questions: [
      {
        q: 'Noem twee redenen waarom mensen vrijwilligerswerk doen.',
        qEn: 'Give two reasons why people do voluntary work.',
        a: 'Om anderen te helpen / om sociale contacten op te doen / om werkervaring te krijgen / om hun cv te versterken.',
        aEn: 'To help others / to make social contacts / to gain work experience / to strengthen their CV.'
      },
      {
        q: 'Waarom is het moeilijker geworden om vrijwilligers te vinden?',
        qEn: 'Why has it become more difficult to find volunteers?',
        a: 'Omdat mensen het drukker hebben en minder tijd beschikbaar hebben.',
        aEn: 'Because people are busier and have less time available.'
      }
    ]
  },

  {
    id: 'r-b1-004',
    title: 'De invloed van sociale media',
    titleEn: 'The influence of social media',
    level: 'B1',
    topic: 'media',
    topicEn: 'media',
    topicEmoji: '📲',
    wordCount: 268,
    readMinutes: 5,
    text:
`Sociale media zijn niet meer weg te denken uit ons leven. Platforms zoals Instagram, TikTok en X worden dagelijks door miljoenen mensen gebruikt om nieuws te volgen, contact te onderhouden en zichzelf te presenteren. Maar wat doet dit alles met ons?

Aan de ene kant bieden sociale media grote voordelen. Ze verbinden mensen over de hele wereld, geven iedereen een stem en maken het mogelijk om snel informatie te delen. Activisten en journalisten gebruiken sociale media om aandacht te vragen voor misstanden die anders misschien onopgemerkt zouden blijven.

Aan de andere kant zijn er serieuze zorgen. Onderzoek wijst uit dat overmatig gebruik van sociale media kan leiden tot eenzaamheid, slaapproblemen en een negatief zelfbeeld, vooral bij jongeren. De algoritmes van de platforms zorgen ervoor dat gebruikers steeds extremere inhoud te zien krijgen, omdat dat de aandacht langer vasthoudt. Dit kan leiden tot polarisatie en misinformatie.

Veel mensen zeggen dat ze willen stoppen of minder willen gebruiken, maar dat lukt niet altijd. De apps zijn bewust ontworpen om verslavend te zijn: likes, notificaties en oneindige scrollmogelijkheden houden je aan het scherm gekleefd.

Een groeiend aantal scholen verbiedt smartphones in de klas, en sommige landen overwegen strengere regelgeving voor sociale mediaplatforms. Maar de vraag blijft: hoe vinden we een gezonde balans tussen de voordelen van digitale verbondenheid en de risico's voor ons welzijn?`,
    textEn:
`Social media have become an inseparable part of our lives. Platforms such as Instagram, TikTok and X are used daily by millions of people to follow news, maintain contact, and present themselves. But what does all this do to us?

On the one hand, social media offer major advantages. They connect people all over the world, give everyone a voice, and make it possible to share information quickly. Activists and journalists use social media to draw attention to abuses that might otherwise go unnoticed.

On the other hand, there are serious concerns. Research shows that excessive use of social media can lead to loneliness, sleep problems and a negative self-image, especially among young people. The algorithms of the platforms ensure that users are shown increasingly extreme content, because that holds attention for longer. This can lead to polarisation and misinformation.

Many people say they want to stop or use it less, but that doesn't always succeed. The apps are deliberately designed to be addictive: likes, notifications and endless scroll features keep you glued to the screen.

A growing number of schools are banning smartphones in the classroom, and some countries are considering stricter regulation of social media platforms. But the question remains: how do we find a healthy balance between the advantages of digital connectivity and the risks to our well-being?`,
    vocabulary: [
      { nl: 'misstand', en: 'abuse / malpractice', matches: ['misstand', 'misstanden'] },
      { nl: 'algoritme', en: 'algorithm', matches: ['algoritme', 'algoritmes'] },
      { nl: 'polarisatie', en: 'polarisation' },
      { nl: 'misinformatie', en: 'misinformation' },
      { nl: 'verslavend', en: 'addictive' },
      { nl: 'notificatie', en: 'notification', matches: ['notificatie', 'notificaties'] },
      { nl: 'welzijn', en: 'well-being' },
      { nl: 'regelgeving', en: 'regulation / legislation' }
    ],
    grammarNotes: [
      {
        pattern: 'Aan de ene kant... aan de andere kant (contrast structure)',
        example: 'Aan de ene kant bieden sociale media grote voordelen. Aan de andere kant zijn er serieuze zorgen.',
        explanation: 'This two-part structure is very common in Dutch argumentative writing. It presents two sides of a topic. Both phrases cause inversion (verb before subject).'
      },
      {
        pattern: 'Dat-bijzin als onderwerp van zin',
        example: 'Dat overmatig gebruik kan leiden tot eenzaamheid (implied) · De vraag blijft: hoe vinden we een gezonde balans',
        explanation: 'The indirect question "hoe vinden we..." acts as a noun clause (subject/object). In formal writing, indirect questions keep their normal word order (subject before verb).'
      }
    ],
    questions: [
      {
        q: 'Noem twee negatieve effecten van overmatig gebruik van sociale media.',
        qEn: 'Name two negative effects of excessive use of social media.',
        a: 'Eenzaamheid, slaapproblemen, negatief zelfbeeld, polarisatie, misinformatie.',
        aEn: 'Loneliness, sleep problems, negative self-image, polarisation, misinformation.'
      },
      {
        q: 'Waarom zijn sociale media-apps bewust verslavend ontworpen?',
        qEn: 'Why are social media apps deliberately designed to be addictive?',
        a: 'Om gebruikers langer aan het scherm te houden via likes, notificaties en oneindige scrollmogelijkheden.',
        aEn: 'To keep users glued to the screen longer via likes, notifications and endless scroll features.'
      }
    ]
  },

  // ══ B2 LEESOEFENINGEN ════════════════════════════════════════════════════════
  {
    id: 'r-b2-001',
    title: 'De gig-economie: flexibiliteit of onzekerheid?',
    titleEn: 'The gig economy: flexibility or insecurity?',
    level: 'B2',
    topic: 'werk',
    topicEn: 'work',
    topicEmoji: '💼',
    wordCount: 342,
    readMinutes: 6,
    text:
`De opkomst van platformbedrijven als Uber, Deliveroo en Temper heeft geleid tot een nieuwe vorm van werken: de gig-economie. Werknemers — of liever gezegd: zelfstandigen zonder personeel — voeren losse klussen uit via een app, bepalen zelf hun werktijden en zijn niet gebonden aan een vaste werkgever. Voorstanders noemen dit een bevrijding van het traditionele negen-tot-vijf-ritme. Critici zien er echter een race to the bottom in, waarbij werkenden steeds meer rechten en zekerheid verliezen.

De kern van het debat draait om de vraag: zijn platformwerkers werknemers of ondernemers? In Nederland heeft de rechter al meerdere malen geoordeeld dat bezorgers en taxichauffeurs die via een platform werken, feitelijk in dienst zijn van dat platform en recht hebben op werknemersbescherming. Toch slaagt een groot deel van de platformbedrijven erin om deze uitspraken te omzeilen of te vertragen via juridische procedures.

De maatschappelijke kosten van de gig-economie zijn aanzienlijk. Wie geen vast dienstverband heeft, bouwt nauwelijks pensioen op, heeft geen recht op ziektegeld en mist de bescherming van cao-afspraken. Dit legt een toenemende druk op sociale vangnetten die oorspronkelijk ontworpen zijn voor werknemers, niet voor zelfstandigen.

Tegelijkertijd is er ook een groep platformwerkers die bewust kiest voor deze werkwijze. Hoogopgeleide freelancers in de IT- of consultancysector verdienen soms aanzienlijk meer dan hun collega's in loondienst, juist door de flexibiliteit en schaarse expertise die ze meebrengen.

De uitdaging voor beleidsmakers is om regelgeving te ontwerpen die de voordelen van flexibiliteit behoudt, terwijl tegelijkertijd eerlijke arbeidsomstandigheden en sociale bescherming worden gewaarborgd. Dat vergt een delicaat evenwicht — en politieke moed om in te grijpen waar de markt tekortschiet.`,
    textEn:
`The rise of platform companies such as Uber, Deliveroo and Temper has given rise to a new form of work: the gig economy. Workers — or rather, self-employed individuals — carry out one-off jobs via an app, determine their own working hours, and are not tied to a fixed employer. Proponents call this a liberation from the traditional nine-to-five rhythm. Critics, however, see it as a race to the bottom, in which workers increasingly lose rights and security.

The core of the debate revolves around the question: are platform workers employees or entrepreneurs? In the Netherlands, courts have ruled on multiple occasions that couriers and taxi drivers working through a platform are effectively employed by that platform and entitled to employee protection. Yet a large proportion of platform companies manage to circumvent or delay these rulings through legal procedures.

The social costs of the gig economy are considerable. Those without a permanent contract barely accumulate any pension, have no entitlement to sick pay, and lack the protection of collective labour agreements. This places increasing pressure on social safety nets that were originally designed for employees, not the self-employed.

At the same time, there is also a group of platform workers who deliberately choose this way of working. Highly educated freelancers in IT or consultancy sometimes earn considerably more than their salaried colleagues, precisely because of the flexibility and scarce expertise they bring.

The challenge for policymakers is to design regulation that preserves the benefits of flexibility, while at the same time guaranteeing fair working conditions and social protection. That requires a delicate balance — and political courage to intervene where the market falls short.`,
    vocabulary: [
      { nl: 'platformbedrijf', en: 'platform company', matches: ['platformbedrijf', 'platformbedrijven'] },
      { nl: 'zzp\'er', en: 'self-employed person (ZZP)', matches: ['zzp'] },
      { nl: 'race to the bottom', en: 'race to the bottom (competitive undercutting)' },
      { nl: 'omzeilen', en: 'to circumvent / bypass', matches: ['omzeilen', 'slaagt'] },
      { nl: 'dienstverband', en: 'employment contract / employment relationship' },
      { nl: 'vangnet', en: 'safety net', matches: ['vangnet', 'vangnetten'] },
      { nl: 'waarborgen', en: 'to guarantee / safeguard', matches: ['worden gewaarborgd'] },
      { nl: 'delicaat evenwicht', en: 'delicate balance' }
    ],
    grammarNotes: [
      {
        pattern: 'Waarbij-constructie (relative clause with preposition)',
        example: 'een race to the bottom, waarbij werkenden steeds meer rechten verliezen',
        explanation: '"Waarbij" (in which / by which) is a relative pronoun combining a preposition with "die/dat". It is typical of formal written Dutch. "Waarbij" = "bij welke/dat". Verb goes to the end.'
      },
      {
        pattern: 'Terwijl... tegelijkertijd (simultaneous contrast)',
        example: 'terwijl tegelijkertijd eerlijke arbeidsomstandigheden worden gewaarborgd',
        explanation: '"Terwijl" in B2 formal writing often expresses contrast (while / whereas) rather than just simultaneous action. Combined with "tegelijkertijd" it stresses a difficult balance between two things.'
      }
    ],
    questions: [
      {
        q: 'Wat is het kernvraagstuk in het debat over de gig-economie?',
        qEn: 'What is the central issue in the debate about the gig economy?',
        a: 'Of platformwerkers werknemers of ondernemers zijn, en welke rechten ze daarmee hebben.',
        aEn: 'Whether platform workers are employees or entrepreneurs, and what rights they are entitled to.'
      },
      {
        q: 'Welke uitdaging staat beleidsmakers te wachten?',
        qEn: 'What challenge awaits policymakers?',
        a: 'Regelgeving ontwerpen die flexibiliteit behoudt én sociale bescherming en eerlijke arbeidsomstandigheden waarborgt.',
        aEn: 'Designing regulation that preserves flexibility while also guaranteeing social protection and fair working conditions.'
      }
    ]
  },

  {
    id: 'r-b2-002',
    title: 'Ongelijkheid in het Nederlandse onderwijs',
    titleEn: 'Inequality in Dutch education',
    level: 'B2',
    topic: 'onderwijs',
    topicEn: 'education',
    topicEmoji: '🎓',
    wordCount: 335,
    readMinutes: 6,
    text:
`Het Nederlandse onderwijssysteem wordt internationaal geprezen om zijn kwaliteit. Toch schuilt er achter die positieve beeldvorming een hardnekkig probleem: de kansen van een kind worden in sterke mate bepaald door het milieu waarin het opgroeit. Onderzoek toont keer op keer aan dat kinderen uit hogere sociaaleconomische milieus significant hogere eindadviezen krijgen op de basisschool, vaker doorstromen naar het vwo en uiteindelijk vaker universitair studeren dan kinderen uit lagere milieus.

Een deel van de verklaring ligt in structurele kenmerken van het systeem zelf. Op tienjarige leeftijd — een leeftijd waarop de persoonlijkheid en cognitieve capaciteiten nog volop in ontwikkeling zijn — worden kinderen geselecteerd voor een schooltype dat in grote mate hun verdere loopbaan bepaalt. Hoewel heropstroming in principe mogelijk is, lukt het de meeste leerlingen niet om na het vmbo alsnog naar het havo te switchen.

Daarnaast spelen informele mechanismen een rol. Leraren die onbewust hogere verwachtingen hebben van kinderen die goed gekleed zijn en beschaafd praten, of ouders die via hun netwerk toegang hebben tot bijlessen en aanvullende activiteiten: al deze factoren versterken de bestaande ongelijkheid zonder dat er sprake is van opzet.

Beleidsmakers erkennen het probleem steeds meer, maar de oplossingen zijn omstreden. Latere selectie, meer ondersteuning voor scholen in achterstandswijken en het terugdringen van betaald bijlesonderwijs zijn maatregelen die worden voorgesteld, maar die stuiten op weerstand van degenen die de huidige vrijheid van het systeem willen bewaren.

Uiteindelijk raakt dit vraagstuk aan iets fundamenteels: gelooft een samenleving werkelijk in gelijke kansen, of beschouwt ze ongelijkheid als een onvermijdelijk bijproduct van meritocratisch denken?`,
    textEn:
`The Dutch education system is internationally praised for its quality. Yet behind that positive image lies a persistent problem: a child's opportunities are largely determined by the environment in which it grows up. Research shows time and again that children from higher socioeconomic backgrounds receive significantly higher primary school recommendations, more often progress to pre-university education and ultimately study at university more often than children from lower-income backgrounds.

Part of the explanation lies in structural features of the system itself. At the age of ten — an age at which personality and cognitive abilities are still very much in development — children are selected for a school type that largely determines the rest of their career. Although upward progression is in principle possible, most pupils do not manage to switch to higher education after vmbo.

In addition, informal mechanisms play a role. Teachers who unconsciously have higher expectations of children who are well-dressed and speak articulately, or parents who through their network have access to private tuition and additional activities: all these factors reinforce existing inequality without any intent.

Policymakers are increasingly acknowledging the problem, but solutions are contested. Later selection, more support for schools in disadvantaged areas, and reducing paid private tuition are measures being proposed, but they meet with resistance from those who wish to preserve the current freedom of the system.

Ultimately, this issue touches something fundamental: does a society truly believe in equal opportunity, or does it regard inequality as an inevitable by-product of meritocratic thinking?`,
    vocabulary: [
      { nl: 'kansenongelijkheid', en: 'inequality of opportunity' },
      { nl: 'sociaaleconomisch milieu', en: 'socioeconomic background' },
      { nl: 'doorstromen', en: 'to progress (to a higher level)', matches: ['doorstromen', 'doorstroom'] },
      { nl: 'heropstroming', en: 'upward progression / moving up a school level' },
      { nl: 'omstreden', en: 'contested / controversial' },
      { nl: 'achterstandswijk', en: 'deprived / disadvantaged neighbourhood' },
      { nl: 'meritocratisch', en: 'meritocratic' },
      { nl: 'hardnekkig', en: 'persistent / stubborn' }
    ],
    grammarNotes: [
      {
        pattern: 'Passief met worden (heden) en zijn + VD (resultaat)',
        example: 'worden kinderen geselecteerd · worden voorgesteld · wordt internationaal geprezen',
        explanation: 'B2 texts frequently use the passive to create formal, impersonal style. "Worden + VD" = ongoing/process. "Zijn + VD" = state/result: "kinderen zijn geselecteerd" (they are already selected).'
      },
      {
        pattern: 'Nominalisatie (verbs → nouns for formal style)',
        example: 'de selectie (← selecteren) · de verklaring (← verklaren) · de ondersteuning (← ondersteunen)',
        explanation: 'Formal Dutch converts verbs into nouns (nominalisation). This creates a more abstract, academic style. Common suffixes: -ing, -tie, -heid, -schap. Recognising these makes formal texts much easier to read.'
      }
    ],
    questions: [
      {
        q: 'Op welke leeftijd worden Nederlandse kinderen geselecteerd voor een schooltype, en wat is het probleem daarmee?',
        qEn: 'At what age are Dutch children selected for a school type, and what is the problem with that?',
        a: 'Op tienjarige leeftijd, terwijl de cognitieve capaciteiten dan nog volop in ontwikkeling zijn.',
        aEn: 'At the age of ten, while cognitive abilities are still very much in development at that age.'
      },
      {
        q: 'Wat bedoelt de auteur met "informele mechanismen"?',
        qEn: 'What does the author mean by "informal mechanisms"?',
        a: 'Onbewuste vooroordelen van leraren en de voordelen die rijkere ouders hun kinderen kunnen bieden (bijles, netwerk).',
        aEn: "Teachers' unconscious biases and the advantages that wealthier parents can offer their children (private tuition, network)."
      }
    ]
  },

  {
    id: 'r-b2-003',
    title: 'Klimaatbeleid: ambitie versus realiteit',
    titleEn: 'Climate policy: ambition versus reality',
    level: 'B2',
    topic: 'politiek',
    topicEn: 'politics',
    topicEmoji: '🌍',
    wordCount: 338,
    readMinutes: 6,
    text:
`Bijna alle westerse landen hebben ambitieuze klimaatdoelstellingen vastgesteld: een significante vermindering van de CO2-uitstoot in 2030 en volledige klimaatneutraliteit in 2050. De vraag is echter in hoeverre die ambities worden waargemaakt. Want tussen het opstellen van doelstellingen en het daadwerkelijk realiseren ervan gaapt een kloof die steeds groter lijkt te worden.

De uitdaging zit deels in de aard van het probleem zelf. Klimaatverandering vereist structurele aanpassingen in de economie, de industrie en het dagelijks leven van mensen — aanpassingen die op korte termijn kosten met zich meebrengen en pas op lange termijn vruchten afwerpen. Politici die afhankelijk zijn van kiezers die snel resultaat willen zien, staan voor een fundamenteel dilemma.

Tegelijkertijd is er sprake van wat wetenschappers "beleidsinconsistentie" noemen: overheden die aan de ene kant subsidies geven voor elektrische auto's, en aan de andere kant de fossiele industrie blijven steunen via belastingvoordelen. Dergelijke tegenstrijdigheden ondermijnen het vertrouwen van burgers in de oprechtheid van het klimaatbeleid.

Desondanks zijn er veelbelovende ontwikkelingen. De prijs van zonne- en windenergie is de afgelopen decennia drastisch gedaald, waardoor duurzame energie steeds concurrerender wordt ten opzichte van fossiele alternatieven. In landen als Denemarken en Duitsland wordt een aanzienlijk deel van de elektriciteit al opgewekt uit hernieuwbare bronnen.

Critici betogen dat technologische innovatie alleen niet genoeg is. Er is ook een maatschappelijke en politieke transformatie nodig: een fundamentele herziening van consumptiepatronen, productiemethoden en het economische groeidenken dat ten grondslag ligt aan veel beleidsvorming. Dat is een uitdaging van een geheel andere orde.`,
    textEn:
`Almost all Western countries have set ambitious climate targets: a significant reduction of CO2 emissions by 2030 and complete climate neutrality by 2050. The question is, however, to what extent those ambitions are being realised. For between setting targets and actually achieving them, there is a gap that seems to be growing ever wider.

The challenge lies partly in the nature of the problem itself. Climate change requires structural adjustments in the economy, industry and people's daily lives — adjustments that involve short-term costs and only bear fruit in the long term. Politicians who depend on voters who want to see quick results face a fundamental dilemma.

At the same time, what scientists call "policy inconsistency" is at play: governments that on the one hand provide subsidies for electric cars, and on the other hand continue to support the fossil fuel industry through tax benefits. Such contradictions undermine citizens' trust in the sincerity of climate policy.

Nevertheless, there are promising developments. The price of solar and wind energy has fallen dramatically in recent decades, making sustainable energy increasingly competitive compared to fossil alternatives. In countries such as Denmark and Germany, a significant share of electricity is already generated from renewable sources.

Critics argue that technological innovation alone is not enough. A social and political transformation is also needed: a fundamental revision of consumption patterns, production methods, and the economic growth thinking that underpins much policymaking. That is a challenge of an entirely different order.`,
    vocabulary: [
      { nl: 'klimaatneutraliteit', en: 'climate neutrality' },
      { nl: 'beleidsinconsistentie', en: 'policy inconsistency' },
      { nl: 'belastingvoordeel', en: 'tax benefit', matches: ['belastingvoordelen'] },
      { nl: 'ondermijnen', en: 'to undermine', matches: ['ondermijnen', 'ondermijnt'] },
      { nl: 'hernieuwbare bronnen', en: 'renewable sources' },
      { nl: 'herziening', en: 'revision / review' },
      { nl: 'ten grondslag liggen aan', en: 'to underpin / be the basis of' },
      { nl: 'veelbelovend', en: 'promising' }
    ],
    grammarNotes: [
      {
        pattern: 'Waardoor-constructie (relative clause expressing result)',
        example: 'De prijs van zonne-energie is gedaald, waardoor duurzame energie concurrerender wordt.',
        explanation: '"Waardoor" (which causes / as a result of which) introduces a relative clause that expresses a consequence. It combines "door" + "wat/welke". Verb goes to the end of the waardoor-clause.'
      },
      {
        pattern: 'Desondanks / Tegelijkertijd / Critici betogen dat (B2 discourse markers)',
        example: 'Desondanks zijn er veelbelovende ontwikkelingen. · Critici betogen dat...',
        explanation: 'B2 academic texts use specific discourse markers to structure arguments: "desondanks" (despite this), "tegelijkertijd" (at the same time), "betogen dat" (to argue that). Recognising these helps you follow complex reasoning.'
      }
    ],
    questions: [
      {
        q: 'Wat bedoelt de auteur met "beleidsinconsistentie"?',
        qEn: 'What does the author mean by "policy inconsistency"?',
        a: 'Dat overheden enerzijds duurzaamheid stimuleren en anderzijds de fossiele industrie blijven steunen via belastingvoordelen.',
        aEn: 'That governments on the one hand stimulate sustainability and on the other hand continue to support the fossil fuel industry through tax benefits.'
      },
      {
        q: 'Waarom is technologische innovatie alleen niet genoeg, volgens critici?',
        qEn: 'According to critics, why is technological innovation alone not enough?',
        a: 'Er is ook een maatschappelijke en politieke transformatie nodig: een herziening van consumptiepatronen en het economische groeidenken.',
        aEn: 'A social and political transformation is also needed: a revision of consumption patterns and economic growth thinking.'
      }
    ]
  },

  {
    id: 'r-b2-004',
    title: 'Kunstmatige intelligentie: revolutie of hype?',
    titleEn: 'Artificial intelligence: revolution or hype?',
    level: 'B2',
    topic: 'technologie',
    topicEn: 'technology',
    topicEmoji: '🤖',
    wordCount: 345,
    readMinutes: 6,
    text:
`Kunstmatige intelligentie domineert al geruime tijd de nieuwscyclus. Generatieve AI-systemen zoals ChatGPT genereren teksten, beelden en code die nauwelijks van menselijk werk te onderscheiden zijn. Voorstanders spreken van een productiviteitsrevolutie; sceptici waarschuwen voor een technologie die fundamentele vragen stelt bij menselijke autonomie, privacy en de arbeidsmarkt.

De economische impact is al voelbaar. Taken die tien jaar geleden exclusief door mensen werden uitgevoerd — juridisch onderzoek, medische diagnoses, vertaalwerk, grafisch ontwerp — worden nu deels of volledig door algoritmes overgenomen. McKinsey Global Institute schat dat automatisering in de komende tien tot vijftien jaar een significant deel van de huidige werkgelegenheid kan verstoren.

Tegelijkertijd wordt het narratief van massale werkloosheid door optimisten genuanceerd. Elke voorgaande technologische revolutie — van de stoommachine tot het internet — heeft uiteindelijk meer banen gecreëerd dan vernietigd, zij het andere banen. De vraag is of de huidige AI-golf snel genoeg nieuwe economische sectoren zal genereren om de verloren banen te compenseren.

Naast economische implicaties roept AI ook diepere maatschappelijke vragen op. Wie is verantwoordelijk als een algoritmische beslissing iemand schaadt — de programmeur, het bedrijf, of de gebruiker? Hoe voorkomen we dat trainingsdata bestaande discriminatie en vooroordelen versterken? En hoe beschermen we democratische processen tegen de verspreiding van desinformatie op ongekende schaal?

De Europese Unie heeft met de AI Act geprobeerd een antwoord te formuleren op deze vragen, maar de implementatie ervan stuit op de gebruikelijke spanning tussen innovatievrijheid en regulering. De uitkomst van dat debat zal in belangrijke mate bepalen in welke samenleving we over twintig jaar leven.`,
    textEn:
`Artificial intelligence has dominated the news cycle for some time now. Generative AI systems such as ChatGPT generate texts, images and code that are barely distinguishable from human work. Proponents speak of a productivity revolution; sceptics warn of a technology that raises fundamental questions about human autonomy, privacy and the labour market.

The economic impact is already being felt. Tasks that ten years ago were performed exclusively by humans — legal research, medical diagnoses, translation work, graphic design — are now being partially or fully taken over by algorithms. The McKinsey Global Institute estimates that automation could disrupt a significant share of current employment in the next ten to fifteen years.

At the same time, the narrative of mass unemployment is being nuanced by optimists. Every previous technological revolution — from the steam engine to the internet — has ultimately created more jobs than it destroyed, albeit different ones. The question is whether the current AI wave will generate new economic sectors quickly enough to compensate for the jobs lost.

Beyond economic implications, AI also raises deeper social questions. Who is responsible when an algorithmic decision harms someone — the programmer, the company, or the user? How do we prevent training data from reinforcing existing discrimination and biases? And how do we protect democratic processes against the spread of disinformation on an unprecedented scale?

The European Union has attempted to answer these questions with the AI Act, but its implementation runs into the usual tension between freedom of innovation and regulation. The outcome of that debate will in large part determine what kind of society we live in twenty years from now.`,
    vocabulary: [
      { nl: 'generatieve AI', en: 'generative AI' },
      { nl: 'autonomie', en: 'autonomy' },
      { nl: 'genuanceerd', en: 'nuanced', matches: ['genuanceerd', 'genuanceerde'] },
      { nl: 'narratief', en: 'narrative' },
      { nl: 'implementatie', en: 'implementation' },
      { nl: 'ongekend', en: 'unprecedented' },
      { nl: 'stuit op', en: 'runs into / encounters (resistance)', matches: ['stuit', 'stuiten'] },
      { nl: 'trainingsdata', en: 'training data' }
    ],
    grammarNotes: [
      {
        pattern: 'Zij het (albeit / although)',
        example: 'meer banen gecreëerd dan vernietigd, zij het andere banen',
        explanation: '"Zij het" is a formal B2/C1 phrase meaning "albeit" or "although they are". It introduces a qualification or exception in a concise, literary way. Common in formal written Dutch.'
      },
      {
        pattern: 'Wie + bijzin als vraagzin in tekst',
        example: 'Wie is verantwoordelijk als een algoritmische beslissing iemand schaadt?',
        explanation: 'Rhetorical questions using "wie", "hoe", "wat" are very common in Dutch argumentative texts to raise issues without immediately answering them. They engage the reader and signal a shift in the argument.'
      }
    ],
    questions: [
      {
        q: 'Hoe nuanceren optimisten het narratief van massale werkloosheid door AI?',
        qEn: 'How do optimists nuance the narrative of mass unemployment through AI?',
        a: 'Door te wijzen op eerdere technologische revoluties die uiteindelijk meer banen creëerden dan ze vernietigden.',
        aEn: 'By pointing to previous technological revolutions that ultimately created more jobs than they destroyed.'
      },
      {
        q: 'Welke maatschappelijke vragen roept AI op naast de economische?',
        qEn: 'What social questions does AI raise beyond the economic ones?',
        a: 'Verantwoordelijkheid bij schade, vooroordelen in trainingsdata, en bescherming van democratie tegen desinformatie.',
        aEn: 'Responsibility when harm occurs, biases in training data, and protecting democracy against disinformation.'
      }
    ]
  },

  // ── DAILY CONVERSATIONS ────────────────────────────────────────────────────

  {
    id: 'r-a2-001',
    title: 'Op de markt',
    titleEn: 'At the market',
    level: 'A2',
    topic: 'dagelijks',
    topicEn: 'daily life',
    topicEmoji: '🛒',
    wordCount: 221,
    readMinutes: 3,
    text:
`Op zaterdagochtend gaat Emma naar de markt in het centrum. Er zijn veel kramen met groenten, fruit, kaas, vis en bloemen. De markt begint vroeg: om acht uur 's ochtends zijn de eerste verkopers er al. Emma gaat elke week, want de producten zijn vaak verser en goedkoper dan in de supermarkt.

Bij een groentekraam ziet ze mooie tomaten. "Hoeveel kosten die tomaten?" vraagt ze. "Twee euro per kilo," zegt de verkoper. "Dan neem ik een kilo, alstublieft," antwoordt Emma. De verkoper legt de tomaten in een zak en geeft ze aan haar. Emma betaalt met muntgeld.

Daarna gaat ze naar een kaaskraam. Daar mag je altijd proeven voor je koopt. Emma proeft drie soorten kaas. Ze kiest uiteindelijk voor de belegen Goudse kaas, want die is niet te sterk en niet te zacht. Kaas op de markt is duurder dan in de supermarkt, maar de smaak is veel beter.

Aan het einde van de ochtend heeft Emma een volle tas. Ze heeft groenten, fruit, kaas en een boeket tulpen gekocht. Op de markt voel je de gezelligheid van de stad. Je praat even met de verkopers en soms zie je buren of vrienden. Emma betaalt altijd contant, want niet alle kramen accepteren pinpassen.`,
    textEn:
`On Saturday morning, Emma goes to the market in the city centre. There are many stalls with vegetables, fruit, cheese, fish, and flowers. The market starts early: at eight o'clock in the morning, the first vendors are already there. Emma goes every week, because the products are often fresher and cheaper than in the supermarket.

At a vegetable stall, she sees beautiful tomatoes. "How much do those tomatoes cost?" she asks. "Two euros per kilo," says the vendor. "Then I'll take a kilo, please," Emma replies. The vendor puts the tomatoes in a bag and hands them to her. Emma pays with coins.

Then she goes to a cheese stall. There you can always taste before you buy. Emma tastes three kinds of cheese. She ultimately chooses the medium-aged Gouda cheese, because it is not too strong and not too mild. Cheese at the market is more expensive than at the supermarket, but the taste is much better.

By the end of the morning, Emma has a full bag. She has bought vegetables, fruit, cheese, and a bunch of tulips. At the market you feel the cosiness of the city. You chat briefly with the vendors and sometimes see neighbours or friends. Emma always pays cash, because not all stalls accept card payments.`,
    vocabulary: [
      { nl: 'de kraam', en: 'market stall', matches: ['kraam', 'kramen'] },
      { nl: 'de verkoper', en: 'vendor / seller', matches: ['verkoper', 'verkopers'] },
      { nl: 'proeven', en: 'to taste / to try' },
      { nl: 'belegen', en: 'medium-aged (cheese)' },
      { nl: 'muntgeld', en: 'coins / loose change' },
      { nl: 'het boeket', en: 'bouquet', matches: ['boeket'] },
      { nl: 'contant betalen', en: 'to pay cash' },
      { nl: 'de pinpas', en: 'debit card', matches: ['pinpassen'] },
      { nl: 'de gezelligheid', en: 'cosiness / conviviality' },
      { nl: 'uiteindelijk', en: 'ultimately / in the end' }
    ],
    grammarNotes: [
      {
        pattern: 'Dan + inversion',
        example: 'Dan neem ik een kilo.',
        explanation: 'When a sentence starts with "dan" (then), the verb comes before the subject. This is standard Dutch inversion: any non-subject element in first position triggers verb-subject flip.'
      },
      {
        pattern: 'Voltooid tegenwoordige tijd (VTT) met hebben',
        example: 'Ze heeft groenten, fruit en kaas gekocht.',
        explanation: 'Completed actions use hebben/zijn + past participle. Regular verbs: ge- + stem + -d or -t. "Gekocht" (bought) is the irregular past participle of "kopen".'
      },
      {
        pattern: 'Want vs. omdat (because)',
        example: 'want de producten zijn verser · omdat de producten verser zijn',
        explanation: '"Want" keeps normal word order. "Omdat" sends the verb to the end of its clause. Both mean "because" — choose "want" for direct, informal explanation; "omdat" to emphasise the reason.'
      }
    ],
    questions: [
      {
        q: 'Waarom gaat Emma elke week naar de markt?',
        qEn: 'Why does Emma go to the market every week?',
        a: 'Omdat de producten vaak verser en goedkoper zijn dan in de supermarkt.',
        aEn: 'Because the products are often fresher and cheaper than in the supermarket.'
      },
      {
        q: 'Wat doet Emma bij de kaaskraam voor ze iets koopt?',
        qEn: 'What does Emma do at the cheese stall before buying anything?',
        a: 'Ze proeft drie soorten kaas.',
        aEn: 'She tastes three kinds of cheese.'
      },
      {
        q: 'Waarom betaalt Emma altijd contant op de markt?',
        qEn: 'Why does Emma always pay cash at the market?',
        a: 'Niet alle kramen accepteren pinpassen.',
        aEn: 'Not all stalls accept card payments.'
      }
    ]
  },

  {
    id: 'r-a2-002',
    title: 'Bij de huisarts',
    titleEn: 'At the doctor\'s',
    level: 'A2',
    topic: 'gezondheid',
    topicEn: 'health',
    topicEmoji: '🩺',
    wordCount: 224,
    readMinutes: 3,
    text:
`In Nederland heeft bijna iedereen een vaste huisarts. De huisarts is de eerste dokter die je bezoekt als je ziek bent. Voor specialistische zorg heb je altijd een doorverwijzing nodig.

Thomas voelt zich al drie dagen niet goed. Hij heeft hoofdpijn, keelpijn en koorts. Hij belt de praktijk. Een assistente neemt op: "Met de praktijk van dokter Van der Berg, waarmee kan ik u helpen?" Thomas legt zijn klachten uit. "Kunt u morgenochtend om tien uur komen?" vraagt de assistente. "Ja, dat lukt," zegt Thomas.

De volgende ochtend fietst Thomas naar de huisarts. In de wachtkamer zitten twee andere mensen. Na vijf minuten mag hij naar binnen. Dokter Van der Berg stelt een paar vragen: "Hoe lang heeft u deze klachten al? Heeft u ook hoest? Kunt u uw mond opendoen?"

Ze bekijkt zijn keel en meet zijn temperatuur: 38,5 graden. "U heeft een virusinfectie," zegt ze. "Rust veel uit, drink genoeg water en neem paracetamol als de pijn te erg wordt. Als u na vijf dagen niet beter bent, moet u terugkomen."

Thomas is blij dat hij geen antibiotica nodig heeft. Hij gaat naar huis, trekt zijn pyjama aan en slaapt de rest van de dag. De volgende dag voelt hij zich al iets beter.`,
    textEn:
`In the Netherlands, almost everyone has a regular GP (general practitioner). The GP is the first doctor you visit when you are ill. For specialist care you always need a referral.

Thomas has been feeling unwell for three days. He has a headache, sore throat, and fever. He calls the practice. A receptionist picks up: "This is the practice of Doctor Van der Berg, how can I help you?" Thomas explains his symptoms. "Can you come tomorrow morning at ten o'clock?" the receptionist asks. "Yes, that works," says Thomas.

The following morning, Thomas cycles to the GP. Two other people are sitting in the waiting room. After five minutes he is called in. Doctor Van der Berg asks a few questions: "How long have you had these symptoms? Do you also have a cough? Can you open your mouth?"

She examines his throat and takes his temperature: 38.5 degrees. "You have a viral infection," she says. "Rest a lot, drink enough water, and take paracetamol if the pain becomes too severe. If you're not better in five days, you must come back."

Thomas is glad he does not need antibiotics. He goes home, puts on his pyjamas, and sleeps for the rest of the day. The next day he already feels a little better.`,
    vocabulary: [
      { nl: 'de huisarts', en: 'GP / family doctor', matches: ['huisarts'] },
      { nl: 'de doorverwijzing', en: 'referral', matches: ['doorverwijzing'] },
      { nl: 'de klacht', en: 'complaint / symptom', matches: ['klachten'] },
      { nl: 'de assistente', en: 'receptionist / assistant' },
      { nl: 'de wachtkamer', en: 'waiting room' },
      { nl: 'de koorts', en: 'fever' },
      { nl: 'de hoest', en: 'cough' },
      { nl: 'de virusinfectie', en: 'viral infection' },
      { nl: 'paracetamol', en: 'paracetamol (pain reliever)' },
      { nl: 'antibiotica', en: 'antibiotics' },
      { nl: 'uitrusten', en: 'to rest', matches: ['rust uit'] }
    ],
    grammarNotes: [
      {
        pattern: 'Modaal werkwoord + infinitief achteraan',
        example: 'Kunt u morgenochtend om tien uur komen?',
        explanation: 'Modal verbs (kunnen, moeten, mogen, willen) push the main infinitive to the end of the clause. In a question, the modal inverts with the subject: "Kunt u...komen?"'
      },
      {
        pattern: 'Gebiedende wijs (imperative)',
        example: 'Rust veel uit · Drink genoeg water · Neem paracetamol.',
        explanation: 'The imperative for giving instructions or advice uses the verb stem alone. For separable verbs like "uitrusten", the prefix moves to the end: "Rust uit."'
      },
      {
        pattern: 'Als-zin (conditional clause)',
        example: 'Als de pijn te erg wordt, neem dan paracetamol.',
        explanation: '"Als" (if/when) starts a subordinate clause where the verb goes to the end. The main clause that follows often starts with "dan" and uses inversion.'
      }
    ],
    questions: [
      {
        q: 'Wanneer heb je in Nederland een doorverwijzing nodig?',
        qEn: 'When do you need a referral in the Netherlands?',
        a: 'Voor specialistische zorg.',
        aEn: 'For specialist care.'
      },
      {
        q: 'Wat zijn de klachten van Thomas?',
        qEn: 'What are Thomas\'s symptoms?',
        a: 'Hoofdpijn, keelpijn en koorts.',
        aEn: 'Headache, sore throat, and fever.'
      },
      {
        q: 'Wat adviseert de dokter aan Thomas?',
        qEn: 'What does the doctor advise Thomas?',
        a: 'Veel rusten, genoeg water drinken en paracetamol nemen als de pijn te erg wordt.',
        aEn: 'Rest a lot, drink enough water, and take paracetamol if the pain becomes too severe.'
      }
    ]
  },

  {
    id: 'r-a2-003',
    title: 'Een verjaardag vieren',
    titleEn: 'Celebrating a birthday',
    level: 'A2',
    topic: 'dagelijks',
    topicEn: 'daily life',
    topicEmoji: '🎂',
    wordCount: 219,
    readMinutes: 3,
    text:
`Een verjaardag vieren in Nederland gaat vaak anders dan in andere landen. Nederlanders feliciteren niet alleen de jarige, maar ook de familie. Als iemand jarig is, zegt men: "Gefeliciteerd met je verjaardag!" Maar ook tegen de moeder of broer van de jarige: "Gefeliciteerd met je dochter!" of "Gefeliciteerd met je broer!" Dit is een typisch Nederlandse gewoonte.

Bij een verjaardag hoort altijd taart of gebak. De jarige trakteert: hij of zij brengt iets lekkers mee naar het werk of school. Thuis krijg je als jarige bezoek van familie en vrienden. Ze zitten samen in een kring in de woonkamer en drinken koffie of thee met cake.

Sofia viert vandaag haar dertigste verjaardag. Haar familie en vrienden komen 's avonds langs. Ze heeft een slagroomtaart gekocht bij de bakker en de woonkamer versierd met slingers en ballonnen. Haar moeder brengt zelfgemaakte appelgebak mee.

Als de gasten binnenkomen, zegt iedereen "Gefeliciteerd!" en geeft Sofia een kus op drie wangen. Ze zitten de hele avond gezellig bij elkaar, praten en lachen. Om tien uur gaan de eerste gasten naar huis.

"Een verjaardag in Nederland is altijd gezellig," zegt Sofia. "Je bent de hele dag omringd door mensen die van je houden."`,
    textEn:
`Celebrating a birthday in the Netherlands is often different from other countries. Dutch people congratulate not only the birthday person, but also the family. When someone has a birthday, people say: "Congratulations on your birthday!" But also to the mother or brother of the birthday person: "Congratulations on your daughter!" or "Congratulations on your brother!" This is a typically Dutch custom.

A birthday always involves cake or pastry. The birthday person treats: he or she brings something tasty to work or school. At home, the birthday person receives visits from family and friends. They sit together in a circle in the living room and drink coffee or tea with cake.

Sofia is celebrating her thirtieth birthday today. Her family and friends come by in the evening. She has bought a cream cake from the bakery and decorated the living room with garlands and balloons. Her mother brings homemade apple cake.

When the guests arrive, everyone says "Congratulations!" and gives Sofia a kiss on three cheeks. They sit cosily together the whole evening, talking and laughing. At ten o'clock, the first guests go home.

"A birthday in the Netherlands is always fun," says Sofia. "You are surrounded by people who love you all day long."`,
    vocabulary: [
      { nl: 'feliciteren', en: 'to congratulate', matches: ['feliciteren', 'gefeliciteerd'] },
      { nl: 'de jarige', en: 'the birthday person' },
      { nl: 'trakteren', en: 'to treat (bring food for others)', matches: ['trakteert'] },
      { nl: 'de slagroomtaart', en: 'cream cake' },
      { nl: 'de slinger', en: 'garland / bunting', matches: ['slingers'] },
      { nl: 'de ballon', en: 'balloon', matches: ['ballonnen'] },
      { nl: 'de woonkamer', en: 'living room' },
      { nl: 'de wang', en: 'cheek', matches: ['wangen'] },
      { nl: 'omringd door', en: 'surrounded by' },
      { nl: 'de gewoonte', en: 'custom / habit' }
    ],
    grammarNotes: [
      {
        pattern: 'Men + werkwoord (impersonal "one")',
        example: 'Als iemand jarig is, zegt men: "Gefeliciteerd!"',
        explanation: '"Men" is the impersonal subject meaning "one" or "people in general". It always takes a third-person singular verb. Formal but common in Dutch descriptions of customs and habits.'
      },
      {
        pattern: 'Als-zin met inversion in de hoofdzin',
        example: 'Als de gasten binnenkomen, zegt iedereen "Gefeliciteerd!"',
        explanation: 'When "als" starts the sentence, the verb comes right after the comma in the main clause (inversion). The subject "iedereen" follows the verb "zegt".'
      },
      {
        pattern: 'Possessief + relatief (wiens/haar/zijn)',
        example: 'hij of zij brengt iets lekkers mee naar het werk',
        explanation: '"Iets lekkers" = something tasty. After "iets", "niets", "wat", Dutch uses an adjective + -s (genitive form): "iets lekkers", "niets nieuws", "wat anders".'
      }
    ],
    questions: [
      {
        q: 'Wat is een typisch Nederlandse verjaardag gewoonte?',
        qEn: 'What is a typically Dutch birthday custom?',
        a: 'Je feliciteert niet alleen de jarige, maar ook zijn of haar familie.',
        aEn: 'You congratulate not only the birthday person, but also their family.'
      },
      {
        q: 'Wat betekent "trakteren" in de context van een verjaardag?',
        qEn: 'What does "trakteren" mean in the context of a birthday?',
        a: 'De jarige brengt iets lekkers mee naar het werk of school voor anderen.',
        aEn: 'The birthday person brings something tasty to work or school for others.'
      },
      {
        q: 'Hoe begroet Sofia haar gasten?',
        qEn: 'How does Sofia greet her guests?',
        a: 'Ze zegt "Gefeliciteerd!" en geeft een kus op drie wangen.',
        aEn: 'She says "Congratulations!" and gives a kiss on three cheeks.'
      }
    ]
  },

  {
    id: 'r-a2-004',
    title: 'In het café',
    titleEn: 'At the café',
    level: 'A2',
    topic: 'eten',
    topicEn: 'food & drink',
    topicEmoji: '☕',
    wordCount: 217,
    readMinutes: 3,
    text:
`Nederland heeft veel bruine kroegen en moderne koffiebars. Een "bruin café" is een traditioneel café met houten meubels, donkere muren en een gezellige sfeer. De naam komt van het bruine interieur. In een bruin café bestel je meestal bier, wijn of koffie met een bitterbal.

Lena en haar collega Mark gaan na het werk naar een café in de buurt van kantoor. Ze gaan aan een tafeltje bij het raam zitten. Even later komt de ober naar hen toe.

"Wat mag het zijn?" vraagt de ober. "Ik neem een cappuccino, alstublieft," zegt Lena. "En voor mij een biertje," zegt Mark. "Wilt u ook iets eten?" vraagt de ober. "Ja, graag. Heeft u toevallig bitterballen?" vraagt Mark. "Jazeker," zegt de ober. "Dan nemen we er een portie van."

Even later brengt de ober de drankjes en een schaaltje bitterballen. Mark pakt er een en waait er een beetje op, want ze zijn heet van binnen. Lena lacht. "Altijd ongeduldig," zegt ze.

Ze praten over de werkdag, plannen voor het weekend en een collega die binnenkort trouwt. Na een uur vraagt Lena om de rekening. "Betalen we apart?" vraagt ze. "Nee, ik trakteer," zegt Mark. "Dat is dan vijftien euro tachtig," zegt de ober. Mark tikt zijn telefoon op de betaalautomaat. "Dank u wel!" zegt de ober.`,
    textEn:
`The Netherlands has many "brown pubs" and modern coffee bars. A "brown café" is a traditional pub with wooden furniture, dark walls, and a cosy atmosphere. The name comes from the brown interior. In a brown café you usually order beer, wine, or coffee with a bitterbal (deep-fried snack).

Lena and her colleague Mark go to a café near the office after work. They sit down at a table by the window. Shortly after, the waiter comes over to them.

"What can I get you?" asks the waiter. "I'll have a cappuccino, please," says Lena. "And a beer for me," says Mark. "Would you also like something to eat?" asks the waiter. "Yes, please. Do you happen to have bitterballen?" asks Mark. "Certainly," says the waiter. "Then we'll have a portion."

Shortly after, the waiter brings the drinks and a small dish of bitterballen. Mark picks one up and blows on it a little, because they are hot inside. Lena laughs. "Always impatient," she says.

They talk about the working day, plans for the weekend, and a colleague who is getting married soon. After an hour, Lena asks for the bill. "Are we paying separately?" she asks. "No, it's on me," says Mark. "That's fifteen euros eighty," says the waiter. Mark taps his phone on the payment terminal. "Thank you!" says the waiter.`,
    vocabulary: [
      { nl: 'het bruine café', en: 'traditional Dutch pub', matches: ['bruin café', 'bruine kroegen'] },
      { nl: 'de ober', en: 'waiter', matches: ['ober'] },
      { nl: 'de bitterbal', en: 'bitterbal (deep-fried snack)', matches: ['bitterbal', 'bitterballen'] },
      { nl: 'de portie', en: 'portion / serving' },
      { nl: 'het schaaltje', en: 'small dish / bowl' },
      { nl: 'waait op', en: 'blows on (to cool down)', matches: ['waait'] },
      { nl: 'ongeduldig', en: 'impatient' },
      { nl: 'de rekening', en: 'the bill' },
      { nl: 'apart betalen', en: 'to pay separately', matches: ['apart'] },
      { nl: 'trakteren', en: 'to treat / pay for someone else', matches: ['trakteer'] },
      { nl: 'de betaalautomaat', en: 'payment terminal', matches: ['betaalautomaat'] }
    ],
    grammarNotes: [
      {
        pattern: 'Toevallig in vragen (softener)',
        example: 'Heeft u toevallig bitterballen?',
        explanation: '"Toevallig" (by any chance) makes requests more polite and tentative. It signals you do not expect the answer to be yes. Very common in Dutch conversational questions.'
      },
      {
        pattern: 'Dan-inversion in bestelling',
        example: 'Dan nemen we er een portie van.',
        explanation: '"Dan" at the start triggers inversion: verb before subject. "Er...van" is a pronoun referring back to "bitterballen". This construction "er + number/quantity + van" is typical for ordering.'
      },
      {
        pattern: 'Want-clause (explanation)',
        example: 'hij waait erop, want ze zijn heet van binnen.',
        explanation: '"Want" introduces an explanation and keeps normal word order (subject-verb). Compare "omdat ze heet zijn van binnen" — with "omdat" the verb goes to the end.'
      }
    ],
    questions: [
      {
        q: 'Wat is een "bruin café"?',
        qEn: 'What is a "brown café"?',
        a: 'Een traditioneel café met houten meubels, donkere muren en een gezellige sfeer.',
        aEn: 'A traditional café with wooden furniture, dark walls, and a cosy atmosphere.'
      },
      {
        q: 'Waarom waait Mark op zijn bitterbal?',
        qEn: 'Why does Mark blow on his bitterbal?',
        a: 'Omdat ze heet van binnen zijn.',
        aEn: 'Because they are hot inside.'
      },
      {
        q: 'Hoe betaalt Mark de rekening?',
        qEn: 'How does Mark pay the bill?',
        a: 'Hij tikt zijn telefoon op de betaalautomaat.',
        aEn: 'He taps his phone on the payment terminal.'
      }
    ]
  },

  {
    id: 'r-a2-005',
    title: 'Op het station',
    titleEn: 'At the train station',
    level: 'A2',
    topic: 'reizen',
    topicEn: 'travel',
    topicEmoji: '🚆',
    wordCount: 220,
    readMinutes: 3,
    text:
`In Nederland reist men veel met de trein. NS — de Nederlandse Spoorwegen — rijdt elke dag op honderden routes door het hele land. Om te reizen heb je een OV-chipkaart nodig. Je laadt er geld op en houdt hem bij het incheckpalen aan de ingang en bij het uitcheckpalen bij de uitgang.

Bas moet vandaag van Amsterdam naar Den Haag reizen voor een vergadering. Hij gaat naar het station en kijkt op het grote informatiebord. Zijn trein vertrekt om kwart over tien van spoor vier. Hij heeft nog twintig minuten.

Bij een automaat koopt hij een kopje koffie. Dan loopt hij rustig naar spoor vier. De trein staat er al. Hij stapt in en zoekt een vrije zitplaats. De trein is niet zo druk op dit tijdstip, dus hij kan makkelijk een raam kiezen.

Om kwart voor elf zegt de omroeper: "Dames en heren, wij naderen Den Haag Centraal. Over vijf minuten zijn wij er." Bas pakt zijn tas en loopt naar de deur. Als de trein stopt, checkt hij uit met zijn OV-chipkaart.

Buiten het station pakt hij zijn fiets uit het fietsenstalling. In Nederland kun je een stationsfiets huren via de OV-fiets-app, maar Bas heeft zijn eigen fiets hier staan. Vijf minuten later is hij op zijn werk.`,
    textEn:
`In the Netherlands, people travel a lot by train. NS — the Dutch Railways — runs every day on hundreds of routes throughout the country. To travel, you need an OV-chipkaart (public transport smart card). You load money onto it and hold it against the check-in poles at the entrance and the check-out poles at the exit.

Bas needs to travel from Amsterdam to The Hague today for a meeting. He goes to the station and looks at the large information board. His train departs at quarter past ten from platform four. He still has twenty minutes.

At a vending machine, he buys a cup of coffee. Then he walks calmly to platform four. The train is already there. He gets on and looks for a free seat. The train is not very busy at this time, so he can easily choose a window seat.

At quarter to eleven, the announcer says: "Ladies and gentlemen, we are approaching Den Haag Centraal. We will be there in five minutes." Bas picks up his bag and walks to the door. When the train stops, he checks out with his OV-chipkaart.

Outside the station, he gets his bike from the bike storage. In the Netherlands you can rent a station bike via the OV-fiets app, but Bas has his own bike parked here. Five minutes later he is at work.`,
    vocabulary: [
      { nl: 'de Nederlandse Spoorwegen', en: 'Dutch Railways (NS)' },
      { nl: 'de OV-chipkaart', en: 'public transport smart card' },
      { nl: 'opladen', en: 'to top up / charge', matches: ['laadt op'] },
      { nl: 'inchecken / uitchecken', en: 'to check in / check out', matches: ['incheckpalen', 'uitcheckpalen', 'checkt uit'] },
      { nl: 'het spoor', en: 'platform / track', matches: ['spoor'] },
      { nl: 'de zitplaats', en: 'seat', matches: ['zitplaats'] },
      { nl: 'het tijdstip', en: 'time / moment' },
      { nl: 'de omroeper', en: 'announcer' },
      { nl: 'naderen', en: 'to approach', matches: ['naderen', 'naderen'] },
      { nl: 'de fietsenstalling', en: 'bike storage / bike shed' }
    ],
    grammarNotes: [
      {
        pattern: 'Men + werkwoord (algemeen gebruik)',
        example: 'In Nederland reist men veel met de trein.',
        explanation: '"Men" (one / people) is an impersonal subject used for general statements about habits. It always takes a singular verb. Very common in describing Dutch customs and practices.'
      },
      {
        pattern: 'Tijdsuitdrukkingen: kwart over / kwart voor',
        example: 'kwart over tien · kwart voor elf',
        explanation: 'Dutch tells time using "over" (past) and "voor" (to). Half means half past, not half to: "half elf" = 10:30. This often surprises English speakers.'
      },
      {
        pattern: 'Als-zin + inversion',
        example: 'Als de trein stopt, checkt hij uit met zijn OV-chipkaart.',
        explanation: 'When "als" (when/if) opens the sentence, the main clause inverts: verb comes before subject. "checkt hij uit" — not "hij checkt uit".'
      }
    ],
    questions: [
      {
        q: 'Wat heb je nodig om met de trein te reizen in Nederland?',
        qEn: 'What do you need to travel by train in the Netherlands?',
        a: 'Een OV-chipkaart.',
        aEn: 'An OV-chipkaart.'
      },
      {
        q: 'Van welk spoor vertrekt de trein van Bas?',
        qEn: 'From which platform does Bas\'s train depart?',
        a: 'Van spoor vier.',
        aEn: 'From platform four.'
      },
      {
        q: 'Hoe gaat Bas van het station naar zijn werk?',
        qEn: 'How does Bas get from the station to work?',
        a: 'Met zijn eigen fiets uit de fietsenstalling.',
        aEn: 'With his own bike from the bike storage.'
      }
    ]
  },

  {
    id: 'r-a2-006',
    title: 'In de supermarkt',
    titleEn: 'At the supermarket',
    level: 'A2',
    topic: 'dagelijks',
    topicEn: 'daily life',
    topicEmoji: '🛍️',
    wordCount: 218,
    readMinutes: 3,
    text:
`Nederlanders doen hun boodschappen bij supermarkten zoals Albert Heijn, Jumbo en Lidl. De meeste mensen gaan een of twee keer per week naar de supermarkt. Sommige mensen bestellen online en laten hun boodschappen thuisbezorgen.

Nina gaat elke dinsdag naar de Albert Heijn om de hoek. Ze heeft een boodschappenlijstje gemaakt op haar telefoon. Bij de ingang pakt ze een winkelwagen en begint met de groenten en het fruit. Ze kijkt goed naar de aanbiedingen: deze week zijn aardbeien in de aanbieding.

Bij de kassa staat een rij van vijf mensen. Nina kiest de zelfscankassa. Ze scant elk product zelf en legt het in haar tas. Sommige producten zijn moeilijk te scannen, maar een medewerker helpt haar even. Als ze klaar is, tikt ze haar bankpas op de betaalautomaat. "Heeft u een bonuskaart?" vraagt het scherm. Nina houdt haar telefoon voor de scanner: de Appie-app werkt als digitale bonuskaart.

Met een volle tas loopt ze naar buiten. In Nederland betaal je voor een plastic tas, dus de meeste mensen nemen een eigen tas mee. Nina gebruikt altijd haar grote canvas tas.

Thuis zet ze de boodschappen in de koelkast en de kasten. Ze heeft voor vier dagen eten gekocht. Morgen kookt ze voor haar vriendin en overmorgen gaat ze uit eten.`,
    textEn:
`Dutch people do their shopping at supermarkets such as Albert Heijn, Jumbo, and Lidl. Most people go to the supermarket once or twice a week. Some people order online and have their groceries delivered at home.

Nina goes to the Albert Heijn around the corner every Tuesday. She has made a shopping list on her phone. At the entrance, she picks up a shopping trolley and starts with the vegetables and fruit. She pays close attention to the deals: this week strawberries are on offer.

At the checkout, there is a queue of five people. Nina chooses the self-scan checkout. She scans each product herself and puts it in her bag. Some products are hard to scan, but a staff member helps her briefly. When she is done, she taps her bank card on the payment terminal. "Do you have a bonus card?" the screen asks. Nina holds her phone in front of the scanner: the Appie app works as a digital bonus card.

With a full bag, she walks outside. In the Netherlands you pay for a plastic bag, so most people bring their own bag. Nina always uses her large canvas bag.

At home, she puts the shopping in the fridge and the cupboards. She has bought food for four days. Tomorrow she will cook for her friend and the day after tomorrow she is going out for dinner.`,
    vocabulary: [
      { nl: 'thuisbezorgen', en: 'to deliver at home', matches: ['thuisbezorgen'] },
      { nl: 'het boodschappenlijstje', en: 'shopping list' },
      { nl: 'de winkelwagen', en: 'shopping trolley' },
      { nl: 'de aanbieding', en: 'deal / offer', matches: ['aanbiedingen', 'aanbieding'] },
      { nl: 'de zelfscankassa', en: 'self-scan checkout' },
      { nl: 'de medewerker', en: 'staff member / employee', matches: ['medewerker'] },
      { nl: 'de bonuskaart', en: 'loyalty card' },
      { nl: 'de koelkast', en: 'fridge / refrigerator' },
      { nl: 'overmorgen', en: 'the day after tomorrow' },
      { nl: 'canvas tas', en: 'canvas bag / reusable bag' }
    ],
    grammarNotes: [
      {
        pattern: 'In de aanbieding zijn',
        example: 'Deze week zijn aardbeien in de aanbieding.',
        explanation: '"In de aanbieding zijn" is the fixed Dutch phrase for "to be on offer/on sale". Note: subject comes after verb when a time expression opens the sentence (inversion).'
      },
      {
        pattern: 'Toekomst met gaan + infinitief',
        example: 'Morgen kookt ze voor haar vriendin · overmorgen gaat ze uit eten.',
        explanation: 'Dutch future can use "gaan + infinitief" (going to) or simply present tense + future time word. Both are correct: "Ze kookt morgen" and "Ze gaat morgen koken" mean the same.'
      },
      {
        pattern: 'Betalen voor (iets)',
        example: 'In Nederland betaal je voor een plastic tas.',
        explanation: '"Betalen voor" = to pay for. The impersonal "je" (you/one) is used here for general statements about what everyone does, similar to English "you" in "you have to pay".'
      }
    ],
    questions: [
      {
        q: 'Hoe gebruikt Nina haar bonuskaart?',
        qEn: 'How does Nina use her bonus card?',
        a: 'Via de Appie-app op haar telefoon, die werkt als digitale bonuskaart.',
        aEn: 'Via the Appie app on her phone, which works as a digital bonus card.'
      },
      {
        q: 'Waarom nemen de meeste Nederlanders een eigen tas mee?',
        qEn: 'Why do most Dutch people bring their own bag?',
        a: 'Omdat je in Nederland betaalt voor een plastic tas.',
        aEn: 'Because in the Netherlands you pay for a plastic bag.'
      },
      {
        q: 'Voor hoeveel dagen heeft Nina boodschappen gedaan?',
        qEn: 'How many days\' worth of shopping has Nina done?',
        a: 'Voor vier dagen.',
        aEn: 'For four days.'
      }
    ]
  },

  {
    id: 'r-a2-007',
    title: 'Naar de kapper',
    titleEn: 'At the hairdresser\'s',
    level: 'A2',
    topic: 'dagelijks',
    topicEn: 'daily life',
    topicEmoji: '✂️',
    wordCount: 216,
    readMinutes: 3,
    text:
`Omar gaat eens in de zes weken naar de kapper. Hij belt van tevoren op om een afspraak te maken. "Kapper De Leeuw, goedemiddag." "Hallo, ik wil graag een afspraak maken voor een knipbeurt." "Wanneer wilt u komen?" "Kan het zaterdag aan het einde van de middag?" "Zaterdag om vijf uur kan nog. Is dat goed?" "Ja, prima. Op welke naam?" "Op Omar." "Tot zaterdag!"

Op zaterdag loopt Omar de kapperswinkel in. Het ruikt naar haarlak en shampoo. De kapster, Lena, begroet hem hartelijk. "Ga zitten! Wat mag het vandaag zijn?" "Hetzelfde als altijd: aan de zijkanten kort en bovenop iets langer. En de baard even bijwerken, alsjeblieft." "Wordt gedaan!"

Lena wast zijn haar eerst en droogt het daarna met een handdoek. Dan begint ze te knippen. Ze praten over het weekend, over de zomer die eraan komt en over haar vakantieplannen. Omar vertelt dat hij in augustus naar Spanje gaat.

Als ze klaar is, houdt Lena een spiegel achter zijn hoofd zodat hij de achterkant kan zien. "Ziet er goed uit!" zegt Omar. Hij betaalt vijfentwintig euro en laat een fooi van twee euro achter. "Tot volgende keer!" zegt Lena. "Tot de volgende keer!" antwoordt Omar.`,
    textEn:
`Omar goes to the hairdresser once every six weeks. He calls ahead to make an appointment. "Kapper De Leeuw, good afternoon." "Hello, I'd like to make an appointment for a haircut." "When would you like to come?" "Can it be Saturday late afternoon?" "Saturday at five o'clock is still possible. Is that good?" "Yes, fine. Under what name?" "Under Omar." "See you Saturday!"

On Saturday, Omar walks into the barbershop. It smells of hairspray and shampoo. The hairdresser, Lena, greets him warmly. "Have a seat! What can I do for you today?" "The same as always: short on the sides and a bit longer on top. And tidy up the beard a little, please." "Consider it done!"

Lena washes his hair first and then dries it with a towel. Then she starts cutting. They talk about the weekend, about the summer that is coming, and about her holiday plans. Omar tells her he is going to Spain in August.

When she is done, Lena holds a mirror behind his head so he can see the back. "Looks great!" says Omar. He pays twenty-five euros and leaves a two-euro tip. "Until next time!" says Lena. "Until next time!" answers Omar.`,
    vocabulary: [
      { nl: 'de kapper', en: 'hairdresser / barber', matches: ['kapper', 'kapperswinkel'] },
      { nl: 'de knipbeurt', en: 'haircut (appointment)' },
      { nl: 'bijwerken', en: 'to tidy up / touch up', matches: ['bijwerken'] },
      { nl: 'de haarlak', en: 'hairspray' },
      { nl: 'de kapster', en: 'female hairdresser' },
      { nl: 'hartelijk', en: 'warmly / heartily' },
      { nl: 'de baard', en: 'beard' },
      { nl: 'de handdoek', en: 'towel' },
      { nl: 'de spiegel', en: 'mirror' },
      { nl: 'de fooi', en: 'tip (gratuity)' },
      { nl: 'Wordt gedaan!', en: 'Consider it done! / Will do!' }
    ],
    grammarNotes: [
      {
        pattern: 'Afspraak maken: telefoongesprek',
        example: '"Kan het zaterdag aan het einde van de middag?" "Zaterdag om vijf uur kan nog."',
        explanation: '"Kan nog" means "is still possible" — a useful phrase when checking availability. In appointment-making, Dutch often drops the subject in short replies: "Zaterdag om vijf uur kan (dat nog)" → "Kan nog."'
      },
      {
        pattern: 'Worden + voltooid deelwoord (passief)',
        example: 'Wordt gedaan! · zodat hij de achterkant kan zien',
        explanation: '"Wordt gedaan" is passive: "(it) is being done / will be done." The passive uses "worden" + past participle. "Zodat" (so that) is a subordinating conjunction sending the verb to the end.'
      },
      {
        pattern: 'Eraan komen (to be approaching)',
        example: 'de zomer die eraan komt',
        explanation: '"Eraan komen" means something is coming / approaching. "Die eraan komt" is a relative clause: "die" refers to "de zomer" and "eraan" is a prepositional pronoun meaning "toward it/here".'
      }
    ],
    questions: [
      {
        q: 'Hoe maakt Omar een afspraak bij de kapper?',
        qEn: 'How does Omar make an appointment at the hairdresser\'s?',
        a: 'Hij belt van tevoren op.',
        aEn: 'He calls ahead.'
      },
      {
        q: 'Wat vraagt Omar de kapster te doen?',
        qEn: 'What does Omar ask the hairdresser to do?',
        a: 'Aan de zijkanten kort knippen, bovenop iets langer laten en de baard bijwerken.',
        aEn: 'Cut it short on the sides, leave it a bit longer on top, and tidy up the beard.'
      },
      {
        q: 'Hoeveel betaalt Omar en hoeveel fooi geeft hij?',
        qEn: 'How much does Omar pay and how much tip does he leave?',
        a: 'Hij betaalt vijfentwintig euro en laat twee euro fooi achter.',
        aEn: 'He pays twenty-five euros and leaves a two-euro tip.'
      }
    ]
  },

  {
    id: 'r-a2-008',
    title: 'Een avond thuis',
    titleEn: 'An evening at home',
    level: 'A2',
    topic: 'dagelijks',
    topicEn: 'daily life',
    topicEmoji: '🏠',
    wordCount: 215,
    readMinutes: 3,
    text:
`Na een lange werkdag is Aisha blij om thuis te zijn. Ze gooit haar jas op de haak, doet haar schoenen uit en loopt naar de keuken. Ze is moe, dus ze wil niet lang koken. Ze pakt pasta uit de kast, snijdt wat groenten en maakt een eenvoudige tomatensaus. Na twintig minuten staat het eten op tafel.

Terwijl ze eet, kijkt ze op haar telefoon. Er zijn een paar berichten van vrienden in de appgroep. Iemand stelt voor om zaterdag samen te eten. "Goed idee!" typt Aisha terug. "Bij mij thuis of ergens buiten?" "Buiten! Dat Turkse restaurant waar we vorig jaar waren?" "Perfect."

Na het eten wast ze de vaat af en maakt het aanrecht schoon. Dan gaat ze op de bank zitten. Ze wil eigenlijk een boek lezen, maar ze is te moe om te concentreren. Ze zet de televisie aan en kijkt naar een Nederlandse serie op NPO. De serie gaat over een familie in Amsterdam in de jaren zestig. Ze vindt het heel interessant.

Om half tien begint ze slaperig te worden. Ze zet de televisie uit, poetst haar tanden en gaat naar bed. Ze leest nog vijf minuten op haar e-reader. Dan doet ze het licht uit. Morgen moet ze vroeg op — ze heeft om acht uur een vergadering.`,
    textEn:
`After a long working day, Aisha is glad to be home. She throws her coat on the hook, takes off her shoes, and walks to the kitchen. She is tired, so she does not want to cook for long. She gets pasta from the cupboard, cuts some vegetables, and makes a simple tomato sauce. After twenty minutes, the food is on the table.

While she eats, she looks at her phone. There are a few messages from friends in the group chat. Someone suggests eating together on Saturday. "Good idea!" types Aisha back. "At my place or somewhere out?" "Out! That Turkish restaurant where we were last year?" "Perfect."

After eating, she does the dishes and cleans the worktop. Then she sits on the sofa. She actually wants to read a book, but she is too tired to concentrate. She switches on the television and watches a Dutch series on NPO. The series is about a family in Amsterdam in the 1960s. She finds it very interesting.

At half past nine she starts to feel sleepy. She turns off the television, brushes her teeth, and goes to bed. She reads for five more minutes on her e-reader. Then she turns off the light. Tomorrow she has to be up early — she has a meeting at eight o'clock.`,
    vocabulary: [
      { nl: 'de haak', en: 'hook (coat hook)', matches: ['haak'] },
      { nl: 'eenvoudig', en: 'simple / easy' },
      { nl: 'de tomatensaus', en: 'tomato sauce' },
      { nl: 'de appgroep', en: 'WhatsApp group chat' },
      { nl: 'de vaat afwassen', en: 'to do the dishes', matches: ['vaat af'] },
      { nl: 'het aanrecht', en: 'worktop / counter' },
      { nl: 'de bank', en: 'sofa / couch' },
      { nl: 'slaperig worden', en: 'to become sleepy', matches: ['slaperig'] },
      { nl: 'tandjes poetsen', en: 'to brush teeth', matches: ['tanden', 'poetst'] },
      { nl: 'de e-reader', en: 'e-reader' }
    ],
    grammarNotes: [
      {
        pattern: 'Terwijl + bijzin (while)',
        example: 'Terwijl ze eet, kijkt ze op haar telefoon.',
        explanation: '"Terwijl" (while) is a subordinating conjunction: verb goes to the end of its clause. When "terwijl" opens the sentence, inversion follows in the main clause: "kijkt ze" not "ze kijkt".'
      },
      {
        pattern: 'Te moe om te + infinitief',
        example: 'Ze is te moe om te concentreren.',
        explanation: '"Te + adjective + om te + infinitief" = too [adjective] to [do something]. This is a very common structure: "te druk om te bellen", "te ver om te lopen".'
      },
      {
        pattern: 'Reflexief begin: beginnen te + infinitief',
        example: 'Ze begint slaperig te worden.',
        explanation: '"Beginnen te + infinitief" expresses the start of a process. Similar to "to start to" in English. Also common: "beginnen met + substantief/gerund".'
      }
    ],
    questions: [
      {
        q: 'Waarom kookt Aisha iets eenvoudigs?',
        qEn: 'Why does Aisha cook something simple?',
        a: 'Omdat ze moe is en niet lang wil koken.',
        aEn: 'Because she is tired and does not want to cook for long.'
      },
      {
        q: 'Wat plannen Aisha en haar vrienden voor zaterdag?',
        qEn: 'What do Aisha and her friends plan for Saturday?',
        a: 'Ze gaan samen eten in een Turks restaurant.',
        aEn: 'They are going to eat together at a Turkish restaurant.'
      },
      {
        q: 'Waarom leest Aisha geen boek die avond?',
        qEn: 'Why doesn\'t Aisha read a book that evening?',
        a: 'Ze is te moe om te concentreren.',
        aEn: 'She is too tired to concentrate.'
      }
    ]
  },

  // ── B1 DAILY CONVERSATIONS ──────────────────────────────────────────────────

  {
    id: 'r-b1-c-001',
    title: 'Op het werk',
    titleEn: 'At work',
    level: 'B1',
    topic: 'werk',
    topicEn: 'work',
    topicEmoji: '💼',
    wordCount: 222,
    readMinutes: 3,
    text:
`Het moderne Nederlandse kantoor is informeel vergeleken met veel andere landen. Collega's spreken elkaar aan met de voornaam — ook de baas. Er is veel aandacht voor werkplezier, een goede werk-privébalans en open communicatie. Vergaderingen beginnen vaak met een rondje waarbij iedereen vertelt hoe het gaat.

Sanne werkt als projectmanager bij een middelgroot IT-bedrijf in Rotterdam. Elke maandagochtend is er een teamvergadering van een uur. Ze zit aan de vergadertafel met haar zes collega's. De manager, Joost, opent de vergadering. "Goedemorgen allemaal. Voordat we beginnen: heeft iemand nog iets van het weekend?" Er wordt gelachen en iemand vertelt over een wandeling in de Biesbosch.

Na de informele opening bespreekt het team de taken van de week. Sanne presenteert een update over het nieuwe softwareproject. "We lopen iets achter op schema, maar we halen het wel als we het tempo erbij houden," zegt ze. "Wat heb je nodig?" vraagt Joost. "Nog twee dagen van Ravi," antwoordt Sanne. Joost knikt. "Ravi, is dat te doen?" "Ja, ik maak er tijd voor vrij."

Na de vergadering drinken ze koffie bij het koffieapparaat. Sanne bespreekt even informeel een idee met een collega. In Nederlandse bedrijven gaat veel informeel: een korte gang-conversatie lost soms meer op dan een formele meeting.`,
    textEn:
`The modern Dutch office is informal compared to many other countries. Colleagues address each other by first name — including the boss. There is a lot of attention to job satisfaction, a good work-life balance, and open communication. Meetings often begin with a round where everyone says how they are doing.

Sanne works as a project manager at a medium-sized IT company in Rotterdam. Every Monday morning there is a team meeting lasting one hour. She sits at the meeting table with her six colleagues. The manager, Joost, opens the meeting. "Good morning everyone. Before we start: does anyone have anything from the weekend?" People laugh and someone tells about a walk in the Biesbosch.

After the informal opening, the team discusses the tasks for the week. Sanne presents an update on the new software project. "We are running a little behind schedule, but we will make it if we keep up the pace," she says. "What do you need?" asks Joost. "Two more days of Ravi," answers Sanne. Joost nods. "Ravi, can you manage that?" "Yes, I'll make time for it."

After the meeting, they drink coffee at the coffee machine. Sanne briefly discusses an idea informally with a colleague. In Dutch companies, much happens informally: a short corridor conversation sometimes solves more than a formal meeting.`,
    vocabulary: [
      { nl: 'de werk-privébalans', en: 'work-life balance' },
      { nl: 'de vergadering', en: 'meeting', matches: ['vergadering', 'vergadertafel'] },
      { nl: 'het rondje', en: 'round / quick check-in' },
      { nl: 'de projectmanager', en: 'project manager' },
      { nl: 'achter op schema lopen', en: 'to be behind schedule', matches: ['achter op schema'] },
      { nl: 'het tempo erbij houden', en: 'to keep up the pace' },
      { nl: 'tijd vrijmaken', en: 'to free up time', matches: ['vrij'] },
      { nl: 'informeel', en: 'informal' },
      { nl: 'oplossen', en: 'to solve / resolve', matches: ['oplossen', 'lost op'] },
      { nl: 'de voornaam', en: 'first name' }
    ],
    grammarNotes: [
      {
        pattern: 'Er wordt + voltooid deelwoord (passief zonder agens)',
        example: 'Er wordt gelachen.',
        explanation: '"Er wordt" + past participle forms an impersonal passive — no specific subject mentioned. "Er wordt gelachen" = people laugh / laughter is heard. Very common for describing social situations.'
      },
      {
        pattern: 'Als-zin voor voorwaarde',
        example: 'we halen het wel als we het tempo erbij houden.',
        explanation: '"Als" (if) introduces a conditional. "Het halen" (to make it / to meet the deadline) is a common work idiom. "Wel" softens the certainty: "we will manage it, don\'t worry".'
      },
      {
        pattern: 'Vergelijkingen met vergeleken met',
        example: 'informeel vergeleken met veel andere landen.',
        explanation: '"Vergeleken met" (compared to/with) is a fixed participial phrase used in comparisons. It always comes after the adjective it modifies and before the comparison target.'
      }
    ],
    questions: [
      {
        q: 'Hoe spreken collega\'s elkaar aan in het Nederlandse kantoor?',
        qEn: 'How do colleagues address each other in the Dutch office?',
        a: 'Met de voornaam, ook de baas.',
        aEn: 'By first name, including the boss.'
      },
      {
        q: 'Wat is het probleem met het softwareproject van Sanne?',
        qEn: 'What is the problem with Sanne\'s software project?',
        a: 'Ze lopen iets achter op schema.',
        aEn: 'They are running a little behind schedule.'
      },
      {
        q: 'Wat lost soms meer op dan een formele meeting?',
        qEn: 'What sometimes solves more than a formal meeting?',
        a: 'Een korte gang-conversatie.',
        aEn: 'A short corridor conversation.'
      }
    ]
  },

  {
    id: 'r-b1-c-002',
    title: 'Een kamer zoeken',
    titleEn: 'Looking for a room',
    level: 'B1',
    topic: 'wonen',
    topicEn: 'housing',
    topicEmoji: '🏠',
    wordCount: 224,
    readMinutes: 3,
    text:
`Een kamer of appartement vinden in Nederland is niet eenvoudig. In grote steden zoals Amsterdam, Utrecht en Rotterdam is de huurmarkt erg krap. Mensen staan soms jarenlang op een wachtlijst voor een sociale huurwoning. Wie snel iets wil huren, zoekt via websites als Kamernet, Pararius of Facebook-groepen.

Yara is tweeëntwintig jaar oud en studeert in Leiden. Ze woont nu nog bij haar ouders in Den Haag, maar ze wil graag op zichzelf wonen om dichter bij haar universiteit te zijn. Ze plaatst een bericht op een studentengroep op Facebook: "Hallo! Ik zoek een kamer in Leiden. Ik ben een rustige, nette student die graag kookt. Liefst een kamer met eigen wasgelegenheid. Budget: maximaal €700 per maand inclusief."

Ze krijgt tien reacties in twee dagen. De meeste kamers zijn te duur of te ver van de campus. Maar één advertentie ziet er goed uit: een kamer van veertien vierkante meter in een huis met drie andere studenten, voor €680 inclusief internet en gas/water/licht.

Ze mailt de verhuurder en maakt een bezichtiging. Het huis is netjes en de housemates zijn vriendelijk. De kamer heeft een groot raam en genoeg ruimte voor een bureau en een bed. Na een week bedenktijd beslist Yara: ze neemt de kamer. Ze tekent het contract en betaalt de borg van twee maanden huur.`,
    textEn:
`Finding a room or apartment in the Netherlands is not easy. In large cities such as Amsterdam, Utrecht, and Rotterdam, the rental market is very tight. People are sometimes on a waiting list for years for social housing. Those who want to rent something quickly search via websites such as Kamernet, Pararius, or Facebook groups.

Yara is twenty-two years old and studies in Leiden. She still lives with her parents in The Hague, but she would like to live independently to be closer to her university. She posts a message in a student group on Facebook: "Hello! I am looking for a room in Leiden. I am a quiet, tidy student who likes to cook. Ideally a room with private washing facilities. Budget: maximum €700 per month all-in."

She receives ten replies within two days. Most rooms are too expensive or too far from campus. But one advertisement looks promising: a room of fourteen square metres in a house with three other students, for €680 including internet and gas/water/electricity.

She emails the landlord and arranges a viewing. The house is tidy and the housemates are friendly. The room has a large window and enough space for a desk and a bed. After a week of consideration, Yara decides: she takes the room. She signs the contract and pays the deposit of two months' rent.`,
    vocabulary: [
      { nl: 'krap', en: 'tight / scarce' },
      { nl: 'de wachtlijst', en: 'waiting list' },
      { nl: 'de sociale huurwoning', en: 'social housing / council flat' },
      { nl: 'op zichzelf wonen', en: 'to live independently / alone' },
      { nl: 'de wasgelegenheid', en: 'washing / laundry facilities' },
      { nl: 'inclusief', en: 'inclusive / all-in', matches: ['inclusief'] },
      { nl: 'de verhuurder', en: 'landlord' },
      { nl: 'de bezichtiging', en: 'viewing (of a property)' },
      { nl: 'de bedenktijd', en: 'time to think / consideration period' },
      { nl: 'de borg', en: 'deposit (rental)' }
    ],
    grammarNotes: [
      {
        pattern: 'Wie + bijzin (whoever / those who)',
        example: 'Wie snel iets wil huren, zoekt via Kamernet.',
        explanation: '"Wie" (whoever / those who) starts a subject clause. The verb goes to the end of the "wie" clause, and the main clause inverts. Very common in general statements: "Wie wil slagen, moet oefenen."'
      },
      {
        pattern: 'Liefst (ideally / preferably)',
        example: 'Liefst een kamer met eigen wasgelegenheid.',
        explanation: '"Liefst" is the superlative of "graag" (gladly → most gladly → ideally). In ads and requests it means "preferably". Also written: "bij voorkeur".'
      },
      {
        pattern: 'Na + tijdsuitdrukking + VTT',
        example: 'Na een week bedenktijd beslist Yara: ze neemt de kamer.',
        explanation: '"Na + tijdsperiode" at the start triggers inversion in the main clause. The VTT (perfect) is not used here because the decision is presented as final and clear, so simple present works.'
      }
    ],
    questions: [
      {
        q: 'Waarom wil Yara op zichzelf wonen?',
        qEn: 'Why does Yara want to live independently?',
        a: 'Om dichter bij haar universiteit te zijn.',
        aEn: 'To be closer to her university.'
      },
      {
        q: 'Wat zijn de voorwaarden in Yara\'s zoekadvertentie?',
        qEn: 'What are the conditions in Yara\'s search ad?',
        a: 'Een rustige, nette student, liefst eigen wasgelegenheid, budget maximaal €700 per maand inclusief.',
        aEn: 'A quiet, tidy student, ideally private washing facilities, budget maximum €700 per month all-in.'
      },
      {
        q: 'Wat moet Yara betalen als borg?',
        qEn: 'What does Yara have to pay as a deposit?',
        a: 'Twee maanden huur.',
        aEn: 'Two months\' rent.'
      }
    ]
  },

  {
    id: 'r-b1-c-003',
    title: 'Openbaar vervoer in Nederland',
    titleEn: 'Public transport in the Netherlands',
    level: 'B1',
    topic: 'reizen',
    topicEn: 'travel',
    topicEmoji: '🚌',
    wordCount: 221,
    readMinutes: 3,
    text:
`Nederland heeft een uitgebreid netwerk van treinen, bussen, trams en metro's. Het openbaar vervoer — kortweg OV — wordt door miljoenen mensen dagelijks gebruikt. Met één OV-chipkaart kun je reizen met bijna alle vervoersbedrijven in het land: NS, GVB, RET, HTM en tientallen andere.

Het OV-systeem werkt op basis van inchecken en uitchecken. Als je dat vergeet, wordt het maximumtarief in rekening gebracht — dat kan flink oplopen. Sommige reizigers maken die fout maar één keer.

Naast de OV-chipkaart is er nu ook de mogelijkheid om met een bankpas of creditcard in te checken, dankzij het OVpay-systeem. Dit is handig voor toeristen die geen OV-chipkaart willen aanschaffen.

Marta is Poolse en woont al drie jaar in Amsterdam. Ze reist elke dag met de tram naar haar werk. In het begin vond ze het OV-systeem ingewikkeld, maar nu gaat het vanzelf. "Het grootste voordeel van de tram is dat ik niet over parkeren hoef na te denken," zegt ze. "En ik kan onderweg een boek lezen."

Wat ze minder prettig vindt, is dat de tram soms vol is in de spits. Dan is er geen zitplaats en moet ze staand reizen. Maar dat is een kleine prijs voor het gemak van het OV. "Vergeleken met Polen zijn de bussen hier veel stipter," voegt ze er lachend aan toe.`,
    textEn:
`The Netherlands has an extensive network of trains, buses, trams, and metros. Public transport — OV for short — is used by millions of people daily. With one OV-chipkaart you can travel with almost all transport companies in the country: NS, GVB, RET, HTM, and dozens of others.

The OV system works on the basis of checking in and out. If you forget to do that, the maximum fare is charged — which can add up considerably. Some travellers make that mistake only once.

In addition to the OV-chipkaart, there is now also the option to check in with a bank card or credit card, thanks to the OVpay system. This is handy for tourists who do not want to purchase an OV-chipkaart.

Marta is Polish and has been living in Amsterdam for three years. She travels by tram to work every day. At first she found the OV system complicated, but now it comes naturally. "The biggest advantage of the tram is that I don't have to think about parking," she says. "And I can read a book on the way."

What she finds less pleasant is that the tram is sometimes full during rush hour. Then there is no seat and she has to travel standing. But that is a small price for the convenience of public transport. "Compared to Poland, the buses here are much more punctual," she adds with a laugh.`,
    vocabulary: [
      { nl: 'uitgebreid', en: 'extensive / comprehensive' },
      { nl: 'het vervoersbedrijf', en: 'transport company', matches: ['vervoersbedrijven'] },
      { nl: 'in rekening brengen', en: 'to charge (a fee)', matches: ['in rekening gebracht'] },
      { nl: 'flink oplopen', en: 'to add up considerably' },
      { nl: 'aanschaffen', en: 'to purchase / acquire', matches: ['aanschaffen'] },
      { nl: 'vanzelf gaan', en: 'to come naturally / go automatically', matches: ['vanzelf'] },
      { nl: 'de spits', en: 'rush hour' },
      { nl: 'staand reizen', en: 'to travel standing up' },
      { nl: 'stipt', en: 'punctual / on time' },
      { nl: 'het gemak', en: 'convenience / ease' }
    ],
    grammarNotes: [
      {
        pattern: 'Kortweg (abbreviated as / for short)',
        example: 'het openbaar vervoer — kortweg OV',
        explanation: '"Kortweg" (literally: briefly / in short) is used to introduce abbreviations or shortened names. Very common in formal and informational Dutch writing.'
      },
      {
        pattern: 'Al + tijdsduur (duration up to now)',
        example: 'Ze woont al drie jaar in Amsterdam.',
        explanation: '"Al" with a time period and present tense expresses an ongoing action. English uses "for": "She has been living in Amsterdam for three years." Dutch uses present tense + "al + period".'
      },
      {
        pattern: 'Hoeven te + infinitief (niet hoeven = don\'t need to)',
        example: 'ik hoef niet over parkeren na te denken.',
        explanation: '"Niet hoeven te" is the Dutch equivalent of "don\'t have to / need not". The "te" stays with the infinitive. With separable verbs: "niet hoeven na te denken" (te goes between parts).'
      }
    ],
    questions: [
      {
        q: 'Wat gebeurt er als je vergeet uit te checken in het OV?',
        qEn: 'What happens if you forget to check out in public transport?',
        a: 'Het maximumtarief wordt in rekening gebracht.',
        aEn: 'The maximum fare is charged.'
      },
      {
        q: 'Wat is het grootste voordeel van de tram voor Marta?',
        qEn: 'What is the biggest advantage of the tram for Marta?',
        a: 'Ze hoeft niet over parkeren na te denken, en ze kan onderweg een boek lezen.',
        aEn: 'She doesn\'t have to think about parking, and she can read a book on the way.'
      },
      {
        q: 'Hoe vergelijkt Marta het Nederlandse OV met Polen?',
        qEn: 'How does Marta compare Dutch public transport to Poland?',
        a: 'De bussen in Nederland zijn veel stipter dan in Polen.',
        aEn: 'The buses in the Netherlands are much more punctual than in Poland.'
      }
    ]
  },

  {
    id: 'r-b1-c-004',
    title: 'Een klacht indienen',
    titleEn: 'Making a complaint',
    level: 'B1',
    topic: 'dagelijks',
    topicEn: 'daily life',
    topicEmoji: '📞',
    wordCount: 223,
    readMinutes: 3,
    text:
`Nederlanders staan bekend om hun directheid. Als iets niet goed gaat, zeggen ze dat zonder omwegen. Dat geldt ook voor klantenservice: als een product kapot is of een dienst niet naar wens verloopt, nemen mensen contact op met de klantenservice om het probleem op te lossen.

Kevin heeft vorige week een nieuwe wasmachine besteld bij een online winkel. De bezorger heeft de machine afgeleverd, maar bij het installeren merkt Kevin dat de deur niet goed sluit. Hij belt de klantenservice.

"Goedemiddag, u spreekt met Kevin Smit. Ik bel omdat ik vorige week een wasmachine heb besteld en die vandaag is afgeleverd, maar de deur sluit niet goed." "Wat vervelend! Heeft u het bestelnummer bij de hand?" Kevin leest het nummer voor. "Ik zie het hier. Kunt u foto's maken van het defect en die mailen naar service@..." "Ja, dat doe ik direct." "Dan nemen wij zo snel mogelijk contact met u op. U kunt een nieuwe machine verwachten binnen vijf werkdagen of u krijgt het bedrag teruggestort."

Kevin maakt de foto's en mailt ze. Drie dagen later krijgt hij een bevestigingsmail: de nieuwe wasmachine wordt vrijdag bezorgd. Twee weken geleden zou hij misschien een negatieve recensie hebben geplaatst en de zaak hebben laten zitten. Nu is hij blij dat hij heeft gebeld. Een beleefd maar duidelijk gesprek lost veel op.`,
    textEn:
`Dutch people are known for their directness. If something is not right, they say so without beating around the bush. That also applies to customer service: if a product is broken or a service does not go as desired, people contact customer service to resolve the problem.

Kevin ordered a new washing machine from an online shop last week. The delivery person delivered the machine, but when installing it, Kevin notices that the door does not close properly. He calls customer service.

"Good afternoon, you are speaking with Kevin Smit. I am calling because I ordered a washing machine last week and it was delivered today, but the door does not close properly." "How annoying! Do you have the order number handy?" Kevin reads out the number. "I can see it here. Can you take photos of the defect and email them to service@..." "Yes, I'll do that right away." "Then we will contact you as soon as possible. You can expect a new machine within five working days or the amount will be refunded."

Kevin takes the photos and emails them. Three days later he receives a confirmation email: the new washing machine will be delivered on Friday. Two weeks ago, he might have left a negative review and let the matter go. Now he is glad he called. A polite but clear conversation resolves a lot.`,
    vocabulary: [
      { nl: 'bekendstaan om', en: 'to be known for', matches: ['staan bekend'] },
      { nl: 'de directheid', en: 'directness' },
      { nl: 'zonder omwegen', en: 'without beating around the bush / directly' },
      { nl: 'de klantenservice', en: 'customer service' },
      { nl: 'naar wens verlopen', en: 'to go as desired', matches: ['naar wens'] },
      { nl: 'afleveren', en: 'to deliver', matches: ['afgeleverd', 'bezorgd'] },
      { nl: 'bij de hand hebben', en: 'to have handy / on hand', matches: ['bij de hand'] },
      { nl: 'het defect', en: 'defect / fault' },
      { nl: 'terugstorten', en: 'to refund / transfer back', matches: ['teruggestort'] },
      { nl: 'de werkdag', en: 'working day', matches: ['werkdagen'] }
    ],
    grammarNotes: [
      {
        pattern: 'Conditioneel verleden: zou + hebben + infinitief',
        example: 'Twee weken geleden zou hij misschien een negatieve recensie hebben geplaatst.',
        explanation: 'The conditional perfect (would have done) = "zou + infinitief hebben + voltooid deelwoord". It describes what might have happened under different circumstances. "Misschien" softens the hypothetical.'
      },
      {
        pattern: 'Telefoneren: vaste uitdrukkingen',
        example: 'U spreekt met Kevin Smit · Heeft u het bestelnummer bij de hand?',
        explanation: '"U spreekt met..." (you are speaking with...) is the formal way to introduce yourself on the phone. "Bij de hand hebben" (to have handy) is a fixed phrase for having something readily available.'
      },
      {
        pattern: 'Binnen + tijdsduur (within)',
        example: 'binnen vijf werkdagen',
        explanation: '"Binnen" + time period = within [time]. Very common in service contexts: "binnen 24 uur", "binnen een week". Do not confuse with "in" — "in vijf dagen" means in/after five days, not within.'
      }
    ],
    questions: [
      {
        q: 'Wat is het probleem met de wasmachine van Kevin?',
        qEn: 'What is the problem with Kevin\'s washing machine?',
        a: 'De deur sluit niet goed.',
        aEn: 'The door does not close properly.'
      },
      {
        q: 'Wat vraagt de klantenservice aan Kevin te doen?',
        qEn: 'What does customer service ask Kevin to do?',
        a: 'Foto\'s maken van het defect en die mailen.',
        aEn: 'Take photos of the defect and email them.'
      },
      {
        q: 'Wat leert Kevin van deze ervaring?',
        qEn: 'What does Kevin learn from this experience?',
        a: 'Dat een beleefd maar duidelijk gesprek veel oplost.',
        aEn: 'That a polite but clear conversation resolves a lot.'
      }
    ]
  }
];
