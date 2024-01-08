'use server';

import OpenAI from 'openai';
import { ChatCompletionRequestMessage } from './model/openai';
import { log } from 'console';
import openai from 'openai';
import { Stream } from 'stream';
import { ChatCompletion, ChatCompletionChunk } from 'openai/resources/index.mjs';
// import { OpenAIStream, StreamingTextResponse } from 'ai'

// GetChatInfo from openai
export async function GetOpenAIResponse(
  chatCompletionRequestMessage: ChatCompletionRequestMessage,
  writeStream: NodeJS.WritableStream
) {
  const token = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: token
  });

  const model = 'gpt-3.5-turbo';
  const content = chatCompletionRequestMessage.content;
  const stream = await openai.chat.completions.create({
    model: model, // gpt-3.5-turbo
    messages: [{ role: 'user', content: content }],
    stream: true
  });
  stream.toReadableStream().pipeTo(writeStream);
  // return new Response(stream);
  // return stream
  for await (const chunk of stream) {
    // log(chunk);
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
    // 通过 SSE (Server Sent Events) 将数据单向发送给客户端
  }
}
