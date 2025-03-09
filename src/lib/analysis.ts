/**
 * PR Analysis logic for NyanCode Review
 */
import path from 'node:path';
import { ChangeSize, ReviewPriority } from '../types';
import type { PRFile, PRAnalysisResult, FileTypeInfo } from '../types';
import {
  CHANGE_SIZE_THRESHOLDS,
  COMPLEXITY_WEIGHTS,
  REVIEW_PRIORITY_THRESHOLDS,
  CAT_MESSAGES,
  CAT_ART,
  CAT_EMOJI_SCALE
} from './config';

/**
 * Analyze PR files to determine file type diversity
 */
export const analyzeFileTypes = (files: PRFile[]): FileTypeInfo[] => {
  const fileTypeMap = new Map<string, FileTypeInfo>();

  for (const file of files) {
    const extension = path.extname(file.filename).toLowerCase() || 'no-extension';

    if (!fileTypeMap.has(extension)) {
      fileTypeMap.set(extension, {
        extension,
        count: 0,
        additions: 0,
        deletions: 0
      });
    }

    const fileTypeInfo = fileTypeMap.get(extension);
    if (fileTypeInfo) {
      fileTypeInfo.count += 1;
      fileTypeInfo.additions += file.additions;
      fileTypeInfo.deletions += file.deletions;
    }
  }

  return Array.from(fileTypeMap.values());
};

/**
 * Calculate file type diversity score (0-1)
 * Higher score means more diverse file types
 */
export const calculateFileTypeDiversity = (fileTypes: FileTypeInfo[], totalFiles: number): number => {
  if (totalFiles === 0) return 0;
  if (fileTypes.length === 1) return 0;

  // Calculate Shannon entropy for file type distribution
  let entropy = 0;
  for (const fileType of fileTypes) {
    const probability = fileType.count / totalFiles;
    entropy -= probability * Math.log2(probability);
  }

  // Normalize to 0-1 range (max entropy is log2(n) where n is number of file types)
  const maxEntropy = Math.log2(fileTypes.length);
  return maxEntropy > 0 ? entropy / maxEntropy : 0;
};

/**
 * Determine PR size category based on thresholds
 */
export const determinePRSize = (
  additions: number,
  deletions: number,
  changedFiles: number
): ChangeSize => {
  if (
    additions <= CHANGE_SIZE_THRESHOLDS[ChangeSize.SMALL].additions &&
    deletions <= CHANGE_SIZE_THRESHOLDS[ChangeSize.SMALL].deletions &&
    changedFiles <= CHANGE_SIZE_THRESHOLDS[ChangeSize.SMALL].changedFiles
  ) {
    return ChangeSize.SMALL;
  }

  if (
    additions <= CHANGE_SIZE_THRESHOLDS[ChangeSize.MEDIUM].additions &&
    deletions <= CHANGE_SIZE_THRESHOLDS[ChangeSize.MEDIUM].deletions &&
    changedFiles <= CHANGE_SIZE_THRESHOLDS[ChangeSize.MEDIUM].changedFiles
  ) {
    return ChangeSize.MEDIUM;
  }

  if (
    additions <= CHANGE_SIZE_THRESHOLDS[ChangeSize.LARGE].additions &&
    deletions <= CHANGE_SIZE_THRESHOLDS[ChangeSize.LARGE].deletions &&
    changedFiles <= CHANGE_SIZE_THRESHOLDS[ChangeSize.LARGE].changedFiles
  ) {
    return ChangeSize.LARGE;
  }

  return ChangeSize.HUGE;
};

/**
 * Calculate complexity score based on PR metrics
 */
export const calculateComplexityScore = (
  additions: number,
  deletions: number,
  changedFiles: number,
  fileTypeDiversity: number
): number => {
  return (
    (additions * COMPLEXITY_WEIGHTS.additions) +
    (deletions * COMPLEXITY_WEIGHTS.deletions) +
    (changedFiles * COMPLEXITY_WEIGHTS.changedFiles) +
    (fileTypeDiversity * 100 * COMPLEXITY_WEIGHTS.fileTypeDiversity)
  );
};

/**
 * Determine review priority based on complexity score
 */
export const determineReviewPriority = (complexityScore: number): ReviewPriority => {
  if (complexityScore <= REVIEW_PRIORITY_THRESHOLDS[ReviewPriority.LOW]) {
    return ReviewPriority.LOW;
  }

  if (complexityScore <= REVIEW_PRIORITY_THRESHOLDS[ReviewPriority.MEDIUM]) {
    return ReviewPriority.MEDIUM;
  }

  if (complexityScore <= REVIEW_PRIORITY_THRESHOLDS[ReviewPriority.HIGH]) {
    return ReviewPriority.HIGH;
  }

  return ReviewPriority.URGENT;
};

/**
 * Generate cat message based on PR size
 */
export const generateCatMessage = (sizeCategory: ChangeSize): string => {
  const messages = CAT_MESSAGES[sizeCategory];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

/**
 * Generate cat art based on review priority
 */
export const generateCatArt = (priority: ReviewPriority): string => {
  return CAT_ART[priority];
};

/**
 * Generate cat emoji scale based on review priority
 */
export const generateCatEmojiScale = (priority: ReviewPriority): string => {
  const emoji = CAT_EMOJI_SCALE[priority];
  return emoji.repeat(priority);
};

/**
 * Analyze PR and generate full analysis result
 */
export const analyzePR = (
  prNumber: number,
  repoFullName: string,
  additions: number,
  deletions: number,
  files: PRFile[]
): PRAnalysisResult => {
  const changedFiles = files.length;
  const fileTypes = analyzeFileTypes(files);
  const fileTypeDiversity = calculateFileTypeDiversity(fileTypes, changedFiles);
  const sizeCategory = determinePRSize(additions, deletions, changedFiles);
  const complexityScore = calculateComplexityScore(
    additions,
    deletions,
    changedFiles,
    fileTypeDiversity
  );
  const reviewPriority = determineReviewPriority(complexityScore);
  const message = generateCatMessage(sizeCategory);
  const catArt = generateCatArt(reviewPriority);

  return {
    prNumber,
    repoFullName,
    additions,
    deletions,
    changedFiles,
    fileTypeDiversity,
    complexityScore,
    reviewPriority,
    sizeCategory,
    message,
    catArt
  };
};
