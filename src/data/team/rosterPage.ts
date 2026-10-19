import type { WikiPageContent } from "../../components/wiki/wikiPageTypes";

export interface RosterMember {
  id: string;
  name: string;
  image: string;
  role: string;
  tagline?: string;
  bio?: string[];
  quote?: string;
}

export interface RosterCollection {
  id: string;
  title: string;
  kind: "teachers" | "group" | "advisors";
  image?: string;
  members: RosterMember[];
}

// Transcribed from 文案集/team/roster/2.1 Roster.md, in manuscript order.
export const rosterCollections: RosterCollection[] = [
  {
    id: "primary-pis",
    title: "Primary PIs",
    kind: "teachers",
    members: [
      {
        id: "bin-liu",
        name: "Bin Liu",
        image: "bin-liu",
        role: "Primary PI",
      },
      {
        id: "guoyue-lv",
        name: "Guoyue Lv",
        image: "guoyue-lv",
        role: "Primary PI",
      },
      {
        id: "jiuwei-cui",
        name: "Jiuwei Cui",
        image: "jiuwei-cui",
        role: "Primary PI",
      },
      {
        id: "songling-zhang",
        name: "Songling Zhang",
        image: "songling-zhang",
        role: "Primary PI",
      },
    ],
  },
  {
    id: "secondary-pis",
    title: "Secondary PIs",
    kind: "teachers",
    members: [
      {
        id: "lin-jia",
        name: "Lin Jia",
        image: "lin-jia",
        role: "Secondary PI",
      },
      {
        id: "meihua-piao",
        name: "Meihua Piao",
        image: "meihua-piao",
        role: "Secondary PI",
      },
      {
        id: "qingtian-guan",
        name: "Qingtian Guan",
        image: "qingtian-guan",
        role: "Secondary PI",
      },
    ],
  },
  {
    id: "team-leader",
    title: "Team Leader",
    kind: "group",
    members: [
      {
        id: "ding-ma",
        name: "Ding Ma",
        image: "ding-ma",
        role: "Team Leader",
        tagline: "Ding, powered by coffee",
        bio: [
          "I have always believed that a meaningful life is not measured by how far we go, but by what we choose to care about along the way.",
          "I am curious by nature, restless in the face of unanswered questions, and perhaps a little too unwilling to leave things unfinished. I find joy in turning ideas into something real, in learning what I do not yet understand, and in discovering how much there is still to learn. Medicine and science are part of my journey, but they are not the whole of it. Beyond them, I care about people, the stories they carry, and the small, often unnoticed ways we can make a difference.",
          "I hope to live with both conviction and kindness: to pursue what matters without losing sight of those beside me, to grow without forgetting where I began, and to remain open to all that life has yet to teach me.",
          "And when the years have taken me far from who I am today, I hope there will still be something of the boy who first set out—the same light in his eyes, the same wonder in his heart.I have always believed that a meaningful life is not measured by how far we go, but by what we choose to care about along the way.",
          "I am curious by nature, restless in the face of unanswered questions, and perhaps a little too unwilling to leave things unfinished. I find joy in turning ideas into something real, in learning what I do not yet understand, and in discovering how much there is still to learn. Medicine and science are part of my journey, but they are not the whole of it. Beyond them, I care about people, the stories they carry, and the small, often unnoticed ways we can make a difference.",
          "I hope to live with both conviction and kindness: to pursue what matters without losing sight of those beside me, to grow without forgetting where I began, and to remain open to all that life has yet to teach me.",
          "And when the years have taken me far from who I am today, I hope there will still be something of the boy who first set out—the same light in his eyes, the same wonder in his heart.",
        ],
        quote: "“Not knowing when the dawn will come, I open every door.”",
      },
      {
        id: "xuanhe-chang",
        name: "Xuanhe Chang",
        image: "xuanhe-chang",
        role: "Team Leader",
        tagline: "Tom, a badminton fanatic",
        bio: [
          "I am a clinical medicine student and team leader for our iGEM project. Within the team, I mainly oversee wet‑lab experimental validation, scientific schematic illustration and data organization. I maintain lasting curiosity about how nucleic‑acid molecules regulate anti‑tumor immune responses. I can easily lose track of time while running experiments, polishing mechanism diagrams or sorting out experimental datasets, and I hold a near‑obsessive preference for rigorous logic and neat graphic layouts. Beyond research, I am a big badminton fan; playing badminton helps me reset my mind after long hours of academic work. I believe solid scientific findings deserve clear and accessible visualization. Therefore, I keep trying to translate complicated molecular stories into intuitive graphics understandable for readers from diverse backgrounds. I enjoy exploring the boundary between theoretical research and real‑world therapeutic translation.",
        ],
        quote: "“The best way to predict the future is to create it.”",
      },
      {
        id: "jinqi-xu",
        name: "Jinqi Xu",
        image: "jinqi-xu",
        role: "Team Leader",
        tagline: "Nemo, bench to bedside dreamer",
        bio: [
          "Hey, I'm Nemo, a clinical medicine undergrad at **The First Bethune Clinical Medical College of Jilin University**. Most of my days are spent buried in textbooks and lab work, but basketball, electric guitar, and rock music are the outlet and the fuel I keep for myself along the way.",
          "I'm the kind of person who stays energized by working with others. I love the process of solving problems together as a team, hearing different people's perspectives and passions, and I genuinely believe that the best work only happens when ideas collide in conversation. Whether it's wrapping up a long day by going over things with teammates, or staying up late bouncing ideas back and forth, as long as we're all pulling toward the same goal, I feel grounded.",
          "Medicine is the path I'm on, but what rock and basketball have taught me — how to handle pressure, how to lock in with teammates, how to find my place in the rhythm — has actually been making me steadier on this path. I'm here to learn seriously, to produce something real, and to turn what we're working on into something that actually lands, alongside people I respect. At the end of the day, being able to walk the same road with both the rigor of medicine and the fire of rock 'n' roll — that's a pretty lucky thing.",
        ],
        quote:
          "“You can be anything you want to be, just turn yourself into anything you think that you could ever be.”",
      },
    ],
    image: "team-leader",
  },
  {
    id: "wet-lab",
    title: "Wet Lab",
    kind: "group",
    members: [
      {
        id: "ke-wang",
        name: "Ke Wang",
        image: "ke-wang",
        role: "Group Lead",
        tagline: "Abyss, shy offline, feral online",
        bio: [
          "I study clinical medicine at Jilin University, and on CirCure I lead the wet lab, which mostly means running the experiments and then running them again. Offline I’m shy in the ordinary, unremarkable way: I go quiet in rooms with more than four people, I let the louder person finish, and I think of the funny reply twenty minutes after the moment has gone. Online I’m the opposite — flooding the chat, sending the unsolicited essay, saying the thing out loud. I used to assume one of those was the real me and the other a costume. Now I think they’re the same person at different speeds; one of them just gets to edit. What I actually spend my time on is making things up. I have whole worlds in my head that will never be useful to anyone: invented places, impossible premises, long what-ifs I follow for hours before bed. Science and daydreaming feel like the same instinct to me, only one of them has to be checked afterwards. If you want to know me, message me first. I’ll write back far too much.",
        ],
        quote:
          "“Every abyss is just somewhere nobody has brought a light to yet.”",
      },
      {
        id: "jiaze-xu",
        name: "Jiaze Xu",
        image: "jiaze-xu",
        role: "Team Member",
        tagline: "Jurry, a fitness bro who can't stay disciplined",
        bio: [
          "I am a medical student from Northeast China, blessed with the straightforwardness and humor rooted in my homeland. In our iGEM team, I oversee promotional video production and assist cross-team communication, bridging wet-lab findings with public outreach.",
          "Among medical subjects, immunology captivates me the most, while genetics is my least favorite. Nothing makes me lose track of time quite like cycling; I can pour hours into riding without noticing. I love cooking hearty Northeastern dishes in my spare time. One of my little habits is making detailed plans and setting clear time limits for all my tasks. I always carry a small notebook to jot down random thoughts, hypotheses or lines from books and shows. I habitually re-analyze medical drama plots as if solving clinical cases. I prefer plain black coffee and will pause anything to debate a thought-provoking idea. Yu Hua is my favorite writer, and *House M.D.* tops my watchlist.",
          "I once thought scientific research was simple, yet deeper exploration revealed its hardships. Still, I keep exploring and embracing trial-and-error, hoping to contribute, even in small ways, to global challenges via synthetic biology. In iGEM, I am endlessly fascinated by creative, cross-disciplinary projects full of wild ideas.",
        ],
        quote: "“Get prepared for the worst scenario.”",
      },
      {
        id: "minxu-jin",
        name: "Minxu Jin",
        image: "minxu-jin",
        role: "Team Member",
        tagline: "Sandy, the Master of Perfect Timing",
        bio: [
          "I’m Sandy, a clinical medicine student from Jilin University.I’m responsible for safety and security in our team,sorting risk documents and keeping our team’s work safe and orderly.",
          "I’m a huge fan of Korean brainy variety shows.I’m fascinated by how different people come up with totally unique ideas facing the same set of game rules.And from the programs I have learned plenty about game theory and strategies for communication and decision-making.I also love crystals.I believe every crystal carries its distinct energy field,which can bring me positive energy and good luck.I have an amazing skill: I always make it to class right on the dot, and I have never been late.",
          "I firmly believe the world belongs to idealists. I hope I can always dare to dream, and bravely turn my dreams into reality rather than leaving them as mere thoughts.",
        ],
        quote: "“Dare to dream big, and dare to make it real.”",
      },
      {
        id: "zitong-ye",
        name: "Zitong Ye",
        image: "zitong-ye",
        role: "Team Member",
        tagline: "Sylvia,always ready to try something new",
        bio: [
          "As a clinical‑medicine student, my main work within the team centers on wet‑lab experiments. A wide range of activities have cast me into diverse roles, each helping shape my vision of where I am headed and who I wish to become.",
          "Like a tree waiting to bloom, everything in this world carries its own rhythm and hues. Every small step unlocks wonderful, brand‑new experiences. Independence, proactivity, self‑awareness and consistent hard work remain my inner compass. Progress comes from acknowledging my shortcomings, with distant goals always held in view.",
          "Curiosity drives me to try new things. Whether running lab assays or venturing into unknown territory, challenges are met with an open mind. Through iGEM, excitement builds for personal growth and fresh lenses to view the world.",
          "To feel the way, feel myself and live my life to the fullest — these words echo deep inside me. Fascinated by subtle patterns hidden in life and science, joy lies in learning, exploring and creating side‑by‑side with teammates.",
        ],
        quote: "“Keep a single spark to start a prairie fire.”",
      },
      {
        id: "shuangshuo-tian",
        name: "Shuangshuo Tian",
        image: "shuangshuo-tian",
        role: "Team Member",
        tagline: "Nelson，coffee-proof night owl",
        bio: [
          'Nelson, a second-year undergraduate student majoring in clinical medicine, who is mainly responsible for wet lab related work within the team. He is fascinated by all kinds of laboratory experiments, in the same way that he is drawn to discounted games on Steam. He keeps an owl-like daily routine and is naturally immune to the effects of coffee. Deep into the night, he is either accumulating creative inspiration or tasting tasty midnight snacks. He is fond of desserts and candies. Once something sparks his interest, he can spend several hours focusing on it. With a slight obsession with his hair, his fluffy hair often brings him some "fuzzy little troubles". Apart from these hobbies, he enjoys music and chorus performances. He really appreciates group activities where he can cooperate and work together with other people.',
        ],
        quote: "“Per aspera ad astra.”",
      },
      {
        id: "jingtong-xu",
        name: "Jingtong Xu",
        image: "jingtong-xu",
        role: "Team Member",
        tagline: "Jingtong, driven by curiosity, drawn to surgery",
        bio: [
          "Hi, I’m Jingtong Xu, a clinical medicine student at Jilin University. I enjoy working with my hands, which is what draws me to surgery. I also like to understand the “why” behind what I learn, not just know the answer. When something doesn’t quite make sense to me, I usually have another question.",
          "As a member of JLU-FBH’s Wet Lab team, I work with my teammates to conduct experiments, organize experimental documentation, interpret results, and prepare scientific content for our project. I also take part in our Human Practices and Education activities, helping introduce our project to a wider audience and share knowledge of synthetic biology.",
          "Outside medicine and research, I’m a huge music fan. I especially love DJ music with strong beats: the rhythm, the energy, and how good it feels to listen. Exercise and a good night’s sleep are my other favorite ways to recharge. One gets me moving; the other gives me time to rest, and I’m happy to make room for both. These are simple things, but they’re what I most enjoy spending my free time on.",
        ],
        quote:
          "“Be bold, believe in yourself, and never let fear hold you back.”",
      },
      {
        id: "jiayi-zhang",
        name: "Jiayi Zhang",
        image: "jiayi-zhang",
        role: "Team Member",
        tagline: "Jaye, 101st fighter against no-nap days",
        bio: [
          "I’m Jaye Zhang, whose aesthetic is shaped by both logic and art. I study clinical medicine, a discipline both admirable and intimidating. Within the team, I am a wet-lab member stepping across into art & design, in charge of visualizing experimental workflows.",
          "When under immense pressure, my specialty is petting cats (mo-mao) rather than slacking off (mo-yu). I’m an old-school hands-on craftsperson who sticks to hand-made work, and I’m currently trying my best to tame AI.",
          "I look forward to meeting every soul in this world — except paranormal creatures.",
        ],
        quote:
          "“When you feel lost, confused, anxious or helpless, close your eyes, cover your ears, take three deep breaths, and give your body back to yourself.”",
      },
    ],
    image: "wet-lab",
  },
  {
    id: "dry-lab",
    title: "Dry Lab",
    kind: "group",
    members: [
      {
        id: "ouyang-li",
        name: "Ouyang Li",
        image: "ouyang-li",
        role: "Group Lead",
        tagline: "Game lover；Hardware explorer；Music lover",
        bio: [
          "I'm responsible for experimental work in our team, spending most of my time designing protocols and analyzing data.",
          "Outside of work, I enjoy playing board games—Gomoku, Chinese chess, and international chess. There's something calming about sitting down, thinking through each move, and planning a few steps ahead. When I'm not exercising my brain, I like to get moving—playing badminton or hitting the ski slopes in winter to unwind in a different way.",
          "I'm also interested in hardware—computers, smartphones, and various electronic devices. I like to follow their specs and design philosophy, and occasionally dive into emerging technologies.",
          "Working in a lab has made me comfortable with iteration and adjustment. There's a quote from Tao Yuanming that really resonates with me: \"The past cannot be remedied, but the future can still be pursued.\" What's done is done—what matters is doing the next thing well.",
        ],
        quote:
          "“I realize the past is beyond remedy, but I know the future can still be pursued.”\n—Return Home!",
      },
      {
        id: "hui-pan",
        name: "Hui Pan",
        image: "hui-pan",
        role: "Team Member",
        tagline: "Willo, a snooker soul",
        bio: [
          "I am a clinical medicine student mainly responsible for bioinformatics and computational design in our iGEM project. Recently, I have also become fascinated by machine learning, partly because I am never very comfortable using a model without knowing what is happening inside it. I may have developed a slightly stubborn bioinformatics mindset: if a number looks strange, a figure feels unclear, or one tiny detail in a PPT does not quite make sense, I somehow cannot leave it alone. My PI, Qingtian Guan, has probably made this habit even stronger. Every time I present slides to him, he can always find the detail I secretly hoped no one would notice—and then ask “why?” until I have a real answer. Outside research, I enjoy playing billiards and reading wuxia novels. I like the precision and strategy of billiards, while wuxia gives me a completely different world of freedom, adventure, and imagination. Maybe that combination describes me quite well: a little obsessive about details, but always curious about what lies beyond them.",
        ],
        quote:
          "“Beneath falling peach-blossom shadows, the divine sword takes flight.”",
      },
      {
        id: "ziyi-yan",
        name: "Ziyi Yan",
        image: "ziyi-yan",
        role: "Team Member",
        tagline:
          "Ziyi,a computational biology dreamer who has never published in any journal—yet",
        bio: [
          "Hello everyone, I'm Yan. I study CS,and do computational biology, with a particular interest in the so-called \"deep pit\" of structural biology. I enjoy exploring, imagining, and building interesting things. Besides computational biology, I am a script kiddie, a loyal Qwen fan, and active on GitHub and Hugging Face. In our iGEM team, I focus on  tool development, and rapidly testing new ideas. Sometimes, instead of preparing for tomorrow's final exam, I would rather verify a thought that has just captured my mind.I love playing galgames. In public, I may seem quiet, hesitant, and even timid, but my friends know I can be wildly enthusiastic. My life is often a messy pot of porridge, but I like to drink it while it's hot. I also enjoy collecting useless tools and books.To me, iGEM is fascinating because it lets a team blend curiosity, imagination, and chaotic but shining ideas into something genuinely interesting.",
        ],
        quote:
          "“optimizer.zero_grad()  # clear the gradients, ignore the noise, and keep learning.”",
      },
      {
        id: "yufan-ji",
        name: "Yufan Ji",
        image: "yufan-ji",
        role: "Team Member",
        tagline: "Euclid, runs on logic and coffee",
        bio: [
          "Hi everyone, I'm a data scientist by day and an amateur proofreader of the universe by night. On the team, I'm the guy people turn to when a messy problem needs to become a clean model — I build mathematical models, argue about assumptions, and occasionally say \"that's trivial\" before spending three hours proving it.",
          "What makes me lose track of time? A good proof. There's something addictive about starting from a few axioms and ending up somewhere surprising — like a magic trick where logic does the sleight of hand. I've been known to model everything: the optimal strategy for boarding a plane, the queuing theory of our office coffee machine, even whether my cat's feeding schedule follows a Poisson process (it doesn't — it's pure chaos).",
          'My friends say I have two modes: dead serious about derivatives, and dead serious about bad puns. I believe a well-timed joke is like a lemma — small, elegant, and essential to the bigger proof. Fun fact: I keep a "theorem journal" of everyday observations. Entry #47: the probability of my earphones tangling approaches 1, regardless of initial conditions.',
          "Looking forward to meeting you all — and yes, I will find the pattern in everything.",
        ],
        quote: "“People than the high mountain, the foot than long road.”",
      },
    ],
    image: "dry-lab",
  },
  {
    id: "human-practices",
    title: "Human Practices",
    kind: "group",
    members: [
      {
        id: "zhe-jia",
        name: "Zhe Jia",
        image: "zhe-jia",
        role: "Group Lead",
        tagline: "silver,jovial zephyr with rainstar",
        bio: [
          "I study clinical medicine, and in our team I am mainly responsible for Human Practices. I enjoy talking to people, hearing different opinions, and figuring out how a scientific idea might actually make sense outside the laboratory.When I am not busy with medicine, I like playing guitar, reading, and occasionally having a drink with friends. I also have a strange fondness for rain, stars, and perhaps one particular combination of the two.I am not someone who believes everything has to be perfect. Sometimes the slightly unfinished, unexpected, or even mistaken parts are what make things memorable. A song does not become worse because of one wrong note, and life probably works the same way. I like the idea that algorithms keep looking for the best answer, while people are allowed to take detours. We make mistakes, change our minds, and somehow find a little romance in the process.",
        ],
        quote:
          "“While Algorithms seek perfection, we find poetry in our imperfections.”",
      },
      {
        id: "yirou-gong",
        name: "Yirou Gong",
        image: "yirou-gong",
        role: "Group Lead",
        tagline: "Just Yirou Gong",
        bio: [
          "I come from a clinical medicine background and currently focus on HP-related work. In the team, I help organize information, follow up on key tasks, and support communication and coordination. Beyond that, I am someone who gets easily hooked on new things. New ideas, new tools, new experiences—they all spark my curiosity and make me eager to try. I love the unknown and treat life as a series of small adventures. I enjoy exploring unfamiliar paths, asking “why,” and turning messy information into clear, actionable steps. Uncertainty does not scare me; it excites me. I like keeping life fresh and staying open to surprises. I don’t need to know exactly where every path leads, because finding out is often the best part. I would rather try and learn than wait and wonder. That is how I stay energetic and open. If you want to know me better, just ask what I’m curious about next.",
        ],
        quote:
          "“I must search. Even if the endless powdering of stars in the Galaxy makes the quest seem hopeless, and even if I must do it alone.”",
      },
      {
        id: "zecun-li",
        name: "Zecun Li",
        image: "zecun-li",
        role: "Group Lead",
        tagline: "Sawamura, always curious, forever exploring.",
        bio: [
          "In our team, I am responsible for sustainability, iHP, and education. These areas allow me to connect scientific ideas with people, society, and the future, which is something I find deeply meaningful. I am also the kind of person who pays obsessive attention to detail. A slightly uneven graphic, an inconsistent font, or a tiny visual flaw can bother me far more than it probably should. To me, these details are not meaningless: they reflect our attitude toward the work and the respect we show to everyone who sees it. Outside my responsibilities, I am driven by curiosity and enjoy exploring new ideas, asking questions, and turning vague thoughts into something clear and practical. I may be demanding when it comes to quality, but that comes from wanting our team to create something we can truly be proud of. I hope everything goes smoothly for us this year, and that we can work together to make our dream of reaching Paris come true. More than that, I hope this journey will become a beautiful and fulfilling ending to my undergraduate life.",
        ],
        quote: "“Live it, dream it, and make it real.”",
      },
      {
        id: "jianyu-zhou",
        name: "Jianyu Zhou",
        image: "jianyu-zhou",
        role: "Team Member",
        tagline: "Jianyu Zhou，chasing the Hokage dream.",
        bio: [
          "I’m a student from the School of Basic Medicine, fascinated by the intersection of biology and computer science, the integration of medicine and engineering. To me, biology is a vast ocean, and diverse technical skills are my tools to discover its countless beautiful forms.",
          "I love art creation and performance. I enjoy bel canto, musical theatre, drama and pop chorus. I’m also a gamer. I regard games as a concentration of creativity; great games are genuine art. These hobbies shape my skills and unique innovative thinking.",
          "I’m a food lover with a sweet tooth. Sweets cheer me up, though they make me gain weight. I do not bother managing my figure, and someday I might become a big eater. I am also a night owl. Staying up late brings me joy, when I can dive deep into my exploration freely.",
        ],
        quote: "“ko no Dio da！！！”",
      },
      {
        id: "qihang-chen",
        name: "Qihang Chen",
        image: "qihang-chen",
        role: "Team Member",
        tagline: "Rico, 99.1% Pure Curiosity.",
        bio: [
          "Hey there! I'm Rico, a clinical medicine student and a member of the ER team. I enjoy communicating with people, exploring different perspectives, and finding ways to connect scientific ideas with real-world needs. But there's definitely more to my life than medicine and research!",
          "I'm a huge fan of novels, anime, video games, and TV series. I love getting lost in fascinating stories, exploring fictional worlds, and meeting characters who sometimes feel more real than actual people. I'm also passionate about sports, whether it's pushing my limits or simply enjoying the thrill of competition.",
          "I'm the kind of person who can spend hours diving into something that catches my interest, sometimes completely losing track of time. I enjoy trying new things, challenging myself, and meeting people with different ideas. To me, life is about staying curious, embracing the unexpected, and collecting interesting experiences along the way. 'S all good, man!",
        ],
        quote: "“He who has a why to live can bear almost any how.”",
      },
      {
        id: "jiatong-zhang",
        name: "Jiatong Zhang",
        image: "jiatong-zhang",
        role: "Team Member",
        tagline: "Claire, a homebody with a multiplayer mode.",
        bio: [
          "Hi, I’m Claire, a dental student at Jilin University and the Education member of our iGEM team. I like coming up with ideas, talking them through, and getting people together to try them out. Working with people who think differently from me is often the best part. I’m not nearly as serious as I look. Around friends, I’m chatty, quick with a joke, and usually thinking a few steps ahead when we’re making plans. They also know they can count on me when things don’t go as expected. I care about doing things well, but I don’t need every day to be productive. Sometimes staying home and doing very little is exactly the plan. I have my own way of doing things, but I’m happy to rethink it when there’s a better one. And when I’ve committed to something, I’ll see it through, even if I’d rather be having a lazy day.",
        ],
        quote:
          "“I don’t feel like running today. That’s exactly why I’ll run.”",
      },
      {
        id: "yiran-zheng",
        name: "Yiran Zheng",
        image: "yiran-zheng",
        role: "Team Member",
        tagline: "Ari, lost in the aux",
        bio: [
          "I’ve always believed that medicine, as well as other branches of science, is a pursuit of beauty and order—a way to uncover the hidden patterns of nature and appreciate the elegance behind seemingly complex systems. There’s something deeply satisfying about seeing scattered pieces of information fall into place and reveal a bigger picture.",
          "Outside of work, I have a strong appreciation for aesthetics. I enjoy putting together outfits where every color feels just right, because I believe beauty often lies in the details. I’m also an enthusiastic tennis player. For me, exercise is a great way to recharge, clear my mind, and regain balance after a busy day. And sometimes, a good drink with some music is all I need to slow down and enjoy the moment.",
          "Whether I’m exploring a scientific question, perfecting an outfit, or chasing a ball across the tennis court, I find joy in the pursuit of balance, beauty, and those little moments when everything just clicks.",
        ],
        quote: "“Eat Nachos, Then Plan”",
      },
      {
        id: "junhan-lu",
        name: "Junhan Lu",
        image: "junhan-lu",
        role: "Team Member",
        tagline: "Leo, an Avenger.",
        bio: [
          "My major is Clinical Medicine, and I am mainly responsible for entrepreneurship-related work in the HP group. Beyond academics and teamwork, I am someone who truly enjoys life and values freedom. I love nature, basketball, and everything that brings excitement and happiness. My favorite NBA player is Paul George, and I am also a big fan of Black Panther and the Chinese animated series *Scissor Seven*. I enjoy a relaxed and carefree lifestyle, and sometimes I even dream of lying on the clouds, watching the world go by without a worry. I love capturing little moments through photography and recording the small details that make everyday life special. To me, life is not just about achieving goals, but also about experiencing the world and appreciating its beauty. I am also passionate about racing, especially Ferrari. One of my biggest dreams is to own a Ferrari someday, and I am working hard to make that dream come true. I believe life should be a balance between chasing ambitious dreams and enjoying the freedom and happiness of the present moment.",
        ],
        quote: "“You are what you love.”",
      },
      {
        id: "rong-gao",
        name: "Rong Gao",
        image: "rong-gao",
        role: "Team Member",
        tagline: "Meliora, a cheerful soul with wanderlust",
        bio: [
          "Hi, I'm Meliora, a veterinary medicine student who loves making the most of every day! I'm good at balancing academics, research, hands-on practice, and student activities, always trying to make every moment count. In our team, I lead a subgroup responsible for new media operations, where I work on writing social media posts, designing posters and event materials, and editing competition videos. I enjoy bringing creative ideas to life!",
          "But beyond my busy academic life, there's an adventurous side of me. While I'm usually a dedicated student on weekdays, weekends are a different story! I love gathering my friends for night hikes, mountain adventures, or spontaneous trips to somewhere new. Traveling, exploring unfamiliar places, and discovering little surprises along the way always make me feel excited and alive.",
          "I believe my relationship with the world is a two-way embrace. Every experience teaches me something new, and I embrace it all with curiosity, enthusiasm, and an open heart. Life is full of possibilities, and I can't wait to discover more!",
        ],
        quote:
          "“Be bold, believe in yourself, and never let fear hold you back.”",
      },
    ],
    image: "human-practices",
  },
  {
    id: "visual-design",
    title: "Visual Design",
    kind: "group",
    members: [
      {
        id: "shuyi-wang",
        name: "Shuyi Wang",
        image: "shuyi-wang",
        role: "Art Lead",
        tagline: "Shuyi, a life gamer",
        bio: [
          "I am Shuyi, a medical student fascinated by the intersection of science and art. As a member of the Art & Design department in our iGEM team, I take charge of the whole set of visual creation for our project, including logo design, team graphic assets, wiki illustration and all kinds of promotional artwork.",
          "I view scientific research as an interesting game. It excites me to translate abstract, complicated biological concepts into intuitive, aesthetic visuals, and bridge the gap between obscure synthetic biology knowledge and audiences.",
          "Outside of design work, I enjoy observing subtle beauty from daily life. Drawing and brainstorming creative ideas never fail to make me lose track of time. I believe elegant visualization is a powerful tool for science popularization. My goal is to present our rigorous scientific story in a vivid, attractive way, letting more people feel the charm behind our project.",
        ],
        quote: "“I am not throwing away my shot!”",
      },
      {
        id: "yupeng-xu",
        name: "Yupeng Xu",
        image: "yupeng-xu",
        role: "Wiki Lead",
        tagline: "Martin, cyber commander",
        bio: [
          "Majoring in Computer Science, I lead the Wiki development and digital design for our iGEM team. Much of my day revolves around orchestrating multiple AI agents at once. I assign high-level reasoning to frontier models, routine tasks to lightweight scripts, and package efficient workflows into reusable skills for my teammates. I joined this synthetic biology project out of pure curiosity to explore human-agent collaboration and experience genuine teamwork.",
          "Beyond code and tokens, I am someone who genuinely yearns to lie flat and slow down. When screens turn off, I retreat into a quiet sanctuary filled with indie music, art-house cinema, and the intellectual spark of competitive debate. I am deeply fascinated by philosophical questions regarding where emerging technologies are leading humanity and how our individual agency survives.",
          "To me, technology is simply an amplifier to conquer tedious tasks. It frees our minds for what truly matters: honest introspection, independent thinking, and the quiet beauty of everyday life.",
        ],
        quote:
          "“While thick ice still sealed Beihai, I saw plum blossoms in riotous bloom.”",
      },
      {
        id: "jianyuan-li",
        name: "Jianyuan Li",
        image: "jianyuan-li",
        role: "Team Member",
        tagline: "Jason, powered by curiosity.",
        bio: [
          "Hey, I'm Jianyuan! I'm a physics undergraduate at Jilin University. My main role on the 2026 JLU-FBH iGEM team is designing and developing our Wiki homepage, bringing together its scientific content, visuals, animations, and interactive elements. I've spent plenty of time tweaking small details along the way, and it's taught me how much thought goes into making complicated ideas easy to understand.",
          "Outside of iGEM, I'm interested in computational physics, AI, and materials science. I spend a fair amount of time reading papers, writing code, and trying to make sense of things I'm still learning about. I tend to ask a lot of questions—that's usually how I learn.",
          'When I\'m away from my laptop, I enjoy exploring new places, meeting people from different backgrounds, and having conversations that take unexpected turns. And if you hear me say, "Wait, one more question," there\'s a good chance it won\'t be the last.',
        ],
        quote: "“Stay hungry. Stay foolish.”",
      },
      {
        id: "muzi-li",
        name: "Muzi Li",
        image: "muzi-li",
        role: "Team Member",
        tagline: "Pin, a plushie maker",
        bio: [
          "As a clinical medicine student, I spend my days learning to care for real human bodies, but in my free time, I love creating imaginary creatures. In the iGEM team, I work on the medical and human practices side, turning scientific knowledge into stories people actually want to hear. I love drawing and designing plush patterns—give me a pencil and an afternoon, and I'll lose track of time, studying a doll's structure as carefully as I would study anatomy. I like jotting down inspiration wherever I go, and I believe patience and attention to detail can solve most problems. I'm fascinated by the overlap between medicine, art, and synthetic biology—where proteins become patterns and diagnoses become narratives.",
        ],
        quote:
          "“I make plushies, draw organs, and occasionally question why I chose medicine.”",
      },
      {
        id: "zhixia-ye",
        name: "Zhixia Ye",
        image: "zhixia-ye",
        role: "Team Member",
        tagline: "Pobble, powered by naps",
        bio: [
          "Hi, I’m Ye Zhixia. I’m an easy-going introvert and a member of our team’s graphic group. I create illustrations for our project, including cover art and other visual drawings.",
          "Drawing is my biggest pastime. Even if I often feel my works are not good enough, I never stop creating. I feel most joyful when I can draw freely. In my spare time, I enjoy anime, video games and sleeping, and I love to take casual breaks to recharge.",
          "I am a big lover of small animals. I enjoy petting cats, and I have a duck at home that I find extremely adorable. Besides drawing and gaming, I also join volunteer activities. I don’t look for any rewards; I simply love the sense of fulfillment from doing meaningful things.",
        ],
        quote: "“Gugugaga.”",
      },
      {
        id: "jingchen-he",
        name: "Jingchen He",
        image: "jingchen-he",
        role: "Team Member",
        tagline: "Jingchen, untangling code.",
        bio: [
          "I study computer science and work on our team’s wiki, where I help turn scattered ideas, experiments, and revisions into a story people can actually explore. I enjoy the small decisions behind a good page: what to explain first, which detail matters, and how to make the whole thing feel clear without losing the people behind the work. Outside the screen, I love photography, especially documentary photography. I’m drawn to ordinary scenes that might otherwise disappear: a passing expression, a familiar street in unfamiliar light, or the quiet rhythm of someone at work. A camera reminds me to slow down and notice what is already there. Perhaps that is also why I like building a wiki. Both a photograph and a well-made page ask me to pay attention, choose carefully, and leave a trace of something worth remembering. I’m still learning how to do that well. For now, I’m happy to keep looking closely, asking questions, and finding new ways to connect technology with the world it is meant to serve.",
        ],
        quote: "“To notice the world is already a way of belonging to it.”",
      },
    ],
    image: "visual-design",
  },
  {
    id: "instructors",
    title: "Instructors",
    kind: "teachers",
    members: [
      {
        id: "bin-wang",
        name: "Bin Wang",
        image: "bin-wang",
        role: "Instructor",
      },
      {
        id: "kexin-gao",
        name: "Kexin Gao",
        image: "kexin-gao",
        role: "Instructor",
      },
      {
        id: "ruihong-wu",
        name: "Ruihong Wu",
        image: "ruihong-wu",
        role: "Instructor",
      },
      {
        id: "ruohan-yang",
        name: "Ruohan Yang",
        image: "ruohan-yang",
        role: "Instructor",
      },
    ],
  },
  {
    id: "advisors",
    title: "Advisors",
    kind: "advisors",
    members: [
      {
        id: "mingwan-liu",
        name: "Mingwan Liu",
        image: "mingwan-liu",
        role: "Advisor",
        tagline: "Ivy, quietly curious, occasionally chaotic",
        bio: [
          "Hi, I’m Ivy. I come from a visual communication and art education background, and I’m good at turning messy ideas into clear visuals, warm workshops, and learning experiences people enjoy. In our team, I take care of art and education—designing creative materials, shaping educational content, and helping art feel friendly, playful, and accessible. Outside work, I’m a slow traveler, museum wanderer, and collector of old postcards and train tickets. I lose track of time drawing tiny scenes from daily life. I believe that art and education are not about being perfect; they are about noticing, trying, and sharing. I’m quiet but curious, practical but a little dreamy. I believe small creative acts can change how we see ourselves and each other.",
        ],
        quote:
          "“We laughed, we kept saying 'see you soon', but inside, we both knew we'd never see each other again.”",
      },
      {
        id: "sirui-dong",
        name: "Sirui Dong",
        image: "sirui-dong",
        role: "Advisor",
        tagline: "Dennis, too curious to stay in one field.",
        bio: [
          "Hi! I am Sirui Dong, a third year iGEMer majoring in Clinical Medicine who is fascinated by things relevant to art, culture and synthetic biology. I am brave enough to try everything new, passionate about participating in various racket sports, appreciating landscape.",
        ],
        quote: "“Be rigorous in what you know, and fearless in what you ask.”",
      },
      {
        id: "xilei-song",
        name: "Xilei Song",
        image: "xilei-song",
        role: "Advisor",
        tagline: "Professionally curious, personally chaotic",
        bio: [
          "I’m a finance student who is curious about pretty much everything. At university, I’ve somehow ended up doing research, entrepreneurship projects, internships, volunteering in Italy, and even working backstage for musical theatre. I’m interested in business, technology, and people, although I’m still figuring out how all my interests are supposed to fit into one career.",
          "My favorite TV series is Hacks, mostly because I love its dry humor and brutally honest characters. One of my favorite lines is , ““The best part of being young is that you don't have to savor everything. You don't even have to consider it, you know. Eat that candy bar. Sleep in on Saturday morning. Or have a break up. It's not the end of the world. It's just the beginning. That's the ultimate luxury...not having to suck the marrow out of every day.” I can be spontaneous, slightly chaotic, and occasionally overthink everything, but I’m always curious about what might happen next.",
        ],
        quote: "“Everyone, go watch Hacks.”",
      },
      {
        id: "yurui-wei",
        name: "Yurui Wei",
        image: "yurui-wei",
        role: "Advisor",
        tagline: "Sally, manifesting",
        bio: [
          "Fifth-year medicine student rebuilding the entire self-system. For a summer that summers like summer has never summered before. Every choice I make leads to the next choice which leads to the next. It’s hard to know which path to take .There will be times in life where I need to stand up for myself. Times when the right thing is actually to back down and apologize. Times when the right thing is to fight. Times when the right thing is to aturn and run. Times to hold on with all I have and times to let go with grace. Piano piano. It's not hard, it's just new, it takes time to grow mature enough. Wanting more time to make my work perfect, wanting a pet, whippets, greyhounds, golden retrievers, German shepherds, Border Collies, Abyssinian cat, Maine Coon…My future travel destinations would hopefully be Egypt, Greece, Spain, Swenden, Norway, and Malaysia.",
        ],
        quote: "“I don't chase, I attract.\"",
      },
    ],
  },
];

export const rosterEpigraph = "“Mastery in Medicine, Purity in Heart.”";

export const rosterPage: WikiPageContent = {
  route: "/roster",
  category: "team",
  chapter: "Team / 01 of 03",
  eyebrow: "Team · 2.1 Roster",
  title: "Meet Our Team",
  lede: "",
  boundary: "",
  visual: "evidence-ledger",
  visualLabel: "",
  visualSteps: [],
  facts: [],
  sections: [
    {
      id: "meet-our-team",
      index: "01",
      kicker: "",
      title: "Meet Our Team",
      hideSectionNumber: true,
      hideHeading: true,
      summary: "",
      blocks: [{ type: "feature", key: "roster" }],
    },
  ],
  links: [
    { path: "/attributions", label: "Project Attributions" },
    { path: "/activities", label: "Team Activities" },
    { path: "/description", label: "Project Description" },
    { path: "/contribution", label: "Team Contributions" },
  ],
  next: {
    path: "/attributions",
    label: "Attributions",
    title: "From Shared Vision to Formal Accountability",
    description: "Meet the individuals behind CirCure, then inspect the verified, auditable record of roles, institutional support, and resource attribution.",
  },
};
