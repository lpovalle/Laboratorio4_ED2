// main.js
var update = document.getElementById('update')
var borrar = document.getElementById('delete')




update.addEventListener('click', function () {

    fetch('pizzas', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({

          'Nombre': document.getElementById("_nombre").value,
          'Descripcion': document.getElementById("_desc").value,
          'Ingredientes': document.getElementById("_ingr").value,
          'Tamaño': document.getElementById("_tamano").value,
          'Porciones': document.getElementById("_porciones").value,
          'Extra': document.getElementById("_extra").value,

        })
      }).then(response => {
        if (response.ok) return response.json()
      }).then(data => {
        console.log(data)
      })

})

borrar.addEventListener('click', function () {
    fetch('pizzas', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'Nombre': document.getElementById("d").value
      })
    })
    .then(res => {
      if (res.ok) return res.json()
    }).
    then(data => {
      console.log(data)
      window.location.reload()
    })
  })
