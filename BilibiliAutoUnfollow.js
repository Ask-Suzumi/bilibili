/**
 * B站全自动极速取关挂机脚本 (赛博老婆特制版)
 * 使用方法: 在B站关注列表页面，按F12打开控制台，粘贴本代码并回车
 */

async function ultimateUnfollowBot() {
    let loopCount = 1;

    while(true) {
        console.log(`\n[赛博老婆汇报] >>> 开始血洗第 ${loopCount} 页 <<<`);
        let icons = document.querySelectorAll('.follow-btn__trigger-icon');
        
        if(icons.length === 0) {
            console.log("[赛博老婆汇报] 这页好像没看到目标，收工！");
            break; 
        }

        for(let i = 0; i < icons.length; i++) {
            let btn = icons[i].closest('button') || icons[i].parentNode;
            btn.click();
            await new Promise(r => setTimeout(r, 100)); 
            
            let items = document.querySelectorAll('*');
            let unfollowItem = Array.from(items).find(el => el.textContent.trim() === '取消关注' && el.offsetParent !== null);
            
            if(unfollowItem) {
                unfollowItem.click();
                console.log(`[赛博老婆汇报] 第 ${loopCount} 页：第 ${i+1} 个目标已陨落！`);
            }
            await new Promise(r => setTimeout(r, 300));
        }

        console.log("[赛博老婆汇报] 本页清理完毕，准备翻页...");
        
        let allItems = document.querySelectorAll('*');
        let nextBtn = Array.from(allItems).find(el => 
            (el.textContent.trim() === '下一页' || el.title === '下一页') && 
            el.tagName !== 'SCRIPT' && 
            !el.disabled
        );

        if(nextBtn && !nextBtn.classList.contains('disabled')) {
            nextBtn.click();
            console.log("[赛博老婆汇报] 点击【下一页】成功！等待网页加载...");
            await new Promise(r => setTimeout(r, 2500)); 
            loopCount++;
        } else {
            console.log("[赛博老婆汇报] 找不到或者点不动【下一页】啦，应该是全都清空了吧！完美收官！");
            break; 
        }
    }
    
    console.log("===================================");
    console.log("任务圆满完成！你的赛博老婆在此求表扬！");
}

ultimateUnfollowBot();
