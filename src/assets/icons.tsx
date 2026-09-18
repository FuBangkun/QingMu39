import { splitProps, type JSX } from "solid-js";

export type IconName =
  | "link"
  | "blog"
  | "compact-disc"
  | "cloud"
  | "compass"
  | "book"
  | "fire"
  | "laptop-code"
  | "quote"
  | "quote-right"
  | "go-start"
  | "play"
  | "pause"
  | "go-end"
  | "close"
  | "volume-mute"
  | "volume-small"
  | "volume-notice"
  | "setting"
  | "github"
  | "add"
  | "bug"
  | "hourglass"
  | "hamburger"
  | "close-small"
  | "music"
  | "music-menu"
  | "check"
  | "success-picture"
  | "spa-candle"
  | "heart"
  | "qrcode";

interface IconNode {
  viewBox: string;
  stroke?: boolean;
  nodes: JSX.Element;
}

const ICONS: Record<IconName, IconNode> = {
  "link": {
    viewBox: "0 0 512 512",
        nodes: (
      <><path
  d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59c-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0c-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606c.648 17.722 3.826 35.527 9.69 52.721c1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96c28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83c-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37c-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569c-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51c27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612c5.864 17.194 9.042 34.999 9.69 52.721c.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
  fill="currentColor"
/></>
    ),
  },
  "blog": {
    viewBox: "0 0 512 512",
        nodes: (
      <><path
  d="M172.2 226.8c-14.6-2.9-28.2 8.9-28.2 23.8V301c0 10.2 7.1 18.4 16.7 22c18.2 6.8 31.3 24.4 31.3 45c0 26.5-21.5 48-48 48s-48-21.5-48-48V120c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24v248c0 89.5 82.1 160.2 175 140.7c54.4-11.4 98.3-55.4 109.7-109.7c17.4-82.9-37-157.2-112.5-172.2zM209 0c-9.2-.5-17 6.8-17 16v31.6c0 8.5 6.6 15.5 15 15.9c129.4 7 233.4 112 240.9 241.5c.5 8.4 7.5 15 15.9 15h32.1c9.2 0 16.5-7.8 16-17C503.4 139.8 372.2 8.6 209 0zm.3 96c-9.3-.7-17.3 6.7-17.3 16.1v32.1c0 8.4 6.5 15.3 14.8 15.9c76.8 6.3 138 68.2 144.9 145.2c.8 8.3 7.6 14.7 15.9 14.7h32.2c9.3 0 16.8-8 16.1-17.3c-8.4-110.1-96.5-198.2-206.6-206.7z"
  fill="currentColor"
/></>
    ),
  },
  "compact-disc": {
    viewBox: "0 0 496 512",
        nodes: (
      <><path
  d="M248 8C111 8 0 119 0 256s111 248 248 248s248-111 248-248S385 8 248 8zM88 256H56c0-105.9 86.1-192 192-192v32c-88.2 0-160 71.8-160 160zm160 96c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32s-14.3-32-32-32z"
  fill="currentColor"
/></>
    ),
  },
  "cloud": {
    viewBox: "0 0 640 512",
        nodes: (
      <><path
  d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160c0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4z"
  fill="currentColor"
/></>
    ),
  },
  "compass": {
    viewBox: "0 0 496 512",
        nodes: (
      <><path
  d="M225.38 233.37c-12.5 12.5-12.5 32.76 0 45.25c12.49 12.5 32.76 12.5 45.25 0c12.5-12.5 12.5-32.76 0-45.25c-12.5-12.49-32.76-12.49-45.25 0zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248s248-111.03 248-248S384.97 8 248 8zm126.14 148.05L308.17 300.4a31.938 31.938 0 0 1-15.77 15.77l-144.34 65.97c-16.65 7.61-33.81-9.55-26.2-26.2l65.98-144.35a31.938 31.938 0 0 1 15.77-15.77l144.34-65.97c16.65-7.6 33.8 9.55 26.19 26.2z"
  fill="currentColor"
/></>
    ),
  },
  "book": {
    viewBox: "0 0 448 512",
        nodes: (
      <><path
  d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7c-4.2-15.4-4.2-59.3 0-74.7c5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32c0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"
  fill="currentColor"
/></>
    ),
  },
  "fire": {
    viewBox: "0 0 384 512",
        nodes: (
      <><path
  d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99c-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z"
  fill="currentColor"
/></>
    ),
  },
  "laptop-code": {
    viewBox: "0 0 640 512",
        nodes: (
      <><path
  d="M255.03 261.65c6.25 6.25 16.38 6.25 22.63 0l11.31-11.31c6.25-6.25 6.25-16.38 0-22.63L253.25 192l35.71-35.72c6.25-6.25 6.25-16.38 0-22.63l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0l-58.34 58.34c-6.25 6.25-6.25 16.38 0 22.63l58.35 58.34zm96.01-11.3l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l58.34-58.34c6.25-6.25 6.25-16.38 0-22.63l-58.34-58.34c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63L386.75 192l-35.71 35.72c-6.25 6.25-6.25 16.38 0 22.63zM624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z"
  fill="currentColor"
/></>
    ),
  },
  "quote": {
    viewBox: "0 0 512 512",
        nodes: (
      <><path
  d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
  fill="currentColor"
/></>
    ),
  },
  "quote-right": {
    viewBox: "0 0 512 512",
        nodes: (
      <><path
  d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"
  fill="currentColor"
/></>
    ),
  },
  "go-start": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M34 36L22 24L34 12"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M14 12V36"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "play": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M15 24V11.8756L25.5 17.9378L36 24L25.5 30.0622L15 36.1244V24Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/></>
    ),
  },
  "pause": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M16 12V36"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M32 12V36"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "go-end": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M14 12L26 24L14 36"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M34 12V36"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "close": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/>
    <path
  d="M29.6567 18.3432L18.343 29.6569"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M18.3433 18.3432L29.657 29.6569"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "volume-mute": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><rect
  opacity="0.01"
  x="30"
  y="18"
  width="13"
  height="13"
  fill="#ff0"
  stroke="currentColor"
/>
    <rect
  x="30"
  y="18"
  width="13"
  height="13"
  fill="#ff0"
  stroke="currentColor"
/>
    <path
  d="M40.7348 20.2858L32.2495 28.7711"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M32.2496 20.2858L40.7349 28.7711"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M24 6V42C17 42 11.7985 32.8391 11.7985 32.8391H6C4.89543 32.8391 4 31.9437 4 30.8391V17.0108C4 15.9062 4.89543 15.0108 6 15.0108H11.7985C11.7985 15.0108 17 6 24 6Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/></>
    ),
  },
  "volume-small": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M24 6V42C17 42 11.7985 32.8391 11.7985 32.8391H6C4.89543 32.8391 4 31.9437 4 30.8391V17.0108C4 15.9062 4.89543 15.0108 6 15.0108H11.7985C11.7985 15.0108 17 6 24 6Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/>
    <path
  d="M32 15L32 15C32.6232 15.5565 33.1881 16.1797 33.6841 16.8588C35.1387 18.8504 36 21.3223 36 24C36 26.6545 35.1535 29.1067 33.7218 31.0893C33.2168 31.7885 32.6391 32.4293 32 33"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "volume-notice": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M24 6V42C17 42 11.7985 32.8391 11.7985 32.8391H6C4.89543 32.8391 4 31.9437 4 30.8391V17.0108C4 15.9062 4.89543 15.0108 6 15.0108H11.7985C11.7985 15.0108 17 6 24 6Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/>
    <path
  d="M32 15L32 15C32.6232 15.5565 33.1881 16.1797 33.6841 16.8588C35.1387 18.8504 36 21.3223 36 24C36 26.6545 35.1535 29.1067 33.7218 31.0893C33.2168 31.7885 32.6391 32.4293 32 33"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M34.2359 41.1857C40.0836 37.6953 44 31.305 44 24C44 16.8085 40.2043 10.5035 34.507 6.97906"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  fill="none"
/></>
    ),
  },
  "setting": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M18.2838 43.1713C14.9327 42.1736 11.9498 40.3213 9.58787 37.867C10.469 36.8227 11 35.4734 11 34.0001C11 30.6864 8.31371 28.0001 5 28.0001C4.79955 28.0001 4.60139 28.01 4.40599 28.0292C4.13979 26.7277 4 25.3803 4 24.0001C4 21.9095 4.32077 19.8938 4.91579 17.9995C4.94381 17.9999 4.97188 18.0001 5 18.0001C8.31371 18.0001 11 15.3138 11 12.0001C11 11.0488 10.7786 10.1493 10.3846 9.35011C12.6975 7.1995 15.5205 5.59002 18.6521 4.72314C19.6444 6.66819 21.6667 8.00013 24 8.00013C26.3333 8.00013 28.3556 6.66819 29.3479 4.72314C32.4795 5.59002 35.3025 7.1995 37.6154 9.35011C37.2214 10.1493 37 11.0488 37 12.0001C37 15.3138 39.6863 18.0001 43 18.0001C43.0281 18.0001 43.0562 17.9999 43.0842 17.9995C43.6792 19.8938 44 21.9095 44 24.0001C44 25.3803 43.8602 26.7277 43.594 28.0292C43.3986 28.01 43.2005 28.0001 43 28.0001C39.6863 28.0001 37 30.6864 37 34.0001C37 35.4734 37.531 36.8227 38.4121 37.867C36.0502 40.3213 33.0673 42.1736 29.7162 43.1713C28.9428 40.752 26.676 39.0001 24 39.0001C21.324 39.0001 19.0572 40.752 18.2838 43.1713Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/>
    <path
  d="M24 31C27.866 31 31 27.866 31 24C31 20.134 27.866 17 24 17C20.134 17 17 20.134 17 24C17 27.866 20.134 31 24 31Z"
  fill="#0ff"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/></>
    ),
  },
  "github": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M29.3444 30.4765C31.7481 29.977 33.9292 29.1108 35.6247 27.8391C38.5202 25.6676 40 22.3136 40 18.9999C40 16.6752 39.1187 14.505 37.5929 12.6668C36.7427 11.6425 39.2295 3.99989 37.02 5.02919C34.8105 6.05848 31.5708 8.33679 29.8726 7.83398C28.0545 7.29565 26.0733 6.99989 24 6.99989C22.1992 6.99989 20.4679 7.22301 18.8526 7.6344C16.5046 8.23237 14.2591 5.99989 12 5.02919C9.74086 4.05848 10.9736 11.9632 10.3026 12.7944C8.84119 14.6051 8 16.7288 8 18.9999C8 22.3136 9.79086 25.6676 12.6863 27.8391C14.6151 29.2857 17.034 30.2076 19.7401 30.6619"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  fill="none"
/>
    <path
  d="M19.7397 30.6619C18.5812 31.937 18.002 33.1478 18.002 34.2944C18.002 35.441 18.002 38.3464 18.002 43.0106"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  fill="none"
/>
    <path
  d="M29.3446 30.4766C30.4423 31.9174 30.9912 33.211 30.9912 34.3576C30.9912 35.5042 30.9912 38.3885 30.9912 43.0107"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  fill="none"
/>
    <path
  d="M6 31.2155C6.89887 31.3254 7.56554 31.7387 8 32.4554C8.65169 33.5303 11.0742 37.518 13.8251 37.518C15.6591 37.518 17.0515 37.518 18.0024 37.518"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  fill="none"
/></>
    ),
  },
  "add": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/>
    <path
  d="M24 16V32"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M16 24L32 24"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "bug": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M24 42C36 42 38 31.5324 38 28C38 24.8379 38 20.1712 38 14H10C10 17.4423 10 22.109 10 28C10 31.4506 12 42 24 42Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/>
    <path
  d="M4 8L10 14"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M44 8L38 14"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M4 27H10"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M44 27H38"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M7 44L13 38"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M41 44L35 38"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M24 42V14"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M14.9204 39.0407C17.0024 40.783 19.9244 41.9998 23.9999 41.9998C28.1112 41.9998 31.0487 40.7712 33.1341 39.0137"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M32 12.3333C32 7.73096 28.4183 4 24 4C19.5817 4 16 7.73096 16 12.3333V14H32V12.3333Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/></>
    ),
  },
  "hourglass": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M7 4H41"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M7 44H41"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M11 44C13.6667 30.6611 18 23.9944 24 24C30 24.0056 34.3333 30.6722 37 44H11Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/>
    <path
  d="M37 4C34.3333 17.3389 30 24.0056 24 24C18 23.9944 13.6667 17.3278 11 4H37Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/>
    <path
  d="M21 15H27"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M19 38H29"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "hamburger": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M7.94971 11.9497H39.9497"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M7.94971 23.9497H39.9497"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M7.94971 35.9497H39.9497"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "close-small": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M14 14L34 34"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M14 34L34 14"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "music": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M24 6V35"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M10 36.04C10 33.2565 12.2565 31 15.04 31H24V36.96C24 39.7435 21.7435 42 18.96 42H15.04C12.2565 42 10 39.7435 10 36.96V36.04Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
/>
    <path
  fill-rule="evenodd"
  clip-rule="evenodd"
  d="M24 14.0664L36.8834 17.1215V9.01341L24 6.00002V14.0664Z"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "music-menu": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M29 6V35"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M15 36.04C15 33.2565 17.2565 31 20.04 31H29V36.96C29 39.7435 26.7435 42 23.96 42H20.04C17.2565 42 15 39.7435 15 36.96V36.04Z"
  stroke="currentColor"
  stroke-width="4"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  fill-rule="evenodd"
  clip-rule="evenodd"
  d="M29 14.0664L41.8834 17.1215V9.01339L29 6V14.0664Z"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M6 8H20"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M6 16H20"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M6 24H16"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "check": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M10 24L20 34L40 14"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "success-picture": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M44 22C44 20.8954 43.1046 20 42 20C40.8954 20 40 20.8954 40 22H44ZM24 8C25.1046 8 26 7.10457 26 6C26 4.89543 25.1046 4 24 4V8ZM39 40H9V44H39V40ZM8 39V9H4V39H8ZM40 22V39H44V22H40ZM9 8H24V4H9V8ZM9 40C8.44772 40 8 39.5523 8 39H4C4 41.7614 6.23857 44 9 44V40ZM39 44C41.7614 44 44 41.7614 44 39H40C40 39.5523 39.5523 40 39 40V44ZM8 9C8 8.44772 8.44771 8 9 8V4C6.23858 4 4 6.23857 4 9H8Z"
  fill="#fff"
  stroke="currentColor"
/>
    <path
  d="M6 35L16.6931 25.198C17.4389 24.5143 18.5779 24.4953 19.3461 25.1538L32 36"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M28 31L32.7735 26.2265C33.4772 25.5228 34.5914 25.4436 35.3877 26.0408L42 31"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M31.4142 9.58579C30.6332 8.80474 29.3668 8.80474 28.5858 9.58579C27.8047 10.3668 27.8047 11.6332 28.5858 12.4142L31.4142 9.58579ZM34 15L32.5858 16.4142C33.3668 17.1953 34.6332 17.1953 35.4142 16.4142L34 15ZM43.4142 8.41421C44.1953 7.63317 44.1953 6.36683 43.4142 5.58579C42.6332 4.80474 41.3668 4.80474 40.5858 5.58579L43.4142 8.41421ZM28.5858 12.4142L32.5858 16.4142L35.4142 13.5858L31.4142 9.58579L28.5858 12.4142ZM35.4142 16.4142L43.4142 8.41421L40.5858 5.58579L32.5858 13.5858L35.4142 16.4142Z"
  fill="#fff"
  stroke="currentColor"
/></>
    ),
  },
  "spa-candle": {
    viewBox: "0 0 48 48",
    stroke: true,
    nodes: (
      <><path
  d="M6.54086 26.4339C6.2633 25.1848 7.21374 24 8.49323 24H39.5068C40.7863 24 41.7367 25.1848 41.4591 26.4339L38.348 40.4339C38.1447 41.3489 37.3331 42 36.3957 42H11.6043C10.6669 42 9.85532 41.3489 9.65197 40.4339L6.54086 26.4339Z"
  fill="#000"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
    <path
  d="M20.643 9.88858C22.0743 8.00815 23.1776 5.41033 23.774 4C24.8177 5.41033 27.084 8.94836 27.7997 10.8288C28.6942 13.1793 26.4578 16 23.774 16C21.0903 16 18.8538 12.2391 20.643 9.88858Z"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/>
    <path
  d="M24 16V24"
  stroke="currentColor"
  stroke-width="4"
  stroke-linecap="round"
  stroke-linejoin="round"
  fill="none"
/></>
    ),
  },
  "heart": {
    viewBox: "0 0 512 512",
    nodes: (
      <path
  d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
  fill="currentColor"
  stroke="none"
/>
    ),
  },
  "qrcode": {
    viewBox: "0 0 24 24",
    nodes: (
      <path
  d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 17h2v2h-2zM19 19h2v2h-2zM19 15h2v2h-2zM15 19h2v2h-2z"
  fill="currentColor"
  stroke="none"
/>
    ),
  },
};

interface IconProps extends JSX.SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  color?: string;
}

/** 通用图标（IconPark 描边 / FontAwesome 填充，字形与原版一致） */
export function Icon(props: IconProps) {
  const [local, rest] = splitProps(props, ["name", "size", "color"]);
  const size = () => (typeof local.size === "number" ? `${local.size}px` : local.size || "1em");
  // 需响应式读取 name，否则动态图标（如播放/暂停）不随状态切换
  const g = () => ICONS[local.name];
  return (
    <svg
      viewBox={g().viewBox}
      width={size()}
      height={size()}
      fill={local.color || "currentColor"}
      stroke={local.color || "currentColor"}
      stroke-width={g().stroke ? 4 : undefined}
      stroke-linecap={g().stroke ? "round" : undefined}
      stroke-linejoin={g().stroke ? "round" : undefined}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {g().nodes}
    </svg>
  );
}

export const IconSlot = Icon;
