import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { JsonRpcSigner, ethers } from "ethers";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
    const navigate = useNavigate();

    const onClickMetamask = async () => {
        try {
        if (!window.ethereum) return;

        const provider = new ethers.BrowserProvider(window.ethereum);

        setSigner(await provider.getSigner());
        } catch (error) {
        console.error(error);
        }
    };

    const onClickLogOut = () => {
        setSigner(null);
    };

    return (
        <Flex h={20} justifyContent="space-between" alignItems="center" px={4}>
        <Flex w={40} fontSize={20} fontWeight="semibold">
            🐢 Save the SEA
        </Flex>
        <Flex display={["none", "none", "flex"]} gap={8}>
            <Button variant="link" colorScheme="blue" onClick={() => {navigate("/")}}>
            Home
            </Button>
            <Button variant="link" colorScheme="blue" onClick={() => {navigate("/mint")}}>
            Mint
            </Button>
            <Button variant="link" colorScheme="blue" onClick={() => {navigate("/sale")}}>
            Sale
            </Button>
        </Flex>
        <Flex display={["none", "none", "flex"]} w={40} justifyContent="end">
            {signer ? (
                <Menu>
                    <MenuButton
                        colorScheme="blue"
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                    >
                        {signer.address.substring(0, 7)}...
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={onClickLogOut}>로그아웃</MenuItem>
                    </MenuList>
                </Menu>
            ) : (
            <Button colorScheme="blue" onClick={onClickMetamask}>
                🦊 로그인
            </Button>
            )}
        </Flex>
        <Flex display={["flex", "flex", "none"]}>
            <Menu>
            <MenuButton
                colorScheme="blue"
                as={Button}
                rightIcon={<ChevronDownIcon />}
            >
                {signer ? `${signer.address.substring(0, 7)}...` : "메뉴"}
            </MenuButton>
            <MenuList>
                {!signer && (
                <MenuItem onClick={onClickMetamask}>🦊 로그인</MenuItem>
                )}
                <MenuItem>Home</MenuItem>
                <MenuItem>Mint</MenuItem>
                <MenuItem>Sale</MenuItem>
                {signer && <MenuItem onClick={onClickLogOut}>로그아웃</MenuItem>}
            </MenuList>
            </Menu>
        </Flex>
        </Flex>
    );
};

export default Header;