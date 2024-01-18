import "../../node_modules/google-translate-api/index.js";

translate("I spea Dutch!", { from: "en", to: "nl" }).then((res) => {
  console.log(res.text);
  //=> Ik spreek Nederlands!
  console.log(res.from.text.autoCorrected);
  //=> true
  console.log(res.from.text.value);
  //=> I [speak] Dutch!
  console.log(res.from.text.didYouMean);
});
