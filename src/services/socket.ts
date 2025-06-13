let socket: WebSocket | undefined;

export const connectSocket = (token: string): void => {
    socket = new WebSocket(`wss://the-zenchat-backend.onrender.com?token=${token}`);
};

export const getSocket = (): WebSocket | undefined => socket; 