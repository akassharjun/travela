let destinations = {
  Asia:
    "Asia is Earth's largest and most populous continent, located primarily in the Eastern and Northern Hemispheres. It shares the continental landmass of Eurasia with the continent of Europe and the continental landmass of Afro-Eurasia with both Europe and Africa.",
  "The Alps":
    "The Alps are the highest mountain range that lies in Europe, stretching about 1,200 kilometres across eight Alpine countries.",
  "North America":
    "North America is a continent entirely within the Northern Hemisphere and almost all within the Western Hemisphere.",
  "Central America":
    "Central America is a region found in the southern tip of North America and is sometimes defined as a subcontinent of the Americas",
  "South America":
    "South America is a continent in the Western Hemisphere, mostly in the Southern Hemisphere.",
  Europe:
    "Europe is a continent located entirely in the Northern Hemisphere and mostly in the Eastern Hemisphere. It is bordered by the Arctic Ocean to the north, the Atlantic Ocean to the west, Asia to the east, and the Mediterranean Sea to the south. It comprises the westernmost part of Eurasia.",
  Caribbean:
    "The Caribbean is a region of the Americas that consists of the Caribbean Sea, its islands and the surrounding coasts.",
  "Indian Ocean":
    "The Indian Ocean is the third-largest of the world's oceanic divisions, covering 19.8% of the water on the Earth's surface."
};

let destionationHotspots = {
  Asia: "Bali, Indonesia",
  "The Alps": "Lucerne, Switzerland",
  "North America": "Times Square, New York City",
  "Central America": "Barrier Reef, Belize",
  "South America": "Angel Falls, Venezuela",
  Europe: "Santorini, Greece",
  Caribbean: "Havana",
  "Indian Ocean": "Seychelles"
};

$(document).ready(function() {
  let destinationName = localStorage.getItem("destination");

  $("#destination-name").text(destinationName);
  $("#destination-description").text(destinations[destinationName]);

  let imageSource =
    "img/destinations/" + destinationName.toLowerCase().replace(" ", "-");

  if (imageSource === "indian-ocean") {
    imageSource += ".webp";
  } else {
    imageSource += ".jpg";
  }

  console.log(imageSource);

  $(".destination-hero-image").attr("src", imageSource);

  $("#destination-location").text(destionationHotspots[destinationName]);

  let hotels = [];

  $.getJSON("./resources/hotels.json", function(data) {
    $.each(data["resorts"], function(key, val) {
      if (val.destination === destinationName) {
        console.log(val);
        hotels.push(val);
        console.log("list is " + hotels);
      }
    });

    let htmlHotels = "";

    $.each(hotels, function(index, value) {
      console.log(`value is ${value}`);
      console.log(
        `img/hotels/${value.name
          .toLowerCase()
          .replace(" ", "-")
          .replace(" ", "-")
          .replace(" ", "-")
          .replace(" ", "-")
          .replace(" ", "-")
          .replace(" ", "-")}/hotel-1.jpeg`
      );
      htmlHotels += `
        <div class="col-sm-6 item"> 
              <div class="row"> 
                <div class="col-md-12 col-lg-5"> 
                <a href="#" class="hotel-image" aria-valuetext="Asia">
                    <img class="img-fluid" src="img/hotels/${value.name
                      .toLowerCase()
                      .replace(" ", "-")
                      .replace(" ", "-")
                      .replace(" ", "-")
                      .replace(" ", "-")
                      .replace(" ", "-")}/hotel-1.jpeg"/>
                </a>
              </div>
              <div class="col">
                <h4 class="name">${value.name}</h4>
                <p class="description" style="max-lines: 2;   text-overflow: ellipsis;">${
                  value.shortDescription
                }</p>
              </div>
             </div>
        </div>`;
    });

    $(".hotels").html(htmlHotels);
  });
});
