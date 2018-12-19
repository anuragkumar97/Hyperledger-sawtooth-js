# Hyperledger-sawtooth-js

#To run this project:
-Step-1:
  - Install docker and docker-compose in your system
  - Run sawtooth.yaml file in terminal by running "docker-compose -f sawtooth.yaml up"
  
-Step-2:
   -run the following commands by navigating to expense-manager-transaction-processor
      -npm install 
      -node index.js
  
-Step-3:
   -run the following commands by navigating to expense-manager-service
      - npm instal
      - node server.js
   
 -Now try to hit the api(http://localhost:3000/submit-transaction) using postman, send name ,address and phone in request body.
 -Goto browser and run http://localhost:8080/batches, You will see all the transaction hashes there


# Now You are ready to go ,Update this code according to your requirement.
 
