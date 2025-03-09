/**
 * GitHub webhook endpoint for NyanCode Review
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  createOctokitWithInstallation,
  getPullRequestDetails,
  getPullRequestFiles,
  postPullRequestComment,
  verifyWebhookSignature
} from '@/lib/github';
import { analyzePR } from '@/lib/analysis';
import { generatePRReviewComment } from '@/lib/cat';
import type { WebhookEvent } from '@/types';

/**
 * Handle GitHub webhook POST requests
 */
export async function POST(request: NextRequest) {
  try {
    // Get the raw request body
    const payload = await request.text();

    // Verify webhook signature
    const signature = request.headers.get('x-hub-signature-256') || '';
    if (!verifyWebhookSignature(payload, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse the webhook payload
    const event = JSON.parse(payload) as WebhookEvent;
    const eventType = request.headers.get('x-github-event');

    // Only process pull_request events
    if (eventType !== 'pull_request') {
      return NextResponse.json({ message: 'Ignored event type' }, { status: 200 });
    }

    // Only process opened or synchronize events
    if (event.action !== 'opened' && event.action !== 'synchronize') {
      return NextResponse.json({ message: 'Ignored action type' }, { status: 200 });
    }

    // Extract PR information
    const pullRequest = event.pull_request;
    if (!pullRequest) {
      return NextResponse.json({ error: 'No pull request data' }, { status: 400 });
    }

    const installationId = event.installation?.id;
    if (!installationId) {
      return NextResponse.json({ error: 'No installation ID' }, { status: 400 });
    }

    // Create authenticated Octokit client
    const octokit = await createOctokitWithInstallation(installationId);

    // Get repository information
    const repoFullName = event.repository.full_name;
    const [owner, repo] = repoFullName.split('/');
    const prNumber = pullRequest.number;

    // Get detailed PR information
    const prDetails = await getPullRequestDetails(octokit, owner, repo, prNumber);
    const prFiles = await getPullRequestFiles(octokit, owner, repo, prNumber);

    // Analyze the PR
    const analysis = analyzePR(
      prNumber,
      repoFullName,
      prDetails.additions,
      prDetails.deletions,
      prFiles
    );

    // Generate and post the review comment
    const comment = generatePRReviewComment(analysis);
    await postPullRequestComment(octokit, owner, repo, prNumber, comment);

    return NextResponse.json({ message: 'PR analyzed and comment posted' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Handle GitHub webhook GET requests (for verification)
 */
export async function GET() {
  return NextResponse.json({ message: 'NyanCode Review webhook endpoint is active' }, { status: 200 });
}
