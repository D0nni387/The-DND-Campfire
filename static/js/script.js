const classId = document.getElementById("progress");
const progress = document.getElementById("progressTwo")
const classChoice = document.getElementById("classList")
const load = document.getElementById("loading");
const phaseOne = document.getElementById("phaseOne")
const phaseTwo = document.getElementById("phaseTwo")
const phaseThree = document.getElementById("phaseThree")
const classesList = document.getElementById("classList")
const proficienciesOne = document.getElementById("proficienciesOne")
const proficienciesTwo = document.getElementById("proficienciesTwo")
const baseURL = "https://cors-anywhere.herokuapp.com/https://dnd5eapi.co/api/"
const startEquip1 = document.getElementById("startEquip1")
const startEquip2 = document.getElementById("startEquip2")

/**
 * Fetches classes and populates select data
 */
(function classFetch() {
  loader(true)
  fetch(`${baseURL}classes`)
    .then(response => response.json())
    .then(classes => {
      let i = 1
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
        classesList.appendChild(classOption);
        i++
      });

    })
    .catch(() => console.error());
  loader(false)
  phaseOne.classList.remove("hide")
})();





classId.addEventListener('click', () => {
  id = classChoice.options[classChoice.selectedIndex].id;
  phaseOne.classList.add("hide")
  profFetch();
});

/**
 * Fetches Proficiencies and populates select data
 */
function profFetch() {
  loader(true)
  fetch(`${baseURL}classes/${id}`)
    .then(response => response.json())
    .then(profs => {

      let hit = profs.hit_die
      document.getElementById("hitDie").value = (`${hit}`)

      let saveOne = profs.saving_throws[0].name
      document.getElementById("savingThrow1").value = (`${saveOne}`)

      let saveTwo = profs.saving_throws[1].name
      document.getElementById("savingThrow2").value = (`${saveTwo}`)

      let profList = profs.proficiency_choices[0].from
      profList.forEach(profOf => {
        let profOption = document.createElement("option");
        let profName = document.createElement("p");
        let name = document.createTextNode(profOf.name)


        profName.appendChild(name)
        profOption.appendChild(profName)
        profOption.id = profOf.index
        profOption.classList.add("skill")
        proficienciesOne.appendChild(profOption)

      })
      profList.forEach(profOf => {
        let profOption = document.createElement("option");
        let profName = document.createElement("p");
        let name = document.createTextNode(profOf.name)


        profName.appendChild(name)
        profOption.appendChild(profName)
        profOption.id = profOf.index
        profOption.classList.add("skill")
        proficienciesTwo.appendChild(profOption)

      })
    })

  phaseTwo.classList.remove("hide")
  loader(false)
}

progress.addEventListener('click', () => {
  idNum = classChoice.options[classChoice.selectedIndex].firstElementChild.id
  phaseTwo.classList.add("hide")
  equipFetch();
});

/**
 * Fetches starting-equipment and creates div elements
 */
function equipFetch() {
  loader(true)
  fetch(`${baseURL}starting-equipment/${idNum}`)
    .then(response => response.json())
    .then(equip => {

      let startEquipOne = equip.starting_equipment[0].item.name
      startEquip1.value = (`${startEquipOne}`)

      let startEquipTwo = equip.starting_equipment[1].item.name

      if (startEquipTwo == "") {
        startEquip2.value = (`Null`)
      } else {
        startEquip2.value = (`${startEquipTwo}`)
      }

      let equipChoice = equip.choice_1[1].from
      console.log(equipChoice)
      equipChoice.forEach(profOf => {
        let profOption = document.createElement("option");
        let profName = document.createElement("p");
        let name = document.createTextNode(profOf.item.name)


        profName.appendChild(name)
        profOption.appendChild(profName)
        profOption.id = profOf.index
        profOption.classList.add("skill")
        document.getElementById("equip").appendChild(profOption)

      })
    })


  loader(false)
  phaseThree.classList.remove("hide")
}




function loader(loading) {
  if (loading) {
    load.classList.remove("hide");
  } else {
    load.classList.add("hide");
  }
}