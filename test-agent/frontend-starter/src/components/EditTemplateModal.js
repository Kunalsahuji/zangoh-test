// src/components/EditTemplateModal.js
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Badge,
  Select,
  Textarea,
  Grid,
  useToast,
} from '@chakra-ui/react';
import { FiCheck } from 'react-icons/fi';

const EditTemplateModal = ({ isOpen, onClose, template, onSaveTemplate }) => {
  const toast = useToast();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Chat');
  const [content, setContent] = useState('');
  const [isShared, setIsShared] = useState(true);

  useEffect(() => {
    if (template) {
      setName(template.name || 'Welcome Template');
      setTitle(template.title || 'Say Hi to welcome new visitors!');
      setCategory(template.category || 'Chat');
      setContent(template.rawText || 'Hi <user name>! Welcome to <company name>. How may I be of help today?');
    } else {
      setName('');
      setTitle('Say Hi to welcome new visitors!');
      setCategory('Chat');
      setContent('Hi <user name>! Welcome to <company name>. How may I be of help today?');
    }
  }, [template, isOpen]);

  const handleSave = () => {
    onSaveTemplate({
      ...template,
      name,
      title,
      category,
      rawText: content,
      resolvedText: content.replace('<user name>', 'Elena').replace('<company name>', 'Acme'),
    });
    toast({
      title: "Template Saved",
      description: "Changes saved successfully.",
      status: "success",
      duration: 2500,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(2px)" />
      <ModalContent borderRadius="20px" overflow="hidden" p={0} maxW="950px">
        <ModalBody p={6}>
          <Grid templateColumns="1.2fr 1fr" gap={6} minH="480px">
            {/* LEFT FORM COLUMN */}
            <VStack spacing={4} align="stretch">
              <Text fontWeight="800" fontSize="lg" color="#1E1E2D">
                {template ? 'Edit Template' : 'Create Template'}
              </Text>

              {/* Name */}
              <Box>
                <Text fontSize="xs" fontWeight="700" color="gray.500" mb={1}>
                  Name
                </Text>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Template name" 
                  size="sm"
                  borderRadius="8px"
                  fontSize="xs"
                />
              </Box>

              {/* Title */}
              <Box>
                <Text fontSize="xs" fontWeight="700" color="gray.500" mb={1}>
                  Title
                </Text>
                <Input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Say Hi to welcome new visitors!" 
                  size="sm"
                  borderRadius="8px"
                  fontSize="xs"
                />
              </Box>

              {/* Category */}
              <Box>
                <Text fontSize="xs" fontWeight="700" color="gray.500" mb={1}>
                  Category
                </Text>
                <Select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  size="sm"
                  borderRadius="8px"
                  fontSize="xs"
                >
                  <option value="Chat">Chat</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Billing">Billing</option>
                  <option value="Support">Support</option>
                </Select>
              </Box>

              {/* Content Field */}
              <Box>
                <Text fontSize="xs" fontWeight="700" color="gray.500" mb={1}>
                  Content
                </Text>

                {/* Toolbar mockup */}
                <HStack spacing={1} bg="gray.50" borderTopRadius="8px" p={1.5} border="1px solid" borderColor="gray.200" borderBottom="none" fontSize="11px">
                  <Button size="xs" variant="ghost" px={1}>↺</Button>
                  <Button size="xs" variant="ghost" px={1}>↻</Button>
                  <Text fontSize="10px" color="gray.500" px={1}>Sans Serif ▾</Text>
                  <Button size="xs" variant="ghost" px={1} fontWeight="bold">B</Button>
                  <Button size="xs" variant="ghost" px={1} fontStyle="italic">I</Button>
                  <Button size="xs" variant="ghost" px={1} as="u">U</Button>
                </HStack>

                <Textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  borderTopRadius={0}
                  borderBottomRadius="8px"
                  fontSize="xs"
                  rows={4}
                  borderColor="gray.200"
                  _focus={{ borderColor: '#6E26D5', boxShadow: 'none' }}
                />
              </Box>

              {/* Action Buttons */}
              <HStack spacing={3} pt={2}>
                <Button 
                  size="sm" 
                  bg={isShared ? '#6E26D5' : 'gray.200'} 
                  color="white" 
                  borderRadius="8px" 
                  leftIcon={<FiCheck />}
                  fontSize="xs"
                  onClick={() => setIsShared(!isShared)}
                >
                  Share with Team
                </Button>

                <Spacer />

                <Button size="sm" variant="outline" borderRadius="8px" onClick={onClose} fontSize="xs">
                  Cancel
                </Button>
                <Button size="sm" bg="#3C2A58" color="white" borderRadius="8px" onClick={handleSave} fontSize="xs" _hover={{ bg: '#513B73' }}>
                  Save
                </Button>
              </HStack>
            </VStack>

            {/* RIGHT PREVIEW COLUMN */}
            <Box bg="#F8F9FC" p={5} borderRadius="16px" border="1px solid" borderColor="gray.100" display="flex" flexDirection="column">
              <Text fontWeight="800" fontSize="sm" color="#1E1E2D" mb={6}>
                Preview
              </Text>

              {/* Rendered Preview Card */}
              <Box bg="white" p={4} borderRadius="12px" border="1px solid" borderColor="gray.200" boxShadow="xs" my="auto">
                <HStack spacing={2} mb={2}>
                  <Badge borderRadius="md" px={2} py={0.5} bg="#ECE3FC" color="#6E26D5" fontSize="10px">
                    + {category}
                  </Badge>
                </HStack>

                <Text fontSize="xs" color="#1E1E2D" lineHeight="1.5">
                  {content}
                </Text>
              </Box>
            </Box>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Spacer = () => <Box flex="1" />;

export default EditTemplateModal;
