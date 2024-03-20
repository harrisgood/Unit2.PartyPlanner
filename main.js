/*
  Todos:
    -create a function to add events to the API
      -maybe give user the ability to use this function
    -add a button to delete events from api
*/

// store api url in an easily accessible constant
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-FTB-ET-WEB-FT/events`;

// store all of our site data in state, in this case just any events going on
const state = {
events: []
};

// set constant for all of our HTML list section so we can easily add events to it
const partyListSection = document.querySelector(`#partyList`);

// special function to ensure that our page runs in the right order without getting ahead of itself
async function renderPage() {
  await getEvents(); // dont do anything until this line finishes
  renderState();
}
renderPage();
async function getEvents() {
  // if theres no errors, run this code block
  try{  

  // fetch data from api
  const apiParties = await fetch(API_URL);

  // parse data into more useable format
  const jsonParties = await apiParties.json();
    
  // update state with parsed data
  state.events = jsonParties.data;

  } catch (error){
    // if we had an error, log it
    console.log(error);
  }
}

// updates the viewer's page to display data from our site's state
function renderState() {
  // loop through all events in state
  state.events.forEach( newParty => {
    // create blank new paragraphs for each `property` of an event we want to display
    const newName = document.createElement(`p`);
    const newDescription = document.createElement(`p`);
    const newDate = document.createElement(`p`);
    const newTime = document.createElement(`p`);
    const newLocation = document.createElement(`p`);

    // split the date and time into a more easily displayable format
    // get date from api (example return: "2023-07-23T20:18:02.000Z")
    const dateAndTime = newParty.date;
    
    // find index of convienient T between date and time in current data
    const indexOfT = dateAndTime.indexOf(`T`);

    // grab everything before the T
    const newPartyDate = dateAndTime.slice(0, indexOfT);
    // grab the 5 characters after the T
    const newPartyTime = dateAndTime.slice(indexOfT+1, indexOfT+6);

    // change innerHTML of new paragraphs to respective property
    newName.innerHTML = `${newParty.name}`;
    newDescription.innerHTML = `${newParty.description}`;
    newDate.innerHTML = `${newPartyDate}`;
    newTime.innerHTML = `${newPartyTime}`;
    newLocation.innerHTML = `${newParty.location}`;
    
    // create new blank div to construct an 'event div' holding all necessary data
    const newPartyDiv = document.createElement(`div`);

    // add paragrphs with data to our empty event div
    newPartyDiv.appendChild(newName);
    newPartyDiv.appendChild(newDescription);
    newPartyDiv.appendChild(newDate);
    newPartyDiv.appendChild(newTime);
    newPartyDiv.appendChild(newLocation);

    // add our loaded up newParty div to partyList section on index.html
    partyListSection.appendChild(newPartyDiv);
  })  
}