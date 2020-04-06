import ECSEngine, { ECSDefinitions, ECSMergedDefinitions } from "./ECSEngine";
import { ECSEvent } from "./events";

export interface ECSSystem<DEF extends ECSDefinitions> {
    eventHandlers: {
        [H in keyof ECSMergedDefinitions<DEF>['events']]?: (event: ECSEvent<DEF, H>, engine: ECSEngine<DEF>) => unknown
    }
}