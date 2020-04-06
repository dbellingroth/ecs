import { ECSDefinitions } from "./ecs/ECSEngine";
import { WORLD_EVENTS, WORLD_COMPONENTS } from "./systems/world";
import { RENDER_COMPONENTS } from "./systems/render";
import { PHYSICS_COMPONENTS } from "./systems/physics";

export interface Definitions extends ECSDefinitions {
    components: WORLD_COMPONENTS & RENDER_COMPONENTS & PHYSICS_COMPONENTS & {},
    events: WORLD_EVENTS & {}
}