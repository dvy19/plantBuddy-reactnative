// src/database/database.ts

import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("plantbuddy.db");

export function initDatabase() {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS saved_plants (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            water_requirement TEXT NOT NULL,
            image_url TEXT
        );

        DROP TABLE IF EXISTS saved_facts;

        CREATE TABLE saved_facts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            title TEXT NOT NULL,
            fact TEXT NOT NULL,
            category TEXT,
            saved_at TEXT NOT NULL
        );
    `);

    
}
