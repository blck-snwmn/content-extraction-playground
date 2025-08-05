export default {
	async fetch(request, env, ctx): Promise<Response> {
		// see: https://developers.cloudflare.com/workers-ai/features/markdown-conversion
		const rurl = request.url
		const url = new URL(rurl);
		const urlParam = url.searchParams.get("url")

		if (!urlParam) {
			return new Response('Please provide a URL parameter', { status: 400 });
		}
		const resp = await fetch(urlParam);
		if (!resp.ok) {
			return new Response(`Failed to fetch ${urlParam}: ${resp.statusText}`, { status: resp.status });
		}

		const contentType = resp.headers.get('Content-Type') || 'text/plain';
		const body = await resp.text();

		const markdown = await env.AI.toMarkdown([{
			name: `${urlParam}.html`,
			blob: new Blob([body], { type: contentType }),
		}]);

		if (!markdown || markdown.length === 0) {
			return new Response('Failed to convert to Markdown', { status: 500 });
		}
		const content = markdown[0].data;

		return new Response(content, {
			headers: {
				'Content-Type': 'text/markdown',
				'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
			},
		});
	},
} satisfies ExportedHandler<Env>;
