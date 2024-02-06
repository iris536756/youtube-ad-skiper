// ==UserScript==
// @name		youtube-ad-skiper
// @namespace	iris536756
// @version		1.0.2
// @description Automatically skips YouTube ads for uninterrupted video viewing.
// @author		Iris.L
// @license		MIT
// @match		*://www.youtube.com/*
// @grant		none
// @updateURL	https://raw.githubusercontent.com/iris536756/youtube-ad-skiper/master/youtube_ad_mute.user.js
// @downloadURL	https://raw.githubusercontent.com/iris536756/youtube-ad-skiper/master/youtube_ad_mute.user.js
// ==/UserScript==

const AD_CHECK_INTERVAL = 1000; // 1s

function isAdExist() {
  return !!document.querySelector('.ytp-ad-button-icon');
}

function tryClickSkipButton() {
  let adSkipBtn = document.querySelector('.ytp-ad-skip-button-modern');
  if (adSkipBtn) adSkipBtn.click();
  return !!adSkipBtn;
}

function skipTimedAd() {
  const videoElement = document.querySelector('video');
  if (videoElement) videoElement.currentTime = videoElement.duration;
}

function main() {
  try {
    // Check if currently showing ad
    if (isAdExist()) {
      skipTimedAd();
      tryClickSkipButton();
    }
  } catch (error) {
    console.error('An error occurred in main:', error);
  }

  setTimeout(main, AD_CHECK_INTERVAL);
}

main();