import { ECSEntity } from "./entities";
import { ECSSystem } from "./systems";
import { ECSEvent } from "./events";

type ECSEngineOptions<DEF extends ECSDefinitions> = {
    systems: ECSSystem<DEF>[]
}

export interface ECSDefinitions {
    components: {
        [key: string]: any
    },
    events: {
        [key: string]: any
    }
}

interface ECSBuiltInDefinitions<DEF extends ECSDefinitions> extends ECSDefinitions {
    components: {

    },
    events: {
        ENTITY_CREATED: ECSEntity<ECSMergedDefinitions<DEF>>,
        ENTITY_REMOVED: ECSEntity<ECSMergedDefinitions<DEF>>
    }
}

export type ECSMergedDefinitions<DEF extends ECSDefinitions> = {
    components: ECSBuiltInDefinitions<DEF>['components'] & DEF['components'],
    events: ECSBuiltInDefinitions<DEF>['events'] & DEF['events']
}

export default class ECSEngine<DEF extends ECSDefinitions> {

    private systems: ECSSystem<DEF>[]
    public entities: ECSEntity<DEF>[]
    private entityCounter = 0

    constructor(options: ECSEngineOptions<ECSMergedDefinitions<DEF>>) {
        this.systems = options.systems
        this.entities = []
    }

    async dispatchEvent<E extends keyof ECSMergedDefinitions<DEF>['events']>(event: ECSEvent<DEF, E>): Promise<void> {
        await Promise.all(
            this.systems.map(system => {
                if (event.type in system.eventHandlers) {
                    return (system.eventHandlers[event.type].bind(system))(event, this)
                }
            })
        )
    }

    createEntity(data: Omit<ECSEntity<DEF>, 'id'>): ECSEntity<DEF> {
        const id = this.entityCounter++;
        const entity = {
            id,
            ...data
        }
        this.entities.push(entity)
        return entity
    }

    removeEntity(id: number): ECSEntity<DEF> | null {
        let index = -1
        const entity = this.entities.find((e, i) => e.id == id ? (index = i, true) : false)
        if (entity == null) return null;
        this.entities.splice(index, 1)
    }

}