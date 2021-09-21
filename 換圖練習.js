const photo = document.querySelector('.photo')
    // 會拿到nodelist, 要用迴圈的方式寫click事件
    const img = document.querySelectorAll('img')
    

    console.log(img)
    // console.log(img)

    for (let i=0; i<img.length;i++){
        img[i].onclick=function(){
            console.log(this.src)
            newSrc = this.src
            photo.src=newSrc
        }
    }
 
