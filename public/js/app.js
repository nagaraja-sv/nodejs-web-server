console.log('Client Side JavaScript File is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const meassageOne = document.querySelector('#m1')
const meassageTwo = document.querySelector('#m2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    meassageOne.textContent = 'Loading...'
    meassageTwo.textContent = ''
    console.log(meassageOne.textContent)
    console.log(meassageTwo.textContent)

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                meassageOne.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                console.log(data.raining)


                meassageOne.textContent = data.location
                meassageTwo.textContent = data.forecast + ' ' + data.raining

            }
        })

    })
})
