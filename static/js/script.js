const classId = document.getElementById("progress");
const classChoice = document.getElementById("classList")


let baseURL = "http://dnd5eapi.co/api/classes/"



function classFetch() {

  fetch(baseURL)
    .then(response => response.json())
    .then(classes => {
      let classList = classes.results;
      classList.forEach(classOp => {

        let classOption = document.createElement("option");
        let className = document.createElement("p");
        let name = document.createTextNode(classOp.name);


        className.appendChild(name);
        classOption.appendChild(className);
        classOption.id = classOp.index;
        classOption.classList.add("class");
        document.getElementById("classList").appendChild(classOption);
      });

    })
    .catch(() => console.error());
}

classFetch();

classId.addEventListener('click', () => {
  id = classChoice.options[classChoice.selectedIndex].id;
  console.log(id)
  profFetch();
});

