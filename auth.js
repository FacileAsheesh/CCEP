
let accessToken;
var tid , sLoggedInUserName ,LoggedInUserId;

$(document).ready(function () {
  
});
var mywindow;
function requestConsent() {
    
    getToken()
        .then(data => {
            alert("Test")
        $("#consent").hide();
        $("#divError").hide();
        accessToken = data.accessToken;
           // microsoftTeams.getContext((context) => {
                //alert("team Role :" + context.userTeamRole);
                //getUserRole(context.userPrincipalName);
                var tid = context.tid;
                tid = tid.slice(24, 36) + "_accesstokentime";
                var currentDate = new Date();
                var formattecurrentDate = currentDate.toLocaleString(['en-US'], { hour12: true });
                localStorage.setItem(tid, formattecurrentDate);
                localStorage.setItem("AccesTokenTime",formattecurrentDate);
                $("#lilnkLogin").hide();
            if (context.userTeamRole == "0") {
                $("#liLnkConfigure").show();
                $("#liLnkRefresh").show();
            }
            else {
                $("#liLnkConfigure").hide();
                $("#liLnkRefresh").hide();
            }
        });
    //});
}

function getToken() {
    return new Promise((resolve, reject) => {
        //mywindow = window.open(window.location.origin + "/AuthStart.html", "Azure Login", "location=1,status=1,scrollbars=1,width=350,height=340");
        var w = 450, h = 450;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        mywindow = window.open(window.location.origin + "/AuthStart.html", "Azure Login", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    });

   
}
function Success() {
    GetAzureToken();
}

function GetAzureToken() {
  
    var etcode = localStorage.getItem('et_code')
    var settings = {
        "url": "https://envirotrakapi.azurewebsites.net/api/AzureToken",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "x-functions-key": "k0LRVnEqAPlNb/UZrKyLHsK6FWh1qqJ108scaq0VX64IYuCB3eBg==",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(
            {
                "grant_type": "authorization_code",
                "code": etcode,
                "client_id": localStorage.getItem("REACT_APP_client_id"),
                "userId": "eefff682-c1a4-4290-a86d-bd760bef0130",
                "userEmail": "asheesh@facileconsulting.com",
                "tenantId": "f50d7f47-bec5-46dd-9eb0-e2a38d7689dc",
                "redirect_uri": window.location.origin + "/AuthEnd.html"
                , "client_secret": localStorage.getItem("REACT_APP_client_secret")
            }


        ),
    };
    
    $.ajax(settings).done(function (response) {
        var res = JSON.parse(response);
       
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        localStorage.setItem("expires_in", res.expires_in);
        if (localStorage.getItem("reRoute") != null) {
            window.location.replace(localStorage.getItem("reRoute"));
        }
        else {
            window.location.replace("/home");
        }
       
        //getUser();
        //return 1;


    }).fail(function (data) {
       
        console.log(data);
    });
}





function getRefreshToken(clientSideToken) {
   
}

function IsValidJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


function getUser() {
        let graphUrl = "https://graph.microsoft.com/v1.0/me";
        $.ajax({
            url: graphUrl,
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"));
            },
            success: function (profile) {                
                var displayName = profile.displayName;
                // alert(displayName);
                console.log(displayName);
            },
            error: function () {
                console.log("Failed");
            },
            complete: function (data) {
            }
        });
    


}
