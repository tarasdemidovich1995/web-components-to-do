import { Watcher } from './watcher';
import { Subscription } from "./subscription";

export function isSubscription(entity: Subscription | Watcher): entity is Subscription {
    return (entity as Subscription)?.host !== undefined;
}

export function isWatcher(entity: Subscription | Watcher): entity is Watcher {
    return (entity as Watcher)?.observer !== undefined;
}