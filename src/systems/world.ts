import { ECSSystem } from "../ecs/systems"
import { Definitions } from "../definitions"

export const WORLD : ECSSystem<Definitions> = {
    eventHandlers: {
        START(event, engine) {
            engine.createEntity({
                components: {
                    WORLD: {
                        tickInterval: event.data.tickInterval
                    }
                }
            })
            engine.dispatchEvent({
                type: "TICK",
                data: {
                    time: window.performance.now(),
                    delta: 0
                }
            })
        },
        TICK(event, engine) {
            const interval = engine.entities.find(e => "WORLD" in e.components).components.WORLD!.tickInterval
            setTimeout(() => {
                const currentTime = window.performance.now()
                engine.dispatchEvent({
                    type: "TICK",
                    data: {
                        time: currentTime,
                        delta: currentTime - event.data.time
                    }
                })
            }, interval)
        },
        ENTITY_CREATED(event, engine) {
            const data = event.data
        }
    }
}

export type WORLD_COMPONENTS = {
    WORLD: {
        tickInterval: number
    }
}

export type WORLD_EVENTS = {
    START: {
        tickInterval: number
    },
    TICK: {
        time: number,
        delta: number
    } 
}