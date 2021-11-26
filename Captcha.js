// 驗證碼的值
const captcha = document.querySelector('.captacha')
const reloadBtn = document.querySelector('.reload-btn')
// 輸入框
const input = document.querySelector('input')
const checkBtn = document.querySelector('.check-btn')
const statusTxt = document.querySelector('.status')


let allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                     'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
                     'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                     't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

                    
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
    captcha.innerText=''
    getCaptcha();
})
getCaptcha();

checkBtn.addEventListener('click', e=>{
    // 阻止預設行為
    e.preventDefault()
    statusTxt.style.display="block"
    // 將input 的直拆開在用空格串接，串接後會是字串
    let inputVal=input.value.split('').join(' ')
    console.log(inputVal)
    console.log(captcha.innerText)

    if(inputVal==captcha.innerText){
        console.log('ok')
        statusTxt.innerText='驗證成功！人類認證！'
        statusTxt.style.color="blue"
    }else{
        console.log('false')
        statusTxt.innerText='驗證碼錯誤，請再試一次'
        statusTxt.style.color="red"

    }
})