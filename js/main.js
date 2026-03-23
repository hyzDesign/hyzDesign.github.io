$(function () {
  const headerHeight = () => $('header').outerHeight() || 50;

  // 1. 네비게이션 클릭 — 앵커 기준 스크롤 (모바일 메뉴 닫기 포함)
  $('.gnb a').on('click', function (e) {
    const href = $(this).attr('href');
    if (!href || href.charAt(0) !== '#') return;
    const $target = $(href);
    if (!$target.length) return;
    e.preventDefault();
    const offsetValue = href === '#contact' ? 0 : headerHeight() + 20;
    $('html, body')
      .stop()
      .animate({ scrollTop: $target.offset().top - offsetValue }, 500);
    $('body').removeClass('nav-open');
    $('.btn-menu').attr('aria-expanded', 'false');
  });

  $('.btn-menu').on('click', function () {
    const open = !$('body').hasClass('nav-open');
    $('body').toggleClass('nav-open', open);
    $(this).attr('aria-expanded', open ? 'true' : 'false');
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('body').removeClass('nav-open');
      $('.btn-menu').attr('aria-expanded', 'false');
    }
  });

  // 2. Top 버튼 클릭
  $('.btn-top').click(function () {
    $('html,body').stop().animate({ scrollTop: 0 }, 500);
  });

  // 3. 스크롤 위치에 따른 Top 버튼 노출
  $(window).scroll(function () {
    let scrH = $(window).scrollTop();

    // 화면 높이(window height)를 기준
    if (scrH >= 500) {
      $('.btn-top').addClass('show');
    } else {
      $('.btn-top').removeClass('show');
    }
  });
});
