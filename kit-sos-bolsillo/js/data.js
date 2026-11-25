/**
 * Contenido de la app. Para agregar o editar situaciones, cambia solo este archivo.
 *
 * situations[id] = {
 *   category   -> id de una categoria (ver "categories")
 *   risk       -> true muestra el aviso con el *4141 al final
 *   emoji, title, subtitle, color -> como se ve la tarjeta
 *   breathing  -> true muestra el circulo de respiracion
 *   steps      -> lista de pasos
 *   message    -> mensaje sugerido para copiar ('' si no lleva)
 * }
 */
window.KitSOS = window.KitSOS || {};

KitSOS.data = (function () {
  'use strict';

  var categories = [
    ['all', 'Todo'],
    ['animo', 'Ánimo'],
    ['convivencia', 'Convivencia'],
    ['rutinas', 'Rutinas'],
    ['casa', 'Vida en casa'],
    ['estudio', 'Estudio y taller'],
    ['apoyos', 'Apoyos']
  ];

  var tips = [
    'Bajar las revoluciones un minuto antes de responder suele ahorrar más de un problema.',
    'Hoy no tienes que resolver todo: basta con un paso pequeño y real.',
    'Pedir apoyo o poner un límite a tiempo también es una forma de cuidarte.',
    'Si estás cansado/a, ordenar solo un rincón pequeño ya marca una diferencia.',
    'Tu ritmo importa: avanzar despacio también es avanzar.',
    'Si necesitas algo, anótalo y pídeselo a tu ETD con calma.',
    'Conversar con alguien de confianza ayuda a ordenar lo que sientes.'
  ];

  var situations = {
    s1: {
      category: 'animo',
      risk: true,
      emoji: '🌊',
      title: 'No puedo más ahora',
      subtitle: 'Pausa rápida y anclaje',
      color: '#FFB4A2',
      breathing: true,
      steps: [
        'Apoya los pies firmes en el suelo y nombra 5 cosas que ves, 4 que puedes tocar y 3 sonidos cerca.',
        'Sigue el círculo de respiración: inhala 4 segundos y exhala lento en 6, un par de vueltas.',
        'Cuando baje la intensidad, busca un lugar tranquilo o avisa a tu ETD o a una persona de confianza.'
      ],
      message: 'Estoy pasando por un momento pesado y necesito bajar un cambio. ¿Podemos hablar un rato?'
    },
    s7: {
      category: 'animo',
      emoji: '🌙',
      title: 'Me cuesta dormir',
      subtitle: 'Cerrar el día sin tanta carga',
      color: '#C7B8FF',
      steps: [
        'Baja el brillo de las pantallas y suelta lo pendiente que no puedes resolver de noche.',
        'Anota en una hoja o en Mi plan lo que te quedó dando vueltas para retomarlo mañana.',
        'Haz respiraciones lentas y largas hasta que el cuerpo sienta que el día ya terminó.'
      ],
      message: ''
    },
    s10: {
      category: 'animo',
      emoji: '🚶',
      title: 'Quiero moverme o despejarme',
      subtitle: 'Soltar tensión sin exigencias',
      color: '#7EC6C0',
      steps: [
        'Muévete un rato corto (5 a 10 minutos) en un espacio permitido, sin exigirte rendimiento.',
        'Estira cuello, hombros y espalda mientras caminas a tu ritmo.',
        'Vuelve a tu actividad cuando sientas la cabeza un poco más despejada.'
      ],
      message: 'Voy a dar una vuelta corta para despejarme un rato.'
    },
    s2: {
      category: 'convivencia',
      risk: true,
      emoji: '💬',
      title: 'Tuve un roce o discusión',
      subtitle: 'Frenar en caliente y ordenar',
      color: '#FFD166',
      steps: [
        'Haz una pausa antes de contestar: no tienes que cerrar el tema en medio del enojo.',
        'Ordena por dentro: ¿qué pasó?, ¿qué sentí en el cuerpo? y ¿qué necesito ahora?',
        'Cuando estén más calmados, conversen con respeto o pide a tu ETD que ayude a mediar.'
      ],
      message: 'Tuvimos un roce y prefiero que hablemos cuando estemos más tranquilos para entendernos bien.'
    },
    s3: {
      category: 'convivencia',
      emoji: '🫂',
      title: 'Me siento solo/a o apartado/a',
      subtitle: 'Validar lo que sientes y conectar',
      color: '#A8DCF0',
      steps: [
        'Sentirse solo/a es una emoción real y pasajera; no define tu valor ni tu lugar.',
        'Haz un gesto pequeño de cercanía con alguien de tu red o súmate a algo sencillo del grupo.',
        'Si la sensación pesa mucho, compártela con tu ETD o con una persona de confianza.'
      ],
      message: 'Hoy me siento un poco solo/a. ¿Conversamos o hacemos algo tranquilos un rato?'
    },
    s6: {
      category: 'convivencia',
      emoji: '🛡️',
      title: 'Me cuesta poner o respetar un límite',
      subtitle: 'Cuidar el espacio propio y ajeno',
      color: '#CFECE8',
      steps: [
        'Pide un momento de espacio si alguien invade tu tiempo, tus cosas o tu calma.',
        'Expresa el límite con frases cortas y claras, sin atacar ni entrar en provocaciones.',
        'Si no se respeta, apóyate en tu ETD.'
      ],
      message: 'Necesito que cuidemos este espacio y los acuerdos para que estemos bien.'
    },
    s9: {
      category: 'rutinas',
      emoji: '⚡',
      title: 'Me cuesta empezar',
      subtitle: 'Regla de 2 a 3 minutos',
      color: '#FFD166',
      steps: [
        'Elige solo una tarea pendiente y comprométete a empezar por 2 o 3 minutos.',
        'No busques hacerlo perfecto de una: el objetivo es romper el bloqueo inicial.',
        'Si pasados esos minutos necesitas parar, hazlo sin culparte.'
      ],
      message: 'Me cuesta arrancar con esta tarea hoy. ¿Me ayudas a dar el primer paso?'
    },
    s12: {
      category: 'rutinas',
      emoji: '🧺',
      title: 'Ordenar mi espacio o ropa',
      subtitle: 'Un rincón pequeño, sin agobio',
      color: '#7EC6C0',
      steps: [
        'Elige solo un punto: la cama, la mochila, el escritorio o la ropa.',
        'Pon un tiempo breve (5 a 10 minutos) y avanza en lo más visible.',
        'Deja el resto para otro momento si ya te cansaste.'
      ],
      message: ''
    },
    s8: {
      category: 'rutinas',
      emoji: '🗓️',
      title: 'Organizar mi semana',
      subtitle: 'Prioridades claras y descanso',
      color: '#C7B8FF',
      steps: [
        'Anota solo 2 o 3 cosas importantes para la semana, sin saturar la agenda.',
        'Reserva un espacio real de descanso para no llegar agotado/a.',
        'Ajusta el plan si surge algún imprevisto.'
      ],
      message: ''
    },
    s13: {
      category: 'casa',
      emoji: '🍽️',
      title: 'Quiero opinar sobre las comidas',
      subtitle: 'Proponer con calma',
      color: '#FFB4A2',
      steps: [
        'Piensa qué comidas te gustan, cuáles no te caen bien y si hay algo que quieras proponer.',
        'Elige un momento tranquilo para conversarlo con tu ETD, no en medio de una comida apurada.',
        'Plantéalo como propuesta concreta y escucha qué se puede y qué no.'
      ],
      message: 'Quería proponer una idea para las comidas. ¿Tienes un momento para conversarlo?'
    },
    s14: {
      category: 'casa',
      emoji: '🎒',
      title: 'Necesito algo y no sé cómo pedirlo',
      subtitle: 'Ropa, útiles, aseo u otra cosa',
      color: '#FFE08A',
      steps: [
        'Anota qué necesitas y para qué lo necesitas.',
        'Elige un momento tranquilo y cuéntaselo a tu ETD.',
        'Pregunta cómo y cuándo se puede resolver, y anota lo que te respondan.'
      ],
      message: 'Necesito algo y quiero saber cómo se puede pedir o conseguir. ¿Me ayudas?'
    },
    s15: {
      category: 'casa',
      emoji: '🧾',
      title: 'Un trámite o documento me tiene perdido/a',
      subtitle: 'Bajar la carga paso a paso',
      color: '#9FE3D0',
      steps: [
        'Anota qué te piden y dónde (máximo 3 cosas urgentes).',
        'Elige una y define su primer paso de 10 minutos.',
        'Pide ayuda a tu ETD para lo que no entiendas.'
      ],
      message: 'Tengo un trámite o documento que no entiendo bien. ¿Me ayudas a verlo?'
    },
    s11: {
      category: 'estudio',
      emoji: '📚',
      title: 'No me puedo concentrar',
      subtitle: 'Bloques cortos y una sola meta',
      color: '#A8DCF0',
      steps: [
        'Aleja distracciones por un bloque de 20 a 25 minutos.',
        'Define una sola consigna concreta para ese bloque.',
        'Descansa 5 minutos al terminar: estírate y toma agua.'
      ],
      message: 'Necesito concentrarme un rato en esto. ¿Me das un espacio tranquilo para avanzar?'
    },
    s4: {
      category: 'estudio',
      emoji: '🎯',
      title: 'Frustración por notas o tareas',
      subtitle: 'Bajar la autoexigencia rígida',
      color: '#FFB4A2',
      steps: [
        'Una nota difícil no significa que no sirvas: muestra dónde necesitas apoyo.',
        'Identifica qué parte exacta no se entiende: una pregunta, una instrucción o el tiempo.',
        'Pide orientación a tu profesor/a o a tu ETD sobre ese punto específico.'
      ],
      message: 'Estoy frustrado/a con una tarea o materia. ¿Me ayudas a entender por dónde partir?'
    },
    s5: {
      category: 'apoyos',
      risk: true,
      emoji: '🤝',
      title: 'Necesito pedir ayuda y no sé cómo',
      subtitle: 'Apoyos reales en tu presente',
      color: '#CFECE8',
      steps: [
        'Reconoce qué necesitas hoy: conversar, ordenar algo, mediar un conflicto o pedir orientación.',
        'Acude a tu ETD, a otro adulto de confianza o revisa Mi red.',
        'Si necesitas orientación adicional, puedes llamar al *4141 o al 1515 (Línea Libre).'
      ],
      message: 'Necesito pedir ayuda por algo que me está pasando y no sé bien cómo explicarlo. ¿Me escuchas un momento?'
    }
  };

  var contacts = [
    ['r1', 'Mi ETD de referencia'],
    ['r2', 'Otro ETD o adulto de confianza'],
    ['r3', 'Amistad o contacto de apoyo']
  ];

  var planFields = [
    ['p1', 'Cuando me noto sobrepasado/a o con rabia, las señales en mí son…'],
    ['p2', 'Lo que me ayuda a bajar un cambio es…'],
    ['p3', 'Un lugar o momento tranquilo para mí es…'],
    ['p4', 'A quién puedo recurrir hoy (por ejemplo, mi ETD) es…']
  ];

  /* Líneas de ayuda. inHelp: aparece en la pantalla "Pausa y apoyo". */
  var helplines = [
    {
      number: '*4141',
      title: '*4141 · Apoyo emocional y prevención del suicidio',
      description: 'Gratis, confidencial y las 24 horas.',
      highlight: true,
      inHelp: true
    },
    {
      number: '1515',
      title: '1515 · Línea Libre',
      description: 'Apoyo para niños, niñas y jóvenes.',
      inHelp: true
    },
    {
      number: '800200818',
      title: '800 200 818 · Fono Infancia',
      description: 'Orientación psicológica gratuita.'
    }
  ];

  var emergency = [
    { number: '131', label: '131 Ambulancia' },
    { number: '133', label: '133 Carabineros' }
  ];

  return {
    categories: categories,
    tips: tips,
    situations: situations,
    contacts: contacts,
    planFields: planFields,
    helplines: helplines,
    emergency: emergency
  };
})();
