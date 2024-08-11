import { Results } from "@/components/results";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { env } from "@/lib/env";
import { RoboflowResponse } from "@/types/roboflow-response";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<RoboflowResponse | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onloadend = () => {
      // @ts-expect-error type error
      const base64String = reader.result.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );
      setFile(base64String);
      setPreview(base64String);
    };
  };

  const handleSearch = () => {
    if (file) {
      setLoading(true);
      setResponse(null);

      api({
        method: "post",
        params: {
          api_key: env.VITE_APP_ROBLOFOW_API_KEY,
        },
        data: file,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => {
          toast.success("Sucesso");
          setResponse(res.data);
          setFile(null);
        })
        .catch((err) => {
          toast.info("Erro");
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.info("Selecione um arquivo");
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen max-w-screen flex gap-2 justify-center p-4">
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="row-span-2 col-span-1 flex min-h-96 h-full self-center flex-col items-center gap-2 justify-center rounded-md border border-dashed p-2">
          <p className="font-semibold text-3xl">
            Reconhecimento de Placas de Trânsito
          </p>
          <div className="flex items-center gap-2">
            <Input
              disabled={loading}
              onChange={handleFileChange}
              type="file"
              ref={fileInputRef}
              accept=".png, .jpeg, .jpg"
            />
            <Button
              disabled={loading}
              size="icon"
              className="px-2"
              onClick={handleClearFile}
            >
              <Trash2 />
            </Button>
            <Button disabled={loading} onClick={handleSearch}>
              Buscar
            </Button>
          </div>
        </div>
        <div className="col-span-1 row-span-1 rounded-md border border-dashed p-2 flex items-center justify-center min-h-fit h-full">
          {preview ? (
            <img
              src={`data:image/png;base64,${preview}`}
              alt="Imagem carregada"
              className="max-w-96 w-full max-h-full h-full rounded-md"
            />
          ) : (
            <p>Imagem não disponível</p>
          )}
        </div>
        <div className="col-span-1 row-span-1 rounded-md border border-dashed p-2">
          <Results response={response} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export { App };
