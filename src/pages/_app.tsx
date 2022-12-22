import { type AppType } from "next/app";

import { router } from "@router";

import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default router.withTRPC(MyApp);
