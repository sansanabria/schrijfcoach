"""
Generate a Kindle-friendly A1/A2 Dutch reading content PDF.
Schrijfcoach — Nederlands Lezen (Dutch Reading)
Target: 3+ hours of reading content at A1/A2 level.
"""

from reportlab.lib.pagesizes import A5
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, KeepTogether, HRFlowable
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors

# --- Page setup (A5 = Kindle-friendly) ---
PAGE_W, PAGE_H = A5
MARGIN = 15 * mm

doc = SimpleDocTemplate(
    "Nederlands_Lezen_A1_A2.pdf",
    pagesize=A5,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=MARGIN, bottomMargin=MARGIN,
    title="Nederlands Lezen — A1/A2",
    author="Schrijfcoach",
    subject="Dutch reading practice for Kindle"
)

# --- Colors ---
GREEN_DARK = HexColor("#276047")
BLUE_DARK = HexColor("#1B3D7A")
GRAY_LIGHT = HexColor("#F0F0F0")
GRAY_MED = HexColor("#666666")
ORANGE = HexColor("#E8751A")

# --- Styles ---
styles = getSampleStyleSheet()

sTitle = ParagraphStyle("BookTitle", parent=styles["Title"],
    fontSize=22, leading=26, textColor=GREEN_DARK, spaceAfter=6*mm,
    alignment=TA_CENTER)

sSubtitle = ParagraphStyle("BookSubtitle", parent=styles["Normal"],
    fontSize=12, leading=16, textColor=GRAY_MED, alignment=TA_CENTER,
    spaceAfter=10*mm)

sChapter = ParagraphStyle("Chapter", parent=styles["Heading1"],
    fontSize=16, leading=20, textColor=GREEN_DARK, spaceBefore=8*mm,
    spaceAfter=4*mm)

sChapterA2 = ParagraphStyle("ChapterA2", parent=sChapter,
    textColor=BLUE_DARK)

sSection = ParagraphStyle("Section", parent=styles["Heading2"],
    fontSize=13, leading=16, textColor=ORANGE, spaceBefore=5*mm,
    spaceAfter=2*mm)

sBody = ParagraphStyle("Body", parent=styles["Normal"],
    fontSize=10.5, leading=15, alignment=TA_JUSTIFY, spaceAfter=2*mm)

sBodyNL = ParagraphStyle("BodyNL", parent=sBody,
    fontSize=11, leading=16, textColor=HexColor("#1a1a1a"))

sBodyEN = ParagraphStyle("BodyEN", parent=sBody,
    fontSize=9.5, leading=13, textColor=GRAY_MED, fontName="Helvetica-Oblique",
    spaceAfter=4*mm)

sTip = ParagraphStyle("Tip", parent=sBody,
    fontSize=9.5, leading=13, textColor=GREEN_DARK,
    leftIndent=8*mm, borderPadding=3*mm, spaceAfter=4*mm,
    fontName="Helvetica-Oblique")

sVocabNL = ParagraphStyle("VocabNL", parent=sBody,
    fontSize=10.5, leading=14, fontName="Helvetica-Bold")

sVocabEN = ParagraphStyle("VocabEN", parent=sBody,
    fontSize=9.5, leading=13, textColor=GRAY_MED)

sSmall = ParagraphStyle("Small", parent=sBody,
    fontSize=9, leading=12, textColor=GRAY_MED)

sRule = ParagraphStyle("Rule", parent=sBody,
    fontSize=10, leading=14, leftIndent=5*mm, textColor=HexColor("#333333"),
    spaceAfter=1.5*mm)

sTableHeader = ParagraphStyle("TableH", parent=sBody,
    fontSize=9, leading=12, fontName="Helvetica-Bold", textColor=colors.white)

sTableCell = ParagraphStyle("TableC", parent=sBody,
    fontSize=9, leading=12)

sTOC = ParagraphStyle("TOC", parent=sBody,
    fontSize=10.5, leading=18, spaceAfter=0)

story = []

# === HELPERS ===
def hr():
    story.append(HRFlowable(width="100%", thickness=0.5, color=GRAY_MED,
                             spaceBefore=3*mm, spaceAfter=3*mm))

def nl_en(nl_text, en_text):
    story.append(Paragraph(nl_text, sBodyNL))
    story.append(Paragraph(en_text, sBodyEN))

def section(title):
    story.append(Paragraph(title, sSection))

def tip(text):
    story.append(Paragraph(f"<b>Tip:</b> {text}", sTip))

def vocab_pair(nl, en):
    story.append(Paragraph(f"<b>{nl}</b> — {en}", sBody))

def grammar_table(headers, rows, col_widths=None):
    """Create a styled table."""
    # Build table data with Paragraphs for wrapping
    data = [[Paragraph(h, sTableHeader) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), sTableCell) for c in row])

    if col_widths is None:
        avail = PAGE_W - 2 * MARGIN
        col_widths = [avail / len(headers)] * len(headers)

    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), GREEN_DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.4, HexColor("#CCCCCC")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, GRAY_LIGHT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t)
    story.append(Spacer(1, 3*mm))


# ============================================================================
# COVER PAGE
# ============================================================================
story.append(Spacer(1, 30*mm))
story.append(Paragraph("Nederlands Lezen", sTitle))
story.append(Paragraph("Leesboek A1 / A2", ParagraphStyle("sub", parent=sSubtitle, fontSize=14)))
story.append(Spacer(1, 10*mm))
story.append(Paragraph("Schrijfcoach", sSubtitle))
story.append(Spacer(1, 20*mm))
story.append(Paragraph(
    "Verhalen, grammatica en woordenschat<br/>"
    "voor beginners en elementaire leerders<br/><br/>"
    "Stories, grammar and vocabulary<br/>"
    "for beginners and elementary learners",
    ParagraphStyle("coverdesc", parent=sBody, alignment=TA_CENTER, textColor=GRAY_MED, fontSize=10)))
story.append(PageBreak())


# ============================================================================
# TABLE OF CONTENTS
# ============================================================================
story.append(Paragraph("Inhoud / Contents", sChapter))
story.append(Spacer(1, 3*mm))

toc_items = [
    "Deel 1 — A1: De Basis (The Basics)",
    "  1. Jezelf voorstellen (Introducing yourself)",
    "  2. Mijn familie (My family)",
    "  3. Eten en drinken (Food and drink)",
    "  4. Mijn huis (My house)",
    "  5. De stad en het weer (The city and weather)",
    "  6. Kleding en kleuren (Clothing and colours)",
    "  7. Op reis (Travelling)",
    "  8. Grammatica A1 (Grammar reference)",
    "  9. Woordenlijst A1 (Vocabulary list)",
    "",
    "Deel 2 — A2: Dagelijks Leven (Daily Life)",
    "  10. Een dag in mijn leven (A day in my life)",
    "  11. Op het werk (At work)",
    "  12. Boodschappen doen (Grocery shopping)",
    "  13. Bij de dokter (At the doctor)",
    "  14. Sport en hobby (Sports and hobbies)",
    "  15. De natuur (Nature)",
    "  16. Meningen en gevoelens (Opinions and feelings)",
    "  17. Grammatica A2 (Grammar reference)",
    "  18. Woordenlijst A2 (Vocabulary list)",
    "",
    "Deel 3 — Oefeningen (Practice)",
    "  19. Niet en geen (Negation practice)",
    "  20. Woordvolgorde (Word order practice)",
    "  21. Gemengde zinnen (Mixed sentences)",
]

for item in toc_items:
    if item == "":
        story.append(Spacer(1, 2*mm))
    elif item.startswith("Deel"):
        story.append(Paragraph(f"<b>{item}</b>", sTOC))
    else:
        story.append(Paragraph(item, sTOC))

story.append(PageBreak())


# ============================================================================
# PART 1 — A1
# ============================================================================
story.append(Spacer(1, 20*mm))
story.append(Paragraph("Deel 1", ParagraphStyle("part", parent=sTitle, fontSize=18)))
story.append(Paragraph("A1: De Basis", sTitle))
story.append(Paragraph("The Basics", sSubtitle))
story.append(PageBreak())


# --- Chapter 1: Introducing yourself ---
story.append(Paragraph("1. Jezelf voorstellen", sChapter))
story.append(Paragraph("Introducing yourself", sSmall))
hr()

nl_en(
    "Hallo! Ik heet Sandra. Ik kom uit Paraguay, maar ik woon nu in Nederland. "
    "Ik spreek een beetje Nederlands. Ik leer elke dag nieuwe woorden. "
    "Aangenaam kennis te maken!",
    "Hello! My name is Sandra. I come from Paraguay, but I now live in the Netherlands. "
    "I speak a little Dutch. I learn new words every day. "
    "Nice to meet you!"
)

nl_en(
    "Goedemorgen, hoe gaat het met u? Mijn naam is Peter. Ik ben dertig jaar oud. "
    "Ik woon in Amsterdam en ik werk bij een bank. Ik spreek Nederlands en Engels. "
    "Wat is uw naam? Waar komt u vandaan?",
    "Good morning, how are you? My name is Peter. I am thirty years old. "
    "I live in Amsterdam and I work at a bank. I speak Dutch and English. "
    "What is your name? Where do you come from?"
)

section("Nuttige zinnen / Useful phrases")
vocab_pair("Hoe heet u?", "What is your name? (formal)")
vocab_pair("Ik heet...", "My name is...")
vocab_pair("Waar woont u?", "Where do you live?")
vocab_pair("Ik woon in...", "I live in...")
vocab_pair("Wat doet u?", "What do you do? (work)")
vocab_pair("Ik werk als...", "I work as...")
vocab_pair("Spreekt u Nederlands?", "Do you speak Dutch?")
vocab_pair("Ik spreek een beetje Nederlands.", "I speak a little Dutch.")

tip("In Dutch, the verb is always in the second position: "
    "<b>Ik woon</b> in Amsterdam. <b>Waar woont</b> u? "
    "This is called 'V2 word order'.")

nl_en(
    "Ik heet Maria. Ik ben vijfentwintig jaar oud. Ik kom uit Spanje, maar ik woon "
    "nu in Utrecht. Ik studeer aan de universiteit. Ik leer Nederlands omdat ik "
    "in Nederland wil werken. Het is moeilijk, maar ook heel leuk!",
    "My name is Maria. I am twenty-five years old. I come from Spain, but I now live "
    "in Utrecht. I study at the university. I am learning Dutch because I want to work "
    "in the Netherlands. It is difficult, but also very fun!"
)

nl_en(
    "Dit is mijn vriend Thomas. Hij is tweeendertig jaar oud. Hij komt uit Duitsland. "
    "Thomas werkt als programmeur bij een groot bedrijf. Hij spreekt Duits, Engels en "
    "een beetje Nederlands. Thomas woont in Den Haag. Hij fietst elke dag naar zijn werk.",
    "This is my friend Thomas. He is thirty-two years old. He comes from Germany. "
    "Thomas works as a programmer at a large company. He speaks German, English and "
    "a little Dutch. Thomas lives in The Hague. He cycles to work every day."
)


# --- Chapter 2: My family ---
story.append(PageBreak())
story.append(Paragraph("2. Mijn familie", sChapter))
story.append(Paragraph("My family", sSmall))
hr()

nl_en(
    "Ik heb een grote familie. Mijn moeder heet Rosa en mijn vader heet Carlos. "
    "Ik heb een broer en twee zussen. Mijn broer heet Juan en hij is ouder dan ik. "
    "Mijn zussen heten Ana en Lucia. Zij zijn jonger. Mijn oma woont bij ons in huis. "
    "Zij is achtenzestig jaar oud.",
    "I have a large family. My mother is called Rosa and my father is called Carlos. "
    "I have a brother and two sisters. My brother is called Juan and he is older than me. "
    "My sisters are called Ana and Lucia. They are younger. My grandmother lives with us. "
    "She is sixty-eight years old."
)

nl_en(
    "Wij hebben een hond en twee katten. De hond heet Max. Hij is bruin en wit. "
    "Max is heel lief en speelt graag in de tuin. De katten heten Luna en Simba. "
    "Luna is zwart en Simba is oranje. Zij slapen de hele dag op de bank.",
    "We have a dog and two cats. The dog is called Max. He is brown and white. "
    "Max is very sweet and likes to play in the garden. The cats are called Luna and Simba. "
    "Luna is black and Simba is orange. They sleep all day on the couch."
)

section("Familie woorden / Family words")
grammar_table(
    ["Nederlands", "English", "de / het"],
    [
        ["de vader", "father", "de"],
        ["de moeder", "mother", "de"],
        ["de broer", "brother", "de"],
        ["de zus", "sister", "de"],
        ["het kind", "child", "het"],
        ["de opa", "grandfather", "de"],
        ["de oma", "grandmother", "de"],
        ["de oom", "uncle", "de"],
        ["de tante", "aunt", "de"],
        ["het gezin", "family (household)", "het"],
    ]
)

nl_en(
    "Mijn vader werkt als ingenieur. Hij gaat elke dag met de auto naar zijn werk. "
    "Mijn moeder werkt als verpleegster in het ziekenhuis. Zij werkt soms 's nachts. "
    "Mijn broer studeert rechten aan de universiteit in Leiden. Hij woont op kamers.",
    "My father works as an engineer. He goes to work by car every day. "
    "My mother works as a nurse in the hospital. She sometimes works at night. "
    "My brother studies law at the university in Leiden. He lives in student accommodation."
)

tip("In Dutch, possessive pronouns: <b>mijn</b> (my), <b>jouw</b> (your), "
    "<b>zijn</b> (his), <b>haar</b> (her), <b>ons/onze</b> (our). "
    "Use <b>ons</b> before het-words: <b>ons huis</b>. Use <b>onze</b> before de-words: <b>onze auto</b>.")


# --- Chapter 3: Food and drink ---
story.append(PageBreak())
story.append(Paragraph("3. Eten en drinken", sChapter))
story.append(Paragraph("Food and drink", sSmall))
hr()

nl_en(
    "Elke ochtend eet ik brood met kaas. Ik drink een kopje koffie. Soms eet ik "
    "ook een ei bij het ontbijt. Mijn broer eet liever yoghurt met fruit. "
    "Hij drinkt altijd sinaasappelsap.",
    "Every morning I eat bread with cheese. I drink a cup of coffee. Sometimes I also "
    "eat an egg at breakfast. My brother prefers yoghurt with fruit. "
    "He always drinks orange juice."
)

nl_en(
    "We eten om zes uur 's avonds. Mijn moeder kookt vaak rijst met kip en groente. "
    "Soms eten we vis. Ik lust geen vis, maar ik eet wel vlees. "
    "Op vrijdag halen we soms patat van de snackbar. Dat is lekker!",
    "We eat at six o'clock in the evening. My mother often cooks rice with chicken and "
    "vegetables. Sometimes we eat fish. I don't like fish, but I do eat meat. "
    "On Fridays we sometimes get chips from the snack bar. That is tasty!"
)

nl_en(
    "Op zaterdag gaan we naar de markt. Daar kopen we verse groente en fruit. "
    "De appels zijn goedkoop: twee euro per kilo. De aardbeien zijn duurder. "
    "Wij kopen ook brood van de bakker. Het brood is vers en heel lekker.",
    "On Saturday we go to the market. There we buy fresh vegetables and fruit. "
    "The apples are cheap: two euros per kilo. The strawberries are more expensive. "
    "We also buy bread from the bakery. The bread is fresh and very tasty."
)

section("In het restaurant / At the restaurant")
nl_en(
    "Ober: Goedenavond! Heeft u gereserveerd?\n"
    "Sandra: Ja, een tafel voor twee personen, alstublieft.\n"
    "Ober: Natuurlijk. Hier is de menukaart. Wilt u iets drinken?\n"
    "Sandra: Ik wil graag een glas water en een kopje koffie.\n"
    "Ober: En voor u, meneer?\n"
    "Thomas: Ik neem een biertje, alstublieft.\n"
    "Ober: Weet u al wat u wilt eten?\n"
    "Sandra: Ja, ik neem de soep van de dag en daarna de vis.\n"
    "Thomas: Voor mij de salade en het biefstuk, alstublieft.\n"
    "Ober: Uitstekend! Ik breng eerst de drankjes.",
    "Waiter: Good evening! Have you made a reservation?\n"
    "Sandra: Yes, a table for two, please.\n"
    "Waiter: Of course. Here is the menu. Would you like something to drink?\n"
    "Sandra: I would like a glass of water and a cup of coffee.\n"
    "Waiter: And for you, sir?\n"
    "Thomas: I'll have a beer, please.\n"
    "Waiter: Do you already know what you want to eat?\n"
    "Sandra: Yes, I'll have the soup of the day and then the fish.\n"
    "Thomas: For me the salad and the steak, please.\n"
    "Waiter: Excellent! I'll bring the drinks first."
)

tip("To order food politely: <b>Ik wil graag...</b> (I would like...) or "
    "<b>Ik neem...</b> (I'll have...). "
    "Ask for the bill: <b>De rekening, alstublieft.</b>")


# --- Chapter 4: My house ---
story.append(PageBreak())
story.append(Paragraph("4. Mijn huis", sChapter))
story.append(Paragraph("My house", sSmall))
hr()

nl_en(
    "Ik woon in een klein appartement in het centrum van de stad. Het appartement "
    "heeft twee slaapkamers, een badkamer, een keuken en een woonkamer. "
    "De keuken is groot en de slaapkamer is klein. Er is geen tuin, maar er is "
    "een balkon. Vanaf het balkon kan ik de gracht zien.",
    "I live in a small apartment in the city centre. The apartment has two bedrooms, "
    "a bathroom, a kitchen and a living room. The kitchen is big and the bedroom is small. "
    "There is no garden, but there is a balcony. From the balcony I can see the canal."
)

nl_en(
    "In de woonkamer staat een bank en een tafel. Aan de muur hangt een schilderij. "
    "De televisie staat op een kastje naast het raam. Op de tafel liggen boeken en "
    "een laptop. In de hoek staat een plant. De vloer is van hout.",
    "In the living room there is a sofa and a table. On the wall hangs a painting. "
    "The television is on a cabinet next to the window. On the table there are books and "
    "a laptop. In the corner there is a plant. The floor is wooden."
)

section("Voorzetsels van plaats / Prepositions of place")
grammar_table(
    ["Nederlands", "English", "Voorbeeld"],
    [
        ["in", "in / inside", "De melk staat in de koelkast."],
        ["op", "on", "Het boek ligt op de tafel."],
        ["aan", "on (attached)", "De jas hangt aan de deur."],
        ["naast", "next to", "De bank staat naast het raam."],
        ["voor", "in front of", "De auto staat voor het huis."],
        ["achter", "behind", "De tuin is achter het huis."],
        ["onder", "under", "De hond slaapt onder de tafel."],
        ["boven", "above", "De lamp hangt boven de tafel."],
        ["tussen", "between", "De keuken is tussen de kamers."],
    ]
)

nl_en(
    "Waar is de badkamer? De badkamer is naast de slaapkamer, aan het einde van de gang. "
    "In de badkamer staat een douche en een wasmachine. De handdoeken hangen aan een haak "
    "achter de deur. De zeep ligt op de plank boven de wastafel.",
    "Where is the bathroom? The bathroom is next to the bedroom, at the end of the hallway. "
    "In the bathroom there is a shower and a washing machine. The towels hang on a hook "
    "behind the door. The soap is on the shelf above the sink."
)


# --- Chapter 5: City and weather ---
story.append(PageBreak())
story.append(Paragraph("5. De stad en het weer", sChapter))
story.append(Paragraph("The city and weather", sSmall))
hr()

nl_en(
    "Ik woon in Amsterdam. Het is een grote stad met veel grachten en bruggen. "
    "Er zijn veel fietsen op straat. De mensen fietsen overal naartoe: naar hun werk, "
    "naar de winkel, naar school. Het centrum is mooi maar druk. Er zijn veel winkels, "
    "restaurants en musea.",
    "I live in Amsterdam. It is a big city with many canals and bridges. "
    "There are many bicycles on the street. People cycle everywhere: to work, "
    "to the shop, to school. The centre is beautiful but busy. There are many shops, "
    "restaurants and museums."
)

nl_en(
    "De trein vertrekt om kwart over acht in de ochtend. Vandaag is het zondag en de "
    "winkels zijn gesloten. De bus vertrekt om acht uur. Waar is het dichtstbijzijnde "
    "station? Het station is aan het einde van deze straat, naast de bibliotheek.",
    "The train departs at quarter past eight in the morning. Today is Sunday and the "
    "shops are closed. The bus leaves at eight o'clock. Where is the nearest station? "
    "The station is at the end of this street, next to the library."
)

section("Het weer / The weather")
nl_en(
    "In Nederland regent het vaak. Vandaag regent het en het is koud buiten. "
    "De wind waait hard. Ik draag een dikke jas en een sjaal. In de zomer is het "
    "warm en gaan we naar het strand. Dan schijnt de zon en is de lucht blauw. "
    "In de winter is het donker en soms sneeuwt het. De herfst is mooi: de bladeren "
    "worden rood en geel.",
    "In the Netherlands it rains often. Today it is raining and it is cold outside. "
    "The wind blows hard. I wear a thick coat and a scarf. In summer it is warm and "
    "we go to the beach. Then the sun shines and the sky is blue. "
    "In winter it is dark and sometimes it snows. Autumn is beautiful: the leaves "
    "turn red and yellow."
)

grammar_table(
    ["Nederlands", "English"],
    [
        ["Het regent.", "It is raining."],
        ["Het sneeuwt.", "It is snowing."],
        ["De zon schijnt.", "The sun is shining."],
        ["Het waait.", "It is windy."],
        ["Het is bewolkt.", "It is cloudy."],
        ["Het vriest.", "It is freezing."],
        ["Het is warm / koud.", "It is warm / cold."],
    ]
)

tip("Weather expressions in Dutch use <b>het</b> as the subject: "
    "<b>Het regent</b>, <b>het sneeuwt</b>. This is like English 'it rains'.")


# --- Chapter 6: Clothing and colours ---
story.append(PageBreak())
story.append(Paragraph("6. Kleding en kleuren", sChapter))
story.append(Paragraph("Clothing and colours", sSmall))
hr()

nl_en(
    "Vandaag ga ik nieuwe kleding kopen. Ik draag een blauwe broek en een wit shirt. "
    "De rode jas hangt aan de deur. Ik heb ook een zwarte tas nodig. "
    "In de winkel vraag ik: 'Heeft u deze trui ook in het groen?' "
    "De verkoopster zegt: 'Ja, in groen en in blauw.' "
    "Hoeveel kost die zwarte jas? 'Die kost negenenveertig euro.'",
    "Today I am going to buy new clothes. I am wearing blue trousers and a white shirt. "
    "The red coat is hanging by the door. I also need a black bag. "
    "In the shop I ask: 'Do you have this jumper in green too?' "
    "The saleswoman says: 'Yes, in green and in blue.' "
    "How much does that black coat cost? 'That costs forty-nine euros.'"
)

section("Kleuren / Colours")
grammar_table(
    ["Nederlands", "English", "Nederlands", "English"],
    [
        ["rood", "red", "blauw", "blue"],
        ["groen", "green", "geel", "yellow"],
        ["wit", "white", "zwart", "black"],
        ["oranje", "orange", "bruin", "brown"],
        ["grijs", "grey", "roze", "pink"],
        ["paars", "purple", "donker/licht", "dark/light"],
    ]
)

nl_en(
    "Zij heeft blauwe ogen en bruin haar. Zij draagt een groene jurk en rode schoenen. "
    "Haar tas is geel. Wie is de man met de gele fiets? Dat is mijn buurman. "
    "Hij draagt altijd een oranje jas. In Nederland is oranje de nationale kleur!",
    "She has blue eyes and brown hair. She is wearing a green dress and red shoes. "
    "Her bag is yellow. Who is the man with the yellow bicycle? That is my neighbour. "
    "He always wears an orange coat. In the Netherlands, orange is the national colour!"
)


# --- Chapter 7: Travelling ---
story.append(PageBreak())
story.append(Paragraph("7. Op reis", sChapter))
story.append(Paragraph("Travelling", sSmall))
hr()

nl_en(
    "Volgende week gaan wij op vakantie. We gaan met het vliegtuig naar Spanje. "
    "Het vliegtuig vertrekt om tien uur 's ochtends van Schiphol. "
    "We moeten twee uur van tevoren op het vliegveld zijn. "
    "Ik heb mijn koffer al ingepakt. Ik neem kleding mee voor twee weken, "
    "een zonnebril en zonnebrandcreme.",
    "Next week we are going on holiday. We are going to Spain by airplane. "
    "The airplane departs at ten o'clock in the morning from Schiphol. "
    "We have to be at the airport two hours in advance. "
    "I have already packed my suitcase. I am taking clothes for two weeks, "
    "sunglasses and sunscreen."
)

section("Op het station / At the station")
nl_en(
    "Sandra: Goedemorgen. Ik wil graag een kaartje naar Rotterdam.\n"
    "Loket: Enkele reis of retour?\n"
    "Sandra: Retour, alstublieft. Hoe laat vertrekt de volgende trein?\n"
    "Loket: De volgende trein vertrekt om kwart voor tien, spoor drie.\n"
    "Sandra: Moet ik overstappen?\n"
    "Loket: Nee, het is een directe trein. De reis duurt vijftig minuten.\n"
    "Sandra: Hoeveel kost een retour?\n"
    "Loket: Achttien euro vijftig.\n"
    "Sandra: Ik betaal met pin. Dank u wel.\n"
    "Loket: Graag gedaan. Goede reis!",
    "Sandra: Good morning. I would like a ticket to Rotterdam.\n"
    "Counter: Single or return?\n"
    "Sandra: Return, please. What time does the next train depart?\n"
    "Counter: The next train departs at quarter to ten, platform three.\n"
    "Sandra: Do I have to change trains?\n"
    "Counter: No, it is a direct train. The journey takes fifty minutes.\n"
    "Sandra: How much does a return cost?\n"
    "Counter: Eighteen euros fifty.\n"
    "Sandra: I will pay by card. Thank you.\n"
    "Counter: You're welcome. Have a good trip!"
)

tip("Time expressions: <b>om kwart over acht</b> (at quarter past eight), "
    "<b>om half drie</b> (at half past two — watch out! In Dutch this means 2:30, not 3:30), "
    "<b>om kwart voor tien</b> (at quarter to ten).")


# --- Chapter 8: Grammar A1 Reference ---
story.append(PageBreak())
story.append(Paragraph("8. Grammatica A1", sChapter))
story.append(Paragraph("A1 Grammar Reference", sSmall))
hr()

section("Persoonlijke voornaamwoorden / Personal pronouns")
grammar_table(
    ["Persoon", "Beklemtoond", "Onbeklemtoond", "English"],
    [
        ["1e enkv.", "ik", "ik", "I"],
        ["2e enkv.", "jij", "je", "you"],
        ["2e formeel", "u", "u", "you (formal)"],
        ["3e enkv. m.", "hij", "ie / hij", "he"],
        ["3e enkv. v.", "zij", "ze", "she"],
        ["3e enkv. onz.", "het", "het", "it"],
        ["1e mv.", "wij", "we", "we"],
        ["2e mv.", "jullie", "jullie", "you (pl.)"],
        ["3e mv.", "zij", "ze", "they"],
    ]
)

section("Bezittelijke voornaamwoorden / Possessive pronouns")
grammar_table(
    ["Persoon", "Voor de-woord", "Voor het-woord", "English"],
    [
        ["ik", "mijn", "mijn", "my"],
        ["jij", "jouw / je", "jouw / je", "your"],
        ["u", "uw", "uw", "your (formal)"],
        ["hij", "zijn", "zijn", "his"],
        ["zij", "haar", "haar", "her"],
        ["wij", "onze", "ons", "our"],
        ["jullie", "jullie", "jullie", "your (pl.)"],
        ["zij (mv.)", "hun", "hun", "their"],
    ]
)

section("Lidwoorden / Articles")
story.append(Paragraph(
    "<b>de</b> — most nouns (masculine and feminine)<br/>"
    "<b>het</b> — neuter nouns (diminutives, words ending in -ment, -sel, -isme)<br/>"
    "<b>een</b> — indefinite article (a/an), same for de- and het-words<br/>"
    "All plurals use <b>de</b>, even if the singular was het.",
    sBody))
story.append(Spacer(1, 2*mm))

section("Vraagwoorden / Question words")
grammar_table(
    ["Vraagwoord", "English", "Voorbeeld"],
    [
        ["wie", "who", "Wie is dat?"],
        ["wat", "what", "Wat doe jij?"],
        ["waar", "where", "Waar woon jij?"],
        ["wanneer", "when", "Wanneer begin je?"],
        ["hoe", "how", "Hoe gaat het?"],
        ["waarom", "why", "Waarom leer jij Nederlands?"],
        ["welke/welk", "which", "Welke taal spreek jij?"],
        ["hoeveel", "how many/much", "Hoeveel kost dat?"],
        ["hoe oud", "how old", "Hoe oud ben jij?"],
    ]
)

section("Ontkenning: niet en geen / Negation")
story.append(Paragraph(
    "<b>GEEN</b> = replaces 'een' or no article before a noun:<br/>"
    "Ik heb <b>een</b> hond. / Ik heb <b>geen</b> hond. (I don't have a dog.)<br/><br/>"
    "<b>NIET</b> = everything else (verbs, adjectives, definite nouns, places):<br/>"
    "Hij is <b>niet</b> oud. (He is not old.)<br/>"
    "Ik ga <b>niet</b> naar school. (I'm not going to school.)<br/>"
    "Ik eet <b>niet</b>. (I don't eat.)",
    sBody))
story.append(Spacer(1, 2*mm))

section("Hebben of zijn? (VTT) / Perfect tense")
grammar_table(
    ["Hulpwerkwoord", "Wanneer?", "Voorbeeld"],
    [
        ["ZIJN", "Beweging (A naar B)", "Ik ben naar school gegaan."],
        ["ZIJN", "Verandering", "Hij is ziek geworden."],
        ["ZIJN", "Uitzonderingen", "Ze is thuis gebleven."],
        ["HEBBEN", "Alle andere werkwoorden", "We hebben pizza gegeten."],
    ]
)

tip("ZIJN = movement, change of state, or fixed exceptions (zijn, blijven, gebeuren). "
    "HEBBEN = everything else (the majority of verbs).")


# --- Chapter 9: A1 Vocabulary list ---
story.append(PageBreak())
story.append(Paragraph("9. Woordenlijst A1", sChapter))
story.append(Paragraph("A1 Vocabulary List", sSmall))
hr()

a1_vocab = {
    "Begroeting / Greetings": [
        ("hallo", "hello"), ("goedemorgen", "good morning"),
        ("goedemiddag", "good afternoon"), ("goedenavond", "good evening"),
        ("tot ziens", "goodbye"), ("alstublieft", "please"),
        ("dank u wel", "thank you"), ("bedankt", "thanks"),
        ("sorry", "sorry"), ("ja / nee", "yes / no"),
    ],
    "Familie / Family": [
        ("de moeder", "mother"), ("de vader", "father"),
        ("de broer", "brother"), ("de zus", "sister"),
        ("het kind", "child"), ("de opa", "grandfather"),
        ("de oma", "grandmother"), ("de vriend/vriendin", "friend"),
    ],
    "Eten & drinken / Food & drink": [
        ("het brood", "bread"), ("de kaas", "cheese"),
        ("het vlees", "meat"), ("de vis", "fish"),
        ("de groente", "vegetable"), ("het fruit", "fruit"),
        ("de koffie", "coffee"), ("de thee", "tea"),
        ("het ontbijt", "breakfast"), ("het avondeten", "dinner"),
    ],
    "Huis / House": [
        ("het huis", "house"), ("de kamer", "room"),
        ("de keuken", "kitchen"), ("de slaapkamer", "bedroom"),
        ("de badkamer", "bathroom"), ("de tuin", "garden"),
        ("het raam", "window"), ("de deur", "door"),
    ],
    "Vervoer / Transport": [
        ("de auto", "car"), ("de fiets", "bicycle"),
        ("de bus", "bus"), ("de trein", "train"),
        ("het vliegtuig", "airplane"), ("het station", "station"),
    ],
    "Weer / Weather": [
        ("de zon", "sun"), ("de regen", "rain"),
        ("de wind", "wind"), ("de sneeuw", "snow"),
        ("warm / koud", "warm / cold"), ("het regent", "it is raining"),
    ],
    "Werkwoorden / Core verbs": [
        ("zijn", "to be"), ("hebben", "to have"),
        ("gaan", "to go"), ("komen", "to come"),
        ("doen", "to do"), ("maken", "to make"),
        ("eten", "to eat"), ("drinken", "to drink"),
        ("slapen", "to sleep"), ("werken", "to work"),
        ("wonen", "to live"), ("spreken", "to speak"),
        ("willen", "to want"), ("kunnen", "can"),
        ("moeten", "must"), ("houden van", "to love"),
    ],
}

for topic, words in a1_vocab.items():
    section(topic)
    for nl, en in words:
        vocab_pair(nl, en)


# ============================================================================
# PART 2 — A2
# ============================================================================
story.append(PageBreak())
story.append(Spacer(1, 20*mm))
story.append(Paragraph("Deel 2", ParagraphStyle("part2", parent=sTitle, fontSize=18, textColor=BLUE_DARK)))
story.append(Paragraph("A2: Dagelijks Leven", ParagraphStyle("t2", parent=sTitle, textColor=BLUE_DARK)))
story.append(Paragraph("Daily Life", sSubtitle))
story.append(PageBreak())


# --- Chapter 10: A day in my life ---
story.append(Paragraph("10. Een dag in mijn leven", sChapterA2))
story.append(Paragraph("A day in my life", sSmall))
hr()

nl_en(
    "Ik sta elke dag om zeven uur op. Eerst douche ik en dan kleed ik me aan. "
    "Ik ontbijt in de keuken. Ik eet brood met pindakaas en drink een kopje thee. "
    "Om kwart over acht neem ik de trein naar mijn werk.",
    "I get up at seven o'clock every day. First I take a shower and then I get dressed. "
    "I have breakfast in the kitchen. I eat bread with peanut butter and drink a cup of tea. "
    "At quarter past eight I take the train to work."
)

nl_en(
    "Ik werk van negen tot vijf op kantoor. 's Middags eet ik een boterham op mijn werk. "
    "Ik loop elke dag van het station naar mijn werk. Dat duurt tien minuten. "
    "Na het werk ga ik soms naar de supermarkt om boodschappen te doen. "
    "Ik kook meestal zelf. Vanavond maak ik pasta met tomatensaus.",
    "I work from nine to five at the office. At noon I eat a sandwich at work. "
    "I walk from the station to work every day. That takes ten minutes. "
    "After work I sometimes go to the supermarket to do the shopping. "
    "I usually cook myself. Tonight I am making pasta with tomato sauce."
)

nl_en(
    "'s Avonds kijk ik televisie of lees ik een boek. Soms bel ik mijn moeder. "
    "Zij woont ver weg, maar we praten elke week. Om elf uur ga ik naar bed. "
    "Ik ben dan moe, maar het was een goede dag.",
    "In the evening I watch television or read a book. Sometimes I call my mother. "
    "She lives far away, but we talk every week. At eleven o'clock I go to bed. "
    "I am tired then, but it was a good day."
)

tip("Time of day expressions: <b>'s ochtends</b> (in the morning), "
    "<b>'s middags</b> (in the afternoon), <b>'s avonds</b> (in the evening), "
    "<b>'s nachts</b> (at night). The 's is short for 'des' (old genitive).")


# --- Chapter 11: At work ---
story.append(PageBreak())
story.append(Paragraph("11. Op het werk", sChapterA2))
story.append(Paragraph("At work", sSmall))
hr()

nl_en(
    "Ik werk als administratief medewerker bij een groot bedrijf. Mijn kantoor is "
    "op de derde verdieping. Ik heb een bureau, een computer en een telefoon. "
    "Mijn collega's zijn aardig. We drinken samen koffie in de pauze.",
    "I work as an administrative assistant at a large company. My office is "
    "on the third floor. I have a desk, a computer and a telephone. "
    "My colleagues are nice. We drink coffee together during the break."
)

nl_en(
    "Mijn collega heeft een afspraak met de baas om twee uur. De vergadering "
    "begint over twintig minuten. Kunt u mij helpen? Ik heb een vraag over het "
    "project. De deadline is volgende week vrijdag.",
    "My colleague has an appointment with the boss at two o'clock. The meeting "
    "starts in twenty minutes. Can you help me? I have a question about the "
    "project. The deadline is next Friday."
)

section("Formeel taalgebruik / Formal language")
grammar_table(
    ["Formeel (u)", "Informeel (jij)", "English"],
    [
        ["Kunt u mij helpen?", "Kun jij mij helpen?", "Can you help me?"],
        ["Spreekt u Nederlands?", "Spreek jij Nederlands?", "Do you speak Dutch?"],
        ["Heeft u een moment?", "Heb jij een moment?", "Do you have a moment?"],
        ["Zou u dat willen herhalen?", "Wil je dat herhalen?", "Could you repeat that?"],
    ]
)

nl_en(
    "Ik stuur een e-mail naar mijn leidinggevende. In de e-mail schrijf ik: "
    "'Geachte mevrouw De Vries, ik schrijf u over het rapport van maandag. "
    "Zou u mij de cijfers kunnen sturen? Met vriendelijke groet, Sandra.'",
    "I send an email to my supervisor. In the email I write: "
    "'Dear Ms De Vries, I am writing to you about Monday's report. "
    "Could you send me the figures? Kind regards, Sandra.'"
)


# --- Chapter 12: Grocery shopping ---
story.append(PageBreak())
story.append(Paragraph("12. Boodschappen doen", sChapterA2))
story.append(Paragraph("Grocery shopping", sSmall))
hr()

nl_en(
    "Op zaterdag doe ik boodschappen in de supermarkt. Ik maak eerst een lijstje. "
    "Ik heb melk, eieren, brood en kaas nodig. Ik moet ook groente kopen: tomaten, "
    "paprika en uien. We hebben geen brood meer in huis.",
    "On Saturday I do the shopping at the supermarket. First I make a list. "
    "I need milk, eggs, bread and cheese. I also have to buy vegetables: tomatoes, "
    "peppers and onions. We don't have any bread left at home."
)

nl_en(
    "In de supermarkt loop ik langs de schappen. De rode jurk in de etalage is te duur; "
    "de blauwe is goedkoper. Ik betaal met pin omdat ik geen contant geld bij me heb. "
    "Ik spaar elke maand een deel van mijn salaris. Het leven in Nederland is niet goedkoop.",
    "In the supermarket I walk past the shelves. The red dress in the window is too expensive; "
    "the blue one is cheaper. I pay by card because I don't have cash with me. "
    "I save a part of my salary every month. Life in the Netherlands is not cheap."
)

section("In de winkel / At the shop")
nl_en(
    "Verkoper: Goedemiddag, kan ik u helpen?\n"
    "Sandra: Ja, ik zoek een winterjas. Heeft u die in maat M?\n"
    "Verkoper: Ja, hier. Wilt u hem passen?\n"
    "Sandra: Ja, graag. ... Hij past goed. Hoeveel kost deze jas?\n"
    "Verkoper: Negenenvijftig euro. Vandaag heeft u tien procent korting.\n"
    "Sandra: Oh, dat is mooi! Dan neem ik hem. Ik betaal met pin.\n"
    "Verkoper: Alstublieft. Wilt u een tasje?\n"
    "Sandra: Nee, dank u. Ik heb mijn eigen tas bij me.",
    "Salesperson: Good afternoon, can I help you?\n"
    "Sandra: Yes, I'm looking for a winter coat. Do you have it in size M?\n"
    "Salesperson: Yes, here. Would you like to try it on?\n"
    "Sandra: Yes, please. ... It fits well. How much does this coat cost?\n"
    "Salesperson: Fifty-nine euros. Today you have a ten percent discount.\n"
    "Sandra: Oh, that's nice! Then I'll take it. I'll pay by card.\n"
    "Salesperson: Here you are. Would you like a bag?\n"
    "Sandra: No, thank you. I have my own bag with me."
)


# --- Chapter 13: At the doctor ---
story.append(PageBreak())
story.append(Paragraph("13. Bij de dokter", sChapterA2))
story.append(Paragraph("At the doctor", sSmall))
hr()

nl_en(
    "Ik voel me niet lekker. Ik heb hoofdpijn en koorts. Mijn hoofd doet pijn en "
    "ik ben heel moe. Ik ga morgen naar de dokter. Ik bel de huisarts om een "
    "afspraak te maken.",
    "I don't feel well. I have a headache and fever. My head hurts and "
    "I am very tired. I am going to the doctor tomorrow. I call the GP to make "
    "an appointment."
)

section("Bij de huisarts / At the GP")
nl_en(
    "Dokter: Goedemorgen, wat kan ik voor u doen?\n"
    "Sandra: Ik heb al drie dagen hoofdpijn en koorts.\n"
    "Dokter: Heeft u ook keelpijn of een hoest?\n"
    "Sandra: Ja, een beetje keelpijn en ik ben heel moe.\n"
    "Dokter: Ik ga u even onderzoeken. Kunt u uw mond opendoen? "
    "Uw keel is rood. Het is waarschijnlijk griep.\n"
    "Sandra: Moet ik medicijnen nemen?\n"
    "Dokter: Ik schrijf een medicijn voor. Neem het drie keer per dag na het eten. "
    "Rust veel uit en drink veel water.\n"
    "Sandra: Hoelang duurt het voordat ik beter ben?\n"
    "Dokter: Meestal een week. Als het na vijf dagen niet beter is, kom dan terug.",
    "Doctor: Good morning, what can I do for you?\n"
    "Sandra: I have had a headache and fever for three days.\n"
    "Doctor: Do you also have a sore throat or a cough?\n"
    "Sandra: Yes, a slight sore throat and I am very tired.\n"
    "Doctor: I will examine you. Can you open your mouth? "
    "Your throat is red. It is probably the flu.\n"
    "Sandra: Do I need to take medicine?\n"
    "Doctor: I will prescribe a medicine. Take it three times a day after meals. "
    "Rest a lot and drink plenty of water.\n"
    "Sandra: How long until I feel better?\n"
    "Doctor: Usually a week. If it's not better after five days, come back."
)

section("Lichaam / Body parts")
grammar_table(
    ["Nederlands", "English", "Nederlands", "English"],
    [
        ["het hoofd", "head", "de arm", "arm"],
        ["het oog", "eye", "de hand", "hand"],
        ["het oor", "ear", "het been", "leg"],
        ["de neus", "nose", "de voet", "foot"],
        ["de mond", "mouth", "de rug", "back"],
        ["de keel", "throat", "de buik", "belly"],
    ]
)


# --- Chapter 14: Sports and hobbies ---
story.append(PageBreak())
story.append(Paragraph("14. Sport en hobby", sChapterA2))
story.append(Paragraph("Sports and hobbies", sSmall))
hr()

nl_en(
    "In mijn vrije tijd lees ik boeken en fiets ik in het park. Ik houd van lezen, "
    "vooral detectiveverhalen. Ik sport ook graag. Ik zwem twee keer per week "
    "in het zwembad en ik ga op zaterdag hardlopen.",
    "In my free time I read books and cycle in the park. I love reading, "
    "especially detective stories. I also like sports. I swim twice a week "
    "at the pool and I go running on Saturdays."
)

nl_en(
    "Hij speelt elke zaterdag voetbal met zijn vrienden. Zij zingt in een koor "
    "en danst op vrijdagavond. Wij zwemmen elke zomer in de zee. Mijn buurman "
    "speelt piano en mijn buurvrouw schildert. Iedereen heeft een leuke hobby!",
    "He plays football with his friends every Saturday. She sings in a choir "
    "and dances on Friday evenings. We swim in the sea every summer. My neighbour "
    "plays piano and my female neighbour paints. Everyone has a nice hobby!"
)

nl_en(
    "Vorige week ben ik naar een concert gegaan. Het was een concert van een "
    "Nederlandse band. De muziek was heel goed en het publiek was enthousiast. "
    "Na het concert zijn we naar een cafe gegaan. We hebben gezellig gepraat "
    "en gelachen. Het was een leuke avond.",
    "Last week I went to a concert. It was a concert by a Dutch band. "
    "The music was very good and the audience was enthusiastic. "
    "After the concert we went to a cafe. We chatted and laughed together. "
    "It was a nice evening."
)

tip("The word <b>gezellig</b> is one of the most important Dutch words! "
    "It means cosy, convivial, enjoyable — a warm, social atmosphere. "
    "There is no exact English translation.")


# --- Chapter 15: Nature ---
story.append(PageBreak())
story.append(Paragraph("15. De natuur", sChapterA2))
story.append(Paragraph("Nature", sSmall))
hr()

nl_en(
    "Wij wandelen graag in het bos als het droog is. Het bos is rustig en "
    "je hoort alleen de vogels. De bomen zijn hoog en de bladeren zijn groen. "
    "In de herfst worden de bladeren rood en geel. Dan is het bos nog mooier.",
    "We like to walk in the forest when it is dry. The forest is quiet and "
    "you only hear the birds. The trees are tall and the leaves are green. "
    "In autumn the leaves turn red and yellow. Then the forest is even more beautiful."
)

nl_en(
    "We gaan dit weekend naar het strand als het mooi weer is. De rivier is "
    "breed en de bergen zijn hoog. Het paard staat in het bos naast de rivier. "
    "Er zijn veel bloemen in de lente. De tulpen zijn beroemd in Nederland. "
    "Elk jaar komen miljoenen toeristen naar de Keukenhof om de tulpen te zien.",
    "We are going to the beach this weekend if the weather is nice. The river is "
    "wide and the mountains are high. The horse is standing in the forest next to the river. "
    "There are many flowers in spring. Tulips are famous in the Netherlands. "
    "Every year millions of tourists come to the Keukenhof to see the tulips."
)

nl_en(
    "Nederland is een vlak land. Er zijn geen bergen, maar wel veel water. "
    "Er zijn kanalen, meren, rivieren en de zee. Een groot deel van het land "
    "ligt onder de zeespiegel. De Nederlanders hebben dijken gebouwd om het "
    "water buiten te houden. Dat is heel knap!",
    "The Netherlands is a flat country. There are no mountains, but a lot of water. "
    "There are canals, lakes, rivers and the sea. A large part of the country "
    "is below sea level. The Dutch have built dykes to keep the water out. "
    "That is very clever!"
)


# --- Chapter 16: Opinions and feelings ---
story.append(PageBreak())
story.append(Paragraph("16. Meningen en gevoelens", sChapterA2))
story.append(Paragraph("Opinions and feelings", sSmall))
hr()

nl_en(
    "Ik vind Nederlands een moeilijke taal, maar ook heel interessant. "
    "De grammatica is soms verwarrend, maar ik oefen elke dag. "
    "Ik denk dat het belangrijk is om de taal van het land te spreken. "
    "Mijn huiswerk is moeilijk, maar ik probeer het.",
    "I find Dutch a difficult language, but also very interesting. "
    "The grammar is sometimes confusing, but I practise every day. "
    "I think it is important to speak the language of the country. "
    "My homework is difficult, but I try."
)

nl_en(
    "Mijn leidinggevende is betrouwbaar, geduldig en vriendelijk. "
    "Ze is nieuwsgierig en ambitieus: ze wil altijd meer leren. "
    "Ik voel me gestrest door de deadline. Ik heb te veel verantwoordelijkheid. "
    "Maar ik ben trots op het werk dat ik heb gedaan.",
    "My supervisor is reliable, patient and friendly. "
    "She is curious and ambitious: she always wants to learn more. "
    "I feel stressed about the deadline. I have too much responsibility. "
    "But I am proud of the work I have done."
)

section("Meningen geven / Giving opinions")
story.append(Paragraph(
    "<b>Ik vind dat...</b> — I think that...<br/>"
    "<b>Ik denk dat...</b> — I think/believe that...<br/>"
    "<b>Ik geloof dat...</b> — I believe that...<br/>"
    "<b>Volgens mij...</b> — In my opinion...<br/>"
    "<b>Ik ben het eens / oneens.</b> — I agree / disagree.<br/>"
    "<b>Dat klopt / Dat klopt niet.</b> — That's right / That's not right.",
    sBody))
story.append(Spacer(1, 3*mm))

section("Gevoelens / Feelings")
grammar_table(
    ["Nederlands", "English", "Nederlands", "English"],
    [
        ["blij / gelukkig", "happy", "verdrietig", "sad"],
        ["boos", "angry", "bang", "afraid"],
        ["moe", "tired", "gestrest", "stressed"],
        ["trots", "proud", "teleurgesteld", "disappointed"],
        ["zenuwachtig", "nervous", "tevreden", "satisfied"],
        ["verbaasd", "surprised", "eenzaam", "lonely"],
    ]
)


# --- Chapter 17: Grammar A2 Reference ---
story.append(PageBreak())
story.append(Paragraph("17. Grammatica A2", sChapterA2))
story.append(Paragraph("A2 Grammar Reference", sSmall))
hr()

section("Bijvoeglijk naamwoord / Adjective inflection")
grammar_table(
    ["Situatie", "Regel", "Voorbeeld"],
    [
        ["de-woord + de/een", "altijd -e", "de grote auto, een grote auto"],
        ["het-woord + het", "altijd -e", "het grote huis"],
        ["het-woord + een", "GEEN -e!", "een groot huis"],
        ["na zijn/worden", "nooit -e", "De auto is groot."],
    ]
)
tip("The ONLY exception: <b>een</b> + adjective + <b>het-word</b> = NO -e. "
    "Remember: <b>een groot huis</b> (not: een grote huis).")

section("Vergrotende trap / Comparative")
grammar_table(
    ["Stellend", "Vergrotend", "Overtreffend", "English"],
    [
        ["groot", "groter", "het grootst(e)", "big"],
        ["klein", "kleiner", "het kleinst(e)", "small"],
        ["mooi", "mooier", "het mooist(e)", "beautiful"],
        ["goed", "beter", "het best(e)", "good"],
        ["veel", "meer", "het meest(e)", "much/many"],
        ["weinig", "minder", "het minst(e)", "little/few"],
    ]
)

section("Nevenschikkende voegwoorden / Coordinating conjunctions")
story.append(Paragraph(
    "These connect two main clauses. Word order does <b>NOT</b> change:<br/><br/>"
    "<b>en</b> (and) — Ik werk <b>en</b> hij studeert.<br/>"
    "<b>maar</b> (but) — Het regent, <b>maar</b> ik ga toch.<br/>"
    "<b>of</b> (or) — Wil jij thee <b>of</b> koffie?<br/>"
    "<b>want</b> (because) — Ik blijf thuis, <b>want</b> ik ben ziek.<br/>"
    "<b>dus</b> (so) — Hij is moe, <b>dus</b> hij gaat slapen.",
    sBody))
story.append(Spacer(1, 3*mm))

section("Onderschikkende voegwoorden / Subordinating conjunctions")
story.append(Paragraph(
    "These introduce a subordinate clause. The verb goes to the <b>END</b>:<br/><br/>"
    "<b>dat</b> (that) — Ik weet <b>dat</b> hij <b>komt</b>.<br/>"
    "<b>omdat</b> (because) — Ik studeer <b>omdat</b> ik wil <b>leren</b>.<br/>"
    "<b>als</b> (if/when) — <b>Als</b> het regent, <b>blijf</b> ik thuis.<br/>"
    "<b>toen</b> (when, past) — <b>Toen</b> ik klein <b>was</b>, speelde ik buiten.<br/>"
    "<b>terwijl</b> (while) — <b>Terwijl</b> ik <b>kook</b>, leest hij.",
    sBody))
story.append(Spacer(1, 3*mm))

tip("Remember: <b>want</b> (coordinating) = no word order change. "
    "<b>Omdat</b> (subordinating) = verb to the end. "
    "Both mean 'because' but they work differently!")

section("Het er-systeem / The 'er' system")
grammar_table(
    ["Functie", "Voorbeeld", "English"],
    [
        ["Existentieel", "Er is een probleem.", "There is a problem."],
        ["Voornaamwoordelijk", "Ik denk er vaak aan.", "I often think about it."],
        ["Partitatief", "Ik heb er drie.", "I have three (of them)."],
        ["Locatief", "Ik woon er al jaren.", "I've lived there for years."],
    ]
)

section("Voorwerpvoornaamwoorden / Object pronouns")
grammar_table(
    ["Persoon", "Onbeklemtoond", "Beklemtoond", "English"],
    [
        ["ik", "me", "mij", "me"],
        ["jij", "je", "jou", "you"],
        ["hij", "hem", "hem", "him"],
        ["zij (enkv.)", "haar / ze", "haar", "her"],
        ["wij", "ons", "ons", "us"],
        ["zij (mv.)", "ze / hen", "hen / hun", "them"],
    ]
)


# --- Chapter 18: A2 Vocabulary list ---
story.append(PageBreak())
story.append(Paragraph("18. Woordenlijst A2", sChapterA2))
story.append(Paragraph("A2 Vocabulary List", sSmall))
hr()

a2_vocab = {
    "Dagelijks leven / Daily life": [
        ("opstaan", "to get up"), ("douchen", "to shower"),
        ("koken", "to cook"), ("schoonmaken", "to clean"),
        ("boodschappen doen", "to do grocery shopping"),
        ("de afwas doen", "to do the dishes"),
        ("de supermarkt", "supermarket"), ("de boodschappen", "groceries"),
    ],
    "Werk / Work": [
        ("de baas", "boss"), ("de collega", "colleague"),
        ("het kantoor", "office"), ("de vergadering", "meeting"),
        ("de afspraak", "appointment"), ("het salaris", "salary"),
        ("de vakantie", "holiday"), ("vrij hebben", "to have a day off"),
    ],
    "Gezondheid / Health": [
        ("de dokter", "doctor"), ("het ziekenhuis", "hospital"),
        ("het medicijn", "medicine"), ("de pijn", "pain"),
        ("ziek", "ill"), ("de hoofdpijn", "headache"),
        ("de koorts", "fever"), ("de apotheek", "pharmacy"),
    ],
    "Winkelen / Shopping": [
        ("de winkel", "shop"), ("de prijs", "price"),
        ("de korting", "discount"), ("betalen", "to pay"),
        ("de rekening", "bill"), ("de maat", "size"),
        ("passen", "to fit / try on"), ("te duur", "too expensive"),
    ],
    "Bijvoeglijke naamwoorden / Adjectives": [
        ("groot / klein", "big / small"), ("oud / nieuw", "old / new"),
        ("duur / goedkoop", "expensive / cheap"), ("mooi / lelijk", "beautiful / ugly"),
        ("snel / langzaam", "fast / slow"), ("makkelijk / moeilijk", "easy / difficult"),
        ("gelukkig", "happy"), ("verdrietig", "sad"),
        ("moe", "tired"), ("bang", "afraid"),
    ],
    "Verbindingswoorden / Connectors": [
        ("maar", "but"), ("omdat", "because"),
        ("want", "because / for"), ("dus", "so / therefore"),
        ("als", "if / when"), ("dat", "that"),
        ("ook", "also"), ("altijd / nooit", "always / never"),
        ("soms / vaak", "sometimes / often"), ("misschien", "maybe"),
    ],
}

for topic, words in a2_vocab.items():
    section(topic)
    for nl, en in words:
        vocab_pair(nl, en)


# ============================================================================
# PART 3 — PRACTICE
# ============================================================================
story.append(PageBreak())
story.append(Spacer(1, 20*mm))
story.append(Paragraph("Deel 3", ParagraphStyle("part3", parent=sTitle, fontSize=18, textColor=ORANGE)))
story.append(Paragraph("Oefeningen", ParagraphStyle("t3", parent=sTitle, textColor=ORANGE)))
story.append(Paragraph("Practice", sSubtitle))
story.append(PageBreak())


# --- Chapter 19: Niet en geen ---
story.append(Paragraph("19. Niet en geen", ParagraphStyle("ch19", parent=sChapter, textColor=ORANGE)))
story.append(Paragraph("Negation practice", sSmall))
hr()

story.append(Paragraph("<b>Read each sentence and pay attention to the placement of niet/geen:</b>", sBody))
story.append(Spacer(1, 2*mm))

niet_geen_sentences = [
    ("Ik spreek niet zo snel.", "I don't speak that fast.",
     "niet after verb, before adverb"),
    ("De winkel is vandaag niet open.", "The shop is not open today.",
     "niet before the adjective"),
    ("Ik begrijp dat niet.", "I don't understand that.",
     "niet at the end (negating the whole object)"),
    ("Hij wil niet naar de dokter.", "He doesn't want to go to the doctor.",
     "niet before the place expression"),
    ("Ik houd niet van spinazie.", "I don't like spinach.",
     "niet before the preposition (houden van)"),
    ("Dat is niet mijn tas.", "That is not my bag.",
     "niet before the possessive pronoun"),
    ("Ik heb geen tijd.", "I don't have time.",
     "geen replaces een (indefinite noun)"),
    ("Zij heeft geen auto.", "She doesn't have a car.",
     "geen replaces een (indefinite noun)"),
    ("Er is geen probleem.", "There is no problem.",
     "geen in er-sentences"),
    ("Wij hebben geen geld bij ons.", "We don't have any money on us.",
     "geen before indefinite noun"),
    ("Hij komt vandaag niet naar het werk.", "He is not coming to work today.",
     "niet before the place expression"),
    ("De trein rijdt niet op zondag.", "The train doesn't run on Sundays.",
     "niet before the time expression"),
    ("Er is geen trein meer na middernacht.", "There is no train after midnight.",
     "geen...meer = no more"),
    ("We hebben geen brood meer in huis.", "We don't have any bread left at home.",
     "geen...meer = not any more"),
    ("Het water is niet warm genoeg.", "The water is not warm enough.",
     "niet before the adjective"),
    ("De soep is niet lekker.", "The soup is not tasty.",
     "niet before the adjective"),
    ("Ik ga niet naar Amsterdam.", "I'm not going to Amsterdam.",
     "niet before place expression"),
    ("Wij werken niet op kantoor.", "We don't work at the office.",
     "niet before place expression"),
    ("Ik heb geen idee wat ik moet doen.", "I have no idea what I should do.",
     "geen + noun in main clause"),
    ("De organisatie heeft geen budget voor nieuwe projecten.",
     "The organisation has no budget for new projects.",
     "geen before indefinite noun"),
]

for nl, en, rule in niet_geen_sentences:
    story.append(Paragraph(f"<b>{nl}</b>", sBodyNL))
    story.append(Paragraph(f"{en}", sBodyEN))
    story.append(Paragraph(f"Regel: {rule}", ParagraphStyle("ruleNote", parent=sSmall,
        textColor=GREEN_DARK, leftIndent=5*mm, spaceAfter=3*mm)))


# --- Chapter 20: Word order ---
story.append(PageBreak())
story.append(Paragraph("20. Woordvolgorde", ParagraphStyle("ch20", parent=sChapter, textColor=ORANGE)))
story.append(Paragraph("Word order practice", sSmall))
hr()

story.append(Paragraph("<b>Study these sentences and their word order patterns:</b>", sBody))
story.append(Spacer(1, 2*mm))

word_order_sentences = [
    ("Ik woon in Amsterdam.", "I live in Amsterdam.",
     "S - V - rest (standard main clause)"),
    ("Elke ochtend eet ik brood met kaas.", "Every morning I eat bread with cheese.",
     "Time - V - S - rest (inversion: time expression first)"),
    ("Vandaag is het zondag.", "Today is Sunday.",
     "Time - V - S (inversion after time adverb)"),
    ("In de zomer gaan we naar het strand.", "In summer we go to the beach.",
     "Place/time - V - S - rest (inversion)"),
    ("Wil je koffie of thee?", "Would you like coffee or tea?",
     "V - S - rest (yes/no question: verb first)"),
    ("Waar woont u?", "Where do you live?",
     "Question word - V - S (WH-question)"),
    ("Ik lust geen vis, maar ik eet wel vlees.", "I don't like fish, but I do eat meat.",
     "Main clause + maar + main clause (no word order change)"),
    ("Ik betaal met pin omdat ik geen contant geld bij me heb.",
     "I pay by card because I don't have cash with me.",
     "Main clause + omdat + S...V (verb to end in sub-clause)"),
    ("De lerares legt de les goed uit.", "The teacher explains the lesson well.",
     "S - V(sep.) - rest - particle (separable verb: uit-leggen)"),
    ("Stuur mij een bericht als je het adres weet.",
     "Send me a message when you know the address.",
     "Imperative + sub-clause (als + S...V at end)"),
    ("In mijn vrije tijd lees ik boeken.", "In my free time I read books.",
     "Prepositional phrase - V - S - O (inversion)"),
    ("Kunt u mij helpen?", "Can you help me?",
     "V(modal) - S - O - infinitive (modal verb first, infinitive at end)"),
    ("Ik weet dat hij morgen komt.", "I know that he is coming tomorrow.",
     "Main clause + dat + S...V (verb at end of sub-clause)"),
    ("Omdat hij ziek is, werkt hij niet.", "Because he is sick, he doesn't work.",
     "Sub-clause first causes inversion in main clause"),
    ("Als ik meer tijd had, zou ik meer lezen.", "If I had more time, I would read more.",
     "Conditional: sub-clause first, then V(cond.) - S - infinitive"),
]

for nl, en, rule in word_order_sentences:
    story.append(Paragraph(f"<b>{nl}</b>", sBodyNL))
    story.append(Paragraph(f"{en}", sBodyEN))
    story.append(Paragraph(f"Patroon: {rule}", ParagraphStyle("ruleNote2", parent=sSmall,
        textColor=BLUE_DARK, leftIndent=5*mm, spaceAfter=3*mm)))


# --- Chapter 21: Mixed sentences ---
story.append(PageBreak())
story.append(Paragraph("21. Gemengde zinnen", ParagraphStyle("ch21", parent=sChapter, textColor=ORANGE)))
story.append(Paragraph("Mixed sentences — reading practice", sSmall))
hr()

story.append(Paragraph(
    "<b>Read these sentences for fluency. Cover the English and try to understand "
    "the Dutch first:</b>", sBody))
story.append(Spacer(1, 2*mm))

mixed_sentences = [
    ("Goedemorgen, hoe gaat het met u?", "Good morning, how are you?"),
    ("Ik heet Sandra en ik kom uit Paraguay.", "My name is Sandra and I come from Paraguay."),
    ("Mijn moeder werkt als verpleegster.", "My mother works as a nurse."),
    ("Wij hebben een hond en twee katten.", "We have a dog and two cats."),
    ("De rode jas hangt aan de deur.", "The red coat is hanging by the door."),
    ("Het regent en het is koud buiten.", "It is raining and it is cold outside."),
    ("De bus vertrekt om acht uur.", "The bus leaves at eight o'clock."),
    ("Ik wil graag een kopje koffie.", "I would like a cup of coffee."),
    ("De keuken is groot en de slaapkamer is klein.", "The kitchen is big and the bedroom is small."),
    ("Ik neem elke ochtend de trein naar mijn werk.", "I take the train to work every morning."),
    ("Op zaterdag doe ik boodschappen in de supermarkt.", "On Saturdays I do the shopping at the supermarket."),
    ("Ik studeer elke avond voor het examen.", "I study for the exam every evening."),
    ("De lerares legt de les goed uit aan de klas.", "The teacher explains the lesson well to the class."),
    ("Mijn huiswerk is moeilijk, maar ik probeer het.", "My homework is difficult, but I try."),
    ("In mijn vrije tijd lees ik boeken en fiets ik in het park.", "In my free time I read books and cycle in the park."),
    ("Hij speelt elke zaterdag voetbal met zijn vrienden.", "He plays football with his friends every Saturday."),
    ("Wij zwemmen elke zomer in de zee.", "We swim in the sea every summer."),
    ("De rode jurk is te duur; de blauwe is goedkoper.", "The red dress is too expensive; the blue one is cheaper."),
    ("Ik bel mijn moeder elke zondag.", "I call my mother every Sunday."),
    ("Ik heb hoofdpijn en koorts.", "I have a headache and fever."),
    ("Wij wandelen graag in het bos als het droog is.", "We like to walk in the forest when it is dry."),
    ("De rivier is breed en de bergen zijn hoog.", "The river is wide and the mountains are high."),
    ("Zij zingt in een koor en danst op vrijdagavond.", "She sings in a choir and dances on Friday evenings."),
    ("Ik spaar elke maand een deel van mijn salaris.", "I save a part of my salary every month."),
    ("De apotheek geeft mij een medicijn zonder recept.", "The pharmacy gives me a medicine without a prescription."),
    ("Amsterdam is groter dan Utrecht.", "Amsterdam is bigger than Utrecht."),
    ("Dit is het beste restaurant van de stad.", "This is the best restaurant in town."),
    ("Ik spreek liever Nederlands dan Engels.", "I prefer to speak Dutch rather than English."),
    ("Na lang twijfelen heeft hij besloten te solliciteren.", "After hesitating for a long time, he decided to apply."),
    ("De vergadering met de leidinggevende begint over twintig minuten.", "The meeting with the manager starts in twenty minutes."),
    ("Ik lees elke ochtend het nieuws op mijn telefoon.", "I read the news on my phone every morning."),
    ("Door de vertraging miste ik mijn vlucht.", "Due to the delay I missed my flight."),
    ("De huurprijzen stijgen elk jaar.", "Rental prices rise every year."),
    ("Als ik meer tijd had, zou ik meer lezen.", "If I had more time, I would read more."),
    ("Ze heeft het formulier nog niet ingevuld.", "She hasn't filled in the form yet."),
    ("De vergadering gaat vandaag niet door.", "The meeting is not going ahead today."),
    ("Er zijn geen plaatsen meer beschikbaar op de cursus.", "There are no places left on the course."),
    ("De organisatie heeft geen budget voor nieuwe projecten.", "The organisation has no budget for new projects."),
    ("Hij voelt zich teleurgesteld omdat hij de promotie niet heeft gekregen.", "He feels disappointed because he did not get the promotion."),
    ("Ze is trots op haar kinderen.", "She is proud of her children."),
]

for nl, en in mixed_sentences:
    story.append(Paragraph(f"<b>{nl}</b>", sBodyNL))
    story.append(Paragraph(en, sBodyEN))


# ============================================================================
# EXTRA READING: More A1 stories
# ============================================================================
story.append(PageBreak())
story.append(Paragraph("Extra verhalen A1", sChapter))
story.append(Paragraph("Extra stories — A1 level", sSmall))
hr()

section("De markt / The market")
nl_en(
    "Het is zaterdag en ik ga naar de markt. De markt is in het centrum van de stad. "
    "Er zijn veel kraampjes. Ik koop verse groente: tomaten, wortels en sla. "
    "De tomaten kosten twee euro per kilo. Ik koop ook aardbeien. "
    "Ze ruiken heerlijk! De kaasboer verkoopt Goudse kaas. Ik neem een stuk jonge kaas "
    "en een stuk oude kaas. Oude kaas is sterker van smaak. "
    "Op de markt is ook een bloemenverkoper. Ik koop een bos tulpen voor mijn moeder. "
    "De tulpen zijn rood en geel. Mijn moeder houdt van bloemen.",
    "It is Saturday and I go to the market. The market is in the city centre. "
    "There are many stalls. I buy fresh vegetables: tomatoes, carrots and lettuce. "
    "The tomatoes cost two euros per kilo. I also buy strawberries. "
    "They smell delicious! The cheese seller sells Gouda cheese. I take a piece of young cheese "
    "and a piece of old cheese. Old cheese has a stronger flavour. "
    "At the market there is also a flower seller. I buy a bunch of tulips for my mother. "
    "The tulips are red and yellow. My mother loves flowers."
)

section("Het park / The park")
nl_en(
    "Op zondag ga ik naar het park. Het park is groot en mooi. Er zijn veel bomen "
    "en een vijver met eenden. Kinderen spelen op het speelveld. Een jongen trapt "
    "een bal en een meisje fietst op het pad. Een oud echtpaar zit op een bankje. "
    "Ze lezen de krant en drinken koffie uit een thermosfles. "
    "Ik ga op het gras zitten en lees mijn boek. De zon schijnt en het is warm. "
    "Na een uur loop ik naar het cafe in het park. Ik bestel een ijsje. "
    "Vanille met chocolade. Het smaakt heerlijk!",
    "On Sunday I go to the park. The park is big and beautiful. There are many trees "
    "and a pond with ducks. Children play on the playing field. A boy kicks "
    "a ball and a girl cycles on the path. An elderly couple sits on a bench. "
    "They read the newspaper and drink coffee from a thermos. "
    "I sit on the grass and read my book. The sun is shining and it is warm. "
    "After an hour I walk to the cafe in the park. I order an ice cream. "
    "Vanilla with chocolate. It tastes delicious!"
)

section("De fiets / The bicycle")
nl_en(
    "In Nederland fietst iedereen. Er zijn meer fietsen dan mensen! "
    "Ik heb een oude fiets. Hij is blauw en heeft een mandje voorop. "
    "Ik fiets elke dag naar mijn werk. Het duurt twintig minuten. "
    "In Amsterdam zijn er fietspaden overal. Je moet altijd op het fietspad rijden, "
    "niet op de stoep. Als het regent, fiets ik met een regenjas. "
    "Nederlanders fietsen altijd, ook als het koud is of waait. "
    "Mijn fiets heeft een slot. Ik zet hem altijd op slot, want in de grote stad "
    "worden veel fietsen gestolen. Vorige maand heeft iemand de fiets van mijn buurman gestolen!",
    "In the Netherlands everyone cycles. There are more bicycles than people! "
    "I have an old bicycle. It is blue and has a basket on the front. "
    "I cycle to work every day. It takes twenty minutes. "
    "In Amsterdam there are bike lanes everywhere. You must always ride on the bike lane, "
    "not on the pavement. When it rains, I cycle with a rain coat. "
    "Dutch people always cycle, even when it is cold or windy. "
    "My bicycle has a lock. I always lock it, because in the big city "
    "many bicycles are stolen. Last month someone stole my neighbour's bicycle!"
)

section("De verjaardag / The birthday")
nl_en(
    "Vandaag is het mijn verjaardag! Ik word dertig jaar oud. "
    "In Nederland feliciteren mensen je met je verjaardag. Ze zeggen: "
    "'Gefeliciteerd!' of 'Van harte gefeliciteerd met je verjaardag!' "
    "Mijn vrienden komen vanavond bij me eten. Ik heb een taart gebakken. "
    "Het is een chocoladetaart met slagroom. Er staan dertig kaarsjes op de taart. "
    "Ik blaas alle kaarsjes uit en doe een wens. Mijn vrienden zingen 'Lang zal ze leven'. "
    "Ik krijg cadeaus: een boek, een sjaal en een mooie plant. "
    "We eten, drinken en praten de hele avond. Het is heel gezellig!",
    "Today is my birthday! I am turning thirty years old. "
    "In the Netherlands people congratulate you on your birthday. They say: "
    "'Congratulations!' or 'Happy birthday!' "
    "My friends are coming over for dinner tonight. I have baked a cake. "
    "It is a chocolate cake with whipped cream. There are thirty candles on the cake. "
    "I blow out all the candles and make a wish. My friends sing 'Happy birthday'. "
    "I receive presents: a book, a scarf and a beautiful plant. "
    "We eat, drink and chat all evening. It is very gezellig!"
)


# ============================================================================
# EXTRA READING: More A2 stories
# ============================================================================
story.append(PageBreak())
story.append(Paragraph("Extra verhalen A2", sChapterA2))
story.append(Paragraph("Extra stories — A2 level", sSmall))
hr()

section("De nieuwe baan / The new job")
nl_en(
    "Vorige maand heb ik gesolliciteerd op een nieuwe baan. Ik heb mijn cv en een "
    "motivatiebrief gestuurd naar het bedrijf. Na twee weken kreeg ik een uitnodiging "
    "voor een sollicitatiegesprek. Ik was heel zenuwachtig! "
    "Ik heb mijn beste kleding aangetrokken: een donkerblauw pak en nette schoenen. "
    "Het gesprek duurde een uur. Ze hebben mij veel vragen gesteld over mijn ervaring "
    "en mijn motivatie. Ik heb verteld dat ik graag in een team werk en dat ik "
    "verantwoordelijkheid wil nemen. Na een week belden ze mij: ik heb de baan gekregen! "
    "Ik begin volgende maand. Ik ben heel blij en ook een beetje zenuwachtig.",
    "Last month I applied for a new job. I sent my CV and a motivation letter "
    "to the company. After two weeks I received an invitation for a job interview. "
    "I was very nervous! "
    "I put on my best clothes: a dark blue suit and smart shoes. "
    "The interview lasted one hour. They asked me many questions about my experience "
    "and my motivation. I told them that I enjoy working in a team and that I want "
    "to take responsibility. After a week they called me: I got the job! "
    "I start next month. I am very happy and also a little nervous."
)

section("Het weekend / The weekend")
nl_en(
    "Afgelopen weekend zijn we naar Leiden gegaan. We zijn met de trein gereisd. "
    "De reis duurde veertig minuten. Leiden is een mooie oude stad met grachten "
    "en historische gebouwen. We hebben eerst koffie gedronken in een cafe aan de gracht. "
    "Daarna zijn we naar het Rijksmuseum van Oudheden gegaan. Dat is een museum "
    "met oude Egyptische en Griekse voorwerpen. Het was heel interessant! "
    "We hebben ook door de stad gewandeld en de universiteit bezocht. "
    "De Universiteit Leiden is de oudste universiteit van Nederland. "
    "'s Middags hebben we pannenkoeken gegeten in een pannenkoekenhuis. "
    "Ik heb een pannenkoek met spek en kaas genomen. Mijn vriend heeft een "
    "pannenkoek met stroop besteld. Allebei waren ze heerlijk!",
    "Last weekend we went to Leiden. We travelled by train. "
    "The journey took forty minutes. Leiden is a beautiful old city with canals "
    "and historic buildings. We first had coffee at a cafe by the canal. "
    "Then we went to the National Museum of Antiquities. That is a museum "
    "with ancient Egyptian and Greek objects. It was very interesting! "
    "We also walked through the city and visited the university. "
    "Leiden University is the oldest university in the Netherlands. "
    "In the afternoon we ate pancakes at a pancake house. "
    "I had a pancake with bacon and cheese. My friend ordered a "
    "pancake with syrup. Both were delicious!"
)

section("Een e-mail schrijven / Writing an email")
nl_en(
    "Beste mevrouw Jansen,\n\n"
    "Ik schrijf u omdat ik een vraag heb over de cursus Nederlands. "
    "Ik heb mij aangemeld voor de cursus die in september begint, maar ik heb "
    "nog geen bevestiging ontvangen. Kunt u mij vertellen of er nog plaatsen "
    "beschikbaar zijn?\n\n"
    "Ik woon sinds twee maanden in Nederland en ik wil graag mijn Nederlands "
    "verbeteren. Ik spreek al een beetje Nederlands, maar ik maak nog veel fouten. "
    "Ik denk dat ik op A2-niveau zit.\n\n"
    "Ik hoor graag van u.\n\n"
    "Met vriendelijke groet,\n"
    "Sandra Sanabria",
    "Dear Mrs Jansen,\n\n"
    "I am writing to you because I have a question about the Dutch course. "
    "I have registered for the course that starts in September, but I have "
    "not yet received a confirmation. Can you tell me if there are still places "
    "available?\n\n"
    "I have been living in the Netherlands for two months and I would like to "
    "improve my Dutch. I already speak a little Dutch, but I still make many mistakes. "
    "I think I am at A2 level.\n\n"
    "I look forward to hearing from you.\n\n"
    "Kind regards,\n"
    "Sandra Sanabria"
)

section("Verhuizen / Moving house")
nl_en(
    "Volgende maand ga ik verhuizen. Ik heb een nieuw appartement gevonden in Rotterdam. "
    "Het is groter dan mijn huidige woning en het heeft een balkon. De huurprijs is "
    "achthonderd euro per maand, inclusief gas en water. Dat is niet goedkoop, maar "
    "het is goedkoper dan Amsterdam. "
    "Ik moet nog veel doen. Ik moet dozen kopen en alles inpakken. Mijn broer heeft "
    "een busje en hij helpt me met verhuizen. Ik moet ook mijn nieuwe adres doorgeven "
    "aan de gemeente, de bank en mijn werkgever. "
    "Ik vind het spannend om in een nieuwe stad te wonen. Rotterdam is een moderne stad "
    "met veel architectuur. Er zijn goede restaurants en het nachtleven is leuk. "
    "Ik ga mijn buren in Amsterdam missen, maar ik kijk uit naar het nieuwe avontuur.",
    "Next month I am going to move. I have found a new apartment in Rotterdam. "
    "It is bigger than my current home and it has a balcony. The rent is "
    "eight hundred euros per month, including gas and water. That is not cheap, but "
    "it is cheaper than Amsterdam. "
    "I still have a lot to do. I have to buy boxes and pack everything. My brother has "
    "a van and he is helping me move. I also have to give my new address to "
    "the municipality, the bank and my employer. "
    "I find it exciting to live in a new city. Rotterdam is a modern city "
    "with a lot of architecture. There are good restaurants and the nightlife is nice. "
    "I will miss my neighbours in Amsterdam, but I look forward to the new adventure."
)

section("Nederlandse cultuur / Dutch culture")
nl_en(
    "Nederland heeft een interessante cultuur. Nederlanders zijn bekend om hun directheid. "
    "Ze zeggen wat ze denken. In het begin vond ik dat raar, maar nu vind ik het prettig. "
    "Je weet altijd waar je aan toe bent. "
    "Nederlanders zijn ook heel zuinig. Ze letten op hun geld en geven niet graag "
    "te veel uit. Als je met Nederlanders uit eten gaat, betaalt iedereen zijn eigen "
    "rekening. Dat heet 'going Dutch' in het Engels! "
    "Een belangrijk woord in Nederland is 'gezelligheid'. Het betekent een warme, "
    "gezellige sfeer met vrienden of familie. Nederlanders vinden gezelligheid "
    "heel belangrijk. Ze drinken koffie samen, ze eten samen en ze praten veel. "
    "In de winter branden er kaarsjes en hangen er lichtjes. Dat is typisch Nederlands!",
    "The Netherlands has an interesting culture. Dutch people are known for their directness. "
    "They say what they think. At first I found that strange, but now I find it pleasant. "
    "You always know where you stand. "
    "Dutch people are also very frugal. They watch their money and don't like to spend "
    "too much. When you go out to eat with Dutch people, everyone pays their own "
    "bill. That is called 'going Dutch' in English! "
    "An important word in the Netherlands is 'gezelligheid'. It means a warm, "
    "cosy atmosphere with friends or family. Dutch people find gezelligheid "
    "very important. They drink coffee together, eat together and talk a lot. "
    "In winter there are candles burning and fairy lights hanging. That is typically Dutch!"
)


# ============================================================================
# EXTRA: Conversation practice
# ============================================================================
story.append(PageBreak())
story.append(Paragraph("Gesprekken oefenen", ParagraphStyle("chconv", parent=sChapter, textColor=ORANGE)))
story.append(Paragraph("Conversation practice", sSmall))
hr()

section("Op het postkantoor / At the post office")
nl_en(
    "Sandra: Goedemorgen. Ik wil dit pakje naar Paraguay sturen.\n"
    "Medewerker: Goedemorgen. Hoe zwaar is het pakje?\n"
    "Sandra: Ik denk twee kilo.\n"
    "Medewerker: Laat mij het even wegen. Het is tweeenhalf kilo. "
    "Wilt u het met of zonder track-and-trace versturen?\n"
    "Sandra: Met track-and-trace, alstublieft. Hoe lang duurt het?\n"
    "Medewerker: Naar Zuid-Amerika duurt het ongeveer tien werkdagen.\n"
    "Sandra: En hoeveel kost het?\n"
    "Medewerker: Vijfentwintig euro vijftig.\n"
    "Sandra: Dat is goed. Ik betaal met pin.\n"
    "Medewerker: Alstublieft, hier is uw ontvangstbewijs met het trackingnummer.\n"
    "Sandra: Dank u wel!",
    "Sandra: Good morning. I want to send this package to Paraguay.\n"
    "Employee: Good morning. How heavy is the package?\n"
    "Sandra: I think two kilos.\n"
    "Employee: Let me weigh it. It is two and a half kilos. "
    "Would you like to send it with or without tracking?\n"
    "Sandra: With tracking, please. How long does it take?\n"
    "Employee: To South America it takes about ten working days.\n"
    "Sandra: And how much does it cost?\n"
    "Employee: Twenty-five euros fifty.\n"
    "Sandra: That's fine. I'll pay by card.\n"
    "Employee: Here is your receipt with the tracking number.\n"
    "Sandra: Thank you!"
)

section("Een afspraak maken / Making an appointment")
nl_en(
    "Sandra: Goedemiddag, met Sandra Sanabria. Ik wil graag een afspraak maken.\n"
    "Receptionist: Goedemiddag. Waarvoor wilt u een afspraak?\n"
    "Sandra: Ik wil mij inschrijven bij de gemeente.\n"
    "Receptionist: Heeft u al een BSN-nummer?\n"
    "Sandra: Nee, nog niet. Ik ben net in Nederland aangekomen.\n"
    "Receptionist: Dan moet u langskomen voor een afspraak. Kan volgende week dinsdag "
    "om tien uur?\n"
    "Sandra: Ja, dat kan. Wat moet ik meenemen?\n"
    "Receptionist: Uw paspoort, uw huurcontract en een bewijs van uw adres.\n"
    "Sandra: Prima, ik neem alles mee. Dank u wel.\n"
    "Receptionist: Graag gedaan. Tot dinsdag!",
    "Sandra: Good afternoon, this is Sandra Sanabria. I would like to make an appointment.\n"
    "Receptionist: Good afternoon. What is the appointment for?\n"
    "Sandra: I want to register at the municipality.\n"
    "Receptionist: Do you already have a BSN number?\n"
    "Sandra: No, not yet. I have just arrived in the Netherlands.\n"
    "Receptionist: Then you need to come in for an appointment. Can you make next Tuesday "
    "at ten o'clock?\n"
    "Sandra: Yes, that works. What do I need to bring?\n"
    "Receptionist: Your passport, your rental contract and proof of your address.\n"
    "Sandra: Great, I'll bring everything. Thank you.\n"
    "Receptionist: You're welcome. See you Tuesday!"
)

section("In het cafe / At the cafe")
nl_en(
    "Sandra: Hoi! Leuk je te zien. Hoe gaat het?\n"
    "Lisa: Hoi Sandra! Goed, dank je. En met jou?\n"
    "Sandra: Ook goed. Ik heb een drukke week gehad op het werk.\n"
    "Lisa: Wat vervelend. Wil je koffie?\n"
    "Sandra: Ja, lekker. Een cappuccino, alsjeblieft.\n"
    "Lisa: Ik neem een thee met honing. Heb je al plannen voor het weekend?\n"
    "Sandra: Ik wil naar de bioscoop. Er draait een nieuwe Nederlandse film.\n"
    "Lisa: Oh, welke film?\n"
    "Sandra: Hij heet 'De Oost'. Het is een historische film.\n"
    "Lisa: Dat klinkt interessant! Zal ik meegaan?\n"
    "Sandra: Ja, gezellig! Zullen we zaterdagavond gaan?\n"
    "Lisa: Goed idee. Ik kijk even naar de tijden en stuur je een berichtje.\n"
    "Sandra: Top! Dan spreken we dat af.",
    "Sandra: Hi! Nice to see you. How are you?\n"
    "Lisa: Hi Sandra! Good, thanks. And you?\n"
    "Sandra: Good too. I've had a busy week at work.\n"
    "Lisa: That's annoying. Would you like coffee?\n"
    "Sandra: Yes, please. A cappuccino, please.\n"
    "Lisa: I'll have a tea with honey. Do you have plans for the weekend already?\n"
    "Sandra: I want to go to the cinema. There's a new Dutch film showing.\n"
    "Lisa: Oh, which film?\n"
    "Sandra: It's called 'De Oost'. It's a historical film.\n"
    "Lisa: That sounds interesting! Shall I come along?\n"
    "Sandra: Yes, fun! Shall we go Saturday evening?\n"
    "Lisa: Good idea. I'll check the times and send you a message.\n"
    "Sandra: Great! Then we'll make that plan."
)


# ============================================================================
# EXTRA: Numbers and time reference
# ============================================================================
story.append(PageBreak())
story.append(Paragraph("Getallen en tijd", sChapterA2))
story.append(Paragraph("Numbers and time", sSmall))
hr()

section("Telwoorden / Numbers")
grammar_table(
    ["Getal", "Nederlands", "Getal", "Nederlands"],
    [
        ["1", "een", "11", "elf"],
        ["2", "twee", "12", "twaalf"],
        ["3", "drie", "13", "dertien"],
        ["4", "vier", "14", "veertien"],
        ["5", "vijf", "15", "vijftien"],
        ["6", "zes", "16", "zestien"],
        ["7", "zeven", "17", "zeventien"],
        ["8", "acht", "18", "achttien"],
        ["9", "negen", "19", "negentien"],
        ["10", "tien", "20", "twintig"],
        ["30", "dertig", "40", "veertig"],
        ["50", "vijftig", "60", "zestig"],
        ["70", "zeventig", "80", "tachtig"],
        ["90", "negentig", "100", "honderd"],
    ]
)

story.append(Paragraph(
    "<b>21-99:</b> In Dutch, the ones come BEFORE the tens:<br/>"
    "<b>21</b> = eenentwintig (one-and-twenty)<br/>"
    "<b>35</b> = vijfendertig (five-and-thirty)<br/>"
    "<b>87</b> = zevenentachtig (seven-and-eighty)<br/>"
    "<b>99</b> = negenennegentig (nine-and-ninety)",
    sBody))
story.append(Spacer(1, 3*mm))

section("Kloktijden / Telling time")
grammar_table(
    ["Tijd", "Nederlands", "English"],
    [
        ["8:00", "acht uur", "eight o'clock"],
        ["8:15", "kwart over acht", "quarter past eight"],
        ["8:30", "half negen (!)", "half past eight"],
        ["8:45", "kwart voor negen", "quarter to nine"],
        ["8:05", "vijf over acht", "five past eight"],
        ["8:10", "tien over acht", "ten past eight"],
        ["8:20", "tien voor half negen", "twenty past eight"],
        ["8:25", "vijf voor half negen", "twenty-five past eight"],
        ["8:35", "vijf over half negen", "thirty-five past eight"],
        ["8:40", "tien over half negen", "twenty to nine"],
        ["8:50", "tien voor negen", "ten to nine"],
        ["8:55", "vijf voor negen", "five to nine"],
    ]
)

tip("IMPORTANT: <b>half negen</b> = 8:30 (NOT 9:30)! In Dutch, 'half negen' means "
    "'halfway to nine'. This is one of the most common mistakes for learners!")

section("Dagen en maanden / Days and months")
grammar_table(
    ["Dag", "English", "Maand", "English"],
    [
        ["maandag", "Monday", "januari", "January"],
        ["dinsdag", "Tuesday", "februari", "February"],
        ["woensdag", "Wednesday", "maart", "March"],
        ["donderdag", "Thursday", "april", "April"],
        ["vrijdag", "Friday", "mei", "May"],
        ["zaterdag", "Saturday", "juni", "June"],
        ["zondag", "Sunday", "juli", "July"],
        ["", "", "augustus", "August"],
        ["", "", "september", "September"],
        ["", "", "oktober", "October"],
        ["", "", "november", "November"],
        ["", "", "december", "December"],
    ]
)

story.append(Paragraph(
    "<b>Dates:</b> op maandag 5 januari (on Monday 5 January)<br/>"
    "<b>Seasons:</b> de lente (spring), de zomer (summer), "
    "de herfst (autumn), de winter (winter)<br/>"
    "<b>In + season:</b> in de lente, in de zomer, in de herfst, in de winter",
    sBody))


# ============================================================================
# EXTRA: Useful expressions
# ============================================================================
story.append(PageBreak())
story.append(Paragraph("Nuttige uitdrukkingen", sChapterA2))
story.append(Paragraph("Useful expressions", sSmall))
hr()

expressions = [
    ("Geen probleem!", "No problem!"),
    ("Dat is goed.", "That's fine."),
    ("Ik begrijp het.", "I understand."),
    ("Ik begrijp het niet.", "I don't understand."),
    ("Kunt u dat herhalen?", "Can you repeat that?"),
    ("Kunt u langzamer spreken?", "Can you speak more slowly?"),
    ("Hoe zeg je dat in het Nederlands?", "How do you say that in Dutch?"),
    ("Wat betekent dat?", "What does that mean?"),
    ("Dat klopt.", "That's correct."),
    ("Dat klopt niet.", "That's not correct."),
    ("Ik ben het ermee eens.", "I agree."),
    ("Ik ben het er niet mee eens.", "I disagree."),
    ("Het maakt niet uit.", "It doesn't matter."),
    ("Dat kan.", "That's possible."),
    ("Dat kan niet.", "That's not possible."),
    ("Ik weet het niet.", "I don't know."),
    ("Ik denk het wel.", "I think so."),
    ("Ik denk het niet.", "I don't think so."),
    ("Mag ik iets vragen?", "May I ask something?"),
    ("Pardon, waar is...?", "Excuse me, where is...?"),
    ("Tot morgen!", "See you tomorrow!"),
    ("Tot volgende week!", "See you next week!"),
    ("Veel succes!", "Good luck!"),
    ("Veel plezier!", "Have fun!"),
    ("Prettig weekend!", "Have a nice weekend!"),
    ("Goede reis!", "Have a good trip!"),
    ("Welterusten!", "Good night! (going to sleep)"),
    ("Eet smakelijk!", "Enjoy your meal!"),
    ("Proost!", "Cheers!"),
    ("Gezondheid!", "Bless you! (after sneezing)"),
    ("Gefeliciteerd!", "Congratulations!"),
    ("Van harte gefeliciteerd!", "Many happy returns!"),
    ("Wat leuk!", "How nice!"),
    ("Wat jammer!", "What a pity!"),
    ("Wat vervelend!", "How annoying!"),
    ("Ik heb haast.", "I'm in a hurry."),
    ("Ik heb honger.", "I'm hungry."),
    ("Ik heb dorst.", "I'm thirsty."),
    ("Ik heb het koud.", "I'm cold."),
    ("Ik heb het warm.", "I'm warm."),
]

for nl, en in expressions:
    vocab_pair(nl, en)


# ============================================================================
# EXTRA: Dutch proverbs and sayings
# ============================================================================
story.append(PageBreak())
story.append(Paragraph("Spreekwoorden en gezegden", sChapter))
story.append(Paragraph("Proverbs and sayings", sSmall))
hr()

story.append(Paragraph(
    "Dutch has many colourful proverbs. Here are some common ones at A1/A2 level:",
    sBody))
story.append(Spacer(1, 2*mm))

proverbs = [
    ("Oefening baart kunst.", "Practice makes perfect.",
     "Literally: Practice gives birth to art."),
    ("Wie niet waagt, wie niet wint.", "Nothing ventured, nothing gained.",
     "Literally: Who doesn't dare, doesn't win."),
    ("De appel valt niet ver van de boom.", "The apple doesn't fall far from the tree.",
     "Children are like their parents."),
    ("Na regen komt zonneschijn.", "After rain comes sunshine.",
     "Things will get better."),
    ("Beter laat dan nooit.", "Better late than never.",
     "It's better to do something late than not at all."),
    ("Wie het kleine niet eert, is het grote niet weerd.", "If you don't value small things, you don't deserve big things.",
     "Appreciate what you have."),
    ("Elk nadeel heb zijn voordeel.", "Every disadvantage has its advantage.",
     "Famous quote by Johan Cruijff!"),
    ("Doe maar gewoon, dan doe je al gek genoeg.", "Just act normal, that's crazy enough.",
     "Very Dutch: don't show off!"),
    ("Het is niet alles goud wat er blinkt.", "All that glitters is not gold.",
     "Things aren't always as good as they seem."),
    ("De beste stuurlui staan aan wal.", "The best helmsmen stand on shore.",
     "Everyone thinks they know better when they're not involved."),
]

for nl, en, note in proverbs:
    story.append(Paragraph(f"<b>{nl}</b>", sBodyNL))
    story.append(Paragraph(f"{en}", sBodyEN))
    story.append(Paragraph(f"{note}", ParagraphStyle("provNote", parent=sSmall,
        textColor=ORANGE, leftIndent=5*mm, spaceAfter=3*mm)))


# ============================================================================
# FINAL PAGE
# ============================================================================
story.append(PageBreak())
story.append(Spacer(1, 30*mm))
story.append(Paragraph("Goed gedaan!", sTitle))
story.append(Paragraph("Well done!", sSubtitle))
story.append(Spacer(1, 10*mm))
story.append(Paragraph(
    "Je hebt het hele leesboek gelezen!<br/>"
    "You have read the entire reading book!<br/><br/>"
    "Blijf oefenen met de Schrijfcoach app<br/>"
    "voor werkwoorden, grammatica en meer.<br/><br/>"
    "Keep practising with the Schrijfcoach app<br/>"
    "for verbs, grammar and more.",
    ParagraphStyle("final", parent=sBody, alignment=TA_CENTER, fontSize=11, leading=16)))


# ============================================================================
# BUILD
# ============================================================================
doc.build(story)
print("PDF generated: Nederlands_Lezen_A1_A2.pdf")
print(f"Pages will be A5 format (Kindle-friendly)")
