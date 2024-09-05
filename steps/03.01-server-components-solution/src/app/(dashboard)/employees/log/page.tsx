import { Code } from 'bright';

import { promises as fs } from 'fs';
import path from 'path';

const Logs = async () => {
  const logsFile = path.resolve(process.cwd(), 'logs.txt');
  try {
    const logs = await fs.readFile(logsFile, 'utf8');
    return <Code lang="json">{logs}</Code>;
  } catch (err) {
    return 'No logs file found :/';
  }
};

export default Logs;
