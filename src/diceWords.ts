// Placeholder word lists — swap these out with your real lists any time.
export const ADJECTIVES: string[] = [
  'Brave', 'Clever', 'Mysterious', 'Grumpy', 'Sneaky', 'Cheerful',
  'Fierce', 'Lazy', 'Curious', 'Elegant', 'Chaotic', 'Gentle',
  'Wild', 'Shy', 'Bold', 'Witty', 'Clumsy', 'Majestic',
  'Sleepy', 'Sparkly', 'Ancient', 'Rebellious', 'Whimsical', 'Fearless',
];

export const CHARACTERS: string[] = [
  'Wizard', 'Pirate', 'Robot', 'Dragon', 'Ninja', 'Astronaut',
  'Detective', 'Vampire', 'Knight', 'Alien', 'Zombie', 'Mermaid',
  'Ghost', 'Superhero', 'Villain', 'Cowboy', 'Samurai', 'Witch',
  'Explorer', 'Chef', 'Clown', 'Scientist', 'Time Traveler', 'Fairy',
];

const DIE_SIDES = 6;
// Adjectives are picked with two dice (6x6 = 36 outcomes folded onto 12
// slots) and characters are picked on a 12-slot spinning wheel, so both
// lists use the same size today.
const WORDS_PER_DAY = 12;

function hashStringToInt(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(hash, 31) + str.charCodeAt(i)) | 0;
  }
  return hash;
}

// Deterministic PRNG so the "word of the day" is identical for every visitor.
function mulberry32(seed: number) {
  let state = seed | 0;
  return function next() {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function todayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export interface DailyWords {
  dateKey: string;
  adjectives: string[];
  characters: string[];
}

// Picks today's twelve adjectives and twelve characters, reshuffled from
// the full lists using today's date as the seed.
export function getDailyWords(): DailyWords {
  const dateKey = todayKey();
  const adjectives = seededShuffle(ADJECTIVES, hashStringToInt(`${dateKey}-adjective`)).slice(0, WORDS_PER_DAY);
  const characters = seededShuffle(CHARACTERS, hashStringToInt(`${dateKey}-character`)).slice(0, WORDS_PER_DAY);
  return { dateKey, adjectives, characters };
}

export function rollDie(): number {
  return Math.floor(Math.random() * DIE_SIDES) + 1;
}

export interface DiceRoll {
  die1: number;
  die2: number;
  index: number;
}

// Combines two six-sided dice into one of twelve equally likely outcomes
// (36 ordered pairs fold evenly onto 12 slots), re-rolling if the result
// repeats the previous index so consecutive rolls feel less clumpy.
export function rollTwoDiceExcluding(previous: number | null): DiceRoll {
  let die1 = rollDie();
  let die2 = rollDie();
  let index = ((die1 - 1) * DIE_SIDES + (die2 - 1)) % WORDS_PER_DAY;
  let attempts = 0;
  while (index === previous && attempts < 20) {
    die1 = rollDie();
    die2 = rollDie();
    index = ((die1 - 1) * DIE_SIDES + (die2 - 1)) % WORDS_PER_DAY;
    attempts++;
  }
  return { die1, die2, index };
}

// Picks one of `count` wheel slots, re-picking if it repeats the previous
// slot so consecutive spins don't keep landing on the same wedge.
export function spinWheelExcluding(previous: number | null, count: number): number {
  let index = Math.floor(Math.random() * count);
  let attempts = 0;
  while (index === previous && attempts < 20) {
    index = Math.floor(Math.random() * count);
    attempts++;
  }
  return index;
}
