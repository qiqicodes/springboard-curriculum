
document.addEventListener('mousemove', function (event){
    // console.log(event.pageX, event.pageY);
    const xRatioColor = Math.round(event.pageX * 255 / window.innerWidth);
    const yRatioColor = Math.round(event.pageY * 255/ window.innerHeight);
    const color = `rgb(${xRatioColor}, 0, ${yRatioColor})`;
    document.body.style.backgroundColor =  color;
})

