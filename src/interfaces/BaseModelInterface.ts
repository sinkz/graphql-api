import { ModelsInterface } from './ModelsInterface';

export interface BaseModelInterface {    
    prototype?;
    //Serve pra associar um model com outro
    associate?(models: ModelsInterface): void
}