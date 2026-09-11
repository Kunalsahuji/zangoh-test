// src/components/Sidebar.js
import React from 'react';
import {
  Box,
  VStack,
  Icon,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiSettings, 
  FiMessageSquare, 
  FiBriefcase,
  FiZap
} from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { name: 'Dashboard', icon: FiHome, path: '/' },
    { name: 'Conversations', icon: FiMessageSquare, path: '/conversation/1' },
    { name: 'AI Agents', icon: FiBriefcase, path: '/agent-config' },
    { name: 'Templates', icon: FiZap, path: '/Analysis' },
  ];
  
  return (
    <Box
      w="220px"
      bg="white"
      borderRadius="16px"
      p={3}
      boxShadow="0px 1px 4px rgba(0, 0, 0, 0.05)"
      display={{ base: 'none', md: 'flex' }}
      flexDirection="column"
      minH="calc(100vh - 80px)"
    >
      <VStack spacing={2} align="stretch" pt={2}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Button
              key={item.path}
              as={Link}
              to={item.path}
              variant="ghost"
              justifyContent="flex-start"
              py={5}
              px={4}
              leftIcon={<Icon as={item.icon} boxSize={5} color={active ? '#6E26D5' : 'gray.500'} />}
              bg={active ? '#ECE3FC' : 'transparent'}
              color={active ? '#6E26D5' : 'gray.600'}
              fontWeight={active ? '700' : '500'}
              borderRadius="12px"
              _hover={{
                bg: active ? '#ECE3FC' : 'gray.100',
              }}
            >
              {item.name}
            </Button>
          );
        })}
      </VStack>
      
      <Spacer />

      <VStack spacing={1} align="stretch" pb={2}>
        <Button
          variant="ghost"
          justifyContent="flex-start"
          py={5}
          px={4}
          leftIcon={<Icon as={FiSettings} boxSize={5} color="gray.500" />}
          color="gray.600"
          fontWeight="500"
          borderRadius="12px"
          _hover={{
            bg: 'gray.100',
          }}
        >
          Settings
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;