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
  return (
    <div className="my-20">
      <h2 className={`${spaceMono.className} text-center text-3xl uppercase `}>
        Follow
      </h2>
      <div className="max-w-xs mx-auto flex flex-row  justify-between mt-10">
        {socialLinks.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link href={item.url} key={index} target="_blank">
              <Icon size={20} className="cursor-pointer" />
            </Link>
          );
        })}
      </div>

      {/* Text */}
      <div className="max-w-5xl mx-auto mt-20 text-center">
        <p className={`${spaceMono.className}`}>
          Never Never is a men’s streetwear clothing store based in Belfast and
          all of our stock is available to be shipped worldwide. We are
          authorised stockists of premium men’s streetwear brands such as Cav
          Empt, Carhartt WIP, Brain Dead, No Problemo, Gramicci, Aries, The
          Salvages, Roa, Salomon and many more men’s contemporary streetwear
          fashion brands.
        </p>
      </div>
    </div>
  );
};

export default Follow;
