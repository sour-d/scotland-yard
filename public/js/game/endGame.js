const winningMessagesLookup = (winningStatus) => {
  const lookup = {
    1: 'Detectives blocked Mr. X',
    2: 'Detective Red caught Mr. X',
    3: 'Detective Green caught Mr. X',
    4: 'Detective Purple caught Mr. X',
    5: 'Detective Blue caught Mr. X',
    6: 'Detective Yellow caught Mr. X',
    7: 'All Detectives are stranded',
    8: 'All Detectives ran out of tickets',
    9: 'Mr. X escaped'
  };

  return lookup[winningStatus];
};

const createHomeLink = () => {
  const link = new Element('a')
    .add('href', '/end')
    .addClass('game-end')
    .addClass('center-flex')
    .add('innerText', 'Home');
  return link.html;
};

const createWinningPop = (message, color, description) => {
  const winningPopupBody = new Element('div')
    .addClass('winning-popup-body')
    .addClass('center-flex');

  const winningPopup = new Element('div')
    .addClass('winning-popup')
    .addClass('vertical-flex')
    .addClass('both-middle')
    .addClass(color);

  const heading = new Element('h1')
    .addClass('heading')
    .add('innerText', message);

  const desc = new Element('p')
    .addClass('description')
    .add('innerText', description);

  const homeLink = createHomeLink();

  winningPopup.replace(heading.html, desc.html, homeLink);
  winningPopupBody.append(winningPopup.html);
  return winningPopupBody.html;
};

const endGame = poller => gameState => {
  const { winningStatus, gameOver } = gameState;
  if (!gameOver) {
    return;
  }
  poller.pause();

  let message = 'Detectives Won!';
  let color = 'black';
  if (winningStatus >= 7) {
    message = 'Mr. X Won!';
    color = 'black';
  }

  const description = winningMessagesLookup(winningStatus);

  //Think about message var name

  const popup = createWinningPop(message, color, description);
  const map = query('.map');

  map.append(popup);
};
