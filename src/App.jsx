import React, { useState, useEffect, useRef } from 'react';
import { Heart, Music, Volume2, VolumeX, Mail, Sparkles, Camera, HelpCircle, Lock, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState('cover'); // cover, envelope, reasons, gallery, quiz, passcode
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Anniversary Counter (23 Februari 2025)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2025-02-23T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now - targetDate;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const startExperience = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Autoplay error:", err));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const triggerConfettiEffect = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // State for Reasons
  const [revealedReasons, setRevealedReasons] = useState({});
  const toggleReason = (id) => {
    setRevealedReasons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // State for Envelope
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  // State for Quiz
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

  // State for Passcode
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [passcodeSuccess, setPasscodeSuccess] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden flex items-center justify-center p-4">
      {/* Background Audio */}
      <audio ref={audioRef} src="/song.mp3" loop />

      {/* Floating Hearts Rain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-pink-300/40 rounded-full animate-bounce"
            style={{
              width: `${Math.random() * 16 + 10}px`,
              height: `${Math.random() * 16 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              animationDuration: `${Math.random() * 3 + 4}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: 'rotate(-45deg)'
            }}
          />
        ))}
      </div>

      {/* Splash Screen */}
      {!started && (
        <div className="fixed inset-0 bg-pink-100/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full border border-white/50">
            <Heart className="w-16 h-16 text-rose-400 mx-auto mb-4 animate-pulse fill-rose-400" />
            <h2 className="font-script text-5xl text-rose-500 mb-2">Hai Kamu...</h2>
            <p className="text-sm text-gray-600 mb-6">Sebelum masuk, aktifkan musik romantisnya dulu ya biar makin berasa suasananya! 🎵</p>
            <button
              onClick={startExperience}
              className="bg-rose-400 hover:bg-rose-500 text-white font-medium px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105"
            >
              Buka Website ✨
            </button>
          </div>
        </div>
      )}

      {/* Music Widget */}
      {started && (
        <div className="fixed top-4 right-4 z-40">
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md backdrop-blur-md border transition transform hover:scale-105 ${
              isPlaying ? 'bg-rose-400 text-white border-rose-400' : 'bg-white/80 text-gray-700 border-rose-200'
            }`}
          >
            {isPlaying ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-xs font-medium">{isPlaying ? 'Jeda Musik (Tulus - Suka)' : 'Putar Musik'}</span>
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* COVER PAGE */}
        {currentPage === 'cover' && (
          <div className="bg-white/85 backdrop-blur-md border border-white/60 rounded-3xl p-8 text-center shadow-xl animate-fade-in">
            <span className="inline-block bg-orange-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Special Gift For You
            </span>
            <h1 className="font-script text-5xl text-rose-500 mb-2">Hai, Sayang...</h1>
            <p className="text-sm text-gray-600 mb-6">Aku membuat sesuatu khusus untuk seseorang yang paling istimewa di hidupku.</p>
            
            <div className="w-28 h-28 bg-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-inner animate-pulse">
              💌
            </div>

            {/* Anniversary Counter */}
            <div className="bg-rose-50/80 border border-dashed border-rose-300 rounded-2xl p-4 mb-6 shadow-sm">
              <p className="text-xs text-gray-600 font-medium mb-1">Kita sudah bersama selama:</p>
              <p className="text-sm font-bold text-rose-500">
                {timeLeft.days} hari {timeLeft.hours} jam {timeLeft.minutes} menit {timeLeft.seconds} detik
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('envelope')}
              className="bg-rose-400 hover:bg-rose-500 text-white font-medium px-8 py-3 rounded-full shadow-md transition transform hover:scale-105 w-full flex items-center justify-center gap-2"
            >
              Buka Surat Cinta ✨ <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ENVELOPE PAGE */}
        {currentPage === 'envelope' && (
          <div className="bg-white/85 backdrop-blur-md border border-white/60 rounded-3xl p-8 text-center shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Sebuah Surat Untukmu</h2>
            <p className="text-xs text-gray-600 mb-6">Ketuk amplop di bawah ini untuk membukanya:</p>

            <div className="my-8 flex justify-center cursor-pointer" onClick={() => setEnvelopeOpen(true)}>
              <div className={`relative w-56 h-36 bg-rose-300 rounded-b-xl shadow-lg transition-transform duration-500 hover:scale-105 ${envelopeOpen ? 'open' : ''}`}>
                {/* Flap */}
                <div className={`absolute top-0 left-0 w-0 h-0 border-x-[110px] border-x-transparent border-t-[80px] border-t-rose-500 origin-top transition-transform duration-600 z-20 ${envelopeOpen ? 'rotate-x-180 z-0' : ''}`} />
                {/* Pocket */}
                <div className="absolute bottom-0 left-0 w-0 h-0 border-x-[110px] border-x-rose-300 border-b-[75px] border-b-rose-400 border-t-[65px] border-t-transparent rounded-b-xl z-10" />
                {/* Letter */}
                <div className={`absolute bottom-2 left-4 w-48 h-24 bg-white rounded-lg p-3 shadow flex items-center justify-center text-center transition-all duration-600 ${envelopeOpen ? '-translate-y-16 z-30' : 'z-0'}`}>
                  <p className="text-xs italic text-gray-700">"Untukmu yang selalu mengisi hari-hariku dengan kebahagiaan..."</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-6">{envelopeOpen ? 'Surat terbuka untukmu! ✨' : '(Klik amplopnya)'}</p>

            <div className="flex justify-between items-center">
              <button onClick={() => setCurrentPage('cover')} className="border border-gray-300 text-gray-600 px-5 py-2 rounded-full text-sm hover:bg-gray-50 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
              {envelopeOpen && (
                <button onClick={() => setCurrentPage('reasons')} className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full text-sm shadow transition flex items-center gap-1 animate-bounce">
                  Lanjut ke Alasan ✨ <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* REASONS PAGE */}
        {currentPage === 'reasons' && (
          <div className="bg-white/85 backdrop-blur-md border border-white/60 rounded-3xl p-8 text-center shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Kenapa Aku Begitu Menyayangimu?</h2>
            <p className="text-xs text-gray-600 mb-6">Klik kartu di bawah untuk melihat alasannya satu per satu:</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: 1, text: "Senyummu selalu berhasil membuat hari-hariku yang berat jadi terasa ringan seketika." },
                { id: 2, text: "Kamu adalah pendengar terbaik dan tempat pulang paling nyaman untukku bercerita." },
                { id: 3, text: "Cara ketawamu yang lucu selalu berhasil bikin aku jatuh cinta lagi dan lagi." },
                { id: 4, text: "Kamu selalu sabar dan ngertiin aku, bahkan di saat-saat aku lagi menyebalkan." }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleReason(item.id)}
                  className={`h-28 rounded-2xl flex items-center justify-center p-3 text-center cursor-pointer border-2 border-dashed transition transform hover:-translate-y-1 shadow-sm ${
                    revealedReasons[item.id] ? 'bg-rose-400 text-white border-rose-400' : 'bg-rose-50/50 text-rose-500 border-orange-200'
                  }`}
                >
                  <span className="text-xs font-medium">
                    {revealedReasons[item.id] ? item.text : `Alasan #${item.id} 🎁`}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button onClick={() => setCurrentPage('envelope')} className="border border-gray-300 text-gray-600 px-5 py-2 rounded-full text-sm hover:bg-gray-50 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
              <button onClick={() => setCurrentPage('gallery')} className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full text-sm shadow transition flex items-center gap-1">
                Lanjut ke Kenangan 📸 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* GALLERY PAGE */}
        {currentPage === 'gallery' && (
          <div className="bg-white/85 backdrop-blur-md border border-white/60 rounded-3xl p-8 text-center shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Kenangan Kita Bersama</h2>
            <p className="text-xs text-gray-600 mb-6">Setiap detik bersamamu adalah memori terindah.</p>

            <div className="flex justify-around gap-2 mb-8">
              {[
                { icon: "🌸", caption: "Waktu Terbaik" },
                { icon: "☕", caption: "Ngobrol Santai" },
                { icon: "🌙", caption: "Selamanya" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-3 pb-5 rounded shadow-md w-1/3 transform rotate-[-2deg] hover:rotate-0 hover:scale-105 transition">
                  <div className="h-20 bg-pink-100 rounded flex items-center justify-center text-2xl mb-2">
                    {item.icon}
                  </div>
                  <p className="font-script text-lg text-gray-700">{item.caption}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button onClick={() => setCurrentPage('reasons')} className="border border-gray-300 text-gray-600 px-5 py-2 rounded-full text-sm hover:bg-gray-50 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
              <button onClick={() => setCurrentPage('quiz')} className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full text-sm shadow transition flex items-center gap-1">
                Kuis Spesial 💖 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* QUIZ PAGE */}
        {currentPage === 'quiz' && (
          <div className="bg-white/85 backdrop-blur-md border border-white/60 rounded-3xl p-8 text-center shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Seberapa Sayang Kamu Sama Aku?</h2>
            <p className="text-xs text-gray-600 mb-6">Jawab jujur ya! Hehehe 😄</p>

            {!quizAnswered ? (
              <div className="my-6">
                <p className="font-medium text-gray-700 mb-6">Apakah kamu sayang banget sama aku?</p>
                <div className="flex justify-center gap-4 relative h-16 items-center">
                  <button
                    onClick={() => { setQuizAnswered(true); triggerConfettiEffect(); }}
                    className="bg-rose-400 hover:bg-rose-500 text-white font-medium px-6 py-2.5 rounded-full shadow transition transform hover:scale-105"
                  >
                    Sayang Banget! 🥰
                  </button>
                  <button
                    onMouseEnter={() => setNoBtnPos({ x: Math.random() * 120 - 60, y: Math.random() * 60 - 30 })}
                    style={{ transform: `translate(${noBtnPos.x}px, ${noBtnPos.y}px)` }}
                    className="border border-gray-300 text-gray-600 px-6 py-2.5 rounded-full text-sm transition absolute right-4"
                  >
                    Biasa aja 😜
                  </button>
                </div>
              </div>
            ) : (
              <div className="my-6 animate-fade-in">
                <p className="text-lg font-bold text-rose-500 mb-4">Yeay! Aku juga sayang banget sama kamu selamanya! ❤️✨</p>
                <button
                  onClick={() => setQuizAnswered(false)}
                  className="border border-rose-300 text-rose-500 px-6 py-2 rounded-full text-xs hover:bg-rose-50 transition flex items-center gap-1 mx-auto"
                >
                  <RefreshCw className="w-3 h-3" /> Ulang Kuis
                </button>
              </div>
            )}

            <div className="flex justify-between items-center mt-6">
              <button onClick={() => setCurrentPage('gallery')} className="border border-gray-300 text-gray-600 px-5 py-2 rounded-full text-sm hover:bg-gray-50 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
              <button onClick={() => setCurrentPage('surprise')} className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full text-sm shadow transition flex items-center gap-1">
                Pesan Terakhir ✨ <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SURPRISE / FINAL PAGE */}
        {currentPage === 'surprise' && (
          <div className="bg-white/85 backdrop-blur-md border border-white/60 rounded-3xl p-8 text-center shadow-xl animate-fade-in">
            <h2 className="font-script text-5xl text-rose-500 mb-2">Terima Kasih Sudah Hadir</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Terima kasih ya sudah jadi bagian terindah dalam hidupku. Semoga hari-harimu selalu bahagia, dan aku akan selalu ada di sini buat kamu.
            </p>

            <div
              onClick={triggerConfettiEffect}
              className="text-6xl cursor-pointer inline-block my-4 animate-bounce hover:scale-110 transition"
            >
              ❤️
            </div>
            <p className="text-xs text-gray-400 mb-6">(Klik hatinya ya!)</p>

            <div className="flex justify-between items-center">
              <button onClick={() => setCurrentPage('quiz')} className="border border-gray-300 text-gray-600 px-5 py-2 rounded-full text-sm hover:bg-gray-50 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
              <button onClick={() => setCurrentPage('passcode')} className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full text-sm shadow transition flex items-center gap-1">
                Surat Rahasia 🔐 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PASSCODE SECRET PAGE */}
        {currentPage === 'passcode' && (
          <div className="bg-white/85 backdrop-blur-md border border-white/60 rounded-3xl p-8 text-center shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Surat Rahasia Berkode 🔐</h2>
            <p className="text-xs text-gray-600 mb-6">Masukkan tanggal jadian kita (Format: DDMMYYYY, contoh: 23022025) untuk membuka pesan rahasia:</p>

            <div className="flex justify-center gap-2 mb-4">
              <input
                type="password"
                maxLength="8"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan sandi..."
                className="px-4 py-2 border border-gray-300 rounded-full text-sm text-center outline-none focus:border-rose-400 w-48"
              />
              <button
                onClick={() => {
                  if (passcode === '23022025') {
                    setPasscodeSuccess(true);
                    setPasscodeError(false);
                    triggerConfettiEffect();
                  } else {
                    setPasscodeError(true);
                    setPasscodeSuccess(false);
                  }
                }}
                className="bg-rose-400 hover:bg-rose-500 text-white px-5 py-2 rounded-full text-sm shadow transition"
              >
                Buka
              </button>
            </div>

            {passcodeError && (
              <p className="text-xs text-rose-500 mb-4 animate-shake">Sandi salah, sayang! Coba ingat-ingat lagi tanggal jadian kita ya 😉</p>
            )}

            {passcodeSuccess && (
              <div className="bg-rose-50 border border-dashed border-rose-300 rounded-2xl p-4 mb-4 text-left animate-fade-in">
                <h3 className="text-sm font-bold text-rose-500 mb-1">💌 Pesan Rahasia Untukmu</h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Terima kasih sudah memilih untuk berjalan bersamaku. Apapun rintangannya di depan, aku ingin kita selalu bergandengan tangan. Aku sangat beruntung memilikimu di hidupku. Selamanya milikmu! ❤️
                </p>
              </div>
            )}

            <div className="flex justify-between items-center mt-6">
              <button onClick={() => setCurrentPage('surprise')} className="border border-gray-300 text-gray-600 px-5 py-2 rounded-full text-sm hover:bg-gray-50 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
              <button onClick={() => setCurrentPage('cover')} className="border border-rose-300 text-rose-500 px-5 py-2 rounded-full text-sm hover:bg-rose-50 transition flex items-center gap-1">
                Ulang Dari Awal ↺
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
