# Url Shortener

This is my first project with the MEAN-Stack. \
I used it to learn the stack and try new things. \
It's a really basic application

## How its buildt

- MEAN Stack
    - MongoDB as Database
    - Express as API
    - Angular as Frontend
    - NodeJS as backend
- Bootstrap for styles
- Fontawesome for icons

## REST API Endpoints

| HTTP-Method | Endpoint | BODY x-www-form-urlencoded | Cookie | Description |
|---|---|---|---|---|
| **AUTH** |  |  |  |  |
| POST | /api/auth/register | username: string, password: string |  | register as new user |
| POST | /api/auth/login | username: string, password: string |  | login as registered user |
| POST | /api/auth/logout |  | authtoken | logout form user account |
| GET | /api/auth/user |  | authtoken | get data from current loggedin user |
| **URLS** |  |  |  |  |
| POST | /api/urls/ | url: string |  | create a shortend url |
| GET | /api/urls/:id |  |  | get a shortened url |
| GET | /api/urls/my |  | authtoken | get current loggedin users urls |
| DELETE | /api/urls/:id |  | authtoken | delete a url of a user (only when logged in as this user) |

## Functionality

### Submit URL as Guest

If you first join the webapp, you can insert a URL to the form.
When you press "Shorten", the url gets send to the backend, the backend replys with a new shortend URL.

![Inital website](./.img/1.png)

If you input a wrong URL format, this gets checked (by the front and the backend :)

![Inital website](./.img/2.png)

If everithing worked out, the website displays the new shortened URL.

![Inital website](./.img/3.png)


### Register

The path for the login screen is <url>/register.

Here you can register an account.

The requirements are  

Username: 3-16 chars \
Password: 12-1024 chars

![register](./.img/10.png)

### Login

The path for the login screen is <url>/login.

You can login with a registered account.

![login](./.img/8.png)

### Dashboard

If you successfully logged in with you user, you get directly sendt to your dashboard.\
Here you get a List with all your shortened urls. (if you created them while you where loggedin...).

Here you can delete the urls permanently too.

![login](./.img/9.png)

### API

Of course you can access the underlaying API barebone. \
Here i used POST-MAN.

**Register**

![login](./.img/7.png)

**Login**

![login](./.img/6.png)

**Create URL (as loggedin user)**

![login](./.img/4.png)

**Get a URL**

![login](./.img/5.png)

**Delete Url**

![login](./.img/13.png)

**Get current loggedin user data**

![login](./.img/11.png)

**Logout**

![login](./.img/12.png)

**Get current loggedin users urls**

![login](./.img/14.png)
