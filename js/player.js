let player;
const playerContainer = $(".player")


$(".player__button-start").click (e => {

  if (playerContainer.hasClass("paused")) {
    playerContainer.removeClass("paused")
    player.pauseVideo();
  } else {
    playerContainer.addClass("paused")
    player.playVideo();
  }
})


$(".player__playback-line").click(e => {
  const bar = $(e.currentTarget);
  const clickedPosition = e.originalEvent.layerX;
  const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
  const newPlaybackPosition = (player.getDuration() / 100) * newButtonPositionPercent;

  $(".player__playback-button").css({
    left:`${newButtonPositionPercent}%`
  })

  player.seekTo(newPlaybackPosition)
})


const onPlayerReady = () => {

  const durationSec = player.getDuration();

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    })
  })
}

function onYouTubeIframeAPIReady() {
 player = new YT.Player("yt-player", {
   height: "100%",
   width: "100%",
   videoId: "i9yCe6ibhzU",
   events: {
     onReady: onPlayerReady,
     // onStateChange: onPlayerStateChange
   },
  playerVars: {
    controls: 0,
    disablekb: 0,
    showinfo: 0,
    rel: 0,
    autoplay: 0,
    modestbranding: 0
  }
 });
}
