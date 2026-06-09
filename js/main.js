/* ============================================================
   TECHSINNO — main.js (Clean rebuild v5)
   EN / FR / AF / PT — 4 services
   ============================================================ */

// ── Translations ─────────────────────────────────────────────
const T = {
  en: {
    nav: ['Services','IoT','About','Contact','Portal'],
    hero_eyebrow: 'Engineering · Automation · IoT',
    hero_line1: 'SMART',
    hero_line2: 'ENGINEERING',
    hero_line3: 'SOLUTIONS',
    taglines: [
      '> Electronics. Automation. IoT.',
      '> Built for industry. Built for Africa.',
      '> From Cape Town to Kinshasa.',
      '> Where Mechatronics meets innovation.',
    ],
    hero_btn1: 'Get a Quote',
    hero_btn2: 'Our Services',
    stat1: 'YEARS EXP',
    stat2: 'COUNTRIES',
    stat3: 'SERVICE LINES',
    stat4: 'LANGUAGES',
    services_label: 'What we do',
    services_title: 'FOUR CORE\nSERVICES',
    services_desc: 'End-to-end engineering solutions — from component-level repair to cloud-connected agricultural sensors.',
    s1_title: 'ELECTRONICS\nENGINEERING',
    s1_desc: 'Full-cycle electronics services — consultation, design, build, installation, maintenance, and B2B repair of industrial and commercial electronics.',
    s1_link: 'Get started',
    s2_title: 'PCB DESIGN &\nENGINEERING',
    s2_desc: 'Professional PCB design — schematic capture, PCB layout, DRC/ERC checks, and manufacturing-ready Gerber file output.',
    s2_link: 'Start design',
    s3_title: 'INDUSTRIAL\nAUTOMATION',
    s3_desc: 'PLC programming, SCADA integration, plant & machinery maintenance, lab equipment servicing, and automated control systems.',
    s3_link: 'Start a project',
    s4_title: 'AGRICULTURAL\nIoT',
    s4_desc: 'End-to-end sensor networks for farms — soil, climate, irrigation — with cloud dashboards and real-time alerts.',
    s4_link: 'Deploy sensors',
    iot_label: 'Agricultural IoT',
    iot_title: 'YOUR FARM DATA,\nANYWHERE',
    iot_p1: 'Custom Arduino and ESP32 sensor networks transmit live field data to an Azure cloud dashboard. Monitor soil moisture, temperature, pH, and irrigation status in real time.',
    iot_p2: 'Get SMS or email alerts when thresholds are breached. No more walking the fields to check.',
    iot_f1: 'Real-time sensor data via MQTT / HTTPS',
    iot_f2: 'Azure IoT Hub — 8,000 messages/day free',
    iot_f3: 'Custom web dashboard per client',
    iot_f4: 'SMS + email threshold alerts',
    iot_f5: 'Solar-powered nodes for remote fields',
    about_label: 'About TECHSINNO',
    about_title: 'ENGINEERS.\nBUILDERS.\nSOLVERS.',
    about_p1: 'TECHSINNO (Pty) Ltd is a registered South African engineering company specialising in electronics, PCB design, industrial automation, and agricultural IoT — serving both South Africa and the Democratic Republic of Congo.',
    about_p2: 'Led by a practising mechatronics and electronics engineer, TECHSINNO combines hands-on hardware expertise with modern cloud and software integration.',
    about_p3: 'Headquartered in Kuilsriver, Western Cape, with planned expansion into Kinshasa, DRC.',
    sa_title: 'SOUTH AFRICA',
    sa_desc: 'Headquarters in Kuilsriver, Western Cape. Serving industrial, agricultural, and commercial clients across South Africa.',
    drc_title: 'DR CONGO',
    drc_desc: 'Expanding into Kinshasa and the broader DRC market — bringing automation, IoT, and electronics expertise to Central Africa.',
    contact_label: 'Get in touch',
    contact_title: 'REQUEST A\nQUOTE',
    c_email: 'Email',
    c_avail: 'Availability',
    c_avail_val: 'Site visits: Weekends\nQuotes & design: Evenings',
    c_reg: 'Registered Business',
    fn_label: 'First Name',
    ln_label: 'Last Name',
    co_label: 'Company',
    email_label: 'Email Address',
    service_label: 'Service Required',
    svc_opt0: 'Select a service',
    svc_opt1: 'Electronics Engineering',
    svc_opt1b: 'Electronics Engineering',
    svc_opt2: 'PCB Design & Engineering',
    svc_opt3: 'Industrial Automation',
    svc_opt4: 'Agricultural IoT',
    svc_opt5: 'Other / Consultation',
    msg_label: 'Project Description',
    msg_ph: 'Describe your project or problem...',
    submit_btn: 'Send Request →',
    portal_label: 'Client Portal',
    portal_title: 'CLIENT\nACCESS',
    portal_sub: '// Secure portal — clients only',
    portal_email: 'Email address',
    portal_pass: 'Password',
    portal_btn: 'Sign In →',
    portal_note: 'Access provided after project onboarding.',
    pf1_title: 'IOT DASHBOARDS',
    pf1_desc: 'Live sensor feeds and historical data for your agricultural or industrial deployment.',
    pf2_title: 'PROJECT STATUS',
    pf2_desc: 'Track repair and automation project progress, milestones, and delivery dates.',
    pf3_title: 'INVOICES & DOCS',
    pf3_desc: 'Download invoices, technical reports, and maintenance schedules.',
    footer_desc: 'Registered South African engineering company — Electronics, PCB Design, Industrial Automation, and Agricultural IoT.',
    fc1: 'Services',
    fc2: 'Company',
    fc3: 'Contact',
    fl_s1: 'Electronics Engineering',
    fl_s2: 'PCB Design & Engineering',
    fl_s3: 'Industrial Automation',
    fl_s4: 'Agricultural IoT',
    fl_c1: 'About Us',
    fl_c3: 'SA Operations',
    fl_c4: 'DRC Operations',
    fl_e1: 'techsinno0@gmail.com',
    fl_e2: 'Kuilsriver, Western Cape',
    fl_e3: 'South Africa & DRC',
    copy: '© 2026 TECHSINNO (Pty) Ltd — All rights reserved.',
    nav_process: 'Process',
    process_label: 'How it works',
    process_title: 'FROM CONCEPT\nTO COMPLETION',
    process_intro: 'Every project follows our proven full-cycle process — we stay with you from the first conversation to long-term maintenance.',
    ps1_t: 'Consultation', ps1_d: 'We listen to your needs and scope the right solution.',
    ps2_t: 'Design', ps2_d: 'Engineering design, schematics, and documentation.',
    ps3_t: 'Prototyping', ps3_d: 'Build and test a working prototype before production.',
    ps4_t: 'Build & Install', ps4_d: 'Full assembly, installation, and commissioning.',
    ps5_t: 'Maintenance', ps5_d: 'Ongoing support, maintenance, and repairs.',
    nav_booking: 'Booking',
    booking_label: 'Book with us',
    booking_title: 'SCHEDULE A\nSESSION',
    booking_intro: "Choose how you'd like to engage with us — a virtual meeting, an on-site consultation, or a technical call-out visit.",
    bk_meeting_t: 'Virtual Meeting',
    bk_meeting_d: 'Online video call to discuss your project remotely.',
    bk_consult_t: 'Consultation',
    bk_consult_d: 'In-depth technical consultation for your requirements.',
    bk_site_t: 'Site Visit / Call-out',
    bk_site_d: 'On-site assessment, repair, or installation visit.',
    bk_phone: 'Phone Number',
    bk_date: 'Preferred Date',
    bk_time: 'Preferred Time',
    bk_address: 'Site Address (for visits)',
    bk_notes: 'Notes',
    bk_notes_ph: "Tell us what you'd like to discuss...",
    bk_submit: 'Request Booking →',
    bk_note: "We'll confirm your booking by email within 1 business day.",
  },

  fr: {
    nav: ['Services','IoT','À propos','Contact','Portail'],
    hero_eyebrow: 'Ingénierie · Automatisation · IoT',
    hero_line1: 'SOLUTIONS',
    hero_line2: "D'INGÉNIERIE",
    hero_line3: 'INTELLIGENTES',
    taglines: [
      '> Électronique. Automatisation. IoT.',
      '> Conçu pour l\'industrie. Conçu pour l\'Afrique.',
      '> De Cape Town à Kinshasa.',
      '> Là où la mécatronique rencontre l\'innovation.',
    ],
    hero_btn1: 'Obtenir un Devis',
    hero_btn2: 'Nos Services',
    stat1: 'ANS EXP',
    stat2: 'PAYS',
    stat3: 'SERVICES',
    stat4: 'LANGUES',
    services_label: 'Ce que nous faisons',
    services_title: 'QUATRE SERVICES\nPRINCIPAUX',
    services_desc: "Solutions d'ingénierie de bout en bout — réparation au niveau composant jusqu'aux capteurs agricoles connectés au cloud.",
    s1_title: 'INGÉNIERIE\nÉLECTRONIQUE',
    s1_desc: "Services électroniques complets — consultation, conception, construction, installation, maintenance et réparation B2B d'électronique industrielle et commerciale.",
    s1_link: 'Commencer',
    s2_title: 'CONCEPTION\nPCB',
    s2_desc: "Conception PCB professionnelle — capture de schémas, mise en page PCB, vérifications DRC/ERC et fichiers Gerber prêts pour fabrication.",
    s2_link: 'Démarrer conception',
    s3_title: 'AUTOMATISATION\nINDUSTRIELLE',
    s3_desc: "Programmation PLC, intégration SCADA, maintenance d'usines et machines, service d'équipements de laboratoire, et systèmes de contrôle automatisés.",
    s3_link: 'Démarrer un projet',
    s4_title: 'IoT\nAGRICOLE',
    s4_desc: "Réseaux de capteurs pour les fermes — sol, climat, irrigation — avec tableaux de bord cloud et alertes en temps réel.",
    s4_link: 'Déployer capteurs',
    iot_label: 'IoT Agricole',
    iot_title: 'VOS DONNÉES\nDE FERME, PARTOUT',
    iot_p1: "Des réseaux de capteurs Arduino et ESP32 transmettent des données en direct vers un tableau de bord Azure Cloud.",
    iot_p2: "Recevez des alertes SMS ou email lorsque des seuils sont dépassés.",
    iot_f1: 'Données en temps réel via MQTT / HTTPS',
    iot_f2: 'Azure IoT Hub — 8 000 messages/jour gratuits',
    iot_f3: 'Tableau de bord web personnalisé par client',
    iot_f4: 'Alertes SMS + email par seuil',
    iot_f5: 'Nœuds alimentés solaires pour champs éloignés',
    about_label: 'À propos de TECHSINNO',
    about_title: 'INGÉNIEURS.\nCONSTRUCTEURS.\nSOLUTIONS.',
    about_p1: "TECHSINNO (Pty) Ltd est une société d'ingénierie sud-africaine spécialisée en électronique, conception PCB, automatisation industrielle et IoT agricole — au service de l'Afrique du Sud et de la RDC.",
    about_p2: "Dirigée par un ingénieur en mécatronique, TECHSINNO combine expertise matérielle avec intégration cloud et logicielle.",
    about_p3: "Siège à Kuilsriver, Western Cape, avec expansion planifiée à Kinshasa, RDC.",
    sa_title: 'AFRIQUE DU SUD',
    sa_desc: "Siège à Kuilsriver, Western Cape. Au service de clients industriels, agricoles et commerciaux en Afrique du Sud.",
    drc_title: 'RD CONGO',
    drc_desc: "Expansion à Kinshasa et dans le marché RDC — apportant automatisation, IoT et expertise électronique en Afrique centrale.",
    contact_label: 'Contactez-nous',
    contact_title: 'DEMANDER\nUN DEVIS',
    c_email: 'Email',
    c_avail: 'Disponibilité',
    c_avail_val: 'Visites: Fins de semaine\nDevis: Soirées',
    c_reg: 'Société Enregistrée',
    fn_label: 'Prénom',
    ln_label: 'Nom',
    co_label: 'Entreprise',
    email_label: 'Adresse Email',
    service_label: 'Service Requis',
    svc_opt0: 'Sélectionner un service',
    svc_opt1: 'Ingénierie Électronique',
    svc_opt1b: 'Ingénierie Électronique',
    svc_opt2: 'Conception PCB',
    svc_opt3: 'Automatisation Industrielle',
    svc_opt4: 'IoT Agricole',
    svc_opt5: 'Autre / Consultation',
    msg_label: 'Description du Projet',
    msg_ph: 'Décrivez votre projet ou problème...',
    submit_btn: 'Envoyer la Demande →',
    portal_label: 'Portail Client',
    portal_title: 'ACCÈS\nCLIENT',
    portal_sub: '// Portail sécurisé — clients uniquement',
    portal_email: 'Adresse email',
    portal_pass: 'Mot de passe',
    portal_btn: 'Se connecter →',
    portal_note: "Accès fourni après l'intégration du projet.",
    pf1_title: 'TABLEAUX DE BORD IoT',
    pf1_desc: "Données capteurs en direct et historiques pour votre déploiement.",
    pf2_title: 'ÉTAT DU PROJET',
    pf2_desc: "Suivez l'avancement de vos projets.",
    pf3_title: 'FACTURES & DOCS',
    pf3_desc: "Téléchargez factures, rapports et calendriers de maintenance.",
    footer_desc: "Société d'ingénierie sud-africaine — Électronique, Conception PCB, Automatisation Industrielle et IoT Agricole.",
    fc1: 'Services', fc2: 'Société', fc3: 'Contact',
    fl_s1: 'Ingénierie Électronique', fl_s2: 'Conception PCB',
    fl_s3: 'Automatisation Industrielle', fl_s4: 'IoT Agricole',
    fl_c1: 'À propos', fl_c3: 'Opérations SA', fl_c4: 'Opérations RDC',
    fl_e1: 'techsinno0@gmail.com', fl_e2: 'Kuilsriver, Western Cape', fl_e3: 'Afrique du Sud & RDC',
    copy: '© 2026 TECHSINNO (Pty) Ltd — Tous droits réservés.',
    nav_process: 'Processus',
    process_label: 'Comment ça marche',
    process_title: 'DU CONCEPT À\nLA RÉALISATION',
    process_intro: "Chaque projet suit notre processus complet éprouvé — nous restons avec vous de la première conversation à la maintenance à long terme.",
    ps1_t: 'Consultation', ps1_d: 'Nous écoutons vos besoins et définissons la bonne solution.',
    ps2_t: 'Conception', ps2_d: 'Conception technique, schémas et documentation.',
    ps3_t: 'Prototypage', ps3_d: 'Construire et tester un prototype avant la production.',
    ps4_t: 'Construction', ps4_d: 'Assemblage complet, installation et mise en service.',
    ps5_t: 'Maintenance', ps5_d: 'Support continu, maintenance et réparations.',
    nav_booking: 'Réservation',
    booking_label: 'Réservez avec nous',
    booking_title: 'PLANIFIER UNE\nSESSION',
    booking_intro: "Choisissez comment vous souhaitez nous contacter — une réunion virtuelle, une consultation sur site ou une visite technique.",
    bk_meeting_t: 'Réunion Virtuelle',
    bk_meeting_d: 'Appel vidéo en ligne pour discuter de votre projet à distance.',
    bk_consult_t: 'Consultation',
    bk_consult_d: 'Consultation technique approfondie pour vos besoins.',
    bk_site_t: 'Visite sur Site',
    bk_site_d: "Évaluation, réparation ou installation sur site.",
    bk_phone: 'Téléphone',
    bk_date: 'Date Préférée',
    bk_time: 'Heure Préférée',
    bk_address: 'Adresse du Site (pour visites)',
    bk_notes: 'Notes',
    bk_notes_ph: "Dites-nous ce dont vous aimeriez discuter...",
    bk_submit: 'Demander une Réservation →',
    bk_note: "Nous confirmerons votre réservation par email sous 1 jour ouvrable.",
  },

  af: {
    nav: ['Dienste','IoT','Oor Ons','Kontak','Portaal'],
    hero_eyebrow: 'Ingenieurswese · Outomatisering · IoT',
    hero_line1: 'SLIM',
    hero_line2: 'INGENIEURS',
    hero_line3: 'OPLOSSINGS',
    taglines: [
      '> Elektronika. Outomatisering. IoT.',
      '> Gebou vir industrie. Gebou vir Afrika.',
      '> Van Kaapstad tot Kinshasa.',
      '> Waar megatroniek innovasie ontmoet.',
    ],
    hero_btn1: 'Kry \'n Kwotasie',
    hero_btn2: 'Ons Dienste',
    stat1: 'JAAR ERV',
    stat2: 'LANDE',
    stat3: 'DIENSLYNE',
    stat4: 'TALE',
    services_label: 'Wat ons doen',
    services_title: 'VIER KERN\nDIENSTE',
    services_desc: 'End-tot-end ingenieursoplossings — van komponent-vlak herstel tot wolkverbonde landbousensors.',
    s1_title: 'ELEKTRONIKA\nINGENIEURSWESE',
    s1_desc: 'Volledige elektroniese dienste — konsultasie, ontwerp, bou, installasie, onderhoud en B2B herstel van industriële en kommersiële elektronika.',
    s1_link: 'Begin',
    s2_title: 'PCB-ONTWERP &\nINGENIEURSWESE',
    s2_desc: 'Professionele PCB-ontwerp — skematiese vaslegging, PCB-uitleg, DRC/ERC-kontroles en vervaardigingsgereed Gerber-uitset.',
    s2_link: 'Begin ontwerp',
    s3_title: 'INDUSTRIËLE\nOUTOMATISERING',
    s3_desc: 'PLC-programmering, SCADA-integrasie, aanleg- en masjienonderhoud, laboratoriumtoerusting en outomatiese beheerstelsels.',
    s3_link: 'Begin projek',
    s4_title: 'LANDBOU\nIoT',
    s4_desc: 'End-tot-end sensornetwerke vir plase — grond, klimaat, besproeiing — met wolkpanele en intydse waarskuwings.',
    s4_link: 'Ontplooi sensors',
    iot_label: 'Landbou IoT',
    iot_title: 'JOU PLAASDATA,\nORALKANT',
    iot_p1: 'Pasgemaakte Arduino en ESP32 sensornetwerke stuur lewendige velddata na \'n Azure wolkpaneel.',
    iot_p2: 'Ontvang SMS- of e-poswaarskuwings wanneer drempelwaardes oorskry word.',
    iot_f1: 'Intydse sensordata via MQTT / HTTPS',
    iot_f2: 'Azure IoT Hub — 8,000 boodskappe/dag gratis',
    iot_f3: 'Pasgemaakte webpaneel per kliënt',
    iot_f4: 'SMS + e-pos drempelwaarskuwings',
    iot_f5: 'Son-aangedrewe nodusse vir afgeleë velde',
    about_label: 'Oor TECHSINNO',
    about_title: 'INGENIEURS.\nBOUERS.\nOPLOSSERS.',
    about_p1: 'TECHSINNO (Pty) Ltd is \'n geregistreerde SA-ingenieursmaatskappy gespesialiseer in elektronika, PCB-ontwerp, industriële outomatisering en landbou-IoT.',
    about_p2: 'Gelei deur \'n megatronika- en elektroniese ingenieur, kombineer TECHSINNO praktiese hardeware-kundigheid met moderne wolkintegrasie.',
    about_p3: 'Gesetel in Kuilsrivier, Wes-Kaap, met beplande uitbreiding na Kinshasa, DRK.',
    sa_title: 'SUID-AFRIKA',
    sa_desc: 'Hoofkantoor in Kuilsrivier, Wes-Kaap. Bedien industriële, landbou- en kommersiële kliënte.',
    drc_title: 'DR KONGO',
    drc_desc: 'Uitbreiding na Kinshasa en die breër DRK-mark.',
    contact_label: 'Kontak ons',
    contact_title: 'VERSOEK \'N\nKWOTASIE',
    c_email: 'E-pos', c_avail: 'Beskikbaarheid',
    c_avail_val: 'Terreinbesoeke: Naweke\nKwotasies: Aande',
    c_reg: 'Geregistreerde Besigheid',
    fn_label: 'Voornaam', ln_label: 'Van', co_label: 'Maatskappy',
    email_label: 'E-posadres', service_label: 'Diens Benodig',
    svc_opt0: 'Kies \'n diens',
    svc_opt1: 'Elektroniese Ingenieurswese',
    svc_opt1b: 'Elektroniese Ingenieurswese',
    svc_opt2: 'PCB-Ontwerp',
    svc_opt3: 'Industriële Outomatisering',
    svc_opt4: 'Landbou IoT',
    svc_opt5: 'Ander / Konsultasie',
    msg_label: 'Projekbeskrywing',
    msg_ph: 'Beskryf jou projek of probleem...',
    submit_btn: 'Stuur Versoek →',
    portal_label: 'Kliëntportaal',
    portal_title: 'KLIËNT\nTOEGANG',
    portal_sub: '// Veilige portaal — slegs kliënte',
    portal_email: 'E-posadres', portal_pass: 'Wagwoord',
    portal_btn: 'Teken in →',
    portal_note: 'Toegang verleen na projekaanboord.',
    pf1_title: 'IOT PANELE', pf1_desc: 'Lewendige sensordata vir jou ontplooiing.',
    pf2_title: 'PROJEKSTATUS', pf2_desc: 'Volg projekvordering en leweringsdatums.',
    pf3_title: 'FAKTURE & DOKUMENTE', pf3_desc: 'Laai fakture en tegniese verslae af.',
    footer_desc: 'Geregistreerde SA-ingenieursmaatskappy — Elektronika, PCB-Ontwerp, Outomatisering en Landbou-IoT.',
    fc1: 'Dienste', fc2: 'Maatskappy', fc3: 'Kontak',
    fl_s1: 'Elektroniese Ingenieurswese', fl_s2: 'PCB-Ontwerp',
    fl_s3: 'Industriële Outomatisering', fl_s4: 'Landbou IoT',
    fl_c1: 'Oor Ons', fl_c3: 'SA Bedrywighede', fl_c4: 'DRK Bedrywighede',
    fl_e1: 'techsinno0@gmail.com', fl_e2: 'Kuilsrivier, Wes-Kaap', fl_e3: 'Suid-Afrika & DRK',
    copy: '© 2026 TECHSINNO (Pty) Ltd — Alle regte voorbehou.',
    nav_process: 'Proses',
    process_label: 'Hoe dit werk',
    process_title: 'VAN KONSEP TOT\nVOLTOOIING',
    process_intro: "Elke projek volg ons bewese volledige proses — ons bly by u van die eerste gesprek tot langtermyn-onderhoud.",
    ps1_t: 'Konsultasie', ps1_d: 'Ons luister na u behoeftes en bepaal die regte oplossing.',
    ps2_t: 'Ontwerp', ps2_d: 'Ingenieursontwerp, skemas en dokumentasie.',
    ps3_t: 'Prototipering', ps3_d: 'Bou en toets \'n werkende prototipe voor produksie.',
    ps4_t: 'Bou & Installeer', ps4_d: 'Volledige montering, installasie en inbedryfstelling.',
    ps5_t: 'Onderhoud', ps5_d: 'Deurlopende ondersteuning, onderhoud en herstel.',
    nav_booking: 'Bespreking',
    booking_label: 'Bespreek by ons',
    booking_title: 'SKEDULEER \'N\nSESSIE',
    booking_intro: "Kies hoe u met ons wil skakel — 'n virtuele vergadering, 'n konsultasie ter plaatse, of 'n tegniese uitroepbesoek.",
    bk_meeting_t: 'Virtuele Vergadering',
    bk_meeting_d: 'Aanlyn video-oproep om u projek op afstand te bespreek.',
    bk_consult_t: 'Konsultasie',
    bk_consult_d: 'Deeglike tegniese konsultasie vir u behoeftes.',
    bk_site_t: 'Terreinbesoek / Uitroep',
    bk_site_d: 'Assessering, herstel of installasie ter plaatse.',
    bk_phone: 'Telefoonnommer',
    bk_date: 'Voorkeurdatum',
    bk_time: 'Voorkeurtyd',
    bk_address: 'Terreinadres (vir besoeke)',
    bk_notes: 'Notas',
    bk_notes_ph: "Vertel ons waaroor u wil gesels...",
    bk_submit: 'Versoek Bespreking →',
    bk_note: "Ons sal u bespreking per e-pos binne 1 werksdag bevestig.",
  },

  pt: {
    nav: ['Serviços','IoT','Sobre','Contacto','Portal'],
    hero_eyebrow: 'Engenharia · Automação · IoT',
    hero_line1: 'SOLUÇÕES',
    hero_line2: 'DE ENGENHARIA',
    hero_line3: 'INTELIGENTES',
    taglines: [
      '> Electrónica. Automação. IoT.',
      '> Construído para a indústria. Construído para África.',
      '> De Cape Town a Kinshasa.',
      '> Onde a mecatrónica encontra a inovação.',
    ],
    hero_btn1: 'Pedir Orçamento',
    hero_btn2: 'Os Nossos Serviços',
    stat1: 'ANOS EXP',
    stat2: 'PAÍSES',
    stat3: 'SERVIÇOS',
    stat4: 'LÍNGUAS',
    services_label: 'O que fazemos',
    services_title: 'QUATRO SERVIÇOS\nPRINCIPAIS',
    services_desc: 'Soluções de engenharia completas — da reparação ao nível de componentes a sensores agrícolas ligados à nuvem.',
    s1_title: 'ENGENHARIA\nELECTRÓNICA',
    s1_desc: 'Serviços electrónicos completos — consulta, design, construção, instalação, manutenção e reparação B2B de electrónica industrial e comercial.',
    s1_link: 'Começar',
    s2_title: 'DESIGN\nPCB',
    s2_desc: 'Design PCB profissional — captura de esquemas, layout PCB, verificações DRC/ERC e ficheiros Gerber prontos para fabrico.',
    s2_link: 'Iniciar design',
    s3_title: 'AUTOMAÇÃO\nINDUSTRIAL',
    s3_desc: 'Programação PLC, integração SCADA, manutenção de fábricas e máquinas, serviço de equipamentos de laboratório e sistemas de controlo automatizados.',
    s3_link: 'Iniciar projecto',
    s4_title: 'IoT\nAGRÍCOLA',
    s4_desc: 'Redes de sensores para explorações agrícolas — solo, clima, irrigação — com painéis na nuvem e alertas em tempo real.',
    s4_link: 'Instalar sensores',
    iot_label: 'IoT Agrícola',
    iot_title: 'OS SEUS DADOS\nDE EXPLORAÇÃO, EM QUALQUER LUGAR',
    iot_p1: 'Redes de sensores Arduino e ESP32 transmitem dados em directo para um painel Azure Cloud.',
    iot_p2: 'Receba alertas SMS ou email quando os limites são ultrapassados.',
    iot_f1: 'Dados em tempo real via MQTT / HTTPS',
    iot_f2: 'Azure IoT Hub — 8.000 mensagens/dia gratuitas',
    iot_f3: 'Painel web personalizado por cliente',
    iot_f4: 'Alertas SMS + email por limite',
    iot_f5: 'Nós alimentados a energia solar para campos remotos',
    about_label: 'Sobre a TECHSINNO',
    about_title: 'ENGENHEIROS.\nCONSTRUTORES.\nSOLUÇÕES.',
    about_p1: 'A TECHSINNO (Pty) Ltd é uma empresa de engenharia sul-africana registada, especializada em electrónica, design PCB, automação industrial e IoT agrícola.',
    about_p2: 'Liderada por um engenheiro de mecatrónica, combina experiência prática de hardware com integração moderna de cloud.',
    about_p3: 'Sede em Kuilsriver, Western Cape, com expansão planeada para Kinshasa, RDC.',
    sa_title: 'ÁFRICA DO SUL',
    sa_desc: 'Sede em Kuilsriver, Western Cape. Ao serviço de clientes industriais, agrícolas e comerciais.',
    drc_title: 'RD CONGO',
    drc_desc: 'Expansão para Kinshasa e o mercado mais amplo da RDC.',
    contact_label: 'Entre em contacto',
    contact_title: 'PEDIR\nORÇAMENTO',
    c_email: 'Email', c_avail: 'Disponibilidade',
    c_avail_val: 'Visitas: Fins de semana\nOrçamentos: Serões',
    c_reg: 'Empresa Registada',
    fn_label: 'Nome Próprio', ln_label: 'Apelido', co_label: 'Empresa',
    email_label: 'Endereço de Email', service_label: 'Serviço Necessário',
    svc_opt0: 'Seleccionar serviço',
    svc_opt1: 'Engenharia Electrónica',
    svc_opt1b: 'Engenharia Electrónica',
    svc_opt2: 'Design PCB',
    svc_opt3: 'Automação Industrial',
    svc_opt4: 'IoT Agrícola',
    svc_opt5: 'Outro / Consultoria',
    msg_label: 'Descrição do Projecto',
    msg_ph: 'Descreva o seu projecto ou problema...',
    submit_btn: 'Enviar Pedido →',
    portal_label: 'Portal do Cliente',
    portal_title: 'ACESSO\nCLIENTE',
    portal_sub: '// Portal seguro — apenas clientes',
    portal_email: 'Endereço de email', portal_pass: 'Palavra-passe',
    portal_btn: 'Entrar →',
    portal_note: 'Acesso fornecido após integração do projecto.',
    pf1_title: 'PAINÉIS IoT', pf1_desc: 'Dados de sensores em directo para a sua instalação.',
    pf2_title: 'ESTADO DO PROJECTO', pf2_desc: 'Acompanhe o progresso dos projectos.',
    pf3_title: 'FACTURAS & DOCS', pf3_desc: 'Descarregue facturas e relatórios técnicos.',
    footer_desc: 'Empresa de engenharia sul-africana — Electrónica, Design PCB, Automação Industrial e IoT Agrícola.',
    fc1: 'Serviços', fc2: 'Empresa', fc3: 'Contacto',
    fl_s1: 'Engenharia Electrónica', fl_s2: 'Design PCB',
    fl_s3: 'Automação Industrial', fl_s4: 'IoT Agrícola',
    fl_c1: 'Sobre Nós', fl_c3: 'Operações SA', fl_c4: 'Operações RDC',
    fl_e1: 'techsinno0@gmail.com', fl_e2: 'Kuilsriver, Western Cape', fl_e3: 'África do Sul & RDC',
    copy: '© 2026 TECHSINNO (Pty) Ltd — Todos os direitos reservados.',
    nav_process: 'Processo',
    process_label: 'Como funciona',
    process_title: 'DO CONCEITO À\nCONCLUSÃO',
    process_intro: "Cada projecto segue o nosso processo completo comprovado — ficamos consigo desde a primeira conversa até à manutenção a longo prazo.",
    ps1_t: 'Consulta', ps1_d: 'Ouvimos as suas necessidades e definimos a solução certa.',
    ps2_t: 'Design', ps2_d: 'Design de engenharia, esquemas e documentação.',
    ps3_t: 'Prototipagem', ps3_d: 'Construir e testar um protótipo antes da produção.',
    ps4_t: 'Construção', ps4_d: 'Montagem completa, instalação e comissionamento.',
    ps5_t: 'Manutenção', ps5_d: 'Suporte contínuo, manutenção e reparações.',
    nav_booking: 'Marcação',
    booking_label: 'Marque connosco',
    booking_title: 'AGENDAR UMA\nSESSÃO',
    booking_intro: "Escolha como deseja contactar-nos — uma reunião virtual, uma consulta no local ou uma visita técnica.",
    bk_meeting_t: 'Reunião Virtual',
    bk_meeting_d: 'Videochamada online para discutir o seu projecto remotamente.',
    bk_consult_t: 'Consulta',
    bk_consult_d: 'Consulta técnica aprofundada para os seus requisitos.',
    bk_site_t: 'Visita ao Local',
    bk_site_d: 'Avaliação, reparação ou instalação no local.',
    bk_phone: 'Número de Telefone',
    bk_date: 'Data Preferida',
    bk_time: 'Hora Preferida',
    bk_address: 'Endereço do Local (para visitas)',
    bk_notes: 'Notas',
    bk_notes_ph: "Diga-nos o que gostaria de discutir...",
    bk_submit: 'Pedir Marcação →',
    bk_note: "Confirmaremos a sua marcação por email no prazo de 1 dia útil.",
  }
};

// ── State ────────────────────────────────────────────────────
let currentLang = 'en';
let taglineIndex = 0;
let charIndex = 0;
let isDeleting = false;

// ── Apply translations ───────────────────────────────────────
function applyLang(lang) {
  currentLang = lang;
  window._currentLang = lang;
  try { localStorage.setItem('techsinno_lang', lang); } catch(e) {}
  const t = T[lang];
  ['nav_0','nav_1','nav_2','nav_3','nav_4'].forEach((k,i) => { t[k] = t.nav[i]; });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.innerHTML = t[key].replace(/\n/g, '<br>');
      }
    }
  });
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.querySelectorAll('[data-i18n-option]').forEach(el => {
    const key = el.getAttribute('data-i18n-option');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  taglineIndex = 0; charIndex = 0; isDeleting = false;
}

// ── Typewriter ───────────────────────────────────────────────
function typewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const lines = T[currentLang].taglines;
  const current = lines[taglineIndex];
  if (isDeleting) {
    charIndex--;
    el.textContent = current.substring(0, charIndex);
    if (charIndex === 0) { isDeleting = false; taglineIndex = (taglineIndex + 1) % lines.length; }
    setTimeout(typewriter, 40);
  } else {
    charIndex++;
    el.textContent = current.substring(0, charIndex);
    if (charIndex === current.length) { isDeleting = true; setTimeout(typewriter, 2200); }
    else setTimeout(typewriter, 55);
  }
}

// ── Live clock ───────────────────────────────────────────────
function updateClock() {
  const el = document.getElementById('dash-clock');
  if (el) el.textContent = new Date().toLocaleTimeString('en-ZA', { hour12: false });
}

// ── Simulated sensor values ──────────────────────────────────
const sensors = {
  moisture: { base: 61,    range: 3,    id: 'val-moisture' },
  temp:     { base: 23.4,  range: 1.5,  id: 'val-temp'     },
  ph:       { base: 6.8,   range: 0.2,  id: 'val-ph'       },
  light:    { base: 42300, range: 2000, id: 'val-light'    },
};
function updateSensors() {
  Object.values(sensors).forEach(s => {
    const el = document.getElementById(s.id);
    if (!el) return;
    const val = s.base + (Math.random() - 0.5) * s.range;
    el.textContent = val < 100 ? val.toFixed(1) : Math.round(val).toLocaleString();
  });
}

// ── Scroll animations ────────────────────────────────────────
function initScrollAnim() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

// ── Navbar scroll ────────────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── Mobile nav ───────────────────────────────────────────────
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// ── Contact form ─────────────────────────────────────────────
function initForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const orig = btn.textContent;
    btn.textContent = '✓ SENT — WE\'LL BE IN TOUCH';
    btn.style.background = 'var(--green)';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 4000);
  });
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Load saved language (persists across pages & visits), default to English
  var savedLang = 'en';
  try { savedLang = localStorage.getItem('techsinno_lang') || 'en'; } catch(e) {}
  if (!T[savedLang]) savedLang = 'en';
  applyLang(savedLang);
  setTimeout(typewriter, 800);
  updateClock();
  setInterval(updateClock, 1000);
  updateSensors();
  setInterval(updateSensors, 3000);
  initScrollAnim();
  initNavbar();
  initMobileNav();
  initForm();


  // ── Service card navigation ──────────────────────────────
  document.querySelectorAll('.clickable-card[data-page]').forEach(card => {
    card.addEventListener('click', (e) => {
      const page = card.getAttribute('data-page');
      if (page) window.location.href = page;
    });
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
});
