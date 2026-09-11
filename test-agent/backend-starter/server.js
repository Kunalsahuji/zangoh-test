// server.js - Main server file
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const dotenv = require('dotenv');

// Routes
const conversationsRoutes = require('./routes/conversations');
const agentsRoutes = require('./routes/agents');
const knowledgeBaseRoutes = require('./routes/knowledgeBase');
const analyticsRoutes = require('./routes/analytics');
const interveneRoutes = require('./routes/intervene');
const templatesRoutes = require('./routes/templates');

// Middleware
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

// WebSocket handlers
const socketHandler = require('./websocket/socketHandler');

// Config
dotenv.config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zangoh';

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);

// API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/api/conversations', conversationsRoutes);
app.use('/api/agents', agentsRoutes);
app.use('/api/knowledge-base', knowledgeBaseRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/intervene', interveneRoutes);
app.use('/api/templates', templatesRoutes);
// SSE Stream Endpoint for Live Dashboard Metrics (Updates every 2 seconds)
app.get('/api/metrics/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (res.flushHeaders) res.flushHeaders();

  const sendMetrics = () => {
    const baseActive = 1280 + Math.floor(Math.random() * 20 - 10);
    const baseSla = 45 + Math.floor(Math.random() * 8 - 4);
    const baseAi = (73 + Math.random() * 2).toFixed(1);
    const sec = Math.floor(10 + Math.random() * 20);
    const baseCsat = (8.5 + Math.random() * 0.4).toFixed(1);

    const payload = {
      activeLoad: { value: baseActive.toLocaleString(), change: '+8.2%' },
      slaAtRisk: { value: baseSla.toString(), change: '+12' },
      aiContainment: { value: baseAi + '%', change: '+4.1%' },
      avgHandleTime: { value: '06:' + sec.toString().padStart(2, '0'), change: '-0:42' },
      csat: { value: baseCsat.toString(), change: '+0.6' },
      timestamp: new Date().toISOString()
    };
    res.write('data: ' + JSON.stringify(payload) + '\n\n');
  };

  sendMetrics();
  const intervalId = setInterval(sendMetrics, 2000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Error handling
app.use(errorHandler);

// WebSocket connection handling
wss.on('connection', socketHandler);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});









