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

``` bash
curl -X GET us.local/api/v1/auth/loggedin \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

#### 1.3.1.2 POST /login

``` bash
curl -X POST us.local/api/v1/auth/login \
-d '{
    "username": "user",
    "password": "password"
    }'
```

#### 1.3.1.3 POST /register

``` bash
curl -X POST us.local/api/v1/auth/register \
-d '{
    "username": "user",
    "password": "password"
    }'
```

### 1.3.2 URLs

#### 1.3.2.1 GET /:id

``` bash
curl -X GET us.local/api/v1/urls/EOhCtWhoY
```

#### 1.3.2.2 GET /:id/stats

``` bash
curl -X GET us.local/api/v1/urls/EOhCtWhoY/stats \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...'
```

#### 1.3.2.3 GET /:id/accesslist

``` bash
curl -X GET us.local/api/v1/urls/EOhCtWhoY/accesslist \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...'
```

#### 1.3.2.4 GET /:id/urls

``` bash
curl -X GET us.local/api/v1/urls/EOhCtWhoY/urls \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...'
```

#### 1.3.2.5 POST /

``` bash
curl -X POST us.local/api/v1/urls \
-d '{
    "url": "https://hatbe.ch",
    }'
```

#### 1.3.2.6 DELETE /:id

``` bash
curl -X DELETE us.local/api/v1/urls/EOhCtWhoY \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

### 1.3.3 Users

#### 1.3.3.1 GET /

``` bash
curl -X GET us.local/api/v1/users \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

#### 1.3.3.2 GET /:id

``` bash
curl -X GET us.local/api/v1/users/63ee4d1addcb75d94f8a85d1 \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

#### 1.3.3.3 PATCH /:id/password

``` bash
curl -X PATCH us.local/api/v1/users/63ee4d1addcb75d94f8a85d1/password \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' \
-d '{
    "oldpassword": "password123"
    "newpassword": "password321",
    }'
```

#### 1.3.3.4 PATCH /:id/toggleadmin

``` bash
curl -X PATCH us.local/api/v1/users/63ee4d1addcb75d94f8a85d1/toggleadmin \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

#### 1.3.3.5 DELETE /:id

``` bash
curl -X DELETE us.local/api/v1/users/63ee4d1addcb75d94f8a85d1 \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

#### 1.3.3.6 DELETE /:id/urls

``` bash
curl -X DELETE us.local/api/v1/users/63ee4d1addcb75d94f8a85d1/urls \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```

### 1.3.4 Stats

#### 1.3.4.1 GET /

``` bash
curl -X GET us.local/api/v1/stats \
-H 'Authorization: Bearer ThiSiSABeaRerTok3n...' 
```