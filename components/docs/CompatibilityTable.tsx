import { getTranslator } from "@/lib/i18n/translate";
import { type Locale } from "@/lib/i18n/routing";
import { featureMatrix, statusLabels } from "@/lib/feature-matrix";

export default function CompatibilityTable({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <div
      id="matriz"
      className="compatibility-table-wrap"
      tabIndex={0}
      aria-label={t("Tabela de compatibilidade; use rolagem horizontal em telas pequenas")}
    >
      <table className="compatibility-table">
        <caption>{t("Matriz de compatibilidade por plataforma")}</caption>
        <thead>
          <tr>
            <th scope="col">{t("Recurso")}</th>
            <th scope="col">iOS</th>
            <th scope="col">Android</th>
            <th scope="col">{t("Condição principal")}</th>
          </tr>
        </thead>
        <tbody>
          {featureMatrix.map((feature) => (
            <tr key={feature.id}>
              <th scope="row">{t(feature.title)}</th>
              <td>
                <span className={`status status-${feature.ios}`}>
                  {t(statusLabels[feature.ios])}
                </span>
              </td>
              <td>
                <span className={`status status-${feature.android}`}>
                  {t(statusLabels[feature.android])}
                </span>
              </td>
              <td>{t(feature.condition)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
