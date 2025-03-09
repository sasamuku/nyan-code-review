/**
 * Type definitions for NyanCode Review
 */

// GitHub webhook event types
export interface WebhookEvent {
  action: string;
  pull_request?: PullRequest;
  repository: Repository;
  sender: User;
  installation?: {
    id: number;
  };
}

// GitHub Pull Request
export interface PullRequest {
  id: number;
  number: number;
  title: string;
  body: string | null;
  html_url: string;
  diff_url: string;
  user: User;
  base: {
    repo: Repository;
    ref: string;
  };
  head: {
    repo: Repository;
    ref: string;
    sha: string;
  };
  additions: number;
  deletions: number;
  changed_files: number;
  created_at: string;
  updated_at: string;
}

// GitHub Repository
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: User;
  html_url: string;
  description: string | null;
}

// GitHub User
export interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

// PR Analysis Result
export interface PRAnalysisResult {
  prNumber: number;
  repoFullName: string;
  additions: number;
  deletions: number;
  changedFiles: number;
  fileTypeDiversity: number;
  complexityScore: number;
  reviewPriority: ReviewPriority;
  sizeCategory: ChangeSize;
  message: string;
  catArt: string;
}

// Change Size Categories
export enum ChangeSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  HUGE = 'huge'
}

// Review Priority Levels
export enum ReviewPriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  URGENT = 4
}

// File Type Information
export interface FileTypeInfo {
  extension: string;
  count: number;
  additions: number;
  deletions: number;
}

// PR File Details
export interface PRFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
}
