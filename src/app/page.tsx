const nav = [
  { en: "Home", ml: "ഹോം", href: "#home" },
  { en: "About", ml: "ഞങ്ങളെക്കുറിച്ച്", href: "#about" },
  { en: "Leadership", ml: "നേതൃത്വം", href: "#leadership" },
  { en: "News", ml: "വാർത്തകൾ", href: "#news" },
  { en: "Contact", ml: "ബന്ധപ്പെടുക", href: "#contact" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-10 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/90">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <span className="text-lg font-semibold text-black dark:text-zinc-50">
            Navayugam <span className="font-malayalam">നവയുഗം</span>
          </span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-black dark:hover:text-white">
                  {item.en}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex flex-1 flex-col">
        <section id="home" className="border-b border-black/10 bg-white px-6 py-20 text-center dark:border-white/10 dark:bg-black">
          <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Navayugam Samskarika Vedi
          </h1>
          <p className="font-malayalam mt-2 text-3xl text-black dark:text-zinc-50">
            നവയുഗം സാംസ്‌ക്കാരികവേദി
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A cultural forum for the Malayali community in Saudi Arabia,
            based in Dammam, working through a central committee.
          </p>
          <p className="font-malayalam mx-auto mt-2 max-w-xl text-base leading-8 text-zinc-500 dark:text-zinc-400">
            സൗദി അറേബ്യയിലെ മലയാളി സമൂഹത്തിനായുള്ള സാംസ്‌ക്കാരിക വേദി, ദമ്മാം
            കേന്ദ്രമായി പ്രവർത്തിക്കുന്നു.
          </p>
        </section>

        <section id="about" className="mx-auto w-full max-w-4xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            About Us <span className="font-malayalam text-xl">| ഞങ്ങളെക്കുറിച്ച്</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Navayugam Samskarika Vedi is a community and cultural organisation
            of expatriate Malayalis in Saudi Arabia. Its central committee
            speaks up on issues affecting the community — most recently
            raising concerns over air connectivity for expatriates from
            South Kerala.
          </p>
          <p className="font-malayalam mt-4 max-w-2xl text-base leading-8 text-zinc-500 dark:text-zinc-400">
            സൗദി അറേബ്യയിലെ പ്രവാസി മലയാളികളുടെ ഒരു സാംസ്‌ക്കാരിക കൂട്ടായ്മയാണ്
            നവയുഗം സാംസ്‌ക്കാരികവേദി. പ്രവാസി സമൂഹത്തെ ബാധിക്കുന്ന വിഷയങ്ങളിൽ
            കേന്ദ്രകമ്മിറ്റി നിലപാട് അറിയിക്കാറുണ്ട്.
          </p>
        </section>

        <section id="leadership" className="border-t border-black/10 bg-white px-6 py-16 dark:border-white/10 dark:bg-black">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
              Central Committee <span className="font-malayalam text-xl">| കേന്ദ്രകമ്മിറ്റി</span>
            </h2>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-black/10 p-5 dark:border-white/10">
                <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  President
                </dt>
                <dd className="mt-1 text-lg font-semibold text-black dark:text-zinc-50">
                  Jamal Vilyappally
                </dd>
                <dd className="font-malayalam text-zinc-500 dark:text-zinc-400">
                  ജമാൽ വില്യാപ്പള്ളി
                </dd>
              </div>
              <div className="rounded-lg border border-black/10 p-5 dark:border-white/10">
                <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  General Secretary
                </dt>
                <dd className="mt-1 text-lg font-semibold text-black dark:text-zinc-50">
                  M. A. Vahid Karayara
                </dd>
                <dd className="font-malayalam text-zinc-500 dark:text-zinc-400">
                  എം.എ. വാഹിദ് കാര്യറ
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="news" className="mx-auto w-full max-w-4xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            News <span className="font-malayalam text-xl">| വാർത്തകൾ</span>
          </h2>
          <article className="mt-6 rounded-lg border border-black/10 p-6 dark:border-white/10">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              5 August 2026 · Dammam
            </p>
            <h3 className="mt-2 text-lg font-semibold text-black dark:text-zinc-50">
              Navayugam calls for resumption of direct Riyadh–Jeddah–Trivandrum flights
            </h3>
            <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Navayugam&rsquo;s central committee has urged Air India Express
              and the Union Ministry of Civil Aviation to restore direct
              flights connecting Riyadh and Jeddah to Thiruvananthapuram
              International Airport. The routes have been suspended since
              October 2025, forcing thousands of expatriates from South
              Kerala to rely on longer, costlier journeys via Kochi,
              Kozhikode, Kannur, or transit stops abroad.
            </p>
            <p className="font-malayalam mt-3 text-base leading-8 text-zinc-500 dark:text-zinc-400">
              റിയാദ്, ജിദ്ദ എന്നിവിടങ്ങളിൽ നിന്ന് തിരുവനന്തപുരത്തേക്കുള്ള നേരിട്ടുള്ള
              വിമാന സർവീസുകൾ പുനഃസ്ഥാപിക്കണമെന്ന് നവയുഗം കേന്ദ്രകമ്മിറ്റി
              ആവശ്യപ്പെട്ടു. 2025 ഒക്ടോബർ മുതൽ ഈ സർവീസുകൾ നിർത്തിവച്ചിരിക്കുകയാണ്.
            </p>
            <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
              Source:{" "}
              <a
                href="https://marunadanmalayalee.com/saudi-arabia/association-saudi-arabia/navayugam-857880"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                Marunadan Malayalee
              </a>
            </p>
          </article>
        </section>

        <section id="contact" className="border-t border-black/10 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-black">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            Contact <span className="font-malayalam text-xl">| ബന്ധപ്പെടുക</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Dammam, Saudi Arabia
          </p>
        </section>
      </main>

      <footer className="border-t border-black/10 px-6 py-8 text-center text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
        © {new Date().getFullYear()} Navayugam Samskarika Vedi
      </footer>
    </div>
  );
}
