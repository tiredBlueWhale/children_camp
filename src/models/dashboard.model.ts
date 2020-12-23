import { DBDocument } from "./db-document.model";

interface DashBoardItem extends DBDocument {
    userId?: string,
    userName?: string,
}

export interface ShoppingItem extends DashBoardItem{
    amount: number,
    name: string,
    purchased: boolean
}