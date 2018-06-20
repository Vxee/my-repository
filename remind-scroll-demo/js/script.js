let chatBox = document.getElementById('chat-box');
let loadingEle = document.getElementById('load');
// 存放提醒消息的id
let remindList = [];
// 添加消息
for (let i = 0; i < 100; i++) {
    let div = document.createElement('div');
    let p = document.createElement('p');
    if ((Math.random() - 0.8) > 0) {
        p.innerHTML = '@消息';
        p.style.color = 'red';
        p.setAttribute("class", "message alert-mes");
        p.setAttribute("id", "alert-mes" + i);
        remindList.push("alert-mes" + i);
    }
    else {
        p.innerHTML = 'test' + i;
        p.setAttribute("class", "message");
    }
    div.appendChild(p);
    chatBox.appendChild(div);
}
// $(chatBox).scrollTop(chatBox.scrollHeight);

let textDiv = document.getElementById('mess-count');
textDiv.innerText = remindList.length;

// 为消息提示框添加点击事件
let alertBox = document.getElementById('alert-box');
alertBox.addEventListener('click', function () {
    let item = remindList.shift();
    let remindListEle = document.getElementById(item);
    textDiv.innerText = remindList.length;

    $(chatBox).scrollTop(remindListEle.offsetTop - 10);
    if (remindList.length == 0) {
        alertBox.style.display = 'none';
    }
}, false);

// let scrollFunc = function(e){
//     e = e || window.event;
//     if(e.wheelDelta){ // ie/opera/chrome
//         console.log(e.wheelDelta);
//     }else if(e.detail){ // firefox
//         console.log(e.detail);
//     }
// }

// if(chatBox.addEventListener){
//     chatBox.addEventListener("DOMMouseScroll",scrollFunc,false);
// }
// chatBox.onmousewheel = scrollFunc // ie/opera/chrome

// 监听鼠标滚轮事件
$(chatBox).on('mousewheel', function (event) {

    let totalHeight = $(chatBox).scrollTop();
    let boxHeight = chatBox.clientHeight;
    let style = window.getComputedStyle(chatBox);
    let doms = document.querySelectorAll('.alert-mes');
    for (let i in doms) {
        // 如果这条提醒在视线内 从提醒列表中移除
        if (doms.hasOwnProperty(i) && doms[i].offsetTop && (doms[i].offsetTop <= (boxHeight + totalHeight) && (doms[i].offsetTop >= totalHeight))) {
            let index = remindList.indexOf(doms[i].getAttribute('id'));
            index > -1 ? remindList.splice(index, 1) : '';
            //doms[i].setAttribute('class','message');
        }
    }
    textDiv.innerText = remindList.length;
    if (remindList.length == 0) {
        alertBox.style.display = 'none';
    }
    if (totalHeight <= 0) {
        loadingEle.style.display = 'block';
        timeout(1500).then((value) => {
            loadingEle.style.display = 'none';
            $(chatBox).scrollTop(value);
            console.log(value)
        })
    }
})

function timeout(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            let checkNode = chatBox.firstElementChild;
            for (let i = 30; i >= 0; i--) {
                let div = document.createElement('div');
                let p = document.createElement('p');
                p.innerHTML = 'test-' + i;
                p.setAttribute("class", "message");
                div.appendChild(p);
                let firstNode = chatBox.firstElementChild;
                chatBox.insertBefore(div, firstNode);
            }
            resolve(checkNode.offsetTop);
        }, ms);
    })
}