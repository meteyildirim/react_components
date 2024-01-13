const btnEle = document.getElementById("updatebtn");
const inpEle = document.getElementById("inputEle");

btnEle.disabled = true;
inpEle.addEventListener("input", (e) => {
  if (e.target.value.length > 3) {
    btnEle.disabled = false;
  } else {
    btnEle.disabled = true;
  }
});
