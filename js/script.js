// O array das imagens que iram ser geradas em posições randomicas
const imgList = [
    '<img src="./img/mario.jpg" alt="Frédéric Bastiat">', 
    '<img src="./img/mario.jpg" alt="Frédéric Bastiat">', 
    '<img src="./img/luigi.jpg" alt="Eugene Fama">', 
    '<img src="./img/luigi.jpg" alt="Eugene Fama">', 
    '<img src="./img/daisy.jpg" alt="Milton Friedman">', 
    '<img src="./img/daisy.jpg" alt="Milton Friedman">', 
    '<img src="./img/peach.jpg" alt="Friedrich Hayek">', 
    '<img src="./img/peach.jpg" alt="Friedrich Hayek">', 
    '<img src="./img/wario.jpg" alt="John Maynard Keynes">', 
    '<img src="./img/wario.jpg" alt="John Maynard Keynes">',
    '<img src="./img/yoshi.jpg" alt="Carl Menger">', 
    '<img src="./img/yoshi.jpg" alt="Carl Menger">'
    ];
    
    const cardDeck = document.querySelector('.deck');
    const counter = document.querySelector('.moves');
    const starRating = document.querySelector('.stars');
    const myStopWatch = document.getElementById('stopWatch');
    const cardArray = [];
    const flippedCards = [];
    const matchedCards = [];
    const startTrigger = [];
    let totalClicks = 0;
    let totalMatched = 0;
    let seconds = 0;
    let minutes = 0;
    let mySeconds;
    let myMinutes;
    let t;
    
    //  Função que retornará a pontuação no fim do game
    function rating() {
      if (totalClicks <= 24) {
        starRating.innerHTML = `
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
      } else if (totalClicks >= 30 && totalClicks <= 39) {
        starRating.innerHTML = `
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
      } else if (totalClicks >= 40) {
        starRating.innerHTML = `
        <li><i class="fa fa-star"></i></li>`;
      } else {
        starRating.innerHTML = `
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
      }
    }
    //  Inserindo o padrão de estrelas
    rating();
    
    //  Criando o cronometro
    function time() {
      seconds += 1;
      if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
      }
    
      if (seconds > 9) {
        mySeconds = seconds;
      } else if (seconds <= 9) {
        mySeconds = `0${seconds}`;
      } else {
        mySeconds = '00';
      }
    
      if (minutes > 9) {
        myMinutes = minutes;
      } else if (minutes <= 9) {
        myMinutes = `0${minutes}`;
      } else {
        myMinutes = '00';
      }
      myStopWatch.textContent = (`${myMinutes}:${mySeconds}`);
      //  Contador
      timer();
    }
    
    // Start do contador
    function timer() {
      t = setTimeout(time, 1000);
    }
    // Parar cronometro
    function stop() {
      clearTimeout(t);
    }
    
    
    //  Função que retorna o tempo de jogo total 
    function matchedGame() {
      if (totalMatched === 12) {
        stop();
        setTimeout(() => {
          const modal = document.createElement('div');
          modal.classList.add('modal');
          modal.innerHTML = `<div class='modal-content'>
          <h1>Parabéns</h1>
          <p>Você acabou de ganhar um cupom </p>
          <p>Você completou o jogo com <span>${totalClicks}</span> movimentos e o tempo de <span>${myStopWatch.textContent}</span> minutos</p><br>
          <div id='modal-stars'>Aqui esta o seu cupom : <ul>${starRating.innerHTML}</ul> 
          </div><br>
          <p>x</p>
          <button id='modal-reset' type ="button" onclick="closeModal()">Fechar</button>
          </div>`;
          document.body.appendChild(modal);
        }, 1000);
      }
    }

    function closeModal() {
        $('.modal').hide();
    }
    
    //  This function removes flipped class if selected cards do not match add matched class if matched
    function checkFlipped() {
      if (flippedCards.length === 2 && flippedCards[0].innerHTML !== flippedCards[1].innerHTML) {
        setTimeout(() => {
          for (let i = 0; i < flippedCards.length; i += 1) {
            flippedCards[i].classList.remove('flipped');
          }
          //  Clear flippedCards Array
          flippedCards.splice(0, 16);
        }, 2000);
      } else if (flippedCards.length === 2 && flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
        for (let i = 0; i < flippedCards.length; i += 1) {
          flippedCards[i].classList.add('matched');
          matchedCards.push(this);
          totalMatched += 1;
        }
        //  Clear flippedCards Array
        flippedCards.splice(0, 16);
        //  Call matchedGame function
        matchedGame();
      }
    }
    
    //  For que passará pelo array imgList e listará todas as imagems e adionará o icone 
    function createCards() {
      for (let i = 0; i < imgList.length; i += 1) {
        const cards = document.createElement('div');
        cards.classList.add('card');
        cards.innerHTML = `<div class='back'>${imgList[i]}</div>
        <div class='front'><i class="fa fa-line-chart" style="font-size:2em;color:#ffffff;"></i></div>`;
        cardArray.push(cards);
      }
      //  Loops and Shuffles Card Array
      for (let i = cardArray.length - 1; i >= 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const itemAtIndex = cardArray[randomIndex];
        cardArray[randomIndex] = cardArray[i];
        cardArray[i] = itemAtIndex;
      }
    }
    // Call createCards function
    createCards();
    
    cardArray.forEach((card) => {
      //  Adds Event Listener to Cards - Assigns Flipped Class to Flipped Cards
      card.addEventListener('click', () => {
        //  Prevents Event Listener/Counter Iteration (Double Click) If classList.length > 1
        if (card.classList.length < 2) {
          //  Push Clicked Cards Into flippedCards Array
          flippedCards.push(card);
          //  Push Clicked Cards Into startTrigger Array
          startTrigger.push(card);
          //  limit the number of flipped cards to two
          if (flippedCards.length < 3) {
            card.classList.add('flipped');
            // Track totalClicks
            totalClicks += 1;
            //  Update Counter
            counter.innerHTML = totalClicks;
          }
          //  Trip Start Time
          if (startTrigger.length === 1) {
            time();
          }
          //  Test Rating With Every Click
          rating();
          //  Test flippedCards for Pair Match
          checkFlipped();
        }
      });
      //  Append Shuffled Cards to HTML Document
      cardDeck.appendChild(card);
    });