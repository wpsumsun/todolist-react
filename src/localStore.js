export function save(key,value){
    console.log(key+JSON.stringify(value))
    return window.localStorage.setItem(key,JSON.stringify(value))
}

export function load(key){
    console.log(window.localStorage.getItem(key))
    return JSON.parse(window.localStorage.getItem(key))
}