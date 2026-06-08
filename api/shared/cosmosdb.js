// ============================================================
// shared/cosmosdb.js
// Cosmos DB helper — saves quote submissions
// Uses free-tier Cosmos DB (always free: 25 GB + 1000 RU/s)
// ============================================================

const { CosmosClient } = require('@azure/cosmos');

// Environment variables set in Azure Portal > Function App > Configuration
// COSMOS_ENDPOINT = https://techsinno-db.documents.azure.com:443/
// COSMOS_KEY      = your primary key from Azure portal
// COSMOS_DB       = techsinno  (database name)
// COSMOS_CONTAINER= quotes     (container name)

let _client = null;
let _container = null;

async function getContainer() {
  if (_container) return _container;

  const endpoint = process.env.COSMOS_ENDPOINT;
  const key      = process.env.COSMOS_KEY;
  const dbName   = process.env.COSMOS_DB       || 'techsinno';
  const ctrName  = process.env.COSMOS_CONTAINER || 'quotes';

  if (!endpoint || !key) {
    throw new Error('COSMOS_ENDPOINT and COSMOS_KEY must be set in environment variables.');
  }

  _client = new CosmosClient({ endpoint, key });

  // Auto-create database and container if they don't exist
  const { database } = await _client.databases.createIfNotExists({ id: dbName });
  const { container } = await database.containers.createIfNotExists({
    id: ctrName,
    partitionKey: { paths: ['/service'] },
    defaultTtl: -1, // Never expire — keep all quotes forever
  });

  _container = container;
  return _container;
}

/**
 * Saves a quote submission to Cosmos DB.
 * @param {Object} quote - The validated quote object
 * @returns {Object} The saved item from Cosmos DB
 */
async function saveQuote(quote) {
  const container = await getContainer();
  const { resource } = await container.items.create(quote);
  return resource;
}

/**
 * Retrieves all quotes, optionally filtered by service.
 * @param {string} [service] - Optional service filter
 * @returns {Array} Array of quote objects
 */
async function getQuotes(service) {
  const container = await getContainer();
  const query = service
    ? { query: 'SELECT * FROM c WHERE c.service = @service ORDER BY c.submittedAt DESC', parameters: [{ name: '@service', value: service }] }
    : { query: 'SELECT * FROM c ORDER BY c.submittedAt DESC' };

  const { resources } = await container.items.query(query).fetchAll();
  return resources;
}

module.exports = { saveQuote, getQuotes };
