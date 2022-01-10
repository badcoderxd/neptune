import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/connectors/Injected";
import { useState } from "react";
import Convertor from "../components/convertor/Convertor";

export default function Home() {
    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const [wallet, setWallet] = useState({
        account: "",
        balance: "",
        chainId: "",
    });

    const walletDetails = async () => {
        const bal = await library?.eth.getBalance(account);
        const acc = await library?.eth.getAccounts();
        const cId = await library?.eth.getChainId();
        console.log(bal, acc, cId, "bal");
        setWallet({
            account: acc[0],
            balance: bal,
            chainId: cId,
        });
    };

    async function connect() {
        try {
            await activate(injected);
        } catch (ex) {
            console.log(ex);
        }
    }

    async function disconnect() {
        try {
            deactivate();
            console.log("logged");
        } catch (ex) {
            console.log(ex);
        }
    }

    return (
        <>
            <div>
                <Convertor connect={connect} disconnect={disconnect} walletDetails={walletDetails} wallet={wallet} status={active || false} setWallet={setWallet} />
            </div>
        </>
    );
}
