import { Container } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";
import AppNav from "./components/AppNav";

function App() {
  return (
    <>
      <AppNav />
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          <WalletStatus />
        </Container>
      </Container>
    </>
  );
}

export default App;
