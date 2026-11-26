
"use strict";

/* ===========================================
   FARMACOSIM TESH
   32 MEDICAMENTOS
   SIMULADOR Y REPORTE PDF SIN DEPENDENCIAS
   USO EXCLUSIVAMENTE EDUCATIVO
=========================================== */

// Estructura:
// nombre, categoría, vida media aproximada,
// ponderación renal didáctica, distribución,
// uso, mecanismo, efectos frecuentes,
// reacciones graves, contraindicaciones,
// precauciones, interacciones y vigilancia.

const med = (
  nombre, categoria, vida, renal, distribucion,
  uso, mecanismo, comunes, graves,
  contra, precauciones, interacciones, vigilancia
) => ({
  nombre, categoria, vida, renal, distribucion,
  uso, mecanismo, comunes, graves,
  contra, precauciones, interacciones, vigilancia
});

// ===========================================
// 1. CATÁLOGO FARMACOLÓGICO
// ===========================================

const MEDS = [

  med(
    "Paracetamol","Analgésicos",2.5,.15,"mixta",
    "Dolor leve o moderado y fiebre.",
    "Actúa principalmente en el sistema nervioso central sobre mecanismos relacionados con dolor y temperatura.",
    "Por lo general bien tolerado; ocasionalmente náuseas o erupciones cutáneas.",
    "Lesión hepática grave por sobredosis, anafilaxia y reacciones cutáneas graves.",
    "Hipersensibilidad; otras restricciones dependen de la presentación.",
    "Precaución en enfermedad hepática, alcohol excesivo y uso de otros productos que contienen paracetamol.",
    "Warfarina durante uso repetido, alcohol y sustancias hepatotóxicas.",
    "Cantidad total recibida y función hepática cuando corresponda."
  ),

  med(
    "Ibuprofeno","Antiinflamatorios",2,.12,"mixta",
    "Tratamiento de dolor, fiebre e inflamación.",
    "Inhibe las enzimas COX-1 y COX-2 y disminuye prostaglandinas.",
    "Acidez, dolor abdominal, náuseas, diarrea, mareos y edema.",
    "Hemorragia gastrointestinal, lesión renal, infarto y accidente cerebrovascular.",
    "Alergia a AINE, ciertas reacciones asmáticas y uso alrededor de revascularización coronaria.",
    "Precaución ante úlcera, enfermedad renal o cardiovascular, deshidratación y embarazo.",
    "Anticoagulantes, corticoides, otros AINE, litio, diuréticos y algunos antihipertensivos.",
    "Sangrado, presión arterial y función renal."
  ),

  med(
    "Amoxicilina","Antibióticos",1.2,.75,"hidro",
    "Infecciones bacterianas susceptibles.",
    "Inhibe la construcción de la pared celular bacteriana.",
    "Diarrea, náuseas, vómitos, candidiasis y erupción cutánea.",
    "Anafilaxia, reacciones cutáneas graves y colitis asociada a C. difficile.",
    "Hipersensibilidad grave a penicilinas o betalactámicos relacionados.",
    "Revisar antecedentes alérgicos y función renal. No combate infecciones virales.",
    "Metotrexato, warfarina, probenecid y alopurinol.",
    "Reacciones alérgicas, diarrea persistente y evolución de la infección."
  ),

  med(
    "Metformina","Antidiabéticos",6.2,.90,"hidro",
    "Tratamiento de diabetes mellitus tipo 2.",
    "Reduce la producción hepática de glucosa y mejora la sensibilidad a insulina.",
    "Diarrea, náuseas, flatulencia y molestias abdominales.",
    "Acidosis láctica poco frecuente y deficiencia de vitamina B12 en uso prolongado.",
    "Insuficiencia renal grave y acidosis metabólica.",
    "Precaución ante deshidratación, hipoxia, alcohol excesivo y ciertos procedimientos con contraste.",
    "Alcohol y medicamentos que afectan función renal o transporte de metformina.",
    "Función renal, glucemia y vitamina B12 cuando se indique."
  ),

  med(
    "Losartán","Antihipertensivos",2,.35,"mixta",
    "Tratamiento de hipertensión arterial.",
    "Bloquea receptores AT1 de angiotensina II.",
    "Mareos, hipotensión y cansancio.",
    "Hiperpotasemia importante, deterioro renal y daño fetal.",
    "Embarazo, hipersensibilidad y algunas combinaciones farmacológicas.",
    "Evaluar potasio, hidratación, función renal y estenosis de arterias renales.",
    "Potasio, litio, AINE y diuréticos ahorradores de potasio.",
    "Presión arterial, potasio y función renal."
  ),

  med(
    "Omeprazol","Gastrointestinales",1,.08,"lipo",
    "Reflujo y enfermedades relacionadas con ácido gástrico.",
    "Inhibe la bomba de protones gástrica.",
    "Cefalea, dolor abdominal, náuseas, diarrea y flatulencia.",
    "Nefritis intersticial, reacciones cutáneas graves e hipomagnesemia.",
    "Hipersensibilidad y algunas combinaciones contraindicadas.",
    "Valorar duración prolongada del tratamiento y síntomas digestivos de alarma.",
    "Clopidogrel, digoxina y medicamentos cuya absorción depende del pH.",
    "Respuesta clínica, función renal, magnesio y vitamina B12 cuando corresponda."
  ),

  med(
    "Naproxeno","Antiinflamatorios",14,.15,"mixta",
    "Dolor e inflamación.",
    "Disminuye prostaglandinas mediante inhibición de ciclooxigenasas.",
    "Acidez, náuseas, dolor abdominal, mareos y edema.",
    "Sangrado gastrointestinal, insuficiencia renal y eventos cardiovasculares.",
    "Hipersensibilidad a AINE y uso alrededor de revascularización coronaria.",
    "Precaución ante úlcera, enfermedad cardiovascular, renal y embarazo.",
    "Anticoagulantes, corticoides, otros AINE, diuréticos y litio.",
    "Síntomas de sangrado, presión arterial y función renal."
  ),

  med(
    "Atorvastatina","Hipolipemiantes",14,.02,"lipo",
    "Disminución de colesterol LDL.",
    "Inhibe la enzima HMG-CoA reductasa.",
    "Dolor muscular, molestias digestivas, artralgia y cefalea.",
    "Miopatía, rabdomiólisis y lesión hepática grave.",
    "Enfermedad hepática activa e hipersensibilidad; revisar restricciones según situación reproductiva.",
    "Evaluar síntomas musculares, enfermedad hepática e interacciones.",
    "Claritromicina, ciclosporina, algunos antifúngicos y antivirales.",
    "Perfil lipídico y síntomas musculares o hepáticos."
  ),

  med(
    "Clonazepam","Psicotrópicos",30,.05,"lipo",
    "Determinados trastornos convulsivos y de pánico.",
    "Potencia la actividad inhibitoria mediada por GABA-A.",
    "Somnolencia, cansancio, mareos y problemas de coordinación.",
    "Dependencia, abstinencia grave, depresión respiratoria y sobredosis.",
    "Hipersensibilidad a benzodiacepinas y ciertas enfermedades hepáticas.",
    "Evitar suspensión abrupta y combinación no supervisada con sedantes.",
    "Opioides, alcohol y otros depresores del sistema nervioso central.",
    "Respiración, sedación y signos de dependencia."
  ),

  med(
    "Gentamicina","Antibióticos",2.5,.95,"hidro",
    "Infecciones bacterianas graves.",
    "Aminoglucósido que actúa sobre la subunidad ribosomal 30S.",
    "Molestias locales y alteraciones de laboratorio según presentación.",
    "Nefrotoxicidad, daño auditivo o vestibular y bloqueo neuromuscular.",
    "Hipersensibilidad al principio activo.",
    "Precaución en alteración renal, deshidratación y uso de otros agentes ototóxicos.",
    "Vancomicina, anfotericina B y ciertos diuréticos.",
    "Función renal, niveles sanguíneos cuando proceda y audición."
  ),

  med(
    "Cetirizina","Antihistamínicos",8.3,.70,"hidro",
    "Alivio de alergias.",
    "Bloquea receptores histamínicos H1.",
    "Somnolencia, cansancio, cefalea y sequedad bucal.",
    "Reacciones alérgicas graves poco frecuentes.",
    "Hipersensibilidad a cetirizina o compuestos relacionados.",
    "Precaución ante problemas renales y actividades que requieren atención.",
    "Alcohol y otros depresores del sistema nervioso central.",
    "Sedación y respuesta clínica."
  ),

  med(
    "Loratadina","Antihistamínicos",8.4,.20,"lipo",
    "Alivio de alergias y urticaria.",
    "Antagonismo de receptores histamínicos H1.",
    "Cefalea, cansancio, boca seca y somnolencia ocasional.",
    "Reacciones de hipersensibilidad y palpitaciones poco frecuentes.",
    "Hipersensibilidad al medicamento.",
    "Precaución ante enfermedad hepática importante.",
    "Determinados inhibidores del metabolismo hepático.",
    "Respuesta al tratamiento y aparición de sedación."
  ),

  med(
    "Diclofenaco","Antiinflamatorios",1.5,.12,"mixta",
    "Tratamiento de dolor y procesos inflamatorios.",
    "Inhibe la producción de prostaglandinas.",
    "Náuseas, dolor abdominal, dispepsia y edema.",
    "Sangrado gastrointestinal, lesión renal, eventos cardiovasculares y daño hepático.",
    "Alergia a AINE y uso alrededor de revascularización coronaria.",
    "Precaución en enfermedad renal, hepática, digestiva y cardiovascular.",
    "Anticoagulantes, corticoides, litio, otros AINE y diuréticos.",
    "Presión arterial, sangrado y funciones renal y hepática."
  ),

  med(
    "Ciprofloxacino","Antibióticos",4,.60,"mixta",
    "Determinadas infecciones bacterianas.",
    "Inhibe ADN girasa y topoisomerasa IV bacterianas.",
    "Náuseas, diarrea, cefalea y dolor abdominal.",
    "Lesión tendinosa, neuropatía, efectos neurológicos y alteraciones glucémicas.",
    "Hipersensibilidad a quinolonas y uso con tizanidina.",
    "Precaución ante miastenia, edad avanzada y antecedentes tendinosos.",
    "Tizanidina, teofilina, warfarina, antiácidos y algunos antiarrítmicos.",
    "Tendones, sistema nervioso, glucosa y función renal."
  ),

  med(
    "Aciclovir","Antivirales",3,.85,"hidro",
    "Determinadas infecciones por herpesvirus.",
    "Inhibe la síntesis de ADN viral tras activación intracelular.",
    "Náuseas, cefalea, diarrea y malestar abdominal.",
    "Lesión renal aguda y reacciones neurológicas graves.",
    "Hipersensibilidad a aciclovir o valaciclovir según presentación.",
    "Precaución ante deshidratación y alteración de función renal.",
    "Medicamentos nefrotóxicos.",
    "Función renal e indicadores neurológicos."
  ),

  med(
    "Oseltamivir","Antivirales",8,.90,"hidro",
    "Tratamiento o prevención de influenza cuando está indicado.",
    "El metabolito activo inhibe la neuraminidasa viral.",
    "Náuseas, vómitos, cefalea y malestar abdominal.",
    "Anafilaxia, reacciones cutáneas graves y eventos neuropsiquiátricos comunicados.",
    "Hipersensibilidad grave.",
    "Precaución según edad, función renal y momento de tratamiento.",
    "Revisar determinadas vacunas contra influenza y otras combinaciones.",
    "Evolución clínica y cambios importantes de conducta."
  ),

  med(
    "Fluoxetina","Antidepresivos",96,.05,"lipo",
    "Depresión y otros trastornos bajo prescripción.",
    "Inhibidor selectivo de recaptación de serotonina.",
    "Insomnio, náuseas, sudoración y alteraciones sexuales.",
    "Síndrome serotoninérgico, hiponatremia, sangrado y cambios graves de conducta.",
    "Combinaciones incompatibles con IMAO y medicamentos específicos.",
    "Precaución ante trastorno bipolar, convulsiones y riesgo suicida.",
    "IMAO, tramadol, linezolid, anticoagulantes y agentes CYP2D6.",
    "Estado de ánimo, conducta y síntomas serotoninérgicos."
  ),

  med(
    "Ketorolaco","Antiinflamatorios",5.3,.70,"mixta",
    "Dolor moderado a intenso durante periodos breves.",
    "AINE inhibidor de síntesis de prostaglandinas.",
    "Náuseas, mareos, somnolencia e indigestión.",
    "Sangrado gastrointestinal, lesión renal y hemorragias importantes.",
    "Úlcera o hemorragia activa, enfermedad renal avanzada y algunas situaciones hemorrágicas.",
    "Uso limitado a corto plazo y evitar combinación con otros AINE.",
    "Anticoagulantes, antiagregantes, otros AINE y corticoides.",
    "Duración de tratamiento, sangrado y función renal."
  ),

  med(
    "Meloxicam","Antiinflamatorios",18,.15,"mixta",
    "Dolor e inflamación articular.",
    "Disminuye la síntesis de prostaglandinas.",
    "Dispepsia, náuseas, mareos, dolor abdominal y edema.",
    "Hemorragia digestiva, lesión renal y eventos cardiovasculares.",
    "Alergia a AINE y uso alrededor de revascularización coronaria.",
    "Precaución ante úlcera, enfermedad cardiovascular, renal y embarazo.",
    "Anticoagulantes, corticoides, diuréticos y otros AINE.",
    "Sangrado, edema, presión arterial y función renal."
  ),

  med(
    "Celecoxib","Antiinflamatorios",11,.10,"lipo",
    "Dolor e inflamación en determinadas enfermedades.",
    "Inhibición predominante de COX-2.",
    "Dispepsia, cefalea, edema y dolor abdominal.",
    "Eventos cardiovasculares, sangrado gastrointestinal y lesión renal.",
    "Alergia al medicamento, ciertas alergias a sulfonamidas y restricciones de AINE.",
    "Precaución ante enfermedad renal, digestiva, cardiovascular y embarazo.",
    "Warfarina, fluconazol, litio y determinados antihipertensivos.",
    "Presión arterial, función renal y síntomas digestivos."
  ),

  med(
    "Cefalexina","Antibióticos",1,.90,"hidro",
    "Tratamiento de infecciones bacterianas susceptibles.",
    "Cefalosporina que inhibe la síntesis de pared bacteriana.",
    "Diarrea, náuseas, vómitos y erupciones.",
    "Anafilaxia, colitis por C. difficile y reacciones cutáneas graves.",
    "Hipersensibilidad a cefalosporinas relacionadas.",
    "Revisar antecedentes alérgicos y función renal.",
    "Probenecid y algunas combinaciones con metformina.",
    "Diarrea persistente, alergia y evolución clínica."
  ),

  med(
    "Azitromicina","Antibióticos",68,.08,"lipo",
    "Determinadas infecciones bacterianas.",
    "Macrólido que actúa sobre la subunidad ribosomal 50S.",
    "Diarrea, náuseas, vómitos y dolor abdominal.",
    "Arritmias, prolongación QT, daño hepático y alergias graves.",
    "Alergia a macrólidos y antecedentes de lesión hepática asociada.",
    "Precaución ante riesgo cardíaco, enfermedad hepática y miastenia.",
    "Medicamentos que prolongan QT y ciertas combinaciones con anticoagulantes.",
    "Síntomas cardíacos, función hepática y evolución infecciosa."
  ),

  med(
    "Doxiciclina","Antibióticos",18,.25,"mixta",
    "Determinadas infecciones bacterianas.",
    "Tetraciclina inhibidora de síntesis proteica en subunidad 30S.",
    "Náuseas, diarrea, fotosensibilidad e irritación esofágica.",
    "Hipertensión intracraneal, reacciones cutáneas graves y lesión hepática.",
    "Alergia a tetraciclinas; restricciones según edad, embarazo e indicación.",
    "Precaución ante exposición solar e irritación esofágica.",
    "Calcio, hierro, antiácidos, retinoides y ciertos anticonvulsivos.",
    "Fotosensibilidad y molestias esofágicas."
  ),

  med(
    "Levofloxacino","Antibióticos",7,.85,"hidro",
    "Determinadas infecciones bacterianas.",
    "Fluoroquinolona que inhibe enzimas de replicación de ADN.",
    "Náuseas, diarrea, cefalea, mareos e insomnio.",
    "Rotura tendinosa, neuropatía, efectos neurológicos y arritmias.",
    "Hipersensibilidad a quinolonas.",
    "Precaución ante miastenia, edad avanzada y deterioro renal.",
    "Antiácidos, hierro, zinc, warfarina y medicamentos que prolongan QT.",
    "Tendones, sistema nervioso, glucosa y función renal."
  ),

  med(
    "Fluconazol","Antifúngicos",30,.80,"hidro",
    "Determinadas infecciones por hongos.",
    "Inhibe síntesis de ergosterol de membrana fúngica.",
    "Náuseas, dolor abdominal, cefalea, diarrea y erupciones.",
    "Daño hepático, reacciones cutáneas graves y prolongación QT.",
    "Hipersensibilidad y determinadas combinaciones que prolongan QT.",
    "Precaución en enfermedad hepática, renal y embarazo.",
    "Warfarina, fenitoína, algunas estatinas y medicamentos que prolongan QT.",
    "Función hepática, interacciones y respuesta al tratamiento."
  ),

  med(
    "Famotidina","Gastrointestinales",3,.70,"hidro",
    "Trastornos relacionados con exceso de ácido gástrico.",
    "Antagonista de receptores H2.",
    "Cefalea, mareos, estreñimiento y diarrea.",
    "Reacciones alérgicas y confusión en personas susceptibles.",
    "Hipersensibilidad al medicamento.",
    "Precaución ante alteración renal y síntomas digestivos de alarma.",
    "Medicamentos cuya absorción depende del pH gástrico.",
    "Función renal, respuesta y estado mental."
  ),

  med(
    "Amlodipino","Antihipertensivos",35,.10,"lipo",
    "Hipertensión y determinadas formas de angina.",
    "Bloquea canales de calcio y favorece relajación vascular.",
    "Edema de tobillos, rubor, cefalea, cansancio y mareos.",
    "Hipotensión intensa y empeoramiento transitorio de angina.",
    "Hipersensibilidad y ciertas restricciones cardiovasculares.",
    "Precaución en hipotensión y enfermedad hepática.",
    "Simvastatina, inhibidores CYP3A4 y otros antihipertensivos.",
    "Presión arterial, edema y síntomas cardiovasculares."
  ),

  med(
    "Sertralina","Antidepresivos",26,.05,"lipo",
    "Depresión y determinados trastornos de ansiedad.",
    "Inhibe selectivamente la recaptación de serotonina.",
    "Náuseas, diarrea, insomnio, sudoración y alteraciones sexuales.",
    "Síndrome serotoninérgico, hiponatremia, sangrado y cambios graves de conducta.",
    "Ciertas combinaciones con IMAO o pimozida.",
    "Precaución ante bipolaridad, convulsiones y riesgo suicida.",
    "IMAO, tramadol, linezolid, anticoagulantes y otros serotoninérgicos.",
    "Estado de ánimo, sodio y síntomas serotoninérgicos."
  ),

  med(
    "Escitalopram","Antidepresivos",30,.10,"lipo",
    "Depresión y ansiedad generalizada.",
    "Inhibidor selectivo de recaptación de serotonina.",
    "Náuseas, insomnio, somnolencia, sudoración y alteraciones sexuales.",
    "Síndrome serotoninérgico, hiponatremia, sangrado y alteraciones cardíacas.",
    "Combinaciones incompatibles con ciertos IMAO.",
    "Precaución ante bipolaridad, enfermedad hepática y riesgo de prolongación QT.",
    "IMAO, tramadol, anticoagulantes y ciertos agentes que prolongan QT.",
    "Estado de ánimo, sodio y síntomas serotoninérgicos."
  ),

  med(
    "Fexofenadina","Antihistamínicos",14,.15,"hidro",
    "Alergias y urticaria.",
    "Antagonista periférico de receptores H1.",
    "Cefalea, mareos, náuseas y cansancio.",
    "Reacciones alérgicas importantes poco frecuentes.",
    "Hipersensibilidad al medicamento.",
    "Precaución ante enfermedad renal y respuesta individual.",
    "Jugos de ciertas frutas y antiácidos pueden reducir su absorción.",
    "Control de síntomas alérgicos y tolerancia."
  ),

  med(
    "Difenhidramina","Antihistamínicos",8,.10,"lipo",
    "Alivio de determinadas manifestaciones alérgicas.",
    "Antagonista H1 de primera generación con actividad anticolinérgica.",
    "Somnolencia, boca seca, visión borrosa, estreñimiento y mareos.",
    "Confusión, retención urinaria, arritmias y toxicidad por sobredosis.",
    "Restricciones variables según formulación e historia clínica.",
    "Precaución en adultos mayores, glaucoma y retención urinaria.",
    "Alcohol, opioides, sedantes y otros anticolinérgicos.",
    "Sedación, estado mental y efectos anticolinérgicos."
  ),

  med(
    "Metoprolol","Antihipertensivos",4,.05,"lipo",
    "Hipertensión y determinadas enfermedades cardiovasculares.",
    "Betabloqueador relativamente selectivo de receptores beta-1.",
    "Fatiga, mareos, bradicardia y molestias digestivas.",
    "Bloqueo cardíaco, bradicardia grave e hipotensión.",
    "Bradicardia grave, determinados bloqueos cardíacos y shock cardiogénico.",
    "Precaución ante asma, diabetes y suspensión abrupta.",
    "Verapamilo, diltiazem, digoxina y clonidina.",
    "Frecuencia cardíaca, presión arterial y síntomas cardiovasculares."
  )

];

// ===========================================
// 2. ICONOS Y CONFIGURACIÓN
// ===========================================

const ICONOS = {
  "Todos": "▦",
  "Analgésicos": "💊",
  "Antiinflamatorios": "🩹",
  "Antibióticos": "🧫",
  "Antidiabéticos": "🩸",
  "Antihipertensivos": "❤️",
  "Gastrointestinales": "🧬",
  "Hipolipemiantes": "🫀",
  "Psicotrópicos": "🧠",
  "Antihistamínicos": "🌿",
  "Antivirales": "🦠",
  "Antidepresivos": "🧠",
  "Antifúngicos": "🍄"
};

const COLORES = [
  "#e4f5ff", "#e7faf2", "#fff2dd", "#eef0ff",
  "#e3f9ee", "#ffeef5", "#e5f3ff", "#f1eaff"
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

function fmt(numero, decimales=2) {
  if (numero !== 0 && Math.abs(numero) < .0001) {
    return Number(numero).toExponential(2);
  }

  return Number(numero).toLocaleString("es-MX", {
    maximumFractionDigits: decimales
  });
}

// ===========================================
// 3. MEDICAMENTOS Y FILTROS
// ===========================================

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
  const categorias = [
    "Todos",
    ...new Set(MEDS.map(m => m.categoria))
  ];

  $("filtros").innerHTML = categorias.map(c => `
    <button type="button" data-cat="${c}"
      class="filter ${estado.categoria === c ? "active" : ""}">
      ${ICONOS[c]} ${c}
    </button>
  `).join("");
}

function mostrarCatalogo() {
  const texto = $("buscar").value.trim()
    .toLocaleLowerCase("es");

  const lista = MEDS.map((m,i) => ({m,i}))
    .filter(({m}) => {
      const categoria =
        estado.categoria === "Todos" ||
        estado.categoria === m.categoria;

      const contenido = [
        m.nombre, m.categoria, m.uso,
        m.mecanismo, m.comunes, m.graves
      ].join(" ").toLocaleLowerCase("es");

      return categoria && contenido.includes(texto);
    });

  $("contador").textContent =
    lista.length + " medicamento(s)";

  $("sinResultados").hidden = lista.length > 0;

  $("catalogo").innerHTML = lista.map(({m,i}) => `
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
            m.categoria === "Antifúngicos" ? "🍄" : "💊"
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
          ◷ Vida media aproximada: ${m.vida} h
        </span>

        <div class="drug-buttons">
          <button type="button" class="btn secondary"
            data-ficha="${i}">
            Ver ficha
          </button>

          <button type="button" class="btn primary"
            data-elegir="${i}">
            Simular →
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// ===========================================
// 4. FICHAS FARMACOLÓGICAS
// ===========================================

function abrirFicha(i) {
  const m = MEDS[i];
  if (!m) return;

  const distribuciones = {
    hidro: "Hidrofílica ilustrativa",
    lipo: "Lipofílica ilustrativa",
    mixta: "Mixta ilustrativa"
  };

  const fuente =
    "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=" +
    encodeURIComponent(m.nombre);

  const seccion = (titulo, contenido, clase="") => `
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
          <small>Distribución del modelo</small>
          <strong>${distribuciones[m.distribucion]}</strong>
        </div>

        <div>
          <small>Ponderación renal didáctica</small>
          <strong>${Math.round(m.renal*100)}%</strong>
        </div>
      </div>
    </div>

    <div class="ficha-content">

      ${seccion("🧬 Mecanismo de acción",m.mecanismo)}
      ${seccion("🩺 Usos terapéuticos",m.uso)}
      ${seccion("💊 Efectos secundarios habituales",m.comunes)}

      ${seccion(
        "⚠️ Reacciones adversas graves",
        m.graves,"danger"
      )}

      ${seccion(
        "🚫 Contraindicaciones",
        m.contra,"warning"
      )}

      ${seccion("🛡️ Precauciones",m.precauciones)}
      ${seccion("🔄 Interacciones",m.interacciones)}
      ${seccion("📋 Vigilancia médica",m.vigilancia)}

      ${seccion(
        "⏳ Vida media y duración del efecto",
        `La vida media orientativa es ${m.vida} horas.
        Esto no significa que su efecto dure exactamente
        ${m.vida} horas. La duración del efecto
        terapéutico puede ser distinta y depende del
        medicamento y de la formulación.`
      )}

      ${seccion(
        "🕒 Intervalo entre dosis y duración del tratamiento",
        `FarmacoSim no calcula cada cuántas horas
        debe administrarse ${m.nombre}, ni durante
        cuántos días debe utilizarse. Estos tiempos
        corresponden a indicaciones profesionales.`
      )}

      <div class="ficha-notice">
        Las reacciones adversas, contraindicaciones e
        interacciones resumidas no son una lista exhaustiva.
        Consulta el etiquetado actualizado de la
        presentación específica.
      </div>

      <div class="ficha-actions">

        <a class="btn secondary" href="${fuente}"
          target="_blank" rel="noopener noreferrer">
          📚 Consultar DailyMed
        </a>

        <button type="button" class="btn primary"
          data-elegir="${i}">
          📈 Simular medicamento
        </button>

      </div>
    </div>
  `;

  if (!$("modal").open) $("modal").showModal();
  $("modal").scrollTop = 0;
}

function seleccionarMedicamento(i) {
  $("medicamento").value = String(i);

  if ($("modal").open) $("modal").close();

  actualizar();

  $("simulador").scrollIntoView({
    behavior: "smooth"
  });
}

// ===========================================
// 5. LEER PARÁMETROS
// ===========================================

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

// ===========================================
// 6. CÁLCULO FARMACOCINÉTICO ILUSTRATIVO
// ===========================================

function calcularModelo(p) {
  const m = MEDS[p.med];

  // Factores hipotéticos, no clínicos.

  const cuerpo = {
    delgada: .88,
    media: 1,
    robusta: 1.18
  }[p.complexion];

  const factorEdad = {
    joven: 1.08,
    adulto: 1,
    mayor: .78
  }[p.edad];

  const factorRenal = {
    normal: 1,
    moderada: .72,
    alta: .42
  }[p.renal];

  const factorHepatico = {
    normal: 1,
    moderada: .75,
    alta: .45
  }[p.hepatica];

  // Distribución aparente hipotética.
  const distribucion = (p.peso / 70) * cuerpo;

  // Concentración inicial relativa.
  const inicial = p.cantidad / distribucion;

  // Modificador orgánico didáctico.
  const factorOrganos =
    m.renal * factorRenal +
    (1 - m.renal) * factorHepatico;

  const kBase = Math.log(2) / m.vida;
  const k = kBase * factorEdad * factorOrganos;

  // Escenario lento: k 35% menor.
  const kLento = kBase * .65;

  const C = (c0, constante, t) =>
    c0 * Math.exp(-constante*t);

  const filas = [];

  for (let i=0; i<=10; i++) {
    const t = p.tiempo * i / 10;

    filas.push({
      t,
      elegido: C(inicial,k,t),
      referencia: C(p.cantidad,kBase,t),
      lento: C(p.cantidad,kLento,t),
      restante: 100 * Math.exp(-k*t)
    });
  }

  return {
    med: m,
    perfil: p,
    inicial,
    distribucion,
    k,
    kBase,
    kLento,
    vidaMedia: Math.log(2)/k,
    final: C(inicial,k,p.tiempo),
    restante: 100*Math.exp(-k*p.tiempo),
    filas
  };
}

// ===========================================
// 7. GRÁFICA EN PANTALLA
// ===========================================

function dibujarGrafica(r) {
  const svg = $("grafica");

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

  // Eje vertical.
  for(let i=0;i<=5;i++) {
    const valor=maxY*i/5;
    const y=Y(valor);

    s+=`
      <line x1="${L}" y1="${y}"
        x2="${W-R}" y2="${y}"
        stroke="#e4edf3"/>

      <text x="${L-10}" y="${y+4}"
        text-anchor="end" font-size="11"
        fill="#8094a4">
        ${fmt(valor,1)}
      </text>
    `;
  }

  // Eje horizontal.
  for(let i=0;i<=6;i++) {
    const t=maxT*i/6;
    const x=X(t);

    s+=`
      <line x1="${x}" y1="${T}"
        x2="${x}" y2="${T+alto}"
        stroke="#edf2f7"/>

      <text x="${x}" y="${H-23}"
        text-anchor="middle" font-size="11"
        fill="#8094a4">
        ${fmt(t,1)}
      </text>
    `;
  }

  const series = [
    {
      inicio:r.perfil.cantidad,
      k:r.kBase,
      color:"#467bda"
    },
    {
      inicio:r.perfil.cantidad,
      k:r.kLento,
      color:"#e79a50"
    },
    {
      inicio:r.inicial,
      k:r.k,
      color:"#0bbba9"
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
      <path d="${path}"
        fill="none"
        stroke="${curva.color}"
        stroke-width="${idx===2?4:2.7}"
        stroke-linecap="round"
        stroke-linejoin="round"
        ${idx===1?'stroke-dasharray="8 5"':""}/>
    `;
  });

  s+=`
    <text x="${W/2}" y="${H-3}"
      text-anchor="middle"
      font-size="13"
      fill="#627a8e">
      Tiempo (horas)
    </text>

    <text transform="translate(18 ${H/2}) rotate(-90)"
      text-anchor="middle"
      font-size="13"
      fill="#627a8e">
      Concentración relativa (u.a.)
    </text>
  `;

  svg.innerHTML=s;
}

// ===========================================
// 8. ACTUALIZACIÓN AUTOMÁTICA
// ===========================================

function actualizar() {
  const p=leerPerfil();

  $("cantidadValor").textContent =
    p.cantidad+" unidades relativas";

  $("tiempoValor").textContent =
    p.tiempo+" horas";

  $("explicacionTiempo").innerHTML=`
    <b>¿Qué representan las ${p.tiempo} horas?</b>
    <p>
      Es el periodo observado en la gráfica.
      No es el intervalo entre dosis ni la
      duración del tratamiento o del efecto.
    </p>
  `;

  if(!valido(p)) {
    $("error").textContent=
      "Introduce un peso entre 20 y 300 kg.";

    estado.resultado=null;
    $("grafica").innerHTML="";
    $("resultados").innerHTML="";
    $("interpretacion").innerHTML="";
    $("tablaEstadisticas").innerHTML="";

    return;
  }

  $("error").textContent="";

  const r=calcularModelo(p);
  estado.resultado=r;

  $("resumenGrafica").textContent=
    `${r.med.nombre} · ${p.peso} kg · `+
    `${p.complexion} · ${p.tiempo} horas`;

  dibujarGrafica(r);

  const indicadores=[
    ["Concentración inicial",fmt(r.inicial,3)+" u.a."],
    ["Concentración final",fmt(r.final,3)+" u.a."],
    ["Vida media hipotética",fmt(r.vidaMedia,2)+" h"],
    ["Constante k",fmt(r.k,4)+" h⁻¹"],
    ["Restante al final",fmt(r.restante,2)+"%"],
    ["Factor de distribución",fmt(r.distribucion,3)+"×"]
  ];

  $("resultados").innerHTML=indicadores.map(a=>`
    <article class="result-card">
      <small>${a[0]}</small>
      <strong>${a[1]}</strong>
    </article>
  `).join("");

  $("interpretacion").innerHTML=`
    <b>Interpretación educativa</b>

    <p>
      <b>Medicamento:</b> ${r.med.nombre}<br>
      <b>Peso seleccionado:</b> ${p.peso} kg<br>
      <b>Complexión:</b> ${p.complexion}<br>
      <b>Edad:</b> ${EDADES[p.edad]}<br>
      <b>Función renal:</b> ${p.renal}<br>
      <b>Función hepática:</b> ${p.hepatica}<br>
      <b>Periodo analizado:</b> ${p.tiempo} horas
    </p>

    <p>
      La concentración relativa inicial del
      perfil es ${fmt(r.inicial,3)} u.a.
      Después de ${p.tiempo} horas,
      el modelo calcula ${fmt(r.final,3)} u.a.
      Esto equivale al ${fmt(r.restante,2)}%
      de su concentración inicial.
    </p>

    <p>
      La vida media de referencia de este medicamento
      es aproximadamente ${r.med.vida} horas.
      La vida media hipotética del perfil es
      ${fmt(r.vidaMedia,2)} horas.
    </p>

    <p>
      <b>Aclaración:</b> ni el periodo observado
      ni la vida media indican cuándo debe
      administrarse otra dosis ni cuánto dura
      exactamente el efecto terapéutico.
    </p>
  `;

  $("tablaEstadisticas").innerHTML=
    r.filas.map(f=>`
      <tr>
        <td>${fmt(f.t,1)} h</td>
        <td>${fmt(f.elegido,3)} u.a.</td>
        <td>${fmt(f.referencia,3)} u.a.</td>
        <td>${fmt(f.lento,3)} u.a.</td>
        <td>${fmt(f.restante,2)}%</td>
      </tr>
    `).join("");
}

// ===========================================
// 9. SELECCIONAR ICONOS
// ===========================================

function seleccionarOpcion(grupo,atributo,valor) {
  document.querySelectorAll(
    `#${grupo} [${atributo}]`
  ).forEach(boton=>{
    const seleccionado=
      boton.getAttribute(atributo)===valor;

    boton.classList.toggle("active",seleccionado);
    boton.setAttribute(
      "aria-pressed",
      String(seleccionado)
    );
  });
}

// ===========================================
// 10. RESTABLECER
// ===========================================

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

// ===========================================
// 11. GENERADOR DE PDF LOCAL
// ===========================================

// El archivo PDF se construye directamente
// en el navegador sin jsPDF y sin internet.

function crearReportePDF(r) {
  const W=595.28;
  const H=841.89;
  const M=46;

  const NAVY=[.06,.14,.23];
  const VERDE=[.04,.68,.61];
  const AZUL=[.27,.48,.85];
  const NARANJA=[.91,.60,.31];
  const GRIS=[.38,.47,.55];

  const n=v=>Number(v).toFixed(2);
  const rgb=c=>c.map(n).join(" ");

  const paginas=[];
  let contenido="";
  let y=688;
  let num=0;

  // Texto PDF: fuente Helvetica estándar.
  // Se normaliza a ASCII para funcionar
  // sin bibliotecas externas.
  function textoSeguro(valor) {
    return String(valor)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[^\x20-\x7e]/g," ")
      .replace(/\\/g,"\\\\")
      .replace(/\(/g,"\\(")
      .replace(/\)/g,"\\)");
  }

  function texto(s,x,py,size=10,bold=false,color=NAVY) {
    contenido+=
      `BT /F${bold?2:1} ${n(size)} Tf `+
      `${rgb(color)} rg `+
      `1 0 0 1 ${n(x)} ${n(py)} Tm `+
      `(${textoSeguro(s)}) Tj ET\n`;
  }

  function rect(x,py,w,h,color) {
    contenido+=
      `${rgb(color)} rg ${n(x)} ${n(py)} `+
      `${n(w)} ${n(h)} re f\n`;
  }

  function linea(x1,y1,x2,y2,color=[.85,.90,.94],g=1) {
    contenido+=
      `${rgb(color)} RG ${n(g)} w `+
      `${n(x1)} ${n(y1)} m `+
      `${n(x2)} ${n(y2)} l S\n`;
  }

  function nuevaPagina(subtitulo) {
    if(contenido) paginas.push(contenido);

    contenido="";
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
      "Generado: "+new Date().toLocaleString("es-MX"),
      M,H-94,9,false,[.78,.85,.90]
    );

    linea(M,44,W-M,44);

    texto(
      "Uso educativo | No clinico",
      M,28,8,false,GRIS
    );

    texto(
      "Pagina "+num,
      W-105,28,8,false,GRIS
    );

    y=685;
  }

  // Repartir texto en renglones.
  function lineasTexto(s,maxCaracteres=85) {
    const palabras=String(s).split(/\s+/);
    const lineas=[];
    let actual="";

    palabras.forEach(p=>{
      if(
        (actual+" "+p).trim().length>maxCaracteres &&
        actual
      ){
        lineas.push(actual);
        actual=p;
      }else{
        actual+=(actual?" ":"")+p;
      }
    });

    if(actual) lineas.push(actual);
    return lineas;
  }

  function asegurar(alto) {
    if(y-alto<70) {
      nuevaPagina("Continuacion del reporte");
    }
  }

  function titulo(s) {
    asegurar(30);
    texto(s.toUpperCase(),M,y,12,true,VERDE);
    y-=26;
  }

  function parrafo(s) {
    const lineas=lineasTexto(s,85);
    asegurar(lineas.length*15+14);

    lineas.forEach(l=>{
      texto(l,M,y,10,false,GRIS);
      y-=15;
    });

    y-=13;
  }

  function dato(etiqueta,valor) {
    asegurar(22);

    texto(etiqueta,M,y,10,true,NAVY);
    texto(String(valor),M+243,y,10,false,GRIS);
    y-=22;
  }

  // =======================================
  // PÁGINA 1: DATOS GENERALES
  // =======================================

  nuevaPagina("Reporte estadistico personalizado");

  titulo("Medicamento");
  dato("Nombre",r.med.nombre);
  dato("Categoria",r.med.categoria);
  dato("Vida media de referencia",r.med.vida+" h");

  y-=8;

  titulo("Perfil seleccionado");
  dato("Peso",r.perfil.peso+" kg");
  dato("Complexion",r.perfil.complexion);
  dato("Edad",EDADES[r.perfil.edad]);
  dato("Funcion renal",r.perfil.renal);
  dato("Funcion hepatica",r.perfil.hepatica);
  dato("Periodo observado",r.perfil.tiempo+" h");
  dato("Cantidad relativa inicial",r.perfil.cantidad+" u.a.");

  y-=8;

  titulo("Indicadores calculados");
  dato("Concentracion inicial",fmt(r.inicial,3)+" u.a.");
  dato("Concentracion final",fmt(r.final,3)+" u.a.");
  dato("Vida media hipotetica",fmt(r.vidaMedia,2)+" h");
  dato("Constante k",fmt(r.k,4)+" h-1");
  dato("Concentracion restante",fmt(r.restante,2)+"%");
  dato("Factor de distribucion",fmt(r.distribucion,3)+" x");

  // =======================================
  // PÁGINA 2: GRÁFICA VECTORIAL
  // =======================================

  nuevaPagina("Grafica de eliminacion");

  titulo("Curvas comparativas");

  const gx=78,gy=345,gw=435,gh=270;
  const maxT=r.perfil.tiempo;
  const maxY=Math.max(
    r.inicial,r.perfil.cantidad
  )*1.12;

  const X=t=>gx+t/maxT*gw;
  const Y=v=>gy+v/maxY*gh;

  for(let i=0;i<=5;i++){
    const yy=gy+gh*i/5;

    linea(gx,yy,gx+gw,yy,[.87,.91,.94],.6);

    texto(
      fmt(maxY*i/5,1),
      43,yy-3,8,false,GRIS
    );
  }

  for(let i=0;i<=5;i++){
    const t=maxT*i/5;
    const xx=X(t);

    linea(xx,gy,xx,gy+gh,[.87,.91,.94],.6);

    texto(
      fmt(t,1),
      xx-6,gy-19,8,false,GRIS
    );
  }

  const curvas=[
    [r.perfil.cantidad,r.kBase,AZUL],
    [r.perfil.cantidad,r.kLento,NARANJA],
    [r.inicial,r.k,VERDE]
  ];

  curvas.forEach(([inicio,k,color])=>{
    let anterior=null;

    for(let i=0;i<=160;i++){
      const t=maxT*i/160;
      const valor=inicio*Math.exp(-k*t);
      const punto=[X(t),Y(valor)];

      if(anterior){
        linea(
          anterior[0],anterior[1],
          punto[0],punto[1],
          color,2
        );
      }

      anterior=punto;
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

  y=252;

  titulo("Interpretacion");
  parrafo(
    "La grafica muestra la eliminacion matematica " +
    "del medicamento durante " +
    r.perfil.tiempo+" horas."
  );

  parrafo(
    "El peso y la complexion modifican la " +
    "distribucion aparente. La edad y las funciones " +
    "organicas ajustan la velocidad hipotetica " +
    "de eliminacion."
  );

  // =======================================
  // PÁGINA 3: TABLA ESTADÍSTICA
  // =======================================

  nuevaPagina("Estadisticas detalladas");

  titulo("Mediciones por intervalo");

  const columnas=[
    M+7,
    M+103,
    M+202,
    M+304,
    M+405
  ];

  const encabezados=[
    "Horas","Elegido","Referencia",
    "Lenta","Restante %"
  ];

  rect(M,y-22,W-2*M,31,NAVY);

  encabezados.forEach((h,i)=>{
    texto(h,columnas[i],y-12,9,true,[1,1,1]);
  });

  y-=43;

  r.filas.forEach((f,i)=>{
    if(i%2===0){
      rect(
        M,y-13,W-2*M,29,
        [.95,.975,.985]
      );
    }

    const valores=[
      fmt(f.t,1),
      fmt(f.elegido,3),
      fmt(f.referencia,3),
      fmt(f.lento,3),
      fmt(f.restante,2)+"%"
    ];

    valores.forEach((v,j)=>{
      texto(v,columnas[j],y,9);
    });

    y-=29;
  });

  y-=24;

  titulo("Significado de las columnas");

  parrafo(
    "HORAS: tiempo transcurrido desde " +
    "el momento inicial del modelo."
  );

  parrafo(
    "ELEGIDO: concentracion relativa segun " +
    "el perfil y los parametros seleccionados."
  );

  parrafo(
    "REFERENCIA: escenario sin los ajustes " +
    "hipoteticos del perfil."
  );

  parrafo(
    "LENTA: constante de eliminacion un 35% " +
    "menor que la referencia."
  );

  parrafo(
    "RESTANTE: porcentaje que permanece " +
    "respecto a la concentracion inicial " +
    "del perfil seleccionado."
  );

  parrafo(
    "Las concentraciones se expresan " +
    "en unidades arbitrarias (u.a.)."
  );

  // =======================================
  // PÁGINA 4: ACLARACIÓN DE TIEMPOS
  // =======================================

  nuevaPagina("Aclaracion sobre los tiempos");

  titulo("Tiempo de simulacion");

  parrafo(
    "Las "+r.perfil.tiempo+
    " horas seleccionadas son exclusivamente " +
    "el periodo observado en la grafica."
  );

  titulo("Vida media");

  parrafo(
    "Tiempo aproximado en el que la concentracion " +
    "disminuye un 50% durante la fase " +
    "de eliminacion correspondiente."
  );

  parrafo(
    "La vida media de referencia del medicamento " +
    r.med.nombre+" es de aproximadamente "+
    r.med.vida+" horas."
  );

  titulo("Duracion del efecto");

  parrafo(
    "Periodo durante el cual el medicamento produce " +
    "su efecto terapeutico. Puede ser distinto de " +
    "la vida media."
  );

  titulo("Intervalo entre dosis");

  parrafo(
    "Es cada cuantas horas debe administrarse un " +
    "medicamento cuando existe una prescripcion. " +
    "No se obtiene directamente de esta simulacion."
  );

  titulo("Duracion del tratamiento");

  parrafo(
    "Indica durante cuantos dias o semanas " +
    "debe utilizarse un medicamento, segun " +
    "la indicacion profesional."
  );

  titulo("Aviso academico");

  parrafo(
    "FarmacoSim no establece dosis, horarios ni " +
    "duracion de tratamientos. Observar un " +
    "medicamento durante 24 horas no significa " +
    "que deba tomarse cada 24 horas."
  );

  // =======================================
  // PÁGINA 5: FICHA FARMACOLÓGICA
  // =======================================

  nuevaPagina("Ficha farmacologica ampliada");

  titulo("Medicamento: "+r.med.nombre);

  const secciones=[
    ["Mecanismo de accion",r.med.mecanismo],
    ["Uso terapeutico",r.med.uso],
    ["Efectos secundarios",r.med.comunes],
    ["Reacciones adversas graves",r.med.graves],
    ["Contraindicaciones",r.med.contra],
    ["Precauciones",r.med.precauciones],
    ["Interacciones",r.med.interacciones],
    ["Vigilancia medica",r.med.vigilancia]
  ];

  secciones.forEach(([nombre,descripcion])=>{
    titulo(nombre);
    parrafo(descripcion);
  });

  titulo("Limitaciones");

  parrafo(
    "Los datos farmacologicos son resumenes " +
    "educativos. Las vidas medias son orientativas " +
    "y las ponderaciones del modelo no estan " +
    "validadas para uso clinico."
  );

  parrafo(
    "Consulta etiquetas oficiales actualizadas " +
    "para conocer todas las advertencias " +
    "de la presentacion especifica."
  );

  if(contenido) paginas.push(contenido);

  // =======================================
  // ARMADO BINARIO DEL PDF
  // =======================================

  const objetos=[null];

  function agregar(v) {
    objetos.push(v);
    return objetos.length-1;
  }

  const catalogo=agregar("");
  const pages=agregar("");

  const fuenteNormal=agregar(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
  );

  const fuenteNegrita=agregar(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"
  );

  const ids=[];

  paginas.forEach(p=>{
    // Todos los comandos fueron convertidos
    // a caracteres ASCII.
    const largo=new TextEncoder().encode(p).length;

    const stream=agregar(
      `<< /Length ${largo} >>\n`+
      `stream\n${p}endstream`
    );

    const pagina=agregar(
      `<< /Type /Page /Parent ${pages} 0 R `+
      `/MediaBox [0 0 ${W} ${H}] `+
      `/Resources << /Font << `+
      `/F1 ${fuenteNormal} 0 R `+
      `/F2 ${fuenteNegrita} 0 R >> >> `+
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
  const partes=[];
  const offsets=[0];

  let total=0;

  function escribir(s) {
    const b=encoder.encode(s);
    partes.push(b);
    total+=b.length;
  }

  escribir("%PDF-1.4\n");

  for(let i=1;i<objetos.length;i++) {
    offsets[i]=total;

    escribir(
      `${i} 0 obj\n${objetos[i]}\nendobj\n`
    );
  }

  const xref=total;

  escribir(`xref\n0 ${objetos.length}\n`);
  escribir("0000000000 65535 f \n");

  for(let i=1;i<objetos.length;i++) {
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

  const salida=new Uint8Array(total);
  let posicion=0;

  partes.forEach(b=>{
    salida.set(b,posicion);
    posicion+=b.length;
  });

  return salida;
}

// ===========================================
// 12. DESCARGA DIRECTA DE PDF
// ===========================================

function descargarReportePDF() {
  actualizar();

  const r=estado.resultado;

  if(!r) {
    alert("Corrige los parámetros primero.");
    return;
  }

  try {
    const bytes=crearReportePDF(r);

    const blob=new Blob(
      [bytes],
      {type:"application/pdf"}
    );

    const url=URL.createObjectURL(blob);

    const nombre=r.med.nombre
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[^a-zA-Z0-9]/g,"_");

    const a=document.createElement("a");

    a.href=url;
    a.download=
      `FarmacoSim_Reporte_${nombre}.pdf`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(()=>{
      URL.revokeObjectURL(url);
    },10000);

  } catch(error) {
    console.error("Error al crear PDF:",error);
    alert("No se pudo generar el PDF: "+error.message);
  }
}

// ===========================================
// 13. EVENTOS DEL SISTEMA
// ===========================================

function iniciar() {
  iniciarCatalogo();

  // Actualización inmediata.
  [
    "medicamento","cantidad","tiempo",
    "peso","renal","hepatica"
  ].forEach(id=>{
    $(id).addEventListener("input",actualizar);
    $(id).addEventListener("change",actualizar);
  });

  // Buscador.
  $("buscar").addEventListener(
    "input",mostrarCatalogo
  );

  // Categorías.
  $("filtros").addEventListener("click",e=>{
    const b=e.target.closest("[data-cat]");
    if(!b) return;

    estado.categoria=b.dataset.cat;
    crearFiltros();
    mostrarCatalogo();
  });

  // Catálogo.
  $("catalogo").addEventListener("click",e=>{
    const ficha=e.target.closest("[data-ficha]");
    const elegir=e.target.closest("[data-elegir]");

    if(ficha) abrirFicha(Number(ficha.dataset.ficha));

    if(elegir) {
      seleccionarMedicamento(
        Number(elegir.dataset.elegir)
      );
    }
  });

  // Ficha.
  $("ficha").addEventListener("click",e=>{
    const b=e.target.closest("[data-elegir]");

    if(b) seleccionarMedicamento(
      Number(b.dataset.elegir)
    );
  });

  $("cerrarModal").addEventListener("click",()=>{
    $("modal").close();
  });

  $("modal").addEventListener("click",e=>{
    if(e.target===$("modal")) $("modal").close();
  });

  // COMPLEXIÓN + PESO SUGERIDO.
  $("complexionOptions").addEventListener("click",e=>{
    const b=e.target.closest("[data-complexion]");
    if(!b) return;

    estado.complexion=b.dataset.complexion;

    $("peso").value=
      PESOS_COMPLEXION[estado.complexion];

    seleccionarOpcion(
      "complexionOptions",
      "data-complexion",
      estado.complexion
    );

    actualizar();
  });

  // GRUPO DE EDAD.
  $("edadOptions").addEventListener("click",e=>{
    const b=e.target.closest("[data-edad]");
    if(!b) return;

    estado.edad=b.dataset.edad;

    seleccionarOpcion(
      "edadOptions",
      "data-edad",
      estado.edad
    );

    actualizar();
  });

  // Restablecer.
  $("restablecer").addEventListener(
    "click",restablecer
  );

  // Descargar PDF.
  $("descargarPdf").addEventListener(
    "click",descargarReportePDF
  );

  $("descargarPdf2").addEventListener(
    "click",descargarReportePDF
  );

  // Menú móvil.
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