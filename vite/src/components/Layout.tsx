import { Flex } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import mintContractAbi from "../lib/mintContractAbi.json";
import { mintContractAddress } from "../lib/contractAddress";

export interface OutletContext {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
  mintContract: Contract | null;
}

const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [mintContract, setMintContract] = useState<Contract | null>(null);
  
  const switchToSepoliaNetwork = async () => {
    try {
      const sepoliaChainId = '0xaa36a7'; // Sepolia Testnet Chain ID (11155111 in decimal)
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: sepoliaChainId }],
      });
    } catch (error) {
      console.error('네트워크를 변경하지 못했습니다:', error);
    }
  };

  useEffect(() => {
    if (!signer) return;
    switchToSepoliaNetwork().then(() => setMintContract(new Contract(mintContractAddress, mintContractAbi, signer)));
  }, [signer]);

  return (
    <Flex maxW={768} mx="auto" minH="100vh" flexDir="column">
      <Header signer={signer} setSigner={setSigner} />
      <Flex flexGrow={1}>
        <Outlet context={{ signer, mintContract, setSigner }} />
      </Flex>
    </Flex>
  );
};

export default Layout;