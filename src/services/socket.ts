let socket: WebSocket | undefined;

export const connectSocket = (token: string): void => {
    socket = new WebSocket(`ws://localhost:9090/ws?token=${token}`);
};

export const getSocket = (): WebSocket | undefined => socket; 