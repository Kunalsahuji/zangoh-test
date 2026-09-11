const express = require('express');
const router = express.Router();

let templatesStore = [
  {
    id: 'tpl-1',
    title: 'Order Status & Tracking Details',
    category: 'shipping',
    content: 'Hi {{customer_name}}, your order {{order_id}} is currently in transit with {{carrier_name}}. Your tramking number is {{tracking_number}}.',
    isShared: true,
    tags: ['Shipping', 'Tracking'],
    variables: ['customer_name', 'order_id', 'carrier_name', 'tracking_number'],
    usageCount: 1420,
    csatScore: 4.9,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tpl-2',
    title: 'Refund Processing Confirmation',
    category: 'returns',
    content: 'Hello {{customer_name}}, we have processed your refund of {{refund_amount}} for order {{order_id}}. It will translate in {{bank_days}} business days.',
    isShared: true,
    tags: ['Returns', 'Refund'],
    variables: ['customer_name', 'refund_amount', 'order_id', 'bank_days'],
    usageCount: 980,
    csatScore: 4.8,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tpl-3',
    title: 'Account Verification Link',
    category: 'general',
    content: 'Hi {{customer_name}}, please verify your account for {{workspace_name}} using this link: {{verification_url}}.',
    isShared: false,
    tags: ['Security', 'Account'],
    variables: ['customer_name', 'workspace_name', 'verification_url'],
    usageCount: 650,
    csatScore: 4.7,
    updatedAt: new Date().toISOString()
  }
];

function extractVariables(content) {
  if (!content) return [];
  const matches = content.match(/\\{\\s*[ a-zA-Z0-9_]+\\s*\\}\\}/g);
  if (!matches) return [];
  return Array.from(new Set(matches.map(m => m.replace(/[{}]/g, '').trim())));
}

router.get('/', (req, res) => {
  const { category, search } = req.query;
  let results = templatesStore;
  if (category && category !== 'all') {
    results = results.filter(t => t.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(t => t.title.toLowerCase().includes(q) || t.content.toLowerCase().includes(q));
  }
  res.json({ success: true, count: results.length, data: results });
});

router.post('/', (req, res) => {
  const { title, category, content, isShared } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required' });
  }
  const vars = extractVariables(content);
  const newTpl = {
    id: 'tpl-' + Date.now(),
    title,
    category: category || 'general',
    content,
    isShared: isShared !== undefined ? isShared : true,
    tags: [category || 'General'],
    variables: vars,
    usageCount: 0,
    csatScore: 5.0,
    updatedAt: new Date().toISOString()
  };
  templatesStore.unshift(newTpl);
  res.status(201).json({ success: true, data: newTpl });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = templatesStore.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Template not found' });
  }
  const { title, category, content, isShared } = req.body;
  if (category) templatesStore[index].category = category;
  if (content) templatesStore[index].content = content;
  if (isShared !== undefined) templatesStore[index].isShared = isShared;
  if (content) templatesStore[index].variables = extractVariables(content);
  templatesStore[index].updatedAt = new Date().toISOString();

  res.json({ success: true, data: templatesStore[index] });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  templatesStore = templatesStore.filter(t => t.id !== id);
  res.json({ success: true, message: 'Template deleted' });
});

module.exports = router;