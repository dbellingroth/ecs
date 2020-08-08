import { World, defineComponent } from "./world";
import { EventBus, defineEvent } from "./eventbus";

export type System = (world: World, events: EventBus) => unknown

interface ECSOptions {
    systems: Array<System>
}

const TimingSystem : System = (world, events) => {

    let running = false
    let lastTime : number

    events.subscribe(ECS.Events.START, () => {
        console.debug("ECS started")
        running = true
        const handler = () => {
            if (running) {
                const currentTime = Date.now()
                const delta = lastTime != null ? (currentTime - lastTime) : 0
                events.publish(ECS.Events.TICK, { delta })
                lastTime = currentTime
                window.requestAnimationFrame(handler)
            }
        }
        window.requestAnimationFrame(handler) 
    })

    events.subscribe(ECS.Events.STOP, () => {
        console.debug("ECS stopped")
        running = false
        lastTime = null
    })
}

export class ECS {
    public world = new World()
    public events = new EventBus()
    private systems: Array<System>

    static Events = {
        START: defineEvent("ECS_START"),
        STOP: defineEvent("ECS_STOP"),
        TICK: defineEvent<{ delta: number }>("ECS_TICK")
    }

    constructor(options: ECSOptions) {
        this.systems = [TimingSystem, ...options.systems]
        this.systems.forEach(s => s(this.world, this.events))
    }

    start() {
        this.events.publish(ECS.Events.START, null)
    }

    stop() {
        this.events.publish(ECS.Events.STOP, null)
    }
}