export default function OpenAISetting() {
  // 对话模型
  const ChatModelMap: Map<string, string[]> = new Map();
  ChatModelMap.set('ChatGPT-4o', ['chatgpt-4o-latest']);
  ChatModelMap.set('GPT-4.1', ['gpt-4.1', 'gpt-4.1-2025-04-14']);
  ChatModelMap.set('GPT-4.1 mini', ['gpt-4.1-mini', 'gpt-4.1-mini-2025-04-14']);
  ChatModelMap.set('GPT-4.1 nano', ['gpt-4.1-nano', 'gpt-4.1-nano-2025-04-14']);
  ChatModelMap.set('GPT-4o', [
    'gpt-4o',
    'gpt-4o-2024-11-20',
    'gpt-4o-2024-08-06',
    'gpt-4o-2024-05-13'
  ]);
  ChatModelMap.set('GPT-4o-mini', ['gpt-4o-mini', 'gpt-4o-mini-2024-07-18']);
  ChatModelMap.set('o4-mini', ['o4-mini', 'o4-mini-2025-04-16']);
  ChatModelMap.set('o3', ['o3', 'o3-2025-04-16']);
  ChatModelMap.set('o3-mini', ['o3-mini', 'o3-mini-2025-01-31']);
  ChatModelMap.set('o1', ['o1', 'o1-2024-12-17', 'o1-preview', 'o1-preview-2024-09-12']);
  ChatModelMap.set('o1-mini', ['o1-mini', 'o1-mini-2024-09-12']);
  ChatModelMap.set('o1-pro', ['o1-pro', 'o1-pro-2025-03-19']);
  ChatModelMap.set('GPT-4', ['gpt-4', 'gpt-4-0613', 'gpt-4-0314']);
  ChatModelMap.set('GPT-4 Turbo', [
    'gpt-4-turbo',
    'gpr-4-turbo-preview',
    'gpt-4-0125-preiview',
    'gpt-4-1106-vision-preview'
  ]);
  ChatModelMap.set('GPT-3.5 Turbo', [
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-0125',
    'gpt-3.5-turbo-1106',
    'gpt-3.5-turbo-instruct'
  ]);

  // 嵌入模型
  const EmbeddingModelMap: Map<string, string[]> = new Map();
  EmbeddingModelMap.set('text-embedding-3-small', ['text-embedding-3-small']);
  EmbeddingModelMap.set('text-embedding-3-large', ['text-embedding-3-large']);
  EmbeddingModelMap.set('text-embedding-ada-002', ['text-embedding-ada-002']);

  const settings = [
    {
      title: '接口地址',
      descp: '除默认地址外，必须包含 http(s)://',
      value: (
        <input
          className="border0 bg1 rounded-lg border p-2 text-center text-sm"
          placeholder="https://api.openai.com"
          defaultValue={'/api/openai'}
        ></input>
      )
    },
    {
      link: 'https://platform.openai.com/api-keys',
      title: 'API Key',
      descp: '使用 OpenAI API Key 开始对话',
      value: (
        <input
          className="border0 bg1 rounded-lg border p-2 text-center text-sm"
          placeholder="OpenAI API Key"
          type="password"
        ></input>
      )
    },

    {
      link: 'https://platform.openai.com/docs/models',
      title: '对话模型（model）',
      descp: '选择使用的对话模型',
      value: (
        <select id="countries" className="border0 bg1 rounded-lg border p-2 text-center text-sm">
          {Array.from(ChatModelMap).map(([label, models]) => (
            <optgroup key={label} label={label}>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      )
    }
  ];
  return (
    <>
      {settings.map((item) => (
        <div
          key={item.title}
          className="border0 flex flex-row items-center justify-between px-5 py-3"
        >
          <div>
            <div
              className={
                'text-base' +
                (item.link
                  ? ' text-my-primary dark:text-my-dark-primary cursor-pointer underline underline-offset-2'
                  : '')
              }
            >
              {item.link ? (
                <a target="_blank" href={item.link}>
                  {item.title}
                </a>
              ) : (
                item.title
              )}
            </div>
            <div className="text-my-text2 dark:text-my-darktext2 text-xs">{item.descp}</div>
          </div>
          <div className="flex items-center">{item.value}</div>
        </div>
      ))}
    </>
  );
}
