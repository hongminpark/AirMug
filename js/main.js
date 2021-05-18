// 즉시 호출 함수
(() => {

    let yOffset = 0;
    let prevScrollHeight = 0;
    let currentScene = 0;
    let enterNewScene = false;

    const sceneInfo = [
        // 브라우저 높이의 5배로 세팅
        // 해당 구간의 스크롤 가능 높이
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-section-0"),
                messageA: document.querySelector("#scroll-section-0 .main-message.a"),
                messageB: document.querySelector("#scroll-section-0 .main-message.b"),
                messageC: document.querySelector("#scroll-section-0 .main-message.c"),
                messageD: document.querySelector("#scroll-section-0 .main-message.d"),
                canvas: document.querySelector("#video-canvas-0"),
                context: document.querySelector("#video-canvas-0").getContext("2d"),
                videoImages: []
            },
            values: {
                videoImageCount: 300,
                imageSequence: [0, 299],
                canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
                // start~end 구간에서 0~1 opacity를 나누어가짐
                // 이걸 구간별로 나누지 말고 함수로 생성하면 좋을듯
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],

            }

        },
        {
            type: 'normal',
            // heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-section-1")
            }
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
                messageB: document.querySelector('#scroll-section-2 .b'),
                messageC: document.querySelector('#scroll-section-2 .c'),
                pinB: document.querySelector('#scroll-section-2 .b .pin'),
                pinC: document.querySelector('#scroll-section-2 .c .pin'),
                canvas: document.querySelector("#video-canvas-1"),
                context: document.querySelector("#video-canvas-1").getContext("2d"),
                videoImages: []
            },
            values: {
                videoImageCount: 960,
                imageSequence: [0, 959],
                canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
                canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
                messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
                messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
                messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
                messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
                messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
                messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
                messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
                messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
                messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
                messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
                pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
                pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
            }
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
                canvasCaption: document.querySelector('.canvas-caption'),
                canvas: document.querySelector(".image-blend-canvas"),
                context: document.querySelector(".image-blend-canvas").getContext("2d"),
                imagesPath: [
                    './images/blend-image-1.jpg',
                    './images/blend-image-2.jpg'
                ],
                images: []
            },
            values: {
                rect1X: [0, 0, {start: 0, end: 0}],
                rect2X: [0, 0, {start: 0, end: 0}],
                rectStartY: 0
            }
        }
    ]

    function setCanvasImages() {
        let imgElem;
        for (let i=0; i<sceneInfo[0].values.videoImageCount; i++) {
            imgElem = new Image();
            imgElem.src = `./video/001/IMG_${6726+i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }

        let imgElem2;
        for (let i=0; i<sceneInfo[2].values.videoImageCount; i++) {
            imgElem2 = new Image();
            imgElem2.src = `./video/002/IMG_${7027+i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }

        let imgElem3;
        for (let i=0; i<sceneInfo[3].objs.imagesPath.length; i++) {
            imgElem3 = new Image();
            imgElem3.src = sceneInfo[3].objs.imagesPath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        }
    }
    setCanvasImages();

    function setLayout() {
        // 각 스크롤 섹션 높이 세팅
        for (let i=0; i<sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if (sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.scrollHeight;
            }

            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        let totalScrollHeight = 0;
        yOffset = window.pageYOffset
        for (let i=0; i<sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);

        const heightRatio = window.innerHeight / 1080;
        // translate -50으로 가운데정렬 맞춤
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i=0; i<currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
            enterNewScene = true
        } else if (yOffset < prevScrollHeight) {
            if (currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
            enterNewScene = true
        } else {
            enterNewScene = false
        }

        if (enterNewScene) return;
        playAnimation();

    }

    function playAnimation() {
        const values = sceneInfo[currentScene].values;
        const objs = sceneInfo[currentScene].objs;
        const currentYOffset = yOffset - prevScrollHeight
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        switch (currentScene) {
            case 0:                
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset)


                // console.log('0 play');
                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
    
                break;
    
            case 2:
                let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

                if (scrollRatio <= 0.5) {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
                } else {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
                }

                // console.log('2 play');
                if (scrollRatio <= 0.32) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.67) {
                    // in
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }
    
                if (scrollRatio <= 0.93) {
                    // in
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
    
                break;
    
            case 3:
                // console.log('3 play');
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightratio = window.innerHeight / objs.canvas.height;

                // 더 긴 값 기준으로 AspectRatio의 비율 선택 
                canvasScaleRatio = widthRatio <= heightratio ? heightratio : widthRatio;
                objs.canvas.style.transform = `scale(${canvasScaleRatio})`
                objs.context.fillStyle = 'white'
                objs.context.drawImage(objs.images[0], 0, 0);

                // 캔버스 사이즈에 맞춰 가정한 innerWidth, innerHeight 
                const reCalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio
                const reCalculatedInnerHeight = window.innerHeight  / canvasScaleRatio

                if (!values.rectStartY) {
                    // 사각 animation 시작/끝 
                    // getBoundingClientRect는 스크롤 속도에 따라 다름 
                    values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2
                    // values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight
                    // values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight
                    values.rect1X[2].end = values.rectStartY / scrollHeight
                    values.rect2X[2].end = values.rectStartY / scrollHeight
                }

                // 양쪽 가릴 SideCanvas
                const whiteRectWidth = reCalculatedInnerWidth * 0.15;

                // [0]: 출발위치, [1]: 종료위치
                // canvas에 대한 상대위치이기 때문. <- 이해안가면 강의 다시 보기
                values.rect1X[0] = (objs.canvas.width - reCalculatedInnerWidth) / 2;
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth
                values.rect2X[0] = values.rect1X[0] + reCalculatedInnerWidth - whiteRectWidth
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

                // x, y, width, height
                // parseInt 정수로 하면 좀더 빠름
                // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), reCalculatedInnerWidth);
                // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), reCalculatedInnerWidth);

                objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);
                objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);
            
                break;
        }    
    }
    
    function calcValues(values, currentYOffset) {
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length === 3) {
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset < partScrollStart) {
                rv = values[0];
            } else if (partScrollStart <= currentYOffset && currentYOffset <= partScrollEnd) {
                rv = values[0] + (values[1] - values[0]) * ((currentYOffset - partScrollStart) / partScrollHeight);
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1];
            }
        } else {
            rv = values[0] + (values[1] - values[0]) * scrollRatio;
        }

        return rv
    }

    window.addEventListener('load', () => {
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0)
    });
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset
        scrollLoop();
    })
    window.addEventListener('resize', setLayout);
    

})();

// (function () {})(); 와 동일