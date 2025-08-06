$(function(){

    // 여기는 jqurey
    $('.nav-item').hover(function(){
        $(this).find('ul.lnb').fadeToggle();
    });
    $('.category').hover(function(){
        const w = $('.container').width();  // category의 가로크기를 읽어옴
        $('.categorybox').css('width', w + 'px'); // categorybox의 가로크기로 설정함
       $(this).find('.categorybox').fadeToggle(); 
    });

        // .best-cart 요소에 마우스를 올렸을 때
    $('.best-cart').mouseenter(function(){
        // 내부의 <i> 아이콘에서 '비어있는 장바구니' 클래스를 제거하고 '채워진 장바구니' 클래스를 추가
        $(this).find('i').removeClass('ri-shopping-bag-4-line').addClass('ri-shopping-bag-4-fill');
    }).mouseleave(function(){
        // 마우스를 떼면 다시 원래의 '비어있는 장바구니' 클래스로 복원
        $(this).find('i').removeClass('ri-shopping-bag-4-fill').addClass('ri-shopping-bag-4-line');
    });

    // .best-heart 요소에 마우스를 올렸을 때
    $('.best-heart').mouseenter(function(){
        // 내부의 <i> 아이콘에서 '빈 하트' 클래스를 제거하고 '채워진 하트' 클래스를 추가
        $(this).find('i').removeClass('ri-heart-line').addClass('ri-heart-fill');
    }).mouseleave(function(){
        // 마우스를 떼면 다시 원래의 '빈 하트' 클래스로 복원
        $(this).find('i').removeClass('ri-heart-fill').addClass('ri-heart-line');
    });

    $(window).on('scroll' , function(){
        const navigation = $('.navigation').offset().top;
        if($(this).scrollTop() > 170){
            $('.navigation').css({
                position : 'fixed',
                top : '45px',
                width : '100%'
            });
        }else{
            $('.navigation').css({
                position : 'static'
            })
        }
        // console.log(navigation);
        // console.log($(this).scrollTop);
    })

    setInterval(bestSlide , 8000);

    let wrapperWidth = 0;
    let pgCount = 0;
    const totalPage = 3;

    //페이지 버튼 생성
    for(let i = 0; i < totalPage; i++){
    if(i == 0){
        // 첫 번째 페이지는 'active' 클래스를 추가해서 현재 페이지로 표시
        $('#page').append(`<li data-index="${i}" class="active"></li>`);
    }else{
        // 나머지 페이지는 일반 li 요소로 추가
        $('#page').append(`<li data-index="${i}"></li>`);
        }
    }



    $(window).on('load' , function(){
    // 첫 번째 슬라이드의 높이를 가져와서 전체 슬라이드 래퍼에 적용
        const pageHeight = $('.slide-page').eq(0).outerHeight(true);
    $('.slide-wrapper').css('height', pageHeight + "px");

    // 슬라이드 래퍼의 너비를 가져와서 전역 변수 wrapperWidth에 저장
        wrapperWidth = $(".slide-wrapper").width();
    });




    function updatePage() {
    // 모든 페이지 표시에서 'active' 클래스 제거 후
    // 현재 페이지(pgCount)에 해당하는 li에 'active' 클래스 추가
    $("#page li").removeClass("active")
        .eq(pgCount).addClass('active');
    }


    function bestSlide(){
    pgCount++; // 다음 페이지로 이동
    if(pgCount == totalPage){
        // 마지막 페이지를 넘어서면 다시 첫 페이지로
        pgCount = 0;
    }

    updatePage(); // 페이지 표시 업데이트

    // 슬라이드 애니메이션: 왼쪽으로 한 페이지 너비만큼 이동
    $(".slide-wrapper-in").animate({
            left: -wrapperWidth + "px"
        }, 1000, function(){
        // 애니메이션 완료 후 실행되는 콜백 함수

        // 1. 첫 번째 슬라이드를 복제해서 맨 뒤에 추가
            const first = $('.slide-wrapper-in .slide-page').first();
            first.clone().appendTo('.slide-wrapper-in');

        // 2. 원래 첫 번째 슬라이드를 제거
            first.remove();

        // 3. 슬라이드 위치 초기화 (left: 0)
            $('.slide-wrapper-in').css('left', 0);
        });
    }

    

}); // 제이쿼리 마지막

//  json
// best.json 파일을 비동기적으로 불러옴
fetch('js/best.json') // 서버에서 JSON 파일을 요청
  .then(response => response.json()) // 응답(response)을 JSON 형식으로 파싱
  .then(products => { // 파싱된 JSON 데이터를 products 변수로 받아 처리 시작
    let slidePage = ""; // 전체 슬라이드 HTML을 담을 변수
    const itemsPerSlide = 8; // 슬라이드당 표시할 상품 개수
    const totalSlides = Math.ceil(products.length / itemsPerSlide); // 전체 슬라이드 수 계산 (올림 처리)

    // 최대 3개의 슬라이드까지만 생성
    for (let i = 0; i < totalSlides && i < 3; i++) {
      let colPage = ""; // 현재 슬라이드에 들어갈 상품 HTML을 담을 변수

      // 슬라이드에 들어갈 상품들을 반복 처리
      for (let j = i * itemsPerSlide; j < (i + 1) * itemsPerSlide && j < products.length; j++) {
        const p = products[j]; // 현재 상품 객체

        // 상품의 색상 배열을 span 태그로 변환하여 HTML로 만듦
        const colorSpans = p.color.map(c => `<span class="${c}"></span>`).join("");

        // 하나의 상품 카드 HTML 생성
        colPage += `
          <div class="col-md-3 my-3">
            <a href="#" class="img-best-box">
              <img src="${p.img}" alt="${p.alt}">
              <div class="pd-best-box text-center">
                <div class="pd-color">${colorSpans}</div>
                <div class="best-title">${p.title}</div>
                <div class="pd-best-pay">
                  <del>${p.cost}원</del>
                  <span class="sail">${p.sale}</span>
                  <span class="money">${p.price}원</span>
                </div>
              </div>
              <div class="btn-box">
                <button type="button" class="best-cart">
                  <i class="ri-shopping-bag-4-line"></i>
                </button>
                <button type="button" class="best-heart">
                  <i class="ri-heart-line"></i>
                </button>
              </div>
            </a>
          </div>
        `;
      }

      // 하나의 슬라이드 페이지 HTML을 전체 슬라이드에 추가
      slidePage += `<div class="row slide-page">${colPage}</div>`;
    }

    // 완성된 슬라이드 HTML을 실제 웹 페이지에 삽입
    document.querySelector('.slide-wrapper-in').innerHTML = slidePage;
  })
  .catch(error => console.error('데이터 불러오기 실패:', error)); // JSON 불러오기 또는 파싱 실패 시 오류 출력


//  json


    // 슬라이드 현재 인덱스 초기화
    let slideIndex = 1;

    // 슬라이드를 처음 로딩할 때 보여줌
    showSlides(slideIndex);

    // 일정 시간마다 다음 슬라이드로 넘어감 (2초마다 실행)
    setInterval(function(){
        pushSlides(1) // 다음 슬라이드로 이동
    }, 2000);

    // 검색 입력창과 폼 요소 가져오기
    const input = document.getElementById("searchInput");
    const form = document.getElementById("search");

    // 입력창에 포커스가 생기면 폼에 'focus' 클래스 추가
    input.addEventListener("focus", function(){
        form.classList.add('focus');
    });

    // 입력창 포커스가 해제되면 폼에서 'focus' 클래스 제거
    input.addEventListener("blur", function(){
        form.classList.remove("focus");
    });

    // 슬라이드 인덱스를 n만큼 증가시키고 슬라이드 표시 함수 호출
    function pushSlides(n){
        showSlides(slideIndex += n);
    }

    // 슬라이드 인덱스를 n만큼 감소시키고 슬라이드 표시 함수 호출
    function currentSlides(n){
        showSlides(slideIndex -= n);
    }

    // 실제 슬라이드 표시 로직
    function showSlides(n){
        let i;
        let slides = document.getElementsByClassName("mySlides"); // 슬라이드 목록 가져오기

        // 인덱스가 슬라이드 총 개수보다 크면 처음으로 되돌림
        if(n > slides.length) {
            slideIndex = 1;
        }

        // 모든 슬라이드를 숨김
        for(i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // 현재 인덱스의 슬라이드만 보여줌
        slides[slideIndex - 1].style.display = "block";
    }
