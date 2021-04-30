export interface Group {
    name: string;
    connnections: Connection[];
}

interface Connection {
    connectionId: string;
    username: string;
}