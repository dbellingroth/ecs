import { ECSDefinitions, ECSMergedDefinitions } from "./ECSEngine";

export interface ECSEntity<DEF extends ECSDefinitions> {
    id: number,
    components: {
        [K in keyof ECSMergedDefinitions<DEF>['components']]?: ECSMergedDefinitions<DEF>['components'][K]
    }
}