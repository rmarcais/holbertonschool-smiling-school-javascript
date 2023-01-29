$(document).ready(function () {
    function addNewQuotes(picUrl, name, title, text, index) {
        $(".section-quote .carousel-inner").append(`
            <div class="carousel-item ${index == 0 ?`active` : ``}">
                <div class="row justify-content-between">
                    <div class="col-sm-4 text-center text-md-right my-auto pr-md-5">
                        <img src="${picUrl}" alt="slide" class="rounded-circle" height="160px" weight="160px">
                    </div>
                    <div class="col-sm-8 py-2">
                        <p class="mt-5 mt-sm-0 pl-md-2">${text}</p>
                        <p class="font-weight-bold mb-n1 mt-5">${name}</p>
                        <p><em>${title}</em></p> 
                    </div>
                </div>  
            </div>
        `);
    }
    
    function displayQuotes() {
        displayLoader(true);
        $.get("https://smileschool-api.hbtn.info/quotes", function (data, status) {
            $.each(data, function(index, value) {
                addNewQuotes(value.pic_url, value.name, value.title, value.text, index);
            });
            displayLoader(false);
        }); 
    }

    function displayLoader(loader) {
        if (loader === true) {
            $(".section-quote .carousel-inner").wrap("<div class=\"loader\"></div>");
        } else {
            $(".section-quote .carousel-inner").unwrap();
        }
        
    }
    displayQuotes();
});
