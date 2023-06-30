document.getElementById("button-addon1").addEventListener(
  "click",
  () => {
    console.log("pressed button");
    elements = document.getElementsByClassName("search_result");
    elements_2 = document.getElementsByClassName("search_result_2");

    Array.from(elements).forEach((element) => {
      if (element.hidden == true) {
        element.hidden = false;
      } else {
        element.hidden = true;
      }
    });

    Array.from(elements_2).forEach((element) => {
      if (elements[0].hidden == false) {
        element.hidden = true;
      } else {
        element.hidden = false;
      }
    });
  },
  false
);
