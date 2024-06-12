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

  useEffect(() => console.log(nftMetadata), [nftMetadata]);

  return (
    <GridItem pos="relative" w={[20, 20, 40]} h={[20, 20, 40]}>
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
           <Image src={`/images/puzzle/${index+1}.png`} alt={`Save the SEA #${index+1}`} />
    </GridItem>
  );
};

export default PuzzleCard;