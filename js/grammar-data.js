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
  intro: "Een intensief leerplan: 12 weken naar B1 (1 unit per week), daarna 12 weken naar B2 (2 weken per unit). Elke unit bevat werkwoorden, grammatica en woordenschat met een dagelijkse structuur.",
  introEn: "An intensive study plan: 12 weeks to B1 (1 unit per week), then 12 weeks to B2 (2 weeks per unit). Each unit includes verbs, grammar and vocabulary with a daily structure.",
  levels: [
    {
      level: "A1", title: "Beginner", duration: "3 weken", durationEn: "3 weeks", color: "#276047",
      units: [
        {
          unit: 1, title: "De basis: jezelf voorstellen", titleEn: "The basics: introducing yourself", weeks: "Week 1",
          grammarTopics: ["persoonlijke-vnw", "vraagwoorden", "lidwoorden-meervoud", "telwoorden"],
          verbRange: [0, 48],
          verbFocus: ["zijn", "hebben", "worden", "kunnen", "willen", "moeten", "gaan", "komen", "doen", "zien", "zeggen", "maken"],
          vocabTopics: [{level:"A1",topic:"begroeting"},{level:"A1",topic:"familie"},{level:"A1",topic:"vraagwoorden"},{level:"A1",topic:"tijd"},{level:"A1",topic:"werkwoorden"}],
          sentenceFilter: "vraagzin",
          readingTexts: [],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer persoonlijke voornaamwoorden (ik, jij, hij, zij, wij, jullie, zij) en vraagwoorden (wie, wat, waar, wanneer, hoe) in de Grammatica-sectie.", descEn: "Day 1–2: Study personal pronouns (ik, jij, hij, zij, wij, jullie, zij) and question words (wie, wat, waar, wanneer, hoe) in the Grammar section." },
            { type: "grammatica", desc: "Dag 3–4: Bestudeer lidwoorden (de/het) en meervoudsvormen (-en, -s, -eren). Oefen telwoorden 1–100.", descEn: "Day 3–4: Study articles (de/het) and plural forms (-en, -s, -eren). Practise numbers 1–100." },
            { type: "werkwoorden", desc: "Dag 1–4: Oefen zijn & hebben in OTT via de conjugatietool. Voeg elke dag 2 nieuwe werkwoorden toe.", descEn: "Day 1–4: Practise zijn & hebben in OTT via the conjugation tool. Add 2 new verbs each day." },
            { type: "zinnen", desc: "Dag 3–5: Oefen A1-vraagzinnen: stel jezelf voor, vraag naar naam, leeftijd en woonplaats.", descEn: "Day 3–5: Practise A1 question sentences: introduce yourself, ask about name, age and place of residence." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 40 begroetings- en familiewoorden. Gebruik de woordenschatlijst en test jezelf.", descEn: "Day 5–7: Learn 40 greetings and family words. Use the vocabulary list and test yourself." },
            { type: "dehet", desc: "Dag 6–7: Train de/het met de De/Het oefentool — doel: 30 woorden correct.", descEn: "Day 6–7: Train de/het with the De/Het exercise tool — goal: 30 words correct." }
          ],
          goals: ["Jezelf voorstellen: naam, leeftijd, land en taal.", "10 vraagwoorden kennen en gebruiken in zinnen.", "Zijn en hebben correct vervoegen in OTT (alle personen).", "Tellen tot 100 en getallen herkennen.", "40 basiswoorden kennen (begroeting, familie, tijd)."],
          goalsEn: ["Introduce yourself: name, age, country and language.", "Know 10 question words and use them in sentences.", "Correctly conjugate zijn and hebben in OTT (all persons).", "Count to 100 and recognise numbers.", "Know 40 basic words (greetings, family, time)."]
        },
        {
          unit: 2, title: "Dagelijks leven", titleEn: "Daily life", weeks: "Week 2",
          grammarTopics: ["bezittelijke-vnw", "ontkenning", "verkleinwoorden", "voorzetsels-a1"],
          verbRange: [49, 97],
          verbFocus: ["geven", "nemen", "helpen", "eten", "drinken", "slapen", "zitten", "staan", "kopen", "dragen", "wonen", "werken"],
          vocabTopics: [{level:"A1",topic:"eten"},{level:"A1",topic:"huis"},{level:"A1",topic:"kleding"},{level:"A1",topic:"lichaam"},{level:"A1",topic:"voorzetsels"},{level:"A1",topic:"kleuren"}],
          sentenceFilter: "niet",
          readingTexts: [],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer bezittelijke voornaamwoorden (mijn, jouw, zijn, haar, ons, hun) en ontkenning (niet/geen).", descEn: "Day 1–2: Study possessive pronouns (mijn, jouw, zijn, haar, ons, hun) and negation (niet/geen)." },
            { type: "grammatica", desc: "Dag 3–4: Leer verkleinwoorden (-je, -tje, -pje, -etje) en voorzetsels van plaats (in, op, aan, bij, naar).", descEn: "Day 3–4: Learn diminutives (-je, -tje, -pje, -etje) and prepositions of place (in, op, aan, bij, naar)." },
            { type: "werkwoorden", desc: "Dag 1–5: Oefen 10 dagelijkse werkwoorden in OTT: typ zelf de vervoegingen. Doel: foutloos 8 van 10.", descEn: "Day 1–5: Practise 10 daily verbs in OTT: type the conjugations yourself. Goal: 8 of 10 error-free." },
            { type: "dehet", desc: "Dag 3–5: Train de/het voor huis- en kledingwoorden (30 nieuwe woorden).", descEn: "Day 3–5: Train de/het for house and clothing words (30 new words)." },
            { type: "zinnen", desc: "Dag 4–6: Oefen ontkenningszinnen: 'Ik heb geen...', 'Hij woont niet in...'.", descEn: "Day 4–6: Practise negation sentences: 'Ik heb geen...', 'Hij woont niet in...'." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 50 woorden over eten, huis en kleding. Herhaal ook week 1 woorden.", descEn: "Day 5–7: Learn 50 words about food, house and clothing. Also revise week 1 words." }
          ],
          goals: ["Bezittelijke voornaamwoorden correct gebruiken in 10 zinnen.", "Zinnen ontkennen met niet en geen zonder fouten.", "15 verkleinwoorden correct vormen.", "8 voorzetsels van plaats gebruiken in context.", "50 nieuwe woorden leren (eten, huis, kleding)."],
          goalsEn: ["Use possessive pronouns correctly in 10 sentences.", "Negate sentences with niet and geen without errors.", "Correctly form 15 diminutives.", "Use 8 prepositions of place in context.", "Learn 50 new words (food, house, clothing)."]
        },
        {
          unit: 3, title: "A1 Herhaling & consolidatie", titleEn: "A1 Review & consolidation", weeks: "Week 3",
          grammarTopics: ["hebben-of-zijn", "persoonlijke-vnw", "bezittelijke-vnw", "lidwoorden-meervoud", "vraagwoorden", "ontkenning", "verkleinwoorden", "voorzetsels-a1", "telwoorden"],
          verbRange: [0, 146],
          verbFocus: ["zijn", "hebben", "gaan", "komen", "fietsen", "lopen", "maken", "leren", "praten", "spelen", "kijken", "lezen"],
          vocabTopics: [{level:"A1",topic:"dieren"},{level:"A1",topic:"weer"},{level:"A1",topic:"vervoer"},{level:"A1",topic:"bijvoeglijk"},{level:"A1",topic:"werkwoorden"}],
          sentenceFilter: "all",
          readingTexts: [],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer 'Hebben of zijn?' — leer de BAGS-regel (Beweging, Aard, Grootte, Staat) voor de VTT.", descEn: "Day 1–2: Study 'Hebben or zijn?' — learn the BAGS rule (Movement, Nature, Size, State) for the perfect tense." },
            { type: "werkwoorden", desc: "Dag 1–3: Oefen VTT met zijn-werkwoorden (gaan, komen, fietsen, lopen) en hebben-werkwoorden (maken, kijken, lezen).", descEn: "Day 1–3: Practise VTT with zijn verbs (gaan, komen, fietsen, lopen) and hebben verbs (maken, kijken, lezen)." },
            { type: "werkwoorden", desc: "Dag 3–5: Herhaal alle werkwoorden 0–146 in OTT. Test: conjugeer 20 willekeurige werkwoorden foutloos.", descEn: "Day 3–5: Revise all verbs 0–146 in OTT. Test: conjugate 20 random verbs without errors." },
            { type: "zinnen", desc: "Dag 4–5: Oefen alle A1-zinstypen: mededelingen, vragen en ontkenningen. Mix alle grammatica.", descEn: "Day 4–5: Practise all A1 sentence types: statements, questions and negations. Mix all grammar." },
            { type: "woordenschat", desc: "Dag 5–6: Herhaal alle A1-woordenschat (dieren, weer, vervoer). Doel: 120 woorden herkennen.", descEn: "Day 5–6: Revise all A1 vocabulary (animals, weather, transport). Goal: recognise 120 words." },
            { type: "dehet", desc: "Dag 6–7: Eindtoets de/het: test 50 woorden. Doel: minstens 80% correct.", descEn: "Day 6–7: Final de/het test: test 50 words. Goal: at least 80% correct." }
          ],
          goals: ["De BAGS-regel toepassen: hebben of zijn in de VTT.", "20 werkwoorden foutloos vervoegen in OTT.", "Alle A1-grammatica combineren in vrije zinnen.", "120 A1-woorden herkennen en gebruiken.", "A1 afgerond: basisgesprekken zelfstandig voeren."],
          goalsEn: ["Apply the BAGS rule: hebben or zijn in the perfect tense.", "Conjugate 20 verbs in OTT without errors.", "Combine all A1 grammar in free sentences.", "Recognise and use 120 A1 words.", "A1 complete: hold basic conversations independently."]
        }
      ]
    },
    {
      level: "A2", title: "Elementair", duration: "4 weken", durationEn: "4 weeks", color: "#1B3D7A",
      units: [
        {
          unit: 4, title: "De verleden tijd", titleEn: "The past tense", weeks: "Week 4",
          grammarTopics: ["bijvoeglijk-nw"],
          verbRange: [147, 195],
          verbFocus: ["werken", "maken", "proberen", "vertellen", "wachten", "veranderen", "zoeken", "betalen", "vergeten", "beginnen", "kiezen", "brengen"],
          vocabTopics: [{level:"A2",topic:"werkwoorden"},{level:"A2",topic:"dagelijks"},{level:"A2",topic:"gezondheid"},{level:"A2",topic:"hobby"},{level:"A2",topic:"kleding"}],
          sentenceFilter: "tijden",
          readingTexts: ['r-001', 'r-002', 'r-a2-005', 'r-a2-006'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer bijvoeglijke naamwoorden — buigingsregel: wel/geen -e (een groot huis, de grote kamer).", descEn: "Day 1–2: Study adjective inflection rule: with/without -e (een groot huis, de grote kamer)." },
            { type: "werkwoorden", desc: "Dag 1–3: Leer OVT (onvoltooid verleden tijd) — regelmatige werkwoorden: stam + -te(n)/-de(n). Oefen 15 werkwoorden.", descEn: "Day 1–3: Learn OVT (simple past) — regular verbs: stem + -te(n)/-de(n). Practise 15 verbs." },
            { type: "werkwoorden", desc: "Dag 3–5: Leer OVT onregelmatige werkwoorden (ging, kwam, was, had). Oefen via Typ zelf modus.", descEn: "Day 3–5: Learn OVT irregular verbs (ging, kwam, was, had). Practise via Type yourself mode." },
            { type: "zinnen", desc: "Dag 4–6: Oefen A2-zinnen in OVT: vertel wat je gisteren deed. Gebruik bijvoeglijke naamwoorden.", descEn: "Day 4–6: Practise A2 sentences in OVT: tell what you did yesterday. Use adjectives." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 40 dagelijkse en gezondheidswoorden. Oefen bijvoeglijke naamwoorden bij de/het-woorden.", descEn: "Day 5–7: Learn 40 daily and health words. Practise adjectives with de/het words." },
            { type: "dehet", desc: "Dag 6–7: Train de/het met bijvoeglijk naamwoord erbij — 'de grote tafel' of 'het grote huis'?", descEn: "Day 6–7: Train de/het with adjective added — 'de grote tafel' or 'het grote huis'?" }
          ],
          goals: ["OVT vormen van minstens 20 werkwoorden (regelmatig + onregelmatig).", "Bijvoeglijke naamwoorden correct verbuigen bij de- en het-woorden.", "Een kort verhaal in de verleden tijd vertellen (8+ zinnen).", "40 nieuwe A2-woorden kennen."],
          goalsEn: ["Form OVT of at least 20 verbs (regular + irregular).", "Correctly inflect adjectives with de and het words.", "Tell a short story in the past tense (8+ sentences).", "Know 40 new A2 words."]
        },
        {
          unit: 5, title: "Meningen & vergelijkingen", titleEn: "Opinions & comparisons", weeks: "Week 5",
          grammarTopics: ["vergrotende-trap", "nevenschikkende-vgw"],
          verbRange: [196, 252],
          verbFocus: ["vinden", "denken", "geloven", "lijken", "houden", "voelen", "weten", "menen", "vergelijken", "betekenen", "hopen", "verwachten"],
          vocabTopics: [{level:"A2",topic:"bijvoeglijk"},{level:"A2",topic:"sport"},{level:"A2",topic:"natuur"},{level:"A2",topic:"winkelen"},{level:"A2",topic:"verbindingswoorden"}],
          sentenceFilter: "all",
          readingTexts: ['r-003', 'r-004', 'r-a2-007', 'r-a2-008'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Leer de vergrotende trap (-er) en overtreffende trap (-st). Onregelmatig: goed-beter-best, veel-meer-meest.", descEn: "Day 1–2: Learn comparative (-er) and superlative (-st). Irregular: goed-beter-best, veel-meer-meest." },
            { type: "grammatica", desc: "Dag 3–4: Bestudeer nevenschikkende voegwoorden: en, maar, want, dus, of, toch. Oefen de woordvolgorde (geen inversie).", descEn: "Day 3–4: Study coordinating conjunctions: en, maar, want, dus, of, toch. Practise word order (no inversion)." },
            { type: "werkwoorden", desc: "Dag 2–5: Oefen vinden, denken, geloven in OTT en OVT. Combineer met meningen: 'Ik vind dat...'.", descEn: "Day 2–5: Practise vinden, denken, geloven in OTT and OVT. Combine with opinions: 'Ik vind dat...'." },
            { type: "zinnen", desc: "Dag 4–6: Oefen zinnen met maar, want, dus en toch. Maak vergelijkingen: 'Amsterdam is groter dan Utrecht.'", descEn: "Day 4–6: Practise sentences with maar, want, dus and toch. Make comparisons: 'Amsterdam is groter dan Utrecht.'" },
            { type: "woordenschat", desc: "Dag 5–7: Leer 30 bijvoeglijke naamwoorden en 20 sport/natuurwoorden. Oefen vergelijkingen.", descEn: "Day 5–7: Learn 30 adjectives and 20 sport/nature words. Practise comparisons." }
          ],
          goals: ["Vergrotende en overtreffende trap correct gebruiken (incl. 5 onregelmatige).", "6 nevenschikkende voegwoorden kennen en toepassen.", "Meningen geven met 'Ik vind dat...', 'Ik denk dat...'.", "50 nieuwe woorden kennen (bijvoeglijk, sport, natuur)."],
          goalsEn: ["Use comparative and superlative correctly (incl. 5 irregular ones).", "Know and apply 6 coordinating conjunctions.", "Give opinions with 'Ik vind dat...', 'Ik denk dat...'.", "Know 50 new words (adjectives, sport, nature)."]
        },
        {
          unit: 6, title: "Complexe zinnen", titleEn: "Complex sentences", weeks: "Week 6",
          grammarTopics: ["scheidbare-werkwoorden", "onderschikkende-vgw-1", "er-systeem", "voorzetsels-a2"],
          verbRange: [253, 301],
          verbFocus: ["oplossen", "opbellen", "aankomen", "uitgaan", "vertrekken", "meenemen", "terugkomen", "afspreken", "opstaan", "instappen", "uitleggen", "opruimen"],
          vocabTopics: [{level:"A2",topic:"reizen"},{level:"A2",topic:"voorzetsels"},{level:"A2",topic:"communicatie"},{level:"A2",topic:"dagelijks"},{level:"A2",topic:"werkwoorden"}],
          sentenceFilter: "scheidbare-werkwoorden",
          readingTexts: ['r-a2-001', 'r-a2-002', 'r-a2-003', 'r-a2-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer scheidbare werkwoorden: prefix schuift naar het einde in een hoofdzin; prefix + stam blijven samen in een bijzin.", descEn: "Day 1–2: Study separable verbs: prefix moves to the end in a main clause; prefix + stem stay together in a sub. clause." },
            { type: "grammatica", desc: "Dag 2–3: Leer het voltooid deelwoord van scheidbare werkwoorden: ge- tussen prefix en VD (op+ge+staan = opgestaan). Oefen 10 werkwoorden.", descEn: "Day 2–3: Learn the past participle of separable verbs: ge- between prefix and stem (op+ge+staan = opgestaan). Practise 10 verbs." },
            { type: "grammatica", desc: "Dag 3–4: Bestudeer onderschikkende voegwoorden (omdat, als, dat, terwijl, toen) — werkwoord naar het einde!", descEn: "Day 3–4: Study subordinating conjunctions (omdat, als, dat, terwijl, toen) — verb to the end!" },
            { type: "grammatica", desc: "Dag 4–5: Leer het er-systeem en A2-voorzetsels (sinds, tijdens, vanwege, ondanks).", descEn: "Day 4–5: Learn the er system and A2 prepositions (sinds, tijdens, vanwege, ondanks)." },
            { type: "werkwoorden", desc: "Dag 2–4: Oefen scheidbare werkwoorden (opstaan, opbellen, meenemen, uitleggen, afspreken) in OTT, OVT en VTT.", descEn: "Day 2–4: Practise separable verbs (opstaan, opbellen, meenemen, uitleggen, afspreken) in OTT, OVT and VTT." },
            { type: "zinnen", desc: "Dag 3–5: Oefen scheidbare werkwoorden in Zinnen oefenen → filter 'Scheidbare ww.' — focus op prefix-naar-einde en VTT-vormen.", descEn: "Day 3–5: Practise separable verbs in Zinnen oefenen → filter 'Scheidbare ww.' — focus on prefix-to-end and perfect tense forms." },
            { type: "zinnen", desc: "Dag 5–7: Oefen bijzinnen met omdat, als en dat. Let op: in bijzin blijft scheidbaar werkwoord samen aan het einde.", descEn: "Day 5–7: Practise sub. clauses with omdat, als and dat. Note: in a sub. clause the separable verb stays together at the end." },
            { type: "woordenschat", desc: "Dag 6–7: Leer 40 reis- en communicatiewoorden. Oefen voorzetsels in context.", descEn: "Day 6–7: Learn 40 travel and communication words. Practise prepositions in context." }
          ],
          goals: ["Bijzinnen vormen met 5 onderschikkende voegwoorden (correcte woordvolgorde).", "4 functies van 'er' herkennen en toepassen.", "10 scheidbare werkwoorden correct gebruiken in hoofd- en bijzinnen.", "A2-voorzetsels van tijd en abstractie gebruiken."],
          goalsEn: ["Form subordinate clauses with 5 subordinating conjunctions (correct word order).", "Recognise and apply 4 functions of 'er'.", "Correctly use 10 separable verbs in main and subordinate clauses.", "Use A2 prepositions of time and abstraction."]
        },
        {
          unit: 7, title: "A2 Herhaling & consolidatie", titleEn: "A2 Review & consolidation", weeks: "Week 7",
          grammarTopics: ["object-vnw", "formeel-u", "telwoorden", "bijvoeglijk-nw", "vergrotende-trap", "nevenschikkende-vgw", "onderschikkende-vgw-1", "er-systeem", "voorzetsels-a2", "scheidbare-werkwoorden"],
          verbRange: [0, 349],
          verbFocus: ["werken", "studeren", "solliciteren", "presenteren", "overleggen", "samenwerken", "verdienen", "zich voorstellen", "zich aanmelden", "vergaderen", "beoordelen", "organiseren"],
          vocabTopics: [{level:"A2",topic:"werk"},{level:"A2",topic:"onderwijs"},{level:"A2",topic:"geld"},{level:"A2",topic:"hobby"},{level:"A2",topic:"gezondheid"}],
          sentenceFilter: "all",
          readingTexts: ['r-001', 'r-002', 'r-003', 'r-004', 'r-a2-001', 'r-a2-002', 'r-a2-003', 'r-a2-004', 'r-a2-005', 'r-a2-006', 'r-a2-007', 'r-a2-008'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Leer voorwerpvoornaamwoorden (mij/me, jou/je, hem, haar, ons, hen/hun) en formeel 'u' (u, uw).", descEn: "Day 1–2: Learn object pronouns (mij/me, jou/je, hem, haar, ons, hen/hun) and formal 'u' (u, uw)." },
            { type: "grammatica", desc: "Dag 2–3: Herhaal telwoorden: rangtelwoorden (eerste, tweede), breuken, percentages, data.", descEn: "Day 2–3: Revise numbers: ordinal numbers (eerste, tweede), fractions, percentages, dates." },
            { type: "werkwoorden", desc: "Dag 3–5: Grote herhalingsronde: oefen werkwoorden 0–339 in OTT, OVT en VTT. Test 30 willekeurige werkwoorden.", descEn: "Day 3–5: Major revision round: practise verbs 0–339 in OTT, OVT and VTT. Test 30 random verbs." },
            { type: "zinnen", desc: "Dag 4–6: Oefen formele zinnen: 'Kunt u mij helpen?', 'Zou u dat willen herhalen?'. Mix alle A2-grammatica.", descEn: "Day 4–6: Practise formal sentences: 'Kunt u mij helpen?', 'Zou u dat willen herhalen?'. Mix all A2 grammar." },
            { type: "woordenschat", desc: "Dag 5–6: Herhaal alle A2-woordenschat. Doel: 200 woorden herkennen (A1+A2 samen).", descEn: "Day 5–6: Revise all A2 vocabulary. Goal: recognise 200 words (A1+A2 together)." },
            { type: "dehet", desc: "Dag 6–7: De/het eindtoets A2: test 80 woorden. Doel: minstens 85% correct.", descEn: "Day 6–7: De/het final test A2: test 80 words. Goal: at least 85% correct." }
          ],
          goals: ["Voorwerpvoornaamwoorden correct plaatsen in zinnen.", "Formeel taalgebruik toepassen (u, uw) in 10 zinnen.", "Telwoorden gebruiken: rang, breuken en data.", "30 werkwoorden vervoegen in OTT, OVT en VTT zonder fouten.", "A2 afgerond: dagelijkse communicatie zelfstandig voeren."],
          goalsEn: ["Correctly place object pronouns in sentences.", "Apply formal register (u, uw) in 10 sentences.", "Use numbers: ordinals, fractions and dates.", "Conjugate 30 verbs in OTT, OVT and VTT without errors.", "A2 complete: hold daily communication independently."]
        }
      ]
    },
    {
      level: "B1", title: "Gemiddeld", duration: "5 weken", durationEn: "5 weeks", color: "#7A3B1B",
      units: [
        {
          unit: 8, title: "Passief & nieuws", titleEn: "Passive & news", weeks: "Week 8",
          grammarTopics: ["lijdende-vorm"],
          verbRange: [350, 375],
          verbFocus: ["worden", "schrijven", "publiceren", "bespreken", "organiseren", "protesteren", "besluiten", "bouwen", "sluiten", "openen", "vernieuwen", "verbieden"],
          vocabTopics: [{level:"B1",topic:"media"},{level:"B1",topic:"samenleving"},{level:"B1",topic:"politiek"},{level:"B1",topic:"milieu"},{level:"B1",topic:"natuur"},{level:"B1",topic:"technologie"}],
          sentenceFilter: "passief",
          readingTexts: ['r-b1-001', 'r-b1-002', 'r-b1-003', 'r-b1-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer de lijdende vorm in OTT (wordt + vd.) en OVT (werd + vd.). Leer het verschil met actief.", descEn: "Day 1–2: Study passive voice in OTT (wordt + pp) and OVT (werd + pp). Learn the difference with active." },
            { type: "grammatica", desc: "Dag 3–4: Leer worden-passief vs. zijn-passief. Oefen: 'Het huis wordt gebouwd' vs. 'Het huis is gebouwd'.", descEn: "Day 3–4: Learn worden passive vs. zijn passive. Practise: 'Het huis wordt gebouwd' vs. 'Het huis is gebouwd'." },
            { type: "werkwoorden", desc: "Dag 2–4: Oefen 12 werkwoorden in passieve constructies. Gebruik de conjugatietool om voltooid deelwoorden te checken.", descEn: "Day 2–4: Practise 12 verbs in passive constructions. Use the conjugation tool to check past participles." },
            { type: "zinnen", desc: "Dag 4–6: Herschrijf 15 actieve zinnen als passieve zinnen. Oefen nieuwskoppen begrijpen.", descEn: "Day 4–6: Rewrite 15 active sentences as passive sentences. Practise understanding news headlines." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 40 media- en maatschappijwoorden. Lees een kort nieuwsbericht en markeer passieve zinnen.", descEn: "Day 5–7: Learn 40 media and society words. Read a short news article and mark passive sentences." }
          ],
          goals: ["Passieve zinnen vormen in OTT en OVT (foutloos bij 10 zinnen).", "Het verschil uitleggen tussen worden- en zijn-passief.", "Nieuwskoppen op B1-niveau begrijpen.", "40 media- en maatschappijwoorden kennen."],
          goalsEn: ["Form passive sentences in OTT and OVT (error-free for 10 sentences).", "Explain the difference between worden and zijn passive.", "Understand news headlines at B1 level.", "Know 40 media and society words."]
        },
        {
          unit: 9, title: "Verhalen & woordvolgorde", titleEn: "Storytelling & word order", weeks: "Week 9",
          grammarTopics: ["betrekkelijke-bijzin", "woordvolgorde-gevorderd"],
          verbRange: [376, 401],
          verbFocus: ["vertellen", "beschrijven", "herinneren", "vergeten", "beleven", "meemaken", "ontdekken", "ervaren", "overkomen", "herkennen", "zich realiseren", "opmerken"],
          vocabTopics: [{level:"B1",topic:"uitdrukkingen"},{level:"B1",topic:"verbinders"},{level:"B1",topic:"cultuur"},{level:"B1",topic:"reizen"},{level:"B1",topic:"collocaties"},{level:"B1",topic:"bijwoord"}],
          sentenceFilter: "bijzin",
          readingTexts: ['r-b1-001', 'r-b1-002', 'r-b1-003', 'r-b1-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Leer betrekkelijke bijzinnen: die (de-woorden), dat (het-woorden), wat (hele zinnen). Oefen 10 voorbeelden.", descEn: "Day 1–2: Learn relative clauses: die (de words), dat (het words), wat (whole sentences). Practise 10 examples." },
            { type: "grammatica", desc: "Dag 3–4: Bestudeer gevorderde woordvolgorde: inversie na bijwoord, tijd-wijze-plaats, tangconstructie.", descEn: "Day 3–4: Study advanced word order: inversion after adverb, time-manner-place, brace construction." },
            { type: "werkwoorden", desc: "Dag 2–5: Oefen VVT (voltooid verleden tijd: had + vd.) voor verhalen. Combineer OVT en VVT in een tekst.", descEn: "Day 2–5: Practise VVT (pluperfect: had + pp) for stories. Combine OVT and VVT in a text." },
            { type: "zinnen", desc: "Dag 4–6: Maak complexe zinnen met betrekkelijke bijzinnen. Gebruik 'waar + voorzetsel' voor dingen.", descEn: "Day 4–6: Create complex sentences with relative clauses. Use 'waar + preposition' for things." },
            { type: "woordenschat", desc: "Dag 5–6: Leer 30 narratieve verbindingswoorden en uitdrukkingen (vervolgens, daarnaast, kortom).", descEn: "Day 5–6: Learn 30 narrative linking words and expressions (vervolgens, daarnaast, kortom)." },
            { type: "zinnen", desc: "Dag 6–7: Schrijf een kort verhaal (100 woorden) met betrekkelijke bijzinnen, VVT en gevorderde woordvolgorde.", descEn: "Day 6–7: Write a short story (100 words) with relative clauses, VVT and advanced word order." }
          ],
          goals: ["Die, dat en wat correct gebruiken in betrekkelijke bijzinnen.", "Gevorderde woordvolgorde toepassen (inversie, tangconstructie).", "VVT gebruiken voor achtergrondinformatie in verhalen.", "30 verbindingswoorden kennen en gebruiken.", "Een kort verhaal van 100 woorden schrijven."],
          goalsEn: ["Use die, dat and wat correctly in relative clauses.", "Apply advanced word order (inversion, brace construction).", "Use VVT for background information in stories.", "Know and use 30 linking words.", "Write a short story of 100 words."]
        },
        {
          unit: 10, title: "Discussie & argumentatie", titleEn: "Discussion & argumentation", weeks: "Week 10",
          grammarTopics: ["indirecte-rede", "onderschikkende-vgw-2"],
          verbRange: [402, 430],
          verbFocus: ["zeggen", "beweren", "vragen", "antwoorden", "uitleggen", "overtuigen", "tegenspreken", "beargumenteren", "concluderen", "samenvatten", "toevoegen", "benadrukken"],
          vocabTopics: [{level:"B1",topic:"communicatie"},{level:"B1",topic:"onderwijs"},{level:"B1",topic:"bijvoeglijk"},{level:"B1",topic:"woordfamilie"},{level:"B1",topic:"verbindingswoorden"},{level:"B1",topic:"voorzetsels"}],
          sentenceFilter: "bijzin",
          readingTexts: ['r-b1-c-001', 'r-b1-c-002', 'r-b1-c-003', 'r-b1-c-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Leer indirecte rede: 'Hij zegt dat...', 'Ze vroeg of...'. Let op tijdsverschuiving en woordvolgorde.", descEn: "Day 1–2: Learn reported speech: 'Hij zegt dat...', 'Ze vroeg of...'. Pay attention to tense shift and word order." },
            { type: "grammatica", desc: "Dag 3–4: Bestudeer gevorderde onderschikkende voegwoorden: hoewel, tenzij, mits, zodat, doordat, naarmate.", descEn: "Day 3–4: Study advanced subordinating conjunctions: hoewel, tenzij, mits, zodat, doordat, naarmate." },
            { type: "werkwoorden", desc: "Dag 2–4: Oefen zeggen, beweren, vragen in alle tijden (OTT, OVT, VTT, VVT). Focus op tijdsverschuiving.", descEn: "Day 2–4: Practise zeggen, beweren, vragen in all tenses (OTT, OVT, VTT, VVT). Focus on tense shift." },
            { type: "zinnen", desc: "Dag 4–6: Oefen discussiezinnen met hoewel, tenzij en mits. Bouw argumenten op: stelling, argument, conclusie.", descEn: "Day 4–6: Practise discussion sentences with hoewel, tenzij and mits. Build arguments: thesis, argument, conclusion." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 30 argumentatieve woorden en woordfamilies (besluiten/besluit/beslissing, verklaren/verklaring).", descEn: "Day 5–7: Learn 30 argumentative words and word families (besluiten/besluit/beslissing, verklaren/verklaring)." }
          ],
          goals: ["Indirecte rede correct toepassen met tijdsverschuiving.", "6 gevorderde onderschikkende voegwoorden gebruiken.", "Een argument opbouwen: stelling, 2 argumenten, conclusie.", "30 argumentatieve woorden en 10 woordfamilies kennen."],
          goalsEn: ["Apply reported speech correctly with tense shift.", "Use 6 advanced subordinating conjunctions.", "Build an argument: thesis, 2 arguments, conclusion.", "Know 30 argumentative words and 10 word families."]
        },
        {
          unit: 11, title: "Plannen & wensen", titleEn: "Plans & wishes", weeks: "Week 11",
          grammarTopics: ["voorwaardelijke-wijs"],
          verbRange: [431, 456],
          verbFocus: ["zullen", "willen", "hopen", "verwachten", "plannen", "dromen", "wensen", "voorspellen", "twijfelen", "beslissen", "beloven", "voorstellen"],
          vocabTopics: [{level:"B1",topic:"gevoelens"},{level:"B1",topic:"abstract"},{level:"B1",topic:"werkwoorden"},{level:"B1",topic:"persoonlijkheid"},{level:"B1",topic:"psychologie"},{level:"B1",topic:"wonen"}],
          sentenceFilter: "all",
          readingTexts: ['r-b1-001', 'r-b1-002', 'r-b1-003', 'r-b1-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–2: Bestudeer de voorwaardelijke wijs: zou/zouden + infinitief. Verschil reeel (als het regent...) en irreeel (als ik rijk was...).", descEn: "Day 1–2: Study the conditional: zou/zouden + infinitive. Difference real (als het regent...) and unreal (als ik rijk was...)." },
            { type: "werkwoorden", desc: "Dag 2–4: Oefen modale werkwoorden in OVT voor beleefde vragen: zou, kon, mocht, wilde. Typ zelf modus.", descEn: "Day 2–4: Practise modal verbs in OVT for polite requests: zou, kon, mocht, wilde. Type yourself mode." },
            { type: "zinnen", desc: "Dag 3–5: Oefen als...dan-constructies: 10 reele en 10 irreele zinnen. Let op woordvolgorde in de bijzin.", descEn: "Day 3–5: Practise if...then constructions: 10 real and 10 unreal sentences. Pay attention to word order in the subordinate clause." },
            { type: "zinnen", desc: "Dag 5–6: Oefen wensen en plannen: 'Ik zou graag...', 'Als ik kon kiezen...', 'Ik hoop dat...'.", descEn: "Day 5–6: Practise wishes and plans: 'Ik zou graag...', 'Als ik kon kiezen...', 'Ik hoop dat...'." },
            { type: "woordenschat", desc: "Dag 5–7: Leer 30 woorden over gevoelens, persoonlijkheid en abstracte concepten.", descEn: "Day 5–7: Learn 30 words about feelings, personality and abstract concepts." }
          ],
          goals: ["Zou/zouden correct gebruiken voor beleefdheid en hypothese.", "10 reele en 10 irreele conditionaalzinnen maken.", "Modale werkwoorden in OVT gebruiken voor beleefde vragen.", "30 woorden over gevoelens en persoonlijkheid kennen."],
          goalsEn: ["Use zou/zouden correctly for politeness and hypothesis.", "Create 10 real and 10 unreal conditional sentences.", "Use modal verbs in OVT for polite requests.", "Know 30 words about feelings and personality."]
        },
        {
          unit: 12, title: "B1 Herhaling & consolidatie", titleEn: "B1 Review & consolidation", weeks: "Week 12",
          grammarTopics: ["lijdende-vorm", "betrekkelijke-bijzin", "indirecte-rede", "onderschikkende-vgw-2", "voorwaardelijke-wijs", "woordvolgorde-gevorderd"],
          verbRange: [350, 481],
          verbFocus: ["zijn", "hebben", "worden", "kunnen", "moeten", "willen", "zullen", "gaan", "komen", "laten", "doen", "blijven"],
          vocabTopics: [{level:"B1",topic:"economie"},{level:"B1",topic:"karakter"},{level:"B1",topic:"gezondheid"},{level:"B1",topic:"sport"},{level:"B1",topic:"relaties"},{level:"B1",topic:"werk"}],
          sentenceFilter: "all",
          readingTexts: ['r-b1-001', 'r-b1-002', 'r-b1-003', 'r-b1-004', 'r-b1-c-001', 'r-b1-c-002', 'r-b1-c-003', 'r-b1-c-004'],
          activities: [
            { type: "werkwoorden", desc: "Dag 1–2: Herhalingsronde alle tijden: oefen werkwoorden 340–466 in OTT, OVT, VTT, VVT. Test 20 werkwoorden.", descEn: "Day 1–2: Revision round all tenses: practise verbs 340–466 in OTT, OVT, VTT, VVT. Test 20 verbs." },
            { type: "grammatica", desc: "Dag 2–3: Herhaal alle B1-grammatica: passief, betrekkelijke bijzinnen, indirecte rede, conditionaal. Maak per onderwerp 3 zinnen.", descEn: "Day 2–3: Revise all B1 grammar: passive, relative clauses, reported speech, conditional. Make 3 sentences per topic." },
            { type: "zinnen", desc: "Dag 3–5: Mix-oefening: oefen alle zinstypen op B1-niveau. Combineer passief, bijzinnen en conditionaal in teksten.", descEn: "Day 3–5: Mix exercise: practise all sentence types at B1 level. Combine passive, clauses and conditional in texts." },
            { type: "woordenschat", desc: "Dag 4–5: Herhaal alle B1-woordenschat. Doel: 300 woorden herkennen (A1+A2+B1 samen).", descEn: "Day 4–5: Revise all B1 vocabulary. Goal: recognise 300 words (A1+A2+B1 together)." },
            { type: "zinnen", desc: "Dag 5–6: Schrijf een tekst van 150 woorden over een actueel onderwerp. Gebruik minstens 3 B1-grammaticastructuren.", descEn: "Day 5–6: Write a text of 150 words about a current topic. Use at least 3 B1 grammar structures." },
            { type: "werkwoorden", desc: "Dag 6–7: Eindtoets: conjugeer 30 willekeurige werkwoorden (0–466) in gevraagde tijd. Doel: 90% correct.", descEn: "Day 6–7: Final test: conjugate 30 random verbs (0–466) in requested tense. Goal: 90% correct." }
          ],
          goals: ["Alle B1-grammaticastructuren correct combineren in vrije tekst.", "30 werkwoorden in 4 tijden vervoegen met 90% score.", "300 woorden herkennen en actief gebruiken (A1–B1).", "Een samenhangende tekst van 150 woorden schrijven.", "B1 afgerond: zelfstandig communiceren over alle alledaagse themas."],
          goalsEn: ["Correctly combine all B1 grammar structures in free text.", "Conjugate 30 verbs in 4 tenses with 90% score.", "Recognise and actively use 300 words (A1–B1).", "Write a coherent text of 150 words.", "B1 complete: communicate independently on all everyday topics."]
        }
      ]
    },
    {
      level: "B2", title: "Gevorderd", duration: "12 weken", durationEn: "12 weeks", color: "#8B1C1C",
      units: [
        {
          unit: 13, title: "Formele communicatie", titleEn: "Formal communication", weeks: "Week 13–14",
          grammarTopics: ["formeel-zakelijk"],
          verbRange: [482, 551],
          verbFocus: ["verzoeken", "meedelen", "bevestigen", "informeren", "adviseren", "benadrukken", "toelichten", "rapporteren", "goedkeuren", "afwijzen"],
          vocabTopics: [{level:"B2",topic:"werk"},{level:"B2",topic:"communicatie"},{level:"B2",topic:"academisch"},{level:"B2",topic:"verbindingswoorden"},{level:"B2",topic:"woordfamilie"},{level:"B2",topic:"bijvoeglijk"}],
          sentenceFilter: "all",
          readingTexts: ['r-b2-001', 'r-b2-002', 'r-b2-003', 'r-b2-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–4: Bestudeer formeel zakelijk taalgebruik: nominalisatie, onpersoonlijke constructies, formele registers.", descEn: "Day 1–4: Study formal professional language: nominalisation, impersonal constructions, formal registers." },
            { type: "werkwoorden", desc: "Dag 3–7: Oefen formele werkwoorden in VTT en lijdende vorm. Schrijf 5 formele e-mails.", descEn: "Day 3–7: Practise formal verbs in perfect tense and passive. Write 5 formal emails." },
            { type: "zinnen", desc: "Dag 5–10: Analyseer en oefen formele zinsstructuren uit zakelijke teksten.", descEn: "Day 5–10: Analyse and practise formal sentence structures from business texts." },
            { type: "woordenschat", desc: "Dag 7–12: Leer 50 B2 zakelijke en formele woorden. Oefen woordfamilies.", descEn: "Day 7–12: Learn 50 B2 business and formal words. Practise word families." },
            { type: "zinnen", desc: "Dag 10–14: Schrijf een formele brief en een zakelijke e-mail. Gebruik nominalisaties en formeel register.", descEn: "Day 10–14: Write a formal letter and a business email. Use nominalisations and formal register." }
          ],
          goals: ["Formele brieven en e-mails schrijven op B2-niveau.", "Nominalisaties gebruiken in geschreven taal (10 voorbeelden).", "Zakelijk taalgebruik consistent toepassen.", "50 zakelijke B2-woorden kennen."],
          goalsEn: ["Write formal letters and emails at B2 level.", "Use nominalisations in written language (10 examples).", "Consistently apply professional language.", "Know 50 business B2 words."]
        },
        {
          unit: 14, title: "Hypothetische situaties", titleEn: "Hypothetical situations", weeks: "Week 15–16",
          grammarTopics: ["voltooide-voorwaardelijke"],
          verbRange: [552, 616],
          verbFocus: ["hebben", "zijn", "kunnen", "moeten", "willen", "zullen", "blijken", "schijnen", "behoren", "plegen"],
          vocabTopics: [{level:"B2",topic:"abstract"},{level:"B2",topic:"verbinders"},{level:"B2",topic:"uitdrukkingen"},{level:"B2",topic:"psychologie"},{level:"B2",topic:"gezondheid"},{level:"B2",topic:"collocaties"},{level:"B2",topic:"bijwoord"}],
          sentenceFilter: "all",
          readingTexts: ['r-b2-001', 'r-b2-002', 'r-b2-003', 'r-b2-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–4: Leer de voltooide voorwaardelijke wijs: zou hebben/zijn + voltooid deelwoord. Verschil met B1-conditionaal.", descEn: "Day 1–4: Learn the perfect conditional: zou hebben/zijn + past participle. Difference with B1 conditional." },
            { type: "werkwoorden", desc: "Dag 3–7: Oefen VVT gecombineerd met voorwaardelijke wijs. Gebruik alle modale werkwoorden.", descEn: "Day 3–7: Practise pluperfect combined with conditional mood. Use all modal verbs." },
            { type: "zinnen", desc: "Dag 5–10: Oefen 'als X was gebeurd, dan zou Y...'-constructies. Druk spijt en gemiste kansen uit.", descEn: "Day 5–10: Practise 'if X had happened, then Y would...'-constructions. Express regret and missed opportunities." },
            { type: "woordenschat", desc: "Dag 7–12: Leer 40 hypothetische en speculatieve uitdrukkingen en collocaties.", descEn: "Day 7–12: Learn 40 hypothetical and speculative expressions and collocations." },
            { type: "zinnen", desc: "Dag 10–14: Schrijf een reflectieve tekst (200 woorden) over 'wat als...'-scenario's.", descEn: "Day 10–14: Write a reflective text (200 words) about 'what if...' scenarios." }
          ],
          goals: ["Voltooide voorwaardelijke zinnen correct vormen.", "Spijt en gemiste kansen uitdrukken in 10 zinnen.", "Formele als-dan constructies zonder 'als' gebruiken.", "40 hypothetische uitdrukkingen kennen."],
          goalsEn: ["Correctly form perfect conditional sentences.", "Express regret and missed opportunities in 10 sentences.", "Use formal if-then constructions without 'als'.", "Know 40 hypothetical expressions."]
        },
        {
          unit: 15, title: "Media & cultuur", titleEn: "Media & culture", weeks: "Week 17–18",
          grammarTopics: ["idioom", "partitief"],
          verbRange: [617, 680],
          verbFocus: ["beschrijven", "beoordelen", "interpreteren", "analyseren", "beweren", "recenseren", "uitzenden", "publiceren", "kritiseren", "waarderen"],
          vocabTopics: [{level:"B2",topic:"media"},{level:"B2",topic:"uitdrukkingen"},{level:"B2",topic:"samenleving"},{level:"B2",topic:"technologie"},{level:"B2",topic:"onderwijs"},{level:"B2",topic:"wetenschap"},{level:"B2",topic:"natuur"}],
          sentenceFilter: "all",
          readingTexts: ['r-b2-001', 'r-b2-002', 'r-b2-003', 'r-b2-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–4: Leer idiomatische uitdrukkingen (10+): 'de knoop doorhakken', 'iets onder de knie krijgen', etc.", descEn: "Day 1–4: Learn idiomatic expressions (10+): 'de knoop doorhakken', 'iets onder de knie krijgen', etc." },
            { type: "grammatica", desc: "Dag 4–7: Bestudeer partitief gebruik: 'een van de', 'sommige van', 'de meeste van'. Oefen in zinnen.", descEn: "Day 4–7: Study partitive constructions: 'een van de', 'sommige van', 'de meeste van'. Practise in sentences." },
            { type: "werkwoorden", desc: "Dag 3–8: Oefen analytische werkwoorden (beschrijven, analyseren, interpreteren) in alle tijden.", descEn: "Day 3–8: Practise analytical verbs (beschrijven, analyseren, interpreteren) in all tenses." },
            { type: "zinnen", desc: "Dag 6–11: Analyseer mediaboodschappen. Schrijf een recensie (150 woorden) met idioom en partitief.", descEn: "Day 6–11: Analyse media messages. Write a review (150 words) with idioms and partitive." },
            { type: "woordenschat", desc: "Dag 8–14: Leer 50 media-, cultuur- en wetenschapswoorden.", descEn: "Day 8–14: Learn 50 media, culture and science words." }
          ],
          goals: ["10+ idiomatische uitdrukkingen correct gebruiken.", "Partitieve constructies toepassen in 10 zinnen.", "Een recensie schrijven van 150 woorden.", "50 media- en cultuurwoorden kennen."],
          goalsEn: ["Correctly use 10+ idiomatic expressions.", "Apply partitive constructions in 10 sentences.", "Write a review of 150 words.", "Know 50 media and culture words."]
        },
        {
          unit: 16, title: "Zakelijk Nederlands", titleEn: "Business Dutch", weeks: "Week 19–20",
          grammarTopics: ["gevorderd-passief"],
          verbRange: [681, 744],
          verbFocus: ["ondernemen", "uitvoeren", "vaststellen", "voorstellen", "aannemen", "investeren", "reguleren", "handhaven", "onderhandelen", "implementeren"],
          vocabTopics: [{level:"B2",topic:"economie"},{level:"B2",topic:"politiek"},{level:"B2",topic:"recht"},{level:"B2",topic:"milieu"},{level:"B2",topic:"abstract"},{level:"B2",topic:"verbinders"},{level:"B2",topic:"collocaties"}],
          sentenceFilter: "passief",
          readingTexts: ['r-b2-001', 'r-b2-002', 'r-b2-003', 'r-b2-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–4: Bestudeer gevorderd passief: modaal passief ('kan worden gedaan'), dubbel passief, passief met er.", descEn: "Day 1–4: Study advanced passive: modal passive ('kan worden gedaan'), double passive, passive with er." },
            { type: "werkwoorden", desc: "Dag 3–7: Oefen zakelijke werkwoorden in passieve en actieve constructies. Vergelijk formeel vs. informeel.", descEn: "Day 3–7: Practise business verbs in passive and active constructions. Compare formal vs. informal." },
            { type: "zinnen", desc: "Dag 5–10: Oefen zakelijke en formele zinsstructuren. Schrijf een vergaderverslag (200 woorden).", descEn: "Day 5–10: Practise business and formal sentence structures. Write meeting minutes (200 words)." },
            { type: "woordenschat", desc: "Dag 7–12: Leer 50 B2 zakelijke termen, juridische woorden en bedrijfsprocessen.", descEn: "Day 7–12: Learn 50 B2 business terms, legal words and company processes." },
            { type: "zinnen", desc: "Dag 10–14: Schrijf een zakelijk voorstel (200 woorden) met gevorderd passief en formeel register.", descEn: "Day 10–14: Write a business proposal (200 words) with advanced passive and formal register." }
          ],
          goals: ["Modaal passief correct vormen en gebruiken.", "Een vergaderverslag en zakelijk voorstel schrijven.", "50 zakelijke en juridische termen kennen.", "Scheidbare werkwoorden in formele context toepassen."],
          goalsEn: ["Correctly form and use modal passive.", "Write meeting minutes and a business proposal.", "Know 50 business and legal terms.", "Apply separable verbs in formal contexts."]
        },
        {
          unit: 17, title: "Academisch & wetenschap", titleEn: "Academic & science", weeks: "Week 21–22",
          grammarTopics: ["formeel-zakelijk", "gevorderd-passief"],
          verbRange: [745, 810],
          verbFocus: ["onderzoeken", "concluderen", "veronderstellen", "analyseren", "evalueren", "formuleren", "definiëren", "specificeren", "classificeren", "verifiëren"],
          vocabTopics: [{level:"B2",topic:"wetenschap"},{level:"B2",topic:"academisch"},{level:"B2",topic:"onderwijs"},{level:"B2",topic:"technologie"},{level:"B2",topic:"natuur"},{level:"B2",topic:"woordfamilie"}],
          sentenceFilter: "all",
          readingTexts: ['r-b2-001', 'r-b2-002', 'r-b2-003', 'r-b2-004'],
          activities: [
            { type: "grammatica", desc: "Dag 1–5: Herhaal formeel-zakelijk en gevorderd passief in academische context. Leer academische zinsconstructies.", descEn: "Day 1–5: Revise formal-professional and advanced passive in academic context. Learn academic sentence constructions." },
            { type: "werkwoorden", desc: "Dag 3–8: Oefen academische werkwoorden in alle tijden en passieve vormen.", descEn: "Day 3–8: Practise academic verbs in all tenses and passive forms." },
            { type: "zinnen", desc: "Dag 5–10: Analyseer wetenschappelijke teksten. Oefen academische structuren: hypothese, methode, conclusie.", descEn: "Day 5–10: Analyse scientific texts. Practise academic structures: hypothesis, method, conclusion." },
            { type: "woordenschat", desc: "Dag 7–12: Leer 50 academische en wetenschappelijke termen. Oefen woordfamilies.", descEn: "Day 7–12: Learn 50 academic and scientific terms. Practise word families." },
            { type: "zinnen", desc: "Dag 10–14: Schrijf een kort wetenschappelijk verslag (250 woorden) met correcte structuur.", descEn: "Day 10–14: Write a short scientific report (250 words) with correct structure." }
          ],
          goals: ["Academische zinnen correct formuleren.", "50 academische en wetenschappelijke termen kennen.", "Een wetenschappelijk verslag van 250 woorden schrijven.", "Woordfamilies herkennen en productief gebruiken."],
          goalsEn: ["Correctly formulate academic sentences.", "Know 50 academic and scientific terms.", "Write a scientific report of 250 words.", "Recognise and productively use word families."]
        },
        {
          unit: 18, title: "Integratie & eindtoets", titleEn: "Integration & final test", weeks: "Week 23–24",
          grammarTopics: ["voltooide-voorwaardelijke", "gevorderd-passief", "idioom", "partitief", "formeel-zakelijk"],
          verbRange: [0, 810],
          verbFocus: ["zijn", "hebben", "worden", "kunnen", "moeten", "willen", "zullen", "blijken", "schijnen", "laten", "doen", "gaan"],
          vocabTopics: [{level:"B2",topic:"bijvoeglijk"},{level:"B2",topic:"bijwoord"},{level:"B2",topic:"collocaties"},{level:"B2",topic:"verbinders"},{level:"B2",topic:"uitdrukkingen"},{level:"B2",topic:"woordfamilie"},{level:"B2",topic:"academisch"},{level:"B2",topic:"communicatie"}],
          sentenceFilter: "all",
          readingTexts: ['r-b2-001', 'r-b2-002', 'r-b2-003', 'r-b2-004'],
          activities: [
            { type: "werkwoorden", desc: "Dag 1–4: Grote eindherhalingsronde: oefen werkwoorden 0–788 in alle tijden. Test 50 willekeurige werkwoorden.", descEn: "Day 1–4: Major final revision round: practise verbs 0–788 in all tenses. Test 50 random verbs." },
            { type: "grammatica", desc: "Dag 3–7: Controleer zwakke punten via alle grammaticasecties A1–B2. Maak per onderwerp 5 oefenzinnen.", descEn: "Day 3–7: Check weak points via all grammar sections A1–B2. Make 5 practice sentences per topic." },
            { type: "zinnen", desc: "Dag 5–10: Oefen alle zinstypen op B2-niveau: passief, conditionaal, indirecte rede, bijzinnen, idioom.", descEn: "Day 5–10: Practise all sentence types at B2 level: passive, conditional, reported speech, clauses, idioms." },
            { type: "woordenschat", desc: "Dag 7–11: Herhaal alle woordenschatcategorieën A1–B2. Doel: 500 woorden actief beheersen.", descEn: "Day 7–11: Revise all vocabulary categories A1–B2. Goal: actively master 500 words." },
            { type: "zinnen", desc: "Dag 10–14: Schrijf een essay van 300 woorden over een maatschappelijk thema. Gebruik alle B2-structuren.", descEn: "Day 10–14: Write an essay of 300 words about a societal topic. Use all B2 structures." }
          ],
          goals: ["Alle grammaticaonderwerpen A1–B2 beheersen.", "50 werkwoorden in alle tijden foutloos vervoegen.", "500 woorden actief beheersen.", "Een essay van 300 woorden schrijven op B2-niveau.", "B2 afgerond: effectieve taalvaardigheid in alle situaties."],
          goalsEn: ["Master all grammar topics A1–B2.", "Conjugate 50 verbs in all tenses without errors.", "Actively master 500 words.", "Write an essay of 300 words at B2 level.", "B2 complete: effective language proficiency in all situations."]
        }
      ]
    }
  ]
};
