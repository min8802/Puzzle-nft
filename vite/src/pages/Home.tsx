import { Box, Button, Flex, Grid, Image, Progress, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import PuzzleCard from "../components/PuzzleCard";

const Home: FC = () => {
    const [mintedList, setMintedList] = useState<number[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const navigate = useNavigate();
  const { signer, mintContract } = useOutletContext<OutletContext>();
  

  const getCheckNfts = async () => {
    try {
      if (!signer || !mintContract) return;

      const response = await mintContract.balanceOfNfts(signer.address);

      console.log(response);

      const temp = response.map((v: bigint) => Number(v));

      console.log(temp);

      setMintedList(temp);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getCheckNfts();
  }, [signer, mintContract]);

  useEffect(() => {console.log(mintedList), [mintedList]});

  useEffect(() => {
    if (mintedList.length === 0) return;

    const temp = mintedList.filter((v) => {
      if (v) {
        return v;
      }
    });

    console.log(temp);

    setProgress((temp.length / mintedList.length) * 100);
  }, [mintedList]);

  return <Flex flexDir="column" w="100%" mb={20}>
      <Flex h={[20,20,40]} justifyContent="center" alignItems="center" fontSize={[14,14,24]} flexDir="column">
      "바다는 지구의 숨결입니다. 바다를 보호하는 것은 우리 모두의 책임입니다."
      <Button mt={4} onClick={() => navigate("/mint")} size={{ base: "sm", md: "md" }}>바다 구하기 후원</Button>
      </Flex>
      <Flex flexGrow={1} justifyContent="center" alignItems="center" flexDir="column">
      {signer ? (
          <>
           <Flex
              w={[320, 320, 640]}
              my={[4, 4, 8]}
              gap={[2, 2, 4]}
              alignItems="center"
            >
              <Text fontSize={[16, 16, 24]}>{progress}%</Text>
              <Progress hasStripe value={progress} h={[4, 4, 8]} flexGrow={1} />
            </Flex>
          <Grid templateColumns={"repeat(4, 1fr)"}>
            {mintedList.map((v, i) => (
              <PuzzleCard key={i} index={i} balance={v} />
            ))}
          </Grid>
          </>
        ) : (
          <Box pos="relative" w={[320, 320, 640]}>
            <Box
              pos="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bgColor="rgba(0,0,0,0.5)"
            />
            <Image src="/images/save_the_sea.webp" alt="Save the SEA" />
          </Box>
        )}
      </Flex>
  </Flex>
};

export default Home;