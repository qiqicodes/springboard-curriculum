// returns a randomly selected item from array of items
const choice = (items) => {
    let index = Math.floor(Math.random()* items.length);
    return items[index];

}

// removes the first matching item from items, 
// if item exists, and returns it. Otherwise returns undefined.
const remove = (items, item) => {
    for(let i = 0; i < items.length; i++) {
        if(items[i] === item){
            return [...items.slice(0,i), ...items.slice(i+1)]; 
        }
    }
}

export { choice, remove }