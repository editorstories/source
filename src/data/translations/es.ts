// es.ts
// src/data/translations/es.ts
import { es_skills_list } from './sections/skills.sp';
export const es = {
//    nav: {
//      home: 'Inicio',
//      about: 'Acerca',
//      projects: 'Proyectos',
//      skills: 'Habilidades',
//      experience: 'Experiencia',
//      contact: 'Contacto',
//      timeline: 'Cronología'
//    },




    // Navigation
    'nav.intro.title': 'Diseñador UX & desarrollador',
    'nav.hero.title': 'Inicio',
    'nav.hero.preview': 'Bienvenido... Comienza tu viaje aquí.',
    'nav.hero.short': 'Inicio',

    'nav.skills.title': 'Habilidades',
    'nav.skills.preview': 'Explora 100+ tecnologías, frameworks y herramientas que domino.',
    'nav.skills.short': 'Skills',

    'nav.somnlogg.title': 'Somnlogg',
    'nav.somnlogg.preview': 'Estudio de caso UX de seguimiento del sueño con prototipos interactivos.',
    'nav.somnlogg.short': 'Trabajo',

    'nav.education.title': 'Educación',
    'nav.education.preview': 'Antecedentes académicos con línea de tiempo y conexiones de habilidades.',
    'nav.education.short': 'Educación',

    'nav.qna.title': 'Preguntas',
    'nav.qna.preview': 'Preguntas frecuentes con categorización inteligente.',
    'nav.qna.short': 'Q&A',

    'nav.youAreHere': 'Estás aquí',
    'nav.openMenu': 'Abrir menú de navegación',
    'nav.close': 'Cerrar',

    // Add more translations as needed








    nav: {
      intro: {
        title: 'Diseñador UX & desarrollador'
      },
      hero: {
        title: 'Inicio',
        preview: 'Bienvenido a mi porfolio. Comienza tu viaje aquí',
        short: 'Inicio'
      },
      skills: {
        title: 'Habilidades',
        preview: 'Explora 100+ tecnologías, frameworks y herramientas que domino.',
        short: 'Habilidades'
      },
      somnlogg: {
        title: 'Somnlogg',
        preview: 'Estudio de caso UX de seguimiento del sueño con prototipos interactivos.',
        short: 'Trabajo'
      },
      education: {
        title: 'Educación',
        preview: 'Antecedentes académicos con línea de tiempo y conexiones de habilidades.',
        short: 'Educación'
      },
      qna: {
        title: 'Preguntas',
        preview: 'Preguntas frecuentes con categorización inteligente.',
        short: 'Preguntas'
      },
      youAreHere: 'Estás aquí',
      openMenu: 'Abrir menú de navegación',
      close: 'Cerrar'
    },

    heroSection: {
      title1a: 'ux diseñador',
      title1b: '& desarollador',
      subtitle:'...desintegrando la complejidad'
    },




    hero: {
      greeting: 'Hola, soy',
      name: 'Nombre',
      title: 'Desarrollador Full-Stack',
      subtitle: 'Creando soluciones innovadoras con tecnologías modernas',
      cta: 'Trabajo',
      scrollDown: 'Desplazar hacia abajo'
    },
    about: {
      title: 'Acerca',
      description: 'Desarrollador apasionado con experiencia en tecnologías web modernas',
      location: 'Estocolmo, Suecia',
      experience: 'Años de experiencia',
      projects: 'Proyectos completados',
      clients: 'Clientes satisfechos'
    },
    // src/data/translations/en.ts
    skills: {
      title: 'habilidades y tecnologías',
      subtitle: 'herramientas y tecnologías con las que trabajo',
      // Search and filters
      search: {
        placeholder: 'Habilidades, categorias o frases',
        results: {
          zero: "Null resultados por ahora, intenta con 'Todas' en el menú de abajo y busca de nuevo.",
          one: '{count} resultados',
          other: '{count} resultados'
        },
        noResults: "Null resultado. Quizas sinonimos o frases. Asegúrate de buscar también en 'Todas' en el menú de arriba."
      },
      // View modes
      viewModes: {
        grid: 'Net',
        compact: 'Lista',
        detailed: 'Cartas'
      },

      // Categories
      categories: {
        all: 'Todas',
        uxui: 'UX/UI',
        frontend: 'Frontend',
        backend: 'Backend',
        mobile: 'Mobil',
        tools: 'Herramientas',
        soft: 'Abstractas',
        ai: 'AI (en progreso)'
      },
      // Skill counter
      counter: {
        showing: '{visible} de {total}',
        remaining: {
          zero: 'Reached infinity',
          one: 'Descubre {count} mas habilidades...',
          other: 'Descubre {count} mas habilidades...'
        }
      },
      // Proficiency
      proficiency: 'Proficiencia',
      // Actions
      loadMore: 'Carga mas...',
      clearSearch: 'Empezar',

      list: es_skills_list
    },









    //Collection
    sectionLabel: {
      collection: 'colección'
    },




    // ============================================================
    // AÑADIR ESTE BLOQUE DENTRO DE es = { ... } en es.ts
    // Reemplazar o complementar la clave "education" existente
    // ============================================================

    education: {
      title: 'trayectoria formativa',
      subtitle: 'Una visión completa de mi camino académico, desarrollo de habilidades y logros a través de diversas instituciones y plataformas.',
      show: {
        more: 'mostrar más educación',
        less: 'mostrar menos'
      },
      phases: {
        foundation: 'Años de fundación',
        specialization: 'Especialización',
        intensive: 'Programa intensivo',
        backend: 'Enfoque backend',
        core: 'Principios fundamentales',
        programming: 'Programación',
        design: 'Diseño',
        security: 'Enfoque en seguridad',
      },

      BTH: {
        degree: 'Diseño visual, gestión de productos y desarrollo móvil — cursos en programación de interfaces, gestión de requisitos para productos digitales y desarrollo de apps multiplataforma con React Native.',
        phase1: 'Años de fundación',
        phase2: 'Especialización',
        narrative: 'Uniendo tecnología y diseño mediante resolución creativa de problemas y enfoques centrados en el usuario.',
      },
      HB: {
        degree: 'UX y diseño de información — profundización en diseño de interacción, front-end, diseño gráfico informacional, gestión de contenidos, política informativa y trabajo de proyecto en UX.',
        phase1: 'Programa intensivo',
        narrative: 'Dominio de metodologías de diseño centradas en el ser humano para la resolución de problemas complejos.',
      },
      HiG: {
        degree: 'Programación orientada a objetos en Java — programación fundamental y aplicada con foco en algoritmos, estructuras de datos y desarrollo de software.',
        phase1: 'Enfoque backend',
        narrative: 'Sólida base en programación orientada a objetos y arquitectura de software.',
      },
      Hkr: {
        degree: 'UX digital y desarrollo web — diseño de experiencias digitales, programación en JavaScript, seguridad de datos y desarrollo de juegos para Android.',
        phase1: 'Principios fundamentales de UX',
        narrative: 'Comprensión profunda de la psicología del usuario y principios de diseño inclusivo.',
      },
      KAU: {
        degree: 'Programación aplicada y calidad del software — cursos en programación aplicada, pruebas de software e ingeniería de privacidad con foco en código sostenible.',
        phase1: 'Programación',
        narrative: 'Aplicación de prácticas estándar de la industria y desarrollo basado en pruebas.',
      },
      KTH: {
        degree: 'Tecnología de medios e IA generativa — curso en IA generativa para tecnología de medios y diseño de interacción, con foco en herramientas de IA en medios creativos e interactivos.',
        phase1: 'Programa intensivo',
        narrative: 'Exploración del papel de la IA en el futuro del diseño de interacción y la producción multimedia.',
      },
      LIU: {
        degree: 'IA y seguridad de datos — cursos introductorios en inteligencia artificial y seguridad de datos vinculados al diseño digital y la ética.',
        phase1: 'Enfoque en seguridad',
        narrative: 'Comprensión básica de perspectivas de seguridad e IA en sistemas digitales.',
      },
      Lnu: {
        degree: 'Diseño multimedia y desarrollo de apps — pensamiento sistémico, diseño y producción multimedia y desarrollo de apps con Flutter para plataformas móviles.',
        phase1: 'Diseño',
        narrative: 'Profundización en pensamiento sistémico y expresión multimodal.',
      },
      Ltu: {
        degree: 'Diseño de juegos, Java y gestión del conocimiento — cursos en diseño de juegos, producción de videojuegos, programación en Java, gestión del conocimiento y bases de datos.',
        phase1: 'Diseño y tecnología',
        narrative: 'Amplia base técnica y creativa en juegos, programación y gestión de la información.',
      },
      MAU: {
        degree: 'Programación en C# e innovación digital — programación con C# e innovación digital y emprendimiento en entornos tecnológicos.',
        phase1: 'Diseño',
        narrative: 'Combinación de programación orientada a objetos y pensamiento innovador.',
      },
      MIUN: {
        degree: 'XML, informática y soluciones digitales innovadoras — cursos de informática con foco en XML e informática orientada hacia soluciones digitales innovadoras.',
        phase1: 'Diseño',
        narrative: 'Comprensión de la estructuración de datos y los procesos de innovación digital.',
      },
      SH: {
        degree: 'Diseño de medios, diseño de interacción e interacción humano-computadora — amplia formación en diseño gráfico, producción web, diseño de interacción, HCI, ilustración digital y gestaltación multimodal.',
        phase1: 'Diseño',
        narrative: 'Competencia versátil en creación digital, desde identidad visual hasta sistemas interactivos.',
      },
      UU: {
        degree: 'Programación de sistemas en C++ — curso introductorio en computadoras y programación con C++, con foco en gestión de memoria y programación de bajo nivel.',
        phase1: 'Programación',
        narrative: 'Visión de la programación a nivel de sistema y arquitectura de computadoras.',
      },
    },











    projects: {
      title: 'Proyectos destacados',
      subtitle: 'Algunos de mis trabajos recientes',
      viewProject: 'Ver proyecto',
      viewCode: 'Ver código',
      allProjects: 'Todos los proyectos',
      categories: {
        all: 'Todos',
        web: 'Apps Web',
        mobile: 'Móvil',
        api: 'APIs',
        tools: 'Herramientas'
      }
    },
    contact: {
      title: 'Ponte en contacto',
      subtitle: 'Trabajemos juntos en tu próximo proyecto',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      success: '¡Mensaje enviado exitosamente!',
      error: 'Error al enviar el mensaje. Inténtalo de nuevo.'
    },
    timeline: {
      title: 'Trayectoria',
      subtitle: 'Hitos profesionales y educativos'
    },
    phases: {
      learning: 'Fase de aprendizaje',
      building: 'Fase de construcción',
      mastering: 'Fase de dominio',
      innovating: 'Fase de innovación'
    },
    footer: {
      rights: 'Todos los derechos reservados',
      builtWith: 'Construido con',
      madeWith: 'Hecho con'
    },


    // QnA
    qna: {
      title: 'explora sinergias',
      subtitle: 'elige lo que más importa',
      readTime: 'min de lectura',
      relatedQuestions: 'también podrías querer saber',
      pathLabel: {
        work: 'Modalidades de trabajo',
        journey: 'Mi viaje de aprendizaje',
        location: 'Ubicación y Remoto',
        offer: 'Lo que ofrezco',
        start: 'Primeros pasos',
        collaboration: 'Colaboración',
        value: 'Valor',
      },
      askMore: 'Contáctame',
      askMoreCta: 'usa mi correo original - o reserva un tiempo, llamada de 10-15 min',
      today: 'hoy,',
      timeOfDay: {
        morning:   'por la mañana',
        afternoon: 'por la  tarde',
        evening:   'por la  noche',
      },
      days: {
        0: 'domingo', 1: 'lunes', 2: 'martes',  3: 'miércoles',
        4: 'jueves', 5: 'viernes', 6: 'sábado',
      },
      progress: 'explorado',
      summary: {
        title: 'Basado en lo que exploraste',
        intro: 'Esto es lo que destaca',
        close: 'Cerrar',
      },
      paths: {
        work: { title: 'Trabajo'},
        journey: { title:'Viaje'},
        location: { title:'Ubicación'},
        offer: { title:'Oferta'},
        start: { title:'Inicio'},
        collaboration : { title:'Estilo de colaboración'},
        value: { title:'Valor'},
    },
    },
};