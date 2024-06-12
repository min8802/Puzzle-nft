import { Button, Flex, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";

import { useMetamask } from "../lib";
import axios from "axios";
import MintModal from "../components/MintModal";

const Mint: FC = () => {
    const [tokenId, setTokenId] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [stsNftMetadata, setStsNftMetadata] = useState<StsNftMetadata>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onClickMintNft = async () => {
        try {
          if (!mintContract || !tokenId || !amount) return;

          setIsLoading(true);
    
          const response = await mintContract.mintNft(tokenId, amount);
    
          await response.wait();
    
          const axiosResponse = await axios.get<NftMetadata>(
            `${import.meta.env.VITE_METADATA_URI}/${tokenId}.json`
          );
    
          setStsNftMetadata({
            ...axiosResponse.data,
            tokenId,
            amount,
          });
          onOpen();

          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };

    useEffect(() => console.log(stsNftMetadata), [stsNftMetadata]);
    useEffect(() => console.log(stsNftMetadata), []);

  return (
    <>
    <Flex justifyContent="center" alignItems="center" flexDir="column" w="100%" mb={[10, 10, 20]}>
        <Image src="/images/fe65caf3bf1ad7644b6e50ab0917a9ea.png"/>
        <Text fontSize={[24, 24, 36]} fontWeight="semibold" mb={8}>
          바다 구하기 후원에 참여해 주세요
        </Text>
      {signer ? (
        <Flex alignItems="end" gap={[4, 4, 8]} mx={4}>
            <Flex flexDir="column" gap={[2, 2, 4]}>
                <Text fontSize={[12, 12, 16]} fontWeight="semibold">
                    NFT ID
                </Text>
                <NumberInput
                    size={["sm","sm","md"]}
                    value={tokenId}
                    onChange={(v) => setTokenId(Number(v))}
                    defaultValue={0}
                    min={0}
                    max={16}
                >
                <NumberInputField />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
                </NumberInput>
            </Flex>
            <Flex flexDir="column" gap={[2, 2, 4]}>
            <Text fontSize={[12, 12, 16]} fontWeight="semibold">
              발행량
            </Text>
            <NumberInput
              size={["sm", "sm", "md"]}
              value={amount}
              onChange={(v) => setAmount(Number(v))}
              defaultValue={0}
              min={0}
              max={100}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            </Flex>
            <Button
              colorScheme="blue"
              size={["sm", "sm", "md"]}
              onClick={onClickMintNft}
              isDisabled={isLoading || tokenId === 0 || amount === 0}
              isLoading={isLoading}
              loadingText="로딩증"
            >
              민팅하기
            </Button>
      </Flex>
      ) : (
        <Flex flexDir="column" gap={[4, 4, 8]} alignItems="center">
          <Text>"바다 구하기에 동참해 보세요"</Text>
          <Button colorScheme="blue" w="fit-content" onClick={() => useMetamask(setSigner)}>🦊 로그인</Button>
        </Flex>
      )}
    </Flex>
    <MintModal
        isOpen={isOpen}
        onClose={onClose}
        stsNftMetadata={stsNftMetadata}
      />
    </>
  );
};

export default Mint;