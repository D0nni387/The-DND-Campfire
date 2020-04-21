const classId = document.getElementById("progress");
const progress = document.getElementById("progressTwo")
const classChoice = document.getElementById("classList")


let baseURL = "http://dnd5eapi.co/api/"
let i = 1

/**
 * Fetches classes and populates select data
 */
function classFetch() {

  fetch(`${baseURL}/classes`)
    .then(response => response.json())
    .then(classes => {
      let classList = classes.results;
      delete classList[5]
      classList.forEach(classOp => {
        
        let classOption = document.createElement("option");
        let className = document.createElement("p");
        let name = document.createTextNode(classOp.name);
        

        className.appendChild(name);
        classOption.appendChild(className);
        classOption.id = classOp.index;
        classOption.classList.add("class");
        className.id = i
        className.classList.add("classId")
        document.getElementById("classList").appendChild(classOption);
        i++ 
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

/**
 * Fetches Proficiencies and populates select data
 */
function profFetch() {

  fetch(`${baseURL}classes/${id}`)
    .then(response => response.json())
    .then(profs => {
      let profList = profs.proficiency_choices[0].from
         profList.forEach(profOf => {
        let profOption = document.createElement("option");
        let profName = document.createElement("p");
        let name = document.createTextNode(profOf.name)


        profName.appendChild(name)
        profOption.appendChild(profName)
        profOption.id = profOf.index
        profOption.classList.add("skill")
        document.getElementById("proficiencies").appendChild(profOption)
      })
    })
}

/**
 * Fetches starting-equipment and creates div elements
 */
function equipFetch() {
  fetch(`${baseURL}starting-equipment/${idNum}`)
  .then(response => response.json())
  .then(staEqu => {
    console.log(staEqu)
    let startEquip = staEqu.starting_equipment
    startEquip.forEach(obj => {
        let equipCont = document.createElement("div")
        let equipText = document.createElement("p")
        let equipName = document.createTextNode(obj.name)

        equipText.appendChild(equipName)
        equipCont.appendChild(equipText)
        equipCont.classList.add("adapt")
        document.getElementById("startEquip")
        
    })
  })
}


progress.addEventListener('click', () => {
  idNum = classChoice.options[classChoice.selectedIndex].firstElementChild.id  
  console.log(idNum)
  equipFetch();
});