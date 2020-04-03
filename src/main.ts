import ECSEngine, { ECSEngineTypeDefinitions } from "./ecs/ECSEngine";

interface ECSTypeDef extends ECSEngineTypeDefinitions {
    components: {
        name: string
    },
    events: {
        START: void,
        TICK: number
    }
}

const engine = new ECSEngine<ECSTypeDef>({systems: [
    {
        handlers: {
            START(event, engine) {
                setInterval(() => engine.dispatchEvent({
                    type: 'TICK',
                    data: Date.now()
                }), 1000)
            }
        }
    }, {
        handlers: {
            TICK(event, engine) {
                console.log(event.data)
            }
        }
    }
]})

engine.dispatchEvent({type: 'START', data: null})