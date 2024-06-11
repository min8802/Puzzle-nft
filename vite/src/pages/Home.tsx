import { Flex, Grid } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import PuzzleCard from "../components/PuzzleCard";

const Home: FC = () => {
    const [mintedList, setMintedList] = useState<boolean[]>([]);
  const { signer, mintContract } = useOutletContext<OutletContext>();

  const getCheckNfts = async () => {
    try {
      if (!signer || !mintContract) return;

      const response = await mintContract.checkNfts(signer.address);

      const temp = response.map((v: boolean) => v);
      setMintedList(temp);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getCheckNfts();
  }, [signer, mintContract]);

  useEffect(() => {console.log(mintedList), [mintedList]})

  return <Flex flexDir="column" w="100%">
    <Flex bgColor="blue.300" h={[20,20,40]} justifyContent="center" alignItems="center" fontSize={20}>퍼즐 조각 16개를 맞춰 보자 !!</Flex>
        <Grid templateColumns={"repeat(4, 1fr)"} w={80}>
            {mintedList.map((v, i) => (
             <PuzzleCard key={i} index={i} isMinted={v} />
             //v가 1:true, 2:false이런식의 배열 이었음
            ))}
        </Grid>
  </Flex>
};

export default Home;