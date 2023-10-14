// send a request to OpenAI
// prompt OpenAI to judge the post to see if it's funny
// only allow it to be posted if it's considered funny
// persist posts that are funny enough on the webpage
// set up PostHog to track analytics

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-gradient fixed inset-0 font-sans">
        <div className="fixed left-[50%] top-[50%] max-h-full w-full translate-x-[-50%] translate-y-[-50%] overflow-y-auto p-5 text-center sm:max-w-2xl">
          <h1 className="font-unbounded mb-6 text-4xl font-bold md:text-6xl">
            Go ahead, be funny.
          </h1>
          <form className="container">
            <div className="container min-w-full">
              <textarea className="min-w-full mb-3 h-36 rounded-lg border border-gray-200 p-4 text-sm leading-tight text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none" />
            </div>

            <div className="container">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Tell OpenAI a Joke!
              </button>
            </div>
          </form>

          <footer className="mt-5 text-xs">
            &copy; 2023 Liam Lindner All rights reserved
          </footer>
        </div>
      </div>
    </main>
  );
}
