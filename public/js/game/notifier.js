const removeBanner = () => {
  query('.banner').remove();
}

const createBanner = (message, color) => {
  const bannerBody = createEl('div');
  bannerBody.classList.add('notification-banner');
  bannerBody.classList.add(color);
  bannerBody.innerText = message;

  const banner = createEl('div');
  banner.classList.add('banner');
  banner.append(bannerBody);
  return banner;
};

const notifier = (message, color) => {
  const banner = createBanner(message, color);
  const map = query('.map');
  map.append(banner);
  setTimeout(removeBanner, 1500);
};

const turnNotifier = () => {
  const { role, color } = gameState.currentPlayer;
  let message = `${role}'s turn`;
  if (gameState.isMyTurn()) {
    message = 'Your turn';
  }
  notifier(message, color);
};