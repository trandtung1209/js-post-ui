import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { setTextContent, truncateText } from './common'

//to use fromNow function
dayjs.extend(relativeTime)

export function createPostElement(post) {
  if (!post) return
  // find template, clone, custom title,des,...
  const postTemplate = document.getElementById('postTemplate')
  if (!postTemplate) return
  const liElement = postTemplate.content.firstElementChild.cloneNode(true)
  if (!liElement) return

  setTextContent(liElement, '[data-id="title"]', post.title)
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100))
  setTextContent(liElement, '[data-id="author"]', post.author)
  setTextContent(liElement, '[data-id="timeSpan"]', ` - ${dayjs(post.updatedAt).fromNow()}`)
  //calculate timeSpan

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]')
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl
    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=thumbnail'
    })
  }

  //attack event
  // go to post detail page when click on div.post-item
  const divElement = liElement.firstElementChild
  if (divElement) {
    divElement.addEventListener('click', () => {
      window.location.assign(`/post-detail.html?id=${post.id}`)
    })
  }

  return liElement
}

export function renderPostList(postList) {
  if (!Array.isArray(postList)) return
  const ulElement = document.getElementById('postList')
  if (!ulElement) return
  // clear current list
  ulElement.textContent = ''

  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulElement.appendChild(liElement)
  })
}
