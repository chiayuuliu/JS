const fileInput = document.querySelector(".file-input"),
    chooseImgBtn = document.querySelector(".choose-img")

const loadImage = (e) => {
    let file = fileInput.files[0]
    // let file = e.files[0]
    console.log(file)
}
fileInput.addEventListener("change", loadImage)

chooseImgBtn.addEventListener("click", () => { fileInput.click() })