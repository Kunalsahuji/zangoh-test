// src/pages/Dashboard.js
import React, { useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  Select,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  IconButton,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { FiMaximize2 } from 'react-icons/fi';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import MetricsCard from '../components/MetricsCard';

const chartData = [
  { time: '11:00', live: 420, sla: 310 },
  { time: '11:05', live: 550, sla: 380 },
  { time: '11:10', live: 500, sla: 320 },
  { time: '11:15', live: 680, sla: 420 },
  { time: '11:20', live: 620, sla: 390 },
  { time: '11:25', live: 750, sla: 470 },
  { time: '11:30', live: 710, sla: 410 },
  { time: '11:35', live: 890, sla: 490 },
  { time: '11:40', live: 840, sla: 460 },
  { time: '11:45', live: 980, sla: 540 },
  { time: '11:50', live: 920, sla: 500 },
];

const queueHealthData = [
  { name: 'Returns & refunds', val: 92, label: '92%', color: 'red' },
  { name: 'Order tracking', val: 76, label: '(Watch) 76%', color: 'orange' },
  { name: 'Product support', val: 61, label: '(Watch) 61%', color: 'blue' },
  { name: 'Account access', val: 34, label: '(Healthy) 34%', color: 'green' },
];

const priorityQueueMock = [
  { id: '1', name: 'Elena Vasquez', caseId: '#84291', queue: 'Refund', owner: 'CSR-Returns', risk: 95, riskColor: '#EF4444', wait: '12:42', action: 'Take over' },
  { id: '2', name: 'Marcus Lee', caseId: '#84275', queue: 'Account', owner: 'CSR-Identity', risk: 84, riskColor: '#EF4444', wait: '09:18', action: 'Approve override' },
  { id: '3', name: 'Noah Williams', caseId: '#84263', queue: 'Delivery', owner: 'CSR-Logistics', risk: 72, riskColor: '#F59E0B', wait: '08:09', action: 'Review evidence' },
  { id: '4', name: 'Ava Thompson', caseId: '#84241', queue: 'Product', owner: 'CSR-Tech', risk: 58, riskColor: '#9CA3AF', wait: '06:34', action: 'Monitor' },
  { id: '5', name: 'Oliver Chen', caseId: '#84230', queue: 'Billing', owner: 'CSR-Finance', risk: 47, riskColor: '#9CA3AF', wait: '04:51', action: 'Send template' },
];

const liveFeedEvents = [
  { time: '11:42:18', title: 'Takeover approved', desc: 'Elena V. • by Neha P.', dotColor: '#EF4444' },
  { time: '11:41:53', title: 'Knowledge fallback', desc: 'CSR-Returns • policy gap', dotColor: '#EF4444' },
  { time: '11:40:26', title: 'SLA alert raised', desc: 'Returns • 9 conversations', dotColor: '#6E26D5' },
  { time: '11:39:11', title: 'Template inserted', desc: 'Refund delay v3 • Marcus L.', dotColor: '#6E26D5' },
  { time: '11:37:45', title: 'Agent version routed', desc: 'CSR-Tech v4.3 • 20% traffic', dotColor: '#6E26D5' },
  { time: '11:35:09', title: 'QA sample flagged', desc: 'Low empathy score • #84211', dotColor: '#6E26D5' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30m');

  return (
    <Box pb={8}>
      {/* Dashboard Top Header Bar */}
      <Flex justify="space-between" align="center" mb={5}>
        <Box>
          <Heading size="lg" fontWeight="800" color="#1E1E2D">
            Dashboard
          </Heading>
          <Text fontSize="xs" color="gray.500" mt={0.5}>
            Live supervision across 24 queues, 8 regions, and 42 AI agents
          </Text>
        </Box>

        <HStack spacing={3}>
          <Select 
            size="sm" 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            borderRadius="full" 
            bg="white" 
            w="130px"
            fontSize="xs"
            fontWeight="600"
          >
            <option value="30m">Last 30 min</option>
            <option value="1h">Last 1 hour</option>
            <option value="24h">Today</option>
          </Select>

          <Select 
            size="sm" 
            defaultValue="all" 
            borderRadius="full" 
            bg="white" 
            w="120px"
            fontSize="xs"
            fontWeight="600"
          >
            <option value="all">All regions</option>
            <option value="na">North America</option>
            <option value="eu">Europe</option>
          </Select>

          <Button 
            size="sm" 
            bg="#3C2A58" 
            color="white" 
            borderRadius="full" 
            px={4} 
            fontSize="xs"
            _hover={{ bg: '#513B73' }}
          >
            Export report
          </Button>
        </HStack>
      </Flex>

      {/* 5 KPI Metrics Cards Row */}
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} gap={4} mb={5}>
        <MetricsCard title="ACTIVE LOAD" value="1,284" change="+8.2%" badgeColor="green" />
        <MetricsCard title="SLA AT RISK" value="47" change="+12" badgeColor="red" />
        <MetricsCard title="AI CONTAINMENT" value="73.4%" change="+4.1%" badgeColor="green" />
        <MetricsCard title="AVG. HANDLE TIME" value="06:18" change="-0:42" badgeColor="green" />
        <MetricsCard title="CSAT" value="8.7" change="+0.6" badgeColor="green" />
      </Grid>

      {/* Middle Grid: Volume Chart (50%), Queue Health (25%), Critical Signals (25%) */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr 1fr' }} gap={5} mb={5}>
        {/* Conversation Volume & SLA Exposure */}
        <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
          <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
            Conversation volume & SLA exposure
          </Text>
          <Text fontSize="xs" color="gray.500" mb={4}>
            Live vs forecast • 5-minute resolution
          </Text>

          <Box h="180px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="live" stroke="#6E26D5" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="sla" stroke="#F59E0B" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          <HStack spacing={4} mt={2}>
            <HStack spacing={1.5}>
              <Box w={2.5} h={2.5} borderRadius="full" bg="#6E26D5" />
              <Text fontSize="xs" fontWeight="600" color="gray.700">Live</Text>
            </HStack>
            <HStack spacing={1.5}>
              <Box w={2.5} h={2.5} borderRadius="full" bg="#F59E0B" />
              <Text fontSize="xs" fontWeight="600" color="gray.700">SLA exposure</Text>
            </HStack>
          </HStack>
        </Box>

        {/* Queue Health */}
        <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
          <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
            Queue health
          </Text>
          <Text fontSize="xs" color="gray.500" mb={4}>
            Prioritized by breach probability
          </Text>

          <VStack spacing={3.5} align="stretch">
            {queueHealthData.map((item, idx) => (
              <Box key={idx}>
                <Flex justify="space-between" fontSize="xs" fontWeight="600" mb={1}>
                  <Text color="gray.700">{item.name}</Text>
                  <Text color={item.color === 'red' ? '#DC2626' : item.color === 'orange' ? '#D97706' : item.color === 'blue' ? '#2563EB' : '#059669'}>
                    {item.label}
                  </Text>
                </Flex>
                <Progress 
                  value={item.val} 
                  size="xs" 
                  borderRadius="full" 
                  colorScheme={item.color === 'red' ? 'red' : item.color === 'orange' ? 'orange' : item.color === 'blue' ? 'blue' : 'green'} 
                />
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Critical Signals */}
        <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
          <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
            Critical signals
          </Text>
          <Text fontSize="xs" color="gray.500" mb={3}>
            Needs supervisor action
          </Text>

          <VStack spacing={2.5} align="stretch">
            <Box bg="#FEE2E2" p={2.5} borderRadius="10px">
              <Text fontSize="xs" fontWeight="700" color="#991B1B">
                SLA breach cluster
              </Text>
              <Text fontSize="11px" color="#7F1D1D">
                Returns queue • 9 conversations
              </Text>
            </Box>

            <Box bg="#F3E8FF" p={2.5} borderRadius="10px">
              <Text fontSize="xs" fontWeight="700" color="#6B21A8">
                Sentiment anomaly
              </Text>
              <Text fontSize="11px" color="#581C87">
                North America • -18% in 10 min
              </Text>
            </Box>

            <Box bg="#F3F4F6" p={2.5} borderRadius="10px">
              <Text fontSize="xs" fontWeight="700" color="#374151">
                Agent degradation
              </Text>
              <Text fontSize="11px" color="#4B5563">
                CSR Agent v4.2 • Fallback rate 24%
              </Text>
            </Box>
          </VStack>
        </Box>
      </Grid>

      {/* Bottom Grid: Priority Conversation Queue (65%), Live Supervisor Feed (35%) */}
      <Grid templateColumns={{ base: '1fr', lg: '1.8fr 1fr' }} gap={5}>
        {/* Priority Conversation Queue */}
        <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
          <Flex justify="space-between" align="center" mb={3}>
            <Box>
              <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
                Priority conversation queue
              </Text>
              <Text fontSize="xs" color="gray.500">
                AI-ranked by urgency, value, and breach risk
              </Text>
            </Box>

            <HStack spacing={2}>
              <Select size="xs" defaultValue="all" borderRadius="full" w="100px" bg="gray.50">
                <option value="all">All queues</option>
              </Select>
              <Select size="xs" defaultValue="risk" borderRadius="full" w="90px" bg="gray.50">
                <option value="risk">Sort: risk</option>
              </Select>
              <IconButton icon={<FiMaximize2 />} size="xs" variant="ghost" aria-label="Expand" />
            </HStack>
          </Flex>

          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th fontSize="10px" color="gray.400" textTransform="uppercase">Customer / Case</Th>
                  <Th fontSize="10px" color="gray.400" textTransform="uppercase">Queue</Th>
                  <Th fontSize="10px" color="gray.400" textTransform="uppercase">AI Owner</Th>
                  <Th fontSize="10px" color="gray.400" textTransform="uppercase">Risk</Th>
                  <Th fontSize="10px" color="gray.400" textTransform="uppercase">Wait</Th>
                  <Th fontSize="10px" color="gray.400" textTransform="uppercase">Recommended Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {priorityQueueMock.map((row) => (
                  <Tr key={row.id} _hover={{ bg: 'gray.50' }}>
                    <Td fontWeight="700" fontSize="xs">
                      {row.name} <Text as="span" color="gray.400" fontWeight="normal">{row.caseId}</Text>
                    </Td>
                    <Td fontSize="xs" color="gray.600">{row.queue}</Td>
                    <Td fontSize="xs" color="gray.600">{row.owner}</Td>
                    <Td>
                      <Badge 
                        borderRadius="full" 
                        px={2} 
                        py={0.5} 
                        fontSize="10px" 
                        fontWeight="bold" 
                        bg={row.risk >= 80 ? '#FEE2E2' : row.risk >= 60 ? '#FEF3C7' : '#E5E7EB'}
                        color={row.risk >= 80 ? '#DC2626' : row.risk >= 60 ? '#D97706' : '#4B5563'}
                      >
                        {row.risk}
                      </Badge>
                    </Td>
                    <Td fontSize="xs" color="gray.500">{row.wait}</Td>
                    <Td>
                      <Text 
                        fontSize="xs" 
                        fontWeight="700" 
                        color="#3C2A58" 
                        cursor="pointer" 
                        _hover={{ textDecoration: 'underline', color: '#6E26D5' }}
                        onClick={() => navigate(`/conversation/${row.id}`)}
                      >
                        {row.action}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>

        {/* Live Supervisor Feed */}
        <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
          <Flex justify="space-between" align="center" mb={3}>
            <Box>
              <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
                Live supervisor feed
              </Text>
              <Text fontSize="xs" color="gray.500">
                Decisions, handoffs, and model events
              </Text>
            </Box>

            <Badge borderRadius="full" px={2.5} py={0.5} bg="#D1FAE5" color="#059669" fontSize="10px" fontWeight="bold">
              ● Auto-refresh
            </Badge>
          </Flex>

          <VStack spacing={3} align="stretch" pt={1}>
            {liveFeedEvents.map((item, idx) => (
              <Flex key={idx} align="flex-start" gap={3}>
                <Text fontSize="10px" color="gray.400" pt={0.5} w="45px">
                  {item.time}
                </Text>
                <Box pt={1.5}>
                  <Box w={2} h={2} borderRadius="full" bg={item.dotColor} />
                </Box>
                <Box flex="1">
                  <Text fontSize="xs" fontWeight="700" color="#1E1E2D">
                    {item.title}
                  </Text>
                  <Text fontSize="11px" color="gray.500">
                    {item.desc}
                  </Text>
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;