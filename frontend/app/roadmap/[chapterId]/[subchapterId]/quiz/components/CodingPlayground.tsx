"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

interface CodePlaygroundProps {
  initialCode: string;
  language?: string;
  onRun: (code: string) => void;
  isAnswered?: boolean;
  isSubmitting?: boolean;
}

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export function CodePlayground({ initialCode, onRun, isAnswered, isSubmitting = false }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);

  useEffect(() => {
    import("@monaco-editor/react").then(({ loader }) =>
      loader.init().then((monaco) => {
        monaco.editor.defineTheme("custom-dark", {
          base: "vs-dark",
          inherit: true,
          rules: [],
          colors: {
            "editor.background": "#1e1b4b",
            "editor.lineHighlightBackground": "#312e81",
          },
        });
      })
    );
  }, []);

  const handleReset = () => setCode(initialCode);

  return (
    <div style={{ height: "400px" }} className="relative">
      <Editor
        height="100%"
        defaultLanguage="python" 
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="custom-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
      <div className="absolute bottom-2 left-2 flex space-x-2">
        <button 
        onClick={handleReset} 
        className="p-2 bg-gray-700 text-white rounded"
        disabled={isAnswered || isSubmitting}
        >
          Reset
        </button>
        <button
          onClick={() => onRun(code)}
          className="p-2 bg-indigo-700 text-white rounded"
          disabled={isAnswered || isSubmitting}
        >
          Run
        </button>
      </div>
    </div>
  );
}
