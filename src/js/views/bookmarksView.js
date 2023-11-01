import { View } from "./View.js";
import icons from 'url:../../img/icons.svg';
import previewView from "./previewView.js";

class BookmarksView extends View{
    _parentEl = document.querySelector('.bookmarks__list');
    _errorMsg = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
    _message = '';
    
    addHandlerRender(handler){
        window.addEventListener('load',handler)
    }

    _generateMarkup(){
        console.log(this._data)
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
    }
    // _generateMarkupPreview(results) {
    //     const id = window.location.hash.slice(1)
    //     return `<li class="preview">
    //                 <a class="preview__link ${id === results.id?'preview__link--active':''}" href="#${results.id}">
    //                 <figure class="preview__fig">
    //                     <img src="${results.image}" alt="${results.title}" />
    //                 </figure>
    //                 <div class="preview__data">
    //                     <h4 class="preview__title">${results.title}</h4>
    //                     <p class="preview__publisher">${results.publisher}</p>
    //                 </div>
    //                 </a>
    //             </li>`

    // }
                
}
export default new BookmarksView();