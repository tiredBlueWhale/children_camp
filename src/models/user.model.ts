import { DBDocument } from "./db-document.model";

export interface User extends DBDocument {
    name: string,
    roles: [string],
}

export interface PlatformUser extends User {
    // name?: string,
    firstName?: string,
    lastName?: string,
    address?: string,
}

export interface ISupervisor extends PlatformUser {
    superviseGroup: number,
}

export interface IKid extends DBDocument {
    name: string,
    address?: string,
    group: string,
    state: number,
}

export enum KidState {
    OUT = 0,
    IN = 1,
    ACTIVITY = 2
}