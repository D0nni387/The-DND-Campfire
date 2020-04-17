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

function profFetch() {

  fetch(`${baseURL}${id}`)
    .then(response => response.json())
    .then(profs => {
      let profList = profs.proficiency_choices[0].from
         profList.forEach(profOf => {
        let profOption = document.createElement("div");
        let profName = document.createElement("p");
        let name = document.createTextNode(profOf.name)


        profName.appendChild(name)
        profOption.appendChild(profName)
        profOption.id = profOf.name
        profOption.classList.add("skill")
        document.getElementById("proficiencies").appendChild(profOption)
      })
    })
}

