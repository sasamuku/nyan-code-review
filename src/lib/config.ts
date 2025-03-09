/**
 * Configuration settings for NyanCode Review
 */
import { ChangeSize, ReviewPriority } from '../types';

// Thresholds for PR size categorization
export const CHANGE_SIZE_THRESHOLDS = {
  [ChangeSize.SMALL]: {
    additions: 50,
    deletions: 30,
    changedFiles: 3
  },
  [ChangeSize.MEDIUM]: {
    additions: 200,
    deletions: 100,
    changedFiles: 7
  },
  [ChangeSize.LARGE]: {
    additions: 500,
    deletions: 250,
    changedFiles: 15
  },
  // Anything above LARGE is considered HUGE
};

// Weights for complexity score calculation
export const COMPLEXITY_WEIGHTS = {
  additions: 1,
  deletions: 0.5,
  changedFiles: 10,
  fileTypeDiversity: 15
};

// Thresholds for review priority
export const REVIEW_PRIORITY_THRESHOLDS = {
  [ReviewPriority.LOW]: 30,
  [ReviewPriority.MEDIUM]: 60,
  [ReviewPriority.HIGH]: 100,
  // Anything above HIGH is considered URGENT
};

// Cat messages for different change sizes
export const CAT_MESSAGES = {
  [ChangeSize.SMALL]: [
    "Meow! This is a small change, should be quick to review! 😸",
    "Purr~ A tiny PR, perfect for a quick review between tasks! 🐱",
    "Nya~ Small and focused changes are the best! Easy to review! 😺"
  ],
  [ChangeSize.MEDIUM]: [
    "Meow~ This PR has a decent amount of changes. Take your time! 😼",
    "Nya! A medium-sized PR that deserves proper attention! 🐈",
    "Purr... This will take a bit of time to review properly. 😸"
  ],
  [ChangeSize.LARGE]: [
    "Meoooow! This is a large PR! Consider breaking it down next time! 😿",
    "Nya~! Quite a lot of changes here. Grab a coffee before reviewing! 🙀",
    "Purrrr... This large PR will need careful review. Take your time! 😾"
  ],
  [ChangeSize.HUGE]: [
    "MEOOOOOW!!! This PR is HUGE! Consider splitting it into smaller ones! 🙀",
    "NYAAA!!! So many changes! This might take a whole day to review! 😿😿😿",
    "HISSSSS!!! This PR is too big! Please consider our review sanity! 🙀🙀🙀"
  ]
};

// Cat ASCII art for different review priorities
export const CAT_ART = {
  [ReviewPriority.LOW]: `
  /\\_/\\
 ( o.o )
  > ^ <
  `,
  [ReviewPriority.MEDIUM]: `
   /\\_/\\
  ( ·.· )
   > ^ <
  /    \\
  `,
  [ReviewPriority.HIGH]: `
   /\\_/\\
  ( ·ω· )
   > ^ <
  /     \\
 /       \\
  `,
  [ReviewPriority.URGENT]: `
    /\\_/\\
   ( ⊙д⊙)
    > ^ <
   /     \\
  /       \\
 /         \\
  `
};

// Cat emoji scale for review priority
export const CAT_EMOJI_SCALE = {
  [ReviewPriority.LOW]: "😺",
  [ReviewPriority.MEDIUM]: "😼",
  [ReviewPriority.HIGH]: "😾",
  [ReviewPriority.URGENT]: "🙀"
};

// GitHub API configuration
export const GITHUB_CONFIG = {
  appId: process.env.GITHUB_APP_ID || '',
  privateKey: process.env.GITHUB_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  webhookSecret: process.env.GITHUB_WEBHOOK_SECRET || '',
  clientId: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
};
