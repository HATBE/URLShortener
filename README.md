# URL Shortener

- [URL Shortener](#url-shortener)
  - [1 Description](#1-description)
    - [1.1 Libraries and Frameworks](#11-libraries-and-frameworks)
  - [1.2 Frontend](#12-frontend)
    - [1.2.1 /](#121-)
    - [1.2.2 /login](#122-login)
    - [1.2.3 /register](#123-register)
    - [1.2.4 /dashboard](#124-dashboard)
    - [1.2.5 /:id](#125-id)
    - [1.2.6 /view-url/:id](#126-view-urlid)
    - [1.2.7 /settings](#127-settings)
    - [1.2.8 /admin/dashboard](#128-admindashboard)
    - [1.2.9 /admin/view-user/:id](#129-adminview-userid)
  - [1.3 Backend](#13-backend)
    - [1.3.1 Auth](#131-auth)
      - [1.3.1.1 GET /loggedin](#1311-get-loggedin)
      - [1.3.1.2 POST /login](#1312-post-login)
      - [1.3.1.3 POST /register](#1313-post-register)
    - [1.3.2 URLs](#132-urls)
      - [1.3.2.1 GET /:id](#1321-get-id)
      - [1.3.2.2 GET /:id/stats](#1322-get-idstats)
      - [1.3.2.3 GET /:id/accesslist](#1323-get-idaccesslist)
      - [1.3.2.4 GET /:id/urls](#1324-get-idurls)
      - [1.3.2.5 POST /](#1325-post-)
      - [1.3.2.6 DELETE /:id](#1326-delete-id)
    - [1.3.3 Users](#133-users)
      - [1.3.3.1 GET /](#1331-get-)
      - [1.3.3.2 GET /:id](#1332-get-id)
      - [1.3.3.3 PATCH /:id/password](#1333-patch-idpassword)
      - [1.3.3.4 PATCH /:id/toggleadmin](#1334-patch-idtoggleadmin)
      - [1.3.3.5 DELETE /:id](#1335-delete-id)
      - [1.3.3.6 DELETE /:id/urls](#1336-delete-idurls)
    - [1.3.4 Stats](#134-stats)
      - [1.3.4.1 GET /](#1341-get-)


## 1 Description

### 1.1 Libraries and Frameworks

- MEAN Stack
    - [M]ongoDB as Database
    - [E]xpress as API
    - [A]ngular as Frontend
    - [N]odeJS as backend
- Bootstrap for css styles
- Fontawesome for icons

## 1.2 Frontend

### 1.2.1 /

![root](./.img/1.png)

### 1.2.2 /login

![login page](./.img/8.png)

### 1.2.3 /register

![register page](./.img/10.png)

### 1.2.4 /dashboard

![dashboard](./.img/9.png)

### 1.2.5 /:id

redirect to url

### 1.2.6 /view-url/:id

![view url](./.img/18.png)

### 1.2.7 /settings

![settings](./.img/15.png)

### 1.2.8 /admin/dashboard

![admin dashboard](./.img/16.png)

### 1.2.9 /admin/view-user/:id

![view user](./.img/17.png)

## 1.3 Backend

### 1.3.1 Auth

#### 1.3.1.1 GET /loggedin

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

#### 1.3.1.2 POST /login

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

#### 1.3.1.3 POST /register

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

### 1.3.2 URLs

#### 1.3.2.1 GET /:id

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

#### 1.3.2.2 GET /:id/stats

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

#### 1.3.2.3 GET /:id/accesslist

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


#### 1.3.2.4 POST /

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

#### 1.3.2.5 DELETE /:id

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

### 1.3.3 Users

#### 1.3.3.1 GET /

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

#### 1.3.3.2 GET /:id

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

#### 1.3.2.3 GET /:id/urls

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

#### 1.3.3.4 PATCH /:id/password

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

#### 1.3.3.5 PATCH /:id/toggleadmin

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

#### 1.3.3.6 DELETE /:id

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

#### 1.3.3.7 DELETE /:id/urls

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

### 1.3.4 Stats

#### 1.3.4.1 GET /

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