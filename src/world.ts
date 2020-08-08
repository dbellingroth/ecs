export type Entity = number
export type Component<T> = T & string

interface EntityQuery {
    withComponents? : Array<Component<any>>
}

export class World {

    private entityCounter = 0

    private entities : Array<Entity> = []

    private componentData : {
        [entity: number]: {
            [component: string] : any
        }
    } = {}
    
    createEntity() : Entity {
        const entity = this.entityCounter++
        this.entities.push(entity)
        this.componentData[entity] = {}
        return entity
    }

    deleteEntity(entity: Entity) {
        this.entities.splice(this.entities.indexOf(entity), 1)
        delete this.componentData[entity]
    }

    listEntities( options: EntityQuery = {}) : Array<Entity> {
        if (options.withComponents != null) return this.entities.filter(e => {
            const components = this.componentData[e]
            for (let c of options.withComponents) {
                if (!(c in components)) return false
            }
            return true
        })

        else return this.entities
    }

    setComponent<T>(entity: Entity, component: Component<T>, data: T) {
        this.componentData[entity][component] = data
    }

    getComponents<A>(entity: Entity, components: [Component<A>]) : [A]
    getComponents<A,B>(entity: Entity, components: [Component<A>,Component<B>]) : [A,B]
    getComponents<A,B,C>(entity: Entity, components: [Component<A>,Component<B>,Component<C>]) : [A,B,C]
    getComponents<A,B,C,D>(entity: Entity, components: [Component<A>,Component<B>,Component<C>,Component<D>]) : [A,B,C,D]
    getComponents<A,B,C,D,E>(entity: Entity, components: [Component<A>,Component<B>,Component<C>,Component<D>,Component<E>]) : [A,B,C,D,E]
    getComponents<A,B,C,D,E,F>(entity: Entity, components: [Component<A>,Component<B>,Component<C>,Component<D>,Component<E>,Component<F>]) : [A,B,C,D,E,F]
    getComponents(entity: Entity, components: Array<Component<unknown>>) : Array<unknown> {
        const data = this.componentData[entity]
        return components.map(c => data?.[c as any])
    }

    removeComponents(entity: Entity, components: Array<Component<any>>) {
        for (let c of components) {
            delete this.componentData[entity]?.[c as any]
        } 
    }

}

export function defineComponent<T>(name: string) : Component<T> {
    return name as any
}