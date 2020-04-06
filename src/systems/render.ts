import { ECSSystem } from "../ecs/systems";
import { Definitions } from "../definitions";
import { ECSEntity } from "../ecs/entities";

export const RENDER = {
    eventHandlers: {
        TICK(event, engine) {
            engine.entities
                .filter(e => "RENDER" in e.components && "PHYSICS" in e.components)
                .forEach(e => this.render(e))
        }
    },
    render(e: ECSEntity<Definitions>) {
        const element = document.getElementById(`entity-${e.id}`) || (() => {
            const element = document.createElement('div', {  })
            element.id = `entity-${e.id}`
            element.style.position = 'absolute'
            document.body.appendChild(element)
            return element
        })()
        element.innerText = e.components.RENDER.symbol
        element.style.transform = `translate(${e.components.PHYSICS.position[0]}px, ${e.components.PHYSICS.position[1]}px)`
    }
} as ECSSystem<Definitions>

export type RENDER_COMPONENTS = {
    RENDER: {
        symbol: string
    }
}