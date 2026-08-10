// src/database/factDatabase.ts

import { SaveFact } from "@/models/MiscModels";
import { db } from "./database";
export function saveFact(
    date: string,
    title: string,
    fact: string,
    category: string
) {
    db.runSync(
        `INSERT INTO saved_facts
        (date, title, fact, category, saved_at)
        VALUES (?, ?, ?, ?, ?)`,
        date,
        title,
        fact,
        category,
        new Date().toISOString()
    );
}
export async function isFactSaved(title:string):Promise<boolean>{

     const result = await db.getFirstAsync<{ title:string }>(
        `
        SELECT title
        FROM saved_facts
        WHERE title = ?
        `,
        title
    );

    return result !== null;

}

export function getSavedFacts() : SaveFact[] {
    return db.getAllSync<SaveFact>(
        `SELECT * FROM saved_facts ORDER BY id DESC`
    );
}

export function deleteFact(id: number) {
    db.runSync(
        `DELETE FROM saved_facts WHERE id = ?`,
        id
    );
}