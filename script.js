// Jia & MS의 꽃잎한글
// 통합 코드 조각: script.js 안에 추가/수정할 부분 중심 💚

let currentMode = 'KR'; // 기본은 한글

// 모드 버튼 이벤트 연결
const modeButtons = {
    Korean: 'KR',
    English: 'EN',
    Number: 'NUM',
    Symbol: 'SYM'
};

Object.entries(modeButtons).forEach(([id, mode]) => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('click', () => {
            currentMode = mode;
            updateModeVisuals();
            updateModeButtonsUI();
            updateDirectionHints();
        });
    }
});

// 다국어/다기호 입력용 매핑
const DIRECTION_MAPS = {
    EN: {
        directions: {
            right: 'a', up: 'w', left: 's', down: 'd',
            'up-right': 'e', 'up-left': 'q', 'down-right': 'z', 'down-left': 'x'
        }
    },
    NUM: {
        directions: {
            right: '1', up: '2', left: '3', down: '4',
            'up-right': '5', 'up-left': '6', 'down-right': '7', 'down-left': '8'
        }
    },
    SYM: {
        directions: {
            right: '!', up: '@', left: '#', down: '$',
            'up-right': '%', 'up-left': '^', 'down-right': '&', 'down-left': '*'
        }
    }
};

// 자음 탭 입력 처리 확장 (한글 외 모드 대응)
function handleConsonantTap(direction) {
    if (currentMode === 'KR') {
        const singleChar = DIRECTIONS.consonant[direction]?.char;
        if (!singleChar) return;
        appendCharToInput(singleChar);
    } else {
        const char = DIRECTION_MAPS[currentMode]?.directions[direction];
        if (char) appendCharToInput(char, true); // skipBuffer: 조합 안함
    }
}

// 자음 드래그도 확장
function handleConsonantDrag(direction) {
    if (currentMode === 'KR') {
        const charToInput = DIRECTIONS.consonant[direction]?.dragChar;
        if (charToInput) appendCharToInput(charToInput);
    } else {
        const char = DIRECTION_MAPS[currentMode]?.directions[direction];
        if (char) appendCharToInput(char, true);
    }
}

// 💠 모드에 따른 시각적 피드백 추가 (배경 색상)
function updateModeVisuals() {
    const inputArea = document.getElementById('kkotipInput');
    const colorMap = {
        KR: '#ffffff',
        EN: '#f0f8ff',
        NUM: '#fffde7',
        SYM: '#fce4ec'
    };
    inputArea.style.backgroundColor = colorMap[currentMode] || '#ffffff';
}

// 🌟 선택된 모드 버튼 강조
function updateModeButtonsUI() {
    Object.entries(modeButtons).forEach(([id, mode]) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.classList.toggle('active-mode', currentMode === mode);
        }
    });
}

// 🌟 입력 방향 힌트 업데이트 (선택사항)
function updateDirectionHints() {
    const hints = {
        KR: {},
        EN: {
            up: 'w', down: 'd', left: 's', right: 'a',
            'up-left': 'q', 'up-right': 'e',
            'down-left': 'x', 'down-right': 'z'
        },
        NUM: {
            up: '2', down: '4', left: '3', right: '1',
            'up-left': '6', 'up-right': '5',
            'down-left': '8', 'down-right': '7'
        },
        SYM: {
            up: '@', down: '$', left: '#', right: '!',
            'up-left': '^', 'up-right': '%',
            'down-left': '*', 'down-right': '&'
        }
    };

    const currentHints = hints[currentMode] || {};
    ['up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right'].forEach(dir => {
        const el = document.querySelector(`.hint.${dir}`);
        el.textContent = currentHints[dir] || '';
    });
}

// ✨ 텍스트 복사 기능
function copyTextToClipboard() {
    const text = document.getElementById('kkotipInput').value;
    navigator.clipboard.writeText(text).then(() => {
        alert('복사되었습니다!');
    }).catch(err => {
        alert('복사 실패: ' + err);
    });
}

// ✨ 텍스트 저장 기능
function downloadTextFile() {
    const text = document.getElementById('kkotipInput').value;
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'kkotip_output.txt';
    a.click();
    URL.revokeObjectURL(a.href);
}

// 페이지 로드시 초기 설정 적용
window.addEventListener('DOMContentLoaded', () => {
    updateModeVisuals();
    updateModeButtonsUI();
    updateDirectionHints();

    const copyBtn = document.getElementById('copyButton');
    const saveBtn = document.getElementById('saveButton');
    if (copyBtn) copyBtn.addEventListener('click', copyTextToClipboard);
    if (saveBtn) saveBtn.addEventListener('click', downloadTextFile);
});

function updateModeButtonsUI() {
    Object.entries(modeButtons).forEach(([id, mode]) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.classList.toggle('active-mode', currentMode === mode);
        }
    });
}

function updateDirectionHints() {
    const hints = {
        KR: {}, // 한글은 빈칸 (또는 자음/모음 표시해도 됨)
        EN: {
            up: 'w', down: 'd', left: 's', right: 'a',
            'up-left': 'q', 'up-right': 'e',
            'down-left': 'x', 'down-right': 'z'
        },
        NUM: {
            up: '2', down: '4', left: '3', right: '1',
            'up-left': '6', 'up-right': '5',
            'down-left': '8', 'down-right': '7'
        },
        SYM: {
            up: '@', down: '$', left: '#', right: '!',
            'up-left': '^', 'up-right': '%',
            'down-left': '*', 'down-right': '&'
        }
    };

    const currentHints = hints[currentMode] || {};
    Object.entries(currentHints).forEach(([dir, char]) => {
        const el = document.querySelector(`.hint.${dir}`);
        if (el) el.textContent = char;
    });

    // 빈칸 처리 (안쓰는 방향도 비워줌)
    ['up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right'].forEach(dir => {
        if (!currentHints[dir]) {
            const el = document.querySelector(`.hint.${dir}`);
            if (el) el.textContent = '';
        }
    });
}




document.addEventListener('DOMContentLoaded', () => {
    const kkotipInput = document.getElementById('kkotipInput');
    const inputButtonContainer = document.getElementById('inputButtons');
    const mainInputButton = document.getElementById('mainInputButton');
    const refreshButton = document.getElementById('refreshButton');
    const rightHandRadio = document.getElementById('rightHand');
    const leftHandRadio = document.getElementById('leftHand');
	const deleteButton = document.getElementById('deleteButton'); 
	let rawBuffer = '';   
	let tapTimer = null;  
	    
    // 버튼 위치 설정
    function setButtonPosition() {
        if (rightHandRadio.checked) {
            inputButtonContainer.classList.remove('left-hand');
            inputButtonContainer.classList.add('right-hand');
        } else if (leftHandRadio.checked) {
            inputButtonContainer.classList.remove('right-hand');
            inputButtonContainer.classList.add('left-hand');
        }
    }

    setButtonPosition();
    rightHandRadio.addEventListener('change', setButtonPosition);
    leftHandRadio.addEventListener('change', setButtonPosition);

    // 제스처 관련 상태 변수 (최소화)
    let startX = 0;
    let startY = 0;
    let isGestureActive = false; 
    let isDragging = false;     
    let touchStartTime = 0;     
    let isConsonantModeActive = true; 
    let initialConsonantZone = null; 

    // --- 더블 탭 관련 변수 ---
    let lastTapTime = 0;
    let lastTapDirection = null;
    let lastTapStartX = 0;
    let lastTapStartY = 0;
    let isDoubleTapHandledThisCycle = false; 
           
    // 제스처 및 탭 인식 임계값
    const DRAG_DISTANCE_THRESHOLD = 8; 
    const TAP_DURATION_THRESHOLD = 250; 
    const DOUBLE_TAP_DISTANCE_THRESHOLD = 15; 
	
    // DIRECTIONS 객체는 K가 제공한 그대로 유지
    const DIRECTIONS = { 
        'consonant': { 
            'right': { angle: [337.5, 22.5], char: 'ㅇ', doubleTapChar: 'ㅎ', dragChar: 'ㅎ' }, 
            'up-right': { angle: [292.5, 337.5], char: 'ㄱ', doubleTapChar: 'ㄲ', dragChar: 'ㅋ' },
            'up': { angle: [247.5, 292.5], char: 'ㅅ', doubleTapChar: 'ㅆ', dragChar: 'ㅊ' },
            'up-left': { angle: [202.5, 247.5], char: 'ㅈ', doubleTapChar: 'ㅉ', dragChar: 'ㅊ' }, 
            'left': { angle: [157.5, 202.5], char: 'ㄷ', doubleTapChar: 'ㄸ', dragChar: 'ㅌ' },
            'down-left': { angle: [112.5, 157.5], char: 'ㄴ', doubleTapChar: 'ㄹ', dragChar: 'ㄹ' }, 
            'down': { angle: [67.5, 112.5], char: 'ㅂ', doubleTapChar: 'ㅃ', dragChar: 'ㅍ' },
            'down-right': { angle: [22.5, 67.5], char: 'ㅁ', doubleTapChar: 'ㅁ', dragChar: 'ㅁ' } 
        },
        'vowel': { 
            'right': { angle: [337.5, 22.5], char: 'ㅏ'},
            'left': { angle: [157.5, 202.5], char: 'ㅓ'},
            'up': { angle: [247.5, 292.5], char: 'ㅗ'},
            'down': { angle: [67.5, 112.5], char: 'ㅜ'},
        },
        'complex_vowel_transitions': { 
            'left_down': 'ㅖ',      
            'left_down-right': 'ㅖ',    

            'right_down': 'ㅒ',     
            'right_down-left': 'ㅒ',    

            'up_right': 'ㅘ',       
            'up_down-right': 'ㅘ',    

            'up_left': 'ㅙ',       
            'up_down-left': 'ㅙ', 			

            'down_right': 'ㅞ',     
            'down_up-right': 'ㅞ',      

            'down_left': 'ㅝ',      
            'down_up-left': 'ㅝ',       
        },
    };
	
    const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
    const JONG = ['', 'ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
	
    function isCho(char) { return CHO.includes(char); }
    function isJung(char) { return JUNG.includes(char); }
    function isJong(char) { return JONG.includes(char); }
	
    function appendCharToBuffer(char) {
        rawBuffer += char;
        kkotipInput.value = combineSmartHangul(rawBuffer); 
    }
	
    function deleteLastCharFromBuffer() {
        rawBuffer = rawBuffer.slice(0, -1);
		kkotipInput.value = combineSmartHangul(rawBuffer);
    }

    function combineSmartHangul(buffer) {
        const result = [];
        let i = 0;

        while (i < buffer.length) {
            const ch1 = buffer[i];
            const ch2 = buffer[i + 1];
            const ch3 = buffer[i + 2];

            const choIdx = CHO.indexOf(ch1);
            const jungIdx = JUNG.indexOf(ch2);

            if (choIdx !== -1 && jungIdx !== -1) {
                // 초성 + 중성
                let jongIdx = 0;
                let nextChar = buffer[i + 3];
                if (isCho(ch3) && isJung(nextChar)) {
                    // 종성을 다음 글자 초성으로 이동해야 할 경우
                    result.push(makeHangul(choIdx, jungIdx, 0));
                    i += 2;
                    continue;
                }
                if (ch3 && (jongIdx = JONG.indexOf(ch3)) > 0) {
                    result.push(makeHangul(choIdx, jungIdx, jongIdx));
                    i += 3;
                } else {
                    result.push(makeHangul(choIdx, jungIdx, 0));
                    i += 2;
                }
            } else {
                result.push(ch1);
                i += 1;
            }
        }

        return result.join('');
    }

    function makeHangul(cho, jung, jong) {
        const code = 0xAC00 + (cho * 21 * 28) + (jung * 28) + jong;
        return String.fromCharCode(code);
    }
	
	function handleConsonantTap(direction) {
		const singleChar = DIRECTIONS.consonant[direction]?.char;
		if (!singleChar) return;

		if (tapTimer === null) {
			let handled = false;
			const localTapTime = Date.now();  // 이 시점에서의 기준을 저장

			tapTimer = setTimeout(() => {
				if (isDoubleTapHandledThisCycle || handled) {
					tapTimer = null;
					return;
				}
				appendCharToInput(singleChar);
				tapTimer = null;
			}, 250);

			// 더블탭이 감지되면 handled = true로 설정되도록
			setTimeout(() => {
				handled = isDoubleTapHandledThisCycle;
			}, 0);
		} else {
			clearTimeout(tapTimer);
			tapTimer = null;
			// 더블탭은 handleTap에서만 처리
		}
	}
	
    deleteButton.addEventListener('click', () => {
        deleteLastCharFromBuffer();
    });
	
    // 추가 유틸리티 함수 (조합 기능과 무관한 것만 유지)
    function getPrimaryVowelChar(initialDir) {
        const cardinalVowel = DIRECTIONS.vowel[initialDir]?.char;
        if (cardinalVowel) return cardinalVowel;

        if (rightHandRadio.checked) {
            if (initialDir === 'down-left') return 'ㅣ';
            if (initialDir === 'up-right') return 'ㅡ';
        }
        else if (leftHandRadio.checked) {
            if (initialDir === 'down-right') return 'ㅣ';
            if (initialDir === 'up-left') return 'ㅡ';
        }
        return null;
    }

    function getDirectionStringFromAngle(angle) {
        let normalizedAngle = (angle + 360) % 360;
        if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) return 'right';
        if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) return 'down-right';
        if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) return 'down';
        if (normalizedAngle >= 112.5 && normalizedAngle < 157.5) return 'down-left';
        if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) return 'left';
        if (normalizedAngle >= 202.5 && normalizedAngle < 247.5) return 'up-left';
        if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) return 'up';
        if (normalizedAngle >= 292.5 && normalizedAngle < 337.5) return 'up-right';
        return null;
    }
    
    // 입력된 문자를 그대로 텍스트 에어리어에 추가하는 핵심 함수
	function appendCharToInput(char, skipBuffer = false) {
		let currentText = kkotipInput.value;
		let cursorPos = kkotipInput.selectionStart;

		if (cursorPos < currentText.length) {
			kkotipInput.value = currentText.substring(0, cursorPos) + char + currentText.substring(cursorPos);
			kkotipInput.selectionStart = cursorPos + char.length;
			kkotipInput.selectionEnd = cursorPos + char.length;
		} else {
			if (!skipBuffer) {
				appendCharToBuffer(char);
			} else {
				kkotipInput.value += char;
			}
			kkotipInput.selectionStart = kkotipInput.value.length;
			kkotipInput.selectionEnd = kkotipInput.value.length;
		}
		kkotipInput.focus();
	}

    function handleConsonantDrag(direction) {
        const charToInput = DIRECTIONS.consonant[direction]?.dragChar;
        if (charToInput) {
            // 조합 로직 없이 직접 출력
            appendCharToInput(charToInput); 
		} else {
        }
    }

    // --- 이벤트 핸들러 ---
    function handleStart(e) {
        e.preventDefault(); 
        isGestureActive = true;
        isDragging = false;
        touchStartTime = Date.now();
        initialConsonantZone = null; 
        isDoubleTapHandledThisCycle = false; // 새로운 터치 시작 시 플래그 초기화 (중요)
        
        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        startX = clientX;
        startY = clientY;
        prevX = startX; 
        prevY = startY; 
        
        const buttonRect = mainInputButton.getBoundingClientRect();
        const centerX = buttonRect.left + buttonRect.width / 2;
        const centerY = buttonRect.top + buttonRect.height / 2;

        const circleRadiusRatio = 0.25; 
        const circleRadius = Math.min(buttonRect.width, buttonRect.height) * circleRadiusRatio;

        const distanceToCenter = Math.sqrt(
            Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2)
        );

        isConsonantModeActive = !(distanceToCenter <= circleRadius);

        if (isConsonantModeActive) {
            const relativeX = clientX - centerX;
            const relativeY = clientY - centerY;
            let initialAngleForZone = Math.atan2(relativeY, relativeX) * (180 / Math.PI);
            if (initialAngleForZone < 0) initialAngleForZone += 360;
            initialConsonantZone = getDirectionStringFromAngle(initialAngleForZone); 
        } else {
        }
    }

    function handleMove(e) {
        if (!isGestureActive) return;

        let currentX, currentY;
        if (e.touches && e.touches.length > 0) {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        } else {
            currentX = e.clientX;
            currentY = e.clientY; 
        }

        const deltaX_start = currentX - startX;
        const deltaY_start = currentY - startY;
        const distFromStart = Math.sqrt(deltaX_start * deltaX_start + deltaY_start * deltaY_start);
        
        const DRAG_THRESHOLD = 8; 

        if (!isDragging && distFromStart >= DRAG_THRESHOLD) {   
            isDragging = true;
            
            // 모음 복합 조합을 위한 로직 (기존 유지)
            if (!isConsonantModeActive) {
                let angle = Math.atan2(deltaY_start, deltaX_start) * (180 / Math.PI);
                if (angle < 0) angle += 360;
                const initial8Dir = getDirectionStringFromAngle(angle);
                inputSequence = [initial8Dir]; // 드래그 시작 방향 기록
            }
        }
        
        // 모음 복합조합 감지 로직 (handleMove)
        if (!isConsonantModeActive && isDragging) {
            const deltaX_current = currentX - prevX; 
            const deltaY_current = currentY - prevY; 
            const distFromPrev = Math.sqrt(deltaX_current * deltaX_current + deltaY_current * deltaY_current);

            if (distFromPrev > DRAG_THRESHOLD / 2) { 
                let currentSegmentAngle = Math.atan2(deltaY_current, deltaX_current) * (180 / Math.PI);
                if (currentSegmentAngle < 0) currentSegmentAngle += 360;

                const current8Dir = getDirectionStringFromAngle(currentSegmentAngle);

                if (inputSequence.length === 0 || inputSequence[inputSequence.length - 1] !== current8Dir) {
                    if (inputSequence.length < 3) { 
                        inputSequence.push(current8Dir);
                    }
                }
            }
        }
        prevX = currentX;
        prevY = currentY;
    }

    function handleEnd(e) {
        if (!isGestureActive) return;

        // 더블 탭이 이미 처리되었으면, 이 handleEnd는 무시
        if (isDoubleTapHandledThisCycle) {
            resetGestureState(); 
            return;
        }

        let endX, endY;
        if (e.changedTouches && e.changedTouches.length > 0) {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY; 
        } else {
            endX = e.clientX;
            endY = e.clientY; 
        }

        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const totalDragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const duration = Date.now() - touchStartTime;
        
        let charToProcess = null; 

        if (isConsonantModeActive) { 
            if (totalDragDistance < DRAG_DISTANCE_THRESHOLD) { 
                handleTap(e, totalDragDistance, duration); 
            } else { 
                handleConsonantDrag(initialConsonantZone); 
            }
        } else { // 모음 모드
            if (totalDragDistance < DRAG_DISTANCE_THRESHOLD) { 
                handleTap(e, totalDragDistance, duration);
            } else { 
                // 모음 드래그 로직 (정확한 복합 모음 매핑)
                if (inputSequence.length === 3) { 
                    const firstDir = inputSequence[0];
                    const secondDir = inputSequence[1]; 
                    const thirdDir = inputSequence[2]; 
                    const key = `${firstDir}_${secondDir}_${thirdDir}`; 
                    charToProcess = DIRECTIONS.multi_complex_vowel_transitions[key];
                    if (!charToProcess) { 
                        const key2 = `${firstDir}_${secondDir}`;
                        charToProcess = DIRECTIONS.complex_vowel_transitions[key2];
                    }
                } else if (inputSequence.length === 2) { 
                    const firstDir = inputSequence[0];
                    const secondDir = inputSequence[1];
                    const key = `${firstDir}_${secondDir}`;
                    charToProcess = DIRECTIONS.complex_vowel_transitions[key];
                    if (!charToProcess) { 
                         if (rightHandRadio.checked && firstDir === 'down-left' && secondDir === 'up-right') {
                            charToProcess = 'ㅢ';
                         } 
                         else if (leftHandRadio.checked && firstDir === 'down-right' && secondDir === 'up-left') {
                            charToProcess = 'ㅢ';
                          }
                    }
                } else if (inputSequence.length === 1) {
                    const dir = inputSequence[0];
					const baseChar = getPrimaryVowelChar(dir);

					const vowelDragMap = {
						'ㅏ': 'ㅐ',
						'ㅓ': 'ㅔ',
						'ㅗ': 'ㅚ',
						'ㅜ': 'ㅟ'
					};
					
					charToProcess = vowelDragMap[baseChar] || baseChar;
                }

                if (charToProcess) {
                    // 조합 로직 없이 직접 출력하도록 변경
                    appendCharToInput(charToProcess); 
                } else {
                }
            }
        }

        isConsonantModeActive = true; 
        resetGestureState();
    }
    
    function handleTap(e, totalDragDistance, duration) {
        const buttonRect = mainInputButton.getBoundingClientRect();
        const centerX = buttonRect.left + buttonRect.width / 2;
        const centerY = buttonRect.top + buttonRect.height / 2;

        const tapAngle = Math.atan2(startY - centerY, startX - centerX) * (180 / Math.PI);
        const tapDirection = getDirectionStringFromAngle(tapAngle);

        const currentTime = Date.now();

		if (!isConsonantModeActive) { // 모음 모드 (탭)
			const tappedVowelChar = getPrimaryVowelChar(tapDirection); 
			const currentTime = Date.now();

			if (
				lastTapDirection === tapDirection &&
				(currentTime - lastTapTime < TAP_DURATION_THRESHOLD) &&
				(Math.abs(startX - lastTapStartX) < DOUBLE_TAP_DISTANCE_THRESHOLD * 2) &&
				(Math.abs(startY - lastTapStartY) < DOUBLE_TAP_DISTANCE_THRESHOLD * 2)
			) {
				// 더블탭 감지!
				isDoubleTapHandledThisCycle = true;
				
				if (tapTimer !== null) {
					clearTimeout(tapTimer);
					tapTimer = null;
				}

				// 'right' 방향만 우선 구현 (ㅏ → ㅑ)
				let doubleVowelChar = null;
				if (tapDirection === 'right') doubleVowelChar = 'ㅑ';
				else if (tapDirection === 'left') doubleVowelChar = 'ㅕ';
				else if (tapDirection === 'up') doubleVowelChar = 'ㅛ';
				else if (tapDirection === 'down') doubleVowelChar = 'ㅠ';
				// 'ㅢ' 처리: 손잡이에 따라 다름
				else if (
					(rightHandRadio.checked && (tapDirection === 'down-left' || tapDirection === 'up-right')) ||
					(leftHandRadio.checked && (tapDirection === 'down-right' || tapDirection === 'up-left'))
				) {
					doubleVowelChar = 'ㅢ';
				}

				if (doubleVowelChar) {
					rawBuffer += doubleVowelChar;
					kkotipInput.value = combineSmartHangul(rawBuffer);
					kkotipInput.selectionStart = kkotipInput.value.length;
					kkotipInput.selectionEnd = kkotipInput.value.length;
				} 

				lastTapTime = 0;
				lastTapDirection = null;
				lastTapStartX = 0;
				lastTapStartY = 0;
				return;
			}

			// 싱글탭 예약 (딜레이를 주자!)
			if (tapTimer === null) {
				let handled = false;

				tapTimer = setTimeout(() => {
					if (isDoubleTapHandledThisCycle || handled) {
						tapTimer = null;
						return;
					}

					if (tappedVowelChar) {
						appendCharToInput(tappedVowelChar);
					} else {
						appendCharToInput(' ');
					}

					tapTimer = null;
				}, 250);

				setTimeout(() => {
					handled = isDoubleTapHandledThisCycle;
				}, 0);
			}

			lastTapTime = currentTime;
			lastTapDirection = tapDirection;
			lastTapStartX = startX;
			lastTapStartY = startY;
			return;
		}
		
        // 자음 모드(사각형 바깥) 탭 = 싱글/더블 탭
        else { 
            // 더블 탭 로직:
            if (lastTapDirection === tapDirection && 
                (currentTime - lastTapTime < TAP_DURATION_THRESHOLD) &&
                (Math.abs(startX - lastTapStartX) < DOUBLE_TAP_DISTANCE_THRESHOLD * 2) && 
                (Math.abs(startY - lastTapStartY) < DOUBLE_TAP_DISTANCE_THRESHOLD * 2)
            ) { 
                // 더블 탭 감지!
                isDoubleTapHandledThisCycle = true; 
                
				if (tapTimer !== null) {
					clearTimeout(tapTimer);  
					tapTimer = null;
				}
				
				const currentText = kkotipInput.value;
				const cursorPos = kkotipInput.selectionStart;
				const singleChar = DIRECTIONS.consonant[tapDirection]?.char;
				const doubleChar = DIRECTIONS.consonant[tapDirection]?.doubleTapChar;

                // 직전 글자가 싱글 자음이면 삭제 
                if (cursorPos > 0 && currentText.slice(cursorPos - 1, cursorPos) === singleChar) {
                    kkotipInput.value = currentText.slice(0, cursorPos - 1);
                    kkotipInput.selectionStart = cursorPos - 1;
                    kkotipInput.selectionEnd = cursorPos - 1;
				}	
				if (rawBuffer.endsWith(singleChar)) {
					rawBuffer = rawBuffer.slice(0, -1);
				}
                
				rawBuffer += doubleChar;
				kkotipInput.value = combineSmartHangul(rawBuffer);
				kkotipInput.selectionStart = kkotipInput.value.length;
				kkotipInput.selectionEnd = kkotipInput.value.length;
				
                lastTapTime = 0; 
                lastTapDirection = null;
                lastTapStartX = 0;
                lastTapStartY = 0;
            } else { 
				handleConsonantTap(tapDirection); 
                lastTapTime = currentTime; 
                lastTapDirection = tapDirection;
                lastTapStartX = startX;
                lastTapStartY = startY;
            }
			return;
        }
    }
	
    function resetGestureState() {
        isGestureActive = false;
        isDragging = false;
        startX = 0;
        startY = 0;
        prevX = 0; 
        prevY = 0; 
        touchStartTime = 0;
        initialConsonantZone = null; 
        inputSequence = []; 
        isDoubleTapHandledThisCycle = false; 
    }

    // --- 이벤트 리스너 등록 ---
    mainInputButton.addEventListener('touchstart', handleStart, { passive: false });
    mainInputButton.addEventListener('mousedown', handleStart);

    mainInputButton.addEventListener('touchmove', handleMove, { passive: false });
    mainInputButton.addEventListener('mousemove', handleMove); 

    mainInputButton.addEventListener('touchend', handleEnd);
    mainInputButton.addEventListener('mouseup', handleEnd);
    mainInputButton.addEventListener('touchcancel', handleEnd);
    mainInputButton.addEventListener('mouseleave', (e) => {
        if (isGestureActive) { 
            handleEnd(e);
        }
    });

    refreshButton.addEventListener('click', () => {
        window.location.reload(); 
    });    
});