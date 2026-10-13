/* ---------------------------------------------------------
   1. 요소 선택 
   --------------------------------------------------------- */
const guessInput = document.querySelector('.guess-input');
const guessBtn = document.querySelector('.guess-btn');
const message = document.querySelector('.message');
const chanceCount = document.querySelector('.chance-count');
const triedText = document.querySelector('.tried');
const restartBtn = document.querySelector('.restart-btn');


/* ---------------------------------------------------------
   2. 변수 선언
   --------------------------------------------------------- */
const MAX_CHANCE = 5; // 대문자: *'바뀌지 않는 값' 아라는 관례

let answer;           // 정답 숫자(게임을 시작할 때 정해진다)
let chance;           // 남은 기회
let tried;            // 지금까지 입력한 숫자


/* ---------------------------------------------------------
   3. 게임 시작 함수 startGame()
      처음 페이지를 열 때와 [다시 시작]을 누를 때 모두 호출한다.
   --------------------------------------------------------- */
function startGame() {
   //랜덤 수 생성
   answer = Math.floor(Math.random() * 100) + 1;
   console.log('정답:', answer); // 개발자용 — 콘솔에 정답을 출력한다.
   chance = MAX_CHANCE; // 남은 기회 초기화
   tried = ''; // 입력한 숫자 기록 초기화
   
   // 화면의 처음 상태로 되돌린다
   chanceCount.textContent = chance;
   message.textContent = '숫자를 입력하고 [확인]을 눌러 보세요!';
   message.classList.remove('win', 'lose');
   triedText.textContent = '입력한 숫자 : 없음';

   guessInput.value = '';
   guessInput.disabled = false;
   guessBtn.disabled = false;
   restartBtn.classList.remove('show');
   guessInput.focus(); // 입력창에 커서를 두어 바로 입력할 수 있게 한다.
}


/* ---------------------------------------------------------
   4. 게임 종료 함수 endGame()
      맞혔을 때와 기회를 모두 썼을 때 공통으로 하는 일
   --------------------------------------------------------- */
function endGame() {
   guessInput.disabled = true;
   guessBtn.disabled = true;
   restartBtn.classList.add('show');
   restartBtn.addEventListener('click', startGame);

}


/* ---------------------------------------------------------
   5. 숫자 확인 함수 checkGuess()  — 이 게임의 핵심
   --------------------------------------------------------- */
function checkGuess() {
  // input.value 는 항상 '글자'이다. 계산·비교하려면 숫자로 바꿔야 한다.
  const guess = Number(guessInput.value);

  // (1) 입력값 검사: 잘못된 입력이면 기회를 쓰지 않고 안내만 한다.
  //     빈 칸이거나, 정수가 아니거나, 1~100 범위를 벗어난 경우
   if(guessInput.value === '' || Number.isInteger(guess) === false || guess < 1 || guess > 100) {
    message.textContent = '1에서 100 사이의 숫자를 입력해주세요!';
    guessInput.value = '';
    guessInput.focus();
   return; // 함수 종료 — 아래 코드는 실행되지 않는다.
}

  // (2) 올바른 입력이므로 기회를 하나 쓰고, 입력 기록에 추가한다.
   chance = chance - 1;
   chanceCount.textContent = chance;
   tried = tried + guess + '   ';  // 처음이면 쉼표 없이, 두 번째 이후면 쉼표 붙이기
   triedText.textContent = '입력한 숫자 : '  + tried;


  // (3) 결과 판단 — 위에서부터 순서대로 검사하고, 처음으로 참인 것만 실행된다.
   if (guess === answer) {
      message.textContent = '정답입니다! ' + (MAX_CHANCE - chance) + '번 만에 맞혔습니다.';
      message.classList.add('win');
      endGame();
   }
   else if (chance === 0) {
      message.textContent = '기회를 모두 소진했습니다. 정답은 ' + answer + '입니다.';
      message.classList.add('lose');
      endGame();
   }
   else if (guess > answer) {
      message.textContent = guess + ' 보다 작습니다. ⬇️⬇️⬇️';
   }
   else {
      message.textContent = guess + ' 보다 큽니다. ⬆️⬆️⬆️';
   }
  // (4) 다음 입력을 위해 입력창을 비우고 커서를 둔다.
   guessInput.value = '';
   guessInput.focus();
}


/* ---------------------------------------------------------
   6. 이벤트 연결
      같은 함수 checkGuess 를 '버튼 클릭'과 'Enter 키' 두 곳에 연결한다..
   --------------------------------------------------------- */
guessBtn.addEventListener('click', checkGuess);

guessInput.addEventListener('keydown', (event) => {
   if (event.key === 'Enter') {
      checkGuess();
   }
});
restartBtn.addEventListener('click', startGame);
   
/* ---------------------------------------------------------
   7. 페이지를 열자마자 게임을 시작한다.
   --------------------------------------------------------- */

startGame();
