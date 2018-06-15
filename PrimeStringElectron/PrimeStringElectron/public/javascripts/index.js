function getInfo() {
    var input = document.getElementById('input').value; // Gets value from input tag

    function afterDataCheck(err, data) { // After confirming the value is good or not
        if (err) { // if value is bad
            console.log(err);
            alert(err);
            document.getElementById('input').value = '';
        } else { // If value is good
            nextFunction(data);
        }
    }

    function nextFunction(data) { // find prime numbers and get 5 digit code
        var primeString = GetPrimeString();
        var id = GetID(data, primeString);

        document.getElementById('output').value = id; // convert string to int
    }
    checkData(input, afterDataCheck);
}

function checkData(value, callback) { // Confirm that a value is in range
    if (value > 1000 || value <= 0) {
        callback(value + ' is invalid, please enter a number between 1 and 1,000', null); // callback with error
    } else {
        callback(null, value); // callback no error
    }
}

function GetPrimeString() {
    var notPrime = 0;
    var primeString = '';

    for (i = 2; i <= 1993; i++) { // Had a while loop to find the value of 1993, caused the code to run slow
        notPrime = 0;

        for (j = 2; j < i; j++) { // Find numbers to divide by itself

            if (i % j === 0) { // if number is whole, the number is not prime
                notPrime++;
            }
        }

        if (notPrime == 0) { // check if prime
            primeString += i;
        }
    }

    return primeString;
}

function GetID(input, primeString) {
    input--;

    var id = parseInt(primeString.substring(input, input + 5));
    return id;
}

$(document).keyup(function (e) { // make sure the data is valid without needing to send it into function
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 13 || e.keyCode === 8) { // allowed keys to be entered
        $('#error').text('');

        if (e.keyCode === 8) {
            $('#input').val($('#input').val().substring(0, $('#input').val().length - 1));
        }

        if (e.keyCode === 13) {
            getInfo();
        }

        if ($('#input').val() > 1000 || $('#input').val() <= 0) { // if value is out of range
            if ($('#input').val() == '') {
                $('#output').val('');
                $('#error').text('');
            } else {
                $('#error').text($('#input').val() + ' is invalid, please enter a number between 1 and 1,000');
                $('#input').val('');
                $('#output').val('');
            }            
        } else { // value is in range
            getInfo();
        }

    } else { // not a valid key
        $('#error').text('Please enter a valid key');
        $('#input').val('');
        $('#output').val('');
    }    
});