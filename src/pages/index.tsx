import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { PageHead } from "~/components/common";

const Home: NextPage = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <>
      <PageHead />
      <main>
        <h1>Get your links out there in seconds.</h1>
        <Link
          href={isAuthenticated ? "/create" : "/auth/signin"}
          className="btn-primary btn"
        >
          {isAuthenticated ? "Create links" : "Get started"}
        </Link>
        {isAuthenticated && (
          <button className="btn" onClick={() => signOut()}>
            logout
          </button>
        )}
      </main>
    </>
  );
};

export default Home;
