// ============================================================
// shared/cosmosdb.js
// Cosmos DB helper — saves quote + booking submissions
// Uses serverless Cosmos DB
// ============================================================

const { CosmosClient } = require('@azure/cosmos');

// Environment variables set in Azure Portal > Static Web App > Environment variables
// COSMOS_ENDPOINT          = https://techsinno-db.documents.azure.com:443/
// COSMOS_KEY               = your primary key from Azure portal
// COSMOS_DB                = techsinno  (database name)
// COSMOS_CONTAINER         = quotes     (quotes container name)
// COSMOS_BOOKINGS_CONTAINER= bookings   (bookings container name)

let _client = null;
const _containers = {};   // cache keyed by container id

function getClient() {
  if (_client) return _client;

  const endpoint = process.env.COSMOS_ENDPOINT;
  const key      = process.env.COSMOS_KEY;

  if (!endpoint || !key) {
    throw new Error('COSMOS_ENDPOINT and COSMOS_KEY must be set in environment variables.');
  }

  _client = new CosmosClient({ endpoint, key });
  return _client;
}

/**
 * Returns a container, creating the database + container if needed.
 */
async function getContainer(ctrName, partitionKey) {
  if (_containers[ctrName]) return _containers[ctrName];

  const client = getClient();
  const dbName = process.env.COSMOS_DB || 'techsinno';

  const { database } = await client.databases.createIfNotExists({ id: dbName });
  const { container } = await database.containers.createIfNotExists({
    id: ctrName,
    partitionKey: { paths: [partitionKey] },
    defaultTtl: -1,
  });

  _containers[ctrName] = container;
  return container;
}

// ── Quotes ───────────────────────────────────────────────────

async function saveQuote(quote) {
  const ctrName = process.env.COSMOS_CONTAINER || 'quotes';
  const container = await getContainer(ctrName, '/service');
  const { resource } = await container.items.create(quote);
  return resource;
}

async function getQuotes(service) {
  const ctrName = process.env.COSMOS_CONTAINER || 'quotes';
  const container = await getContainer(ctrName, '/service');
  const query = service
    ? { query: 'SELECT * FROM c WHERE c.service = @service ORDER BY c.submittedAt DESC', parameters: [{ name: '@service', value: service }] }
    : { query: 'SELECT * FROM c ORDER BY c.submittedAt DESC' };

  const { resources } = await container.items.query(query).fetchAll();
  return resources;
}

// ── Bookings ─────────────────────────────────────────────────

async function saveBooking(booking) {
  const ctrName = process.env.COSMOS_BOOKINGS_CONTAINER || 'bookings';
  const container = await getContainer(ctrName, '/bookingType');
  const { resource } = await container.items.create(booking);
  return resource;
}

async function getBookings(bookingType) {
  const ctrName = process.env.COSMOS_BOOKINGS_CONTAINER || 'bookings';
  const container = await getContainer(ctrName, '/bookingType');
  const query = bookingType
    ? { query: 'SELECT * FROM c WHERE c.bookingType = @t ORDER BY c.submittedAt DESC', parameters: [{ name: '@t', value: bookingType }] }
    : { query: 'SELECT * FROM c ORDER BY c.submittedAt DESC' };

  const { resources } = await container.items.query(query).fetchAll();
  return resources;
}

module.exports = { saveQuote, getQuotes, saveBooking, getBookings };
