// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-essential").on("click", function(event) {
    var id = $(this).data("id");
    var newEssential = $(this).data("newessential");

    var newEssentialState = {
      essentials: newEssential
    };

    // Send the PUT request.
    $.ajax("/api/weddings/" + id, {
      type: "PUT",
      data: newEssentialState
    }).then(
      function() {
        console.log("changed item to", newEssential);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newItem = {
      name: $("#ca").val().trim(),
      essentials: $("[name=essentials]:checked").val().trim(),
      amount: $("#amount").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/weddings", {
      type: "POST",
      data: newItem
    }).then(
      function() {
        console.log("created new item");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

$(".delete-wedding").on("click", function(event) {
  var id = $(this).data("id");

  // Send the DELETE request.
  $.ajax("/api/weddings/" + id, {
    type: "DELETE"
  }).then(
    function() {
      console.log("deleted wedding", id);
      // Reload the page to get the updated list
      location.reload();
    }
  );
});
});
