import './styles/main.scss'
import data from'../dataset.json'

console.log(data.page_meta);
{/* <meta name="keywords" content="ключевые слова" /> */}
function updateMeta() {
document.title = data.page_meta.title;

console.log(document.querySelector('meta[name="description"]'));
document.querySelector('meta[name="description"]').setAttribute("content", data.page_meta.meta_description);
document.querySelector('meta[name="keywords"]').setAttribute("content", data.page_meta.meta_keywords);
}
updateMeta();
