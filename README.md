# NearCircleApp
The objective of this master project is to develop a web-application called “NearCircle” specifically created for the people staying in the rented communities or apartments to strengthen their social connection within their own neighborhood. As tenants, its challenging to meet new people or find people from your own community and make friends when you have just moved into a new apartment specially in a new country and making a move virtually is much easier than knocking the doors physically.
NearCircle is an application that apartment residents can use to find out who lives nearby, what community or age group they belong to, what their hobbies are, add them as friends and share posts with them. This application will allow users to register as apartment property managers and tenants. In essence, it’s a tool to explore your immediate circle.

# Development Environment
Software Tools
Coding Platforms-Visual Studio Code -version 1.77.3, IntelliJ IDEA Community-version 2022.3.2
Libraries-Node.js -version18.13.0, Npm-version 9.4.2, JDK 11
Command Line Tool-Angular CLI-version 15.1.6
Database-MySQL-version 8.0
Frameworks-JAVA Spring Boot Microservices, Angular
Browser-Google Chrome, Mozilla Firefox
Hardware
Operating System-Windows 10 (64 bit)
Processor-Intel Core i7 or Higher
RAM-8GB
Hard Disk-20 GB or above

# Operational Environment
Software Libraries
Node.js -version18.13.0
Npm-version 9.4.2
JDK 11
Database-MySQL-version 8.0
Browser-Google Chrome, Mozilla Firefox
Hardware
Operating System-Windows 10 (64 bit)
Processor-Intel Core i7 or Higher
RAM-16GB
Hard Disk-320 GB or above


# Installation Instructions
To install the software system, follow these steps:
1.	Install Node.js version18.13.0.
2.	Install Npm version 9.4.2.
3.	Install the Angular CLI version 15.1.6.
4.	Install JDK 11 and ensure the bin path is set as JAVA_HOME in the  system environment variables.
5.	Install MySQL 8.0 and create a clean database with name nearcircle_db and credentials root/root.
6.	Download the source code files for the NearCircle Application from below location: https://github.com/P-R-I-16/NearCircleApp.git
7.	Open a command prompt and navigate to the directory where the client side code files are located and run npm install
8.	Go inside the Near_Circle_Web root folder and run ng serve command to start the application client.
9.	To start the backend services go inside the server side code Near_Circle_Server\Near Circle_Eureka_Service folder in the command prompt and run java -jar server-0.0.1-SNAPSHOT.jar to start the Eureka server.
10.	Then go inside the Near_Circle_Server\Near Circle_service in the command prompt and run java -jar Near-Circle_Service-0.0.1-SNAPSHOT.jar command to start the NearCircleApplicationService.

 # Operating Instructions 
After the installation is done successfully, application client, eureka server and spring boot microservices are up then open the below application URL in the browser and the app’s login page should be displayed.
App URL- http://localhost:4200/login
