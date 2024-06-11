import { Box, GridItem, Image } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

interface PuzzleCardProps {
  index: number;
  isMinted: boolean;
}

const PuzzleCard: FC<PuzzleCardProps> = ({ index, isMinted }) => {
  const [nftMetadata, setMetadata] = useState<NftMetadata>();

  const getNftMetadata = async () => {
    try {
      const response = await axios.get<NftMetadata>(
        `${import.meta.env.VITE_METADATA_URI}${index + 1}.json`
      );

      setMetadata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, []);

  return (
    <GridItem pos="relative" bgColor="red.100" w={20} h={20}>
      {!isMinted && (
        <Box
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bgColor="rgba(0,0,0,0.5)"
        />
      )}
      {nftMetadata && <Image src={nftMetadata.image} alt={nftMetadata.name} />}
    </GridItem>
  );
};

export default PuzzleCard;