const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    time: document.querySelector('#time-left'),
    score: document.querySelector('#your-score'),
    life: document.querySelector('#your-lives'),
    retry: document.querySelector('#retry')
  },
  values: {
    moveVelocity: 600,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    life: 3
  },
  actions: {
    timerId: setInterval(randomSquare, 700),
    contDownTimerId: setInterval(countDown, 1000),
  }
}
  
function playSound(audioName){
  let audio = new Audio(`./src/sounds/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}
  
function countDown(){
  state.values.currentTime--;
  state.view.time.textContent = state.values.currentTime;

  if(state.values.currentTime <= 0 || state.values.life <= 0){
    playSound("gameover");
    clearInterval(state.actions.contDownTimerId);
    clearInterval(state.actions.timerId);
    alert('FIM DE JOGO! Sua Pontuação Final foi: ' + state.values.result);
  }
}
  
function randomSquare(){
  state.view.squares.forEach((square) => {
    square.classList.remove('enemy');
  })

  let randomNumber = Math.floor(Math.random() * 9);
  let selectedSquare = state.view.squares[randomNumber];
  selectedSquare.classList.add('enemy');
  state.values.hitPosition = selectedSquare.id;
}
  
  
function addListinerHitbox(){
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', () =>{
      if(square.id == state.values.hitPosition){
        playSound("uhh")
        if(state.values.life > 0 && state.values.currentTime > 0){
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
        }
      }
      if(square.id !== state.values.hitPosition && state.values.hitPosition !== null){
        playSound('punch');
        if(state.values.life > 0){
          state.values.life--;
          state.view.life.textContent = 'x' + state.values.life;
        }    
      }
    })    
  })
}
  
function retry(){
  state.view.retry.addEventListener('click', () => {
    location.reload();
  })
}
  
function init(){
  randomSquare();
  addListinerHitbox();
  retry();
}
 
init();