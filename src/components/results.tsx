import { RoboflowResponse } from "@/types/roboflow-response";

interface ResultsProps {
  response: RoboflowResponse | null;
  loading: boolean;
}

const placas = {
  "r1-parada-obrigatoria": "R1 - Parada Obrigatória",
  "r3-sentido-proibido": "R3 - Sentido Proibido",
  "r4a-proibido-virar-esquerda": "R4a - Proibido Virar à Esquerda",
  "r4b-proibido-virar-direita": "R4b - Proibido Virar à Direita",
  "r5a-proibido-retornar-esquerda": "R5a - Proibido Retornar à Esquerda",
  "r24a-sentido-circulacao-via": "R24a - Sentido de Circulação da Via / Pista",
  "r28-duplo-sentido-circulacao": "R28 - Duplo Sentido de Circulação",
};

const Results = ({ response, loading }: ResultsProps) => {
  if (loading) {
    return (
      <div className="min-h-fit h-full flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!response) {
    return (
      <div className="min-h-fit h-full flex items-center justify-center">
        Resultado não disponível
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-wrap max-w-2xl min-h-fit h-full text-justify justify-center">
      <p>Tempo Decorrido: {response.time}</p>
      <p>
        Placa(s):{" "}
        {response.predicted_classes.length === 1
          ? response.predicted_classes[0]
          : // @ts-expect-error type error
            response.predicted_classes.map((item) => placas[item] + ",")}
      </p>
      <p>
        Confiança:{" "}
        {response.predicted_classes.length === 1
          ? (
              response.predictions[response.predicted_classes[0]].confidence *
              100
            ).toFixed(2) + "%"
          : response.predicted_classes.map((item) => (
              <p>
                {/* @ts-expect-error type error */}
                {placas[item]}:{" "}
                {(response.predictions[item].confidence * 100).toFixed(2)}%
              </p>
            ))}
      </p>
    </div>
  );
};

export { Results };
