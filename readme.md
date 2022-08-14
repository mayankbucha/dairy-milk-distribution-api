# Dairy Milk Distribution API

Dairy distribution api - Kore.ai NodeJS challenge


## Building and running locally


### Step 1: Install Depedencies

```bash
# goto to dairy-milk-distributor directory
cd dairy-milk-distributor

# Install dependencies
npm install
```

### Step 2: Configure Environment

Add a .env file in the root directory containing the following variables:

```bash
# port number
PORT=3000

# mongodb url
MONGODB_URL=mongodb://127.0.0.1:27017/dairy-milk-distribution

# maximum milk distribution capacity of the day
MAX_CAPACITY=100
```

### Step 3: Start MongoDB server


### Step 4: Starting the server

```bash
npm run start
```


### Step 5: Visit the URL

Navigate to http://localhost:3000 for start of the API 


## Live demo:
[Live demo](https://mayank-dairy-distributor-api.herokuapp.com/)


# API

### GET /

Shows Welcome message


### POST /add

Adds the order. Required fields are: quantityInLiters and orderStatus.

Date is only allowed of the format MM-DD-YYYY


```bash

{
    "quantityInLiters": 12,
    "orderStatus": "dispatched"
}

```

Returns the order object:

```bash
{
    "quantityInLiters": 12,
    "orderStatus": "dispatched",
    "deliveryDate": "08-19-2022",
    "_id": "62f93bbcfbe753d80f67be84",
    "createdAt": "2022-08-14T18:15:24.756Z",
    "updatedAt": "2022-08-14T18:15:24.756Z",
    "__v": 0
}
```

### Patch /update/:id

Updates the order with the given id

```bash
{
    "quantityInLiters": "60"
}
```

Returns the updated order


### Patch /updateStatus/:id

updates the order status

```bash
{
    "orderStatus": "dispatched"
}
```


### Delete /delete/:id

Deletes the order with given id


### Get /checkCapacity/:date

Maximum capacity is 100 Liters

Date is only allowed of the format MM-DD-YYYY

Return the Remaining capacity of the dairy

```bash
{
    "remain": 51
}
```
