在 Next.js 中，你可以使用 `getServerSideProps` 或 `getInitialProps` 在服务器端获取数据。然而，原生的 `fetch` API 并不支持直接读取 response 中的 `set-cookie` 头部，这是由于安全和隐私原因。

如果你需要在服务器端获取 `set-cookie`，你可能需要使用一些第三方库，比如 `axios` 或 `node-fetch`，它们提供了更多的功能，包括访问原始的 HTTP 响应头部。

以下是一个使用 `axios` 的例子：

```jsx
import axios from 'axios';

export async function getServerSideProps(context) {
  const res = await axios.get('https://example.com/api/data', { withCredentials: true });

  // 获取所有的set-cookie头部
  const setCookieHeader = res.headers['set-cookie'];

  // TODO: 处理cookies，例如存储在session中，或者发送到客户端

  return {
    props: {
      // 在页面组件中使用你的数据
    }
  };
}
```

注意，你需要设置 `withCredentials: true` 以便发送 cookies 到服务器。然后，你可以从响应头部中获取 `set-cookie`。

然后你可以处理这些 cookies，例如存储在 session 中，或者发送到客户端。

请注意，这只是一个基本的例子。在实际使用中，你可能需要处理更多的细节，例如处理多个 `set-cookie` 头部，或者处理 cookies 的安全问题。
