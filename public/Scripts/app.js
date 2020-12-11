// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App Started...");

        //to find delete buttons 
        let deleteButtons = document.querySelectorAll('.btn-danger');
        
        //for loop to confirm deletion
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?")) 
                {
                    event.preventDefault();
                    window.location.assign('/game-match');
                }
            });
        }
    }

    //load page on Start
    window.addEventListener("load", Start);

})();
