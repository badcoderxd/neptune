import Navbar from "rsuite/Navbar";
import Nav from "rsuite/Nav";
import FlexboxGrid from "rsuite/FlexboxGrid";
import InputNumber from "rsuite/InputNumber";
import { useEffect, useState } from "react";
import Modal from "rsuite/Modal";
import styles from "../../styles/Home.module.css";
import { Button } from "rsuite";

const Convertor = ({ connect, disconnect, walletDetails, wallet, status, setWallet }) => {
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {}, []);

    let toAmount, fromAmount;
    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * 3;
    } else {
        toAmount = amount;
        fromAmount = amount / 3;
    }

    function handleFromAmountChange(e) {
        setAmount(e);
        setAmountInFromCurrency(true);
    }

    function handleToAmountChange(e) {
        setAmount(e);
        setAmountInFromCurrency(false);
    }

    return (
        <>
            <Navbar>
                <Navbar.Brand href="#">TASK NEPTUNE</Navbar.Brand>
                <Nav>
                    <Nav.Item>Home</Nav.Item>
                    <Nav.Item>MetaMask</Nav.Item>
                </Nav>
            </Navbar>

            <div>
                <div className={styles.flexContainer} style={{ height: "100vh", background: "gray" }}>
                    <div className={styles.divo}>
                        <FlexboxGrid align="center">
                            <FlexboxGrid.Item>
                                <div style={{ width: 160, transformX: "20px" }}>
                                    <label>NEP</label>{" "}
                                    <InputNumber
                                        value={parseFloat(fromAmount).toFixed(2)}
                                        min={0}
                                        onChange={(e) => {
                                            handleFromAmountChange(e);
                                        }}
                                    />
                                </div>
                                <div style={{ width: 160 }}>
                                    <label>BUSD</label>{" "}
                                    <InputNumber
                                        value={parseFloat(toAmount).toFixed(2)}
                                        min={0}
                                        onChange={(e) => {
                                            handleToAmountChange(e);
                                        }}
                                    />
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                        <br />
                        {console.log(status)}
                        {!status ? (
                            <Button onClick={connect} color="green" appearance="primary">
                                {" "}
                                connect{" "}
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    disconnect();
                                    setWallet({
                                        account: "",
                                        balance: "",
                                        chainId: "",
                                    });
                                }}
                                color="red"
                                appearance="primary"
                            >
                                {" "}
                                disconnect{" "}
                            </Button>
                        )}
                        <br />
                        <br />
                        {status && (
                            <Button
                                onClick={() => {
                                    walletDetails();
                                    setOpen(true);
                                }}
                            >
                                {" "}
                                wallet details{" "}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Wallet Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {wallet?.account != "" && (
                        <div>
                            account : {wallet.account}
                            <br />
                            balance : {wallet.balance}
                            <br />
                            chain-id : {wallet.chainId}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default Convertor;

// 1 NEP is equal to 3 BUSD.
