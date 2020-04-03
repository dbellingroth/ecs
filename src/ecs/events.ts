import { ECSEngineTypeDefinitions } from "./ECSEngine";

export interface ECSEvent<DEF extends ECSEngineTypeDefinitions, K extends keyof DEF['events']> {
    type: K,
    data: DEF['events'][K]
}