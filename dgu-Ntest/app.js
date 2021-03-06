function viewFinalPoint() {
    let url = "/zax/morehistory";
    let type = "post";
    let opt = {
        start: 0,
        end: 10
    };
    
    if (!isCaping) {
        isAutoMsg = false;
        ajaxing();
    }

    isNoBG = false;
    capResult = null;
    capOK = false;
    isCaping = true;
    _callback = "";

    $.ajax({
        type: type,
        url: url,
        data: opt,
        success: result => {
            capResult = result;
            isCaping = false;

            // 점수 표시
            for (let idx = 0; idx < capResult.Obj.length; idx++) {
                let li_node = document.querySelector(`li[data-eno="${idx}"]`) || false;
                if (li_node) {
                    li_node.querySelector('div').innerHTML += `
                        <p class="txt">
                            내 점수: ${capResult.Obj[idx].FinalPoint}점
                        </p>
                    `;
                }
            }

            setcap();
        },
        error: result => {
            console.log(result.responseText);
            isCaping = false;
            msg("네트워크 상태를 확인해주세요.");
            location.href = "/";
        },
        complete: () => {
            ajaxing(false);
        }
    });
}

viewFinalPoint();