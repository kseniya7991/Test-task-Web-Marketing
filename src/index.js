import './styles/main.scss'
import data from'../dataset.json'
import { Navigation } from './components/navigation.js';
import Section from './components/section.js';


const navListSection = '.navigation__list';
const crumbsListSection = '.breadcrumb__list';

function updateMeta() {
document.title = data.page_meta.title;
document.querySelector('meta[name="description"]').setAttribute("content", data.page_meta.meta_description);
document.querySelector('meta[name="keywords"]').setAttribute("content", data.page_meta.meta_keywords);
}
updateMeta();


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

navList.renderer(data.nav)
crumbsList.renderer(data.breadcrumbs)





