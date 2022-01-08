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
         var access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJodHRwczovL2ZydC1laHIuZmhpci5henVyZWhlYWx0aGNhcmVhcGlzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzY2YzM1MzJkLTA3M2EtNGYzZS1hYzIwLTdkNWRjNGEzZTgzMy8iLCJpYXQiOjE2NDE2NTI0NjEsIm5iZiI6MTY0MTY1MjQ2MSwiZXhwIjoxNjQxNjU2MzYxLCJhaW8iOiJFMlpnWURobVBVWEJKTmlIdGUyMnpKMklwMldsQUE9PSIsImFwcGlkIjoiZDIwNDhmNWQtMWFhNC00ODU1LWE1MjMtY2QwMDdlMDA1ZWE3IiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjZjMzUzMmQtMDczYS00ZjNlLWFjMjAtN2Q1ZGM0YTNlODMzLyIsIm9pZCI6IjVlN2NlNDU5LWNhYWQtNGIzMi1hNGMzLTE0YzQwMmRjYWY1NyIsInJoIjoiMC5BV1FBTFZQRFpqb0hQay1zSUgxZHhLUG9NMTJQQk5La0dsVklwU1BOQUg0QVhxZGtBQUEuIiwic3ViIjoiNWU3Y2U0NTktY2FhZC00YjMyLWE0YzMtMTRjNDAyZGNhZjU3IiwidGlkIjoiNjZjMzUzMmQtMDczYS00ZjNlLWFjMjAtN2Q1ZGM0YTNlODMzIiwidXRpIjoieVViWUVhSGZlME95OXBSazZ0YklBUSIsInZlciI6IjEuMCJ9.SBS-t1WtHLSmFsET0IJCE_KMtIglD0nl-R2E0gq0eO_K8VixKyGCfU6QG7OmUjgTFZxlXjoDqxlXE9GcBFgs4Z6OW_GgtU4ISf6_bh4jn_aI4mz43QXNrKKmTG2iPH5Q_0OzeVCg3kJDbi8vdbblFORXzvoRYC9zIKWvoO1ngsBI_rgRLJpAFr2aSvzcj6W-7Za6aHYihFDJNaFay-asARtDeDATPgVahbTNiOcRmvTZzxDFz6uuf2IC8A2admWnZo1T1y0x6pVs-paIJeTTNK0UhtDXJAV23wXRKXzQIplbeUGFq01IAMA59OHPvCFe8kTSAbNV9oO7MYReU50jXA";
   
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
