const fileInput = document.querySelector(".file-input"),
    filterOptions = document.querySelectorAll(".filter button"),
    filterName = document.querySelector(".filter-info .name"),
    filterValue = document.querySelector(".filter-info .value"),
    filterSlider = document.querySelector(".slider input"),
    rotateOptions = document.querySelectorAll(".rotate button"),
    previewImg = document.querySelector(".preview-img img"),
    resetFilterBtn = document.querySelector(".reset-filter"),
    chooseImgBtn = document.querySelector(".choose-img"),
    saveImgBtn = document.querySelector(".save-img");

let brightness = 100,
    saturation = 100,
    inversion = 0,
    grayscale = 0;

let rotate = 0, flipHorizontal = 1, filpVertical = 1


const loadImage = () => {
    let file = fileInput.files[0]
    // 如果沒有檔案直接結束
    if (!file) return
    previewImg.src = URL.createObjectURL(file)
    // 如果載入新照片，自動reset filter
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click()
        document.querySelector(".container").classList.remove("disable");
    })
}
const applyFilters = () => {
    // 旋轉效果
    previewImg.style.transform =
        `rotate(${rotate}deg) scale( ${filpVertical},${flipHorizontal})`
    // filter 效果
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}


// 每個濾鏡按鈕套用click 功能
filterOptions.forEach(option => {
    // 每個option button 有點擊的時候，變化%
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active")
        option.classList.add("active")
        filterName.innerText = option.innerText

        if (option.id === "brightness") {
            filterSlider.max = "200"
            filterSlider.value = brightness
            filterValue.innerText = `${brightness}%`
        } else if (option.id === "saturation") {
            filterSlider.max = "200"
            filterSlider.value = saturation
            filterValue.innerText = `${saturation}%`
        } else if (option.id === "inversion") {
            filterSlider.max = "100"
            filterSlider.value = inversion
            filterValue.innerText = `${inversion}%`
        } else {
            filterSlider.max = "100"
            filterSlider.value = grayscale
            filterValue.innerText = `${grayscale}%`
        }
    })
});

// 更新濾鏡效果
const updateFilter = () => {
    // console.log(filterSlider.value)
    filterValue.innerText = `${filterSlider.value}%`
    const selectedFilter = document.querySelector(".filter .active")

    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value
    } else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value
    } else if (selectedFilter.id === "inversion") {
        inversion = filterSlider.value
    } else {
        grayscale = filterSlider.value
    }
    applyFilters()
}

// 選轉按鈕
rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90
        } else if (option.id === "right") {
            rotate += 90
        } else if (option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1
        } else {
            filpVertical = filpVertical === 1 ? -1 : 1
        }
        applyFilters()
    })
})

// 重設按鈕
const resetFilter = () => {
    brightness = 100;
    saturation = 100;
    inversion = 0;
    grayscale = 0;
    rotate = 0;
    flipHorizontal = 1;
    filpVertical = 1;
    filterOptions[0].click()
    // 讓filter 按鈕click 就可以套用所有的更新值到style 
    applyFilters()
}

const saveImage = () => {
    const canvas = document.createElement("canvas") // 建立canvas
    const ctx = canvas.getContext("2d")
    // 圖片原始長寬
    canvas.width = previewImg.naturalWidth
    canvas.height = previewImg.naturalHeight

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`

    // 移動至中心點？
    ctx.translate(canvas.width / 2, canvas.height / 2)
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180)
    }
    ctx.scale(flipHorizontal, filpVertical)
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)

    const link = document.createElement("a") // 建立a 元素
    link.download = "image.jpg" // 下載成jpg檔
    link.href = canvas.toDataURL() // 會是base64 格式
    link.click() // 自動點擊下載btn
}

fileInput.addEventListener("change", loadImage)
// 偵測input 改變，放input 滑動就會觸發>讓頁面上的%連動value
filterSlider.addEventListener("input", updateFilter)
resetFilterBtn.addEventListener('click', resetFilter)
saveImgBtn.addEventListener("click", saveImage)
chooseImgBtn.addEventListener("click", () => { fileInput.click() })