import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), 'data', 'logs.json');

export interface LogEntry {
    id: string;
    timestamp: string;
    level: 'info' | 'warn' | 'error';
    source: string;
    message: string;
    data?: any;
}

export async function addLog(entry: Omit<LogEntry, 'id' | 'timestamp'>) {
    try {
        const dir = path.dirname(LOG_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        let logs: LogEntry[] = [];
        if (fs.existsSync(LOG_FILE)) {
            const content = fs.readFileSync(LOG_FILE, 'utf-8');
            try {
                logs = JSON.parse(content);
            } catch (e) {
                console.error('Failed to parse logs file', e);
                logs = [];
            }
        }

        const newEntry: LogEntry = {
            ...entry,
            id: Math.random().toString(36).substring(2, 11),
            timestamp: new Date().toISOString(),
        };

        logs.unshift(newEntry);

        // Keep only last 100 logs
        if (logs.length > 100) {
            logs = logs.slice(0, 100);
        }

        fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
    } catch (error) {
        console.error('Failed to write log:', error);
    }
}

export async function getLogs(): Promise<LogEntry[]> {
    try {
        if (fs.existsSync(LOG_FILE)) {
            const content = fs.readFileSync(LOG_FILE, 'utf-8');
            return JSON.parse(content);
        }
    } catch (error) {
        console.error('Failed to read logs:', error);
    }
    return [];
}
