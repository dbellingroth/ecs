import ECSEngine from "./ecs/ECSEngine";
import { Definitions } from "./definitions";
import { WORLD } from "./systems/world";
import { PHYSICS } from "./systems/physics";
import { RENDER } from "./systems/render";


const engine = new ECSEngine<Definitions>({
    systems: [
        WORLD,
        PHYSICS,
        RENDER
    ]
})

engine.dispatchEvent({ type: 'START', data: { tickInterval: 1000 / 60 } })

for (let i = 0; i < 100; i++) {
    engine.createEntity({
        components: {
            PHYSICS: {
                position: [Math.random() * 1000, Math.random() * Math.random() * 1000],
                speed: [(Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1]
            },
            RENDER: {
                symbol: "😳"
            }
        }
    })
}0