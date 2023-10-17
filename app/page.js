"use client";

import { usePostHog } from "posthog-js/react";
import { useMemo, useState } from "react";
import { useCompletion } from "ai/react";

// Add a "score this joke" button to fill an "Applause-o-meter" between "not funny" | "ok" | "funny" | "very funny" | "hilarious"
// Persist posts that are funny enough on the webpage
// Add a punch it up button below the text area to make the joke "funnier"
// Fix footer to bottom of page

export default function Home() {
  const posthog = usePostHog();
  const [textAreaValue, setTextAreaValue] = useState("");
  const [jokeRating, setJokeRating] = useState(null);
  const { isLoading: isJokeLoading, complete: generateJoke } = useCompletion({
    api: "/api/joke",
    onFinish: (_, jokeCompletion) => {
      setTextAreaValue(jokeCompletion);
    },
  });
  const { isLoading: isJokeRatingLoading, complete: rateJoke } =
    useCompletion({
      api: "/api/completion",
      onFinish: (_, rating) => {
        setJokeRating(Number(rating))
      },
    });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-gradient fixed inset-0 font-sans">
        <div className="fixed left-[50%] top-[50%] max-h-full w-full translate-x-[-50%] translate-y-[-50%] overflow-y-auto p-5 text-center sm:max-w-2xl">
          <h1 className="font-unbounded mb-6 text-4xl font-bold md:text-6xl">
            Tell AI a joke.
          </h1>
          <form
            className="container"
            onSubmit={(e) => {
              e.preventDefault();
              posthog?.capture("joke_submitted", {
                value: textAreaValue,
              });
              rateJoke(textAreaValue);
            }}
          >
            <div className="grid">
              <div className="container">
                <button
                  onClick={(e) => {
                    generateJoke();
                    setJokeRating(null);
                    setTextAreaValue("");
                  }}
                  disabled={isJokeLoading}
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                >
                  Generate joke
                </button>
                <div className="text-xs">(will clear text below)</div>
              </div>
            </div>
            <div className="container min-w-full">
              <textarea
                value={textAreaValue}
                onChange={(e) => {
                  setJokeRating(null);
                  setTextAreaValue(e.target.value);
                }}
                className="min-w-full my-3 h-36 rounded-lg border border-gray-200 p-4 leading-tight text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="container">
              <button
                disabled={isJokeRatingLoading}
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                {isJokeRatingLoading ? "Attempting to be funny..." : "Rate joke"}
              </button>
            </div>
          </form>

          {isJokeRatingLoading || jokeRating === null ? null : (
            <h1 className="font-unbounded my-5 text-4xl font-bold md:text-6xl">
              {jokeRating}
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
