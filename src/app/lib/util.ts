export function cloneObject(obj: any): any{
  return JSON.parse(JSON.stringify(obj));
}
