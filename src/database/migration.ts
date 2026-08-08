import { db } from "./database";

export function initializeDatabase() {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS saved_facts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            fact TEXT NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL,
            saved_at TEXT NOT NULL,

            UNIQUE(title, fact, category)
        );
    `);
}