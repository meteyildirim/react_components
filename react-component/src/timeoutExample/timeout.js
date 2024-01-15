import { countries } from "./countries.js";
let timeout = null;

const inputEle = document.getElementById("input");
const listEle = document.getElementById("list");
const filterData = (val) => {
  if (!val) return [];
  return countries.filter((country) =>
    country.name.toLowerCase().includes(val.toLowerCase())
  );
};

inputEle.addEventListener("input", (e) => {
  if (timeout) clearTimeout(timeout);
  listEle.textContent = "";
  timeout = setTimeout(() => {
    const filteredData = filterData(e.target.value);

    for (let item of Object.values(filteredData)) {
      const li = document.createElement("li");
      li.textContent = item.name;
      listEle.appendChild(li);
    }
  }, 1000);
});
