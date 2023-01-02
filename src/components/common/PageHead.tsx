import Head from "next/head";
import { appInfo } from "~/constants/app";

type Props = {
  title?: string;
  description?: string;
};

export const PageHead = ({ title, description }: Props) => {
  return (
    <Head>
      <title>{title ? `${title} - ${appInfo.name}` : appInfo.name}</title>
      <meta name="description" content={description ?? appInfo.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
