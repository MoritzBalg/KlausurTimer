export function cloneObject(obj: any): any{
  return JSON.parse(JSON.stringify(obj));
}

export function updateObject(target: any, update: any): void{
  for(let [key, value] of Object.entries(update)) {
    target[key] = value;
  }
}
