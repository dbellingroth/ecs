import { ECSEngineTypeDefinitions } from "./ECSEngine";

export interface ECSEntity<DEF extends ECSEngineTypeDefinitions> {
    id: number,
    components: {
        [K in keyof DEF['components']]?: DEF['components'][K]
    }
}