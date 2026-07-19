// ─── GRAMMAR TOPICS A1–B2 ─────────────────────────────────────────────────────
const grammarTopicsData = [

  // ══ A1 ══════════════════════════════════════════════════════════════════════

  {
    id: "persoonlijke-vnw", level: "A1", filter: "voornaamwoord",
    title: "Persoonlijke voornaamwoorden", titleEn: "Personal pronouns",
    intro: "Persoonlijke voornaamwoorden vervangen een naam of zelfstandig naamwoord als onderwerp van de zin.",
    introEn: "Personal pronouns replace a name or noun as the subject of the sentence.",
    tables: [{
      heading: "Onderwerp (Subject)", headingEn: "Subject pronouns",
      cols: ["Person", "Stressed", "Unstressed", "English"],
      rows: [
        ["1e enkv.", "ik", "ik", "I"],
        ["2e enkv.", "jij", "je", "you (informal)"],
        ["2e enkv. formeel", "u", "u", "you (formal)"],
        ["3e enkv. m.", "hij", "ie / hij", "he"],
        ["3e enkv. v.", "zij", "ze", "she"],
        ["3e enkv. onz.", "het", "het", "it"],
        ["1e mv.", "wij", "we", "we"],
        ["2e mv.", "jullie", "jullie", "you (plural)"],
        ["3e mv.", "zij", "ze", "they"]
      ]
    }],
    rules: [
      { nl: "Gebruik 'jij/je' voor vrienden, familie en leeftijdsgenoten.", en: "Use 'jij/je' with friends, family and peers." },
      { nl: "Gebruik 'u' in formele situaties, met ouderen en onbekenden.", en: "Use 'u' in formal situations, with elders and strangers." },
      { nl: "Na inversie valt de -t van 'jij' weg: 'Werk jij hier?' (niet: werkt).", en: "After inversion, 'jij' drops the verb -t: 'Werk jij hier?' (not: werkt)." }
    ],
    examples: [
      { nl: "Ik woon in Amsterdam.", en: "I live in Amsterdam." },
      { nl: "Hij werkt bij een bank.", en: "He works at a bank." },
      { nl: "Wij leren Nederlands.", en: "We are learning Dutch." },
      { nl: "Spreekt u Nederlands?", en: "Do you speak Dutch? (formal)" }
    ],
    tip: "Let op: 'jij' verliest de -t na inversie, maar 'hij', 'zij' en 'u' niet.",
    tipEn: "Note: 'jij' drops the -t after inversion, but 'hij', 'zij' and 'u' do not."
  },

  {
    id: "bezittelijke-vnw", level: "A1", filter: "voornaamwoord",
    title: "Bezittelijke voornaamwoorden", titleEn: "Possessive pronouns",
    intro: "Bezittelijke voornaamwoorden geven aan van wie iets is.",
    introEn: "Possessive pronouns indicate ownership.",
    tables: [{
      heading: "Bezittelijke voornaamwoorden", headingEn: "Possessive pronouns",
      cols: ["Person", "Before de-word", "Before het-word", "English"],
      rows: [
        ["ik", "mijn", "mijn", "my"],
        ["jij/je", "jouw / je", "jouw / je", "your"],
        ["u", "uw", "uw", "your (formal)"],
        ["hij", "zijn", "zijn", "his"],
        ["zij", "haar", "haar", "her"],
        ["wij/we", "onze", "ons", "our"],
        ["jullie", "jullie", "jullie", "your (pl.)"],
        ["zij/ze", "hun", "hun", "their"]
      ]
    }],
    rules: [
      { nl: "'Ons' voor het-woorden (enkelvoud); 'onze' voor de-woorden en alle meervouden.", en: "'Ons' before het-words (singular); 'onze' before de-words and all plurals." },
      { nl: "Bezittelijke voornaamwoorden worden niet verbogen.", en: "Possessive pronouns are not inflected." }
    ],
    examples: [
      { nl: "Dat is mijn boek.", en: "That is my book." },
      { nl: "Ons huis is groot. / Onze tuin is mooi.", en: "Our house is big. / Our garden is beautiful.", note: "ons + het-woord, onze + de-woord" },
      { nl: "Hoe heet jouw broer?", en: "What is your brother's name?" }
    ],
    tip: "Onthoud: 'ons huis' (het-woord) maar 'onze auto' (de-woord).",
    tipEn: "Remember: 'ons huis' (het-word) but 'onze auto' (de-word)."
  },

  {
    id: "lidwoorden-meervoud", level: "A1", filter: "overig",
    title: "Lidwoorden & meervoud", titleEn: "Articles & plurals",
    intro: "Nederlandse zelfstandige naamwoorden hebben het lidwoord 'de' of 'het'; meervouden eindigen meestal op -en of -s.",
    introEn: "Dutch nouns take the article 'de' or 'het'; plurals usually end in -en or -s.",
    tables: [
      {
        heading: "Wanneer 'het'?", headingEn: "When to use 'het'?",
        cols: ["Rule", "Example", "English"],
        rows: [
          ["Verkleinwoorden (-tje/-je)", "het boekje, het huisje", "the little book, the little house"],
          ["Infinitief als zn.", "het werken, het eten", "working, eating (as a noun)"],
          ["-ment, -sel, -isme, -ief", "het document, het geval", "the document, the case"],
          ["Metalen en stoffen", "het goud, het hout", "gold, wood"],
          ["Veelvoorkomend", "het kind, het jaar, het huis", "child, year, house"]
        ]
      },
      {
        heading: "Meervoudsregels", headingEn: "Plural rules",
        cols: ["Ending", "When", "Example"],
        rows: [
          ["-en", "Meeste woorden<br><em>Most words</em>", "boek → boeken, huis → huizen"],
          ["-s", "Op -el, -em, -er, -en, -aar, -ie + leenwoorden<br><em>Ending in -el, -em, -er, -en, -aar, -ie + loanwords</em>", "tafel → tafels, auto → auto's"],
          ["-eren", "Kind, ei, lied, blad, volk<br><em>A small fixed group</em>", "kind → kinderen, ei → eieren"],
          ["Umlaut + -en", "Stad, dag, weg, glas<br><em>Another small fixed group</em>", "stad → steden, dag → dagen"]
        ]
      }
    ],
    rules: [
      { nl: "Alle meervouden gebruiken 'de', ook als het enkelvoud 'het' is.", en: "All plurals use 'de', even if the singular was 'het'." },
      { nl: "'Een' is het onbepaald lidwoord voor zowel de- als het-woorden.", en: "'Een' is the indefinite article for both de- and het-words." }
    ],
    examples: [
      { nl: "het kind → de kinderen", en: "the child → the children" },
      { nl: "de auto → de auto's", en: "the car → the cars" },
      { nl: "het huis → de huizen", en: "the house → the houses", note: "s→z voor -en" }
    ],
    tip: "Er zijn circa 250 het-woorden die je moet onthouden. De rest is meestal 'de'.",
    tipEn: "There are ~250 het-words to memorise. The rest is usually 'de'."
  },

  {
    id: "vraagwoorden", level: "A1", filter: "overig",
    title: "Vraagwoorden", titleEn: "Question words",
    intro: "Vraagwoorden staan aan het begin van een vraag en bepalen het type antwoord.",
    introEn: "Question words come at the start of a question and determine the type of answer.",
    tables: [{
      heading: "Overzicht vraagwoorden", headingEn: "Overview of question words",
      cols: ["Question word", "English", "Example"],
      rows: [
        ["wie", "who", "Wie is dat?"],
        ["wat", "what", "Wat doe jij?"],
        ["waar", "where", "Waar woon jij?"],
        ["wanneer", "when", "Wanneer begin je?"],
        ["hoe", "how", "Hoe gaat het?"],
        ["waarom", "why", "Waarom leer jij Nederlands?"],
        ["welke / welk", "which", "Welke taal spreek jij?"],
        ["hoeveel", "how many / much", "Hoeveel kost dat?"],
        ["hoe lang", "how long", "Hoe lang woon jij hier?"],
        ["hoe vaak", "how often", "Hoe vaak sport jij?"],
        ["hoe oud", "how old", "Hoe oud ben jij?"]
      ]
    }],
    rules: [
      { nl: "Na een vraagwoord staat het werkwoord direct: Vraagw. → Werkwoord → Onderwerp.", en: "After a question word the verb comes directly: Q.word → Verb → Subject." },
      { nl: "'Welke' voor de-woorden en meervouden; 'welk' voor het-woorden.", en: "'Welke' for de-words and plurals; 'welk' for het-words." }
    ],
    examples: [
      { nl: "Waar werkt hij?", en: "Where does he work?" },
      { nl: "Hoe laat is het?", en: "What time is it?" },
      { nl: "Welk boek lees jij?", en: "Which book are you reading?", note: "welk + het-woord" }
    ],
    tip: "Vraagwoorden veroorzaken altijd inversie: het werkwoord staat voor het onderwerp.",
    tipEn: "Question words always cause inversion: the verb comes before the subject."
  },

  {
    id: "ontkenning", level: "A1", filter: "overig",
    title: "Ontkenning: niet & geen", titleEn: "Negation: niet & geen",
    intro: "De gouden regel: GEEN = onbepaald zelfstandig naamwoord (een of geen lidwoord) · NIET = alles andere (werkwoorden, bijvoeglijke naamwoorden, bepaalde zelfstandige naamwoorden, plaatsen…)",
    introEn: "The golden rule: GEEN = indefinite noun (een or no article) · NIET = everything else (verbs, adjectives, definite nouns, places…)",
    tables: [
      {
        heading: "GEEN — onbepaald zelfstandig naamwoord", headingEn: "GEEN — indefinite noun",
        cols: ["Situation", "Positive", "Negative", "English"],
        rows: [
          ["'een' (telbaar enkelvoud)", "Ik heb een hond.", "Ik heb geen hond.", "I don't have a dog."],
          ["geen lidwoord — meervoud", "Dit zijn auto's.", "Dit zijn geen auto's.", "These are not cars."],
          ["geen lidwoord — ontelbaar", "Ik heb geld.", "Ik heb geen geld.", "I don't have money."],
          ["bijv.nw. + onbepaald zn.", "Dit is een mooie auto.", "Dit is geen mooie auto.", "This is not a beautiful car."]
        ]
      },
      {
        heading: "NIET — waar staat het?", headingEn: "NIET — where does it go?",
        cols: ["Vraag / Question", "Regel / Rule", "Voorbeeld / Example", "English"],
        rows: [
          ["1. Tweede werkwoord?<br><em>Second verb?</em>", "niet ervóór / niet before it", "Ik wil het boek niet lezen.", "I don't want to read the book."],
          ["", "", "Ik heb mijn huiswerk niet gemaakt.", "I haven't done my homework."],
          ["2. Voorzetsel (met, om, op…)?<br><em>Preposition?</em>", "niet ervóór / niet before it", "Ik ga niet met Elise op vakantie.", "I'm not going on holiday with Elise."],
          ["3. Bijvoeglijk naamwoord?<br><em>Adjective?</em>", "niet ervóór / niet before it", "Hij is niet oud.", "He is not old."],
          ["4. Niets van bovenstaande?<br><em>None of the above?</em>", "niet achteraan / niet at the end", "Ik eet niet.", "I don't eat."],
          ["", "", "Ik ken de weg niet.", "I don't know the way."],
          ["5. Tijdswoord (vandaag…)?<br><em>Time word?</em>", "niet erna / niet after it", "Ik loop vandaag niet.", "I'm not walking today."]
        ]
      },
      {
        heading: "NIET — scheidbare werkwoorden & plaatsbepaling", headingEn: "NIET — separable verbs & place",
        cols: ["Situation", "Example", "English"],
        rows: [
          ["Scheidbaar werkwoord → vóór prefix", "Ik sta morgen niet op.", "I'm not getting up tomorrow."],
          ["Scheidbaar werkwoord → vóór prefix", "Zij belt haar moeder niet op.", "She doesn't call her mother."],
          ["Plaatsbepaling → vóór de plaats", "Ik ga niet naar Amsterdam.", "I'm not going to Amsterdam."],
          ["Plaatsbepaling → vóór de plaats", "Wij werken niet op kantoor.", "We don't work at the office."]
        ]
      },
      {
        heading: "Snel overzicht niet & geen", headingEn: "Quick reference",
        cols: ["Situation", "Use", "Example"],
        rows: [
          ["Indefinite noun (een / no article)", "GEEN", "Dit is geen auto."],
          ["Definite noun (de/het/possessive)", "NIET after the noun", "Ik ken de weg niet."],
          ["Participle or infinitive", "NIET before 2nd verb", "Ik heb het niet gemaakt."],
          ["Main verb only", "NIET after the verb", "Ik eet niet."],
          ["Simple time expression", "NIET after time expr.", "Ik loop vandaag niet."],
          ["Time expression + preposition", "NIET before preposition", "Ik loop niet om 8:00."],
          ["Predicative adjective", "NIET before adjective", "Hij is niet oud."],
          ["Separable prefix", "NIET before prefix", "Ik sta niet op."],
          ["Place expression", "NIET before the place", "Ik ga niet naar school."]
        ]
      },
      {
        heading: "Veelgemaakte fouten", headingEn: "Common mistakes to avoid",
        cols: ["✗ Wrong", "✓ Correct", "Rule"],
        rows: [
          ["Ik heb niet een hond.", "Ik heb geen hond.", "geen bij 'een'<br><em>geen with 'een'</em>"],
          ["Ik niet eet.", "Ik eet niet.", "niet na werkwoord<br><em>niet after verb</em>"],
          ["Ik ga naar Amsterdam niet.", "Ik ga niet naar Amsterdam.", "niet vóór plaatsbepaling<br><em>niet before place</em>"],
          ["Ik heb niet gemaakt mijn huiswerk.", "Ik heb mijn huiswerk niet gemaakt.", "niet vóór deelwoord, na object<br><em>niet before participle, after object</em>"],
          ["Ik sta niet morgen op.", "Ik sta morgen niet op.", "niet vóór prefix, na tijdsbepaling<br><em>niet before prefix, after time word</em>"],
          ["Ik loop niet vandaag.", "Ik loop vandaag niet.", "niet na eenvoudige tijdsbepaling<br><em>niet after simple time word</em>"]
        ]
      }
    ],
    rules: [
      { nl: "Prioriteit NIET (als meerdere regels gelden, staat NIET vóór het eerste element):", en: "NIET position priority (when multiple rules apply, NIET goes before the first of these):" },
      { nl: "1. Scheidbaar prefix (op, mee, aan…)", en: "1. Separable prefix (op, mee, aan…)" },
      { nl: "2. Infinitief of voltooid deelwoord (kopen, gemaakt…)", en: "2. Infinitive or participle (kopen, gemaakt…)" },
      { nl: "3. Voorzetselgroep / plaatsbepaling (naar school, in Amsterdam…)", en: "3. Prepositional phrase / place (naar school, in Amsterdam…)" },
      { nl: "4. Predicatief bijvoeglijk naamwoord (leuk, makkelijk…)", en: "4. Predicative adjective (leuk, makkelijk…)" },
      { nl: "Andere ontkenningswoorden: nooit (never), niemand (nobody), niets (nothing), nergens (nowhere), nog niet (not yet), nog geen (not yet any).", en: "Other negatives: nooit, niemand, niets, nergens, nog niet, nog geen." }
    ],
    examples: [
      { nl: "Ik heb geen idee.", en: "I have no idea.", note: "geen = 'no' of 'not a'" },
      { nl: "Dat is niet mijn schildpad!", en: "That is not my turtle!", note: "bezittelijk vnw. → niet vóór vnw." },
      { nl: "Dat is mijn schildpad niet!", en: "That is not my turtle!", note: "ook correct: niet na het zn." },
      { nl: "Wij eten vandaag niet in het restaurant.", en: "We are not eating at the restaurant today.", note: "tijdsbepaling eerst, dan niet vóór plaatsbepaling" },
      { nl: "Ik heb nog nooit sushi gegeten.", en: "I have never eaten sushi.", note: "nooit = never; vervangt 'niet'" },
      { nl: "Er is niemand thuis.", en: "There is nobody home.", note: "niemand = nobody; vervangt 'niet iemand'" },
      { nl: "Ik weet niets over dat onderwerp.", en: "I know nothing about that subject.", note: "niets = nothing; vervangt 'niet iets'" },
      { nl: "We gaan nergens naartoe dit weekend.", en: "We're not going anywhere this weekend.", note: "nergens = nowhere; vervangt 'niet ergens'" },
      { nl: "Ik heb de toets nog niet gemaakt.", en: "I haven't taken the test yet.", note: "nog niet = not yet (bij werkwoorden)" },
      { nl: "Hij heeft nog geen beslissing genomen.", en: "He hasn't made a decision yet.", note: "nog geen = not yet any (bij zelfstandig naamwoord)" }
    ],
    extraTables: [{
      heading: "Alle ontkenningswoorden", headingEn: "All negation words",
      cols: ["Nederlands", "English", "Vervangt", "Voorbeeld"],
      colsEn: ["Dutch", "English", "Replaces", "Example"],
      rows: [
        ["niet", "not", "—", "Ik werk niet."],
        ["geen", "no / not a / not any", "een / nul-lidwoord", "Ik heb geen auto."],
        ["nooit", "never", "niet + ooit", "Ik ga nooit naar de bioscoop."],
        ["niemand", "nobody / no one", "niet + iemand", "Er is niemand in de kamer."],
        ["niets", "nothing", "niet + iets", "Ik heb niets gezien."],
        ["nergens", "nowhere", "niet + ergens", "Hij kan het nergens vinden."],
        ["nog niet", "not yet", "niet (+ tijd)", "De brief is nog niet gekomen."],
        ["nog geen", "not yet any / no … yet", "geen (+ tijd)", "Ik heb nog geen antwoord."],
        ["niet meer", "no longer / not anymore", "niet (+ duur)", "Zij woont hier niet meer."],
        ["geen … meer", "no more / no … left", "geen (+ duur)", "Er is geen melk meer."],
        ["helemaal niet", "not at all", "niet (versterkt)", "Ik ben het er helemaal niet mee eens."],
        ["helemaal geen", "no … at all", "geen (versterkt)", "Er is helemaal geen reden voor paniek."]
      ]
    }],
    tip: "GEEN kan vertaald worden als 'not a' of 'no' afhankelijk van de context: Ik heb geen auto = I don't have a car / I have no car. Ontkenningswoorden zoals nooit, niemand, niets staan op dezelfde plek als niet.",
    tipEn: "GEEN can translate as 'not a' or 'no' depending on context. Negation words like nooit, niemand, niets follow the same position rules as niet."
  },

  {
    id: "verkleinwoorden", level: "A1", filter: "overig",
    title: "Verkleinwoorden (-tje)", titleEn: "Diminutives",
    intro: "Verkleinwoorden maken iets kleiner of schattig en zijn altijd het-woorden.",
    introEn: "Diminutives make something smaller or cuter and are always het-words.",
    tables: [{
      heading: "Verkleinwoordregels", headingEn: "Diminutive rules",
      cols: ["Ending", "When", "Example"],
      rows: [
        ["-tje", "Standaardregel (meeste woorden)<br><em>Default rule (most words)</em>", "boek → boekje, tafel → tafeltje"],
        ["-je", "Na l, n, r, m + beklemtoonde lange klinker<br><em>After l, n, r, m + stressed long vowel</em>", "bal → balletje, baan → baantje"],
        ["-etje", "Na korte klinker + enkele medeklinker<br><em>After short vowel + single consonant</em>", "blad → blaadje, glas → glaasje"],
        ["-pje", "Na -m aan het einde<br><em>After final -m</em>", "bezem → bezempje, boom → boompje"],
        ["-kje", "Na -ng<br><em>After -ng</em>", "ring → ringetje"]
      ]
    }],
    rules: [
      { nl: "Alle verkleinwoorden zijn het-woorden, ook als het origineel een de-woord is.", en: "All diminutives are het-words, even if the original is a de-word." },
      { nl: "Verkleinwoorden kunnen ook affectie uitdrukken, niet alleen een kleine maat.", en: "Diminutives can express affection, not just small size." }
    ],
    examples: [
      { nl: "een kopje koffie", en: "a (small) cup of coffee" },
      { nl: "het huisje op de heuvel", en: "the little house on the hill" },
      { nl: "even een momentje", en: "just a moment (polite/friendly)" }
    ],
    tip: "Nederlanders gebruiken verkleinwoorden erg vaak in informele spraak.",
    tipEn: "Dutch people use diminutives very often in informal speech."
  },

  {
    id: 'voorzetsels-a1',
    level: 'A1',
    title: 'Voorzetsels — plaats & richting',
    titleEn: 'Prepositions — place & direction',
    nlExpl: 'Voorzetsels geven aan WAAr iets is (plaats) of WAArheen iemand gaat (richting). Ze staan altijd VOOR het zelfstandig naamwoord.',
    enExpl: 'Prepositions indicate WHERE something is (place) or WHERE someone is going (direction). They always come BEFORE the noun.',
    tip: 'Onthoud: "in" = binnen een ruimte, "op" = op een oppervlak, "aan" = bevestigd aan iets, "bij" = in de buurt van of bij iemand thuis.',
    tipEn: 'Remember: "in" = inside a space, "op" = on a surface, "aan" = attached to something, "bij" = near or at someone\'s place.',
    structure: 'Voorzetsel + (lidwoord) + zelfstandig naamwoord',
    structureEn: 'Preposition + (article) + noun',
    slots: [
      { pos: 'VZ', color: 'posvw', label: 'Voorzetsel', en: 'Preposition', desc: 'Geeft de relatie aan tussen woorden.', examples: 'in · op · aan · bij · voor · achter · naast · tussen · onder · boven' },
      { pos: 'LW', color: 'pos3', label: 'Lidwoord', en: 'Article', desc: 'De, het of een — mag wegvallen bij namen en sommige uitdrukkingen.', examples: 'de · het · een' },
      { pos: 'ZN', color: 'pos2', label: 'Zelfstandig naamwoord', en: 'Noun', desc: 'Het woord waar de positie/richting op slaat.', examples: 'tafel · huis · school · werk' },
    ],
    table: [
      { slot: 'Plaats (waar?)',   q: 'in',     ex: 'De boeken liggen IN de tas. · Ik woon IN Amsterdam.' },
      { slot: 'Plaats (waar?)',   q: 'op',     ex: 'De koffie staat OP de tafel. · Ze werkt OP kantoor.' },
      { slot: 'Plaats (waar?)',   q: 'aan',    ex: 'De jas hangt AAN de deur. · We wonen AAN de zee.' },
      { slot: 'Plaats (waar?)',   q: 'bij',    ex: 'Ik ben BIJ de dokter. · Ze woont BIJ haar ouders.' },
      { slot: 'Plaats (waar?)',   q: 'voor',   ex: 'De auto staat VOOR het huis. · VOOR de winkel.' },
      { slot: 'Plaats (waar?)',   q: 'achter', ex: 'De kat zit ACHTER de bank. · ACHTER het station.' },
      { slot: 'Plaats (waar?)',   q: 'naast',  ex: 'Hij zit NAAST mij. · NAAST de bibliotheek.' },
      { slot: 'Plaats (waar?)',   q: 'tussen', ex: 'De sleutels liggen TUSSEN de boeken.' },
      { slot: 'Plaats (waar?)',   q: 'onder',  ex: 'De hond slaapt ONDER de tafel.' },
      { slot: 'Plaats (waar?)',   q: 'boven',  ex: 'Het vliegtuig vliegt BOVEN de stad.' },
      { slot: 'Richting (waarheen?)', q: 'naar', ex: 'Ik ga NAAR school. · We rijden NAAR Amsterdam.' },
      { slot: 'Richting (waarheen?)', q: 'uit',  ex: 'Hij komt UIT Nederland. · Ik stap UIT de trein.' },
      { slot: 'Met / Zonder',     q: 'met',    ex: 'Ik ga MET de fiets. · Koffie MET melk.' },
      { slot: 'Met / Zonder',     q: 'zonder', ex: 'Thee ZONDER suiker. · ZONDER jas naar buiten.' },
      { slot: 'Tijd',             q: 'om',     ex: 'OM acht uur. · OM half drie.' },
      { slot: 'Tijd',             q: 'op',     ex: 'OP maandag. · OP 5 maart.' },
      { slot: 'Tijd',             q: 'in',     ex: 'IN de zomer. · IN januari. · IN 2024.' },
    ],
    stype: 'Hoofdzin',
  },

  {
    id: "hebben-of-zijn", level: "A1", filter: "tijden",
    title: "Hebben of zijn? (VTT)", titleEn: "Hebben or zijn? (Perfect tense)",
    intro: "In de voltooid tegenwoordige tijd (VTT) heb je altijd een hulpwerkwoord nodig: 'hebben' of 'zijn'. De keuze hangt af van het werkwoord. Dit is één van de moeilijkste onderdelen van het Nederlands!",
    introEn: "In the perfect tense (VTT) you always need an auxiliary verb: 'hebben' or 'zijn'. The choice depends on the verb. This is one of the hardest parts of Dutch!",
    tables: [
      {
        heading: "De gouden regel", headingEn: "The golden rule",
        cols: ["Hulpwerkwoord", "Wanneer?", "Voorbeelden"],
        colsEn: ["Auxiliary", "When?", "Examples"],
        rows: [
          ["ZIJN", "Beweging van A naar B (verplaatsing)<br><em>Movement from A to B</em>", "gaan, komen, lopen, fietsen, rijden, vliegen, reizen, vertrekken, aankomen"],
          ["ZIJN", "Verandering van toestand (iets wordt anders)<br><em>Change of state (something changes)</em>", "worden, groeien, sterven, trouwen, wakker worden, veranderen"],
          ["ZIJN", "Vaste groep uitzonderingen (uit je hoofd leren)<br><em>Fixed exceptions (memorise these)</em>", "zijn, blijven, lijken, gebeuren, slagen, mislukken, vallen, opstaan"],
          ["HEBBEN", "Alle andere werkwoorden (de grote meerderheid!)<br><em>All other verbs (the vast majority!)</em>", "eten, werken, lezen, kopen, zeggen, denken, maken, horen, zien"]
        ]
      },
      {
        heading: "Zijn — bewegingswerkwoorden", headingEn: "Zijn — movement verbs",
        cols: ["Infinitief", "VTT-vorm", "Voorbeeld"],
        colsEn: ["Infinitive", "Perfect tense", "Example"],
        rows: [
          ["gaan",      "ben/is gegaan",      "Ik ben naar school gegaan."],
          ["komen",     "ben/is gekomen",     "Ze is gisteren gekomen."],
          ["lopen",     "ben/is gelopen",     "We zijn naar het park gelopen."],
          ["fietsen",   "ben/is gefietst",    "Hij is naar zijn werk gefietst."],
          ["rijden",    "ben/is gereden",     "Ik ben met de auto gereden."],
          ["vliegen",   "ben/is gevlogen",    "Ze zijn naar Spanje gevlogen."],
          ["reizen",    "ben/is gereisd",     "We zijn naar Parijs gereisd."],
          ["vertrekken","ben/is vertrokken",  "De trein is vertrokken."],
          ["aankomen",  "ben/is aangekomen",  "Hij is laat aangekomen."],
          ["terugkeren","ben/is teruggekeerd","Ze zijn gisteren teruggekeerd."]
        ]
      },
      {
        heading: "Zijn — verandering van toestand", headingEn: "Zijn — change of state",
        cols: ["Infinitief", "VTT-vorm", "Voorbeeld"],
        colsEn: ["Infinitive", "Perfect tense", "Example"],
        rows: [
          ["worden",        "ben/is geworden",       "Hij is dokter geworden."],
          ["groeien",       "ben/is gegroeid",       "De kinderen zijn snel gegroeid."],
          ["sterven",       "ben/is gestorven",      "De plant is gestorven."],
          ["trouwen",       "ben/is getrouwd",       "Ze zijn getrouwd."],
          ["veranderen",    "ben/is veranderd",      "Veel is veranderd."],
          ["wakker worden", "ben/is wakker geworden", "Ik ben vroeg wakker geworden."]
        ]
      },
      {
        heading: "Zijn — vaste uitzonderingen (leer ze uit je hoofd!)", headingEn: "Zijn — fixed exceptions",
        cols: ["Infinitief", "VTT-vorm", "Voorbeeld"],
        colsEn: ["Infinitive", "Perfect tense", "Example"],
        rows: [
          ["zijn",      "ben/is geweest",   "Ik ben in Amsterdam geweest."],
          ["blijven",   "ben/is gebleven",  "Ze is thuis gebleven."],
          ["lijken",    "ben/is geleken",   "Het heeft geleken alsof..."],
          ["gebeuren",  "is gebeurd",       "Wat is er gebeurd?"],
          ["slagen",    "ben/is geslaagd",  "Hij is geslaagd voor zijn examen."],
          ["mislukken", "ben/is mislukt",   "Het plan is mislukt."],
          ["vallen",    "ben/is gevallen",  "Ze is gevallen."],
          ["opstaan",   "ben/is opgestaan", "Ik ben om zeven uur opgestaan."]
        ]
      },
      {
        heading: "Hebben — de meerderheid van werkwoorden", headingEn: "Hebben — the majority of verbs",
        cols: ["Infinitief", "VTT-vorm", "Voorbeeld"],
        colsEn: ["Infinitive", "Perfect tense", "Example"],
        rows: [
          ["eten",    "heb/heeft gegeten",   "We hebben pizza gegeten."],
          ["werken",  "heb/heeft gewerkt",   "Ze heeft vandaag gewerkt."],
          ["lezen",   "heb/heeft gelezen",   "Ik heb dat boek gelezen."],
          ["kopen",   "heb/heeft gekocht",   "Hij heeft een auto gekocht."],
          ["zeggen",  "heb/heeft gezegd",    "Wat heb je gezegd?"],
          ["denken",  "heb/heeft gedacht",   "Ik heb eraan gedacht."],
          ["maken",   "heb/heeft gemaakt",   "Ze heeft haar huiswerk gemaakt."],
          ["horen",   "heb/heeft gehoord",   "Heb je dat gehoord?"],
          ["zien",    "heb/heeft gezien",    "We hebben de film gezien."],
          ["spreken", "heb/heeft gesproken", "Ik heb hem gisteren gesproken."]
        ]
      }
    ],
    rules: [
      { nl: "ZIJN: beweging (A → B), verandering van toestand, of vaste uitzonderingen.", en: "ZIJN: movement (A → B), change of state, or fixed exceptions." },
      { nl: "HEBBEN: alle overige werkwoorden — dit is de grote meerderheid!", en: "HEBBEN: all other verbs — this is the large majority!" },
      { nl: "Twijfel je? Vraag jezelf: 'Gaat iemand ergens naartoe?' of 'Verandert er iets?' → ZIJN. Anders → HEBBEN.", en: "Not sure? Ask: 'Is someone moving somewhere?' or 'Is something changing?' → ZIJN. Otherwise → HEBBEN." },
      { nl: "Scheidbare werkwoorden volgen het basiswerkwoord: aankomen = zijn (beweging), opeten = hebben.", en: "Separable verbs follow the base verb: aankomen = zijn (movement), opeten = hebben." },
      { nl: "Sommige werkwoorden kunnen BEIDE hebben, met betekenisverschil: rijden (zijn = verplaatsing) / rijden (hebben = activiteit zonder bestemming).", en: "Some verbs allow BOTH, with a meaning difference: rijden (zijn = travel) / rijden (hebben = activity without destination)." }
    ],
    examples: [
      { nl: "Ik ben naar het werk gefietst.", en: "I cycled to work.", note: "zijn: beweging A→B" },
      { nl: "Hij is ziek geworden.", en: "He got sick.", note: "zijn: verandering van toestand" },
      { nl: "Ze is thuis gebleven.", en: "She stayed home.", note: "zijn: vaste uitzondering" },
      { nl: "We hebben de hele dag gewerkt.", en: "We worked all day.", note: "hebben: geen beweging/verandering" },
      { nl: "Heb je dat boek al gelezen?", en: "Have you read that book yet?", note: "hebben: mentale activiteit" },
      { nl: "De kinderen zijn snel gegroeid.", en: "The children have grown quickly.", note: "zijn: verandering (groei)" }
    ],
    tip: "Ezelsbruggetje: ZIJN = 'BAGS' — Beweging, Algemene uitzonderingen, Groei/verandering, Specifieke lijsten. Alles BUITEN de BAGS-categorie = HEBBEN.",
    tipEn: "Mnemonic: ZIJN = movement, exceptions, change of state. Everything else = HEBBEN — and 'everything else' is most verbs!"
  },

  {
    id: "telwoorden", level: "A1", filter: "overig",
    title: "Telwoorden", titleEn: "Numbers",
    intro: "Telwoorden zijn getallen. Er zijn hoofdtelwoorden (één, twee, drie…) voor hoeveelheden en rangtelwoorden (eerste, tweede, derde…) voor volgorde.",
    introEn: "Numbers come in two kinds: cardinal numbers (één, twee, drie…) for quantities and ordinal numbers (eerste, tweede, derde…) for order.",
    tables: [
      {
        heading: "Hoofdtelwoorden 1–20", headingEn: "Cardinal numbers 1–20",
        cols: ["#", "NL", "#", "NL"],
        rows: [
          ["1", "één", "11", "elf"],
          ["2", "twee", "12", "twaalf"],
          ["3", "drie", "13", "dertien"],
          ["4", "vier", "14", "veertien"],
          ["5", "vijf", "15", "vijftien"],
          ["6", "zes", "16", "zestien"],
          ["7", "zeven", "17", "zeventien"],
          ["8", "acht", "18", "achttien"],
          ["9", "negen", "19", "negentien"],
          ["10", "tien", "20", "twintig"]
        ]
      },
      {
        heading: "Tientallen & grote getallen", headingEn: "Tens & large numbers",
        cols: ["Number", "Dutch", "Pattern"],
        rows: [
          ["30", "dertig", ""],
          ["40", "veertig", ""],
          ["50", "vijftig", ""],
          ["60", "zestig", ""],
          ["70", "zeventig", ""],
          ["80", "tachtig", "afwijkend — onthouden!"],
          ["90", "negentig", ""],
          ["100", "honderd", ""],
          ["1 000", "duizend", ""],
          ["1 000 000", "een miljoen", ""]
        ]
      },
      {
        heading: "Samengestelde getallen", headingEn: "Compound numbers",
        cols: ["Number", "Dutch", "Note"],
        rows: [
          ["21", "eenentwintig", "eenheid + en + tiental"],
          ["35", "vijfendertig", ""],
          ["48", "achtenveertig", ""],
          ["100", "honderd", ""],
          ["101", "honderdenéén", "honderd + en + 1"],
          ["250", "tweehonderdvijftig", ""]
        ]
      },
      {
        heading: "Rangtelwoorden", headingEn: "Ordinal numbers",
        cols: ["#", "Ordinal", "#", "Ordinal"],
        rows: [
          ["1e", "eerste", "8e", "achtste"],
          ["2e", "tweede", "9e", "negende"],
          ["3e", "derde", "10e", "tiende"],
          ["4e", "vierde", "11e", "elfde"],
          ["5e", "vijfde", "12e", "twaalfde"],
          ["6e", "zesde", "20e", "twintigste"],
          ["7e", "zevende", "100e", "honderdste"]
        ]
      }
    ],
    rules: [
      { nl: "Getallen 13–19: eindigen op -tien. Uitzondering: dertien (niet drietien).", en: "Numbers 13–19 end in -tien. Exception: dertien (not drietien)." },
      { nl: "Tientallen: eindigen op -tig. Uitzondering: tachtig (80, niet achtig).", en: "Tens end in -tig. Exception: tachtig (80, not achtig)." },
      { nl: "Samengestelde getallen: eenheid + en + tiental (vijfendertig, niet dertigvijf).", en: "Compound numbers: unit + en + ten (vijfendertig, not dertigvijf)." },
      { nl: "Rangtelwoorden 1e–19e: stam + -de. Uitzondering: eerste, tweede, derde.", en: "Ordinals 1st–19th: stem + -de. Exceptions: eerste, tweede, derde." },
      { nl: "Rangtelwoorden 20e en hoger: + -ste (twintigste, honderdste).", en: "Ordinals 20th and above: + -ste (twintigste, honderdste)." }
    ],
    examples: [
      { nl: "Ik woon op de derde verdieping.", en: "I live on the third floor.", note: "rangtelwoord" },
      { nl: "Er zijn tweehonderdvijftig studenten in de school.", en: "There are two hundred and fifty students in the school." },
      { nl: "Ze heeft drie katten en twee honden.", en: "She has three cats and two dogs." },
      { nl: "Mijn verjaardag is op de eenentwintigste maart.", en: "My birthday is on the twenty-first of March." }
    ],
    tip: "Onthoud de uitzonderingen: eerste (niet éénde), tweede (niet twéde), derde (niet driedde), tachtig (niet achtig).",
    tipEn: "Remember the exceptions: eerste, tweede, derde (not éénde/twéde/driedde), and tachtig not achtig."
  },

  // ══ A2 ══════════════════════════════════════════════════════════════════════

  {
    id: "bijvoeglijk-nw", level: "A2", filter: "bijvoeglijk",
    title: "Bijvoeglijk naamwoord (buiging)", titleEn: "Adjective inflection",
    intro: "Bijvoeglijke naamwoorden krijgen een -e als ze voor een zelfstandig naamwoord staan, behalve in één specifiek geval.",
    introEn: "Adjectives add -e when placed before a noun, except in one specific case.",
    tables: [{
      heading: "De -e buigingsregel", headingEn: "The -e inflection rule",
      cols: ["Situation", "Rule", "Example"],
      rows: [
        ["de-woord + bepaald lidwoord", "altijd -e", "de grote auto"],
        ["de-woord + onbepaald lidwoord", "altijd -e", "een grote auto"],
        ["het-woord + bepaald lidwoord", "altijd -e", "het grote huis"],
        ["het-woord + onbepaald lidwoord", "GEEN -e !", "een groot huis ✓"],
        ["het-woord + geen lidwoord", "GEEN -e !", "groot nieuws ✓"],
        ["Predicatief (na zijn/worden)", "nooit -e", "de auto is groot"]
      ]
    }],
    rules: [
      { nl: "De enige uitzondering: bijvoeglijk naamwoord + 'een' + het-woord = geen -e.", en: "The only exception: adjective + 'een' + het-word = no -e." },
      { nl: "Predicatief gebruik (na zijn/worden/lijken): nooit buiging.", en: "Predicative use (after zijn/worden/lijken): never inflected." },
      { nl: "Spellingregel: 'druk' → 'drukke' (verdubbeling medeklinker na korte klinker).", en: "Spelling rule: double consonant after short vowel: 'druk' → 'drukke'." }
    ],
    examples: [
      { nl: "een grote man / een groot huis", en: "a tall man / a big house", note: "let op: een + groot + het-woord" },
      { nl: "het mooie weer / mooi weer", en: "the nice weather / nice weather", note: "mooi weer = onbepaald het-woord" },
      { nl: "De soep is warm.", en: "The soup is warm.", note: "predicatief: geen -e" }
    ],
    tip: "Ezelsbruggetje: een + bijv.nw. + het-woord = GEEN -e. Denk aan: een groot huis.",
    tipEn: "Mnemonic: een + adjective + het-word = NO -e. Think of: een groot huis."
  },

  {
    id: "vergrotende-trap", level: "A2", filter: "bijvoeglijk",
    title: "Vergrotende & overtreffende trap", titleEn: "Comparative & superlative",
    intro: "De vergrotende trap vergelijkt twee zaken; de overtreffende trap geeft het uiterste aan.",
    introEn: "The comparative compares two things; the superlative expresses the extreme.",
    tables: [
      {
        heading: "Regelmatige vormen", headingEn: "Regular forms",
        cols: ["Positive", "Comparative", "Superlative"],
        rows: [
          ["groot", "groter", "het grootst / de grootste"],
          ["klein", "kleiner", "het kleinst / de kleinste"],
          ["mooi", "mooier", "het mooist / de mooiste"],
          ["druk", "drukker", "het drukst / de drukste"],
          ["duur", "duurder", "het duurst / de duurste"]
        ]
      },
      {
        heading: "Onregelmatige vormen", headingEn: "Irregular forms",
        cols: ["Positive", "Comparative", "Superlative"],
        rows: [
          ["goed", "beter", "het best / de beste"],
          ["veel", "meer", "het meest / de meeste"],
          ["weinig", "minder", "het minst / de minste"],
          ["graag", "liever", "het liefst"]
        ]
      }
    ],
    rules: [
      { nl: "Vergrotende trap: bijv.nw. + -er + dan (groter dan).", en: "Comparative: adj. + -er + dan (bigger than)." },
      { nl: "Zo...als voor gelijkheid: 'Hij is zo groot als ik'.", en: "Zo...als for equality: 'He is as tall as I am'." },
      { nl: "'Steeds + vergrotende trap' = increasingly: 'Het wordt steeds warmer'.", en: "'Steeds + comparative' = increasingly warmer." }
    ],
    examples: [
      { nl: "Amsterdam is groter dan Utrecht.", en: "Amsterdam is bigger than Utrecht." },
      { nl: "Dit is het beste restaurant van de stad.", en: "This is the best restaurant in town." },
      { nl: "Ik spreek liever Nederlands dan Engels.", en: "I prefer to speak Dutch rather than English." }
    ],
    tip: "Let op spelling: lang → langer (niet: langger); oud → ouder; breed → breder.",
    tipEn: "Note spelling: lang → langer; oud → ouder; breed → breder."
  },

  {
    id: "object-vnw", level: "A2", filter: "voornaamwoord",
    title: "Voorwerpvoornaamwoorden", titleEn: "Object pronouns",
    intro: "Voorwerpvoornaamwoorden vervangen het lijdend of meewerkend voorwerp in een zin.",
    introEn: "Object pronouns replace the direct or indirect object in a sentence.",
    tables: [{
      heading: "Overzicht voorwerpvoornaamwoorden", headingEn: "Overview of object pronouns",
      cols: ["Person", "Unstressed", "Stressed", "English"],
      rows: [
        ["ik", "me", "mij", "me"],
        ["jij/je", "je", "jou", "you"],
        ["u", "u", "u", "you (formal)"],
        ["hij", "hem", "hem", "him"],
        ["zij (enkv.)", "haar / ze", "haar", "her"],
        ["het", "het", "het", "it"],
        ["wij/we", "ons", "ons", "us"],
        ["jullie", "jullie", "jullie", "you (pl.)"],
        ["zij (mv.)", "ze / hen / hun", "hen / hun", "them"]
      ]
    }],
    rules: [
      { nl: "'Hen' als lijdend voorwerp; 'hun' als meewerkend voorwerp (formeel).", en: "'Hen' as direct object; 'hun' as indirect object (formal)." },
      { nl: "In gesproken taal wordt 'ze' gebruikt voor beide (hen/hun).", en: "In spoken language 'ze' is used for both (hen/hun)." },
      { nl: "Na een voorzetsel: altijd de beklemtoonde vorm (voor mij, met hem).", en: "After a preposition: always the stressed form (voor mij, met hem)." }
    ],
    examples: [
      { nl: "Ik zie hem elke dag.", en: "I see him every day." },
      { nl: "Kun jij me helpen?", en: "Can you help me?" },
      { nl: "Ik geef het aan haar.", en: "I give it to her.", note: "na voorzetsel: haar" }
    ],
    tip: "Na een voorzetsel gebruik je altijd de beklemtoonde vorm: voor mij, met jou, bij hem.",
    tipEn: "After a preposition always use the stressed form: voor mij, met jou, bij hem."
  },

  {
    id: "er-systeem", level: "A2", filter: "overig",
    title: "Het 'er'-systeem", titleEn: "The 'er' system",
    intro: "'Er' heeft vier verschillende functies in het Nederlands.",
    introEn: "'Er' has four different functions in Dutch.",
    tables: [{
      heading: "De vier functies van 'er'", headingEn: "The four functions of 'er'",
      cols: ["Function", "Use", "Example", "English"],
      rows: [
        ["1. Existentieel", "er is / er zijn", "Er is een probleem.", "There is a problem."],
        ["2. Voornaamwoordelijk", "er + voorzetsel", "Ik denk er vaak aan.", "I often think about it."],
        ["3. Partitatief", "aantal + er", "Ik heb er drie.", "I have three (of them)."],
        ["4. Locatief", "er = daar (vaag)", "Ik woon er al jaren.", "I have lived there for years."]
      ]
    }],
    rules: [
      { nl: "Voornaamwoordelijk 'er': gebruik 'er + voorzetsel' voor dingen, niet 'voorzetsel + het/ze'.", en: "Pronominal 'er': use 'er + preposition' for things, not 'preposition + het/ze'." },
      { nl: "Partitatief 'er' staat voor het getal: 'Ik heb er twee gekocht'.", en: "Partitive 'er' stands before the number: 'Ik heb er twee gekocht'." },
      { nl: "Bij ontkenning: 'er geen': 'Er is geen melk meer'.", en: "With negation: 'er geen': 'Er is geen melk meer'." }
    ],
    examples: [
      { nl: "Er zijn veel studenten in de klas.", en: "There are many students in the class.", note: "existentieel" },
      { nl: "Ik houd er niet van.", en: "I don't like it.", note: "voornaamwoordelijk: houden van" },
      { nl: "Hoeveel appels heb jij? — Ik heb er vijf.", en: "How many apples? — I have five.", note: "partitatief" }
    ],
    tip: "Zeg 'Ik denk er aan' (niet: 'Ik denk aan het'). 'Er + voorzetsel' voor dingen!",
    tipEn: "Say 'Ik denk er aan' (not: 'Ik denk aan het'). Use 'er + preposition' for things!"
  },

  {
    id: "nevenschikkende-vgw", level: "A2", filter: "conjunctie",
    title: "Nevenschikkende voegwoorden", titleEn: "Coordinating conjunctions",
    intro: "Nevenschikkende voegwoorden verbinden twee hoofdzinnen. De woordvolgorde verandert NIET.",
    introEn: "Coordinating conjunctions connect two main clauses. Word order does NOT change.",
    tables: [{
      heading: "Overzicht", headingEn: "Overview",
      cols: ["Conjunction", "English", "Example"],
      rows: [
        ["en", "and", "Ik werk en hij studeert."],
        ["maar", "but", "Het regent, maar ik ga toch."],
        ["of", "or", "Wil jij thee of koffie?"],
        ["want", "because (coord.)", "Ik blijf thuis, want ik ben ziek."],
        ["dus", "so / therefore", "Hij is moe, dus hij gaat slapen."],
        ["toch", "yet / still", "Het is duur, toch koop ik het."],
        ["noch...noch", "neither...nor", "Hij eet noch vlees noch vis."]
      ]
    }],
    rules: [
      { nl: "'Want' is nevenschikkend: geen woordvolgordeverandering na want.", en: "'Want' is coordinating: no word order change after want." },
      { nl: "'Omdat' is onderschikkend: werkwoord naar het einde.", en: "'Omdat' is subordinating: verb to the end." },
      { nl: "Na 'dus' en 'toch' kan inversie plaatsvinden: 'Dus ga ik morgen'.", en: "After 'dus' and 'toch' inversion can occur: 'Dus ga ik morgen'." }
    ],
    examples: [
      { nl: "Ik leer Nederlands want ik woon in Nederland.", en: "I learn Dutch because I live in the Netherlands.", note: "want = geen inversie" },
      { nl: "Ik leer Nederlands omdat ik in Nederland woon.", en: "I learn Dutch because I live in the Netherlands.", note: "omdat = werkwoord einde" },
      { nl: "Hij is moe, maar hij werkt door.", en: "He is tired, but he keeps working.", note: "maar = twee hoofdzinnen" },
      { nl: "Wil je koffie of wil je thee?", en: "Do you want coffee or do you want tea?" },
      { nl: "Het was koud, dus bleef ik thuis.", en: "It was cold, so I stayed home.", note: "dus + inversie" }
    ],
    tip: "Verwar 'want' niet met 'omdat'. Want = twee hoofdzinnen; omdat = bijzin (werkwoord einde).",
    tipEn: "Don't confuse 'want' with 'omdat'. Want = two main clauses; omdat = subordinate clause."
  },

  {
    id: "onderschikkende-vgw-1", level: "A2", filter: "conjunctie",
    title: "Onderschikkende voegwoorden I", titleEn: "Subordinating conjunctions I",
    intro: "Onderschikkende voegwoorden leiden een bijzin in. Het werkwoord staat aan het EINDE van de bijzin.",
    introEn: "Subordinating conjunctions introduce a subordinate clause. The verb goes to the END.",
    tables: [{
      heading: "Meest gebruikte onderschikkende voegwoorden", headingEn: "Most common subordinating conjunctions",
      cols: ["Conjunction", "English", "Example"],
      rows: [
        ["dat", "that", "Ik weet dat hij komt."],
        ["omdat", "because", "Ik studeer omdat ik wil leren."],
        ["als", "if / when (pres.)", "Als het regent, blijf ik thuis."],
        ["toen", "when (past, single)", "Toen ik klein was, speelde ik buiten."],
        ["wanneer", "when / whenever", "Wanneer jij klaar bent, gaan we."],
        ["terwijl", "while / whereas", "Terwijl ik kook, leest hij."],
        ["hoewel", "although", "Hoewel het koud is, ga ik buiten."],
        ["nadat", "after", "Nadat hij gegeten had, ging hij slapen."],
        ["voordat", "before", "Voordat ik ga, bel ik jou."],
        ["zodat", "so that", "Ik oefen zodat ik beter word."]
      ]
    }],
    rules: [
      { nl: "Werkwoord staat ALTIJD aan het einde van de bijzin.", en: "The verb ALWAYS goes to the end of the subordinate clause." },
      { nl: "Als de bijzin vooraan staat, volgt inversie in de hoofdzin.", en: "When the sub. clause comes first, inversion follows in the main clause." },
      { nl: "'Als' = heden/toekomst; 'toen' = verleden (eenmalig); 'wanneer' = heden/toekomst (herhaald).", en: "'Als' = present/future; 'toen' = past (single event); 'wanneer' = present/future (repeated)." }
    ],
    examples: [
      { nl: "Ik weet dat hij morgen komt.", en: "I know that he is coming tomorrow.", note: "dat-zin: werkwoord einde" },
      { nl: "Omdat hij ziek is, werkt hij niet.", en: "Because he is sick, he doesn't work.", note: "bijzin vooraan: inversie hoofdzin" },
      { nl: "Toen ik in Amsterdam woonde, fietste ik elke dag.", en: "When I lived in Amsterdam, I cycled every day." }
    ],
    tip: "Bijzin = SOV (werkwoord achteraan). Let op perfectum: 'dat hij het gedaan heeft'.",
    tipEn: "Sub. clause = SOV (verb last). Note perfect tense: 'dat hij het gedaan heeft'."
  },

  {
    id: "formeel-u", level: "A2", filter: "voornaamwoord",
    title: "Formeel taalgebruik: u", titleEn: "Formal register: u",
    intro: "'U' is de formele aanspreekvorm voor onbekenden, ouderen en in professionele situaties.",
    introEn: "'U' is the formal form of address for strangers, elders and in professional contexts.",
    tables: [{
      heading: "U in verschillende functies", headingEn: "U in different functions",
      cols: ["Function", "Formal (u)", "Informal (jij)"],
      rows: [
        ["Onderwerp", "U werkt hier.", "Jij werkt hier."],
        ["Lijdend voorwerp", "Ik zie u.", "Ik zie jou."],
        ["Bezittelijk", "Uw naam, alstublieft.", "Jouw naam, alsjeblieft."],
        ["Wederkerend", "Vergist u zich?", "Vergis jij je?"],
        ["Beleefde vraag", "Zou u mij kunnen helpen?", "Kun jij mij helpen?"]
      ]
    }],
    rules: [
      { nl: "Gebruik 'u' bij ouderen, onbekenden, klanten en in officieel schriftelijk taalgebruik.", en: "Use 'u' with elderly people, strangers, customers, and in official writing." },
      { nl: "De werkwoordsvorm bij 'u' is dezelfde als bij hij/zij.", en: "The verb form with 'u' is the same as with hij/zij." },
      { nl: "'Alstublieft' (formeel) vs. 'alsjeblieft' (informeel).", en: "'Alstublieft' (formal) vs. 'alsjeblieft' (informal)." }
    ],
    examples: [
      { nl: "Goedemiddag, hoe kan ik u helpen?", en: "Good afternoon, how can I help you?" },
      { nl: "Heeft u uw paspoort bij u?", en: "Do you have your passport with you?" },
      { nl: "Zou u zo vriendelijk willen zijn om te wachten?", en: "Would you be so kind as to wait?" },
      { nl: "Kunt u mij vertellen hoe laat het is?", en: "Can you tell me what time it is?" },
      { nl: "Ik wil u bedanken voor uw hulp.", en: "I want to thank you for your help." }
    ],
    tip: "Twijfel je? Gebruik 'u'. Het is nooit beledigend om formeler te zijn dan nodig.",
    tipEn: "Not sure? Use 'u'. It is never offensive to be more formal than necessary."
  },

  {
    id: 'voorzetsels-a2',
    level: 'A2',
    title: 'Voorzetsels — tijd & vaste combinaties',
    titleEn: 'Prepositions — time & fixed combinations',
    nlExpl: 'Sommige voorzetsels worden altijd gecombineerd met bepaalde werkwoorden of zelfstandige naamwoorden. Dit zijn "vaste combinaties" die je uit je hoofd moet leren.',
    enExpl: 'Some prepositions are always paired with specific verbs or nouns. These are "fixed combinations" that must be memorised.',
    tip: 'Let op: in het Nederlands zeg je "wachten OP", "beginnen MET", "stoppen MET", "denken AAN" — niet letterlijk vertaald vanuit het Engels!',
    tipEn: 'Watch out: in Dutch you say "wait FOR" = wachten OP, "start WITH" = beginnen MET — not translated literally from English!',
    structure: 'Werkwoord + vast voorzetsel + object',
    structureEn: 'Verb + fixed preposition + object',
    table: [
      { slot: 'wachten op',     q: 'wachten OP',     ex: 'Ik wacht OP de bus. · Ze wacht OP een antwoord.' },
      { slot: 'beginnen met',   q: 'beginnen MET',   ex: 'We beginnen MET het huiswerk.' },
      { slot: 'stoppen met',    q: 'stoppen MET',    ex: 'Hij stopt MET roken.' },
      { slot: 'denken aan',     q: 'denken AAN',     ex: 'Ik denk AAN jou. · Ze denkt AAN haar familie.' },
      { slot: 'houden van',     q: 'houden VAN',     ex: 'Ik houd VAN koffie. · Hij houdt VAN haar.' },
      { slot: 'zorgen voor',    q: 'zorgen VOOR',    ex: 'Ze zorgt VOOR de kinderen.' },
      { slot: 'betalen voor',   q: 'betalen VOOR',   ex: 'Ik betaal VOOR het eten.' },
      { slot: 'kijken naar',    q: 'kijken NAAR',    ex: 'We kijken NAAR de film.' },
      { slot: 'luisteren naar', q: 'luisteren NAAR', ex: 'Hij luistert NAAR muziek.' },
      { slot: 'vragen om',      q: 'vragen OM',      ex: 'Ze vraagt OM hulp.' },
      { slot: 'bang zijn voor', q: 'bang voor',      ex: 'Ik ben bang VOOR spinnen.' },
      { slot: 'blij zijn met',  q: 'blij met',       ex: 'Ze is blij MET haar cadeau.' },
    ],
    stype: 'Hoofdzin',
  },

  {
    id: "scheidbare-werkwoorden", level: "A2", filter: "scheidbare-werkwoorden",
    title: "Scheidbare werkwoorden", titleEn: "Separable verbs",
    intro: "Scheidbare werkwoorden bestaan uit een prefix (voorvoegsel) + basiswerkwoord. In een hoofdzin schuift het prefix naar het einde. In een bijzin blijft het werkwoord samen.",
    introEn: "Separable verbs consist of a prefix + base verb. In a main clause the prefix moves to the end. In a subordinate clause the verb stays together.",
    tables: [
      {
        heading: "Veelgebruikte prefixen", headingEn: "Common prefixes",
        cols: ["Prefix", "Werkwoord", "Betekenis / Meaning", "Voorbeeld / Example"],
        rows: [
          ["op-", "opstaan", "to get up", "Ik sta om 7 uur op."],
          ["af-", "afwassen", "to do the dishes", "Hij wast elke avond af."],
          ["aan-", "aankomen", "to arrive", "De trein komt om 9 uur aan."],
          ["uit-", "uitleggen", "to explain", "Ze legt de regel uit."],
          ["mee-", "meenemen", "to take along", "Neem je je jas mee?"],
          ["terug-", "terugkomen", "to come back", "Wij komen morgen terug."],
          ["door-", "doorgaan", "to continue / go on", "Het feest gaat door."],
          ["op-", "opbellen", "to call (phone)", "Bel me straks op!"],
          ["af-", "afspreken", "to make an appointment", "We spreken dinsdag af."],
          ["thuis-", "thuiskomen", "to come home", "Ze komt laat thuis."]
        ]
      },
      {
        heading: "Woordvolgorde in 4 situaties", headingEn: "Word order in 4 situations",
        cols: ["Situation", "Rule", "Example", "English"],
        rows: [
          ["Hoofdzin (OTT/OVT)", "prefix → einde zin", "Ik sta vroeg op.", "I get up early."],
          ["Vraagzin (inversie)", "prefix → einde zin", "Sta jij altijd zo vroeg op?", "Do you always get up so early?"],
          ["Bijzin", "prefix + stam samen aan het einde", "…dat ik vroeg opsta.", "…that I get up early."],
          ["Perfectum (VTT)", "ge- tussen prefix en VD", "Ik ben vroeg opgestaan.", "I got up early."],
          ["Modaal + inf.", "infinitief blijft samen", "Ik wil vroeg opstaan.", "I want to get up early."],
          ["Imperatiefvorm", "prefix → einde", "Sta op! / Neem je jas mee!", "Get up! / Take your coat along!"]
        ]
      },
      {
        heading: "Voltooid deelwoord — ge- tussen prefix en VD", headingEn: "Past participle — ge- between prefix and stem",
        cols: ["Infinitief", "Voltooid deelwoord", "Voorbeeld", "English"],
        rows: [
          ["opstaan", "opgestaan", "Ik ben vroeg opgestaan.", "I got up early."],
          ["afwassen", "afgewassen", "Hij heeft afgewassen.", "He did the dishes."],
          ["meenemen", "meegenomen", "Ze heeft haar boek meegenomen.", "She took her book along."],
          ["opbellen", "opgebeld", "Heb jij haar opgebeld?", "Did you call her?"],
          ["uitleggen", "uitgelegd", "De leraar heeft het uitgelegd.", "The teacher explained it."],
          ["aankomen", "aangekomen", "De bus is aangekomen.", "The bus has arrived."]
        ]
      }
    ],
    rules: [
      { nl: "Hoofdzin: prefix schuift naar het einde van de zin.", en: "Main clause: prefix moves to the end of the sentence." },
      { nl: "Bijzin: werkwoord blijft samen aan het einde (prefix + stam): 'dat hij vroeg opstaat'.", en: "Sub. clause: verb stays together at the end (prefix + stem): 'dat hij vroeg opstaat'." },
      { nl: "Perfectum: ge- wordt ingevoegd tussen prefix en VD: op + ge + staan → opgestaan.", en: "Perfect tense: ge- is inserted between prefix and past participle: op + ge + staan → opgestaan." },
      { nl: "Met modale werkwoorden (willen, kunnen, moeten…): infinitief blijft samen: 'Ik moet vroeg opstaan'.", en: "With modal verbs: the infinitive stays together: 'Ik moet vroeg opstaan'." },
      { nl: "Let op: niet alle werkwoorden met een prefix zijn scheidbaar. 'Begrijpen' en 'bezoeken' zijn NIET scheidbaar.", en: "Note: not all prefixed verbs are separable. 'Begrijpen' and 'bezoeken' are NOT separable." }
    ],
    examples: [
      { nl: "Ik sta elke dag om zeven uur op.", en: "I get up every day at seven o'clock.", note: "hoofdzin — prefix einde" },
      { nl: "Ze weet dat hij altijd laat opstaat.", en: "She knows that he always gets up late.", note: "bijzin — samen aan het einde" },
      { nl: "Hij heeft zijn fiets meegenomen.", en: "He took his bike along.", note: "perfectum — ge- tussen prefix en VD" },
      { nl: "Bel je me straks op?", en: "Will you call me later?", note: "vraagzin — prefix einde" },
      { nl: "Ik wil morgen vroeg opstaan.", en: "I want to get up early tomorrow.", note: "modaal — infinitief samen" },
      { nl: "De trein komt om tien uur aan.", en: "The train arrives at ten o'clock." }
    ],
    tip: "Ezelsbruggetje: in een hoofdzin 'pakt' de prefix zijn koffer en vertrekt naar het einde van de zin. In een bijzin blijft de prefix thuis (bij het werkwoord).",
    tipEn: "Memory trick: in a main clause the prefix 'packs its bags' and moves to the end. In a sub. clause the prefix stays home (attached to the verb)."
  },

  // ══ B1 ══════════════════════════════════════════════════════════════════════

  {
    id: "reflexieve-werkwoorden", level: "A2", filter: "reflexieve-werkwoorden",
    title: "Reflexieve werkwoorden", titleEn: "Reflexive verbs",
    intro: "Reflexieve werkwoorden hebben een wederkerend voornaamwoord (me/mij, je/jou, zich, ons, je/jullie, zich) dat terugverwijst naar het onderwerp.",
    introEn: "Reflexive verbs take a reflexive pronoun (me/mij, je/jou, zich, ons, je/jullie, zich) that refers back to the subject.",
    tables: [{
      heading: "Reflexief voornaamwoord per persoon", headingEn: "Reflexive pronoun per person",
      cols: ["Persoon", "Vnw", "Voorbeeld"],
      rows: [
        ["ik", "me / mij", "Ik was me."],
        ["jij", "je / jou", "Was jij je handen?"],
        ["hij/zij", "zich", "Hij scheert zich elke dag."],
        ["wij", "ons", "Wij vergissen ons weleens."],
        ["jullie", "je / jullie", "Vergissen jullie je vaak?"],
        ["zij", "zich", "Zij voelen zich goed."]
      ]
    }],
    rules: [
      { nl: "Het reflexief vnw staat direct na het vervoegde werkwoord.", en: "The reflexive pronoun comes right after the conjugated verb." },
      { nl: "Veelgebruikte reflexieve werkwoorden: zich voelen, zich vergissen, zich herinneren, zich haasten, zich concentreren, zich verontschuldigen, zich afvragen.", en: "Common reflexive verbs: zich voelen (to feel), zich vergissen (to be mistaken), zich herinneren (to remember), zich haasten (to hurry), zich concentreren (to concentrate), zich verontschuldigen (to apologise), zich afvragen (to wonder)." },
      { nl: "Bij scheidbare + reflexieve werkwoorden komt het vnw vóór het scheidbare deel: 'Ik kleed me om.'", en: "With separable + reflexive verbs, the pronoun comes before the separable part: 'Ik kleed me om.'" },
      { nl: "Niet elk Engels reflexief werkwoord is reflexief in het Nederlands (en andersom): 'to relax' → 'ontspannen' (vaak zonder zich).", en: "Not every English reflexive verb is reflexive in Dutch (and vice versa): 'to relax' → 'ontspannen' (often without zich)." }
    ],
    examples: [
      { nl: "Ik voel me vandaag niet zo lekker.", en: "I don't feel so well today." },
      { nl: "Herinner jij je die dag nog goed?", en: "Do you still remember that day well?" },
      { nl: "Wij moeten ons haasten, de trein vertrekt zo.", en: "We need to hurry, the train leaves soon." }
    ],
    tip: "Twijfel je of een werkwoord reflexief is? Kijk of 'zich/zichzelf' natuurlijk past: 'hij wast zich' klinkt goed, 'hij eet zich' niet.",
    tipEn: "Not sure if a verb is reflexive? Check whether 'zich/zichzelf' fits naturally: 'hij wast zich' sounds right, 'hij eet zich' doesn't."
  },
  {
    id: "toekomende-tijd", level: "A2", filter: "toekomende-tijd",
    title: "Toekomende tijd", titleEn: "Future tense",
    intro: "Nederlands heeft drie manieren om de toekomst uit te drukken: het presens (met tijdsaanduiding), gaan + infinitief, en zullen + infinitief.",
    introEn: "Dutch has three ways to express the future: the present tense (with a time marker), gaan + infinitive, and zullen + infinitive.",
    tables: [{
      heading: "Drie manieren om de toekomst uit te drukken", headingEn: "Three ways to express the future",
      cols: ["Vorm", "Gebruik", "Voorbeeld"],
      rows: [
        ["Presens + tijd", "geplande, zekere dingen", "Morgen ga ik naar Parijs."],
        ["gaan + infinitief", "intentie / plan", "Ik ga volgend jaar studeren."],
        ["zullen + infinitief", "belofte, voorspelling, aanname", "Het zal wel lukken."],
        ["zullen + infinitief", "beleefd aanbod / verzoek", "Zal ik de deur dichtdoen?"]
      ]
    }],
    rules: [
      { nl: "Voor geplande gebeurtenissen met een tijdsaanduiding gebruik je vaak gewoon het presens.", en: "For planned events with a time marker, the simple present is often used." },
      { nl: "'Gaan + infinitief' benadrukt een intentie of voornemen.", en: "'Gaan + infinitive' emphasises an intention or plan." },
      { nl: "'Zullen + infinitief' gebruik je voor voorspellingen, beloftes en beleefde vragen/aanbiedingen.", en: "'Zullen + infinitive' is used for predictions, promises and polite questions/offers." },
      { nl: "'Zullen' wordt in spreektaal vaak vervangen door 'gaan' — 'zullen' klinkt formeler.", en: "'Zullen' is often replaced by 'gaan' in spoken language — 'zullen' sounds more formal." }
    ],
    examples: [
      { nl: "Volgend weekend gaan we naar het strand.", en: "Next weekend we're going to the beach." },
      { nl: "Ik ga een nieuwe taal leren dit jaar.", en: "I am going to learn a new language this year." },
      { nl: "Zal ik je helpen met de tas?", en: "Shall I help you with the bag?" }
    ],
    tip: "Gebruik 'gaan' voor plannen die je al besloten hebt, en 'zullen' voor dingen die je nu pas besluit of belooft.",
    tipEn: "Use 'gaan' for plans you've already decided on, and 'zullen' for things you're deciding or promising right now."
  },
  {
    id: "progressieve-tijd", level: "A2", filter: "progressieve-tijd",
    title: "Bezig zijn: aan het + infinitief", titleEn: "In progress: aan het + infinitive",
    intro: "Om te zeggen dat iets op dit moment gebeurt, gebruik je 'zijn + aan het + infinitief', of 'zitten/staan/liggen + te + infinitief'.",
    introEn: "To say something is happening right now, use 'zijn + aan het + infinitive', or 'zitten/staan/liggen + te + infinitive'.",
    tables: [{
      heading: "Vormen van de progressieve tijd", headingEn: "Forms of the progressive",
      cols: ["Vorm", "Voorbeeld", "English"],
      rows: [
        ["zijn + aan het + inf.", "Ik ben aan het koken.", "I am cooking."],
        ["zitten + te + inf.", "Zij zit te lezen.", "She is (sitting) reading."],
        ["staan + te + inf.", "Hij staat te wachten.", "He is (standing) waiting."],
        ["liggen + te + inf.", "De baby ligt te slapen.", "The baby is (lying) sleeping."]
      ]
    }],
    rules: [
      { nl: "'Aan het + infinitief' kan met elk werkwoord en benadrukt dat iets op dit moment bezig is.", en: "'Aan het + infinitive' works with any verb and emphasises that something is currently in progress." },
      { nl: "'Zitten/staan/liggen + te + infinitief' beschrijft de houding erbij, en wordt alleen gebruikt als die houding logisch is.", en: "'Zitten/staan/liggen + te + infinitive' describes the posture involved, and is only used when that posture makes sense." },
      { nl: "Beide vormen zijn optioneel — het gewone presens kan ook een lopende actie beschrijven.", en: "Both forms are optional — the plain present tense can also describe an ongoing action." }
    ],
    examples: [
      { nl: "Wat ben je aan het doen?", en: "What are you doing (right now)?" },
      { nl: "Hij zit tv te kijken op de bank.", en: "He is sitting on the couch watching TV." },
      { nl: "We zijn het huis aan het schoonmaken.", en: "We are cleaning the house." }
    ],
    tip: "'Aan het' is de veiligste keuze als je niet zeker weet of zitten/staan/liggen logisch is bij dat werkwoord.",
    tipEn: "'Aan het' is the safest choice if you're unsure whether zitten/staan/liggen makes sense with that verb."
  },
  {
    id: "hoeven-te", level: "A2", filter: "hoeven-te",
    title: "Hoeven (niet) te", titleEn: "Hoeven (not) to (need to)",
    intro: "'Hoeven' is het negatieve tegenovergestelde van 'moeten': het beschrijft dat iets NIET verplicht is. Het wordt bijna altijd met 'niet' of 'geen' gebruikt.",
    introEn: "'Hoeven' is the negative counterpart of 'moeten': it describes that something is NOT required. It is almost always used with 'niet' or 'geen'.",
    tables: [{
      heading: "Moeten vs. hoeven niet", headingEn: "Moeten vs. hoeven niet",
      cols: ["Zin", "Betekenis"],
      rows: [
        ["Je moet dit doen.", "This is required."],
        ["Je hoeft dit niet te doen.", "This is not required (but you may)."],
        ["Je mag dit niet doen.", "This is forbidden."]
      ]
    }],
    rules: [
      { nl: "'Hoeven' vraagt altijd 'te + infinitief', net als andere hulpwerkwoorden met 'te'.", en: "'Hoeven' always takes 'te + infinitive', like other 'te'-auxiliary verbs." },
      { nl: "'Hoeven' wordt bijna nooit bevestigend gebruikt — het verschijnt vrijwel altijd met 'niet' of 'geen'.", en: "'Hoeven' is almost never used affirmatively — it appears almost exclusively with 'niet' or 'geen'." },
      { nl: "Vervoeging: ik hoef, jij hoeft, hij/zij hoeft, wij/jullie/zij hoeven.", en: "Conjugation: ik hoef, jij hoeft, hij/zij hoeft, wij/jullie/zij hoeven." }
    ],
    examples: [
      { nl: "Je hoeft niet te wachten, ga maar vast.", en: "You don't have to wait, go ahead." },
      { nl: "Wij hoeven dit weekend niet te werken.", en: "We don't have to work this weekend." },
      { nl: "Je hoeft geen cadeau mee te nemen.", en: "You don't need to bring a gift." }
    ],
    tip: "Verwar 'hoeven niet' (niet verplicht) niet met 'mogen niet' (verboden) — dat is een veelgemaakte fout.",
    tipEn: "Don't confuse 'hoeven niet' (not required) with 'mogen niet' (forbidden) — this is a common mistake."
  },
  {
    id: "gebiedende-wijs", level: "A2", filter: "gebiedende",
    title: "Gebiedende wijs (imperatief)", titleEn: "Imperative mood",
    intro: "De gebiedende wijs (imperatief) gebruik je voor instructies, verzoeken en bevelen. De vorm is meestal gelijk aan de ik-vorm van het werkwoord, zonder onderwerp.",
    introEn: "The imperative is used for instructions, requests and commands. The form is usually the same as the ik-form of the verb, with no subject.",
    tables: [{
      heading: "Gebiedende wijs vormen", headingEn: "Imperative forms",
      cols: ["Infinitief", "Gebiedende wijs", "Voorbeeld"],
      rows: [
        ["komen", "kom", "Kom binnen!"],
        ["gaan", "ga", "Ga zitten."],
        ["opstaan (scheidbaar)", "sta … op", "Sta alsjeblieft op."],
        ["zijn", "wees", "Wees voorzichtig!"],
        ["luisteren", "luister", "Luister goed naar mij."]
      ]
    }],
    rules: [
      { nl: "De gebiedende wijs = stam van het werkwoord (de ik-vorm), zonder onderwerp.", en: "The imperative = the verb stem (the ik-form), with no subject." },
      { nl: "Bij scheidbare werkwoorden schuift het prefix naar het einde, net als in een hoofdzin.", en: "With separable verbs, the prefix moves to the end, just like in a main clause." },
      { nl: "'Zijn' heeft een onregelmatige imperatief: 'wees'.", en: "'Zijn' has an irregular imperative: 'wees'." },
      { nl: "Voor een beleefdere toon voeg je 'alsjeblieft/alstublieft' of 'even' toe.", en: "For a more polite tone, add 'alsjeblieft/alstublieft' or 'even'." }
    ],
    examples: [
      { nl: "Neem een paraplu mee, want het kan regenen.", en: "Take an umbrella, because it might rain." },
      { nl: "Doe de deur dicht, alsjeblieft.", en: "Close the door, please." },
      { nl: "Wees niet zo laat volgende keer.", en: "Don't be so late next time." }
    ],
    tip: "In beleefde context wordt vaak 'kunt u...' of 'wilt u...' gebruikt in plaats van de directe imperatief.",
    tipEn: "In polite contexts, 'kunt u...' or 'wilt u...' is often used instead of the direct imperative."
  },
  {
    id: "omte-infinitief", level: "A2", filter: "omte",
    title: "Om ... te + infinitief", titleEn: "Om ... te + infinitive (purpose)",
    intro: "'Om ... te + infinitief' drukt een doel uit: 'in order to'. Ook veel werkwoorden (proberen, vergeten, hopen) worden gevolgd door 'te + infinitief' zonder 'om'.",
    introEn: "'Om ... te + infinitive' expresses purpose: 'in order to'. Many verbs (proberen, vergeten, hopen) are also followed by 'te + infinitive' without 'om'.",
    tables: [{
      heading: "Om...te vs. gewoon te + infinitief", headingEn: "Om...te vs. plain te + infinitive",
      cols: ["Patroon", "Voorbeeld", "English"],
      rows: [
        ["om ... te (doel)", "Ik leer Nederlands om hier te werken.", "I'm learning Dutch (in order) to work here."],
        ["proberen te", "Ik probeer op tijd te komen.", "I try to arrive on time."],
        ["vergeten te", "Vergeet niet de deur te sluiten.", "Don't forget to close the door."],
        ["hopen te", "Ik hoop je snel te zien.", "I hope to see you soon."]
      ]
    }],
    rules: [
      { nl: "'Om' is verplicht als er echt een doel wordt uitgedrukt ('in order to'); bij andere werkwoorden (proberen, hopen, vergeten) laat je 'om' weg.", en: "'Om' is required when purpose is truly expressed ('in order to'); with other verbs (proberen, hopen, vergeten), 'om' is omitted." },
      { nl: "Bij scheidbare werkwoorden komt 'te' tussen prefix en stam: 'om ... op te staan'.", en: "With separable verbs, 'te' goes between the prefix and stem: 'om ... op te staan'." },
      { nl: "De infinitief staat altijd helemaal aan het einde van de zin.", en: "The infinitive always goes at the very end of the sentence." }
    ],
    examples: [
      { nl: "Zij spaart geld om een huis te kopen.", en: "She is saving money to buy a house." },
      { nl: "Hij belooft om morgen op te bellen.", en: "He promises to call tomorrow." },
      { nl: "Wij zijn hier om te helpen.", en: "We are here to help." }
    ],
    tip: "Test of 'om' nodig is door 'in order to' in te vullen in het Engels — past dat, dan hoort 'om' erbij.",
    tipEn: "Test whether 'om' is needed by inserting 'in order to' in English — if it fits, 'om' belongs there."
  },
  {
    id: "voornaamwoordelijke-bijwoorden", level: "B1", filter: "voornaamwoordelijke-bijwoorden",
    title: "Voornaamwoordelijke bijwoorden", titleEn: "Pronominal adverbs",
    intro: "Voor dingen (niet personen) gebruik je geen voorzetsel + het/dat, maar een samengesteld woord: er/daar/waar + voorzetsel (erover, daarmee, waarvoor).",
    introEn: "For things (not people), you don't use a preposition + het/dat — instead you use a compound word: er/daar/waar + preposition (erover, daarmee, waarvoor).",
    tables: [{
      heading: "Er-, daar- en waar-woorden", headingEn: "Er-, daar- and waar- compounds",
      cols: ["Basis", "+ over", "+ mee", "+ voor"],
      rows: [
        ["er (onbepaald)", "erover", "ermee", "ervoor"],
        ["daar (bepaald/verwijzend)", "daarover", "daarmee", "daarvoor"],
        ["waar (vraag/bijzin)", "waarover", "waarmee", "waarvoor"]
      ]
    }],
    rules: [
      { nl: "Voor personen gebruik je gewoon voorzetsel + persoon: 'met hem', 'over haar'.", en: "For people, you just use preposition + person: 'met hem', 'over haar'." },
      { nl: "Voor dingen gebruik je nooit voorzetsel + het/dat: NIET 'met het', WEL 'ermee' of 'daarmee'.", en: "For things, you never use preposition + het/dat: NOT 'met het', but 'ermee' or 'daarmee'." },
      { nl: "'Er-' is onbepaald/nieuw, 'daar-' verwijst terug naar iets specifieks al genoemd.", en: "'Er-' is indefinite/new, 'daar-' refers back to something specific already mentioned." },
      { nl: "In een bijzin of vraag gebruik je 'waar-': 'Waar denk je aan?', 'het boek waarover we spraken'.", en: "In a question or subordinate clause you use 'waar-': 'Waar denk je aan?', 'het boek waarover we spraken'." }
    ],
    examples: [
      { nl: "Ik heb het gehoord, maar ik geloof er niets van.", en: "I heard it, but I don't believe any of it." },
      { nl: "Dat is een lastig probleem — daar moeten we over praten.", en: "That's a tricky problem — we need to talk about that." },
      { nl: "Waar ben je naar op zoek?", en: "What are you looking for?" }
    ],
    tip: "Denk aan het splitsen bij vraagzinnen: 'waarover' wordt vaak 'waar ... over': 'Waar praten jullie over?'",
    tipEn: "Remember that in questions the compound often splits: 'waarover' becomes 'waar ... over': 'Waar praten jullie over?'"
  },
  {
    id: "betrekkelijke-bijzin-voorzetsel", level: "B1", filter: "betrekkelijke-bijzin-voorzetsel",
    title: "Betrekkelijke bijzin met voorzetsel", titleEn: "Relative clause with a preposition",
    intro: "Als het betrekkelijk voornaamwoord bij een voorzetsel hoort ('met wie', 'waarover'), verandert de constructie: voor personen 'voorzetsel + wie', voor dingen 'waar + voorzetsel'.",
    introEn: "When the relative pronoun belongs with a preposition ('met wie', 'waarover'), the construction changes: for people 'preposition + wie', for things 'waar + preposition'.",
    tables: [{
      heading: "Personen vs. dingen met voorzetsel", headingEn: "People vs. things with a preposition",
      cols: ["Type", "Patroon", "Voorbeeld"],
      rows: [
        ["Persoon", "voorzetsel + wie", "de collega met wie ik werk"],
        ["Ding (samen)", "waar + voorzetsel", "het project waaraan ik werk"],
        ["Ding (gesplitst)", "waar ... voorzetsel", "het project waar ik aan werk"]
      ]
    }],
    rules: [
      { nl: "Voor personen: [voorzetsel] + 'wie' — nooit 'die' na een voorzetsel.", en: "For people: [preposition] + 'wie' — never 'die' after a preposition." },
      { nl: "Voor dingen: 'waar' + voorzetsel vast aan elkaar (waarmee, waarover, waaraan), of gesplitst met het voorzetsel aan het einde.", en: "For things: 'waar' + preposition attached (waarmee, waarover, waaraan), or split with the preposition at the end." },
      { nl: "De gesplitste vorm ('waar ... mee') klinkt informeler en is heel gebruikelijk in spreektaal.", en: "The split form ('waar ... mee') sounds more informal and is very common in spoken Dutch." }
    ],
    examples: [
      { nl: "Dit is de vriend over wie ik je vertelde.", en: "This is the friend I told you about." },
      { nl: "Het huis waarin wij wonen is honderd jaar oud.", en: "The house we live in is a hundred years old." },
      { nl: "Dat is het probleem waar ik me zorgen over maak.", en: "That's the problem I'm worried about." }
    ],
    tip: "Twijfel je tussen 'die' en 'wie'? Gebruik 'wie' zodra er een voorzetsel vlak vóór het betrekkelijk voornaamwoord staat.",
    tipEn: "Not sure between 'die' and 'wie'? Use 'wie' whenever a preposition comes right before the relative pronoun."
  },
  {
    id: "laten-plus-infinitief", level: "B1", filter: "laten-plus-infinitief",
    title: "Laten + infinitief", titleEn: "Laten + infinitive (causative)",
    intro: "'Laten + infinitief' betekent dat je iets door iemand anders laat doen, of iets toestaat. Ook 'zien/horen/voelen + infinitief' werken zo bij waarnemingen.",
    introEn: "'Laten + infinitive' means having something done by someone else, or allowing something. 'Zien/horen/voelen + infinitive' work the same way for perceptions.",
    tables: [{
      heading: "Laten + infinitief patronen", headingEn: "Laten + infinitive patterns",
      cols: ["Patroon", "Voorbeeld", "English"],
      rows: [
        ["laten + inf. (iets laten doen)", "Ik laat mijn auto repareren.", "I'm having my car repaired."],
        ["laten + inf. (toestemming)", "Laat me even denken.", "Let me think for a moment."],
        ["zien + inf.", "Ik zag hem weglopen.", "I saw him walk away."],
        ["horen + inf.", "Wij hoorden de deur dichtslaan.", "We heard the door slam shut."]
      ]
    }],
    rules: [
      { nl: "'Laten' + infinitief (zonder 'te') geeft aan dat iemand anders de handeling uitvoert.", en: "'Laten' + infinitive (without 'te') indicates that someone else performs the action." },
      { nl: "Waarnemingswerkwoorden (zien, horen, voelen) volgen hetzelfde patroon: + infinitief zonder 'te'.", en: "Perception verbs (zien, horen, voelen) follow the same pattern: + infinitive without 'te'." },
      { nl: "In de VTT: 'laten' blijft infinitief als het samen met een ander werkwoord staat: 'Ik heb mijn auto laten repareren.'", en: "In the perfect tense: 'laten' stays infinitive when combined with another verb: 'Ik heb mijn auto laten repareren.'" }
    ],
    examples: [
      { nl: "Zij laat haar haar knippen bij de kapper.", en: "She's getting her hair cut at the hairdresser." },
      { nl: "Laat hem even uitpraten, alsjeblieft.", en: "Let him finish speaking, please." },
      { nl: "Ik heb de kinderen buiten laten spelen.", en: "I let the children play outside." }
    ],
    tip: "'Laten' + infinitief lijkt op het Engelse 'have something done' of 'let someone do something' — geen 'te' ertussen.",
    tipEn: "'Laten' + infinitive resembles English 'have something done' or 'let someone do something' — no 'te' in between."
  },
  {
    id: "woordvorming", level: "B1", filter: "woordvorming",
    title: "Woordvorming: voor- en achtervoegsels", titleEn: "Word formation: prefixes & suffixes",
    intro: "Met een klein aantal voor- en achtervoegsels kun je uit één stam veel nieuwe woorden maken — een krachtige manier om je woordenschat snel te laten groeien.",
    introEn: "With a small set of prefixes and suffixes you can build many new words from a single stem — a powerful way to grow your vocabulary fast.",
    tables: [{
      heading: "Veelgebruikte voor- en achtervoegsels", headingEn: "Common prefixes and suffixes",
      cols: ["Voor-/achtervoegsel", "Betekenis", "Voorbeeld"],
      rows: [
        ["on-", "tegenovergestelde", "gelukkig → ongelukkig"],
        ["her-", "opnieuw", "beginnen → herbeginnen, gebruiken → hergebruiken"],
        ["ver-", "verandering / actie", "groot → vergroten, beter → verbeteren"],
        ["-heid", "zelfstandig nw. van bijv. nw.", "veilig → veiligheid, mogelijk → mogelijkheid"],
        ["-ing", "zelfstandig nw. van werkwoord", "verwarmen → verwarming, oplossen → oplossing"],
        ["-baar", "bijv. nw.: '(niet) mogelijk om te'", "eten → eetbaar, betalen → betaalbaar"]
      ]
    }],
    rules: [
      { nl: "'On-' maakt een bijvoeglijk naamwoord negatief: onhandig, onmogelijk, onbekend.", en: "'On-' negates an adjective: onhandig (clumsy), onmogelijk (impossible), onbekend (unknown)." },
      { nl: "'-heid' en '-ing' maken van een bijvoeglijk naamwoord of werkwoord een zelfstandig naamwoord (altijd 'de').", en: "'-heid' and '-ing' turn an adjective or verb into a noun (always 'de')." },
      { nl: "'-baar' betekent 'kan (niet) ... worden': 'zichtbaar' = kan gezien worden.", en: "'-baar' means 'can(not) be ...': 'zichtbaar' = can be seen." },
      { nl: "Als je een van deze patronen herkent, kun je vaak de betekenis van een onbekend woord raden.", en: "Once you recognise one of these patterns, you can often guess the meaning of an unfamiliar word." }
    ],
    examples: [
      { nl: "Dit probleem is helaas onoplosbaar.", en: "Unfortunately, this problem is unsolvable." },
      { nl: "De veiligheid van de kinderen staat voorop.", en: "The children's safety comes first." },
      { nl: "Zijn uitleg zorgde voor veel verwarring.", en: "His explanation caused a lot of confusion." }
    ],
    tip: "Maak een lijst van woorden die je al kent en zoek de familie erbij: mogelijk → mogelijkheid → onmogelijk → onmogelijkheid.",
    tipEn: "Make a list of words you already know and find their word family: mogelijk → mogelijkheid → onmogelijk → onmogelijkheid."
  },
  {
    id: "lijdende-vorm", level: "B1", filter: "passief",
    title: "Lijdende vorm (passief)", titleEn: "Passive voice",
    intro: "De lijdende vorm verschuift de focus van de uitvoerder naar de actie of het ondergaan van de actie.",
    introEn: "The passive voice shifts focus from the doer to the action or the receiver of the action.",
    tables: [{
      heading: "Vorming van het passief", headingEn: "Forming the passive",
      cols: ["Tense", "Formula", "Example"],
      rows: [
        ["OTT", "worden + voltooid deelwoord", "De brief wordt geschreven."],
        ["OVT", "werd/werden + voltooid deelwoord", "De brief werd gisteren geschreven."],
        ["VTT", "zijn + voltooid deelwoord", "De brief is geschreven."],
        ["TT", "zal worden + vd.", "De brief zal worden geschreven."],
        ["Toestand", "zijn + voltooid deelwoord", "De deur is gesloten. (resultaat)"],
        ["Er-passief", "er + worden + vd.", "Er wordt hier gedanst."]
      ]
    }],
    rules: [
      { nl: "De uitvoerder (agent) wordt uitgedrukt met 'door': 'door Jan geschreven'.", en: "The agent is expressed with 'door': 'geschreven door Jan'." },
      { nl: "VTT-passief gebruikt 'zijn' (niet 'worden'): 'is/zijn + vd.'", en: "Perfect passive uses 'zijn' (not 'worden'): 'is/zijn + past participle'." },
      { nl: "Verschil: 'wordt gebouwd' (actief proces) vs. 'is gebouwd' (resulterende toestand).", en: "Difference: 'wordt gebouwd' (ongoing process) vs. 'is gebouwd' (resulting state)." }
    ],
    examples: [
      { nl: "Het huis wordt gerenoveerd.", en: "The house is being renovated." },
      { nl: "De film werd gemaakt in 1990.", en: "The film was made in 1990." },
      { nl: "Het probleem is opgelost.", en: "The problem has been solved." },
      { nl: "Er wordt hier niet gerookt.", en: "Smoking is not permitted here." }
    ],
    tip: "VTT-passief = 'zijn + vd.' (is geschreven), niet 'is geworden geschreven'.",
    tipEn: "Perfect passive = 'zijn + past participle' (is geschreven), not 'is geworden geschreven'."
  },

  {
    id: "betrekkelijke-bijzin", level: "B1", filter: "woordvolgorde",
    title: "Betrekkelijke bijzinnen: die & dat", titleEn: "Relative clauses: die & dat",
    intro: "Betrekkelijke bijzinnen beschrijven een zelfstandig naamwoord met 'die' of 'dat' als betrekkelijk voornaamwoord.",
    introEn: "Relative clauses describe a noun using 'die' or 'dat' as a relative pronoun.",
    tables: [{
      heading: "Die vs. dat", headingEn: "Die vs. dat",
      cols: ["Use", "Example", "English"],
      rows: [
        ["de-woord (enkv.)", "de man die ik zie", "the man that I see"],
        ["Meervoud (altijd)", "de mensen die komen", "the people who come"],
        ["het-woord (enkv.)", "het boek dat ik lees", "the book that I read"],
        ["na alles/iets/niets", "alles wat ik weet", "everything that I know"],
        ["Voorzetsel + persoon", "de man met wie ik praat", "the man I talk to"],
        ["Voorzetsel + ding", "het boek waarover ik praat", "the book I talk about"]
      ]
    }],
    rules: [
      { nl: "'Die' voor de-woorden en alle meervouden; 'dat' voor het-woorden enkelvoud.", en: "'Die' for de-words and all plurals; 'dat' for singular het-words." },
      { nl: "Na alles, niets, iets, veel, weinig: 'wat' (niet 'dat').", en: "After alles, niets, iets, veel, weinig: 'wat' (not 'dat')." },
      { nl: "Voorzetsel + betrekk. vnw.: 'waar + voorzetsel' voor dingen; 'voorzetsel + wie' voor personen.", en: "Preposition + rel. pronoun: 'waar + prep' for things; 'prep + wie' for persons." }
    ],
    examples: [
      { nl: "De vrouw die daar staat, is mijn moeder.", en: "The woman standing there is my mother." },
      { nl: "Het huis dat wij kopen, is heel oud.", en: "The house we are buying is very old." },
      { nl: "Dat is alles wat ik weet.", en: "That is all I know.", note: "alles + wat" },
      { nl: "De film waarover we praten is geweldig.", en: "The film we're talking about is great.", note: "waar + over" }
    ],
    tip: "Vergeet niet: in de betrekkelijke bijzin staat het werkwoord aan het einde!",
    tipEn: "Don't forget: in the relative clause, the verb goes to the end!"
  },

  {
    id: "indirecte-rede", level: "B1", filter: "woordvolgorde",
    title: "Indirecte rede", titleEn: "Reported speech",
    intro: "De indirecte rede rapporteert wat iemand heeft gezegd zonder directe aanhalingstekens.",
    introEn: "Reported speech reports what someone said without direct quotation marks.",
    tables: [{
      heading: "Vormen van indirecte rede", headingEn: "Forms of reported speech",
      cols: ["Type", "Direct", "Indirect"],
      rows: [
        ["Mededeling<br><em>Statement</em>", "\"Ik werk hier.\"", "Hij zegt dat hij hier werkt."],
        ["Vraag (ja/nee)<br><em>Yes/no question</em>", "\"Kom jij ook?\"", "Hij vraagt of jij ook komt."],
        ["Vraagwoordvraag<br><em>Wh-question</em>", "\"Waar woon jij?\"", "Hij vraagt waar jij woont."],
        ["Opdracht<br><em>Command</em>", "\"Kom hier!\"", "Hij zegt dat ik moet komen."],
        ["Tijdsverschuiving<br><em>Tense shift</em>", "\"Ik heb het gedaan.\"", "Hij zei dat hij het gedaan had."]
      ]
    }],
    rules: [
      { nl: "Gebruik 'dat' voor mededelingen, 'of' voor ja/nee-vragen, vraagwoord voor vraagwoordvragen.", en: "Use 'dat' for statements, 'of' for yes/no questions, question word for wh-questions." },
      { nl: "Werkwoord gaat naar het einde van de bijzin.", en: "Verb goes to the end of the subordinate clause." },
      { nl: "Formeel: tijdsverschuiving naar het verleden. Informeel: geen tijdsverschuiving nodig.", en: "Formal: tense shifts to past. Informal: no tense shift required." }
    ],
    examples: [
      { nl: "Ze zegt dat ze morgen komt.", en: "She says she is coming tomorrow." },
      { nl: "Hij vraagt of ik Nederlands spreek.", en: "He asks if I speak Dutch." },
      { nl: "De docent vroeg waar wij woonden.", en: "The teacher asked where we lived.", note: "formeel: tijdsverschuiving" }
    ],
    tip: "Informeel Nederlands: 'Hij zei dat hij ziek IS' (geen tijdsverschuiving).",
    tipEn: "Informal Dutch: 'Hij zei dat hij ziek IS' — no tense shift needed."
  },

  {
    id: "voorwaardelijke-wijs", level: "B1", filter: "overig",
    title: "Voorwaardelijke wijs", titleEn: "Conditional mood",
    intro: "De voorwaardelijke wijs (zou/zouden) drukt hypothetische situaties en beleefde verzoeken uit.",
    introEn: "The conditional (zou/zouden) expresses hypothetical situations and polite requests.",
    tables: [{
      heading: "Typen voorwaarden", headingEn: "Types of conditionals",
      cols: ["Type", "If-clause", "Then-clause", "English"],
      rows: [
        ["Reeel (mogelijk)", "Als het regent,", "blijf ik thuis.", "If it rains, I'll stay home."],
        ["Irreeel heden", "Als ik rijk was,", "zou ik reizen.", "If I were rich, I would travel."],
        ["Beleefd verzoek", "—", "Zou u mij helpen?", "Would you help me?"],
        ["Wens", "—", "Ik zou graag koffie willen.", "I would like coffee."]
      ]
    }],
    rules: [
      { nl: "Reeel: 'als + OTT, dan + OTT/TT': Als ik tijd heb, ga ik.", en: "Real: 'als + present, dan + present/future'." },
      { nl: "Irreeel heden: 'als + OVT, dan + zou + infinitief': Als ik rijk was, zou ik reizen.", en: "Unreal present: 'als + past, dan + zou + infinitive'." },
      { nl: "'Zou + infinitief' = beleefd verzoek of hypothetisch plan.", en: "'Zou + infinitive' = polite request or hypothetical plan." }
    ],
    examples: [
      { nl: "Als ik meer tijd had, zou ik meer lezen.", en: "If I had more time, I would read more." },
      { nl: "Zou jij mij kunnen helpen?", en: "Could you help me? (polite)" },
      { nl: "Ik zou graag een kop koffie willen.", en: "I would like a cup of coffee." }
    ],
    tip: "Gebruik 'zou' voor beleefd vragen: 'Zou u...?' klinkt vriendelijker dan 'Kunt u...?'",
    tipEn: "Use 'zou' for polite questions: 'Zou u...?' sounds friendlier than 'Kunt u...?'"
  },

  {
    id: "onderschikkende-vgw-2", level: "B1", filter: "conjunctie",
    title: "Onderschikkende voegwoorden II", titleEn: "Subordinating conjunctions II",
    intro: "Gevorderde onderschikkende voegwoorden voor tegenstelling, gevolg, voorwaarde en tijdsbepaling.",
    introEn: "Advanced subordinating conjunctions for contrast, consequence, condition and time.",
    tables: [{
      heading: "Gevorderde voegwoorden", headingEn: "Advanced conjunctions",
      cols: ["Conjunction", "English", "Example"],
      rows: [
        ["hoewel / ofschoon", "although", "Hoewel het moeilijk is, geef ik niet op."],
        ["tenzij", "unless", "Ik ga, tenzij het regent."],
        ["zodat", "so that", "Ik oefen zodat ik beter word."],
        ["waardoor", "as a result of which", "Hij studeerde hard, waardoor hij slaagde."],
        ["zodra", "as soon as", "Zodra ik klaar ben, bel ik je."],
        ["zolang", "as long as", "Zolang jij hier bent, ben ik blij."],
        ["alsof", "as if", "Hij doet alsof hij slaapt."],
        ["mits", "provided that", "Ik help je, mits je het probeert."],
        ["aangezien", "since / given that", "Aangezien hij ziek is, blijft hij thuis."]
      ]
    }],
    rules: [
      { nl: "Al deze voegwoorden zijn onderschikkend: werkwoord naar het einde.", en: "All these conjunctions are subordinating: verb to the end." },
      { nl: "'Waardoor' verwijst terug naar de voorgaande zin als gevolg.", en: "'Waardoor' refers back to the preceding clause as a consequence." },
      { nl: "'Alsof' + OVT voor irreele vergelijking: 'hij doet alsof hij het wist'.", en: "'Alsof' + past tense for unreal comparison." }
    ],
    examples: [
      { nl: "Hoewel ik moe was, maakte ik de oefening af.", en: "Although I was tired, I finished the exercise." },
      { nl: "Ik ga zwemmen, tenzij het te koud is.", en: "I will go swimming unless it's too cold." },
      { nl: "Hij deed alsof hij niets wist.", en: "He acted as if he knew nothing." }
    ],
    tip: "'Hoewel' en 'ofschoon' zijn synoniemen; 'hoewel' is gebruikelijker in gesproken taal.",
    tipEn: "'Hoewel' and 'ofschoon' are synonyms; 'hoewel' is more common in spoken language."
  },

  {
    id: "woordvolgorde-gevorderd", level: "B1", filter: "woordvolgorde",
    title: "Woordvolgorde gevorderd", titleEn: "Advanced word order",
    intro: "Gevorderde woordvolgorderegels voor scheidbare werkwoorden, infinitief-constructies en dubbele infinitieven.",
    introEn: "Advanced word order rules for separable verbs, infinitive constructions and double infinitives.",
    tables: [{
      heading: "Werkwoordsvolgorde in bijzinnen", headingEn: "Verb order in subordinate clauses",
      cols: ["Case", "Main clause", "Subordinate clause"],
      rows: [
        ["Scheidbaar ww.<br><em>Separable verb</em>", "Ik sta vroeg op.", "...dat ik vroeg opsta."],
        ["Hulpww. + inf.<br><em>Modal + infinitive</em>", "Ik kan het doen.", "...dat ik het kan doen."],
        ["Perf. met modaal<br><em>Perfect with modal</em>", "Hij heeft kunnen komen.", "...dat hij heeft kunnen komen."],
        ["Passief<br><em>Passive</em>", "Het wordt gemaakt.", "...dat het gemaakt wordt."],
        ["Te + infinitief<br><em>Te + infinitive</em>", "Ik probeer te lezen.", "...dat ik probeer te lezen."]
      ]
    }],
    rules: [
      { nl: "In bijzin: scheidbaar werkwoord blijft samen aan het einde (opstaan → opsta).", en: "In sub. clause: separable verb stays together at the end." },
      { nl: "Dubbele infinitief: hulpwerkwoord staat NA de infinitieven: 'heeft kunnen komen'.", en: "Double infinitive: auxiliary comes AFTER the infinitives." },
      { nl: "'Om...te + infinitief' drukt doel uit: 'Ik studeer om te leren'.", en: "'Om...te + infinitive' expresses purpose." }
    ],
    examples: [
      { nl: "Ik weet dat hij morgen vroeg opstaat.", en: "I know that he gets up early tomorrow.", note: "opstaan → opsta (bijzin)" },
      { nl: "Hij had het kunnen doen.", en: "He could have done it.", note: "dubbele infinitief" },
      { nl: "Ze gaat naar de bibliotheek om boeken te lenen.", en: "She goes to the library to borrow books." }
    ],
    tip: "In bijzin: VD staat VOOR het hulpwerkwoord: 'dat hij het gedaan heeft' (niet: heeft gedaan).",
    tipEn: "In sub. clause: past participle comes BEFORE the auxiliary: 'dat hij het gedaan heeft'."
  },

  // ══ B2 ══════════════════════════════════════════════════════════════════════

  {
    id: "hoe-hoe-vergelijking", level: "B2", filter: "hoe-hoe-vergelijking",
    title: "Hoe ... hoe ... (evenredige vergelijking)", titleEn: "Hoe ... hoe ... (proportional comparison)",
    intro: "'Hoe ... hoe ...' + comparatief drukt uit dat twee dingen samen veranderen: 'the more ... the more ...'. Beide delen hebben inversie (werkwoord vóór onderwerp).",
    introEn: "'Hoe ... hoe ...' + comparative expresses that two things change together: 'the more ... the more ...'. Both parts have inversion (verb before subject).",
    tables: [{
      heading: "Hoe...hoe...-constructie", headingEn: "Hoe...hoe... construction",
      cols: ["Patroon", "Voorbeeld", "English"],
      rows: [
        ["Hoe + comp., hoe + comp.", "Hoe meer je oefent, hoe beter je wordt.", "The more you practise, the better you get."],
        ["Hoe + comp., des te + comp.", "Hoe later het is, des te stiller de stad.", "The later it is, the quieter the city."]
      ]
    }],
    rules: [
      { nl: "Beide delen van de zin hebben inversie: comparatief → werkwoord → onderwerp.", en: "Both parts of the sentence have inversion: comparative → verb → subject." },
      { nl: "'Des te' is een formeler alternatief voor het tweede 'hoe'.", en: "'Des te' is a more formal alternative for the second 'hoe'." },
      { nl: "Deze constructie werkt alleen met vergelijkbare (gradeerbare) bijvoeglijke naamwoorden of bijwoorden.", en: "This construction only works with comparable (gradable) adjectives or adverbs." }
    ],
    examples: [
      { nl: "Hoe langer ik hier woon, hoe meer ik ervan hou.", en: "The longer I live here, the more I love it." },
      { nl: "Hoe drukker het is, des te zenuwachtiger ik word.", en: "The busier it is, the more nervous I get." },
      { nl: "Hoe eerder je begint, hoe minder stress je hebt.", en: "The earlier you start, the less stress you have." }
    ],
    tip: "Let op de woordvolgorde: na 'hoe' komt eerst de vergelijkende vorm, dan pas het werkwoord — nooit andersom.",
    tipEn: "Watch the word order: after 'hoe' the comparative form comes first, then the verb — never the other way around."
  },
  {
    id: "deelwoord-als-bijvoeglijk", level: "B2", filter: "deelwoord-als-bijvoeglijk",
    title: "Deelwoord als bijvoeglijk naamwoord", titleEn: "Participle used as an adjective",
    intro: "Voltooide deelwoorden (gebakken, gebroken) en tegenwoordige deelwoorden (kokend, groeiend) kunnen als bijvoeglijk naamwoord voor een zelfstandig naamwoord staan.",
    introEn: "Past participles (gebakken, gebroken) and present participles (kokend, groeiend) can be used as adjectives before a noun.",
    tables: [{
      heading: "Deelwoord + zelfstandig naamwoord", headingEn: "Participle + noun",
      cols: ["Type", "Deelwoord", "Voorbeeld"],
      rows: [
        ["Voltooid deelwoord (passief/afgerond)", "gebakken, gebroken, geschreven", "de gebakken vis, een gebroken been"],
        ["Tegenwoordig deelwoord (+ -end, actief/lopend)", "kokend, groeiend, blaffend", "kokend water, een blaffende hond"]
      ]
    }],
    rules: [
      { nl: "Het voltooid deelwoord als bijvoeglijk naamwoord beschrijft iets dat de handeling heeft ondergaan (passief perspectief).", en: "The past participle as an adjective describes something that underwent the action (passive perspective)." },
      { nl: "Het tegenwoordig deelwoord (infinitief + -d/-de) beschrijft iets dat actief bezig is (actief perspectief).", en: "The present participle (infinitive + -d/-de) describes something actively doing the action (active perspective)." },
      { nl: "Zoals elk bijvoeglijk naamwoord krijgt het deelwoord -e voor de-woorden en meervoud, geen -e voor onbepaald het-woord.", en: "Like any adjective, the participle takes -e before de-words and plurals, no -e before an indefinite het-word." }
    ],
    examples: [
      { nl: "Pas op, het water is nog kokend heet.", en: "Careful, the water is still boiling hot." },
      { nl: "De gebroken vaas lag op de grond.", en: "The broken vase lay on the floor." },
      { nl: "Een groeiend aantal mensen werkt vanuit huis.", en: "A growing number of people work from home." }
    ],
    tip: "Twijfel tussen voltooid en tegenwoordig deelwoord? Vraag: 'ondergaat het de actie (voltooid) of doet het de actie (tegenwoordig)?'",
    tipEn: "Unsure between past and present participle? Ask: 'does it undergo the action (past) or perform the action (present)?'"
  },
  {
    id: "iets-niets-plus-s", level: "B2", filter: "iets-niets-plus-s",
    title: "Iets/niets/wat + bijvoeglijk naamwoord + -s", titleEn: "Iets/niets/wat + adjective + -s",
    intro: "Na onbepaalde voornaamwoorden zoals iets, niets, wat, veel en genoeg krijgt een volgend bijvoeglijk naamwoord een extra -s.",
    introEn: "After indefinite pronouns like iets, niets, wat, veel and genoeg, a following adjective gets an extra -s.",
    tables: [{
      heading: "Patroon: onbepaald vnw + bijv. nw. + -s", headingEn: "Pattern: indefinite pronoun + adjective + -s",
      cols: ["Onbepaald vnw", "+ bijvoeglijk naamwoord", "Voorbeeld"],
      rows: [
        ["iets", "+ -s", "iets leuks, iets lekkers"],
        ["niets", "+ -s", "niets bijzonders"],
        ["wat", "+ -s", "wat moois"],
        ["veel / genoeg", "+ -s", "veel interessants, genoeg lekkers"]
      ]
    }],
    rules: [
      { nl: "Deze -s verschijnt alleen na de onbepaalde voornaamwoorden iets, niets, wat, veel, genoeg, weinig — niet elders.", en: "This -s only appears after the indefinite pronouns iets, niets, wat, veel, genoeg, weinig — nowhere else." },
      { nl: "Het bijvoeglijk naamwoord blijft verder ongewijzigd behalve deze -s: leuk → leuks, mooi → moois.", en: "The adjective otherwise stays unchanged apart from this -s: leuk → leuks, mooi → moois." },
      { nl: "Dit patroon heeft niets te maken met de normale -e regel bij bijvoeglijke naamwoorden.", en: "This pattern has nothing to do with the normal -e rule for adjectives." }
    ],
    examples: [
      { nl: "Heb je iets leuks gedaan dit weekend?", en: "Did you do anything fun this weekend?" },
      { nl: "Er stond niets interessants in de krant.", en: "There was nothing interesting in the newspaper." },
      { nl: "Ik heb wat lekkers meegenomen voor bij de koffie.", en: "I brought something tasty for with the coffee." }
    ],
    tip: "Deze -s is een van de kleinste maar meest voorkomende foutjes bij gevorderde leerders — let er extra op na iets/niets/wat.",
    tipEn: "This -s is one of the smallest but most common mistakes for advanced learners — pay extra attention after iets/niets/wat."
  },
  {
    id: "voltooide-voorwaardelijke", level: "B2", filter: "overig",
    title: "Voltooide voorwaardelijke wijs", titleEn: "Perfect conditional",
    intro: "De voltooide voorwaardelijke wijs beschrijft hypothetische situaties in het verleden die niet zijn uitgekomen.",
    introEn: "The perfect conditional describes hypothetical past situations that did not happen.",
    tables: [{
      heading: "Formule en gebruik", headingEn: "Formula and use",
      cols: ["Situation", "If-clause (past perfect)", "Then-clause"],
      rows: [
        ["Irreeel verleden<br><em>Unreal past</em>", "Als hij eerder was gekomen,", "had ik hem gezien."],
        ["Alternatief zou-vorm<br><em>Alternative zou form</em>", "Als hij eerder was gekomen,", "zou ik hem gezien hebben."],
        ["Spijt uitdrukken<br><em>Expressing regret</em>", "Als ik harder had gewerkt,", "was ik geslaagd."],
        ["Formeel zonder als<br><em>Formal, without 'als'</em>", "Had hij gebeld,", "dan had ik geantwoord."]
      ]
    }],
    rules: [
      { nl: "Als-zin: VVT (had/was + vd.); dan-zin: had/was + vd. of zou + hebben/zijn + vd.", en: "If-clause: pluperfect; then-clause: pluperfect OR zou + hebben/zijn + pp." },
      { nl: "Formeel: omit 'als' en gebruik inversie: 'Had hij gebeld, dan...'", en: "Formal: omit 'als' and use inversion: 'Had hij gebeld, dan...'" }
    ],
    examples: [
      { nl: "Als ik dat had geweten, had ik het anders gedaan.", en: "If I had known that, I would have done it differently." },
      { nl: "Als ze op tijd was vertrokken, had ze de trein gehaald.", en: "If she had left on time, she would have caught the train." },
      { nl: "Had hij harder gestudeerd, dan was hij geslaagd.", en: "Had he studied harder, he would have passed. (formal)" }
    ],
    tip: "Beide zinsdelen gebruiken VVT. Zorg dat je geen OVT met VVT vermengt.",
    tipEn: "Both clauses use pluperfect. Make sure you don't mix OVT with VVT."
  },

  {
    id: "gevorderd-passief", level: "B2", filter: "passief",
    title: "Gevorderd passief", titleEn: "Advanced passive",
    intro: "Gevorderd gebruik van het passief, inclusief modale werkwoorden, het er-passief en het krijgen-passief.",
    introEn: "Advanced passive constructions including modals, impersonal passive and the krijgen-passive.",
    tables: [{
      heading: "Gevorderde passief-constructies", headingEn: "Advanced passive constructions",
      cols: ["Construction", "Example", "English"],
      rows: [
        ["Modaal + passief", "Het moet worden gedaan.", "It must be done."],
        ["Er-passief (unpersoonlijk)", "Er wordt hier niet gerookt.", "Smoking is not allowed here."],
        ["Worden (actie)", "Het raam wordt gesloten.", "The window is being closed."],
        ["Zijn (toestand)", "Het raam is gesloten.", "The window is closed."],
        ["Krijgen-passief", "Hij krijgt een prijs toegekend.", "He is awarded a prize."],
        ["Passief in bijzin", "...dat het gemaakt wordt.", "...that it is being made."]
      ]
    }],
    rules: [
      { nl: "'Worden + vd.' = proces; 'zijn + vd.' = toestand/resultaat.", en: "'Worden + pp' = process; 'zijn + pp' = state/result." },
      { nl: "Met modalen: modaal + worden + vd.: 'moet worden gedaan', 'kan worden opgelost'.", en: "With modals: modal + worden + pp." },
      { nl: "'Krijgen-passief' bij indirect object: 'Ze krijgt de opdracht gegeven'.", en: "'Krijgen-passive' with indirect object." }
    ],
    examples: [
      { nl: "Dit moet worden onderzocht.", en: "This must be investigated." },
      { nl: "Er wordt beweerd dat hij schuldig is.", en: "It is claimed that he is guilty." },
      { nl: "Ze kreeg een medaille uitgereikt.", en: "She was presented with a medal." }
    ],
    tip: "Het 'er-passief' is handig als er geen duidelijk onderwerp is: 'Er wordt gezongen'.",
    tipEn: "The 'er-passive' is useful when there is no clear subject: 'Er wordt gezongen'."
  },

  {
    id: "partitief", level: "B2", filter: "overig",
    title: "Onbepaald gebruik & partitief", titleEn: "Partitive constructions",
    intro: "Partitieve constructies beschrijven onbepaalde hoeveelheden en bijvoeglijk gebruik zonder lidwoord.",
    introEn: "Partitive constructions describe indefinite quantities and adjectival use without articles.",
    tables: [
      {
        heading: "Partitief bijvoeglijk naamwoord", headingEn: "Partitive adjective",
        cols: ["Construction", "Example", "English"],
        rows: [
          ["iets + adj. + -s", "iets moois", "something beautiful"],
          ["niets + adj. + -s", "niets nieuws", "nothing new"],
          ["wat + adj. + -s", "wat lekkers", "something tasty"],
          ["veel + adj. + -s", "veel leuks", "lots of fun things"],
          ["weinig + adj. + -s", "weinig interessants", "little of interest"]
        ]
      },
      {
        heading: "Partitieve genitief", headingEn: "Partitive genitive",
        cols: ["Construction", "Example", "English"],
        rows: [
          ["Maat + van", "een glas water", "a glass of water"],
          ["Soort/type", "een soort probleem", "a kind of problem"],
          ["Deel van geheel", "een stuk taart", "a piece of cake"]
        ]
      }
    ],
    rules: [
      { nl: "Na iets/niets/wat/veel/weinig: bijv.nw. krijgt uitgang -s (iets moois).", en: "After iets/niets/wat/veel/weinig: adjective gets -s ending." },
      { nl: "Geen lidwoord voor stoffen en abstracte zaken: 'hij drinkt koffie', 'ze heeft geduld'.", en: "No article for substances and abstract concepts." }
    ],
    examples: [
      { nl: "Heb jij iets leuks gedaan dit weekend?", en: "Did you do something fun this weekend?" },
      { nl: "Er is niets bijzonders aan de hand.", en: "There is nothing special going on." },
      { nl: "Ik wil wat warms drinken.", en: "I want to drink something warm." }
    ],
    tip: "Iets + bijvoeglijk naamwoord + -s: 'iets moois', 'iets lekkers'. De -s is verplicht!",
    tipEn: "Iets + adjective + -s: 'iets moois', 'iets lekkers'. The -s ending is required!"
  },

  {
    id: "formeel-zakelijk", level: "B2", filter: "overig",
    title: "Formeel & zakelijk taalgebruik", titleEn: "Formal and professional register",
    intro: "Formeel zakelijk Nederlands gebruikt specifieke constructies en woordenschat voor professionele teksten.",
    introEn: "Formal professional Dutch uses specific constructions and vocabulary found in professional texts.",
    tables: [{
      heading: "Formele equivalenten", headingEn: "Formal equivalents",
      cols: ["Formal", "Informal equivalent", "English"],
      rows: [
        ["teneinde (+ te-inf.)", "om te", "in order to"],
        ["aangezien", "omdat", "since / given that"],
        ["dientengevolge", "daarom / dus", "consequently"],
        ["met betrekking tot", "over", "regarding"],
        ["ten aanzien van", "wat betreft", "with respect to"],
        ["alsmede", "en ook", "as well as"],
        ["derhalve", "dus", "therefore"],
        ["hetgeen", "wat", "which / that which"]
      ]
    }],
    rules: [
      { nl: "Nominalisatie: werkwoorden omzetten naar zelfstandige naamwoorden: ondertekenen → de ondertekening.", en: "Nominalisation: convert verbs to nouns: ondertekenen → de ondertekening." },
      { nl: "Passief is gebruikelijker in formeel schriftelijk taalgebruik.", en: "Passive voice is more common in formal written language." },
      { nl: "Lange zinnen met meerdere bijzinnen zijn normaal in formele teksten.", en: "Long sentences with multiple subordinate clauses are normal in formal texts." }
    ],
    examples: [
      { nl: "Teneinde de vergadering efficiënt te laten verlopen, verzoeken wij u tijdig aanwezig te zijn.", en: "In order for the meeting to run efficiently, we request you to be present on time." },
      { nl: "Met betrekking tot uw aanvraag van 15 maart...", en: "Regarding your application of 15 March..." },
      { nl: "Dientengevolge zal het project worden uitgesteld.", en: "Consequently the project will be postponed." }
    ],
    tip: "Oefen met formele e-mails en kranten om zakelijk taalgebruik te internaliseren.",
    tipEn: "Practise with formal emails and newspapers to internalise professional language use."
  },

  {
    id: "idioom", level: "B2", filter: "overig",
    title: "Veelgebruikte uitdrukkingen & idioom", titleEn: "Common idioms & expressions",
    intro: "Nederlandse uitdrukkingen die je letterlijk niet kunt vertalen maar wel moet kennen.",
    introEn: "Dutch expressions that cannot be translated literally but are essential to know.",
    tables: [{
      heading: "Veelgebruikte uitdrukkingen", headingEn: "Common expressions",
      cols: ["Expression", "Literally", "Meaning / English"],
      rows: [
        ["Dat klopt.", "That hits.", "That is correct."],
        ["Het valt mee.", "It falls along.", "It is not as bad as expected."],
        ["Het valt tegen.", "It falls against.", "It is worse than expected."],
        ["Dat scheelt.", "That differs.", "That makes a difference."],
        ["Ergens zin in hebben.", "Have taste in something.", "To feel like doing something."],
        ["Het doet er niet toe.", "It does not to it.", "It doesn't matter."],
        ["Voor de hand liggend.", "Lying before the hand.", "Obvious."],
        ["De kat uit de boom kijken.", "Watch the cat from the tree.", "Wait and see."],
        ["Door de mand vallen.", "Fall through the basket.", "Get caught / be exposed."],
        ["Op de hoogte zijn.", "Be on the height.", "To be informed."],
        ["Van pas komen.", "Come of pace.", "To come in handy."],
        ["Aan de slag gaan.", "Go to the blow.", "To get to work."],
        ["Er niet omheen kunnen.", "Can't go around it.", "Cannot avoid it."],
        ["Iemand op zijn plek zetten.", "Put someone in their place.", "To put someone in their place."],
        ["Een koekje van eigen deeg.", "A cookie of own dough.", "A taste of their own medicine."]
      ]
    }],
    rules: [
      { nl: "Idiomatische uitdrukkingen kun je niet woord voor woord vertalen.", en: "Idiomatic expressions cannot be translated word for word." },
      { nl: "Leer uitdrukkingen in context en koppel ze aan concrete situaties.", en: "Learn expressions in context and link them to concrete situations." }
    ],
    examples: [
      { nl: "Ik heb eigenlijk geen zin in huiswerk vanavond.", en: "I don't really feel like doing homework tonight." },
      { nl: "Het examen viel heel erg mee!", en: "The exam was much easier than expected!" },
      { nl: "Laten we aan de slag gaan, we hebben niet veel tijd.", en: "Let's get to work, we don't have much time." }
    ],
    tip: "Gebruik uitdrukkingen pas als je ze goed begrijpt. Onjuist gebruik klinkt vreemd.",
    tipEn: "Only use expressions once you understand them well. Incorrect use sounds odd."
  }
];

// ─── LESSON PLAN ──────────────────────────────────────────────────────────────
const lessonPlanData = {
  title: "Leerplan Nederlands A1–B2",
  titleEn: "Dutch Study Plan A1–B2",
  intro: "Een intensief leerplan: 15 weken naar B1 (1 unit per week), daarna 11 weken naar B2 (2 weken per unit). Elke unit is opgebouwd rond één thema, met werkwoorden, grammatica, woordenschat en leesteksten die dat thema samen ondersteunen.",
  introEn: "An intensive study plan: 15 weeks to B1 (1 unit per week), then 11 weeks to B2 (2 weeks per unit). Each unit is built around one theme, with verbs, grammar, vocabulary and reading texts that all reinforce it together.",
  levels: [
    {
      level: "A1", title: "Beginner", duration: "4 weken", durationEn: "4 weeks", color: "#276047",
      units: [
        {
          unit: 1, title: "Hallo! Jezelf voorstellen", titleEn: "Hello! Introducing yourself", weeks: "Week 1",
          grammarTopics: ["persoonlijke-vnw", "vraagwoorden", "telwoorden"],
          verbRange: [0, 40],
          verbFocus: ["zijn","kunnen","mogen","komen","vliegen","stijgen","klimmen","rennen","vinden","spreken","liegen","begrijpen"],
          vocabTopics: [{level:"A1",topic:"begroeting"},{level:"A1",topic:"familie"},{level:"A1",topic:"vraagwoorden"}],
          sentenceFilter: "vraagzin",
          readingTexts: ['r-a1-001', 'r-a1-002'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer persoonlijke voornaamwoorden (ik, jij, hij, zij, wij, jullie, zij) en vraagwoorden (wie, wat, waar, wanneer, hoe).", descEn: "Day 1–2: Study personal pronouns (ik, jij, hij, zij, wij, jullie, zij) and question words (wie, wat, waar, wanneer, hoe)." },
            { type: "grammatica", desc: "Dag 2–3: Oefen telwoorden 1–100.", descEn: "Day 2–3: Practise numbers 1–100." },
            { type: "werkwoorden", desc: "Dag 1–4: Oefen zijn & kunnen in OTT via de conjugatietool. Voeg elke dag 2 nieuwe werkwoorden toe.", descEn: "Day 1–4: Practise zijn & kunnen in OTT via the conjugation tool. Add 2 new verbs each day." },
            { type: "zinnen", desc: "Dag 3–5: Oefen A1-vraagzinnen: stel jezelf voor, vraag naar naam, leeftijd en woonplaats.", descEn: "Day 3–5: Practise A1 question sentences: introduce yourself, ask about name, age and place of residence." },
            { type: "woordenschat", desc: "Dag 5–7: Leer begroetings- en familiewoorden. Gebruik de woordenschatlijst en test jezelf.", descEn: "Day 5–7: Learn greetings and family words. Use the vocabulary list and test yourself." },
            { type: "dehet", desc: "Dag 6–7: Train de/het met de De/Het oefentool — doel: 20 woorden correct.", descEn: "Day 6–7: Train de/het with the De/Het exercise tool — goal: 20 words correct." }
          ],
          goals: ["Jezelf voorstellen: naam, leeftijd, land en taal.", "10 vraagwoorden kennen en gebruiken in zinnen.", "Tellen tot 100 en getallen herkennen.", "De teksten 'Hallo, ik ben Anna' en 'Mijn familie' begrijpen."],
          goalsEn: ["Introduce yourself: name, age, country and language.", "Know 10 question words and use them in sentences.", "Count to 100 and recognise numbers.", "Understand the texts 'Hallo, ik ben Anna' and 'Mijn familie'."]
        },
        {
          unit: 2, title: "Thuis & eten", titleEn: "Home & food", weeks: "Week 2",
          grammarTopics: ["lidwoorden-meervoud", "verkleinwoorden"],
          verbRange: [41, 81],
          verbFocus: ["nemen","laten","staan","slaan","zoeken","kiezen","eten","zingen","bijten","steken","vouwen","gieten"],
          vocabTopics: [{level:"A1",topic:"eten"},{level:"A1",topic:"huis"},{level:"A1",topic:"kleuren"}],
          sentenceFilter: "all",
          readingTexts: ['r-a1-003', 'r-a1-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer lidwoorden (de/het) en meervoudsvormen (-en, -s, -eren).", descEn: "Day 1–2: Study articles (de/het) and plural forms (-en, -s, -eren)." },
            { type: "grammatica", desc: "Dag 3–4: Leer verkleinwoorden (-je, -tje, -pje, -etje).", descEn: "Day 3–4: Learn diminutives (-je, -tje, -pje, -etje)." },
            { type: "werkwoorden", desc: "Dag 1–5: Oefen 10 huishoudelijke werkwoorden in OTT: typ zelf de vervoegingen.", descEn: "Day 1–5: Practise 10 household verbs in OTT: type the conjugations yourself." },
            { type: "dehet", desc: "Dag 3–5: Train de/het voor huis- en eetwoorden (30 nieuwe woorden).", descEn: "Day 3–5: Train de/het for house and food words (30 new words)." },
            { type: "zinnen", desc: "Dag 4–6: Oefen zinnen over eten en het huis.", descEn: "Day 4–6: Practise sentences about food and the house." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 40 woorden over eten, huis en kleuren.", descEn: "Day 5–7: Learn 40 words about food, house and colours." }
          ],
          goals: ["Meervoudsvormen correct maken voor 15 woorden.", "10 verkleinwoorden correct vormen.", "40 nieuwe woorden leren (eten, huis, kleuren).", "De teksten 'Mijn huis' en 'Boodschappen doen' begrijpen."],
          goalsEn: ["Correctly form plurals for 15 words.", "Correctly form 10 diminutives.", "Learn 40 new words (food, house, colours).", "Understand the texts 'Mijn huis' and 'Boodschappen doen'."]
        },
        {
          unit: 3, title: "Mijn dag", titleEn: "My day", weeks: "Week 3",
          grammarTopics: ["bezittelijke-vnw", "ontkenning", "voorzetsels-a1", "gebiedende-wijs"],
          verbRange: [82, 122],
          verbFocus: ["schijnen","wegen","wassen","meten","beschrijven","verschijnen","vertrekken","sturen","praten","hopen","betalen","wonen"],
          vocabTopics: [{level:"A1",topic:"tijd"},{level:"A1",topic:"kleding"},{level:"A1",topic:"lichaam"},{level:"A1",topic:"werkwoorden"},{level:"A1",topic:"voorzetsels"}],
          sentenceFilter: "niet",
          readingTexts: ['r-a1-005', 'r-a1-006'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer bezittelijke voornaamwoorden (mijn, jouw, zijn, haar, ons, hun) en ontkenning (niet/geen).", descEn: "Day 1–2: Study possessive pronouns (mijn, jouw, zijn, haar, ons, hun) and negation (niet/geen)." },
            { type: "grammatica", desc: "Dag 3–4: Leer voorzetsels van plaats en tijd (in, op, aan, bij, naar, om).", descEn: "Day 3–4: Learn prepositions of place and time (in, op, aan, bij, naar, om)." },
            { type: "grammatica", desc: "Dag 4–5: Leer de gebiedende wijs (imperatief) voor instructies en verzoeken.", descEn: "Day 4–5: Learn the imperative for instructions and requests." },
            { type: "werkwoorden", desc: "Dag 1–5: Oefen dagelijkse routinewerkwoorden in OTT. Doel: foutloos 8 van 10.", descEn: "Day 1–5: Practise daily-routine verbs in OTT. Goal: 8 of 10 error-free." },
            { type: "zinnen", desc: "Dag 4–6: Oefen ontkenningszinnen, imperatiefzinnen en zinnen over de dagelijkse routine.", descEn: "Day 4–6: Practise negation sentences, imperative sentences and sentences about the daily routine." },
            { type: "woordenschat", desc: "Dag 5–7: Leer woorden over tijd, kleding en lichaam.", descEn: "Day 5–7: Learn words about time, clothing and body." },
            { type: "dehet", desc: "Dag 6–7: Train de/het voor kleding- en lichaamswoorden.", descEn: "Day 6–7: Train de/het for clothing and body words." }
          ],
          goals: ["Bezittelijke voornaamwoorden correct gebruiken in 10 zinnen.", "Zinnen ontkennen met niet en geen zonder fouten.", "8 voorzetsels van tijd en plaats gebruiken in context.", "De gebiedende wijs correct vormen voor instructies.", "De teksten 'Een dag in mijn leven' en 'Wat draag ik vandaag?' begrijpen."],
          goalsEn: ["Use possessive pronouns correctly in 10 sentences.", "Negate sentences with niet and geen without errors.", "Use 8 prepositions of time and place in context.", "Correctly form the imperative for instructions.", "Understand the texts 'Een dag in mijn leven' and 'Wat draag ik vandaag?'."]
        },
        {
          unit: 4, title: "Onderweg & herhaling", titleEn: "On the go & review", weeks: "Week 4",
          grammarTopics: ["hebben-of-zijn", "omte-infinitief"],
          verbRange: [123, 163],
          verbFocus: ["tekenen","vertellen","schilderen","dromen","verdienen","melden","combineren","presenteren","feliciteren","verzamelen","berekenen","ontdekken"],
          vocabTopics: [{level:"A1",topic:"vervoer"},{level:"A1",topic:"weer"},{level:"A1",topic:"dieren"},{level:"A1",topic:"bijvoeglijk"},{level:"A1",topic:"cultuur"},{level:"A1",topic:"reizen"},{level:"A1",topic:"sport"}],
          sentenceFilter: "all",
          readingTexts: ['r-a1-007', 'r-a1-008'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer 'Hebben of zijn?' — leer de BAGS-regel (Beweging, Aard, Grootte, Staat) voor de VTT.", descEn: "Day 1–2: Study 'Hebben or zijn?' — learn the BAGS rule (Movement, Nature, Size, State) for the perfect tense." },
            { type: "grammatica", desc: "Dag 2–3: Leer 'om ... te + infinitief' voor doel: 'Ik leer Nederlands om hier te werken.'", descEn: "Day 2–3: Learn 'om ... te + infinitive' for purpose: 'Ik leer Nederlands om hier te werken.'" },
            { type: "werkwoorden", desc: "Dag 1–3: Oefen VTT met zijn-werkwoorden (gaan, komen, fietsen) en hebben-werkwoorden (maken, kijken, lezen).", descEn: "Day 1–3: Practise VTT with zijn verbs (gaan, komen, fietsen) and hebben verbs (maken, kijken, lezen)." },
            { type: "werkwoorden", desc: "Dag 3–5: Herhaal alle werkwoorden 0–163 in OTT. Test: conjugeer 20 willekeurige werkwoorden foutloos.", descEn: "Day 3–5: Revise all verbs 0–163 in OTT. Test: conjugate 20 random verbs without errors." },
            { type: "zinnen", desc: "Dag 4–5: Oefen alle A1-zinstypen: mededelingen, vragen, ontkenningen en om...te-zinnen. Mix alle grammatica.", descEn: "Day 4–5: Practise all A1 sentence types: statements, questions, negations and om...te sentences. Mix all grammar." },
            { type: "woordenschat", desc: "Dag 5–6: Leer woorden over vervoer, weer en dieren. Herhaal ook week 1–3 woorden.", descEn: "Day 5–6: Learn words about transport, weather and animals. Also revise week 1–3 words." },
            { type: "dehet", desc: "Dag 6–7: Eindtoets de/het: test 50 woorden. Doel: minstens 80% correct.", descEn: "Day 6–7: Final de/het test: test 50 words. Goal: at least 80% correct." }
          ],
          goals: ["De BAGS-regel toepassen: hebben of zijn in de VTT.", "20 werkwoorden foutloos vervoegen in OTT.", "'Om ... te + infinitief' correct gebruiken voor doel.", "Alle A1-grammatica combineren in vrije zinnen.", "A1 afgerond: basisgesprekken zelfstandig voeren."],
          goalsEn: ["Apply the BAGS rule: hebben or zijn in the perfect tense.", "Conjugate 20 verbs in OTT without errors.", "Correctly use 'om ... te + infinitive' for purpose.", "Combine all A1 grammar in free sentences.", "A1 complete: hold basic conversations independently."]
        }
      ]
    },
    {
      level: "A2", title: "Elementair", duration: "5 weken", durationEn: "5 weeks", color: "#1B3D7A",
      units: [
        {
          unit: 5, title: "Eten, winkelen & geld", titleEn: "Food, shopping & money", weeks: "Week 5",
          grammarTopics: ["bijvoeglijk-nw", "object-vnw"],
          verbRange: [164, 204],
          verbFocus: ["beloven","verbeteren","oefenen","pakken","leggen","mopperen","zwaaien","herhalen","rekenen","boren","surfen","scannen"],
          vocabTopics: [{level:"A2",topic:"eten"},{level:"A2",topic:"winkelen"},{level:"A2",topic:"geld"},{level:"A2",topic:"dagelijks"},{level:"A2",topic:"financiën"}],
          sentenceFilter: "all",
          readingTexts: ['r-001', 'r-a2-001', 'r-a2-006', 'r-a2-017', 'r-a2-019'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer bijvoeglijke naamwoorden — buigingsregel: wel/geen -e (een groot huis, de grote kamer).", descEn: "Day 1–2: Study adjective inflection rule: with/without -e (een groot huis, de grote kamer)." },
            { type: "grammatica", desc: "Dag 3–4: Leer voorwerpvoornaamwoorden (mij/me, jou/je, hem, haar, ons, hen/hun).", descEn: "Day 3–4: Learn object pronouns (mij/me, jou/je, hem, haar, ons, hen/hun)." },
            { type: "werkwoorden", desc: "Dag 1–3: Leer OVT (onvoltooid verleden tijd) — regelmatige werkwoorden: stam + -te(n)/-de(n). Oefen 15 werkwoorden.", descEn: "Day 1–3: Learn OVT (simple past) — regular verbs: stem + -te(n)/-de(n). Practise 15 verbs." },
            { type: "zinnen", desc: "Dag 4–6: Oefen zinnen over winkelen en geld met bijvoeglijke naamwoorden en voorwerpvoornaamwoorden.", descEn: "Day 4–6: Practise sentences about shopping and money with adjectives and object pronouns." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 40 woorden over eten, winkelen en geld.", descEn: "Day 5–7: Learn 40 words about food, shopping and money." },
            { type: "dehet", desc: "Dag 6–7: Train de/het met bijvoeglijk naamwoord erbij — 'de grote markt' of 'het grote huis'?", descEn: "Day 6–7: Train de/het with adjective added — 'de grote markt' or 'het grote huis'?" }
          ],
          goals: ["Bijvoeglijke naamwoorden correct verbuigen bij de- en het-woorden.", "Voorwerpvoornaamwoorden correct plaatsen in zinnen.", "40 nieuwe A2-woorden kennen over eten en winkelen.", "De teksten over de markt, supermarkt en online winkelen begrijpen."],
          goalsEn: ["Correctly inflect adjectives with de and het words.", "Correctly place object pronouns in sentences.", "Know 40 new A2 words about food and shopping.", "Understand the texts about the market, supermarket and online shopping."]
        },
        {
          unit: 6, title: "Gezondheid & sport", titleEn: "Health & sport", weeks: "Week 6",
          grammarTopics: ["vergrotende-trap", "hoeven-te"],
          verbRange: [205, 245],
          verbFocus: ["starten","raden","brouwen","roken","kussen","schreeuwen","coachen","analyseren","beleven","beslissen","opbellen","thuiskomen"],
          vocabTopics: [{level:"A2",topic:"gezondheid"},{level:"A2",topic:"sport"},{level:"A2",topic:"hobby"},{level:"A2",topic:"karakter"},{level:"A2",topic:"werkwoorden"}],
          sentenceFilter: "all",
          readingTexts: ['r-a2-002', 'r-a2-009', 'r-a2-015', 'r-a2-007'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Leer de vergrotende trap (-er) en overtreffende trap (-st). Onregelmatig: goed-beter-best, veel-meer-meest.", descEn: "Day 1–2: Learn comparative (-er) and superlative (-st). Irregular: goed-beter-best, veel-meer-meest." },
            { type: "grammatica", desc: "Dag 3–4: Leer 'hoeven (niet) te' voor wat niet verplicht is: 'Je hoeft niet elke dag te sporten.'", descEn: "Day 3–4: Learn 'hoeven (niet) te' for what isn't required: 'Je hoeft niet elke dag te sporten.'" },
            { type: "werkwoorden", desc: "Dag 2–5: Oefen gezondheids- en sportwerkwoorden in OTT en OVT.", descEn: "Day 2–5: Practise health and sport verbs in OTT and OVT." },
            { type: "zinnen", desc: "Dag 4–6: Maak vergelijkingen: 'Voetbal is populairder dan tennis.' Oefen zinnen over de huisarts en tandarts, en met 'hoeven niet te'.", descEn: "Day 4–6: Make comparisons: 'Voetbal is populairder dan tennis.' Practise sentences about the doctor and dentist, and with 'hoeven niet te'." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 30 gezondheids- en sportwoorden. Oefen vergelijkingen.", descEn: "Day 5–7: Learn 30 health and sport words. Practise comparisons." },
            { type: "dehet", desc: "Dag 6–7: Train de/het voor gezondheids- en sportwoorden.", descEn: "Day 6–7: Train de/het for health and sport words." }
          ],
          goals: ["Vergrotende en overtreffende trap correct gebruiken (incl. 5 onregelmatige).", "'Hoeven niet te' correct onderscheiden van 'moeten' en 'mogen niet'.", "30 nieuwe woorden kennen (gezondheid, sport, karakter).", "De teksten over de huisarts, sport en de tandarts begrijpen."],
          goalsEn: ["Use comparative and superlative correctly (incl. 5 irregular ones).", "Correctly distinguish 'hoeven niet te' from 'moeten' and 'mogen niet'.", "Know 30 new words (health, sport, character).", "Understand the texts about the doctor, sport and the dentist."]
        },
        {
          unit: 7, title: "Vrije tijd & feest", titleEn: "Free time & celebrations", weeks: "Week 7",
          grammarTopics: ["nevenschikkende-vgw"],
          verbRange: [246, 286],
          verbFocus: ["weggaan","aandoen","afmaken","meenemen","neerzetten","inloggen","opruimen","weggooien","opgroeien","aanlopen","afleveren","invullen"],
          vocabTopics: [{level:"A2",topic:"cultuur"},{level:"A2",topic:"natuur"},{level:"A2",topic:"bijvoeglijk"},{level:"A2",topic:"media"},{level:"A2",topic:"kleding"},{level:"A2",topic:"bijwoord"}],
          sentenceFilter: "all",
          readingTexts: ['r-002', 'r-a2-003', 'r-a2-004', 'r-a2-021', 'r-a2-023'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer nevenschikkende voegwoorden: en, maar, want, dus, of, toch. Oefen de woordvolgorde (geen inversie).", descEn: "Day 1–2: Study coordinating conjunctions: en, maar, want, dus, of, toch. Practise word order (no inversion)." },
            { type: "werkwoorden", desc: "Dag 2–5: Oefen feest- en vrijetijdswerkwoorden in OTT en OVT.", descEn: "Day 2–5: Practise celebration and leisure verbs in OTT and OVT." },
            { type: "zinnen", desc: "Dag 4–6: Oefen zinnen met maar, want, dus en toch over verjaardagen, het café en Koningsdag.", descEn: "Day 4–6: Practise sentences with maar, want, dus and toch about birthdays, the café and King's Day." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 30 cultuur- en natuurwoorden.", descEn: "Day 5–7: Learn 30 culture and nature words." }
          ],
          goals: ["6 nevenschikkende voegwoorden kennen en toepassen.", "30 nieuwe woorden kennen (cultuur, natuur, media).", "De teksten over Koningsdag, de Waddenzee en het museum begrijpen."],
          goalsEn: ["Know and apply 6 coordinating conjunctions.", "Know 30 new words (culture, nature, media).", "Understand the texts about King's Day, the Wadden Sea and the museum."]
        },
        {
          unit: 8, title: "Wonen & onderweg", titleEn: "Living & getting around", weeks: "Week 8",
          grammarTopics: ["er-systeem", "voorzetsels-a2", "toekomende-tijd"],
          verbRange: [287, 327],
          verbFocus: ["doorsturen","opschrijven","opleggen","uitvoeren","meebrengen","afzetten","openstellen","aanstellen","afspreken","meedelen","toenemen","verheugen"],
          vocabTopics: [{level:"A2",topic:"reizen"},{level:"A2",topic:"toerisme"},{level:"A2",topic:"huis"},{level:"A2",topic:"architectuur"},{level:"A2",topic:"milieu"},{level:"A2",topic:"landbouw"},{level:"A2",topic:"voorzetsels"}],
          sentenceFilter: "all",
          readingTexts: ['r-003', 'r-004', 'r-a2-005', 'r-a2-010', 'r-a2-014', 'r-a2-016', 'r-a2-018', 'r-a2-020', 'r-a2-022'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Leer het er-systeem en A2-voorzetsels (sinds, tijdens, vanwege, ondanks).", descEn: "Day 1–2: Learn the er system and A2 prepositions (sinds, tijdens, vanwege, ondanks)." },
            { type: "grammatica", desc: "Dag 2–3: Leer de drie manieren om de toekomst uit te drukken: presens, gaan + inf., zullen + inf.", descEn: "Day 2–3: Learn the three ways to express the future: present tense, gaan + inf., zullen + inf." },
            { type: "werkwoorden", desc: "Dag 2–4: Oefen reis- en woonwerkwoorden in OTT, OVT en VTT.", descEn: "Day 2–4: Practise travel and housing verbs in OTT, OVT and VTT." },
            { type: "zinnen", desc: "Dag 3–5: Oefen zinnen met 'er', A2-voorzetsels en toekomende tijd over huren, reizen en de trein.", descEn: "Day 3–5: Practise sentences with 'er', A2 prepositions and future tense about renting, travel and the train." },
            { type: "woordenschat", desc: "Dag 6–7: Leer 40 reis- en woonwoorden. Oefen voorzetsels in context.", descEn: "Day 6–7: Learn 40 travel and housing words. Practise prepositions in context." }
          ],
          goals: ["4 functies van 'er' herkennen en toepassen.", "A2-voorzetsels van tijd en abstractie gebruiken.", "De drie toekomstvormen correct kiezen en gebruiken.", "40 reis- en woonwoorden kennen.", "De teksten over een huurhuis, het station en de buurt begrijpen."],
          goalsEn: ["Recognise and apply 4 functions of 'er'.", "Use A2 prepositions of time and abstraction.", "Correctly choose and use the three future forms.", "Know 40 travel and housing words.", "Understand the texts about renting a home, the station and the neighbourhood."]
        },
        {
          unit: 9, title: "Werk, school & routine", titleEn: "Work, school & routine", weeks: "Week 9",
          grammarTopics: ["scheidbare-werkwoorden", "onderschikkende-vgw-1", "formeel-u", "reflexieve-werkwoorden", "progressieve-tijd"],
          verbRange: [328, 368],
          verbFocus: ["zich voelen","concentreren","omdraaien","verzetten","vastgrijpen","inschrijven","beraden","adviseren","behandelen","beschermen","beweren","controleren"],
          vocabTopics: [{level:"A2",topic:"werk"},{level:"A2",topic:"onderwijs"},{level:"A2",topic:"technologie"},{level:"A2",topic:"communicatie"},{level:"A2",topic:"samenleving"},{level:"A2",topic:"relaties"},{level:"A2",topic:"verbinders"},{level:"A2",topic:"verbindingswoorden"}],
          sentenceFilter: "scheidbare-werkwoorden",
          readingTexts: ['r-a2-008', 'r-a2-011', 'r-a2-012', 'r-a2-013'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer scheidbare werkwoorden: prefix schuift naar het einde in een hoofdzin; prefix + stam blijven samen in een bijzin.", descEn: "Day 1–2: Study separable verbs: prefix moves to the end in a main clause; prefix + stem stay together in a sub. clause." },
            { type: "grammatica", desc: "Dag 2–3: Leer het voltooid deelwoord van scheidbare werkwoorden (op+ge+staan = opgestaan). Leer ook formeel 'u' (u, uw).", descEn: "Day 2–3: Learn the past participle of separable verbs (op+ge+staan = opgestaan). Also learn formal 'u' (u, uw)." },
            { type: "grammatica", desc: "Dag 3–4: Bestudeer onderschikkende voegwoorden (omdat, als, dat, terwijl, toen) — werkwoord naar het einde!", descEn: "Day 3–4: Study subordinating conjunctions (omdat, als, dat, terwijl, toen) — verb to the end!" },
            { type: "grammatica", desc: "Dag 4–5: Leer reflexieve werkwoorden (zich voelen, zich concentreren) en 'aan het + infinitief' voor lopende acties.", descEn: "Day 4–5: Learn reflexive verbs (zich voelen, zich concentreren) and 'aan het + infinitive' for ongoing actions." },
            { type: "werkwoorden", desc: "Dag 2–4: Oefen scheidbare en reflexieve werkwoorden (opstaan, opbellen, zich voelen, zich haasten) in OTT, OVT en VTT.", descEn: "Day 2–4: Practise separable and reflexive verbs (opstaan, opbellen, zich voelen, zich haasten) in OTT, OVT and VTT." },
            { type: "zinnen", desc: "Dag 3–5: Oefen scheidbare werkwoorden in Zinnen oefenen → filter 'Scheidbare ww.' — focus op prefix-naar-einde en VTT-vormen.", descEn: "Day 3–5: Practise separable verbs in Zinnen oefenen → filter 'Scheidbare ww.' — focus on prefix-to-end and perfect tense forms." },
            { type: "zinnen", desc: "Dag 5–7: Oefen bijzinnen met omdat, als en dat, en reflexieve/progressieve zinnen over werk en school.", descEn: "Day 5–7: Practise sub. clauses with omdat, als and dat, and reflexive/progressive sentences about work and school." },
            { type: "woordenschat", desc: "Dag 6–7: Leer 40 werk- en onderwijswoorden.", descEn: "Day 6–7: Learn 40 work and education words." }
          ],
          goals: ["Bijzinnen vormen met 5 onderschikkende voegwoorden (correcte woordvolgorde).", "10 scheidbare werkwoorden correct gebruiken in hoofd- en bijzinnen.", "Reflexieve werkwoorden en 'aan het + infinitief' correct gebruiken.", "40 werk- en onderwijswoorden kennen.", "A2 afgerond: dagelijkse communicatie zelfstandig voeren."],
          goalsEn: ["Form subordinate clauses with 5 subordinating conjunctions (correct word order).", "Correctly use 10 separable verbs in main and subordinate clauses.", "Correctly use reflexive verbs and 'aan het + infinitive'.", "Know 40 work and education words.", "A2 complete: hold daily communication independently."]
        }
      ]
    },
    {
      level: "B1", title: "Gemiddeld", duration: "6 weken", durationEn: "6 weeks", color: "#7A3B1B",
      units: [
        {
          unit: 10, title: "Werk & carrière", titleEn: "Work & career", weeks: "Week 10",
          grammarTopics: ["betrekkelijke-bijzin", "betrekkelijke-bijzin-voorzetsel"],
          verbRange: [369, 409],
          verbFocus: ["discussiëren","geloven","informeren","merken","ontmoeten","plannen","regelen","respecteren","twijfelen","verdienen","vertrouwen","verzorgen"],
          vocabTopics: [{level:"B1",topic:"werk"},{level:"B1",topic:"financiën"},{level:"B1",topic:"uitdrukkingen"},{level:"B1",topic:"economie"},{level:"B1",topic:"recht"},{level:"B1",topic:"collocaties"},{level:"B1",topic:"woordfamilie"}],
          sentenceFilter: "bijzin",
          readingTexts: ['r-b1-c-001', 'r-b1-c-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Leer betrekkelijke bijzinnen: die (de-woorden), dat (het-woorden), wat (hele zinnen). Oefen 10 voorbeelden.", descEn: "Day 1–2: Learn relative clauses: die (de words), dat (het words), wat (whole sentences). Practise 10 examples." },
            { type: "grammatica", desc: "Dag 2–3: Leer betrekkelijke bijzinnen met voorzetsel: 'met wie' voor personen, 'waarover/waaraan' voor dingen.", descEn: "Day 2–3: Learn relative clauses with a preposition: 'met wie' for people, 'waarover/waaraan' for things." },
            { type: "werkwoorden", desc: "Dag 2–5: Oefen werkgerelateerde werkwoorden in OTT, OVT en VTT.", descEn: "Day 2–5: Practise work-related verbs in OTT, OVT and VTT." },
            { type: "zinnen", desc: "Dag 4–6: Maak complexe zinnen met betrekkelijke bijzinnen (met en zonder voorzetsel) over werk en carrière.", descEn: "Day 4–6: Create complex sentences with relative clauses (with and without a preposition) about work and career." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 30 werk-, financiën- en juridische woorden en woordfamilies.", descEn: "Day 5–7: Learn 30 work, finance and legal words and word families." }
          ],
          goals: ["Die, dat en wat correct gebruiken in betrekkelijke bijzinnen.", "Betrekkelijke bijzinnen met voorzetsel correct vormen ('met wie', 'waarover').", "30 werk- en financiënwoorden kennen.", "De teksten over werk, een klacht indienen en een kamer zoeken begrijpen."],
          goalsEn: ["Use die, dat and wat correctly in relative clauses.", "Correctly form relative clauses with a preposition ('met wie', 'waarover').", "Know 30 work and finance words.", "Understand the texts about work, filing a complaint and finding a room."]
        },
        {
          unit: 11, title: "Wonen & samenleving", titleEn: "Living & society", weeks: "Week 11",
          grammarTopics: ["lijdende-vorm", "laten-plus-infinitief"],
          verbRange: [410, 450],
          verbFocus: ["wennen","bevatten","interviewen","interesseren","bestaan","verlaten","overwegen","betrekken","voorkomen","aanzien","aanpassen","afspreken"],
          vocabTopics: [{level:"B1",topic:"wonen"},{level:"B1",topic:"samenleving"},{level:"B1",topic:"architectuur"},{level:"B1",topic:"huis"},{level:"B1",topic:"voorzetsels"},{level:"B1",topic:"landbouw"},{level:"B1",topic:"karakter"}],
          sentenceFilter: "passief",
          readingTexts: ['r-b1-001', 'r-b1-c-002'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer de lijdende vorm in OTT (wordt + vd.) en OVT (werd + vd.). Leer het verschil met actief.", descEn: "Day 1–2: Study passive voice in OTT (wordt + pp) and OVT (werd + pp). Learn the difference with active." },
            { type: "grammatica", desc: "Dag 3–4: Leer worden-passief vs. zijn-passief. Oefen: 'Het huis wordt gebouwd' vs. 'Het huis is gebouwd'.", descEn: "Day 3–4: Learn worden passive vs. zijn passive. Practise: 'Het huis wordt gebouwd' vs. 'Het huis is gebouwd'." },
            { type: "grammatica", desc: "Dag 4–5: Leer 'laten + infinitief' voor diensten laten uitvoeren: 'Ik laat mijn keuken verbouwen.'", descEn: "Day 4–5: Learn 'laten + infinitive' for having services done: 'Ik laat mijn keuken verbouwen.'" },
            { type: "werkwoorden", desc: "Dag 2–4: Oefen 12 werkwoorden in passieve constructies over wonen en de woningmarkt.", descEn: "Day 2–4: Practise 12 verbs in passive constructions about housing and the property market." },
            { type: "zinnen", desc: "Dag 4–6: Herschrijf 15 actieve zinnen als passieve zinnen en oefen 'laten + infinitief'-zinnen.", descEn: "Day 4–6: Rewrite 15 active sentences as passive sentences and practise 'laten + infinitive' sentences." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 40 woon- en maatschappijwoorden.", descEn: "Day 5–7: Learn 40 housing and society words." }
          ],
          goals: ["Passieve zinnen vormen in OTT en OVT (foutloos bij 10 zinnen).", "Het verschil uitleggen tussen worden- en zijn-passief.", "'Laten + infinitief' correct gebruiken voor diensten en toestemming.", "40 woon- en maatschappijwoorden kennen.", "De teksten over de woningmarkt en een kamer zoeken begrijpen."],
          goalsEn: ["Form passive sentences in OTT and OVT (error-free for 10 sentences).", "Explain the difference between worden and zijn passive.", "Correctly use 'laten + infinitive' for services and permission.", "Know 40 housing and society words.", "Understand the texts about the housing market and finding a room."]
        },
        {
          unit: 12, title: "Milieu & wetenschap", titleEn: "Environment & science", weeks: "Week 12",
          grammarTopics: ["voorwaardelijke-wijs"],
          verbRange: [451, 490],
          verbFocus: ["aanstellen","deelnemen","inschrijven","opnemen","toenemen","uitkomen","voorstellen","uitleggen","omzetten","overkomen","berekenen","confronteren"],
          vocabTopics: [{level:"B1",topic:"milieu"},{level:"B1",topic:"natuur"},{level:"B1",topic:"wetenschap"},{level:"B1",topic:"abstract"},{level:"B1",topic:"tijd"},{level:"B1",topic:"sport"}],
          sentenceFilter: "all",
          readingTexts: ['r-b1-002'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer de voorwaardelijke wijs: zou/zouden + infinitief. Verschil reeel (als het regent...) en irreeel (als we minder zouden vliegen...).", descEn: "Day 1–2: Study the conditional: zou/zouden + infinitive. Difference real (als het regent...) and unreal (als we minder zouden vliegen...)." },
            { type: "werkwoorden", desc: "Dag 2–4: Oefen wetenschappelijke en natuurwerkwoorden in OVT.", descEn: "Day 2–4: Practise scientific and nature verbs in OVT." },
            { type: "zinnen", desc: "Dag 3–5: Oefen als...dan-constructies over klimaatverandering: 10 reele en 10 irreele zinnen.", descEn: "Day 3–5: Practise if...then constructions about climate change: 10 real and 10 unreal sentences." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 30 woorden over milieu, natuur en wetenschap.", descEn: "Day 5–7: Learn 30 words about environment, nature and science." }
          ],
          goals: ["Zou/zouden correct gebruiken voor hypothese.", "10 reele en 10 irreele conditionaalzinnen maken.", "30 woorden over milieu en wetenschap kennen.", "De tekst over klimaatverandering en ons gedrag begrijpen."],
          goalsEn: ["Use zou/zouden correctly for hypothesis.", "Create 10 real and 10 unreal conditional sentences.", "Know 30 words about environment and science.", "Understand the text about climate change and our behaviour."]
        },
        {
          unit: 13, title: "Media & communicatie", titleEn: "Media & communication", weeks: "Week 13",
          grammarTopics: ["indirecte-rede", "voornaamwoordelijke-bijwoorden"],
          verbRange: [491, 530],
          verbFocus: ["functioneren","illustreren","investeren","realiseren","structureren","verwijzen","reguleren","verifiëren","samenvatten","voltooien","beschuldigen","verminderen"],
          vocabTopics: [{level:"B1",topic:"media"},{level:"B1",topic:"communicatie"},{level:"B1",topic:"technologie"},{level:"B1",topic:"bijwoord"},{level:"B1",topic:"verbindingswoorden"},{level:"B1",topic:"cultuur"}],
          sentenceFilter: "bijzin",
          readingTexts: ['r-b1-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Leer indirecte rede: 'Hij zegt dat...', 'Ze vroeg of...'. Let op tijdsverschuiving en woordvolgorde.", descEn: "Day 1–2: Learn reported speech: 'Hij zegt dat...', 'Ze vroeg of...'. Pay attention to tense shift and word order." },
            { type: "grammatica", desc: "Dag 2–3: Leer voornaamwoordelijke bijwoorden: erover, daarmee, waarvoor — voor dingen, nooit voorzetsel + het.", descEn: "Day 2–3: Learn pronominal adverbs: erover, daarmee, waarvoor — for things, never preposition + het." },
            { type: "werkwoorden", desc: "Dag 2–4: Oefen zeggen, beweren, vragen in alle tijden. Focus op tijdsverschuiving.", descEn: "Day 2–4: Practise zeggen, beweren, vragen in all tenses. Focus on tense shift." },
            { type: "zinnen", desc: "Dag 4–6: Zet 15 directe citaten uit een nieuwsbericht om naar indirecte rede, en oefen er-/daar-/waar-woorden.", descEn: "Day 4–6: Convert 15 direct quotes from a news article into reported speech, and practise er-/daar-/waar- words." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 30 media- en communicatiewoorden.", descEn: "Day 5–7: Learn 30 media and communication words." }
          ],
          goals: ["Indirecte rede correct toepassen met tijdsverschuiving.", "Er-, daar- en waar-woorden correct gebruiken voor dingen.", "30 media- en communicatiewoorden kennen.", "De tekst over de invloed van sociale media begrijpen."],
          goalsEn: ["Apply reported speech correctly with tense shift.", "Correctly use er-, daar- and waar- compounds for things.", "Know 30 media and communication words.", "Understand the text about the influence of social media."]
        },
        {
          unit: 14, title: "Gevoelens & gezondheid", titleEn: "Feelings & health", weeks: "Week 14",
          grammarTopics: ["onderschikkende-vgw-2"],
          verbRange: [531, 570],
          verbFocus: ["overschatten","hervatten","erkennen","bijdragen","afhandelen","doorvoeren","tegenwerken","verwijzen naar","bijstellen","aanvaarden","bedienen","berusten"],
          vocabTopics: [{level:"B1",topic:"gevoelens"},{level:"B1",topic:"psychologie"},{level:"B1",topic:"gezondheid"},{level:"B1",topic:"relaties"},{level:"B1",topic:"persoonlijkheid"},{level:"B1",topic:"eten"},{level:"B1",topic:"kleding"}],
          sentenceFilter: "bijzin",
          readingTexts: ['r-b1-005', 'r-b1-006'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer gevorderde onderschikkende voegwoorden: hoewel, tenzij, mits, zodat, doordat, terwijl.", descEn: "Day 1–2: Study advanced subordinating conjunctions: hoewel, tenzij, mits, zodat, doordat, terwijl." },
            { type: "werkwoorden", desc: "Dag 2–4: Oefen gevoels- en gezondheidswerkwoorden in alle tijden.", descEn: "Day 2–4: Practise feeling and health verbs in all tenses." },
            { type: "zinnen", desc: "Dag 3–5: Oefen zinnen met hoewel, terwijl en mits over stress en vriendschap.", descEn: "Day 3–5: Practise sentences with hoewel, terwijl and mits about stress and friendship." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 30 woorden over gevoelens, psychologie en relaties.", descEn: "Day 5–7: Learn 30 words about feelings, psychology and relationships." }
          ],
          goals: ["6 gevorderde onderschikkende voegwoorden gebruiken.", "30 woorden over gevoelens en relaties kennen.", "De teksten over stress en vriendschap op afstand begrijpen."],
          goalsEn: ["Use 6 advanced subordinating conjunctions.", "Know 30 words about feelings and relationships.", "Understand the texts about stress and long-distance friendship."]
        },
        {
          unit: 15, title: "Maatschappij", titleEn: "Society", weeks: "Week 15",
          grammarTopics: ["woordvolgorde-gevorderd", "woordvorming"],
          verbRange: [571, 610],
          verbFocus: ["bewaken","besturen","branden","definiëren","dienen","dreigen","exporteren","filteren","handelen","inspireren","introduceren","koesteren"],
          vocabTopics: [{level:"B1",topic:"samenleving"},{level:"B1",topic:"politiek"},{level:"B1",topic:"verbinders"},{level:"B1",topic:"onderwijs"},{level:"B1",topic:"toerisme"},{level:"B1",topic:"werkwoorden"},{level:"B1",topic:"bijvoeglijk"},{level:"B1",topic:"reizen"}],
          sentenceFilter: "all",
          readingTexts: ['r-b1-003', 'r-b1-c-003'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer gevorderde woordvolgorde: inversie na bijwoord, tijd-wijze-plaats, tangconstructie.", descEn: "Day 1–2: Study advanced word order: inversion after adverb, time-manner-place, brace construction." },
            { type: "grammatica", desc: "Dag 2–3: Leer woordvorming: on-, her-, ver-, -heid, -ing, -baar — bouw nieuwe woorden uit bekende stammen.", descEn: "Day 2–3: Learn word formation: on-, her-, ver-, -heid, -ing, -baar — build new words from known stems." },
            { type: "werkwoorden", desc: "Dag 2–5: Oefen VVT (voltooid verleden tijd: had + vd.) voor verhalen over vrijwilligerswerk.", descEn: "Day 2–5: Practise VVT (pluperfect: had + pp) for stories about volunteering." },
            { type: "zinnen", desc: "Dag 4–6: Schrijf een kort verhaal (100 woorden) met gevorderde woordvolgorde over openbaar vervoer of vrijwilligerswerk.", descEn: "Day 4–6: Write a short story (100 words) with advanced word order about public transport or volunteering." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 30 woorden over samenleving, politiek en onderwijs. Herken woordfamilies met on-/her-/ver-/-heid/-ing.", descEn: "Day 5–7: Learn 30 words about society, politics and education. Recognise word families with on-/her-/ver-/-heid/-ing." }
          ],
          goals: ["Gevorderde woordvolgorde toepassen (inversie, tangconstructie).", "Nieuwe woorden herkennen en vormen met voor-/achtervoegsels.", "30 woorden over samenleving en politiek kennen.", "De teksten over vrijwilligerswerk en openbaar vervoer begrijpen.", "B1 afgerond: zelfstandig communiceren over alle alledaagse thema's."],
          goalsEn: ["Apply advanced word order (inversion, brace construction).", "Recognise and form new words with prefixes/suffixes.", "Know 30 words about society and politics.", "Understand the texts about volunteering and public transport.", "B1 complete: communicate independently on all everyday topics."]
        }
      ]
    },
    {
      level: "B2", title: "Gevorderd", duration: "12 weken", durationEn: "12 weeks", color: "#8B1C1C",
      units: [
        {
          unit: 16, title: "Economie & werk", titleEn: "Economy & work", weeks: "Week 16–17",
          grammarTopics: ["gevorderd-passief"],
          verbRange: [611, 650],
          verbFocus: ["lukken","missen","monitoren","onderhandelen","overtuigen","prioriteren","registreren","richten","simuleren","spoelen","tolereren","verduidelijken"],
          vocabTopics: [{level:"B2",topic:"economie"},{level:"B2",topic:"werk"},{level:"B2",topic:"financiën"},{level:"B2",topic:"bijvoeglijk"},{level:"B2",topic:"verbinders"},{level:"B2",topic:"verbindingswoorden"}],
          sentenceFilter: "passief",
          readingTexts: ['r-b2-001'],
          activities: [
            { type: "grammatica", desc: "Dag 1–4: Bestudeer gevorderd passief: modaal passief ('kan worden gedaan'), dubbel passief, passief met er.", descEn: "Day 1–4: Study advanced passive: modal passive ('kan worden gedaan'), double passive, passive with er." },
            { type: "werkwoorden", desc: "Dag 3–7: Oefen economische werkwoorden in passieve en actieve constructies.", descEn: "Day 3–7: Practise economic verbs in passive and active constructions." },
            { type: "zinnen", desc: "Dag 5–10: Oefen zinnen over de gig-economie en flexwerk met gevorderd passief.", descEn: "Day 5–10: Practise sentences about the gig economy and flexible work with advanced passive." },
            { type: "woordenschat", desc: "Dag 7–12: Leer 50 economie- en werkwoorden.", descEn: "Day 7–12: Learn 50 economy and work words." }
          ],
          goals: ["Modaal passief correct vormen en gebruiken.", "50 economie- en werkwoorden kennen.", "De tekst over de gig-economie begrijpen."],
          goalsEn: ["Correctly form and use modal passive.", "Know 50 economy and work words.", "Understand the text about the gig economy."]
        },
        {
          unit: 17, title: "Politiek & recht", titleEn: "Politics & law", weeks: "Week 18–19",
          grammarTopics: ["formeel-zakelijk"],
          verbRange: [651, 690],
          verbFocus: ["veronderstellen","verwarren","visualiseren","waarderen","bederven","genezen","ondervinden","strijden","verbergen","aanleren","aanspreken","afbetalen"],
          vocabTopics: [{level:"B2",topic:"politiek"},{level:"B2",topic:"recht"},{level:"B2",topic:"samenleving"},{level:"B2",topic:"media"},{level:"B2",topic:"communicatie"},{level:"B2",topic:"karakter"}],
          sentenceFilter: "all",
          readingTexts: ['r-b2-005'],
          activities: [
            { type: "grammatica", desc: "Dag 1–4: Bestudeer formeel zakelijk taalgebruik: nominalisatie, onpersoonlijke constructies, formele voegwoorden (mits).", descEn: "Day 1–4: Study formal professional language: nominalisation, impersonal constructions, formal conjunctions (mits)." },
            { type: "werkwoorden", desc: "Dag 3–7: Oefen politieke en juridische werkwoorden in VTT en lijdende vorm.", descEn: "Day 3–7: Practise political and legal verbs in perfect tense and passive." },
            { type: "zinnen", desc: "Dag 5–10: Analyseer en oefen formele zinsstructuren uit politieke teksten over het referendum.", descEn: "Day 5–10: Analyse and practise formal sentence structures from political texts about the referendum." },
            { type: "woordenschat", desc: "Dag 7–12: Leer 50 politiek- en rechtswoorden.", descEn: "Day 7–12: Learn 50 politics and law words." }
          ],
          goals: ["Nominalisaties gebruiken in geschreven taal (10 voorbeelden).", "Formeel taalgebruik consistent toepassen.", "50 politiek- en rechtswoorden kennen.", "De tekst over het referendum begrijpen."],
          goalsEn: ["Use nominalisations in written language (10 examples).", "Consistently apply formal language.", "Know 50 politics and law words.", "Understand the text about the referendum."]
        },
        {
          unit: 18, title: "Onderwijs & wetenschap", titleEn: "Education & science", weeks: "Week 20–21",
          grammarTopics: ["partitief", "deelwoord-als-bijvoeglijk"],
          verbRange: [691, 730],
          verbFocus: ["afkomen","afrekenen","afvallen","bijwonen","doordringen","inbrengen","instappen","invallen","meerijden","nastreven","neerslaan","omvormen"],
          vocabTopics: [{level:"B2",topic:"onderwijs"},{level:"B2",topic:"academisch"},{level:"B2",topic:"wetenschap"},{level:"B2",topic:"psychologie"},{level:"B2",topic:"natuur"},{level:"B2",topic:"architectuur"}],
          sentenceFilter: "all",
          readingTexts: ['r-b2-002'],
          activities: [
            { type: "grammatica", desc: "Dag 1–4: Bestudeer partitief gebruik: 'een van de', 'sommige van', 'de meeste van'. Oefen in zinnen.", descEn: "Day 1–4: Study partitive constructions: 'een van de', 'sommige van', 'de meeste van'. Practise in sentences." },
            { type: "grammatica", desc: "Dag 4–5: Leer deelwoorden als bijvoeglijk naamwoord: 'een groeiend aantal studenten', 'de uitgenodigde gasten'.", descEn: "Day 4–5: Learn participles used as adjectives: 'een groeiend aantal studenten', 'de uitgenodigde gasten'." },
            { type: "werkwoorden", desc: "Dag 3–8: Oefen academische werkwoorden (onderzoeken, evalueren, formuleren) in alle tijden.", descEn: "Day 3–8: Practise academic verbs (onderzoeken, evalueren, formuleren) in all tenses." },
            { type: "zinnen", desc: "Dag 6–11: Analyseer de tekst over ongelijkheid in het onderwijs. Schrijf een korte reactie (150 woorden) met partitief en deelwoorden als bijvoeglijk naamwoord.", descEn: "Day 6–11: Analyse the text about inequality in education. Write a short response (150 words) with partitive and participial adjectives." },
            { type: "woordenschat", desc: "Dag 8–14: Leer 50 onderwijs- en wetenschapswoorden.", descEn: "Day 8–14: Learn 50 education and science words." }
          ],
          goals: ["Partitieve constructies toepassen in 10 zinnen.", "Deelwoorden correct als bijvoeglijk naamwoord gebruiken.", "50 onderwijs- en wetenschapswoorden kennen.", "De tekst over ongelijkheid in het Nederlandse onderwijs begrijpen."],
          goalsEn: ["Apply partitive constructions in 10 sentences.", "Correctly use participles as adjectives.", "Know 50 education and science words.", "Understand the text about inequality in Dutch education."]
        },
        {
          unit: 19, title: "Milieu & technologie", titleEn: "Environment & technology", weeks: "Week 22–23",
          grammarTopics: ["voltooide-voorwaardelijke", "hoe-hoe-vergelijking"],
          verbRange: [731, 770],
          verbFocus: ["opschalen","opvolgen","overplaatsen","rondkijken","rondsturen","samenvoegen","terugleggen","thuisblijven","toelichten","uitdelen","uitlenen","uitvinden"],
          vocabTopics: [{level:"B2",topic:"milieu"},{level:"B2",topic:"technologie"},{level:"B2",topic:"abstract"},{level:"B2",topic:"landbouw"},{level:"B2",topic:"tijd"},{level:"B2",topic:"gezondheid"}],
          sentenceFilter: "all",
          readingTexts: ['r-b2-003', 'r-b2-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–4: Leer de voltooide voorwaardelijke wijs: zou hebben/zijn + voltooid deelwoord. Voorbeeld: 'als we eerder hadden gehandeld...'.", descEn: "Day 1–4: Learn the perfect conditional: zou hebben/zijn + past participle. Example: 'als we eerder hadden gehandeld...'." },
            { type: "grammatica", desc: "Dag 4–5: Leer 'hoe...hoe...' voor evenredige vergelijking: 'Hoe meer we uitstoten, hoe warmer het wordt.'", descEn: "Day 4–5: Learn 'hoe...hoe...' for proportional comparison: 'Hoe meer we uitstoten, hoe warmer het wordt.'" },
            { type: "werkwoorden", desc: "Dag 3–7: Oefen VVT gecombineerd met voorwaardelijke wijs. Gebruik technologie- en klimaatwerkwoorden.", descEn: "Day 3–7: Practise pluperfect combined with conditional mood. Use technology and climate verbs." },
            { type: "zinnen", desc: "Dag 5–10: Oefen 'als X was gebeurd, dan zou Y...'-constructies en 'hoe...hoe...'-zinnen over klimaatbeleid en AI.", descEn: "Day 5–10: Practise 'if X had happened, then Y would...'-constructions and 'hoe...hoe...' sentences about climate policy and AI." },
            { type: "woordenschat", desc: "Dag 7–12: Leer 40 milieu- en technologiewoorden.", descEn: "Day 7–12: Learn 40 environment and technology words." }
          ],
          goals: ["Voltooide voorwaardelijke zinnen correct vormen.", "'Hoe...hoe...'-zinnen correct vormen met inversie in beide delen.", "40 milieu- en technologiewoorden kennen.", "De teksten over klimaatbeleid en kunstmatige intelligentie begrijpen."],
          goalsEn: ["Correctly form perfect conditional sentences.", "Correctly form 'hoe...hoe...' sentences with inversion in both parts.", "Know 40 environment and technology words.", "Understand the texts about climate policy and artificial intelligence."]
        },
        {
          unit: 20, title: "Idioom & afronding", titleEn: "Idiom & wrap-up", weeks: "Week 24–26",
          grammarTopics: ["idioom", "iets-niets-plus-s"],
          verbRange: [771, 810],
          verbFocus: ["voltrekken","voorspellen","wegleggen","wegvallen","zich afvragen","zich ergeren","zich ontspannen","zich realiseren","zich vergissen","zich voorstellen"],
          vocabTopics: [{level:"B2",topic:"uitdrukkingen"},{level:"B2",topic:"collocaties"},{level:"B2",topic:"woordfamilie"},{level:"B2",topic:"cultuur"},{level:"B2",topic:"toerisme"},{level:"B2",topic:"bijwoord"}],
          sentenceFilter: "all",
          readingTexts: ['r-b2-006'],
          activities: [
            { type: "grammatica", desc: "Dag 1–4: Leer idiomatische uitdrukkingen (10+): 'de kat uit de boom kijken', 'iets voor lief nemen', 'het hart op de tong hebben'.", descEn: "Day 1–4: Learn idiomatic expressions (10+): 'de kat uit de boom kijken', 'iets voor lief nemen', 'het hart op de tong hebben'." },
            { type: "grammatica", desc: "Dag 4–5: Leer 'iets/niets/wat + bijvoeglijk naamwoord + -s': 'iets leuks', 'niets bijzonders'.", descEn: "Day 4–5: Learn 'iets/niets/wat + adjective + -s': 'iets leuks', 'niets bijzonders'." },
            { type: "werkwoorden", desc: "Dag 1–4: Grote eindherhalingsronde: oefen werkwoorden 0–810 in alle tijden. Test 50 willekeurige werkwoorden.", descEn: "Day 1–4: Major final revision round: practise verbs 0–810 in all tenses. Test 50 random verbs." },
            { type: "zinnen", desc: "Dag 5–10: Oefen alle zinstypen op B2-niveau: passief, conditionaal, indirecte rede, bijzinnen, idioom, iets/niets + -s.", descEn: "Day 5–10: Practise all sentence types at B2 level: passive, conditional, reported speech, clauses, idioms, iets/niets + -s." },
            { type: "woordenschat", desc: "Dag 7–11: Herhaal alle woordenschatcategorieën A1–B2. Doel: 500 woorden actief beheersen.", descEn: "Day 7–11: Revise all vocabulary categories A1–B2. Goal: actively master 500 words." },
            { type: "zinnen", desc: "Dag 10–14: Schrijf een essay van 300 woorden over een maatschappelijk thema. Gebruik alle B2-structuren en minstens 3 idiomen.", descEn: "Day 10–14: Write an essay of 300 words about a societal topic. Use all B2 structures and at least 3 idioms." }
          ],
          goals: ["10+ idiomatische uitdrukkingen correct gebruiken.", "De extra -s na iets/niets/wat correct toepassen.", "50 werkwoorden in alle tijden foutloos vervoegen.", "500 woorden actief beheersen.", "Een essay van 300 woorden schrijven op B2-niveau.", "B2 afgerond: effectieve taalvaardigheid in alle situaties."],
          goalsEn: ["Correctly use 10+ idiomatic expressions.", "Correctly apply the extra -s after iets/niets/wat.", "Conjugate 50 verbs in all tenses without errors.", "Actively master 500 words.", "Write an essay of 300 words at B2 level.", "B2 complete: effective language proficiency in all situations."]
        }
      ]
    }
  ]
};
