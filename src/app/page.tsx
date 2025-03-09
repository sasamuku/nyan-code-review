/**
 * NyanCode Review top page
 */
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">NyanCode Review</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/github-mark.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative flex place-items-center mb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              😺 NyanCode Review 😺
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Your feline friend for code reviews!
            </p>
          </div>
        </div>

        <div className="mb-8 text-center">
          <div className="text-lg md:text-xl mb-4">
            <pre className="inline-block text-left whitespace-pre bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
{`  /\\_/\\
 ( o.o )
  > ^ <
 /     \\
/       \\`}
            </pre>
          </div>
          <p className="text-lg md:text-xl">
            Meow! I&apos;ll help you analyze your PRs and make code reviews more fun!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">🔍 PR Analysis</h2>
            <p>
              I analyze your PRs based on size, complexity, and file diversity to
              give you insights on review priority.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">🐱 Cat Feedback</h2>
            <p>
              Get feedback with cat-themed messages and ASCII art that reflect
              the complexity of your PR.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">📊 Complexity Score</h2>
            <p>
              I calculate a complexity score based on multiple factors to help
              prioritize review efforts.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">💡 Review Tips</h2>
            <p>
              Get helpful review tips based on the size and complexity of the PR.
            </p>
          </div>
        </div>

        <div className="mb-12 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Getting Started</h2>
          <ol className="text-left list-decimal pl-8 space-y-2">
            <li>Register NyanCode Review as a GitHub App in your repository</li>
            <li>Grant permissions for PR access and commenting</li>
            <li>Create or update a PR</li>
            <li>Watch as I analyze your PR and provide feedback!</li>
          </ol>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="https://github.com/apps/nyancode-review"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Install GitHub App
          </Link>
          <Link
            href="https://github.com/sasamuku/nyan-code-review"
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 font-bold py-3 px-6 rounded-lg"
          >
            View on GitHub
          </Link>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left mt-16">
        <a
          href="https://github.com/sasamuku/nyan-code-review/issues"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Issues{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Report bugs or request features on GitHub Issues.
          </p>
        </a>

        <a
          href="https://github.com/sasamuku/nyan-code-review/blob/main/README.md"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn more about NyanCode Review and how to use it.
          </p>
        </a>

        <a
          href="https://github.com/sasamuku/nyan-code-review/blob/main/CONTRIBUTING.md"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Contribute{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Contribute to NyanCode Review and make it better.
          </p>
        </a>
      </div>
    </main>
  );
}
