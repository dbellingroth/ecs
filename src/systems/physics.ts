import { ECSSystem } from "../ecs/systems";
import { Definitions } from "../definitions";

export const PHYSICS: ECSSystem<Definitions> = {
    eventHandlers: {
        TICK(event, engine) {
            engine.entities
                .filter(e => "PHYSICS" in e.components)
                .forEach(e => {
                    const currentPosition = e.components.PHYSICS!.position
                    const currentSpeed = e.components.PHYSICS!.speed
                    e.components.PHYSICS!.position = [currentPosition[0] + currentSpeed[0] * event.data.delta, currentPosition[1] + currentSpeed[1] * event.data.delta]
                })
        }
    }
}

export type PHYSICS_COMPONENTS = {
    PHYSICS: {
        position: number[],
        speed: number[]
    }
}