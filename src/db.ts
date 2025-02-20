import mssql, { ConnectionPool, config as MSSQLConfig } from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

// Ensure environment variables are defined
const dbConfig: MSSQLConfig = {
  user: process.env.DB_USER || '', // Provide a default or handle missing values
  password: process.env.DB_PASSWORD || '',
  server: process.env.DB_HOST || '',
  database: process.env.DB_NAME || '',
  port: Number(process.env.DB_PORT) || 1433, // Default SQL Server port
  options: {
    encrypt: false,  // Set to `true` if using Azure SQL
    trustServerCertificate: true
  }
};

// Validate that all required values are provided
if (!dbConfig.user || !dbConfig.password || !dbConfig.server || !dbConfig.database) {
  throw new Error("Missing required database environment variables.");
}

// Define a cache object with a proper TypeScript type
const cache: { pool: ConnectionPool | null } = { pool: null };

async function init(): Promise<void> {
  if (cache.pool) {
    console.log('Connection Pool already initialized');
    return;
  }

  console.log('Initializing Connection Pool');

  try {
    cache.pool = new mssql.ConnectionPool(dbConfig);
    await cache.pool.connect();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    cache.pool = null;
    throw error;
  }
}


function getConnection(): mssql.Request {
  if (!cache.pool) {
    throw new Error("Database connection pool is not initialized.");
  }
  return cache.pool.request();
}


async function query(sqlQuery: string, params: any = []) {

  let newQuery = sqlQuery;

  if (params && params.length > 0) {
    const _params = [...params];
    console.log('params', _params);
    newQuery = sqlQuery.replace(/\?/g, (): any => {
      return (escapeValue(_params.shift()));
    });
  }

  console.log(newQuery);
  const connection = getConnection();

  const results = await connection.query(newQuery);
  // console.log('results', results);
  return results?.recordset;
}

export function escapeValue(term: any) {
  if (term === undefined || term === null) {
    return 'NULL';
  }

  if (typeof term === 'number') {
    return `${term}`;
  }

  if (typeof term === 'string') {
    const value = term.replace(/'/g, "''");
    return `N'${value}'`;
  }

  if (typeof term === 'boolean') {
    return +!!term;
  }

  if (term instanceof Date) {
    return `N'${term.toISOString()}'`;
  }

  // if (term instanceof moment) {
  //   // Need to pass true so that moment will add the timezone info
  //   return `N'${term.toISOString(true)}'`;
  // }

  // if (Array.isArray(term)) {
  //   const paramsArray = [];
  //   term.forEach((element) => {
  //     paramsArray.push(escapeValue(element));
  //   });
  //   return paramsArray.join();
  // }

  throw new Error(`Could not parse ${term}`);
}

export default { init, query };









