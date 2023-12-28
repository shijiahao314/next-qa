'use client';

import { GetChatCards } from '@/app/api/chat';
import ChatCard from '../frame/chatCard';
import { useEffect, useState } from 'react';

import React from 'react';

export default async function ChatBody() {
  const [chatCards, setChatCards] = useState<ChatCard[]>([]);

  useEffect(() => {
    GetChatCards('7').then((data) => {
      setChatCards(data);
    });
  }, []);

  const text =
    "```python\r\nimport numpy\na = numpy.array([[1, 2], [3, 4]])\r\n```\n\"7138163354002001920\" 这个数值的64位无符号二进制形式可以通过以下步骤得到：\n\n首先，将这个十进制数值转换为二进制。在Python中，可以使用内置的 `bin` 函数来实现这个转换。然后，去掉结果字符串的前两个字符（`'0b'`），这是Python用来表示二进制的前缀。\n\n```python\nbin(7138163354002001920)[2:]\n```\n\n执行上述代码，得到的结果是：`'11000100010'`";

  return (
    <div className="flex-shrink flex-grow flex-col overflow-y-auto overflow-x-hidden">
      <div className="px-5">
        {chatCards != null &&
          chatCards.length > 0 &&
          chatCards.map((chatCard: ChatCard) =>
            chatCard.role === 'user' ? (
              <div className="flex flex-row-reverse">
                <ChatCard role="user" content={text}></ChatCard>
              </div>
            ) : (
              <div className="flex">
                <ChatCard role="assistant" content={text}></ChatCard>
              </div>
            )
          )}
      </div>
    </div>
  );
}
