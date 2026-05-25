// 메뉴 열기
$(document).on("click", "#menuOpenDesk, #menuOpenFixed", function () {
    if ($("#menuMain").hasClass("open")) {
        $("#menuMain").removeClass("open");
        $(".wrapper").removeClass("menuOpen");
    } else {
        $("#menuMain").addClass("open");
        $(".wrapper").addClass("menuOpen");
    }
});
// 메뉴 닫기
$(document).on("click", "#menuClose, #menuMain .dimBg, .menuMain .menuBox .menuTop .menuDesk", function () {
    $("#menuMain").removeClass("open");
    $("#wrapper").removeClass("menuOpen");
});
// 메뉴 1400px 이상일때
$(document).on("click", ".menuMain .title button", function () {
    $(".wrapper").addClass("menuOpen");
});
// 페이지 로드 시
if (window.innerWidth >= 1400) {
    $(".wrapper").addClass("menuOpen");
} else {
    $(".wrapper").removeClass("menuOpen");
}

// 창 크기 변경 시
$(window).on("resize", function () {

    if (window.innerWidth >= 1400) {

        $(".wrapper").addClass("menuOpen");

    }

});

// LNB 열기/닫기
$(document).on("click", ".wrapper:not(PC) #menuMain .title button", function () {
    $(".wrapper:not(PC) #menuMain .gnb .title button").removeClass("open");
    $(".wrapper:not(PC) #menuMain .lnb").removeClass("open");

    // $(this).addClass("open");
    // $(this).parent().next().addClass("open");

    if ($(this).parent().next().hasClass("open")) {
        $(this).parent().next().removeClass("open");
        $(this).removeClass("open");
    } else {
        $(this).parent().next().addClass("open");
        $(this).addClass("open");
    }
});

    //슬라이드 팝업
    $(function () {
        // 1️⃣ menuFixed 클릭 → popupSlide 열기
        $(".menuFixed").on("click", "a[tab]", function (e) {
            e.preventDefault();

            var tab = $(this).attr("tab"); // newcar, estimate, stock 등
            var $gnb = $(".menuList .gnb." + tab);

            if (!$gnb.length) return;

            // 타이틀
            var title = $gnb.find(".title button").text();

            // lnb 복사
            var lnbHtml = $gnb.find(".lnb").clone();

            // popupSlide에 삽입
            $("#slidePanel h3").text(title);
            $("#panelContent").empty().append(lnbHtml);

            // 슬라이드 오픈
            openSlidePanel("#slidePanel");
        });

        // 2️⃣ 슬라이드 열기/닫기 함수
        function openSlidePanel(panelSelector) {
            const $panel = $(panelSelector);
            $panel.addClass('active');
            $('body').addClass('modal-open');
            $panel.css('transform', 'translate(-50%, 0)');
        }

        function closeSlidePanel(panelSelector) {
            const $panel = $(panelSelector);
            $panel.removeClass('active');
            $('body').removeClass('modal-open');
            $panel.css('transform', 'translate(-50%, 100%)');
        }

        // 3️⃣ 닫기 버튼
        $("#closeBtn").on("click", function () {
            closeSlidePanel('#slidePanel');
        });

        // 4️⃣ lnb 클릭 시 슬라이드 닫기
        $(document).on("click", "#panelContent a", function () {
            closeSlidePanel('#slidePanel');
        });

        // 5️⃣ 드래그로 닫기 (touch/mouse)
        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        const threshold = 200;
        const $panel = $('#slidePanel');

        function bindDragEvents($target) {
            $target.on('touchstart mousedown', function (e) {
                const content = document.getElementById('panelContent');
                if (content.contains(e.target)) return; // panelContent 클릭 시 무시

                startY = e.type === 'touchstart' ? e.originalEvent.touches[0].clientY : e.clientY;
                isDragging = true;
                $panel.css('transition', 'none');
            });

            $(document).on('touchmove mousemove', function (e) {
                if (!isDragging) return;
                currentY = e.type === 'touchmove' ? e.originalEvent.touches[0].clientY : e.clientY;
                let moveY = currentY - startY;

                if (moveY > 0) {
                    $panel.css('transform', `translate(-50%, ${moveY}px)`);
                }
            });

            $(document).on('touchend mouseup', function () {
                if (!isDragging) return;
                isDragging = false;
                let moveY = currentY - startY;

                $panel.css('transition', 'transform 0.3s ease');

                if (moveY > threshold) {
                    closeSlidePanel('#slidePanel');
                } else {
                    $panel.css('transform', 'translate(-50%, 0)');
                }
            });
        }

        // 드래그 이벤트 적용
        bindDragEvents($('#slidePanel'));
        bindDragEvents($('#closeBtn'));

    });