// 토글
const toggleBtn = document.querySelector(".navbar_toggleBtn");
const menu = document.querySelector(".navUl");

const popuptogglebtn = document.querySelector(".btn-open-popup");
const popupClose = document.querySelector(".popup-close");
const donutPopup = document.querySelector(".donut-popup");

popuptogglebtn.addEventListener('click', () => {
    donutPopup.classList.toggle('active');
});
popupClose.addEventListener('click', () => {
    donutPopup.classList.toggle('active');
})
const main = document.querySelector('main');
const titleSpan = document.querySelector('.title2 span');

const donutImg = document.querySelector('.main-donut-img');

const btns = document.querySelectorAll('.left-btns button');

window.onload = function () {

    // 지도가져오기
    var mapContainer = document.getElementById('map');
    var mapOption = {
        center: new kakao.maps.LatLng(37.55, 126.97), // 서울 시청 근처 중심 좌표
        level: 8
    };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 임의로 만든 매장 위치
    const chainStore = [
        { storename: '강남점', lat: 37.498, lng: 127.027 },
        { storename: '홍대점', lat: 37.557, lng: 126.924 },
        { storename: '시청점', lat: 37.598, lng: 127.027 }
    ];

    const markerImage = new kakao.maps.MarkerImage(
        './img/mapmarker.png', // 원하는 색상의 마커 이미지
        new kakao.maps.Size(20, 25) // 이미지 크기
    );

    // 매장 마커 표시
    chainStore.forEach(store => {
        let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(store.lat, store.lng),
            title: store.storename,
            image: markerImage
        });

        // 마커 클릭 시 정보창 띄우기
        let infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${store.storename} 클릭해서 주문하세요</div>`
        });

        kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
            // 클릭 시 선택 처리 함수 호출 (추후에 구현)
            storeSelected(store.storename);
        });
    });
};


let selectedStoreName = ''; // 선택된매장명  
let storespan = document.querySelector('.storeName');
const stocks = document.querySelector('.stocks');
const stockItem = document.createElement('div');
stockItem.classList.add('stock-item');
const stockMsg = document.createElement('p');
stocks.appendChild(stockMsg);
// 매장 재고상태
const storeStock = [
    {
        storename: '강남점',
        donuts: [
            {
                donutName: '초코크림링',
                stock: 5,
                isSoldOut: false,
                img: './img/donut5.jpg',
            },
            {
                donutName: '블루베리펀치',
                stock: 3,
                isSoldOut: false,
                img: './img/donut8.jpg',
            },
            {
                donutName: '체리크림',
                stock: 2,
                isSoldOut: false,
                img: './img/donut9.jpg',
            }],
    },
    {
        storename: '홍대점',
        donuts: [
            {
                donutName: '초코바나나',
                stock: 5,
                isSoldOut: false,
                img: './img/donut14.jpg',
            },
            {
                donutName: '슈가링크림',
                stock: 3,
                isSoldOut: false,
                img: './img/donut4.jpg',
            },
            {
                donutName: '체리크림',
                stock: 2,
                isSoldOut: false,
                img: './img/donut9.jpg',
            }],
    },
    {
        storename: '시청점',
        donuts: [
            {
                donutName: '초코크럼블',
                stock: 5,
                isSoldOut: false,
                img: './img/donut2.jpg',
            },
            {
                donutName: '헬로키티콜라보',
                stock: 3,
                isSoldOut: false,
                img: './img/donut7.jpg',
            },
            {
                donutName: '초코크림링',
                stock: 2,
                isSoldOut: false,
                img: './img/donut5.jpg',
            }],
    }
]
// 매장 선택 처리 예시 함수 (임시)
function storeSelected(name) {
    selectedStoreName = name;
    alert(selectedStoreName + " 매장이 선택되었습니다.");
    storespan.textContent = name;
    dom();
}
// 매장 재고 상태 확인 함수 (임시)
function dom() {
    stocks.innerHTML = ''; // 기존 내용 초기화

    storeStock.forEach(store => {
        if (store.storename === selectedStoreName) {
            store.donuts.forEach(donut => {
                const stockItem = document.createElement('div');
                stockItem.classList.add('stock-item');

                const donutImg = document.createElement('img');
                donutImg.src = donut.img;
                donutImg.classList.add('donut-img');
                stockItem.appendChild(donutImg);

                const donutName = document.createElement('h3');
                donutName.textContent = donut.donutName; // 도넛 이름
                stockItem.appendChild(donutName);

                const donutStock = document.createElement('p');
                donutStock.textContent = `재고수량 : ${donut.stock}개`; // 도넛 개수
                stockItem.appendChild(donutStock);

                const stockBtns = document.createElement('div');
                stockBtns.classList.add('stock-btns');
                const rangeInput = document.createElement('input');
                rangeInput.type = 'range';
                rangeInput.min = '0';
                rangeInput.max = donut.stock.toString(); // 도넛 재고까지만 가능
                rangeInput.value = '0';
                stockBtns.appendChild(rangeInput);

                // - 0 + 버튼
                // - 버튼
                const minusBtn = document.createElement('button');
                minusBtn.classList.add('minus');
                minusBtn.textContent = '-';
                stockBtns.appendChild(minusBtn);
                // 슬라이더 값 표시할 span
                const rangeValue = document.createElement('span');
                rangeValue.textContent = '0';
                rangeValue.classList.add('range');
                stockBtns.appendChild(rangeValue);

                // + 버튼
                const plusBtn = document.createElement('button');
                plusBtn.classList.add('plus');
                plusBtn.textContent = '+';
                stockBtns.appendChild(plusBtn);



                // 장바구니 버튼
                const basketBtn = document.createElement('button');
                basketBtn.classList.add('btn-basket');
                basketBtn.textContent = '장바구니 담기+';
                stockBtns.appendChild(basketBtn);
                basketBtn.addEventListener('click', () => {
                    const quantity = Number(rangeInput.value); // 현재 슬라이더 값
                    addToCart(donut, quantity); // 장바구니 함수에 전달
                });
                // 슬라이더 동기화 로직
                rangeInput.addEventListener('input', () => {
                    rangeValue.textContent = rangeInput.value;
                });

                plusBtn.addEventListener('click', () => {
                    if (Number(rangeInput.value) < Number(rangeInput.max)) {
                        rangeInput.value = Number(rangeInput.value) + 1;
                        rangeValue.textContent = rangeInput.value;
                    }
                });

                minusBtn.addEventListener('click', () => {
                    if (Number(rangeInput.value) > Number(rangeInput.min)) {
                        rangeInput.value = Number(rangeInput.value) - 1;
                        rangeValue.textContent = rangeInput.value;
                    }
                });
                stockItem.appendChild(stockBtns);
                stocks.appendChild(stockItem);
            });
        }
    });
}
let cart = [];

function addToCart(donut, quantity) {
    if (quantity <= 0) {
        alert('수량을 1개 이상 담아주세요.');
        return;
    }

    if (quantity > donut.stock) {
        alert("도넛의 재고보다 많은 수량을 담을 수 없습니다.");
        return;
    }

    // 기존에 장바구니에 있는 도넛 찾기
    const existingItem = cart.find(item =>
        item.storename === selectedStoreName && item.donuts === donut.donutName
    );

    if (existingItem) {
        const newTotal = existingItem.quantity + quantity;

        if (newTotal > donut.stock) {
            alert('이미 담긴 수량과 합산하면 재고를 초과합니다.');
            return;
        }

        existingItem.quantity = newTotal;
        alert(`${donut.donutName} 수량이 장바구니에서 ${newTotal}개로 업데이트되었습니다.`);
    } else {
        // 새 도넛 객체 생성
        const cartItem = {
            storename: selectedStoreName,
            donuts: donut.donutName,
            quantity: quantity,
            img: donut.img
        };

        cart.push(cartItem);
        alert(`${donut.donutName}을 장바구니에 추가했습니다.`);
    }

    console.log(cart);
    renderCart();
}


const basketList = document.querySelector('.basket-list');

function renderCart() {
    const basketList = document.querySelector('.basket-list');
    basketList.innerHTML = '<h3>장바구니</h3>'; // 기존 전체 초기화

    // 지점별로 그룹핑
    const grouped = {};
    cart.forEach(item => {
        if (!grouped[item.storename]) grouped[item.storename] = [];
        grouped[item.storename].push(item);
    });

    // 지점별로 출력
    for (const store in grouped) {
        // ✅ 지점 제목은 한번만
        const storeTitle = document.createElement('h4');
        storeTitle.textContent = `🏪 ${store}`;
        basketList.appendChild(storeTitle);

        // ✅ 그 아래 도넛들 담을 div
        const storeGroup = document.createElement('div');
        storeGroup.classList.add('store-group'); // 스타일링 필요 시

        grouped[store].forEach(item => {
            const basketItem = document.createElement('div');
            basketItem.classList.add('basket-item');

            // 이미지
            const img = document.createElement('img');
            img.src = item.img// 나중에 item.img 로 바꿔도 됨
            img.style.width = '100px';
            img.style.height = '100px';
            basketItem.appendChild(img);

            // 이름
            const name = document.createElement('h3');
            name.textContent = item.donuts;
            basketItem.appendChild(name);

            // 수량
            const quantity = document.createElement('p');
            quantity.textContent = `${item.quantity}개`;
            basketItem.appendChild(quantity);

            // 삭제 버튼
            const btnWrapper = document.createElement('div');
            btnWrapper.classList.add('stock-btns');

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn-basket');
            deleteBtn.textContent = '장바구니 삭제';
            deleteBtn.addEventListener('click', () => {
                removeCartItem(store, item.donuts);
            });

            btnWrapper.appendChild(deleteBtn);
            basketItem.appendChild(btnWrapper);

            // 도넛 항목을 group div에 추가
            storeGroup.appendChild(basketItem);
        });

        // group을 basketList에 추가
        basketList.appendChild(storeGroup);
    }
}


function removeCartItem(storename, donutName) {
    const result = confirm("정말 삭제하시겠습니까?");
    if (result) {
        cart = cart.filter(item => !(item.storename === storename && item.donuts === donutName));
        renderCart(); // 삭제 후 다시 렌더링
    }
    else {
        return;
    }
}

function openGmailCompose() {
    const email = "virtualdonutcompany@gmail.com"; // 받는 이메일 주소
    const subject = encodeURIComponent("문의");
    const body = encodeURIComponent("안녕하세요, 아래 내용을 참고해주세요:\n\n");

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    // 새 창 또는 팝업창으로 열기
    window.open(gmailUrl, "_blank", "width=600,height=700");
}
function paymentPopup() {
    alert('현재 준비중으로 주문이 불가합니다 !!');
}
const mainbanner = document.querySelectorAll('main');
const article = document.querySelectorAll('article');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible'); // 관찰영역 벗어나면 클래스 제거
        }
    });
}, { threshold: 0.3 });

mainbanner.forEach(block => observer.observe(block));
article.forEach(block => observer.observe(block));
