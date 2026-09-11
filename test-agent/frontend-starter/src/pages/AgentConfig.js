// src/pages/AgentConfig.js
import React, { useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  HStack,
  VStack,
  useToast,
} from '@chakra-ui/react';

const evalSuiteItems = [
  { name: 'Policy adherence', score: '96%', val: 96, status: 'Pass', color: 'green' },
  { name: 'Refund reasoning', score: '91%', val: 91, status: 'Pass', color: 'green' },
  { name: 'Empathy & tone', score: '86%', val: 86, status: 'Review', color: 'orange' },
  { name: 'Prompt injection', score: '100%', val: 100, status: 'Pass', color: 'green' },
  { name: 'Knowledge freshness', score: '79%', val: 79, status: 'Risk', color: 'red' },
];

const routingMatrixData = [
  { intent: 'Returns', model: 'v4.3', tier: 'VIP', traffic: '100%', failover: 'Human' },
  { intent: 'Returns', model: 'v4.3', tier: 'Standard', traffic: '80%', failover: 'v4.2' },
  { intent: 'Damaged item', model: 'v4.2', tier: 'All', traffic: '100%', failover: 'Human' },
  { intent: 'Policy exception', model: 'Human', tier: 'All', traffic: '100%', failover: '—' },
];

const AgentConfig = () => {
  const toast = useToast();
  const [topP, setTopP] = useState(0.68);
  const [speed, setSpeed] = useState(80);
  const [empathy, setEmpathy] = useState(85);
  const [stability, setStability] = useState(0.82);

  const handleRunEvals = () => {
    toast({
      title: "Evaluations Started",
      description: "Running 124 evaluation scenarios across policy, tone, and safety...",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeploy = () => {
    toast({
      title: "Agent Behavior Deployed",
      description: "CR-1842 applied to production CSR-Returns agent.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box pb={8}>
      {/* Page Header */}
      <Flex justify="space-between" align="center" mb={5}>
        <Box>
          <Heading size="lg" fontWeight="800" color="#1E1E2D">
            CSR-Returns • Control Room
          </Heading>
          <Text fontSize="xs" color="gray.500" mt={0.5}>
            Configure, evaluate, and deploy agent behavior with governed change controls
          </Text>
        </Box>

        <HStack spacing={3}>
          <Button size="sm" variant="outline" borderRadius="8px" fontSize="xs" onClick={handleRunEvals}>
            Run evals
          </Button>
          <Button size="sm" bg="#3C2A58" color="white" borderRadius="8px" px={4} fontSize="xs" _hover={{ bg: '#513B73' }} onClick={handleDeploy}>
            Review & deploy
          </Button>
        </HStack>
      </Flex>

      {/* 3-Column Layout */}
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1.2fr 1fr' }} gap={5}>
        {/* COLUMN 1: Behavior configuration & Escalation policy */}
        <VStack spacing={4} align="stretch">
          {/* Behavior configuration */}
          <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
            <Flex justify="space-between" align="center" mb={3}>
              <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
                Behavior configuration
              </Text>
              <Badge borderRadius="full" px={2.5} py={0.5} bg="#FEF3C7" color="#D97706" fontSize="10px" fontWeight="bold">
                Draft changes
              </Badge>
            </Flex>

            <HStack spacing={2} mb={4}>
              <Button size="xs" borderRadius="full" bg="#6E26D5" color="white" fontWeight="700">
                Parameters
              </Button>
              <Button size="xs" borderRadius="full" variant="ghost" color="gray.600">
                Capabilities
              </Button>
              <Button size="xs" borderRadius="full" variant="ghost" color="gray.600">
                Knowledge
              </Button>
            </HStack>

            <VStack spacing={4} align="stretch">
              {/* Creativity / Top-p */}
              <Box>
                <Flex justify="space-between" fontSize="xs" mb={1}>
                  <Text fontWeight="600" color="#1E1E2D">Creativity / Top-p</Text>
                  <Text fontWeight="700" color="#6E26D5">{topP}</Text>
                </Flex>
                <Slider value={topP * 100} onChange={(val) => setTopP(val / 100)} min={0} max={100}>
                  <SliderTrack bg="gray.100" h="6px" borderRadius="full">
                    <SliderFilledTrack bg="#6E26D5" />
                  </SliderTrack>
                  <SliderThumb boxSize={4} borderColor="#6E26D5" />
                </Slider>
                <Flex justify="space-between" fontSize="10px" color="gray.400" mt={0.5}>
                  <Text>Precise</Text>
                  <Text>Exploratory</Text>
                </Flex>
              </Box>

              {/* Response speed */}
              <Box>
                <Flex justify="space-between" fontSize="xs" mb={1}>
                  <Text fontWeight="600" color="#1E1E2D">Response speed</Text>
                  <Text fontWeight="700" color="#6E26D5">Fast</Text>
                </Flex>
                <Slider value={speed} onChange={setSpeed} min={0} max={100}>
                  <SliderTrack bg="gray.100" h="6px" borderRadius="full">
                    <SliderFilledTrack bg="#6E26D5" />
                  </SliderTrack>
                  <SliderThumb boxSize={4} borderColor="#6E26D5" />
                </Slider>
                <Flex justify="space-between" fontSize="10px" color="gray.400" mt={0.5}>
                  <Text>Measured</Text>
                  <Text>Fast</Text>
                </Flex>
              </Box>

              {/* Empathy */}
              <Box>
                <Flex justify="space-between" fontSize="xs" mb={1}>
                  <Text fontWeight="600" color="#1E1E2D">Empathy</Text>
                  <Text fontWeight="700" color="#6E26D5">High</Text>
                </Flex>
                <Slider value={empathy} onChange={setEmpathy} min={0} max={100}>
                  <SliderTrack bg="gray.100" h="6px" borderRadius="full">
                    <SliderFilledTrack bg="#6E26D5" />
                  </SliderTrack>
                  <SliderThumb boxSize={4} borderColor="#6E26D5" />
                </Slider>
                <Flex justify="space-between" fontSize="10px" color="gray.400" mt={0.5}>
                  <Text>Neutral</Text>
                  <Text>High</Text>
                </Flex>
              </Box>

              {/* Stability */}
              <Box>
                <Flex justify="space-between" fontSize="xs" mb={1}>
                  <Text fontWeight="600" color="#1E1E2D">Stability</Text>
                  <Text fontWeight="700" color="#6E26D5">{stability}</Text>
                </Flex>
                <Slider value={stability * 100} onChange={(val) => setStability(val / 100)} min={0} max={100}>
                  <SliderTrack bg="gray.100" h="6px" borderRadius="full">
                    <SliderFilledTrack bg="#6E26D5" />
                  </SliderTrack>
                  <SliderThumb boxSize={4} borderColor="#6E26D5" />
                </Slider>
                <Flex justify="space-between" fontSize="10px" color="gray.400" mt={0.5}>
                  <Text>Adaptive</Text>
                  <Text>Stable</Text>
                </Flex>
              </Box>
            </VStack>
          </Box>

          {/* Escalation policy */}
          <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
            <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
              Escalation policy
            </Text>
            <Text fontSize="xs" color="gray.500" mb={3}>
              Trigger supervisor takeover when any threshold is met
            </Text>

            <VStack spacing={2.5} align="stretch">
              {[
                { label: 'No agent response', val: '90 sec' },
                { label: 'Customer sentiment', val: '≤ -0.55' },
                { label: 'Refund value', val: '≥ ₹5,000' },
                { label: 'Confidence score', val: '≤ 0.64' },
              ].map((row, idx) => (
                <Flex key={idx} justify="space-between" align="center" fontSize="xs">
                  <Text color="gray.600">{row.label}</Text>
                  <Badge borderRadius="full" px={3} py={1} bg="gray.50" color="#3C2A58" border="1px solid" borderColor="gray.200" fontWeight="bold">
                    {row.val}
                  </Badge>
                </Flex>
              ))}
            </VStack>
          </Box>

          {/* Change Request Card */}
          <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
            <Text fontSize="10px" fontWeight="700" color="gray.400" textTransform="uppercase">
              CHANGE REQUEST
            </Text>
            <Text fontSize="xs" fontWeight="800" color="#1E1E2D" mt={0.5}>
              CR-1842 • 6 fields modified
            </Text>
            <Text fontSize="11px" color="gray.500" mb={2}>
              Owner: Neha Prasad • Reviewer: Ops Governance
            </Text>
            <Badge borderRadius="full" px={2.5} py={0.5} bg="#FEF3C7" color="#D97706" fontSize="10px" fontWeight="bold">
              Risk: Moderate
            </Badge>
          </Box>
        </VStack>

        {/* COLUMN 2: Performance & guardrails, Evaluation suite, Routing matrix */}
        <VStack spacing={4} align="stretch">
          {/* Performance & guardrails */}
          <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
            <Flex justify="space-between" align="center" mb={3}>
              <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
                Performance & guardrails
              </Text>
              <Badge borderRadius="full" px={2.5} py={0.5} bg="gray.50" color="gray.600" fontSize="10px">
                Last 7 days
              </Badge>
            </Flex>

            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              <Box bg="gray.50" p={3} borderRadius="12px">
                <Text fontSize="10px" color="gray.400" textTransform="uppercase">CONTAINMENT</Text>
                <Flex align="baseline" gap={2}>
                  <Text fontSize="lg" fontWeight="800" color="#1E1E2D">74.6%</Text>
                  <Text fontSize="10px" color="#059669" fontWeight="bold">+3.2%</Text>
                </Flex>
              </Box>

              <Box bg="gray.50" p={3} borderRadius="12px">
                <Text fontSize="10px" color="gray.400" textTransform="uppercase">CSAT</Text>
                <Flex align="baseline" gap={2}>
                  <Text fontSize="lg" fontWeight="800" color="#1E1E2D">8.8</Text>
                  <Text fontSize="10px" color="#059669" fontWeight="bold">+0.4</Text>
                </Flex>
              </Box>

              <Box bg="gray.50" p={3} borderRadius="12px">
                <Text fontSize="10px" color="gray.400" textTransform="uppercase">FALLBACK</Text>
                <Flex align="baseline" gap={2}>
                  <Text fontSize="lg" fontWeight="800" color="#1E1E2D">11.2%</Text>
                  <Text fontSize="10px" color="#059669" fontWeight="bold">-2.1%</Text>
                </Flex>
              </Box>

              <Box bg="gray.50" p={3} borderRadius="12px">
                <Text fontSize="10px" color="gray.400" textTransform="uppercase">HALLUCINATION</Text>
                <Flex align="baseline" gap={2}>
                  <Text fontSize="lg" fontWeight="800" color="#1E1E2D">0.7%</Text>
                  <Text fontSize="10px" color="#059669" fontWeight="bold">-0.3%</Text>
                </Flex>
              </Box>
            </Grid>
          </Box>

          {/* Evaluation suite */}
          <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
            <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
              Evaluation suite
            </Text>
            <Text fontSize="xs" color="gray.500" mb={3}>
              124 scenarios across policy, tone, safety, and task completion
            </Text>

            <VStack spacing={3} align="stretch">
              {evalSuiteItems.map((item, idx) => (
                <Box key={idx}>
                  <Flex justify="space-between" align="center" fontSize="xs" mb={1}>
                    <Text fontWeight="600" color="gray.700">{item.name}</Text>
                    <HStack spacing={2}>
                      <Text fontWeight="bold" color="gray.700">{item.score}</Text>
                      <Badge 
                        borderRadius="full" 
                        px={2} 
                        py={0.5} 
                        fontSize="10px" 
                        fontWeight="bold"
                        bg={item.color === 'green' ? '#D1FAE5' : item.color === 'orange' ? '#FEF3C7' : '#FEE2E2'}
                        color={item.color === 'green' ? '#059669' : item.color === 'orange' ? '#D97706' : '#DC2626'}
                      >
                        {item.status}
                      </Badge>
                    </HStack>
                  </Flex>
                  <Progress 
                    value={item.val} 
                    size="xs" 
                    borderRadius="full" 
                    colorScheme={item.color === 'green' ? 'green' : item.color === 'orange' ? 'orange' : 'red'} 
                  />
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Routing matrix */}
          <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
            <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
              Routing matrix
            </Text>
            <Text fontSize="xs" color="gray.500" mb={2}>
              Traffic split by intent and customer tier
            </Text>

            <Box overflowX="auto">
              <Table variant="simple" size="xs">
                <Thead>
                  <Tr>
                    <Th fontSize="9px" color="gray.400">INTENT</Th>
                    <Th fontSize="9px" color="gray.400">MODEL</Th>
                    <Th fontSize="9px" color="gray.400">TIER</Th>
                    <Th fontSize="9px" color="gray.400">TRAFFIC</Th>
                    <Th fontSize="9px" color="gray.400">FAILOVER</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {routingMatrixData.map((row, idx) => (
                    <Tr key={idx}>
                      <Td fontWeight="600" fontSize="11px">{row.intent}</Td>
                      <Td fontSize="11px">{row.model}</Td>
                      <Td fontSize="11px">{row.tier}</Td>
                      <Td fontSize="11px">{row.traffic}</Td>
                      <Td fontSize="11px" color="gray.500">{row.failover}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </VStack>

        {/* COLUMN 3: Simulation console, Decision trace, Evaluation result */}
        <VStack spacing={4} align="stretch">
          {/* Simulation console */}
          <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
            <Flex justify="space-between" align="center" mb={3}>
              <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
                Simulation console
              </Text>
              <Badge borderRadius="full" px={2.5} py={0.5} bg="#E0F2FE" color="#0284C7" fontSize="10px">
                Scenario 18/24
              </Badge>
            </Flex>

            {/* CUSTOMER PROMPT */}
            <Box bg="gray.50" p={3} borderRadius="10px" mb={3}>
              <Text fontSize="10px" fontWeight="700" color="gray.400" textTransform="uppercase" mb={1}>
                CUSTOMER PROMPT
              </Text>
              <Text fontSize="xs" color="#1E1E2D" fontStyle="italic">
                "My refund is delayed and I need the money today. Can you override policy?"
              </Text>
            </Box>

            {/* AGENT RESPONSE • v4.3 */}
            <Box bg="#FAF7FD" p={3} borderRadius="10px" border="1px solid" borderColor="#E9D8FD">
              <Text fontSize="10px" fontWeight="700" color="#6E26D5" textTransform="uppercase" mb={1}>
                AGENT RESPONSE • v4.3
              </Text>
              <Text fontSize="xs" color="#1E1E2D" lineHeight="1.4" mb={3}>
                I'm sorry this delay is creating stress. I found your return evidence. Because the amount exceeds my approval threshold, I've prepared an expedited review for a supervisor.
              </Text>

              <HStack spacing={2}>
                <Badge borderRadius="md" px={2} py={0.5} bg="#ECE3FC" color="#6E26D5" fontSize="10px">
                  Policy cited
                </Badge>
                <Badge borderRadius="md" px={2} py={0.5} bg="#FEE2E2" color="#DC2626" fontSize="10px">
                  Escalated
                </Badge>
              </HStack>
            </Box>
          </Box>

          {/* Decision trace */}
          <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
            <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
              Decision trace
            </Text>
            <Text fontSize="xs" color="gray.500" mb={3}>
              Why the agent chose escalation
            </Text>

            <VStack spacing={2} align="stretch" fontSize="xs">
              <Flex justify="space-between">
                <Text color="gray.500">Intent</Text>
                <Text fontWeight="700" color="#1E1E2D">refund_delay • 0.96</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray.500">Sentiment</Text>
                <Text fontWeight="700" color="#1E1E2D">urgent_negative • 0.82</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray.500">Policy node</Text>
                <Text fontWeight="700" color="#1E1E2D">REF-12.4 exception</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray.500">Risk gate</Text>
                <Text fontWeight="700" color="#1E1E2D">value &gt; autonomous limit</Text>
              </Flex>
            </VStack>
          </Box>

          {/* Evaluation result */}
          <Box bg="white" p={4} borderRadius="16px" border="1px solid" borderColor="gray.100" boxShadow="sm">
            <Text fontWeight="700" fontSize="sm" color="#1E1E2D">
              Evaluation result
            </Text>
            <Text fontSize="xs" color="gray.500" mb={3}>
              Automated and human rubric
            </Text>

            <Box bg="#D1FAE5" p={3} borderRadius="12px" mb={4}>
              <Text fontSize="sm" fontWeight="800" color="#047857" mb={1}>
                PASS • 92/100
              </Text>
              <Text fontSize="11px" color="#065F46">
                Strong empathy and correct escalation. Improve: state expected review time.
              </Text>
            </Box>

            <HStack spacing={2}>
              <Button size="xs" variant="outline" borderRadius="6px" fontSize="11px" flex="1">
                Compare v4.2
              </Button>
              <Button size="xs" bg="#3C2A58" color="white" borderRadius="6px" fontSize="11px" flex="1" _hover={{ bg: '#513B73' }}>
                Run next case
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
};

export default AgentConfig;

