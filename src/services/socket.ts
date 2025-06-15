let socket: WebSocket | undefined;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000;

export const connectSocket = (token: string): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {
        try {
            if (socket?.readyState === WebSocket.OPEN) {
                resolve(socket);
                return;
            }

            socket = new WebSocket(`wss://the-zenchat-backend.onrender.com?token=${token}`);

            socket.onopen = () => {
                console.log('WebSocket connected');
                reconnectAttempts = 0;
                resolve(socket!);
            };

            socket.onclose = () => {
                console.log('WebSocket disconnected');
                if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                    reconnectAttempts++;
                    setTimeout(() => {
                        connectSocket(token).catch(console.error);
                    }, RECONNECT_DELAY);
                }
            };

            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                reject(error);
            };
        } catch (error) {
            console.error('Failed to create WebSocket:', error);
            reject(error);
        }
    });
};

export const getSocket = (): WebSocket | undefined => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.warn('WebSocket is not connected');
        return undefined;
    }
    return socket;
};

export const disconnectSocket = (): void => {
    if (socket) {
        socket.close();
        socket = undefined;
    }
}; 