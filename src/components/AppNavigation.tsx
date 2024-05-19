import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const AppNavigation = () => {
  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
          alignItems: "center",
        }}
      >
        <Box>
          <Link to="/">
            <Heading>Vodth DApp</Heading>
          </Link>
        </Box>

        <Link className="hover:underline" to="/events">
          Events
        </Link>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
    </>
  );
};

export default AppNavigation;
