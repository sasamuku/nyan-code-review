# 😺 NyanCode Review 😺

Your feline friend for code reviews! NyanCode Review is a GitHub App that analyzes PR code changes and provides feedback with cat-themed messages.

## Features

- **PR Change Analysis**: Automatically analyzes code changes when PRs are created or updated
- **Complexity Metrics**: Evaluates additions, deletions, changed files, and file type diversity
- **Cat-themed Feedback**: Provides fun, cat-themed messages based on PR complexity
- **Review Priority**: Visualizes review priority with a "cat scale" (😺×3)
- **Review Tips**: Offers helpful review suggestions based on PR size and complexity

## How It Works

1. When a PR is created or updated, GitHub sends a webhook event to NyanCode Review
2. The app analyzes the PR's code changes using various metrics
3. It calculates a complexity score and determines review priority
4. A cat-themed comment is posted on the PR with analysis results and review tips

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- A GitHub account
- Vercel account (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sasamuku/nyan-code-review.git
   cd nyan-code-review
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   GITHUB_APP_ID=your_github_app_id
   GITHUB_PRIVATE_KEY=your_github_private_key
   GITHUB_WEBHOOK_SECRET=your_webhook_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### Setting up the GitHub App

1. Go to your GitHub account settings > Developer settings > GitHub Apps
2. Create a new GitHub App with the following permissions:
   - Repository permissions:
     - Pull requests: Read & write
     - Contents: Read
   - Subscribe to events:
     - Pull request
3. Generate a private key and update your `.env.local` file
4. Install the app on your repositories

### Deployment

The easiest way to deploy NyanCode Review is using Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure the environment variables
4. Deploy!

## Configuration

You can customize the app's behavior by modifying the configuration files:

- `src/lib/config.ts`: Change thresholds, weights, and cat messages
- `src/lib/cat.ts`: Modify the cat ASCII art and message generation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the joy cats bring to our lives
- Built with Next.js, TypeScript, and Octokit
- Deployed on Vercel

---

Made with ❤️ and 🐱
