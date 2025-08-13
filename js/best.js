// best.json 파일을 가져와서 처리
fetch('js/best.json')
  .then(res => res.json()) // JSON 형식으로 변환
  .then(rs => {
    let slidePage = ""; // 전체 슬라이드 페이지 HTML
    let colPage = "";   // 각 슬라이드 안의 컬럼 HTML

    // 슬라이드 페이지는 총 3개 생성
    for (let i = 0; i < 3; i++) {
      colPage = ""; // 슬라이드 내부 초기화

      // 각 슬라이드에 8개의 상품 표시
      for (let j = 0; j < 8; j++) {
        const index = i * 8 + j; // 전체 데이터 인덱스 계산
        const data = rs[index];  // 해당 인덱스의 데이터 가져오기
      //  console.log(index);      // 콘솔에 인덱스 출력

        // 색상 처리: 색상 배열을 span 태그로 변환
        let colorHtml = "";
        data.color.forEach(co => {
          colorHtml += `<span class="${co}"></span>`;
        });

        // 상품 카드 HTML 생성
        colPage += `
          <div class="col-md-3 my-3">
                        <a href="#" class="img-best-box">
                            <img src="${data.img}" alt="${data.alt}">
                            <div class="pd-best-box text-center">
                                <div class="pd-color">
                                    ${colorHtml}
                                </div>
                                <div class="best-title">${data.title}</div>
                                <div class="pd-best-pay">
                                <del>${data.cost}원</del>
                                <span class="sail">${data.sale}</span>
                                <span class="money">${data.price}원</span>
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

      // 슬라이드 페이지에 컬럼 HTML 추가
      slidePage += `<div class="row slide-page">${colPage}</div>`;
    }

    // 완성된 슬라이드 HTML을 DOM에 삽입
    document.querySelector('.slide-wrapper-in').innerHTML = slidePage;
  })
  .catch(error => console.error("실패:", error)); // 오류 처리
