let destination = "";
let comfortLevel = "";
let startDate = "";
let endDate = "";
let activity = "";
let priceRange = "";
let resorts = [];
$(function() {
  $("#start-date").datepicker({
    onSelect: function(dateText) {
      startDate = dateText;
    }
  });
  $("#end-date").datepicker({
    onSelect: function(dateText) {
      endDate = dateText;
    }
  });
});

$(document).ready(function() {
  destination = localStorage.getItem("destination");
  comfortLevel = localStorage.getItem("comfortLevel");
  startDate = localStorage.getItem("startDate");
  endDate = localStorage.getItem("endDate");
  activity = localStorage.getItem("activity");
  priceRange = localStorage.getItem("priceRange");

  let $destination = $("select#destination");
  let $comfortLevel = $("select#comfort-level");
  let $startDate = $("#start-date");
  let $endDate = $("#end-date");
  let $activity = $("select#activities");
  let $price = $("select#price");

  $destination.val(destination.toLowerCase());
  $comfortLevel.val(comfortLevel);
  $startDate.val(startDate);
  $endDate.val(endDate);
  $activity.val(activity.toLowerCase());
  $price.val(priceRange);

  setResortList();

  $destination.change(function() {
    destination = $(this)
      .children("option:selected")
      .val();

    setResortList();
  });

  $comfortLevel.change(function() {
    comfortLevel = $(this)
      .children("option:selected")
      .val();

    setResortList();
  });

  $activity.change(function() {
    activity = $(this)
      .children("option:selected")
      .val();

    setResortList();
  });

  $price.change(function() {
    priceRange = $(this)
      .children("option:selected")
      .val();

    setResortList();
  });

  $(".resort").click(function() {
    let resort = resorts.find(
      element =>
        element.name ===
        $(this)
          .children(".resort-information")
          .children(".resort-name")
          .text()
    );

    console.log(resort);

    let id = resort.id.replace(/resort/g, "");

    localStorage.setItem("selectedHotelIndex", parseInt(id));
    window.location = "./hotel.html";
  });

  $(".heart").click(function() {
    // <span class="iconify" data-icon="ic:baseline-favorite" data-inline="false"></span>
    // $(this).attr("data-icon", "ic:baseline-favorite");
    $(this).css("color", "red");
    $(this).css("border", "1px solid blue");

    console.log("I work");
  });
});

function setResortList() {
  let prices = {
    $: 600,
    $$: 1000,
    $$$: 1500,
    $$$$: 2000,
    $$$$$: 10000
  };

  let resortList = [];

  $.getJSON("./resources/hotels.json", function(data) {
    $.each(data["resorts"], function(key, val) {
      if (val.destination.toLowerCase() === destination) {
        if (val.comfortLevel === comfortLevel) {
          if (val.activities.includes("swimming")) {
            if (val.price < prices[priceRange]) {
              let startingDateArray = val.startDate.split("-");
              let endingDateArray = val.endDate.split("-");
              let startingDate = new Date(
                startingDateArray[0],
                startingDateArray[1] - 1,
                startingDateArray[2]
              );
              let endingDate = new Date(
                endingDateArray[0],
                endingDateArray[1] - 1,
                endingDateArray[2]
              );
              console.log(startingDate.toDateString());
              console.log(endingDate.toDateString());
              resortList.push(val);
            }
          }
        }
      }
    });

    let htmlHotels = "";
    resorts = resortList;

    if (resortList.length !== 0) {
      $.each(resortList, function(index, value) {
        let imgPath = `img/hotels/${value.name
          .toLowerCase()
          .replace(/ /g, "-")}/hotel-1.jpeg`;

        htmlHotels += `<div class="resort"  style="background: url(${imgPath}) no-repeat bottom;background-size: cover;">
        <div class="resort-information">
          <h3 class="resort-name">${value.name}</h3>
          <p class="resort-location">${value.location}</p>
           <div style="display: flex;justify-content: space-between">
          <h4 class="resort-price">\$${value.price}</h4>
            <span
              class="iconify heart"
              data-icon="ic:baseline-favorite-border"
              data-inline="false"
            ></span>
          </div>
        </div>
      </div>`;
      });
    } else {
      htmlHotels = `<div style="display: flex;justify-content: center;"><p style="margin-top: 150px;margin-bottom: 180px;text-align: center;">There are no resorts for this search criteria</p></div>`;
    }

    $(".resort-list").html(htmlHotels);
  });
}
