const wrapper = document.querySelector('.wrapper'),
// 輸入區
inputPart = wrapper.querySelector('.input-part'), 
// 提示語
infoTxt = inputPart.querySelector('.info-txt'),
// input 
inputField = inputPart.querySelector('input'),
locationBtn = inputPart.querySelector('button'),
// weather-part classname 下面的img標籤
wIcon = document.querySelector('.weather-part img'),
// 回上層icon
arrowBack = wrapper.querySelector("header i");

// 先宣告api為全域變數
let api

// 當input 有輸入值時
inputField.addEventListener('keyup', e=>{
    if(e.key == 'Enter' && inputField.value != ''){
        requestApi(inputField.value)
    }
})

// 按下地點按鈕，瀏覽器會詢問使用者是否允許存取目前位置
locationBtn.addEventListener("click", ()=>{
    infoTxt.innerText = 'Getting weather details...'
    infoTxt.classList.add('pending')
    inputField.value=''
    // 如果有支援，會觸發onSuccess function, 有錯誤的話會觸發onError
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
        console.log('enter geo')
    }else{
        alert("Your browser not support geolocation api")
    }
})

// 如果是經緯度判斷的話執行此func
function onSuccess(position) {
    const {latitude,longitude} = position.coords; //取經緯度
    api= `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4245d3b0add44a38ccad25fd4f9f9869`

    fetchData()
}
// 顯示錯誤訊息
function onError(error) {
    infoTxt.innerText = error.message
    infoTxt.classList.add('error')
}

// 如果是輸入城市名稱來判斷天氣的話執行此func
function requestApi(city) {
    infoTxt.innerText = 'Getting weather details...'
    infoTxt.classList.add('pending')
    // api link= https://home.openweathermap.org/api_keys
    // 取資料&units=metric 取攝氏溫度
    api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4245d3b0add44a38ccad25fd4f9f9869`

    fetchData()
}

// 取得資料之後呼叫api
function fetchData() {
    fetch(api)
    .then(response=> response.json())
    .then(result=> weatherDetails(result))// 把結果丟給weatherDetails()函式
}

function weatherDetails(info) {
    infoTxt.classList.replace('pending', 'error')
    if(info.cod =='404'){
        infoTxt.innerText = `"${inputField.value}" isn't a vaild city name`;
    }else{
        // 把資料放入變數
        const city = info.name
        const country = info.sys.country
        const {description,id} = info.weather[0]
        const {feels_like, humidity, temp} = info.main
        console.log(typeof id) //number

        // 根據回傳的id 顯示氣候圖片
        if(id == 800){
            wIcon.src = "/Weather Icons/clear.svg"
        }else if(id >=200 && id<=232){
            wIcon.src = "/Weather Icons/strom.svg"
        }else if(id >=600 && id<=622){
            wIcon.src = "/Weather Icons/snow.svg"
        }else if(id >=701 && id<=781){
            wIcon.src = "/Weather Icons/haze.svg"
        }else if(id >=801 && id<=804){
            wIcon.src = "/Weather Icons/cloud.svg"
        }else if((id >=300 && id<=321) || (id>=500 && id <= 531)){
            wIcon.src = "/Weather Icons/rain.svg"
        }

        // 設定變數到html
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp)
        wrapper.querySelector(".weather").innerText = description
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like)
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`

        infoTxt.classList.remove('pending', "error")
        wrapper.classList.add("active")
        console.log(info)
    }
}

arrowBack.addEventListener('click',()=>{
    wrapper.classList.remove("active");
})