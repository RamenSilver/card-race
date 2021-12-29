const PREF = {
  turns: 5
}

const shuffle = () => {
  for (var i = cards_in_deck.length - 1; i > 0; i--) {
    let r = Math.floor(Math.random() * (i + 1));
    let tmp = cards_in_deck[i];
    cards_in_deck[i] = cards_in_deck[r];
    cards_in_deck[r] = tmp;
  }
}


//Enterが押された時の挙動
$(document).keypress(function(event) {
  const keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    const card = draw_card();
    cards_on_race[card.suit].pos += 1;
    // turn over card on side
    const min_pos = find_all_passed_line();
    turn_over_side_deck(min_pos);
    const turnover_list = cards_on_side.filter((card) => {
      return card.is_turned_over == true;
    });
    console.log(turnover_list);

    //refresh table
  }

});

//デッキからカードを一枚めくる
const draw_card = () => {
  return cards_in_deck.pop();
}

//スタート前の準備
const pre_start = () => {
  shuffle();
  for (let i = 0; i < PREF.turns; i++) {
    cards_on_side.push(cards_in_deck.pop);
  }
  //ひっくり返されたかのフラグを追加
  cards_on_side.forEach((card) => {
    card["is_turned_over"] = false;
  });
}

// 一番遅いカードのポジションを返す
const find_all_passed_line = () => {
  return cards_on_race.reduce((left, right) => {
    return left.pos < right.pos ? left : right;
  }).pos
}

const turn_over_side_deck = (min_pos) => {
  for (let i = 0; i < min_pos; i++) {
    cards_on_side[i].is_turned_over = true;
  }
}