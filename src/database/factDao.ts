import { db } from "./database";
import { SavedFact } from "../models/Fact";

export function saveFact(fact: SavedFact) {

    db.runSync(
        `
        INSERT OR IGNORE INTO saved_facts
        (title, fact, category, date, saved_at)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            fact.title,
            fact.fact,
            fact.category,
            fact.date,
            new Date().toISOString()
        ]
    );

}