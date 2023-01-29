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

    function addNewCard(author, picUrl, thumbUrl, stars, title, subTitle, duration, index) {
        $(".videos .carousel-inner").append(`
            <div class="carousel-item ${index == 0 ?`active` : ``} col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card border-0" style="max-width: 25.5rem;">
                    <div class="position-relative image-group">
                        <img src="./images/play.png" alt="play" width="64px" class="play position-absolute">
                    <img src="${thumbUrl}" alt="card-1" class="card-img-top img-fluid" height="154px">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">${title}</h5>
                        <p class="card-text text-muted">${subTitle}</p>
                        <div class="row justify-content-start align-items-center p-4">
                            <img src="${picUrl}" alt="${author}" width="30px" class="rounded-circle mr-4">
                            <p class="m-0 font-weight-bold">${author}</p>
                        </div>
                        <div class="row justify-content-between px-4">
                            <div class="d-inline-block">
                                ${displayStars(stars)}
                            </div>
                            <p class="font-weight-bold">${duration}</p>
                        </div>
                    </div>
                </div>      
            </div>
        `);
    }

    function displayStars(number) {
        let string = "";

        if (number > 5) {
            number = 5;
        }
        for (let i = 0; i < number; i++) {
            string += `<img src="./images/star_on.png" alt="star on" width="15px">\n`;
        }
        for (let i = 0; i < 5 - number; i++) {
            string += `<img src="./images/star_off.png" alt="star off" width="15px">\n`;
        }
        return string;
    }
    
    function displayQuotes() {
        displayLoader(true, ".section-quote .carousel-inner");
        $.get("https://smileschool-api.hbtn.info/quotes", function (data, status) {
            $.each(data, function(index, value) {
                addNewQuotes(value.pic_url, value.name, value.title, value.text, index);
            });
            displayLoader(false, ".section-quote .carousel-inner");
        }); 
    }

    function displayVideos() {
        displayLoader(true, ".videos .carousel-inner");
        $.get("https://smileschool-api.hbtn.info/popular-tutorials", function (data, status) {
            $.each(data, function(index, value) {
                addNewCard(value.author, value.author_pic_url, value.thumb_url, value.star, value.title, value["sub-title"], value.duration, index);
            });
            displayLoader(false, ".videos .carousel-inner");
        }); 
    }

    function displayLoader(loader, tag) {
        if (loader === true) {
            $(tag).wrap("<div class=\"loader\"></div>");
        } else {
            $(tag).unwrap();
        }
        
    }

    /*
    Carousel
    */
    $('#carouselVideos').on('slide.bs.carousel', function (e) {
        /*
            CC 2.0 License Iatek LLC 2018 - Attribution required
        */
        const $e = $(e.relatedTarget);
        const idx = $e.index();
        const itemsPerSlide = 5;
        const totalItems = $('#carouselVideos .carousel-item').length;
        
        if (idx >= totalItems-(itemsPerSlide-1)) {
            const it = itemsPerSlide - (totalItems - idx);
            for (let i=0; i<it; i++) {
                // append slides to end
                if (e.direction=="left") {
                    $('#carouselVideos .carousel-item').eq(i).appendTo('#carouselVideos .carousel-inner');
                }
                else {
                    $('#carouselVideos .carousel-item').eq(0).appendTo('#carouselVideos .carousel-inner');
                }
            }
        }
    });
      
    displayQuotes();
    displayVideos();
});
