// JavaScript สำหรับการประมวลผลแบบประเมินและแสดงผลในป๊อปอัพสวยงาม
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('depressionForm');
    const popupOverlay = document.getElementById('popup-overlay');
    const resultsContainer = document.getElementById('results-container');
    const closeButton = document.getElementById('close-popup');
    
    // ข้อความคำถามทั้งหมด
    const questionTexts = [
        "เบื่อ ทำอะไร ๆ ก็ไม่เพลิดเพลิน",
        "ไม่สบายใจ,ซึมเศร้า,ท้อแท้",
        "รู้สึกไม่ดีกับตัวเองคิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้ตัวเองหรือครอบครัวผิดหวัง",
        "คิดทำร้ายตนเองหรือคิดว่าตายๆไปคงจะดี",
        "สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุหรือทำงานที่ต้องใช้ความตั้งใจ",
        "พูดหรือทำอะไรช้าจนคนอื่นมองเห็น หรือกระสับกระส่ายจนท่านอยู่ไม่นิ่งเหมือนเคย",
        "หลับยากหรือหลับๆตื่นๆหรือหลับมากไป",
        "เบื่ออาหาร/กินมากเกินไป",
        "เหนื่อยง่าย/ไม่ค่อยมีแรง"
    ];
    
    // คำอธิบายตัวเลือก
    const optionTexts = ['ไม่เลย', 'บางวัน', 'ค่อนข้างบ่อย', 'เกือบทุกวัน'];
    
    // ฟังก์ชันสร้างเอฟเฟกต์ confetti
    function createConfetti(count, colors) {
        const confettiContainer = document.getElementById('confetti-container');
        confettiContainer.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = Math.random() * 100 + '%';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.width = Math.random() * 8 + 4 + 'px';
            confetti.style.height = Math.random() * 8 + 4 + 'px';
            confetti.style.opacity = '0';
            confettiContainer.appendChild(confetti);
            
            // อนิเมชันแบบสุ่ม
            setTimeout(() => {
                confetti.style.transition = `all ${Math.random() * 2 + 1}s ease-out`;
                confetti.style.transform = `translateY(${Math.random() * 100 - 50}px) translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
                confetti.style.opacity = '0.7';
                
                setTimeout(() => {
                    confetti.style.opacity = '0';
                }, 1500);
            }, Math.random() * 500);
        }
    }
    
    // ประมวลผลเมื่อกดปุ่มประเมินผล
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // เก็บคะแนนและรีเซ็ตสีพื้นหลัง
        let totalScore = 0;
        const scores = {};
        let allAnswered = true;
        
        document.querySelectorAll('.question-item').forEach((item, index) => {
            item.classList.remove('error');
            const questionNum = index + 1;
            const selectedOption = document.querySelector(`input[name="q${questionNum}"]:checked`);
            
            if (selectedOption) {
                const scoreValue = parseInt(selectedOption.value);
                scores[`q${questionNum}`] = scoreValue;
                totalScore += scoreValue;
            } else {
                allAnswered = false;
                item.classList.add('error');
            }
        });
        
        // ตรวจสอบว่าตอบครบทุกข้อหรือไม่
        if (!allAnswered) {
            alert("กรุณาตอบคำถามให้ครบทุกข้อ");
            return;
        }
        
        // กำหนดผลการประเมิน
        let resultMessage = '';
        let resultClass = '';
        let resultDetail = '';
        let confettiColors = [];
        let confettiCount = 0;
        
        if (totalScore < 5) {
            resultMessage = 'ไม่มีภาวะซึมเศร้า';
            resultClass = 'no-depression';
            resultDetail = 'คุณไม่มีอาการของภาวะซึมเศร้า แต่ควรดูแลสุขภาพจิตอย่างสม่ำเสมอ';
            confettiColors = ['#4CAF50', '#8BC34A', '#CDDC39', '#A5D6A7', '#81C784'];
            confettiCount = 80;
        } else if (totalScore >= 5 && totalScore <= 8) {
            resultMessage = 'มีความผิดปกติแต่ยังไม่มีภาวะซึมเศร้า';
            resultClass = 'mild-abnormal';
            resultDetail = 'คุณมีอาการบางอย่างที่ผิดปกติ แต่ยังไม่ถึงขั้นมีภาวะซึมเศร้า ควรสังเกตอาการและดูแลตัวเองให้ดี';
            confettiColors = ['#8BC34A', '#CDDC39', '#FFF59D', '#FFE082', '#C5E1A5'];
            confettiCount = 60;
        } else if (totalScore >= 9 && totalScore <= 14) {
            resultMessage = 'มีภาวะซึมเศร้าเล็กน้อย';
            resultClass = 'mild-depression';
            resultDetail = 'คุณมีภาวะซึมเศร้าในระดับเล็กน้อย ควรดูแลตัวเองเป็นพิเศษและอาจปรึกษาผู้เชี่ยวชาญเพื่อรับคำแนะนำเพิ่มเติม';
            confettiColors = ['#FFC107', '#FFE082', '#FFECB3', '#FFD54F', '#FFE0B2'];
            confettiCount = 40;
        } else if (totalScore >= 15 && totalScore <= 19) {
            resultMessage = 'มีภาวะซึมเศร้าปานกลาง';
            resultClass = 'moderate-depression';
            resultDetail = 'คุณมีภาวะซึมเศร้าในระดับปานกลาง ควรปรึกษาผู้เชี่ยวชาญหรือแพทย์เพื่อรับคำแนะนำและการดูแลที่เหมาะสม';
            confettiColors = ['#FF9800', '#FFB74D', '#FFE0B2', '#FFCC80', '#FFE0B2'];
            confettiCount = 20;
        } else {
            resultMessage = 'มีภาวะซึมเศร้ารุนแรง';
            resultClass = 'severe-depression';
            resultDetail = 'คุณมีภาวะซึมเศร้าในระดับรุนแรง ควรปรึกษาแพทย์หรือผู้เชี่ยวชาญโดยเร็วเพื่อรับการช่วยเหลือที่เหมาะสม';
            confettiColors = ['#F44336', '#E57373', '#FFCDD2', '#EF9A9A', '#FFCDD2'];
            confettiCount = 10;
        }
        
        // แสดงผลในป๊อปอัพ
        const scoreBadge = document.getElementById('score-badge');
        scoreBadge.textContent = `คะแนนรวม: ${totalScore} คะแนน`;
        scoreBadge.className = `score-badge ${resultClass}`;
        
        const resultLabel = document.getElementById('result-label');
        resultLabel.textContent = resultMessage;
        resultLabel.className = `result-label ${resultClass}`;
        
        document.getElementById('result-detail').textContent = resultDetail;
        
        // สร้างรายละเอียดคะแนนแต่ละข้อ
        const scoreDetailsElement = document.getElementById('score-details');
        scoreDetailsElement.innerHTML = '';
        
        Object.entries(scores).forEach(([q, score]) => {
            const qNum = parseInt(q.replace('q', ''));
            const questionText = questionTexts[qNum - 1];
            const scoreText = optionTexts[score];
            
            const scoreItemElement = document.createElement('div');
            scoreItemElement.className = 'score-item-detail';
            scoreItemElement.innerHTML = `
                <strong>ข้อ ${qNum}:</strong> ${score} คะแนน (${scoreText})<br>
                <small>${questionText}</small>
            `;
            
            scoreDetailsElement.appendChild(scoreItemElement);
        });
        
        // สร้างเอฟเฟกต์ confetti
        createConfetti(confettiCount, confettiColors);
        
        // แสดงป๊อปอัพ
        popupOverlay.style.display = 'flex';
    });
    
    // ปิดป๊อปอัพและแสดงผลในหน้าหลัก
    closeButton.addEventListener('click', function() {
        popupOverlay.style.display = 'none';
        
        // แสดงผลในส่วนผลลัพธ์
        resultsContainer.style.display = 'block';
        
        // อัพเดทผลลัพธ์ในหน้าหลัก
        const scoreBadge = document.getElementById('score-badge');
        const resultLabel = document.getElementById('result-label');
        const totalScore = scoreBadge.textContent.match(/\d+/)[0];
        const resultMessage = resultLabel.textContent;
        const resultClass = resultLabel.className.split(' ')[1];
        
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `
            <div style="font-weight: bold; text-align: center; margin: 15px 0; font-size: 18px; color: white; padding: 10px; border-radius: 10px;" class="${resultClass}">
                คะแนนของคุณ: ${totalScore} - ${resultMessage}
            </div>
        `;
        
        // เลื่อนไปที่ผลลัพธ์
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    });
});