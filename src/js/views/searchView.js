class searchView{
    _parentEl = document.querySelector('.search');

    getQuery(){
        const query = this._parentEl.querySelector('.search__field').value
        this._clearInput();
        return query;
    }
    _clearInput(){
        this._parentEl.querySelector('.search__field').value = ''
    }
    addHandlerSearch(handler){
        let keyPressed = false;
        this._parentEl.addEventListener('submit', function(e){

            e.preventDefault();
            console.log('submit')
            handler();

        })
        this._parentEl.addEventListener('keypress',function(e){
            keyPressed = true;
            // if(e.key === 'Enter') return
            console.log('keypress')
            setTimeout( ()=>{
                keyPressed && handler()   
                keyPressed = false;
            },2000)
        })
    }

}

export default new searchView();