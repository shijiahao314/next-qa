export default function DeepSeekSetting() {
  // 对话模型
  const ChatModelMap: Map<string, string[]> = new Map();
  ChatModelMap.set('deepseek', ['deepseek-chat', 'deepseek-reasoner']);

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
          placeholder="https://api.deepseek.com"
          defaultValue={'/api/deepseek'}
        ></input>
      )
    },
    {
      link: 'https://platform.deepseek.com/api_keys',
      title: 'API Key',
      descp: '使用 DeepSeek API Key 开始对话',
      value: (
        <input
          className="border0 bg1 rounded-lg border p-2 text-center text-sm"
          placeholder="DeepSeek API Key"
          type="password"
        ></input>
      )
    },

    {
      link: 'https://api-docs.deepseek.com/zh-cn/quick_start/pricing',
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
        <div key={item.title} className="flex flex-row items-center justify-between px-5 py-3">
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
