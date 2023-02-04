import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { PageHead } from "~/components/common";
import { LinkInput } from "~/components/forms";
import { SocialTitles } from "~/constants/app";
import { getServerAuthSession } from "~/server/common/get-server-auth-session";

const CreatePage: NextPage = () => {
  const [linkCounter, setLinkCounter] = useState(1);
  const [links, setLinks] = useState(new Map([[SocialTitles.at(0), ""]]));

  return (
    <>
      <PageHead title="Create your link page" />

      <main className="container mx-auto max-w-lg">
        <h1>create</h1>
        <div className="flex flex-col gap-2">
          <button className="btn-primary btn">Add link</button>
          <button className="btn">Save</button>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default CreatePage;
