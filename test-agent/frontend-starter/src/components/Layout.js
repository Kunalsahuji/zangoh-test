// src/components/Layout.js
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Box minH="100vh" bg="#F3F4F8">
      <Header />
      <Flex p={5} gap={5} maxW="1600px" mx="auto">
        <Sidebar />
        <Box as="main" flex="1" overflow="hidden">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;