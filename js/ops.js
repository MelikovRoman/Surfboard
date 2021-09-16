const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  return sectionEq * -100;
}

const changeMenuThemeForSection = sectionEq => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const sideMenuBorder = $(".fixed-menu__link");
  const sideMenuSpan = $(".fixed-menu__link-span");
  const hamburgerPlank = $(".hamburger__plank");

    if (menuTheme == "black") {
      sideMenuBorder.addClass("fixed-menu__link--shadowed")
      sideMenuSpan.addClass("fixed-menu__link-span--shadowed")
    } else {
      sideMenuBorder.removeClass("fixed-menu__link--shadowed")
      sideMenuSpan.removeClass("fixed-menu__link-span--shadowed")
    }

    if (menuTheme == "black") {
      hamburgerPlank.addClass("hamburger__plank--shadowed")
    } else {
      hamburgerPlank.removeClass("hamburger__plank--shadowed")
    }
}

const perfomeTranition = sectionEq => {

  if (inScroll == false) {
    inScroll = true;

    const position = countSectionPosition(sectionEq)

    changeMenuThemeForSection(sectionEq)

    display.css ({
      transform: `translateY(${position}%)`
    });

  sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

    setTimeout(() => {
      inScroll = false;
      sideMenu.find(".fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active");
    }, 1100)
  }
}

const scrollViewport = direction =>{
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction == "next" && nextSection.length) {
    perfomeTranition(nextSection.index())
  }

  if (direction == "prev" && prevSection.length) {
    perfomeTranition(prevSection.index())
  }
}

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollViewport("next");
  }

  if (deltaY < 0) {
    scrollViewport("prev");
  }
})

$(window).on("keydown", e => {

  const tagName = e.target.tagName.toLowerCase();

  if (tagName != "input" && tagName != "textarea") {
    switch (e.keyCode) {
      case 38:
        scrollViewport("prev");
        break;

      case 40:
        scrollViewport("next");
        break;
    }
  }
})

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click (e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  perfomeTranition(reqSection.index());
})

$("body").swipe( {
  //Generic swipe handler for all directions
  swipe:function(event, direction) {
    const scroller = viewportScroller();
    let scrollDirection = "";

    if (direction == "up") scrollDirection = "next";
    if (direction == "down") scrollDirection = "prev";


    scroller[scrollDirection]();
  }
});
