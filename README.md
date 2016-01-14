server.js (API)
This file can be used to run the server using Node.JS server. It requires the installation of
EXPRESS node package
UUID node package
Action for getting the version is implemented. With respect to the books API, create, update, and list 
And views are implemented. Server runs on 8081 port. 


index.html (F/E)
View and create was implemented. Time was not enough to implement update and Delete operations
Logic for implementing Delete operation
-Store UUID as a part of the every row in the table using JavaScript
-Add a column in the table carrying 'Delete Button'
-Bind the delete button to a delete function in the controller
-Controller's delete function makes AJAX to API with UUID to make a delete.
-In the Success Call back of the above AJAX, call the getBookList service again to refresh the data

Logic for implementing Update operation (route)
-Store UUID as a part of the every row in the table using JavaScript
-Add a column in the table carrying 'Update Button'
-Create a modify function that pop-up an overlay with the 3 fields in book. Use route in Angular 
-Add an submit button there in that route-frame
-bind the "modify" function with update function
-create and bind "update" function then bind it with submit button in overlay
-update function should take care of the AJAX calls.
