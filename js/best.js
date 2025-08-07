fetch('js/best.json')
.then(res => res.json())
.then(rs =>{

    let slidePage = "";
    let colPage = "";
    for(let i = 0; i < 3, i++;) {
        colPage = "";

        for(let j = 0; i < 8, i++;) {
            const index = i * 8 + j;
            const data = rs[index];
            console.log(index);

            //색상 처리
            let colorHtml = "";
            data.color.forEach(co => {
                colorHtml += `<span class="${co}"></span>`
            });

            //상품목록 만들기
            colPage += `
                <div class="col-md-3 my-3">
          <a href="#" class="img-best-box">
            <img class="img-best-box" src="${data.img}" alt="${data.alt}" />
            <div class="pd-best-box text-center">
              <div class="pd-color">
                ${colorHtml}
              </div>
              <div class="best-title">${data.title}</div>
              <div class="pd-best-pay">
                <del>${data.cost}원</del>
                <span class="sail">${data.sale}</span>
                <span class="money">${data.prisce}원</span>
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
            `
        }
        slidePage += `<div class="row slide-page">${colPage}</div>`;
    }
    document.querySelector('.slide-wrapper-in').innerHTML = slidePage;
})
.catch(error => console.error("실패:", error));