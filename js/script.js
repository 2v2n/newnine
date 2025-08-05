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
            $('#page').append(`<li data-index="${i}" class="active"></li>`);
        }else{
            $('#page').append(`<li data-index="${i}"></li>`);
        }
    }


    $(window).on('load' , function(){
        const pageHeight = $('.slide-page').eq(0).outerHeight(true);
        $('.slide-wrapper').css('height', pageHeight + "px");
        wrapperWidth = $(".slide-wrapper").width();
    });



    function updatePage() {
  $("#page li").removeClass("active")
                .eq(pgCount).addClass('active');
}

    function bestSlide(){
        pgCount++;
        if(pgCount == totalPage){
            pgCount = 0;
        }
        updatePage();
   
        $(".slide-wrapper-in").animate({
            left: -wrapperWidth + "px"
        }, 300, function(){
            //1. 첫 번째 슬라이드 복제 후 뒤로 이동
            const first = $('.slide-wrapper-in .slide-page').first();
            first.clone().appendTo('.slide-wrapper-in')
            first.remove();
            $('.slide-wrapper-in').css('left', 0);
        });

     }


}); // 제이쿼리 마지막



    // 슬라이드 현재 인덱스 초기화
    let slideIndex = 1;

    // 슬라이드를 처음 로딩할 때 보여줌
    showSlides(slideIndex);

    // 일정 시간마다 다음 슬라이드로 넘어감 (2초마다 실행)
    setInterval(function(){
        pushSlides(1) // 다음 슬라이드로 이동
    }, 4000);

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
