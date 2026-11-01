import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types/cattle';
import { askAgroBot } from '../services/geminiService';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  RotateCcw
} from 'lucide-react';

interface AgroBotChatProps {
  externalQuery?: string;
  onClearExternalQuery?: () => void;
  onNavigateToTab: (tab: 'catalog' | 'iot' | 'roi' | 'sustainability') => void;
}

export const AgroBotChat: React.FC<AgroBotChatProps> = ({
  externalQuery,
  onClearExternalQuery,
  onNavigateToTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `### ¡Bienvenido al Asistente AgTech INNOVAGAN! 🐂🌱

Soy tu consultor especializado en **ganadería regenerativa de alta eficiencia**, nutrición con **Forraje Verde Hidropónico (FVH)**, fertirriego guiado por **sensores TDR**, pastoreo rotacional con **cercas solares** y **cotización de lotes** para exportación (Oriente Medio / Caribe) o ceba nacional.

¿En qué puedo orientarte hoy? Puedes escribir libremente tu consulta o seleccionar una de las preguntas frecuentes abajo.`,
      timestamp: 'Ahora',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (externalQuery && externalQuery.trim().length > 0) {
      handleSendMessage(externalQuery);
      if (onClearExternalQuery) onClearExternalQuery();
    }
  }, [externalQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome-1')
        .map((m) => ({
          role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
          text: m.text,
        }));

      const botReply = await askAgroBot(text, history);

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: botReply,
        timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error generating AgroBot response:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'Disculpa, ha ocurrido un error al conectar con el servidor de IA de AgroBot. Por favor verifica tu clave o intenta nuevamente en unos segundos.',
          timestamp: 'Ahora',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: `### Sesión Reiniciada 🔄

¿Tienes una nueva consulta sobre nutrición FVH, monitoreo de suelos, rentabilidad de ceba o requerimientos para exportación? Con gusto te asesoro.`,
        timestamp: 'Ahora',
      },
    ]);
  };

  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-2 text-sm leading-relaxed text-slate-800">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h5 key={idx} className="text-base font-extrabold text-slate-900 mt-2 border-b border-emerald-100 pb-1">
                {line.replace('### ', '')}
              </h5>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h4 key={idx} className="text-lg font-bold text-slate-900 mt-3 border-b border-emerald-200 pb-1">
                {line.replace('## ', '')}
              </h4>
            );
          }
          if (line.startsWith('- ') || line.startsWith('• ')) {
            const clean = line.replace(/^[-•]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-2 text-slate-700">
                <span className="text-emerald-600 font-bold">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatBoldAndCode(clean) }} />
              </div>
            );
          }
          if (/^\d+\.\s/.test(line)) {
            const num = line.match(/^(\d+\.)\s/)?.[1] || '';
            const rest = line.replace(/^\d+\.\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-2 text-slate-700">
                <span className="text-emerald-600 font-bold">{num}</span>
                <span dangerouslySetInnerHTML={{ __html: formatBoldAndCode(rest) }} />
              </div>
            );
          }
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: formatBoldAndCode(line) }} />
          );
        })}
      </div>
    );
  };

  const formatBoldAndCode = (str: string) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-600">$1</em>');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4 text-emerald-600" />
            <span>Consultoría AgTech Inteligente</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Asesor Virtual AgroBot INNOVAGAN
          </h2>
          <p className="text-slate-700 text-sm mt-1 max-w-2xl">
            Simulador y asesor técnico para diseño de <strong>módulos FVH</strong>, calibración de 
            <strong> telemetría TDR</strong>, protocolos sanitarios ICA para exportación a 
            <strong> Oriente Medio / Caribe</strong> y cotización de lotes.
          </p>
        </div>

        <button
          onClick={handleResetChat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar Chat</span>
        </button>
      </div>

      {/* Quick Prompt Pills Bar — horizontal scroll to avoid clipped chips */}
      <div className="min-w-0">
        <div
          className="flex flex-nowrap items-center gap-2 text-xs overflow-x-auto overflow-y-hidden scroll-smooth pb-1"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
        <span className="text-slate-600 font-semibold flex items-center gap-1 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Consultas Frecuentes:
        </span>
        <button
          onClick={() => handleQuickPrompt('¿Cómo implementar Forraje Verde Hidropónico (FVH) en mi finca y cuál es el ahorro de agua?')}
          className="shrink-0 px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-emerald-200 transition shadow-xs whitespace-nowrap"
        >
          🌱 Implementar FVH & Ahorro de Agua
        </button>
        <button
          onClick={() => handleQuickPrompt('¿Cuáles son los requisitos sanitarios ICA para exportar ganado en pie a Oriente Medio y el Caribe?')}
          className="shrink-0 px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-emerald-200 transition shadow-xs whitespace-nowrap"
        >
          🚢 Requisitos de Exportación ICA
        </button>
        <button
          onClick={() => handleQuickPrompt('¿Cómo operan los sensores TDR para automatizar las electroválvulas de fertirriego?')}
          className="shrink-0 px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-emerald-200 transition shadow-xs whitespace-nowrap"
        >
          📡 Sondas TDR & Fertirriego
        </button>
        <button
          onClick={() => handleQuickPrompt('¿Cómo cumple INNOVAGAN con la Resolución 0126 de 2022 y los ODS?')}
          className="shrink-0 px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-emerald-200 transition shadow-xs whitespace-nowrap"
        >
          📜 Resolución 0126 & ODS
        </button>
        <button
          onClick={() => handleQuickPrompt('Quiero una cotización de los lotes bovinos disponibles en el catálogo')}
          className="shrink-0 px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-emerald-200 transition shadow-xs whitespace-nowrap"
        >
          🐂 Cotizar Lotes Disponibles
        </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="rounded-2xl bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 flex flex-col h-[540px] overflow-hidden">
        
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/60">
          {messages.map((message) => {
            const isUser = message.sender === 'user';

            return (
              <div
                key={message.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs shadow-xs ${
                    isUser
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl p-4 transition-all shadow-xs ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-white border border-emerald-100 text-slate-800 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1.5 gap-4">
                    <span className={`font-semibold ${isUser ? 'text-emerald-100' : 'text-emerald-800'}`}>
                      {isUser ? 'Tú (Productor / Inversionista)' : 'AgroBot INNOVAGAN • Asesor AgTech'}
                    </span>
                    <span className={`font-mono text-[10px] ${isUser ? 'text-emerald-200' : 'text-slate-400'}`}>
                      {message.timestamp}
                    </span>
                  </div>

                  {isUser ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  ) : (
                    renderMessageContent(message.text)
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-md">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-xs">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-white border border-emerald-100 text-slate-600 text-xs flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>Procesando consulta ganadera con IA...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-white border-t border-emerald-100 flex items-center gap-3"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pregunta a AgroBot sobre protocolos de engorde, FVH, telemetría o exportación..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs transition"
          />

          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white flex items-center gap-2 shadow-md shadow-emerald-600/20 transition"
          >
            <span>Enviar</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
