# io.Manager with Custom Authenticator Example

This example demonstrates how to customize io.Manager with a custom **authenticator** and a custom **groups service**.

We will also start a customized Admin UI and configure io.Connect Desktop to use a custom Login Screen.

* Note that for the simplicity of the example we will use tokens that encode the username; in a real world scenario you should leverage the auth flow to an identity platform.

## Customizing io.Manager Server

You can create a custom authenticator by implementing the `Authenticator` interface. The **authenticator** is responsible for authenticating the user.
Once you have implemented the **authenticator** you can pass it to the server intiatiozaion options.

After you don this each request to the server will goes through the custom **authenticator** that should authenticate/authorize the user. Usually the **authenticator** would use a 3-rd party lib to validate the request (by validating token, using sspi libs, etc); 

If successful the **authenticator** must return an object corresponding the user making the request. This object contains the user **id** and an array of **groups** that this user belongs to. Based on those groups the server determines the list of applications and layouts that should be returned to the user.

In this example the "token" passed to the server is simply the username encoded in the following format `user:<USERNAME>`; The list of initial users & groups are hardcoded [data.ts](./server/src/data.ts).
To start the example server follow the [instructions](./server/README.md) in the server folder.

## Adding a Custom Login Screen

io.Connect Desktop allows showing a login screen before the first application is loaded. This page should authenticate the user and signal io.Connect Desktop that the authentication process is complete. 

In this example the login page contains a single email field and produces a "token" based on the submitted email.

To start the example login page follow the [instructions](./login/README.md) in the server folder.

For more info on customizing the login screen check our docs [Login Screen](https://docs.interop.io/desktop/getting-started/how-to/rebrand-io-connect/functionality/index.html#login_screen).

## Configure io.Connect Desktop

You will then need to configure io.Connect Desktop to connect to the server and use the custom login screen.

To do this you should edit the *system.json* file of io.Connect Desktop located in *%LocalAppData%\interop.io\io.Connect Desktop\config*

**To connect to io.Manager Server:**
To configure io.Connect Desktop to connect to the example server, use the "server" top-level key. Add the following configuration to enable connection to the Glue42 Server:

```json
{
    // other configuration above
    // copy from here....
    "server": {
        "enabled": true,
        "url": "http://localhost:4356/api"
    }
     // ...to here
}
```

This will add the Server as an additional application store. If you want the Glue42 Server to be the only app store, set the "appStores" top-level key to an empty array.

This will also instruct io.Connect Desktop to store Layouts and Application Preferences on the Glue42 Server.

**To use a custom login screen:**
To enable the custom login screen, use the "ssoAuth" top-level key

```json
{
    // other configuration above
    // copy from here....
    "ssoAuth": {
        "authController": "sso",
        "options": {
            "url": "http://localhost:9123/",
            "window": {
                "width": 400,
                "height": 550,
                "mode": "flat"
            }
        }
    }
    // ...to here
}
```

**Remove any other appStores**
To remove the default app stores, set the "appStores" top-level key to an empty array.

```json
{
    // other configuration above
    // copy from here....
    "appStores": []
    // ...to here
}
```

## Protecting the Admin UI with the login page

Users that belong to a special group (**GLUE42_SERVER_ADMIN**) can access administrative APIs and therefore use the administrative UI.

In this example the Administrative UI is customized with a [custom **authenticator**](./admin-ui/src/auth.ts) that always produces a token with for a user that is part of that group.

In a real world scenario you would need to implement a real **authenticator** or define the administrative UI as an application in Glue42 and access it from there.

To start the Admin UI follow the [instructions](./admin-ui/README.md) in the admin-ui folder.


