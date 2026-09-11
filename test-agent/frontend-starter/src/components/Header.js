// src/components/Header.js
import React from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { 
  FiSearch, 
  FiBell, 
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiLogOut
} from 'react-icons/fi';

const Header = () => {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      bg="#3C2A58" // Figma Header Dark Purple
      px={6}
      py={3}
      zIndex={100}
      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
    >
      <Flex justify="space-between" align="center">
        {/* Left: Brand */}
        <Flex align="center">
          <Text fontSize="lg" fontWeight="700" color="white" letterSpacing="0.5px">
            ABC Company
          </Text>
        </Flex>
        
        {/* Right: Search & Profile */}
        <Flex align="center" gap={4}>
          <InputGroup w="320px">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="#A098B5" />
            </InputLeftElement>
            <Input 
              placeholder="Search conversations, agents..." 
              bg="#513B73"
              border="none"
              color="white"
              borderRadius="full"
              fontSize="sm"
              _placeholder={{ color: '#A098B5' }}
              _focus={{ bg: '#5B4380', boxShadow: 'none' }}
            />
          </InputGroup>

          <Menu>
            <Tooltip label="Notifications">
              <Box position="relative">
                <MenuButton
                  as={IconButton}
                  aria-label="Notifications"
                  icon={<FiBell color="white" />}
                  variant="ghost"
                  borderRadius="full"
                  _hover={{ bg: '#513B73' }}
                />
              </Box>
            </Tooltip>
            <MenuList>
              <MenuItem>New alert: High priority conversation</MenuItem>
              <MenuItem>Agent configuration updated</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={Flex}
              align="center"
              cursor="pointer"
            >
              <Avatar 
                name="Neha P" 
                size="sm" 
                bg="#E5C794" 
                color="#3C2A58" 
                fontWeight="bold"
                getInitials={() => 'NP'}
              />
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>Supervisor Profile</MenuItem>
              <MenuItem icon={<FiSettings />}>Settings</MenuItem>
              <MenuItem icon={<FiHelpCircle />}>Help</MenuItem>
              <MenuItem icon={<FiLogOut />}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

