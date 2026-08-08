import { Code } from 'bright';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const Logs = async () => {
  const logFilePath = join(process.cwd(), '../../', 'logs.txt');

  try {
    const logFile = await readFile(logFilePath, 'utf-8');
    return <Code lang="json">{logFile}</Code>;
  } catch (_error) {
    return 'No logs file found :/';
  }
};

export default Logs;
