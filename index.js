// Function that calls API
function getQuotesFromApi() {
  // API url
  const url =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  $.get(url, getQuote)
    .done(function () {
      // alert("success");
    })
    .fail(function () {
      alert("API error");
    })
    .always(function () {
      // alert(status);
    });
}

// Function that return random quote from API
function getQuote(response) {
  // Convert response.JSON into javascript object
  const data = JSON.parse(response);
  // console.log("Quotes: ", data);

  setRandomColor(data);
}

// Set colors to html elements
const setRandomColor = (data) => {
  const randomColor = getRandomColor();
  const id = getRandomNum(data.quotes.length);

  // Inser new css properties
  $("body").css({
    "background-color": randomColor,
    "transition-duration": "3s",
  });

  $(".fa").css({
    color: randomColor,
    "transition-duration": "3s",
  });

  $("#new-quote").css({
    "background-color": randomColor,
    "transition-duration": "3s",
  });

  // Update quote
  $("#quote-text").animate({ opacity: 0 }, 1000, function () {
    autoHeightAnimate($(this), 1200); //useful when webpage is first loaded
    $("#text").html(data.quotes[id]["quote"]); // insert quote
    autoHeightAnimate($(this), 1200); // update new height smoothly
    $(this).delay(1000).animate({ opacity: 1 }, 1000); // delay opacity waiting for height to be update
    $("#text").css({ color: randomColor }); // set new color to quote
  });

  // Update author
  $("#quote-author").animate({ opacity: 0 }, 1000, function () {
    autoHeightAnimate($(this), 1200); //useful when webpage is first loaded
    $("#author").html("- " + data.quotes[id]["author"]); // insert author
    autoHeightAnimate($(this), 1200); // update new height smoothly
    $(this).delay(1000).animate({ opacity: 1 }, 1000); // delay opacity waiting for height to be update
    $("#author").css({ color: randomColor }); // set new color to author
  });

  // Set link for twitter with embeded quote & author
  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=freeCodeCamp&hashtags=quote&text=" +
      encodeURIComponent(
        '"' +
          data.quotes[id]["quote"] +
          '"' +
          "  --  " +
          data.quotes[id]["author"]
      )
  );
};

// Function that generate random colors (hsl() format)
const getRandomColor = () => {
  // color (degree)
  const h = getRandomNum(360);
  //  saturation (%) ==> set to 90 max to avoid unreadable colors
  const s = getRandomNum(90);
  //  luminosity (%) ==> set to 90 max to avoid unreadable colors
  const l = getRandomNum(90);

  return `hsl(${h}deg, ${s}%, ${l}%)`;
};

// Function for smooth height animation by DmitrySubj (https://gist.github.com/DmitrySubj/5e0b32b53e42db150ea76481e2f49427#file-function-to-animate-height-auto-js)
function autoHeightAnimate(element, time) {
  const curHeight = element.height(); // Get Default Height
  const autoHeight = element.css("height", "auto").height(); // Get Auto Height
  element.height(curHeight); // Reset to Default Height
  element.stop().animate({ height: autoHeight }, time); // Animate to Auto Height
}

// Function that generate Random number
const getRandomNum = (numMax) => {
  return Math.floor(Math.random() * numMax);
};

// $(document).ready(function () {
//   getQuotesFromApi();
// });

document.addEventListener("DOMContentLoaded", () => {
  getQuotesFromApi();
});
