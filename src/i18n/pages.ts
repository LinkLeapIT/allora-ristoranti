import type { Locale } from "./config";

// Long-form copy for the marketing pages. Customer testimonials stay in the
// language they were written in, so they are not part of this file.

const it = {
  home: {
    learnMore: "Scopri di più",
    aboutKicker: "Su di noi",
    aboutTitle: "Allora Ristorante",
    aboutText:
      "La Siria è una terra che da sempre ha influenzato tantissimo la cultura di tutta l'area Mediterranea e ha saputo fare suoi profumi e sapori unici che provengono da terre lontane, facendoli arrivare in tanti porti con i suoi marinai e le grandi navi che venivano a caricare le spezie lungo le coste.",
    offerTitle: "Cosa offriamo",
    testimonialsTitle: "Dicono di noi",
  },
  offer: {
    ristorante: {
      title: "Ristorante",
      text: "La cucina del Medio Oriente e in particolare quella siriana e libanese sono la base e il punto di partenza per tantissime…",
    },
    cuisine: {
      title: "Cucina siriana e libanese",
      text: "Quando si parla genericamente di cucina mediorientale, in realtà ci si riferisce proprio alla tradizione siriana e libanese…",
    },
    delivery: {
      title: "Consegne a domicilio",
      text: "Per chi vuol gustare la cucina siriana e libanese comodamente a casa propria, senza doversi preoccupare di prenotare un posto…",
    },
    evenings: {
      title: "Serate di musica, cibo e libri",
      text: "La tradizione mediorientale vede da sempre il momento del pasto come una gioia e un'occasione per incontrarsi. Ti offriamo serate…",
    },
  },
  about: {
    title: "Chi siamo",
    intro:
      "La Siria è una terra che da sempre ha influenzato tantissimo la cultura di tutta l'area Mediterranea e ha saputo fare suoi profumi e sapori unici che provengono da terre lontane, facendoli arrivare in tanti porti con i suoi marinai e le grandi navi che venivano a caricare le spezie lungo le coste.",
    lead: "Profumi esotici, ingredienti ricercati e tanta tradizione sono al centro della cucina di questi territori e che noi abbiamo deciso di far assaggiare a tutti gli appassionati del mangiare bene.",
    body: "Come tutta la cucina mediorientale, a dominare sono i sapori spiccati e i profumi delle spezie, la cottura tradizionale, con tecniche diverse rispetto a quelle che si usano in Italia e tanti ingredienti accostati in una maniera unica.",
    story1:
      "Il nostro ristorante nel cuore di Genova ti permette un viaggio in un'atmosfera inconfondibile, che al tempo stesso è esotica e familiare perché rappresenta tutto il Mediterraneo. Siria e Libano con i loro porti, infatti, per millenni hanno fatto arrivare le spezie sulle tavole di tutti i paesi che si affacciano sul nostro grande mare e le navi hanno portato in giro tradizioni di paesi lontani. I nostri chef le hanno sapute mescolare fra loro, per offrire un gusto inconfondibile e spiccato. In un ambiente tranquillo e rilassante in puro stile mediorientale ti potrai godere alcune fra le migliori pietanze della nostra tradizione. Puoi scoprire tantissimi gusti basati su carne di pollo e agnello, verdure, legumi e cereali, preparati secondo una tradizione antica, dove a incontrarsi sono i sapori acidi degli agrumi, la dolcezza del miele e la sostanza dei ceci.",
    story2:
      "Il nostro menu ti offre tante soluzioni differenti per sperimentare, con la possibilità di scegliere piatti unici, oppure assaggi al tavolo con gli amici. La nostra idea non è quella soltanto di un ristorante, ma di un ambiente da vivere dove ti offriamo letture, musica tradizionale live, per creare l'atmosfera e tanto scambio culturale. Lasciati affascinare dal profumo coinvolgente della nostra cucina, dall'atmosfera calda e informale di uno spazio in cui si chiacchiera e si mangia, oppure gusta un tè speziato mentre ti godi l'ambiente, nelle serate speciali dedicate alla cultura. Il nostro è uno spazio fatto di condivisione e di crescita dove sentirsi a casa dal primo momento in cui entri. Un locale aperto a chi ama conoscere il prossimo, condividere il desco e scoprire cose nuove, con la naturale curiosità del viaggiatore.",
    cta: "Vedi il menu",
  },
  services: {
    title: "Servizi",
    intro: "Dalla cena al tavolo alle serate di musica e libri, fino alle consegne a domicilio.",
  },
  contact: {
    title: "Contatti",
    phone: "Telefono",
    email: "E-mail",
    address: "Indirizzo",
    hours: "Orari di apertura",
    mon: "Lunedì",
    tueSun: "Martedì – Domenica",
    closed: "Chiuso",
    formTitle: "Scrivici",
    name: "Nome",
    surname: "Cognome",
    emailLabel: "Email",
    message: "Messaggio",
    namePh: "Il tuo nome",
    surnamePh: "Il tuo cognome",
    emailPh: "nome@esempio.it",
    messagePh: "Come possiamo aiutarti?",
    terms: "Accetto le condizioni di utilizzo del sito e l'informativa sul trattamento dei dati personali.",
    send: "Invia",
    mailHint: "Si aprirà la tua app di posta con il messaggio già pronto da inviare.",
    mapTitle: "Dove siamo",
    openMaps: "Apri su Google Maps",
    subject: "Messaggio dal sito",
  },
};

export type PageContent = typeof it;

const en: PageContent = {
  home: {
    learnMore: "Learn more",
    aboutKicker: "About us",
    aboutTitle: "Allora Ristorante",
    aboutText:
      "Syria is a land that has always shaped the culture of the whole Mediterranean, making its own the unique scents and flavours that came from distant lands and reached many ports with its sailors and the great ships that came to load spices along the coast.",
    offerTitle: "What we offer",
    testimonialsTitle: "What guests say",
  },
  offer: {
    ristorante: {
      title: "Restaurant",
      text: "Middle Eastern cuisine, and Syrian and Lebanese food in particular, is the foundation and starting point for countless…",
    },
    cuisine: {
      title: "Syrian and Lebanese cuisine",
      text: "When people talk about Middle Eastern food, they are really referring to the Syrian and Lebanese tradition…",
    },
    delivery: {
      title: "Home delivery",
      text: "For those who want to enjoy Syrian and Lebanese food at home, without having to worry about booking a table…",
    },
    evenings: {
      title: "Nights of music, food and books",
      text: "Middle Eastern tradition has always seen mealtime as a joy and a chance to meet. We offer evenings…",
    },
  },
  about: {
    title: "About us",
    intro:
      "Syria is a land that has always shaped the culture of the whole Mediterranean, making its own the unique scents and flavours that came from distant lands and reached many ports with its sailors and the great ships that came to load spices along the coast.",
    lead: "Exotic aromas, carefully chosen ingredients and a great deal of tradition are at the heart of the cooking of these lands, and we have decided to share it with everyone who loves good food.",
    body: "As in all Middle Eastern cooking, bold flavours and the scent of spices dominate, along with traditional cooking methods that differ from those used in Italy and many ingredients combined in a way that is all their own.",
    story1:
      "Our restaurant in the heart of Genoa takes you on a journey into an unmistakable atmosphere, both exotic and familiar, because it represents the whole Mediterranean. For thousands of years Syria and Lebanon, with their ports, brought spices to the tables of every country on our great sea, and ships carried the traditions of distant lands. Our chefs have learned to blend them to offer a distinctive, lively taste. In a calm and relaxing setting in pure Middle Eastern style, you can enjoy some of the best dishes of our tradition. Discover countless flavours based on chicken and lamb, vegetables, pulses and grains, prepared in an ancient way, where the sharpness of citrus, the sweetness of honey and the substance of chickpeas meet.",
    story2:
      "Our menu gives you many ways to explore, with the choice of single dishes or shared tastings at the table with friends. Our idea is not just a restaurant but a place to experience, where we offer readings and live traditional music to create atmosphere and plenty of cultural exchange. Let yourself be charmed by the inviting aroma of our cooking and by the warm, informal feel of a space where people chat and eat, or enjoy a spiced tea while taking in the surroundings on our special culture evenings. Ours is a space of sharing and growth where you feel at home from the moment you walk in. A place open to anyone who likes to get to know others, share a table and discover new things, with the natural curiosity of a traveller.",
    cta: "See the menu",
  },
  services: {
    title: "Services",
    intro: "From dinner at the table to evenings of music and books, and delivery to your door.",
  },
  contact: {
    title: "Contact",
    phone: "Phone",
    email: "Email",
    address: "Address",
    hours: "Opening hours",
    mon: "Monday",
    tueSun: "Tuesday – Sunday",
    closed: "Closed",
    formTitle: "Write to us",
    name: "First name",
    surname: "Last name",
    emailLabel: "Email",
    message: "Message",
    namePh: "Your first name",
    surnamePh: "Your last name",
    emailPh: "name@example.com",
    messagePh: "How can we help?",
    terms: "I accept the terms of use of the site and the privacy notice on the processing of personal data.",
    send: "Send",
    mailHint: "Your email app will open with the message ready to send.",
    mapTitle: "Find us",
    openMaps: "Open in Google Maps",
    subject: "Message from the website",
  },
};

const ar: PageContent = {
  home: {
    learnMore: "اعرف المزيد",
    aboutKicker: "من نحن",
    aboutTitle: "مطعم أَلُّورا",
    aboutText:
      "سوريا أرضٌ أثّرت دائمًا في ثقافة منطقة المتوسط كلها، وجعلت من عطور ونكهات بعيدة نكهاتها الخاصة، فوصلت إلى موانئ كثيرة مع بحّارتها والسفن الكبيرة التي كانت تأتي لتحميل التوابل على سواحلها.",
    offerTitle: "ماذا نقدّم",
    testimonialsTitle: "ماذا يقول ضيوفنا",
  },
  offer: {
    ristorante: {
      title: "المطعم",
      text: "يُعدّ المطبخ الشرق أوسطي، والسوري واللبناني منه خصوصًا، أساسًا ونقطة انطلاق للعديد من…",
    },
    cuisine: {
      title: "المطبخ السوري واللبناني",
      text: "عندما نتحدث عن المطبخ الشرق أوسطي، فإننا نقصد في الواقع التقاليد السورية واللبنانية…",
    },
    delivery: {
      title: "التوصيل إلى المنزل",
      text: "لمن يرغب في تذوّق المطبخ السوري واللبناني في المنزل دون عناء حجز طاولة…",
    },
    evenings: {
      title: "أمسيات الموسيقى والطعام والكتب",
      text: "ترى التقاليد الشرق أوسطية في وقت الطعام فرحةً وفرصةً للّقاء. نقدّم لكم أمسيات…",
    },
  },
  about: {
    title: "من نحن",
    intro:
      "سوريا أرضٌ أثّرت دائمًا في ثقافة منطقة المتوسط كلها، وجعلت من عطور ونكهات بعيدة نكهاتها الخاصة، فوصلت إلى موانئ كثيرة مع بحّارتها والسفن الكبيرة التي كانت تأتي لتحميل التوابل على سواحلها.",
    lead: "عطور غريبة ومكوّنات منتقاة وتراث عريق في صميم مطبخ هذه البلاد، وقد قررنا أن نقدّمه لكل محبّي الطعام الجيد.",
    body: "كما في كل المطبخ الشرق أوسطي، تغلب النكهات القوية وعطر التوابل، مع طرق طهي تقليدية تختلف عن تلك المستخدمة في إيطاليا، ومكوّنات كثيرة تُمزج بطريقة فريدة.",
    story1:
      "يأخذك مطعمنا في قلب جنوى في رحلة إلى أجواء لا تُنسى، غريبة ومألوفة في آنٍ واحد، لأنها تمثّل المتوسط كله. فقد حملت سوريا ولبنان بموانئهما التوابل لآلاف السنين إلى موائد كل البلدان المطلة على بحرنا الكبير، ونقلت السفن تقاليد بلاد بعيدة. وقد عرف طهاتنا كيف يمزجونها لتقديم مذاق مميز وحيّ. في أجواء هادئة ومريحة بأسلوب شرق أوسطي خالص، يمكنك الاستمتاع بأفضل أطباق تراثنا. اكتشف نكهات لا تُحصى قائمة على الدجاج والضأن والخضار والبقوليات والحبوب، محضّرة وفق تقليد قديم تلتقي فيه حموضة الحمضيات وحلاوة العسل وغنى الحمص.",
    story2:
      "تمنحك قائمتنا خيارات كثيرة للتجربة، بين أطباق منفردة أو تذوّق مشترك على الطاولة مع الأصدقاء. فكرتنا ليست مطعمًا فحسب، بل مكانًا يُعاش، نقدّم فيه قراءات وموسيقى تقليدية حيّة لنصنع الأجواء وتبادلًا ثقافيًا غنيًا. دع نفسك تنجذب إلى رائحة مطبخنا الآسرة وإلى الأجواء الدافئة العفوية لمكان يتبادل فيه الناس الحديث والطعام، أو تمتّع بشاي بالتوابل وأنت تستمتع بالمكان في الأمسيات الثقافية الخاصة. مكاننا مساحة للمشاركة والنمو تشعر فيها أنك في بيتك منذ لحظة دخولك. مكان مفتوح لكل من يحب التعرّف على الآخرين ومشاركة المائدة واكتشاف الجديد بفضول المسافر الطبيعي.",
    cta: "شاهد القائمة",
  },
  services: {
    title: "خدماتنا",
    intro: "من العشاء على الطاولة إلى أمسيات الموسيقى والكتب، وحتى التوصيل إلى بابك.",
  },
  contact: {
    title: "اتصل بنا",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    address: "العنوان",
    hours: "ساعات العمل",
    mon: "الاثنين",
    tueSun: "الثلاثاء – الأحد",
    closed: "مغلق",
    formTitle: "راسلنا",
    name: "الاسم الأول",
    surname: "اسم العائلة",
    emailLabel: "البريد الإلكتروني",
    message: "الرسالة",
    namePh: "اسمك الأول",
    surnamePh: "اسم عائلتك",
    emailPh: "name@example.com",
    messagePh: "كيف يمكننا مساعدتك؟",
    terms: "أوافق على شروط استخدام الموقع وعلى إشعار الخصوصية بشأن معالجة البيانات الشخصية.",
    send: "إرسال",
    mailHint: "سيُفتح تطبيق البريد لديك والرسالة جاهزة للإرسال.",
    mapTitle: "موقعنا",
    openMaps: "افتح في خرائط جوجل",
    subject: "رسالة من الموقع",
  },
};

export const PAGES: Record<Locale, PageContent> = { it, en, ar };
