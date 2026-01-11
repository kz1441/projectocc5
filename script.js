// ==========================================
// STATE MANAGEMENT
// ==========================================
let currentState = {
    submodule: null,
    topic: null,
    stage: 'home', 
    teachSlide: 0,
    quizSlide: 0, // Add this to track which quiz question we are on
    gender: null,
    progress: {
        submodule1: [],
        submodule2: [],
        submodule3: []
    }
};

let promptTimeout = null;
let currentLanguage = 'en';
let currentModalImages = null;
let currentModalLabel = null;

const translations = {
    ms: {
        "Language": "Bahasa",
        "Welcome to Puberty Buddy!": "Selamat datang ke Puberty Buddy!",
        "Physical and Emotional Changes": "Perubahan Fizikal dan Emosi",
        "Hygiene & Self-Care Routine": "Kebersihan & Rutin Penjagaan Diri",
        "Confidence, Self-Acceptance and Lifestyle": "Keyakinan, Penerimaan Diri dan Gaya Hidup",
        "Great Job!": "Syabas!",
        "NEXT": "SETERUSNYA",
        "Quiz Time!": "Masa Kuiz!",
        "Animation of Body Changes": "Animasi Perubahan Badan",
        "Choose me!": "Pilih saya!",
        "Boy": "Budak lelaki",
        "Body changes": "Perubahan badan",
        "Grow taller": "Semakin tinggi",
        "Body hair": "Bulu badan",
        "Taller": "Lebih tinggi",
        "Hair": "Bulu",
        "Click me to see changes!": "Klik saya untuk lihat perubahan!",
        "Growing Taller": "Semakin tinggi",
        "Growing Body Hair": "Bulu badan tumbuh",
        "Which picture shows a body change during puberty?": "Gambar manakah menunjukkan perubahan badan semasa akil baligh?",
        "Sleeping": "Tidur",
        "Mood Tracker": "Penjejak Emosi",
        "It's okay to have any feeling": "Tidak mengapa mempunyai apa-apa perasaan",
        "Tap your mood now!": "Sentuh perasaan kamu sekarang!",
        "I feel happy": "Saya rasa gembira",
        "I feel angry": "Saya rasa marah",
        "I feel sad": "Saya rasa sedih",
        "Touch your forehead. How does your skin feel to your fingers?": "Sentuh dahi kamu. Bagaimana rasa kulit kamu?",
        "Smooth and Dry!": "Licin dan kering!",
        "Silky or Oily": "Licin atau berminyak",
        "Bumpy and Itchy": "Kasar dan gatal",
        "How much power do you have now?": "Berapa banyak tenaga kamu sekarang?",
        "Timeline Matching Activity": "Aktiviti Padanan Garis Masa",
        "Changes happen over time, especially during puberty": "Perubahan berlaku mengikut masa, terutamanya semasa akil baligh",
        "Before puberty: You are still a child": "Sebelum akil baligh: Kamu masih kanak-kanak",
        "You are not tall": "Kamu belum tinggi",
        "You have no beard": "Kamu belum berjanggut",
        "During puberty: You start growing taller": "Semasa akil baligh: Kamu mula membesar tinggi",
        "Then: Body hair appears": "Kemudian: Bulu badan muncul",
        "So: You start to shave": "Jadi: Kamu mula bercukur",
        "When does body hair appear?": "Bila bulu badan muncul?",
        "Body Hair": "Bulu badan",
        "Before Puberty": "Sebelum akil baligh",
        "After Puberty": "Selepas akil baligh",
        "When does a person have short legs?": "Bila seseorang mempunyai kaki yang pendek?",
        "Hygiene and Self-Care Routines": "Kebersihan dan Rutin Penjagaan Diri",
        "Daily Routine Builders": "Pembina Rutin Harian",
        "Let's watch a video about daily routines!": "Mari tonton video tentang rutin harian!",
        "My Morning Hygiene Steps": "Langkah Kebersihan Pagi Saya",
        "Wake Up": "Bangun tidur",
        "Brush Teeth": "Gosok gigi",
        "Wash Face": "Basuh muka",
        "Wear Deodorant": "Pakai deodoran",
        "Change Clean Clothes": "Tukar pakaian bersih",
        "Look! One step is missing.": "Lihat! Satu langkah hilang.",
        "Play Toys": "Main permainan",
        "Drag-and-drop hygiene kits": "Kit kebersihan seret dan lepas",
        "When we shower, we need specific tools!": "Bila mandi, kita perlukan alat khusus!",
        "Which is the essential kit in taking shower?": "Yang manakah alat penting untuk mandi?",
        "Soap": "Sabun",
        "Shampoo": "Syampu",
        "Towel": "Tuala",
        "Toothbrush": "Berus gigi",
        "Toys": "Mainan",
        "Positive Body Image": "Imej Badan Positif",
        "My body is amazing!": "Badan saya hebat!",
        "Everyone looks different": "Semua orang kelihatan berbeza",
        "I am strong and special!": "Saya kuat dan istimewa!",
        "I love myself!": "Saya sayang diri saya!",
        "I am... +": "Saya... +",
        "Strong": "Kuat",
        "Special": "Istimewa",
        "Amazing": "Hebat",
        "Which shows positive body image? +": "Yang manakah menunjukkan imej badan positif? +",
        "My body is strong": "Badan saya kuat",
        "My body is bad": "Badan saya tidak bagus",
        "What I Like About Me": "Apa yang Saya Suka Tentang Diri Saya",
        "I have special talents!": "Saya ada bakat istimewa!",
        "Look in the mirror": "Lihat cermin",
        "What makes you smile? +": "Apa yang membuat kamu tersenyum? +",
        "My Cool Hair": "Rambut saya yang keren",
        "My Strong Legs": "Kaki saya yang kuat",
        "My Happy Eyes": "Mata saya yang gembira",
        "Today, I... +": "Hari ini, saya... +",
        "Helped others": "Menolong orang lain",
        "Finished my homework": "Menyiapkan kerja rumah",
        "Cleaned my room": "Mengemas bilik saya",
        "Sleep Impact Quiz": "Kuiz Kesan Tidur",
        "Sleep helps you grow!": "Tidur membantu kamu membesar!",
        "Sleep makes you strong": "Tidur membuat kamu kuat",
        "When tired, you need rest": "Bila letih, kamu perlu berehat",
        "Sleep gives you energy!": "Tidur memberi kamu tenaga!",
        "Which child is well-rested?": "Kanak-kanak yang mana cukup rehat?",
        "Sleeping Child": "Kanak-kanak tidur",
        "Tired Child": "Kanak-kanak letih",
        "What does sleep give you?": "Tidur memberi kamu apa?",
        "Energy": "Tenaga",
        "Video Games": "Permainan video",
        "Nutrition Impact Quiz": "Kuiz Kesan Pemakanan",
        "Food gives you energy!": "Makanan memberi kamu tenaga!",
        "Eat fruits and vegetables": "Makan buah-buahan dan sayur-sayuran",
        "Healthy food makes you strong": "Makanan sihat membuat kamu kuat",
        "Junk food is okay sometimes, not always": "Makanan ringan boleh sekali-sekala, bukan selalu",
        "Tap the HEALTHY foods!": "Sentuh makanan SIHAT!",
        "Vegetables": "Sayur-sayuran",
        "Fruits": "Buah-buahan",
        "Candy": "Gula-gula",
        "Burger": "Burger",
        "Which foods help you grow strong?": "Makanan manakah membantu kamu menjadi kuat?",
        "Only Candy": "Hanya gula-gula",
        "Check Kits 🎒": "Semak Kit 🎒",
        "Check My Bag 🎒": "Semak Beg Saya 🎒",
        "GYM BAG": "BEG GIM",
        "Packed!": "Sudah dipack!",
        "Congratulations!": "Tahniah!",
        "Congratulations! You completed this topic!": "Tahniah! Kamu sudah tamatkan topik ini.",
        "Great job! You finished this topic.": "Syabas! Kamu sudah tamatkan topik ini.",
        "Back": "Kembali"
    },
    zh: {
        "Language": "语言",
        "Welcome to Puberty Buddy!": "欢迎来到 Puberty Buddy！",
        "Physical and Emotional Changes": "身体与情绪变化",
        "Hygiene & Self-Care Routine": "卫生与自我护理",
        "Confidence, Self-Acceptance and Lifestyle": "自信、自我接纳与生活方式",
        "Great Job!": "做得好！",
        "NEXT": "下一步",
        "Quiz Time!": "小测验时间！",
        "Animation of Body Changes": "身体变化动画",
        "Choose me!": "选择我！",
        "Boy": "男孩",
        "Body changes": "身体变化",
        "Grow taller": "长高",
        "Body hair": "体毛",
        "Taller": "更高",
        "Hair": "毛发",
        "Click me to see changes!": "点击我查看变化！",
        "Growing Taller": "长高",
        "Growing Body Hair": "长出体毛",
        "Which picture shows a body change during puberty?": "哪张图片显示青春期的身体变化？",
        "Sleeping": "睡觉",
        "Mood Tracker": "情绪记录",
        "It's okay to have any feeling": "有任何感受都没关系",
        "Tap your mood now!": "点击你现在的心情！",
        "I feel happy": "我觉得开心",
        "I feel angry": "我觉得生气",
        "I feel sad": "我觉得伤心",
        "Touch your forehead. How does your skin feel to your fingers?": "摸摸你的额头。皮肤摸起来怎么样？",
        "Smooth and Dry!": "光滑又干爽！",
        "Silky or Oily": "光滑或油油的",
        "Bumpy and Itchy": "粗糙并发痒",
        "How much power do you have now?": "你现在有多少能量？",
        "Timeline Matching Activity": "时间线配对活动",
        "Changes happen over time, especially during puberty": "变化会随着时间发生，尤其是青春期",
        "Before puberty: You are still a child": "青春期前：你还是孩子",
        "You are not tall": "你还不高",
        "You have no beard": "你还没有胡子",
        "During puberty: You start growing taller": "青春期中：你开始长高",
        "Then: Body hair appears": "然后：体毛出现",
        "So: You start to shave": "所以：你开始刮胡子",
        "When does body hair appear?": "体毛什么时候出现？",
        "Body Hair": "体毛",
        "Before Puberty": "青春期前",
        "After Puberty": "青春期后",
        "When does a person have short legs?": "人什么时候腿短？",
        "Hygiene and Self-Care Routines": "卫生与自我护理习惯",
        "Daily Routine Builders": "日常作息建立",
        "Let's watch a video about daily routines!": "我们来观看一个关于日常作息的视频！",
        "My Morning Hygiene Steps": "我的早晨卫生步骤",
        "Wake Up": "起床",
        "Brush Teeth": "刷牙",
        "Wash Face": "洗脸",
        "Wear Deodorant": "使用止汗剂",
        "Change Clean Clothes": "换干净衣服",
        "Look! One step is missing.": "看！少了一个步骤。",
        "Play Toys": "玩玩具",
        "Drag-and-drop hygiene kits": "拖放卫生用品包",
        "When we shower, we need specific tools!": "洗澡时需要特定的用品！",
        "Which is the essential kit in taking shower?": "洗澡必备的用品是哪一个？",
        "Soap": "肥皂",
        "Shampoo": "洗发水",
        "Towel": "毛巾",
        "Toothbrush": "牙刷",
        "Toys": "玩具",
        "Positive Body Image": "积极的身体形象",
        "My body is amazing!": "我的身体很棒！",
        "Everyone looks different": "每个人都不一样",
        "I am strong and special!": "我很强壮也很特别！",
        "I love myself!": "我爱自己！",
        "I am... +": "我是…… +",
        "Strong": "强壮",
        "Special": "特别",
        "Amazing": "很棒",
        "Which shows positive body image? +": "哪个显示积极的身体形象？ +",
        "My body is strong": "我的身体很强壮",
        "My body is bad": "我的身体不好",
        "What I Like About Me": "我喜欢自己的地方",
        "I have special talents!": "我有特别的才能！",
        "Look in the mirror": "照镜子",
        "What makes you smile? +": "什么让你微笑？ +",
        "My Cool Hair": "我的酷发型",
        "My Strong Legs": "我强壮的腿",
        "My Happy Eyes": "我开心的眼睛",
        "Today, I... +": "今天，我… +",
        "Helped others": "帮助他人",
        "Finished my homework": "完成作业",
        "Cleaned my room": "打扫房间",
        "Sleep Impact Quiz": "睡眠影响测验",
        "Sleep helps you grow!": "睡眠帮助你成长！",
        "Sleep makes you strong": "睡眠让你强壮",
        "When tired, you need rest": "累了就要休息",
        "Sleep gives you energy!": "睡眠给你能量！",
        "Which child is well-rested?": "哪个孩子休息好了？",
        "Sleeping Child": "睡觉的孩子",
        "Tired Child": "疲惫的孩子",
        "What does sleep give you?": "睡眠给你什么？",
        "Energy": "能量",
        "Video Games": "电子游戏",
        "Nutrition Impact Quiz": "营养影响测验",
        "Food gives you energy!": "食物给你能量！",
        "Eat fruits and vegetables": "吃水果和蔬菜",
        "Healthy food makes you strong": "健康的食物让你强壮",
        "Junk food is okay sometimes, not always": "垃圾食品偶尔可以，但不能经常吃",
        "Tap the HEALTHY foods!": "点击健康的食物！",
        "Vegetables": "蔬菜",
        "Fruits": "水果",
        "Candy": "糖果",
        "Burger": "汉堡",
        "Which foods help you grow strong?": "哪些食物帮助你变强壮？",
        "Only Candy": "只有糖果",
        "Check Kits 🎒": "查看用品 🎒",
        "Check My Bag 🎒": "查看我的包 🎒",
        "GYM BAG": "健身包",
        "Packed!": "已装好！",
        "Congratulations!": "恭喜！",
        "Congratulations! You completed this topic!": "恭喜！你完成了这个主题！",
        "Great job! You finished this topic.": "做得好！你完成了这个主题。",
        "Back": "返回"
    }
};

function translateText(text) {
    if (typeof text !== 'string') {
        return text;
    }
    if (currentLanguage === 'en') {
        return text;
    }
    const langMap = translations[currentLanguage] || {};
    return langMap[text] || text;
}

function getWashFaceImage(modalImages) {
    if (!modalImages) {
        return '';
    }
    return modalImages[currentLanguage] || modalImages.en || Object.values(modalImages)[0];
}

function updateWashFaceModalImage() {
    if (!currentModalImages) {
        return;
    }
    const modalImage = document.getElementById('washFaceImage');
    const modalTitle = document.getElementById('washFaceTitle');
    if (modalImage) {
        modalImage.src = getWashFaceImage(currentModalImages);
        modalImage.alt = translateText(currentModalLabel || "Wash Face");
    }
    if (modalTitle) {
        modalTitle.textContent = translateText(currentModalLabel || "Wash Face");
    }
}

function openWashFaceModal(modalImages, modalLabel) {
    const modal = document.getElementById('washFaceModal');
    if (!modal) {
        return;
    }
    currentModalImages = modalImages;
    currentModalLabel = modalLabel || "Wash Face";
    updateWashFaceModalImage();
    modal.classList.remove('hidden');
}

function closeWashFaceModal() {
    const modal = document.getElementById('washFaceModal');
    if (!modal) {
        return;
    }
    modal.classList.add('hidden');
    currentModalImages = null;
    currentModalLabel = null;
}

// ==========================================
// CONTENT DATA
// ==========================================
const content = {
    submodule1: {
        title: "Physical and Emotional Changes",
        topics: [
            {
                id: 1,
				title: "Animation of Body Changes",
				image: "https://static.vecteezy.com/system/resources/thumbnails/004/899/853/small/boy-measures-his-height-with-ruler-height-meter-for-children-vector.jpg",
				teach: [
					{
						type: "genderSelect", // New selection slide
						text: "Choose me!",
						choices: [
							{ gender: "male", image: "images/boy.png", label: "Boy" }
						]
					},
					{
						text: "Body changes",
						image: {
							male: "https://i.pinimg.com/564x/f8/fc/59/f8fc59c8eccc0c32774606ed2f3407c1.jpg"
						},
						labels: [
							{ text: "Taller", x: "70%", y: "10%" },
							{ text: "Hair", x: "35%", y: "55%" }
						]
					},
					{
						text: "Grow taller",
						image: {
							male: "images/HeightGrowthCartoonMale.jpg"
						}
					},
					{
						text: "Body hair",
						image: {
							male: "images/bodyHairMale.jpeg"
						}
					},
					{
						image: {
							male: "images/Screenshot 2026-01-10 042346.png",
						}, 
					}
				],
                activity: {
                    instruction: "Click me to see changes!",
                    type: "clickToReveal",
                    items: [
                        {
                            before: "images/HeightGrowthCartoonMale.jpg",
                            after: "images/Timelapse Growth Age 14 to Age 16 Short.gif",
                            label: "Growing Taller"
                        },
                        {
                            before: "images/puberty-chestMale.jpg",
                            after: "images/armpitHair.gif",
                            label: "Growing Body Hair"
                        }
                    ]
                },
                quiz: {
                    question: "Which picture shows a body change during puberty?",
                    options: [
                        { text: "Growing Taller", correct: true, image: "https://images.onlymyhealth.com/imported/images/2021/September/22_Sep_2021/big2_GrowHeightNaturally.jpg" },
                        { text: "Sleeping", correct: false, image: "https://www.uclahealth.org/sites/default/files/styles/landscape_3x2_016000_640x427/public/images/21/sleep.jpg?h=b1a91ebe&f=08df32d3&itok=eQVIw07T"}
                    ]
                }
            },
            {
				id: 2,
				title: "Mood Tracker",
				image: "https://www.metropolisindia.com/upgrade/blog/upload/25/06/mood-disorder-definition-symptoms1751274829.webp",
				teach: [
					{ image: "images/IMG-20260108-WA0013.jpg", text: "It's okay to have any feeling" }
				],
				activity: {
					instruction: "Tap your mood now!",
					type: "multiSelect", // or a valid activity type
					items: [{ text: "I feel happy", image: "images/Screenshot_20260108_233847_Gallery.jpg" }, { text: "I feel angry", image: "images/Screenshot_20260108_233740_Gallery.jpg" }, { text: "I feel sad", image: "images/Screenshot_20260108_233823_Gallery.jpg" }]
				},
				quiz: [{
					type: "subjective", // Special type for no right/wrong
					question: "Touch your forehead. How does your skin feel to your fingers?",
					image: "images/kais.jpg", // The single large image
					options: [
						{ text: "Smooth and Dry!", image: "images/male1.jpg" },
						{ text: "Silky or Oily", image: "images/male2.jpg" },
						{ text: "Bumpy and Itchy", image: "images/male3.jpg" }
					]
				}, 
				{
					type: "subjective", // Special type for no right/wrong
					question: "How much power do you have now?",
					image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaUXoeVwvxP41cJ-uWPp4AmUjTVAUEi87tyQ&s", // The single large image
					options: [
						{ text: "100%", image: "https://www.mentalup.co/img/blog/running-games-for-kids-12.jpg" },
						{ text: "50%", image: "https://www.shutterstock.com/image-photo/fitness-tired-man-sweat-outdoor-600nw-2478773559.jpg" },
						{ text: "0%", image: "https://assets.technologynetworks.com/production/dynamic/images/content/382194/sleep-disorder-is-more-common-than-we-thought-382194-960x540.jpg?cb=12604922" }
					]
				}]
			},
            {
                id: 4,
                title: "Timeline Matching Activity",
				image: "https://www.teachhub.com/wp-content/uploads/2020/10/Project-Based-Timeline-Lesson_CLP-1152x890.jpg",
                teach: [
                    {
                        text: "Changes happen over time, especially during puberty",
                        image: "images/Screenshot 2026-01-10 061848.png"
                    },
					{
                        text: "Before puberty: You are still a child",
                        image: "https://www.datocms-assets.com/55312/1635467982-hero-images.jpg?ar64=NDoz&crop=focalpoint&fit=crop&fm=jpg&fp-x=0.53&fp-y=0.18&w=1440"
                    },
					{
                        text: "You are not tall",
                        image: "https://www.shutterstock.com/image-photo/cute-little-children-measuring-height-600nw-2410381875.jpg"
                    },
					{
                        text: "You have no beard",
                        image: "https://images.generated.photos/MNhz30jdBTN4cqOMSYq4yLe9kXlx2DvsYhzKrhxKF-Q/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjU3ODEwLmpwZw.jpg"
                    },
                    {
                        text: "During puberty: You start growing taller",
                        image: "images/HeightGrowthCartoonMale.jpg"
                    },
                    {
                        text: "Then: Body hair appears",
                        image: "images/armpitHair.gif"
                    },
                    {
                        text: "So: You start to shave",
                        image: "https://img.freepik.com/free-photo/front-view-hairy-man-shaving-beard_23-2149615818.jpg?semt=ais_hybrid&w=740&q=80"
                    }
                ],
                activity: {
                    instruction: "When does body hair appear?",
                    type: "timeline",
                    
                    change: "Body Hair",
                    changeImage: "images/armpitHair.gif",
                    timeline: [
                        { stage: "Before Puberty", icon: "👶", correct: false },
                        { stage: "After Puberty", icon: "🧒", correct: true }
                    ]
                },
                quiz: {
                    question: "When does a person have short legs?",
					image: "https://www.toyourhealth.com/content/images/growing_up2_lg__1_2_4540.jpg",
                    options: [
                        { text: "Before Puberty", correct: true, icon: "👶" },
                        { text: "After Puberty", correct: false, icon: "🧒" }
                    ]
                }
            }
        ]
    },
    submodule2: {
        title: "Hygiene and Self-Care Routines",
        topics: [
            {
                id: 1,
                title: "Daily Routine Builders",
				image: "https://png.pngtree.com/png-vector/20250903/ourlarge/pngtree-boy-brushing-teeth-cartoon-illustration-png-image_17355535.webp",
                // LEARN STAGE: The 5-step strip
                teach: [
				{
                    type: "video", // New type for video
                    text: "Let's watch a video about daily routines!",
                    videoUrl: "videos/bersih.mp4" // Embed format
                },
                    {
                        text: "My Morning Hygiene Steps",
                        type: "strip",
                        steps: [
                            {
                                image: "https://img.freepik.com/premium-photo/asian-man-waking-up-morning-sitting-bed-stretching_126277-1356.jpg",
                                label: "Wake Up",
                                modalImages: {
                                    en: "images/we.jpg",
                                    ms: "images/wm.jpg",
                                    zh: "images/wc.jpg"
                                }
                            },
							{
                                image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDg1djlmZ2Zna213dGd6amEwNHJjdHNoNWZlcTJ4bTF1Y203c3cxOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YaY0FF0eUWLtVNK1Uw/giphy.gif",
                                label: "Brush Teeth",
                                modalImages: {
                                    en: "images/be.jpg",
                                    ms: "images/bm.jpg",
                                    zh: "images/bc.jpg"
                                }
                            },
                            {
                                image: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGJqbDBocDk2NWs1eGNueGNrcW13M2cxYXE5M3MzcThkcmc4bWY2OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ri8FpKsdTwiaUFWysZ/giphy.gif",
                                label: "Wash Face",
                                details: [
                                    "Wet face",
                                    "Gentle cleanser",
                                    "Gentle circles",
                                    "Rinse with water",
                                    "Pat dry with clean towel"
                                ],
                                modalImages: {
                                    en: "images/eimg.jpg",
                                    ms: "images/mimg.jpg",
                                    zh: "images/cimg.jpg"
                                }
                            },
                            {
                                image: "https://www.telegraph.co.uk/content/dam/men/2017/06/30/TELEMMGLPICT000133447980_trans_NvBQzQNjv4BqdNLuJDSj-bduoIdVkVeVwdhwat7RjkF5CleLcJsFAQc.jpeg?imwidth=640",
                                label: "Wear Deodorant",
                                modalImages: {
                                    en: "images/de.jpg",
                                    ms: "images/dm.jpg",
                                    zh: "images/dc.jpg"
                                }
                            },
                            { image: "https://globalsymbols.com/uploads/production/image/imagefile/8124/15_8124_b6261b9d-abb4-4bdb-b334-69d8ab3a8ff1.jpg", label: "Change Clean Clothes" },
                        ]
                    }
                ],
                // ACTIVITY STAGE: One icon missing
                activity: {
					instruction: "Look! One step is missing.",
					type: "sequence",
					steps: [
						{ image: "images/woman-waking-up_53876-40961.png", visible: true },
						{ image: "https://media.giphy.com/media/YaY0FF0eUWLtVNK1Uw/giphy.gif", visible: true },
						{ image: "", visible: false, placeholder: "❓" }, // The missing step
						{ image: "https://www.telegraph.co.uk/content/dam/men/2017/06/30/TELEMMGLPICT000133447980_trans_NvBQzQNjv4BqdNLuJDSj-bduoIdVkVeVwdhwat7RjkF5CleLcJsFAQc.jpeg?imwidth=640", visible: true },
						{ image: "https://globalsymbols.com/uploads/production/image/imagefile/8124/15_8124_b6261b9d-abb4-4bdb-b334-69d8ab3a8ff1.jpg", visible: true }
					],
					// ADD THIS CHOICES ARRAY:
					choices: [
						{ 
							text: "Wash Face", 
							image: "https://media1.giphy.com/media/Ri8FpKsdTwiaUFWysZ/giphy.gif", 
							correct: true 
						},
						{ 
							text: "Play Toys", 
							image: "https://todaysparent.mblycdn.com/tp/resized/2017/11/1600x1200/how-many-toys-do-kids-really-need-1280x960.jpg", 
							correct: false 
						}
					]
				}
            },

			// Inside submodule2 -> topics[1] (Shower Kit Essentials)
			{
				id: 2,
				title: "Drag-and-drop hygiene kits",
				image: "https://www.cdc.gov/respiratory-viruses/media/images/4.png",
				teach: [
					{
						text: "When we shower, we need specific tools!",
						image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnplbWY0ZGhvdDk3NXVyYm9qY3VtZ3hoemdvaWJyNGhzcWI3bXNuOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2RrPGppiJbf8jI00DK/giphy.gif",
						action: "showerReveal" // <--- This tells the slide to show the button
					}
				],
				// You can keep activity empty or remove it if you don't want a separate activity screen
				activity: {
					type: "showerKitMatch",
					instruction: "Which is the essential kit in taking shower?",
					leftImage: "https://as1.ftcdn.net/jpg/02/39/96/88/1000_F_239968859_0UhhxS7ddWIObwCXZDQ1CQguvTiUa9UR.jpg", // Replace with your image link
					choices: [
						{ 
							text: "Soap", 
							image: "https://img.freepik.com/free-psd/flat-design-sustainability-soap-illustration_23-2151982972.jpg", 
							correct: true 
						},
						{ 
							text: "Toys", 
							image: "https://www.chemicalsafetyfacts.org/wp-content/uploads/shutterstock_383521510-002-scaled.jpg", 
							correct: false 
						}
					]
				}
			}
        ]
    },
    submodule3: {
        title: "Confidence, Self-Acceptance and Lifestyle",
        topics: [
            {
                id: 1,
                title: "Positive Body Image",
				image: "https://img.freepik.com/free-vector/hand-drawn-strong-man-cartoon-illustration_52683-117786.jpg?semt=ais_hybrid&w=740&q=80",
                teach: [
                    {
                        text: "My body is amazing!",
                        image: "images/IMG-20260108-WA0004.jpg"
                    },
                    {
                        text: "Everyone looks different",
                        image: "images/IMG-20260108-WA0001.jpg"
                    },
                    {
                        text: "I am strong and special!",
                        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmnjOp-2J_hbXFAS4n_3a0Rt4oY6DoZzBWMw&s"
                    },
                    {
                        text: "I love myself!",
                        image: "https://thumbs.dreamstime.com/b/vector-illustration-cartoon-little-boy-hugging-himself-blue-heart-background-love-yourself-concept-cartoon-little-boy-221548983.jpg"
                    }
                ],
                activity: {
                    instruction: "I am... +",
                    type: "positiveTraits",
                    traits: [
                        { text: "Strong", icon: "💪", image: "images/IMG-20260108-WA0005.jpg" },
                        { text: "Special", icon: "⭐", image: "https://www.shutterstock.com/image-vector/little-kid-standing-front-mirror-600nw-2371892163.jpg" },
                        { text: "Amazing", icon: "✨", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmnjOp-2J_hbXFAS4n_3a0Rt4oY6DoZzBWMw&s" }
                    ]
                },
                quiz: {
                    question: "Which shows positive body image? +",
                    options: [
                        { text: "My body is strong", icon: "💪", correct: true },
                        { text: "My body is bad", icon: "❌", correct: false }
                    ]
                }
            },
            {
                id: 2,
                title: "What I Like About Me",
				image: "https://media.istockphoto.com/id/1452314042/vector/happy-boy-hugging-himself-with-heart-icons-self-care-self-love.jpg?s=612x612&w=0&k=20&c=lqroMX9fXCWxJ5qZfpnJdUSsf8fv3Bhhwt9I_57IPuU=",
                teach: [
                    {
                        text: "Look in the mirror",
                        image: "https://img.freepik.com/premium-vector/cartoon-boy-looking-his-reflection-mirror_1120557-36298.jpg"
                    }
                ],
                activity: {
                    instruction: "What makes you smile? +",
                    type: "multiSelect",
                    items: [
                        { text: "My Cool Hair", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoASVH4k04RzFcJ_82hz389VZTtGhl9wksBw&s" },
                        { text: "My Strong Legs", image: "https://ik.imagekit.io/shortpedia/Voices/wp-content/uploads/2020/10/Calf-Raises.jpg" },
                        { text: "My Happy Eyes", image: "https://previews.123rf.com/images/denisnata/denisnata1803/denisnata180300001/96973751-close-up-front-portrait-of-beautiful-happy-woman-face-with-gray-eyes.jpg" }
                    ]
                },
                quiz: {
                    question: "Today, I... +",
                    options: [
                        { text: "Helped others", image: "https://www.entrepreneur.com/wp-content/uploads/sites/2/2016/08/20160813000120-GettyImages-486493061.jpeg", correct: true },
						{ text: "Finished my homework", image: "https://img.freepik.com/premium-photo/happy-boy-finished-homework_128867-24.jpg", correct: true },
                        { text: "Cleaned my room", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80", correct: true }
                    ]
                }
            },
            {
                id: 4,
                title: "Sleep Impact Quiz",
				image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7CqDTqTLZTb5D4L0m6yqnI-k5hkWP5WCSJA&s",
                teach: [
                    {
                        text: "Sleep helps you grow!",
                        image: "images/9be86e95b8871a4e5f1609045f9dcd62.jpg"
                    },
                    {
                        text: "Sleep makes you strong",
                        image: "images/c1e10dec70d2ac1abc48cc0f70b5d25a.jpg"
                    },
                    {
                        text: "When tired, you need rest",
                        image: "images/Screenshot_20260108_233946_Gallery.jpg"
                    },
                    {
                        text: "Sleep gives you energy!",
                        icon: "🔋"
                    }
                ],
                activity: {
                    instruction: "Which child is well-rested?",
                    type: "compare",
                    items: [
                        { text: "Sleeping Child", image: "images/9be86e95b8871a4e5f1609045f9dcd62.jpg", correct: true },
                        { text: "Tired Child", image: "images/Screenshot_20260108_233946_Gallery.jpg", correct: false }
                    ]
                },
                quiz: {
                    question: "What does sleep give you?",
                    options: [
                        { text: "Energy", icon: "🔋", correct: true },
                        { text: "Video Games", icon: "🎮", correct: false }
                    ]
                }
            },
            {
                id: 5,
                title: "Nutrition Impact Quiz",
				image: "https://static.vecteezy.com/system/resources/thumbnails/006/521/813/small/collection-of-cute-fresh-fruits-vegetarian-food-proper-nutrition-melone-grape-apple-blueberry-appricote-lemon-orange-healthy-lifestyle-illustration-for-print-web-trendy-summer-fruits-vector.jpg",
                teach: [
                    {
                        text: "Food gives you energy!",
                        image: "images/1dfe618f9e292ea130ef1fe95067d67b.jpg"
                    },
                    {
                        text: "Eat fruits and vegetables",
                        image: "images/beacab0300882784e1d97eb56393125f.jpg"
                    },
                    {
                        text: "Healthy food makes you strong",
                        image: "images/3e8d166c0b097476fe2960fee4c8269c.jpg"
                    },
                    {
                        text: "Junk food is okay sometimes, not always",
                        image: "images/f88f9062a3edc3cf74bcd2184269aa0d.jpg"
                    }
                ],
                activity: {
					instruction: "Tap the HEALTHY foods!",
					type: "selectMultiple",
					items: [
						{ 
							text: "Vegetables", 
							correct: true, 
							image: "https://cdn-icons-png.flaticon.com/512/2329/2329865.png" 
						},
						{ 
							text: "Fruits", 
							correct: true, 
							image: "https://cdn-icons-png.flaticon.com/512/415/415733.png" // The Apple icon
						},
						{ 
							text: "Candy", 
							correct: false, 
							image: "images/candies_16671618.png" 
						}
					]
				},
				quiz: {
					question: "Which foods help you grow strong?",
					options: [
						{ 
							text: "Vegetables", 
							correct: true, 
							image: "https://cdn-icons-png.flaticon.com/512/2329/2329865.png" 
						},
						{ 
							text: "Only Candy", 
							correct: false, 
							image: "images/candies_16671618.png" 
						}
					]
				}
            },
            
        ]
    }
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeApp();
    setupEventListeners();
    loadProgress();
});

function initializeLanguage() {
    const savedLanguage = localStorage.getItem('pubertyAppLanguage');
    currentLanguage = savedLanguage || 'en';
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-Hans' : currentLanguage;

    const select = document.getElementById('languageSelect');
    if (select) {
        select.value = currentLanguage;
        select.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });
    }

    updateStaticText();
}

function setLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('pubertyAppLanguage', currentLanguage);
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-Hans' : currentLanguage;
    updateStaticText();
    updateWashFaceModalImage();
    rerenderCurrentScreen();
}

function updateStaticText() {
    document.querySelectorAll('[data-i18n]').forEach((node) => {
        const key = node.getAttribute('data-i18n');
        node.textContent = translateText(key);
    });
}

function rerenderCurrentScreen() {
    switch (currentState.stage) {
        case 'home':
            showScreen('homepage');
            break;
        case 'topics':
            showTopicSelection();
            break;
        case 'teach':
            showTeachContent();
            break;
        case 'activity':
            goToActivity();
            break;
        case 'quiz':
            goToQuiz();
            break;
        default:
            break;
    }
}

function initializeApp() {
    showScreen('homepage');
    currentState.stage = 'home';
}

function setupEventListeners() {
    // Home button
    document.getElementById('homeBtn').addEventListener('click', goHome);
    
    // Submodule cards
    document.querySelectorAll('.submodule-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const submoduleId = e.currentTarget.dataset.submodule;
            selectSubmodule(submoduleId);
        });
    });
    
    // Next buttons
    document.getElementById('teachNextBtn').addEventListener('click', advanceTeachSlide);
    document.getElementById('activityNextBtn').addEventListener('click', goToQuiz);
    
    // Completion buttons
    const replayBtn = document.getElementById('replayBtn');
    if (replayBtn) {
        replayBtn.addEventListener('click', replayTopic);
    }

    const nextTopicBtn = document.getElementById('nextTopicBtn');
    if (nextTopicBtn) {
        nextTopicBtn.addEventListener('click', goToNextTopic);
    }

    const backToTopicsBtn = document.getElementById('backToTopicsBtn');
    if (backToTopicsBtn) {
        backToTopicsBtn.addEventListener('click', backToTopics);
    }

    const washFaceBackBtn = document.getElementById('washFaceBackBtn');
    if (washFaceBackBtn) {
        washFaceBackBtn.addEventListener('click', closeWashFaceModal);
    }

    const washFaceModal = document.getElementById('washFaceModal');
    if (washFaceModal) {
        washFaceModal.addEventListener('click', (event) => {
            if (event.target === washFaceModal) {
                closeWashFaceModal();
            }
        });
    }
}

// ==========================================
// NAVIGATION
// ==========================================
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show selected screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    // Manage progress bar visibility
    const progressBar = document.getElementById('progressBar');
    if (screenId === 'home' || screenId === 'homepage' || screenId === 'topics') {
        progressBar.classList.add('hidden');
    } else {
        progressBar.classList.remove('hidden');
    }

    window.scrollTo(0, 0);
    resetPromptTimeout();
}
document.addEventListener('click', () => {
    resetPromptTimeout();
});
function goHome() {
    currentState = {
        submodule: null,
        topic: null,
        stage: 'home',
        teachSlide: 0,
        progress: currentState.progress
    };
    showScreen('homepage');
    clearPromptTimeout();
}

function selectSubmodule(submoduleId) {
    currentState.submodule = parseInt(submoduleId);
    currentState.stage = 'topics';
    showTopicSelection();
}

function showTopicSelection() {
    const submoduleKey = `submodule${currentState.submodule}`;
    const submodule = content[submoduleKey];
    
    document.getElementById('submoduleTitle').textContent = translateText(submodule.title);
    
    const topicGrid = document.getElementById('topicGrid');
    topicGrid.innerHTML = '';
    
    submodule.topics.forEach(topic => {
        const card = document.createElement('button');
        card.className = 'topic-card';
        
        // --- UPDATED CODE START: LARGE CIRCULAR IMAGES ---
        if (topic.image) {
            const img = document.createElement('img');
            img.src = topic.image;
            
            // Apply circular styling directly
            img.style.width = '150px';        // Sets a large width
            img.style.height = '150px';       // Sets a large height (must match width)
            img.style.objectFit = 'contain';    // Keeps the full image visible
            img.style.borderRadius = '50%';   // Makes it a circle
            img.style.border = '4px solid #f0f0f0'; // Optional: adds a nice border
            img.style.marginBottom = '15px';
            
            card.appendChild(img);
        }

        const titleText = document.createElement('div');
        titleText.textContent = translateText(topic.title);
        titleText.style.fontWeight = 'bold';
        titleText.style.fontSize = '28px'; // Slightly larger text to match
        card.appendChild(titleText);
        // --- UPDATED CODE END ---

        // Mark completed topics with a green card + check icon.
        if (currentState.progress[submoduleKey].includes(topic.id)) {
            card.classList.add('completed');
        }
        
        card.addEventListener('click', () => selectTopic(topic.id));
        topicGrid.appendChild(card);
    });
    
    showScreen('topicSelection');
}

function selectTopic(topicId) {
    currentState.topic = topicId;
    currentState.teachSlide = 0;
    currentState.quizSlide = 0; // Add this line to reset the quiz counter
    currentState.stage = 'teach';
    showTeachContent();
}

// ==========================================
// TEACHING PHASE
// ==========================================
function showTeachContent() {
    const submoduleKey = `submodule${currentState.submodule}`;
    const topic = content[submoduleKey].topics.find(t => t.id === currentState.topic);
    const currentSlide = topic.teach[currentState.teachSlide];
    
    // 1. Toggle Next button visibility: Hide on gender selection so they must click a card
    if (currentSlide && currentSlide.type === "genderSelect") {
        document.getElementById('teachNextBtn').classList.add('hidden');
    } else {
        document.getElementById('teachNextBtn').classList.remove('hidden');
    }

    document.getElementById('teachTitle').textContent = translateText(topic.title);
    const teachContent = document.getElementById('teachContent');
    teachContent.innerHTML = '';
    
    topic.teach.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'teach-slide';
        if (index === currentState.teachSlide) slideDiv.classList.add('active');
        
        // --- TYPE A: GENDER SELECTION SLIDE ---
        if (slide.type === "genderSelect") {
            const container = document.createElement('div');
            container.className = 'gender-selection-container';
            const text = document.createElement('p');
            text.className = 'teach-text';
            text.textContent = translateText(slide.text);
            container.appendChild(text);

            const grid = document.createElement('div');
            grid.className = 'gender-grid';

            slide.choices.forEach(choice => {
                const card = document.createElement('div');
                card.className = 'gender-card';
                card.innerHTML = `
                    <img src="${choice.image}" class="gender-img">
                    <p class="gender-label">${translateText(choice.label)}</p>
                `;
                card.onclick = () => {
                    currentState.gender = choice.gender; // Sets 'male' or 'female'
                    if (typeof playWordSound === 'function') {
                        playWordSound(choice.label);
                    }
                    advanceTeachSlide();
                };
                grid.appendChild(card);
            });
            container.appendChild(grid);
            slideDiv.appendChild(container);
        }
        
        else if (slide.action === "showerReveal") {
            const revealContainer = document.createElement('div');
            revealContainer.style.position = 'relative';
            revealContainer.style.display = 'flex';
            revealContainer.style.alignItems = 'center';
            revealContainer.style.justifyContent = 'center';
            revealContainer.style.minHeight = '500px'; 
            revealContainer.style.gap = '120px'; 

            const leftTools = document.createElement('div');
            const rightTools = document.createElement('div');
            leftTools.className = 'side-tools-container';
            rightTools.className = 'side-tools-container';
            
            leftTools.style.display = 'flex';
            leftTools.style.flexDirection = 'column';
            rightTools.style.display = 'flex';
            rightTools.style.flexDirection = 'column';
            leftTools.style.gap = '60px';  
            rightTools.style.gap = '60px';

            const img = document.createElement('img');
            img.src = slide.image;
            img.className = 'teach-image-reveal';
            img.style.transform = 'translateY(20px)'; 

            const btn = document.createElement('button');
            btn.className = 'nav-btn reveal-action-btn pulse'; 
            btn.innerText = translateText("Check Kits 🎒");

            revealContainer.appendChild(leftTools);
            revealContainer.appendChild(img);
            revealContainer.appendChild(rightTools);
            slideDiv.appendChild(revealContainer);
            slideDiv.appendChild(btn);

            btn.onclick = () => {
                btn.style.display = 'none';
                const items = [
                    { image: "https://img.freepik.com/free-psd/flat-design-sustainability-soap-illustration_23-2151982972.jpg", name: "Soap" }, 
                    { image: "https://www.ivy.com.my/wp-content/uploads/2018/11/IVY-SILKSHINE-ANTI-HAIRFALL-HAIR-SHAMPOO-950ML-215NBP.jpg", name: "Shampoo" },
                    { image: "https://www.nitori.my/cdn/shop/files/776106601_700x700.jpg", name: "Towel" }, 
                    { image: "https://brushsnap.com/cdn/shop/products/Snap-Resilient-Blue_5d60afc6-fee2-49c7-b5bf-53150411d2c8.png", name: "Toothbrush" }
                ];

                items.forEach((item, i) => {
                    const toolEl = document.createElement('div');
                    toolEl.className = 'revealed-tool-card';
                    toolEl.style.display = 'flex';
                    toolEl.style.flexDirection = 'column';
                    toolEl.style.alignItems = 'center';
                    toolEl.style.cursor = 'pointer'; // Make it clickable
                    toolEl.innerHTML = `
                        <img src="${item.image}" style="width: 80px; height: 80px; object-fit: contain; margin-bottom: 15px;">
                        <p class="option-text" style="font-size: 20px; font-weight: bold; margin: 0;">${translateText(item.name)}</p>
                    `;
                    
                    // Add click event to play sound
                    toolEl.onclick = () => {
                        playWordSound(item.name.toLowerCase());
                    };
                    
                    (i < 2 ? leftTools : rightTools).appendChild(toolEl);
                });
            };
        }

        // --- TYPE C: STRIP / CAROUSEL ---
        // Inside showTeachContent function, find the "strip" case:
else if (slide.type === "strip") {
    const stripContainer = document.createElement('div');
    stripContainer.className = 'hygiene-strip-container';

    slide.steps.forEach((step, index) => {
        const detailText = Array.isArray(step.details)
            ? step.details.map(item => translateText(item)).join(' → ')
            : '';
        // Create the step card
        const stepDiv = document.createElement('div');
        stepDiv.className = 'strip-step';
        stepDiv.innerHTML = `
            <img src="${step.image}" alt="${step.label}">
            <p class="strip-step-label">${translateText(step.label)}</p>
            ${detailText ? `<p class="strip-step-details">${detailText}</p>` : ''}
        `;

        if (step.modalImages) {
            stepDiv.classList.add('is-clickable');
            stepDiv.setAttribute('role', 'button');
            stepDiv.setAttribute('tabindex', '0');
            stepDiv.classList.add('wash-face-hint');
            stepDiv.setAttribute('aria-label', translateText(step.label));
            const hintBadge = document.createElement('span');
            hintBadge.className = 'click-hint';
            hintBadge.textContent = '👆';
            stepDiv.appendChild(hintBadge);
            const handleOpen = () => openWashFaceModal(step.modalImages, step.label);
            stepDiv.addEventListener('click', handleOpen);
            stepDiv.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleOpen();
                }
            });
        }
        stripContainer.appendChild(stepDiv);

        // Add an arrow AFTER the step, but NOT after the last one
        if (index < slide.steps.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'step-arrow';
            arrow.innerHTML = '➔'; // You can also use an image or SVG here
            stripContainer.appendChild(arrow);
        }
    });

    slideDiv.appendChild(stripContainer);
}

		// --- TYPE E: VIDEO SLIDE ---
else if (slide.type === "video") {
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';
    videoContainer.style.textAlign = 'center';
    
    // Create the HTML5 video element
    videoContainer.innerHTML = `
        <p class="teach-text">${translateText(slide.text)}</p>
        <video 
            width="100%" 
            max-width="800px" 
            height="auto" 
            controls 
            style="border-radius: 15px; margin-top: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <source src="${slide.videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
    slideDiv.appendChild(videoContainer);
}

        // --- TYPE D: STANDARD SLIDE (GENDER LOGIC HERE) ---
        else {
            if (slide.image) {
                const img = document.createElement('img');

                // If the image is an object { male: "...", female: "..." }
                if (typeof slide.image === 'object' && slide.image !== null) {
                    const gender = currentState.gender || 'male'; // Fallback to male
                    img.src = slide.image[gender];
                } else {
                    // Otherwise it's just a normal string path
                    img.src = slide.image;
                }

                img.className = 'teach-image';

                if (Array.isArray(slide.labels) && slide.labels.length > 0) {
                    // Overlay friendly labels directly on the image for quick scanning.
                    const wrapper = document.createElement('div');
                    wrapper.className = 'teach-image-wrapper';
                    wrapper.appendChild(img);

                    slide.labels.forEach(label => {
                        const labelEl = document.createElement('button');
                        labelEl.type = 'button';
                        labelEl.className = 'image-label';
                        labelEl.textContent = translateText(label.text);
                        labelEl.style.left = label.x;
                        labelEl.style.top = label.y;
                        labelEl.setAttribute('aria-label', translateText(label.text));
                        wrapper.appendChild(labelEl);
                    });

                    slideDiv.appendChild(wrapper);
                } else {
                    slideDiv.appendChild(img);
                }
            }

            if (slide.icon) {
                const icon = document.createElement('div');
                icon.className = 'option-icon';
                icon.textContent = slide.icon;
                slideDiv.appendChild(icon);
            }

            if (slide.text) {
                const text = document.createElement('p');
                text.className = 'teach-text';
                text.textContent = translateText(slide.text);
                slideDiv.appendChild(text);
            }
        }
        
        teachContent.appendChild(slideDiv);
    });
    
    updateProgress(0, topic.teach.length);
    showScreen('teachScreen');
}

function advanceTeachSlide() {
    const submoduleKey = `submodule${currentState.submodule}`;
    const topic = content[submoduleKey].topics.find(t => t.id === currentState.topic);
    
    currentState.teachSlide++;
    
    const slidesCount = topic.teach.length;
    
    if (currentState.teachSlide < slidesCount) {
        // RE-RUN showTeachContent to refresh images based on the newly selected gender
        showTeachContent(); 
    } else {
        goToActivity();
    }
}

// ==========================================
// ACTIVITY PHASE
// ==========================================
function goToActivity() {
    currentState.stage = 'activity';
    const submoduleKey = `submodule${currentState.submodule}`;
    const topic = content[submoduleKey].topics.find(t => t.id === currentState.topic);
    if (promptTimeout) clearTimeout(promptTimeout);
    document.getElementById('activityTitle').textContent = translateText(topic.activity.instruction);
    
    const activityContent = document.getElementById('activityContent');
    activityContent.innerHTML = '';
    resetPromptTimeout();
    // Render activity based on type
    switch(topic.activity.type) {
		// Inside goToActivity switch(topic.activity.type)
		case 'showerKitMatch':
			renderShowerKitMatch(topic.activity, activityContent);
			break;
		case 'showerReveal': // Or whatever type you use in your content data
			renderAutoShowerReveal(topic.activity, activityContent);
			break;
		case 'sequence':
			renderSequenceActivity(topic.activity, activityContent);
			break;
        case 'clickToReveal':
            renderClickToReveal(topic.activity, activityContent);
            break;
        case 'emotionMatch':
            renderEmotionMatch(topic.activity, activityContent);
            break;
        case 'selectMultiple':
            renderSelectMultiple(topic.activity, activityContent);
            break;
        case 'timeline':
            renderTimeline(topic.activity, activityContent);
            break;
        case 'routineBuilder':
            renderRoutineBuilder(topic.activity, activityContent);
            break;
        case 'selectCorrect':
            renderSelectCorrect(topic.activity, activityContent);
            break;
        case 'matchItems':
            renderMatchItems(topic.activity, activityContent);
            break;
        case 'packKit':
            renderPackKit(topic.activity, activityContent);
            break;
        case 'positiveTraits':
            renderPositiveTraits(topic.activity, activityContent);
            break;
        case 'multiSelect':
            renderMultiSelect(topic.activity, activityContent);
            break;
        case 'compare':
            renderCompare(topic.activity, activityContent);
            break;
    }
    
    updateProgress(1, 3);
    showScreen('activityScreen');
    document.getElementById('activityNextBtn').classList.add('hidden');
}

// Activity Renderers
function renderClickToReveal(activity, container) {
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'activity-options';
    optionsDiv.style.display = 'flex';
    optionsDiv.style.flexDirection = 'column';
    optionsDiv.style.alignItems = 'center';
    optionsDiv.style.gap = '30px';

    activity.items.forEach((item, index) => {
        const option = document.createElement('div');
        option.className = 'activity-option';
        option.style.width = '100%';
        option.style.maxWidth = '500px'; 
        option.style.padding = '20px';

        const img = document.createElement('img');
        img.src = item.before;
        img.className = 'option-image';
        img.alt = item.label;
        img.style.width = '100%';
        img.style.height = '350px';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '15px';

        const label = document.createElement('div');
        label.className = 'option-text';
        label.textContent = translateText(item.label);
        label.style.fontSize = '24px';
        label.style.marginTop = '15px';

        option.appendChild(img);
        option.appendChild(label);

        let revealed = false;
        option.addEventListener('click', () => {
            if (!revealed) {
                img.src = item.after;
                option.classList.add('selected');
                revealed = true;
                
                // Check if all revealed
                if (document.querySelectorAll('.activity-option.selected').length === activity.items.length) {
                    setTimeout(() => {
                        completeActivityAndGoToQuiz(); // GO TO QUIZ FIRST
                    }, 500);
                }
            }
        });
        optionsDiv.appendChild(option);
    });
    container.appendChild(optionsDiv);
}

function renderEmotionMatch(activity, container) {
    let currentScenario = 0;
    
    const scenarioText = document.createElement('p');
    scenarioText.className = 'teach-text';
    scenarioText.textContent = translateText(activity.scenarios[currentScenario].text);
    container.appendChild(scenarioText);
    
    const emotionsDiv = document.createElement('div');
    emotionsDiv.className = 'emotion-grid';
    
    activity.emotions.forEach(emotion => {
        const card = document.createElement('div');
        card.className = 'emotion-card';
        
        const img = document.createElement('img');
        img.src = emotion.image;
        img.className = 'emotion-image';
        img.alt = emotion.label;
        
        const label = document.createElement('div');
        label.className = 'emotion-label';
        label.textContent = translateText(emotion.label);
        
        card.appendChild(img);
        card.appendChild(label);
        
        card.addEventListener('click', () => {
            const correct = emotion.name === activity.scenarios[currentScenario].emotion;
            document.querySelectorAll('.emotion-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            if (correct) {
                card.classList.add('correct');
                showSuccessFeedback();

                setTimeout(() => {
                    currentScenario++;
                    if (currentScenario < activity.scenarios.length) {
                        // Next scenario
                        scenarioText.textContent = translateText(activity.scenarios[currentScenario].text);
                        document.querySelectorAll('.emotion-card').forEach(c => c.classList.remove('selected', 'correct'));
                    } else {
                        // Complete
                        document.getElementById('activityNextBtn').classList.remove('hidden');
                    }
                }, 1000);
            } else {
                // Neutral feedback for wrong picks.
                card.classList.add('wrong');
                setTimeout(() => card.classList.remove('wrong', 'selected'), 600);
            }
        });
        
        emotionsDiv.appendChild(card);
    });
    
    container.appendChild(emotionsDiv);
}

function renderSelectMultiple(activity, container) {
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'activity-options';
    
    let correctCount = activity.items.filter(i => i.correct).length;
    let selectedCorrect = 0;
    
    activity.items.forEach(item => {
        const option = document.createElement('div');
        option.className = 'activity-option';
        
        if (item.image) {
            const img = document.createElement('img');
            img.src = item.image;
            img.className = 'option-image';
            option.appendChild(img);
        } else if (item.icon) {
            const icon = document.createElement('div');
            icon.className = 'option-icon';
            icon.textContent = item.icon;
            option.appendChild(icon);
        }
        
        const text = document.createElement('div');
        text.className = 'option-text';
        text.textContent = translateText(item.text);
        option.appendChild(text);
        
        let selected = false;
        option.addEventListener('click', () => {
            option.classList.add('selected');
            if (!selected && item.correct) {
                option.classList.add('correct');
                selected = true;
                selectedCorrect++;

                if (selectedCorrect === correctCount) {
                    setTimeout(() => {
                        completeActivityAndGoToQuiz(); // GO TO QUIZ FIRST
                    }, 800);
                }
            } else if (!item.correct) {
                option.classList.add('wrong');
                setTimeout(() => option.classList.remove('wrong', 'selected'), 600);
            }
        });
        
        optionsDiv.appendChild(option);
    });
    
    container.appendChild(optionsDiv);
}

function renderTimeline(activity, container) {
    const layoutWrapper = document.createElement('div');
    layoutWrapper.style.display = 'flex';
    layoutWrapper.style.alignItems = 'center';
    layoutWrapper.style.justifyContent = 'center';
    layoutWrapper.style.gap = '40px';
    layoutWrapper.style.marginTop = '20px';
    layoutWrapper.style.flexWrap = 'wrap';

    const imageContainer = document.createElement('div');
    imageContainer.style.flex = '1';
    imageContainer.style.maxWidth = '400px';

    const mainImg = document.createElement('img');
    mainImg.src = activity.changeImage;
    mainImg.className = 'teach-image';
    mainImg.style.width = '100%';
    mainImg.style.borderRadius = '20px';
    imageContainer.appendChild(mainImg);

    const optionsDiv = document.createElement('div');
    optionsDiv.style.flex = '1';
    optionsDiv.style.display = 'flex';
    optionsDiv.style.flexDirection = 'column';
    optionsDiv.style.gap = '20px';
    optionsDiv.style.maxWidth = '300px';

    activity.timeline.forEach(item => {
        const option = document.createElement('div');
        option.className = 'activity-option';
        option.style.margin = '0';
        option.style.width = '100%';
        
        option.innerHTML = `
            <div class="option-icon" style="font-size: 40px;">${item.icon}</div>
            <div class="option-text" style="font-size: 22px;">${translateText(item.stage)}</div>
        `;

        option.addEventListener('click', () => {
            document.querySelectorAll('.activity-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            if (item.correct) {
                option.classList.add('correct');
                setTimeout(() => {
                    completeActivityAndGoToQuiz(); // GO TO QUIZ FIRST
                }, 500);
            } else {
                option.classList.add('wrong');
                setTimeout(() => option.classList.remove('wrong', 'selected'), 600);
            }
        });
        optionsDiv.appendChild(option);
    });

    layoutWrapper.appendChild(imageContainer);
    layoutWrapper.appendChild(optionsDiv);
    container.appendChild(layoutWrapper);
}

function renderRoutineBuilder(activity, container) {
    const stepsDiv = document.createElement('div');
    stepsDiv.className = 'routine-steps';
    
    activity.steps.forEach(step => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'routine-step';
        
        const icon = document.createElement('div');
        icon.className = 'routine-step-icon';
        icon.textContent = step.icon;
        
        const label = document.createElement('div');
        label.className = 'routine-step-label';
        label.textContent = translateText(step.step);
        
        stepDiv.appendChild(icon);
        stepDiv.appendChild(label);
        stepsDiv.appendChild(stepDiv);
    });
    
    container.appendChild(stepsDiv);
    
    // Auto-complete after viewing
    setTimeout(() => {
        showSuccessFeedback();
    }, 2000);
}

function renderSelectCorrect(activity, container) {
    renderSelectMultiple(activity, container);
}

function renderMatchItems(activity, container) {
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'activity-options';
    
    activity.items.forEach(item => {
        const option = document.createElement('div');
        option.className = 'activity-option';
        
        const icon = document.createElement('div');
        icon.className = 'option-icon';
        icon.textContent = item.icon;
        
        const text = document.createElement('div');
        text.className = 'option-text';
        text.textContent = `${translateText(item.item)} → ${translateText(item.use)}`;
        
        option.appendChild(icon);
        option.appendChild(text);
        
        option.addEventListener('click', () => {
            option.classList.add('selected');
            if (document.querySelectorAll('.activity-option.selected').length === activity.items.length) {
                showSuccessFeedback();
                setTimeout(() => {
                    document.getElementById('activityNextBtn').classList.remove('hidden');
                }, 800);
            }
        });
        
        optionsDiv.appendChild(option);
    });
    
    container.appendChild(optionsDiv);
}

function renderPackKit(activity, container) {
    renderSelectMultiple(activity, container);
}

function renderPositiveTraits(activity, container) {
    if (activity.image) {
        const mainImg = document.createElement('img');
        mainImg.src = activity.image;
        mainImg.className = 'teach-image'; 
        mainImg.style.marginBottom = '20px';
        mainImg.style.borderRadius = '20px';
        container.appendChild(mainImg);
    }

    const grid = document.createElement('div');
    grid.className = 'activity-options';
    
    activity.traits.forEach(trait => {
        const card = document.createElement('div');
        card.className = 'activity-option';
        
        if (trait.image) {
            const img = document.createElement('img');
            img.src = trait.image;
            img.className = 'option-image';
            img.style.width = '100px';
            card.appendChild(img);
        }

        card.innerHTML += `
            <div class="option-icon">${trait.icon}</div>
            <div class="option-text">${translateText(trait.text)}</div>
        `;
        
        card.onclick = () => {
            card.classList.toggle('selected');
            if (document.querySelectorAll('.activity-option.selected').length > 0) {
                // Give them a moment to select multiple options
                setTimeout(() => {
                    completeActivityAndGoToQuiz(); // GO TO QUIZ FIRST
                }, 1000);
            }
        };
        grid.appendChild(card);
    });
    container.appendChild(grid);
}


function renderMultiSelect(activity, container) {
    if (activity.image) {
        const mainImg = document.createElement('img');
        mainImg.src = activity.image;
        mainImg.className = 'teach-image'; 
        mainImg.style.marginBottom = '20px';
        mainImg.style.borderRadius = '20px';
        container.appendChild(mainImg);
    }

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'activity-options';
    
    activity.items.forEach(item => {
        const option = document.createElement('div');
        option.className = 'activity-option';
        
        if (item.image) {
            const img = document.createElement('img');
            img.src = item.image;
            img.className = 'option-image';
            img.style.width = '100px'; 
            img.style.height = '100px';
            img.style.objectFit = 'contain';
            img.style.borderRadius = '10px';
            option.appendChild(img);
        } else if (item.icon) {
            const icon = document.createElement('div');
            icon.className = 'option-icon';
            icon.textContent = item.icon;
            option.appendChild(icon);
        }
        
        const text = document.createElement('div');
        text.className = 'option-text';
        text.textContent = translateText(item.text);
        option.appendChild(text);
        
        option.addEventListener('click', () => {
            // 1. Toggle the visual selection
            option.classList.toggle('selected');
            
            // 2. NEW: Play the sound effect based on the text (I feel happy/sad/angry)
            // This will look for sounds like "happy.mp3" in your sounds folder
            if (typeof playWordSound === 'function') {
                playWordSound(item.text.toLowerCase());
            }

            // 3. Show the next button once at least one is selected
            const anySelected = document.querySelectorAll('.activity-option.selected').length > 0;
            if (anySelected) {
                document.getElementById('activityNextBtn').classList.remove('hidden');
            } else {
                document.getElementById('activityNextBtn').classList.add('hidden');
            }
        });
        optionsDiv.appendChild(option);
    });
    container.appendChild(optionsDiv);
}



function renderCompare(activity, container) {
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'activity-options';
    
    activity.items.forEach(item => {
        const option = document.createElement('div');
        option.className = 'activity-option';
        
        const img = document.createElement('img');
        img.src = item.image;
        img.className = 'option-image';
        
        const text = document.createElement('div');
        text.className = 'option-text';
        text.textContent = translateText(item.text);
        
        option.appendChild(img);
        option.appendChild(text);
        
        option.addEventListener('click', () => {
            optionsDiv.querySelectorAll('.activity-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            if (item.correct) {
                option.classList.add('correct');
                setTimeout(() => {
                    completeActivityAndGoToQuiz(); // GO TO QUIZ FIRST
                }, 800);
            } else {
                option.classList.add('wrong');
                setTimeout(() => option.classList.remove('wrong', 'selected'), 600);
            }
        });
        
        optionsDiv.appendChild(option);
    });
    
    container.appendChild(optionsDiv);
}

// ==========================================
// QUIZ PHASE
// ==========================================
function goToQuiz() {
    currentState.stage = 'quiz';
    const submoduleKey = `submodule${currentState.submodule}`;
    const topic = content[submoduleKey].topics.find(t => t.id === currentState.topic);
    
    // Handle both array of questions (Mood Tracker) and single object (Body Changes)
    const quizData = Array.isArray(topic.quiz) ? topic.quiz[currentState.quizSlide] : topic.quiz;

    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = '';
    
    // 1. Add Question Text
    const question = document.createElement('p');
    question.className = 'teach-text';
    question.textContent = translateText(quizData.question);
    quizContent.appendChild(question);

    // 2. Add Main Question Image (used in Mood Tracker)
    if (quizData.image) {
        const img = document.createElement('img');
        img.src = quizData.image;
        img.className = 'teach-image';
        quizContent.appendChild(img);
    }
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'quiz-options';
    
    // 3. Loop through choices and handle OPTION IMAGES
    quizData.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        
        // NEW: Check for image inside the option (for "Growing Taller")
        if (option.image) {
            const optImg = document.createElement('img');
            optImg.src = option.image;
            optImg.className = 'option-image';
            optImg.style.width = '100%';
            optImg.style.borderRadius = '10px';
            optionDiv.appendChild(optImg);
        }

        if (option.icon) {
            const icon = document.createElement('div');
            icon.className = 'option-icon';
            icon.textContent = option.icon;
            optionDiv.appendChild(icon);
        }

        const text = document.createElement('div');
        text.className = 'option-text';
        text.textContent = translateText(option.text);
        optionDiv.appendChild(text);
        
        optionDiv.addEventListener('click', () => {
            const isCorrect = quizData.type === "subjective" ? true : option.correct;
            handleQuizAnswer(isCorrect, optionDiv);
        });
        
        optionsDiv.appendChild(optionDiv);
    });
    
    quizContent.appendChild(optionsDiv);
    showScreen('quizScreen');
}

function handleQuizAnswer(isCorrect, element) {
    const options = element.parentElement?.querySelectorAll('.quiz-option') || [];
    options.forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');

    if (isCorrect) {
        // Play sound effect for correct answer
        playCorrectSound();
        
        element.classList.add('correct');
        showSuccessFeedback();
        
        const submoduleKey = `submodule${currentState.submodule}`;
        const topic = content[submoduleKey].topics.find(t => t.id === currentState.topic);

        // Check if there are more questions in an array
        if (Array.isArray(topic.quiz) && currentState.quizSlide < topic.quiz.length - 1) {
            currentState.quizSlide++;
            setTimeout(() => {
                goToQuiz(); // Load the next question
            }, 1000);
        } else {
            // End of quiz: Save progress and GO HOME automatically
            markTopicCompleted();
            currentState.quizSlide = 0; // Reset for next time
            
            // Instead of going to completion screen, go straight home with celebration
            setTimeout(() => {
                completeActivityAndGoHome(); // GO HOME WITH STARS
            }, 1000);
        }
    } else {
        element.classList.add('wrong');
        setTimeout(() => element.classList.remove('wrong', 'selected'), 600);
    }
}

// ==========================================
// COMPLETION
// ==========================================
function goToCompletion() {
    updateProgress(3, 3);
    
    const submoduleKey = `submodule${currentState.submodule}`;
    const submodule = content[submoduleKey];
    const currentTopicIndex = submodule.topics.findIndex(t => t.id === currentState.topic);
    
    // Show/hide next topic button
    if (currentTopicIndex < submodule.topics.length - 1) {
        document.getElementById('nextTopicBtn').classList.remove('hidden');
    } else {
        document.getElementById('nextTopicBtn').classList.add('hidden');
    }
    
    showScreen('completionScreen');
    
    // Check if module is complete
    if (currentState.progress[submoduleKey].length === submodule.topics.length) {
        setTimeout(() => {
            showScreen('moduleCompleteScreen');
        }, 2000);
    }
}

function replayTopic() {
    currentState.teachSlide = 0;
    showTeachContent();
}

function goToNextTopic() {
    const submoduleKey = `submodule${currentState.submodule}`;
    const submodule = content[submoduleKey];
    const currentTopicIndex = submodule.topics.findIndex(t => t.id === currentState.topic);
    
    if (currentTopicIndex < submodule.topics.length - 1) {
        const nextTopic = submodule.topics[currentTopicIndex + 1];
        selectTopic(nextTopic.id);
    }
}

function backToTopics() {
    showTopicSelection();
}

// ==========================================
// HELPERS
// ==========================================
function updateProgress(current, total) {
    const percentage = (current / total) * 100;
    document.getElementById('progressFill').style.width = `${percentage}%`;
}

function markTopicCompleted() {
    const submoduleKey = `submodule${currentState.submodule}`;
    if (!currentState.progress[submoduleKey].includes(currentState.topic)) {
        currentState.progress[submoduleKey].push(currentState.topic);
        saveProgress();
    }
}

function showSuccessFeedback() {
    const overlay = document.getElementById('successOverlay');
    overlay.classList.remove('hidden');
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 1000);
}

// Replace these functions in script.js

function startPromptTimeout() {
    clearPromptTimeout();
    
    promptTimeout = setTimeout(() => {
        let targets = [];

        // HOMEPAGE: Pick exactly one random button to pulse
        if (currentState.stage === 'home') {
            const cards = document.querySelectorAll('.submodule-card');
            if (cards.length > 0) {
                // Pick a random number between 0 and 2
                const randomIndex = Math.floor(Math.random() * cards.length);
                targets = [cards[randomIndex]];
            }
        } 
        // QUIZ: Pulse only the correct answer to guide the child
        else if (currentState.stage === 'quiz') {
            const quizOptions = document.querySelectorAll('.quiz-option');
            const submoduleKey = `submodule${currentState.submodule}`;
            const topic = content[submoduleKey].topics.find(t => t.id === currentState.topic);
            
            quizOptions.forEach((option, index) => {
                if (topic.quiz.options[index].correct) {
                    targets.push(option);
                }
            });
        } 
        // TEACH/ACTIVITY: Pulse the Next Arrow
        else {
            const nextBtns = document.querySelectorAll('#teachNextBtn, #activityNextBtn');
            targets = Array.from(nextBtns).filter(btn => !btn.classList.contains('hidden'));
        }

        // Apply the animation to the chosen target
        targets.forEach(el => {
            if (el) el.classList.add('pulse');
        });

    }, 2000); // 2 seconds
}

function clearPromptTimeout() {
    if (promptTimeout) {
        clearTimeout(promptTimeout);
        promptTimeout = null;
    }
    // Remove the effect from all elements when user interacts
    document.querySelectorAll('.inactivity-prompt').forEach(el => {
        el.classList.remove('inactivity-prompt');
    });
}

// ==========================================
// PROGRESS PERSISTENCE
// ==========================================
function saveProgress() {
    localStorage.setItem('pubertyAppProgress', JSON.stringify(currentState.progress));
}

function loadProgress() {
    const saved = localStorage.getItem('pubertyAppProgress');
    if (saved) {
        currentState.progress = JSON.parse(saved);
    } else {
        currentState.progress = {
            submodule1: [],
            submodule2: [],
            submodule3: []
        };
    }
}

// At the bottom of script.js
window.onload = () => {
    loadProgress();
    showScreen('homepage'); 
    resetPromptTimeout(); // Start the 2-second timer for the main page buttons
};

function updateTeachUI() {
    const submoduleKey = `submodule${currentState.submodule}`;
    const topic = content[submoduleKey].topics.find(t => t.id === currentState.topic);
    const slide = topic.teach[currentState.slide];
    const contentArea = document.getElementById('teachContent');

    if (slide.type === "strip") {
        let html = `<h2 class="teach-text">${translateText(slide.text || '')}</h2>`;
        html += `<div class="hygiene-strip">`;
        slide.steps.forEach(step => {
            const detailText = Array.isArray(step.details)
                ? step.details.map(item => translateText(item)).join(' → ')
                : '';
            html += `
                <div class="strip-item">
                    <div class="strip-icon">${step.icon}</div>
                    <div class="strip-label">${translateText(step.label)}</div>
                    ${detailText ? `<div class="strip-details">${detailText}</div>` : ''}
                </div>`;
        });
        html += `</div>`;
        contentArea.innerHTML = html;
    } else {
        // Your old image/text code here
        contentArea.innerHTML = `<p class="teach-text">${translateText(slide.text || '')}</p>`;
    }

    // Reset Hint Timer
    resetPromptTimeout();
}

function renderSequenceActivity(activity, container) {
    const sequenceWrapper = document.createElement('div');
    sequenceWrapper.className = 'sequence-wrapper';
    sequenceWrapper.style.textAlign = 'center';

    const stepsDiv = document.createElement('div');
    stepsDiv.className = 'sequence-steps';
    stepsDiv.style.display = 'flex';
    stepsDiv.style.justifyContent = 'center';
    stepsDiv.style.alignItems = 'center'; // Center arrows vertically
    stepsDiv.style.gap = '15px';
    stepsDiv.style.marginBottom = '40px';
    stepsDiv.style.flexWrap = 'wrap';

    // Update the loop to include 'index'
    activity.steps.forEach((step, index) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'sequence-step-card';
        stepEl.style.width = '140px'; 
        stepEl.style.padding = '10px';
        stepEl.style.border = '5px solid #ddd';
        stepEl.style.borderRadius = '12px';
        stepEl.style.backgroundColor = '#fff';

        if (step.visible) {
            stepEl.innerHTML = `<img src="${step.image}" style="width: 120px; height: 120px; object-fit: contain; border-radius: 8px;">`;
        } else {
            stepEl.innerHTML = `<div class="sequence-placeholder" style="font-size: 50px; line-height: 120px; color: #aaa;">${step.placeholder}</div>`;
            stepEl.id = "missing-step-placeholder";
        }
        
        stepsDiv.appendChild(stepEl);

        // --- NEW ARROW CODE STARTS HERE ---
        // Add an arrow after every step EXCEPT the last one
        if (index < activity.steps.length - 1) {
    const arrow = document.createElement('div');
    arrow.innerHTML = '➔';
    // If the NEXT step is the missing one, we can color this arrow as a hint
    if (!activity.steps[index + 1].visible) {
        arrow.classList.add('hint-arrow'); 
    }
    stepsDiv.appendChild(arrow);
}
        // --- NEW ARROW CODE ENDS HERE ---
    });
    sequenceWrapper.appendChild(stepsDiv);

    // 2. Render the Choice Options
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'activity-options';
    optionsDiv.style.display = 'flex';
    optionsDiv.style.justifyContent = 'center';
    optionsDiv.style.gap = '20px';

    activity.choices.forEach(choice => {
        const card = document.createElement('div');
        card.className = 'activity-option';
        card.style.width = '180px';
        card.style.padding = '15px';
        card.style.cursor = 'pointer';
        card.style.transition = 'all 0.3s ease'; 
        card.style.borderRadius = '15px';
        card.style.backgroundColor = '#fff';
        card.style.border = '5px solid #eee'; // WIDER BORDER
        
        card.innerHTML = `
            <img src="${choice.image}" style="width: 150px; height: 150px; object-fit: contain; border-radius: 10px; margin-bottom: 10px;">
            <div class="option-text" style="font-weight: bold; font-size: 18px;">${translateText(choice.text)}</div>
        `;

        // --- UPDATED HOVER EFFECTS ---
        card.onmouseenter = () => {
            if (!card.classList.contains('selected')) {
                card.style.backgroundColor = '#2980b9'; // DARKER BLUE HOVER
                card.style.color = '#ffffff'; // White text for contrast
                card.style.transform = 'translateY(-8px)'; // Slightly more lift
                card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                card.style.borderColor = '#1c5982'; // Darker border on hover
            }
        };
        card.onmouseleave = () => {
            if (!card.classList.contains('selected')) {
                card.style.backgroundColor = '#fff';
                card.style.color = '#000';
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
                card.style.borderColor = '#eee';
            }
        };

        // --- CLICK EFFECT ---
        card.onclick = () => {
            optionsDiv.querySelectorAll('.activity-option').forEach(opt => opt.classList.remove('selected'));
            card.classList.add('selected');
            if (choice.correct) {
                card.classList.add('correct');
                card.style.transform = 'scale(1.05)';

                const placeholder = document.getElementById('missing-step-placeholder');
                if (placeholder) {
                    placeholder.innerHTML = `<img src="${choice.image}" style="width: 120px; height: 120px; object-fit: contain; border-radius: 8px;">`;
                    placeholder.style.borderColor = '#2fbf96'; // Keep feedback consistent and calm.
                }

                // Reward sequence
                triggerStars(); 
                const msg = new SpeechSynthesisUtterance(translateText("Congratulations!"));
                window.speechSynthesis.speak(msg);

                setTimeout(() => {
                    markTopicCompleted(); // Persist completion before returning.
                    goHome();
                }, 2000);

            } else {
                card.classList.add('wrong');
                setTimeout(() => {
                    card.classList.remove('wrong', 'selected');
                }, 600);
            }
        };
        optionsDiv.appendChild(card);
    });

    sequenceWrapper.appendChild(optionsDiv);
    container.appendChild(sequenceWrapper);
}

function checkSequenceChoice(buttonElement, isCorrect, correctImageUrl) {
    if (isCorrect) {
        // 1. Fill the slot
        const missingSlot = document.getElementById('step-2');
        if (missingSlot) {
            missingSlot.innerHTML = `<img src="${correctImageUrl}" style="width: 100%; height: 100%; object-fit: contain;">`;
            missingSlot.style.border = "5px solid #4CAF50";
        }

        // 2. Stars
        showSuccess(); 

        // 3. THE FIX: Physically change the screen
        setTimeout(() => {
            document.getElementById('successOverlay').classList.add('hidden');
            completeTopic(); 

            // These three lines MUST be here to navigate back
            currentState.stage = 'topics'; 
            showTopics(2);                // Build the menu
            showScreen('topicScreen');    // This changes the visual screen
        }, 3000);

    } else {
        buttonElement.classList.add('selected', 'wrong');
        setTimeout(() => buttonElement.classList.remove('selected', 'wrong'), 600);
    }
}

function showSuccess() {
    const overlay = document.getElementById('successOverlay');
    if (overlay) {
        overlay.classList.remove('hidden'); // This makes it visible
    }
}

function completeTopic() {
    const submoduleKey = `submodule${currentState.submodule}`;
    if (!currentState.progress[submoduleKey].includes(currentState.topic)) {
        currentState.progress[submoduleKey].push(currentState.topic);
        saveProgress();
    }
    // No showScreen here! We handle the screen jump in the timer above.
}

function renderCategoryActivity(activity, container) {
    container.innerHTML = `
        <div class="activity-wrapper" style="display: flex; flex-direction: column; align-items: center;">
            <p class="instruction-text" style="font-size: 32px; margin-bottom: 20px;">${translateText(activity.instruction)}</p>
            
            <div style="display: flex; gap: 60px; align-items: center; justify-content: center; width: 100%;">
                <div id="gymBag" class="target-container" style="width: 300px; height: 300px; border: 8px dashed #4CAF50; border-radius: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff;">
                    <span style="font-size: 100px;">👜</span>
                    <p class="teach-text" style="color: #4CAF50;">${translateText("GYM BAG")}</p>
                </div>

                <div class="choices-container" style="display: flex; flex-direction: column; gap: 20px;">
                    ${activity.choices.map(choice => `
                        <button class="choice-card" onclick="handleBagChoice(this, ${choice.correct}, '${choice.image}')" style="width: 250px; display: flex; align-items: center; gap: 15px; padding: 15px;">
                            <img src="${choice.image}" style="width: 80px; height: 80px; object-fit: contain;">
                            <span class="teach-text">${translateText(choice.text)}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function handleBagChoice(button, isCorrect, imageUrl) {
    if (isCorrect) {
        // 1. Move image to bag
        const bag = document.getElementById('gymBag');
        bag.innerHTML = `
            <img src="${imageUrl}" style="width: 150px; height: 150px; animation: bounceIn 0.5s;">
            <p class="teach-text" style="color: #4CAF50;">${translateText("Packed!")}</p>
        `;
        bag.style.background = "#e8f5e9";
        bag.style.borderStyle = "solid";

        // 2. Success effects
        showSuccess();
        markTopicCompleted(); // Save completion state.
        
        // 3. Jump Back to Submodule 2
        setTimeout(() => {
            document.getElementById('successOverlay').classList.add('hidden');
            completeTopic();
            currentState.submodule = 2;
            showTopics(2);
            showScreen('topicScreen');
        }, 3000);
    } else {
        // Neutral feedback for incorrect taps
        button.classList.add('selected', 'wrong');
        setTimeout(() => button.classList.remove('selected', 'wrong'), 600);
    }
}

function renderTeachSlide() {
    const topic = currentState.topic;
    const slide = topic.teach[currentState.teachSlide];
    const container = document.getElementById('teachContent');

    // standard rendering of text and image
    container.innerHTML = `
        <div class="teach-slide">
            <p class="teach-text">${translateText(slide.text || '')}</p>
            <div id="imageContainer" style="position:relative; display:inline-block;">
                <img src="${slide.image}" class="teach-image" id="centralBag">
                <div id="itemsLayer" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;"></div>
            </div>
        </div>
    `;

    // CHECK FOR SPECIAL ACTION (THE REVEAL BUTTON)
    if (slide.action === "showerReveal") {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.style = "display:block; margin: 20px auto; background:#ff9800; color:white; font-weight:bold;";
        btn.innerText = translateText("Check My Bag 🎒");
        container.appendChild(btn);

        btn.onclick = () => {
            btn.style.display = 'none';
            revealShowerItems();
        };
    }
}

function revealShowerItems() {
    const itemsLayer = document.getElementById('itemsLayer');
    const items = [
        { icon: "🧼", name: "Soap" },
        { icon: "🧴", name: "Shampoo" },
        { icon: "🧣", name: "Towel" },
        { icon: "🪥", name: "Toothbrush" }
    ];

    const radius = 130; // Distance from the GIF center

    items.forEach((item, index) => {
        const angle = (index / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const toolEl = document.createElement('div');
        toolEl.className = 'activity-option selected'; 
        toolEl.style.position = 'absolute';
        toolEl.style.left = `calc(50% + ${x}px - 40px)`; 
        toolEl.style.top = `calc(50% + ${y}px - 40px)`;
        toolEl.style.width = '80px';
        toolEl.style.height = '80px';
        toolEl.style.animation = `bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${index * 0.15}s`;
        
        toolEl.innerHTML = `
            <div class="option-icon" style="font-size:30px">${item.icon}</div>
            <div class="option-text" style="font-size:12px">${translateText(item.name)}</div>
        `;
        itemsLayer.appendChild(toolEl);
    });
}

function showSuccessStars() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '1000';
    document.body.appendChild(overlay);

    // Create 20 stars
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.innerText = '⭐';
        star.style.position = 'absolute';
        star.style.left = '50%';
        star.style.top = '50%';
        star.style.fontSize = '30px';
        star.style.transition = 'all 1.5s ease-out';
        overlay.appendChild(star);

        // Animate stars flying outward
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const dist = 300 + Math.random() * 200;
            star.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
            star.style.opacity = '0';
        }, 10);
    }
    
    // Clean up
    setTimeout(() => overlay.remove(), 2000);
}

function showActivity() {
    const submoduleKey = `submodule${currentState.submodule}`;
    const topic = content[submoduleKey].topics.find(t => t.id === currentState.topic);
    const activity = topic.activity;

    const activityContent = document.getElementById('activityContent');
    activityContent.innerHTML = '';

    if (activity.type === "showerKitMatch") {
        const container = document.createElement('div');
        container.className = 'shower-activity-container';

        // Left Side: Question and Image
        const leftSide = document.createElement('div');
        leftSide.className = 'activity-left';
        leftSide.innerHTML = `
            <p class="teach-text">${translateText(activity.question)}</p>
            <img src="${activity.leftImage}" class="teach-image">
        `;

        // Right Side: Selection Boxes
        const rightSide = document.createElement('div');
        rightSide.className = 'activity-right';

        activity.choices.forEach(choice => {
            const card = document.createElement('div');
            card.className = 'activity-option';
            card.innerHTML = `
                <img src="${choice.image}" class="option-image">
                <p class="option-text">${translateText(choice.text)}</p>
            `;

            card.onclick = () => {
                rightSide.querySelectorAll('.activity-option').forEach(opt => opt.classList.remove('selected'));
                card.classList.add('selected');
                if (choice.correct) {
                    card.classList.add('correct');
                    triggerStars(); // Shows success-stars
                    markTopicCompleted(); // Ensure completion is saved.
                    setTimeout(() => {
                        goHome(); // Jumps back to main page
                    }, 2500);
                } else {
                    card.classList.add('wrong');
                    setTimeout(() => card.classList.remove('wrong', 'selected'), 600);
                }
            };
            rightSide.appendChild(card);
        });

        container.appendChild(leftSide);
        container.appendChild(rightSide);
        activityContent.appendChild(container);
    }
    // ... rest of your existing activity types
}

function triggerStars() {
    const container = document.body;
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.style.position = 'fixed';
        star.style.left = '50%';
        star.style.top = '50%';
        star.style.fontSize = Math.random() * 20 + 20 + 'px';
        star.style.zIndex = '9999';
        star.style.pointerEvents = 'none';
        container.appendChild(star);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 15 + 5;
        const destinationX = Math.cos(angle) * 500;
        const destinationY = Math.sin(angle) * 500;

        star.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            fill: 'forwards'
        });

        setTimeout(() => star.remove(), 2000);
    }
}

function renderShowerKitMatch(activity, container) {
    const mainWrapper = document.createElement('div');
    mainWrapper.className = 'shower-activity-container';

    // Left Side: Image only (The title is already handled by goToActivity)
    const leftSide = document.createElement('div');
    leftSide.className = 'activity-left';
    leftSide.innerHTML = `
        <img src="${activity.leftImage}" class="teach-image" style="max-width: 100%;">
    `;

    // Right Side: Selection Boxes
    const rightSide = document.createElement('div');
    rightSide.className = 'activity-right';

    activity.choices.forEach(choice => {
        const card = document.createElement('div');
        card.className = 'activity-option';
        card.innerHTML = `
            <img src="${choice.image}" class="option-image">
            <p class="option-text">${translateText(choice.text)}</p>
        `;

        card.onclick = () => {
            // STOP THE HINT timer because the user interacted
            if (promptTimeout) clearTimeout(promptTimeout);

            if (choice.correct) {
                // Play correct sound
                playCorrectSound();
                card.classList.add('selected', 'correct');
                triggerStars();
                markTopicCompleted(); // Save completion before returning home.
                setTimeout(() => goHome(), 2500);
            } else {
                // Neutral feedback for wrong taps.
                card.classList.add('selected', 'wrong');
                setTimeout(() => card.classList.remove('wrong', 'selected'), 600);
                // Restart timer if they got it wrong so they get a hint again
                resetPromptTimeout();
            }
        };
        rightSide.appendChild(card);
    });

    mainWrapper.appendChild(leftSide);
    mainWrapper.appendChild(rightSide);
    container.appendChild(mainWrapper);
}        // --- TYPE B: SHOWER REVEAL ---
        

// Optional: Modified version to only highlight the correct one
function resetPromptTimeout() {
    clearPromptTimeout();
    
    // Set timer for 2 seconds of inactivity
    promptTimeout = setTimeout(() => {
        // 1. Identify the currently active screen
        const activeScreen = document.querySelector('.screen.active');
        if (!activeScreen) return;

        const targets = [];

        if (activeScreen.id === 'quizScreen') {
            const submoduleKey = `submodule${currentState.submodule}`;
            const topic = content[submoduleKey].topics.find(t => t.id === currentState.topic);
            const quizData = Array.isArray(topic.quiz) ? topic.quiz[currentState.quizSlide] : topic.quiz;
            const quizOptions = activeScreen.querySelectorAll('.quiz-option');
            const correctIndexes = [];

            if (quizData && quizData.type !== "subjective") {
                quizData.options.forEach((option, index) => {
                    if (option.correct) {
                        correctIndexes.push(index);
                    }
                });
            }

            if (correctIndexes.length > 0) {
                correctIndexes.forEach((index) => {
                    if (quizOptions[index]) {
                        targets.push(quizOptions[index]);
                    }
                });
            } else if (quizOptions.length > 0) {
                targets.push(quizOptions[Math.floor(Math.random() * quizOptions.length)]);
            }
        } else {
            const candidates = activeScreen.querySelectorAll('button, .topic-card, .activity-option, .submodule-card, .gender-card');
            if (candidates.length > 0) {
                const randomIndex = Math.floor(Math.random() * candidates.length);
                targets.push(candidates[randomIndex]);
            }
        }

        targets.forEach(target => {
            target.classList.add('inactivity-prompt');
        });
    }, 2000); 
}

// --- UPDATED QUIZ RENDERING ---
// Add this to your currentState at the top of script.js
//  
function showQuiz() {
    currentState.stage = 'quiz';
    const submoduleKey = `submodule${currentState.submodule}`;
    const topic = content[submoduleKey].topics.find(t => t.id === currentState.topic);
    
    // Handle both single question object and array of questions
    const quizData = Array.isArray(topic.quiz) ? topic.quiz[currentState.quizSlide] : topic.quiz;

    document.getElementById('quizTitle').textContent = translateText("Quiz Time!");
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = '';

    const questionText = document.createElement('p');
    questionText.className = 'teach-text';
    questionText.textContent = translateText(quizData.question);
    quizContent.appendChild(questionText);

    // Add this check inside your showQuiz function where images are handled
if (quizData.image) {
    const mainImg = document.createElement('img');
    mainImg.src = quizData.image;
    mainImg.className = 'teach-image';
    mainImg.onerror = () => {
        console.error("Could not find image at:", quizData.image);
        mainImg.style.display = 'none'; // Hide if broken instead of showing a 'broken' icon
    };
    quizContent.appendChild(mainImg);
}

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'activity-options';
    optionsDiv.style.display = 'flex';
    optionsDiv.style.flexDirection = 'row'; 
    optionsDiv.style.gap = '20px';

    // Defined Colors for the boxes
    // Index 0: Red, Index 1: Yellow, Index 2: Green
    const moodColors = ['#ff4d4d', '#ffcc00', '#4caf50']; 
    const textColors = ['#ffffff', '#000000', '#ffffff']; // White text for red/green, black for yellow

    quizData.options.forEach((choice, index) => {
        const card = document.createElement('div');
        card.className = 'activity-option';
        card.style.flex = '1';
        card.style.transition = 'transform 0.2s, filter 0.2s';
        card.style.cursor = 'pointer';

        // Apply the solid background color to the entire box if it's the subjective mood tracker
        if (quizData.type === "subjective") {
            card.style.backgroundColor = moodColors[index] || 'white';
            card.style.color = textColors[index] || 'black';
            card.style.border = 'none'; // Remove default border for a cleaner look
            card.style.borderRadius = '20px'; // Ensure nice rounded corners
            card.style.padding = '20px';
        }

        card.innerHTML = `
            ${choice.icon ? `<div class="option-icon" style="font-size:50px; margin-bottom: 10px;">${choice.icon}</div>` : ''}
            <div class="option-text" style="font-weight: bold; font-size: 20px;">${translateText(choice.text)}</div>
        `;

        // Add a slight "pop" effect when clicking
        card.onclick = () => {
            optionsDiv.querySelectorAll('.activity-option').forEach(opt => opt.classList.remove('selected'));
            card.classList.add('selected');
            card.style.transform = 'scale(0.95)';
            if (quizData.type === "subjective") {
                handleQuizTransition(topic);
            } else {
                if (choice.correct) {
                    card.classList.add('correct');
                    handleQuizTransition(topic);
                } else {
                    card.classList.add('wrong');
                    setTimeout(() => {
                        card.classList.remove('wrong', 'selected');
                        card.style.transform = 'scale(1)';
                    }, 600);
                }
            }
        };

        optionsDiv.appendChild(card);
    });

    quizContent.appendChild(optionsDiv);
    showScreen('quizScreen');
}

function handleQuizTransition(topic) {
    triggerStars();
    
    // Check if we are at the end of the quiz
    const isLastQuestion = !Array.isArray(topic.quiz) || currentState.quizSlide >= topic.quiz.length - 1;

    // UPDATED LOGIC: Trigger for EVERY topic/feature when the last question is answered
    if (isLastQuestion) {
        // Optional: Play a congratulatory voice message
        const msg = new SpeechSynthesisUtterance(translateText("Congratulations! You completed this topic!"));
        window.speechSynthesis.speak(msg);
        markTopicCompleted(); // Persist completion for this flow.
        
        // Wait for 2 seconds to show stars/feedback, then jump back to main page
        setTimeout(() => {
            goHome();
        }, 2000);
        return; 
    }

    // Standard transition for moving to the next question within the same quiz
    if (Array.isArray(topic.quiz) && currentState.quizSlide < topic.quiz.length - 1) {
        currentState.quizSlide++;
        showQuizSlide(); // Ensure this function is called to render the next question
    }
}

function completeActivityAndGoToQuiz() {
    // Show success feedback
    showSuccessFeedback();
    
    // Wait a moment then go to quiz
    setTimeout(() => {
        goToQuiz();
    }, 800);
}

function completeActivityAndGoHome() {
    // Save progress if not already saved
    markTopicCompleted();
    
    // Play completion sound (can be different from correct sound)
    playCompletionSound();
    
    // Show success feedback
    triggerStars();
    
    // Voice feedback
    const msg = new SpeechSynthesisUtterance(translateText("Great job! You finished this topic."));
    window.speechSynthesis.speak(msg);
    
    // Wait 2 seconds then go home
    setTimeout(() => {
        goHome();
    }, 2000);
}

function playCorrectSound() {
    try {
        // METHOD 1: Using your own audio file
        // Put your sound file (e.g., "correct.mp3", "ding.wav", "success.ogg") in your project folder
        const audio = new Audio('sounds/correct.mp3'); // Change this path to your sound file
        audio.volume = 0.5; // Adjust volume (0.0 to 1.0)
        audio.play();
        
    } catch (e) {
        console.log("Audio could not play:", e);
        
        // FALLBACK: If custom sound fails, use generated sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e2) {
            console.log("Audio not supported:", e2);
        }
    }
}

// OPTIONAL: Add different sounds for different actions
function playWrongSound() {
    try {
        const audio = new Audio('sounds/wrong.mp3'); // Your wrong answer sound
        audio.volume = 0.3;
        audio.play();
    } catch (e) {
        console.log("Wrong sound could not play:", e);
    }
}

function playCompletionSound() {
    try {
        const audio = new Audio('sounds/celebration.mp3'); // Your completion sound
        audio.volume = 0.6;
        audio.play();
    } catch (e) {
        console.log("Completion sound could not play:", e);
    }
}

function completeActivityAndGoToQuiz() {
    // Play sound effect
    playCorrectSound();
    
    // Show success feedback
    showSuccessFeedback();
    
    // Wait a moment then go to quiz
    setTimeout(() => {
        goToQuiz();
    }, 800);
}

function playWordSound(word) {
    try {
        // Map words to their sound files
        const soundMap = {
            'soap': 'sounds/soap.mp3',
            'shampoo': 'sounds/shampoo.mp3',
            'towel': 'sounds/towel.mp3',
            'toothbrush': 'sounds/toothbrush.mp3',
            'boy': 'sounds/i-am-a-boy.mp3',
            'girl': 'sounds/i-am-a-girl.mp3',
            'growing-taller': 'sounds/growing-taller.mp3',
            'body-hair': 'sounds/grow-body-hair.mp3',
            'happy': 'sounds/laughing.mp3',
            'angry': 'sounds/angry.mp3',
            'sad': 'sounds/sad.mp3',
            'i feel happy': 'sounds/laughing.mp3',
            'i feel angry': 'sounds/angry.mp3',
            'i feel sad': 'sounds/sad.mp3'
        };
        
        const soundKey = word.toLowerCase();
        const soundFile = soundMap[soundKey];
        if (soundFile) {
            const audio = new Audio(soundFile);
            // Boost key hygiene items for clearer audio across devices.
            audio.volume = ['soap', 'towel'].includes(soundKey) ? 1 : 0.7;
            audio.play();
        }
    } catch (e) {
        console.log("Word sound could not play:", e);
    }
}
function triggerHint() {
    const activityScreen = document.getElementById('activityScreen');
    const quizScreen = document.getElementById('quizScreen');
    
    let container = null;
    let pageText = "";

    // 1. Determine which screen is active and get the context (Instruction/Question)
    if (activityScreen.classList.contains('active')) {
        container = activityScreen;
        pageText = document.getElementById('activityTitle').textContent.trim();
    } else if (quizScreen.classList.contains('active')) {
        container = quizScreen;
        pageText = document.getElementById('quizQuestion').textContent.trim();
    }

    if (!container) return;

    const options = container.querySelectorAll('.activity-option, .quiz-option, .gender-card, .emotion-card');
    
    // 2. Data Map linking Questions to their Correct Answers
    const targetMap = {
        "Which picture shows a body change during puberty?": "Growing Taller",
        "Choose me!": "Boy",
        "Touch your forehead. How does your skin feel to your fingers?": "Smooth and Dry!",
        "How much power do you have now?": "100%",
        "When does body hair appear?": "After Puberty",
        "When does a person have short legs?": "Before Puberty",
        "Which is the essential kit in taking shower?": "Soap",
        "Which shows positive body image? +": "My body is strong",
        "What does sleep give you?": "Energy",
        "Tap the HEALTHY foods!": ["Vegetables", "Fruits"], 
        "Which food help you grow strong?": "Vegetables"
    };

    const targetLabel = targetMap[pageText];

    // 3. Highlight only the specific correct answer(s)
    if (targetLabel) {
        options.forEach(opt => {
            const label = opt.querySelector('p, .option-text, span, .label')?.textContent.trim();
            const isMatch = Array.isArray(targetLabel) ? targetLabel.includes(label) : label === targetLabel;
            
            if (isMatch) {
                opt.classList.add('pulse');
                // Remove the pulse after 3 seconds so it's not permanent
                setTimeout(() => opt.classList.remove('pulse'), 3000);
            }
        });
    }
    // Note: The "Random Hint" logic has been removed to ensure 
    // hints are only provided for correct answers.

}

