import { useEffect, useRef, useState } from "react";
import ChatRender from "./component/chat";
function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [roomid, setRoomid] = useState("");
  const [msg, setMsg] = useState<string[]>([]);
  const inputref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    let ns = new WebSocket("ws://localhost:8080");
    console.log(ns);
    setSocket(ns);
    console.log("connected");
    ns.onmessage = (ev) => {
      setMsg((prevMsg) => [...prevMsg, ev.data]);
    };
    return () => {
      ns.close();
    };
  }, []);
  const SendMassage = () => {
    if (socket&& roomid && inputref.current?.value) {
      let obj={
        "type":"chat",
        "payload":{
          "userid":"Radha Krishna 1",
          "roomid":roomid,
          "message":inputref.current?.value
        }
      };
      socket?.send(JSON.stringify(obj));
    }
  };

  return (
    <div className="bg-black flex flex-col text-white h-screen  justify-space-arround items-center ">
      <div className="bg-red-200 text-yellow-500 text-center w-full ">
        Radhe Radhe 
      </div>
      <div className="flex gap-3 m-10 flex-wrap  justify-center items-center">
        <input type="text" placeholder="Enter room ID" value={roomid} onChange={(e) => setRoomid(e.target.value)} />
        <button className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-700 " onClick={() => {
          if (socket && roomid) {
            let obj={
              "type":"join",
              "payload":{
                "userid":"Radha Krishna 1",
                "roomid":roomid
              }
            };
            socket?.send(JSON.stringify(obj));
          }
        }}>Join Room</button>
      </div>
      <div className="bg-green-200 text-black text-center w-full ">
      </div>
      <div className="flex-1 min-h-0 w-full max-w-3xl overflow-y-auto px-4 py-2">
        <ChatRender msg={msg} />
      </div>
     <div className="flex gap-3 m-10 flex-wrap  justify-center items-center">
  <input 
    type="text" 
    placeholder="Enter text..." 
    className=" flex grow min-w-[70vw] bg-gray-800 text-white px-3 py-2 rounded" 
    ref={inputref}
  />
  <button className="bg-blue-500 text-white px-4 
  py-2 rounded-lg hover:bg-blue-700 " onClick={(() => SendMassage())}>
    Submit
  </button>
</div>
      
    </div>
  );
}

export default App;
