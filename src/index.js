import './styles/main.scss'
import data from'../dataset.json'
import { Navigation } from './components/navigation.js';
import { Card } from './components/card.js';
import Section from './components/section.js';


const navListSection = '.navigation__list';
const crumbsListSection = '.breadcrumb__list';
const cardsSection = '.cards__list';

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

navList.renderer(data.nav)
crumbsList.renderer(data.breadcrumbs)
cardList.renderer(data.stock)





