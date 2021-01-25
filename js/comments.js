const commentsTemplate = document.querySelector('#comments')

let comments = []
let commentsOffset = 0
const commentsVisible = 4
let commentsPages


const renderComments = () => {
  const renderRoot = document.querySelector('.slider')

  const prevSlides = renderRoot.querySelector('.slides')
  if (prevSlides) prevSlides.remove()

  const commentsToRender = comments.slice(commentsOffset * commentsVisible, commentsOffset * commentsVisible + commentsVisible)
  const commentsMarkup = commentsTemplate.content.querySelector('.slides').cloneNode(true)

  if (commentsToRender.length < 4) {
    while (commentsToRender.length < 4) {
      commentsToRender.push(null)
    }
  }

  commentsToRender.forEach((comment, i) => {
    if (!comment) {
      commentsMarkup.querySelector(`:nth-child(${i + 1}) .review-inner`).classList.add('empty')
      return
    }

    const commentNode = commentsMarkup.querySelector(`:nth-child(${i + 1}) .review-inner`)

    const body = comment.body.replace(/\W/g, ' ')
    const username = comment.email.split('@')[0]

    commentNode.querySelector('.body').innerText = body
    commentNode.querySelector('.username').innerText = username
  })

  renderRoot.insertBefore(commentsMarkup, renderRoot.firstChild)
}


const btnPrevNode = document.querySelector('.arrow.prev')
const btnNextNode = document.querySelector('.arrow.next')

const btnArrowHandler = (e) => {
  const classes = e.target.classList
  if (classes.contains('prev') && commentsOffset > 0) commentsOffset--
  if (classes.contains('next') && (commentsOffset * commentsVisible + commentsVisible) < comments.length) commentsOffset++
  renderComments()
}

btnPrevNode.addEventListener('click', btnArrowHandler)
btnNextNode.addEventListener('click', btnArrowHandler)


fetch('http://jsonplaceholder.typicode.com/comments')
  .then((res) => res.json())
  .then((res) => {
    comments = res.slice(0, 25)
    commentsPages = Math.ceil(comments.length / commentsVisible)
  })
  .then(() => renderComments())
