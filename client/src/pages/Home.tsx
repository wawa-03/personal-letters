/**
 * 复刻基准：50 封原创信笺使用公开采集的宽度、坐标、视差、页数与移动断点参数。
 * 设计保持“无导航的纵向书信档案”；文案、纸张样式与品牌标识均为原创。
 */
import { useEffect, useState, type CSSProperties } from "react";
import { X } from "lucide-react";
import { archiveMetrics, letters, type ArchiveLetter } from "@/data/letters";

function Paper({ letter, expanded = false }: { letter: ArchiveLetter; expanded?: boolean }) {
  const preview = ["rag", "ivory", "blue"].includes(letter.tone) ? letter.body : letter.lines;
  const pageCount = Math.max(1, letter.pages);
  return (
    <div className={`paper-stack paper-${letter.tone} ${expanded ? "is-expanded" : ""}`} style={{ "--letter-aspect": letter.aspect } as CSSProperties}>
      {Array.from({ length: pageCount }, (_, pageIndex) => (
        <div className="paper-page" key={pageIndex}>
          <div className="paper-sheet">
            <div className="paper-head"><span>{letter.title}</span><span>{letter.date}</span></div>
            <div className={letter.tone === "type" ? "paper-copy typed-copy" : "paper-copy"}>
              <p className="paper-salutation">{pageIndex === 0 ? letter.lines[0] : "续页，"}</p>
              {(expanded ? pageIndex === 0 ? letter.body : ["有些事不必赶在今天完成。", "这一页留给没有说完的话，也留给下一次平静的相遇。"] : preview.slice(1)).map((line) => <p key={line}>{line}</p>)}
            </div>
            <div className="paper-end">{pageIndex === pageCount - 1 ? "—" : `${pageIndex + 1}`}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [sealOpen, setSealOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<ArchiveLetter | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const closeReader = () => setSelectedLetter(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setSealOpen(false); closeReader(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const slotStyle = (letter: ArchiveLetter): CSSProperties => ({
    "--letter-width": `${letter.width}px`,
    "--letter-mobile-width": `${letter.mobileWidth}px`,
    "--letter-x": `${letter.x}%`,
    "--letter-x-wide": `${letter.xWide}%`,
    "--letter-y": `${letter.y}px`,
    "--letter-mobile-x": `${letter.mobileX}px`,
    "--letter-mobile-y": `${letter.mobileY}px`,
    "--letter-offset": `${letter.offset}px`,
    "--letter-gap": `${letter.gap}px`,
    "--letter-parallax": `${Math.round(scrollTop * letter.parallaxRate * 1000) / 1000}px`,
    "--intro-delay": `${Math.min(275, letter.id === "letter-01" ? 0 : Number(letter.id.slice(-2)) * 55)}ms`,
  } as CSSProperties);

  return (
    <div className="love-archive-app">
      <button className={sealOpen ? "archive-seal-backdrop is-visible" : "archive-seal-backdrop"} onClick={() => setSealOpen(false)} aria-label="关闭简介" />
      <aside className={sealOpen ? "archive-seal is-open" : "archive-seal"} aria-label="网站简介">
        <div className="seal-face">
          <button className="seal-side seal-front" type="button" onClick={() => setSealOpen(true)} aria-label="打开网站简介">
            <span className="seal-inset"><span className="seal-sprig">✦</span><span className="seal-title">PRIVATE<br />NOTES</span><span className="seal-small">SINCE 2026</span></span>
          </button>
          <div className="seal-side seal-back"><div className="seal-back-copy">有些话不必立刻被回答。<br />把它们写下来，让它们在这里慢慢停留。</div><button className="seal-close" type="button" onClick={() => setSealOpen(false)} aria-label="关闭简介">×</button></div>
        </div>
      </aside>

      <main className={`archive${sealOpen ? " is-muted" : ""}${selectedLetter ? " has-selection is-intro-locked" : ""}`} aria-label="个人信笺档案">
        <div className="vertical-viewport" onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
          <div className="vertical-track" style={{ "--desktop-track-height": `${archiveMetrics.desktopTrackHeight}px`, "--mobile-track-height": `${archiveMetrics.mobileTrackHeight}px` } as CSSProperties}>
            {letters.map((letter) => (
              <div className="vertical-letter-slot" key={letter.id} style={slotStyle(letter)}>
                <button className="vertical-letter-button" type="button" onClick={() => setSelectedLetter(letter)} aria-label={`阅读：${letter.title}，${letter.date}`}>
                  <Paper letter={letter} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedLetter && (
        <section className="reader-backdrop" role="dialog" aria-modal="true" aria-labelledby="reader-title">
          <button className="reader-dismiss-layer" type="button" onClick={closeReader} aria-label="返回信笺画布" />
          <div className="reader-stage">
            <div className="reader-paper"><Paper letter={selectedLetter} expanded /></div>
            <aside className="reader-info"><p className="reader-kicker">PERSONAL CORRESPONDENCE</p><h1 id="reader-title">{selectedLetter.title}</h1><p className="reader-summary">{selectedLetter.summary}</p><div className="reader-rule" /><dl><div><dt>日期</dt><dd>{selectedLetter.date}</dd></div><div><dt>地点</dt><dd>{selectedLetter.place}</dd></div><div><dt>来源</dt><dd>私人手记 ↗</dd></div></dl></aside>
            <button className="reader-mobile-close" type="button" onClick={closeReader} aria-label="关闭信件"><X size={19} strokeWidth={1.4} /></button>
          </div>
        </section>
      )}
    </div>
  );
}
