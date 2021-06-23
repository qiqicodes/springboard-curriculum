const todos = [
    {
        id: 1,
        text: "walk the dog",
        priority: "high"
    },
    {
        id: 2,
        text: "put out the fire",
        priority: "very high"
    },
    {
        id: 3,
        text: "walk the chicken",
        priority: "low"
    },
    {
        id: 4,
        text: "walk the cat",
        priority: "medium"
    }
]

const todoText = todos.map(function(todo){
    return todo.text;
})

const links = Array.from(document.querySelectorAll('a'));

const url = links.map(function(a){
    return a.href;
})


function myMap (arr, callback) {
    const mappedArr = [];
    for (let i=0; i<arr.length; i++) {
        mappedArr.push(callback(arr[i]));
    }
    return mappedArr;
}

const priorityMap = myMap(todos, function(todo){
    return todo.priority;
})