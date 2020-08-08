import { ECS, System } from "./ecs";
import { Component, defineComponent, Entity } from "./world";
import { defineEvent } from "./eventbus";




const EMOJI_DATA = defineComponent<{
    char: string,
    position: [number, number],
    speed: [number, number],
    angle: number,
    rotation: number

}>("EMOJI")

const EMOJI_BORN = defineEvent<Entity>("EMOJI_BORN")
const EMOJI_DIED = defineEvent<Entity>("EMOJI_DIED")

const creatorSystem : System = (world, events) => {

    const emojis = ["😀","🥳","💩","👠","🦊","🐛","🦞","🦓","🐖","🦙","🌵"]

    let counter = 0
    events.subscribe(ECS.Events.TICK, e => {
        counter += e.delta
        while (counter > 1000) {
            counter -= 1000
            const emoji = world.createEntity()
            world.setComponent(emoji, EMOJI_DATA, {
                char: emojis[Math.floor(Math.random() * emojis.length)],
                position: [Math.random() * (window.innerWidth - 30), Math.random() * (window.innerHeight - 30)],
                speed: [Math.random() - 0.5, Math.random() - 0.5].map(v => v * 0.2),
                angle: Math.random() * Math.PI * 2,
                rotation: (Math.random() - 0.5) * 0.02
            })
            events.publish(EMOJI_BORN, emoji)
        }
        for (let entity of world.listEntities({ withComponents: [EMOJI_DATA] })) {
            const [data] = world.getComponents(entity, [EMOJI_DATA])
            if (data.position[0] < 0 || data.position[0] > (window.innerWidth - 30) || data.position[1] < 0 || data.position[1] > (window.innerHeight - 30)) {
                world.deleteEntity(entity)
                events.publish(EMOJI_DIED, entity)
            }
        }
    })
}

const physicsSystem : System = (world, events) => {
    events.subscribe(ECS.Events.TICK, e => {
        for (let entity of world.listEntities({ withComponents: [EMOJI_DATA] })) {
            const [data] = world.getComponents(entity, [EMOJI_DATA])
            data.position[0] = data.position[0] + data.speed[0] * e.delta
            data.position[1] = data.position[1] + data.speed[1] * e.delta
            data.angle = data.angle + data.rotation * e.delta
        }
    })
}

const renderSystem : System = (world, events) => {

    events.subscribe(EMOJI_DIED, e => {
        document.body.removeChild(document.getElementById(`emoji-${e}`))
    })

    events.subscribe(ECS.Events.TICK, e => {
        for (let entity of world.listEntities({ withComponents: [EMOJI_DATA] })) {
            renderEmoji(entity)
        }
    })

    function renderEmoji(e: Entity) {
        const [data] = world.getComponents(e, [EMOJI_DATA])
        const el = document.getElementById(`emoji-${e}`) ?? document.createElement("span")
        document.body.appendChild(el)
        el.id = `emoji-${e}`
        el.style.position = "absolute"
        el.style.top = "0"
        el.style.left = "0"
        el.innerHTML = data.char
        if (el == null) return
        el.style.transform = `translate(${data.position[0]}px, ${data.position[1]}px) rotate(${data.angle}rad)`
    }
}

const ecs = new ECS({
    systems: [creatorSystem, physicsSystem, renderSystem]
})


ecs.start()