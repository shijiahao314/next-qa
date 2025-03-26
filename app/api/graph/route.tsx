// app/api/graph/route.js
import neo4j from 'neo4j-driver';

const NEO4J_URI = process.env.NEXT_PUBLIC_NEO4J_URI || '';
const NEO4J_USER = process.env.NEXT_PUBLIC_NEO4J_USER || '';
const NEO4J_PASSWORD = process.env.NEXT_PUBLIC_NEO4J_PASSWORD || '';

/******  0e4f98ff-e0e9-41db-8111-d1cf07769f8d  *******/ export async function GET() {
  const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (a)-[r]->(b) 
      RETURN a, r, b LIMIT 20
    `);

    const nodes = new Map();
    const edges = [];

    result.records.forEach((record) => {
      const nodeA = record.get('a');
      const nodeB = record.get('b');
      const relation = record.get('r');

      if (!nodes.has(nodeA.identity.low)) {
        nodes.set(nodeA.identity.low, {
          id: nodeA.identity.low,
          label: nodeA.labels[0],
          properties: nodeA.properties
        });
      }
      if (!nodes.has(nodeB.identity.low)) {
        nodes.set(nodeB.identity.low, {
          id: nodeB.identity.low,
          label: nodeB.labels[0],
          properties: nodeB.properties
        });
      }

      edges.push({
        id: relation.identity.low,
        source: nodeA.identity.low,
        target: nodeB.identity.low,
        type: relation.type
      });
    });

    return Response.json({ nodes: Array.from(nodes.values()), edges });
  } catch (error) {
    console.error('Neo4j Query Error:', error);
    return Response.json({ error: 'Failed to fetch graph data' }, { status: 500 });
  } finally {
    await session.close();
    await driver.close();
  }
}
