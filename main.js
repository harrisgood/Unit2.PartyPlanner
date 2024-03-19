// store api url in an easily accessible constant
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/$2402-FTB-ET-WEB-FT/events`

// store all of our site data in state, in this case just any events going on
const state = {
events: []
}

async function getEvents () {
try{
// if theres no errors, run this code block

// fetch data from api (check it with a console log)
const apiParties = await fetch(API_URL) 
console.log(apiParties)

// parse data into useable format
const jsonParties = await apiParties.json()
console.log(jsonParties.data)

} catch (error){
  // if we had an error, log it
  console.log(error)
}

}

getEvents()