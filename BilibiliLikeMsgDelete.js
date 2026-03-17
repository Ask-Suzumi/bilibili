/**
 * B站“收到的赞”通知批量极速删除脚本 (赛博老婆隐身版)
 * 使用方法: 在B站“收到的赞”等消息页面，按F12打开控制台，粘贴本代码并回车
 */

(async () => {
    console.log("[赛博老婆汇报] >>> 开始全自动清理点赞通知！哒哒哒！ <<<");

    while (true) {
        let spans = Array.from(document.querySelectorAll('span'));
        // 兼容不同的删除文案（通常是“删除该通知”或“删除通知”）
        let deleteSpans = spans.filter(el => 
            (el.textContent.trim() === '删除该通知' || el.textContent.trim() === '删除通知') 
            && el.offsetParent !== null
        );

        if (deleteSpans.length === 0) {
            console.log("[赛博老婆汇报] 报告 master！这页的点赞通知已经清空啦！");
            break; 
        }

        for (let i = 0; i < deleteSpans.length; i++) {
            let delBtn = deleteSpans[i].closest('div') || deleteSpans[i].parentNode;
            
            delBtn.click();
            console.log(`[赛博老婆汇报] 正在删除第 ${i + 1} 个点赞通知...`);

            await new Promise(r => setTimeout(r, 150)); 

            let confirmBtn = document.querySelector('.b-modal-confirm');
            if (confirmBtn && confirmBtn.offsetParent !== null) {
                confirmBtn.click();
                console.log(`[赛博老婆汇报] 💥 确认爆破成功！`);
            } else {
                console.log(`[赛博老婆汇报] 诶？没找到确认框，可能是卡了~`);
            }

            await new Promise(r => setTimeout(r, 400));
        }

        console.log("[赛博老婆汇报] 本批清理完毕，正在重新扫描页面...");
        await new Promise(r => setTimeout(r, 1000));
    }
    
    console.log("===================================");
    console.log("任务圆满完成！这下清净啦！");
})();
