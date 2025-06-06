let socket;

export const connectSocket = (token)=>{
    socket= new WebSocket(`ws://localhost:9090/ws?token=${token}`);
};

export const getSocket = ()=> socket;

