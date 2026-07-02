import { useNavigate } from 'react-router-dom';

const CARDS = [
  { to: '/nuevo', label: 'Nuevo', description: 'Crear un presupuesto' },
  { to: '/historico', label: 'Histórico', description: 'Presupuestos anteriores' },
  { to: '/seguimiento', label: 'Seguimiento', description: 'Leads sin respuesta' },
];

function CardContent({ label, description, arrowColor, labelColor, descriptionColor }) {
  return (
    <>
      <span className="block" style={{ fontSize: 18, color: arrowColor }}>
        →
      </span>
      <div>
        <span
          className="block uppercase"
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', color: labelColor }}
        >
          {label}
        </span>
        <span className="mt-1 block" style={{ fontSize: 11, color: descriptionColor }}>
          {description}
        </span>
      </div>
    </>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="flip-card" style={{ marginBottom: 64 }}>
        <div className="flip-card-inner">
          <div
            className="flip-card-face flex items-center justify-center bg-black text-white"
            style={{ fontSize: 68, fontWeight: 900, letterSpacing: '-0.03em' }}
          >
            TABLADA
          </div>
          <div
            className="flip-card-face flip-card-face--back flex items-center justify-center bg-white text-black"
            style={{ fontSize: 68, fontWeight: 900, letterSpacing: '-0.03em' }}
          >
            TABLADA
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 200px)', gap: 12 }}>
        {CARDS.map((card) => (
          <button
            key={card.to}
            type="button"
            onClick={() => navigate(card.to)}
            className="home-card-flip text-left"
          >
            <div className="home-card-flip-inner">
              <div
                className="home-card-face flex flex-col justify-between"
                style={{
                  background: '#000000',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '20px 18px',
                }}
              >
                <CardContent
                  label={card.label}
                  description={card.description}
                  arrowColor="rgba(255,255,255,0.3)"
                  labelColor="#ffffff"
                  descriptionColor="rgba(255,255,255,0.35)"
                />
              </div>
              <div
                className="home-card-face home-card-face--back flex flex-col justify-between"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.1)',
                  padding: '20px 18px',
                }}
              >
                <CardContent
                  label={card.label}
                  description={card.description}
                  arrowColor="rgba(0,0,0,0.3)"
                  labelColor="#000000"
                  descriptionColor="rgba(0,0,0,0.35)"
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      <p
        className="uppercase"
        style={{ marginTop: 56, fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em' }}
      >
        Muebles de diseño · Buenos Aires
      </p>
    </div>
  );
}

export default Home;
