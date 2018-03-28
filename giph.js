
$(document).ready(function () {

    //global varribles can call anywhere
    var names = ["jerry Springer", "Martin", "Oprah", "Tom Cruise", "Arnold Schwarzenegger"]
    var results;
    var gifClick = false;
    var buttons = $("#buttons")

    //function for gif buttons
    function displayButtons() {
        buttons.empty()
        for (var i = 0; i < names.length; i++) {
            var savedButton = $("<button>");
            savedButton.addClass("name");
            savedButton.addClass("buttons");
            savedButton.attr("data-name", names[i]);
            savedButton.text(names[i]);
            $("#buttons").append(savedButton);



        }

    }

    $("#addgif").on("click", createNewButton);


    // Function to add a new button
    function createNewButton() {
        console.log("add gif button clicked")
        var newButtonValue = $("#person-input").val().trim();
        console.log(newButtonValue);
        if (newButtonValue == "") {
          return false; // added so user cannot add a blank button
        } else {
            var newButton = $('<button class="buttons">' + newButtonValue + '</button>');
            console.log(newButton);
            newButton.appendTo(buttons);
            console.log(buttons);
            // displayButtons();
            return false;
        }
    }
    //function display gifs
    function displayGif() {
        $('#gifs-appear-here').empty();
        console.log("something")
        var person = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=YmTc3yjWuPWIQiFSoImO8z5eGPbnIMGd&limit=10";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            results = response.data;
            console.log(results);//need to use fixed.still url and fixed_height
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    var gifDiv = $('<div class="item">');

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    // var p = $("").text("" + rating);

                    // Creating an image tag
                    var personImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    personImage.attr("src", results[i].images.fixed_height_still.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    // gifDiv.append(p);
                    gifDiv.append(personImage);
                    $("#gifs-appear-here").append(gifDiv)

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML

                }

            }


        })

    }
    //function to pause and play gif
    function switchSrc() {
        var gifIndex = $(this).index()
        console.log(gifIndex);
        if (gifClick === false) {
            $(this).children("img").attr("src", results[gifIndex].images.fixed_height.url)
            gifClick = true;
        }
        else {
            $(this).children("img").attr("src", results[gifIndex].images.fixed_height_still.url)
            gifClick = false;

        }



    }
    //create click handler for sumbit button

    //grab value for input button

    //push value into names array

    //call display buttons
    createNewButton();
    displayButtons();
    $(document).on("click", ".buttons", displayGif);
    $(document).on("click", ".item", switchSrc);

})//end document ready








