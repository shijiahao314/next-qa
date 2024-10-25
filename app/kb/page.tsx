'use client';

class KB {
  name!: string;
  status!: string;
}

export default function KBPage() {
  let kbs: KB[] = [
    {
      name: 'kb1',
      status: 'indexing'
    },
    {
      name: 'kb2',
      status: 'ready'
    },
    {
      name: 'kb3',
      status: ''
    }
  ];
  return (
    <>
      <title>KB-知识库管理</title>
      <div className="absolute flex h-full w-full flex-col overflow-hidden p-8 md:relative md:p-16">
        <label className="text-4xl">知识库管理</label>
        <div className="relative m-4 overflow-x-auto">
          <table className="w-full text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">知识库</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {kbs.map((kb) => (
                <tr
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={kb.name}
                >
                  <td className="px-6 py-4 font-medium">{kb.name}</td>
                  <td className="px-6 py-4">{kb.status}</td>
                  <td className="px-6 py-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <label className="text-4xl">知识库管理</label>
        <div className="relative m-4 overflow-x-auto">
          <table className="w-full text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">知识库</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {kbs.map((kb) => (
                <tr
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={kb.name}
                >
                  <td className="px-6 py-4 font-medium">{kb.name}</td>
                  <td className="px-6 py-4">{kb.status}</td>
                  <td className="px-6 py-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
