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
  url: "resort1.html",
  reviews: [
    {
      description:
        "Spectacular property. Excellent staff! Can’t wait to come back! Counting down the days till my next holiday there",
      author: "Oscar Vazquez"
    },
    {
      description:
        "This is one of the best islands in the Caribbean. The resort has a beautiful beach and the water sports are great.",
      author: "Alyssa Mincer"
    },
    {
      description:
        "Amazing stay at Les Boucaniers. Incredible GO team, beautiful village, spectacular food.",
      author: "Kera Pezzuti"
    }
  ]
};

$(document).ready(function() {
  console.log("hello");
  $.getJSON("./resources/fake.json", function(data) {
    resort = data["resorts"][0];

    console.log(data);
    console.log(data["resorts"]);

    console.log(resort);

    console.log("hello");

    $("#hotel-name").text(resort.name);
    $("#hotel-location").text(`${resort.location},  ${resort.destination}`);
    $("#hotel-description").text(resort.longDescription);

    $("#price").text(`$ ${resort.price}`);
    $("#comfort-level").text(`${resort.comfortLevel} stars`);
    $("#activities").text(`${resort.activities}`);

    $(document).prop("title", `${resort.name}`);

    let num = Math.floor(Math.random() * 28 + 1);

    $(".male-author-1 .box .description").text(resort.reviews[0].description);
    $(".male-author-1 .author .name").text(resort.reviews[0].author);
    $(".male-author-1 .author .date").text(
      new Date(+new Date() - Math.floor(Math.random() * 10000000000))
    );
    $(".male-author-1 .author .rounded-circle").prop(
      "src",
      `img/user-picture/male-${num}.svg`
    );

    $(".female-author-1 .box .description").text(resort.reviews[1].description);
    $(".female-author-1 .author .name").text(resort.reviews[1].author);
    $(".female-author-1 .author .date").text(
      new Date(+new Date() - Math.floor(Math.random() * 10000000000))
    );
    $(".female-author-1 .author .rounded-circle").prop(
      "src",
      `img/user-picture/female-${num}.svg`
    );

    $(".female-author-2 .box .description").text(resort.reviews[2].description);
    $(".female-author-2 .author .name").text(resort.reviews[2].author);
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

    // console.log(`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${resort.destination}+${resort.location}&zoom=15`);
    //
    // $('#google-map').prop('src', `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${resort.destination}+${resort.location}+${resort.name}&zoom=15`)

    // $.each(data['resorts'], function (key, val) {
    //     console.log(val.id);
    //     console.log(val.destination);
    //     console.log("hello")
    // })
  });
});
