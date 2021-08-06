$(document).ready(function () {

    var pd_price = parseFloat($(".pd_price span").text().replace(",", ""));
    // console.log(pd_price);

    var final_price_n = 0;    //총 상품금액 초기값 숫자형으로
    var final_price_s = "";   //총 상품금액 문자형으로

    var title = ""; //상품 전체 타이틀
    var img = "";   //상품 대표 이미지

    var opt_1 = []; //옵션1의 정보 배열
    var opt_2 = []; //옵션2의 정보 배열
    var opt_price = [];         //각 옵션 기본값
    var count = [];             //각 옵션별 수량
    var opt_price_total = [];   //각 옵션들의 최종값

    $(".final_price span").text(final_price_n);

    function calc_price() {

        final_price_n = 0;

        for (i = 0; i < opt_price_total.length; i++) {
            final_price_n += opt_price_total[i];
        }
        // console.log(final_price_n);

        if (final_price_n == 0) { //모든 옵션창 삭제시
            $(".pd_result, .btns").hide();
            $("select option").prop("selected", false);
            $("#crush option:eq(0), #gram option:eq(0)").prop("selected", true);
            $("#gram").prop("disabled", true);
            // 지워보기
        } else {
            $(".pd_result, .btns").show();
        }

        final_price_s = final_price_n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $("")
        $(".final_price span").text(final_price_s);


    };

    var opt_box = `
    <li class="option_result">
        <p>프렌치프레스(1.0mm~)[200g]</p>
        <div class="option_total">
            <div class="count">
                <a class="minus" href="#">－</a>
                <input type="text" value="1" readonly>
                <a class="plus" href="#">＋</a>
            </div>
            <div class="price">
                <p><span>14,000</span>원</p>
                <div class="remove">×</div>
            </div>
        </div>
    </li>
    `;

    $(".pd_result, .btns").hide();  //옵션 선택 전, 하단 파트를 숨겨둠

    $("#crush option:eq(0), #gram option:eq(0)").prop("selected", true);    //첫번째 옵션(옵션선택txt) 나오게 하기

    $("#crush").change(function () {
        $("#gram").prop("disabled", false);
    });

    $("#gram").change(function () {
        $(".opt_box").append(opt_box);


        title = $(".pd_title").text();      //상품이름
        img = $(".left img").attr("src");   //상품이미지


        var opt_crush = $("#crush option:selected").text();
        // console.log(opt_crush);
        var opt_gram = $("#gram option:selected").text();
        // console.log(opt_gram);

        var opt_gram_n = parseFloat($("#gram option:selected").val());

        $(".option_result:last > p").text(opt_crush + " [" + opt_gram + "]");

        var price_now = pd_price + opt_gram_n;  //기본값 + 옵션값 초기
        // console.log(price_now);

        opt_1.push(opt_crush);      //선택한 옵션의 타이틀 배열
        // console.log(opt_1);
        opt_2.push(opt_gram);     //선택한 옵션의 각 가격 배열
        // console.log(opt_2);
        opt_price.push(price_now);  //선택한 옵션과 기본 가격 합의 배열
        // console.log(opt_price);
        count.push(1);
        opt_price_total.push(price_now);
        // console.log(opt_price_total);

        var opt_final = price_now.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $(".option_result:last .price p span").text(opt_final);

        $("select option").prop("selected", false);
        $("#crush option:eq(0), #gram option:eq(0)").prop("selected", true);
        $("#gram").prop("disabled", true);

        calc_price();

    });

    $(document).on("click", ".plus", function () {

        var index = $(this).closest(".option_result").index();
        // console.log(index);

        count[index]++;
        // console.log(count);

        $(this).siblings("input").val(count[index]);

        opt_price_total[index] = opt_price[index] * count[index];

        var final_opt = opt_price_total[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $(this).closest(".option_result").find(".price p span").text(final_opt);


        calc_price();

        return false;


    });

    $(document).on("click", ".minus", function () {
        var index = $(this).closest(".option_result").index();

        if (count[index] < 2) {

        } else {
            count[index]--;
            $(this).siblings("input").val(count[index]);
            opt_price_total[index] = opt_price[index] * count[index];

            var final_opt = opt_price_total[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            $(this).closest(".option_result").find(".price p span").text(final_opt);

            calc_price();
        }

        return false;

    });

    $(document).on("click", ".remove", function () {
        var del_index = $(this).closest(".option_result").index();
        opt_price.splice(del_index, 1);    //각 옵션 기본값
        count.splice(del_index, 1);         //각 옵션별 수량
        opt_price_total.splice(del_index, 1);   //각 옵션들의 최종값
        //얘들은?
        opt_1.splice(del_index, 1);
        opt_2.splice(del_index, 1);

        $(this).closest(".option_result").remove();

        calc_price();

        return false;
    });


    //  어려웠던 점
    //  1. 변수가 많아지니까 뭐가 뭔지 헷갈림
    //  2. 경우의 수를 다 고려하려니까 헷갈림

    var cart_list = `
    <div class="cart_list">
        <div class="pd_list">
            <div class="cart_img"></div>
            <div class="cart_info">
                <h3>상품이름</h3>
                <p><span>26,000</span>원</p>
            </div>
        </div>

    </div>
    `;


    var option_list = `
    <div class="option_list">
        <div class="opt_name">
            <p class="opt_name1">원두종류</p>
            <p class="opt_name2">용량</p>
        </div>
        <p class="price_opt"><span>26,000</span>원</p>
    </div>
    `;

    // ul과 li를 사용해서도 만들어 볼것


    $(".btns a:last-child").click(function () {

        $(".cart_pd").empty();

        $(".cart_pd").append(cart_list);
        $(".cart_img").css("background-image", "url(" + img + ")");
        $(".cart_info h3").text(title);
        $(".cart_info p span").text(final_price_s);

        for (i = 0; i < count.length; i++) {
            $(".cart_list").append(option_list);
        }


        $(".option_list").each(function (i) {
            $(this).find(".opt_name1").text(opt_1[i]);
            $(this).find(".opt_name2").text(opt_2[i]);

            var cart_opt_price = opt_price_total[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            $(this).find(".price_opt span").text(cart_opt_price);
        });

        // 더보기와 숨기기

        var opt_count = $(".option_list").length;
        // console.log(opt_count);
        if (opt_count > 2) {
            $(".option_list").eq(1).nextAll().hide();
            $(".option_list").eq(1).after("<a href='' class='opt_more'>더보기</a>");
        }

        $(".dark, .cart").addClass("active");

        return false;
    });

    //더보기 클릭
    $(document).on("click", ".opt_more", function () {
        $(this).remove();
        $(".option_list").show();
        return false;
    });


    $(".dark, .close, .cart_btns a:last").click(function () {
        $(".dark, .cart").removeClass("active");

        return false;
    });





});