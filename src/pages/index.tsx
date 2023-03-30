import { type NextPage } from "next";
import Head from "next/head";
import Card from "@/components/card/Card";
import { trpc } from "@/utils/trpc";

const Home: NextPage = () => {

  const allPlants = trpc.plantRouter.allPlants.useQuery();

  return (
    <>
      <Head>
        <title>Plant Keeper</title>
        <meta name="description" content="Never forget to water your plants again" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-gray-900">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 relative text-amber-50">
          {allPlants.isLoading && (
            <Card title="Loading" />
          )}
          {allPlants.data && allPlants.data.map((plant) => {
            return <Card
              key={plant.id}
              title={plant.name}
              description={plant.description}
              cover={""}
              waterAmount={plant.amount}
            />;
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
