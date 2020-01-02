let destination = "";
let comfortLevel = "";
let startDate = "";
let endDate = "";
let activity = "";
let priceRange = "";

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
  $("select#destination").change(function() {
    destination = $(this)
      .children("option:selected")
      .val();
  });

  $("select#comfort-level").change(function() {
    comfortLevel = $(this)
      .children("option:selected")
      .val();
  });

  $("select#activities").change(function() {
    activity = $(this)
      .children("option:selected")
      .val();
  });

  $("select#price").change(function() {
    priceRange = $(this)
      .children("option:selected")
      .val();
  });

  // $("#price").selectmenu();
  // $("#activities").selectmenu();

  $("#search-button").click(function() {
    console.log(
      `Destination : ${destination}\nComfort Level : ${comfortLevel}\n
            Start Date : ${startDate}\nEnd Date : ${endDate}\n
            Activity : ${activity}\nPrice Range : ${priceRange}`
    );
    localStorage.setItem("destination", `${destination}`);
    localStorage.setItem("comfortLevel", `${comfortLevel}`);
    localStorage.setItem("startDate", `${startDate}`);
    localStorage.setItem("endDate", `${endDate}`);
    localStorage.setItem("activity", `${activity}`);
    localStorage.setItem("priceRange", `${priceRange}`);

    window.location = "./resort-listing.html";
    return false;
  });

  $(".destination-image").click(function() {
    console.log("hi");
    let destination = $(this).attr("aria-valuetext");
    localStorage.setItem("destination", `${destination}`);
    // console.log(localStorage.getItem("destination"));
    window.location = "./destination.html";
    return false;
  });
});
