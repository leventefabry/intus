# Intus
## Setup the project
Clone the project from Github. Navigate to the containing folder.
Both the FE and BE application need to run in order to test the application.

## Setup and run BE the app

> The BE app needs .NET 9 to run

Open up a Terminal in the containing folder.
Build the BE application first.

    dotnet build

Run the BE application with the following command:

    cd .\Web.Api\ && dotnet run


## Setup and run FE the app
Navigate to the client-app folder.
Install dependencies:

    npm i
Run the application:

    npm run dev
## Test the application
Open the following URL in your browser:

    http://localhost:5173/
