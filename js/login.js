$(document).on("click", "#login", function(){
    
    $(".alert").css("display", "none");

    etnxUserData.method = 'login';
    etnxUserData.username = $("#email").val();
    etnxUserData.email = $("#email").val();
    etnxUserData.password = $("#password").val();

    MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((result) => {
        if(result){
            console.log(result); 
            var etnxpLogin = JSON.parse(result);
            if(etnxpLogin.status == "success"){
                etnxUserData.method = 'balance';
                MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((result) => {
                    if(result){
                        console.log(result); 
                        ModelViewController.setEtnxBalance(result);
                    }
                    initDone("etnx");
                });
            }
        }
        else
            loginFail();
    });
    
    etnxpUserData.method = 'login';
    etnxpUserData.username = $("#email").val();
    etnxpUserData.email = $("#email").val();
    etnxpUserData.password = $("#password").val();

    MobWallet.etnxpApi(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
        if(result){
            console.log(result); 
            var etnxpLogin = JSON.parse(result);
            if(etnxpLogin.status == "success"){
                etnxpUserData.method = 'balance';
                MobWallet.etnxpApi(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
                    if(result){
                        console.log(result); 
                        ModelViewController.setEtnxpBalance(result);
                    }
                    initDone("etnxp");
                });
            }
        }
        else
            loginFail();
    });
});

function initDone(coinName, result){
    
    loginSuccess();

    setTimeout(function() { 
            $.event.trigger({
                type: "init.done",
                coin: coinName
            });
    }, 250);
}

function loginFail(){
    $(".alert-danger").css("display", "block");
}

function loginSuccess(){
    $(".alert-success").css("display", "block");
}
