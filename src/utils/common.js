export function showTip(message, obj) {
  if (obj !== undefined) {
    message[obj.type](obj.info, 2);
  }
}
