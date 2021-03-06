import './styles/main.scss'
import data from'../dataset.json'
import { Navigation } from './components/navigation.js';
import { Card } from './components/card.js';
import Section from './components/section.js';


const navListSection = '.navigation__list';
const crumbsListSection = '.breadcrumb__list';
const cardsSection = '.cards__list';
const filterName = document.querySelectorAll('.sidebar__filter-name');
const sort = document.querySelectorAll('.cards__sort-list');
const filterHeading = document.querySelector('.sidebar__heading');

function updateMeta() {
document.title = data.page_meta.title;
document.querySelector('meta[name="description"]').setAttribute("content", data.page_meta.meta_description);
document.querySelector('meta[name="keywords"]').setAttribute("content", data.page_meta.meta_keywords);
document.querySelector('.main-block__heading').textContent = data.page_meta.h1;
}
updateMeta();


//Создание экземпляра навигации, отрисовка, добавление в дерево
export const addNavigationItem = (item, templateSelector, itemSelector, linkSelector, listName) => {
    const navItem = new Navigation(
        item,
        templateSelector,
        itemSelector,
        linkSelector
    );
    const navElement = navItem.generateNavItem();
    listName.addItem(navElement)
}

//Создание экземпляра карточки, отрисовка, добавление в дерево
export const addCardItem = (item, templateSelector) => {
    const cardItem = new Card(
        item, templateSelector
    );
    const cardElement = cardItem.generateCard();
    cardList.addItem(cardElement);
}


//Отрисовка навигации
const navList = new Section(
    {renderer: (item) => {
        addNavigationItem(
            item, 
            '.template__navigation', 
            '.navigation__item', 
            '.navigation__link',
            navList
        );
      },
    },
    navListSection,
);

//Отрисовка крошек
const crumbsList = new Section(
    {renderer: (item) => {
        addNavigationItem(
            item, 
            '.template__breadcrumb',
            '.breadcrumb__item',
            '.breadcrumb__link',
            crumbsList
        );
      },
    },
    crumbsListSection,
)

//Отрисовка карточек
const cardList = new Section(
    {renderer: (item) => {
        addCardItem(
            item,
            '.template__card'
        );
      },
    },
    cardsSection,
)

// Открытие/сворачивание параметров фильтра в сайдбаре
function handleFilterParams(item) {
    const paramsList = document.querySelector(`.sidebar__params_${item.id}`);
    paramsList.classList.toggle('sidebar__params_active');
    item.classList.toggle('sidebar__filter-name_active');
    return;
} 


// Анимация блока сортировки при нажатии
function sortSelect(item) {
    const parentSort = item.closest('.cards__sort')
    parentSort.classList.toggle('cards__sort_active');
    return;
}

// Раскрытие/сворачивание фильтра в мобильной версии
function handleFilter(e) {
    const filterList = document.querySelector('.sidebar__filter-wrap');
    filterList.classList.toggle('sidebar__filter-wrap_active');
    return;
}


filterName.forEach((item) => {
    item.addEventListener('click', () => {
        handleFilterParams(item)
    })
})

sort.forEach((item) => {
    item.addEventListener('click', () => {
        sortSelect(item);
    })
})

filterHeading.addEventListener('click', (e) => {
    handleFilter(e)
})


navList.renderer(data.nav)
crumbsList.renderer(data.breadcrumbs)
cardList.renderer(data.stock)





