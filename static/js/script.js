const baseURL = "https://cors-anywhere.herokuapp.com/https://dnd5eapi.co/api/";
const proficienciesOne = document.getElementById("proficienciesOne");
const proficienciesTwo = document.getElementById("proficienciesTwo");
const equipmentChoice = document.getElementById("equipmentChoice");
const savingThrow1 = document.getElementById("savingThrow1");
const savingThrow2 = document.getElementById("savingThrow2");
const startEquip1 = document.getElementById("startEquip1");
const startEquip2 = document.getElementById("startEquip2");
const confirmEdit = document.getElementById("confirmEdit");
const editButton = document.getElementById("editButton");
const confirmAdd = document.getElementById("confirmAdd");
const phaseThree = document.getElementById("phaseThree");
const classesList = document.getElementById("classList");
const classChoice = document.getElementById("classList");
const editChoice = document.getElementById("editChoice");
const progress = document.getElementById("progressTwo");
const phaseOne = document.getElementById("phaseOne");
const phaseTwo = document.getElementById("phaseTwo");
const editForm = document.getElementById("editForm");
const classId = document.getElementById("progress");
const initial = document.getElementById("phase");
const hitDie = document.getElementById("hitDie");
const load = document.getElementById("loading");
const begin = document.getElementById("start");
const name = document.getElementById("name")

/* Global Variables */
let edit = false

/**
 * Takes the API data profList and produces select elements to DOM, 
 * Target provides DOM target, classes is true if class list is being produced. 
 * naming is true if returned data is deeper than one level
 * 
 * @param {[]} profList 
 * @param {variable} target 
 * @param {boolean} classes 
 * @param {boolean} naming 
 */
const selectList = (profList, target, classes, naming) => {
  if (naming) {
    profList.forEach(item => {
      let profOption = document.createElement("option");
      let profName = document.createElement("p");
      let name = document.createTextNode(item.name)

      profName.appendChild(name)
      profOption.appendChild(profName)
      profOption.id = item.index
      profOption.classList.add("skill")
      target.appendChild(profOption)
    })
  } else if (classes) {
    profList.forEach(classOp => {

      let i = 1
      let classOption = document.createElement("option");
      let className = document.createElement("p");
      let name = document.createTextNode(classOp.name);

      className.appendChild(name);
      classOption.appendChild(className);
      classOption.id = classOp.index;
      classOption.classList.add("class");
      className.id = i
      className.classList.add("classId")
      target.appendChild(classOption);
      i++
    });
  } else {
    profList.forEach(item => {
      let profOption = document.createElement("option");
      let profName = document.createElement("p");
      let name = document.createTextNode(item.item.name)

      profName.appendChild(name)
      profOption.appendChild(profName)
      profOption.id = item.index
      profOption.classList.add("skill")
      target.appendChild(profOption)
    })
  }
}

/**
 * Fetches classes and populates select data
 */
const classFetch = () => {
  loadingWheel(true)
  fetch(`${baseURL}classes`)
    .then(response => response.json())
    .then(classes => {

      let classList = classes.results;
      delete classList[5]
      selectList(classList, classesList, true, false)
    })
    .catch(() => console.error());

  loadingWheel(false, phaseOne)
}


classId.addEventListener('click', () => {
  id = classChoice.options[classChoice.selectedIndex].id;
  phaseOne.classList.add("hide")
  profFetch();

});

/**
 * Fetches Proficiencies and populates select data
 */
const profFetch = () => {
  loadingWheel(true)
  fetch(`${baseURL}classes/${id}`)
    .then(response => response.json())
    .then(profs => {

      let hit = profs.hit_die
      hitDie.value = (`${hit}`)

      let saveOne = profs.saving_throws[0].name
      savingThrow1.value = (`${saveOne}`)

      let saveTwo = profs.saving_throws[1].name
      savingThrow2.value = (`${saveTwo}`)

      let profList = profs.proficiency_choices[0].from
      selectList(profList, proficienciesOne, false, true)
      selectList(profList, proficienciesTwo, false, true)
    })

  loadingWheel(false, phaseTwo)
}



/**
 * Fetches starting-equipment and creates div elements
 */
const equipFetch = () => {
  loadingWheel(true)
  fetch(`${baseURL}starting-equipment/${idNum}`)
    .then(response => response.json())
    .then(equip => {

      let startEquipOne = equip.starting_equipment[0].item.name
      startEquip1.value = (`${startEquipOne}`)

      if (equip.starting_equipment[1]) {
        let startEquipTwo = equip.starting_equipment[1].item.name
        startEquip2.value = (`${startEquipTwo}`)
      } else {
        startEquip2.value = (`No Secondary Equipment`)
      }
      let profList = equip.choice_1[1].from
      selectList(profList, equipmentChoice, false)
    })
  loadingWheel(false, phaseThree)
  if (edit == true) {
    confirmEdit.classList.remove("hide")
  } else {
    confirmAdd.classList.remove("hide")
  }
}

/**
 * if loading is true loading spinner shown, 
 * container defines what is to be shown when loaded
 * 
 * @param {boolean} loading 
 * @param {variable} container 
 */
const loadingWheel = (loading, container) => {
  if (loading != false) {
    load.classList.remove("hide")
  } else {
    setTimeout(function () {
      container.classList.remove("hide")
      load.classList.add("hide");
    }, 3000);
  }
}

/* On click Events */

progress.addEventListener('click', () => {
  idNum = classChoice.options[classChoice.selectedIndex].firstElementChild.id
  phaseTwo.classList.add("hide")
  equipFetch();
});

begin.addEventListener('click', () => {
  if (name.value != "") {
    initial.classList.add("hide")
    classFetch();

  } else {
    Swal.fire({
      icon: 'error',
      text: 'Please enter a character name!',
    })
  }
})

editButton.addEventListener('click', () => {
  editChoice.classList.add("hide")
  editForm.classList.remove("hide")
  edit = true
})