const pokemonRepository=function(){function t(t){c.push(t)}function e(){return c}function n(t){c.filter(function(e){return e.name===t?e:void 0})}function o(t){const e=$('.list-group'),n=$('<li class="list-group-item"></li>');$(e).append(n);const o=$('<button class="btn" data-toggle="modal" data-target="#PokeModal"></button>');$(o).text(t.name),$(n).append(o),o.on('click',function(){i(t)})}function i(t){pokemonRepository.loadDetails(t).then(function(){p(t)})}function a(){return $.ajax(l,{dataType:'json'}).then(function(e){$.each(e.results,function(e,n){const o={name:n.name.charAt(0).toLowerCase()+n.name.slice(1),detailsUrl:n.url};t(o)})})['catch'](function(t){document.write(t)})}function s(t){const e=t.detailsUrl;return $.ajax(e).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.weight=e.weight,2===e.types.length?t.types=[e.types[0].type.name,e.types[1].type.name]:t.types=[e.types[0].type.name]})['catch'](function(t){document.write(t)})}function p(t){$('#modal-body').html(''),$('#pokeName').text(t.name),$('#pokeImg').attr('src',t.imageUrl),$('#pokeHeight').text('Height: '+t.height),$('#pokeWeight').text('Weight: '+t.weight),$('#pokeTypes').text('Types: '+t.types)}const c=[],l='https://pokeapi.co/api/v2/pokemon/?limit=150';return{add:t,getAll:e,addListItem:o,search:n,showDetails:i,loadList:a,loadDetails:s,showModal:p}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});
