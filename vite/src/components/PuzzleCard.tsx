import { Box, GridItem, Image } from "@chakra-ui/react";
import { FC } from "react";

interface PuzzleCardProps {
  index: number;
  balance: number;
}

const PuzzleCard: FC<PuzzleCardProps> = ({ index, balance }) => {
  return (
    <GridItem pos="relative" w={[20, 20, 40]} h={[20, 20, 40]}>
      {!balance && (
        <Box
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bgColor="rgba(0,0,0,0.5)"
        />
      )}
      <Image
        src={`/images/puzzle/${index + 1}.png`}
        alt={`Save the SEA #${index + 1}`}
      />
    </GridItem>
  );
};

export default PuzzleCard;