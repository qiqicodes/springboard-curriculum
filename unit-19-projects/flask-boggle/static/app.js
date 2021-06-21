function scorePoints(wordLength) {
  if (wordLength === 3 || wordLength === 4) {
    return 1;
  } else if (wordLength === 5) {
    return 2;
  } else if (wordLength === 6) {
    return 3;
  } else if (wordLength === 7) {
    return 5;
  } else if (wordLength >= 8) {
    return 11;
  }
}

class BoggleGame {
  constructor(boardId, sec = 60) {
    this.sec = sec;
    this.showTimer();
    this.timer = setInterval(this.countDown.bind(this), 1000);

    this.score = 0;
    this.words = new Set();
    this.board = document.getElementById(boardId);

    let form = document.getElementById("add-word");
    form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  showWord(word) {
    const wordList = document.getElementById("words");
    console.log();
    const newWord = document.createElement("li");
    newWord.innerText = word;
    wordList.append(newWord);
  }

  showScore() {
    const scoreBoard = document.getElementById("score");
    scoreBoard.innerText = this.score;
  }

  showTimer() {
    const timer = document.getElementById("timer");
    timer.innerText = this.sec;
  }

  showMessage(msg) {
    const messageBoard = document.getElementById("msg");
    messageBoard.innerText = msg;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const wordSubmit = document.getElementById("word");

    let word = wordSubmit.value;
    if (!word) return;

    if (this.words.has(word)) {
      this.showMessage(`Already found ${word}`);
      return;
    }

    const response = await axios.get("/validate-word", {
      params: { word: word },
    });
    if (response.data.result === "not-on-board") {
      this.showMessage(`${word} is not a valid word`);
    } else if (response.data.result === "not-word") {
      this.showMessage(`${word} is not a valid word on this board`);
    } else {
      this.showWord(word);
      this.score += scorePoints(word.length);
      this.showScore();
      this.words.add(word);
      this.showMessage(`Added: ${word}`);
    }

    wordSubmit.value = "";
  }

  async countDown() {
    this.sec -= 1;
    this.showTimer();

    if (this.sec === 0) {
      const wordForm = document.getElementById("add-word");
      wordForm.hidden = true;

      clearInterval(this.timer);
      await this.scoreGame();
    }
  }

  async scoreGame() {
    const response = await axios.post("/post-score", { score: this.score });
    console.log(response.data);
    if (response.data.brokeRecord) {
      this.showMessage(
        `New record: You found ${this.words.size} words and scored ${this.score} points`
      );
    } else {
      this.showMessage(
        `Final record: You found ${this.words.size} words and scored ${this.score} points`
      );
    }
  }
}

let game = new BoggleGame("boggle");
