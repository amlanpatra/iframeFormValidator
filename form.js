$(document).ready(function () {
  $.getJSON(
    "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json",
    function (json) {
      $(json).each(function (i, val) {
        $("#country").append(new Option(val.name, val.name));
        //   console.log(val.name);
      });
      // console.log("Country parsing done");
    }
  );
});

$(document).ready(function () {
  $("#country").change(function () {
    var country = $("#country").val();
    $("#state").empty();
    $("#state").append(new Option("select", "select"));

    if (country != "select") {
      $.getJSON(
        "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json",
        function (json) {
          $(json).each(function (i, val) {
            if (val.name == country) {
              $(val.states).each(function (idx, stateName) {
                $("#state").append(new Option(stateName.name, stateName.name));
              });
              // console.log("state parsing done");
              return;
            }
          });
        }
      );
    }
  });
});

$(document).ready(function () {
  $("#submitForm").click(function (event) {
    event.preventDefault();
    validateData();
  });
});

function validateData() {
  const Result = new Object();

  if (!isValidName()) {
    Result.Name = new Object();
    Result.Name.error = "length should be between 4-10 characters";
  }

  if (!isValidContact()) {
    Result.ContactNumber = new Object();
    Result.ContactNumber.error = "Contact number should be of 10 digits";
  }

  //   email
  if ($("#email").val().length !== 0 && !isValidEmail()) {
    Result.Email = new Object();
    Result.Email.error = "Incorrect email address";
  }

  // country
  if ($("#country").val() == "select") {
    Result.Country = new Object();
    Result.Country.error = "Country is mandatory";
  }

  //   state
  if ($("#state").val() == "select") {
    Result.State = new Object();
    Result.State.error = "State is mandatory";
  }

  if (Object.keys(Result).length === 0) {
    Result.Success = "All fields are valid";
  }
  var res = JSON.stringify(Result);
  // console.log(res);

  window.parent.postMessage(res, "*");

  return res;
}

function testRegex(val, regex) {
  return regex.test(val);
}

function alertDate() {
  var date = new Date($("#dob").val());
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  alert([day, month, year].join("/"));
}

function isValidEmail() {
  return testRegex(
    $("#email").val(),
    new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
  );
}

function isValidContact() {
  //   contact validation
  return testRegex($("#contact").val(), new RegExp("^[0-9]{10}$"));
}

function isValidName() {
  return testRegex($("#name").val(), new RegExp("^[a-z A-Z]{4,10}$"));
}
