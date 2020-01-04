let GOOGLE_MAPS_API_KEY = "AIzaSyCxNguVBq1O5oZgQuZ7qFt9q_asf0lJscU";

let resortLiked = false;
let favoriteResorts;

// ' '
// ''

$(document).ready(function() {
  let selectedHotelIndex = localStorage.getItem("selectedHotelIndex");

  selectedHotelIndex = selectedHotelIndex == null ? 0 : selectedHotelIndex - 1;

  favoriteResorts = JSON.parse(localStorage.getItem("favoriteResorts"));

  if (favoriteResorts != null) {
    if (favoriteResorts.includes((selectedHotelIndex + 1).toString())) {
      resortLiked = true;
    }
  } else {
    favoriteResorts = [];
  }

  $.getJSON("./resources/hotels.json", function(data) {
    resort = data["resorts"][selectedHotelIndex];

    $("#hotel-name").text(resort.name);
    $("#hotel-location").text(`${resort.location},  ${resort.destination}`);
    $("#hotel-description").text(resort.longDescription);

    $("#price").text(`$ ${resort.price}`);
    $("#comfort-level").text(`${resort.comfortLevel} stars`);
    $("#available-dates").html(
      `${resort.startDate.replace(/-/g, "/")} to 
      ${resort.endDate.replace(/-/g, "/")}`
    );
    $("#activities").text(
      `${resort.activities.toString().replace(/,/g, ", ")}`
    );

    $(document).prop("title", `${resort.name}`);

    let num = Math.floor(Math.random() * 28 + 2);

    $(".male-author-1 .author .date").text(
      new Date(+new Date() - Math.floor(Math.random() * 10000000000))
    );
    $(".male-author-1 .author .rounded-circle").prop(
      "src",
      `img/user-picture/male-${num}.svg`
    );

    // favoriteResortSetting();

    $.getJSON("./resources/reviews.json", function(data) {
      let num = Math.floor(Math.random() * 3 + 2);

      $(".male-author-1 .author .name").text(data["maleAuthors"][num]);
      $(".female-author-1 .author .name").text(data["femaleAuthors"][num]);
      $(".female-author-2 .author .name").text(data["femaleAuthors"][num - 1]);

      $(".male-author-1 .box .description").text(data["reviews"][num]);
      $(".female-author-1 .box .description").text(data["reviews"][num + 1]);
      $(".female-author-2 .box .description").text(data["reviews"][num - 1]);
    });

    $(".female-author-1 .author .date").text(
      new Date(+new Date() - Math.floor(Math.random() * 10000000000))
    );

    $(".female-author-1 .author .rounded-circle").prop(
      "src",
      `img/user-picture/female-${num}.svg`
    );

    $(".female-author-2 .author .date").text(
      new Date(+new Date() - Math.floor(Math.random() * 10000000000))
    );
    $(".female-author-2 .author .rounded-circle").prop(
      "src",
      `img/user-picture/female-${num - 1}.svg`
    );

    $("#location-text").text(
      `${resort.name}, ${resort.location},  ${resort.destination}`
    );

    let imageBaseUrl = `img/hotels/${resort.name
      .toLowerCase()
      .replace(/ /g, "-")}`;

    $(".hotel-hero-image").attr("src", `${imageBaseUrl}/hotel-1.jpeg`);

    $("#google-map").prop(
      "src",
      `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${resort.destination}+${resort.location}+${resort.name}&zoom=15`
    );

    let hotelImageArray = [];

    for (let i = 1; i < 9; i++) {
      hotelImageArray.push(
        `<div class="col-sm-6 col-md-4 col-lg-3 item photo-container">
            <a href="${imageBaseUrl}/hotel-${i}.jpeg" data-lightbox="photos">
              <img class="img-fluid" src="${imageBaseUrl}/hotel-${i}.jpeg" />
            </a>
          </div>`
      );
    }

    $(".photos").html(hotelImageArray);

    let $favoriteIcon = $(".favicon");

    resortLiked
      ? $favoriteIcon.html(
          '<span class="iconify" data-icon="emojione:red-heart" data-inline="false"></span>'
        )
      : $favoriteIcon.html(
          '<span class="iconify" data-icon="emojione-monotone:red-heart" data-inline="false"></span>'
        );

    $favoriteIcon.click(function() {
      if (resortLiked) {
        $favoriteIcon.html(
          '<span class="iconify" data-icon="emojione-monotone:red-heart" data-inline="false"></span>'
        );
        resortLiked = false;
        console.log("unliked");
        favoriteResorts.pop(
          favoriteResorts.indexOf(resort.id.replace("resort", ""))
        );
      } else {
        resortLiked = true;
        console.log("liked");
        $favoriteIcon.html(
          '<span class="iconify" data-icon="emojione:red-heart" data-inline="false"></span>'
        );
        favoriteResorts.push(resort.id.replace("resort", ""));
      }
      localStorage.setItem("favoriteResorts", JSON.stringify(favoriteResorts));
      // favoriteResortSetting();
    });
  });
});
