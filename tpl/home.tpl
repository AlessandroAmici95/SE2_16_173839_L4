<!DOCTYPE html>
<html>
   <head>
      <!-- Here goes the metadata -->  
      <meta charset="utf-8">
      <title> Node.js intro </title>
   </head>
   <body>

       <h1>Employee Manager</h1>
       <h2 color="red">(:message:)</h2>
	   <form id="searchEmployeeForm" method="POST">
		   <label>Insert an employee's ID </label>
		   <input type="text" name="employeeId"/>
		   <input type="submit" value="search employee" name="search"/>
		   <input type="submit" value="delete employee" name="delete"/>
	   </form>
	   <button id="toggleInsertEmployeeForm" onclick="toggleForm('insertEmployeeForm')">show/hide insert form</button>
	   
	   <form id="insertEmployeeForm" method="POST" style="display: none">
		   <label>ID</label>
		   <input type=text name="id" value="(: ID :)"/><br>
		   <label>Name</label>
		   <input type=text name="empname" value="(: name:)"/><br>
		   <label>Surname</label>
		   <input type=text name="surname" value="(: surname :)"/><br>
		   <label>Level</label>
		   <input type=text name="level" value="(: level :)"/><br>
		   <label>Salary</label>
		   <input type=text name="salary" value="(: salary:)"/><br>
		   <input type="submit" value="insert employee" name="insert"/>
	   </form>
       
    
	   <script src="/script/client_script1.js"></script>
    </body>
</html>