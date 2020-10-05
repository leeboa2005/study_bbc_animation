"use script";

(() => {

    const actions = {
        birdFlies(key) {
            // key 가 true일때와  false떄 
            if (key) {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        },
        birdFlies2(key) {
            // key 가 true일때와  false떄 
            if (key) {
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px )`;
            } else {
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    };

    const stepElems = document.querySelectorAll('.step');
    const grahpicElems = document.querySelectorAll('.graphic-item');
    let currentItem = grahpicElems[0]; // 현제 활성화된(visbal 클레스가 붙은) .grapic-item을 지정 
    let ioIndex;

    // IntersectionObserver 관찰자를 초기화하고 관찰할 대상을 지정함 
    const io = new IntersectionObserver((entries, observer) => {
        // *1 을 해준이유는 문자열을 숫자로 바꾸기위함 이다. 
        ioIndex = entries[0].target.dataset.index * 1;
    });

    for (let i = 0; i < stepElems.length; i++) {
        io.observe(stepElems[i]);
        // stepElem[i].setAttribute('data-index', i);
        stepElems[i].dataset.index = i;
        grahpicElems[i].dataset.index = i;
    }

    function activate(action) {
        currentItem.classList.add('visible');
        if (action) {
            actions[action](true);
        }
    }

    function inactivate(action) {
        currentItem.classList.remove('visible');
        if (action) {
            actions[action](false);
        }
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        // let i = ioIndex - 1; i < ioIndex + 2; -> 현재보이는 요소 기준으로만 체크 
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            step = stepElems[i];
            if (!step) continue;
            boundingRect = step.getBoundingClientRect();

            if (boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8) {

                inactivate(currentItem.dataset.action);
                currentItem = grahpicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }
    });

    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100);
    });

    activate();
})();