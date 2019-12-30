let destinations = {
    'Asia': 'Asia is Earth\'s largest and most populous continent, located primarily in the Eastern and Northern Hemispheres.',
    'The Alps': 'The Alps are the highest mountain range that lies in Europe, stretching about 1,200 kilometres across eight Alpine countries.',
    'North America': 'North America is a continent entirely within the Northern Hemisphere and almost all within the Western Hemisphere.',
    'Central America': 'Central America is a region found in the southern tip of North America and is sometimes defined as a subcontinent of the Americas',
    'South America': 'South America is a continent in the Western Hemisphere, mostly in the Southern Hemisphere.',
    'Europe': 'Europe is a continent located entirely in the Northern Hemisphere and mostly in the Eastern Hemisphere.',
    'Caribbean': 'The Caribbean is a region of the Americas that consists of the Caribbean Sea, its islands and the surrounding coasts.',
    'Indian Ocean': 'The Indian Ocean is the third-largest of the world\'s oceanic divisions, covering 19.8% of the water on the Earth\'s surface.',
};

let destionationHotspots = {
    'Asia': 'Bali, Indonesia',
    'The Alps': 'Lucerne, Switzerland',
    'North America': 'Times Square, New York City',
    'Central America': 'Barrier Reef, Belize',
    'South America': 'Angel Falls, Venezuela',
    'Europe': 'Santorini, Greece',
    'Caribbean': 'Havana',
    'Indian Ocean': 'Seychelles'
}


$(document).ready(function () {
    let destinationName = localStorage.getItem('destination');

    $("#destination-name").text(destinationName);
    $("#destination-description").text(destinations[destinationName]);

    let imageSource = "img/destinations/" + destinationName.toLowerCase().replace(' ', '-');

    if (imageSource === "indian-ocean") {
        imageSource += '.webp';
    } else {
        imageSource += '.jpg';
    }

    console.log(imageSource);

    $(".destination-hero-image").attr('src', imageSource);

    $('#destination-location').text(destionationHotspots[destinationName]);

});