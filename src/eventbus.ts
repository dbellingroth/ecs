type Event<T> = T & symbol
type ListenerReference = symbol

type EventHandler<T> = (data: T) => unknown

export class EventBus {

    private handlers: {
        [event: string] : Array<{
            reference: ListenerReference,
            handler: EventHandler<any>,
            priority: number
        }>
    } = {}
    
    publish<T>(event: Event<T>, data: T) {
        for (let listener of (this.handlers[event as any] || [])) {
            listener.handler(data)
        }
    }

    subscribe<T>(event: Event<T>, handler: EventHandler<T>, priority : number = 0) : ListenerReference {
        const reference = Symbol();
        this.handlers[event as any] = [...(this.handlers[event as any] || []), {
            reference,
            handler,
            priority
        }].sort((a,b) => a.priority - b.priority)
        return reference
    }

    unsubscribe<T>(event: Event<T>, listener: ListenerReference) {
        if (this.handlers[event as any] == null) return
        this.handlers[event as any] = (this.handlers[event as any] || []).filter(it => it.reference !== listener)
    }

}

export function defineEvent<T>(name: string) : Event<T> {
    return Symbol(name) as Event<T>
}