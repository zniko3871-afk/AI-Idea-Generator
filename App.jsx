import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CreativeMindMap = () => {
  const [inputValue, setInputValue] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [nodes, setNodes] = useState([]); // 存储生成的词语节点

  // 模拟调用 Gemini API 的过程
  const handleSearch = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setIsStarted(true);
      // 这里未来替换为 fetch('/api/gemini')
      const mockNewNodes = [
        { id: 1, zh: '赛博空间', en: 'Cyberspace' },
        { id: 2, zh: '数字孪生', en: 'Digital Twin' },
        { id: 3, zh: '极简主义', en: 'Minimalism' },
      ];
      setNodes(mockNewNodes);
    }
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden font-sans">
      {/* 顶部/右上角 功能区 */}
      <div className="absolute top-6 right-6 z-20">
        <button className="text-sm font-bold bg-black text-white px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition-colors">
          历史记录
        </button>
      </div>

      {/* 词语节点展示区 */}
      <div className="flex justify-center items-center h-full">
        <AnimatePresence>
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, x: (index - 1) * 200, y: -50 }}
              className="absolute cursor-pointer group"
            >
              {/* 圆形底座 */}
              <div className="w-32 h-32 rounded-full bg-white border border-gray-100 shadow-xl flex flex-col items-center justify-center p-4 text-center group-hover:border-yellow-400 transition-all backdrop-blur-md bg-opacity-60">
                <span className="text-black font-bold text-lg">{node.zh}</span>
                <span className="text-gray-400 text-xs mt-1 break-words w-full">{node.en}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 底部胶囊输入框 */}
      <motion.div
        layout
        initial={false}
        animate={{
          bottom: isStarted ? "40px" : "50%",
          transform: isStarted ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(50%)",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="absolute left-1/2 w-full max-w-md px-4"
      >
        <div className="relative flex items-center bg-black rounded-full p-2 shadow-2xl shadow-black/20">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="输入一个词语激发灵感..."
            className="w-full bg-transparent text-white px-6 py-3 outline-none placeholder:text-gray-500"
          />
          <div className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </motion.div>

      {/* 玻璃感装饰（左上角无文字，保持干净） */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default CreativeMindMap;
