import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { JsonRpcSigner } from "ethers";
import { Dispatch, FC, SetStateAction} from "react";
import { useNavigate } from "react-router-dom";
import { useMetamask } from "../lib";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const navLinks  = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Mint",
        path: "/mint",
    },
    {
        name: "My",
        path: "/my",
    },
    {
        name: "Sale",
        path: "/sale",
    },
]

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
    const navigate = useNavigate();

    const onClickLogOut = () => {
        setSigner(null);
    };

    return (
        <Flex h={20} justifyContent="space-between" alignItems="center" px={4}>
        <Flex w={40} fontSize={20} fontWeight="semibold">
            🐢 Save the SEA
        </Flex>
        <Flex display={["none", "none", "flex"]} gap={8}>
            {navLinks.map((v,i) => (
                <Button key={i} variant="link" colorScheme="blue" onClick={() => navigate(v.path)}>
                    {v.name}
                </Button>
            ))}
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
            <Button colorScheme="blue" onClick={() => useMetamask(setSigner)}>
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
              <MenuItem onClick={() => useMetamask(setSigner)}>🦊 로그인</MenuItem>
            )}
            {navLinks.map((v, i) => (
              <MenuItem key={i} onClick={() => navigate(v.path)}>
                {v.name}
              </MenuItem>
            ))}
            {signer && <MenuItem onClick={onClickLogOut}>로그아웃</MenuItem>}
          </MenuList>
            </Menu>
        </Flex>
        </Flex>
    );
};

export default Header;