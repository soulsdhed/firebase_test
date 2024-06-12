// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCksmZ6VRKEkaMhalX84IGL0IJW5nh3TMQ",
    authDomain: "project-ju-531df.firebaseapp.com",
    databaseURL: "https://project-ju-531df-default-rtdb.firebaseio.com",
    projectId: "project-ju-531df",
    storageBucket: "project-ju-531df.appspot.com",
    messagingSenderId: "426743877866",
    appId: "1:426743877866:web:ec8852bcede51f3f480793",
    measurementId: "G-WLH2YGYNY1",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// 파이어베이스 실시간 데이터베이스 생성
const database = firebase.database();

// 데이터 저장 실습
function writeUserData(userId, email, nick) {
    database.ref("users/" + userId).set({
        email: email,
        nick: nick,
    });
}

// 데이터 읽기 실습
function readUserData() {
    const userInput = document.getElementById("userInput");
    let userId = "";

    if (userInput.value !== undefined) {
        userId = userInput.value;
    }
    userInput.value = "";

    database.ref("users/" + userId).on("value", (snapshot) => {
        // 실시간 데이터베이스 값 접근
        // console.log(snapshot);
        // console.log(snapshot.val());
        let data = snapshot.val();

        // 잘못된 아이디 접근
        if (data === null || data === undefined) {
            result.innerHTML = "존재하지 않는 아이디입니다.";
            return;
        }

        if (userId === "") {
            // 전체조회
            let keys = Object.keys(data);

            const result = document.getElementById("result");
            let resultStr = "";
            for (let i = 0; i < keys.length; i++) {
                resultStr += `${data[keys[i]].email} / ${
                    data[keys[i]].nick
                }<br>`;
            }
            result.innerHTML = resultStr;
        } else {
            // 단일 조회
            result.innerHTML = `${data.email} / ${data.nick}`;
        }
    });
}

// ----------------------------------------------------------------
const frm = document.frm;
const id = frm.id;
const email = frm.email;
const nick = frm.nick;
const submit = frm.btn;
const readBtn = document.getElementById("readBtn");

submit.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("id:", id.value);
    console.log("email:", email.value);
    console.log("nick:", nick.value);

    writeUserData(id.value, email.value, nick.value);
});

readBtn.addEventListener("click", (e) => {
    readUserData();
});
