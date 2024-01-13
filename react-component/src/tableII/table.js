import { students } from "./data.js";

var btnName = true;
const handleMarkLowScore = () => {
  const trEls = document.querySelectorAll("#tableBody tr");

  const scoreBtnEle = document.getElementById("marklowscore");

  if (btnName) {
    scoreBtnEle.textContent = "Hide Low Scores";
    btnName = false;
    trEls.forEach((tr) => {
      const score = tr.querySelector("td:last-child").innerText;
      if (score < 50) {
        tr.classList.add("table-danger");
      }
    });
  } else {
    scoreBtnEle.textContent = "Mark High Scores";
    btnName = true;
    trEls.forEach((tr) => {
      const score = tr.querySelector("td:last-child").innerText;
      if (score < 50) {
        tr.classList.remove("table-danger");
      }
    });
  }
};

const loadData = () => {
  let html = "";
  students.forEach((student, index) => {
    html += `
    <tr>
        <td>${index}</td>
        <td>${student.name}</td>
        <td>${student.score}</td>
    </tr>
    `;
  });

  document.querySelector(".table tbody").innerHTML = html;
  document
    .getElementById("marklowscore")
    .addEventListener("click", handleMarkLowScore);
};

loadData();
