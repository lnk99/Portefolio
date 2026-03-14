/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .proj-card, .exp-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '16px';
    cursor.style.height = '16px';
    ring.style.width = '56px';
    ring.style.height = '56px';
    ring.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '8px';
    cursor.style.height = '8px';
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.opacity = '0.5';
  });
});

/* ── Scroll Reveal ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Copy to clipboard ── */
function copyLI(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = event.target;
    const orig = btn.textContent;
    btn.textContent = 'Copié ✓';
    setTimeout(() => btn.textContent = orig, 2500);
  });
}

/* ── Skill dots animation on scroll ── */
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-dot.active').forEach((dot, i) => {
        dot.style.opacity = '0';
        setTimeout(() => {
          dot.style.transition = 'opacity 0.3s ease';
          dot.style.opacity = '1';
        }, i * 80);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-row').forEach(row => skillObs.observe(row));

/* ── Contact form → mailto fallback ── */
function sendContact(e) {
  e.preventDefault();
  const name    = document.getElementById('contact-name').value;
  const email   = document.getElementById('contact-email').value;
  const message = document.getElementById('contact-message').value;
  const subject = encodeURIComponent('Contact Portfolio — ' + name);
  const body    = encodeURIComponent('Nom : ' + name + '\nEmail : ' + email + '\n\n' + message);
  window.location.href = 'mailto:ngawalionel99@gmail.com?subject=' + subject + '&body=' + body;
}

/* ── Language Toggle ── */
/* Keys match data-i18n attributes in index.html */
const translations = {
  fr: {
    'page.title':'Lionel Ngawa — Ingénieur Sûreté de Fonctionnement Logicielle & Data Science',
    /* nav */
    'nav.profile':'Profil','nav.experience':'Expériences','nav.projects':'Projets',
    'nav.skills':'Compétences','nav.education':'Formation',
    'nav.contact':'Contact','nav.cta':'Me Contacter',
    'hero.eyebrow':'Disponible · CDI · Septembre 2026',
    'hero.headline':'Ingénieur<br><em>Sûreté de Fonctionnement</em><br>Logicielle & Data Science',
    'hero.desc':'Je conçois la <strong>sûreté des systèmes critiques</strong> — embarqués, industriels, médicaux. Alternant chez <strong>Valeo</strong>, formé en ingénierie des systèmes complexes et Data Science, je combine rigueur normative et intelligence des données pour des systèmes qui ne défaillent pas.',
    'hero.btn.contact':'Me Contacter','hero.btn.cv':'Télécharger CV',
    'hero.scroll':'Découvrir le profil','hero.trusted.label':'Expérience chez',
    'stat.years':"Années d'expérience<br>en systèmes critiques",'stat.companies':'Entreprises<br>internationales',
    'stat.degrees':'Diplômes ingénieur<br>France + USA','stat.sectors':'Secteurs industriels<br>couverts',
    'about.label':'Profil','about.title':'Un ingénieur<br><em>deux expertises</em>',
    'about.tshape.safety.title':'Expertise Profonde — Sûreté & Fiabilité',
    'about.tshape.safety.text':"Analyse des défaillances, gestion du risque, conformité normative sur systèmes critiques (automobile, médical, industriel)",
    'about.tshape.ds.title':'Data Science',
    'about.tshape.ds.text':'Machine Learning, Deep Learning, Bayésien, prédiction de défaillances',
    'about.tshape.se.title':'Ingénierie Systèmes',
    'about.tshape.se.text':'Embarqué, ADAS, dispositifs médicaux, robotique industrielle',
    'about.p1':"Je suis un ingénieur à l'intersection de deux mondes qui, ensemble, définissent l'ingénierie de demain : la <strong>sûreté de fonctionnement</strong> des systèmes complexes, et l'<strong>intelligence des données</strong>.",
    'about.expertise.1.title':'Analyses FMD / RAMS',
    'about.expertise.1.text':'AMDEC · FMEDA · HARA · FTA · FIDES',
    'about.expertise.2.title':'Normes & Conformité',
    'about.expertise.2.text':'ISO 26262 · EN 50126 · IEC 61508',
    'about.expertise.3.title':'Fiabilité & Durée de vie',
    'about.expertise.3.text':'Évaluation de fiabilité · Estimation de durée de vie · Modèles de défaillance',
    'about.expertise.4.title':'Data Science & Prédictif',
    'about.expertise.4.text':'Machine Learning · Maintenance prédictive · Modèles bayésiens',
    'about.quote':'"Ce qui ne peut pas défaillir doit être compris, mesuré, et prouvé — c\'est ce que je fais."',
    'about.p2':"Alternant chez <strong>Valeo</strong>, je contribue quotidiennement à la sûreté des systèmes embarqués qui pilotent les véhicules autonomes de demain. Ma formation à <strong>Polytech Angers</strong> (ingénierie des systèmes complexes) complétée d'un <strong>Master Data Science aux États-Unis</strong> me donne un profil que peu d'ingénieurs possèdent : analyser la fiabilité <em>et</em> la modéliser intelligemment.",
    'about.p3':"J'ai déjà œuvré dans <strong>l'automobile, le médical, la robotique chirurgicale et la qualité industrielle</strong>. Ce que je cherche en CDI : un environnement où la rigueur technique côtoie l'innovation — automobile, ferroviaire, défense, énergie ou tout système dont la défaillance n'est pas une option.",
    'about.contact.label':'Contact','about.location.label':'Localisation','about.location.value':'Paris, France entière',
    'exp.label':'Expériences','exp.title':'Parcours<br><em>professionnel</em>',
    'exp.valeo.role':'Alternant Ingénieur — Innovation & Sûreté de Fonctionnement',
    'exp.valeo.desc':"Au sein de la R&D Software Safety de Valeo, je travaille sur la sûreté des systèmes embarqués qui équiperont les véhicules ADAS de prochaine génération — systèmes d'aide à la conduite, surveillance du conducteur, plateforme Software Defined Vehicle.",
    'exp.valeo.b1':'Analyse de sûreté logicielle (<strong>SW-SDA, FFI</strong>) sur un OS temps réel embarqué <strong>ASIL B</strong> (ISO 26262)',
    'exp.valeo.b2':'Évaluation de la conformité <strong>ASIL B</strong> d’un module du middleware open source (<strong>Eclipse S-CORE</strong>)',
    'exp.valeo.b3':'Exploration du <strong>langage Rust</strong> pour le développement embarqué sûr et performant',
    'exp.valeo.b4':'Création d’un <strong>outil interne d’assurance Case</strong>',
    'exp.valeo.b5':'Rédaction de méthodologies <strong>Software Safety</strong> et de documentation technique R&D',
    'exp.valeo.chip1':'Sûreté Logicielle','exp.valeo.chip2':'Systèmes Embarqués','exp.valeo.chip3':'FMEA / DFA','exp.valeo.chip4':'Rust','exp.valeo.chip5':'ADAS','exp.valeo.chip6':'R&D',
    'exp.ge.role':'Ingénieur Fiabilité (Stage)',
    'exp.ge.desc':"Stage en R&D au sein de la division mammographie — l'un des environnements les plus exigeants en matière de fiabilité : les dispositifs médicaux ne tolèrent aucune défaillance sur des équipements de diagnostic critique.",
    'exp.ge.b1':'Qualification et validation d\'un <strong>dispositif électromécanique critique</strong> via un plan de fiabilité complet',
    'exp.ge.b2':"Analyse de risque design et conception du protocole de tests d'intégration",
    'exp.ge.b3':'Mesure et reporting des indicateurs de fiabilité logicielle sur environnement de test médical',
    'exp.ge.chip1':'Dispositifs Médicaux','exp.ge.chip2':'Analyse de Risque','exp.ge.chip3':'Plan Fiabilité','exp.ge.chip4':'Tests Intégration',
    'exp.jtekt.role':'Ingénieur Qualité (Stage)',
    'exp.jtekt.desc':"Stage dans un environnement de production automobile internationale — résolution de problèmes complexes, collecte de données de qualité et contribution à la préparation d'un audit international de certification qualité.",
    'exp.jtekt.b1':"Résolution de plaintes clients par analyse causale et plans d'actions correctives",
    'exp.jtekt.b2':'Programmation de <strong>stations de mesures automatisées</strong> pour la collecte de données qualité (MeasurLink)',
    'exp.jtekt.b3':'Contribution à la préparation de l\'audit de certification <strong>IATF 16949</strong> (standard qualité automobile international)',
    'exp.jtekt.chip1':'Qualité Automobile','exp.jtekt.chip2':'IATF 16949','exp.jtekt.chip3':'Résolution Problèmes','exp.jtekt.chip4':'Métrologie',
    'proj.label':'Projets','proj.title':'Réalisations<br><em>clés</em>',
    'skills.label':'Compétences','skills.title':'Stack<br><em>technique</em>',
    'skill.fmea':'Analyse de risques (FMEA, APR, AdD)','skill.iso26262':'Normes automobiles (ISO 26262)',
    'skill.iec50126':'Normes ferroviaires (IEC 50126)','skill.reliasoft':'Reliasoft (XFMEA, Weibull++)',
    'skill.mbsa':'MBSA / Méthodes formelles','skill.iatf':'Qualité (IATF 16949)',
    'skill.python':'Python','skill.ml':'Machine Learning (supervisé / non-sup.)','skill.dl':'Deep Learning (TensorFlow, PyTorch)',
    'skill.ts':'Séries Temporelles',
    'skill.rust':'Rust (embarqué sûr)','skill.matlab':'Matlab / Simulink','skill.scade':'SCADE (méthodes formelles)',
    'skill.solidworks':'SolidWorks (CAO)','skill.ireb':'Catia Magic (SysML)','skill.agile':'Méthodes Agiles','skill.minitab':'Minitab / Rcommander',
    'skills.lang.title':'Langues','skills.soft.title':'Savoir-être',
    'lang.fr.level':'Natif','lang.en.level':'Professionnel · TOEIC 865/990','lang.de.level':'B1',
    'edu.label':'Formation','edu.title':'Parcours<br><em>académique</em>',
    'contact.label':'Contact','contact.title':'Travaillons<br><em>ensemble</em>',
    'contact.intro':'Disponible pour un <strong>CDI à partir de septembre 2026</strong>. Je suis ouvert aux opportunités dans l\'automobile, le ferroviaire, la défense et le médical — tout environnement où la <strong>sûreté n\'est pas négociable</strong>.',
    'footer.copy':'© 2026 · Ingénieur Sûreté de Fonctionnement Logicielle & Data Science',
    'copy.btn':'Copier',
    /* marquee */
    'mq.safety':'Sûreté Fonctionnelle','mq.risk':'Analyse de Risques','mq.reliability':'Fiabilité Systèmes',
    'mq.embedded':'Ingénierie Embarquée','mq.ds':'Data Science','mq.ml':'Machine Learning',
    'mq.sectors':'Automobile · Ferroviaire · Médical','mq.norms':'Normes Industrielles',
    /* ─ aliases matching HTML data-i18n attributes ─ */
    'skills.col1.title':'Sûreté & Fiabilité','skills.col2.title':'Data Science & IA','skills.col3.title':'Ingénierie Systèmes',
    'skill.reliability':'Allocation de fiabilité','skill.bayesian':'Inférence Bayésienne & MCMC','skill.rsql':'R, SAS, SQL','skill.stats':'Analyse statistique (ANOVA, PCA)',
    'lang.fr':'Français','lang.en':'Anglais','lang.de':'Allemand',
    'soft.rigor':'Rigueur & Précision','soft.critical':'Analyse Critique','soft.comms':'Communication Technique','soft.pm':'Gestion de Projet',
    'soft.adapt':'Adaptabilité','soft.team':'Travail en Équipe','soft.proactive':'Proactivité','soft.pedagogy':'Pédagogie','soft.intl':'Profil International',
    'edu.polytech.degree':"Diplôme d'Ingénieur — Qualité, Innovation & Fiabilité",'edu.polytech.school':'Polytech Angers · France',
    'edu.polytech.desc':'Spécialisation en ingénierie des systèmes complexes, RAMS (Reliability, Availability, Maintainability, Safety), analyse des défaillances et gestion des risques industriels.',
    'edu.uwf.degree':'Master of Science — Data Science','edu.uwf.school':'University of West Florida · USA',
    'edu.uwf.desc':'Formation au niveau master aux États-Unis. Machine Learning, Deep Learning, inférence bayésienne & MCMC, modélisation des séries temporelles. Diplôme reconnu internationalement.',
    'edu.iut.degree':'Licence — Génie Mécanique & Productique','edu.iut.school':'IUT · Dschang, Cameroun',
    'edu.iut.desc':'Fondations en conception mécanique, fabrication et procédés industriels, résistance des matériaux, gestion de production.',
    'contact.item.email':'Email','contact.item.phone':'Téléphone','contact.item.linkedin':'LinkedIn','contact.item.location':'Localisation',
    'contact.location.value':'Paris — mobilité France entière',
    'form.name':'Nom','form.email':'Email','form.message':'Message','form.submit':'Envoyer le message',
    'form.name.ph':'Votre nom','form.email.ph':'votre@email.com','form.message.ph':'Votre message...',
    /* UWF academic projects */
    'proj.lstm.client':'University of West Florida · 2024–2025',
    'proj.lstm.title':'Analyse de Séries Temporelles du S&P 500',
    'proj.lstm.sub':'Séries Temporelles · Finance · R',
    'proj.lstm.body':'Modélisation des prix journaliers du <strong>S&P 500 (2014–2020)</strong> avec des modèles <strong>ARIMA, ARMA, GARCH</strong> et un modèle hybride <strong>ARMA-GARCH</strong>. Tests de stationnarité (ADF), détection des effets ARCH, analyse <strong>ACF/PACF</strong> et sélection de modèles par <strong>AIC/BIC</strong>.',
    'proj.lstm.result':'Prévision de la volatilité et estimation du <strong>Value-at-Risk (VaR)</strong> adaptatif en période de crise (COVID-19)',
    'proj.lstm.tag1':'ARIMA / GARCH','proj.lstm.tag2':'Séries Temporelles','proj.lstm.tag3':'Value-at-Risk','proj.lstm.tag4':'R',
    'proj.cancer.client':'University of West Florida · Printemps 2025',
    'proj.cancer.title':'Diagnostic Cancer du Sein par Clustering Non-supervisé',
    'proj.cancer.sub':'Machine Learning · Médical · Python',
    'proj.cancer.body':'Analyse exploratoire du <strong>Wisconsin Breast Cancer Dataset</strong> par méthodes non-supervisées : K-Means, GMM, Clustering Spectral, DBSCAN et ACP. Identification de clusters tumoraux significatifs sans étiquettes prédéfinies, comparé aux approches supervisées (SVM).',
    'proj.cancer.result':'Clusters diagnostiques identifiés · Efficacité des méthodes non-supervisées démontrée en contexte médical',
    'proj.cancer.tag1':'K-Means / GMM','proj.cancer.tag2':'ACP','proj.cancer.tag3':'Clustering','proj.cancer.tag4':'Python',
    'proj.cnn.client':'University of West Florida · Automne 2024',
    'proj.cnn.title':'Classification d’Images par CNN (AlexNet)',
    'proj.cnn.sub':'Vision par Ordinateur · Deep Learning · PyTorch',
    'proj.cnn.body':'Fine-tuning d’un réseau <strong>AlexNet</strong> pour la classification multi-classes robuste d’images. Atteinte de <strong>+85 % de précision</strong> sur CIFAR-10 et datasets fleurs. Amélioration de la généralisation via dropout, optimiseur Adam, transfer learning et augmentation de données.',
    'proj.cnn.result':'+85 % de précision sur CIFAR-10 · Généralisation améliorée par transfer learning et augmentation',
    'proj.cnn.tag1':'CNN / AlexNet','proj.cnn.tag2':'PyTorch','proj.cnn.tag3':'Transfer Learning','proj.cnn.tag4':'CIFAR-10',
    /* Polytech Angers projects */
    'proj.robot.client':'Polytech Angers · Projet Modélisation',
    'proj.robot.title':'Game of Robot — Conception Basée Modèle',
    'proj.robot.sub':'Systèmes Embarqués · SCADE Suite · Machines à États',
    'proj.robot.body':"Conception et implémentation de la logique de contrôle d'un robot via <strong>SCADE Suite</strong>. Modélisation du comportement système par <strong>machines à états</strong> et programmation synchrone. Simulation des réponses système et validation du comportement fonctionnel sur plusieurs scénarios.",
    'proj.robot.result':'Comportement fonctionnel validé · Logique de contrôle robuste modélisée et simulée',
    'proj.robot.tag1':'SCADE Suite','proj.robot.tag2':'Machines à États','proj.robot.tag3':'Prog. Synchrone','proj.robot.tag4':'Systèmes Embarqués',
    'proj.sbw.client':'Polytech Angers · Projet Sûreté Fonctionnelle',
    'proj.sbw.title':'Étude de Sûreté Fonctionnelle — Steer-by-Wire',
    'proj.sbw.sub':'Sûreté Fonctionnelle · Automobile · Analyse des Risques',
    'proj.sbw.body':"Réalisation d'<strong>APR, AMDEC et AdD</strong> sur un système de direction Steer-by-Wire automobile. Identification des événements dangereux et évaluation des scénarios de défaillance. Élaboration d'un <strong>Safety Case</strong> démontrant la conformité aux principes de sûreté fonctionnelle.",
    'proj.sbw.result':'Safety Case complet élaboré · Conformité aux principes de sûreté fonctionnelle démontrée',
    'proj.sbw.tag1':'APR','proj.sbw.tag2':'AMDEC / AdD','proj.sbw.tag3':'Safety Case','proj.sbw.tag4':'Sûreté Fonctionnelle',
    'proj.pdf.view':'Voir le rapport ↗'
  },
  en: {
    'page.title':'Lionel Ngawa — Software Functional Safety & Data Science Engineer',
    'nav.profile':'Profile','nav.experience':'Experience','nav.projects':'Projects',
    'nav.skills':'Skills','nav.education':'Education',
    'nav.contact':'Contact','nav.cta':'Contact Me',
    'hero.eyebrow':'Available · Full-time · September 2026',
    'hero.headline':'Software<br><em>Functional Safety</em><br>& Data Science Engineer',
    'hero.desc':'I design <strong>safety for critical systems</strong> — embedded, industrial, medical. Engineering apprentice at <strong>Valeo</strong>, trained in complex systems engineering and Data Science, I combine normative rigor and data intelligence for systems that must not fail.',
    'hero.btn.contact':'Contact Me','hero.btn.cv':'Download CV',
    'hero.scroll':'Explore profile','hero.trusted.label':'Experience at',
    'stat.years':'Years of experience<br>in critical systems','stat.companies':'International<br>companies',
    'stat.degrees':'Engineering degrees<br>France + USA','stat.sectors':'Industrial sectors<br>covered',
    'about.label':'Profile','about.title':'One engineer<br><em>two expertises</em>',
    'about.tshape.safety.title':'Deep Expertise — Safety & Reliability',
    'about.tshape.safety.text':'Failure analysis, risk management, normative compliance on critical systems (automotive, medical, industrial)',
    'about.tshape.ds.title':'Data Science',
    'about.tshape.ds.text':'Machine Learning, Deep Learning, Bayesian inference, failure prediction',
    'about.tshape.se.title':'Systems Engineering',
    'about.tshape.se.text':'Embedded systems, ADAS, medical devices, industrial robotics',
    'about.p1':'I am an engineer at the intersection of two worlds that together define the engineering of tomorrow: the <strong>functional safety</strong> of complex systems, and <strong>data intelligence</strong>.',
    'about.expertise.1.title':'FMD / RAMS Analyses',
    'about.expertise.1.text':'FMEA · FMEDA · HARA · FTA · FIDES',
    'about.expertise.2.title':'Standards & Compliance',
    'about.expertise.2.text':'ISO 26262 · EN 50126 · IEC 61508',
    'about.expertise.3.title':'Reliability & Lifetime',
    'about.expertise.3.text':'Reliability assessment · Lifetime estimation · Failure models',
    'about.expertise.4.title':'Data Science & Predictive',
    'about.expertise.4.text':'Machine Learning · Predictive maintenance · Bayesian models',
    'about.quote':'"What cannot fail must be understood, measured, and proven — that is what I do."',
    'about.p2':"As an apprentice at <strong>Valeo</strong>, I contribute daily to the safety of the embedded systems that will drive tomorrow's autonomous vehicles. My training at <strong>Polytech Angers</strong> (complex systems engineering) complemented by a <strong>Master's in Data Science in the United States</strong> gives me a profile few engineers possess: analyzing reliability <em>and</em> modeling it intelligently.",
    'about.p3':'I have already worked in <strong>automotive, medical, surgical robotics and industrial quality</strong>. What I seek in a full-time role: an environment where technical rigor meets innovation — automotive, railway, defense, energy or any system whose failure is not an option.',
    'about.contact.label':'Contact','about.location.label':'Location','about.location.value':'Paris, open to relocate in France',
    'exp.label':'Experience','exp.title':'Professional<br><em>journey</em>',
    'exp.valeo.role':'Engineering Apprentice — Innovation & Functional Safety',
    'exp.valeo.desc':"Within Valeo's R&D Software Safety team, I work on the safety of embedded systems that will equip next-generation ADAS vehicles — driver assistance systems, driver monitoring, Software Defined Vehicle platform.",
    'exp.valeo.b1':'Software safety analysis (<strong>SW-SDA, FFI</strong>) on an <strong>ASIL B</strong> real-time embedded OS (ISO 26262)',
    'exp.valeo.b2':'<strong>ASIL B</strong> compliance assessment of an open-source middleware module (<strong>Eclipse S-CORE</strong>)',
    'exp.valeo.b3':'Exploring the <strong>Rust language</strong> for safe and performant embedded development',
    'exp.valeo.b4':'Creation of an internal <strong>Assurance Case tool</strong>',
    'exp.valeo.b5':'Writing <strong>Software Safety methodologies</strong> and R&D technical documentation',
    'exp.valeo.chip1':'Software Safety','exp.valeo.chip2':'Embedded Systems','exp.valeo.chip3':'FMEA / DFA','exp.valeo.chip4':'Rust','exp.valeo.chip5':'ADAS','exp.valeo.chip6':'R&D',
    'exp.ge.role':'Reliability Engineer (Internship)',
    'exp.ge.desc':"R&D internship within the mammography division — one of the most demanding environments for reliability: medical devices tolerate zero failures in critical diagnostic equipment.",
    'exp.ge.b1':'Qualification and validation of a <strong>critical electromechanical device</strong> through a comprehensive reliability plan',
    'exp.ge.b2':"Design risk analysis and conception of the integration test protocol",
    'exp.ge.b3':'Measurement and reporting of software reliability indicators in a medical test environment',
    'exp.ge.chip1':'Medical Devices','exp.ge.chip2':'Risk Analysis','exp.ge.chip3':'Reliability Plan','exp.ge.chip4':'Integration Tests',
    'exp.jtekt.role':'Quality Engineer (Internship)',
    'exp.jtekt.desc':'Internship in an international automotive production environment — complex problem solving, quality data collection and contribution to the preparation of an international quality certification audit.',
    'exp.jtekt.b1':'Resolution of customer complaints through root cause analysis and corrective action plans',
    'exp.jtekt.b2':'Programming of <strong>automated measurement stations</strong> for quality data collection (MeasurLink)',
    'exp.jtekt.b3':'Contribution to the preparation of the <strong>IATF 16949</strong> certification audit (international automotive quality standard)',
    'exp.jtekt.chip1':'Automotive Quality','exp.jtekt.chip2':'IATF 16949','exp.jtekt.chip3':'Problem Solving','exp.jtekt.chip4':'Metrology',
    'proj.label':'Projects','proj.title':'Key<br><em>achievements</em>',
    'skills.label':'Skills','skills.title':'Technical<br><em>stack</em>',
    'skill.fmea':'Risk Analysis (FMEA, PHA, FTA)','skill.iso26262':'Automotive Standards (ISO 26262)',
    'skill.iec50126':'Railway Standards (IEC 50126)','skill.reliasoft':'Reliasoft (XFMEA, Weibull++)',
    'skill.mbsa':'MBSA / Formal Methods','skill.iatf':'Quality (IATF 16949)',
    'skill.python':'Python','skill.ml':'Machine Learning (supervised / unsup.)','skill.dl':'Deep Learning (TensorFlow, PyTorch)',
    'skill.ts':'Time Series',
    'skill.rust':'Rust (safe embedded)','skill.matlab':'Matlab / Simulink','skill.scade':'SCADE (formal methods)',
    'skill.solidworks':'SolidWorks (CAD)','skill.ireb':'Catia Magic (SysML)','skill.agile':'Agile Methods','skill.minitab':'Minitab / Rcommander',
    'skills.lang.title':'Languages','skills.soft.title':'Soft Skills',
    'lang.fr.level':'Native','lang.en.level':'Professional · TOEIC 865/990','lang.de.level':'B1',
    'edu.label':'Education','edu.title':'Academic<br><em>background</em>',
    'contact.label':'Contact','contact.title':"Let's work<br><em>together</em>",
    'contact.intro':'Available for a <strong>full-time position starting September 2026</strong>. I am open to opportunities in automotive, railway, defense and medical — any environment where <strong>safety is non-negotiable</strong>.',
    /* ─ aliases matching HTML data-i18n attributes ─ */
    'skills.col1.title':'Safety & Reliability','skills.col2.title':'Data Science & AI','skills.col3.title':'Systems Engineering',
    'skill.reliability':'Reliability Allocation','skill.bayesian':'Bayesian Inference & MCMC','skill.rsql':'R, SAS, SQL','skill.stats':'Statistical Analysis (ANOVA, PCA)',
    'lang.fr':'French','lang.en':'English','lang.de':'German',
    'soft.rigor':'Rigor & Precision','soft.critical':'Critical Analysis','soft.comms':'Technical Communication','soft.pm':'Project Management',
    'soft.adapt':'Adaptability','soft.team':'Teamwork','soft.proactive':'Proactivity','soft.pedagogy':'Teaching Skills','soft.intl':'International Profile',
    'edu.polytech.degree':'Engineering Degree — Quality, Innovation & Reliability','edu.polytech.school':'Polytech Angers · France',
    'edu.polytech.desc':'Specialization in complex systems engineering, RAMS (Reliability, Availability, Maintainability, Safety), failure analysis and industrial risk management.',
    'edu.uwf.degree':'Master of Science — Data Science','edu.uwf.school':'University of West Florida · USA',
    "edu.uwf.desc":"Master's level training in the United States. Machine Learning, Deep Learning, Bayesian inference & MCMC, time series modeling. Internationally recognized degree.",
    'edu.iut.degree':'Bachelor — Mechanical Engineering & Manufacturing','edu.iut.school':'IUT · Dschang, Cameroon',
    'edu.iut.desc':'Foundations in mechanical design, manufacturing and industrial processes, materials strength, production management.',
    'contact.item.email':'Email','contact.item.phone':'Phone','contact.item.linkedin':'LinkedIn','contact.item.location':'Location',
    'contact.location.value':'Paris — open to relocate in France',
    'form.name':'Name','form.email':'Email','form.message':'Message','form.submit':'Send message',
    'form.name.ph':'Your name','form.email.ph':'your@email.com','form.message.ph':'Your message...',
    /* UWF academic projects */
    'proj.lstm.client':'University of West Florida · 2024–2025',
    'proj.lstm.title':'S&P 500 Time Series Analysis',
    'proj.lstm.sub':'Time Series · Finance · R',
    'proj.lstm.body':'Modeled daily <strong>S&P 500 prices (2014–2020)</strong> using <strong>ARIMA, ARMA, GARCH</strong> and a hybrid <strong>ARMA-GARCH</strong> model. Stationarity tests (ADF), ARCH effect detection, <strong>ACF/PACF</strong> analysis, and model selection via <strong>AIC/BIC</strong>.',
    'proj.lstm.result':'Volatility forecasting and adaptive <strong>Value-at-Risk (VaR)</strong> estimation during the COVID-19 crisis period',
    'proj.lstm.tag1':'ARIMA / GARCH','proj.lstm.tag2':'Time Series','proj.lstm.tag3':'Value-at-Risk','proj.lstm.tag4':'R',
    'proj.cancer.client':'University of West Florida · Spring 2025',
    'proj.cancer.title':'Breast Cancer Diagnosis via Unsupervised Clustering',
    'proj.cancer.sub':'Machine Learning · Medical · Python',
    'proj.cancer.body':'Exploratory analysis of the <strong>Wisconsin Breast Cancer Dataset</strong> using unsupervised methods: K-Means, GMM, Spectral Clustering, DBSCAN and PCA. Identification of meaningful tumor clusters without predefined labels, benchmarked against supervised approaches (SVM).',
    'proj.cancer.result':'Diagnostic clusters identified · Effectiveness of unsupervised methods demonstrated in a medical context',
    'proj.cancer.tag1':'K-Means / GMM','proj.cancer.tag2':'PCA','proj.cancer.tag3':'Clustering','proj.cancer.tag4':'Python',
    'proj.cnn.client':'University of West Florida · Fall 2024',
    'proj.cnn.title':'Advanced Image Classification with CNN (AlexNet)',
    'proj.cnn.sub':'Computer Vision · Deep Learning · PyTorch',
    'proj.cnn.body':'Fine-tuned an <strong>AlexNet</strong> CNN model for robust multi-class image classification. Achieved <strong>85%+ accuracy</strong> on CIFAR-10 and flower species datasets. Improved generalization through dropout regularization, Adam optimizer, transfer learning and extensive data augmentation.',
    'proj.cnn.result':'85%+ accuracy on CIFAR-10 · Enhanced generalization via transfer learning and data augmentation',
    'proj.cnn.tag1':'CNN / AlexNet','proj.cnn.tag2':'PyTorch','proj.cnn.tag3':'Transfer Learning','proj.cnn.tag4':'CIFAR-10',
    /* Polytech Angers projects */
    'proj.robot.client':'Polytech Angers · Model-Based Design Project',
    'proj.robot.title':'Game of Robot — Model-Based Design',
    'proj.robot.sub':'Embedded Systems · SCADE Suite · State Machines',
    'proj.robot.body':'Designed and implemented robot control logic using <strong>SCADE Suite</strong>. Modeled system behavior using <strong>state machines</strong> and synchronous programming. Simulated system responses and validated functional behavior across multiple scenarios.',
    'proj.robot.result':'Functional behavior validated · Robust control logic modeled and simulated',
    'proj.robot.tag1':'SCADE Suite','proj.robot.tag2':'State Machines','proj.robot.tag3':'Sync. Programming','proj.robot.tag4':'Embedded Systems',
    'proj.sbw.client':'Polytech Angers · Functional Safety Project',
    'proj.sbw.title':'Steer-by-Wire Safety Study — Functional Safety',
    'proj.sbw.sub':'Functional Safety · Automotive · Risk Analysis',
    'proj.sbw.body':'Performed <strong>PHA, FMEA and FTA</strong> on a Steer-by-Wire automotive steering system. Identified hazardous events and evaluated system failure scenarios. Built a <strong>Safety Case</strong> demonstrating compliance with functional safety principles.',
    'proj.sbw.result':'Complete Safety Case developed · Compliance with functional safety principles demonstrated',
    'proj.sbw.tag1':'PHA / APR','proj.sbw.tag2':'FMEA / FTA','proj.sbw.tag3':'Safety Case','proj.sbw.tag4':'Functional Safety',
    'proj.pdf.view':'View Report ↗',
    'footer.copy':'© 2026 · Software Functional Safety & Data Science Engineer',
    'copy.btn':'Copy'
  }
};

let currentLang = localStorage.getItem('lang') || 'fr';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.title = translations[lang]['page.title'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key] !== undefined) el.innerHTML = translations[lang][key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (translations[lang][key] !== undefined) el.placeholder = translations[lang][key];
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

setLang(currentLang);