import { ECSDefinitions, ECSMergedDefinitions } from "./ECSEngine";

export interface ECSEvent<DEF extends ECSDefinitions, K extends keyof ECSMergedDefinitions<DEF>['events']> {
    type: K,
    data: ECSMergedDefinitions<DEF>['events'][K]
}