import { EventBus, defineEvent } from "./eventbus";

test("Should work correctly", () => {

    const bus = new EventBus()

    const result : string[] = []

    const TEST_EVENT = defineEvent<{ value: number }>("TEST")

    const refA = bus.subscribe(TEST_EVENT, (e) => {
        result.push(`A${e.value}`)
    }, 1000)

    const refB = bus.subscribe(TEST_EVENT, (e) => {
        result.push(`B${e.value}`)
    }, 0)

    bus.publish(TEST_EVENT, { value: 1 })
    bus.unsubscribe(TEST_EVENT, refB)
    bus.publish(TEST_EVENT, { value: 2 })

    expect(result).toEqual(["B1", "A1", "A2"])
})