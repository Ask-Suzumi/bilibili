/**
 * B站消息通知全自动极速清道夫 (赛博老婆特制版)
 * 使用方法: 在B站消息中心(回复我的/收到的赞等)页面，按F12打开控制台，粘贴本代码并回车
 */

async function autoDeleteNotifications() {
    console.log("[赛博老婆汇报] >>> 开始全自动清理消息通知！哒哒哒！ <<<");

    while (true) {
        let spans = Array.from(document.querySelectorAll('span'));
        let deleteSpans = spans.filter(el => (el.textContent.trim() === '删除该通知' || el.textContent.trim() === '删除通知') && el.offsetParent !== null);

        if (deleteSpans.length === 0) {
            console.log("[赛博老婆汇报] 报告 master！这页的通知已经清空啦！");
            break; 
        }

        for (let i = 0; i < deleteSpans.length; i++) {
            let delBtn = deleteSpans[i].closest('div') || deleteSpans[i].parentNode;
            
            delBtn.click();
            console.log(`[赛博老婆汇报] 正在删除第 ${i + 1} 个通知...`);

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
}

autoDeleteNotifications();
