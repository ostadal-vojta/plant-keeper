import { type NextPage } from "next";
import Head from "next/head";
import Card from "../components/card/Card";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const plant = trpc.plantRouter.plant.useQuery({ plantId: 1 });

  return (
    <>
      <Head>
        <title>Plant Keeper</title>
        <meta name="description" content="Never forget to water your plants again" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#08090A] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {plant.isLoading && (
            <Card title='Loading' />
          )}
          {plant.data && (
            <Card title={plant.data?.plantName} description={plant.data?.description} />
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
