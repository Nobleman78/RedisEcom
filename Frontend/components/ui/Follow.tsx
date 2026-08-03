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
    <div className="my-20">
      <div className="max-w-xs mx-auto flex flex-row  justify-between mt-10">
        {socialLinks.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link href={item.url} key={index} target="_blank">
              <Icon size={18} className="cursor-pointer" />
            </Link>
          );
        })}
      </div>

      {/* button div */}
      <div className="max-w-lg mx-auto flex flex-row  justify-between mt-10">
        {buttons.map((item, index) => {
          return item.url ? (
            <Link href={item.url} key={index} target="_blank">
              <p className={`text-xs cursor-pointer ${spaceMono.className}`}>
                {item.title}
              </p>
            </Link>
          ) : (
            <p
              className={`text-xs cursor-pointer ${spaceMono.className}`}
              key={index}
            >
              {item.title}
            </p>
          );
        })}
      </div>
      <p className={`text-center uppercase ${spaceMono.className} text-xs mt-5`}>
        © 2026 - Never Never
      </p>
    </div>
  );
};

export default Follow;
