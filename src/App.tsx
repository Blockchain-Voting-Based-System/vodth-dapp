import React, { useState, useEffect } from 'react';
// import { ConnectButton } from "@mysten/dapp-kit";
// import { Box, Container, Flex, Heading } from "@radix-ui/themes";
// import { WalletStatus } from "./WalletStatus";
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <div className="flex h-screen bg-slate-900 dark:bg-gray-900">
        <section className="w-[10%] sm:w-[15%]">
          <Sidebar />
        </section>
        <section className="flex flex-col w-[90%] sm:w-[85%] overflow-auto">
          <Main />
        </section>
      </div>
      {/* <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-10">
        <Flex
          px="4"
          py="2"
          justify="between"
          style={{
            borderBottom: "1px solid var(--gray-a2)",
          }}
        >
          <Box>
            <Heading className="text-black dark:text-white">dApp Starter Template</Heading>
          </Box>
          <Box>
            <ConnectButton />
          </Box>
        </Flex>
      </div>
      <Container className="mt-16"> 
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          <WalletStatus />
        </Container>
      </Container> */}
       <button //darkmode button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded"
        onClick={() => setDarkMode(!darkMode)}
      >
        Dark Mode
      </button> 
    </>
  );
}

export default App;
