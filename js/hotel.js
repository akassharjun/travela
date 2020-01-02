let GOOGLE_MAPS_API_KEY = "AIzaSyCxNguVBq1O5oZgQuZ7qFt9q_asf0lJscU";

let resort = {
  id: "resort1",
  destination: "Caribbean",
  name: "Les Boucaniers",
  location: "Martinique",
  comfortLevel: "5",
  activities: ["water skiing", "tennis", "scuba diving", "spa"],
  price: 1254,
  startDate: "2017-05-05",
  endDate: "2019-12-31",
  shortDescription:
    "The resort of Les Boucaniers is located on the laid-back beach-covered south coast of the island, and is perfectly placed for Martinique holidays that are both relaxing and awe-inspiring.",
  picture: "img/resortpool.jpg",
  longDescription:
    "A divers' paradise in the Baie du Marin, a legendary spot. It's bungalows are discreetly lodged in a tropical garden beside the white sand beach in superb Marin Bay. A magical site where you can enjoy a taste of everything, alone or with family or friends. Try water sports and the magnificent Club Med Spa*. You'll be enchanted by the exotic flavours of the local cuisine and the joyful spirit of the Caribbean.",
  url: "resort1.html"
};

$(document).ready(function() {
  let selectedHotelIndex = localStorage.getItem("selectedHotelIndex");

  selectedHotelIndex = selectedHotelIndex == null ? 0 : selectedHotelIndex - 1;

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
  });
});
