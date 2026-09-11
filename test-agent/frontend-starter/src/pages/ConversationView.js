// src/pages/ConversationView.js
import React, { useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  Text,
  Button,
  VStack,
  HStack,
  Avatar,
  Badge,
  Input,
  Textarea,
  Progress,
  useToast,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiSend, FiCheckCircle } from 'react-icons/fi';
import TemplateModal from '../components/TemplateModal';


const mockConversationsList = [
  {
    id: '1',
    name: 'Elena Vasquez',
    caseId: '#84291',
    topic: 'Refund blocked',
    time: '12:42',
    status: 'Critical',
    statusBg: '#FEE2E2',
    statusColor: '#DC2626',
    avatar: 'E',
    meta: 'Returns • Web chat • EN-US • VIP tier',
    lifetimeValue: '₹1.24L',
    orders: 38,
    returnRate: '5.2%',
    sentiment: '-0.62',
    location: 'VIP • 3.8 years • Madrid',
  },
  {
    id: '2',
    name: 'Marcus Lee',
    caseId: '#84275',
    topic: 'Account locked',
    time: '09:18',
    status: 'High',
    statusBg: '#FEF3C7',
    statusColor: '#D97706',
    avatar: 'M',
    meta: 'Account • Web chat • EN-US • Standard',
    lifetimeValue: '₹45.0K',
    orders: 12,
    returnRate: '1.2%',
    sentiment: '-0.40',
    location: 'Standard • 1.2 years • London',
  },
  {
    id: '3',
    name: 'Noah Williams',
    caseId: '#84263',
    topic: 'Delivery exception',
    time: '09:18',
    status: 'High',
    statusBg: '#FEF3C7',
    statusColor: '#D97706',
    avatar: 'N',
    meta: 'Logistics • App • EN-US • Gold',
    lifetimeValue: '₹89.5K',
    orders: 24,
    returnRate: '3.1%',
    sentiment: '-0.25',
    location: 'Gold • 2.5 years • Berlin',
  },
  {
    id: '4',
    name: 'Ava Thompson',
    caseId: '#84241',
    topic: 'Product defect',
    time: '09:18',
    status: 'Watch',
    statusBg: '#E0F2FE',
    statusColor: '#0284C7',
    avatar: 'A',
    meta: 'Tech • Web chat • EN-US • Silver',
    lifetimeValue: '₹28.0K',
    orders: 8,
    returnRate: '0.0%',
    sentiment: '+0.10',
    location: 'Silver • 0.8 years • Paris',
  },
];

const mockMessages = [
  { sender: 'CUSTOMER', time: '11:31', text: 'I returned the item last week, but the refund is still blocked.' },
  { sender: 'AI AGENT', time: '11:32', text: "I found the return receipt and carrier confirmation. I'm checking the refund policy now." },
  { sender: 'CUSTOMER', time: '11:34', text: "I need the refund today. This is the second time I'm contacting support." },
  { sender: 'AI AGENT', time: '11:35', text: "The amount exceeds my approval limit. I've prepared the evidence for supervisor review." },
];

const responseTemplates = [
  "Hi {{customer_name}} — I've reviewed the return evidence and approved an expedited refund of ₹8,420 to your original payment method.",
  "Hi {{customer_name}}, thank you for reaching out. I am taking over this case and processing your request immediately.",
  "We apologize for the delay. Your case has been escalated to Tier 2 support, and we will update you within 15 minutes."
];

const ConversationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [activeId, setActiveId] = useState(id || '1');
  const [isTakenOver, setIsTakenOver] = useState(false);
  const [messages, setMessages] = useState(mockMessages);
  const [responseText, setResponseText] = useState(
    "Hi Elena — I've reviewed the return evidence and approved an expedited refund..."
  );
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [isResolved, setIsResolved] = useState(false);

  const { isOpen: isTemplateModalOpen, onOpen: onOpenTemplateModal, onClose: onCloseTemplateModal } = useDisclosure();

  const activeConv = mockConversationsList.find(c => c.id === activeId) || mockConversationsList[0];

  const handleSelectConv = (convId) => {
    setActiveId(convId);
    navigate(`/conversation/${convId}`);
  };

  const handleToggleTakeover = () => {
    setIsTakenOver(prev => !prev);
    toast({
      title: !isTakenOver ? "Supervision Assumed" : "Returned Control to AI",
      description: !isTakenOver ? "You are now interacting directly as supervisor." : "AI agent is handling automated responses.",
      status: !isTakenOver ? "warning" : "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSendMessage = () => {
    if (!responseText.trim()) return;
    setMessages(prev => [
      ...prev,
      { sender: 'SUPERVISOR', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: responseText }
    ]);
    setResponseText('');
    toast({
      title: "Message Sent",
      status: "success",
      duration: 2000,
    });
  };

  const handleApproveAction = () => {
    setResponseText(`Hi ${activeConv.name.split(' ')[0]} — I've reviewed the return evidence and approved an expedited refund of ₹8,420.`);
    toast({
      title: "Co-pilot Action Selected",
      description: "Response template loaded into composer.",
      status: "success",
      duration: 2000,
    });
  };

  const handleMarkResolved = () => {
    setIsResolved(true);
    toast({
      title: "Case Resolved",
      description: `Case ${activeConv.caseId} marked as resolved successfully.`,
      status: "success",
      duration: 3000,
    });
  };

  return (
    <Grid templateColumns={{ base: '1fr', lg: '280px 1fr 300px' }} gap={4} minH="calc(100vh - 100px)">
      {/* LEFT PANEL: Customer Conversations List */}
      <Box bg="white" borderRadius="16px" p={3.5} boxShadow="sm" border="1px solid" borderColor="gray.100">
        <Text fontWeight="700" fontSize="sm" color="#1E1E2D" mb={3}>
          Customer Conversations
        </Text>

        <InputGroup size="sm" mb={3}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.400" />
          </InputLeftElement>
          <Input 
            placeholder="Search customer or case..." 
            borderRadius="full" 
            bg="gray.50" 
            fontSize="xs"
          />
        </InputGroup>

        <VStack spacing={2} align="stretch">
          {mockConversationsList.map((item) => {
            const isSelected = item.id === activeId;
            return (
              <Box
                key={item.id}
                p={3}
                borderRadius="12px"
                cursor="pointer"
                bg={isSelected ? '#F5EFFC' : 'white'}
                border="1px solid"
                borderColor={isSelected ? '#6E26D5' : 'gray.100'}
                onClick={() => handleSelectConv(item.id)}
                _hover={{ bg: isSelected ? '#F5EFFC' : 'gray.50' }}
              >
                <Flex justify="space-between" align="flex-start" mb={1}>
                  <HStack spacing={2}>
                    <Avatar 
                      name={item.name} 
                      size="xs" 
                      bg="#E5C794" 
                      color="#3C2A58" 
                      fontWeight="bold" 
                      getInitials={() => item.avatar}
                    />
                    <Box>
                      <Text fontSize="xs" fontWeight="700" color="#1E1E2D">
                        {item.name}
                      </Text>
                      <Text fontSize="11px" color="gray.500">
                        {item.topic}
                      </Text>
                    </Box>
                  </HStack>
                </Flex>

                <Flex justify="space-between" align="center" mt={2}>
                  <Badge
                    borderRadius="full"
                    px={2}
                    py={0.5}
                    fontSize="10px"
                    fontWeight="bold"
                    bg={item.statusBg}
                    color={item.statusColor}
                  >
                    {item.status}
                  </Badge>
                  <Text fontSize="10px" color="gray.400">
                    {item.time}
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </VStack>
      </Box>

      {/* MIDDLE PANEL: Chat & Intervention Interface */}
      <VStack spacing={4} align="stretch">
        {/* Customer & Intervention Header Card */}
        <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
          <Flex justify="space-between" align="center">
            <HStack spacing={3}>
              <Avatar 
                name={activeConv.name} 
                size="sm" 
                bg="#E5C794" 
                color="#3C2A58" 
                fontWeight="bold"
                getInitials={() => activeConv.avatar}
              />
              <Box>
                <HStack spacing={2}>
                  <Text fontWeight="800" fontSize="sm" color="#1E1E2D">
                    {activeConv.name} • Case {activeConv.caseId}
                  </Text>
                  <Badge borderRadius="full" px={2} py={0.5} bg="#FEE2E2" color="#DC2626" fontSize="10px" fontWeight="bold">
                    ● {activeConv.status}
                  </Badge>
                </HStack>
                <Text fontSize="xs" color="gray.500" mt={0.5}>
                  {activeConv.meta}
                </Text>
              </Box>
            </HStack>

            <Button
              size="sm"
              bg={isTakenOver ? '#DC2626' : '#3C2A58'}
              color="white"
              borderRadius="8px"
              px={4}
              fontSize="xs"
              fontWeight="700"
              _hover={{ bg: isTakenOver ? '#B91C1C' : '#513B73' }}
              onClick={handleToggleTakeover}
            >
              {isTakenOver ? 'Return control to AI' : 'Take over'}
            </Button>
          </Flex>
        </Box>

        {/* SLA Breach Alert Banner */}
        <Box bg="#FEF3C7" border="1px solid" borderColor="#FCD34D" p={3} borderRadius="12px">
          <HStack spacing={2} align="flex-start">
            <Box color="#D97706" pt={0.5}>●</Box>
            <Box>
              <Text fontSize="xs" fontWeight="700" color="#B45309">
                SLA breach likely in 03:18
              </Text>
              <Text fontSize="11px" color="#92400E">
                AI confidence fell after policy exception request
              </Text>
            </Box>
          </HStack>
        </Box>

        {/* Chat Messages Log */}
        <Box 
          bg="white" 
          p={4} 
          borderRadius="16px" 
          border="1px solid" 
          borderColor="gray.100" 
          boxShadow="sm"
          maxH="280px"
          overflowY="auto"
        >
          <VStack spacing={3} align="stretch">
            {messages.map((msg, idx) => {
              const isCustomer = msg.sender === 'CUSTOMER';
              return (
                <Box key={idx} alignSelf={isCustomer ? 'flex-start' : 'flex-end'} maxW="80%">
                  <Text fontSize="10px" color="gray.400" mb={1} textAlign={isCustomer ? 'left' : 'right'}>
                    {msg.sender} • {msg.time}
                  </Text>
                  <Box
                    bg={isCustomer ? '#F3F4F6' : '#ECE3FC'}
                    color="#1E1E2D"
                    p={3}
                    borderRadius="12px"
                    fontSize="xs"
                    lineHeight="1.5"
                  >
                    {msg.text}
                  </Box>
                </Box>
              );
            })}
          </VStack>
        </Box>

        {/* Co-pilot Recommendation Card */}
        <Box bg="#FAF7FD" p={4} borderRadius="16px" border="1px solid" borderColor="#E9D8FD">
          <Flex justify="space-between" align="center" mb={2}>
            <Box>
              <Text fontWeight="700" fontSize="xs" color="#3C2A58">
                Co-pilot recommendation
              </Text>
              <Text fontSize="11px" color="gray.500">
                Generated from policy, customer tier, and conversation sentiment
              </Text>
            </Box>
            <Badge borderRadius="full" px={2.5} py={0.5} bg="#D1FAE5" color="#059669" fontSize="10px" fontWeight="bold">
              ● Confidence 88%
            </Badge>
          </Flex>

          <Text fontSize="xs" fontWeight="700" color="#1E1E2D" mb={1}>
            Approve expedited refund of ₹8,420 and waive the standard review period.
          </Text>
          <Text fontSize="11px" color="gray.500" mb={3}>
            Evidence: return scan received • item category eligible • customer lifetime value: high
          </Text>

          <HStack spacing={2}>
            <Button size="xs" bg="#3C2A58" color="white" borderRadius="6px" _hover={{ bg: '#513B73' }} onClick={handleApproveAction}>
              Approve action
            </Button>
            <Button size="xs" variant="outline" borderColor="gray.300" borderRadius="6px" fontSize="11px">
              Edit response
            </Button>
            <Button size="xs" variant="outline" borderColor="gray.300" borderRadius="6px" fontSize="11px">
              Escalate policy
            </Button>
          </HStack>
        </Box>

        {/* Supervisor Response Input Box */}
        <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontWeight="700" fontSize="xs" color="#1E1E2D">
              Supervisor response
            </Text>

            <Button 
              size="xs" 
              variant="outline" 
              rightIcon={<FiChevronDown />}
              borderRadius="full"
              fontSize="11px"
              onClick={onOpenTemplateModal}
            >
              Template
            </Button>
          </Flex>

          <Textarea 
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Type your response to the customer..."
            size="sm"
            rows={3}
            borderRadius="8px"
            borderColor="gray.200"
            fontSize="xs"
            mb={3}
            _focus={{ borderColor: '#6E26D5', boxShadow: 'none' }}
          />

          <Flex justify="flex-end">
            <Button
              size="sm"
              bg="#3C2A58"
              color="white"
              borderRadius="8px"
              rightIcon={<FiSend />}
              px={4}
              fontSize="xs"
              _hover={{ bg: '#513B73' }}
              onClick={handleSendMessage}
            >
              Send reply
            </Button>
          </Flex>
        </Box>
      </VStack>

      {/* RIGHT PANEL: Customer Intelligence & Case Diagnostics */}
      <VStack spacing={4} align="stretch">
        {/* Customer Intelligence */}
        <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
          <Text fontWeight="700" fontSize="sm" color="#1E1E2D" mb={3}>
            Customer intelligence
          </Text>

          <HStack spacing={3} mb={4}>
            <Avatar 
              name={activeConv.name} 
              size="sm" 
              bg="#E5C794" 
              color="#3C2A58" 
              fontWeight="bold" 
              getInitials={() => activeConv.avatar}
            />
            <Box>
              <Text fontWeight="700" fontSize="xs" color="#1E1E2D">
                {activeConv.name} • Case {activeConv.caseId}
              </Text>
              <Text fontSize="11px" color="gray.500">
                {activeConv.location}
              </Text>
            </Box>
          </HStack>

          <SimpleGrid columns={2} gap={3} pt={2} borderTop="1px solid" borderColor="gray.100">
            <Box>
              <Text fontSize="10px" color="gray.400" textTransform="uppercase">LIFETIME VALUE</Text>
              <Text fontSize="md" fontWeight="800" color="#1E1E2D">{activeConv.lifetimeValue}</Text>
            </Box>
            <Box>
              <Text fontSize="10px" color="gray.400" textTransform="uppercase">ORDERS</Text>
              <Text fontSize="md" fontWeight="800" color="#1E1E2D">{activeConv.orders}</Text>
            </Box>
            <Box>
              <Text fontSize="10px" color="gray.400" textTransform="uppercase">RETURN RATE</Text>
              <Text fontSize="md" fontWeight="800" color="#1E1E2D">{activeConv.returnRate}</Text>
            </Box>
            <Box>
              <Text fontSize="10px" color="gray.400" textTransform="uppercase">SENTIMENT</Text>
              <Text fontSize="md" fontWeight="800" color="#DC2626">{activeConv.sentiment}</Text>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Case Diagnostics */}
        <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
          <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
            Case diagnostics
          </Text>
          <Text fontSize="xs" color="gray.500" mb={3.5}>
            Signals contributing to risk
          </Text>

          <VStack spacing={3} align="stretch">
            <Box>
              <Flex justify="space-between" fontSize="xs" fontWeight="600" mb={1}>
                <Text color="gray.700">Repeat contact</Text>
                <Text color="#DC2626">92%</Text>
              </Flex>
              <Progress value={92} size="xs" colorScheme="red" borderRadius="full" />
            </Box>

            <Box>
              <Flex justify="space-between" fontSize="xs" fontWeight="600" mb={1}>
                <Text color="gray.700">Negative sentiment</Text>
                <Text color="#D97706">78%</Text>
              </Flex>
              <Progress value={78} size="xs" colorScheme="orange" borderRadius="full" />
            </Box>

            <Box>
              <Flex justify="space-between" fontSize="xs" fontWeight="600" mb={1}>
                <Text color="gray.700">Policy exception</Text>
                <Text color="#2563EB">66%</Text>
              </Flex>
              <Progress value={66} size="xs" colorScheme="blue" borderRadius="full" />
            </Box>

            <Box>
              <Flex justify="space-between" fontSize="xs" fontWeight="600" mb={1}>
                <Text color="gray.700">Churn propensity</Text>
                <Text color="#6E26D5">58%</Text>
              </Flex>
              <Progress value={58} size="xs" colorScheme="purple" borderRadius="full" />
            </Box>
          </VStack>
        </Box>

        {/* Feedback Notes */}
        <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
          <Text fontWeight="700" fontSize="xs" color="gray.500" mb={2}>
            Feedback Notes
          </Text>

          <Textarea 
            value={feedbackNotes}
            onChange={(e) => setFeedbackNotes(e.target.value)}
            placeholder="Write here..."
            bg="#FEF9C3"
            border="none"
            fontSize="xs"
            rows={4}
            borderRadius="12px"
            mb={4}
            _focus={{ boxShadow: 'none' }}
          />

          <Button
            w="100%"
            bg={isResolved ? '#059669' : '#3C2A58'}
            color="white"
            borderRadius="8px"
            py={5}
            fontSize="xs"
            fontWeight="700"
            leftIcon={isResolved ? <FiCheckCircle /> : undefined}
            _hover={{ bg: isResolved ? '#047857' : '#513B73' }}
            onClick={handleMarkResolved}
          >
            {isResolved ? 'Resolved' : 'Mark as Resolved'}
          </Button>
        </Box>
      </VStack>

      {/* Response Templates Modal */}
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={onCloseTemplateModal}
        onInsertTemplate={(text) => setResponseText(text)}
        customerName={activeConv.name.split(' ')[0]}
      />
    </Grid>
  );
};

export default ConversationView;


