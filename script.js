
"use strict";

/* ==================================================
   FARMACOSIM TESH - VERSIÓN CORREGIDA
   32 MEDICAMENTOS
   12 CATEGORÍAS
   PESOS DINÁMICOS SEGÚN EDAD Y COMPLEXIÓN
   CONCENTRACIONES RELATIVAS SIN "u.a."
   GENERACIÓN PDF SIN BIBLIOTECAS EXTERNAS

   IMPORTANTE:
   Modelo matemático únicamente educativo.
   No utilizar para decisiones médicas.
================================================== */

// ==================================================
// 1. ESTRUCTURA DE MEDICAMENTOS
// ==================================================

const medicamento = (
  nombre, categoria, vida, renal, distribucion,
  uso, mecanismo, comunes, graves,
  contra, precauciones, interacciones, vigilancia
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

// ==================================================
// 2. CATÁLOGO CON 32 MEDICAMENTOS
// ==================================================

const MEDS = [

  medicamento(
    "Paracetamol","Analgésicos",2.5,.15,"mixta",
    "Alivio del dolor leve o moderado y reducción de la fiebre.",
    "Actúa principalmente en el sistema nervioso central sobre vías relacionadas con el dolor y la temperatura.",
    "Por lo general bien tolerado; ocasionalmente náuseas o erupciones cutáneas.",
    "Lesión hepática grave por sobredosis, anafilaxia y reacciones cutáneas graves.",
    "Hipersensibilidad al medicamento; otras restricciones dependen de la presentación.",
    "Precaución en enfermedad hepática, consumo excesivo de alcohol y uso de otros productos que contienen paracetamol.",
    "Warfarina con uso repetido, alcohol y agentes potencialmente hepatotóxicos.",
    "Revisar la cantidad total consumida y función hepática cuando corresponda."
  ),

  medicamento(
    "Ibuprofeno","Antiinflamatorios",2,.12,"mixta",
    "Tratamiento del dolor, la fiebre y la inflamación.",
    "Inhibe COX-1 y COX-2, disminuyendo la síntesis de prostaglandinas.",
    "Acidez, dolor abdominal, náuseas, diarrea, mareos y edema.",
    "Hemorragia gastrointestinal, lesión renal, infarto, accidente cerebrovascular y anafilaxia.",
    "Alergia a AINE, determinadas reacciones asmáticas y uso alrededor de revascularización coronaria.",
    "Precaución ante úlcera, enfermedad renal o cardiovascular, deshidratación y embarazo.",
    "Anticoagulantes, corticoides, otros AINE, litio, diuréticos y algunos antihipertensivos.",
    "Sangrado, presión arterial y función renal."
  ),

  medicamento(
    "Amoxicilina","Antibióticos",1.2,.75,"hidro",
    "Tratamiento de infecciones bacterianas susceptibles.",
    "Antibiótico betalactámico que inhibe la síntesis de la pared celular bacteriana.",
    "Diarrea, náuseas, vómitos, candidiasis y erupción cutánea.",
    "Anafilaxia, reacciones cutáneas graves y colitis asociada a C. difficile.",
    "Hipersensibilidad grave a penicilinas o betalactámicos relacionados.",
    "Evaluar antecedentes alérgicos y función renal. No actúa sobre infecciones virales.",
    "Metotrexato, warfarina, probenecid y alopurinol.",
    "Alergia, diarrea persistente y evolución de la infección."
  ),

  medicamento(
    "Metformina","Antidiabéticos",6.2,.90,"hidro",
    "Tratamiento de diabetes mellitus tipo 2.",
    "Reduce la producción hepática de glucosa y mejora la sensibilidad a la insulina.",
    "Diarrea, náuseas, flatulencia, molestias abdominales y disminución del apetito.",
    "Acidosis láctica infrecuente pero grave; deficiencia de vitamina B12 durante el uso prolongado.",
    "Insuficiencia renal grave y acidosis metabólica.",
    "Precaución ante deshidratación, hipoxia, alcohol excesivo y determinados procedimientos con contraste.",
    "Alcohol y medicamentos que afectan la función renal o el transporte de metformina.",
    "Función renal, glucemia y vitamina B12 cuando esté indicado."
  ),

  medicamento(
    "Losartán","Antihipertensivos",2,.35,"mixta",
    "Tratamiento de hipertensión arterial.",
    "Bloquea receptores AT1 de angiotensina II y reduce la vasoconstricción.",
    "Mareos, cansancio e hipotensión.",
    "Hiperpotasemia grave, deterioro renal y toxicidad fetal.",
    "Embarazo, hipersensibilidad y determinadas combinaciones farmacológicas.",
    "Evaluar hidratación, potasio y función renal.",
    "Suplementos de potasio, litio, AINE y diuréticos ahorradores de potasio.",
    "Presión arterial, potasio y función renal."
  ),

  medicamento(
    "Omeprazol","Gastrointestinales",1,.08,"lipo",
    "Tratamiento de reflujo y enfermedades relacionadas con el ácido gástrico.",
    "Inhibe la bomba H+/K+-ATPasa de las células gástricas.",
    "Cefalea, dolor abdominal, náuseas, diarrea, estreñimiento y flatulencia.",
    "Nefritis intersticial, reacciones cutáneas graves e hipomagnesemia.",
    "Hipersensibilidad y ciertas combinaciones farmacológicas contraindicadas.",
    "Valorar necesidad de uso prolongado y síntomas gastrointestinales de alarma.",
    "Clopidogrel, digoxina y medicamentos cuya absorción depende del pH gástrico.",
    "Respuesta clínica, función renal y magnesio cuando corresponda."
  ),

  medicamento(
    "Naproxeno","Antiinflamatorios",14,.15,"mixta",
    "Tratamiento del dolor y la inflamación.",
    "Reduce la síntesis de prostaglandinas mediante inhibición de ciclooxigenasas.",
    "Acidez, náuseas, dolor abdominal, mareos, cefalea y edema.",
    "Sangrado gastrointestinal, insuficiencia renal y eventos cardiovasculares.",
    "Hipersensibilidad a AINE y uso alrededor de revascularización coronaria.",
    "Precaución ante úlcera, enfermedad cardiovascular, deterioro renal y embarazo.",
    "Anticoagulantes, corticoides, otros AINE, diuréticos y litio.",
    "Sangrado, presión arterial y función renal."
  ),

  medicamento(
    "Atorvastatina","Hipolipemiantes",14,.02,"lipo",
    "Reducción del colesterol LDL.",
    "Inhibe la enzima HMG-CoA reductasa y reduce la síntesis hepática de colesterol.",
    "Dolor muscular, molestias digestivas, artralgia y cefalea.",
    "Miopatía, rabdomiólisis y lesión hepática importante.",
    "Enfermedad hepática activa e hipersensibilidad; revisar indicaciones en embarazo y lactancia.",
    "Observar síntomas musculares, antecedentes hepáticos e interacciones.",
    "Claritromicina, ciclosporina, algunos antifúngicos y antivirales.",
    "Perfil lipídico y síntomas musculares o hepáticos."
  ),

  medicamento(
    "Clonazepam","Psicotrópicos",30,.05,"lipo",
    "Tratamiento de determinadas convulsiones y trastorno de pánico.",
    "Benzodiacepina que potencia la transmisión inhibitoria mediada por GABA-A.",
    "Somnolencia, cansancio, mareos, alteraciones de memoria y coordinación.",
    "Dependencia, abstinencia grave, depresión respiratoria y sobredosis.",
    "Hipersensibilidad a benzodiacepinas y determinadas enfermedades hepáticas.",
    "Evitar la suspensión abrupta y la combinación no supervisada con sedantes.",
    "Opioides, alcohol y otros depresores del sistema nervioso central.",
    "Respiración, sedación, coordinación y dependencia."
  ),

  medicamento(
    "Gentamicina","Antibióticos",2.5,.95,"hidro",
    "Tratamiento de determinadas infecciones bacterianas graves.",
    "Aminoglucósido que actúa sobre la subunidad ribosomal 30S bacteriana.",
    "Molestias locales o alteraciones de laboratorio según la vía de administración.",
    "Nefrotoxicidad, daño auditivo o vestibular y bloqueo neuromuscular.",
    "Hipersensibilidad al principio activo; otras restricciones dependen de la formulación.",
    "Precaución en insuficiencia renal, deshidratación y uso de otros medicamentos ototóxicos.",
    "Vancomicina, anfotericina B y algunos diuréticos.",
    "Función renal, niveles sanguíneos cuando proceda y audición."
  ),

  medicamento(
    "Cetirizina","Antihistamínicos",8.3,.70,"hidro",
    "Alivio de síntomas alérgicos.",
    "Bloquea receptores histamínicos H1 periféricos.",
    "Somnolencia, cansancio, cefalea, mareos y sequedad bucal.",
    "Reacciones alérgicas graves poco frecuentes.",
    "Hipersensibilidad a cetirizina o compuestos relacionados.",
    "Precaución ante enfermedad renal y actividades que exigen atención.",
    "Alcohol y otros depresores del sistema nervioso central.",
    "Sedación y respuesta clínica."
  ),

  medicamento(
    "Loratadina","Antihistamínicos",8.4,.20,"lipo",
    "Alivio de alergias y urticaria.",
    "Antagonismo de receptores histamínicos H1.",
    "Cefalea, cansancio, boca seca y somnolencia ocasional.",
    "Reacciones de hipersensibilidad y palpitaciones poco frecuentes.",
    "Hipersensibilidad al medicamento.",
    "Precaución ante enfermedad hepática importante.",
    "Determinados inhibidores del metabolismo hepático.",
    "Respuesta terapéutica y aparición de sedación."
  ),

  medicamento(
    "Diclofenaco","Antiinflamatorios",1.5,.12,"mixta",
    "Tratamiento del dolor y determinados procesos inflamatorios.",
    "Inhibe la síntesis de prostaglandinas.",
    "Dispepsia, náuseas, dolor abdominal, cefalea y edema.",
    "Hemorragia digestiva, lesión renal, eventos cardiovasculares y toxicidad hepática.",
    "Alergia a AINE y uso alrededor de revascularización coronaria.",
    "Precaución ante enfermedad renal, hepática, digestiva y cardiovascular.",
    "Anticoagulantes, corticoides, otros AINE, litio y diuréticos.",
    "Presión arterial, sangrado y funciones renal y hepática."
  ),

  medicamento(
    "Ciprofloxacino","Antibióticos",4,.60,"mixta",
    "Tratamiento de determinadas infecciones bacterianas.",
    "Inhibe ADN girasa y topoisomerasa IV bacterianas.",
    "Náuseas, diarrea, cefalea, dolor abdominal y mareos.",
    "Lesión tendinosa, neuropatía, efectos neurológicos y alteraciones glucémicas.",
    "Hipersensibilidad a quinolonas y uso concomitante con tizanidina.",
    "Precaución en miastenia gravis, personas mayores y antecedentes tendinosos.",
    "Tizanidina, teofilina, warfarina, antiácidos y determinados antiarrítmicos.",
    "Tendones, sistema nervioso, glucosa y función renal."
  ),

  medicamento(
    "Aciclovir","Antivirales",3,.85,"hidro",
    "Tratamiento de determinadas infecciones por herpesvirus.",
    "Inhibe la síntesis de ADN viral después de su activación intracelular.",
    "Náuseas, cefalea, diarrea y malestar abdominal.",
    "Lesión renal aguda y efectos neurológicos graves.",
    "Hipersensibilidad a aciclovir o valaciclovir según presentación.",
    "Precaución ante deshidratación y alteración de función renal.",
    "Medicamentos nefrotóxicos.",
    "Función renal y posibles cambios neurológicos."
  ),

  medicamento(
    "Oseltamivir","Antivirales",8,.90,"hidro",
    "Tratamiento o prevención de influenza cuando está indicado.",
    "Su metabolito activo inhibe la neuraminidasa del virus de influenza.",
    "Náuseas, vómitos, cefalea y malestar abdominal.",
    "Anafilaxia, reacciones cutáneas graves y eventos neuropsiquiátricos notificados.",
    "Hipersensibilidad grave al medicamento.",
    "Precaución según edad, función renal e indicación.",
    "Revisar determinadas vacunas contra influenza y otras combinaciones.",
    "Evolución clínica, tolerancia y cambios de conducta."
  ),

  medicamento(
    "Fluoxetina","Antidepresivos",96,.05,"lipo",
    "Tratamiento de depresión y determinados trastornos bajo prescripción.",
    "Inhibe selectivamente la recaptación de serotonina.",
    "Náuseas, insomnio, ansiedad, sudoración y alteraciones sexuales.",
    "Síndrome serotoninérgico, hiponatremia, sangrado y cambios graves de conducta.",
    "Combinaciones incompatibles con inhibidores MAO y ciertos medicamentos.",
    "Precaución ante trastorno bipolar, convulsiones y cambios de conducta.",
    "IMAO, tramadol, linezolid, anticoagulantes y medicamentos relacionados con CYP2D6.",
    "Estado de ánimo, conducta y síntomas serotoninérgicos."
  ),

  medicamento(
    "Ketorolaco","Antiinflamatorios",5.3,.70,"mixta",
    "Tratamiento a corto plazo del dolor moderado a intenso.",
    "AINE que inhibe la síntesis de prostaglandinas.",
    "Náuseas, mareos, somnolencia, dolor abdominal e indigestión.",
    "Hemorragia digestiva, lesión renal y sangrado importante.",
    "Úlcera o hemorragia activa, enfermedad renal avanzada y determinadas situaciones hemorrágicas.",
    "Uso limitado a corto plazo; evitar su combinación con otros AINE.",
    "Anticoagulantes, antiagregantes, corticoides y otros AINE.",
    "Duración del tratamiento, sangrado y función renal."
  ),

  medicamento(
    "Meloxicam","Antiinflamatorios",18,.15,"mixta",
    "Tratamiento del dolor y la inflamación articular.",
    "Disminuye la síntesis de prostaglandinas.",
    "Dispepsia, náuseas, mareos, dolor abdominal y edema.",
    "Hemorragia digestiva, lesión renal y eventos cardiovasculares.",
    "Alergia a AINE y uso alrededor de revascularización coronaria.",
    "Precaución ante úlcera, enfermedad renal o cardiovascular y embarazo.",
    "Anticoagulantes, corticoides, diuréticos y otros AINE.",
    "Sangrado, edema, presión arterial y función renal."
  ),

  medicamento(
    "Celecoxib","Antiinflamatorios",11,.10,"lipo",
    "Tratamiento de dolor e inflamación en determinadas enfermedades.",
    "Inhibe principalmente la enzima COX-2.",
    "Dispepsia, cefalea, edema y dolor abdominal.",
    "Eventos cardiovasculares, sangrado digestivo, lesión renal y reacciones cutáneas graves.",
    "Hipersensibilidad, determinadas alergias a sulfonamidas y restricciones propias de los AINE.",
    "Precaución en enfermedad renal, digestiva, cardiovascular y embarazo.",
    "Warfarina, fluconazol, litio y determinados antihipertensivos.",
    "Presión arterial, función renal y síntomas digestivos."
  ),

  medicamento(
    "Cefalexina","Antibióticos",1,.90,"hidro",
    "Tratamiento de infecciones bacterianas susceptibles.",
    "Cefalosporina que inhibe la síntesis de pared celular bacteriana.",
    "Diarrea, náuseas, vómitos e irritación digestiva.",
    "Anafilaxia, colitis por C. difficile y reacciones cutáneas graves.",
    "Hipersensibilidad a cefalosporinas relacionadas.",
    "Revisar alergias previas y función renal.",
    "Probenecid y determinadas combinaciones con metformina.",
    "Diarrea persistente, alergias y respuesta al tratamiento."
  ),

  medicamento(
    "Azitromicina","Antibióticos",68,.08,"lipo",
    "Tratamiento de determinadas infecciones bacterianas.",
    "Macrólido que actúa sobre la subunidad ribosomal 50S.",
    "Diarrea, náuseas, vómitos y dolor abdominal.",
    "Prolongación QT, arritmias, lesión hepática y alergias graves.",
    "Alergia a macrólidos y antecedentes de lesión hepática asociada.",
    "Precaución ante riesgos cardíacos, enfermedad hepática y miastenia.",
    "Medicamentos que prolongan QT y determinadas combinaciones con anticoagulantes.",
    "Síntomas cardíacos, función hepática y evolución de la infección."
  ),

  medicamento(
    "Doxiciclina","Antibióticos",18,.25,"mixta",
    "Tratamiento de determinadas infecciones bacterianas.",
    "Tetraciclina que inhibe la síntesis proteica bacteriana en la subunidad 30S.",
    "Náuseas, diarrea, fotosensibilidad e irritación esofágica.",
    "Hipertensión intracraneal, reacciones cutáneas graves y lesión hepática.",
    "Alergia a tetraciclinas; restricciones según edad, embarazo e indicación.",
    "Precaución ante exposición solar e irritación esofágica.",
    "Calcio, hierro, antiácidos, retinoides y determinados anticonvulsivos.",
    "Fotosensibilidad y molestias esofágicas."
  ),

  medicamento(
    "Levofloxacino","Antibióticos",7,.85,"hidro",
    "Tratamiento de determinadas infecciones bacterianas.",
    "Fluoroquinolona que inhibe enzimas de replicación del ADN bacteriano.",
    "Náuseas, diarrea, cefalea, mareos e insomnio.",
    "Rotura tendinosa, neuropatía, efectos neurológicos, arritmias y alteraciones glucémicas.",
    "Hipersensibilidad a quinolonas.",
    "Precaución ante miastenia, edad avanzada, uso de corticoides y enfermedad renal.",
    "Antiácidos, hierro, zinc, warfarina y fármacos que prolongan QT.",
    "Tendones, sistema nervioso, glucemia y función renal."
  ),

  medicamento(
    "Fluconazol","Antifúngicos",30,.80,"hidro",
    "Tratamiento de determinadas infecciones por hongos.",
    "Inhibe la síntesis de ergosterol de la membrana fúngica.",
    "Náuseas, dolor abdominal, cefalea, diarrea y erupciones cutáneas.",
    "Daño hepático, reacciones cutáneas graves y prolongación QT.",
    "Hipersensibilidad y ciertas combinaciones que prolongan QT.",
    "Precaución ante enfermedad hepática, renal y embarazo.",
    "Warfarina, fenitoína, determinadas estatinas y medicamentos que prolongan QT.",
    "Función hepática, interacciones y respuesta terapéutica."
  ),

  medicamento(
    "Famotidina","Gastrointestinales",3,.70,"hidro",
    "Tratamiento de enfermedades relacionadas con exceso de ácido gástrico.",
    "Antagonista de receptores histamínicos H2.",
    "Cefalea, mareos, estreñimiento y diarrea.",
    "Reacciones alérgicas graves y confusión en personas susceptibles.",
    "Hipersensibilidad a famotidina o sustancias relacionadas.",
    "Precaución en alteración renal y síntomas gastrointestinales de alarma.",
    "Medicamentos cuya absorción depende del pH gástrico.",
    "Función renal, respuesta terapéutica y estado mental."
  ),

  medicamento(
    "Amlodipino","Antihipertensivos",35,.10,"lipo",
    "Tratamiento de hipertensión y determinadas formas de angina.",
    "Bloquea canales de calcio y favorece la relajación vascular.",
    "Edema de tobillos, rubor, cefalea, cansancio y mareos.",
    "Hipotensión intensa y empeoramiento transitorio de angina en determinadas situaciones.",
    "Hipersensibilidad y restricciones cardiovasculares específicas.",
    "Precaución ante enfermedad hepática e hipotensión.",
    "Simvastatina, inhibidores CYP3A4 y otros antihipertensivos.",
    "Presión arterial, edema y síntomas cardiovasculares."
  ),

  medicamento(
    "Sertralina","Antidepresivos",26,.05,"lipo",
    "Tratamiento de depresión y determinados trastornos de ansiedad.",
    "Inhibe selectivamente la recaptación de serotonina.",
    "Náuseas, diarrea, insomnio, sudoración y alteraciones sexuales.",
    "Síndrome serotoninérgico, hiponatremia, sangrado y cambios graves de conducta.",
    "Determinadas combinaciones con IMAO o pimozida.",
    "Precaución ante trastorno bipolar, convulsiones y cambios de conducta.",
    "IMAO, tramadol, linezolid, anticoagulantes y otros medicamentos serotoninérgicos.",
    "Estado de ánimo, sodio y síntomas serotoninérgicos."
  ),

  medicamento(
    "Escitalopram","Antidepresivos",30,.10,"lipo",
    "Tratamiento de depresión y ansiedad generalizada.",
    "Inhibe selectivamente la recaptación de serotonina.",
    "Náuseas, insomnio, somnolencia, sudoración y alteraciones sexuales.",
    "Síndrome serotoninérgico, hiponatremia, sangrado y alteraciones cardíacas.",
    "Combinaciones incompatibles con determinados IMAO.",
    "Precaución ante bipolaridad, enfermedad hepática y riesgo de prolongación QT.",
    "IMAO, tramadol, anticoagulantes y ciertos medicamentos que prolongan QT.",
    "Estado de ánimo, sodio y respuesta terapéutica."
  ),

  medicamento(
    "Fexofenadina","Antihistamínicos",14,.15,"hidro",
    "Alivio de alergias y urticaria.",
    "Bloquea receptores histamínicos H1 periféricos.",
    "Cefalea, mareos, náuseas y cansancio.",
    "Reacciones de hipersensibilidad graves poco frecuentes.",
    "Hipersensibilidad al medicamento.",
    "Precaución ante enfermedad renal y respuesta individual.",
    "Jugos de determinadas frutas y antiácidos minerales pueden reducir su absorción.",
    "Control de síntomas alérgicos y tolerancia."
  ),

  medicamento(
    "Difenhidramina","Antihistamínicos",8,.10,"lipo",
    "Alivio de determinados síntomas alérgicos.",
    "Antihistamínico H1 de primera generación con efectos anticolinérgicos.",
    "Somnolencia, sequedad bucal, visión borrosa, estreñimiento y mareos.",
    "Confusión, retención urinaria, arritmias, convulsiones y toxicidad por sobredosis.",
    "Restricciones según formulación y antecedentes clínicos.",
    "Precaución en adultos mayores, glaucoma y retención urinaria.",
    "Alcohol, opioides, sedantes y otros medicamentos anticolinérgicos.",
    "Sedación, estado mental y efectos anticolinérgicos."
  ),

  medicamento(
    "Metoprolol","Antihipertensivos",4,.05,"lipo",
    "Tratamiento de hipertensión y determinadas enfermedades cardiovasculares.",
    "Betabloqueador relativamente selectivo de receptores beta-1.",
    "Fatiga, mareos, bradicardia y molestias digestivas.",
    "Bloqueo cardíaco, bradicardia grave, hipotensión y descompensación cardíaca.",
    "Bradicardia grave, determinados bloqueos cardíacos y shock cardiogénico.",
    "Precaución ante asma, diabetes y suspensión abrupta.",
    "Verapamilo, diltiazem, digoxina y clonidina.",
    "Frecuencia cardíaca, presión arterial y síntomas cardiovasculares."
  )
];

// ==================================================
// 3. CONFIGURACIÓN DE CATEGORÍAS E ICONOS
// ==================================================

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
  "#e4f5ff",
  "#e7faf2",
  "#fff2dd",
  "#eef0ff",
  "#e3f9ee",
  "#ffeef5",
  "#e5f3ff",
  "#f1eaff"
];

// ==================================================
// 4. PESOS DINÁMICOS
// ==================================================

// Los valores son ejemplos ficticios.
// NO son pesos recomendados ni estándares médicos.

const PESOS_POR_PERFIL = {
  joven: {
    delgada: 55,
    media: 70,
    robusta: 85
  },

  adulto: {
    delgada: 60,
    media: 75,
    robusta: 90
  },

  mayor: {
    delgada: 50,
    media: 65,
    robusta: 80
  }
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

// ==================================================
// 5. FUNCIONES AUXILIARES
// ==================================================

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

function actualizarEtiquetasPesos() {
  document.querySelectorAll(
    "#complexionOptions [data-complexion]"
  ).forEach(boton => {
    const tipo = boton.dataset.complexion;

    const sugerido =
      PESOS_POR_PERFIL[estado.edad][tipo];

    const etiqueta = boton.querySelector("small");

    if (etiqueta) {
      etiqueta.textContent = sugerido + " kg";
    }
  });
}

function actualizarPesoSugerido() {
  const edad = estado.edad;
  const complexion = estado.complexion;

  const sugerido =
    PESOS_POR_PERFIL[edad][complexion];

  $("peso").value = String(sugerido);

  actualizarEtiquetasPesos();
  actualizar();
}

// ==================================================
// 6. CARGAR CATÁLOGO
// ==================================================

function iniciarCatalogo() {
  $("medicamento").innerHTML = MEDS.map(
    (m, i) => `
      <option value="${i}">${m.nombre}</option>
    `
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

  $("filtros").innerHTML = categorias.map(cat => `
    <button
      type="button"
      data-cat="${cat}"
      class="filter ${
        estado.categoria === cat ? "active" : ""
      }"
      aria-pressed="${
        estado.categoria === cat
      }">
      ${ICONOS[cat]} ${cat}
    </button>
  `).join("");
}

function mostrarCatalogo() {
  const busqueda = $("buscar").value
    .trim()
    .toLocaleLowerCase("es");

  const lista = MEDS
    .map((m, i) => ({m, i}))
    .filter(({m}) => {

      const coincideCategoria =
        estado.categoria === "Todos" ||
        estado.categoria === m.categoria;

      const contenido = [
        m.nombre,
        m.categoria,
        m.uso,
        m.mecanismo,
        m.comunes,
        m.graves
      ].join(" ").toLocaleLowerCase("es");

      return (
        coincideCategoria &&
        contenido.includes(busqueda)
      );
    });

  $("contador").textContent =
    lista.length + " medicamento(s)";

  $("sinResultados").hidden =
    lista.length > 0;

  $("catalogo").innerHTML = lista.map(({m, i}) => `
    <article class="drug-card">

      <div
        class="drug-visual"
        style="--drug-color:${
          COLORES[i % COLORES.length]
        }">

        <span class="drug-category">
          ${ICONOS[m.categoria]}
          ${m.categoria}
        </span>

        <span class="med-symbol" aria-hidden="true">
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
          <b>Efectos secundarios:</b>
          ${m.comunes}
        </p>

        <span class="drug-life">
          ◷ Vida media aproximada: ${m.vida} h
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

// ==================================================
// 7. FICHAS FARMACOLÓGICAS COMPLETADAS
// ==================================================

function abrirFicha(i) {
  const m = MEDS[i];

  if (!m) return;

  const tipos = {
    hidro: "Hidrofílica ilustrativa",
    lipo: "Lipofílica ilustrativa",
    mixta: "Mixta ilustrativa"
  };

  const urlDailyMed =
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
        ${ICONOS[m.categoria]}
        ${m.categoria}
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
          <strong>${tipos[m.distribucion]}</strong>
        </div>

        <div>
          <small>Ponderación renal didáctica</small>
          <strong>${Math.round(m.renal * 100)}%</strong>
        </div>
      </div>
    </div>

    <div class="ficha-content">

      ${seccion(
        "🧬 Mecanismo de acción",
        m.mecanismo
      )}

      ${seccion(
        "🩺 Usos terapéuticos",
        m.uso
      )}

      ${seccion(
        "💊 Efectos secundarios habituales",
        m.comunes
      )}

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

      ${seccion(
        "🛡️ Precauciones",
        m.precauciones
      )}

      ${seccion(
        "🔄 Interacciones medicamentosas",
        m.interacciones
      )}

      ${seccion(
        "📋 Vigilancia médica",
        m.vigilancia
      )}

      ${seccion(
        "⏳ Vida media y duración del efecto",
        `La vida media orientativa de ${m.nombre}
        es de ${m.vida} horas.
        Esto no significa que su efecto terapéutico
        dure exactamente ese tiempo.
        La duración del efecto puede ser distinta.`
      )}

      ${seccion(
        "🕒 Intervalo entre dosis",
        `FarmacoSim no determina cada cuántas
        horas debe administrarse ${m.nombre}.
        El intervalo entre dosis depende de una
        indicación médica específica.`
      )}

      ${seccion(
        "📅 Duración del tratamiento",
        `La cantidad de días o semanas durante
        los cuales se utiliza el medicamento
        no se calcula con esta simulación.`
      )}

      <div class="ficha-notice">
        Esta ficha es un resumen educativo,
        no un etiquetado regulatorio exhaustivo.
        Las contraindicaciones y reacciones adversas
        pueden variar según la presentación
        y las características del paciente.
      </div>

      <div class="ficha-actions">

        <a href="${urlDailyMed}"
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

// ==================================================
// 8. LEER Y VALIDAR PARÁMETROS
// ==================================================

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

function perfilValido(p) {
  return (
    $("peso").value.trim() !== "" &&
    Number.isFinite(p.peso) &&
    p.peso >= 20 &&
    p.peso <= 300 &&
    p.cantidad >= 20 &&
    p.cantidad <= 200 &&
    p.tiempo >= 1 &&
    p.tiempo <= 240 &&
    Number.isInteger(p.med) &&
    MEDS[p.med] !== undefined
  );
}

// ==================================================
// 9. MODELO MATEMÁTICO ILUSTRATIVO
// ==================================================

function calcularModelo(p) {
  const m = MEDS[p.med];

  // Factores hipotéticos, no clínicos.

  const factorCuerpo = {
    delgada: 0.88,
    media: 1,
    robusta: 1.18
  }[p.complexion];

  const factorEdad = {
    joven: 1.08,
    adulto: 1,
    mayor: 0.78
  }[p.edad];

  const factorRenal = {
    normal: 1,
    moderada: 0.72,
    alta: 0.42
  }[p.renal];

  const factorHepatico = {
    normal: 1,
    moderada: 0.75,
    alta: 0.45
  }[p.hepatica];

  // Factor de distribución aparente.
  const distribucion =
    (p.peso / 70) * factorCuerpo;

  // Valor inicial de concentración relativa.
  const inicial =
    p.cantidad / distribucion;

  // Modificador educativo de eliminación.
  const ajusteOrganos =
    m.renal * factorRenal +
    (1 - m.renal) * factorHepatico;

  // Constante de referencia.
  const kBase =
    Math.log(2) / m.vida;

  // Constante del perfil seleccionado.
  const k =
    kBase * factorEdad * ajusteOrganos;

  // Escenario con eliminación más lenta.
  const kLento =
    kBase * 0.65;

  // Decaimiento exponencial.
  const C = (inicio, constante, tiempo) =>
    inicio * Math.exp(-constante * tiempo);

  // Once puntos estadísticos.
  const filas = [];

  for (let i = 0; i <= 10; i++) {
    const t = p.tiempo * i / 10;

    filas.push({
      t,
      elegido: C(inicial, k, t),
      referencia: C(p.cantidad, kBase, t),
      lento: C(p.cantidad, kLento, t),
      restante: 100 * Math.exp(-k * t)
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
    vidaMedia: Math.log(2) / k,
    final: C(inicial, k, p.tiempo),
    restante: 100 * Math.exp(-k * p.tiempo),
    filas
  };
}

// ==================================================
// 10. GRÁFICA DINÁMICA SVG
// ==================================================

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

  let svg = "";

  // Eje de concentración relativa.
  for (let i = 0; i <= 5; i++) {
    const valor = maxY * i / 5;
    const y = Y(valor);

    svg += `
      <line
        x1="${L}" y1="${y}"
        x2="${W - R}" y2="${y}"
        stroke="#e4edf3"
      />

      <text
        x="${L-10}" y="${y+4}"
        text-anchor="end"
        font-size="11"
        fill="#8094a4">
        ${fmt(valor,1)}
      </text>
    `;
  }

  // Eje de tiempo.
  for (let i = 0; i <= 6; i++) {
    const t = maxT * i / 6;
    const x = X(t);

    svg += `
      <line
        x1="${x}" y1="${T}"
        x2="${x}" y2="${T+alto}"
        stroke="#edf2f7"
      />

      <text
        x="${x}" y="${H-23}"
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

  series.forEach((curva, indice) => {
    let path = "";

    for (let i = 0; i <= 160; i++) {
      const t = maxT * i / 160;

      const valor =
        curva.inicio * Math.exp(-curva.k * t);

      path +=
        `${i === 0 ? "M" : "L"} ` +
        `${X(t).toFixed(2)} ` +
        `${Y(valor).toFixed(2)} `;
    }

    svg += `
      <path
        d="${path}"
        fill="none"
        stroke="${curva.color}"
        stroke-width="${indice === 2 ? 4 : 2.7}"
        stroke-linecap="round"
        stroke-linejoin="round"
        ${
          indice === 1
            ? 'stroke-dasharray="8 5"'
            : ""
        }
      />
    `;
  });

  svg += `
    <text
      x="${W/2}" y="${H-3}"
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
      Concentración relativa
    </text>
  `;

  $("grafica").innerHTML = svg;
}

// ==================================================
// 11. ACTUALIZACIÓN DE TODOS LOS RESULTADOS
// ==================================================

function actualizar() {
  const p = leerPerfil();

  $("cantidadValor").textContent =
    fmt(p.cantidad,0);

  $("tiempoValor").textContent =
    p.tiempo + " horas";

  // Explicación de las tres curvas.
  $("explicacionTiempo").innerHTML = `
    <b>
      📈 ¿Qué muestra la gráfica durante las
      ${p.tiempo} horas?
    </b>

    <p>
      Muestra cómo disminuye la
      <strong>concentración relativa del medicamento</strong>
      desde la hora 0 hasta la hora ${p.tiempo},
      mediante un modelo matemático simplificado.
    </p>

    <p>
      🟢 <strong>Verde:</strong>
      perfil elegido, considerando el medicamento,
      peso, complexión, edad y funciones orgánicas.
    </p>

    <p>
      🔵 <strong>Azul:</strong>
      concentración de referencia basada en la
      vida media del medicamento, sin ajustes
      hipotéticos del perfil.
    </p>

    <p>
      🟠 <strong>Naranja:</strong>
      escenario hipotético de eliminación lenta,
      con una constante 35% menor que la referencia.
    </p>

    <p>
      <strong>Importante:</strong>
      estas ${p.tiempo} horas no indican
      cuándo termina el efecto terapéutico,
      cada cuánto se toma otra dosis
      ni durante cuántos días se utiliza.
    </p>
  `;

  // Validar entrada de peso.
  if (!perfilValido(p)) {
    $("error").textContent =
      "Introduce un peso entre 20 y 300 kg.";

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

  // Encabezado de la gráfica.
  $("resumenGrafica").textContent =
    `${r.med.nombre} · ${p.peso} kg · ` +
    `${p.complexion} · ${p.tiempo} horas`;

  // Redibujar curvas.
  dibujarGrafica(r);

  // Indicadores sin "u.a.".
  const indicadores = [
    [
      "Concentración relativa inicial",
      fmt(r.inicial,3)
    ],
    [
      "Concentración relativa final",
      fmt(r.final,3)
    ],
    [
      "Vida media hipotética",
      fmt(r.vidaMedia,2) + " h"
    ],
    [
      "Constante de eliminación",
      fmt(r.k,4) + " h⁻¹"
    ],
    [
      "Porcentaje restante",
      fmt(r.restante,2) + "%"
    ],
    [
      "Factor de distribución",
      fmt(r.distribucion,3) + "×"
    ]
  ];

  $("resultados").innerHTML =
    indicadores.map(([nombre,valor]) => `
      <article class="result-card">
        <small>${nombre}</small>
        <strong>${valor}</strong>
      </article>
    `).join("");

  // Interpretación.
  $("interpretacion").innerHTML = `
    <b>Interpretación educativa</b>

    <p>
      <b>Medicamento:</b>
      ${r.med.nombre}<br>

      <b>Peso seleccionado:</b>
      ${p.peso} kg<br>

      <b>Complexión:</b>
      ${p.complexion}<br>

      <b>Edad:</b>
      ${EDADES[p.edad]}<br>

      <b>Función renal:</b>
      ${p.renal}<br>

      <b>Función hepática:</b>
      ${p.hepatica}<br>

      <b>Periodo observado:</b>
      ${p.tiempo} horas
    </p>

    <p>
      La concentración relativa calculada
      disminuye de
      <b>${fmt(r.inicial,3)}</b>
      a
      <b>${fmt(r.final,3)}</b>
      durante el periodo seleccionado.
    </p>

    <p>
      Esto representa el
      <b>${fmt(r.restante,2)}%</b>
      de la concentración relativa inicial.
    </p>

    <p>
      La vida media de referencia es
      aproximadamente
      <b>${r.med.vida} horas</b>.
      Para este perfil, el modelo calcula
      una vida media hipotética de
      <b>${fmt(r.vidaMedia,2)} horas</b>.
    </p>

    <p>
      <b>Aclaración:</b>
      los valores son matemáticos relativos,
      no mediciones clínicas en sangre.
      Las horas observadas no determinan
      la duración del efecto, los intervalos
      entre dosis ni los días de tratamiento.
    </p>
  `;

  // Tabla sin "u.a.".
  $("tablaEstadisticas").innerHTML =
    r.filas.map(f => `
      <tr>
        <td>${fmt(f.t,1)} h</td>
        <td>${fmt(f.elegido,3)}</td>
        <td>${fmt(f.referencia,3)}</td>
        <td>${fmt(f.lento,3)}</td>
        <td>${fmt(f.restante,2)}%</td>
      </tr>
    `).join("");
}

// ==================================================
// 12. RESTABLECER VALORES
// ==================================================

function restablecer() {
  $("medicamento").value = "0";
  $("cantidad").value = "100";
  $("tiempo").value = "24";

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

  // Adulto + media = 75 kg ilustrativos.
  actualizarPesoSugerido();
}

// ==================================================
// 13. GENERADOR PDF SIN INTERNET
// ==================================================

function crearReportePDF(r) {
  const W = 595.28;
  const H = 841.89;
  const M = 45;

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
  let paginaActual = 0;

  function textoSeguro(valor) {
    return String(valor)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[\u2013\u2014]/g,"-")
      .replace(/[\u2018\u2019]/g,"'")
      .replace(/[^\x20-\x7e]/g," ")
      .replace(/\\/g,"\\\\")
      .replace(/\(/g,"\\(")
      .replace(/\)/g,"\\)");
  }

  function texto(
    s,x,py,
    size=10,
    bold=false,
    color=NAVY
  ) {
    contenido +=
      `BT /F${bold?2:1} ${n(size)} Tf ` +
      `${rgb(color)} rg ` +
      `1 0 0 1 ${n(x)} ${n(py)} Tm ` +
      `(${textoSeguro(s)}) Tj ET\n`;
  }

  function rect(x,py,w,h,color) {
    contenido +=
      `${rgb(color)} rg ` +
      `${n(x)} ${n(py)} ` +
      `${n(w)} ${n(h)} re f\n`;
  }

  function linea(
    x1,y1,x2,y2,
    color=[.85,.90,.94],
    grosor=1
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
    paginaActual++;

    // Encabezado.
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

    // Pie.
    linea(M,44,W-M,44);

    texto(
      "Modelo educativo | No clinico",
      M,28,8,false,GRIS
    );

    texto(
      "Pagina " + paginaActual,
      W-103,28,8,false,GRIS
    );

    y = 685;
  }

  function dividirTexto(s,limite=78) {
    const palabras = String(s).split(/\s+/);

    const lineas = [];
    let actual = "";

    for (const palabra of palabras) {
      const intento =
        (actual ? actual + " " : "") + palabra;

      if (
        intento.length > limite &&
        actual !== ""
      ) {
        lineas.push(actual);
        actual = palabra;
      } else {
        actual = intento;
      }
    }

    if (actual) lineas.push(actual);

    return lineas;
  }

  function asegurarEspacio(alto) {
    if (y - alto < 68) {
      nuevaPagina("Continuacion del reporte");
    }
  }

  function titulo(s) {
    asegurarEspacio(30);

    texto(
      s.toUpperCase(),
      M,y,12,true,VERDE
    );

    y -= 27;
  }

  function parrafo(s) {
    const lineas = dividirTexto(s);

    asegurarEspacio(lineas.length*15 + 14);

    for (const lineaTexto of lineas) {
      texto(
        lineaTexto,
        M,y,10,false,GRIS
      );

      y -= 15;
    }

    y -= 12;
  }

  function dato(etiqueta,valor) {
    asegurarEspacio(24);

    texto(
      etiqueta,
      M,y,10,true,NAVY
    );

    texto(
      String(valor),
      M+250,y,10,false,GRIS
    );

    y -= 23;
  }

  // ======================================
  // PÁGINA 1: PERFIL Y RESULTADOS
  // ======================================

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
  dato("Concentracion relativa base",fmt(r.perfil.cantidad,2));

  y -= 12;

  titulo("Indicadores calculados");

  dato(
    "Concentracion relativa inicial",
    fmt(r.inicial,3)
  );

  dato(
    "Concentracion relativa final",
    fmt(r.final,3)
  );

  dato(
    "Vida media hipotetica",
    fmt(r.vidaMedia,2)+" h"
  );

  dato(
    "Constante de eliminacion",
    fmt(r.k,4)+" h-1"
  );

  dato(
    "Porcentaje restante",
    fmt(r.restante,2)+"%"
  );

  dato(
    "Factor de distribucion",
    fmt(r.distribucion,3)+" x"
  );

  // ======================================
  // PÁGINA 2: GRÁFICA VECTORIAL
  // ======================================

  nuevaPagina("Curvas comparativas de eliminacion");

  titulo("Grafica de concentracion relativa");

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

  const Y = valor =>
    gy + valor / maxY * gh;

  // Cuadrícula horizontal.
  for (let i=0; i<=5; i++) {
    const yy = gy + gh*i/5;

    linea(
      gx,yy,gx+gw,yy,
      [.87,.91,.94],.6
    );

    texto(
      fmt(maxY*i/5,1),
      43,yy-3,8,false,GRIS
    );
  }

  // Cuadrícula vertical.
  for (let i=0; i<=5; i++) {
    const t = maxT*i/5;
    const xx = X(t);

    linea(
      xx,gy,xx,gy+gh,
      [.87,.91,.94],.6
    );

    texto(
      fmt(t,1),
      xx-6,gy-19,8,false,GRIS
    );
  }

  const curvas = [
    [
      r.perfil.cantidad,
      r.kBase,
      AZUL
    ],
    [
      r.perfil.cantidad,
      r.kLento,
      NARANJA
    ],
    [
      r.inicial,
      r.k,
      VERDE
    ]
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
    "Concentracion relativa",
    gx,gy+gh+17,10,false,GRIS
  );

  // Leyenda.
  linea(87,296,108,296,VERDE,3);
  texto("Perfil elegido",116,292,10);

  linea(235,296,256,296,AZUL,3);
  texto("Referencia",264,292,10);

  linea(371,296,392,296,NARANJA,3);
  texto("Lenta",400,292,10);

  y = 250;

  titulo("Que muestra la grafica");

  parrafo(
    "La grafica muestra como disminuye " +
    "la concentracion relativa de " +
    r.med.nombre +
    " desde la hora 0 hasta la hora " +
    r.perfil.tiempo +
    ". Los valores proceden de un " +
    "modelo matematico simplificado."
  );

  parrafo(
    "VERDE: perfil seleccionado. " +
    "AZUL: eliminacion de referencia. " +
    "NARANJA: escenario con constante de " +
    "eliminacion 35 por ciento menor " +
    "que la referencia."
  );

  parrafo(
    "El periodo de observacion no " +
    "determina cuando termina el efecto " +
    "del medicamento ni cada cuanto " +
    "debe administrarse."
  );

  // ======================================
  // PÁGINA 3: ESTADÍSTICAS
  // ======================================

  nuevaPagina("Tabla estadistica detallada");

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
    "Perfil",
    "Referencia",
    "Lenta",
    "Restante %"
  ];

  encabezados.forEach((encabezado,i) => {
    texto(
      encabezado,
      columnas[i],
      y-12,9,true,[1,1,1]
    );
  });

  y -= 43;

  r.filas.forEach((f,i) => {
    if (i % 2 === 0) {
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
        valor,
        columnas[j],
        y,9
      );
    });

    y -= 29;
  });

  y -= 25;

  titulo("Interpretacion de columnas");

  parrafo(
    "HORAS: tiempo transcurrido desde " +
    "el inicio de la simulacion."
  );

  parrafo(
    "PERFIL: concentracion relativa " +
    "calculada utilizando el peso, " +
    "la complexion, la edad y los " +
    "parametros seleccionados."
  );

  parrafo(
    "REFERENCIA: concentracion relativa " +
    "del modelo con la vida media " +
    "de referencia, sin ajustes."
  );

  parrafo(
    "LENTA: escenario didactico cuya " +
    "constante de eliminacion es " +
    "35 por ciento menor."
  );

  parrafo(
    "RESTANTE: porcentaje de " +
    "concentracion relativa que permanece " +
    "respecto al inicio. Los valores " +
    "no son mediciones clinicas."
  );

  // ======================================
  // PÁGINA 4: ACLARACIONES DE TIEMPO
  // ======================================

  nuevaPagina("Interpretacion de tiempos");

  titulo("Tiempo de simulacion");

  parrafo(
    "La grafica representa como disminuye " +
    "la concentracion relativa de " +
    r.med.nombre +
    " entre la hora 0 y la hora " +
    r.perfil.tiempo +
    ". El periodo inicial de 24 horas " +
    "es solamente un ajuste predeterminado."
  );

  titulo("Vida media");

  parrafo(
    "Es el tiempo aproximado en que la " +
    "concentracion disminuye un 50 por " +
    "ciento durante la fase de eliminacion."
  );

  parrafo(
    "La vida media de referencia de " +
    r.med.nombre +
    " es aproximadamente " +
    r.med.vida +
    " horas."
  );

  titulo("Duracion del efecto terapeutico");

  parrafo(
    "Es el periodo durante el cual " +
    "el medicamento produce su efecto " +
    "terapeutico. Puede ser diferente " +
    "de su vida media."
  );

  titulo("Intervalo entre dosis");

  parrafo(
    "Indica cada cuantas horas se administra " +
    "un medicamento segun prescripcion " +
    "profesional. No se obtiene directamente " +
    "de las curvas del simulador."
  );

  titulo("Duracion del tratamiento");

  parrafo(
    "Representa durante cuantos dias " +
    "o semanas debe utilizarse un " +
    "medicamento segun la indicacion medica."
  );

  titulo("Advertencia academica");

  parrafo(
    "FarmacoSim no establece dosis, " +
    "horarios ni duracion de tratamientos. " +
    "Observar un medicamento durante " +
    r.perfil.tiempo +
    " horas no significa administrarlo " +
    "cada " +
    r.perfil.tiempo +
    " horas ni que su efecto termine " +
    "al completar ese periodo."
  );

  // ======================================
  // PÁGINA 5: FICHA FARMACOLÓGICA
  // ======================================

  nuevaPagina("Ficha farmacologica ampliada");

  titulo("Medicamento: " + r.med.nombre);

  const apartados = [
    ["Mecanismo de accion",r.med.mecanismo],
    ["Usos terapeuticos",r.med.uso],
    ["Efectos secundarios",r.med.comunes],
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

  titulo("Limitaciones");

  parrafo(
    "Esta ficha es un resumen educativo. " +
    "No incluye necesariamente todas las " +
    "advertencias, contraindicaciones " +
    "o reacciones adversas del producto."
  );

  parrafo(
    "El modelo utiliza valores de vida media " +
    "orientativos y factores hipoteticos. " +
    "No permite determinar dosis ni " +
    "predecir resultados clinicos."
  );

  parrafo(
    "Consulta el etiquetado vigente en: " +
    "https://dailymed.nlm.nih.gov/dailymed/"
  );

  // Guardar última página.
  if (contenido) {
    paginas.push(contenido);
  }

  // ======================================
  // ARMADO DEL ARCHIVO PDF
  // ======================================

  const objetos = [null];

  function agregar(contenidoObjeto) {
    objetos.push(contenidoObjeto);
    return objetos.length - 1;
  }

  const catalogo = agregar("");
  const paginasObjeto = agregar("");

  const fuenteNormal = agregar(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
  );

  const fuenteNegrita = agregar(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"
  );

  const idsPaginas = [];

  paginas.forEach(comandos => {
    // Longitud calculada en bytes.
    const contenidoStream = comandos + "\n";

    const largo = new TextEncoder()
      .encode(contenidoStream).length;

    const stream = agregar(
      `<< /Length ${largo} >>\n` +
      `stream\n${contenidoStream}endstream`
    );

    const pagina = agregar(
      `<< /Type /Page /Parent ${paginasObjeto} 0 R ` +
      `/MediaBox [0 0 ${W} ${H}] ` +
      `/Resources << /Font << ` +
      `/F1 ${fuenteNormal} 0 R ` +
      `/F2 ${fuenteNegrita} 0 R >> >> ` +
      `/Contents ${stream} 0 R >>`
    );

    idsPaginas.push(pagina);
  });

  objetos[catalogo] =
    `<< /Type /Catalog /Pages ${paginasObjeto} 0 R >>`;

  objetos[paginasObjeto] =
    `<< /Type /Pages /Kids [` +
    idsPaginas.map(i => `${i} 0 R`).join(" ") +
    `] /Count ${idsPaginas.length} >>`;

  const encoder = new TextEncoder();

  const bloques = [];
  const offsets = [0];

  let totalBytes = 0;

  function escribir(s) {
    const bytes = encoder.encode(s);

    bloques.push(bytes);
    totalBytes += bytes.length;
  }

  escribir("%PDF-1.4\n");

  for (let i = 1; i < objetos.length; i++) {
    offsets[i] = totalBytes;

    escribir(
      `${i} 0 obj\n${objetos[i]}\nendobj\n`
    );
  }

  const inicioXref = totalBytes;

  escribir(`xref\n0 ${objetos.length}\n`);
  escribir("0000000000 65535 f \n");

  for (let i = 1; i < objetos.length; i++) {
    escribir(
      String(offsets[i]).padStart(10,"0") +
      " 00000 n \n"
    );
  }

  escribir(
    `trailer\n` +
    `<< /Size ${objetos.length} ` +
    `/Root ${catalogo} 0 R >>\n` +
    `startxref\n${inicioXref}\n%%EOF`
  );

  const salida = new Uint8Array(totalBytes);

  let posicion = 0;

  for (const bloque of bloques) {
    salida.set(bloque,posicion);
    posicion += bloque.length;
  }

  return salida;
}

// ==================================================
// 14. DESCARGAR REPORTE PDF
// ==================================================

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

    const nombre = r.med.nombre
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[^a-zA-Z0-9]/g,"_");

    const enlace =
      document.createElement("a");

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
      "Error al generar PDF:",
      error
    );

    alert(
      "No se pudo generar el PDF: " +
      error.message
    );
  }
}

// ==================================================
// 15. EVENTOS DEL SISTEMA
// ==================================================

function iniciar() {
  iniciarCatalogo();

  // Actualizar al modificar controles.
  [
    "medicamento",
    "cantidad",
    "tiempo",
    "peso",
    "renal",
    "hepatica"
  ].forEach(id => {
    $(id).addEventListener(
      "input",
      actualizar
    );

    $(id).addEventListener(
      "change",
      actualizar
    );
  });

  // Buscador.
  $("buscar").addEventListener(
    "input",
    mostrarCatalogo
  );

  // Filtros.
  $("filtros").addEventListener("click",e => {
    const boton = e.target.closest("[data-cat]");

    if (!boton) return;

    estado.categoria = boton.dataset.cat;

    crearFiltros();
    mostrarCatalogo();
  });

  // Tarjetas.
  $("catalogo").addEventListener("click",e => {
    const ficha = e.target.closest("[data-ficha]");
    const elegir = e.target.closest("[data-elegir]");

    if (ficha) {
      abrirFicha(Number(ficha.dataset.ficha));
    }

    if (elegir) {
      seleccionarMedicamento(
        Number(elegir.dataset.elegir)
      );
    }
  });

  // Botón simular de una ficha.
  $("ficha").addEventListener("click",e => {
    const boton = e.target.closest("[data-elegir]");

    if (!boton) return;

    seleccionarMedicamento(
      Number(boton.dataset.elegir)
    );
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

  // ========================================
  // CAMBIAR COMPLEXIÓN Y PESO AUTOMÁTICO
  // ========================================

  $("complexionOptions").addEventListener(
    "click",
    e => {
      const boton =
        e.target.closest("[data-complexion]");

      if (!boton) return;

      estado.complexion =
        boton.dataset.complexion;

      seleccionarOpcion(
        "complexionOptions",
        "data-complexion",
        estado.complexion
      );

      // Asignar peso para edad + complexión.
      actualizarPesoSugerido();
    }
  );

  // ========================================
  // CAMBIAR EDAD Y PESO AUTOMÁTICO
  // ========================================

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

      // Asignar peso para edad + complexión.
      actualizarPesoSugerido();
    }
  );

  // Restablecer.
  $("restablecer").addEventListener(
    "click",
    restablecer
  );

  // Descargar PDF desde ambos botones.
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
  ).forEach(enlace => {
    enlace.addEventListener("click",() => {
      $("sidebar").classList.remove("open");
    });
  });

  // ========================================
  // CONFIGURACIÓN INICIAL COHERENTE
  // ========================================

  estado.edad = "adulto";
  estado.complexion = "media";

  seleccionarOpcion(
    "edadOptions",
    "data-edad",
    "adulto"
  );

  seleccionarOpcion(
    "complexionOptions",
    "data-complexion",
    "media"
  );

  // Adulto + media = 75 kg.
  actualizarPesoSugerido();
}

// ==================================================
// 16. INICIAR FARMACOSIM
// ==================================================

document.addEventListener(
  "DOMContentLoaded",
  iniciar
);
