// ============================================================
// shared/cosmosdb.js
// Cosmos DB helper — saves quote and booking submissions.
// Uses free-tier Cosmos DB (always free: 25 GB + 1000 RU/s).
// ============================================================

const { CosmosClient } = require('@azure/cosmos');

// Environment variables (set in Azure Portal > Function App > Configuration):
//   COSMOS_ENDPOINT          = https://techsinno-db.documents.azure.com:443/
//   COSMOS_KEY               = primary key from Azure portal
//   COSMOS_DB                = techsinno   (database name)
//   COSMOS_CONTAINER         = quotes      (quotes container)
//   COSMOS_BOOKINGS_CONTAINER= bookings    (bookings container, optional)

let _client = null;
const _containers = {}; // cache by container id

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

async function getContainer(ctrId, partitionKeyPath) {
  if (_containers[ctrId]) return _containers[ctrId];

  const client = getClient();
  const dbName = process.env.COSMOS_DB || 'techsinno';

  const { database }  = await client.databases.createIfNotExists({ id: dbName });
  const { container } = await database.containers.createIfNotExists({
    id: ctrId,
    partitionKey: { paths: [partitionKeyPath] },
  });

  _containers[ctrId] = container;
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
