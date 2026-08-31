"use client";
import { spaceMono } from "@/fonts/Fonts";
import Link from "next/link";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Follow = () => {
  const socialLinks = [
    {
      icon: FaFacebook,
      url: "facebook.com/never-never",
    },
    {
      icon: FaInstagram,
      url: "instagram.com/never-never",
    },
    {
      icon: FaLinkedin,
      url: "/linkedin.com/never-never",
    },
    {
      icon: FaTwitter,
      url: "twitter.com/never-never",
    },
  ];

  const buttons = [
    {
      title: " Newsletter",
      url: "/newsletter",
    },
    {
      title: "Terms & Conditions",
      url: "/terms-and-conditions",
    },
    {
      title: "Delivery & Returns",
      url: "/delivery-and-returns",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ];

  return (
    <footer className="mt-16 border-t border-black/10 px-5 py-8 sm:mt-20 sm:py-10">
      <nav
        aria-label="Social media links"
        className="mx-auto flex w-fit max-w-full justify-center gap-1 sm:gap-3"
      >
        {socialLinks.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              href={item.url}
              key={index}
              target="_blank"
              className="flex min-h-9 min-w-9 items-center justify-center transition-opacity hover:opacity-60"
              aria-label={`Follow Never Never on ${item.icon.name}`}
            >
              <Icon size={18} className="cursor-pointer" />
            </Link>
          );
        })}
      </nav>

      <nav
        aria-label="Customer service links"
        className="mx-auto mt-6 grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-1 text-center sm:mt-8 sm:grid-cols-4 sm:gap-4"
      >
        {buttons.map((item, index) => {
          return item.url ? (
            <Link
              href={item.url}
              key={index}
              className="flex min-h-9 items-center justify-center px-1 transition-opacity hover:opacity-60"
            >
              <p
                className={`text-[11px] leading-5 sm:text-xs ${spaceMono.className}`}
              >
                {item.title}
              </p>
            </Link>
          ) : (
            <p
              className={`text-[11px] leading-5 sm:text-xs ${spaceMono.className}`}
              key={index}
            >
              {item.title}
            </p>
          );
        })}
      </nav>
      <p
        className={`mt-4 text-center text-[10px] uppercase tracking-[0.08em] leading-5 text-black/60 sm:text-[11px] ${spaceMono.className}`}
      >
        © 2026 - Never Never
      </p>
    </footer>
  );
};

export default Follow;
