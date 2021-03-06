const url = 'http://localhost:5000'
    
var socket = io(url);
socket.on('connect', function() {
    console.log("connected")
});

function signup() {
    var userName = document.getElementById('name').value
    var userEmail = document.getElementById('email').value.toLowerCase()
    var userPhone = document.getElementById('phone').value
    var userPassword = document.getElementById('password').value
    axios({
            method: 'post',
            url: url + "/signup",
            data: {
                userName: userName,
                userEmail: userEmail,
                userPhone: userPhone,
                userPassword: userPassword
            },
            withCredentials: true

        })
        .then(function(response) {
            if (response.data.status === 200) {
                alert(response.data.message)
                location.href = "./login.html"
            } else {
                alert(response.data.message)
            }
        })
        .catch(function(error) {
            alert(error.response.data.message)
        });

    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("password").value = ""

    return false;
}

function login() {
    var loginEmail = document.getElementById('loginEmail').value
    var loginPassword = document.getElementById('loginPassword').value

    axios({
        method: 'post',
        url: url + '/login',
        data: {
            email: loginEmail,
            password: loginPassword
        },
        withCredentials: true
    })

    .then(function(response) {
            if (response.data.status === 200) {
                alert(response.data.message)
                location.href = "./home.html"
            } else {
                alert(response.data.message)
            }
        })
        .catch(function(error) {
            alert(error.response.data.message)
        });



    return false;


}

function forgetPassword() {
    var forgetEmail = document.getElementById('forgetEmail').value;
    localStorage.setItem("forgetEmail", forgetEmail);
    axios({
        method: 'post',
        url: url + '/forget-password',
        data: ({
            forgetEmail: forgetEmail
        }),
        credentials: 'include'


    }).then((response) => {
        console.log(response)
        if (response.data.status === 200) {
            alert(response.data.message)
            window.location.href = "./passwordVarification.html"
        } else {
            alert(response.data.message)
        }
    }, (err) => {
        console.log(err);
        alert(err)
    });

    return false;
}

function forgetPasswordStep2() {
    var otpCode = document.getElementById('varificationCode').value
    var newPassword = document.getElementById('NewPassword').value
    var emailVarification = localStorage.getItem("forgetEmail")
       axios({
        method: 'post',
        url: url + '/forget-password-step-2',
        data: ({
            emailVarification: emailVarification,
            newPassword: newPassword,
            otpCode: otpCode
        }),
        credentials: 'include'
    }).then((response) => {
        if (response.data.status == 200) {
            alert(response.data.message)
            window.location.href = "./login.html"
        } else {
            alert(response.data.message)
        }
    }, (err) => {
        console.log(err);
    });
    return false;
}

function getProfile() {
    axios({
        method: 'get',
        url: url + '/profile',
        credentials: 'include'
    }).then((response) => {
        document.getElementById('userName').innerText = response.data.profile.name
        document.getElementById('userEmail').innerText = response.data.profile.email
        document.getElementById('userPhone').innerText = response.data.profile.phone
        console.log(response.data)
        sessionStorage.setItem("userEmail", response.data.profile.email)
        sessionStorage.setItem("userName", response.data.profile.name)

        if (response.data.profile.profilePic) {

            document.getElementById("img").src = response.data.profile.profilePic;
        } else {
        }
    }, (err) => {
        console.log(err);
        location.href = "./login.html"
    });


}

function logout() {
    axios({
        method: 'post',
        url: url + '/logout',
    }).then((response) => {
         window.location.href = "/login.html"
    }, (err) => {
        console.log(err);
    });



    return false;
}

function tweet() {
    var tweet = document.getElementById('message').value
    axios({
            method: 'post',
            url: url + '/tweet',
            data: {
                tweet: tweet,
                userEmail: sessionStorage.getItem("userEmail"),
                userName: sessionStorage.getItem("userName")
            },
            withCredentials: true
        })
        .then(function(response) {})
        .catch(function(error) {});


}

function getTweets() {
    axios({
        method: 'get',
        url: url + '/getTweets',
        credentials: 'include',
    }).then((response) => {
        console.log(response.data)
        let tweets = response.data;
        
        
        let html = ""
        tweets.forEach(element => {
            console.log(element.profilePic)
            if(element.profilePic === undefined){
                element.profilePic = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F363-3636037_man-judge-light-skin-tone-icon-emoji-man.png&imgrefurl=https%3A%2F%2Fwww.kindpng.com%2Fimgv%2Fhixwhmh_man-judge-light-skin-tone-icon-emoji-man%2F&tbnid=lCLzI9E7Z67QlM&vet=12ahUKEwjWjM2ThbzuAhVD8IUKHQLvD9gQMygQegUIARDXAQ..i&docid=ymMC9Dmhv49PuM&w=860&h=960&q=men%20emoji&ved=2ahUKEwjWjM2ThbzuAhVD8IUKHQLvD9gQMygQegUIARDXAQ"
             }
            html += `
            <div class="tweet">
            <img src="${element.profilePic}" alt="image" style="width: 50px;height: 50px;border-radius: 100%;">
            <span class="user-name">${element.name}<span>
            <p class="tweet-date">${new Date(element.createdOn).toLocaleTimeString()}</p>
            <p class="tweet-text">${element.tweet}</p>
            </div>
            `
        });
        document.getElementById('text-area').innerHTML = html;

    }, (error) => {
        console.log(error.message);
    });
    return false
}

function getMyTweets() {
    axios({
        method: 'get',
        url: url + '/getTweets',
        credentials: 'include',
    }).then((response) => {

        let userTweet = response.data
        console.log(response.data)
        let userHtml = ""
        let userName = document.getElementById('userName').innerHTML;
        console.log(userName)
        userTweet.forEach(element => {
            if (element.name === userName) {
                if(element.profilePic === undefined){
                    element.profilePic = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F363-3636037_man-judge-light-skin-tone-icon-emoji-man.png&imgrefurl=https%3A%2F%2Fwww.kindpng.com%2Fimgv%2Fhixwhmh_man-judge-light-skin-tone-icon-emoji-man%2F&tbnid=lCLzI9E7Z67QlM&vet=12ahUKEwjWjM2ThbzuAhVD8IUKHQLvD9gQMygQegUIARDXAQ..i&docid=ymMC9Dmhv49PuM&w=860&h=960&q=men%20emoji&ved=2ahUKEwjWjM2ThbzuAhVD8IUKHQLvD9gQMygQegUIARDXAQ"
                 }
                userHtml += `
                <div class="tweet">
                <img src="${element.profilePic}" alt="image" style="width: 50px;height: 50px;border-radius: 100%;">
                <span class="user-name">${element.name}<span>
                <p class="tweet-date">${new Date(element.createdOn).toLocaleTimeString()}</p>
                <p class="tweet-text">${element.tweet}</p>
                </div>
                `
            }
        });
        console.log(userHtml)
        document.getElementById('usertext-area').innerHTML = userHtml;
    }, (error) => {
        console.log(error.message);
    });
    return false
}

socket.on('NEW_POST', (newPost) => {
    let tweets = newPost;
    if(tweets.profilePic === undefined){
        tweets.profilePic = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F363-3636037_man-judge-light-skin-tone-icon-emoji-man.png&imgrefurl=https%3A%2F%2Fwww.kindpng.com%2Fimgv%2Fhixwhmh_man-judge-light-skin-tone-icon-emoji-man%2F&tbnid=lCLzI9E7Z67QlM&vet=12ahUKEwjWjM2ThbzuAhVD8IUKHQLvD9gQMygQegUIARDXAQ..i&docid=ymMC9Dmhv49PuM&w=860&h=960&q=men%20emoji&ved=2ahUKEwjWjM2ThbzuAhVD8IUKHQLvD9gQMygQegUIARDXAQ"
     }
    document.getElementById('text-area').innerHTML += `
    <div class="tweet">
    <img src="${tweets.profilePic}" alt="image" style="width: 50px;height: 50px;border-radius: 100%;">
    <span class="user-name">${tweets.name}<span>
    <p class="tweet-date">${new Date(tweets.createdOn).toLocaleTimeString()}</p>
    <p class="tweet-text">${tweets.tweet}</p>
    </div>
    `

})

//////////////************************************* for profile */

function upload() {

    var fileInput = document.getElementById("fileInput");
    let formData = new FormData();

    formData.append("myFile", fileInput.files[0]);
    formData.append("email", sessionStorage.getItem('userEmail'));
    formData.append("myDetails",
        JSON.stringify({
            "subject": "Science",
            "year": "2021"
        })
    );

    axios({
            method: 'post',
            url: url + '/upload',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(res => {

            console.log(`upload Success` + res.data.picture);

        })
        .catch(err => {
            console.log(err);
            alert(err)
        })

    return false;

}

function previewFile() {
    const preview = document.querySelector('img');
    console.log(preview)
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function() {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}
