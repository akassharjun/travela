let destination = "";
let comfortLevel = "";
let startDate = "";
let endDate = "";
let activity = "";
let priceRange = "";
let resorts = [];

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

  $startDate.datepicker({
    onSelect: function(dateText) {
      startDate = dateText;
    }
  });

  $endDate.datepicker({
    onSelect: function(dateText) {
      endDate = dateText;
    }
  });

  $(".heart").click(function() {
    $(this).css("color", "red");
    $(this).css("border", "1px solid blue");

    console.log("I work");
  });

  $(".fav-icon").click(function() {
    $(this).css("color", "red");
  });
});

function openResort() {
  let val = $(event)[0].toElement.innerText.split(/(?:\r\n|\r|\n)/g);

  let resort = resorts.find(element => element.name === val[0]);

  let id = resort.id.replace(/resort/g, "");

  localStorage.setItem("selectedResortId", parseInt(id));
  window.location = "../resort-page.html";
}

function setResortList() {
  let prices = {
    $: 600,
    $$: 1000,
    $$$: 1500,
    $$$$: 2000,
    $$$$$: 10000
  };

  let resortList = [];

  $.getJSON("./resources/resorts.json", function(data) {
    $.each(data["resorts"], function(key, val) {
      if (val.destination.toLowerCase() === destination.toLowerCase()) {
        if (val.comfortLevel === comfortLevel) {
          if (val.activities.includes("swimming")) {
            if (val.price < prices[priceRange]) {
              let resortStartDate = moment(
                val.startDate,
                "YYYY-MM-DD"
              ).toDate();
              let resortEndDate = moment(val.endDate, "YYYY-MM-DD").toDate();
              let filterStartDate = moment(startDate, "DD/MM/YYYY").toDate();
              let filterEndDate = moment(endDate, "DD/MM/YYYY").toDate();

              if (
                resortStartDate < filterStartDate ||
                resortStartDate.toDateString() ===
                  filterStartDate.toDateString()
              ) {
                if (
                  resortEndDate > filterEndDate ||
                  resortEndDate.toDateString() === filterEndDate.toDateString()
                ) {
                  resortList.push(val);
                }
              }
            }
          }
        }
      }
    });

    resorts = resortList;
    let resortHtmlContent = "";

    if (resortList.length !== 0) {
      $.each(resortList, function(index, value) {
        let imgPath = `img/resorts/${value.name
          .toLowerCase()
          .replace(/ /g, "-")}/resort-1.jpeg`;

        resortHtmlContent += `
        <div class="resort"  
               style="background: url(${imgPath}) no-repeat bottom;background-size: cover;"
                onclick="openResort();"
                 >
        <div class="resort-information">
          <h3 class="resort-name">${value.name}</h3>
          <p class="resort-location">${value.location}</p>
           <div style="display: flex;justify-content: space-between">
          <h4 class="resort-price">\$${value.price}</h4>
          </div>
        </div>
      </div>`;
      });
    } else {
      resortHtmlContent = `<div style="display: flex;justify-content: center;"><p style="margin-top: 150px;margin-bottom: 180px;text-align: center;">There are no resorts for this search criteria</p></div>`;
    }

    $(".resort-list").html(resortHtmlContent);
  });
}
