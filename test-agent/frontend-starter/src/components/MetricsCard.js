// src/components/MetricsCard.js
import React from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
} from '@chakra-ui/react';

const MetricsCard = ({ title, value, change, badgeColor = 'green' }) => {
  return (
    <Box
      bg="white"
      borderRadius="12px"
      p={4}
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.05)"
      border="1px solid"
      borderColor="gray.100"
      position="relative"
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontSize="xs" fontWeight="700" color="gray.500" letterSpacing="0.5px" textTransform="uppercase">
          {title}
        </Text>
        {change && (
          <Badge
            px={2}
            py={0.5}
            borderRadius="full"
            fontSize="xs"
            fontWeight="bold"
            bg={badgeColor === 'red' ? '#FEE2E2' : badgeColor === 'orange' ? '#FEF3C7' : '#D1FAE5'}
            color={badgeColor === 'red' ? '#DC2626' : badgeColor === 'orange' ? '#D97706' : '#059669'}
          >
            {change}
          </Badge>
        )}
      </Flex>
      <Text fontSize="2xl" fontWeight="800" color="#1E1E2D">
        {value}
      </Text>
    </Box>
  );
};

export default MetricsCard;