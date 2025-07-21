export type LogLevel = "info" | "warn" | "error";

export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
}

export interface AccessLog {
  path: string;
  ip?: string;
  geo?: {
    city?: string;
    country?: string;
    region?: string;
  };
  userAgent?: string;
}
