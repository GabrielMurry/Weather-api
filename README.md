# Weather-api
API that allows you to retrieve temperature data live from nearly any location in the world. Instead of forcing you to input your latitude and longitude of your desired location, you only need to input your city/town. the API takes the city, uses a latitude and logitude API to retrieve the geographic location of the city, then retrieves weather details using the retrieved latitude and longitude.
## Endpoints
This API cosntains two endpoints.
1. First endpoint will return back the current temperature from nearly any location around the world. 
2. Second endpoint returns the forecasted temperatures for the next two weeks in nearly any location around the world. (index 0 is tomorrow, index 13 is 14 days from now).
## Required Parameters
The only required parameter is the weatherId which takes in a string of your city/town. Ex: "el-dorado-hills".
