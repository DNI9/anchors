import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { trpc } from "~/utils/trpc";
import { appInfo } from "../constants/app";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: secretMsg } = trpc.auth.getSecretMessage.useQuery(undefined, {
    enabled: !!sessionData?.user?.id,
  });

  return (
    <>
      <Head>
        <title>{appInfo.name}</title>
        <meta name="description" content={appInfo.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>{appInfo.name}</p>
        <p>
          <span className="text-blue-500">{secretMsg}</span>
        </p>
        <button onClick={sessionData ? () => signOut() : () => signIn()}>
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </main>
    </>
  );
};

export default Home;
