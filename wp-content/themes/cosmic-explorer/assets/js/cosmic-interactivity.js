import { store, getContext } from '@wordpress/interactivity';

const quizData = [
  {
    question: "Güneş Sistemi'ndeki en büyük gezegen hangisidir?",
    options: ["Satürn", "Jüpiter", "Uranüs", "Neptün"],
    correct: 1
  },
  {
    question: "Ay'a ilk ayak basan astronot kimdir?",
    options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"],
    correct: 2
  },
  {
    question: "Işık hızı yaklaşık kaç km/s'dir?",
    options: ["150,000", "299,792", "500,000", "1,000,000"],
    correct: 1
  },
  {
    question: "Hangi gezegen 'Kızıl Gezegen' olarak bilinir?",
    options: ["Venüs", "Jüpiter", "Mars", "Merkür"],
    correct: 2
  },
  {
    question: "Uluslararası Uzay İstasyonu'nun (ISS) inşası hangi yılda başladı?",
    options: ["1990", "1995", "1998", "2001"],
    correct: 2
  }
];

store( 'cosmicExplorer', {
	state: {
		// Quiz state getters
		get currentQuestionText() {
			const context = getContext();
			return quizData[context.currentQuestion]?.question || '';
		},
		get option0Text() {
			const context = getContext();
			return quizData[context.currentQuestion]?.options[0] || '';
		},
		get option1Text() {
			const context = getContext();
			return quizData[context.currentQuestion]?.options[1] || '';
		},
		get option2Text() {
			const context = getContext();
			return quizData[context.currentQuestion]?.options[2] || '';
		},
		get option3Text() {
			const context = getContext();
			return quizData[context.currentQuestion]?.options[3] || '';
		},
		get isCorrect0() {
			const context = getContext();
			return context.answered && quizData[context.currentQuestion]?.correct === 0;
		},
		get isCorrect1() {
			const context = getContext();
			return context.answered && quizData[context.currentQuestion]?.correct === 1;
		},
		get isCorrect2() {
			const context = getContext();
			return context.answered && quizData[context.currentQuestion]?.correct === 2;
		},
		get isCorrect3() {
			const context = getContext();
			return context.answered && quizData[context.currentQuestion]?.correct === 3;
		},
		get isWrong0() {
			const context = getContext();
			return context.answered && context.selectedAnswer === 0 && quizData[context.currentQuestion]?.correct !== 0;
		},
		get isWrong1() {
			const context = getContext();
			return context.answered && context.selectedAnswer === 1 && quizData[context.currentQuestion]?.correct !== 1;
		},
		get isWrong2() {
			const context = getContext();
			return context.answered && context.selectedAnswer === 2 && quizData[context.currentQuestion]?.correct !== 2;
		},
		get isWrong3() {
			const context = getContext();
			return context.answered && context.selectedAnswer === 3 && quizData[context.currentQuestion]?.correct !== 3;
		},
		get showResult() {
			const context = getContext();
			return context.currentQuestion >= quizData.length;
		},
		get progressText() {
			const context = getContext();
			const current = Math.min(context.currentQuestion + 1, quizData.length);
			return `Soru ${current} / ${quizData.length}`;
		},
		get scoreText() {
			const context = getContext();
			return `${context.score} / ${quizData.length}`;
		},
		get resultEmoji() {
			return '';
		},
		get resultTitle() {
			const context = getContext();
			const score = context.score;
			if (score === 5) return 'Mükemmel: İleri Düzey Astronomi Yetkinliği';
			if (score === 4) return 'Yüksek Başarı: Gözlemsel Astronomi Bilgisi';
			if (score === 3) return 'Orta Düzey: Temel Uzay Bilimleri';
			if (score === 2) return 'Başlangıç Düzeyi: Temel Gözlem';
			return 'Geliştirilmeli: Başlangıç Seviyesi';
		},
		get resultDescription() {
			const context = getContext();
			const score = context.score;
			if (score === 5) return 'Tüm soruları eksiksiz yanıtladınız. Güneş Sistemi ve astrofizik konusundaki bilginiz üst düzeydedir.';
			if (score >= 3) return 'Güneş Sistemi dinamikleri ve uzay keşif tarihi hakkında sağlam bir teorik altyapıya sahipsiniz.';
			return 'Sayfada yer alan NASA verilerini ve gezegen teknik parametrelerini inceleyerek bilginizi pekiştirebilirsiniz.';
		},
		
		// Warp Speed state
		get warpButtonText() {
			const context = getContext();
			return context.warpSpeed ? 'Normal Hız' : 'Işık Hızı';
		}
	},
	actions: {
		// Planet Showcase
		togglePlanetDetail: () => {
			const context = getContext();
			context.isExpanded = !context.isExpanded;
		},
		
		// Space Quiz
		selectAnswer: (e) => {
			const context = getContext();
			if (context.answered) return; // Prevent multiple clicks
			
			// Try finding a button element or nearest valid target to extract data-answer
			const button = e.target.closest('button') || e.target;
			const answerIndex = parseInt(button.dataset.answer, 10);
			
			if (isNaN(answerIndex)) return;
			
			context.selectedAnswer = answerIndex;
			context.answered = true;
			
			if (quizData[context.currentQuestion]?.correct === answerIndex) {
				context.score += 1;
			}
		},
		nextQuestion: () => {
			const context = getContext();
			context.currentQuestion += 1;
			context.selectedAnswer = -1;
			context.answered = false;
		},
		resetQuiz: () => {
			const context = getContext();
			context.currentQuestion = 0;
			context.score = 0;
			context.selectedAnswer = -1;
			context.answered = false;
		},
		
		// Warp Speed
		toggleWarp: () => {
			const context = getContext();
			context.warpSpeed = !context.warpSpeed;
		}
	}
} );
