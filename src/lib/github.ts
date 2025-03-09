/**
 * GitHub API utilities for NyanCode Review
 */
import { Octokit } from 'octokit';
import { createAppAuth } from '@octokit/auth-app';
import { GITHUB_CONFIG } from './config';
import type { PullRequest, PRFile } from '../types';
import crypto from 'node:crypto';

// Create Octokit instance with GitHub App authentication
export const createOctokitApp = () => {
  return new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: GITHUB_CONFIG.appId,
      privateKey: GITHUB_CONFIG.privateKey,
    },
  });
};

// Create Octokit instance with installation token
export const createOctokitWithInstallation = async (installationId: number) => {
  const octokit = createOctokitApp();
  const response = await octokit.auth({
    type: 'installation',
    installationId,
  });

  // Type assertion to handle the response
  const { token } = response as { token: string };

  return new Octokit({ auth: token });
};

// Verify GitHub webhook signature
export const verifyWebhookSignature = (
  payload: string,
  signature: string
): boolean => {
  if (!GITHUB_CONFIG.webhookSecret) {
    console.warn('Webhook secret not configured');
    return false;
  }

  const hmac = crypto.createHmac('sha256', GITHUB_CONFIG.webhookSecret);
  const digest = `sha256=${hmac.update(payload).digest('hex')}`;

  return crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(signature)
  );
};

// Get PR details
export const getPullRequestDetails = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  pullNumber: number
): Promise<PullRequest> => {
  const { data } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: pullNumber,
  });

  return data as unknown as PullRequest;
};

// Get PR files
export const getPullRequestFiles = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  pullNumber: number
): Promise<PRFile[]> => {
  const { data } = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: pullNumber,
    per_page: 100, // Adjust as needed
  });

  return data as PRFile[];
};

// Post comment on PR
export const postPullRequestComment = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  pullNumber: number,
  body: string
): Promise<void> => {
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: pullNumber,
    body,
  });
};

// Update PR review status
export const updatePullRequestReviewStatus = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  pullNumber: number,
  state: 'APPROVE' | 'REQUEST_CHANGES' | 'COMMENT',
  body: string
): Promise<void> => {
  await octokit.rest.pulls.createReview({
    owner,
    repo,
    pull_number: pullNumber,
    event: state,
    body,
  });
};
