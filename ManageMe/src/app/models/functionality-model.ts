import { task } from "./task-model"

export interface functionality{
    functionalityID: number;
    name: string;
    description: string;
    tasks?: task[];
}