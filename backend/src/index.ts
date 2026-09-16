import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let allSocket: { [key: string]: WebSocket[] } = {};
let userRoom: { [key: string]: string } = {};
let userCount = 0;
wss.on("connection", (socket: WebSocket) => {
  userCount++;
  console.log("new connection", userCount);

  //    let it= setInterval(()=>{i+
  //         console.log(`sending message Radhe Radhe ${i}`)
  //          socket.send(`RADHE RADHE ${i}`)}, 1000)

  socket.send("Radhe Radhe Krishna");
  socket.on("message", (e) => {
   // console.log(e);
    console.log(e.toString());
    let { type, payload } = JSON.parse(e.toString());
    console.log(`Radhe Radhe ${type} message received`, payload);
    if (type == "join") {
      if (!allSocket[payload.roomid]) {
        allSocket[payload.roomid] = [];
      }
      console.log(`Radhe Radhe user joined room ${payload.roomid}`,allSocket[payload.roomid]);
      allSocket[payload.roomid]?.push(socket);
      userRoom[payload.userid] = payload.roomid;
    } else if (type == "chat") {
      let usersc = userRoom[payload.userid];

      allSocket[usersc as string]?.forEach((s) => {
        // if (s !== socket)
        {
            console.log(`Radhe Radhe ${payload.userid} want to chat `)
          s.send(JSON.stringify( payload.message ));
        }
      });
    }
  });
  socket.on("close", () => {
    // allSocket[payload.roomid]=allSocket[payload.roomid]?.filter(s=>s!==socket) || []
    userCount--;
    console.log("connection closed", userCount);
  });
  socket.on("error", (err) => {
    console.error;
  });
});
