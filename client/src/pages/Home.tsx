/**
 * 复刻基准：暖白画布上的无规则纵向信件档案，左上固定椭圆蜡封为唯一常驻入口。
 * 该页使用原创文案、原创纸张样式与原创标记；其空间节奏、阅读路径与交互状态遵循 rebuild-spec.md。
 */
import { useEffect, useState, type CSSProperties } from "react";
import { X } from "lucide-react";

type PaperTone = "rag" | "ivory" | "gold" | "blue" | "fold" | "type" | "postcard" | "rule" | "red";

type ArchiveLetter = {
  id: string;
  from: string;
  date: string;
  width: number;
  x: number;
  y: number;
  drift: number;
  mobileDrift: number;
  turn: number;
  rate: number;
  tone: PaperTone;
  aspect?: string;
  salutation: string;
  lines: string[];
  body: string[];
};

const letters: ArchiveLetter[] = [
  {
    id: "morning", from: "给未来的我", date: "2026.08.24", width: 224, x: 17.9, y: 97, drift: -53, mobileDrift: -5, turn: -1.3, rate: -0.004, tone: "rag",
    salutation: "早上好，", lines: ["今天的风比想象中更轻。", "窗帘晃了一下，像是在提醒我", "别急着把每一个空白填满。"],
    body: ["早上好，今天的风比想象中更轻。窗帘晃了一下，像是在提醒我，别急着把每一个空白填满。", "我把水烧开，把手机扣在桌上，然后认真地等了一会儿。原来很多答案，并不在更快地赶路以后。", "如果你也读到这里，希望你已经好好吃过早餐。"],
  },
  {
    id: "rain", from: "写给那场雨", date: "2026.08.18", width: 356, x: 15.1, y: 693, drift: 61, mobileDrift: 15, turn: .5, rate: .003, tone: "ivory",
    salutation: "亲爱的雨，", lines: ["你落在回家的路上，", "把所有急促的脚步都放慢了。", "我忽然有一点想念很久以前。"],
    body: ["亲爱的雨，你落在回家的路上，把所有急促的脚步都放慢了。", "伞下只剩一小圈世界，鞋底踩过积水的声音，像有人替傍晚写下了句点。", "我没有带走什么，只把那一点潮湿的安静留在身上。"],
  },
  {
    id: "ordinary", from: "一段普通的下午", date: "2026.08.21", width: 510, x: 78.9, y: 271, drift: -17, mobileDrift: 7, turn: -.2, rate: -.002, tone: "gold",
    salutation: "今天下午，", lines: ["阳光停在桌边很久。", "我没有做特别重要的事，", "只是把一首歌听完，又喝了半杯凉茶。", "原来平静也值得被记录。"],
    body: ["今天下午，阳光停在桌边很久。我没有做特别重要的事，只是把一首歌听完，又喝了半杯凉茶。", "偶尔我会担心，平静的日子会不会太像空白。但后来发现，正是这些没有发生什么的时刻，最能让人慢慢恢复。", "原来平静也值得被记录。"],
  },
  {
    id: "faraway", from: "给很远的朋友", date: "2026.08.07", width: 268, x: 19.4, y: 1318, drift: 77, mobileDrift: -20, turn: 1.1, rate: .002, tone: "fold",
    salutation: "好久不见，", lines: ["路过那家店的时候想起你。", "没有很急的事，", "只是想把这一刻寄给你。"],
    body: ["好久不见，路过那家店的时候想起你。", "没有很急的事，也没有什么必须回答的问题。只是忽然觉得，如果此刻你刚好在身边，大概会一起在门口停一会儿。", "愿你被正在发生的生活轻轻接住。"],
  },
  {
    id: "unhurried", from: "给不赶时间的人", date: "2026.07.29", width: 438, x: 77.8, y: 1452, drift: -55, mobileDrift: 22, turn: -.7, rate: -.003, tone: "red",
    salutation: "请慢一点，", lines: ["没有完成的事还会在那里。", "今晚先把灯开小一点，", "把自己还给自己。"],
    body: ["请慢一点。没有完成的事还会在那里，明天也仍然会来。", "今晚先把灯开小一点，把房间里不必要的声音关掉。", "把自己还给自己，这也算完成了一件事。"],
  },
  {
    id: "receipt", from: "小小凭据", date: "2026.07.16", width: 196, x: 51.3, y: 2170, drift: 31, mobileDrift: -4, turn: -.2, rate: .001, tone: "blue",
    salutation: "记：", lines: ["下午四点十七分，", "买了一束白色小花。", "回家的路很短。"],
    body: ["下午四点十七分，买了一束白色小花。", "它们没有特别的名字，也没有特别的寓意。只是带回家以后，桌面忽然看起来比昨天温柔了一点。"],
  },
  {
    id: "quiet", from: "关于安静", date: "2026.07.04", width: 354, x: 19.4, y: 2758, drift: -73, mobileDrift: 12, turn: -1.1, rate: -.003, tone: "rag",
    salutation: "我发现，", lines: ["安静不是没有声音。", "它更像是终于不用解释，", "也不用被谁催促。"],
    body: ["我发现，安静不是没有声音。", "它更像是终于不用解释，也不用被谁催促。窗外有车驶过，水壶偶尔响一下，我还是可以在这些声音中间，好好待着。"],
  },
  {
    id: "sunday", from: "一个星期天", date: "2026.06.29", width: 524, x: 79.1, y: 2948, drift: 46, mobileDrift: -16, turn: .3, rate: .002, tone: "ivory",
    salutation: "星期天的晚上，", lines: ["天空很低，厨房有一点热。", "我把没读完的书合上，", "觉得今天已经足够好了。"],
    body: ["星期天的晚上，天空很低，厨房有一点热。", "我把没读完的书合上，想起很多事情都可以慢一点再决定。", "今天没有发生值得讲给所有人听的故事，但它依旧是一个足够好的今天。"],
  },
  {
    id: "typed", from: "未发送", date: "2026.06.13", width: 242, x: 51.6, y: 3901, drift: -63, mobileDrift: 13, turn: .2, rate: -.001, tone: "type",
    salutation: "SUBJECT: 一封未发送的信", lines: ["我把开头改了三次。", "最后决定不解释。", "希望你一切都好。"],
    body: ["我把开头改了三次，最后决定不解释。", "有些关心不必成为负担，有些想念也不需要抵达。", "这封信不寄出，但它确实写完了。"],
  },
  {
    id: "postcard", from: "路边的卡片", date: "2026.05.30", width: 416, x: 19.9, y: 4417, drift: 76, mobileDrift: -12, turn: -.5, rate: .003, tone: "postcard", aspect: "1.36 / 1",
    salutation: "从某个路口，", lines: ["寄来一小段黄昏。", "没有地址，", "但我想你会知道它来自哪里。"],
    body: ["从某个路口，寄来一小段黄昏。", "没有地址，但我想你会知道它来自哪里：有树影、慢慢亮起的路灯，还有走得不太匆忙的人。"],
  },
  {
    id: "margin", from: "书页边缘", date: "2026.05.12", width: 302, x: 80.5, y: 4650, drift: -48, mobileDrift: 23, turn: .7, rate: -.002, tone: "rule",
    salutation: "在页边写下：", lines: ["别害怕重新开始。", "有时候退后一点，", "才看得见整片天。"],
    body: ["在页边写下：别害怕重新开始。", "有时候退后一点，才看得见整片天。把今天当作一张刚刚摊开的纸，也没有什么不可以。"],
  },
  {
    id: "return", from: "给回来的自己", date: "2026.04.25", width: 224, x: 20.3, y: 5232, drift: -52, mobileDrift: 4, turn: -.8, rate: .002, tone: "rag",
    salutation: "你回来啦，", lines: ["不用解释为什么这么晚。", "这里一直留着一盏灯，", "也留着可以坐下来的地方。"],
    body: ["你回来啦，不用解释为什么这么晚。", "这里一直留着一盏灯，也留着可以坐下来的地方。", "今天不必把一切修好。你能回来，就已经很好。"],
  },
];

function Paper({ letter }: { letter: ArchiveLetter }) {
  const isTyped = letter.tone === "type";
  const densePreview = ["rag", "ivory", "gold"].includes(letter.tone) ? letter.body : letter.lines;
  return (
    <div className={`paper-stack paper-${letter.tone}`}>
      <div className="paper-sheet">
        <div className="paper-head"><span>{letter.from}</span><span>{letter.date}</span></div>
        <div className={isTyped ? "paper-copy typed-copy" : "paper-copy"}>
          <p className="paper-salutation">{letter.salutation}</p>
          {densePreview.map((line) => <p key={line}>{line}</p>)}
        </div>
        <div className="paper-end">—</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [sealOpen, setSealOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<ArchiveLetter | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSealOpen(false);
      setSelectedLetter(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const slotStyle = (letter: ArchiveLetter): CSSProperties => ({
    "--letter-width": `${letter.width}px`,
    "--letter-x": `${letter.x}%`,
    "--letter-y": `${letter.y}px`,
    "--letter-drift": `${letter.drift}px`,
    "--letter-mobile-drift": `${letter.mobileDrift}px`,
    "--letter-turn": `${letter.turn}deg`,
    "--letter-parallax": `${Math.round(scrollTop * letter.rate)}px`,
    "--letter-aspect": letter.aspect ?? "1280 / 1707",
  } as CSSProperties);

  return (
    <div className="love-archive-app">
      <div className={sealOpen ? "archive-seal-backdrop visible" : "archive-seal-backdrop"} onClick={() => setSealOpen(false)} aria-hidden="true" />

      <aside className={sealOpen ? "archive-seal open" : "archive-seal"} aria-label="网站简介">
        <div className="seal-face">
          <button className="seal-side seal-front" type="button" onClick={() => setSealOpen(true)} aria-label="打开网站简介">
            <span className="seal-inset"><span className="seal-sprig">✦</span><span className="seal-title">PRIVATE<br />NOTES</span><span className="seal-small">SINCE 2026</span></span>
          </button>
          <div className="seal-side seal-back" aria-hidden={!sealOpen}>
            <div className="seal-back-copy">有些话不必立刻被回答。<br />把它们写下来，让它们在这里慢慢停留。</div>
            <button className="seal-close" type="button" onClick={() => setSealOpen(false)} aria-label="关闭简介">×</button>
          </div>
        </div>
      </aside>

      <main className={sealOpen ? "archive is-muted" : "archive"} aria-label="个人信笺档案">
        <div className="vertical-viewport" onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
          <div className="vertical-track">
            {letters.map((letter) => (
              <div className="vertical-letter-slot" key={letter.id} style={slotStyle(letter)}>
                <button className="vertical-letter-button" type="button" onClick={() => setSelectedLetter(letter)} aria-label={`阅读：${letter.from}，${letter.date}`}>
                  <Paper letter={letter} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedLetter && (
        <div className="reader-overlay" role="dialog" aria-modal="true" aria-labelledby="reader-heading" onMouseDown={() => setSelectedLetter(null)}>
          <article className={`reader-letter paper-${selectedLetter.tone}`} onMouseDown={(event) => event.stopPropagation()}>
            <button className="reader-close" onClick={() => setSelectedLetter(null)} aria-label="关闭信件"><X size={18} strokeWidth={1.35} /></button>
            <div className="reader-meta"><span>{selectedLetter.from}</span><span>{selectedLetter.date}</span></div>
            <h1 id="reader-heading">{selectedLetter.salutation}</h1>
            <div className="reader-body">{selectedLetter.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="reader-signoff">写在一个普通的日子里</div>
          </article>
        </div>
      )}
    </div>
  );
}
