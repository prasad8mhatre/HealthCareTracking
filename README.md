This system is used for tracking real time ambulance/hospitals nearby area for faster health care facility.
User can get nearby ambulance/hospital information and can request for ambulance.
Ambulance location is broadcasted to server which is displayed on user mobile.
User can search for hospital as per his preferences. 

## Instructions to run locally

1) Clone repository and download npm packages 

```
git clone https://github.com/prasad8mhatre/HealthCareTracking
npm install
```

2) Launch mongod in one terminal then run server.js

````
mongod
node server.js
````

3) Open browser `http://localhost:3000/`

Special thanks to Ahmed Haque (afhaque@rice.edu) for his valuable work at https://github.com/scotch-io/mean-google-maps.
    
