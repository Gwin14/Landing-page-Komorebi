import { featureMatrix, statusLabels } from "@/lib/feature-matrix";

export default function CompatibilityTable() {
  return (
    <div id="matriz" className="compatibility-table-wrap" tabIndex={0} aria-label="Tabela de compatibilidade; use rolagem horizontal em telas pequenas">
      <table className="compatibility-table">
        <caption>Matriz de compatibilidade por plataforma</caption>
        <thead>
          <tr><th scope="col">Recurso</th><th scope="col">iOS</th><th scope="col">Android</th><th scope="col">Condição principal</th></tr>
        </thead>
        <tbody>
          {featureMatrix.map((feature) => (
            <tr key={feature.id}>
              <th scope="row">{feature.title}</th>
              <td><span className={`status status-${feature.ios}`}>{statusLabels[feature.ios]}</span></td>
              <td><span className={`status status-${feature.android}`}>{statusLabels[feature.android]}</span></td>
              <td>{feature.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
