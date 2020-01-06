//................Exercises 1.10..........

// Wraps repository within IIFE
const pokemonRepository = (function () {
 const repository = [];
 // Creates constiable for index 'ul' with pokemonList class
 const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
 /* global $*/

// Adds new Pokemon to const repository
 function add(pokemon) {
   repository.push(pokemon);
 }

// Function used to return Pokemon object array
 function getAll() {
   return repository;
 }

  // Function to search repository for Pokemon
   function search(searchName) {
     repository.filter(function(pokemon) {
       if (pokemon.name === searchName) {
         return pokemon;
       }
    });
   }

// Function to add a list for each Pokemon object
  function addListItem(pokemon) {
    const pokemonList = $('.list-group');// create ul element for each Pokémon
    const listItem = $('<li class="list-group-item"></li>');// create li element that contains a button for each Pokémon
    $(pokemonList).append(listItem);// Adds the 'li' to 'ul' with pokemonList class in index file //append the list item to the unordered list as its child
    const btn = $('<button class="btn" data-toggle="modal" data-target="#PokeModal"></button>');//	Set the innerText of the button to be the Pokémon's name// Adds a CSS class to button using classList.add method
    $(btn).text(pokemon.name);//	Set the innerText of the button to be the Pokémon's name
    $(listItem).append(btn);// Adds the button element to the 'li'// append the button to the list item as its child.
    btn.on('click', function() {  /*JQuery Click Button Event Listener Used To Display showDetails Function Properties */
      showDetails(pokemon);// Calls showDetails function when button is clicked
    });
  }

// Function to show details of each Pokemon
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item);
    });
  }

  // Function to load Pokemon list from API
   function loadList() {
     // Replace fetch with Ajax
     return $.ajax(apiUrl, { dataType: 'json' })
     .then(function(item) {
       $.each(item.results, function(index, item) {
         const pokemon = {
           name: item.name.charAt(0).toLowerCase() + item.name.slice(1),
           detailsUrl: item.url
         };
         add(pokemon);
       });
      })
      .catch(function(error) {
        /*Load Functions Set In Order To Retrieve Data From Pokemon API*/
        document.write(error);
      });
  }

  // Load details of each Pokemon when clicked
  function loadDetails(item) {
    const url = item.detailsUrl;
    return $.ajax(url)
      .then(function(details) {
        /* Replaced Fectch With Ajax*/
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        // item.types = Object.keys(details.types);
     if (details.types.length === 2 ) {
			item.types = [details.types[0].type.name, details.types[1].type.name];
		} else {
			item.types = [details.types[0].type.name];
		}
      })
      .catch(function(error) {
        document.write(error);
      });
  }

   // Function to show modal for Pokemon data
   /*Model Definition With Jquery Start*/
  function showModal(item) {
    // Removes the html from the modal so it is clear when it is reopened
    $('#modal-body').html('');
    $('#pokeName').text(item.name);
    $('#pokeImg').attr('src', item.imageUrl);
    $('#pokeHeight').text('Height: ' + item.height);
    $('#pokeWeight').text('Weight: ' + item.weight);
    $('#pokeTypes').text('Types: ' + item.types);

  } /*Model Definition With Jquery End*/

  // return all data
  return {
   add: add,
   getAll: getAll,
   addListItem: addListItem,
   search: search,
   showDetails: showDetails,
   loadList: loadList,
   loadDetails: loadDetails,
   showModal: showModal,
 };
})();

// forEach Used To cycle through addListItem function properties
pokemonRepository.loadList().then(function() {
  // Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokeList) {
    pokemonRepository.addListItem(pokeList);
  });
});
