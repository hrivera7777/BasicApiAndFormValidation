//form functions 
function checkPassword() {
    let pass1 = document.getElementById("exampleInputPassword1");
    let pass2 = document.getElementById("exampleInputPassword2");
    let checkLabel = document.getElementById("check");
    let submitButton = document.getElementById("submit");

    if (pass1.length != 0 && pass2.length != 0) {
        if (pass1.value != pass2.value) {
            pass2.style.color = 'red';
            checkLabel.hidden = false;
            checkLabel.style.color = "orange";
            submitButton.disabled = true;
        } else {
            pass2.style.color = 'green';
            checkLabel.hidden = true;
            submitButton.disabled = false;
        }
    }
}

function getCheckLegalAge() {
    let underLegalAge = document.getElementById("exampleRadio1");
    let legalAge = document.getElementById("exampleRadio2");
    let older = document.getElementById("older");

    if (underLegalAge.checked) {
        older.hidden = true;
    } else if (legalAge.checked) {
        older.hidden = false;
    } else {
        older.hidden = true;
    }
}

function verifiedLegalAge() {
    let dateString = document.getElementById("birthDate");
    let submitButton = document.getElementById("submit");
    illegalAge = document.getElementById("illegal");
    let age = getAge(dateString.value);
    if (age < 18) {
        illegalAge.hidden = false;
        illegalAge.style.color = "orange";
        submitButton.disabled = true;
    } else {
        illegalAge.hidden = true;
        submitButton.disabled = false;
    }
}

function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


//graph functions (api)
async function getData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function setGraph() {

    const nameMovies = ['Arcane', 'chernobyl', 'sex+education', 'blade+runner', 'queen\'s+gambit', 'stranger+things', 'one+piece', 'the+good+doctor', 'batman', 'spiderman', 'attack+on+titan'];

    const arrayMovies = await Promise.all(nameMovies.map(async(titleMovie) => {
        const dataMovie = await getData(`http://www.omdbapi.com/?apikey=505c5a63&t=${titleMovie}`);
        const { Title, imdbRating } = dataMovie;
        const Movie = { Title, imdbRating };
        return Movie;
    }))

    barGraph = document.getElementById('graph');
    let dataGraph = [

        {
            x: arrayMovies.map(({ Title }) => {
                return Title;
            }),

            y: arrayMovies.map(({ imdbRating }) => {
                return imdbRating;
            }),

            type: 'bar'

        }

    ];


    Plotly.newPlot(barGraph, dataGraph);


}