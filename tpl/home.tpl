<!DOCTYPE html>
<html>
   <head>
      <!-- Here goes the metadata -->  
      <meta charset="utf-8">
      <title> Node.js intro </title>
   </head>
   <body>
       
       <h1>(:name:)</h1>
       <b>(:surname:) - (:level:)</b>
    
    <br>
       
    (:if[resident] ~
        [:then ~ <font color="green"> sei residente </font> :]
        [:else ~ <font color="red"> non sei residente</font> :]
    :)
       
    </body>
</html>