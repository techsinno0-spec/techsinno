/* ============================================================
   TECHSINNO — main.js
   Language switching, animations, terminal, dashboard
   ============================================================ */

// ── Translations ────────────────────────────────────────────
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
    services_title: 'THREE CORE\nSERVICES',
    services_desc: 'End-to-end engineering solutions — from component-level repair to cloud-connected agricultural sensors.',
    s2_title: 'PCB DESIGN &\nENGINEERING',
    s2_desc: 'Professional PCB design — schematic capture, PCB layout, DRC/ERC checks, and manufacturing-ready Gerber file output.',
    s2_link: 'Start design',
    s3_title: 'INDUSTRIAL\nAUTOMATION',
    s3_desc: 'PLC programming, SCADA integration, plant & machinery maintenance, lab equipment servicing, and automated control systems.',
    s3_link: 'Start a project',
    s3_title: 'AGRICULTURAL\nIoT',
    s3_desc: 'End-to-end sensor networks for farms — soil, climate, irrigation — with cloud dashboards and real-time alerts.',
    s1_title: 'ELECTRONICS\nENGINEERING',
    s1_desc: 'Full-cycle electronics services — consultation, design, build, installation, maintenance, and B2B repair of industrial and commercial electronics.',
    s1_link: 'Get started',
    s4_title: 'AGRICULTURAL\nIoT',
    s4_desc: 'End-to-end sensor networks for farms — soil, climate, irrigation — with cloud dashboards and real-time alerts.',
    s4_link: 'Deploy sensors',
    s3_link: 'Start a project',
    iot_label: 'Agricultural IoT',
    iot_title: 'YOUR FARM DATA,\nANYWHERE',
    iot_p1: 'Custom Arduino and ESP32 sensor networks transmit live field data to an Azure cloud dashboard. Monitor soil moisture, temperature, pH, and irrigation status in real time.',
    iot_p2: 'Get SMS or email alerts when thresholds are breached. No more walking the fields to check. No expensive proprietary systems.',
    iot_f1: 'Real-time sensor data via MQTT / HTTPS',
    iot_f2: 'Azure IoT Hub — 8,000 messages/day free',
    iot_f3: 'Custom web dashboard per client',
    iot_f4: 'SMS + email threshold alerts',
    iot_f5: 'Solar-powered nodes for remote fields',
    about_label: 'About TECHSINNO',
    about_title: 'ENGINEERS.\nBUILDERS.\nSOLVERS.',
    about_p1: 'TECHSINNO (Pty) Ltd is a registered South African engineering company specialising in electronics repair, industrial automation, and agricultural IoT — with a clear mandate to serve both South Africa and the Democratic Republic of Congo.',
    about_p2: 'Led by a practising mechatronics and electronics engineer, TECHSINNO combines hands-on hardware expertise with modern cloud and software integration. Every solution is designed to be practical, reliable, and deployable in real industrial environments.',
    about_p3: 'Operations are headquartered in Kuilsriver, Western Cape, with planned expansion into Kinshasa, DRC — bringing affordable, high-quality engineering services to Central Africa.',
    sa_title: 'SOUTH AFRICA',
    sa_desc: 'Headquarters in Kuilsriver, Western Cape. Serving industrial, agricultural, and commercial clients across the Western Cape and beyond.',
    drc_title: 'DR CONGO',
    drc_desc: 'Expanding into Kinshasa and broader DRC market — bringing automation, IoT, and electronics expertise to Central Africa.',
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
    svc_opt1: 'Electronics Repair',
    svc_opt2: 'Industrial Automation',
    svc_opt3: 'Agricultural IoT',
    svc_opt4: 'Other / Consultation',
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
    pf3_desc: 'Download invoices, technical reports, and maintenance schedules from your portal.',
    footer_desc: 'Registered South African engineering company specialising in electronics repair, industrial automation, and agricultural IoT.',
    fc1: 'Services',
    fc2: 'Company',
    fc3: 'Contact',
    fl_s1: 'Electronics Repair',
    fl_s2: 'Industrial Automation',
    fl_s3: 'Agricultural IoT',
    fl_s4: 'Client Portal',
    fl_c1: 'About Us',
    fl_c2: 'Our Team',
    fl_c3: 'SA Operations',
    fl_c4: 'DRC Operations',
    fl_e1: 'techsinno0@gmail.com',
    fl_e2: 'Kuilsriver, Western Cape',
    fl_e3: 'South Africa & DRC',
    copy: '© 2026 TECHSINNO (Pty) Ltd — All rights reserved.',
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
    stat3: 'DOMAINES',
    stat4: 'LANGUES',
    services_label: 'Ce que nous faisons',
    services_title: 'TROIS SERVICES\nPRINCIPAUX',
    services_desc: "Solutions d'ingénierie de bout en bout — de la réparation au niveau des composants aux capteurs agricoles connectés au cloud.",
    s1_title: 'RÉPARATION\nÉLECTRONIQUE',
    s1_desc: "Recherche de pannes au niveau PCB, remplacement de composants et tests fonctionnels pour l'électronique industrielle et commerciale.",
    s1_link: 'Demander réparation',
    s2_title: 'AUTOMATISATION\nINDUSTRIELLE',
    s2_desc: "Programmation d'automates, intégration SCADA et systèmes de contrôle automatisés pour la fabrication et les processus industriels.",
    s2_link: 'Démarrer un projet',
    s3_title: 'IOT\nAGRICOLE',
    s3_desc: "Réseaux de capteurs de bout en bout pour les fermes — sol, climat, irrigation — avec tableaux de bord cloud et alertes en temps réel.",
    s3_link: 'Déployer capteurs',
    iot_label: 'IoT Agricole',
    iot_title: 'VOS DONNÉES\nDE FERME, PARTOUT',
    iot_p1: "Des réseaux de capteurs Arduino et ESP32 personnalisés transmettent des données de terrain en direct vers un tableau de bord cloud Azure. Surveillez l'humidité du sol, la température, le pH et l'état de l'irrigation en temps réel.",
    iot_p2: "Recevez des alertes SMS ou email lorsque des seuils sont dépassés. Plus besoin de parcourir les champs pour vérifier.",
    iot_f1: 'Données capteurs en temps réel via MQTT / HTTPS',
    iot_f2: 'Azure IoT Hub — 8 000 messages/jour gratuits',
    iot_f3: 'Tableau de bord web personnalisé par client',
    iot_f4: 'Alertes SMS + email par seuil',
    iot_f5: 'Nœuds alimentés solaires pour champs éloignés',
    about_label: 'À propos de TECHSINNO',
    about_title: 'INGÉNIEURS.\nCONSTRUCTEURS.\nSOLUTIONS.',
    about_p1: "TECHSINNO (Pty) Ltd est une société d'ingénierie sud-africaine enregistrée, spécialisée dans la réparation électronique, l'automatisation industrielle et l'IoT agricole — avec pour mandat de servir à la fois l'Afrique du Sud et la République Démocratique du Congo.",
    about_p2: "Dirigée par un ingénieur en mécatronique et électronique, TECHSINNO combine l'expertise matérielle pratique avec l'intégration cloud et logicielle moderne.",
    about_p3: "Le siège est à Kuilsriver, Western Cape, avec une expansion planifiée à Kinshasa, RDC.",
    sa_title: 'AFRIQUE DU SUD',
    sa_desc: "Siège à Kuilsriver, Western Cape. Au service des clients industriels, agricoles et commerciaux dans toute l'Afrique du Sud.",
    drc_title: 'RD CONGO',
    drc_desc: "Expansion à Kinshasa et dans le marché RDC — apportant l'automatisation, l'IoT et l'expertise électronique en Afrique centrale.",
    contact_label: 'Contactez-nous',
    contact_title: 'DEMANDER\nUN DEVIS',
    c_email: 'Email',
    c_avail: 'Disponibilité',
    c_avail_val: 'Visites: Weekends\nDevis & conception: Soirées',
    c_reg: 'Société Enregistrée',
    fn_label: 'Prénom',
    ln_label: 'Nom',
    co_label: 'Entreprise',
    email_label: 'Adresse Email',
    service_label: 'Service Requis',
    svc_opt0: 'Sélectionner un service',
    svc_opt1: 'Réparation Électronique',
    svc_opt2: 'Automatisation Industrielle',
    svc_opt3: 'IoT Agricole',
    svc_opt4: 'Autre / Consultation',
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
    pf1_desc: "Données capteurs en direct et historiques pour votre déploiement agricole ou industriel.",
    pf2_title: 'ÉTAT DU PROJET',
    pf2_desc: "Suivez l'avancement des projets de réparation et d'automatisation.",
    pf3_title: 'FACTURES & DOCS',
    pf3_desc: "Téléchargez factures, rapports techniques et calendriers de maintenance.",
    footer_desc: "Société d'ingénierie sud-africaine spécialisée dans la réparation électronique, l'automatisation industrielle et l'IoT agricole.",
    fc1: 'Services',
    fc2: 'Société',
    fc3: 'Contact',
    fl_s1: 'Réparation Électronique',
    fl_s2: 'Automatisation Industrielle',
    fl_s3: 'IoT Agricole',
    fl_s4: 'Portail Client',
    fl_c1: 'À propos',
    fl_c2: 'Notre Équipe',
    fl_c3: 'Opérations SA',
    fl_c4: 'Opérations RDC',
    fl_e1: 'techsinno0@gmail.com',
    fl_e2: 'Kuilsriver, Western Cape',
    fl_e3: 'Afrique du Sud & RDC',
    copy: '© 2026 TECHSINNO (Pty) Ltd — Tous droits réservés.',
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
    s1_desc: 'Serviços electrónicos completos — consulta, design, construção, instalação, manutenção e reparação ao nível PCB.',
    s1_link: 'Começar',
    s2_title: 'DESIGN\nPCB',
    s2_desc: 'Design PCB profissional — captura de esquemas, layout PCB, verificações DRC/ERC e ficheiros Gerber prontos para fabrico.',
    s2_link: 'Iniciar design',
    s3_title: 'AUTOMAÇÃO\nINDUSTRIAL',
    s3_desc: 'Programação PLC, integração SCADA, manutenção de fábricas e máquinas, serviço de equipamentos de laboratório.',
    s3_link: 'Iniciar projecto',
    s4_title: 'IoT\nAGRÍCOLA',
    s4_desc: 'Redes de sensores para explorações agrícolas — solo, clima, irrigação — com painéis na nuvem e alertas em tempo real.',
    s4_link: 'Instalar sensores',
    iot_label: 'IoT Agrícola',
    iot_title: 'OS SEUS DADOS\nDE EXPLORAÇÃO, EM QUALQUER LUGAR',
    iot_p1: 'Redes de sensores Arduino e ESP32 personalizadas transmitem dados em directo para um painel Azure Cloud.',
    iot_p2: 'Receba alertas SMS ou email quando os limites são ultrapassados. Sem necessidade de percorrer os campos para verificar.',
    iot_f1: 'Dados de sensores em tempo real via MQTT / HTTPS',
    iot_f2: 'Azure IoT Hub — 8.000 mensagens/dia gratuitas',
    iot_f3: 'Painel web personalizado por cliente',
    iot_f4: 'Alertas SMS + email por limite',
    iot_f5: 'Nós alimentados a energia solar para campos remotos',
    about_label: 'Sobre a TECHSINNO',
    about_title: 'ENGENHEIROS.\nCONSTRUTORES.\nSOLUÇÕES.',
    about_p1: 'A TECHSINNO (Pty) Ltd é uma empresa de engenharia sul-africana registada, especializada em reparação electrónica, automação industrial e IoT agrícola — com mandato para servir tanto a África do Sul como a República Democrática do Congo.',
    about_p2: 'Liderada por um engenheiro de mecatrónica e electrónica em exercício, a TECHSINNO combina experiência prática de hardware com integração moderna de cloud e software.',
    about_p3: 'As operações têm sede em Kuilsriver, Western Cape, com expansão planeada para Kinshasa, RDC.',
    sa_title: 'ÁFRICA DO SUL',
    sa_desc: 'Sede em Kuilsriver, Western Cape. Ao serviço de clientes industriais, agrícolas e comerciais em toda a África do Sul.',
    drc_title: 'RD CONGO',
    drc_desc: 'Expansão para Kinshasa e o mercado mais amplo da RDC — trazendo automação, IoT e experiência em electrónica para a África Central.',
    contact_label: 'Entre em contacto',
    contact_title: 'PEDIR\nORÇAMENTO',
    c_email: 'Email',
    c_avail: 'Disponibilidade',
    c_avail_val: 'Visitas ao local: Fins de semana\nOrçamentos: Serões',
    c_reg: 'Empresa Registada',
    fn_label: 'Nome Próprio',
    ln_label: 'Apelido',
    co_label: 'Empresa',
    email_label: 'Endereço de Email',
    service_label: 'Serviço Necessário',
    svc_opt0: 'Seleccionar serviço',
    svc_opt1: 'Engenharia Electrónica',
    svc_opt1b: 'Engenharia Electrónica',
    svc_opt2: 'Reparação Electrónica B2B',
    svc_opt3: 'IoT Agrícola',
    svc_opt4: 'Outro / Consultoria',
    msg_label: 'Descrição do Projecto',
    msg_ph: 'Descreva o seu projecto ou problema...',
    submit_btn: 'Enviar Pedido →',
    portal_label: 'Portal do Cliente',
    portal_title: 'ACESSO\nCLIENTE',
    portal_sub: '// Portal seguro — apenas clientes',
    portal_email: 'Endereço de email',
    portal_pass: 'Palavra-passe',
    portal_btn: 'Entrar →',
    portal_note: 'Acesso fornecido após integração do projecto.',
    pf1_title: 'PAINÉIS IoT',
    pf1_desc: 'Dados de sensores em directo e histórico para a sua instalação agrícola ou industrial.',
    pf2_title: 'ESTADO DO PROJECTO',
    pf2_desc: 'Acompanhe o progresso dos projectos de reparação e automação, marcos e datas de entrega.',
    pf3_title: 'FACTURAS & DOCS',
    pf3_desc: 'Descarregue facturas, relatórios técnicos e calendários de manutenção.',
    footer_desc: 'Empresa de engenharia sul-africana especializada em reparação electrónica, automação industrial e IoT agrícola.',
    fc1: 'Serviços',
    fc2: 'Empresa',
    fc3: 'Contacto',
    fl_s1: 'Engenharia Electrónica',
    fl_s2: 'Reparação Electrónica',
    fl_s3: 'Automação Industrial',
    fl_s4: 'IoT Agrícola',
    fl_c1: 'Sobre Nós',
    fl_c3: 'Operações SA',
    fl_c4: 'Operações RDC',
    fl_e1: 'techsinno0@gmail.com',
    fl_e2: 'Kuilsriver, Western Cape',
    fl_e3: 'África do Sul & RDC',
    copy: '© 2026 TECHSINNO (Pty) Ltd — Todos os direitos reservados.',
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
    services_title: 'DRIE KERN\nDIENSTE',
    services_desc: 'End-tot-end ingenieursoplossings — van komponent-vlak herstel tot wolkverbonde landbousensors.',
    s1_title: 'B2B ELEKTRONIKA\nHERSTEL',
    s1_desc: 'PCB-vlak foutopsporing, komponentvervanging en funksionele toetsing vir industriële en kommersiële elektronika.',
    s1_link: 'Herstelversoek',
    s2_title: 'INDUSTRIËLE\nOUTOMATISERING',
    s2_desc: 'PLC-programmering, SCADA-integrasie en outomatiese beheerstelsels vir vervaardiging en prosesfabrieke.',
    s2_link: 'Begin projek',
    s3_title: 'LANDBOU\nIoT',
    s3_desc: 'End-tot-end sensornetwerke vir plase — grond, klimaat, besproeiing — met wolkpanele en intydse waarskuwings.',
    s3_link: 'Ontplooi sensors',
    iot_label: 'Landbou IoT',
    iot_title: 'JOU PLAASDATA,\nORALKANT',
    iot_p1: 'Pasgemaakte Arduino en ESP32 sensornetwerke stuur lewendige velddata na \'n Azure wolkpaneel. Monitor grondvog, temperatuur, pH en besproeiingstatus intyds.',
    iot_p2: 'Ontvang SMS- of e-poswaarskuwings wanneer drempelwaardes oorskry word. Geen meer veldtogte om te kontroleer nie.',
    iot_f1: 'Intydse sensordata via MQTT / HTTPS',
    iot_f2: 'Azure IoT Hub — 8,000 boodskappe/dag gratis',
    iot_f3: 'Pasgemaakte webpaneel per kliënt',
    iot_f4: 'SMS + e-pos drempelwaarskuwings',
    iot_f5: 'Son-aangedrewe nodusse vir afgeleë velde',
    about_label: 'Oor TECHSINNO',
    about_title: 'INGENIEURS.\nBOUERS.\nOPLOSSERS.',
    about_p1: 'TECHSINNO (Pty) Ltd is \'n geregistreerde Suid-Afrikaanse ingenieursmaatskappy gespesialiseer in elektroniese herstel, industriële outomatisering en landbou-IoT — met \'n duidelike mandaat om beide Suid-Afrika en die Demokratiese Republiek Kongo te bedien.',
    about_p2: 'Gelei deur \'n praktisynde megatronika- en elektroniese ingenieur, kombineer TECHSINNO praktiese hardeware-kundigheid met moderne wolk- en sagteware-integrasie.',
    about_p3: 'Bedrywighede is gesetel in Kuilsrivier, Wes-Kaap, met beplande uitbreiding na Kinshasa, DRK.',
    sa_title: 'SUID-AFRIKA',
    sa_desc: 'Hoofkantoor in Kuilsrivier, Wes-Kaap. Bedien industriële, landbou- en kommersiële kliënte regoor die Wes-Kaap.',
    drc_title: 'DR KONGO',
    drc_desc: 'Uitbreiding na Kinshasa en die breër DRK-mark — bring outomatisering, IoT en elektroniese kundigheid na Sentraal-Afrika.',
    contact_label: 'Kontak ons',
    contact_title: 'VERSOEK \'N\nKWOTASIE',
    c_email: 'E-pos',
    c_avail: 'Beskikbaarheid',
    c_avail_val: 'Terreinbesoeke: Naweke\nKwotasies & ontwerp: Aande',
    c_reg: 'Geregistreerde Besigheid',
    fn_label: 'Voornaam',
    ln_label: 'Van',
    co_label: 'Maatskappy',
    email_label: 'E-posadres',
    service_label: 'Diens Benodig',
    svc_opt0: 'Kies \'n diens',
    svc_opt1: 'Elektroniese Herstel',
    svc_opt2: 'Industriële Outomatisering',
    svc_opt3: 'Landbou IoT',
    svc_opt4: 'Ander / Konsultasie',
    msg_label: 'Projekbeskrywing',
    msg_ph: 'Beskryf jou projek of probleem...',
    submit_btn: 'Stuur Versoek →',
    portal_label: 'Kliëntportaal',
    portal_title: 'KLIËNT\nTOEGANG',
    portal_sub: '// Veilige portaal — slegs kliënte',
    portal_email: 'E-posadres',
    portal_pass: 'Wagwoord',
    portal_btn: 'Teken in →',
    portal_note: 'Toegang verleen na projekaanboord.',
    pf1_title: 'IOT PANELE',
    pf1_desc: 'Lewendige sensordata en historiese data vir jou landbou- of industriële ontplooiing.',
    pf2_title: 'PROJEKSTATUS',
    pf2_desc: 'Volg herstel- en outomatiseringsprojekvordering, mylpale en leweringsdatums.',
    pf3_title: 'FAKTURE & DOKUMENTE',
    pf3_desc: 'Laai fakture, tegniese verslae en onderhoudsskedules af.',
    footer_desc: 'Geregistreerde Suid-Afrikaanse ingenieursmaatskappy gespesialiseer in elektroniese herstel, industriële outomatisering en landbou-IoT.',
    fc1: 'Dienste',
    fc2: 'Maatskappy',
    fc3: 'Kontak',
    fl_s1: 'Elektroniese Herstel',
    fl_s2: 'Industriële Outomatisering',
    fl_s3: 'Landbou IoT',
    fl_s4: 'Kliëntportaal',
    fl_c1: 'Oor Ons',
    fl_c2: 'Ons Span',
    fl_c3: 'SA Bedrywighede',
    fl_c4: 'DRK Bedrywighede',
    fl_e1: 'techsinno0@gmail.com',
    fl_e2: 'Kuilsrivier, Wes-Kaap',
    fl_e3: 'Suid-Afrika & DRK',
    copy: '© 2026 TECHSINNO (Pty) Ltd — Alle regte voorbehou.',
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
  const t = T[lang];
  // Map nav array to individual keys
  ['nav_0','nav_1','nav_2','nav_3','nav_4'].forEach((k,i)=>{t[k]=t.nav[i];});
  t['s4_title']=t['s4_title']||''; t['s4_desc']=t['s4_desc']||''; t['s4_link']=t['s4_link']||'';
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
  const t = T[currentLang];
  const lines = t.taglines;
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
  moisture:  { base: 61,   range: 3,   unit: '%',   id: 'val-moisture'  },
  temp:      { base: 23.4, range: 1.5, unit: '°C',  id: 'val-temp'      },
  ph:        { base: 6.8,  range: 0.2, unit: 'pH',  id: 'val-ph'        },
  light:     { base: 42300,range: 2000,unit: 'lux', id: 'val-light'     },
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
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
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
  applyLang('en');
  setTimeout(typewriter, 800);
  updateClock();
  setInterval(updateClock, 1000);
  updateSensors();
  setInterval(updateSensors, 3000);
  initScrollAnim();
  initNavbar();
  initMobileNav();
  initForm();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
});
