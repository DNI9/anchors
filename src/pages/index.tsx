import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PageHead } from "~/components/common";

const Home: NextPage = () => {
  const { status } = useSession();

  return (
    <>
      <PageHead />

      <main className="container px-5">
        <h1>Get your links out there in seconds.</h1>
        <Link
          className="btn-primary btn"
          href={status === "authenticated" ? "/admin" : "/auth/signin"}
        >
          Get started
        </Link>
      </main>
    </>
  );
};

export default Home;
