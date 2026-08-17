/* =====================================================================
 * 第7组 · 蜗牛树屋 —— 交互逻辑（升级版：用抠图蜗牛替换原 SVG）
 * ---------------------------------------------------------------------
 * 真实内容集中在 DATA 里；蜗牛视觉改用 snails-cutout/ 下的抠图 PNG
 * （snail-XX.webp 对应名单序号，缺失则用神秘的紫色星空蜗牛）。
 * 原来蜗牛的交互逻辑（走路、说话、缩壳、长按拖拽、点击介绍卡）全部保留。
 * ===================================================================== */

// 神秘蜗牛（不在场的同学）作为默认兜底
const MYSTERIOUS_KEY = "不在的同学（神秘状态）";

/** 根据成员信息返回蜗牛抠图 URL：先按序号找，没有就用神秘蜗牛 */
function snailImgFor(m) {
  const no = m && m.no ? String(m.no).padStart(2, "0") : "";
  const map = window.SNAIL_MAP || {};
  if (no && map[no]) return map[no];
  return map[MYSTERIOUS_KEY] || "snails-cutout/mysterious.webp";
}

const PALETTE = ["#f3d98b","#f2a6a6","#a9c4e8","#9bbf7a","#e0b3d6","#f3c08a","#b6d6c2","#cdbbe0","#d98b8b"];
function buildMembers(arr) {
  return arr.map((it, i) => ({
    name: it[0],
    nickname: it[1] || "",
    keywords: it[2],
    bio: it[3],
    isLeader: !!it[4],
    no: it[5] || "",
    snail: PALETTE[i % PALETTE.length],
    pattern: i % 6,
  }));
}

const DATA = {
  /* —— 团体（大树根）介绍 —— */
  group: {
    name: "蜗牛探索队",
    slogan: "触手向外，探索未知；齿舌向内，啃透任务",
    intro:
      "我们是一支看起来并不张扬的队伍——像一群背着不同壳纹的蜗牛，慢热，内敛，习惯先观察再伸触角。" +
      "但壳从来不是退缩的屏障，而是守护柔软的铠甲；壳下藏着细密的齿舌，不声张，却能一点点啃下坚硬的任务。" +
      "我们相信探索从好奇心开始，也相信抵达靠的是日复一日的韧性。" +
      "我们乐于学习新事物，习惯思想碰撞，持续探索未知。",
    teams: ["创意组", "高效组", "美化组", "汇报组"],
  },

  /* —— 四个子团队 —— */
  teams: [
    {
      id: 0,
      name: "创意组",
      color: "#f3d98b",
      badge: "🟡 创意组",
      duty: "负责创意构思与内容生产，把灵感变成看得见、摸得着的作品",
      supervisor: "黄美琳（葫芦）",
      intro: "点子最多的一间屋：从文案、手作到 AI 实践，把新鲜想法一点点做出来。",
      members: buildMembers([
        ["黄美琳","葫芦","优质睡眠追求者 · 书展志愿者 · 房猫狗书梦想家","勤奋自律，爱思考。学习与适应能力强，有书展志愿者经历，目标感清晰。",true,"15"],
        ["梁越","要要","Citywalk超模 · 论文实习双线人 · AI之力追寻者","热情随性，精力充沛。多线并行能力强（实习、论文、AI），行动力与适应力俱佳。",false,"28"],
        ["赵梓彤","苹果树","转专业成功者 · 钩织手作人 · 棒垒球选手","勇于尝试，行动力强。手作能力好（钩织），运动细胞佳（棒垒球），刚成功转专业。",false,"26"],
        ["王雨婷","十五","AI模拟器开发者 · 打瓦沉默玩家 · 幼鸟救助者","探索者型，专注力强。AI实践能力好，已与AI合作开发文字模拟器，有救助幼鸟的爱心。",false,"27"],
        ["虞思阳","","随性生活家 · 探案剧迷 · 志愿演讲者","随性开朗，爱好广泛，表达能力强，曾做科普演讲志愿者，尤爱英美探案剧。",false,"03"],
        ["沈瑶佳","Chloe","内容营销学习者 · 旅行影视控 · 看世界梦想家","温暖乐观，抗压能力强。擅长内容营销与英语，热爱旅游与影视，视野开阔。",false,"08"],
        ["董馨阳","大小眼","反内耗达人 · 公园漫步者 · 星座MBTI研究员","松弛随性，心态好。观察力与共情力强，热衷摄影和星座MBTI研究，是组里的反内耗担当。",false,"12"],
        ["唐梓博","小z","Spark Fit.主动换轨者.边界清晰的协作者","清醒理性，敢于负责。擅长明确协作边界，乐于接受直接反馈并快速迭代改进。",false,"24"],
      ]),
    },
    {
      id: 1,
      name: "高效组",
      color: "#f2a6a6",
      badge: "🔴 高效组",
      duty: "负责高效执行与多线推进，把任务拆解清楚、稳稳落地",
      supervisor: "任泓瑜（松饼）",
      intro: "最能扛事的一间屋：多线并行、快速迭代，把每件任务推进到位。",
      members: buildMembers([
        ["任泓瑜","松饼","朋友维权守护者 · 烹饪缝纫手作人 · 逆转裁判玩家","细致耐心，正义感强（曾帮朋友维权）。动手能力出众，烹饪缝纫样样精通，多任务并行。",true,"25"],
        ["郑露萌","非洲人本尊","OC创作狂人 · 小组长 · Steam筑梦师","热情有担当，创作力强。绘画与OC创作功底扎实，兼修AE特效，梦想把OC做成文游上架Steam。",false,"06"],
        ["徐思懿","鱼昏昏","同人创作者 · 音律联觉无料发放者 · 集成战略狂热者","好奇心强，情绪稳定。创作能力好（同人写文），执行力佳，四线推进仍井井有条。",false,"20"],
        ["袁令仪","人生如梦","论文冲刺人 · 流浪猫救助者 · 小说美食猫三件套","踏实高效，有爱心。文字功底好，写作效率高，正推进论文初稿，收养流浪猫。",false,"14"],
        ["蒋俊艺","大事化小蛋糕","南京City Walker · 火锅品鉴师 · 全能发展选手","多元开放，敢于尝试。多线学习能力强（代码、健身、化妆），英语沟通好，曾在南洋理工与外国友人畅聊。",false,"10"],
        ["肖舒心","小嘁","访谈系列策划人 · R&B听众 · 萌物爱好者","外向开朗，沟通协调能力强。擅长内容统筹与文案策划，负责访谈推文系列，自学视频剪辑。",false,"13"],
        ["宋昱莹","肆月","大厂实习冲刺者 · 好词好句朗读者 · 自媒体运营人","成长型思维，有野心更有行动力。自媒体运营与内容积累能力强，面试表现获好评。",false,"23"],
        ["魏昕洁","松节","八字六爻学习者 · 图书馆泡馆人 · 散步听歌发现者","安静细腻，思考深入。文字与审美能力强（随笔写作、音乐品味独到），是持续学习者。",false,"29"],
        ["陈璟仪","","神秘人 · 待补 · 没有留下痕迹","很神秘，没有留下什么痕迹——像一只只在夜里悄悄爬过的蜗牛，第二天只剩一道湿润的反光。",false,"32"],
      ]),
    },
    {
      id: 2,
      name: "美化组",
      color: "#a9c4e8",
      badge: "🔵 美化组",
      duty: "负责视觉美化与体验打磨，让作品既好用又好看",
      supervisor: "宋婷（宁桉）",
      intro: "最会打扮的一间屋：设计、绘画、手作齐上阵，把细节做到舒服好看。",
      members: buildMembers([
        ["宋婷","宁桉","访谈统筹手 · 认真执行者 · 个人网站筑梦人","含蓄内敛，做事认真踏实。擅长访谈梳理与文字工作，动手能力强，爱好跑步与手工。",true,"01"],
        ["薛一洋","烊Y.","论文焦虑人 · 大侦探综艺迷 · 全英职场探索者","务实理性，逻辑清晰。写作与分析能力好，正写论文并学英语，目标进入外企。",false,"22"],
        ["秦巧玉","小玉","手账创作人 · 台女音乐听众 · 沪潮攒钱人","沉稳细致，动手能力强。手账创作达人，已过计算机二级，正实习并学习AI。",false,"19"],
        ["毕茹","卷卷","计算机二级冲刺者 · 密逃综艺迷 · 北京五日游旅行者","乐观开朗，抗压能力强。爱好美食、小说与综艺，正冲刺计算机二级，懂得自我调节。",false,"21"],
        ["罗露","六杖","百人素拓策划人 · 漫画小说双修者 · AI高效运用追求者","组织协调能力强，曾策划百人素拓活动。抗压能力好，脚踏实地，爱好爬山阅读。",false,"30"],
        ["苏畅","薯条","实习996战士 · 运动全能选手 · AI探索新人","自律坚韧，学习节奏快。运动全能（健身、游泳、攀岩），执行力强，刚完成导师横向项目。",false,"02"],
        ["周书妍","Gali","独立设计师 · 主机游戏玩家 · 自由职业追梦人","独立自驱，亲和力强。设计专业能力扎实，审美在线，游戏与创作双修。",false,"11"],
        ["张阳","Earsh","音乐节主KV画师 · Live House常客 · 朝九晚五理想主义者","敏感好奇，有艺术气质。绘画功底强，曾为音乐节画主KV，审美与创作力兼备。",false,"17"],
        ["张煜珩","小泽","明日方舟玩家 · 美食品鉴官 · 计算机二级冲刺者","内向温和，幽默感足。美食与游戏达人，学习多线推进，正备考计算机二级。",false,"04"],
      ]),
    },
    {
      id: 3,
      name: "汇报组",
      color: "#9bbf7a",
      badge: "🟢 汇报组",
      duty: "负责统筹汇报与对外表达，把成果讲清楚、讲动人",
      supervisor: "王思羽（小鱼）",
      intro: "最会把话说清楚的一间屋：统筹节奏、打磨汇报，让全组成果被看见。",
      members: buildMembers([
        ["王思羽","小鱼","边看剧边干活的效率大师 · 明日方舟每日玩家 · 养老院调研员","务实高效，多任务能力一流。有支教经历，正备考教资并筹备养老院调研，行动力强。",true,"18"],
        ["邓茹文","大肉丸","竞赛三线战士 · 悬疑推理书迷 · 技术探索者","自律专注，逻辑思维强。技术探索型选手，竞赛多线推进（建模、软考、软件杯），爱好游泳与台球。",false,"16"],
        ["马海侨","肖特MAggie","ACCA备考人 · 青旅社交家 · 家产IP平台构想者","外向健谈，社交能力强。抗压与多线执行能力好，同时推进实习、练琴与ACCA备考。",false,"07"],
        ["危星炫","西西","人文AI探索者 · 线上中文老师 · 古籍数字化实践者","善于思考，执行力强。擅长写作表达、信息整理与内容策划，有古籍数字化和线上教学经验。",false,"05"],
      ]),
    },
  ],
};

/* ====== 小工具 ====== */
function rand(a, b) { return a + Math.random() * (b - a); }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function shade(hex, amt) {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  let r = parseInt(c.substr(0, 2), 16), g = parseInt(c.substr(2, 2), 16), b = parseInt(c.substr(4, 2), 16);
  r = clamp(r + amt, 0, 255); g = clamp(g + amt, 0, 255); b = clamp(b + amt, 0, 255);
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

/* ====== 视图路由 ====== */
const views = {
  cover: document.getElementById("view-cover"),
  nav: document.getElementById("view-nav"),
  group: document.getElementById("view-group"),
  team: document.getElementById("view-team"),
  room: document.getElementById("view-room"),
};
let currentTeam = null;

function showView(name) {
  if (name !== "room") stopRoomLoop();
  Object.values(views).forEach((v) => v.classList.remove("active"));
  views[name].classList.add("active");
  window.scrollTo(0, 0);
  if (name === "nav" && entered) {
    targetCam = cam = clampCam(viewH() - treeH());
    applyCam();
  }
}

/* 导航热区点击 */
document.querySelectorAll(".hotspot").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.view;
    if (target === "group") {
      renderGroup();
      showView("group");
    } else if (target === "team") {
      const idx = Number(btn.dataset.team);
      playDoorTransition(idx);
    }
  });
});

/* —— 果实热区 —— */
const FRUIT_DATA = {
  same: {
    title: "🍎 相同点",
    items: [
      "对新事物保持敏锐，愿意尝试",
      "对任务拥有细密的执行力，不急躁，不放弃，把每一步啃透",
      "内心丰盈，思考有锋芒",
    ],
  },
  diff: {
    title: "🍏 差异点",
    items: [
      "性格上 IE 交融，彼此激活",
      "节奏上快慢并存",
      "应对问题的方式多元，理性与感性交替",
      "兴趣与专业多元，各有所长",
      "协作中主动与观察互充",
    ],
  },
};

const FRUIT_POSITIONS = [
  {dx:"-148px",dy:"-88px",rot:"-6deg"},{dx:"148px",dy:"-82px",rot:"5deg"},
  {dx:"-150px",dy:"72px",rot:"4deg"},{dx:"150px",dy:"78px",rot:"-5deg"},
  {dx:"0px",dy:"-142px",rot:"2deg"},
];
const FRUIT_MOBILE_POSITIONS = {
  same:[{dx:"82px",dy:"-104px"},{dx:"118px",dy:"-38px"},{dx:"116px",dy:"31px"},{dx:"76px",dy:"96px"},{dx:"8px",dy:"-142px"}],
  diff:[{dx:"-82px",dy:"-104px"},{dx:"-118px",dy:"-38px"},{dx:"-116px",dy:"31px"},{dx:"-76px",dy:"96px"},{dx:"-8px",dy:"-142px"}],
};
document.querySelectorAll(".fruit-item").forEach((el) => {
  const d=FRUIT_DATA[el.dataset.action];
  const thoughts=document.createElement("div");
  thoughts.className="fruit-thoughts";
  thoughts.innerHTML=`<span class="fruit-halo"></span>`+d.items.map((item,i)=>{
    const p=FRUIT_POSITIONS[i],mp=FRUIT_MOBILE_POSITIONS[el.dataset.action][i];
    return `<span class="fruit-note" style="--dx:${p.dx};--dy:${p.dy};--mdx:${mp.dx};--mdy:${mp.dy};--rot:${p.rot};--delay:${i*.055}s;--float-delay:${-i*1.1}s"><span>${item}</span></span>`;
  }).join("")+`<span class="fruit-collapse-hint">再次点击，思绪会回到果实里</span>`;
  el.prepend(thoughts);
  el.setAttribute("role","button"); el.setAttribute("tabindex","0"); el.setAttribute("aria-expanded","false");
  const toggleFruit=()=>{
    const willOpen=!el.classList.contains("expanded");
    document.querySelectorAll(".fruit-item.expanded").forEach(other=>{
      if(other!==el){other.classList.remove("expanded");other.setAttribute("aria-expanded","false");}
    });
    el.classList.toggle("expanded",willOpen); el.setAttribute("aria-expanded",String(willOpen));
  };
  el.addEventListener("click",toggleFruit);
  el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggleFruit();}});
});

/* 返回按钮 */
document.querySelectorAll("[data-back]").forEach((btn) => {
  btn.addEventListener("click", () => showView(btn.dataset.back));
});

/* ====== 渲染：团体介绍 ====== */
function renderGroup() {
  const g = DATA.group;
  document.getElementById("group-name").textContent = g.name;
  document.getElementById("group-slogan").textContent = g.slogan;
  document.getElementById("group-intro").textContent = g.intro;
  document.getElementById("group-teams").innerHTML = g.teams
    .map((t, i) => `<span class="chip" data-team="${i}" role="button" tabindex="0">🏠 ${t}</span>`)
    .join("");
  document.querySelectorAll("#group-teams .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const idx = Number(chip.dataset.team);
      playDoorTransition(idx);
    });
  });
}

/* ====== 渲染：子团队介绍 ====== */
function renderTeam(idx) {
  currentTeam = DATA.teams[idx];
  const t = currentTeam;
  document.getElementById("team-badge").textContent = t.badge;
  document.getElementById("team-name").textContent = t.name;
  document.getElementById("team-intro").textContent = t.intro;
  document.getElementById("team-members-preview").innerHTML = t.members
    .map((m) => `<span>🐌 ${m.name}</span>`)
    .join("");
  document.getElementById("enter-room").onclick = () => {
    playDoorTransition(idx);
  };
}

/* ====== 成员信息：融入房间的侧边故事签，不再使用遮罩弹窗 ====== */
const memberPanel = document.getElementById("member-panel");
const memberPanelContent = document.getElementById("member-panel-content");
let selectedSnail = null;

function memberCardHTML(m) {
  const leader = m.isLeader ? `<span class="leader-badge">组长</span>` : "";
  const noTag = m.no ? `<span class="no-tag">#${m.no}</span>` : "";
  const nick = m.nickname ? `<div class="member-nick">「${m.nickname}」</div>` : "";
  return `
    <div class="member-avatar"><img src="${snailImgFor(m)}" alt="${m.name}" /></div>
    <div class="member-name">${m.name} ${leader} ${noTag}</div>
    ${nick}
    <div class="member-role">${currentTeam ? currentTeam.name : ""}</div>
    <div class="member-keywords"><span class="row-label">角色关键词</span><b>${m.keywords}</b></div>
    <div class="member-bio"><span class="bio-label">个人简介</span><p>${m.bio}</p></div>`;
}
function openMemberPanel(m, snailEl = null) {
  if (selectedSnail === snailEl && memberPanel.classList.contains("show")) {
    closeMemberPanel();
    return;
  }
  if (selectedSnail) selectedSnail.classList.remove("selected");
  selectedSnail = snailEl;
  if (selectedSnail) selectedSnail.classList.add("selected");
  memberPanelContent.innerHTML = memberCardHTML(m);
  memberPanel.classList.add("show");
  memberPanel.setAttribute("aria-hidden", "false");
}
function closeMemberPanel() {
  memberPanel.classList.remove("show");
  memberPanel.setAttribute("aria-hidden", "true");
  if (selectedSnail) selectedSnail.classList.remove("selected");
  selectedSnail = null;
}
document.getElementById("member-panel-close").addEventListener("click", closeMemberPanel);

/* =====================================================================
 * 过场动画（保留）
 * ===================================================================== */
const doorTransition = document.getElementById("door-transition");
const dtHouse = document.getElementById("dt-house");

function playDoorTransition(idx, focusMember = null) {
  currentTeam = DATA.teams[idx];
  const t = currentTeam;

  document.getElementById("dt-team-name").textContent = t.name;
  document.getElementById("dt-team-duty").textContent = "沿着门缝里的光，走进这一间树屋";
  document.getElementById("dt-team-super").textContent = "";
  document.getElementById("dt-team-members").innerHTML = "";

  dtHouse.style.setProperty("--house", t.color);
  dtHouse.style.setProperty("--house-dark", shade(t.color, -32));

  stopRoomLoop();
  doorTransition.style.display = "flex";
  void doorTransition.offsetWidth;
  doorTransition.classList.add("playing");

  setTimeout(() => {
    doorTransition.classList.add("hide");
    setTimeout(() => {
      doorTransition.classList.remove("playing", "hide");
      doorTransition.style.display = "none";
      buildRoom(t);
      showView("room");
      if (focusMember) {
        const target = gameSnails.find((s) => s.m.name === focusMember.name);
        if (target) openMemberPanel(target.m, target.el);
      }
    }, 620);
  }, 2700);
}

/* =====================================================================
 * 房间：自由游走蜗牛（用抠图）
 * ===================================================================== */
function flower(x, y, color) {
  return `<g transform="translate(${x},${y})">
    <line x1="0" y1="0" x2="0" y2="14" stroke="#7fae57" stroke-width="3"/>
    <circle cx="0" cy="-2" r="5" fill="${color}"/>
    <circle cx="-5" cy="2" r="5" fill="${color}"/>
    <circle cx="5" cy="2" r="5" fill="${color}"/>
    <circle cx="0" cy="6" r="5" fill="${color}"/>
    <circle cx="0" cy="2" r="3" fill="#fff3c4"/>
  </g>`;
}

function sceneSVG(c) {
  const dark = shade(c, -34);
  return `
  <svg class="scene-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
   <defs>
     <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
       <stop offset="0" stop-color="#bfe3f2"/>
       <stop offset="0.5" stop-color="#fde9bd"/>
       <stop offset="1" stop-color="#eccfa0"/>
     </linearGradient>
     <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
       <stop offset="0" stop-color="#a9cf7e"/><stop offset="1" stop-color="#7fae57"/>
     </linearGradient>
     <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
       <stop offset="0" stop-color="#caa06a"/><stop offset="1" stop-color="#9c7644"/>
     </linearGradient>
   </defs>
   <rect width="1000" height="600" fill="url(#sky)"/>
   <circle cx="820" cy="110" r="58" fill="#fff6cf" opacity="0.85"/>
   <g fill="#ffffff" opacity="0.9">
     <ellipse cx="180" cy="110" rx="60" ry="26"/><ellipse cx="240" cy="122" rx="44" ry="22"/>
     <ellipse cx="620" cy="80" rx="54" ry="24"/><ellipse cx="680" cy="94" rx="40" ry="18"/>
   </g>
   <path d="M0 430 Q200 350 420 420 T1000 400 V600 H0 Z" fill="#cfe2a8" opacity="0.8"/>
   <path d="M0 470 Q260 400 520 460 T1000 450 V600 H0 Z" fill="#aecb7e"/>
   <g transform="translate(120,300)">
     <rect x="-10" y="120" width="20" height="70" fill="#9c7644"/>
     <circle cx="0" cy="110" r="60" fill="#8fb866"/>
     <circle cx="-40" cy="130" r="40" fill="#9cc474"/>
     <circle cx="40" cy="130" r="40" fill="#9cc474"/>
   </g>
   <rect x="0" y="500" width="1000" height="100" fill="#8a5a32"/>
   <rect x="0" y="486" width="1000" height="22" fill="url(#grass)"/>
   <g>
     <rect x="140" y="380" width="180" height="22" rx="6" fill="url(#wood)"/>
     <rect x="140" y="372" width="180" height="12" rx="6" fill="#9cc474"/>
     <rect x="640" y="330" width="200" height="22" rx="6" fill="url(#wood)"/>
     <rect x="640" y="322" width="200" height="12" rx="6" fill="#9cc474"/>
     <rect x="400" y="250" width="170" height="20" rx="6" fill="url(#wood)"/>
     <rect x="400" y="243" width="170" height="11" rx="6" fill="#9cc474"/>
   </g>
   <g>
     ${flower(300, 492, c)}${flower(520, 496, c)}${flower(760, 490, c)}${flower(900, 494, dark)}
   </g>
   <g transform="translate(220,470)">
     <rect x="0" y="10" width="14" height="20" fill="#f3e7cf"/>
     <path d="M-8 12 Q7 -6 22 12 Z" fill="#d98b8b"/>
   </g>
   <g stroke="#caa06a" stroke-width="6" stroke-linecap="round">
     <line x1="60" y1="470" x2="60" y2="512"/><line x1="90" y1="470" x2="90" y2="512"/>
     <line x1="45" y1="484" x2="105" y2="484"/>
   </g>
   <g stroke="#7fae57" stroke-width="4" stroke-linecap="round">
     <path d="M340 500 q4 -16 8 0"/><path d="M350 500 q4 -16 8 0"/>
     <path d="M820 500 q4 -16 8 0"/>
   </g>
  </svg>`;
}

let gameSnails = [];
let roomActive = false;
let roomRAF = null;
let lastT = 0;
const THOUGHTS = ["去那边看看~", "前面好像有好吃的", "换个方向试试", "今天天气真不错", "慢慢爬也不错", "壳里装了好多想法"];
const CHATS = ["今天也慢慢爬呀~", "壳壳有点重...", "嘘——在思考", "好想晒太阳 ☀", "踩到小草啦", "我们要去哪呀"];

const ROOM_BG = {
  "创意组": "user-assets/创意.webp",
  "高效组": "user-assets/高效.webp",
  "美化组": "user-assets/美化.webp",
  "汇报组": "user-assets/汇报.webp"
};

function buildRoom(t) {
  const stage = document.getElementById("room-stage");
  closeMemberPanel();
  stage.innerHTML = "";
  stage.style.backgroundImage = `url("${ROOM_BG[t.name] || 'assets/room-bg.webp'}")`;
  stage.style.backgroundSize = "cover";
  stage.style.backgroundPosition = "center";
  stage.style.backgroundRepeat = "no-repeat";

  document.getElementById("room-title").textContent = `${t.name} · 组长 ${t.supervisor}`;

  for (let i = 0; i < 3; i++) {
    const b = document.createElement("div");
    b.className = "bf";
    b.style.left = (10 + i * 30) + "%";
    b.style.top = (14 + i * 9) + "%";
    b.style.animationDelay = (i * 1.3) + "s";
    stage.appendChild(b);
  }

  gameSnails = [];
  const columns = Math.ceil(t.members.length / 2);
  t.members.forEach((m, index) => {
    const el = document.createElement("div");
    el.className = "snail-game" + (m.isLeader ? " is-leader" : "");

    // ====== 关键变化：用抠图替换原 SVG ======
    const body = document.createElement("div");
    body.className = "snail-body";
    body.innerHTML = `<img src="${snailImgFor(m)}" alt="${m.name}" draggable="false" />`;
    el.appendChild(body);

    const lane = index % 2;
    const column = Math.floor(index / 2);
    const segmentWidth = 88 / columns;
    const minX = 6 + column * segmentWidth;
    const maxX = Math.min(94, minX + segmentWidth * 0.78);
    const floorY = lane === 0 ? 78 : 88;
    const s = {
      el, body, m,
      x: (minX + maxX) / 2, y: floorY,
      tx: 0, ty: 0,
      minX, maxX, floorY,
      speed: rand(1.8, 3.1),
      facing: 1,
      idle: rand(0.2, 1.5),
      walking: false,
      grabbing: false,
      bubbleTimer: null,
    };
    pickTarget(s);
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", `认识 ${m.name}`);
    el.style.setProperty("--snail-scale", lane === 0 ? ".82" : "1");
    el.addEventListener("click", () => openMemberPanel(m, el));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openMemberPanel(m, el);
      }
    });
    stage.appendChild(el);
    applySnail(s);
    gameSnails.push(s);
  });

  roomActive = true;
  lastT = performance.now();
  requestAnimationFrame(roomLoop);
}

function pickTarget(s) {
  s.tx = rand(s.minX, s.maxX);
  s.ty = s.floorY;
}

function applySnail(s) {
  s.el.style.left = s.x + "%";
  s.el.style.top = s.y + "%";
  // 方向：scaleX 反转 img，朝向不一样
  const img = s.body.querySelector("img");
  if (img) img.style.transform = `scaleX(${s.facing})`;
  s.body.classList.toggle("walk", s.walking);
}

function updateSnail(s, dt) {
  if (s.grabbing) return;
  if (s.idle > 0) {
    s.idle -= dt;
    s.walking = false;
    if (s.idle <= 0) pickTarget(s);
    return;
  }
  s.walking = true;
  const dx = s.tx - s.x;
  const d = Math.abs(dx);
  if (d < 0.6) {
    s.x = s.tx; s.y = s.ty;
    s.idle = rand(0.6, 2.2);
    s.walking = false;
    return;
  }
  const step = s.speed * dt;
  s.x += Math.sign(dx) * Math.min(step, d);
  s.y = s.floorY;
  s.facing = dx < 0 ? -1 : 1;
}

function roomLoop(now) {
  if (!roomActive) return;
  const dt = Math.min(0.05, (now - lastT) / 1000);
  lastT = now;
  gameSnails.forEach((s) => { updateSnail(s, dt); applySnail(s); });
  roomRAF = requestAnimationFrame(roomLoop);
}

function stopRoomLoop() {
  roomActive = false;
  if (roomRAF) cancelAnimationFrame(roomRAF);
  gameSnails.forEach((s) => { if (s.bubbleTimer) clearTimeout(s.bubbleTimer); });
  gameSnails = [];
}

/* ---- 气泡 ---- */
function scheduleBubble(s) {
  const wait = 3000 + Math.random() * 5000;
  s.bubbleTimer = setTimeout(() => {
    if (roomActive && !s.grabbing && document.body.contains(s.el)) {
      showBubble(s, s.walking);
    }
    scheduleBubble(s);
  }, wait);
}
function showBubble(s, walking) {
  const b = document.createElement("div");
  b.className = "bubble";
  const txt = walking
    ? THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)]
    : CHATS[Math.floor(Math.random() * CHATS.length)];
  b.innerHTML = `<span class="ic">${walking ? "💭" : "🐌"}</span><span>${txt}</span>`;
  s.el.appendChild(b);
  setTimeout(() => b.remove(), 2500);
}

/* ---- 点击缩壳 / 长按拖拽 ---- */
let dragSnail = null, dragStartX = 0, dragStartY = 0, dragMoved = false, dragTimer = null;

function onSnailDown(s, e) {
  if (!roomActive) return;
  dragSnail = s;
  dragStartX = e.clientX; dragStartY = e.clientY;
  dragMoved = false;
  dragTimer = setTimeout(() => startGrab(s), 420);
  e.preventDefault();
}
function startGrab(s) {
  if (!dragSnail || s !== dragSnail) return;
  s.grabbing = true;
  s.el.classList.add("grabbing");
  s.idle = 999;
}
function stopGrab(s) {
  s.grabbing = false;
  s.el.classList.remove("grabbing");
  s.idle = 0.2;
}
function moveToPointer(s, e) {
  const stage = document.getElementById("room-stage");
  const r = stage.getBoundingClientRect();
  s.x = clamp(((e.clientX - r.left) / r.width) * 100, 3, 96);
  s.y = clamp(((e.clientY - r.top) / r.height) * 100, 38, 90);
  applySnail(s);
}
window.addEventListener("pointermove", (e) => {
  if (!dragSnail) return;
  const dx = e.clientX - dragStartX, dy = e.clientY - dragStartY;
  if (Math.hypot(dx, dy) > 8) {
    dragMoved = true;
    if (!dragSnail.grabbing) startGrab(dragSnail);
  }
  if (dragSnail.grabbing) moveToPointer(dragSnail, e);
});
window.addEventListener("pointerup", () => {
  if (!dragSnail) return;
  clearTimeout(dragTimer);
  const s = dragSnail;
  if (s.grabbing) {
    stopGrab(s);
  } else if (!dragMoved) {
    openMemberPanel(s.m, s.el);
  }
  dragSnail = null;
});

/* =====================================================================
 * 封面 → 大树导航 → 镜头推进（保留原逻辑）
 * ===================================================================== */
const viewNav = views.nav;
const navStage = document.getElementById("nav-stage");
const treeWrap = document.getElementById("tree-wrap");
const navTree = document.getElementById("nav-tree");
const panoramaHint = document.getElementById("panorama-hint");

let entered = false;
let zoomed = false;
let navIntroActive = false;
let navIntroTimers = [];

function treeH() { return navTree.offsetHeight; }
function viewH() { return viewNav.clientHeight; }

let cam = 0;
let targetCam = 0;
let touchY = 0;

function clampCam(c) {
  const lo = Math.min(0, viewH() - treeH());
  const hi = Math.max(0, viewH() - treeH());
  return Math.max(lo, Math.min(hi, c));
}
function applyCam() {
  treeWrap.style.transition = "none";
  treeWrap.style.transform = `translate(0px, ${cam}px) scale(1)`;
}

function setGlobalLens() {
  const H = treeH(), V = viewH(), W = treeWrap.offsetWidth;
  if (!H) return;
  const scale = Math.min(V / H, W / H, 1);
  const cx = (W - W * scale) / 2;
  const ty = (V - H * scale) / 2;
  treeWrap.style.transition = "none";
  treeWrap.style.transform = `translate(${cx}px, ${ty}px) scale(${scale})`;
}

function setRootLens() {
  const H = treeH(), V = viewH();
  treeWrap.style.transition = "transform 1.8s cubic-bezier(.4,0,.2,1)";
  treeWrap.style.transform = `translate(0px, ${V - H}px) scale(1)`;
}

function tick() {
  cam += (targetCam - cam) * 0.18;
  if (Math.abs(targetCam - cam) < 0.3) cam = targetCam;
  treeWrap.style.transition = "none";
  treeWrap.style.transform = `translate(0px, ${cam}px) scale(1)`;
  if (entered) requestAnimationFrame(tick);
}

function enterNav() {
  navIntroActive = false;
  navIntroTimers.forEach(clearTimeout);
  navIntroTimers = [];
  entered = true;
  zoomed = true;
  viewNav.classList.add("entered", "zoomed");
  cam = targetCam = clampCam(viewH() - treeH());
  applyCam();
  requestAnimationFrame(tick);
}

function runNavIntro() {
  navIntroActive = true;
  zoomed = false;
  viewNav.classList.remove("entered", "zoomed");
  panoramaHint.classList.add("hidden");

  const waitTree = () => {
    const H = treeH(), V = viewH();
    if (!H) { requestAnimationFrame(waitTree); return; }

    treeWrap.style.transition = "none";
    treeWrap.style.transform = `translate(0px, ${V - H}px) scale(1)`;

    const rootY=V-H;
    const previewY=rootY*.48;
    navIntroTimers=[
      setTimeout(()=>{treeWrap.style.transition="transform 6.2s cubic-bezier(.45,0,.25,1)";treeWrap.style.transform=`translate(0px, ${previewY}px) scale(1)`;},650),
      setTimeout(()=>{treeWrap.style.transition="transform 5.6s cubic-bezier(.45,0,.25,1)";treeWrap.style.transform=`translate(0px, ${rootY}px) scale(1)`;},7250),
      setTimeout(enterNav,12950),
    ];
  };
  waitTree();
}
function cancelNavIntro(){
  if(!navIntroActive)return;
  navIntroTimers.forEach(clearTimeout);navIntroTimers=[];enterNav();
}

const coverEnter = document.getElementById("cover-enter");
const coverView = views.cover;
const coverMist = document.getElementById("cover-mist");
let coverRevealing = false;

function revealFromCover() {
  if (coverRevealing) return;
  coverRevealing = true;
  coverView.classList.add("parted");
  setTimeout(() => {
    coverView.classList.add("leaving");
    setTimeout(() => {
      showView("nav");
      runNavIntro();
    }, 850);
  }, 1500);
}
coverEnter.addEventListener("click", revealFromCover);

/* =====================================================================
 * 搜索框 —— 输入即搜成员，弹介绍卡（保留原逻辑）
 * ===================================================================== */
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
let searchHideTimer = null;

function buildSearchIndex() {
  const idx = [];
  DATA.teams.forEach((team) => {
    team.members.forEach((m) => {
      idx.push({ m, team: team.name });
    });
  });
  return idx;
}
const SEARCH_INDEX = buildSearchIndex();

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  if (!q) { searchResults.classList.remove("show"); searchResults.innerHTML = ""; return; }

  const hits = SEARCH_INDEX.filter(({ m }) =>
    m.name.toLowerCase().includes(q) ||
    (m.nickname && m.nickname.toLowerCase().includes(q))
  );

  if (hits.length === 0) {
    searchResults.innerHTML = `<div class="search-no-result">没找到匹配的蜗牛 🐌</div>`;
    searchResults.classList.add("show");
    return;
  }

  searchResults.innerHTML = hits.map(({ m, team }) => `
    <div class="search-result-item" data-name="${m.name}" data-team="${team}">
      <div class="search-result-avatar"><img src="${snailImgFor(m)}" alt="${m.name}" /></div>
      <div class="search-result-info">
        <div class="search-result-name">${m.name}${m.isLeader ? ' 👑' : ''}</div>
        <div class="search-result-team">${team}</div>
      </div>
    </div>
  `).join("");
  searchResults.classList.add("show");

  searchResults.querySelectorAll(".search-result-item").forEach((item) => {
    item.addEventListener("click", () => {
      const name = item.dataset.name;
      const hit = SEARCH_INDEX.find(({ m }) => m.name === name);
      if (hit) {
        const teamIdx = DATA.teams.findIndex((t) => t.name === item.dataset.team);
        if (teamIdx >= 0) playDoorTransition(teamIdx, hit.m);
      }
      searchResults.classList.remove("show");
      searchInput.value = "";
    });
  });
}

searchInput.addEventListener("input", () => {
  renderSearchResults(searchInput.value);
});
searchInput.addEventListener("focus", () => {
  if (searchInput.value.trim()) renderSearchResults(searchInput.value);
});
searchInput.addEventListener("blur", () => {
  searchHideTimer = setTimeout(() => {
    searchResults.classList.remove("show");
  }, 180);
});
searchResults.addEventListener("mousedown", (e) => {
  e.preventDefault();
});

/* ====== 导航态：滚动/滑动 ====== */
function onWheel(e) {
  if (navIntroActive) cancelNavIntro();
  if (!entered) return;
  e.preventDefault();
  const step = Math.max(24, Math.abs(e.deltaY) * 0.6);
  targetCam = clampCam(targetCam - (e.deltaY > 0 ? step : -step));
}
function onTouchStart(e) {
  if (navIntroActive) cancelNavIntro();
  if (!entered) return;
  touchY = e.touches[0].clientY;
}
function onTouchMove(e) {
  if (!entered) return;
  e.preventDefault();
  const y = e.touches[0].clientY;
  const dy = y - touchY;
  touchY = y;
  targetCam = clampCam(targetCam + dy * 1.2);
}
viewNav.addEventListener("wheel", onWheel, { passive: false });
viewNav.addEventListener("touchstart", onTouchStart, { passive: true });
viewNav.addEventListener("touchmove", onTouchMove, { passive: false });
viewNav.addEventListener("pointerdown", cancelNavIntro, { passive: true });

function initLens() { setGlobalLens(); }

/* ====== 果实白底自动去除（保留，抠果实图用） ====== */
function stripWhiteBackground(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const px = data.data;
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i], g = px[i + 1], b = px[i + 2];
    if (r > 195 && g > 195 && b > 195) {
      px[i + 3] = 0;
    }
  }
  ctx.putImageData(data, 0, 0);
  return canvas.toDataURL("image/png");
}

function initFruitAlpha() {
  document.querySelectorAll(".fruit-img").forEach((img) => {
    if (img.complete) {
      img.src = stripWhiteBackground(img);
    } else {
      img.onload = () => { img.src = stripWhiteBackground(img); };
    }
  });
}

if (navTree.complete) initLens();
else navTree.addEventListener("load", initLens);
window.addEventListener("load", () => {
  setGlobalLens();
  initFruitAlpha();
});
window.addEventListener("resize", () => {
  if (!entered) {
    setGlobalLens();
  } else {
    targetCam = cam = clampCam(targetCam);
    applyCam();
  }
});
