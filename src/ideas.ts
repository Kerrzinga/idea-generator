export type Category =
  | 'Technology'
  | 'Creative'
  | 'Business'
  | 'Lifestyle'
  | 'Social Good'
  | 'Learning';

export interface Idea {
  text: string;
  category: Category;
}

export const CATEGORIES: Category[] = [
  'Technology',
  'Creative',
  'Business',
  'Lifestyle',
  'Social Good',
  'Learning',
];

export const IDEAS: Idea[] = [
  // Technology
  { text: 'Build a browser extension that summarises any webpage in one sentence.', category: 'Technology' },
  { text: 'Create a CLI tool that generates a daily stand-up report from git commits.', category: 'Technology' },
  { text: 'Build a self-hosted habit tracker that syncs across devices over LAN.', category: 'Technology' },
  { text: 'Make a VS Code extension that inserts a random motivational quote on save.', category: 'Technology' },
  { text: 'Create a static site generator that converts markdown to a personal wiki.', category: 'Technology' },
  { text: 'Build a keyboard-driven task manager that runs entirely in the terminal.', category: 'Technology' },
  { text: 'Write a tiny URL shortener you can self-host on a Raspberry Pi.', category: 'Technology' },
  { text: 'Build a budgeting app that imports bank CSV exports automatically.', category: 'Technology' },
  { text: 'Create a smart home dashboard that visualises energy usage in real time.', category: 'Technology' },
  { text: 'Make a PWA that works fully offline as a recipe manager.', category: 'Technology' },

  // Creative
  { text: 'Write a short story where every paragraph starts with a different letter of the alphabet.', category: 'Creative' },
  { text: 'Design a board game using only 10 cards and 2 dice.', category: 'Creative' },
  { text: 'Create a zine documenting an ordinary walk through your neighbourhood.', category: 'Creative' },
  { text: 'Compose a 1-minute piece of music using only found household sounds.', category: 'Creative' },
  { text: 'Illustrate a 6-panel comic strip with no dialogue.', category: 'Creative' },
  { text: 'Build a miniature diorama of your ideal workspace.', category: 'Creative' },
  { text: 'Write a poem from the perspective of a household object.', category: 'Creative' },
  { text: 'Photograph 30 different textures in your home and turn them into desktop wallpapers.', category: 'Creative' },
  { text: 'Design a typeface inspired by the architecture of your city.', category: 'Creative' },
  { text: 'Create a 10-page illustrated recipe book for dishes you invented.', category: 'Creative' },

  // Business
  { text: 'Launch a newsletter sharing one deep-dive on a niche topic every week.', category: 'Business' },
  { text: 'Build a micro-SaaS that automates one repetitive task you do every day.', category: 'Business' },
  { text: 'Offer a "digital declutter" consulting service for busy professionals.', category: 'Business' },
  { text: 'Create a subscription box curating unusual stationery from around the world.', category: 'Business' },
  { text: 'Start a paid community for people learning a specific creative skill.', category: 'Business' },
  { text: 'Develop a template shop for a niche you know well (e.g. freelance contracts, meal plans).', category: 'Business' },
  { text: 'Build a "learn in public" cohort course on a topic you mastered recently.', category: 'Business' },
  { text: 'Create and sell Notion dashboards for a specific profession.', category: 'Business' },
  { text: 'Launch a marketplace connecting local makers with businesses needing custom merchandise.', category: 'Business' },
  { text: 'Offer an accountability-partner matching service for side-project builders.', category: 'Business' },

  // Lifestyle
  { text: 'Try cooking a new cuisine every week for a month and document the results.', category: 'Lifestyle' },
  { text: 'Do a "digital detox" day and journal about what you noticed.', category: 'Lifestyle' },
  { text: 'Walk a different route every morning for a week and sketch what you see.', category: 'Lifestyle' },
  { text: 'Host a "silent dinner" where guests communicate only by writing notes.', category: 'Lifestyle' },
  { text: 'Start a "book swap" tradition with friends — everyone brings one, leaves with one.', category: 'Lifestyle' },
  { text: 'Plan a micro-adventure: a night outdoors within 50 km of home.', category: 'Lifestyle' },
  { text: 'Create a personal annual review ritual with 5 key questions you ask yourself each year.', category: 'Lifestyle' },
  { text: 'Pick up one analogue hobby you have never tried — letterpress, weaving, or ceramics.', category: 'Lifestyle' },
  { text: 'Spend a weekend without buying anything and notice what you crave.', category: 'Lifestyle' },
  { text: 'Write one handwritten letter each week for a month.', category: 'Lifestyle' },

  // Social Good
  { text: 'Organise a community skill-share event at your local library.', category: 'Social Good' },
  { text: 'Build a free app that helps people find surplus food from local restaurants.', category: 'Social Good' },
  { text: 'Start a repair café in your neighbourhood for fixing broken electronics and clothes.', category: 'Social Good' },
  { text: 'Create a printable guide to local mental health resources and distribute it for free.', category: 'Social Good' },
  { text: 'Launch an open-source tool that helps non-profits manage volunteers.', category: 'Social Good' },
  { text: 'Map all the accessible benches and rest spots in your city using OpenStreetMap.', category: 'Social Good' },
  { text: 'Build a multilingual resource hub for newly arrived immigrants in your area.', category: 'Social Good' },
  { text: 'Organise a monthly "clean walk" that picks up litter along a fixed local route.', category: 'Social Good' },
  { text: 'Create a free workshop teaching basic digital literacy for older adults.', category: 'Social Good' },
  { text: 'Develop an anonymous peer-support forum for a specific underserved community.', category: 'Social Good' },

  // Learning
  { text: 'Spend 30 minutes a day for a month learning a new programming language from scratch.', category: 'Learning' },
  { text: 'Pick up basic conversational phrases in a language you have always been curious about.', category: 'Learning' },
  { text: 'Study the history of one topic deeply for two weeks and write a 1,000-word essay.', category: 'Learning' },
  { text: 'Take an online drawing course and post daily progress publicly.', category: 'Learning' },
  { text: 'Learn to touch-type using a structured course over 30 days.', category: 'Learning' },
  { text: 'Work through a university maths syllabus using only free online resources.', category: 'Learning' },
  { text: 'Pick a classic book you "should" have read and annotate it thoroughly.', category: 'Learning' },
  { text: 'Learn one magic trick well enough to perform it confidently for strangers.', category: 'Learning' },
  { text: 'Study music theory basics and write a simple chord progression.', category: 'Learning' },
  { text: 'Research one historical event per week for a month and discuss it with a friend.', category: 'Learning' },
];

export function getRandomIdea(ideas: Idea[]): Idea {
  return ideas[Math.floor(Math.random() * ideas.length)];
}
