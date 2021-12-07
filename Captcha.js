// 驗證碼的值
const captcha = document.querySelector('.captacha')
// 重新載入驗證碼btn
const reloadBtn = document.querySelector('.reload-btn')
// 輸入框
const input = document.querySelector('input')
// 確認鈕
const checkBtn = document.querySelector('.check-btn')
// 狀態文字
const statusTxt = document.querySelector('.status')

// 把驗證碼的所有字母放入陣列
let allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                     'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
                     'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                     't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

//純數字驗證碼
// let allCharacters = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// 設定驗證碼             
function getCaptcha(){
    // 隨機取6個字
    for (let i = 0; i < 6; i++) {
        let randomChar = allCharacters[Math.floor(Math.random()* allCharacters.length)]
        // console.log(randomChar)
        // console.log(Math.floor(Math.random()* allCharacters.length))  
        // 預留一個空格
        captcha.innerText +=` ${randomChar}`
    }
}
//點擊按鈕的時候，先清空再重新設定驗證碼
reloadBtn.addEventListener('click',()=>{
    //按重整時把提示字跟input的值清空
    input.value=''
    captcha.innerText=''
    statusTxt.innerText=''
    getCaptcha();
})
getCaptcha();

checkBtn.addEventListener('click', e=>{
    // 阻止預設行為
    e.preventDefault()
    // 顯示狀態值
    statusTxt.style.display="block"
    // 將input 的直拆開在用空格串接，串接後會是字串型態
    let inputVal=input.value.split('').join(' ')
    // console.log(inputVal)
    // console.log(captcha.innerText)

    if(inputVal==captcha.innerText){
        statusTxt.innerText='驗證成功！人類認證！'
        statusTxt.style.color="blue"
        // 輸入正確之後，設定回初始狀態
        setTimeout(()=>{
            statusTxt.style.display = 'none';
            input.value = '';
            captcha.innerText=''
            // 都清空之後再隨機設定驗證碼
            getCaptcha();
        },2500)
    }else{
        statusTxt.innerText='驗證碼錯誤，請再試一次'
        statusTxt.style.color="red"
    }
})