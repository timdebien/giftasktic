$(document).ready(() => {
  // Global variables can be accessed anywhere
  const names = ["jerry Springer", "Martin", "Oprah", "Tom Cruise", "Arnold Schwarzenegger"];
  let results;
  let gifClick = false;
  const buttons = $("#buttons");

  // Function to display gif buttons
  const displayButtons = () => {
    buttons.empty();
    for (const name of names) {
      const savedButton = $("<button>")
        .addClass("name buttons")
        .attr("data-name", name)
        .text(name);
      buttons.append(savedButton);
    }
  };

  $("#addgif").on("click", createNewButton);

  // Function to add a new button
  function createNewButton() {
    console.log("add gif button clicked");
    const newButtonValue = $("#person-input").val().trim();
    console.log(newButtonValue);
    if (newButtonValue === "") {
      return false; // Added so user cannot add a blank button
    } else {
      const newButton = $(`<button class="buttons">${newButtonValue}</button>`);
      console.log(newButton);
      newButton.appendTo(buttons);
      console.log(buttons);
      return false;
    }
  }

  // Function to display gifs
  const displayGif = function () {
    $('#gifs-appear-here').empty();
    console.log("something");
    const person = $(this).text();
    const queryURL = `https://api.giphy.com/v1/gifs/search?q=${person}&api_key=YmTc3yjWuPWIQiFSoImO8z5eGPbnIMGd&limit=27`;
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done((response) => {
      results = response.data;
      console.log(results); // Need to use fixed.still URL and fixed_height
      for (const result of results) {
        if (result.rating !== "r" && result.rating !== "pg-13") {
          const gifDiv = $('<div class="item">');
          const personImage = $("<img>").attr("src", result.images.fixed_height_still.url);
          gifDiv.append(personImage);
          $("#gifs-appear-here").append(gifDiv);
        }
      }
    });
  }

  // Function to pause and play gif
  const switchSrc = function () {
    const gifIndex = $(this).index();
    console.log(gifIndex);
    if (!gifClick) {
      $(this).children("img").attr("src", results[gifIndex].images.fixed_height.url);
      gifClick = true;
    } else {
      $(this).children("img").attr("src", results[gifIndex].images.fixed_height_still.url);
      gifClick = false;
    }
  }

  // Create click handler for submit button
  createNewButton();
  displayButtons();
  $(document).on("click", ".buttons", displayGif);
  $(document).on("click", ".item", switchSrc);
});
