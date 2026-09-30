import { Code2, Database, GitBranch, Server } from 'lucide-react';
import { useState } from 'react';

const layers = [
  { id: 'ui', label: 'React UI', detail: 'Responsive TypeScript interfaces with accessible interactions and reliable API states.', icon: Code2 },
  { id: 'api', label: 'Spring API', detail: 'Secure REST contracts, validation, service boundaries, and maintainable domain logic.', icon: Server },
  { id: 'data', label: 'Data layer', detail: 'Relational modeling, migrations, query debugging, indexing, and persistence design.', icon: Database },
  { id: 'delivery', label: 'Delivery', detail: 'Git workflows and Azure Pipelines carrying one tested artifact across environments.', icon: GitBranch },
];

export function Architecture() {
  const [active, setActive] = useState(1);
  const selected = layers[active];
  return (
    <div className="architecture" aria-label="Interactive system blueprint">
      <div className="architecture__topline"><span>System blueprint</span><span>04 layers</span></div>
      <div className="architecture__flow">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return <button key={layer.id} className={active === index ? 'layer is-active' : 'layer'} onClick={() => setActive(index)} aria-pressed={active === index}>
            <span className="layer__index">0{index + 1}</span><Icon size={24} /><strong>{layer.label}</strong>
          </button>;
        })}
      </div>
      <div className="architecture__detail" aria-live="polite"><span>Selected / {selected.label}</span><p>{selected.detail}</p></div>
    </div>
  );
}
