export class Route {
    constructor(
        public name: string,
        public url: string,
    ) {}
}

export const appRoutes: Route[] = [
    new Route('Dashboard', 'dashboard'),
    new Route('Create task', 'create'),
];