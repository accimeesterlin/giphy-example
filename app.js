/*
    WARNING: Just a demo
    - Input for the search bar (Completed)
    - Once click the search button, clears the input (Completed)
    - Disable the browser default behavior for the forms (Completed)
    - Once click search button, add a button (Completed)
    - User should be able to search giphy into our app once click search button (Completed)
    - Display Giphy into our app (Completed)
    - Once user click added button, search giphy for button name (Completed)
    - Every time user search a giphy, add it as a button for future reference. (Completed)
    - Once click on any giphy, then play it or pause it if it was already playing (Completed)
*/


// Create button
function addButton(text) {
    var button = $('<button>');
    button.html(text);
    return button;
};

// Create image with 4 html attributes - src, data-animated, data-still, data-state
function createImage(url, still, animated) {
    var image = $('<img>');
    image.attr({
        src: url,
        'data-animated': animated,
        'data-still': still,
        'data-state': 'still'
    });
    return image;
};

// Prepend Giphy into the DOM
function displayGiphy(response) {
    $('.giphy__images').empty(); // remove images for new images to be added
    var data = response.data;

    for (var i = 0; i < data.length; i++) {
        var animated = data[i].images.fixed_height.url;
        var still = data[i].images.fixed_height_still.url;
        var url = still;

        $('.giphy__images').prepend(createImage(url, still, animated));
    }
};

// Consume the Gyphy API
function grabGiphy(val) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?api_key=25M6AUpMu4QVl6CarZO1lGC6p2aHbT60&q=' + val,
            method: 'GET'
        })
        .done(function (data) {
            console.log('Data: ', data);
            displayGiphy(data);
        })
        .fail(function (error) {
            console.log('error: ', error);
            alert('Sorry, come back later');
        });
};

// Search Giphy once click on the search button
function searchGiphy(event) {
    event.preventDefault();
    var value = $('#search').val();
    $('.giphy__buttons').append(addButton(value));
    grabGiphy(value);
    $('#search').val('');

};

// Search Giphy once click on any generated button
function searchGiphyByButton() {
    var name = $(this).html();
    grabGiphy(name);
    console.log('Name: ', name);
};

// Play Giphy once click on any Giphy
function playGiphy() {
    var still = $(this).attr('data-still');
    var animated = $(this).attr('data-animated');
    var state = $(this).attr('data-state');

    if (state === 'still') {
        // Play Image
        $(this).attr({
            'data-state': 'play',
            src: animated
        });
    } else {
        // Pause image
        $(this).attr({
            'data-state': 'still',
            src: still
        });
    }
};

// Main Features
$('.giphy__search').on('click', searchGiphy);
$(document).on('click', '.giphy__buttons button', searchGiphyByButton);
$(document).on('click', 'img', playGiphy);



/*
    Notes: 

    3 states
        Fulfilled = Yupeee, we got the data
        Rejected = Oops, no data
        Pending = In progress

        console.log('is jQuery Loaded?', $);


        Documentation
        Data Structure

        Promises
            Asynchronous (Optional)

        Rejected
        Fulfill

        .then()
        .catch()



        $.ajax({
            url: 'https://jsoplaceholder.typicode.com/users',
            method: 'GET'
        })
        .done(function(data) {
            console.log('Data: ', data);
            alert('Yes we got data');
        })
        .fail(function(err) {
            console.log('Error: ', err);
            alert('Fail getting data');
        });

        fetch('https://jsonplaceholder.typicode.com/users') // promise
            .then(function (response) {
                return response.json(); // format
            })
            .then(function (data) {
                console.log('Data: ', data);
            })
            .catch(function (err) {
                console.log('Error: ', err);
            }) // One line to get the data

        XML
        JSON = { }



        Best Practices
        Resuable Code
        Maintainable Code


        API
        XMLHttpRequest
        Fetch

        Ajax
        $.getJSON()
        Axios (Node.js)
        Request


*/