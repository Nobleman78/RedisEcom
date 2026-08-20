"use client";
import { spaceMono } from "@/fonts/Fonts";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const sessionKey = "newsletterModalSeen";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const subscribed = localStorage.getItem("newsletterSubscribed");
    const seen = sessionStorage.getItem(sessionKey);

    if (!subscribed && !seen) {
      sessionStorage.setItem(sessionKey, "true");
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setMessage({ type: "error", text: "Please enter your email." });
      return;
    }

    setIsSubmitting(true);

    try {
      const subscribedEmails = JSON.parse(
        localStorage.getItem("newsletterSubscribers") || "[]",
      ) as string[];

      const alreadyExists = subscribedEmails.some(
        (savedEmail) => savedEmail.toLowerCase() === trimmedEmail.toLowerCase(),
      );

      if (alreadyExists) {
        localStorage.setItem("newsletterSubscribed", "true");
        setMessage({
          type: "success",
          text: "You are already subscribed.",
        });
        setIsModalOpen(false);
        return;
      }

      const updatedEmails = [...subscribedEmails, trimmedEmail];
      localStorage.setItem(
        "newsletterSubscribers",
        JSON.stringify(updatedEmails),
      );
      localStorage.setItem("newsletterSubscribed", "true");
      setEmail("");
      setMessage({
        type: "success",
        text: "Subscription saved locally.",
      });
      setIsModalOpen(false);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="absolute inset-0 bg-black/50"></div>

      <div
        ref={modalRef}
        className="relative z-10 bg-white p-8 text-center w-lg"
      >
        <Link href="/" className={`${spaceMono.className} text-2xl`}>
          <h2>NEVER NEVER</h2>
        </Link>

        <p className={`${spaceMono.className} mt-5`}>
          Sign up for 10% off your first full price order and for all the latest
          news.
        </p>

        <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className={`${spaceMono.className} px-5 py-2 outline-none border`}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`${spaceMono.className} bg-black text-white px-5 py-2 cursor-pointer disabled:opacity-70`}
          >
            {isSubmitting ? "Submitting..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p
            className={`${spaceMono.className} mt-3 text-sm ${
              message.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <p className={`${spaceMono.className} mt-5`}>
          You are signing up to receive communication via email and can
          unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Modal;
