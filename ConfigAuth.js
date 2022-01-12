class ConfigAuth {
    constructor() {
    }

    getFhirServerUrl(callback) {
        var authConfig = this;

        if (authConfig.fhirServerUrl) {
            callback(authConfig.fhirServerUrl);
        }
        else {
            $.getJSON('/config.json', function (data, status) {
                authConfig.fhirServerUrl = data.FhirServerUrl;
                callback(authConfig.fhirServerUrl);
            });
             
        }
    }

    getSmartOnFhirApps(callback) {
        var authConfig = this;

        authConfig.getFhirServerUrl(function (fhirServerUrl) {
            if (authConfig.smartOnFhirApps) {
                callback(fhirServerUrl, authConfig.smartOnFhirApps);
            }
            else {
                $.getJSON('/config.json', function (data, status) {
                    authConfig.smartOnFhirApps = data.SmartOnFhirApps;
                    callback(fhirServerUrl, authConfig.smartOnFhirApps);
                });
            }
        });
    }


    getAccessToken(callback) {
        var authConfig = this;
         var access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJodHRwczovL2ZydC1laHIuZmhpci5henVyZWhlYWx0aGNhcmVhcGlzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzY2YzM1MzJkLTA3M2EtNGYzZS1hYzIwLTdkNWRjNGEzZTgzMy8iLCJpYXQiOjE2NDE5NzIzODQsIm5iZiI6MTY0MTk3MjM4NCwiZXhwIjoxNjQxOTc4MDc0LCJhY3IiOiIxIiwiYWlvIjoiQVVRQXUvOFRBQUFBUy90TkZjWTlNcWVzazl1cTZ6ZW12aFM0OXBrS0tzRldPdTJxZVk4NVJyS0d3Q2JrVi9xT0MvakZVQTduRHpuT09vMi96RUFWQkExNGlMNlplc3J0dVE9PSIsImFsdHNlY2lkIjoiMTpsaXZlLmNvbTowMDAzNDAwMUZGODQ1QURCIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6ImQyMDQ4ZjVkLTFhYTQtNDg1NS1hNTIzLWNkMDA3ZTAwNWVhNyIsImFwcGlkYWNyIjoiMCIsImVtYWlsIjoiamFtYXIxNDEwQGdtYWlsLmNvbSIsImZhbWlseV9uYW1lIjoiamhhIiwiZ2l2ZW5fbmFtZSI6IkFtYXIiLCJpZHAiOiJsaXZlLmNvbSIsImlwYWRkciI6IjEwMy4xOTguOTkuMjA5IiwibmFtZSI6IkFtYXIgSmhhIiwib2lkIjoiMGQzODE3NTQtYzY2My00YzRiLWI1OGEtMTkxMDEzMjEwOGZjIiwicHVpZCI6IjEwMDMyMDAwRDc5QUUwREIiLCJyaCI6IjAuQVdRQUxWUERaam9IUGstc0lIMWR4S1BvTTEyUEJOS2tHbFZJcFNQTkFINEFYcWRrQU1BLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6Il9LRDNwcTNiNGZ5V1ZEeW52NFhfZGZXQWJqZW9HNVc0MGNpRzFBUVNiZ1UiLCJ0aWQiOiI2NmMzNTMyZC0wNzNhLTRmM2UtYWMyMC03ZDVkYzRhM2U4MzMiLCJ1bmlxdWVfbmFtZSI6ImxpdmUuY29tI2phbWFyMTQxMEBnbWFpbC5jb20iLCJ1dGkiOiJVQkY3dWFtN21rdUhTTGJvOXpSZEFBIiwidmVyIjoiMS4wIn0.Is-dsDNaMEqGZb70ZffC6c_Dk8FbhxJNeejiV99zWobShFsM29klvpku31Nweb5Kyi9DFRmEYOj7xwf-854zUGbzReijb4N6eos6NS_enBIBTXTRn2uCshtbpz6MYyPvU4yI7SI-5unASiUBC-DNQ3voG4W3gER5MkxScO_NyGpOTq3kguVtLxgUzO66ENVZIh-83pEph_UIgYLL7QZagTyamSfG0LI9TYBmK-9G5Ymj10fguNpTQ2nkascwt7O4nWOYpDVnR1hhsugG7BXqie9t1umnqePLO8hSVnZ2jHsgKJOawV28FLtWNeNeUjLFqRIEha7iiL6e4pmYLhusOg";
   
        callback(access_token);
     //   if (authConfig.authInfo && (new Date(authConfig.authInfo[0].expires_on) > new Date(Date.now() + 60000))) {
    //       callback(access_token);
     //   }
    //    else {
      //      authConfig.updateAuthInfo(function() {
       //         callback(access_token);
       //     });
      //  }
    }

    updateAuthInfo(callback)
    {
        var authConfig = this;
        authConfig.refreshTokens(function () {
            $.getJSON('/.auth/me', function (authData, status) {
                authConfig.authInfo = authData;
                callback();
            });
        });
    }

    refreshTokens(callback) {
        //Don't attempt to refresh token locally
        if (window.location.hostname.indexOf("localhost") != -1) {
            callback();
            return;
        }

        let refreshUrl = "/.auth/refresh";
        $.ajax(refreshUrl)
            .done(function () {
                console.log("Token refresh completed successfully.");
                callback()
            })
            .fail(function () {
                console.log("Token refresh failed. See application logs for details.");
            });
    }
    
    getFhirServerAccessInfo(callback) {
        var authConfig = this;
        authConfig.getFhirServerUrl(function (fhirServerUrl) {
            authConfig.getAccessToken(function (accessToken) {
                callback(fhirServerUrl, accessToken);
            })
        });
    }

    getUserId(callback)
    {
        var authConfig = this;
        if (authConfig.authInfo)
        {
            callback(authConfig.authInfo[0].user_id);
        }
        else
        {
            authConfig.updateAuthInfo(function() {
                callback(authConfig.authInfo[0].user_id);
            });
        }
    }

    getAboutMeInfo(callback)
    {
        var configAuth = this;
        configAuth.getUserId(function(userId){
            configAuth.getFhirServerAccessInfo(function(fhirServerUrl, accessToken){
                callback(userId, fhirServerUrl, accessToken);
            });
        });
    }
}
