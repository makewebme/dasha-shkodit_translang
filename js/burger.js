const nav = document.querySelector('.nav')
const ul = nav.querySelector('ul')

const clickHandler = (e) => {

  ul.classList.add('active')
}

nav.addEventListener('click', clickHandler)

const clickOutside = (e) => {

  if(!e.target.closest('.nav')) {
    ul.classList.remove('active');
  }
}

document.addEventListener('click', clickOutside)
