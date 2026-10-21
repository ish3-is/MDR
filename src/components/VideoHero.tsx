import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { asset, Button } from "./UI";
import { useLocale } from "../i18n";
export function VideoHero() {
  const { t, path } = useLocale();
  const video = useRef<HTMLVideoElement>(null);
  const manualPause = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [format, setFormat] = useState<"webm" | "mp4">("webm");
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const dataSaver = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    let cancelled = false;
    const update = () => {
      if (media.matches || dataSaver) {
        setEnabled(false);
        video.current?.pause();
        return;
      }
      // Give critical text/font rendering priority over the cinematic download.
      document.fonts.ready.then(() =>
        requestAnimationFrame(() => {
          if (!cancelled && !media.matches) setEnabled(true);
        }),
      );
    };
    update();
    media.addEventListener("change", update);
    return () => {
      cancelled = true;
      media.removeEventListener("change", update);
    };
  }, []);
  useEffect(() => {
    const el = video.current;
    if (!enabled || !el) return;
    el.load();
    el.play().catch(() => setPlaying(false));
    const visible = () => {
      if (document.hidden) el.pause();
    };
    document.addEventListener("visibilitychange", visible);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) el.pause();
        else if (!manualPause.current && !el.ended && !document.hidden)
          el.play().catch(() => {});
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visible);
    };
  }, [enabled, format]);
  function toggle() {
    const el = video.current;
    if (!el || failed) return;
    if (!enabled) {
      setEnabled(true);
      manualPause.current = false;
      return;
    }
    if (playing) {
      manualPause.current = true;
      el.pause();
    } else {
      manualPause.current = false;
      if (el.ended) {
        el.currentTime = 0;
        setEnded(false);
      }
      el.play().catch(() => setPlaying(false));
    }
  }
  return (
    <section className="hero">
      <div className="hero-coordinate mono" aria-hidden="true">
        MADAR / VISION IN MOTION
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="gold-line" />
            {t("خبرات سعودية. آفاق تتّسع.", "SAUDI EXPERTISE. WIDER HORIZONS.")}
          </div>
          <h1>
            {t("نصنع التقنية.", "We build technology.")}
            <br />
            <span>{t("ونوسّع أثرها.", "And extend its impact.")}</span>
          </h1>
          <p>
            {t(
              "حلول رقمية، خبرات تقنية متعددة، وابتكار يحوّل الأفكار إلى أثر ملموس.",
              "Digital solutions, multidisciplinary expertise, and innovation that turns ideas into meaningful impact.",
            )}
          </p>
          <div className="hero-actions">
            <Button to={path("/projects")}>
              {t("استكشف أعمالنا", "Explore our work")}
            </Button>
            <Button secondary to={path("/contact")}>
              {t("اطلب عرض سعر", "Get a quote")}
            </Button>
          </div>
          <div className="hero-origin">
            <span className="status-dot" />
            {t(
              "من المملكة العربية السعودية، نحو آفاق أوسع",
              "From Saudi Arabia, toward wider horizons",
            )}
          </div>
        </div>
        <div className="cinema">
          <div className="cinema-top mono">
            <span>01 / THE MADAR FILM</span>
            <span>00:12</span>
          </div>
          <div className="cinema-screen">
            {failed ? (
              <img
                src={asset("videos/madar-poster-preview.webp")}
                alt={t(
                  "الملصق الأصلي لفيلم مدار",
                  "Original MADAR film poster",
                )}
                width="1920"
                height="1080"
              />
            ) : (
              <video
                key={format}
                ref={video}
                muted
                autoPlay={enabled}
                playsInline
                preload={enabled ? "metadata" : "none"}
                poster={asset("videos/madar-poster-preview.webp")}
                width="1920"
                height="1080"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => {
                  setEnded(true);
                  setPlaying(false);
                }}
                onError={() => {
                  setPlaying(false);
                  if (format === "webm") setFormat("mp4");
                  else setFailed(true);
                }}
                aria-label={t(
                  "فيلم مدار التعريفي، صامت، 12 ثانية",
                  "MADAR introduction film, silent, 12 seconds",
                )}
              >
                {enabled && (
                  <source
                    src={asset("videos/madar-welcome-12s." + format)}
                    type={"video/" + format}
                  />
                )}
              </video>
            )}
          </div>
          <div className="cinema-bottom">
            <span>
              {t(
                "حين تلتقي الرؤية بالتقنية.",
                "Where vision meets technology.",
              )}
            </span>
            {!failed && (
              <button
                className="film-control"
                onClick={toggle}
                aria-label={
                  playing
                    ? t("إيقاف الفيديو مؤقتًا", "Pause video")
                    : ended
                      ? t("إعادة تشغيل الفيديو", "Replay video")
                      : t("تشغيل الفيديو", "Play video")
                }
              >
                {playing ? (
                  <Pause size={15} />
                ) : ended ? (
                  <RotateCcw size={15} />
                ) : (
                  <Play size={15} />
                )}
                <span>
                  {playing
                    ? t("إيقاف", "Pause")
                    : ended
                      ? t("إعادة العرض", "Replay")
                      : t("تشغيل", "Play")}
                </span>
              </button>
            )}
          </div>
          <span className="cinema-corner" aria-hidden="true" />
        </div>
      </div>
      <div className="container hero-bottom">
        <span className="mono">KNOWLEDGE. ENGINEERING. IMPACT.</span>
        <a href="#expertise">
          {t("اكتشف مدار", "Discover MADAR")}
          <span aria-hidden="true">↓</span>
        </a>
        <span className="mono">EST. AS AN INITIATIVE</span>
      </div>
    </section>
  );
}
