// ==UserScript==
// @name                  Youtube AD Skiper
// @name:zh-tw            Youtube 跳過廣告
// @namespace             iris536756
// @version               1.0.5
// @description           Automatically skips YouTube ads.
// @description:zh-tw     自動跳過 YouTube 廣告。
// @author                Iris.L
// @license               MIT
// @match                 *://www.youtube.com/*
// @grant                 none
// @updateURL             https://raw.githubusercontent.com/iris536756/youtube-ad-skiper/master/youtube_ad_skiper.user.js
// @downloadURL           https://raw.githubusercontent.com/iris536756/youtube-ad-skiper/master/youtube_ad_skiper.user.js
// ==/UserScript==

const AD_CHECK_INTERVAL = 1000; // 1s

function isAdExist() {
  return !!(document.querySelector('.ytp-ad-button-icon') ||
    // ad banner
    document.querySelector('#masthead-ad .ytd-rich-grid-renderer:not(.dismissed)'));
}

function clickSkipButtonIfExist() {
  const adSkipBtn = document.querySelector('.ytp-ad-skip-button-modern');
  if (adSkipBtn) adSkipBtn.click();
  return !!adSkipBtn;
}

function skipTimedAd() {
  const videoElement = document.querySelector('video');
  if (videoElement) videoElement.currentTime = videoElement.duration;
}

function closeAdBanner() {
  const dismissButton = document.getElementById('dismiss-button');
  if (dismissButton) dismissButton.click();
}

function main() {
  try {
    // Check if currently showing ad
    if (isAdExist()) {
      skipTimedAd();
      clickSkipButtonIfExist();
	  closeAdBanner();
    }
  } catch (error) {
    console.error('An error occurred in main:', error);
  }

  setTimeout(main, AD_CHECK_INTERVAL);
}

main();