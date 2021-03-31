


$.get('http://localhost:3000/users', 
    function(data){
        data.forEach(el => {
            const userRow = document.createElement('tr');
            $("#user_table").append(userRow);

            const userId = document.createElement('td');
            $(userId).append(el.Id);
            $(userRow).append(userId);

            const userName = document.createElement('td');
            $(userName).append(el.Name);
            $(userRow).append(userName);

            const userRole = document.createElement('td');
            $(userRole).append(el.Role);
            $(userRow).append(userRole);

            const userStatus = document.createElement('td');
            $(userStatus).append(el.Status);
            $(userRow).append(userStatus);

            const userSitting = document.createElement('td');
            $(userSitting).append(`<a href="?del=${el.Id}">Delete</a>`);
            $(userRow).append(userSitting);
        })
    }
);
$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#user_table tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
