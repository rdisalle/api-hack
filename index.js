'use strict';

//capitalize first letter of words in form
function toCaps(city_state) {
    return city_state.split(" ").map(capitalString => capitalString.charAt(0).toUpperCase() + capitalString.substring(1).toLowerCase()).join(" ");
  }

  $('input').on('keyup', function(event) {
    var capsThis = $(this);
    capsThis.val(toCaps(capsThis.val()));
}); 

//highlight input values on focus
    $('.highlight').focus(function(event) {
      $(this).select();
    });

//jump to section 
$(".jumper").on("click", function(currentTarget) {
    
    currentTarget.preventDefault();

    $("body, html").scrollTop(
        $($(this).attr('href')).offset().top);
});

//hide lists on submission
function hideLists(){
    $(".lists").hide();
};

//hide footer on submission
function hideFooter(){
    $("footer").hide();
};

//toggle section wiki
$("#button-1").click(function(){
    $("#results-list-1").toggle(0);
  });

//toggle section Weather
$("#button-2").click(function(){
    $("#results-list-2").toggle(0);
  });

//toggle section NYTimes
$("#button-3").click(function(){
    $("#results-list-3").toggle(0);
  });

//toggle section TicketMaster
$("#button-4").click(function(){
    $("#results-list-4").toggle(0);
  });

//generate a single string by joining array with & characters
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}
//generate city name 
function displayResultsCity(searchPlace) {
    $('#city_state').empty(); 
    $('#city_state').append(
        `<h1>${searchPlace}</h1>`)
    };

//show click boxes
function showClickBoxes() {
    $('#all_info_box').removeClass('hidden');
    $('.general').addClass('hidden');
}

//TicketMaster function
//creating TicketMaster url and API
const ticketMasterURL = 'https://app.ticketmaster.com/discovery/v2/events.json?size=10&sort=random'
const ticketMasterAPI = 'GmpHfhKq1QZLv3rtXtOMTOIME8PODRRQ'

//used to create final URL and taking that URL and inserting in fetch function
function getResultsTicketMaster(searchCity, searchState) {
    const params = {
        city: searchCity,
        stateCode: searchState,
        apikey: ticketMasterAPI
    };
    const queryString = formatQueryParams(params)
    const urlTicketMaster = ticketMasterURL + '&' + queryString;
    console.log(urlTicketMaster);

//used to fetch from TicketMaster API using URL created
    fetch(urlTicketMaster)
    .then(response => {
        if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
    })
    .then(responseJson => displayResultsTicketMaster(responseJson))
    .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

//display results
function displayResultsTicketMaster(responseJson) {
    console.log(responseJson);
    $('#results-list-4').empty();
        for (let i = 0; i < responseJson._embedded.events.length; i++) {
        $('#results-list-4').append(
            `<li class="underline">
            <p>${responseJson._embedded.events[i].name}</p>
            <p>${responseJson._embedded.events[i]._embedded.venues[0].name}</p>
            <p><a href=${responseJson._embedded.events[i].url}>Go to Event!</a></p>
            </li>`
            )};
            $('#results-4').removeClass('hidden');
}

//Weather function
//creating weather url and API
const weatherURL = 'https://api.weatherbit.io/v2.0/current?units=I'
const weatherAPI = '3eda105292b14442aae02159e1678109'

//used to create final URL and taking that URL and inserting in fetch function
function getResultsWeather(searchPlace) {
    const params = {
        city: searchPlace,
        key: weatherAPI,
    };
    const queryString = formatQueryParams(params)
    const urlWeather = weatherURL + '&' + queryString;
    console.log(urlWeather);

//used to fetch from Weather API using URL created
    fetch(urlWeather)
    .then(response => {
        if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
    })
    .then(responseJson => displayResultsWeather(responseJson))
    .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}
//display results
function displayResultsWeather(responseJson) {
    console.log(responseJson);
    $('#results-list-2').empty(); {
        $('#results-list-2').append(
            `<li>
            <p>Current Temp: ${responseJson.data[0].temp}°F</p>
            <p>Feels Like: ${responseJson.data[0].app_temp}°F</p>
            <p>Description: ${responseJson.data[0].weather.description}</p>
            <p>Wind Speed: ${responseJson.data[0].wind_spd} MPH ${responseJson.data[0].wind_cdir_full}</p>
            </li>`
            )};
            $('#results-2').removeClass('hidden');
}

//NYtimes function
//creating NYtimes URL and API
const nyTimesURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?docs=5&'
const nyTimesAPI = 'yOjK62GpKyeALx6cgD2mawvH5AGTB81D'

//used to create final URL and taking that URL and inserting in fetch function
function getResultsNYTimes(searchPlace) {
    const params = {
        q: searchPlace,
        'api-key': nyTimesAPI
    };
    const queryString = formatQueryParams(params)
    const urlNYTimes = nyTimesURL + '&' + queryString;
    console.log(urlNYTimes);

//used to fetch from NYTimes API using URL created
    fetch(urlNYTimes)
    .then(response => {
        if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
    })
    .then(responseJson => displayResultsNYTimes(responseJson))
    .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

//display results
function displayResultsNYTimes(responseJson) {
    console.log(responseJson);
    $('#results-list-3').empty();
        for (let i = 0; i < responseJson.response.docs.length; i++) {
            $('#results-list-3').append(
            `<li class="underline">
            <p>${responseJson.response.docs[i].headline.main}</p>
            <p><a href=${responseJson.response.docs[i].web_url}>Go to Article!</a></p>
            </li>`
            )};
            $('#results-3').removeClass('hidden');
}

//wiki function
//creating wikipedia URL variable
const wikiSearchURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&indexpageids&origin=*'

//used to create final URL and taking that URL and inserting in fetch function
function getResultsWiki(searchPlace) { 
    const params = {
        titles: searchPlace,
    };
    const queryString = formatQueryParams(params)
    const urlWiki = wikiSearchURL + '&' + queryString;
    console.log(urlWiki);
    
//used to fetch from Wiki API using URL created
    fetch(urlWiki)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        })
        .then(responseJson => displayResultsWiki(responseJson))
        .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}
//display results
function displayResultsWiki(responseJson) {
    console.log(responseJson);
    const pageId = responseJson.query.pageids[0];
    $('#results-list-1').empty(); {
        $('#results-list-1').append( 
            `<a href="https://en.wikipedia.org/wiki/${responseJson.query.pages[pageId].title}">Go to Page!</a>`
        );
        $('#results-list-1').append(
            `<li>
            <h3>${responseJson.query.pages[pageId].title}</h3>
            <p>${responseJson.query.pages[pageId].extract}</p>
            </li>`
            );
    $('#results-1').removeClass('hidden');}
}

//scroll down once submitted
    $("#click").click(function (){
        $('html, body').animate({
            scrollTop: $("#initial_feedback").offset().top
        }, 1000);
    });

//function used to wait for submission of form, store the data submitted in searchCity variable, and run getResults function with searchCity variable
function watchForm() {
    $('form').submit(event => { 
        event.preventDefault(); 
        const searchCity = $('#js-search-city').val();
        const searchState = $('#js-search-state').val();
        const searchPlace = (searchCity + ', ' + searchState);
        getResultsWiki(searchPlace);
        getResultsNYTimes(searchPlace);
        getResultsWeather(searchPlace); 
        getResultsTicketMaster(searchCity, searchState);
        displayResultsCity(searchPlace);
        showClickBoxes();
        hideLists();
        hideFooter();
    }); 
}

//used to run watchForm function upon page load
$(watchForm);

//'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&indexpageids&origin=*'