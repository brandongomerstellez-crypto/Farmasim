
"use strict";

/*
  FARMACOSIM TESH
  32 MEDICAMENTOS
  SIMULADOR FARMACOCINÉTICO EDUCATIVO
  REPORTE PDF SIN BIBLIOTECAS EXTERNAS

  IMPORTANTE:
  Los resultados y factores corporales son
  ilustrativos, no predicciones clínicas.
*/

// ==========================================
// 1. ESTRUCTURA DE MEDICAMENTOS
// ==========================================

const crearMedicamento = (
  nombre,
  categoria,
  vida,
  renal,
  distribucion,
  uso,
  mecanismo,
  comunes,
  graves,
  contra,
  precauciones,
  interacciones,
  vigilancia
) => ({
  nombre,
  categoria,
  vida,
  renal,
  distribucion,
  uso,
  mecanismo,
  comunes,
  graves,
  contra,
  precauciones,
  interacciones,
  vigilancia
});

// ==========================================
// 2. LOS 32 MEDICAMENTOS
// ==========================================

const MEDS = [
  crearMedicamento(
    "Paracetamol",
    "Analgésicos",
    2.5,
    .15,
    "mixta",
    "Dolor leve o moderado y fiebre.",
    "Acción principalmente central sobre vías relacionadas con el dolor y la temperatura.",
    "Generalmente bien tolerado; en ocasiones náuseas o erupciones cutáneas.",
    "Daño hepático grave por sobredosis, anafilaxia y reacciones cutáneas graves.",
    "Hipersensibilidad; otras restricciones dependen de la presentación.",
    "Cuidado ante enfermedad hepática, alcohol excesivo y otros productos con paracetamol.",
    "Warfarina con uso repetido, alcohol y medicamentos hepatotóxicos.",
    "Cantidad total de paracetamol y función hepática cuando corresponda."
  ),

  crearMedicamento(
    "Ibuprofeno",
    "Antiinflamatorios",
    2,
    .12,
    "mixta",
    "Dolor, fiebre e inflamación.",
    "Inhibe COX-1 y COX-2, reduciendo la síntesis de prostaglandinas.",
    "Acidez, dolor abdominal, náuseas, diarrea, mareos y edema.",
    "Sangrado gastrointestinal, lesión renal, infarto, accidente cerebrovascular y anafilaxia.",
    "Alergia a AINE, determinadas reacciones asmáticas y uso alrededor de revascularización coronaria.",
    "Precaución ante úlcera, enfermedad renal o cardiovascular, deshidratación y embarazo.",
    "Anticoagulantes, corticoides, otros AINE, litio, diuréticos y algunos antihipertensivos.",
    "Sangrado, presión arterial y función renal."
  ),

  crearMedicamento(
    "Amoxicilina",
    "Antibióticos",
    1.2,
    .75,
    "hidro",
    "Infecciones bacterianas susceptibles.",
    "Inhibe la síntesis de la pared celular bacteriana.",
    "Diarrea, náuseas, vómitos, candidiasis y erupción cutánea.",
    "Anafilaxia, reacciones cutáneas graves y colitis por C. difficile.",
    "Hipersensibilidad grave a penicilinas o betalactámicos relacionados.",
    "Revisar antecedentes alérgicos y función renal. No trata infecciones virales.",
    "Metotrexato, warfarina, probenecid y alopurinol.",
    "Alergia, diarrea persistente y evolución de la infección."
  ),

  crearMedicamento(
    "Metformina",
    "Antidiabéticos",
    6.2,
    .90,
    "hidro",
    "Diabetes mellitus tipo 2.",
    "Reduce la producción hepática de glucosa y mejora la sensibilidad a la insulina.",
    "Diarrea, náuseas, flatulencia y molestias abdominales.",
    "Acidosis láctica infrecuente pero grave; deficiencia de vitamina B12 en uso prolongado.",
    "Insuficiencia renal grave y acidosis metabólica.",
    "Precaución en deshidratación, hipoxia, alcohol excesivo y determinados procedimientos con contraste.",
    "Alcohol y medicamentos que alteran la función renal o el transporte de metformina.",
    "Función renal, glucemia y vitamina B12 cuando corresponda."
  ),

  crearMedicamento(
    "Losartán",
    "Antihipertensivos",
    2,
    .35,
    "mixta",
    "Hipertensión arterial.",
    "Bloquea receptores AT1 de angiotensina II.",
    "Mareos, cansancio e hipotensión.",
    "Hiperpotasemia grave, deterioro renal y toxicidad fetal.",
    "Embarazo, hipersensibilidad y determinadas combinaciones.",
    "Evaluar potasio, hidratación y función renal.",
    "Potasio, litio, AINE y diuréticos ahorradores de potasio.",
    "Presión arterial, potasio y función renal."
  ),

  crearMedicamento(
    "Omeprazol",
    "Gastrointestinales",
    1,
    .08,
    "lipo",
    "Reflujo y enfermedades relacionadas con ácido gástrico.",
    "Inhibe la bomba de protones gástrica H+/K+-ATPasa.",
    "Cefalea, dolor abdominal, náuseas, diarrea y flatulencia.",
    "Nefritis intersticial, reacciones cutáneas graves e hipomagnesemia.",
    "Hipersensibilidad y algunas combinaciones contraindicadas.",
    "Revisar la necesidad de uso prolongado y síntomas digestivos de alarma.",
    "Clopidogrel, digoxina y algunos fármacos cuya absorción depende del pH.",
    "Respuesta, función renal y magnesio si está indicado."
  ),

  crearMedicamento(
    "Naproxeno",
    "Antiinflamatorios",
    14,
    .15,
    "mixta",
    "Dolor e inflamación.",
    "Reduce prostaglandinas mediante inhibición de ciclooxigenasas.",
    "Acidez, náuseas, dolor abdominal, mareos y edema.",
    "Hemorragia digestiva, insuficiencia renal y eventos cardiovasculares.",
    "Hipersensibilidad a AINE y uso alrededor de revascularización coronaria.",
    "Precaución en úlcera, enfermedad renal o cardiovascular y embarazo.",
    "Anticoagulantes, corticoides, otros AINE, litio y diuréticos.",
    "Síntomas de sangrado, presión y función renal."
  ),

  crearMedicamento(
    "Atorvastatina",
    "Hipolipemiantes",
    14,
    .02,
    "lipo",
    "Reducción del colesterol LDL.",
    "Inhibe HMG-CoA reductasa.",
    "Molestias digestivas, dolor muscular, artralgia y cefalea.",
    "Miopatía, rabdomiólisis y lesión hepática importante.",
    "Enfermedad hepática activa e hipersensibilidad; revisar etiquetado en embarazo y lactancia.",
    "Observar síntomas musculares e interacciones.",
    "Claritromicina, ciclosporina, algunos antifúngicos y antivirales.",
    "Perfil lipídico y síntomas musculares o hepáticos."
  ),

  crearMedicamento(
    "Clonazepam",
    "Psicotrópicos",
    30,
    .05,
    "lipo",
    "Determinadas convulsiones y trastorno de pánico.",
    "Potencia la neurotransmisión inhibitoria GABA-A.",
    "Somnolencia, fatiga, mareos y alteraciones de memoria o coordinación.",
    "Dependencia, abstinencia grave, depresión respiratoria y sobredosis.",
    "Hipersensibilidad a benzodiacepinas y determinadas enfermedades hepáticas.",
    "No suspender bruscamente ni combinar con sedantes sin supervisión.",
    "Opioides, alcohol y otros depresores del sistema nervioso central.",
    "Respiración, sedación y dependencia."
  ),

  crearMedicamento(
    "Gentamicina",
    "Antibióticos",
    2.5,
    .95,
    "hidro",
    "Infecciones bacterianas graves susceptibles.",
    "Aminoglucósido que actúa sobre la subunidad ribosomal 30S.",
    "Molestias locales y alteraciones de laboratorio según presentación.",
    "Nefrotoxicidad, ototoxicidad y bloqueo neuromuscular.",
    "Hipersensibilidad al medicamento.",
    "Precaución con deterioro renal, deshidratación y otros agentes ototóxicos.",
    "Vancomicina, anfotericina B y ciertos diuréticos.",
    "Función renal, concentraciones sanguíneas cuando proceda y audición."
  ),

  crearMedicamento(
    "Cetirizina",
    "Antihistamínicos",
    8.3,
    .70,
    "hidro",
    "Alivio de síntomas alérgicos.",
    "Antagonista periférico de receptores histamínicos H1.",
    "Somnolencia, cansancio, cefalea y sequedad de boca.",
    "Reacciones alérgicas graves poco frecuentes.",
    "Hipersensibilidad a cetirizina o compuestos relacionados.",
    "Precaución en enfermedad renal y actividades que exigen atención.",
    "Alcohol y otros depresores del sistema nervioso central.",
    "Somnolencia y respuesta clínica."
  ),

  crearMedicamento(
    "Loratadina",
    "Antihistamínicos",
    8.4,
    .20,
    "lipo",
    "Alergias y urticaria.",
    "Antagonismo periférico de receptores H1.",
    "Cefalea, cansancio, boca seca y somnolencia ocasional.",
    "Hipersensibilidad y palpitaciones infrecuentes.",
    "Hipersensibilidad al medicamento.",
    "Precaución ante enfermedad hepática significativa.",
    "Inhibidores del metabolismo hepático.",
    "Respuesta y somnolencia."
  ),

  crearMedicamento(
    "Diclofenaco",
    "Antiinflamatorios",
    1.5,
    .12,
    "mixta",
    "Dolor e inflamación.",
    "Inhibe la síntesis de prostaglandinas.",
    "Dispepsia, náuseas, dolor abdominal y edema.",
    "Sangrado digestivo, lesión renal, eventos cardiovasculares y toxicidad hepática.",
    "Alergia a AINE y uso alrededor de revascularización coronaria.",
    "Precaución ante enfermedad renal, hepática, digestiva o cardiovascular.",
    "Anticoagulantes, corticoides, litio, otros AINE y diuréticos.",
    "Sangrado, presión y funciones renal y hepática."
  ),

  crearMedicamento(
    "Ciprofloxacino",
    "Antibióticos",
    4,
    .60,
    "mixta",
    "Determinadas infecciones bacterianas.",
    "Inhibe la ADN girasa y la topoisomerasa IV bacterianas.",
    "Náuseas, diarrea, cefalea y dolor abdominal.",
    "Rotura de tendón, neuropatía, efectos neurológicos y alteraciones de glucosa.",
    "Hipersensibilidad a quinolonas y uso con tizanidina.",
    "Precaución en miastenia, personas mayores y antecedentes tendinosos.",
    "Tizanidina, teofilina, warfarina, antiácidos y algunos antiarrítmicos.",
    "Tendones, síntomas neurológicos, glucemia y riñones."
  ),

  crearMedicamento(
    "Aciclovir",
    "Antivirales",
    3,
    .85,
    "hidro",
    "Determinadas infecciones por herpesvirus.",
    "Inhibe la síntesis de ADN viral tras su activación intracelular.",
    "Náuseas, cefalea, diarrea y malestar abdominal.",
    "Lesión renal aguda y efectos neurológicos graves.",
    "Hipersensibilidad a aciclovir o valaciclovir según presentación.",
    "Precaución ante deshidratación y enfermedad renal.",
    "Medicamentos nefrotóxicos.",
    "Función renal y cambios neurológicos."
  ),

  crearMedicamento(
    "Oseltamivir",
    "Antivirales",
    8,
    .90,
    "hidro",
    "Influenza cuando el tratamiento o prevención están indicados.",
    "Su metabolito activo inhibe la neuraminidasa viral.",
    "Náuseas, vómitos, cefalea y molestias abdominales.",
    "Anafilaxia, reacciones cutáneas graves y eventos neuropsiquiátricos notificados.",
    "Hipersensibilidad grave.",
    "Precaución según edad, función renal e indicación.",
    "Revisar situaciones relacionadas con vacunas vivas contra influenza.",
    "Evolución clínica y conducta."
  ),

  crearMedicamento(
    "Fluoxetina",
    "Antidepresivos",
    96,
    .05,
    "lipo",
    "Depresión y determinados trastornos bajo prescripción.",
    "Inhibe selectivamente la recaptación de serotonina.",
    "Insomnio, náuseas, sudoración y cambios sexuales.",
    "Síndrome serotoninérgico, hiponatremia, sangrado y cambios graves de conducta.",
    "Combinaciones incompatibles con IMAO y algunos fármacos.",
    "Precaución ante trastorno bipolar, convulsiones y cambios de conducta.",
    "IMAO, tramadol, linezolid, anticoagulantes y agentes CYP2D6.",
    "Estado de ánimo y síntomas serotoninérgicos."
  ),

  crearMedicamento(
    "Ketorolaco",
    "Antiinflamatorios",
    5.3,
    .70,
    "mixta",
    "Dolor moderado a intenso por periodos breves.",
    "AINE que inhibe la síntesis de prostaglandinas.",
    "Náuseas, mareos, somnolencia e indigestión.",
    "Hemorragia digestiva, lesión renal y sangrado importante.",
    "Úlcera o hemorragia activa, daño renal avanzado y algunas situaciones hemorrágicas.",
    "Uso limitado a corto plazo; evitar otros AINE.",
    "Anticoagulantes, antiagregantes, AINE y corticoides.",
    "Duración del uso, sangrado y función renal."
  ),

  crearMedicamento(
    "Meloxicam",
    "Antiinflamatorios",
    18,
    .15,
    "mixta",
    "Dolor e inflamación articular.",
    "Inhibe la síntesis de prostaglandinas.",
    "Dispepsia, náuseas, mareos, dolor abdominal y edema.",
    "Hemorragia digestiva, lesión renal y eventos cardiovasculares.",
    "Alergia a AINE y uso alrededor de revascularización coronaria.",
    "Precaución ante úlcera, enfermedad renal o cardiovascular y embarazo.",
    "Anticoagulantes, corticoides, diuréticos y otros AINE.",
    "Sangrado, edema y función renal."
  ),

  crearMedicamento(
    "Celecoxib",
    "Antiinflamatorios",
    11,
    .10,
    "lipo",
    "Dolor e inflamación en determinadas enfermedades.",
    "Inhibe principalmente COX-2.",
    "Dispepsia, cefalea, edema y dolor abdominal.",
    "Eventos cardiovasculares, sangrado digestivo, lesión renal y reacciones cutáneas graves.",
    "Hipersensibilidad, algunas alergias a sulfonamidas y restricciones propias de AINE.",
    "Precaución ante enfermedad renal, digestiva, cardiovascular y embarazo.",
    "Warfarina, fluconazol, litio y ciertos antihipertensivos.",
    "Presión, función renal y síntomas digestivos."
  ),

  crearMedicamento(
    "Cefalexina",
    "Antibióticos",
    1,
    .90,
    "hidro",
    "Infecciones bacterianas susceptibles.",
    "Cefalosporina que inhibe la síntesis de pared bacteriana.",
    "Diarrea, náuseas, vómitos y erupciones.",
    "Anafilaxia, colitis por C. difficile y reacciones cutáneas graves.",
    "Hipersensibilidad a cefalosporinas.",
    "Revisar alergias y función renal.",
    "Probenecid y determinadas combinaciones con metformina.",
    "Diarrea persistente, alergias y evolución de la infección."
  ),

  crearMedicamento(
    "Azitromicina",
    "Antibióticos",
    68,
    .08,
    "lipo",
    "Determinadas infecciones bacterianas.",
    "Macrólido que actúa sobre la subunidad ribosomal 50S.",
    "Diarrea, náuseas, vómitos y dolor abdominal.",
    "Prolongación QT, arritmias, lesión hepática y alergias graves.",
    "Alergia a macrólidos y daño hepático previo asociado.",
    "Precaución en riesgo arrítmico, enfermedad hepática y miastenia.",
    "Medicamentos que prolongan QT y algunas combinaciones con anticoagulantes.",
    "Síntomas cardíacos, función hepática y respuesta."
  ),

  crearMedicamento(
    "Doxiciclina",
    "Antibióticos",
    18,
    .25,
    "mixta",
    "Determinadas infecciones bacterianas.",
    "Tetraciclina que actúa sobre la subunidad ribosomal 30S.",
    "Náuseas, diarrea, fotosensibilidad e irritación esofágica.",
    "Hipertensión intracraneal, reacciones cutáneas graves y lesión hepática.",
    "Alergia a tetraciclinas; restricciones según edad, embarazo e indicación.",
    "Precaución con exposición solar e irritación esofágica.",
    "Calcio, hierro, antiácidos, retinoides y algunos anticonvulsivos.",
    "Fotosensibilidad y síntomas esofágicos."
  ),

  crearMedicamento(
    "Levofloxacino",
    "Antibióticos",
    7,
    .85,
    "hidro",
    "Determinadas infecciones bacterianas.",
    "Fluoroquinolona que inhibe enzimas de replicación del ADN bacteriano.",
    "Náuseas, diarrea, cefalea, mareos e insomnio.",
    "Rotura tendinosa, neuropatía, efectos neurológicos, arritmias y alteraciones de glucosa.",
    "Hipersensibilidad a quinolonas.",
    "Precaución en miastenia, personas mayores y alteración renal.",
    "Antiácidos, hierro, zinc, warfarina y fármacos que prolongan QT.",
    "Tendones, neurología, glucemia y función renal."
  ),

  crearMedicamento(
    "Fluconazol",
    "Antifúngicos",
    30,
    .80,
    "hidro",
    "Determinadas infecciones por hongos.",
    "Inhibe la síntesis de ergosterol de la membrana fúngica.",
    "Náuseas, dolor abdominal, cefalea, diarrea y erupciones.",
    "Lesión hepática, reacciones cutáneas graves y prolongación QT.",
    "Hipersensibilidad y algunas combinaciones que prolongan QT.",
    "Precaución en enfermedad hepática, renal y embarazo.",
    "Warfarina, fenitoína, determinadas estatinas y medicamentos que prolongan QT.",
    "Función hepática, interacciones y respuesta."
  ),

  crearMedicamento(
    "Famotidina",
    "Gastrointestinales",
    3,
    .70,
    "hidro",
    "Exceso de ácido gástrico.",
    "Antagonista de receptores histamínicos H2.",
    "Cefalea, mareos, estreñimiento y diarrea.",
    "Reacciones alérgicas y confusión en personas susceptibles.",
    "Hipersensibilidad a famotidina o compuestos relacionados.",
    "Precaución en deterioro renal y síntomas digestivos de alarma.",
    "Fármacos cuya absorción depende del pH gástrico.",
    "Función renal, respuesta y estado mental."
  ),

  crearMedicamento(
    "Amlodipino",
    "Antihipertensivos",
    35,
    .10,
    "lipo",
    "Hipertensión y determinadas formas de angina.",
    "Bloquea canales de calcio y favorece la relajación vascular.",
    "Edema de tobillos, rubor, cefalea, cansancio y mareos.",
    "Hipotensión intensa y empeoramiento transitorio de angina en algunas situaciones.",
    "Hipersensibilidad y restricciones cardiovasculares específicas.",
    "Precaución en enfermedad hepática e hipotensión.",
    "Simvastatina, inhibidores CYP3A4 y otros antihipertensivos.",
    "Presión, edema y síntomas cardiovasculares."
  ),

  crearMedicamento(
    "Sertralina",
    "Antidepresivos",
    26,
    .05,
    "lipo",
    "Depresión y determinados trastornos de ansiedad.",
    "Inhibe selectivamente la recaptación de serotonina.",
    "Náuseas, diarrea, insomnio, sudoración y cambios sexuales.",
    "Síndrome serotoninérgico, hiponatremia, sangrado y cambios graves de conducta.",
    "Ciertas combinaciones con IMAO y pimozida.",
    "Precaución ante trastorno bipolar, convulsiones y cambios de conducta.",
    "IMAO, tramadol, linezolid, anticoagulantes y otros serotoninérgicos.",
    "Estado de ánimo, sodio y síntomas serotoninérgicos."
  ),

  crearMedicamento(
    "Escitalopram",
    "Antidepresivos",
    30,
    .10,
    "lipo",
    "Depresión y ansiedad generalizada.",
    "Inhibe selectivamente la recaptación de serotonina.",
    "Náuseas, insomnio, somnolencia, sudoración y cambios sexuales.",
    "Síndrome serotoninérgico, hiponatremia, sangrado y alteraciones cardíacas.",
    "Combinaciones incompatibles con determinados IMAO.",
    "Precaución en bipolaridad, daño hepático y riesgo de prolongación QT.",
    "IMAO, tramadol, anticoagulantes y algunos medicamentos que prolongan QT.",
    "Estado de ánimo, sodio y respuesta."
  ),

  crearMedicamento(
    "Fexofenadina",
    "Antihistamínicos",
    14,
    .15,
    "hidro",
    "Alergias y urticaria.",
    "Antagonista periférico H1.",
    "Cefalea, mareos, náuseas y cansancio.",
    "Reacciones de hipersensibilidad importantes poco frecuentes.",
    "Hipersensibilidad al medicamento.",
    "Precaución en enfermedad renal.",
    "Jugos de algunas frutas y antiácidos minerales pueden reducir su absorción.",
    "Control de síntomas alérgicos y tolerancia."
  ),

  crearMedicamento(
    "Difenhidramina",
    "Antihistamínicos",
    8,
    .10,
    "lipo",
    "Determinados síntomas alérgicos.",
    "Antagonista H1 de primera generación con actividad anticolinérgica.",
    "Somnolencia, boca seca, visión borrosa, estreñimiento y mareos.",
    "Confusión, retención urinaria, arritmias, convulsiones y toxicidad por sobredosis.",
    "Restricciones según formulación y antecedentes.",
    "Cuidado en adultos mayores, glaucoma y retención urinaria.",
    "Alcohol, opioides, sedantes y otros anticolinérgicos.",
    "Sedación, estado mental y efectos anticolinérgicos."
  ),

  crearMedicamento(
    "Metoprolol",
    "Antihipertensivos",
    4,
    .05,
    "lipo",
    "Hipertensión y determinadas enfermedades cardiovasculares.",
    "Betabloqueador relativamente selectivo de receptores beta-1.",
    "Fatiga, mareos, bradicardia y molestias digestivas.",
    "Bloqueo cardíaco, bradicardia grave e hipotensión.",
    "Bradicardia grave, determinados bloqueos y shock cardiogénico.",
    "Precaución en asma, diabetes y suspensión abrupta.",
    "Verapamilo, diltiazem, digoxina y clonidina.",
    "Frecuencia cardíaca, presión y síntomas cardíacos."
  )
];

// ==========================================
// 3. ICONOS Y CONFIGURACIÓN
// ==========================================

const ICONOS = {
  Todos: "▦",
  Analgésicos: "💊",
  Antiinflamatorios: "🩹",
  Antibióticos: "🧫",
  Antidiabéticos: "🩸",
  Antihipertensivos: "❤️",
  Gastrointestinales: "🧬",
  Hipolipemiantes: "🫀",
  Psicotrópicos: "🧠",
  Antihistamínicos: "🌿",
  Antivirales: "🦠",
  Antidepresivos: "🧠",
  Antifúngicos: "🍄"
};

const COLORES = [
  "#e4f5ff",
  "#e7faf2",
  "#fff2dd",
  "#eef0ff",
  "#e3f9ee",
  "#ffeef5",
  "#e5f3ff",
  "#f1eaff"
];

const PESOS_COMPLEXION = {
  delgada: 55,
  media: 70,
  robusta: 90
};

const EDADES = {
  joven: "18 a 25 años",
  adulto: "26 a 59 años",
  mayor: "60 años o más"
};

const $ = id => document.getElementById(id);

const estado = {
  categoria: "Todos",
  complexion: "media",
  edad: "adulto",
  resultado: null
};

function fmt(numero, decimales = 2) {
  if (
    numero !== 0 &&
    Math.abs(numero) < 0.0001
  ) {
    return Number(numero).toExponential(2);
  }

  return Number(numero).toLocaleString("es-MX", {
    maximumFractionDigits: decimales
  });
}

// ==========================================
// 4. CATÁLOGO Y FILTROS
// ==========================================

function iniciarCatalogo() {
  $("medicamento").innerHTML = MEDS.map((m, i) =>
    `<option value="${i}">${m.nombre}</option>`
  ).join("");

  $("totalMeds").textContent = MEDS.length;

  $("totalCats").textContent =
    new Set(MEDS.map(m => m.categoria)).size;

  crearFiltros();
  mostrarCatalogo();
}

function crearFiltros() {
  const categorias = [
    "Todos",
    ...new Set(MEDS.map(m => m.categoria))
  ];

  $("filtros").innerHTML = categorias.map(c => `
    <button type="button"
      data-cat="${c}"
      class="filter ${estado.categoria === c ? "active" : ""}"
      aria-pressed="${estado.categoria === c}">
      ${ICONOS[c]} ${c}
    </button>
  `).join("");
}

function mostrarCatalogo() {
  const busca = $("buscar").value
    .trim()
    .toLocaleLowerCase("es");

  const lista = MEDS
    .map((m, i) => ({m, i}))
    .filter(({m}) => {
      const categoriaCorrecta =
        estado.categoria === "Todos" ||
        estado.categoria === m.categoria;

      const texto = [
        m.nombre,
        m.categoria,
        m.uso,
        m.mecanismo,
        m.comunes,
        m.graves
      ].join(" ").toLocaleLowerCase("es");

      return categoriaCorrecta && texto.includes(busca);
    });

  $("contador").textContent =
    lista.length + " medicamento(s)";

  $("sinResultados").hidden =
    lista.length > 0;

  $("catalogo").innerHTML = lista.map(({m, i}) => `
    <article class="drug-card">
      <div class="drug-visual"
        style="--drug-color:${COLORES[i % COLORES.length]}">

        <span class="drug-category">
          ${ICONOS[m.categoria]} ${m.categoria}
        </span>

        <span class="med-symbol">
          ${
            m.categoria === "Antibióticos" ? "🧪" :
            m.categoria === "Antivirales" ? "🧬" :
            m.categoria === "Antifúngicos" ? "🍄" :
            "💊"
          }
        </span>
      </div>

      <div class="drug-info">
        <h3>${m.nombre}</h3>

        <p>${m.uso}</p>

        <p class="effects">
          <b>Efectos secundarios:</b> ${m.comunes}
        </p>

        <span class="drug-life">
          ◷ Vida media orientativa: ${m.vida} h
        </span>

        <div class="drug-buttons">
          <button type="button"
            class="btn secondary"
            data-ficha="${i}">
            Ver ficha
          </button>

          <button type="button"
            class="btn primary"
            data-elegir="${i}">
            Simular →
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// ==========================================
// 5. FICHAS TÉCNICAS
// ==========================================

function abrirFicha(i) {
  const m = MEDS[i];

  if (!m) return;

  const distribucion = {
    hidro: "Hidrofílica ilustrativa",
    lipo: "Lipofílica ilustrativa",
    mixta: "Mixta ilustrativa"
  };

  const fuente =
    "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=" +
    encodeURIComponent(m.nombre);

  const seccion = (titulo, contenido, clase = "") => `
    <section class="ficha-section ${clase}">
      <h3>${titulo}</h3>
      <p>${contenido}</p>
    </section>
  `;

  $("ficha").innerHTML = `
    <div class="ficha-header">
      <span class="ficha-category">
        ${ICONOS[m.categoria]} ${m.categoria}
      </span>

      <h2>${m.nombre}</h2>
      <p>${m.uso}</p>

      <div class="ficha-overview">
        <div>
          <small>Vida media orientativa</small>
          <strong>${m.vida} horas</strong>
        </div>

        <div>
          <small>Distribución en el modelo</small>
          <strong>${distribucion[m.distribucion]}</strong>
        </div>

        <div>
          <small>Ponderación renal didáctica</small>
          <strong>${Math.round(m.renal * 100)}%</strong>
        </div>
      </div>
    </div>

    <div class="ficha-content">
      ${seccion("🧬 Mecanismo de acción", m.mecanismo)}

      ${seccion("🩺 Usos principales", m.uso)}

      ${seccion("💊 Efectos secundarios habituales", m.comunes)}

      ${seccion(
        "⚠️ Reacciones adversas graves",
        m.graves,
        "danger"
      )}

      ${seccion(
        "🚫 Contraindicaciones",
        m.contra,
        "warning"
      )}

      ${seccion("🛡️ Precauciones", m.precauciones)}

      ${seccion("🔄 Interacciones", m.interacciones)}

      ${seccion("📋 Vigilancia médica", m.vigilancia)}

      ${seccion(
        "⏳ Vida media y duración del efecto",
        `La vida media de referencia aproximada es
        ${m.vida} horas. No significa que el
        efecto terapéutico dure ese mismo tiempo.`
      )}

      ${seccion(
        "🕒 Horarios y duración del tratamiento",
        `El intervalo entre dosis y la duración del
        tratamiento se establecen mediante indicación
        médica, no a partir de la gráfica.`
      )}

      <div class="ficha-notice">
        Resumen educativo no exhaustivo.
        La información y los riesgos dependen
        de la presentación y el paciente.
        Consulta el etiquetado oficial correspondiente.
      </div>

      <div class="ficha-actions">
        <a href="${fuente}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn secondary">
          📚 Consultar DailyMed
        </a>

        <button type="button"
          class="btn primary"
          data-elegir="${i}">
          📈 Simular medicamento
        </button>
      </div>
    </div>
  `;

  if (!$("modal").open) {
    $("modal").showModal();
  }

  $("modal").scrollTop = 0;
}

function seleccionarMedicamento(i) {
  $("medicamento").value = String(i);

  if ($("modal").open) {
    $("modal").close();
  }

  actualizar();

  $("simulador").scrollIntoView({
    behavior: "smooth"
  });
}

// ==========================================
// 6. LECTURA DEL PERFIL
// ==========================================

function leerPerfil() {
  return {
    med: Number($("medicamento").value),
    cantidad: Number($("cantidad").value),
    tiempo: Number($("tiempo").value),
    peso: Number($("peso").value),
    complexion: estado.complexion,
    edad: estado.edad,
    renal: $("renal").value,
    hepatica: $("hepatica").value
  };
}

function valido(p) {
  return (
    $("peso").value.trim() !== "" &&
    Number.isFinite(p.peso) &&
    p.peso >= 20 &&
    p.peso <= 300 &&
    p.cantidad >= 20 &&
    p.cantidad <= 200 &&
    p.tiempo >= 1 &&
    p.tiempo <= 240 &&
    MEDS[p.med] !== undefined
  );
}

// ==========================================
// 7. CÁLCULOS FARMACOCINÉTICOS
// ==========================================

function calcularModelo(p) {
  const m = MEDS[p.med];

  // Factores exclusivamente educativos.
  const cuerpo = {
    delgada: .88,
    media: 1,
    robusta: 1.18
  }[p.complexion];

  const edad = {
    joven: 1.08,
    adulto: 1,
    mayor: .78
  }[p.edad];

  const renal = {
    normal: 1,
    moderada: .72,
    alta: .42
  }[p.renal];

  const hepatica = {
    normal: 1,
    moderada: .75,
    alta: .45
  }[p.hepatica];

  // Distribución aparente hipotética.
  const distribucion =
    (p.peso / 70) * cuerpo;

  // Concentración inicial relativa.
  const inicial =
    p.cantidad / distribucion;

  // Ponderación orgánica didáctica.
  const ajusteOrganos =
    m.renal * renal +
    (1 - m.renal) * hepatica;

  const kBase =
    Math.log(2) / m.vida;

  const k =
    kBase * edad * ajusteOrganos;

  // Eliminación lenta: 35% menor.
  const kLento =
    kBase * .65;

  const C = (inicio, constante, t) =>
    inicio * Math.exp(-constante * t);

  const filas = Array.from(
    {length: 11},
    (_, i) => {
      const t = p.tiempo * i / 10;

      return {
        t,
        elegido: C(inicial, k, t),
        referencia: C(p.cantidad, kBase, t),
        lento: C(p.cantidad, kLento, t),
        restante: 100 * Math.exp(-k * t)
      };
    }
  );

  return {
    med: m,
    perfil: p,
    inicial,
    distribucion,
    k,
    kBase,
    kLento,
    vidaMedia: Math.log(2) / k,
    final: C(inicial, k, p.tiempo),
    restante: 100 * Math.exp(-k * p.tiempo),
    filas
  };
}

// ==========================================
// 8. GRÁFICA DINÁMICA
// ==========================================

function dibujarGrafica(r) {
  const W = 760;
  const H = 340;
  const L = 76;
  const R = 22;
  const T = 24;
  const B = 53;

  const ancho = W - L - R;
  const alto = H - T - B;

  const maxT = r.perfil.tiempo;
  const maxY = Math.max(
    r.inicial,
    r.perfil.cantidad
  ) * 1.12;

  const X = t =>
    L + t / maxT * ancho;

  const Y = v =>
    T + alto - v / maxY * alto;

  let html = "";

  // Líneas horizontales.
  for (let i = 0; i <= 5; i++) {
    const v = maxY * i / 5;
    const y = Y(v);

    html += `
      <line x1="${L}" y1="${y}"
        x2="${W-R}" y2="${y}"
        stroke="#e4edf3"/>

      <text x="${L-10}" y="${y+4}"
        text-anchor="end"
        font-size="11"
        fill="#8094a4">
        ${fmt(v,1)}
      </text>
    `;
  }

  // Líneas verticales.
  for (let i = 0; i <= 6; i++) {
    const t = maxT * i / 6;
    const x = X(t);

    html += `
      <line x1="${x}" y1="${T}"
        x2="${x}" y2="${T+alto}"
        stroke="#edf2f7"/>

      <text x="${x}" y="${H-23}"
        text-anchor="middle"
        font-size="11"
        fill="#8094a4">
        ${fmt(t,1)}
      </text>
    `;
  }

  const series = [
    {
      inicio: r.perfil.cantidad,
      k: r.kBase,
      color: "#467bda"
    },
    {
      inicio: r.perfil.cantidad,
      k: r.kLento,
      color: "#e79a50"
    },
    {
      inicio: r.inicial,
      k: r.k,
      color: "#0bbba9"
    }
  ];

  series.forEach((curva, idx) => {
    let path = "";

    for (let i = 0; i <= 160; i++) {
      const t = maxT * i / 160;
      const v =
        curva.inicio * Math.exp(-curva.k * t);

      path +=
        `${i ? "L" : "M"} ` +
        `${X(t).toFixed(2)} ` +
        `${Y(v).toFixed(2)} `;
    }

    html += `
      <path
        d="${path}"
        fill="none"
        stroke="${curva.color}"
        stroke-width="${idx === 2 ? 4 : 2.7}"
        stroke-linecap="round"
        stroke-linejoin="round"
        ${idx === 1 ? 'stroke-dasharray="8 5"' : ""}
      />
    `;
  });

  html += `
    <text x="${W/2}" y="${H-3}"
      text-anchor="middle"
      font-size="13"
      fill="#627a8e">
      Tiempo (horas)
    </text>

    <text
      transform="translate(18 ${H/2}) rotate(-90)"
      text-anchor="middle"
      font-size="13"
      fill="#627a8e">
      Concentración relativa (u.a.)
    </text>
  `;

  $("grafica").innerHTML = html;
}

// ==========================================
// 9. ACTUALIZACIÓN DE ESTADÍSTICAS
// ==========================================

function actualizar() {
  const p = leerPerfil();

  $("cantidadValor").textContent =
    p.cantidad + " unidades relativas";

  $("tiempoValor").textContent =
    p.tiempo + " horas";

  // EXPLICACIÓN DINÁMICA DE LAS CURVAS.
  $("explicacionTiempo").innerHTML = `
    <b>
      📈 ¿Qué muestra la gráfica durante las
      ${p.tiempo} horas?
    </b>

    <p>
      Representa cómo disminuye la
      <strong>concentración relativa del medicamento</strong>
      desde la hora 0 hasta la hora ${p.tiempo},
      de acuerdo con un modelo matemático simplificado.
    </p>

    <p>
      🟢 <strong>Verde:</strong>
      perfil elegido, considerando el medicamento,
      peso, complexión, edad y funciones orgánicas.
    </p>

    <p>
      🔵 <strong>Azul:</strong>
      modelo de referencia basado en la
      vida media del medicamento,
      sin ajustes del perfil.
    </p>

    <p>
      🟠 <strong>Naranja:</strong>
      escenario hipotético de eliminación lenta,
      con una constante 35% menor que la referencia.
    </p>

    <p>
      <strong>Importante:</strong>
      estas ${p.tiempo} horas no indican cuándo
      termina el efecto terapéutico,
      cada cuánto se administra otra dosis
      ni durante cuántos días debe tomarse.
      Esos tiempos son diferentes y requieren
      indicación profesional.
    </p>
  `;

  if (!valido(p)) {
    $("error").textContent =
      "Introduce un peso válido entre 20 y 300 kg.";

    estado.resultado = null;

    [
      "grafica",
      "resultados",
      "interpretacion",
      "tablaEstadisticas"
    ].forEach(id => {
      $(id).innerHTML = "";
    });

    return;
  }

  $("error").textContent = "";

  const r = calcularModelo(p);
  estado.resultado = r;

  $("resumenGrafica").textContent =
    `${r.med.nombre} · ${p.peso} kg · ` +
    `${p.complexion} · ${p.tiempo} horas`;

  dibujarGrafica(r);

  const indicadores = [
    [
      "Concentración inicial",
      fmt(r.inicial,3) + " u.a."
    ],
    [
      "Concentración final",
      fmt(r.final,3) + " u.a."
    ],
    [
      "Vida media hipotética",
      fmt(r.vidaMedia,2) + " h"
    ],
    [
      "Constante k",
      fmt(r.k,4) + " h⁻¹"
    ],
    [
      "Restante al final",
      fmt(r.restante,2) + "%"
    ],
    [
      "Factor de distribución",
      fmt(r.distribucion,3) + "×"
    ]
  ];

  $("resultados").innerHTML =
    indicadores.map(([a,b]) => `
      <article class="result-card">
        <small>${a}</small>
        <strong>${b}</strong>
      </article>
    `).join("");

  $("interpretacion").innerHTML = `
    <b>Interpretación educativa</b>

    <p>
      <b>Medicamento:</b> ${r.med.nombre}<br>
      <b>Peso:</b> ${p.peso} kg<br>
      <b>Complexión:</b> ${p.complexion}<br>
      <b>Edad:</b> ${EDADES[p.edad]}<br>
      <b>Función renal:</b> ${p.renal}<br>
      <b>Función hepática:</b> ${p.hepatica}<br>
      <b>Periodo observado:</b> ${p.tiempo} horas.
    </p>

    <p>
      La concentración relativa pasa de
      <b>${fmt(r.inicial,3)} u.a.</b>
      a <b>${fmt(r.final,3)} u.a.</b>,
      equivalente al
      <b>${fmt(r.restante,2)}%</b>
      restante del valor inicial.
    </p>

    <p>
      La vida media de referencia es
      aproximadamente ${r.med.vida} h.
      La vida media hipotética del perfil es
      ${fmt(r.vidaMedia,2)} h.
    </p>

    <p>
      <b>
        Ni estos valores ni las ${p.tiempo}
        horas de la gráfica determinan
        la duración del efecto terapéutico,
        los intervalos entre dosis ni los
        días de tratamiento.
      </b>
    </p>
  `;

  $("tablaEstadisticas").innerHTML =
    r.filas.map(f => `
      <tr>
        <td>${fmt(f.t,1)} h</td>
        <td>${fmt(f.elegido,3)} u.a.</td>
        <td>${fmt(f.referencia,3)} u.a.</td>
        <td>${fmt(f.lento,3)} u.a.</td>
        <td>${fmt(f.restante,2)}%</td>
      </tr>
    `).join("");
}

// ==========================================
// 10. ICONOS Y RESTABLECIMIENTO
// ==========================================

function seleccionarOpcion(grupo, atributo, valor) {
  document.querySelectorAll(
    `#${grupo} [${atributo}]`
  ).forEach(boton => {
    const activo =
      boton.getAttribute(atributo) === valor;

    boton.classList.toggle("active", activo);

    boton.setAttribute(
      "aria-pressed",
      String(activo)
    );
  });
}

function restablecer() {
  $("medicamento").value = "0";
  $("cantidad").value = "100";
  $("tiempo").value = "24";
  $("peso").value = "70";
  $("renal").value = "normal";
  $("hepatica").value = "normal";

  estado.complexion = "media";
  estado.edad = "adulto";

  seleccionarOpcion(
    "complexionOptions",
    "data-complexion",
    "media"
  );

  seleccionarOpcion(
    "edadOptions",
    "data-edad",
    "adulto"
  );

  actualizar();
}

// ==========================================
// 11. GENERADOR PDF SIN LIBRERÍAS
// ==========================================

function crearReportePDF(r) {
  const W = 595.28;
  const H = 841.89;
  const M = 46;

  const NAVY = [.06,.14,.23];
  const VERDE = [.04,.68,.61];
  const AZUL = [.27,.48,.85];
  const NARANJA = [.91,.60,.31];
  const GRIS = [.38,.47,.55];

  const n = v => Number(v).toFixed(2);
  const rgb = c => c.map(n).join(" ");

  const paginas = [];
  let contenido = "";
  let y = 685;
  let num = 0;

  // Caracteres compatibles con PDF estándar.
  function seguro(t) {
    return String(t)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[\u2013\u2014]/g,"-")
      .replace(/[^\x20-\x7e]/g," ")
      .replace(/\\/g,"\\\\")
      .replace(/\(/g,"\\(")
      .replace(/\)/g,"\\)");
  }

  function texto(
    s, x, py,
    size = 10,
    bold = false,
    color = NAVY
  ) {
    contenido +=
      `BT /F${bold ? 2 : 1} ${n(size)} Tf ` +
      `${rgb(color)} rg ` +
      `1 0 0 1 ${n(x)} ${n(py)} Tm ` +
      `(${seguro(s)}) Tj ET\n`;
  }

  function rect(x, py, w, h, color) {
    contenido +=
      `${rgb(color)} rg ` +
      `${n(x)} ${n(py)} ` +
      `${n(w)} ${n(h)} re f\n`;
  }

  function linea(
    x1, y1, x2, y2,
    color = [.85,.90,.94],
    grosor = 1
  ) {
    contenido +=
      `${rgb(color)} RG ${n(grosor)} w ` +
      `${n(x1)} ${n(y1)} m ` +
      `${n(x2)} ${n(y2)} l S\n`;
  }

  function nuevaPagina(subtitulo) {
    if (contenido) {
      paginas.push(contenido);
    }

    contenido = "";
    num++;

    rect(0,H-112,W,112,NAVY);
    rect(0,H-116,W,4,VERDE);

    texto(
      "FARMACOSIM TESH",
      M,H-49,22,true,[1,1,1]
    );

    texto(
      subtitulo,
      M,H-75,11,false,[.68,.92,.89]
    );

    texto(
      "Generado: " +
      new Date().toLocaleString("es-MX"),
      M,H-94,9,false,[.78,.85,.90]
    );

    linea(M,44,W-M,44);

    texto(
      "Uso educativo | No clinico",
      M,28,8,false,GRIS
    );

    texto(
      "Pagina " + num,
      W-105,28,8,false,GRIS
    );

    y = 685;
  }

  function cortar(s, limite = 82) {
    const palabras = String(s).split(/\s+/);
    const lineas = [];
    let actual = "";

    for (const palabra of palabras) {
      if (
        (actual + " " + palabra).trim().length > limite &&
        actual
      ) {
        lineas.push(actual);
        actual = palabra;
      } else {
        actual += (actual ? " " : "") + palabra;
      }
    }

    if (actual) lineas.push(actual);
    return lineas;
  }

  function asegurar(alto) {
    if (y - alto < 68) {
      nuevaPagina("Continuacion del reporte");
    }
  }

  function titulo(s) {
    asegurar(31);
    texto(s.toUpperCase(),M,y,12,true,VERDE);
    y -= 26;
  }

  function parrafo(s) {
    const lineas = cortar(s);
    asegurar(lineas.length * 15 + 12);

    for (const l of lineas) {
      texto(l,M,y,10,false,GRIS);
      y -= 15;
    }

    y -= 12;
  }

  function dato(etiqueta, valor) {
    asegurar(23);
    texto(etiqueta,M,y,10,true);
    texto(valor,M+240,y,10,false,GRIS);
    y -= 22;
  }

  // ========================================
  // PÁGINA 1: PERFIL
  // ========================================

  nuevaPagina("Reporte estadistico personalizado");

  titulo("Medicamento y perfil");

  dato("Medicamento",r.med.nombre);
  dato("Categoria",r.med.categoria);
  dato("Vida media de referencia",r.med.vida+" h");
  dato("Peso",r.perfil.peso+" kg");
  dato("Complexion",r.perfil.complexion);
  dato("Edad",EDADES[r.perfil.edad]);
  dato("Funcion renal",r.perfil.renal);
  dato("Funcion hepatica",r.perfil.hepatica);
  dato("Periodo observado",r.perfil.tiempo+" h");
  dato("Cantidad inicial",r.perfil.cantidad+" u.a.");

  y -= 12;
  titulo("Indicadores calculados");

  dato(
    "Concentracion inicial",
    fmt(r.inicial,3)+" u.a."
  );

  dato(
    "Concentracion final",
    fmt(r.final,3)+" u.a."
  );

  dato(
    "Vida media hipotetica",
    fmt(r.vidaMedia,2)+" h"
  );

  dato(
    "Constante k",
    fmt(r.k,4)+" h-1"
  );

  dato(
    "Porcentaje restante",
    fmt(r.restante,2)+"%"
  );

  dato(
    "Distribucion aparente",
    fmt(r.distribucion,3)+" x"
  );

  // ========================================
  // PÁGINA 2: GRÁFICA
  // ========================================

  nuevaPagina("Grafica comparativa de eliminacion");
  titulo("Curvas de concentracion relativa");

  const gx = 78;
  const gy = 345;
  const gw = 435;
  const gh = 270;

  const maxT = r.perfil.tiempo;

  const maxY = Math.max(
    r.inicial,
    r.perfil.cantidad
  ) * 1.12;

  const X = t =>
    gx + t / maxT * gw;

  const Y = v =>
    gy + v / maxY * gh;

  // Cuadrícula horizontal.
  for (let i = 0; i <= 5; i++) {
    const yy = gy + gh * i / 5;

    linea(
      gx, yy,
      gx+gw, yy,
      [.87,.91,.94],.6
    );

    texto(
      fmt(maxY*i/5,1),
      43,yy-3,8,false,GRIS
    );
  }

  // Cuadrícula vertical.
  for (let i = 0; i <= 5; i++) {
    const t = maxT*i/5;
    const xx = X(t);

    linea(
      xx,gy,
      xx,gy+gh,
      [.87,.91,.94],.6
    );

    texto(
      fmt(t,1),
      xx-6,gy-19,8,false,GRIS
    );
  }

  const curvas = [
    [r.perfil.cantidad,r.kBase,AZUL],
    [r.perfil.cantidad,r.kLento,NARANJA],
    [r.inicial,r.k,VERDE]
  ];

  curvas.forEach(([inicio,k,color]) => {
    let anterior = null;

    for (let i=0; i<=160; i++) {
      const t = maxT*i/160;
      const valor =
        inicio * Math.exp(-k*t);

      const punto = [
        X(t),
        Y(valor)
      ];

      if (anterior) {
        linea(
          anterior[0],
          anterior[1],
          punto[0],
          punto[1],
          color,
          2
        );
      }

      anterior = punto;
    }
  });

  texto(
    "Tiempo (horas)",
    270,gy-45,10,false,GRIS
  );

  texto(
    "Concentracion relativa (u.a.)",
    gx,gy+gh+17,10,false,GRIS
  );

  linea(87,296,108,296,VERDE,3);
  texto("Perfil elegido",116,292,10);

  linea(235,296,256,296,AZUL,3);
  texto("Referencia",264,292,10);

  linea(371,296,392,296,NARANJA,3);
  texto("Lenta",400,292,10);

  y = 253;

  titulo("Que muestra la grafica");

  parrafo(
    "Representa como disminuye la concentracion " +
    "relativa de " + r.med.nombre +
    " desde la hora 0 hasta la hora " +
    r.perfil.tiempo +
    ". Son resultados de un modelo matematico, " +
    "no mediciones reales en sangre."
  );

  parrafo(
    "Verde: perfil elegido. Azul: eliminacion " +
    "de referencia sin ajustes. Naranja: escenario " +
    "con una constante de eliminacion 35 por ciento " +
    "menor que la de referencia."
  );

  parrafo(
    "El periodo mostrado no representa el tiempo " +
    "de efecto, el intervalo entre dosis ni los " +
    "dias de tratamiento."
  );

  // ========================================
  // PÁGINA 3: ESTADÍSTICAS
  // ========================================

  nuevaPagina("Tabla estadistica");
  titulo("Once mediciones por intervalo");

  const columnas = [
    M+7,
    M+103,
    M+202,
    M+303,
    M+406
  ];

  rect(M,y-22,W-2*M,31,NAVY);

  const encabezados = [
    "Horas",
    "Elegido",
    "Referencia",
    "Lenta",
    "Restante %"
  ];

  encabezados.forEach((h,i) => {
    texto(
      h,columnas[i],y-12,
      9,true,[1,1,1]
    );
  });

  y -= 43;

  r.filas.forEach((f,i) => {
    if (i%2 === 0) {
      rect(
        M,y-13,W-2*M,29,
        [.95,.975,.985]
      );
    }

    const valores = [
      fmt(f.t,1),
      fmt(f.elegido,3),
      fmt(f.referencia,3),
      fmt(f.lento,3),
      fmt(f.restante,2)+"%"
    ];

    valores.forEach((valor,j) => {
      texto(
        valor,columnas[j],y,9
      );
    });

    y -= 29;
  });

  y -= 25;

  titulo("Significado de las columnas");

  parrafo(
    "HORAS: tiempo transcurrido desde la hora " +
    "cero del modelo. ELEGIDO: concentracion " +
    "relativa calculada usando el perfil seleccionado."
  );

  parrafo(
    "REFERENCIA: concentracion calculada con " +
    "la vida media de referencia y sin ajustes. " +
    "LENTA: escenario con constante de eliminacion " +
    "35 por ciento menor que la de referencia."
  );

  parrafo(
    "RESTANTE: porcentaje de concentracion " +
    "inicial del perfil que permanece. " +
    "u.a. significa unidades arbitrarias; " +
    "no son mg/L."
  );

  // ========================================
  // PÁGINA 4: EXPLICACIÓN DE LAS 24 HORAS
  // ========================================

  nuevaPagina("Interpretacion de los tiempos");

  titulo("Tiempo de simulacion");

  parrafo(
    "La grafica muestra la disminucion de la " +
    "concentracion relativa de " +
    r.med.nombre + " entre 0 y " +
    r.perfil.tiempo +
    " horas. El periodo inicial de 24 horas es " +
    "solo un ajuste predeterminado de observacion."
  );

  titulo("Vida media");

  parrafo(
    "Es el tiempo aproximado necesario para que " +
    "la concentracion disminuya un 50 por ciento " +
    "durante la fase de eliminacion correspondiente. " +
    "La vida media de referencia del medicamento " +
    "seleccionado es aproximadamente " +
    r.med.vida + " horas."
  );

  titulo("Duracion del efecto terapeutico");

  parrafo(
    "Tiempo durante el cual el medicamento produce " +
    "el efecto esperado. No necesariamente coincide " +
    "con su vida media ni se calcula aqui."
  );

  titulo("Intervalo entre dosis");

  parrafo(
    "Indica cada cuantas horas se administra " +
    "el medicamento por indicacion medica. " +
    "No puede deducirse directamente de esta curva."
  );

  titulo("Duracion del tratamiento");

  parrafo(
    "Indica durante cuantos dias o semanas " +
    "debe utilizarse el medicamento segun " +
    "la prescripcion correspondiente."
  );

  titulo("Aviso academico");

  parrafo(
    "FarmacoSim no prescribe dosis, horarios " +
    "ni tratamientos. Observar " +
    r.perfil.tiempo +
    " horas no significa administrar el medicamento " +
    "cada " + r.perfil.tiempo +
    " horas ni que su efecto termine entonces."
  );

  // ========================================
  // PÁGINA 5: FICHA FARMACOLÓGICA
  // ========================================

  nuevaPagina("Ficha farmacologica ampliada");

  titulo("Medicamento: " + r.med.nombre);

  const apartados = [
    ["Mecanismo de accion",r.med.mecanismo],
    ["Usos terapeuticos",r.med.uso],
    ["Efectos secundarios comunes",r.med.comunes],
    ["Reacciones adversas graves",r.med.graves],
    ["Contraindicaciones",r.med.contra],
    ["Precauciones",r.med.precauciones],
    ["Interacciones",r.med.interacciones],
    ["Vigilancia medica",r.med.vigilancia]
  ];

  apartados.forEach(([nombre,descripcion]) => {
    titulo(nombre);
    parrafo(descripcion);
  });

  titulo("Limitaciones y referencia");

  parrafo(
    "Esta ficha es un resumen academico, no una " +
    "etiqueta regulatoria completa. Los factores " +
    "de simulacion no estan validados para uso " +
    "clinico. Consulta el etiquetado actualizado " +
    "de la formulacion especifica en DailyMed: " +
    "https://dailymed.nlm.nih.gov/dailymed/"
  );

  if (contenido) {
    paginas.push(contenido);
  }

  // ========================================
  // CONSTRUCCIÓN DEL PDF
  // ========================================

  const objetos = [null];

  const agregar = s => {
    objetos.push(s);
    return objetos.length-1;
  };

  const catalogo = agregar("");
  const pages = agregar("");

  const fuenteNormal = agregar(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
  );

  const fuenteNegrita = agregar(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"
  );

  const ids = [];

  paginas.forEach(p => {
    const streamText = p + "\n";

    const largo = new TextEncoder()
      .encode(streamText).length;

    const stream = agregar(
      `<< /Length ${largo} >>\n` +
      `stream\n${streamText}endstream`
    );

    const pagina = agregar(
      `<< /Type /Page /Parent ${pages} 0 R ` +
      `/MediaBox [0 0 ${W} ${H}] ` +
      `/Resources << /Font << ` +
      `/F1 ${fuenteNormal} 0 R ` +
      `/F2 ${fuenteNegrita} 0 R >> >> ` +
      `/Contents ${stream} 0 R >>`
    );

    ids.push(pagina);
  });

  objetos[catalogo] =
    `<< /Type /Catalog /Pages ${pages} 0 R >>`;

  objetos[pages] =
    `<< /Type /Pages /Kids [` +
    ids.map(i => i + " 0 R").join(" ") +
    `] /Count ${ids.length} >>`;

  const encoder = new TextEncoder();
  const bloques = [];
  const offsets = [0];

  let total = 0;

  function escribir(s) {
    const b = encoder.encode(s);
    bloques.push(b);
    total += b.length;
  }

  escribir("%PDF-1.4\n");

  for (let i=1; i<objetos.length; i++) {
    offsets[i] = total;

    escribir(
      `${i} 0 obj\n${objetos[i]}\nendobj\n`
    );
  }

  const xref = total;

  escribir(
    `xref\n0 ${objetos.length}\n` +
    `0000000000 65535 f \n`
  );

  for (let i=1; i<objetos.length; i++) {
    escribir(
      String(offsets[i]).padStart(10,"0") +
      " 00000 n \n"
    );
  }

  escribir(
    `trailer\n` +
    `<< /Size ${objetos.length} ` +
    `/Root ${catalogo} 0 R >>\n` +
    `startxref\n${xref}\n%%EOF`
  );

  const salida = new Uint8Array(total);
  let pos = 0;

  for (const b of bloques) {
    salida.set(b,pos);
    pos += b.length;
  }

  return salida;
}

// ==========================================
// 12. DESCARGAR EL PDF
// ==========================================

function descargarReportePDF() {
  actualizar();

  const r = estado.resultado;

  if (!r) {
    alert(
      "Corrige los parámetros antes de descargar."
    );
    return;
  }

  try {
    const bytes = crearReportePDF(r);

    const blob = new Blob(
      [bytes],
      {type:"application/pdf"}
    );

    const url = URL.createObjectURL(blob);

    const enlace =
      document.createElement("a");

    const nombre = r.med.nombre
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[^a-zA-Z0-9]/g,"_");

    enlace.href = url;

    enlace.download =
      `FarmacoSim_Reporte_${nombre}.pdf`;

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    },10000);

  } catch (error) {
    console.error(
      "Error al generar el PDF:",
      error
    );

    alert(
      "Error al generar el PDF: " +
      error.message
    );
  }
}

// ==========================================
// 13. EVENTOS DEL SISTEMA
// ==========================================

function iniciar() {
  iniciarCatalogo();

  // Campos que actualizan la simulación.
  [
    "medicamento",
    "cantidad",
    "tiempo",
    "peso",
    "renal",
    "hepatica"
  ].forEach(id => {
    $(id).addEventListener("input",actualizar);
    $(id).addEventListener("change",actualizar);
  });

  // Buscador.
  $("buscar").addEventListener(
    "input",
    mostrarCatalogo
  );

  // Filtros de categorías.
  $("filtros").addEventListener("click",e => {
    const boton =
      e.target.closest("[data-cat]");

    if (!boton) return;

    estado.categoria = boton.dataset.cat;

    crearFiltros();
    mostrarCatalogo();
  });

  // Botones de las tarjetas.
  $("catalogo").addEventListener("click",e => {
    const ficha =
      e.target.closest("[data-ficha]");

    const simular =
      e.target.closest("[data-elegir]");

    if (ficha) {
      abrirFicha(
        Number(ficha.dataset.ficha)
      );
    }

    if (simular) {
      seleccionarMedicamento(
        Number(simular.dataset.elegir)
      );
    }
  });

  // Botón de simulación dentro de ficha.
  $("ficha").addEventListener("click",e => {
    const boton =
      e.target.closest("[data-elegir]");

    if (boton) {
      seleccionarMedicamento(
        Number(boton.dataset.elegir)
      );
    }
  });

  // Cerrar ficha.
  $("cerrarModal").addEventListener(
    "click",
    () => $("modal").close()
  );

  $("modal").addEventListener("click",e => {
    if (e.target === $("modal")) {
      $("modal").close();
    }
  });

  // Cambiar complexión y peso sugerido.
  $("complexionOptions").addEventListener(
    "click",
    e => {
      const boton =
        e.target.closest("[data-complexion]");

      if (!boton) return;

      estado.complexion =
        boton.dataset.complexion;

      $("peso").value =
        PESOS_COMPLEXION[estado.complexion];

      seleccionarOpcion(
        "complexionOptions",
        "data-complexion",
        estado.complexion
      );

      actualizar();
    }
  );

  // Cambiar grupo de edad.
  $("edadOptions").addEventListener(
    "click",
    e => {
      const boton =
        e.target.closest("[data-edad]");

      if (!boton) return;

      estado.edad =
        boton.dataset.edad;

      seleccionarOpcion(
        "edadOptions",
        "data-edad",
        estado.edad
      );

      actualizar();
    }
  );

  // Restablecer parámetros.
  $("restablecer").addEventListener(
    "click",
    restablecer
  );

  // Exportar PDF.
  $("descargarPdf").addEventListener(
    "click",
    descargarReportePDF
  );

  $("descargarPdf2").addEventListener(
    "click",
    descargarReportePDF
  );

  // Menú móvil.
  $("menuBtn").addEventListener(
    "click",
    () => {
      $("sidebar").classList.toggle("open");
    }
  );

  document.querySelectorAll(
    ".sidebar nav a"
  ).forEach(a => {
    a.addEventListener("click",() => {
      $("sidebar").classList.remove("open");
    });
  });

  seleccionarOpcion(
    "complexionOptions",
    "data-complexion",
    "media"
  );

  seleccionarOpcion(
    "edadOptions",
    "data-edad",
    "adulto"
  );

  actualizar();
}

// ==========================================
// 14. INICIAR FARMACOSIM
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  iniciar
);