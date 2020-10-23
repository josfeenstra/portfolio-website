// author : Jos Feenstra

function AddJuicyness(handle) {
    
    let items = document.querySelectorAll(handle);
    items.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.childNodes[1].classList.add('img-darken');
        })

        item.addEventListener('mouseout', () => {
            item.childNodes[1].classList.remove('img-darken');
        })
    })
    
    // such ugly syntax... oh well
    // $(".portfolio-item-wrapper").on('mouseover', () => {
    //     console.log(this.childNodes());
    // });
}

AddJuicynessTo(".portfolio-item-wrapper");

