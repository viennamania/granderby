// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(document).ready(function () {
  // load

  $(document).on('click', '#gnb li > .shortcuts', function (e) {
    e.preventDefault();
    var target = $(this).attr('href');
    var top = $(target).offset().top;
    var moveSpeed = 10;
    $('html, body').stop().animate({ scrollTop: top }, moveSpeed);

    if ($('#gnb').is('.on')) {
      $('#gnb').removeClass('on');
    }
  });

  // gnb (mobile)
  $(document).on('click', "[class*='btn-gnb']", function (e) {
    $('#gnb').toggleClass('on');
  });

  var acodian = {
    click: function (target) {
      var $target = $(target);
      $target.on('click', function () {
        if ($(this).hasClass('on')) {
          slideUp($target);
        } else {
          slideUp($target);
          $(this).addClass('on').next().slideDown();
        }

        function slideUp($target) {
          $target.removeClass('on').next().slideUp();
        }
      });
    },
  };
  acodian.click('.accodian > dt');
}); //ready end

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function hasScrolled() {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta) return;

  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('#header').removeClass('nav-down').addClass('nav-up');
  } else {
    // Scroll Up
    if (st <= 100) {
      $('#header').removeClass('nav-down');
      $('#header').removeClass('nav-up');
    } else if (st + $(window).height() < $(document).height()) {
      $('#header').removeClass('nav-up').addClass('nav-down');
    }
  }
  lastScrollTop = st;
}

// slide news
var movSwiper = new Swiper('.news-list', {
  loop: true,
  slidesPerView: '3',
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 1500,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    960: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});
//slide news

// slide
var movSwiper = new Swiper('.nft-slide1', {
  loop: true,
  slidesPerView: '8',
  spaceBetween: 40,
  autoplay: {
    delay: 1000,
  },
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1080: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1600: {
      slidesPerView: 6,
      spaceBetween: 40,
    },
  },
});
// slide
var movSwiper = new Swiper('.nft-slide2', {
  loop: true,
  slidesPerView: '8',
  spaceBetween: 40,
  centeredSlides: true,
  autoplay: {
    delay: 1000,
  },
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1080: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1600: {
      slidesPerView: 6,
      spaceBetween: 40,
    },
  },
});

// slide
var gameSwiper = new Swiper('.game-slide', {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false, // Ensure autoplay continues after interaction
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// scrolltrigger
gsap.registerPlugin(ScrollTrigger);

gsap.to('.mobile-wrap', {
  scrollTrigger: {
    trigger: '#howto',
    start: 'top center',
    end: '+=150',
    scrub: 0.1,
    pin: 'true',
  },
  x: window.innerWidth > 1080 ? 320 : 0,
  y:
    window.innerWidth > 1080
      ? '70vh'
      : window.innerWidth > 390
      ? '650px'
      : '400px',
  duration: 10,
});

gsap.to('.back-phone', {
  scrollTrigger: {
    trigger: '#howto',
    start: '10vh center',
    end: '30vh',
    //markers: true,
    scrub: 0.1,
    pin: 'true',
  },
  opacity: 1,
  duration: 10,
});

gsap.to('.game-slide', {
  scrollTrigger: {
    trigger: '#howto',
    start: '20vh center',
    end: '20vh',
    //markers: true,
    scrub: 0.5,
    pin: 'true',
  },
});

const introVideo = document.getElementById('intro-video');
const introImg = document.querySelector('.intro-img');
const mobileImg = document.querySelector('.mobile-wrap');
const titleWrap = document.querySelector('.title-wrap');
const btnScroll = document.querySelector('.btn-scroll');
const introSection = document.getElementById('intro');

introImg.style.opacity = '0';
mobileImg.style.opacity = '0';
titleWrap.style.opacity = '0';
btnScroll.style.opacity = '1';

// Check if screen size is below 1079
if (window.innerWidth <= 1079) {
  introVideo.style.display = 'none';
  introImg.style.opacity = '1';
  titleWrap.style.opacity = '1';
  mobileImg.style.opacity = '1';
  AOS.init();
} else {
  introVideo.addEventListener('loadedmetadata', () => {
    const videoDuration = introVideo.duration;

    setTimeout(() => {
      introVideo.style.display = 'none';
      introImg.style.opacity = '1';
      titleWrap.style.opacity = '1';
      mobileImg.style.opacity = '1';
      AOS.init();
      mobileImg.style.display = 'block';
      titleWrap.style.display = 'block';
    }, videoDuration * 1000);
  });
}

btnScroll.addEventListener('click', () => {
  introVideo.pause();
  introVideo.style.display = 'none';
  introImg.style.opacity = '1';
  mobileImg.style.opacity = '1';
  titleWrap.style.opacity = '1';
  mobileImg.style.display = 'block';
  titleWrap.style.display = 'block';
  AOS.init();
});

const showElements = () => {
  introImg.style.opacity = '1';
  mobileImg.style.opacity = '1';
  titleWrap.style.opacity = '1';
  introVideo.pause();
};

ScrollTrigger.create({
  trigger: introSection,
  start: 'top top',
  end: 'bottom top',
  onEnter: showElements,
});

const targetElement = document.querySelector('.img-play');
targetElement.style.opacity = '0';

$('#benefit').each(function (index) {
  let triggerElement = $(this);
  let isScrolledDown = false; // Variable to track scroll direction

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      //markers: true,
      start: 'top center',
      end: '+=100',
      scrub: 1,
      pin: 'true',
      onEnter: function () {
        isScrolledDown = true; // Set to true when entering the trigger element
        targetElement.style.opacity = '1'; // Set opacity to 1 when triggered
      },
      onLeaveBack: function () {
        isScrolledDown = false; // Set to false when leaving the trigger element
        targetElement.style.opacity = '0'; // Set opacity back to 0 when scrolling up
      },
    },
  });

  const targetWidth = window.innerWidth <= 1080 ? '90vw' : '1080px';
  const targetHeight =
    window.innerWidth <= 1080 ? `${(310 * 90) / 650}vw` : '480px';
  const targetRadius = window.innerWidth <= 1080 ? '20px' : '60px';

  tl.fromTo(
    targetElement,
    {
      width: '120vw',
      height: '120vh',
      borderRadius: '0',
      opacity: '0',
      duration: 1,
    },
    {
      width: targetWidth,
      height: targetHeight,
      borderRadius: targetRadius,
      opacity: '1',
      duration: 1,

      y: window.innerWidth > 1080 ? '240px' : '200px',
      onComplete: function () {
        if (isScrolledDown && targetWidth) {
          $(targetElement).addClass('end'); // Add .end class using $(targetElement)
        } else {
          $(targetElement).removeClass('end'); // Remove .end class using $(targetElement)
        }
      },
    }
  );
});
