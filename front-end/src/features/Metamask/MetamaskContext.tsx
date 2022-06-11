import React, { createContext, useCallback, useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { UserDataAccount } from "../../services/userService/userModel";
import UserService from "../../services/userService/userService";
import HttpAdapter from "../../lib/HttpAdapter";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

interface IMetamaskContext {
  userAccount: UserDataAccount;
  isConnectedAccount: boolean;
  shortAddress: string;
  doConnectAccount: () => Promise<void>;
}

interface Props {
  children?: React.ReactNode;
}

const MetamaskContext = createContext<Partial<IMetamaskContext>>({});

const MetamaskProvider: React.FC<Props> = ({ children }) => {
  const [userAccount, setUserAccount] = useState<UserDataAccount>(
    new UserDataAccount({})
  );
  const [isConnectedAccount, setIsConnectedAccount] = useState(false);

  const { address } = userAccount;

  const shortAddress = `${address?.slice(0, 5)}...${address?.slice(
    address?.length - 4,
    address?.length
  )}`;

  const getAccountData = async (accountAddress: string) => {
    try {
      const userConnection = (): UserService =>
        new UserService(new HttpAdapter());

      const dataAccount = await userConnection().getUserDataByAddress(
        accountAddress
      );

      setUserAccount(dataAccount);

      setIsConnectedAccount(true);
    } catch (error) {
      console.error("ERROR getAccountData:", error);
    }
  };

  const doConnectAccount = useCallback(async () => {
    try {
      const provider = window?.ethereum;

      if (!provider) return alert("Please install MetaMask!");

      if (provider !== window.ethereum) {
        return alert("Do you have multiple wallets installed?");
      }

      const account = await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          const firstAccount: string = JSON.parse(JSON.stringify(accounts))[0];
          setUserAccount(new UserDataAccount({ address: firstAccount }));
          return firstAccount;
        });

      if (Boolean(account)) {
        await getAccountData(account);
      }
    } catch (error) {
      console.error("ERROR doConnectAccount:", error);
    }
  }, []);

  const checkIfAccountIsAlreadyConnected = useCallback(async () => {
    try {
      if (!window.ethereum) return alert("Please install metamask ");

      const connectedAccount = await window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          const account: string = JSON.parse(JSON.stringify(accounts))[0];
          if (Boolean(account)) {
            return new UserDataAccount({ address: account });
          }
        });

      if (connectedAccount) {
        console.log("connectedAccount", connectedAccount);
        setUserAccount(connectedAccount);
        setIsConnectedAccount(true);
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
        shortAddress,
        doConnectAccount,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export { MetamaskContext };
export default MetamaskProvider;
