// src/components/TemplateModal.js
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  VStack,
  HStack,
  Badge,
  Select,
  Grid,
  IconButton,
} from '@chakra-ui/react';
import { FiSearch, FiStar, FiCheckCircle } from 'react-icons/fi';

const mockTemplates = [
  {
    id: '1',
    title: 'Welcome new visitor',
    desc: 'Friendly greeting with clear next steps.',
    category: 'Onboarding',
    channel: 'Website',
    uses: '128 uses',
    starred: true,
    rawText: 'Welcome, {{customer_name}} 👋 Thanks for visiting {{workspace}}. I can help you get started or point you to the right product guide.',
    resolvedText: 'Welcome, Elena 👋 Thanks for visiting Acme. I can help you get started or point you to the right product guide.',
    variables: ['customer_name', 'workspace'],
  },
  {
    id: '2',
    title: 'Product tour invite',
    desc: 'Invite visitors to explore key features.',
    category: 'Onboarding',
    channel: 'Messenger',
    uses: '84 uses',
    starred: false,
    rawText: 'Hi {{customer_name}}, would you like a 2-minute tour of key {{workspace}} features?',
    resolvedText: 'Hi Elena, would you like a 2-minute tour of key Acme features?',
    variables: ['customer_name', 'workspace'],
  },
  {
    id: '3',
    title: 'Getting started checklist',
    desc: 'Share a short first-session checklist.',
    category: 'Onboarding',
    channel: 'Email',
    uses: '61 uses',
    starred: false,
    rawText: 'Hi {{customer_name}}, here is your quick onboarding checklist to set up {{workspace}}.',
    resolvedText: 'Hi Elena, here is your quick onboarding checklist to set up Acme.',
    variables: ['customer_name', 'workspace'],
  },
  {
    id: '4',
    title: 'Trial follow-up',
    desc: 'Guide visitors after trial activation.',
    category: 'Onboarding',
    channel: 'Mobile',
    uses: '61 uses',
    starred: false,
    rawText: 'Hello {{customer_name}}, how is your trial going on {{workspace}}? Let us know if you need help.',
    resolvedText: 'Hello Elena, how is your trial going on Acme? Let us know if you need help.',
    variables: ['customer_name', 'workspace'],
  },
];

const TemplateModal = ({ isOpen, onClose, onInsertTemplate, customerName = 'Elena' }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(mockTemplates[0]);
  const [activeCategory, setActiveCategory] = useState('All templates');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = mockTemplates.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInsert = () => {
    if (selectedTemplate) {
      onInsertTemplate(selectedTemplate.resolvedText || selectedTemplate.rawText);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(2px)" />
      <ModalContent borderRadius="20px" overflow="hidden" p={0} maxW="1100px">
        <ModalBody p={0}>
          <Grid templateColumns="240px 1fr 340px" minH="560px">
            {/* COLUMN 1: TEMPLATE LIBRARY SIDEBAR */}
            <Box bg="#FAF9FC" p={4} borderRight="1px solid" borderColor="gray.100">
              <Text fontSize="xs" fontWeight="700" color="gray.400" textTransform="uppercase" mb={3}>
                TEMPLATE LIBRARY
              </Text>

              <InputGroup size="xs" mb={4}>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.400" />
                </InputLeftElement>
                <Input placeholder="Search categories" borderRadius="full" bg="white" />
              </InputGroup>

              <VStack spacing={1} align="stretch" mb={4}>
                {[
                  { name: 'All templates', count: 24 },
                  { name: 'Popular' },
                  { name: 'Low use' },
                ].map((item, idx) => (
                  <Flex
                    key={idx}
                    justify="space-between"
                    align="center"
                    py={2}
                    px={3}
                    borderRadius="10px"
                    cursor="pointer"
                    bg={activeCategory === item.name ? '#ECE3FC' : 'transparent'}
                    color={activeCategory === item.name ? '#6E26D5' : 'gray.700'}
                    fontWeight={activeCategory === item.name ? '700' : '500'}
                    fontSize="xs"
                    onClick={() => setActiveCategory(item.name)}
                    _hover={{ bg: '#ECE3FC' }}
                  >
                    <HStack spacing={2}>
                      <Box w={2} h={2} borderRadius="full" bg={activeCategory === item.name ? '#6E26D5' : 'gray.400'} />
                      <Text>{item.name}</Text>
                    </HStack>
                    {item.count && (
                      <Badge borderRadius="full" px={2} py={0.5} bg="#6E26D5" color="white" fontSize="10px">
                        {item.count}
                      </Badge>
                    )}
                  </Flex>
                ))}
              </VStack>

              <Text fontSize="10px" fontWeight="700" color="gray.400" textTransform="uppercase" mb={2}>
                BY JOURNEY
              </Text>
              <VStack spacing={1} align="stretch" mb={4}>
                {['Onboarding', 'Billing', 'Engagement', 'Transaction'].map((cat, idx) => (
                  <Flex key={idx} align="center" py={1.5} px={3} fontSize="xs" color="gray.600" cursor="pointer" _hover={{ color: '#6E26D5' }}>
                    <Box w={1.5} h={1.5} borderRadius="full" bg="purple.300" mr={2.5} />
                    <Text>{cat}</Text>
                  </Flex>
                ))}
              </VStack>

              <Text fontSize="10px" fontWeight="700" color="gray.400" textTransform="uppercase" mb={2}>
                BY CHANNEL
              </Text>
              <VStack spacing={1} align="stretch">
                {['Email', 'Website', 'Mobile', 'Messenger'].map((chan, idx) => (
                  <Flex key={idx} align="center" py={1.5} px={3} fontSize="xs" color="gray.600" cursor="pointer" _hover={{ color: '#6E26D5' }}>
                    <Box w={1.5} h={1.5} borderRadius="full" bg="orange.300" mr={2.5} />
                    <Text>{chan}</Text>
                  </Flex>
                ))}
              </VStack>
            </Box>

            {/* COLUMN 2: RESPONSE TEMPLATES GRID */}
            <Box p={5} bg="white" borderRight="1px solid" borderColor="gray.100">
              <Text fontWeight="800" fontSize="md" color="#1E1E2D">
                Response Templates
              </Text>
              <Text fontSize="xs" color="gray.500" mb={4}>
                Choose a reply and customize it before inserting.
              </Text>

              <HStack spacing={3} mb={4}>
                <InputGroup size="sm" flex="1">
                  <InputLeftElement pointerEvents="none">
                    <FiSearch color="gray.400" />
                  </InputLeftElement>
                  <Input 
                    placeholder="Search title, message, or tag" 
                    borderRadius="full" 
                    fontSize="xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
                <Select size="sm" defaultValue="all" borderRadius="full" w="120px" fontSize="xs">
                  <option value="all">All channels</option>
                </Select>
                <Select size="sm" defaultValue="most" borderRadius="full" w="110px" fontSize="xs">
                  <option value="most">Most used</option>
                </Select>
              </HStack>

              <HStack spacing={2} mb={4}>
                <Button size="xs" borderRadius="full" bg="#ECE3FC" color="#6E26D5" fontWeight="700">
                  All templates
                </Button>
                <Button size="xs" borderRadius="full" variant="ghost" color="gray.600">
                  My team
                </Button>
                <Button size="xs" borderRadius="full" variant="ghost" color="gray.600">
                  Recently used
                </Button>
                <Spacer />
                <Text fontSize="xs" color="gray.400">
                  24 results
                </Text>
              </HStack>

              {/* 2x2 Templates Grid */}
              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                {filteredTemplates.map((tmpl) => {
                  const isSelected = selectedTemplate.id === tmpl.id;
                  return (
                    <Box
                      key={tmpl.id}
                      p={3.5}
                      borderRadius="14px"
                      border="1.5px solid"
                      borderColor={isSelected ? '#6E26D5' : 'gray.100'}
                      bg={isSelected ? '#FAF7FD' : 'white'}
                      cursor="pointer"
                      onClick={() => setSelectedTemplate(tmpl)}
                      _hover={{ borderColor: '#6E26D5' }}
                      position="relative"
                    >
                      <Flex justify="space-between" align="flex-start" mb={2}>
                        <Box w={6} h={2} borderRadius="full" bg={isSelected ? '#6E26D5' : 'gray.200'} />
                        <IconButton
                          icon={<FiStar color={tmpl.starred ? '#F59E0B' : '#CBD5E1'} fill={tmpl.starred ? '#F59E0B' : 'none'} />}
                          size="xs"
                          variant="ghost"
                          aria-label="Star"
                        />
                      </Flex>

                      <Text fontSize="xs" fontWeight="700" color="#1E1E2D" mb={1}>
                        {tmpl.title}
                      </Text>
                      <Text fontSize="11px" color="gray.500" mb={3} noOfLines={2}>
                        {tmpl.desc}
                      </Text>

                      <HStack spacing={1.5}>
                        <Badge borderRadius="md" px={2} py={0.5} bg="#ECE3FC" color="#6E26D5" fontSize="10px">
                          {tmpl.category}
                        </Badge>
                        <Badge borderRadius="md" px={2} py={0.5} bg="#E0F2FE" color="#0284C7" fontSize="10px">
                          {tmpl.channel}
                        </Badge>
                        <Text fontSize="10px" color="gray.400" ml="auto">
                          {tmpl.uses}
                        </Text>
                      </HStack>
                    </Box>
                  );
                })}
              </Grid>
            </Box>

            {/* COLUMN 3: PREVIEW PANEL */}
            <Box p={5} bg="white" display="flex" flexDirection="column">
              <Text fontWeight="800" fontSize="sm" color="#1E1E2D">
                Preview
              </Text>
              <Text fontSize="xs" color="gray.500" mb={4}>
                Review the selected reply before inserting.
              </Text>

              <Text fontSize="10px" fontWeight="700" color="gray.400" textTransform="uppercase" mb={1}>
                PREVIEW AS
              </Text>
              <Select size="sm" defaultValue="visitor" borderRadius="8px" mb={4} fontSize="xs">
                <option value="visitor">New visitor</option>
                <option value="returning">Returning customer</option>
              </Select>

              {/* Live Preview Card */}
              <Box bg="#F8F9FC" p={4} borderRadius="12px" border="1px solid" borderColor="gray.100" mb={4}>
                <Text fontSize="10px" color="gray.400" mb={2}>Live preview</Text>
                <Box bg="white" p={3} borderRadius="10px" border="1px solid" borderColor="gray.200" boxShadow="xs" mb={3}>
                  <Text fontSize="xs" fontWeight="700" color="#1E1E2D" mb={1}>
                    Welcome, {customerName} 👋
                  </Text>
                  <Text fontSize="11px" color="gray.600" lineHeight="1.4">
                    {selectedTemplate.resolvedText || selectedTemplate.rawText}
                  </Text>
                </Box>
                <Button size="xs" bg="#3C2A58" color="white" w="100%" borderRadius="6px">
                  View getting started
                </Button>
              </Box>

              {/* Resolved Variables Banner */}
              <Box bg="#D1FAE5" p={3} borderRadius="10px" mb={4}>
                <HStack spacing={2} align="center">
                  <FiCheckCircle color="#059669" size={16} />
                  <Box>
                    <Text fontSize="xs" fontWeight="700" color="#047857">
                      2 variables resolved
                    </Text>
                    <Text fontSize="10px" color="#065F46">
                      Visitor name and workspace
                    </Text>
                  </Box>
                </HStack>
              </Box>

              <Text fontSize="10px" color="gray.400" mb={4} mt="auto">
                You can edit the message after inserting.
              </Text>

              <HStack spacing={3} justify="flex-end">
                <Button size="sm" variant="outline" borderRadius="8px" onClick={onClose} fontSize="xs">
                  Cancel
                </Button>
                <Button size="sm" bg="#3C2A58" color="white" borderRadius="8px" onClick={handleInsert} fontSize="xs" _hover={{ bg: '#513B73' }}>
                  Insert
                </Button>
              </HStack>
            </Box>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Spacer = () => <Box flex="1" />;

export default TemplateModal;
