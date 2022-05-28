import React, { createContext, useCallback, useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

class UserAccount {
  constructor(partial: Partial<UserAccount>) {
    Object.assign(this, partial);
  }

  public address = "";
  public name = "";
  public email = "";
  public profile_picture = "";
}

interface IMetamaskContext {
  userAccount: UserAccount;
  isConnectedAccount: boolean;
}

interface Props {
  children?: React.ReactNode;
}

const MetamaskContext = createContext<Partial<IMetamaskContext>>({});

const MetamaskProvider: React.FC<Props> = ({ children }) => {
  const [userAccount, setUserAccount] = useState<UserAccount>(
    new UserAccount({})
  );
  const [isConnectedAccount, setIsConnectedAccount] = useState(false);

  console.log("userAccount", userAccount);
  console.log("isConnectedAccount", isConnectedAccount);

  const doConnectAccount = async () => {
    try {
      const provider = window?.ethereum;

      if (!provider) return alert("Please install MetaMask!");

      if (provider !== window.ethereum) {
        return alert("Do you have multiple wallets installed?");
      }

      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          const account: string = JSON.parse(JSON.stringify(accounts))[0];
          if (Boolean(account)) {
            return setUserAccount(new UserAccount({ address: account }));
          }
        });

      setIsConnectedAccount(true);
    } catch (error) {
      console.error("ERROR doConnectAccount:", error);
    }
  };

  const checkIfAccountIsAlreadyConnected = useCallback(async () => {
    try {
      if (!window.ethereum) return alert("Please install metamask ");

      const connectedAccount = await window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          const account: string = JSON.parse(JSON.stringify(accounts))[0];
          if (Boolean(account)) {
            return new UserAccount({ address: account });
          }
        });

      if (connectedAccount) {
        console.log("connectedAccount", connectedAccount);
        setUserAccount(connectedAccount);
        setIsConnectedAccount(true);
      }
      {
        await doConnectAccount();
      }
    } catch (error) {
      console.error("ERROR checkIfAccountIsAlreadyConnected:", error);
    }
  }, []);

  useEffect(() => {
    checkIfAccountIsAlreadyConnected();
  }, [checkIfAccountIsAlreadyConnected]);

  return (
    <MetamaskContext.Provider
      value={{
        userAccount,
        isConnectedAccount,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export { MetamaskContext };
export default MetamaskProvider;
