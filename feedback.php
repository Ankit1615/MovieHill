<?php

error_reporting(E_ALL & ~ E_NOTICE);

$servername = "localhost";
$username = "id12891733_root";
$password = "Ankit@06";
$db = "id12891733_email_verification";

$conn = mysqli_connect($servername, $username, $password, $db);

if(isset($_POST['submit']))
{

    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $hospital = $_POST['hospital'];
    $message = $_POST['message'];

    $sql = "INSERT INTO feedback(name, mobile, email , hospital,message)
    VALUES ('".$name."','".$mobile."','".$email."','".$hospital."','".$message."')";
    $result = mysqli_query($conn, $sql);
           if ($result)
           { 
                $flag = 1;
            }
            else
            {
                $flag = 0;       
            } 
               

}
                 ?>

         
                  

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="discription" content="HKM">
    <meta name="keyword" content="book bed">
    <title>Hospital Management system</title>
    <link rel="stylesheet" href="feedback.css">    
      <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
     <!--Import materialize.css-->
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <!--cdn of semantic ui-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.14/semantic.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <!--cdn for animate css-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.css" integrity="sha256-a2tobsqlbgLsWs7ZVUGgP5IvWZsx8bTNQpzsqCSm5mk=" crossorigin="anonymous" />
        <!--cdn for bootstrap-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <!--font awosome-->
        <script src="https://kit.fontawesome.com/67412fdba5.js" crossorigin="anonymous"></script>
</head>
<body >
    <!--header-->
        
        <nav>
            <div class="nav-wrapper">
              <a href="#!" class="brand-logo d-none  d-lg-block  d-xl-block ">Logo</a>
              <a href="#" data-target="mobile-demo" class="sidenav-trigger "><i class="material-icons">menu</i></a>
              <ul class="right hide-on-med-and-down">
                <li><a href="index.html">Home</a></li>
                <li><a href="badges.html">service</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="collapsible.html">emergency</a></li>                                
                <li><button><a href="">Login</a></button></li>
              </ul>
            </div>
          </nav>
      
         
          <ul class="sidenav" id="mobile-demo">
            <li><a href="index.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">Javascript</a></li>
            <li><a href="mobile.html">Mobile</a></li>
          </ul>      
          
          <div class="bg-img ">  
            <div class="container"> 
              <div class="content">
                 <p class="first_para " style="animation-duration: 2s;"> This is a complete solution that can be deployed and customized for any hospital or health care institution, providing your patients with the service they expect to find in state of the art medical institutions</p>                             
                 
              </div>        
              </div>
          </div>
         <div class="py-md-5 feed ">
           <div class="container">
          <div class="card ">
            <div class="card-header text-white " style="background-color: #5cc1e0;">
              <i class="far fa-comments fa-2x"></i><span class="ml-3" style="font-size: 20px;">Your reviews are important to us!</span>
            </div>
            <div class="row">
            <div class="col-md-6">
                <?php
                if($flag == 1)
                {
                   
               echo '<div class="alert alert-success mt-3 ml-2" role="alert">
                   Your Response has been Recorded Successfull 
                </div>';
                }
                   else
                    {
                    echo ' <div class="alert alert-danger mt-3 ml-2" role="alert">
                         Error to connect database
                        </div>';
                 
                 } 
                ?>
         
 
          <form action="feedback.php" method="POST" class="my-3 ml-3  form-group">
              Select Hospital <span style="color: red;">*</span>
              <select class="form-control my-2 mb-3 " id="exampleFormControlSelect1" name="hospital" >
              <option value="Select Your Hospital ">Select Your Option</option>
                <option value="AIIMS">AIIMS</option>
                <option value="APPLO">APPLO</option>
                <option value="KIMS">KIMS</option>
                <option value="DPS">DPS</option>
                <option value="Achariya Harihar Reginol Cancer Center,Cuttack,Odisha">Achariya Harihar Reginol Cancer Center,Cuttack,Odisha</option>
              </select>
              Name <span style="color: red;">*</span>
              <input type="text" class="mb-3 " name="name">                   
              Email <span style="color: red;">*</span>              
                <input type="email" class="form-control " name="email" id="exampleInputEmail1" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted mb-3">We'll never share your email with anyone else.</small>          
               Mobile no. <span style="color: red;">*</span>
               <input type="number" class="mb-3 " name="mobile"> 
               Message <span style="color: red;">*</span> 
               <textarea class="form-control mt-3 " name="message" id="exampleFormControlTextarea1" rows="6"></textarea>
               <input type="submit" name="submit" class="btn my-3 " style="background-color:#5cc1e0">                             
          </form>        
            </div>
            <div class="col-md-6 ">
            <img src="/image/feed1.png" height="100%" width="100%" alt="">
            </div>
          </div>
          </div>
         </div>
         </div>
          
      <div class="footer w-100 ">
        <div class="container">
        <div class="row">          
          <div class="col-6 col-md-6 col-lg-6 col-sm-6 copyright">            
              <p class="mt-3 mb-3" style="color: white;">© COPYRIGHT 2020, NIC. ALL RIGHTS RESERVED®.</p>
            </div>
            <div class="col-6 col-md-6 col-lg-6 col-sm-6 contact-us">            
              <p class="mt-3 mb-3">contact us</p>
              <div class="contact-content">
              <i class="fas fa-map-marker-alt  fa-1x"></i>
              <span class="ml-2">ankit yadav Pvt.Ltd.</span><br>
              <span >mairwa,siwan,bihar 841239</span><br>
              <i class="fas fa-phone-alt fa-1x"></i>
              <span class="ml-2">+91-7001739196</span><br>
              <i class="far fa-envelope text-"></i>
              <span class="ml-2">ankityadav66666@gmail.com</span><br>
              <i class="fas fa-mobile-alt"></i>
              <span class="ml-2">+91-7001739196</span><br>
              <div class="contact-icon mt-3">
              <i class="fab fa-facebook" ></i>
              <i class="fab fa-google-plus"></i>
              <i class="fab fa-linkedin"></i>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
      
    
    
  
    <!--unwanted-->
    <!--jquiry cdn-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <!--cdn of javascript for semantic ui--> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.14/semantic.min.js"></script>
    <script src="main.js"></script>
</body>
</html>