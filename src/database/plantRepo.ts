import {db} from './database'
import {SavedPlant} from '../models/PlantResponse'

export async function savePlant(plant: SavedPlant) {

    await db.runAsync(
        `
        INSERT OR REPLACE INTO saved_plants
        (id, name, type, water_requirement, image_url)
        VALUES (?, ?, ?, ?, ?)
        `,
        plant.id,
        plant.name,
        plant.type,
        plant.water_requirement,
        plant.image_url
    );
}

export async function isPlantSaved(id: number): Promise<boolean> {

    const result = await db.getFirstAsync<{ id: number }>(
        `
        SELECT id
        FROM saved_plants
        WHERE id = ?
        `,
        id
    );

    return result !== null;
}

export async function deletePlant(id: number) {

    await db.runAsync(
        `
        DELETE FROM saved_plants
        WHERE id = ?
        `,
        id
    );
}

export async function getSavedPlants(): Promise<SavedPlant[]> {

    const plants = await db.getAllAsync<SavedPlant>(
        `
        SELECT *
        FROM saved_plants
        ORDER BY id DESC
        `
    );

    return plants;
}