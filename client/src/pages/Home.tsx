/**
 * 设计提醒：本页遵循“留白里的信”——当代编辑设计与文具工艺感。
 * 文字为主视觉；使用不对称的信笺编目布局、温暖纸张色与克制的封蜡红。
 */
import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronDown, Dot, MoveUpRight, X } from "lucide-react";

type Letter = {
  id: string;
  date: string;
  month: string;
  title: string;
  category: "日常" | "片刻" | "给人" | "给自己";
  excerpt: string;
  body: string[];
};

const letters: Letter[] = [
  {
    id: "01",
    date: "08.24",
    month: "AUG 2026",
    title: "给清晨的五分钟",
    category: "日常",
    excerpt: "把闹钟关掉以后，窗外刚好有一辆很慢的车驶过。今天先不要急着成为谁。",
    body: [
      "把闹钟关掉以后，窗外刚好有一辆很慢的车驶过。它没有催促谁，路口也没有人按喇叭。",
      "我忽然觉得，早晨也许不需要被安排得太满。留五分钟给光线、给水壶的声音，也给还没想好怎么开始的自己。",
      "今天先不要急着成为谁。先好好醒来。",
    ],
  },
  {
    id: "02",
    date: "08.18",
    month: "AUG 2026",
    title: "把雨声留在路上",
    category: "片刻",
    excerpt: "回家的那段路下起了雨。伞面很近，世界忽然变得只剩下一小圈。",
    body: [
      "回家的那段路下起了雨。伞面很近，世界忽然变得只剩下一小圈。",
      "鞋底踩过积水的时候，我想起一些已经过去很久、却仍然带着潮气的事。它们没有答案，也不需要马上被解释。",
      "雨停之前，先把雨声留在路上。",
    ],
  },
  {
    id: "03",
    date: "08.07",
    month: "AUG 2026",
    title: "写给不在场的朋友",
    category: "给人",
    excerpt: "有些对话不必等到见面才开始。想念有时候是一段很轻的、无需寄出的句子。",
    body: [
      "有些对话不必等到见面才开始。想念有时候是一段很轻的、无需寄出的句子。",
      "我路过那家店时记起你说过的那种气味；傍晚的云很低，也很像我们曾经一起等过的天气。",
      "希望你正在被自己的生活轻轻接住。",
    ],
  },
  {
    id: "04",
    date: "07.29",
    month: "JUL 2026",
    title: "允许今天不完整",
    category: "给自己",
    excerpt: "没有完成的清单依旧会躺在那里，但我决定先把它们合上。",
    body: [
      "没有完成的清单依旧会躺在那里，但我决定先把它们合上。",
      "有些日子不是为了抵达，而是为了把呼吸找回来。晚饭可以简单一点，房间可以乱一点，回答可以明天再写。",
      "允许今天不完整，也允许自己仍然值得被喜欢。",
    ],
  },
];

const categories = ["全部", "日常", "片刻", "给人", "给自己"] as const;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("全部");
  const [openLetter, setOpenLetter] = useState<Letter | null>(null);
  const visibleLetters = useMemo(
    () => (activeCategory === "全部" ? letters : letters.filter((letter) => letter.category === activeCategory)),
    [activeCategory],
  );

  const scrollToArchive = () => document.querySelector("#archive")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="site-shell">
      <header className="topbar" aria-label="主导航">
        <a className="brand-lockup" href="#top" aria-label="回到首页">
          <img src="/manus-storage/personal-letters-fold-mark_f5d565ce.png" alt="折页标记" className="brand-mark" />
          <span className="brand-name">留白里的信</span>
        </a>
        <nav className="top-nav" aria-label="页面导航">
          <a href="#archive">信件</a>
          <a href="#about">关于</a>
        </nav>
        <button className="quiet-link" onClick={scrollToArchive}>
          读一封 <ArrowDownRight size={15} strokeWidth={1.7} />
        </button>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" />PRIVATE CORRESPONDENCE / 2026</div>
            <h1 id="hero-title">把今天<br /><em>没说完的话，</em><br />留在这里。</h1>
            <p className="hero-intro">一些日常的片刻、给人的惦念，以及写给自己的小小回信。</p>
            <button className="round-action" onClick={scrollToArchive} aria-label="开始阅读信件">
              <span>开始阅读</span><ArrowDownRight size={19} strokeWidth={1.6} />
            </button>
          </div>

          <div className="hero-image-wrap" aria-label="纸张与书信的静物影像">
            <div className="image-index">NOW / 08.24</div>
            <img className="hero-image" src="/manus-storage/personal-letters-hero_df8107dd.jpg" alt="温暖光线下的空白信纸与枝叶" />
            <div className="hero-note">一封写给<br />正在读到这里的人</div>
          </div>
        </section>

        <section className="statement-section" aria-label="网站说明">
          <div className="statement-index">01 <span>—</span> 记下</div>
          <div className="statement-text">
            <p>这里不追求把每件事讲清楚。<br />只是把那些本来会消失的瞬间，<br /><em>郑重地收好。</em></p>
          </div>
          <div className="statement-side">SLOW NOTES<br />FOR ORDINARY DAYS</div>
        </section>

        <section className="archive-section" id="archive" aria-labelledby="archive-title">
          <div className="archive-head">
            <div>
              <div className="eyebrow"><span className="eyebrow-dot" />THE ARCHIVE</div>
              <h2 id="archive-title">最近的<br /><em>几封信</em></h2>
            </div>
            <p>每一封都来自一个值得多停留一会儿的时刻。<br />按心情浏览，或从第一封慢慢读起。</p>
          </div>

          <div className="category-row" role="tablist" aria-label="筛选信件类别">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "category active" : "category"}
                onClick={() => setActiveCategory(category)}
                role="tab"
                aria-selected={activeCategory === category}
              >
                {category}<span>{category === "全部" ? letters.length : letters.filter((item) => item.category === category).length}</span>
              </button>
            ))}
          </div>

          <div className="letters-grid">
            <article className="image-letter">
              <div className="image-letter-frame">
                <img src="/manus-storage/personal-letters-reading_6a61e3bd.jpg" alt="几张留白便签的静物" />
                <span>SELECTED<br />NOTES</span>
              </div>
              <p>每一段表达，都有它自己的留白。</p>
            </article>

            <div className="letter-list" aria-live="polite">
              {visibleLetters.map((letter, index) => (
                <button className="letter-row" key={letter.id} onClick={() => setOpenLetter(letter)}>
                  <span className="letter-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="letter-date">{letter.date}<small>{letter.month}</small></span>
                  <span className="letter-main"><strong>{letter.title}</strong><span>{letter.excerpt}</span></span>
                  <span className="letter-category">{letter.category}</span>
                  <MoveUpRight className="letter-arrow" size={18} strokeWidth={1.4} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pause-section" id="about" aria-labelledby="about-title">
          <div className="pause-portrait">
            <img src="/manus-storage/personal-letters-dusk_9e935e34.jpg" alt="书页与描图纸的温暖近景" />
            <span className="portrait-stamp">A NOTE<br />IN PROGRESS</span>
          </div>
          <div className="pause-copy">
            <div className="eyebrow"><span className="eyebrow-dot" />ABOUT THIS PLACE</div>
            <h2 id="about-title">给文字一个<br /><em>可以慢下来的地方。</em></h2>
            <p>这是一个正在生长的个人角落。我把生活里想记住的光、声响和心事放在这里，也希望它能在某个普通的晚上，恰好陪到你。</p>
            <a className="text-action" href="mailto:hello@example.com">写一封信给我 <ArrowUpRight size={16} strokeWidth={1.6} /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><img src="/manus-storage/personal-letters-fold-mark_f5d565ce.png" alt="" />留白里的信</div>
        <p>把日常感受郑重收好。</p>
        <span>© 2026 / PERSONAL NOTES</span>
      </footer>

      {openLetter && (
        <div className="letter-overlay" role="dialog" aria-modal="true" aria-labelledby="letter-title">
          <button className="overlay-backdrop" aria-label="关闭阅读窗口" onClick={() => setOpenLetter(null)} />
          <article className="open-letter">
            <button className="close-letter" onClick={() => setOpenLetter(null)} aria-label="关闭"><X size={20} strokeWidth={1.6} /></button>
            <div className="open-meta"><span>LETTER / {openLetter.id}</span><Dot size={17} /><span>{openLetter.date} / {openLetter.month}</span></div>
            <p className="open-category">{openLetter.category}</p>
            <h2 id="letter-title">{openLetter.title}</h2>
            <div className="open-rule" />
            <div className="open-body">{openLetter.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="open-signoff">留白里的信</div>
            <button className="next-letter" onClick={() => setOpenLetter(null)}>收好这一封 <ChevronDown size={17} strokeWidth={1.5} /></button>
          </article>
        </div>
      )}
    </div>
  );
}
