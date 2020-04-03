import { ECSEntity } from "./entities";
import { ECSSystem } from "./systems";
import { ECSEvent } from "./events";

type ECSEngineOptions<DEF extends ECSEngineTypeDefinitions> = {
    systems: ECSSystem<DEF>[]
}

export interface ECSEngineTypeDefinitions {
    components: {
        [key: string]: any
    },
    events: {
        [key: string]: any
    }
}

export default class ECSEngine<DEF extends ECSEngineTypeDefinitions> {

    private systems: ECSSystem<DEF>[]
    public entities: ECSEntity<DEF>[]
    private entityCounter = 0

    constructor(options: ECSEngineOptions<DEF>) {
        this.systems = options.systems
        this.entities = []
    }

    async dispatchEvent<E extends keyof DEF['events']>(event: ECSEvent<DEF, E>): Promise<void> {
        await Promise.all(
            this.systems.map(system => {
                if (event.type in system.handlers) {
                    return system.handlers[event.type](event, this)
                }
            })
        )
    }

    createEntity(data: Omit<ECSEntity<DEF>, 'id'>): ECSEntity<DEF> {
        const id = this.entityCounter++;
        return {
            id,
            ...data
        }
    }

    removeEntity(id: number): ECSEntity<DEF> | null {
        let index = -1
        const entity = this.entities.find((e, i) => e.id == id ? (index = i, true) : false)
        if (entity == null) return null;
        this.entities.splice(index, 1)
    }

}