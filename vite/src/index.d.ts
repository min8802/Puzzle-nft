interface Window {
    ethereum : any
}

interface NftMetadata {
    name: string;
    description: string;
    image: string;
  }

  interface StsNftMetadata extends NftMetadata {
    tokenId: number;
    amount: number;
  }