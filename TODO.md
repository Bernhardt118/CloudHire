# TODO

## Client-side Solution - General (6 marks)
- [x] Login/Register functionality

## Client-side Solution - User (22 marks)
- [ ] Compulsory developer registration details
    - [ ] Unique Email address
    - [ ] Password 
    - [ ] User avatar (Default if not provided)
    - [ ] Programming Languages + Experience
- [ ] View available contracts as list (exclude blocked companies)
- [ ] Sort contracts by
    - [ ] Contract length
    - [ ] In office or remote
    - [ ] value of contract
    - [ ] Preferred Programming langauges for contract
    - [ ] Date contract was posted
- [ ] Edit profile details or delete account
- [ ] Search for companies and see contracts available from company
- [ ] Apply for an available contract
- [ ] Developers must be able to block companies
- [ ] Profile Page:
    - [ ] Preview profile as if company is viewing it
    - [ ] Show money made from contracts so far
    - [ ] View accepted contracts
    - [ ] show pending contracts

## Client-side Solution - Company (26 marks)
- [ ] Compulsory company registration details
    - [ ] Unique Company Name
    - [ ] Password
    - [ ] Company Logo
    - [ ] General Industry
- [ ] Create new contract with details:
    - [ ] Contract length
    - [ ] Contract Value (ZAR)
    - [ ] Contract description 
    - [ ] Preferred Programming languages
    - [ ] Location (just has to be between in office or remote)
    - [ ] Date of contract posted (should be done automatically) 
- [ ] Individual Contracts
    - [ ] See all developers that have applied for contract
    - [ ] Accept developer for contract
    - [ ] All other developers should be "denied" sutomatically once a developer has been accepted for the contract
    - [ ] When a developer is accepted automaticaaly update the status of the contract to closed
- [ ] Edit profle details or delete account
- [ ] Company Page
    - [ ] Preview profile as if developer is viewing it
    - [ ] Show money spent on closed contracts so far
    - [ ] View all contracts
    - [ ] Sort contracts by 
        - [ ] Open Contracts
        - [ ] Closed Contracts

## Back-end API (24 marks)
- [x] Login/Register routes that access database to validate information
- [x] Routs for CRUD (Create, Read, Update and delete) operations on:
    - [x] Users
    - [x] Companies
    - [x] Contracts
- [ ] Correct HTTP Methods used for routes (Error should be returned if the wrong http method is used)
    - [ ] GET
    - [ ] POST
    - [ ] PUT
    - [ ] DELETE
- [x] Sanitize database queries (ORM does this automatically)

## Databse Solution (10 marks)
- [x] Normalized tables 
    - [x] 1NF
    - [x] 2NF
- [ ] Hashed passwords (salt)
- [ ] User avatars are not stored in the database itself

## Report (15 marks)
- [ ] Introduction
- [ ] Overall Description
    - [ ] User case diagram
    - [ ] Data Modelling 
    - [ ] Operating Environment
- [ ] Solution
    - [ ] A high-level description of design patterns for client and API
    - [ ] The technology used with explanation of how it is implemented and why it was chosen

## Demo Video (10 marks)
- [ ] 10 minute video showing functionality code and summarizing the same content as in the report

## Bonus Marks (10 marks)
- [ ] Developer is able to block companies
    - [ ] Reflect in the visible list of contracts that the developer can see 
    - [ ] Only half the marks will be awarded if the list of visible contracts is not updated removing the blocked companies
- [ ] have a working email system that can:
    - [ ] verify your account registration with activation link 
    - [ ] recover a lost password
- [ ] Deploy the applicaton in the cloud
- [ ] Unit tests that run via a CI/CD System
- [ ] Users are able to ad their github and linkedin to their profile
- [ ] Developers are able to seta a status as "Open to contracts" or "Not accepting new contract offers" (Can use different wording) 
