"use client";
import { spaceMono } from "@/fonts/Fonts";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

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
    const subscribed = localStorage.getItem("newslaterSubscribed");

    if (!subscribed) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);
  if (!isModalOpen) {
    return null;
  }
  // close the modal outside click

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Modal content */}
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

        <form className="mt-5 flex flex-col gap-5">
          <input
            type="text"
            placeholder="Email"
            className={`${spaceMono.className} px-5 py-2 outline-none border`}
          />

          <button
            className={`${spaceMono.className} bg-black text-white px-5 py-2`}
          >
            Sign Up
          </button>
        </form>

        <p className={`${spaceMono.className} mt-5`}>
          You are signing up to receive communication via email and can
          unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};
export default Modal;
