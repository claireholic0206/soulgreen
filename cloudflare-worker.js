/**
 * Cloudflare Worker - Supabase API 代理
 *
 * 用途：在中国加速 Supabase API 请求
 * 部署到 Cloudflare Worker 后，前端改用这个 Worker 地址而不是直连 Supabase
 *
 * 使用方法：
 * 1. 复制此文件内容到 Cloudflare Worker 编辑器
 * 2. 部署后得到一个 URL，如 https://soulgreen.your-cf-account.workers.dev
 * 3. 在前端 .env 改成这个 URL
 */

const SUPABASE_URL = 'https://rmmdscbjlpecpqspqdzs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_riMF3BH7Nepr3pAuL1xxrA__h42evPi';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // 转发路径：/rest/v1/* → Supabase REST API
    if (url.pathname.startsWith('/rest/')) {
      const supabaseUrl = new URL(SUPABASE_URL);
      const targetUrl = new URL(
        url.pathname.replace('/rest', '') + url.search,
        supabaseUrl
      );

      const headers = new Headers(request.headers);
      headers.set('apikey', SUPABASE_ANON_KEY);
      headers.set('Authorization', `Bearer ${SUPABASE_ANON_KEY}`);

      const response = await fetch(targetUrl.toString(), {
        method: request.method,
        headers: headers,
        body: request.body,
      });

      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
      return newResponse;
    }

    // 转发路径：/auth/v1/* → Supabase Auth API
    if (url.pathname.startsWith('/auth/')) {
      const supabaseUrl = new URL(SUPABASE_URL);
      const targetUrl = new URL(
        url.pathname.replace('/auth', '') + url.search,
        supabaseUrl
      );

      const headers = new Headers(request.headers);
      headers.set('apikey', SUPABASE_ANON_KEY);

      const response = await fetch(targetUrl.toString(), {
        method: request.method,
        headers: headers,
        body: request.body,
      });

      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
      return newResponse;
    }

    // 健康检查
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
