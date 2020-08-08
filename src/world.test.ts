import { World, defineComponent } from "./world"

test("Should work", () => {
    const world = new World()

    const TEST_COMPONENT_1 = defineComponent<{ value: number }>("TEST_COMPONENT_1")
    const TEST_COMPONENT_2 = defineComponent<string>("TEST_COMPONENT_2")
    const e1 = world.createEntity()
    const e2 = world.createEntity()

    world.setComponent(e1, TEST_COMPONENT_1, { value: 1 })
    world.setComponent(e2, TEST_COMPONENT_1, { value: 2 })
    world.setComponent(e1, TEST_COMPONENT_2, "Test")

    expect(world.listEntities().length).toBe(2)
    expect(world.listEntities({ withComponents: [TEST_COMPONENT_1] }).length).toBe(2)
    expect(world.listEntities({ withComponents: [TEST_COMPONENT_1, TEST_COMPONENT_2] }).length).toBe(1)
    world.removeComponents(e2, [TEST_COMPONENT_1])
    expect(world.listEntities({ withComponents: [TEST_COMPONENT_1] }).length).toBe(1)
    world.deleteEntity(e2)
    expect(world.listEntities()).toEqual([e1])
})