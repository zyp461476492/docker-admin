const webSocketReq = (url, open, close, message, error) => {
  let websocket = new WebSocket(url);
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
  return websocket;
};

export default webSocketReq;
