function setAppHeight() {
	document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
}

window.addEventListener('resize', setAppHeight)
window.addEventListener('load', setAppHeight)
setAppHeight() // вызываем сразу

document.querySelectorAll('.header__phone-trigger').forEach(button => {
	button.addEventListener('click', () => {
		const container = button.closest('.header__phone')

		// 1. Включение/выключение отображения номера (как и было)
		container.classList.toggle('is-open')

		// 2. ***НОВАЯ ЛОГИКА:*** Переключать (удалять/добавлять) класс остановки анимации
		// При первом клике класс добавится, анимация остановится.
		// При повторном клике класс удалится, анимация может возобновиться при :hover.
		button.classList.toggle('animation-paused')
	})
})

const burger = document.querySelector('.header__burger')
const menu = document.querySelector('.header__menu')

burger.addEventListener('click', () => {
	burger.classList.toggle('active')
	menu.classList.toggle('active')
})

document.addEventListener('DOMContentLoaded', function () {
	const modal = document.getElementById('galleryModal')
	const modalImage = document.getElementById('modalImage')
	const modalClose = document.getElementById('modalClose')
	const modalPrev = document.getElementById('modalPrev')
	const modalNext = document.getElementById('modalNext')

	// Собираем все изображения галереи
	const galleryImages = document.querySelectorAll('.gallery__img')

	let currentIndex = 0

	// Открытие модального окна
	galleryImages.forEach((img, index) => {
		img.addEventListener('click', () => {
			currentIndex = index
			modalImage.src = img.src
			modal.style.display = 'flex'
			document.body.style.overflow = 'hidden' // Блокируем прокрутку
		})
	})

	// Закрытие по кнопке
	modalClose.addEventListener('click', closeModal)

	// Закрытие по клику на оверлей
	modal.addEventListener('click', e => {
		if (e.target === modal) closeModal()
	})

	// Закрытие по Escape
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') closeModal()
		if (e.key === 'ArrowLeft') showPrevImage()
		if (e.key === 'ArrowRight') showNextImage()
	})

	// Навигация по изображениям
	modalPrev.addEventListener('click', showPrevImage)
	modalNext.addEventListener('click', showNextImage)

	function closeModal() {
		modal.style.display = 'none'
		document.body.style.overflow = '' // Возвращаем прокрутку
	}

	function showPrevImage() {
		currentIndex--
		if (currentIndex < 0) currentIndex = galleryImages.length - 1
		modalImage.src = galleryImages[currentIndex].src
	}

	function showNextImage() {
		currentIndex++
		if (currentIndex >= galleryImages.length) currentIndex = 0
		modalImage.src = galleryImages[currentIndex].src
	}
})
