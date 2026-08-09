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
    `);
}