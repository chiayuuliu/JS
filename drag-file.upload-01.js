
const wrap = document.querySelector('.container')
const dragText = document.querySelector('p')
const button = document.querySelector('button')
const input = document.querySelector('input')
// 宣告全域變數, 讓多個func使用
let file; 

// 設定當按鈕被點擊=點擊到上傳檔案的input
button.onclick = ()=>{
    input.click();
}

input.addEventListener('change',function(){
    console.log(this.files[0])
    file = this.files[0];
    showImg();

})


// 當檔案移入
wrap.addEventListener('dragover',(event)=>{
    event.preventDefault();
    console.log('drag'); 
    wrap.classList.add('active')
    dragText.textContent="Release to upload"
})
// 當檔案移出
wrap.addEventListener('dragleave',()=>{
    console.log('dragleave');
    wrap.classList.remove('active')
    dragText.textContent="Drag & Drop to Upload File"

})
//  drop and dragover都要設定preventDefault 才可以取消預設的預覽圖片
wrap.addEventListener('drop',(event)=>{
    event.preventDefault();
    console.log('drop');
    wrap.classList.add('active')

    // 取的第一個圖檔資訊
    file = event.dataTransfer.files[0]
    showImg();
})

function showImg(){
    console.log('ok')
    wrap.classList.add('active')
    // 建立檔案讀取器
    let fileReader = new FileReader();

    // 設定變數存放上傳檔類型, 用來辨識是否可上傳
    let fileType = file.type

    // 設定一個陣列放可上傳的檔案類型
    let acceptType = ['image/jpeg','image/jpg','image/png'];

    // 如果上傳的是圖片檔
    if(acceptType.includes(fileType)){
        // 將檔案轉換成URL
        fileReader.readAsDataURL(file)
        fileReader.onload = ()=>{
            // 等fileReader載入完成, 把轉化成URL的結果設定給變數
            let fileURL = fileReader.result
            console.log(fileURL)
            // 設定圖片檔HTML, 把URL放入
            let imgTag = `<img src="${fileURL}" alt="">`
            wrap.innerHTML=imgTag;
        }
    }else{
        alert('請選擇圖片檔')
        wrap.classList.remove('active')
        dragText.textContent="Drag & Drop to Upload File"
    }
}
