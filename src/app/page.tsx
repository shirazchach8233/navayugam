const nav = [
  { en: "Home", ml: "ഹോം", href: "#home" },
  { en: "About", ml: "ഞങ്ങളെക്കുറിച്ച്", href: "#about" },
  { en: "Leadership", ml: "നേതൃത്വം", href: "#leadership" },
  { en: "News", ml: "വാർത്തകൾ", href: "#news" },
  { en: "Updates", ml: "അപ്ഡേറ്റുകൾ", href: "#facebook" },
  { en: "Contact", ml: "ബന്ധപ്പെടുക", href: "#contact" },
];

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 3 L61 37 L97 37 L68 58 L79 92 L50 71 L21 92 L32 58 L3 37 L39 37 Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-party-cream dark:bg-party-cream">
      <header className="sticky top-0 z-10 border-b-4 border-party-gold bg-party-red">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-3">
          <span className="flex items-center gap-3 text-lg font-semibold text-party-ivory">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Navayugam logo"
              className="h-14 w-14 object-contain"
            />
            Navayugam <span className="font-malayalam">നവയുഗം</span>
          </span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-party-ivory/90">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-party-gold">
                  {item.en}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex flex-1 flex-col">
        <section
          id="home"
          className="relative overflow-hidden border-b-4 border-party-gold bg-gradient-to-b from-party-red to-party-red-dark px-6 py-24 text-center"
        >
          <Star className="pointer-events-none absolute -top-10 -left-10 h-64 w-64 text-white/5" />
          <Star className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 text-white/5" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Navayugam logo"
            className="relative mx-auto mb-6 h-56 w-56 object-contain drop-shadow-lg sm:h-64 sm:w-64"
          />
          <h1 className="relative text-4xl font-bold tracking-tight text-party-ivory sm:text-5xl">
            Navayugam Samskarika Vedi
          </h1>
          <p className="font-malayalam relative mt-2 text-3xl font-semibold text-party-gold">
            നവയുഗം സാംസ്‌ക്കാരികവേദി
          </p>
          <div className="relative mx-auto mt-6 h-0.5 w-24 bg-party-gold" />
          <p className="relative mx-auto mt-6 max-w-xl text-lg leading-8 text-party-ivory/90">
            A cultural forum for the Malayali community in Saudi Arabia,
            based in Dammam, working through a central committee.
          </p>
          <p className="font-malayalam relative mx-auto mt-2 max-w-xl text-base leading-8 text-party-ivory/70">
            സൗദി അറേബ്യയിലെ മലയാളി സമൂഹത്തിനായുള്ള സാംസ്‌ക്കാരിക വേദി, ദമ്മാം
            കേന്ദ്രമായി പ്രവർത്തിക്കുന്നു.
          </p>
        </section>

        <section id="about" className="mx-auto w-full max-w-4xl px-6 py-16">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-party-red">
            <Star className="h-6 w-6 text-party-red" />
            About Us <span className="font-malayalam text-xl">| ഞങ്ങളെക്കുറിച്ച്</span>
          </h2>
          <div className="mt-2 h-1 w-16 bg-party-gold" />
          <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/80">
            Navayugam Samskarika Vedi is a community and cultural organisation
            of expatriate Malayalis in Saudi Arabia. Its central committee
            speaks up on issues affecting the community — most recently
            raising concerns over air connectivity for expatriates from
            South Kerala.
          </p>
          <p className="font-malayalam mt-4 max-w-2xl text-base leading-8 text-foreground/70">
            സൗദി അറേബ്യയിലെ പ്രവാസി മലയാളികളുടെ ഒരു സാംസ്‌ക്കാരിക കൂട്ടായ്മയാണ്
            നവയുഗം സാംസ്‌ക്കാരികവേദി. പ്രവാസി സമൂഹത്തെ ബാധിക്കുന്ന വിഷയങ്ങളിൽ
            കേന്ദ്രകമ്മിറ്റി നിലപാട് അറിയിക്കാറുണ്ട്.
          </p>
        </section>

        <section id="leadership" className="border-y-2 border-party-gold/40 bg-party-red/5 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-party-red">
              <Star className="h-6 w-6 text-party-red" />
              Central Committee <span className="font-malayalam text-xl">| കേന്ദ്രകമ്മിറ്റി</span>
            </h2>
            <div className="mt-2 h-1 w-16 bg-party-gold" />
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border-2 border-party-red/20 bg-party-cream p-5 shadow-sm">
                <dt className="text-sm font-medium text-party-red">
                  President
                </dt>
                <dd className="mt-1 text-lg font-semibold text-foreground">
                  Jamal Vilyappally
                </dd>
                <dd className="font-malayalam text-foreground/60">
                  ജമാൽ വില്യാപ്പള്ളി
                </dd>
              </div>
              <div className="rounded-lg border-2 border-party-red/20 bg-party-cream p-5 shadow-sm">
                <dt className="text-sm font-medium text-party-red">
                  General Secretary
                </dt>
                <dd className="mt-1 text-lg font-semibold text-foreground">
                  M. A. Vahid Karayara
                </dd>
                <dd className="font-malayalam text-foreground/60">
                  എം.എ. വാഹിദ് കാര്യറ
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="news" className="mx-auto w-full max-w-4xl px-6 py-16">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-party-red">
            <Star className="h-6 w-6 text-party-red" />
            News <span className="font-malayalam text-xl">| വാർത്തകൾ</span>
          </h2>
          <div className="mt-2 h-1 w-16 bg-party-gold" />
          <article className="mt-6 rounded-lg border-2 border-party-red/20 bg-party-cream p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-party-red">
              5 August 2026 · Dammam
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              Navayugam calls for resumption of direct Riyadh–Jeddah–Trivandrum flights
            </h3>
            <p className="mt-3 text-base leading-7 text-foreground/80">
              Navayugam&rsquo;s central committee has urged Air India Express
              and the Union Ministry of Civil Aviation to restore direct
              flights connecting Riyadh and Jeddah to Thiruvananthapuram
              International Airport. The routes have been suspended since
              October 2025, forcing thousands of expatriates from South
              Kerala to rely on longer, costlier journeys via Kochi,
              Kozhikode, Kannur, or transit stops abroad.
            </p>
            <p className="font-malayalam mt-3 text-base leading-8 text-foreground/70">
              റിയാദ്, ജിദ്ദ എന്നിവിടങ്ങളിൽ നിന്ന് തിരുവനന്തപുരത്തേക്കുള്ള നേരിട്ടുള്ള
              വിമാന സർവീസുകൾ പുനഃസ്ഥാപിക്കണമെന്ന് നവയുഗം കേന്ദ്രകമ്മിറ്റി
              ആവശ്യപ്പെട്ടു. 2025 ഒക്ടോബർ മുതൽ ഈ സർവീസുകൾ നിർത്തിവച്ചിരിക്കുകയാണ്.
            </p>
            <p className="mt-4 text-xs text-foreground/50">
              Source:{" "}
              <a
                href="https://marunadanmalayalee.com/saudi-arabia/association-saudi-arabia/navayugam-857880"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-party-red"
              >
                Marunadan Malayalee
              </a>
            </p>
          </article>
        </section>

        <section id="facebook" className="border-y-2 border-party-gold/40 bg-party-red/5 px-6 py-16 text-center">
          <h2 className="flex items-center justify-center gap-3 text-2xl font-bold text-party-red">
            <Star className="h-6 w-6 text-party-red" />
            Latest Updates <span className="font-malayalam text-xl">| അപ്ഡേറ്റുകൾ</span>
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 bg-party-gold" />
          <div className="mx-auto mt-6 max-w-md overflow-hidden rounded-lg border-2 border-party-red/20 bg-white shadow-sm">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnavayugam.dammam&tabs=timeline&width=400&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              width="100%"
              height="600"
              style={{ border: "none", overflow: "auto", display: "block" }}
              scrolling="yes"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
          <a
            href="https://www.facebook.com/navayugam.dammam"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-party-red hover:underline"
          >
            Visit our Facebook Page →
          </a>
        </section>

        <section id="contact" className="border-t-4 border-party-gold bg-party-red px-6 py-16 text-center">
          <Star className="mx-auto mb-4 h-10 w-10 text-party-gold" />
          <h2 className="text-2xl font-bold text-party-ivory">
            Contact <span className="font-malayalam text-xl">| ബന്ധപ്പെടുക</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-party-ivory/90">
            Dammam, Saudi Arabia
          </p>
        </section>
      </main>

      <footer className="border-t-4 border-party-gold bg-party-red-dark px-6 py-8 text-center text-sm text-party-ivory/80">
        © {new Date().getFullYear()} Navayugam Samskarika Vedi
      </footer>
    </div>
  );
}
