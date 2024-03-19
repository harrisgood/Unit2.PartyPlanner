// store api url in an easily accessible constant
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/$2402-FTB-ET-WEB-FT/events`

// store all of our site data in state, in this case just any events going on
const state = {
events: []
}

// set constants for all of our HTML lists so we can easily add to them
const namesListUL = document.querySelector(`#partyNames`)
const descriptionsListUL = document.querySelector(`#partyDescriptions`)
const datesListUL = document.querySelector(`#partyDates`)
const timesListUL = document.querySelector(`#partyTimes`)
const locationsListUL = document.querySelector(`#partyLocations`)

// special function to ensure that our page runs in the right order without getting ahead of itself
async function renderPage() {
  await getEvents() // dont do anything until this line finishes
  renderState()
}
renderPage()
async function getEvents() {
  try{
  // if theres no errors, run this code block

  // fetch data from api (check it with a console log)
  const apiParties = await fetch(API_URL) 

  // parse data into useable format
  const jsonParties = await apiParties.json()
    console.log(jsonParties)
  // update state with parsed data
  state.events = jsonParties.data

  } catch (error){
    // if we had an error, log it
    console.log(error)
  }
}

function renderState() {
  
  // loop through events
  state.events.forEach( newParty => {
      // create blank new li 
    const newName = document.createElement(`li`)
    const newDescription = document.createElement(`li`)
    const newDate = document.createElement(`li`)
    const newTime = document.createElement(`li`)
    const newLocation = document.createElement(`li`)

    // handle date and time split
    const dateAndTime = newParty.date
    const indexOfT = dateAndTime.indexOf(`T`)
    const newPartyDate = dateAndTime.slice(0, indexOfT)
    const newPartyTime = dateAndTime.slice(indexOfT+1, indexOfT+6)

    // change innerHTML of new 'li's
    newName.innerHTML = `${newParty.name}`
    newDescription.innerHTML = `${newParty.description}`
    newDate.innerHTML = `${newPartyDate}` // TODODOODODO
    newTime.innerHTML = `${newPartyTime}`
    newLocation.innerHTML = `${newParty.location}`
    
    // add to ul `partyList`
    namesListUL.appendChild(newName)
    descriptionsListUL.appendChild(newDescription)
    datesListUL.appendChild(newDate)
    timesListUL.appendChild(newTime)
    locationsListUL.appendChild(newLocation)
  })  
}