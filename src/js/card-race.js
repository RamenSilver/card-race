const shuffle = () => {
  for (var i = cards_in_deck.length - 1; i > 0; i--) {
    let r = Math.floor(Math.random() * (i + 1));
    let tmp = cards_in_deck[i];
    cards_in_deck[i] = cards_in_deck[r];
    cards_in_deck[r] = tmp;
  }
}