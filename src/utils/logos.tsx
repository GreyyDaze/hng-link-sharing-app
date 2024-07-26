import React from "react";
import {
  FaGithub,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaTwitch,
  FaGitlab,
  FaFreeCodeCamp,
} from "react-icons/fa";
import { SiCodewars, SiFrontendmentor, SiStackoverflow } from "react-icons/si";
import { BiLogoDevTo } from "react-icons/bi";
import { FaHashnode } from "react-icons/fa6";


export interface Platform {
  value: string;
  label: string;
  color: string;
  logo: React.ReactNode; 
}

const platforms: Platform[] = [
  {
    value: "GitHub",
    label: "GitHub",
    color: "#1A1A1A",
    logo: <FaGithub className="w-6 h-6 text-white mr-2" />,
  },
  {
    value: "Frontend Mentor",
    label: "Frontend Mentor",
    color: "#FFF",
    logo: <SiFrontendmentor  className="w-6 h-6 text-gray-dark mr-2" />,
  },
  {
    value: "Twitter",
    label: "Twitter",
    color: "#43B7E9",
    logo: <FaTwitter className="w-6 h-6 text-white mr-2" />,
  },
  {
    value: "LinkedIn",
    label: "LinkedIn",
    color: "#2D68FF",
    logo: <FaLinkedinIn className="w-6 h-6 text-white mr-2" />,
  },
  {
    value: "Youtube",
    label: "YouTube",
    color: "#EE3939",
    logo: <FaYoutube className="w-6 h-6 text-white mr-2" />,
  },
  {
    value: "Facebook",
    label: "Facebook",
    color: "#2442AC",
    logo: <FaFacebookF className="w-6 h-6 text-white mr-2" />,
  },
  {
    value: "Twitch",
    label: "Twitch",
    color: "#EE3FC8",
    logo: <FaTwitch className="w-6 h-6 text-white mr-2" />,
  },
  {
    value: "Devto",
    label: "Dev.to",
    color: "#333",
    logo: <BiLogoDevTo className="w-6 h-6 text-white mr-2" />,
  },
  {
    value: "Codewars",
    label: "Codewars",
    color: "#8A1A50",
    logo: <SiCodewars  className="w-6 h-6 text-white mr-2" />, 
  },
  {
    value: "freecodecamp",
    label: "FreeCodeCamp",
    color: "#302267",
    logo: <FaFreeCodeCamp className="w-6 h-6 text-white mr-2" />, 
  },
  {
    value: "Gitlab",
    label: "GitLab",
    color: "#EB4925",
    logo: <FaGitlab className="w-6 h-6 text-white mr-2" />,
  },
  {
    value: 'Hashnode',
    label: 'Hashnode',
    color: '#0330D1',
    logo: <FaHashnode  className="w-6 h-6 text-white mr-2" />,
  },
  {
    value: "Stack Overflow",
    label: "Stack Overflow",
    color: "#EC7100", 
    logo: <SiStackoverflow className="w-6 h-6 text-white mr-2" />,
  },
];

export default platforms;
