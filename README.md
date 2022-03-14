# Glue42 Server Example

This example demonstrates how to customize Glue42 Server with a custom **authenticator** and a custom **groups servoce** object.

We will also start a customized Admin UI and configure Glue42 Enterprise to use a custom login page.

* Note that for the simplicity of the example we will use tokens that encode the username; in a real world scenario you should leverage the auth flow to an identity platform.

## Customized Glue42 Server

Each request to the server goes through the custom **authenticator** that should authenticate/authorize the user. Usually the **authenticator** would use a 3-rd party lib to validate the request (by validating token, using sspi libs, etc); 

If successful the **authenticator** must return an object corresponding the user making the request. This object contains the user **id** and an array of **groups** that this user belongs to. Based on those groups the server determines the list of applications and layouts that should be returned to the user.

In this example the "tokens" passed to the server are simply the username encoded in the following format `user:<USERNAME>`;

The list of initial users & groups are hardcoded in the example.

## Custom Login Screen

Glue42 Enterprise allows showing a login screen before the first application is loaded. This page should authenticate the user and signal Glue42 Enterprise that the authentication process is complete. 

In this example the login form will produce a "token" based on the submitted email.

For more info on customizing the login screen check our docs [Login Screen](https://docs.glue42.com/getting-started/how-to/rebrand-glue42/functionality/index.html#login_screen)
## Admin UI

Users that belong to a special group (**GLUE42_SERVER_ADMIN**) can access administrative APIs and therefore use the administrative UI.

In this example the Administrative UI is customized with a custom **authenticator** that always produces a token with for a user that is part of that group.

In a real world scenario you would need to implement a real **authenticator** or define the administrative UI as an application in Glue42 and access it from there.

## Configure Glue42 Enterprise

You will need to edit *system.json* file of Glue42 Enterprise located in *%LocalAppData%\Tick42\GlueDesktop\config*

### ... to connect to Glue42 Server
To configure Glue42 Enterprise to connect to the Glue42 Server, use the "server" top-level key. Add the following configuration to enable connection to the Glue42 Server:

```json
{
    "server": {
        "enabled": true,
        "url": "http://localhost:4356/api"
    }
}
```

This will add the Glue42 Server as an additional application store. If you want the Glue42 Server to be the only app store, set the "appStores" top-level key to an empty array.

This will also instruct Glue42 Enterprise to store Layouts and Application Preferences on the Glue42 Server.

### ... to use a custom login screen
To enable the custom login screen, use the "ssoAuth" top-level key

```json
{
    "ssoAuth": {
        "authController": "sso",
        "options": {
            "url": "http://localhost:9123/",
            "window": {
                "width": 500,
                "height": 650,
                "mode": "flat"
            }
        }
    }
}
```
