import { type GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState, type FormEvent } from "react";
import { getServerAuthSession } from "~/server/common/get-server-auth-session";
import { trpc } from "~/utils/trpc";

export default function SetupProfile() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { mutate } = trpc.user.updateUsername.useMutation({
    onError(e) {
      setError(e.message);
    },
    onSuccess() {
      router.push("/admin");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    setError("");

    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    mutate({ username });
  };

  return (
    <div className="flex gap-2">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          id="username"
          name="username"
          className={`input-primary input ${error ? "input-error" : ""}`}
          type="text"
          placeholder="Your username e.g. john"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        {error ? <span className="text-sm text-red-300">{error}</span> : null}
      </form>
      <button onClick={handleSubmit} className="btn-primary btn">
        Claim my link
      </button>
    </div>
  );
}

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

  // if user already has username setup, redirect them to dashboard
  if (session.user?.username) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
