import { Michroma, Roboto, Space_Mono } from "next/font/google";
import localFont from "next/font/local";

export const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
});

export const roboto = Roboto({
  subsets:["latin"],
  weight:"900"
})
export const Nimbus = localFont({
  src: [
    {
      path: "./Nimbus.ttf",
      weight: "900",
      style: "bold",
    },
  ],
  display: "swap",
  fallback: ["sans-serif"],
});
export const Eurostil = localFont({
  src:[
    {
      path:"./Helvetica.otf",
      style:"bold",
      weight:"900"

    }
  ]
})