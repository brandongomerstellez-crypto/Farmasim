
"use strict";

/* ==============================================
   FARMACOSIM TESH - VERSIÓN COMPLETA
   32 medicamentos y fichas farmacológicas
   Gráficas y estadísticas reactivas
   PDF local sin bibliotecas externas

   USO EXCLUSIVAMENTE EDUCATIVO
============================================== */

const d = (
  nombre, categoria, vida, renal, distribucion,
  uso, mecanismo, comunes, graves, contra,
  precauciones, interacciones, vigilancia
) => ({
  nombre, categoria, vida, renal, distribucion,
  uso, mecanismo, comunes, graves, contra,
  precauciones, interacciones, vigilancia
});

// ==============================================
// 1. BASE FARMACOLÓGICA
// ==============================================

const MEDS = [

  d(
    "Paracetamol", "Analgésicos", 2.5, .15, "mixta",
    "Dolor leve o moderado y fiebre.",
    "Acción central relacionada con la regulación de la señalización del dolor y la temperatura.",
    "En general bien tolerado. Pueden presentarse náuseas y erupciones cutáneas.",
    "Lesión hepática grave por sobredosis, anafilaxia y reacciones cutáneas graves.",
    "Hipersensibilidad al medicamento; revisar las restricciones propias de la formulación.",
    "Precaución en enfermedad hepática, consumo excesivo de alcohol y uso de otros productos con paracetamol.",
    "Warfarina en uso repetido, alcohol y otros agentes potencialmente hepatotóxicos.",
    "Revisar la cantidad total consumida y valorar función hepática cuando corresponda."
  ),

  d(
    "Ibuprofeno", "Antiinflamatorios", 2, .12, "mixta",
    "Dolor, fiebre e inflamación.",
    "Inhibición de COX-1 y COX-2, disminuyendo la síntesis de prostaglandinas.",
    "Acidez, dolor abdominal, náuseas, mareos, diarrea y retención de líquidos.",
    "Hemorragia gastrointestinal, lesión renal, infarto, accidente cerebrovascular y anafilaxia.",
    "Hipersensibilidad a AINE y determinadas reacciones asmáticas previas; contraindicado alrededor de cirugía de revascularización coronaria.",
    "Precaución ante úlcera, enfermedad renal, cardiovascular, deshidratación y embarazo.",
    "Anticoagulantes, otros AINE, corticoides, litio, diuréticos y algunos antihipertensivos.",
    "Síntomas de sangrado, presión arterial y función renal según indicación."
  ),

  d(
    "Amoxicilina", "Antibióticos", 1.2, .75, "hidro",
    "Tratamiento de determinadas infecciones bacterianas.",
    "Antibiótico betalactámico que interfiere con la síntesis de pared celular bacteriana.",
    "Diarrea, náuseas, vómitos, candidiasis y erupciones.",
    "Anafilaxia, reacciones cutáneas graves y colitis asociada a C. difficile.",
    "Alergia grave a penicilinas o betalactámicos relacionados.",
    "Valorar antecedentes alérgicos y función renal. No trata infecciones virales.",
    "Metotrexato, warfarina, probenecid y alopurinol.",
    "Alergias, diarrea persistente y evolución de la infección."
  ),

  d(
    "Metformina", "Antidiabéticos", 6.2, .90, "hidro",
    "Tratamiento de diabetes mellitus tipo 2.",
    "Reduce la producción hepática de glucosa y mejora la sensibilidad a insulina.",
    "Diarrea, náuseas, flatulencia, molestias abdominales y pérdida de apetito.",
    "Acidosis láctica poco frecuente pero grave; déficit de vitamina B12 durante uso prolongado.",
    "Insuficiencia renal grave y acidosis metabólica.",
    "Precaución ante deshidratación, hipoxia, alcohol excesivo y ciertos procedimientos con contraste.",
    "Alcohol y medicamentos que afectan función renal o transportadores de metformina.",
    "Función renal, glucosa y vitamina B12 cuando se indique."
  ),

  d(
    "Losartán", "Antihipertensivos", 2, .35, "mixta",
    "Hipertensión arterial.",
    "Bloquea receptores AT1 de angiotensina II y reduce la vasoconstricción.",
    "Mareos, cansancio e hipotensión.",
    "Hiperpotasemia, deterioro renal, hipotensión grave y daño fetal.",
    "Embarazo e hipersensibilidad; ciertas combinaciones presentan contraindicaciones.",
    "Evaluar potasio, función renal, hidratación y posible estenosis de arterias renales.",
    "Potasio, litio, AINE y diuréticos ahorradores de potasio.",
    "Presión arterial, potasio y función renal."
  ),

  d(
    "Omeprazol", "Gastrointestinales", 1, .08, "lipo",
    "Reflujo y otros trastornos relacionados con ácido gástrico.",
    "Inhibe la bomba H+/K+-ATPasa gástrica.",
    "Cefalea, dolor abdominal, náuseas, diarrea, flatulencia y estreñimiento.",
    "Nefritis intersticial, reacciones cutáneas graves e hipomagnesemia.",
    "Hipersensibilidad y ciertas combinaciones contraindicadas por su etiquetado.",
    "Evaluar necesidad de tratamiento prolongado y síntomas gastrointestinales de alarma.",
    "Clopidogrel, digoxina, ciertos fármacos dependientes del pH y metotrexato en algunas circunstancias.",
    "Respuesta clínica, función renal y magnesio cuando corresponda."
  ),

  d(
    "Naproxeno", "Antiinflamatorios", 14, .15, "mixta",
    "Dolor e inflamación.",
    "Disminuye la síntesis de prostaglandinas.",
    "Acidez, náuseas, dolor abdominal, mareos, cefalea y edema.",
    "Sangrado gastrointestinal, insuficiencia renal y eventos trombóticos cardiovasculares.",
    "Hipersensibilidad a AINE y uso alrededor de revascularización coronaria.",
    "Precaución ante úlcera, enfermedad renal o cardiovascular, edad avanzada y embarazo.",
    "Anticoagulantes, corticoides, otros AINE, diuréticos y litio.",
    "Sangrado, presión arterial y función renal."
  ),

  d(
    "Atorvastatina", "Hipolipemiantes", 14, .02, "lipo",
    "Reducción de colesterol LDL.",
    "Inhibe la enzima HMG-CoA reductasa.",
    "Molestias digestivas, dolor muscular, artralgia y cefalea.",
    "Miopatía, rabdomiólisis y lesión hepática importante.",
    "Hipersensibilidad y enfermedad hepática activa; revisar recomendaciones vigentes sobre embarazo y lactancia.",
    "Precaución ante síntomas musculares o alteraciones hepáticas.",
    "Claritromicina, ciclosporina, ciertos antifúngicos y antivirales.",
    "Perfil lipídico y síntomas musculares o hepáticos."
  ),

  d(
    "Clonazepam", "Psicotrópicos", 30, .05, "lipo",
    "Determinados trastornos convulsivos y de pánico.",
    "Potencia la transmisión inhibitoria GABA-A.",
    "Somnolencia, fatiga, mareos, problemas de memoria y coordinación.",
    "Depresión respiratoria, dependencia, abstinencia grave y sobredosis.",
    "Hipersensibilidad a benzodiacepinas y determinadas enfermedades hepáticas o situaciones oftalmológicas.",
    "Evitar suspensión abrupta y combinación no supervisada con sedantes.",
    "Opioides, alcohol y otros depresores del sistema nervioso central.",
    "Respiración, sedación, coordinación y signos de dependencia."
  ),

  d(
    "Gentamicina", "Antibióticos", 2.5, .95, "hidro",
    "Infecciones bacterianas graves susceptibles.",
    "Aminoglucósido que actúa sobre la subunidad ribosomal 30S.",
    "Alteraciones de laboratorio y reacciones relacionadas con la vía de administración.",
    "Nefrotoxicidad, daño auditivo o vestibular y bloqueo neuromuscular.",
    "Hipersensibilidad al medicamento; otras restricciones según formulación.",
    "Precaución en insuficiencia renal, deshidratación y uso de agentes ototóxicos.",
    "Vancomicina, anfotericina B y determinados diuréticos.",
    "Función renal, niveles sanguíneos cuando proceda y audición."
  ),

  d(
    "Cetirizina", "Antihistamínicos", 8.3, .70, "hidro",
    "Síntomas de alergia.",
    "Antagonismo periférico de receptores H1 de histamina.",
    "Somnolencia, cansancio, cefalea y sequedad bucal.",
    "Reacciones alérgicas graves poco frecuentes.",
    "Hipersensibilidad a cetirizina o compuestos relacionados.",
    "Precaución en deterioro renal y actividades que requieren atención.",
    "Alcohol y otros depresores del sistema nervioso central.",
    "Somnolencia y tolerancia."
  ),

  d(
    "Loratadina", "Antihistamínicos", 8.4, .20, "lipo",
    "Alergias y urticaria.",
    "Antagonismo de receptores H1.",
    "Cefalea, cansancio, boca seca y somnolencia ocasional.",
    "Hipersensibilidad y palpitaciones poco frecuentes.",
    "Hipersensibilidad al medicamento.",
    "Precaución ante enfermedad hepática importante.",
    "Algunos inhibidores del metabolismo hepático.",
    "Respuesta a los síntomas y aparición de sedación."
  ),

  d(
    "Diclofenaco", "Antiinflamatorios", 1.5, .12, "mixta",
    "Dolor y procesos inflamatorios.",
    "Inhibición de ciclooxigenasas y síntesis de prostaglandinas.",
    "Dispepsia, náuseas, dolor abdominal y edema.",
    "Sangrado gastrointestinal, daño renal, eventos cardiovasculares y toxicidad hepática.",
    "Alergia a AINE y uso alrededor de cirugía de revascularización coronaria.",
    "Precaución ante enfermedades renal, hepática, digestiva y cardiovascular.",
    "Anticoagulantes, otros AINE, corticoides, litio y diuréticos.",
    "Sangrado, presión arterial y función hepática o renal."
  ),

  d(
    "Ciprofloxacino", "Antibióticos", 4, .60, "mixta",
    "Determinadas infecciones bacterianas.",
    "Inhibición de ADN girasa y topoisomerasa IV.",
    "Náuseas, diarrea, cefalea y dolor abdominal.",
    "Rotura de tendón, neuropatía, efectos neurológicos y alteraciones glucémicas.",
    "Hipersensibilidad a quinolonas y uso concomitante con tizanidina.",
    "Precaución en miastenia gravis, edad avanzada y antecedentes de lesiones tendinosas.",
    "Tizanidina, teofilina, warfarina, antiácidos minerales y algunos antiarrítmicos.",
    "Tendones, sistema nervioso, glucosa y función renal."
  ),

  d(
    "Aciclovir", "Antivirales", 3, .85, "hidro",
    "Determinadas infecciones por herpesvirus.",
    "Inhibe la síntesis de ADN viral tras su activación intracelular.",
    "Náuseas, cefalea, diarrea y malestar abdominal.",
    "Lesión renal aguda y efectos neurológicos graves.",
    "Hipersensibilidad a aciclovir o valaciclovir según formulación.",
    "Precaución en deterioro renal y deshidratación.",
    "Otros fármacos nefrotóxicos.",
    "Función renal y cambios neurológicos."
  ),

  d(
    "Oseltamivir", "Antivirales", 8, .90, "hidro",
    "Influenza en situaciones indicadas.",
    "Su metabolito activo inhibe la neuraminidasa viral.",
    "Náuseas, vómitos, cefalea y molestias abdominales.",
    "Anafilaxia, reacciones cutáneas graves y eventos neuropsiquiátricos notificados.",
    "Hipersensibilidad grave al medicamento.",
    "Precaución según función renal, indicación y edad.",
    "Revisar vacunas vivas contra influenza y otras combinaciones específicas.",
    "Evolución clínica, tolerancia y cambios conductuales."
  ),

  d(
    "Fluoxetina", "Antidepresivos", 96, .05, "lipo",
    "Depresión y otros trastornos bajo prescripción.",
    "Inhibidor selectivo de recaptación de serotonina.",
    "Náuseas, insomnio, ansiedad, sudoración y cambios sexuales.",
    "Síndrome serotoninérgico, hiponatremia, sangrado y cambios graves de conducta.",
    "Combinaciones incompatibles con IMAO y ciertos medicamentos.",
    "Precaución ante trastorno bipolar, convulsiones y riesgo suicida.",
    "IMAO, tramadol, linezolid, anticoagulantes y ciertos fármacos CYP2D6.",
    "Estado de ánimo, conducta, síntomas serotoninérgicos y sangrado."
  ),

  d(
    "Ketorolaco", "Antiinflamatorios", 5.3, .70, "mixta",
    "Dolor moderado a intenso por tiempo limitado.",
    "AINE inhibidor de síntesis de prostaglandinas.",
    "Náuseas, mareos, somnolencia e indigestión.",
    "Hemorragia gastrointestinal, daño renal y sangrado perioperatorio.",
    "Úlcera o hemorragia activa, enfermedad renal avanzada y ciertas situaciones hemorrágicas.",
    "Tratamiento restringido a periodos breves; evitar combinar con otros AINE.",
    "Anticoagulantes, antiagregantes, corticoides y otros AINE.",
    "Duración del tratamiento, sangrado y función renal."
  ),

  d(
    "Meloxicam", "Antiinflamatorios", 18, .15, "mixta",
    "Dolor e inflamación articular.",
    "Inhibición de síntesis de prostaglandinas.",
    "Dolor abdominal, dispepsia, náuseas, mareos y edema.",
    "Hemorragia gastrointestinal, daño renal y eventos cardiovasculares.",
    "Alergia a AINE y uso alrededor de revascularización coronaria.",
    "Precaución ante úlcera, enfermedad renal o cardiovascular y embarazo.",
    "Anticoagulantes, corticoides, otros AINE y diuréticos.",
    "Sangrado, presión arterial, edema y función renal."
  ),

  d(
    "Celecoxib", "Antiinflamatorios", 11, .10, "lipo",
    "Dolor e inflamación en determinadas enfermedades.",
    "Inhibición predominante de COX-2.",
    "Dispepsia, cefalea, edema y dolor abdominal.",
    "Eventos cardiovasculares, sangrado digestivo, daño renal y reacciones cutáneas graves.",
    "Hipersensibilidad a celecoxib, ciertas alergias a sulfonamidas y contraindicaciones para AINE.",
    "Precaución en enfermedad cardiovascular, renal, digestiva y embarazo.",
    "Warfarina, fluconazol, litio y determinados antihipertensivos.",
    "Presión arterial, síntomas digestivos y función renal."
  ),

  d(
    "Cefalexina", "Antibióticos", 1, .90, "hidro",
    "Infecciones bacterianas susceptibles.",
    "Cefalosporina que inhibe la síntesis de pared bacteriana.",
    "Diarrea, náuseas, vómitos y erupciones.",
    "Anafilaxia, colitis por C. difficile y reacciones cutáneas graves.",
    "Hipersensibilidad a cefalexina o cefalosporinas relacionadas.",
    "Revisar antecedentes alérgicos y función renal.",
    "Probenecid y algunas combinaciones con metformina.",
    "Diarrea persistente, alergia y evolución de la infección."
  ),

  d(
    "Azitromicina", "Antibióticos", 68, .08, "lipo",
    "Determinadas infecciones bacterianas.",
    "Macrólido que actúa sobre la subunidad ribosomal 50S.",
    "Diarrea, náuseas, dolor abdominal y vómitos.",
    "Prolongación QT, arritmias, lesión hepática y alergias graves.",
    "Hipersensibilidad a macrólidos y antecedentes de lesión hepática asociada.",
    "Precaución ante riesgo de arritmia, enfermedad hepática y miastenia.",
    "Medicamentos que prolongan QT y algunas combinaciones con anticoagulantes.",
    "Síntomas cardíacos, función hepática y respuesta antibacteriana."
  ),

  d(
    "Doxiciclina", "Antibióticos", 18, .25, "mixta",
    "Determinadas infecciones bacterianas.",
    "Tetraciclina inhibidora de síntesis proteica en subunidad 30S.",
    "Náuseas, fotosensibilidad, diarrea e irritación esofágica.",
    "Hipertensión intracraneal, reacciones cutáneas graves y lesión hepática.",
    "Hipersensibilidad a tetraciclinas; restricciones según embarazo, edad e indicación.",
    "Precaución ante exposición solar e irritación del esófago.",
    "Hierro, calcio, antiácidos, retinoides y ciertos anticonvulsivos.",
    "Fotosensibilidad, molestias esofágicas y reacciones graves."
  ),

  d(
    "Levofloxacino", "Antibióticos", 7, .85, "hidro",
    "Determinadas infecciones bacterianas.",
    "Fluoroquinolona inhibidora de ADN girasa y topoisomerasa IV.",
    "Náuseas, diarrea, cefalea, mareos e insomnio.",
    "Lesión tendinosa, neuropatía, efectos neurológicos, arritmias y alteraciones de glucosa.",
    "Hipersensibilidad a quinolonas.",
    "Precaución ante miastenia, edad avanzada, alteración renal y uso de corticoides.",
    "Antiácidos, hierro, zinc, warfarina y medicamentos que prolongan QT.",
    "Tendones, sistema nervioso, glucosa y función renal."
  ),

  d(
    "Fluconazol", "Antifúngicos", 30, .80, "hidro",
    "Determinadas infecciones fúngicas.",
    "Triazol inhibidor de síntesis de ergosterol.",
    "Náuseas, dolor abdominal, diarrea, cefalea y erupciones.",
    "Lesión hepática, reacciones cutáneas graves y prolongación QT.",
    "Hipersensibilidad y ciertas combinaciones que prolongan QT.",
    "Precaución en enfermedad hepática, renal y embarazo.",
    "Warfarina, fenitoína, algunas estatinas y medicamentos que prolongan QT.",
    "Función hepática, interacciones y respuesta antifúngica."
  ),

  d(
    "Famotidina", "Gastrointestinales", 3, .70, "hidro",
    "Trastornos relacionados con exceso de ácido gástrico.",
    "Antagonista de receptores H2 que reduce la secreción ácida.",
    "Cefalea, mareos, estreñimiento y diarrea.",
    "Reacciones alérgicas y confusión en personas susceptibles.",
    "Hipersensibilidad a famotidina o compuestos relacionados.",
    "Precaución por deterioro renal y síntomas digestivos de alarma.",
    "Medicamentos cuya absorción depende del pH gástrico.",
    "Función renal, respuesta y estado mental."
  ),

  d(
    "Amlodipino", "Antihipertensivos", 35, .10, "lipo",
    "Hipertensión y determinadas formas de angina.",
    "Bloqueador de canales de calcio que favorece la relajación vascular.",
    "Edema de tobillos, rubor, cefalea, mareos y cansancio.",
    "Hipotensión importante y empeoramiento transitorio de angina.",
    "Hipersensibilidad y ciertas situaciones cardiovasculares específicas.",
    "Precaución en enfermedad hepática e hipotensión.",
    "Simvastatina, inhibidores de CYP3A4 y otros antihipertensivos.",
    "Presión arterial, edema y síntomas cardiovasculares."
  ),

  d(
    "Sertralina", "Antidepresivos", 26, .05, "lipo",
    "Depresión y determinados trastornos de ansiedad.",
    "Inhibidor selectivo de recaptación de serotonina.",
    "Náuseas, diarrea, insomnio, temblor, sudoración y cambios sexuales.",
    "Síndrome serotoninérgico, hiponatremia, sangrado y cambios graves de conducta.",
    "Determinadas combinaciones con IMAO o pimozida.",
    "Precaución ante trastorno bipolar, convulsiones y riesgo suicida.",
    "IMAO, tramadol, linezolid, anticoagulantes y otros serotoninérgicos.",
    "Estado de ánimo, sodio y síntomas serotoninérgicos."
  ),

  d(
    "Escitalopram", "Antidepresivos", 30, .10, "lipo",
    "Depresión y ansiedad generalizada.",
    "Inhibición selectiva de recaptación de serotonina.",
    "Náuseas, insomnio, somnolencia, sudoración y efectos sexuales.",
    "Síndrome serotoninérgico, hiponatremia, sangrado y alteraciones cardíacas.",
    "Combinaciones incompatibles con determinados IMAO.",
    "Precaución en trastorno bipolar, alteración hepática y riesgo de prolongación QT.",
    "IMAO, tramadol, anticoagulantes y fármacos que prolongan QT.",
    "Estado de ánimo, sodio, respuesta y riesgos cardíacos."
  ),

  d(
    "Fexofenadina", "Antihistamínicos", 14, .15, "hidro",
    "Alergias y urticaria.",
    "Antagonismo periférico de receptores H1.",
    "Cefalea, mareos, náuseas y cansancio.",
    "Reacciones alérgicas graves poco frecuentes.",
    "Hipersensibilidad al medicamento.",
    "Precaución ante enfermedad renal y respuesta individual.",
    "Jugos de algunas frutas y antiácidos minerales pueden reducir absorción.",
    "Control de síntomas alérgicos y tolerancia."
  ),

  d(
    "Difenhidramina", "Antihistamínicos", 8, .10, "lipo",
    "Alivio de determinados síntomas alérgicos.",
    "Antagonista H1 de primera generación con acción anticolinérgica.",
    "Somnolencia, sequedad bucal, visión borrosa, estreñimiento y mareos.",
    "Confusión, retención urinaria, arritmias, convulsiones y toxicidad por sobredosis.",
    "Restricciones variables según formulación y antecedentes clínicos.",
    "Especial precaución en adultos mayores, glaucoma y retención urinaria.",
    "Alcohol, opioides, sedantes y otros anticolinérgicos.",
    "Estado mental, sedación y efectos anticolinérgicos."
  ),

  d(
    "Metoprolol", "Antihipertensivos", 4, .05, "lipo",
    "Hipertensión y determinadas enfermedades cardiovasculares.",
    "Betabloqueador relativamente selectivo de receptores beta-1.",
    "Fatiga, mareos, bradicardia y molestias digestivas.",
    "Bradicardia grave, bloqueo cardíaco, hipotensión y descompensación cardíaca.",
    "Bradicardia grave, ciertos bloqueos cardíacos y shock cardiogénico.",
    "Precaución en asma, diabetes y enfermedad vascular; evitar suspensión abrupta.",
    "Verapamilo, diltiazem, digoxina, clonidina y otros fármacos cardíacos.",
    "Frecuencia cardíaca, presión arterial y síntomas cardiovasculares."
  )
];

// ==============================================
// 2. CATEGORÍAS E INTERFAZ
// ==============================================

const ICONOS = {
  "Todos":"▦",
  "Analgésicos":"💊",
  "Antiinflamatorios":"🩹",
  "Antibióticos":"🧫",
  "Antidiabéticos":"🩸",
  "Antihipertensivos":"❤️",
  "Gastrointestinales":"🧬",
  "Hipolipemiantes":"🫀",
  "Psicotrópicos":"🧠",
  "Antihistamínicos":"🌿",
  "Antivirales":"🦠",
  "Antidepresivos":"🧠",
  "Antifúngicos":"🍄"
};

const PALETAS = [
  "#e4f5ff","#e7faf2","#fff2dd","#eef0ff",
  "#e3f9ee","#ffeef5","#e5f3ff","#f1eaff"
];

const $ = id => document.getElementById(id);

const estado = {
  categoria:"Todos",
  complexion:"media",
  edad:"adulto",
  resultado:null
};

function fmt(n, dec=2) {
  if(n !== 0 && Math.abs(n) < .0001) {
    return Number(n).toExponential(2);
  }
  return Number(n).toLocaleString("es-MX",{
    maximumFractionDigits:dec
  });
}

function iniciarCatalogo() {
  $("medicamento").innerHTML = MEDS.map((m,i) =>
    `<option value="${i}">${m.nombre}</option>`
  ).join("");

  $("totalMeds").textContent = MEDS.length;
  $("totalCats").textContent =
    new Set(MEDS.map(m => m.categoria)).size;

  crearFiltros();
  mostrarCatalogo();
}

function crearFiltros() {
  const cats = [
    "Todos",
    ...new Set(MEDS.map(m => m.categoria))
  ];

  $("filtros").innerHTML = cats.map(cat => `
    <button type="button"
      class="filter ${estado.categoria===cat?"active":""}"
      aria-pressed="${estado.categoria===cat}"
      data-cat="${cat}">
      ${ICONOS[cat]} ${cat}
    </button>
  `).join("");
}

function mostrarCatalogo() {
  const busca = $("buscar").value.trim()
    .toLocaleLowerCase("es");

  const lista = MEDS.map((m,i)=>({m,i}))
    .filter(({m})=>{
      const cat =
        estado.categoria==="Todos" ||
        estado.categoria===m.categoria;

      const texto = [
        m.nombre,m.categoria,m.uso,m.comunes,
        m.graves,m.mecanismo
      ].join(" ").toLocaleLowerCase("es");

      return cat && texto.includes(busca);
    });

  $("contador").textContent =
    `${lista.length} medicamento(s)`;

  $("sinResultados").hidden = lista.length > 0;

  $("catalogo").innerHTML = lista.map(({m,i}) => `
    <article class="drug-card">
      <div class="drug-visual"
        style="--drug-color:${PALETAS[i%PALETAS.length]}">

        <span class="drug-category">
          ${ICONOS[m.categoria]} ${m.categoria}
        </span>

        <span class="med-symbol" aria-hidden="true">
          ${
            m.categoria==="Antibióticos"?"🧪":
            m.categoria==="Antivirales"?"🧬":
            m.categoria==="Antifúngicos"?"🍄":"💊"
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
          <button type="button" class="btn secondary"
            data-ficha="${i}">Ver ficha</button>

          <button type="button" class="btn primary"
            data-elegir="${i}">Simular →</button>
        </div>
      </div>
    </article>
  `).join("");
}

// ==============================================
// 3. FICHAS FARMACOLÓGICAS AMPLIADAS
// ==============================================

function abrirFicha(i) {
  const m=MEDS[i];
  if(!m) return;

  const tipos = {
    hidro:"Hidrofílica ilustrativa",
    lipo:"Lipofílica ilustrativa",
    mixta:"Mixta ilustrativa"
  };

  const fuente =
    "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=" +
    encodeURIComponent(m.nombre);

  const seccion = (titulo,contenido,clase="") => `
    <section class="ficha-section ${clase}">
      <h3>${titulo}</h3>
      <p>${contenido}</p>
    </section>
  `;

  $("ficha").innerHTML=`
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
          <strong>${tipos[m.distribucion]}</strong>
        </div>
        <div>
          <small>Ponderación renal didáctica</small>
          <strong>${Math.round(m.renal*100)}%</strong>
        </div>
      </div>
    </div>

    <div class="ficha-content">
      ${seccion("🧬 Mecanismo de acción",m.mecanismo)}
      ${seccion("🩺 Usos principales",m.uso)}
      ${seccion("💊 Efectos secundarios habituales",m.comunes)}
      ${seccion("⚠️ Reacciones adversas graves",m.graves,"danger")}
      ${seccion("🚫 Contraindicaciones importantes",m.contra,"warning")}
      ${seccion("🛡️ Precauciones",m.precauciones)}
      ${seccion("🔄 Interacciones relevantes",m.interacciones)}
      ${seccion("📋 Vigilancia médica",m.vigilancia)}
      ${seccion(
        "📈 Farmacocinética educativa",
        `Vida media de referencia: ${m.vida} horas.
        El modelo es exponencial y de primer orden.
        No representa completamente absorción, metabolitos,
        formulaciones ni variabilidad real entre personas.`
      )}

      <div class="ficha-notice">
        Esta ficha es un resumen académico, no una
        monografía regulatoria exhaustiva.
        Consulta el etiquetado vigente para revisar
        todas las reacciones notificadas y advertencias.
      </div>

      <div class="ficha-actions">
        <a class="btn secondary" href="${fuente}"
          target="_blank" rel="noopener noreferrer">
          📚 Etiquetado en DailyMed
        </a>

        <button type="button" class="btn primary"
          data-elegir="${i}">
          📈 Simular medicamento
        </button>
      </div>
    </div>
  `;

  if(!$("modal").open) $("modal").showModal();
  $("modal").scrollTop=0;
}

function seleccionarMedicamento(i) {
  $("medicamento").value=String(i);

  if($("modal").open) $("modal").close();

  actualizar();
  $("simulador").scrollIntoView({behavior:"smooth"});
}

// ==============================================
// 4. MODELO MATEMÁTICO REACTIVO
// ==============================================

function leerPerfil() {
  return {
    med:Number($("medicamento").value),
    cantidad:Number($("cantidad").value),
    tiempo:Number($("tiempo").value),
    peso:Number($("peso").value),
    complexion:estado.complexion,
    edad:estado.edad,
    renal:$("renal").value,
    hepatica:$("hepatica").value
  };
}

function valido(p) {
  return (
    $("peso").value.trim()!=="" &&
    Number.isFinite(p.peso) &&
    p.peso>=20 && p.peso<=300 &&
    p.cantidad>=20 && p.cantidad<=200 &&
    p.tiempo>=1 && p.tiempo<=240 &&
    MEDS[p.med]!==undefined
  );
}

function calcularModelo(p) {
  const med=MEDS[p.med];

  // Factores HIPOTÉTICOS de aprendizaje.
  const cuerpo={
    delgada:.88,
    media:1,
    robusta:1.18
  }[p.complexion];

  const edad={
    joven:1.08,
    adulto:1,
    mayor:.78
  }[p.edad];

  const renal={
    normal:1,
    moderada:.72,
    alta:.42
  }[p.renal];

  const hepatica={
    normal:1,
    moderada:.75,
    alta:.45
  }[p.hepatica];

  const distribucion=p.peso/70*cuerpo;
  const inicial=p.cantidad/distribucion;

  const ajusteOrganos =
    med.renal*renal+(1-med.renal)*hepatica;

  const kBase=Math.log(2)/med.vida;
  const k=kBase*edad*ajusteOrganos;
  const kLento=kBase*.65;

  const C=(c0,constante,t)=>
    c0*Math.exp(-constante*t);

  const filas=[];

  for(let i=0;i<=10;i++){
    const t=p.tiempo*i/10;

    filas.push({
      t,
      elegido:C(inicial,k,t),
      referencia:C(p.cantidad,kBase,t),
      lento:C(p.cantidad,kLento,t),
      restante:100*Math.exp(-k*t)
    });
  }

  return {
    med,perfil:p,
    inicial,distribucion,
    k,kBase,kLento,
    vidaMedia:Math.log(2)/k,
    final:C(inicial,k,p.tiempo),
    restante:100*Math.exp(-k*p.tiempo),
    filas
  };
}

// ==============================================
// 5. GRÁFICA SVG INTERACTIVA
// ==============================================

function dibujarGrafica(r) {
  const svg=$("grafica");

  const W=760,H=340,L=76,R=22,T=24,B=53;
  const ancho=W-L-R;
  const alto=H-T-B;
  const maxT=r.perfil.tiempo;
  const maxY=Math.max(
    r.inicial,r.perfil.cantidad
  )*1.12;

  const X=t=>L+t/maxT*ancho;
  const Y=v=>T+alto-v/maxY*alto;

  let s="";

  for(let i=0;i<=5;i++){
    const v=maxY*i/5;
    const y=Y(v);

    s+=`
      <line x1="${L}" y1="${y}"
        x2="${W-R}" y2="${y}"
        stroke="#e4edf3"/>
      <text x="${L-10}" y="${y+4}"
        text-anchor="end" font-size="11"
        fill="#8094a4">${fmt(v,1)}</text>
    `;
  }

  for(let i=0;i<=6;i++){
    const t=maxT*i/6;
    const x=X(t);

    s+=`
      <line x1="${x}" y1="${T}"
        x2="${x}" y2="${T+alto}"
        stroke="#edf2f7"/>
      <text x="${x}" y="${H-23}"
        text-anchor="middle" font-size="11"
        fill="#8094a4">${fmt(t,1)}</text>
    `;
  }

  const series=[
    {
      inicio:r.perfil.cantidad,
      k:r.kBase,color:"#467bda"
    },
    {
      inicio:r.perfil.cantidad,
      k:r.kLento,color:"#e79a50"
    },
    {
      inicio:r.inicial,
      k:r.k,color:"#0bbba9"
    }
  ];

  series.forEach((curva,idx)=>{
    let path="";

    for(let i=0;i<=160;i++){
      const t=maxT*i/160;
      const v=curva.inicio*Math.exp(-curva.k*t);

      path+=
        `${i?"L":"M"} `+
        `${X(t).toFixed(2)} `+
        `${Y(v).toFixed(2)} `;
    }

    s+=`
      <path d="${path}" fill="none"
        stroke="${curva.color}"
        stroke-width="${idx===2?4:2.7}"
        stroke-linecap="round"
        stroke-linejoin="round"
        ${idx===1?'stroke-dasharray="8 5"':""}/>
    `;
  });

  s+=`
    <text x="${W/2}" y="${H-3}"
      text-anchor="middle" font-size="13"
      fill="#627a8e">Tiempo (horas)</text>
    <text transform="translate(18 ${H/2}) rotate(-90)"
      text-anchor="middle" font-size="13"
      fill="#627a8e">
      Concentración relativa (u.a.)
    </text>
  `;

  svg.innerHTML=s;
}

// ==============================================
// 6. ESTADÍSTICAS EN TIEMPO REAL
// ==============================================

function actualizar() {
  const p=leerPerfil();

  $("cantidadValor").textContent=
    p.cantidad+" unidades";

  $("tiempoValor").textContent=
    p.tiempo+" horas";

  if(!valido(p)){
    $("error").textContent=
      "Introduce un peso válido entre 20 y 300 kg.";

    estado.resultado=null;
    $("grafica").innerHTML="";
    $("resultados").innerHTML="";
    $("tablaEstadisticas").innerHTML="";
    $("interpretacion").innerHTML="";
    return;
  }

  $("error").textContent="";

  const r=calcularModelo(p);
  estado.resultado=r;

  $("resumenGrafica").textContent=
    `${r.med.nombre} · ${p.tiempo} horas de observación`;

  dibujarGrafica(r);

  const indicadores=[
    ["Concentración inicial",fmt(r.inicial)+" u.a."],
    ["Concentración final",fmt(r.final)+" u.a."],
    ["Vida media hipotética",fmt(r.vidaMedia)+" h"],
    ["Constante k",fmt(r.k,4)+" h⁻¹"],
    ["Porcentaje restante",fmt(r.restante)+"%"],
    ["Distribución aparente",fmt(r.distribucion,3)+"×"]
  ];

  $("resultados").innerHTML=indicadores.map(a=>`
    <div class="result-card">
      <small>${a[0]}</small>
      <strong>${a[1]}</strong>
    </div>
  `).join("");

  const edades={
    joven:"18 a 25 años",
    adulto:"26 a 59 años",
    mayor:"60 años o más"
  };

  $("interpretacion").innerHTML=`
    <b>Interpretación educativa</b>
    <p>
      Medicamento: ${r.med.nombre}<br>
      Peso: ${p.peso} kg · Complexión: ${p.complexion}<br>
      Edad: ${edades[p.edad]}<br>
      Función renal: ${p.renal}<br>
      Función hepática: ${p.hepatica}
    </p>
    <p>
      El peso y la complexión modifican la
      distribución aparente; la edad y las funciones
      orgánicas ajustan la velocidad de eliminación.
      Son factores didácticos, no cálculos médicos.
    </p>
  `;

  $("tablaEstadisticas").innerHTML=
    r.filas.map(f=>`
      <tr>
        <td>${fmt(f.t,1)}</td>
        <td>${fmt(f.elegido,3)}</td>
        <td>${fmt(f.referencia,3)}</td>
        <td>${fmt(f.lento,3)}</td>
        <td>${fmt(f.restante,2)}%</td>
      </tr>
    `).join("");
}

// ==============================================
// 7. PDF SIN INTERNET NI LIBRERÍAS
// ==============================================

// El PDF se crea en memoria directamente
// a partir del resultado actual.
// Incluye portada, gráfica, estadísticas
// y ficha farmacológica ampliada.

function crearReportePDF(r) {
  const W=595.28;
  const H=841.89;
  const M=44;

  const AZUL=[.06,.14,.23];
  const VERDE=[.05,.70,.62];
  const CELESTE=[.27,.48,.85];
  const NARANJA=[.91,.60,.31];
  const GRIS=[.35,.45,.54];

  const paginas=[];
  let comandos="";
  let y=690;
  let numero=0;

  const n=v=>Number(v).toFixed(2);

  function rgb(c){
    return c.map(n).join(" ");
  }

  // PDF Helvetica estándar. Se usa ASCII
  // para mantener la compatibilidad sin
  // descargar fuentes ni dependencias.
  function ascii(s){
    return String(s)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[\u2013\u2014]/g,"-")
      .replace(/[\u2018\u2019]/g,"'")
      .replace(/[^\x20-\x7e]/g," ")
      .replace(/\\/g,"\\\\")
      .replace(/\(/g,"\\(")
      .replace(/\)/g,"\\)");
  }

  function rect(x,b,w,h,c){
    comandos+=
      `${rgb(c)} rg ${n(x)} ${n(b)} `+
      `${n(w)} ${n(h)} re f\n`;
  }

  function line(x1,b1,x2,b2,c=[.8,.85,.89],g=1){
    comandos+=
      `${rgb(c)} RG ${n(g)} w `+
      `${n(x1)} ${n(b1)} m `+
      `${n(x2)} ${n(b2)} l S\n`;
  }

  function tx(s,x,b,size=10,bold=false,c=AZUL){
    comandos+=
      `BT /F${bold?2:1} ${n(size)} Tf `+
      `${rgb(c)} rg 1 0 0 1 ${n(x)} ${n(b)} Tm `+
      `(${ascii(s)}) Tj ET\n`;
  }

  function cerrarPagina(){
    if(comandos) paginas.push(comandos);
  }

  function nuevaPagina(titulo){
    cerrarPagina();
    numero++;
    comandos="";

    rect(0,H-112,W,112,AZUL);
    rect(0,H-116,W,4,VERDE);

    tx("FARMACOSIM TESH",M,H-50,22,true,[1,1,1]);
    tx(titulo,M,H-73,11,false,[.68,.91,.88]);

    tx(
      "Fecha: "+new Date().toLocaleString("es-MX"),
      M,H-94,9,false,[.79,.85,.90]
    );

    line(M,44,W-M,44);
    tx("Proyecto educativo | No clinico",M,28,8,false,GRIS);
    tx("Pagina "+numero,W-104,28,8,false,GRIS);

    y=690;
  }

  // Ajusta líneas de texto a la página.
  function dividir(texto,ancho,size=10){
    const palabras=String(texto).split(/\s+/);
    const max=Math.max(12,Math.floor(ancho/(size*.52)));
    const lineas=[];
    let actual="";

    palabras.forEach(p=>{
      if((actual+" "+p).trim().length>max && actual){
        lineas.push(actual);
        actual=p;
      }else{
        actual+=(actual?" ":"")+p;
      }
    });

    if(actual) lineas.push(actual);
    return lineas;
  }

  function asegurar(altura){
    if(y-altura<73){
      nuevaPagina("Continuacion del reporte");
    }
  }

  function titulo(s){
    asegurar(30);
    tx(s.toUpperCase(),M,y,12,true,VERDE);
    y-=24;
  }

  function parrafo(s){
    const lineas=dividir(s,W-M*2,10);
    asegurar(lineas.length*15+12);

    lineas.forEach(t=>{
      tx(t,M,y,10,false,GRIS);
      y-=15;
    });

    y-=12;
  }

  function dato(label,valor){
    asegurar(22);

    tx(label,M,y,10,true,AZUL);
    tx(String(valor),M+245,y,10,false,GRIS);
    y-=22;
  }

  // PÁGINA 1: PERFIL
  nuevaPagina("Reporte estadistico de simulacion");

  titulo("Medicamento seleccionado");
  dato("Medicamento",r.med.nombre);
  dato("Categoria",r.med.categoria);
  dato("Vida media de referencia",r.med.vida+" h");
  dato("Tiempo observado",r.perfil.tiempo+" h");

  y-=8;
  titulo("Perfil ilustrativo");

  dato("Peso",r.perfil.peso+" kg");
  dato("Complexion",r.perfil.complexion);
  dato("Edad",r.perfil.edad);
  dato("Funcion renal",r.perfil.renal);
  dato("Funcion hepatica",r.perfil.hepatica);
  dato("Cantidad inicial",r.perfil.cantidad+" unidades");

  y-=8;
  titulo("Indicadores calculados");

  const indicadores=[
    ["Concentracion inicial",fmt(r.inicial,3)+" u.a."],
    ["Concentracion final",fmt(r.final,3)+" u.a."],
    ["Vida media hipotetica",fmt(r.vidaMedia,3)+" h"],
    ["Constante de eliminacion",fmt(r.k,5)+" h-1"],
    ["Porcentaje restante",fmt(r.restante,3)+" %"],
    ["Factor de distribucion",fmt(r.distribucion,3)+" x"]
  ];

  indicadores.forEach(a=>dato(a[0],a[1]));

  // PÁGINA 2: GRÁFICA
  nuevaPagina("Curvas de eliminacion");

  titulo("Grafica comparativa");

  // Ejes en coordenadas PDF.
  const gx=78,gy=355,gw=440,gh=270;
  const maxT=r.perfil.tiempo;
  const maxY=Math.max(
    r.inicial,r.perfil.cantidad
  )*1.12;

  const X=t=>gx+t/maxT*gw;
  const Y=v=>gy+v/maxY*gh;

  for(let i=0;i<=5;i++){
    const yy=gy+gh*i/5;
    line(gx,yy,gx+gw,yy,[.88,.92,.95],.65);
    tx(fmt(maxY*i/5,1),45,yy-3,8,false,GRIS);
  }

  for(let i=0;i<=5;i++){
    const t=maxT*i/5;
    const xx=X(t);
    line(xx,gy,xx,gy+gh,[.88,.92,.95],.65);
    tx(fmt(t,1),xx-5,gy-19,8,false,GRIS);
  }

  const curvas=[
    [r.perfil.cantidad,r.kBase,CELESTE],
    [r.perfil.cantidad,r.kLento,NARANJA],
    [r.inicial,r.k,VERDE]
  ];

  curvas.forEach(([inicio,k,color])=>{
    let anterior=null;

    for(let i=0;i<=150;i++){
      const t=maxT*i/150;
      const v=inicio*Math.exp(-k*t);
      const punto=[X(t),Y(v)];

      if(anterior){
        line(
          anterior[0],anterior[1],
          punto[0],punto[1],
          color,2.3
        );
      }

      anterior=punto;
    }
  });

  tx("Tiempo (horas)",280,gy-44,10,false,GRIS);
  tx("Concentracion relativa (u.a.)",gx,gy+gh+17,10,false,GRIS);

  line(94,307,115,307,VERDE,3);
  tx("Perfil elegido",123,303,10);

  line(242,307,263,307,CELESTE,3);
  tx("Referencia",271,303,10);

  line(377,307,398,307,NARANJA,3);
  tx("Lenta",406,303,10);

  y=260;
  titulo("Interpretacion");
  parrafo(
    "Las curvas representan una eliminacion exponencial " +
    "de primer orden. El perfil elegido modifica " +
    "matematicamente la concentracion inicial y la " +
    "velocidad de eliminacion."
  );

  parrafo(
    "Los factores de cuerpo, edad y funcion organica " +
    "son exclusivamente educativos y no predicen " +
    "concentraciones reales."
  );

  // PÁGINA 3: TABLA ESTADÍSTICA
  nuevaPagina("Tabla de mediciones");

  titulo("Estadisticas por intervalo");

  const cx=[M+8,M+103,M+204,M+304,M+408];
  const encabezados=[
    "Horas","Elegido","Referencia","Lenta","Restante %"
  ];

  rect(M,y-22,W-2*M,31,AZUL);

  encabezados.forEach((h,i)=>{
    tx(h,cx[i],y-12,9,true,[1,1,1]);
  });

  y-=43;

  r.filas.forEach((f,i)=>{
    if(i%2===0){
      rect(M,y-13,W-2*M,29,[.95,.975,.985]);
    }

    const valores=[
      fmt(f.t,1),
      fmt(f.elegido,3),
      fmt(f.referencia,3),
      fmt(f.lento,3),
      fmt(f.restante,2)+"%"
    ];

    valores.forEach((v,j)=>{
      tx(v,cx[j],y,9,false,AZUL);
    });

    y-=29;
  });

  y-=26;

  titulo("Resumen del medicamento");
  parrafo("Uso: "+r.med.uso);
  parrafo("Efectos secundarios habituales: "+r.med.comunes);
  parrafo("Riesgos graves: "+r.med.graves);

  // PÁGINAS 4+ : FICHA TÉCNICA
  nuevaPagina("Ficha farmacologica ampliada");

  titulo("Ficha: "+r.med.nombre);

  const apartados=[
    ["Mecanismo de accion",r.med.mecanismo],
    ["Usos terapeuticos",r.med.uso],
    ["Efectos secundarios habituales",r.med.comunes],
    ["Reacciones adversas graves",r.med.graves],
    ["Contraindicaciones",r.med.contra],
    ["Precauciones",r.med.precauciones],
    ["Interacciones",r.med.interacciones],
    ["Vigilancia medica",r.med.vigilancia]
  ];

  apartados.forEach(([nombre,descripcion])=>{
    titulo(nombre);
    parrafo(descripcion);
  });

  titulo("Limitaciones");
  parrafo(
    "La informacion farmacologica es un resumen " +
    "educativo. Las vidas medias son orientativas. " +
    "El modelo no determina dosis ni representa la " +
    "variabilidad farmacocinetica real entre pacientes."
  );

  parrafo(
    "Fuente para consultar etiquetado: " +
    "https://dailymed.nlm.nih.gov/dailymed/"
  );

  cerrarPagina();

  // ==========================================
  // CREAR ARCHIVO PDF BINARIO
  // ==========================================

  const objetos=[null];

  function agregar(v){
    objetos.push(v);
    return objetos.length-1;
  }

  const catalogo=agregar("");
  const pages=agregar("");

  const fontNormal=agregar(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
  );

  const fontBold=agregar(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"
  );

  const ids=[];

  paginas.forEach(contenido=>{
    const bytesContenido=new TextEncoder().encode(contenido);

    const stream=agregar(
      `<< /Length ${bytesContenido.length} >>\n`+
      `stream\n${contenido}endstream`
    );

    const pagina=agregar(
      `<< /Type /Page /Parent ${pages} 0 R `+
      `/MediaBox [0 0 ${W} ${H}] `+
      `/Resources << /Font << `+
      `/F1 ${fontNormal} 0 R `+
      `/F2 ${fontBold} 0 R >> >> `+
      `/Contents ${stream} 0 R >>`
    );

    ids.push(pagina);
  });

  objetos[catalogo]=
    `<< /Type /Catalog /Pages ${pages} 0 R >>`;

  objetos[pages]=
    `<< /Type /Pages /Kids [`+
    ids.map(i=>`${i} 0 R`).join(" ")+
    `] /Count ${ids.length} >>`;

  const encoder=new TextEncoder();
  const bloques=[];
  const offsets=[0];
  let longitud=0;

  function escribir(s){
    const bytes=encoder.encode(s);
    bloques.push(bytes);
    longitud+=bytes.length;
  }

  escribir("%PDF-1.4\n");

  for(let i=1;i<objetos.length;i++){
    offsets[i]=longitud;
    escribir(`${i} 0 obj\n${objetos[i]}\nendobj\n`);
  }

  const xref=longitud;

  escribir(`xref\n0 ${objetos.length}\n`);
  escribir("0000000000 65535 f \n");

  for(let i=1;i<objetos.length;i++){
    escribir(
      String(offsets[i]).padStart(10,"0")+
      " 00000 n \n"
    );
  }

  escribir(
    `trailer\n<< /Size ${objetos.length} `+
    `/Root ${catalogo} 0 R >>\n`+
    `startxref\n${xref}\n%%EOF`
  );

  const salida=new Uint8Array(longitud);
  let posicion=0;

  bloques.forEach(b=>{
    salida.set(b,posicion);
    posicion+=b.length;
  });

  return salida;
}

// ==============================================
// 8. DESCARGAR PDF DESDE FARMACOSIM
// ==============================================

function descargarReportePDF() {
  actualizar();

  const r=estado.resultado;

  if(!r){
    alert("Corrige los parámetros antes de descargar.");
    return;
  }

  try {
    const bytes=crearReportePDF(r);

    const archivo=new Blob(
      [bytes],
      {type:"application/pdf"}
    );

    const url=URL.createObjectURL(archivo);

    const nombre=r.med.nombre
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[^a-zA-Z0-9]/g,"_");

    const enlace=document.createElement("a");

    enlace.href=url;
    enlace.download=
      `FarmacoSim_Reporte_${nombre}.pdf`;

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    setTimeout(()=>{
      URL.revokeObjectURL(url);
    },10000);

  } catch(error) {
    console.error("Error PDF:",error);

    alert(
      "Error al generar el PDF: "+error.message
    );
  }
}

// ==============================================
// 9. EVENTOS
// ==============================================

function seleccionarOpcion(grupo,atributo,valor) {
  document.querySelectorAll(
    `#${grupo} [${atributo}]`
  ).forEach(boton=>{
    const activo=
      boton.getAttribute(atributo)===valor;

    boton.classList.toggle("active",activo);
    boton.setAttribute(
      "aria-pressed",
      String(activo)
    );
  });
}

function restablecer() {
  $("medicamento").value="0";
  $("cantidad").value="100";
  $("tiempo").value="24";
  $("peso").value="70";
  $("renal").value="normal";
  $("hepatica").value="normal";

  estado.complexion="media";
  estado.edad="adulto";

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

function iniciar() {
  iniciarCatalogo();

  [
    "medicamento","cantidad","tiempo",
    "peso","renal","hepatica"
  ].forEach(id=>{
    $(id).addEventListener("input",actualizar);
    $(id).addEventListener("change",actualizar);
  });

  $("buscar").addEventListener(
    "input",mostrarCatalogo
  );

  $("filtros").addEventListener("click",e=>{
    const boton=e.target.closest("[data-cat]");
    if(!boton) return;

    estado.categoria=boton.dataset.cat;

    crearFiltros();
    mostrarCatalogo();
  });

  $("catalogo").addEventListener("click",e=>{
    const ficha=e.target.closest("[data-ficha]");
    const elegir=e.target.closest("[data-elegir]");

    if(ficha) {
      abrirFicha(Number(ficha.dataset.ficha));
    }

    if(elegir) {
      seleccionarMedicamento(
        Number(elegir.dataset.elegir)
      );
    }
  });

  $("ficha").addEventListener("click",e=>{
    const boton=e.target.closest("[data-elegir]");
    if(!boton) return;

    seleccionarMedicamento(
      Number(boton.dataset.elegir)
    );
  });

  $("cerrarModal").addEventListener("click",()=>{
    $("modal").close();
  });

  $("modal").addEventListener("click",e=>{
    if(e.target===$("modal")){
      $("modal").close();
    }
  });

  $("complexionOptions").addEventListener("click",e=>{
    const boton=e.target.closest("[data-complexion]");
    if(!boton) return;

    estado.complexion=boton.dataset.complexion;

    seleccionarOpcion(
      "complexionOptions",
      "data-complexion",
      estado.complexion
    );

    actualizar();
  });

  $("edadOptions").addEventListener("click",e=>{
    const boton=e.target.closest("[data-edad]");
    if(!boton) return;

    estado.edad=boton.dataset.edad;

    seleccionarOpcion(
      "edadOptions",
      "data-edad",
      estado.edad
    );

    actualizar();
  });

  $("restablecer").addEventListener(
    "click",restablecer
  );

  $("descargarPdf").addEventListener(
    "click",descargarReportePDF
  );

  $("descargarPdf2").addEventListener(
    "click",descargarReportePDF
  );

  $("menuBtn").addEventListener("click",()=>{
    $("sidebar").classList.toggle("open");
  });

  document.querySelectorAll(
    ".sidebar nav a"
  ).forEach(a=>{
    a.addEventListener("click",()=>{
      $("sidebar").classList.remove("open");
    });
  });

  actualizar();
}

document.addEventListener("DOMContentLoaded",iniciar);