const webSocketReq = (url, open, close, message, error) => {
  const websocket = new WebSocket(url);
  websocket.onopen = function(evt) {
    open(evt);
  };
  websocket.onclose = function(evt) {
    close(evt);
  };
  websocket.onmessage = function(evt) {
    message(evt);
  };
  websocket.onerror = function(evt) {
    error(evt);
  };
};

export default webSocketReq;
