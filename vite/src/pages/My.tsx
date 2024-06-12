import { Flex, Grid } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import NftCard from "../components/NftCard";

const My: FC = () => {
  const [mintedList, setMintedList] = useState<number[]>([]);

  const { signer, mintContract } = useOutletContext<OutletContext>();

  const getCheckNfts = async () => {
    try {
      if (!signer || !mintContract) return;

      const response = await mintContract.balanceOfNfts(signer.address);

      const temp = response.map((v: bigint) => Number(v));

      setMintedList(temp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCheckNfts();
  }, [signer, mintContract]);

  useEffect(() => console.log(mintedList), [mintedList]);

  return (
    <Flex flexDir="column" w="100%" my={[10, 10, 20]}>
      <Grid templateColumns="repeat(2, 1fr)" justifyItems="center" gap={4}>
        {mintedList.map((v,i) => {
            if(v > 0) {
                return <NftCard key={i} tokenId={i + 1} amount={v} />;
            }
        })}
      </Grid>
    </Flex>
  );
};

export default My;