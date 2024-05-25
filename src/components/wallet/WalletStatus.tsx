import { useCurrentAccount } from "@mysten/dapp-kit";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { OwnedObjects } from "../../OwnedObjects";

export function WalletStatus() {
  const account = useCurrentAccount();

  return (
    <div>
      <Heading>Wallet Status</Heading>
      {account ? (
        <Flex direction="column">
          <Text>Wallet connected</Text>
          <Text>Address: {account.address}</Text>
        </Flex>
      ) : (
        <Text>Wallet not connected</Text>
      )}
      <OwnedObjects />
    </div>
  );
}
