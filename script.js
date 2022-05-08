// Obtenemos los elementos input y la lista de usuarios
const input = document.querySelector('#searchInput')
const usersList = document.querySelector('#users')

// variable donde se guardara la lista inicial
let users = []

// Al cargar la pagina
window.addEventListener('DOMContentLoaded', async () => {
  usersList.innerHTML = `<h1>Loading Data</h1>` // La lista mostrara el mensaje mientras no haya data
  const data = await loadUsers() // Guardamos en data la respuesta de la api en loadUsers
  users = data.data // Pasamos la data a la variable users
  renderUsers(users) // renderizamos la lista
})

// Funcion para obtener la data desde la api en formato JSON
async function loadUsers() {
  
  const response = await fetch('https://fakerapi.it/api/v1/users?_quantity=1000')
  return await response.json()
  
}

// Escuchamos el evento keyup en el input para ejecutar el filtro
input.addEventListener('keyup', e => {
  const newUsers = users.filter(user => `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(input.value.toLowerCase())); // Creamos una nueva lista filtrada con el valor del input
  renderUsers(newUsers); // renderizamos la nueva lista
})


// Creamos una funcion que recorra toda la data de la variable users y devuelva en string para renderizar
const createUserItems = users => users.map(user => `<li class="hover:bg-amber-100 hove:cursor-pointer">${user.firstname} ${user.lastname}</li>`).join(' ')

// renderiza la lista de usarios en el HTML
function renderUsers(users) {
  const itemsString = createUserItems(users)
  usersList.innerHTML = itemsString
}