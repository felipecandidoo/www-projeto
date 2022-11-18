const url = 'http://localhost:3000/games/'

function getData(){
  axios.get(url + '1')
    .then(function(res){
      console.log(res.data)
      data = res.data

      obj.textContent = data.name + ' R$ ' +  data.price
      
    })
    .catch(error => console.log(error))
  }

  getData()