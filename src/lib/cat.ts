/**
 * Cat message generation logic for NyanCode Review
 */
import type { PRAnalysisResult, ChangeSize, ReviewPriority } from '../types';
import { CAT_EMOJI_SCALE } from './config';

/**
 * Generate a formatted PR review comment with cat theme
 */
export const generatePRReviewComment = (analysis: PRAnalysisResult): string => {
  const {
    prNumber,
    additions,
    deletions,
    changedFiles,
    fileTypeDiversity,
    complexityScore,
    reviewPriority,
    sizeCategory,
    message,
    catArt
  } = analysis;

  // Format file type diversity as percentage
  const diversityPercentage = Math.round(fileTypeDiversity * 100);

  // Generate cat emoji scale based on priority
  const catScale = generateCatScale(reviewPriority);

  return `
# 😺 NyanCode Review 😺

${message}

${catArt}

## PR Stats
- 📝 Added lines: ${additions}
- 🗑️ Deleted lines: ${deletions}
- 📂 Changed files: ${changedFiles}
- 🔄 File type diversity: ${diversityPercentage}%
- 🧠 Complexity score: ${Math.round(complexityScore)}

## Review Priority: ${catScale}

${generateReviewTips(sizeCategory, reviewPriority)}

---
*Meow! I'm NyanCode Review, a cat who helps with code reviews! 🐱*
`;
};

/**
 * Generate cat emoji scale based on review priority
 */
export const generateCatScale = (priority: ReviewPriority): string => {
  const emoji = CAT_EMOJI_SCALE[priority];
  const label = getPriorityLabel(priority);
  return `${emoji.repeat(priority)} (${label})`;
};

/**
 * Get human-readable label for review priority
 */
export const getPriorityLabel = (priority: ReviewPriority): string => {
  switch (priority) {
    case ReviewPriority.LOW:
      return 'Low Priority';
    case ReviewPriority.MEDIUM:
      return 'Medium Priority';
    case ReviewPriority.HIGH:
      return 'High Priority';
    case ReviewPriority.URGENT:
      return 'URGENT PRIORITY';
    default:
      return 'Unknown Priority';
  }
};

/**
 * Generate review tips based on PR size and priority
 */
export const generateReviewTips = (size: ChangeSize, priority: ReviewPriority): string => {
  let tips = '### Review Tips\n';

  // Size-based tips
  switch (size) {
    case ChangeSize.SMALL:
      tips += '- This is a small PR, should be quick to review!\n';
      tips += '- Look for edge cases that might have been missed.\n';
      break;
    case ChangeSize.MEDIUM:
      tips += '- Take your time to understand the changes.\n';
      tips += '- Check if tests cover the main functionality.\n';
      break;
    case ChangeSize.LARGE:
      tips += '- Consider reviewing this PR in multiple sessions.\n';
      tips += '- Focus on the architecture and design first, then details.\n';
      tips += '- Suggest breaking large PRs into smaller ones in the future.\n';
      break;
    case ChangeSize.HUGE:
      tips += '- This PR is very large! Consider asking for it to be split up.\n';
      tips += '- Review high-level architecture first before diving into details.\n';
      tips += '- Take breaks between reviewing different sections.\n';
      tips += '- Consider pair-reviewing for better coverage.\n';
      break;
  }

  // Priority-based tips
  if (priority >= ReviewPriority.HIGH) {
    tips += '- This PR has high complexity, review with extra care!\n';
    tips += '- Consider discussing complex parts with the author.\n';
  }

  return tips;
};
