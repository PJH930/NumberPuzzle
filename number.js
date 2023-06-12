let arr = []; // 랜덤문제배열
let arr2 = []; // 정답배열
let maxNum = 36; // 칸의 최대크기
let clickBox = document.querySelectorAll('.number'); // 숫자버튼
let numberBox = document.querySelector('.number-container');
let startButton = document.getElementById('start') //스타트버튼
let Timer = document.getElementById('timer');
let lastTime = document.getElementById('Time');
let xBox = document.getElementById('xbox');
let Back = document.getElementById('back');
const timerStatus = { RUNNING: true, STOP: false }; //enum처럼 상태 객체를 만들기
let nowStatus = timerStatus.STOP; //타이머의 상태를 저장하는 변수 (기본값: STOP)
let timerID = ""; // 타이머를 갱신

// 1~순서배열
for (let i = 1; i <= maxNum; i++) {
    arr2.push(i);
}

// 배열의 길이가 칸의 최대크기랑 동일할때까지 랜덤숫자를 중복없이 배열에 추가한다.
while (arr.length !== maxNum){
    let ran = random(maxNum)
    if((arr.indexOf(ran)) === -1){
        arr.push(ran);
    }
}
// 랜덤숫자텍스트를 div에 순서대로 배치
clickBox.forEach(x => {
    x.innerHTML += arr.shift() ;
})

// 숫자 클릭이벤트
clickBox.forEach(x => {
    x.addEventListener('click', () => {
        for(let i=1; i <= maxNum; i++){
            if(parseInt(x.textContent) === arr2[0]){
                x.style.backgroundColor = 'aquamarine';
                x.style.border = '0.3rem solid rgb(0, 0, 0)';
                arr2.shift();
            }
        }
        if(arr2.length === 0){
            lastTime.innerText = 'CLEAR TIME : ' + Timer.textContent;
            lastTime.toggleAttribute('hidden');
            lastTime.style.zIndex = 30;
            Timer.toggleAttribute('hidden');
            clickBox.forEach(x => {
                x.toggleAttribute('hidden');
            });
        }
    });
});

// 스타트버튼 클릭
startButton.addEventListener('click', ()=>{
    startButton.toggleAttribute('hidden');
    clickBox.forEach(x => {
            x.toggleAttribute('hidden');
    });
    numberBox.toggleAttribute('hidden');
    Timer.toggleAttribute('hidden');
    nowStatus = timerStatus.RUNNING;
    if(timerID === ""){
        timerID = setInterval(timer_setting, 10);
    }
});

//랜덤숫자생성
function random(limit){
    return parseInt(Math.random() * limit +1);
}

//타이머
function timer_setting(){
    let timerNowString = timer.textContent; //현재 진행된 타이머 시간
    let times = timerNowString.split(':'); // ':'으로 문자열을 나눈다
    let hour = +times[0]; 
    let min = +times[1]; 
    let sec = +times[2]; 
    sec++; 
    if(sec >= 99){  
        min++;   
        sec = 0;    
    }
    if(min >= 60){  
        hour++;     
        min = 0;   
    }
    if(hour >= 60){ 
        hour = 0;           
        clearInterval(timerID); 
    }
    //1초가 지난 현재 타이머 시간을 문자열로 생성
    const timerSting = `${format_setting(hour)}:${format_setting(min)}:${format_setting(sec)}`;
    //타이머 시간 표시 부분에 문자열을 설정
    timer.textContent = timerSting;
    return timerSting;
}

//날짜나 시간 형식을 00:00:00 형태로 만들어주기 위한 포맷 형식
function format_setting(data){ //data -> 월, 일, 시, 분, 초 중에 하나가 들어옴 (string)
    // data 를 문자열로 바꿧을 때 한 글자면 앞에 0을 붙여서 반환시킨다.
    return data.toString().length < 2 ? '0' + data : data;
}