"use client";

import { useMemo, useState } from "react";
import { useCompletion } from "ai/react";

// only allow it to be posted if it's considered funny
// persist posts that are funny enough on the webpage
// set up PostHog to track analytics

export default function Home() {
  const [textAreaValue, setTextAreaValue] = useState("");
  const { completion, isLoading, handleInputChange, handleSubmit } =
    useCompletion();

  const isFunnyOrNot = useMemo(() => {
    if (completion.length > 0) {
      return !completion.toLowerCase().includes("not funny");
    }
    return null;
  }, [completion]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-gradient fixed inset-0 font-sans">
        <div className="fixed left-[50%] top-[50%] max-h-full w-full translate-x-[-50%] translate-y-[-50%] overflow-y-auto p-5 text-center sm:max-w-2xl">
          <h1 className="font-unbounded mb-6 text-4xl font-bold md:text-6xl">
            Go ahead, be funny.
          </h1>
          <form className="container" onSubmit={handleSubmit}>
            <div className="container min-w-full">
              <textarea
                value={textAreaValue}
                onChange={(e) => {
                  setTextAreaValue(e.target.value);
                  handleInputChange(e);
                }}
                className="min-w-full mb-3 h-36 rounded-lg border border-gray-200 p-4 leading-tight text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="container">
              <button
                disabled={isLoading}
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                {isLoading
                  ? "Joke Transfer Initiated..."
                  : "Tell OpenAI a Joke!"}
              </button>
            </div>
          </form>

          {isLoading || isFunnyOrNot === null ? null : (
            <h1 className="font-unbounded my-5 text-4xl font-bold md:text-6xl">
              {isFunnyOrNot ? "Funny!" : "Not funny ☹️"}
            </h1>
          )}

          <footer className="mt-5 text-xs">
            &copy; 2023 Liam Lindner All rights reserved
          </footer>
        </div>
      </div>
    </main>
  );
}
