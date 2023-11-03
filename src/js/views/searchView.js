class searchView{
    _parentEl = document.querySelector('.search');

    getQuery(){
        const query = this._parentEl.querySelector('.search__field').value
        
        return query;
    }
    _clearInput(){
        this._parentEl.querySelector('.search__field').value = ''
    }
    addHandlerSearch(handler){
        const obj = this;
        let keyPressed = false;
        let timeoutId;
        this._parentEl.addEventListener('submit', function(e){
            e.preventDefault();
            // console.log('submit')
            clearTimeout(timeoutId);
            keyPressed = false;
            handler();
            obj._clearInput();

        })
        this._parentEl.addEventListener('keypress', function(e) {
            keyPressed = true;
        
            // Reset the timeout whenever a key is pressed
            clearTimeout(timeoutId);
            
            // Set a new timeout for 2 seconds
            timeoutId = setTimeout(function() {
                // console.log('No keypress for 2 seconds');
                handler();
                
                keyPressed = false; // Reset the keypress state after executing the handler
            }, 500);
        });
    }

}

export default new searchView();