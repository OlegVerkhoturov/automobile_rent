import { Pool } from 'pg';

import { DATABASE_CONNECTION } from '../../configuration';

const pool = new Pool({ connectionString: DATABASE_CONNECTION });

export default pool;
