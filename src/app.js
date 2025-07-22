window.onload = () => {
  const suits = [
    { symbol: "♠", class: "black" },
    { symbol: "♥", class: "red" },
    { symbol: "♦", class: "red" },
    { symbol: "♣", class: "black" }
  ];

  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let drawnCards = [];

  const drawBtn = document.getElementById("drawBtn");
  const sortBtn = document.getElementById("sortBtn");
  const deckContainer = document.getElementById("deck");
  const sortLog = document.getElementById("sort-log");

  drawBtn.addEventListener("click", () => {
    const count = parseInt(document.getElementById("cardCount").value);
    if (isNaN(count) || count < 4 || count > 13) {
      alert("Enter a number between 4 and 13.");
      return;
    }
    drawnCards = generateRandomDeck(count);
    renderDeck(drawnCards, deckContainer);
    sortLog.innerHTML = ""; // clear previous log
  });

  sortBtn.addEventListener("click", () => {
    if (drawnCards.length === 0) {
      alert("Draw cards first!");
      return;
    }
    bubbleSortAndLog(drawnCards);
  });

  function generateRandomDeck(count) {
    const fullDeck = [];
    for (let suit of suits) {
      for (let i = 0; i < ranks.length; i++) {
        fullDeck.push({
          suit: suit.symbol,
          class: suit.class,
          value: ranks[i],
          numeric: i + 1
        });
      }
    }
    shuffle(fullDeck);
    return fullDeck.slice(0, count);
  }

  function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  function renderDeck(cards, container) {
    container.innerHTML = "";
    cards.forEach(card => {
      const div = document.createElement("div");
      div.className = "plcard";
      div.innerHTML = `
        <span class="suit-top ${card.class}">${card.suit}</span>
        <span class="numberr ${card.class}">${card.value}</span>
        <span class="suit-bttm ${card.class}">${card.suit}</span>
      `;
      container.appendChild(div);
    });
  }

  function bubbleSortAndLog(cards) {
    const arr = [...cards];
    const steps = [];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (arr[j].numeric > arr[j + 1].numeric) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push([...arr]);
        }
      }
    }

    sortLog.innerHTML = "";
    steps.forEach((step, index) => {
      const row = document.createElement("div");
      row.className = "sorted-row";
      row.innerHTML = `<strong>Step ${index + 1}:</strong>`;
      step.forEach(card => {
        const mini = document.createElement("div");
        mini.className = "plcard";
        mini.innerHTML = `
          <span class="suit-top ${card.class}">${card.suit}</span>
          <span class="numberr ${card.class}">${card.value}</span>
          <span class="suit-bttm ${card.class}">${card.suit}</span>
        `;
        row.appendChild(mini);
      });
      sortLog.appendChild(row);
    });

    // Show final sorted deck
    drawnCards = arr;
    renderDeck(drawnCards, deckContainer);
  }
};
