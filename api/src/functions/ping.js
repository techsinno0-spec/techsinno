// ============================================================
// src/functions/ping.js — health check (v4 programming model)
// GET/POST /api/ping
// ============================================================

const { app } = require('@azure/functions');

app.http('ping', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    return {
      status: 200,
      jsonBody: { message: 'pong', time: new Date().toISOString() },
    };
  },
});
