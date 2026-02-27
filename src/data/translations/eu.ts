// en.ts
// src/data/translations/en.ts
import { eu_skills_list } from './sections/skills.eu';


export const eu = {
//  nav: {
//    home: 'Home',
//    about: 'About',
//    projects: 'Projects',
//    skills: 'Skills',
//    experience: 'Experience',
//    contact: 'Contact',
//    timeline: 'Timeline'
//  },




  // Navigation
  'nav.intro.title': 'UX designer & developer',
  'nav.hero.title': 'Home',
  'nav.hero.preview': 'Welcome to ... Start your journey here.',
  'nav.hero.short': 'Home',

  'nav.skills.title': 'Skills',
  'nav.skills.preview': 'Explore 100+ technologies, frameworks, and tools I master.',
  'nav.skills.short': 'Skills',

  'nav.somnlogg.title': 'Somnlogg',
  'nav.somnlogg.preview': 'Sleep tracking UX case study with interactive prototypes.',
  'nav.somnlogg.short': 'Work',

  'nav.education.title': 'Education',
  'nav.education.preview': 'Academic background with timeline and skill connections.',
  'nav.education.short': 'Education',

  'nav.qna.title': 'Q&A',
  'nav.qna.preview': 'Frequently asked questions with smart categorisation.',
  'nav.qna.short': 'Q&A',

  'nav.youAreHere': 'You are here',
  'nav.openMenu': 'Open navigation menu',
  'nav.close': 'Close',

  // Add more translations as needed



  // src/data/translations/sv.ts
  nav: {
    intro: {
      title: 'UX designer & developer'
    },
    hero: {
      title: 'Home',
      preview: 'Welcome to my portfolio. Start your journey here.',
      short: 'Home'
    },
    skills: {
      title: 'Skills',
      preview: 'Explore 100+ technologies, frameworks, and tools I master',
      short: 'Skills'
    },
    somnlogg: {
      title: 'Somnlogg',
      preview: 'Sleep tracking UX case study with interactive prototypes.',
      short: 'Work'
    },
    education: {
      title: 'Education',
      preview: 'Academic background with timeline and skill connections.',
      short: 'Education'
    },
    qna: {
      title: 'Q&A',
      preview: 'Frequently asked questions with smart categorisation.',
      short: 'Q&A'
    },
    youAreHere: 'You are here',
    openMenu: 'Open navigation menu',
    close: 'Close'
  },



  heroSection: {
      title1a: 'ux designer',
      title1b: '& developer',
      subtitle:'...spiraling out of complexity'
    },




  hero: {
    greeting: 'Hello...',
    name: 'Name',
    title: 'Full-Stack Developer',
    subtitle: 'Creating innovative solutions with modern technologies',
    cta: 'ViewWork',
    scrollDown: 'Scroll Down'
  },
  about: {
    title: 'About',
    description: 'Passionate developer with expertise in modern web technologies',
    location: 'Stockholm, Sweden',
    experience: 'Years Experience',
    projects: 'Projects Completed',
    clients: '...'
  },
  // src/data/translations/en.ts
  skills: {
    title: 'skills & technologies',
    subtitle: 'tools and technologies I work with',
    // Search and filters
    search: {
      placeholder: 'Skill, category or keyword',
      results: {
        zero: "Null resultat for now, try 'All' in the menu below and search again",
        one: '{count} results found',
        other: '{count} results found'
      },
      noResults: "Null result. Perhaps other synonyms or keywords. Make sure to also search in 'All' in the menu above"
    },
    // View modes
    viewModes: {
      grid: 'Grid',
      compact: 'List',
      detailed: 'Card'
    },

    // Categories
    categories: {
      all: 'All',
      uxui: 'UX/UI',
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile',
      tools: 'Tools',
      soft: 'Soft skills',
      ai: 'AI (in progress)'
    },
    // Skill counter
    counter: {
      showing: '{visible} of {total}',
      remaining: {
        zero: 'Reached infinity',
        one: 'Discover {count} more skills...',
        other: 'Discover {count} more skills...'
      }
    },


    // Proficiency
    proficiency: 'Proficiency',

    // Actions
    loadMore: 'Load more...',
    clearSearch: 'Clear search',

    list: eu_skills_list
  },




  //Collection
  sectionLabel: {
    collection: 'collection'
  },



















//  education: {
//    title: 'educational journey',
//    subtitle: 'A comprehensive view of my learning experiences, skill development, and academic achievements across various institutions and platforms.'
//  },



  // ============================================================
  // ADD THIS BLOCK INSIDE en = { ... } in en.ts
  // Replace or complement the existing "education" key
  // ============================================================

  education: {
    title: 'learning journey',
    subtitle: 'A comprehensive overview of my academic path, skill development and achievements across institutions and platforms.',
    show: {
      more: 'show more education',
      less: 'show less'
    },
    phases: {
      foundation: 'Foundation Years',
      specialization: 'Specialization',
      intensive: 'Intensive Program',
      backend: 'Backend Focus',
      core: 'Core Principles',
      programming: 'Programming',
      design: 'Design',
      security: 'Security Focus',
    },

    BTH: {
      degree: 'Visual design, product management & mobile development — courses in UI programming, requirements management for digital products, and cross-platform app development with React Native.',
      phase1: 'Foundation Years',
      phase2: 'Specialization',
      narrative: 'Bridging technology and design through innovative problem-solving and user-centered approaches.',
    },
    HB: {
      degree: 'UX & information design — deep dive into interaction design, front-end development, graphic information design, content management, information policy and UX project work.',
      phase1: 'Intensive Program',
      narrative: 'Mastered human-centered design methodologies for complex problem solving.',
    },
    HiG: {
      degree: 'Object-oriented programming in Java — foundational and applied programming with focus on algorithms, data structures and software development.',
      phase1: 'Backend Focus',
      narrative: 'Built a solid foundation in object-oriented programming and software architecture.',
    },
    Hkr: {
      degree: 'Digital UX & web development — designing digital experiences, JavaScript programming, data security and Android game development.',
      phase1: 'Core UX Principles',
      narrative: 'Deepened understanding of user psychology and inclusive design principles.',
    },
    KAU: {
      degree: 'Applied programming & software quality — courses in applied programming, software testing and privacy engineering with focus on sustainable code.',
      phase1: 'Programming',
      narrative: 'Applied industry-standard programming practices and test-driven development.',
    },
    KTH: {
      degree: 'Media technology & generative AI — course in generative AI for media technology and interaction design, focusing on AI tools within creative and interactive media.',
      phase1: 'Intensive Program',
      narrative: 'Exploring the role of AI in the future of interaction design and media production.',
    },
    LIU: {
      degree: 'AI & data security — introductory courses in artificial intelligence and data security connected to digital design and ethics.',
      phase1: 'Security Focus',
      narrative: 'Foundational understanding of security perspectives and AI in digital systems.',
    },
    Lnu: {
      degree: 'Multimedia design & app development — systems thinking, multimedia design and production, and app development with Flutter for mobile platforms.',
      phase1: 'Design',
      narrative: 'Deep dive into systems-oriented thinking and multimodal expression.',
    },
    Ltu: {
      degree: 'Game design, Java & knowledge management — courses in game design, computer game production, Java programming, knowledge management and databases.',
      phase1: 'Design & Technology',
      narrative: 'Broad technical and creative foundation in games, programming and information management.',
    },
    MAU: {
      degree: 'C# programming & digital innovation — programming in C# and digital innovation and entrepreneurship within tech-driven environments.',
      phase1: 'Design',
      narrative: 'Combination of object-oriented programming and innovative thinking.',
    },
    MIUN: {
      degree: 'XML, computer science & innovative digital solutions — courses in computer science with XML focus and informatics oriented toward innovative digital solutions.',
      phase1: 'Design',
      narrative: 'Understanding of data structuring and digital innovation processes.',
    },
    SH: {
      degree: 'Media design, interaction design & human-computer interaction — broad education in graphic design, web production, interaction design, HCI, digital illustration and multimodal expression.',
      phase1: 'Design',
      narrative: 'Versatile competence in digital creation from visual identity to interactive systems.',
    },
    UU: {
      degree: 'Systems programming in C++ — introductory course in computers and programming with C++, focusing on memory management and low-level programming.',
      phase1: 'Programming',
      narrative: 'Insight into systems-level programming and computer architecture.',
    },
  },
























  projects: {
    title: 'Featured Projects',
    subtitle: 'Some of my recent work',
    viewProject: 'View Project',
    viewCode: 'View Code',
    allProjects: 'All Projects',
    categories: {
      all: 'All',
      web: 'Web Apps',
      mobile: 'Mobile',
      api: 'APIs',
      tools: 'Tools'
    }
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'Let\'s work together on your next project',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    success: 'Message sent successfully!',
    error: 'Failed to send message. Please try again.'
  },
  timeline: {
    title: 'Journey',
    subtitle: 'Professional and educational milestones'
  },
  phases: {
    learning: 'Learning Phase',
    building: 'Building Phase',
    mastering: 'Mastering Phase',
    innovating: 'Innovation Phase'
  },
  footer: {
    rights: 'All rights reserved',
    builtWith: 'Built with',
    madeWith: 'Made with'
  },

  // QnA
  qna: {
    title: "explore synergies",
    subtitle: 'choose what matters most',
    readTime: 'min read',
    relatedQuestions: 'you might also want to know',
    pathsLabel: {
      work: 'Work',
      journey: 'Journey',
      location: 'Location',
      offer: 'Offer',
      start: 'Start',
      collaboration: 'Collaboration',
      value: 'Value',
    },
    askMore: 'Reach out',
    askMoreCta: 'use my original email - or book a time, 10-15 min call',
    today: 'today,',
    timeOfDay: {
      morning:   'morning',
      afternoon: 'this afternoon',
      evening:   'this evening',
    },
    days: {
      0: 'sunday', 1: 'monday', 2: 'tuesday',  3: 'wednesday',
      4: 'thursday', 5: 'friday', 6: 'saturday',
    },
    progress: 'explored',
    summary: {
      title: 'Based on what you explored',
      intro: "Here's what stands out",
      close: 'Close',
      },
    paths: {
      work: {title: 'Work arrangements'},
      journey: {title: 'My learning journey'},
      location: {title: 'Location & Remote'},
      offer: {title: 'What I offer'},
      start: {title: 'Getting started'},
      collaboration: {title:'Collaboration style'},
      value: {title:'Value'},
      },
  },
};
