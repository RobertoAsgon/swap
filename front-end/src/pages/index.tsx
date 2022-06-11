import type { NextPage } from "next";
import { useContext } from "react";
import { MetamaskContext } from "../features/Metamask/MetamaskContext";

const Home: NextPage = () => {
  const { userAccount, shortAddress, doConnectAccount } =
    useContext(MetamaskContext);

  return (
    <div>
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <button
          onClick={async () => doConnectAccount && (await doConnectAccount())}
        >
          {userAccount?.address ? shortAddress : "Connect Metamask"}
        </button>
      </main>
    </div>
  );
};

export default Home;
