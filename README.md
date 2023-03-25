# URL Shortener

- [URL Shortener](#url-shortener)
  - [1 Description](#1-description)
    - [1.1 Libraries and Frameworks](#11-libraries-and-frameworks)
    - [1.2 Preview](#12-preview)
  - [2 Frontend](#2-frontend)
    - [2.1 /](#21-)
    - [2.2 /login](#22-login)
    - [2.3 /register](#23-register)
    - [2.4 /dashboard](#24-dashboard)
    - [2.5 /:id](#25-id)
    - [2.6 /view-url/:id](#26-view-urlid)
    - [2.7 /settings](#27-settings)
    - [2.8 /admin/dashboard](#28-admindashboard)
    - [2.9 /admin/view-user/:id](#29-adminview-userid)
  - [3 Backend](#3-backend)
    - [3.1 Auth](#31-auth)
      - [3.1.1 GET /loggedin](#311-get-loggedin)
      - [3.1.2 POST /login](#312-post-login)
      - [3.1.3 POST /register](#313-post-register)
    - [3.2 URLs](#32-urls)
      - [3.2.1 GET /:id](#321-get-id)
      - [3.2.2 GET /:id/stats](#322-get-idstats)
      - [3.2.3 GET /:id/accesslist](#323-get-idaccesslist)
      - [3.2.4 POST /](#324-post-)
      - [3.2.5 DELETE /:id](#325-delete-id)
    - [3.3 Users](#33-users)
      - [3.3.1 GET /](#331-get-)
      - [3.3.2 GET /:id](#332-get-id)
      - [3.2.3 GET /:id/urls](#323-get-idurls)
      - [3.3.4 PATCH /:id/password](#334-patch-idpassword)
      - [3.3.5 PATCH /:id/toggleadmin](#335-patch-idtoggleadmin)
      - [3.3.6 DELETE /:id](#336-delete-id)
      - [3.3.7 DELETE /:id/urls](#337-delete-idurls)
    - [3.4 Stats](#34-stats)
      - [3.4.1 GET /](#341-get-)



## 1 Description

### 1.1 Libraries and Frameworks

- MEAN Stack
    - [M]ongoDB as Database
    - [E]xpress as API
    - [A]ngular as Frontend
    - [N]odeJS as backend
- Bootstrap for css styles
- Fontawesome for icons

### 1.2 Preview

Video Link: https://www.youtube.com/watch?v=4TzxXNHSW2g

## 2 Frontend

### 2.1 /

![root](./.img/1.png)

### 2.2 /login

![login page](./.img/8.png)

### 2.3 /register

![register page](./.img/10.png)

### 2.4 /dashboard

![dashboard](./.img/9.png)

### 2.5 /:id

redirect to url

### 2.6 /view-url/:id

![view url](./.img/18.png)

### 2.7 /settings

![settings](./.img/15.png)

### 2.8 /admin/dashboard

![admin dashboard](./.img/16.png)

### 2.9 /admin/view-user/:id

![view user](./.img/17.png)

## 3 Backend

### 3.1 Auth

#### 3.1.1 GET /loggedin

Example request:

``` bash
curl -X GET us.local/api/v1/auth/loggedin \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

Example success response:

``` json
{
    "status": true,
    "message": "Successfully received the data of the currently loggedin user",
    "data": {
        "user": {
            "id": "6414ae5984ac522db3e31dd1",
            "username": "user",
            "isAdmin": false
        }
    }
}
```

#### 3.1.2 POST /login

Example request:

``` bash
curl -X POST us.local/api/v1/auth/login \
-d '{
    "username": "user",
    "password": "password"
    }'
```

Example success response:

``` json
{
    "status": true,
    "message": "Successfully loggedin.",
    "data": {
        "token": "ThiSiSABeaRerTok3n...",
        "user": {
            "id": "6414ae5984ac522db3e31dd1",
            "username": "user",
            "isAdmin": false
        }
    }
}
```

#### 3.1.3 POST /register

Example request:

``` bash
curl -X POST us.local/api/v1/auth/register \
-d '{
    "username": "user",
    "password": "password"
    }'
```

Example success response:

``` json
{
    "status": true,
    "message": "Successfully created the user \"user\".",
    "data": {
        "user": {
            "id": "63ee4d1addcb75d94f8a85d1",
            "username": "user",
            "isAdmin": false
        }
    }
}
```

### 3.2 URLs

#### 3.2.1 GET /:id

Example request:

``` bash
curl -X GET us.local/api/v1/urls/EOhCtWhoY
```

Example success response:

``` json
{
    "status": true,
    "message": "The url was found.",
    "data": {
        "url": {
            "id": "63ee4d1addcb75d94f8a85d1",
            "url": "https://hatbe.ch",
            "shorturl": "EOhCtWhoY",
            "date": 1679325770,
            "user": {
                "id": "63ee4d1addcb75d94f8a85d1",
                "username": "user",
                "isAdmin": false
            }
        }
    }
}
```

#### 3.2.2 GET /:id/stats

Example request:

``` bash
curl -X GET us.local/api/v1/urls/EOhCtWhoY/stats \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...'
```

Example success response:

``` json
{
    "status": true,
    "message": "stats of the url",
    "data": {
        "stats": {
            "clicked": 1
        },
        "url":{
            "id": "63ee4d1addcb75d94f8a85d1",
            "url": "https://hatbe.ch",
            "shorturl": "EOhCtWhoY",
            "date": 1679325770,
            "user": {
                "id":"63ee4d1addcb75d94f8a85d1",
                "username":"user",
                "isAdmin":false
            }
        }
    }
}
```

#### 3.2.3 GET /:id/accesslist

Example request:

``` bash
curl -X GET us.local/api/v1/urls/EOhCtWhoY/accesslist \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...'
```

Example success response:

``` json
{
    "status": true,
    "message": "accesslist of the url",
    "data": {
        "accesslist": [
            {
                "id": "63ee4d1addcb75d94f8a85d1",
                "url": "63ee4d1addcb75d94f8a85d1",
                "date": 1679325770,
                "ip": "localhost"
            }
        ],
        "url": {
            "id": "63ee4d1addcb75d94f8a85d1",
            "url": "https://hatbe.ch",
            "shorturl": "EOhCtWhoY",
            "date": 1679325770,
            "user": {
                "id": "63ee4d1addcb75d94f8a85d1",
                "username": "user",
                "isAdmin": false
            }
        },
        "pagination": {
            "page": 1,
            "maxPages": 1,
            "maxCount": 1,
            "hasLast": false,
            "hasNext": false,
            "limit": 7
        }
    }
}
```


#### 3.2.4 POST /

Example request:

``` bash
curl -X POST us.local/api/v1/urls \
-d '{
    "url": "https://hatbe.ch",
    }'
```

Example success response:

``` json
{
    "status": true,
    "message": "Successfully added the url to your account.",
    "data": {
        "url": {
            "id": "63ee4d1addcb75d94f8a85d1",
            "url": "https://hatbe.ch",
            "shorturl": "EOhCtWhoY",
            "date": 1679325770,
            "user": {
                "id": "63ee4d1addcb75d94f8a85d1",
                "username": "user",
                "isAdmin": false
            }
        }
    }
}
```

#### 3.2.5 DELETE /:id

Example request:

``` bash
curl -X DELETE us.local/api/v1/urls/EOhCtWhoY \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

Example success response:

``` json
{
    "status": true,
    "message": "ok"
}
```

### 3.3 Users

#### 3.3.1 GET /

Example request:

``` bash
curl -X GET us.local/api/v1/users \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

Example success response:

``` json
{
    "status": true,
    "message": "successfully fetched all users",
    "data": {
        "users": [
            {
                "id": "63ee4d1addcb75d94f8a85d1",
                "username": "user",
                "isAdmin": false
            },
        ],
        "pagination": {
            "page": 1,
            "maxPages": 1,
            "maxCount": 1,
            "hasLast": false,
            "hasNext": false,
            "limit": 7
        }
    }
}
```

#### 3.3.2 GET /:id

Example request:

``` bash
curl -X GET us.local/api/v1/users/63ee4d1addcb75d94f8a85d1 \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

Example success response:

``` json
{
    "status": true,
    "message": "The user was found.",
    "data": {
        "user": {
            "id": "63ee4d1addcb75d94f8a85d1",
            "username": "user",
            "isAdmin": false
        }
    }
}
```

#### 3.2.3 GET /:id/urls

Example request:

``` bash
curl -X GET us.local/api/v1/urls/EOhCtWhoY/urls \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...'
```

Example success response:

``` json
{
    "status": true,
    "message": "success",
    "data": {
        "urls": [
            {
                "id": "63ee4d1addcb75d94f8a85d1",
                "url": "https://hans.peter",
                "shorturl": "EOhCtWhoY",
                "date": 1679325770,
                "user": {
                    "id": "63ee4d1addcb75d94f8a85d1",
                    "username": "user",
                    "isAdmin": false
                }
            }
        ],
        "pagination": {
            "page": 1,
            "maxPages": 1,
            "maxCount": 1,
            "hasLast": false,
            "hasNext": false,
            "limit": 7
        }
    }
}
```

#### 3.3.4 PATCH /:id/password

Example request:

``` bash
curl -X PATCH us.local/api/v1/users/63ee4d1addcb75d94f8a85d1/password \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' \
-d '{
    "oldpassword": "password123"
    "newpassword": "password321",
    }'
```

Example success response:

``` json
{
    "status": true,
    "message": "Successully changed your password."
}
```

#### 3.3.5 PATCH /:id/toggleadmin

Example request:

``` bash
curl -X PATCH us.local/api/v1/users/63ee4d1addcb75d94f8a85d1/toggleadmin \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

Example success response:

``` json
{
    "status": true,
    "message": "Successfully set admin state to true"
}
```

#### 3.3.6 DELETE /:id

Example request:

``` bash
curl -X DELETE us.local/api/v1/users/63ee4d1addcb75d94f8a85d1 \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

Example success response:

``` json
{
    "status": true,
    "message": "ok"
}
```

#### 3.3.7 DELETE /:id/urls

Example request:

``` bash
curl -X DELETE us.local/api/v1/users/63ee4d1addcb75d94f8a85d1/urls \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

Example success response:

``` json
{
    "status": true,
    "message": "ok"
}
```

### 3.4 Stats

#### 3.4.1 GET /

Example request:

``` bash
curl -X GET us.local/api/v1/stats \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

Example success response:

``` json
{
    "status": true,
    "message": "Successfully received stats.",
    "data": {
        "usersCount": 10,
        "urlsCount": 10,
        "urlsClicked": 10
    }
}
```







---

Last update: 21.03.23