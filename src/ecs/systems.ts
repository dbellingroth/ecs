import ECSEngine, { ECSEngineTypeDefinitions } from "./ECSEngine";
import { ECSEvent } from "./events";

export interface ECSSystem<DEF extends ECSEngineTypeDefinitions> {
    handlers: {
        [H in keyof DEF['events']]?: (event: ECSEvent<DEF, H>, engine: ECSEngine<DEF>) => unknown
    }
}