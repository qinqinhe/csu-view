import { local } from '@/config/wildcard'
const infomation = JSON.parse(localStorage.getItem(local.USER))
console.log('userId:', localStorage.getItem(local.USER))
function socket () {
  
  if ("WebSocket" in window) {
    if (infomation) {
    
      var ws = new WebSocket(`ws://10.20.2.134:9000/socket/websocket/${infomation.userId}`);
      
      ws.onopen = function()
      {
        
        ws.send("发送数据");
        console.log("数据发送中...");
      };
      
      ws.onmessage = function (evt) 
      { 
        var received_msg = evt.data;
        console.log("数据已接收...",evt.data);
      };
      
      ws.onclose = function()
      {
        console.log("连接已关闭..."); 
      };
    }
  }else{
      alert("您的浏览器不支持 WebSocket!");
  }
}

export default socket;