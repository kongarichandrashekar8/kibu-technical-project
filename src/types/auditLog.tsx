import { Note } from "./note";

export type AuditLog = {
    id: string;
    note: string;
    log: Note[];
  };