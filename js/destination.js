let destinations = {
    Asia:
        "Asia is Earth's largest and most populous continent, located primarily in the Eastern and Northern Hemispheres. It shares the continental landmass of Eurasia with the continent of Europe and the continental landmass of Afro-Eurasia with both Europe and Africa.",
    "The Alps":
        "The Alps are the highest and most extensive mountain range system that lies entirely in Europe, and stretching approximately 1,200 kilometres across eight Alpine countries: France, Switzerland, Monaco, Italy, Liechtenstein, Austria, Germany, and Slovenia.",
    "North America":
        "North America is a continent entirely within the Northern Hemisphere and almost all within the Western Hemisphere. It is also considered by some to be a northern subcontinent of the Americas.",
    "Central America":
        "Central America is a region found in the southern tip of North America and is sometimes defined as a subcontinent of the Americas. This region is bordered by Mexico to the north, Colombia to the southeast, the Caribbean Sea to the east and the Pacific Ocean to the west and south",
    "South America":
        "South America is a continent in the Western Hemisphere, mostly in the Southern Hemisphere, with a relatively small portion in the Northern Hemisphere. It may also be considered a subcontinent of the Americas, which is how it is viewed in the Spanish and Portuguese-speaking regions of the Americas.",
    Europe:
        "Europe is a continent located entirely in the Northern Hemisphere and mostly in the Eastern Hemisphere. It is bordered by the Arctic Ocean to the north, the Atlantic Ocean to the west, Asia to the east, and the Mediterranean Sea to the south. It comprises the westernmost part of Eurasia.",
    Caribbean:
        "The Caribbean is a region of the Americas that consists of the Caribbean Sea, its islands and the surrounding coasts. The region is southeast of the Gulf of Mexico and the North American mainland, east of Central America, and north of South America. ",
    "Indian Ocean":
        "The Indian Ocean is the third-largest of the world's oceanic divisions, covering 70,560,000 km² or 19.8% of the water on the Earth's surface. It is bounded by Asia to the north, Africa to the west, and Australia to the east."
};

let destinationHotspots = {
    Asia: "Bali, Indonesia",
    "The Alps": "Lucerne, Switzerland",
    "North America": "Times Square, New York City",
    "Central America": "Barrier Reef, Belize",
    "South America": "Angel Falls, Venezuela",
    Europe: "Santorini, Greece",
    Caribbean: "Havana",
    "Indian Ocean": "Seychelles"
};

$(document).ready(function () {
    let destinationName = localStorage.getItem("destination");

    $("#destination-name").text(destinationName);
    $("#destination-description").text(destinations[destinationName]);
    $(document).prop("title", `${destinationName}`);

    let imageSource =
        "img/destinations/" +
        destinationName.toLowerCase().replace(" ", "-") +
        ".jpg";

    $(".destination-hero-image").attr("src", imageSource);

    $("#destination-location").text(destinationHotspots[destinationName]);

    let resorts = [];

    $.getJSON("./resources/resorts.json", function (data) {
        $.each(data["resorts"], function (key, val) {
            if (val.destination === destinationName) {
                resorts.push(val);
            }
        });

        let resortHtmlContent = "";

        $.each(resorts, function (index, value) {
            resortHtmlContent += `
        <div class="col-sm-6 item resort" > 
              <div class="row"> 
                <div class="col-md-12 col-lg-5"> 
                <a href="#" class="resort-image" aria-valuetext="Asia">
                    <img class="img-fluid" src="img/resorts/${value.name
                .toLowerCase()
                .replace(/ /g, "-")}/resort-1.jpeg"/>
                </a>
              </div>
              <div class="col">
                <h4 class="resort-name">${value.name}</h4>
                <p class="resort-description" style="max-lines: 2;   text-overflow: ellipsis;">${
                value.shortDescription
            }</p>
              </div>
             </div>
        </div>`;
        });

        $(".resorts").html(resortHtmlContent);
        // onclick="alert(event.srcElement.getAttribute())"

        $(".resort").click(function () {
            let resort = resorts.find(
                element =>
                    element.name ===
                    $(this)
                        .children(".row")
                        .children(".col")
                        .children(".resort-name")
                        .text()
            );

            let id = resort.id.replace(/resort/g, "");
            localStorage.setItem("selectedResortId", parseInt(id));
            window.location = "resort-page.html";
        });
    });
});
