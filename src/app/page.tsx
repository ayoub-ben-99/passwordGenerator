"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./_components/ui/Button";
import gsap from "gsap";
import Link from "next/link";

const Home = () => {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef<HTMLDivElement>(null);

  const generatePassword = () => {
    let chars = "";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;,.<>?";

    if (chars === "") {
      setPassword(": Choose at least one option");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);

    // Animate password output
    if (passwordRef.current) {
      gsap.fromTo(
        passwordRef.current,
        { y: -10, opacity: 0, scale: -5 },
        { y: 0, opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  };

  const copyToClipboard = () => {
    if (password && !password.startsWith(":")) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <header className="relative w-full min-h-screen flex justify-center items-center flex-col px-2 py-6 sm:px-4 sm:py-10">
      {/* Blur backgrounds */}
      <div className="bg-[var(--p-d)] h-20 w-20 sm:h-32 sm:w-32 absolute left-1/2 top-1/2 -translate-1/2 blur-[60px]" />
      <div className="bg-[var(--p-light)] h-20 w-20 sm:h-32 sm:w-32 absolute left-1/2 top-1/3 -translate-1/2 blur-[60px]" />
      <div className="bg-[var(--p-dark)] h-20 w-20 sm:h-32 sm:w-32 absolute left-1/2 top-1/2 -translate-1/2 blur-[60px]" />

      <main className="w-full max-w-sm mx-auto p-3 sm:p-5 bg-black/10 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl space-y-4 z-10">
        <h1 className="text-xl sm:text-2xl uppercase font-bold text-center text-[var(--p-light)]">
          <i className="ri-key-2-fill text-2xl sm:text-4xl text-[var(--p-d)]"></i>{" "}
          Password Generator
        </h1>

        {/* Password Display */}
        <div
          ref={passwordRef}
          className={`overflow-x-auto px-3 text-xs sm:text-lg font-mono flex justify-center items-center rounded-full border border-white/15 break-words min-h-[2.5rem] transition-all duration-200 ${
            password.startsWith(":")
              ? "bg-red-950 text-red-300"
              : "bg-white/10 text-white"
          }`}
        >
          {password.startsWith(":") && (
            <i className="ri-error-warning-line mr-1" />
          )}
          {password}
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-center gap-2 sm:gap-3">
          <Button
            onClick={generatePassword}
            className="gap-2 bg-gradient-to-br from-[var(--p-dark)] to-[var(--p-d)] w-full"
          >
            <i className="ri-restart-line text-sm sm:text-base"></i> Generate
          </Button>

          <Button
            onClick={copyToClipboard}
            className={`gap-2 w-full transition-all duration-200 ${
              copied
                ? "bg-[var(--p-dark)]"
                : "bg-gradient-to-tr from-[var(--p-dark)] to-[var(--p-d)]"
            }`}
          >
            <i className={copied ? "ri-check-line" : "ri-file-copy-line"}></i>
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>

        {/* Length */}
        <div className="space-y-1">
          <label className="font-medium block text-xs sm:text-sm">
            Password Length :
          </label>
          <div className="*:select-none flex items-center px-3 py-1.5 rounded-full border border-white/15 w-fit">
            <button
              onClick={() => setLength((prev) => Math.max(4, prev - 1))}
              className="active:scale-90 cursor-pointer hover:bg-white/5 w-8 sm:w-9 rounded-full font-bold text-base"
            >
              -
            </button>

            <input
              type="text"
              value={length}
              readOnly
              className="cursor-pointer w-10 sm:w-14 outline-none select-none border-none text-center rounded-full bg-transparent text-white"
            />

            <button
              onClick={() => setLength((prev) => Math.min(64, prev + 1))}
              className="active:scale-90 cursor-pointer rounded-full font-bold text-base hover:bg-white/5 w-8 sm:w-9"
            >
              +
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {[
            {
              label: "Uppercase",
              style: "ABC...",
              state: includeUpper,
              setter: setIncludeUpper,
            },
            {
              label: "Lowercase",
              style: "abc...",
              state: includeLower,
              setter: setIncludeLower,
            },
            {
              label: "Numbers",
              style: "123...",
              state: includeNumbers,
              setter: setIncludeNumbers,
            },
            {
              label: "Symbols",
              style: "!@#...",
              state: includeSymbols,
              setter: setIncludeSymbols,
            },
          ].map((option, idx) => (
            <div
              key={idx}
              onClick={() => option.setter(!option.state)}
              className={`cursor-pointer text-[10px] sm:text-sm text-center p-1.5 sm:p-2.5 rounded-full font-medium transition-all duration-200 active:scale-95${
                option.state
                  ? "text-white backdrop-blur-2xl bg-gradient-to-bl bg-[var(--p-d)] to-[var(--p-dark)]"
                  : " bg-white/5 text-gray-300/50 hover:text-gray-200"
              }`}
            >
              <h1 className="font-medium">
                {option.label} : <span>{option.style}</span>
              </h1>
            </div>
          ))}
        </div>
      </main>

      {/* GitHub link */}
      <div className="absolute z-50 mt-4 top-10/11 left-1/5 -translate-1/2 bg-white/5 px-2 border border-white/15 rounded-full flex justify-center items-center py-2 text-base">
        <Link
          href="https://github.com/ayoub-ben-99"
          target="_blank"
          className="px-3"
        >
          <i className="ri-github-fill" />
        </Link>
        <Link
          href="https://a-code01.vercel.app"
          target="_blank"
          className="px-3 font-bold"
        >
          {" "}
          a code <span className="text-[var(--p-d)] text-xl">.</span>
        </Link>
      </div>
    </header>
  );
};

export default Home;
