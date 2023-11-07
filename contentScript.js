(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value } = obj;

        if (type === "NEW") {
            pageLoaded();
        }
    });

    let stopProcessing = true;
    let countNumberAddFriend = 0;
    async function startAuto(wrapper) {
        let prevElementCount = 0;

        while (!stopProcessing) {
            const elements = document.querySelectorAll(
                ".x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft"
            );

            if (elements.length > prevElementCount) {
                for (let i = prevElementCount; i < elements.length; i++) {
                    if (elements[i].innerHTML === "Thêm bạn bè") {
                        elements[i].click();
                        countNumberAddFriend = countNumberAddFriend + 1;

                        const countTag = document.createElement('div');
                        countTag.className = 'count-loop';
                        countTag.textContent = countNumberAddFriend;
                        wrapper.append(countTag);

                        await sleep(1500);
                        const modalElement = document.querySelector(
                            ".x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft.x1120s5i"
                        );

                        if (modalElement) {
                            const e = document.querySelectorAll(".x14qfxbe.x1qhmfi1.xc9qbxq");
                            e[0].click();
                            await sleep(5000);
                        } else {
                            const randomSleep = getRandomInt(10000, 15000);
                            await sleep(randomSleep);
                        }
                    }
                }
                prevElementCount = elements.length;
            }

            window.scrollTo(0, document.body.scrollHeight);
            await sleep(1500);
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function stopAuto() {
        stopProcessing = true;
        window.location.reload(true);
    }

    function pageLoaded() {
        const parent = document.getElementById('facebook');
        const wrapper = document.createElement('div');
        wrapper.className = "toogle-btn auto-steal-friend-btn";
        parent.append(wrapper);

        const bookmarkBtn = document.createElement("img");
        bookmarkBtn.src = chrome.runtime.getURL("assets/power-off.png");
        bookmarkBtn.className = "toogle-btn auto-steal-friend-btn";
        bookmarkBtn.title = "Click to start auto";
        wrapper.append(bookmarkBtn);

        bookmarkBtn.addEventListener('click', (e) => {
            if (!stopProcessing) {
                bookmarkBtn.src = chrome.runtime.getURL("assets/power-off.png");
                bookmarkBtn.title = "Click to start auto";
                stopAuto();
            } else {
                bookmarkBtn.src = chrome.runtime.getURL("assets/power-on.png");
                bookmarkBtn.title = "Click to stop auto";

                stopProcessing = false;
                startAuto(wrapper);
            }
        });
    }
    pageLoaded();
})();
