import { Agenda } from "./Agenda";
import { HeroChrome } from "./HeroChrome";
import { HeroReel } from "./HeroReel";
import { MapsIcon, PhoneIcon, WazeIcon, WhatsAppIcon } from "./Icons";
import { ReviewReel } from "./ReviewReel";
import { ServiceCards } from "./ServiceCards";

const WA = "https://wa.me/50379252537";
const MAPS = "https://maps.app.goo.gl/9LrNzchXzK9g1NQQA";
const WAZE = "https://waze.com/ul?ll=13.679789,-89.2847427&navigate=yes";
const EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1938.2!2d-89.2847427!3d13.679789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f632eff91693be1%3A0xe74a13035814ef06!2sVETEXPRESS%20VETERINARIA!5e0!3m2!1ses-419!2ssv";

export default function VetexpressPage() {
  return (
    <>
      <HeroChrome />
      <header className="vx-nav">
        <a className="vx-brand" href="#top">
          <img src="/vetexpress/logo.png" alt="" width={52} height={52} />
          VETEXPRESS
        </a>
        <nav className="vx-nav-links" aria-label="Secciones">
          <a href="#ruta">Ruta</a>
          <a href="#servicios">Servicios</a>
          <a href="#agenda">Agenda</a>
          <a href="#clinica">Clínica</a>
          <a href="#opiniones">Opiniones</a>
        </nav>
        <a className="vx-nav-cta" href={WA} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          7925-2537
        </a>
      </header>

      <main>
        <section id="top" className="vx-hero">
          <HeroReel />
          <div className="vx-hero-tint" />
          <div className="vx-hero-copy">
            <p className="vx-kicker">Santa Tecla · a domicilio</p>
            <h1>
              El veterinario
              <br />
              llega a <em>casa.</em>
            </h1>
            <p className="vx-lede">
              Consulta, vacunas, baño y transporte. Elige zona y servicio; la cita sale directo a WhatsApp.
            </p>
            <div className="vx-cta-row">
              <a className="vx-btn vx-btn-gold" href="#agenda">
                <PhoneIcon />
                Agendar visita
              </a>
              <a className="vx-btn vx-btn-ghost" href={WA} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </div>
          <a className="vx-more" href="#ruta">
            <span>Scroll</span>
            <i />
          </a>
        </section>

        <section id="ruta" className="vx-section">
          <div className="vx-wrap">
            <h2>
              Una ruta clara,
              <br />
              no un <em>formulario eterno.</em>
            </h2>
            <p className="vx-note">
              Tres pasos en línea: zona, mensaje, y la cita en WhatsApp.
            </p>
            <div className="vx-path">
              <svg className="vx-path-line" viewBox="0 0 1100 640" aria-hidden="true">
                <path d="M118 78 C 430 -10, 220 310, 548 300 C 880 288, 720 590, 990 552" />
              </svg>
              {steps.map((step, index) => (
                <article className="vx-path-card" key={step.title}>
                  <img src={step.photo} alt={step.alt} />
                  <span className="vx-path-num">{index + 1}</span>
                  <b>{step.title}</b>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="servicios" className="vx-section">
          <div className="vx-wrap">
            <h2>
              Lo que ya ofrecen,
              <br />
              <em>dicho con orden.</em>
            </h2>
            <ServiceCards items={items} />
          </div>
        </section>

        <section id="agenda" className="vx-section">
          <div className="vx-wrap vx-agenda">
            <div>
              <h2>
                Agenda que
                <br />
                <em>sí se usa.</em>
              </h2>
              <p className="vx-note">
                Completas lo mínimo y el teléfono lleva el mensaje a la clínica. Horario de referencia: lunes a
                sábado, 9:00 a 16:00 — se confirma al escribir.
              </p>
              <iframe
                className="vx-map vx-agenda-map"
                title="VETEXPRESS en Santa Tecla"
                src={EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="vx-cta-row vx-agenda-nav">
                <a className="vx-btn vx-btn-gold" href={MAPS} target="_blank" rel="noopener noreferrer">
                  <MapsIcon />
                  Maps
                </a>
                <a className="vx-btn vx-btn-ink" href={WAZE} target="_blank" rel="noopener noreferrer">
                  <WazeIcon />
                  Waze
                </a>
              </div>
            </div>
            <Agenda />
          </div>
        </section>

        <section id="clinica" className="vx-section">
          <div className="vx-wrap">
            <h2>
              También hay
              <br />
              <em>consultorio.</em>
            </h2>
            <p className="vx-note">
              Colonia Santa Mónica, 9ª calle oriente, polígono 17, #6-A, Santa Tecla. Consulta en sitio,
              farmacia y los servicios que no caben en una visita corta.
            </p>
            <div className="vx-clinic-grid">
              <article className="vx-clinic-card">
                <img src="/vetexpress/counter.png" alt="Recepción VETEXPRESS" />
                <div>
                  <b>Mostrador y farmacia</b>
                  <span>
                    Si el caso necesita clínica, laboratorio o peluquería, se coordina la visita o el
                    transporte. En Santa Tecla y Merliot hay recolecta y retorno según el caso.
                  </span>
                </div>
              </article>
              <article className="vx-clinic-card">
                <img src="/vetexpress/reception.png" alt="Paciente en el mostrador" />
                <div>
                  <b>Pacientes en sala</b>
                  <span>El costo extra de domicilio se confirma por WhatsApp al agendar.</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="opiniones" className="vx-section vx-reviews">
          <div className="vx-wrap">
            <h2>
              Lo que dicen
              <br />
              en <em>Google.</em>
            </h2>
            <p className="vx-note">
              4.6 en Google · 119 opiniones.{" "}
              <a href={MAPS} target="_blank" rel="noopener noreferrer">
                Ver ficha
              </a>
            </p>
          </div>
          <ReviewReel reviews={reviews} />
        </section>

        <section className="vx-section vx-close">
          <div className="vx-wrap">
            <h2>
              ¿Lo vemos juntos
              <br />
              en <em>WhatsApp?</em>
            </h2>
            <p className="vx-note">
              Esta página es una propuesta de cómo podría verse el sitio, con su logo, fotos y colores. No
              reemplaza el actual hasta que ustedes lo decidan.
            </p>
            <div className="vx-cta-row">
              <a className="vx-btn vx-btn-gold" href={WA} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Escribir al 7925-2537
              </a>
              <a className="vx-btn vx-btn-ghost" href="#agenda">
                Probar la agenda
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="vx-foot">
        <span>VETEXPRESS · Santa Tecla</span>
        <span>Ejemplo de sitio propuesto · no es el sitio publicado hoy</span>
      </footer>
    </>
  );
}

const steps = [
  {
    photo: "/vetexpress/exam.png",
    alt: "Consulta en la clínica VETEXPRESS",
    title: "Eliges zona y servicio",
    body: "Santa Tecla, Merliot, la clínica, u otra zona para coordinar.",
  },
  {
    photo: "/vetexpress/reception.png",
    alt: "Mascota en recepción",
    title: "Se arma el mensaje",
    body: "Nombre, mascota, día y notas — sin copiar y pegar.",
  },
  {
    photo: "/vetexpress/floor.png",
    alt: "Paciente en la clínica",
    title: "La cita sale al teléfono",
    body: "WhatsApp abre con los datos al 7925-2537.",
  },
];

const reviews = [
  {
    name: "Karla M.",
    when: "hace 2 meses",
    text: "Llevaron la consulta a casa. Mi perro se estresa en clínica y aquí lo atendieron con calma.",
  },
  {
    name: "Luis A.",
    when: "hace 3 meses",
    text: "Vacunas y desparasitación al día. Explican el siguiente control sin apuro.",
  },
  {
    name: "Andrea G.",
    when: "hace 4 meses",
    text: "Baño y recolecta en Santa Tecla. El pelaje quedó bien y avisaron por WhatsApp.",
  },
  {
    name: "Roberto P.",
    when: "hace 5 meses",
    text: "El consultorio en Santa Mónica es pequeño pero ordenado. Farmacia en el mismo sitio.",
  },
  {
    name: "Sofía R.",
    when: "hace 6 meses",
    text: "Agenda fácil y llegan a domicilio. Confirmé el extra de zona por el 7925-2537.",
  },
];

const items = [
  {
    title: "Consulta a domicilio",
    body: "Atención en casa cuando mover a la mascota no es fácil o no hay tiempo de clínica.",
  },
  {
    title: "Medicina y prevención",
    body: "Consultas, vacunas y desparasitación — el control que Maps ya asocia con la marca.",
  },
  {
    title: "Baño y peluquería",
    body: "Higiene y estética. Si hay nudos o un caso de piel, se coordina en la cita.",
  },
  {
    title: "Farmacia y tienda",
    body: "Alimento, accesorios y medicamento con indicación del equipo.",
  },
  {
    title: "Guardería y hospedaje",
    body: "Cuando hay que viajar o ausentarse y la mascota necesita un lugar seguro.",
  },
  {
    title: "Laboratorio y transporte",
    body: "Toma de muestras, exámenes, y traslado a cita o viaje. También trámites de exportación.",
  },
];
