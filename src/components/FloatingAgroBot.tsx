import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, CattleBatch } from '../types/cattle';
import { askAgroBot } from '../services/geminiService';
import { 
  Bot, 
  Send, 
  User, 
  X, 
  Minimize2, 
  Sparkles, 
  MessageSquare
} from 'lucide-react';

interface FloatingAgroBotProps {
  externalQuery?: string;
  onClearExternalQuery?: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddToCartFromBot?: (batch: CattleBatch, heads: number) => void;
  batches?: CattleBatch[];
}

export const FloatingAgroBot: React.FC<FloatingAgroBotProps> = ({
  externalQuery,
  onClearExternalQuery,
  isOpen,
  setIsOpen,
  onAddToCartFromBot: _onAddToCartFromBot,
  batches: _batches,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `### ¡Hola! Soy AgroBot de INNOVAGAN 🐂🌱

Estoy aquí para responder preguntas sobre nuestro ganado de engorde, nutrición con **Forraje Verde Hidropónico (FVH)**, costos y **exportación a Oriente Medio o Caribe**.

¿Cómo puedo ayudarte hoy?`,
      timestamp: 'Ahora',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (externalQuery && externalQuery.trim().length > 0) {
      setIsOpen(true);
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
      if (!isOpen) setHasUnread(true);
    } catch (err) {
      console.error('AgroBot error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'Disculpa, ocurrió un error temporal. Puedes contactar directamente a nuestro equipo comercial por WhatsApp.',
          timestamp: 'Ahora',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed text-slate-800">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h5 key={idx} className="text-sm font-extrabold text-slate-900 mt-1 border-b border-emerald-100 pb-1">
                {line.replace('### ', '')}
              </h5>
            );
          }
          // Markdown table separator (|---|---|)
          if (/^\|[\s-|]+\|$/.test(line.trim())) {
            return null;
          }
          // Markdown table header or row (| col | col |)
          if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
            const cells = line.trim().slice(1, -1).split('|').map((c) => c.trim());
            return (
              <div key={idx} className="flex gap-0 text-[11px] border-b border-emerald-100 last:border-0">
                {cells.map((cell, ci) => (
                  <div
                    key={ci}
                    className={`px-2 py-1 ${ci === 0 ? 'w-44 text-slate-600' : 'flex-1 font-semibold text-slate-900'}`}
                    dangerouslySetInnerHTML={{ __html: formatBoldAndCode(cell) }}
                  />
                ))}
              </div>
            );
          }
          // Blockquote (> text)
          if (line.startsWith('> ')) {
            return (
              <div key={idx} className="border-l-2 border-emerald-400 pl-2 text-slate-600 italic text-[11px]">
                <span dangerouslySetInnerHTML={{ __html: formatBoldAndCode(line.slice(2)) }} />
              </div>
            );
          }
          if (line.startsWith('- ') || line.startsWith('• ')) {
            const clean = line.replace(/^[-•]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-1.5 text-slate-700 pl-1">
                <span className="text-emerald-600 font-bold">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatBoldAndCode(clean) }} />
              </div>
            );
          }
          if (/^\d+\.\s/.test(line)) {
            const num = line.match(/^(\d+\.)\s/)?.[1] || '';
            const rest = line.replace(/^\d+\.\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-1.5 text-slate-700 pl-1">
                <span className="text-emerald-600 font-bold">{num}</span>
                <span dangerouslySetInnerHTML={{ __html: formatBoldAndCode(rest) }} />
              </div>
            );
          }
          if (!line.trim()) {
            return <div key={idx} className="h-0.5" />;
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
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Floating Chat Window */}
      {isOpen ? (
        <div className="w-[92vw] sm:w-[420px] h-[550px] max-h-[85vh] rounded-3xl bg-white border border-emerald-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Top Chat Header */}
          <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-emerald-900 flex items-center justify-center font-black shadow-xs">
                <Bot className="w-5 h-5 text-emerald-800" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <span>AgroBot INNOVAGAN</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h4>
                <p className="text-[11px] text-emerald-200">
                  Asesor Virtual en Ganadería Regenerativa
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
              aria-label="Minimizar chat"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts Ribbon — horizontal scroll so chips are never clipped */}
          <div className="bg-emerald-50/80 border-b border-emerald-100 shrink-0 min-w-0">
            <div
              className="flex flex-nowrap items-center gap-1.5 overflow-x-auto overflow-y-hidden scroll-smooth px-3 py-2"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
            <button
              onClick={() => handleSendMessage('Cotízame 5 novillos Brahman de 420 kg')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold whitespace-nowrap transition shadow-xs"
            >
              🧮 Cotizar Animales
            </button>
            <button
              onClick={() => handleSendMessage('¿Cómo funciona el Forraje Verde Hidropónico (FVH) en la ganancia de peso?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white hover:bg-emerald-100 text-slate-800 hover:text-emerald-900 border border-emerald-200 text-[11px] whitespace-nowrap transition shadow-xs"
            >
              🌱 Nutrición FVH
            </button>
            <button
              onClick={() => handleSendMessage('¿Cuáles son los requisitos de exportación de ganado a Oriente Medio?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white hover:bg-emerald-100 text-slate-800 hover:text-emerald-900 border border-emerald-200 text-[11px] whitespace-nowrap transition shadow-xs"
            >
              🚢 Exportación
            </button>
            <button
              onClick={() => handleSendMessage('¿Qué lotes tienen disponibles y a qué precios?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white hover:bg-emerald-100 text-slate-800 hover:text-emerald-900 border border-emerald-200 text-[11px] whitespace-nowrap transition shadow-xs"
            >
              🐂 Lotes Disponibles
            </button>
            <button
              onClick={() => handleSendMessage('¿Cómo cumplen con la Resolución 0126 de 2022 y la trazabilidad RFID?')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white hover:bg-emerald-100 text-slate-800 hover:text-emerald-900 border border-emerald-200 text-[11px] whitespace-nowrap transition shadow-xs"
            >
              📜 RFID & Normatividad
            </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2 max-w-[88%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs shadow-xs ${
                      isUser
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`p-3 rounded-2xl shadow-xs ${
                      isUser
                        ? 'bg-emerald-600 text-white rounded-tr-none text-xs sm:text-sm'
                        : 'bg-white border border-emerald-100 text-slate-800 rounded-tl-none'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    ) : (
                      renderMessageContent(m.text)
                    )}
                    <span className={`text-[10px] block text-right mt-1 font-mono ${isUser ? 'text-emerald-200' : 'text-slate-400'}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2 max-w-xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="p-2.5 rounded-2xl bg-white border border-emerald-100 text-slate-500 text-xs flex items-center gap-2 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                  <span>Escribiendo respuesta...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-emerald-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe tu consulta sobre ganado o FVH..."
              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition shadow-xs"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl transition shadow-xs"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      ) : (
        /* Floating Launcher Button */
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow-2xl shadow-emerald-600/35 hover:scale-105 transition-all cursor-pointer"
          aria-label="Abrir Asesor Virtual AgroBot"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-200 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-200 rounded-full"></span>
          </div>

          <span className="text-sm tracking-tight font-black pr-1">
            Asesor Virtual AgroBot
          </span>

          {hasUnread && (
            <span className="absolute -top-1 -left-1 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black animate-bounce shadow">
              Nuevo
            </span>
          )}
        </button>
      )}

    </div>
  );
};
