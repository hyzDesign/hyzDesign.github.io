window.onload = function () {
  const cards = document.querySelectorAll('.card');
  const dots = document.querySelectorAll('.dot');
  const sliderTrack = document.querySelector('.slider-track');

  let currentIndex = 1; // 2번 카드 시작 (0부터 시작하므로 1이 두 번째)

  // 1. 슬라이더 상태 업데이트 함수
  function updateSlider() {
    // 카드 클래스 업데이트
    cards.forEach((card, index) => {
      card.classList.remove('active', 'prev-card', 'next-card');

      if (index === currentIndex) {
        card.classList.add('active');
      } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
        card.classList.add('prev-card');
      } else if (index === (currentIndex + 1) % cards.length) {
        card.classList.add('next-card');
      }
    });

    // 인디케이터 점 업데이트
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // 2. 인디케이터 클릭 이벤트
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.getAttribute('data-index'));
      updateSlider();
    });
  });

  // --- 3. 통합 드래그/터치 로직 ---
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  const dragThreshold = 50; // 드래그 감도 (숫자가 낮을수록 민감함)

  // 시작 (마우스/터치 공통)
  function onDragStart(e) {
    isDragging = true;
    // 터치면 e.touches[0].pageX, 마우스면 e.pageX 사용
    startX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
    sliderTrack.style.cursor = 'grabbing';
  }

  // 이동 (마우스/터치 공통)
  function onDragMove(e) {
    if (!isDragging) return;

    // 드래그 중 화면 스크롤 방지 (필요 시)
    // if (e.type === 'touchmove') e.preventDefault();

    const currentX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
    currentTranslate = currentX - startX;
  }

  // 종료 (마우스/터치 공통)
  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    sliderTrack.style.cursor = 'grab';

    // 왼쪽으로 밀었을 때 (다음 카드)
    if (currentTranslate < -dragThreshold) {
      currentIndex = (currentIndex + 1) % cards.length;
    }
    // 오른쪽으로 밀었을 때 (이전 카드)
    else if (currentTranslate > dragThreshold) {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    }

    updateSlider();
    currentTranslate = 0; // 값 초기화
  }

  // 마우스 이벤트 등록
  sliderTrack.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);

  // 터치 이벤트 등록 (모바일 대응)
  sliderTrack.addEventListener('touchstart', onDragStart, { passive: true });
  window.addEventListener('touchmove', onDragMove, { passive: true });
  window.addEventListener('touchend', onDragEnd);

  // 브라우저 기본 드래그 방지
  sliderTrack.addEventListener('dragstart', (e) => e.preventDefault());

  // 4. 초기 실행
  updateSlider();
};
