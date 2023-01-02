import { type GetServerSideProps } from "next";
import { type ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { PageHead } from "~/components/common";
import { getServerAuthSession } from "~/server/common/get-server-auth-session";

type Props = {
  providers: ClientSafeProvider[];
};

export default function SignIn({ providers }: Props) {
  return (
    <>
      <PageHead title="Login" />
      <main>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="btn-primary btn"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
