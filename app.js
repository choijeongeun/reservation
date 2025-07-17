// 지역별 세부 지역 데이터
const subRegions = {
    seoul: ["가평", "강화", "고양", "과천", "광명", "광주", "구리", "군포", "김포", "남양주", "동두천", "부천", "성남", "수원", "시흥", "안산", "안성", "안양", "양주", "양평", "여주", "연천", "오산", "용인", "의왕", "의정부", "이천", "파주", "평택", "포천", "하남", "화성"]
};

const mainRegion = document.getElementById('mainRegion');
const subRegion = document.getElementById('subRegion');

function updateSubRegionOptions() {
    if (mainRegion.value === "seoul") {
        subRegion.innerHTML = '<option value="">-- 세부 지역 선택 --</option>' +
            subRegions.seoul.map(r => `<option value="${r}">${r}</option>`).join('');
    } else if (mainRegion.value === "") {
        subRegion.innerHTML = '<option value="">-- 세부 지역 선택 --</option>';
    } else {
        subRegion.innerHTML = '<option value="">-- 세부 지역 없음 --</option>';
    }
}

mainRegion.addEventListener('change', updateSubRegionOptions);
window.addEventListener('DOMContentLoaded', updateSubRegionOptions);

// 로그인 여부 시뮬레이션 (localStorage.isLoggedIn === 'true'면 로그인 상태)
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

document.getElementById('searchBtn').addEventListener('click', function() {
    // 유효성 검사
    if (mainRegion.value === "") {
        alert('지역을 선택하세요.');
        mainRegion.focus();
        return;
    }
    if (mainRegion.value === "seoul" && subRegion.value === "") {
        alert('세부지역을 선택하세요.');
        subRegion.focus();
        return;
    }
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    if (!checkIn || !checkOut || checkIn > checkOut) {
        alert('올바른 날짜를 선택하세요.');
        return;
    }
    const guests = document.getElementById('guests').value;
    if (!guests || guests < 1) {
        alert('인원을 1명 이상 입력하세요.');
        return;
    }
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    } else {
        window.location.href = 'reservation.html';
    }
});

// (테스트용) 로그인/로그아웃 토글 단축키
window.addEventListener('keydown', function(e) {
    if (e.key === 'l') {
        localStorage.setItem('isLoggedIn', 'true');
        alert('로그인 상태로 전환됨');
    } else if (e.key === 'o') {
        localStorage.setItem('isLoggedIn', 'false');
        alert('로그아웃 상태로 전환됨');
    }
}); 