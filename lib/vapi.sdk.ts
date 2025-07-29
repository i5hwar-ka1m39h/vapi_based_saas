import Vapi from "@vapi-ai/web"

const vapiKey = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;

export const vapi = new Vapi(vapiKey!);